import { getUsers } from './getUsers';

export const getUser = async (loginForFind) =>
	fetch(`http://localhost:3005/users?login=${loginForFind}`)
		.then((loadedUsers) => loadedUsers.json())
		.then(([user]) => user);
