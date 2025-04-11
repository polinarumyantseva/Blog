import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Button } from '../../..';
import { ROLE } from '../../../../constants';
import { selectUserRole, selectLogin } from '../../../../selectors';
import { logout } from '../../../../actions';
import { checkAccess } from '../../../../utils';
import styles from './controlPanel.module.css';

export const ControlPanel = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectLogin);

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
	};

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div className="">
			<div className={styles['right-aligned']}>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/login">Войти</Link>
					</Button>
				) : (
					<>
						<span className={styles['user-name']}>{login}</span>
						<div className={styles['icon-logout']} onClick={onLogout}>
							<Icon className="control-panel-icon" id="sign-out" />
						</div>
					</>
				)}
			</div>
			<div className={styles['right-aligned']}>
				<div className={styles['icon-back']} onClick={() => navigate(-1)}>
					<Icon className="control-panel-icon" id="backward" />
				</div>
				{isAdmin && (
					<>
						<Link to="/post">
							<Icon className="control-panel-icon" id="file-text-o" />
						</Link>
						<Link to="/users">
							<Icon className="control-panel-icon" id="users" />
						</Link>
					</>
				)}
			</div>
		</div>
	);
};
