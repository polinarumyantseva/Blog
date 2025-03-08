import { Icon } from '../../../../../../components';
import styles from './comment.module.css';

export const Comment = ({ id, content, author, publishedAt }) => {
	return (
		<div className={styles['comment-item']}>
			<div className={styles['comment']}>
				<div className={styles['information-panel']}>
					<div className={styles['author']}>
						<Icon id="user-circle-o" />
						{author}
					</div>
					<div className={styles['published-at']}>
						<Icon id="calendar-o" />
						{publishedAt}
					</div>
				</div>
				<div className={styles['comment-text']}>{content}</div>
			</div>
			<Icon className="delete-icon" id="trash-o" />
		</div>
	);
};
