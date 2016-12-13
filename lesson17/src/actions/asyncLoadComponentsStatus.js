import GitHubSearchAsyncLoader from '../components/GitHubSearch/asyncLoader';

export const ACTION_ASYNC_LOAD_COMPONENT_GITHUBSEARCH = "ACTION_ASYNC_LOAD_COMPONENT_GITHUBSEARCH";
export const asyncLoadComponentGitHubSearch = () => {
  return (dispatch) => {
    dispatch({
      type: ACTION_ASYNC_LOAD_COMPONENT_GITHUBSEARCH
    });
    GitHubSearchAsyncLoader().then(function(componentClass){
      dispatch(loadComponentGitHubSearchSuccess(componentClass));
    }, function(err){
      dispatch(loadComponentGitHubSearchFailure(err));
    });
  };
}

export const ACTION_LOAD_COMPONENT_GITHUBSEARCH_SUCCESS = "ACTION_LOAD_COMPONENT_GITHUBSEARCH_SUCCESS";
export const loadComponentGitHubSearchSuccess = (componentClass) => ({
  type: ACTION_LOAD_COMPONENT_GITHUBSEARCH_SUCCESS,
  componentClass
});

export const ACTION_LOAD_COMPONENT_GITHUBSEARCH_FAILURE = "ACTION_LOAD_COMPONENT_GITHUBSEARCH_FAILURE";
export const loadComponentGitHubSearchFailure = (err) => ({
  type: ACTION_LOAD_COMPONENT_GITHUBSEARCH_FAILURE,
  error: err
});
