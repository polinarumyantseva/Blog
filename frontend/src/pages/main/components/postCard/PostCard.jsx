import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from '../../../../components';
import styles from './postCard.module.css';

export const PostCard = ({ id, title, imageUrl, publishedAt, commentsCount }) => {
	return (
		<div className={styles['post-card']}>
			<Link to={`/post/${id}`}>
				<img src={imageUrl} alt={title} />
				<div className={styles['post-card-footer']}>
					<h4>{title}</h4>
					<div className={styles['post-card-info']}>
						<div className={styles['published-at']}>
							<Icon className="panel-icon" id="calendar-o" />
							{new Date(publishedAt).toLocaleString('ru')}
						</div>
						<div className={styles['comments-count']}>
							<Icon className="panel-icon" id="comment-o" />
							{commentsCount}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

PostCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	commentsCount: PropTypes.number.isRequired,
};
