import styles from '@styles/MoviePeople.module.scss';
import type { CrewMember } from '@tstypes/MovieMember';

interface MovieCrewProps {
  crew: CrewMember[];
}

export const MovieCrew = ({ crew }: MovieCrewProps) => {
  if (!crew.length) return null;

  return (
    <section className={styles.peopleContainer}>
      <h2 className={styles.title}>Top Crew</h2>
      <div className={styles.scrollContainer}>
        <div className={styles.cardContainer}>
          {crew.map(({ crewMember, role }) => (
            <div key={`${crewMember.id}-${role}`} className={styles.card}>
              <span className={styles.name}>
                {`${crewMember.firstName} ${crewMember.lastName}`}
              </span>
              <span className={styles.role}>{role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
