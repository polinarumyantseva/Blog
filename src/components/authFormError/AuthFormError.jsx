import styles from './AuthFormError.module.css';

export const AuthFormError = ({ children }) => {
	return <div className={styles['error-message']}>{children}</div>;
};
