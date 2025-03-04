import { ROLE } from '../constants';
import { getRoles } from '../api';
import { sessions } from '../sessions';

export const fetchRoles = async (userSession) => {
	const accessRole = [ROLE.ADMIN];

	if (!sessions.access(userSession, accessRole)) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const roles = await getRoles();

	return {
		error: null,
		res: roles,
	};
};
