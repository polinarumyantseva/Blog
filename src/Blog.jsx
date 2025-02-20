import { Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components';
import styles from './app.module.css';

export const Blog = () => {
	return (
		<div className={styles.app}>
			<Header />
			<div className={styles.content}>
				<h2 className={styles.title}>Контент страницы</h2>
				<Routes>
					<Route path="/" element={<div>Главная страница</div>} />
					<Route path="/login" element={<div>Авторизация</div>} />
					<Route path="/register" element={<div>Регистрация</div>} />
					<Route path="/users" element={<div>Пользователи</div>} />
					<Route path="/post" element={<div>Новая статья</div>} />
					<Route path="/post/:postId" element={<div>Статья</div>} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
};
