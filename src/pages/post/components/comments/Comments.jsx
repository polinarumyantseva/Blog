import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../components';
import { Comment } from './components';
import { selectUserId, selectUserRole } from '../../../../selectors';
import { addCommentAsync } from '../../../../actions';
import { useServerRequest } from '../../../../hooks';
import { ROLE } from '../../../../constants';
import styles from './comments.module.css';

export const Comments = ({ comments, postId }) => {
	const dispatch = useDispatch();
	const [newComment, setNewComment] = useState('');
	const userId = useSelector(selectUserId);
	const userRole = useSelector(selectUserRole);
	const requestServer = useServerRequest();

	const onNewCommentAdd = (userId, postId, content) => {
		dispatch(addCommentAsync(requestServer, userId, postId, content));
		setNewComment('');
	};

	const isGuest = userRole === ROLE.GUEST;

	return (
		<div className={styles['comments']}>
			{!isGuest && (
				<div className={styles['new-comment']}>
					<textarea
						name="comment"
						className={styles['field']}
						value={newComment}
						placeholder="Комментарий.."
						onChange={({ target }) => {
							setNewComment(target.value);
						}}
					></textarea>
					<div onClick={() => onNewCommentAdd(userId, postId, newComment)}>
						<Icon id="paper-plane-o" />
					</div>
				</div>
			)}
			<div className={styles['comments-list']}>
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						postId={postId}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
					/>
				))}
			</div>
		</div>
	);
};
