import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../components';
import { Comment } from './components';
import { selectUserRole } from '../../../../selectors';
import { addCommentAsync } from '../../../../actions';
import { PROP_TYPE, ROLE } from '../../../../constants';
import styles from './comments.module.css';

export const Comments = ({ comments, postId }) => {
	const dispatch = useDispatch();
	const [newComment, setNewComment] = useState('');
	const userRole = useSelector(selectUserRole);

	const onNewCommentAdd = (postId, content) => {
		dispatch(addCommentAsync(postId, content));
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
					<div onClick={() => onNewCommentAdd(postId, newComment)}>
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

Comment.propTypes = {
	comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
	postId: PropTypes.string.isRequired,
};
