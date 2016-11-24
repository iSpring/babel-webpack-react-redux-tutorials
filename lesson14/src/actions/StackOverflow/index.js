
export const ACTION_STACKOVERFLOW_INPUT_CHANGE = 'ACTION_STACKOVERFLOW_INPUT_CHANGE';
export const stackOverflowInputChange = (keyword) => ({
  type: ACTION_STACKOVERFLOW_INPUT_CHANGE,
  keyword
});


export const ACTION_STACKOVERFLOW_FETCH_DATA = 'ACTION_STACKOVERFLOW_FETCH_DATA';
export const stackOverflowFetchData = (keyword) => {
	return (dispatch) => {
		const actionFetchData = {
			type: ACTION_STACKOVERFLOW_FETCH_DATA
		};
		dispatch(actionFetchData);
		const url = `http://api.stackexchange.com/2.2/questions?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=votes&tagged={keyword}&filter=default`;
		fetch(url).then((response)=>{
			return response.json().then((data)=>{
				const items = data.items.slice(0, 100);
				const actionFetchSuccess = stackOverflowFetchSuccess(items);
				dispatch(actionFetchSuccess);
			});
		}, ()=>{
			const actionFetchFailure = stackOverflowFetchFailure();
			dispatch(actionFetchFailure);
		})
	};
}


export const ACTION_STACKOVERFLOW_FETCH_SUCCESS = 'ACTION_STACKOVERFLOW_FETCH_SUCCESS';
export const stackOverflowFetchSuccess = (items) => ({
	type: ACTION_STACKOVERFLOW_FETCH_SUCCESS,
	items
});

export const ACTION_STACKOVERFLOW_FETCH_FAILURE = 'ACTION_STACKOVERFLOW_FETCH_FAILURE';
export const stackOverflowFetchFailure = () => ({
	type: ACTION_STACKOVERFLOW_FETCH_FAILURE,
	items: []
});