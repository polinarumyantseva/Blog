import { transformComments } from '../transformers';

export const getComments = async (postId) =>
	fetch(`http://localhost:3005/comments?post_id=${postId}`)
		.then((loadedComments) => loadedComments.json())
		.then((loadedComments) => loadedComments && loadedComments.map(transformComments));
