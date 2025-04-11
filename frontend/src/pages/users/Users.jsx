import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UserRow } from './components';
import { H2, PrivateContent } from '../../components';
import { selectUserRole } from '../../selectors';
import { checkAccess, request } from '../../utils';
import { ROLE } from '../../constants';
import styles from './users.module.css';

export const Users = () => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');
	const [setShouldUpdateUserList, setSetShouldUpdateUserList] = useState(false);
	const userRole = useSelector(selectUserRole);

	useEffect(() => {
		if ((!checkAccess([ROLE.ADMIN]), userRole)) {
			return;
		}

		Promise.all([request('/api/users'), request('/api/users/roles')]).then(([usersRes, rolesRes]) => {
			if (usersRes.error || rolesRes.error) {
				setErrorMessage(usersRes.error || rolesRes.error);
				return;
			}

			setUsers(usersRes.data);
			setRoles(rolesRes.data);
		});
	}, [setShouldUpdateUserList, userRole]);

	const onUserRemove = (userId) => {
		if ((!checkAccess([ROLE.ADMIN]), userRole)) {
			return;
		}

		request(`/api/users/${userId}`, 'DELETE').then(() => {
			setSetShouldUpdateUserList(!setShouldUpdateUserList);
		});
	};

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
			<div className={styles['users']}>
				<H2>Пользователи</H2>
				<div className={styles['users-list']}>
					<div className={styles['table-row']}>
						<div className={styles['login-column']}>Логин</div>
						<div className={styles['registered-at-column']}>Дата регистрации</div>
						<div className={styles['role-column']}>Роль</div>
					</div>
					{users.map(({ id, login, registedAt, roleId }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							registedAt={registedAt}
							roleId={roleId}
							roles={roles.filter((id) => id !== ROLE.GUEST)}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</div>
			</div>
		</PrivateContent>
	);
};
