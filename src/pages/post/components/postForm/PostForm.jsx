import { useRef, useState, useLayoutEffect } from 'react';
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

	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titleValue, setTitleValue] = useState(title);
	const contentRef = useRef(null);

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitleValue(title);
	}, [imageUrl, title]);

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(requestServer, { id, imageUrl: imageUrlValue, title: titleValue, content: newContent }),
		).then(({ id }) => navigate(`/post/${id}`));
	};

	const onImageChange = ({ target }) => {
		setImageUrlValue(target.value);
	};
	const onTitleChange = ({ target }) => {
		setTitleValue(target.value);
	};

	return (
		<div className={styles['post-content']}>
			<Input value={imageUrlValue} placeholder="Изображение..." onChange={onImageChange} />
			<Input value={titleValue} placeholder="Заголовок..." onChange={onTitleChange} />
			<SpecialPanel
				id={id}
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
