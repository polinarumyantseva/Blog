import { Logo, ControlPanel } from './components';
import styles from './header.module.css';

export const Header = () => {
	return (
		<header className={styles.header}>
			<Logo />
			<div className={styles.description}>
				Веб-технологии
				<br />
				Написание кода
				<br />
				Разбор ошибок
			</div>
			<ControlPanel />
		</header>
	);
};
