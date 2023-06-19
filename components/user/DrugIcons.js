import styles from "../../styles/user/DrugIcon.module.css";
import DrugCards from "../../components/user/DrugCards";

const DrugIcon = ({ drugs }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <DrugCards drugs={drugs} />
        
      </div>
    </div>
  );
};

export default DrugIcon;



