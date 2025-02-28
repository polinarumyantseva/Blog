import { addUser } from './addUser';
import { getUser } from './getUser';
import { sessions } from './sessions';
// import { createSession } from './createSession';

export const server = {
	async logout(session) {
		sessions.remove(session);
	},
	async autorize(authLogin, authPassword) {
		const user = await getUser(authLogin);

		if (!user) {
			return {
				error: 'Такой пользователь не найден',
				res: null,
			};
		}

		if (authPassword !== user.password) {
			return {
				error: 'Пароль неверный',
				res: null,
			};
		}

		return {
			error: null,
			res: {
				id: user.id,
				login: user.login,
				roleId: user.role_id,
				session: sessions.create(user),
			},
		};
	},
	async register(regLogin, regPassword) {
		const existedUser = await getUser(regLogin);

		if (existedUser) {
			return {
				error: 'Такой логин уже занят',
				res: null,
			};
		}

		const user = await addUser(regLogin, regPassword);

		return {
			error: null,
			res: {
				id: user.id,
				login: user.login,
				roleId: user.role_id,
				session: sessions.create(user),
			},
		};
	},
};
