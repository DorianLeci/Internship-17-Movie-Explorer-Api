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
          {crew.map((member) => (
            <div key={`${member.id}-${member.role}`} className={styles.card}>
              <span className={styles.name}>{member.name}</span>
              <span className={styles.role}>{member.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
