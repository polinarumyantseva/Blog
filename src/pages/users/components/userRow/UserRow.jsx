import { useState } from 'react';
import { Icon } from '../../../../components';
import { useServerRequest } from '../../../../hooks';
import styles from './userRow.module.css';

export const UserRow = ({ id, login, registedAt, roleId: userRoleId, roles, onUserRemove }) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};

	const requestServer = useServerRequest();

	const onRoleSave = (userId, newUserRoleId) => {
		requestServer('updateUserRole', userId, newUserRoleId).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};

	const isSaveButtonDisabled = selectedRoleId === initialRoleId;

	return (
		<div className={styles['table-row']}>
			<div className={styles['user-data']}>
				<div className={styles['login-column']}>{login}</div>
				<div className={styles['registered-at-column']}>{registedAt}</div>
				<div className={styles['role-column']}>
					<select value={selectedRoleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>
					<div className={styles['icon-save']} onClick={() => onRoleSave(id, selectedRoleId)}>
						<Icon className="table-icon" id="floppy-o" disabled={isSaveButtonDisabled} />
					</div>
				</div>
			</div>
			<div className={styles['icon-remove']} onClick={onUserRemove}>
				<Icon className="table-icon" id="trash-o" />
			</div>
		</div>
	);
};
