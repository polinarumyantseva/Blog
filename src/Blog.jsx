import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Header, Footer, Modal } from './components';
import { setUser } from './actions';
import { Authorization, Registration, Users, Post } from './pages';
import styles from './app.module.css';

export const Blog = () => {
	const dispatch = useDispatch();
	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');
		if (!currentUserDataJSON) {
			return;
		}
		const currrentUserData = JSON.parse(currentUserDataJSON);
		dispatch(
			setUser({
				...currrentUserData,
				roleId: Number(currrentUserData.roleId),
			}),
		);
	}, []);

	return (
		<div className={styles.app}>
			<Header />
			<div className={styles.content}>
				<Routes>
					<Route path="/" element={<div>Главная страница</div>} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<div>Новая статья</div>} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="/post/:id/edit" element={<Post />} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</div>
			<Footer />
			<Modal />
		</div>
	);
};
