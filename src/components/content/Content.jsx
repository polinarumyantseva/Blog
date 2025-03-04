import { H2 } from '../h2/H2';

export const Content = ({ children, error }) =>
	error ? (
		<>
			<H2>Ошибка</H2>
			<div>{error}</div>
		</>
	) : (
		children
	);
