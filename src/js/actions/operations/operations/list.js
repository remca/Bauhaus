import api from 'js/remote-api/operations-api';
import * as A from 'js/actions/constants';
import { sortArray } from 'js/utils/array-utils';

const sortByLabel = sortArray('label');

export default () => dispatch => {
	dispatch({
		type: A.LOAD_OPERATIONS_OPERATIONS_LIST,
		payload: {},
	});
	return api.getOperationsList().then(
		results =>
			dispatch({
				type: A.LOAD_OPERATIONS_OPERATIONS_LIST_SUCCESS,
				payload: { results: sortByLabel(results) },
			}),
		err =>
			dispatch({
				type: A.LOAD_OPERATIONS_OPERATIONS_LIST_FAILURE,
				payload: { err },
			})
	);
};
