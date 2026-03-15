import ReadMoreArea from '@foxeian/react-read-more';
import useHorizontalScroll from '@hooks/useHorizontalScroll';
import type { MovieReview } from '@tstypes/MovieReview';
import styles from './MovieReview.module.scss';

interface MovieReviewProps {
  reviews: MovieReview[];
  limit?: number;
}

export const MovieReviews = ({ reviews, limit = 10 }: MovieReviewProps) => {
  if (!reviews.length) return null;

  const ref = useHorizontalScroll();

  return (
    <section className={styles.reviewContainer}>
      <h2 className={styles.title}>Reviews</h2>
      <div className={styles.cardScrollContainer} ref={ref}>
        <div className={styles.cardContainer}>
          {reviews.slice(0, limit).map((review) => (
            <div key={review.id} className={styles.card}>
              <span className={styles.author}>{review.author}: </span>
              <ReadMoreArea
                lettersLimit={200}
                expandLabel="Read more"
                collapseLabel="Read less"
                className={styles.readMore}
                buttonStyle={{
                  display: 'block',
                  marginTop: '8px',
                  fontSize: '18px',
                  color: '#ffb3b3',
                  fontWeight: 'bold',
                  background: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                {review.content}
              </ReadMoreArea>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
