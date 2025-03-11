import { useEffect, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { PostCard } from './components';
import styles from './main.module.css';

export const Main = () => {
	const [posts, setPosts] = useState([]);

	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchPosts').then((posts) => {
			setPosts(posts.res);
		});
	}, [requestServer]);

	return (
		<div className={styles['posts']}>
			<div className={styles['post-list']}>
				{posts.map(({ id, title, publishedAt, imageUrl, commentsCount }) => (
					<PostCard
						key={id}
						id={id}
						title={title}
						publishedAt={publishedAt}
						imageUrl={imageUrl}
						commentsCount={commentsCount}
					/>
				))}
			</div>
		</div>
	);
};
