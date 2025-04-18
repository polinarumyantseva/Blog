import { ACTION_TYPE } from '../actions';

const initialState = {
	wasLogout: false,
	modal: {
		isOpen: false,
		text: '',
		onConfirm: () => {},
		onCancel: () => {},
	},
};

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT:
			return { ...state, wasLogout: true };

		case ACTION_TYPE.OPEN_MODAL:
			return {
				...state,
				modal: {
					...state,
					...action.payload,
					isOpen: true,
				},
			};

		case ACTION_TYPE.CLOSE_MODAL:
			return initialState;

		default:
			return state;
	}
};
