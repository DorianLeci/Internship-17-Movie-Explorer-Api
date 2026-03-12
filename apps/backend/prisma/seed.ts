import { PrismaPg } from '@prisma/adapter-pg';
import {
  Actor,
  CrewMember,
  CrewRole,
  GenreEnum,
  PrismaClient,
} from '../generated/prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // Genres
  const genres = Object.values(GenreEnum).map((name) => ({ name }));
  await prisma.genre.createMany({ data: genres, skipDuplicates: true });

  // Actors
  const actorsData = [
    { firstName: 'Tim', lastName: 'Robbins' },
    { firstName: 'Russell', lastName: 'Crowe' },
    { firstName: 'Carrie', lastName: 'Fisher' },
    { firstName: 'Peter', lastName: 'Cushing' },
    { firstName: 'Ian', lastName: 'McKellen' },
    { firstName: 'Orlando', lastName: 'Bloom' },
    { firstName: 'Viggo', lastName: 'Mortensen' },
    { firstName: 'Cate', lastName: 'Blanchett' },
    { firstName: 'Joaquin', lastName: 'Phoenix' },
    { firstName: 'Connie', lastName: 'Nielsen' },
    { firstName: 'Morgan', lastName: 'Freeman' },
    { firstName: 'Marlon', lastName: 'Brando' },
    { firstName: 'Al', lastName: 'Pacino' },
    { firstName: 'Christian', lastName: 'Bale' },
    { firstName: 'Heath', lastName: 'Ledger' },
    { firstName: 'Henry', lastName: 'Fonda' },
    { firstName: 'Liam', lastName: 'Neeson' },
    { firstName: 'Elijah', lastName: 'Wood' },
    { firstName: 'John', lastName: 'Travolta' },
    { firstName: 'Samuel', lastName: 'Jackson' },
    { firstName: 'Tom', lastName: 'Hanks' },
    { firstName: 'Robin', lastName: 'Wright' },
    { firstName: 'Leonardo', lastName: 'DiCaprio' },
    { firstName: 'Joseph', lastName: 'Gordon-Levitt' },
    { firstName: 'Elliot', lastName: 'Page' },
    { firstName: 'Matt', lastName: 'Damon' },
    { firstName: 'Ryan', lastName: 'Gosling' },
    { firstName: 'Brad', lastName: 'Pitt' },
    { firstName: 'Keanu', lastName: 'Reeves' },
    { firstName: 'Carrie-Anne', lastName: 'Moss' },
    { firstName: 'Mark', lastName: 'Hamill' },
    { firstName: 'Harrison', lastName: 'Ford' },
    { firstName: 'Sigourney', lastName: 'Weaver' },
    { firstName: 'Christian', lastName: 'Slater' },
    { firstName: 'Anne', lastName: 'Hathaway' },
    { firstName: 'Matthew', lastName: 'Broderick' },
    { firstName: 'Jeremy', lastName: 'Irons' },
    { firstName: 'James', lastName: 'Earl Jones' },
    { firstName: 'Moira', lastName: 'Kelly' },
    { firstName: 'Whoopi', lastName: 'Goldberg' },
    { firstName: 'Kate', lastName: 'Winslet' },
    { firstName: 'Billy', lastName: 'Zane' },
    { firstName: 'Kathy', lastName: 'Bates' },
    { firstName: 'Bill', lastName: 'Paxton' },
    { firstName: 'Sam', lastName: 'Neill' },
    { firstName: 'Laura', lastName: 'Dern' },
    { firstName: 'Jeff', lastName: 'Goldblum' },
    { firstName: 'Richard', lastName: 'Attenborough' },
    { firstName: 'Joseph', lastName: 'Mazzello' },
    { firstName: 'Uma', lastName: 'Thurman' },
    { firstName: 'Bruce', lastName: 'Willis' },
    { firstName: 'Gary', lastName: 'Sinise' },
    { firstName: 'Sally', lastName: 'Field' },
    { firstName: 'Tom', lastName: 'Hardy' },
    { firstName: 'Ken', lastName: 'Watanabe' },
    { firstName: 'Laurence', lastName: 'Fishburne' },
    { firstName: 'Hugo', lastName: 'Weaving' },
    { firstName: 'Matthew', lastName: 'McConaughey' },
    { firstName: 'Jessica', lastName: 'Chastain' },
    { firstName: 'Oliver', lastName: 'Reed' },
  ];

  const actors: Actor[] = [];
  for (const a of actorsData) {
    const actor = await prisma.actor.create({ data: a });
    actors.push(actor);
  }

  // Crew members
  const crewData: { firstName: string; lastName: string; role: CrewRole }[] = [
    { firstName: 'Frank', lastName: 'Darabont', role: CrewRole.DIRECTOR },
    { firstName: 'Steven', lastName: 'Spielberg', role: CrewRole.DIRECTOR },
    { firstName: 'Ridley', lastName: 'Scott', role: CrewRole.DIRECTOR },
    { firstName: 'Francis', lastName: 'Coppola', role: CrewRole.DIRECTOR },
    { firstName: 'Christopher', lastName: 'Nolan', role: CrewRole.DIRECTOR },
    { firstName: 'Quentin', lastName: 'Tarantino', role: CrewRole.DIRECTOR },
    { firstName: 'Peter', lastName: 'Jackson', role: CrewRole.DIRECTOR },
    { firstName: 'James', lastName: 'Cameron', role: CrewRole.DIRECTOR },
    { firstName: 'George', lastName: 'Lucas', role: CrewRole.PRODUCER },
    { firstName: 'Kathleen', lastName: 'Kennedy', role: CrewRole.PRODUCER },
    { firstName: 'Hans', lastName: 'Zimmer', role: CrewRole.COMPOSER },
    { firstName: 'John', lastName: 'Williams', role: CrewRole.COMPOSER },
    { firstName: 'Howard', lastName: 'Shore', role: CrewRole.COMPOSER },
    { firstName: 'Wally', lastName: 'Pfister', role: CrewRole.CINEMATOGRAPHER },
    { firstName: 'Roger', lastName: 'Allers', role: CrewRole.DIRECTOR },
  ];

  const crewMembers: (CrewMember & { role: CrewRole })[] = [];
  for (const c of crewData) {
    const crew = await prisma.crewMember.create({
      data: { firstName: c.firstName, lastName: c.lastName },
    });
    crewMembers.push({ ...crew, role: c.role });
  }

  const topCastData = {
    'The Shawshank Redemption': [
      { actor: ['Tim', 'Robbins'], character: 'Andy Dufresne' },
      { actor: ['Morgan', 'Freeman'], character: 'Ellis Boyd "Red" Redding' },
      { actor: ['Brad', 'Pitt'], character: 'Supporting Character' },
      { actor: ['Christian', 'Slater'], character: 'Supporting Character' },
      { actor: ['Matt', 'Damon'], character: 'Supporting Character' },
    ],
    'The Godfather': [
      { actor: ['Marlon', 'Brando'], character: 'Vito Corleone' },
      { actor: ['Al', 'Pacino'], character: 'Michael Corleone' },
      { actor: ['Morgan', 'Freeman'], character: 'Supporting Character' },
      { actor: ['Brad', 'Pitt'], character: 'Supporting Character' },
      { actor: ['Samuel', 'Jackson'], character: 'Supporting Character' },
    ],
    'The Dark Knight': [
      { actor: ['Christian', 'Bale'], character: 'Bruce Wayne / Batman' },
      { actor: ['Heath', 'Ledger'], character: 'Joker' },
      { actor: ['Joseph', 'Gordon-Levitt'], character: 'John Blake' },
      { actor: ['Elliot', 'Page'], character: 'Miranda Tate / Talia al Ghul' },
      { actor: ['Brad', 'Pitt'], character: 'Supporting Character' },
    ],
    'Pulp Fiction': [
      { actor: ['John', 'Travolta'], character: 'Vincent Vega' },
      { actor: ['Samuel', 'Jackson'], character: 'Jules Winnfield' },
      { actor: ['Uma', 'Thurman'], character: 'Mia Wallace' },
      { actor: ['Bruce', 'Willis'], character: 'Butch Coolidge' },
      { actor: ['Morgan', 'Freeman'], character: 'Supporting Character' },
    ],
    'Forrest Gump': [
      { actor: ['Tom', 'Hanks'], character: 'Forrest Gump' },
      { actor: ['Robin', 'Wright'], character: 'Jenny Curran' },
      { actor: ['Gary', 'Sinise'], character: 'Lieutenant Dan Taylor' },
      { actor: ['Sally', 'Field'], character: 'Mrs. Gump' },
      { actor: ['Matt', 'Damon'], character: 'Supporting Character' },
    ],
    Inception: [
      { actor: ['Leonardo', 'DiCaprio'], character: 'Dom Cobb' },
      { actor: ['Joseph', 'Gordon-Levitt'], character: 'Arthur' },
      { actor: ['Elliot', 'Page'], character: 'Ariadne' },
      { actor: ['Tom', 'Hardy'], character: 'Eames' },
      { actor: ['Ken', 'Watanabe'], character: 'Saito' },
    ],
    'The Matrix': [
      { actor: ['Keanu', 'Reeves'], character: 'Neo' },
      { actor: ['Carrie-Anne', 'Moss'], character: 'Trinity' },
      { actor: ['Laurence', 'Fishburne'], character: 'Morpheus' },
      { actor: ['Hugo', 'Weaving'], character: 'Agent Smith' },
      { actor: ['Brad', 'Pitt'], character: 'Supporting Character' },
    ],
    Interstellar: [
      { actor: ['Matthew', 'McConaughey'], character: 'Cooper' },
      { actor: ['Anne', 'Hathaway'], character: 'Brand' },
      { actor: ['Jessica', 'Chastain'], character: 'Murph' },
      { actor: ['Matt', 'Damon'], character: 'Dr. Mann' },
    ],
    Gladiator: [
      { actor: ['Russell', 'Crowe'], character: 'Maximus' },
      { actor: ['Joaquin', 'Phoenix'], character: 'Commodus' },
      { actor: ['Connie', 'Nielsen'], character: 'Lucilla' },
      { actor: ['Oliver', 'Reed'], character: 'Proximo' },
      { actor: ['Tom', 'Hanks'], character: 'Supporting Character' },
    ],
    'The Lord of the Rings: The Fellowship of the Ring': [
      { actor: ['Elijah', 'Wood'], character: 'Frodo Baggins' },
      { actor: ['Ian', 'McKellen'], character: 'Gandalf' },
      { actor: ['Orlando', 'Bloom'], character: 'Legolas' },
      { actor: ['Viggo', 'Mortensen'], character: 'Aragorn' },
      { actor: ['Cate', 'Blanchett'], character: 'Galadriel' },
    ],
    'Star Wars: Episode IV – A New Hope': [
      { actor: ['Mark', 'Hamill'], character: 'Luke Skywalker' },
      { actor: ['Harrison', 'Ford'], character: 'Han Solo' },
      { actor: ['Carrie', 'Fisher'], character: 'Leia Organa' },
      { actor: ['Peter', 'Cushing'], character: 'Grand Moff Tarkin' },
    ],
    'Jurassic Park': [
      { actor: ['Sam', 'Neill'], character: 'Dr. Alan Grant' },
      { actor: ['Laura', 'Dern'], character: 'Dr. Ellie Sattler' },
      { actor: ['Jeff', 'Goldblum'], character: 'Dr. Ian Malcolm' },
      { actor: ['Richard', 'Attenborough'], character: 'John Hammond' },
      { actor: ['Joseph', 'Mazzello'], character: 'Tim Murphy' },
    ],
    'The Lion King': [
      { actor: ['Matthew', 'Broderick'], character: 'Simba' },
      { actor: ['Jeremy', 'Irons'], character: 'Scar' },
      { actor: ['James', 'Earl Jones'], character: 'Mufasa' },
      { actor: ['Moira', 'Kelly'], character: 'Nala' },
      { actor: ['Whoopi', 'Goldberg'], character: 'Shenzi' },
    ],
    Titanic: [
      { actor: ['Leonardo', 'DiCaprio'], character: 'Jack Dawson' },
      { actor: ['Kate', 'Winslet'], character: 'Rose DeWitt Bukater' },
      { actor: ['Billy', 'Zane'], character: 'Cal Hockley' },
      { actor: ['Kathy', 'Bates'], character: 'Molly Brown' },
      { actor: ['Bill', 'Paxton'], character: 'Brock Lovett' },
    ],
  };

  const moviesData = [
    {
      title: 'The Shawshank Redemption',
      description:
        'Two imprisoned men bond over many years, finding solace and eventual redemption through acts of common decency.',
      runtime: 142,
      rating: 9.3,
      popularity: 100,
      posterUrl: '',
      trailerUrl: '',
      releaseDate: new Date('1994-09-23'),
      genres: [GenreEnum.DRAMA],
      cast: [
        'Tim Robbins',
        'Morgan Freeman',
        'Brad Pitt',
        'Christian Slater',
        'Matt Damon',
      ],
      crew: ['Frank Darabont', 'John Williams', 'Kathleen Kennedy'],
    },
    {
      title: 'The Godfather',
      description:
        'The aging patriarch of an organized crime dynasty transfers control to his reluctant son.',
      runtime: 175,
      rating: 9.2,
      popularity: 99,
      posterUrl: '',
      trailerUrl: '',
      releaseDate: new Date('1972-03-24'),
      genres: [GenreEnum.CRIME, GenreEnum.DRAMA],
      cast: [
        'Marlon Brando',
        'Al Pacino',
        'Morgan Freeman',
        'Brad Pitt',
        'Samuel Jackson',
      ],
      crew: ['Francis Coppola', 'John Williams', 'Kathleen Kennedy'],
    },
    {
      title: 'The Dark Knight',
      description:
        'Batman faces the Joker in Gotham City in one of the greatest superhero films.',
      runtime: 152,
      rating: 9.0,
      popularity: 98,
      posterUrl: '',
      trailerUrl: '',
      releaseDate: new Date('2008-07-18'),
      genres: [GenreEnum.ACTION, GenreEnum.CRIME],
      cast: [
        'Christian Bale',
        'Heath Ledger',
        'Brad Pitt',
        'Joseph Gordon-Levitt',
        'Elliot Page',
      ],
      crew: ['Christopher Nolan', 'Hans Zimmer', 'Kathleen Kennedy'],
    },
    {
      title: 'Pulp Fiction',
      description: 'Intertwining stories of crime and redemption in LA.',
      runtime: 154,
      rating: 8.9,
      popularity: 97,
      posterUrl: '',
      trailerUrl: '',
      releaseDate: new Date('1994-10-14'),
      genres: [GenreEnum.CRIME, GenreEnum.COMEDY],
      cast: [
        'John Travolta',
        'Samuel Jackson',
        'Brad Pitt',
        'Leonardo DiCaprio',
        'Morgan Freeman',
      ],
      crew: ['Quentin Tarantino', 'John Williams', 'Kathleen Kennedy'],
    },
    {
      title: 'Forrest Gump',
      description:
        'Life unfolds through the eyes of a simple man with a big heart.',
      runtime: 142,
      rating: 8.8,
      popularity: 96,
      posterUrl: '',
      trailerUrl: '',
      releaseDate: new Date('1994-07-06'),
      genres: [GenreEnum.DRAMA, GenreEnum.ROMANCE],
      cast: [
        'Tom Hanks',
        'Robin Wright',
        'Matt Damon',
        'Keanu Reeves',
        'Ryan Gosling',
      ],
      crew: ['Steven Spielberg', 'John Williams', 'Kathleen Kennedy'],
    },
    {
      title: 'Inception',
      description:
        'A thief who steals corporate secrets through dream-sharing technology.', // real
      runtime: 148,
      rating: 8.8,
      popularity: 95,
      posterUrl: '',
      trailerUrl: '',
      releaseDate: new Date('2010-07-16'),
      genres: [GenreEnum.ACTION, GenreEnum.SCI_FI],
      cast: [
        'Leonardo DiCaprio',
        'Joseph Gordon-Levitt',
        'Elliot Page',
        'Christian Bale',
        'Ryan Gosling',
      ],
      crew: ['Christopher Nolan', 'Hans Zimmer', 'Kathleen Kennedy'],
    },
    {
      title: 'The Matrix',
      description:
        'A hacker discovers reality is a simulation controlled by powerful forces.',
      runtime: 136,
      rating: 8.7,
      popularity: 94,
      posterUrl: '',
      trailerUrl: '',
      releaseDate: new Date('1999-03-31'),
      genres: [GenreEnum.ACTION, GenreEnum.SCI_FI],
      cast: [
        'Keanu Reeves',
        'Carrie-Anne Moss',
        'Brad Pitt',
        'Ryan Gosling',
        'Morgan Freeman',
      ],
      crew: ['Peter Jackson', 'Hans Zimmer', 'Kathleen Kennedy'],
    },
    {
      title: 'Interstellar',
      description:
        'Explorers travel through a wormhole in space to save humanity.',
      runtime: 169,
      rating: 8.6,
      popularity: 93,
      posterUrl: '',
      trailerUrl: '',
      releaseDate: new Date('2014-11-07'),
      genres: [GenreEnum.SCI_FI, GenreEnum.ADVENTURE],
      cast: ['Matt Damon', 'Anne Hathaway'],
      crew: ['Christopher Nolan', 'Hans Zimmer', 'Wally Pfister'],
    },
    {
      title: 'Gladiator',
      description: 'A former Roman General sets out to exact vengeance.',
      runtime: 155,
      rating: 8.5,
      popularity: 92,
      posterUrl: '',
      trailerUrl: '',
      releaseDate: new Date('2000-05-05'),
      genres: [GenreEnum.ACTION, GenreEnum.DRAMA],
      cast: [
        'Russell Crowe',
        'Joaquin Phoenix',
        'Connie Nielsen',
        'Brad Pitt',
        'Tom Hanks',
      ],
      crew: ['Ridley Scott', 'Hans Zimmer', 'Kathleen Kennedy'],
      reviews: [
        { author: 'Alice', content: 'Epic movie with stunning visuals.' },
        { author: 'Bob', content: 'Russell Crowe is phenomenal!' },
      ],
    },
    {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      description: 'A hobbit begins a journey to destroy the One Ring.',
      runtime: 178,
      rating: 8.8,
      popularity: 95,
      posterUrl: '',
      trailerUrl: '',
      releaseDate: new Date('2001-12-19'),
      genres: [GenreEnum.FANTASY, GenreEnum.ADVENTURE],
      cast: [
        'Elijah Wood',
        'Ian McKellen',
        'Orlando Bloom',
        'Viggo Mortensen',
        'Cate Blanchett',
      ],
      crew: ['Peter Jackson', 'Howard Shore', 'Kathleen Kennedy'],
      reviews: [
        {
          author: 'Charlie',
          content: 'A masterpiece of fantasy storytelling.',
        },
        { author: 'Dana', content: 'The visuals and music are breathtaking.' },
      ],
    },
    {
      title: 'Star Wars: Episode IV – A New Hope',
      description: 'Luke Skywalker begins his journey to become a Jedi.',
      runtime: 121,
      rating: 8.6,
      popularity: 90,
      posterUrl: '',
      trailerUrl: '',
      releaseDate: new Date('1977-05-25'),
      genres: [GenreEnum.SCI_FI, GenreEnum.ADVENTURE],
      cast: ['Mark Hamill', 'Harrison Ford', 'Carrie Fisher', 'Peter Cushing'],
      crew: ['George Lucas', 'John Williams', 'Kathleen Kennedy'],
      reviews: [
        { author: 'Eve', content: 'Classic sci-fi adventure that never ages.' },
        {
          author: 'Frank',
          content: 'Iconic performances and unforgettable music.',
        },
      ],
    },
    {
      title: 'Jurassic Park',
      description: 'Dinosaurs are brought back to life on a theme park island.',
      runtime: 127,
      rating: 8.1,
      popularity: 89,
      posterUrl: '',
      trailerUrl: '',
      releaseDate: new Date('1993-06-11'),
      genres: [GenreEnum.ACTION, GenreEnum.SCI_FI],
      cast: [
        'Sam Neill',
        'Laura Dern',
        'Jeff Goldblum',
        'Richard Attenborough',
        'Joseph Mazzello',
      ],
      crew: ['Steven Spielberg', 'John Williams', 'Kathleen Kennedy'],
      reviews: [
        {
          author: 'Grace',
          content: 'Dinosaurs come to life like never before!',
        },
        { author: 'Henry', content: 'Spielberg at his finest.' },
      ],
    },
    {
      title: 'The Lion King',
      description:
        'A young lion prince flees his kingdom only to return and reclaim it.',
      runtime: 88,
      rating: 8.5,
      popularity: 91,
      posterUrl: '',
      trailerUrl: '',
      releaseDate: new Date('1994-06-24'),
      genres: [GenreEnum.ANIMATION, GenreEnum.ADVENTURE],
      cast: [
        'Matthew Broderick',
        'Jeremy Irons',
        'James Earl Jones',
        'Moira Kelly',
        'Whoopi Goldberg',
      ],
      crew: ['Roger Allers', 'Hans Zimmer', 'Kathleen Kennedy'],
      reviews: [
        { author: 'Ivy', content: 'Timeless animated classic.' },
        { author: 'Jack', content: 'Music and story are unforgettable.' },
      ],
    },
    {
      title: 'Titanic',
      description:
        'A young couple fall in love aboard the ill-fated ship Titanic.',
      runtime: 195,
      rating: 7.8,
      popularity: 90,
      posterUrl: '',
      trailerUrl: '',
      releaseDate: new Date('1997-12-19'),
      genres: [GenreEnum.DRAMA, GenreEnum.ROMANCE],
      cast: [
        'Leonardo DiCaprio',
        'Kate Winslet',
        'Billy Zane',
        'Kathy Bates',
        'Bill Paxton',
      ],
      crew: ['James Cameron', 'John Williams', 'Kathleen Kennedy'],
      reviews: [
        { author: 'Liam', content: 'Epic romance on the Titanic.' },
        { author: 'Mia', content: 'Heartbreaking and visually stunning.' },
      ],
    },
  ];

  for (const m of moviesData) {
    await prisma.movie.create({
      data: {
        title: m.title,
        description: m.description,
        runtime: m.runtime,
        rating: m.rating,
        popularity: m.popularity,
        posterUrl: m.posterUrl,
        trailerUrl: m.trailerUrl,
        releaseDate: m.releaseDate,
        genres: { connect: m.genres.map((g: GenreEnum) => ({ name: g })) },
        topCast: {
          create: topCastData[m.title].map((c) => {
            const [firstName, lastName] = c.actor;
            const actor = actors.find(
              (a) => a.firstName === firstName && a.lastName === lastName,
            );
            if (!actor)
              throw new Error(`Actor ${firstName} ${lastName} not found`);
            return { actorId: actor.id, character: c.character };
          }),
        },
        topCrew: {
          create: m.crew.map((name) => {
            const [firstName, lastName] = name.split(' ');
            const crew = crewMembers.find(
              (c) => c.firstName === firstName && c.lastName === lastName,
            );
            if (!crew) throw new Error(`Crew ${name} not found`);
            return { crewMemberId: crew.id, role: crew.role };
          }),
        },
        reviews: {
          create: m.reviews?.map((r) => ({
            author: r.author,
            content: r.content,
          })),
        },
        favorite: { create: {} },
      },
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
