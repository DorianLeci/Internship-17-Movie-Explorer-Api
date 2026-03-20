import styles from './MovieTrailer.module.scss';

interface MovieTrailerProps {
  trailerKey: string | null;
}

const MovieTrailer = ({ trailerKey }: MovieTrailerProps) => {
  return (
    <>
      {trailerKey && (
        <section className={styles.video}>
          <div className={styles.videoContainer}>
            <h2 className={styles.title}>Trailer</h2>
            <iframe
              className={styles.videoFrame}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              allowFullScreen
            />
          </div>
        </section>
      )}
    </>
  );
};

export default MovieTrailer;
