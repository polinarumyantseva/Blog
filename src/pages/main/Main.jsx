import { useEffect, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { PostCard, Pagination } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import { getLastPageFromLinks } from './utils';
import styles from './main.module.css';

export const Main = () => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchPosts', page, PAGINATION_LIMIT).then(({ res: { posts, links } }) => {
			setPosts(posts);
			setLastPage(getLastPageFromLinks(links));
		});
	}, [requestServer, page]);

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
			{lastPage > 1 && <Pagination page={page} lastPage={lastPage} setPage={setPage} />}
		</div>
	);
};
