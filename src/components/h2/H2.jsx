import styles from './h2.module.css';

export const H2 = ({ children }) => {
	return <h2 className={styles.title}>{children}</h2>;
};
