import { ROLE } from '../constants';
import { getRoles } from '../api';
import { sessions } from '../sessions';

export const fetchRoles = async (hash) => {
	const accessRole = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRole);
	if (!access) {
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
