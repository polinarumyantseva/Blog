import PropTypes from 'prop-types';
import styles from './icon.module.css';

export const Icon = ({ className, id, ...params }) => {
	const iconClass = styles[className] || styles['default-icon'];
	return <i className={`${iconClass} fa fa-${id}`} aria-hidden="true" {...params}></i>;
};

Icon.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string.isRequired,
};
