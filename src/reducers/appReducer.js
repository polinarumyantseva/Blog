import { ACTION_TYPE } from '../actions';

const initialState = {
	wasLogout: false,
};

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT:
			return { ...state, wasLogout: true };
		default:
			return state;
	}
};
