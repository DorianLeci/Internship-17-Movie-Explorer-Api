import { TbMovieOff } from 'react-icons/tb';
import styles from './EmptyStateCard.module.scss';

interface EmptyStateCardProps {
  title: string;
  subtitle: string;
}

const EmptyStateCard = ({ title, subtitle }: EmptyStateCardProps) => {
  return (
    <div className={styles.wrapper}>
      <TbMovieOff className={styles.icon} color="aqua" />
      <h2 className={styles.title}>
        No films found
        <span>{title}</span>
      </h2>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
};

export default EmptyStateCard;
