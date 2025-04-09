import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { Error } from '../error/Error';
import { ERROR } from '../../constants';
import { PROP_TYPE } from '../../constants';
import { checkAccess } from '../../utils';

export const PrivateContent = ({ children, access, serverError }) => {
	const userRole = useSelector(selectUserRole);

	const accessError = checkAccess(access, userRole) ? null : ERROR.ACCESS_DENIED;
	const error = serverError || accessError;

	return error ? <Error error={error} /> : children;
};

PrivateContent.propTypes = {
	children: PropTypes.node.isRequired,
	access: PropTypes.arrayOf(PROP_TYPE.ROLE_ID).isRequired,
	serverError: PROP_TYPE.ERROR,
};
