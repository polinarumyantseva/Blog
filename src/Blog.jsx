import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Error, Header, Footer, Modal } from './components';
import { setUser } from './actions';
import { Authorization, Registration, Users, Post, Main } from './pages';
import { ERROR } from './constants';
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
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<Post />} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="/post/:id/edit" element={<Post />} />
					<Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
				</Routes>
			</div>
			<Footer />
			<Modal />
		</div>
	);
};
