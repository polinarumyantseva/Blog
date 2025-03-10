import { deletePost, getComments, deleteComment } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const removePost = async (hash, postId) => {
	const accessRole = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRole);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await deletePost(postId);

	const comments = await getComments(postId);

	await Promise.all(comments.map(({ id: commentId }) => deleteComment(commentId)));

	return {
		error: null,
		res: true,
	};
};
