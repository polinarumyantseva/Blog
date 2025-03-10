import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useServerRequest } from '../../../../hooks';
import { openModal, CLOSE_MODAL, removePostAsync } from '../../../../actions';
import { Icon } from '../../../../components';
import styles from './specialPanel.module.css';

export const SpecialPanel = ({ id, publishedAt, editButton }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				onConfirm: () => {
					dispatch(removePostAsync(requestServer, id)).then(() => navigate('/'));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={styles['special-panel']}>
			<div className={styles['published-at']}>
				<Icon className="panel-icon" id="calendar-o" />
				{publishedAt}
			</div>
			<div className={styles['buttons-panel']}>
				{editButton}
				<div onClick={() => onPostRemove(id)}>
					<Icon id="trash-o" />
				</div>
			</div>
		</div>
	);
};
