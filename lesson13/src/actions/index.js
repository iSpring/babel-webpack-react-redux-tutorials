
export const ACTION_INPUT_CHANGE = 'ACTION_INPUT_CHANGE';
export const inputChange = (keyword) => ({
  type: ACTION_INPUT_CHANGE,
  keyword
});


export const ACTION_FETCH_DATA = 'ACTION_FETCH_DATA';
export const fetchData = (keyword) => {
	return (dispatch) => {
		const actionFetchData = {
			type: ACTION_FETCH_DATA
		};
		dispatch(actionFetchData);
		const url = `https://api.github.com/search/repositories?q=${keyword}&sort=stars&order=desc`;
		fetch(url).then((response)=>{
			return response.json().then((data)=>{
				const items = data.items.slice(0, 100);
				const actionFetchSuccess = fetchSuccess(items);
				dispatch(actionFetchSuccess);
			});
		}, ()=>{
			const actionFetchFailure = fetchFailure();
			dispatch(actionFetchFailure);
		})
	};
}


export const ACTION_FETCH_SUCCESS = 'ACTION_FETCH_SUCCESS';
export const fetchSuccess = (items) => ({
	type: ACTION_FETCH_SUCCESS,
	items
});

export const ACTION_FETCH_FAILURE = 'ACTION_FETCH_FAILURE';
export const fetchFailure = () => ({
	type: ACTION_FETCH_FAILURE,
	items: []
});