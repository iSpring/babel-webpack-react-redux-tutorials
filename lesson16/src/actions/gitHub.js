
export const ACTION_GITHUB_INPUT_CHANGE = 'ACTION_GITHUB_INPUT_CHANGE';
export const gitHubInputChange = (keyword) => ({
  type: ACTION_GITHUB_INPUT_CHANGE,
  keyword
});


export const ACTION_GITHUB_FETCH_DATA = 'ACTION_GITHUB_FETCH_DATA';
export const gitHubFetchData = (keyword) => {
	return (dispatch) => {
		const actionFetchData = {
			type: ACTION_GITHUB_FETCH_DATA
		};
		dispatch(actionFetchData);
		const url = `https://api.github.com/search/repositories?q=${keyword}&sort=stars&order=desc`;
		fetch(url).then((response)=>{
			return response.json().then((data)=>{
				const items = data.items.slice(0, 100);
				const actionFetchSuccess = gitHubFetchSuccess(items);
				dispatch(actionFetchSuccess);
			});
		}, ()=>{
			const actionFetchFailure = gitHubFetchFailure();
			dispatch(actionFetchFailure);
		})
	};
};


export const ACTION_GITHUB_FETCH_SUCCESS = 'ACTION_GITHUB_FETCH_SUCCESS';
export const gitHubFetchSuccess = (items) => ({
	type: ACTION_GITHUB_FETCH_SUCCESS,
	items
});

export const ACTION_GITHUB_FETCH_FAILURE = 'ACTION_GITHUB_FETCH_FAILURE';
export const gitHubFetchFailure = () => ({
	type: ACTION_GITHUB_FETCH_FAILURE,
	items: []
});