import { deleteUser } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const removeUser = async (hash, userId) => {
	const accessRole = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRole);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await deleteUser(userId);

	return {
		error: null,
		res: true,
	};
};
