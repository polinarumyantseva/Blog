import { request } from '../utils';
import { setPostData } from './setPostData';

export const loadPostAsync = (postId) => (dispatch) =>
	request(`/api/posts/${postId}`).then((postData) => {
		if (postData.data) {
			dispatch(setPostData(postData.data));
		}
		return postData;
	});
