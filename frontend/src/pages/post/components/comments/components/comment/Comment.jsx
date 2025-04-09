import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../../../components';
import { removeCommentAsync, openModal, CLOSE_MODAL } from '../../../../../../actions';
import { useServerRequest } from '../../../../../../hooks';
import { ROLE } from '../../../../../../constants';
import { selectUserRole } from '../../../../../../selectors';
import styles from './comment.module.css';

export const Comment = ({ postId, id, content, author, publishedAt }) => {
	const userRole = useSelector(selectUserRole);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(requestServer, postId, id));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};
	const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);

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
			{isAdminOrModerator && (
				<div onClick={() => onCommentRemove(id)}>
					<Icon className="delete-icon" id="trash-o" />
				</div>
			)}
		</div>
	);
};

Comment.propTypes = {
	postId: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	content: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
};
