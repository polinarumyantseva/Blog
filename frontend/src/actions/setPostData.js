import { ACTION_TYPE } from './actionType';

export const setPostData = (postData) => ({
	type: ACTION_TYPE.SET_POST_DATA,
	payload: postData,
});
