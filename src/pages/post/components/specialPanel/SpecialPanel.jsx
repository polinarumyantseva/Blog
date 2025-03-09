import { Icon } from '../../../../components';
import styles from './specialPanel.module.css';

export const SpecialPanel = ({ publishedAt, editButton }) => {
	return (
		<div className={styles['special-panel']}>
			<div className={styles['published-at']}>
				<Icon className="panel-icon" id="calendar-o" />
				{publishedAt}
			</div>
			<div className={styles['buttons-panel']}>
				{editButton}
				<div onClick={() => {}}>
					<Icon id="trash-o" />
				</div>
			</div>
		</div>
	);
};
