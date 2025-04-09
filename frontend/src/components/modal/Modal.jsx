import { useSelector } from 'react-redux';
import { Button } from '../button/Button';
import { selectModalIsOpen, selectModalText, selectModalOnCancel, selectModalOnConfirm } from '../../selectors';
import styles from './modal.module.css';

export const Modal = () => {
	const isOpen = useSelector(selectModalIsOpen);
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);

	if (!isOpen) {
		return;
	}

	return (
		<div className={styles['modal']}>
			<div className={styles['overlay']}></div>
			<div className={styles['box']}>
				<h3>{text}</h3>
				<div className={styles['buttons']}>
					<Button className={styles['modal-button']} onClick={onConfirm}>
						Да
					</Button>
					<Button className={styles['modal-button']} onClick={onCancel}>
						Отмена
					</Button>
				</div>
			</div>
		</div>
	);
};
