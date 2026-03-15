import { PrismaPg } from '@prisma/adapter-pg';
import { CrewRole, GenreEnum, PrismaClient } from '../generated/prisma/client';

const TMDB_KEY = process.env.TMDB_API_KEY;
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
const TOTAL_PAGES = 5;

const tmdbToGenre: Record<string, GenreEnum> = {
  Action: GenreEnum.ACTION,
  Adventure: GenreEnum.ADVENTURE,
  Animation: GenreEnum.ANIMATION,
  Comedy: GenreEnum.COMEDY,
  Crime: GenreEnum.CRIME,
  Documentary: GenreEnum.DOCUMENTARY,
  Drama: GenreEnum.DRAMA,
  Family: GenreEnum.FAMILY,
  Fantasy: GenreEnum.FANTASY,
  History: GenreEnum.HISTORY,
  Horror: GenreEnum.HORROR,
  Music: GenreEnum.MUSIC,
  Mystery: GenreEnum.MYSTERY,
  Romance: GenreEnum.ROMANCE,
  'Science Fiction': GenreEnum.SCI_FI,
  Thriller: GenreEnum.THRILLER,
  War: GenreEnum.WAR,
  Western: GenreEnum.WESTERN,
};

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const genres = Object.values(GenreEnum).map((name) => ({ name }));

  await prisma.genre.createMany({ data: genres, skipDuplicates: true });

  const pageFetches: Promise<Response>[] = [];
  const allResults: any[] = [];
  const movieDetailsFetches: Promise<Response>[] = [];
  const allMovieDetails: any[] = [];

  for (let page = 1; page <= TOTAL_PAGES; page++) {
    pageFetches.push(
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&vote_count.gte=1000&vote_average.gte=7&sort_by=popularity.desc&page=${page}`,
      ),
    );
  }

  const settled = await Promise.allSettled(pageFetches);

  for (const s of settled) {
    if (s.status === 'fulfilled') {
      const pageData = await s.value.json();
      allResults.push(...pageData.results);
    }
  }

  for (const movie of allResults) {
    movieDetailsFetches.push(
      fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_KEY}&append_to_response=credits,videos,reviews`,
      ),
    );
  }

  const settledMovieDetails = await Promise.allSettled(movieDetailsFetches);

  for (const s of settledMovieDetails) {
    if (s.status === 'fulfilled') {
      const details = await s.value.json();
      allMovieDetails.push(details);
    }
  }

  for (const details of allMovieDetails) {
    const poster = details.poster_path
      ? `${IMAGE_BASE}${details.poster_path}`
      : '';

    const trailer = details.videos?.results?.find(
      (v: any) => v.type === 'Trailer' && v.site === 'YouTube',
    );

    const trailerKey = trailer?.key || '';

    const createdMovie = await prisma.movie.create({
      data: {
        title: details.title,
        description: details.overview,
        runtime: details.runtime,
        rating: details.vote_average,
        popularity: details.popularity,
        posterUrl: poster,
        trailerKey,
        releaseDate: new Date(details.release_date),
        genres: {
          connect: details.genres
            .map((g: any) => ({
              name: tmdbToGenre[g.name],
            }))
            .filter(Boolean),
        },
        topCast: {
          create: details.credits?.cast?.slice(0, 5).map((c: any) => ({
            name: c.name,
            character: c.character,
          })),
        },

        topCrew: {
          create: details.credits?.crew
            ?.filter((c: any) =>
              Object.values(CrewRole).includes(c.job.toUpperCase()),
            )
            .map((c: any) => ({
              name: c.name,
              role: c.job.toUpperCase() as CrewRole,
            })),
        },
      },
    });

    if (details.reviews?.results)
      for (const r of details.reviews?.results) {
        await prisma.review.create({
          data: {
            author: r.author,
            content: r.content,
            movieId: createdMovie.id,
          },
        });
      }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
