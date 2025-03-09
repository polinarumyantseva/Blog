import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input, Icon } from '../../../../components';
import { SpecialPanel } from '../specialPanel/SpecialPanel';
import { useServerRequest } from '../../../../hooks';
import { savePostAsync } from '../../../../actions';
import { sanitizeContent } from './utils';
import styles from './postForm.module.css';

export const PostForm = ({ post: { id, title, content, publishedAt, imageUrl } }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();

	const imageRef = useRef(null);
	const titleRef = useRef(null);
	const contentRef = useRef(null);

	const onSave = () => {
		const newImageUrl = imageRef.current.value;
		const newTitle = titleRef.current.value;
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(requestServer, { id, imageUrl: newImageUrl, title: newTitle, content: newContent }),
		).then(() => navigate(`/post/${id}`));
	};

	return (
		<div className={styles['post-content']}>
			<Input ref={imageRef} defaultValue={imageUrl} placeholder="Изображение" />
			<Input ref={titleRef} defaultValue={title} placeholder="Заголовок" />
			<SpecialPanel
				publishedAt={publishedAt}
				editButton={
					<div onClick={onSave}>
						<Icon id="floppy-o" />
					</div>
				}
			/>
			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className={styles['post-text']}
			>
				{content}
			</div>
		</div>
	);
};
