import { getPost, getComments, deleteComment } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const removePostComment = async (hash, postId, id) => {
	const accessRole = [ROLE.ADMIN, ROLE.MODERATOR];

	const access = await sessions.access(hash, accessRole);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await deleteComment(id);

	const post = await getPost(postId);
	const comments = await getComments(postId);

	return {
		error: null,
		res: {
			...post,
			comments,
		},
	};
};
