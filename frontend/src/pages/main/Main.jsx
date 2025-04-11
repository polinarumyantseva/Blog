import { useEffect, useState, useMemo } from 'react';
import { PostCard, Pagination, Search } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import { debounce } from './utils';
import styles from './main.module.css';
import { request } from '../../utils';

export const Main = () => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');

	useEffect(() => {
		request(`/api/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`).then(
			({ data: { posts, lastPage } }) => {
				setPosts(posts);
				setLastPage(lastPage);
			},
		);
	}, [page, shouldSearch]);

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
					{posts.map(({ id, title, publishedAt, imageUrl, comments }) => (
						<PostCard
							key={id}
							id={id}
							title={title}
							publishedAt={publishedAt}
							imageUrl={imageUrl}
							commentsCount={comments.length}
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
