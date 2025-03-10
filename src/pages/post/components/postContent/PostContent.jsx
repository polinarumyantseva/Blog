import { useNavigate } from 'react-router-dom';
import { H2, Icon } from '../../../../components';
import { SpecialPanel } from '../specialPanel/SpecialPanel';
import styles from './postContent.module.css';

export const PostContent = ({ post: { id, title, content, publishedAt, imageUrl } }) => {
	const navigate = useNavigate();

	return (
		<div className={styles['post-content']}>
			<img className={styles['post-img']} src={imageUrl} alt={title} />
			<H2>{title}</H2>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				editButton={
					<div onClick={() => navigate(`/post/${id}/edit`)}>
						<Icon id="pencil-square-o" />
					</div>
				}
			/>
			<div className={styles['post-text']}>{content}</div>
		</div>
	);
};
