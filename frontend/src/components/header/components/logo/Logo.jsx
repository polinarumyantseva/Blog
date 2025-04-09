import { Link } from 'react-router-dom';
import { Icon } from '../../..';
import styles from './logo.module.css';

export const Logo = () => {
	return (
		<Link className={styles['logo-container']} to="/">
			<Icon className="icon-logo" id="code" />
			<div>
				<div className={styles['large-text']}>Блог</div>
				<div className={styles['small-text']}>веб-разработчика</div>
			</div>
		</Link>
	);
};
