import PropTypes from 'prop-types';
import styles from './AuthFormError.module.css';

export const AuthFormError = ({ children }) => {
	return <div className={styles['error-message']}>{children}</div>;
};

AuthFormError.propTypes = {
	children: PropTypes.node.isRequired,
};
