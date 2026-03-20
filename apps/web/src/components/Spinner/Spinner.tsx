import styles from './Spinner.module.scss';

interface SpinnerProps {
  message?: string;
}

const Spinner = ({ message = 'Loading...' }: SpinnerProps) => {
  return (
    <div className={styles.updateContainer}>
      <div className={styles.spinner}></div>
      <span className={styles.message}> {message}</span>
    </div>
  );
};

export default Spinner;
