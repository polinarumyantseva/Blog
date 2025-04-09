import PropTypes from 'prop-types';
import { Input, Icon } from '../../../../components';
import styles from './search.module.css';

export const Search = ({ searchPhrase, onChange }) => {
	return (
		<div className={styles['search']}>
			<Input value={searchPhrase} placeholder="Поиск по заголовкам..." onChange={onChange} />
			<Icon className="search-icon" id="search" />
		</div>
	);
};

Search.propTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
