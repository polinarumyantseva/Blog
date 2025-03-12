import { useEffect, useState, useMemo } from 'react';
import { useServerRequest } from '../../hooks';
import { PostCard, Pagination, Search } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import { getLastPageFromLinks, debounce } from './utils';
import styles from './main.module.css';

export const Main = () => {
	const requestServer = useServerRequest();
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');

	useEffect(() => {
		requestServer('fetchPosts', searchPhrase, page, PAGINATION_LIMIT).then(({ res: { posts, links } }) => {
			setPosts(posts);
			setLastPage(getLastPageFromLinks(links));
		});
	}, [requestServer, page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={styles['posts']}>
			<Search searchPhrase={searchPhrase} onChange={onSearch} />
			{posts.length ? (
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
			) : (
				<div className={styles['no-posts-found']}>Статьи не найдены</div>
			)}
			{lastPage > 1 && posts.length > 0 && <Pagination page={page} lastPage={lastPage} setPage={setPage} />}
		</div>
	);
};
