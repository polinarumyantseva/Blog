import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../../../../components';
import styles from './controlPanel.module.css';

export const ControlPanel = () => {
	const navigate = useNavigate();
	return (
		<div className="">
			<div className={styles['right-aligned']}>
				<Link to="/login" className={styles.button}>
					Войти
				</Link>
			</div>
			<div className={styles['right-aligned']}>
				<div className={styles['icon-back']} onClick={() => navigate(-1)}>
					<Icon className="control-panel-icon" id="backward" />
				</div>
				<Link to="/post">
					<Icon className="control-panel-icon" id="file-text-o" />
				</Link>
				<Link to="/users">
					<Icon className="control-panel-icon" id="users" />
				</Link>
			</div>
		</div>
	);
};
