import { H2 } from '../h2/H2';
import { PROP_TYPE } from '../../constants/propType';
import styles from './error.module.css';

export const Error = ({ error }) =>
	error && (
		<>
			<H2>Ошибка</H2>
			<div className={styles['error-text']}>{error}</div>
		</>
	);

Error.propTypes = {
	error: PROP_TYPE.ERROR,
};
