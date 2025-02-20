import styles from './icon.module.css';

export const Icon = ({ className = 'default-icon', id }) => {
	return <i className={`${styles[className]} fa fa-${id}`} aria-hidden="true"></i>;
};
