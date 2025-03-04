import { transformUser } from '../transformers';

export const getUser = async (loginForFind) =>
	fetch(`http://localhost:3005/users?login=${loginForFind}`)
		.then((loadedUser) => loadedUser.json())
		.then(([loadedUser]) => loadedUser && transformUser(loadedUser));
