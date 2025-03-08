import { H2, Icon } from '../../../../components';
import styles from './postContent.module.css';

export const PostContent = ({ post: { title, content, publishedAt, imageUrl } }) => {
	return (
		<div className={styles['post-content']}>
			<img className={styles['post-img']} src={imageUrl} alt={title} />
			<H2>{title}</H2>
			<div className={styles['special-panel']}>
				<div className={styles['published-at']}>
					<Icon className="panel-icon" id="calendar-o" />
					{publishedAt}
				</div>
				<div className={styles['buttons-panel']}>
					<Icon id="pencil-square-o" />
					<Icon id="trash-o" />
				</div>
			</div>
			<div className={styles['post-text']}>{content}</div>
		</div>
	);
};
