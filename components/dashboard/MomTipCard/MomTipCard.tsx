import css from "./MomTipCard.module.css";

interface MomTipCardProps {
  momHint: string;
}

const MomTipCard = ({ momHint }: MomTipCardProps) => {
  return (
    <div className={css.container}>
      <h2 className={css.header}>Порада для мами</h2>
      <p className={css.descr}>{momHint}</p>
    </div>
  );
};

export default MomTipCard;
