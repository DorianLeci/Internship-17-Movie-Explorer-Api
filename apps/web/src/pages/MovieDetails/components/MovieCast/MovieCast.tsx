import useHorizontalScroll from '@hooks/useHorizontalScroll';
import styles from '@styles/MoviePeople.module.scss';
import type { CastMember } from '@tstypes/MovieMember';

interface MovieCastProps {
  cast: CastMember[];
  limit?: number;
}

export const MovieCast = ({ cast, limit = 10 }: MovieCastProps) => {
  if (!cast.length) return null;

  const ref = useHorizontalScroll();

  return (
    <section className={styles.peopleContainer}>
      <h2 className={styles.title}>Top cast</h2>
      <div className={styles.scrollContainer} ref={ref}>
        <div className={styles.cardContainer}>
          {cast.slice(0, limit).map((actor) => (
            <div key={actor.id} className={styles.card}>
              <span className={styles.name}>{actor.name}</span>
              <span className={styles.role}>as {actor.character}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
