import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { Comments, PostContent } from './components';
import { loadPostAsync } from '../../actions';
import { selectPost } from '../../selectors';
import styles from './post.module.css';

export const Post = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();
	const post = useSelector(selectPost);

	useEffect(() => {
		dispatch(loadPostAsync(requestServer, params.id));
	}, []);

	return (
		<div className={styles.post}>
			<PostContent post={post} />
			<Comments comments={post.comments} postId={post.id} />
		</div>
	);
};
