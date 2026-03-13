import style from './Spinner.module.scss';

interface SpinnerProps {
  text: string;
}

export const Spinner = ({ text }: SpinnerProps) => {
  return (
    <div className={style.container}>
      <div className={style.spinner}></div>
      <span className={style.loadingText}>{text}</span>
    </div>
  );
};
