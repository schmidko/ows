import React from 'react';
import axios from 'axios';

function fetchReducer(state, action) {
	switch (action.type) {
		case 'STARTED':
			return {
				...state,
				status: 'loading',
				error: null,
			};

		case 'SUCCESS':
			return {
				...state,
				response: action.response,
				status: 'success',
				error: null,
			};

		case 'ERROR':
			return {
				...state,
				status: 'error',
				error: action.error,
			};

		default: {
			throw new Error(`Unsupported action type: ${type}`);
		}
	}
}

function useFetch(options) {
	const initialState = {
		response: null,
		status: 'idle',
		error: null,
	};
	const [state, dispatch] = React.useReducer(fetchReducer, initialState);

	const fetchData = async () => {
		try {
			dispatch({type: 'STARTED'});
			const response = await axios(options);
			dispatch({type: 'SUCCESS', response});
		} catch (error) {
			console.log(error)
			dispatch({type: 'ERROR', error});
		}
	};

	React.useEffect(() => {
		fetchData().then();
	},[]);

	const {status} = state;

	return {
		isLoading: status === 'idle' || status === 'loading',
		isSuccess: status === 'success',
		isError: status === 'error',
		...state,
	};
}

export default useFetch;
