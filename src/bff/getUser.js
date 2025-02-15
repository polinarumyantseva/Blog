import { getUsers } from './getUsers';

export const getUser = async (loginForFind) => {
	const users = await getUsers();

	return users.find((user) => loginForFind === user.login);
};
