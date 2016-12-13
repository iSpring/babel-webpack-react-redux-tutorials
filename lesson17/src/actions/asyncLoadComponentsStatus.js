import GitHubSearchAsyncLoader from '../components/GitHubSearch/asyncLoader';
import StackOverflowSearchAsyncLoader from '../components/StackOverflowSearch/asyncLoader';

//--------------------------------------GitHubSearch component--------------------------------------
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
export const loadComponentGitHubSearchFailure = (error) => ({
  type: ACTION_LOAD_COMPONENT_GITHUBSEARCH_FAILURE,
  error
});


//-------------------------------------StackOverflowSearch component--------------------------------------
export const ACTION_ASYNC_LOAD_COMPONENT_STACKOVERFLOWSEARCH = "ACTION_ASYNC_LOAD_COMPONENT_STACKOVERFLOWSEARCH";
export const asyncLoadComponentStackOverflowSearch = () => {
  return (dispatch) => {
    dispatch({
      type: ACTION_ASYNC_LOAD_COMPONENT_STACKOVERFLOWSEARCH
    });
    StackOverflowSearchAsyncLoader().then(function(componentClass){
      dispatch(loadComponentStackOverflowSearchSuccess(componentClass));
    }, function(err){
      dispatch(loadComponentStackOverflowSearchFailure(err));
    });
  };
}

export const ACTION_LOAD_COMPONENT_STACKOVERFLOWSEARCH_SUCCESS = "ACTION_LOAD_COMPONENT_STACKOVERFLOWSEARCH_SUCCESS";
export const loadComponentStackOverflowSearchSuccess = (componentClass) => ({
  type: ACTION_LOAD_COMPONENT_STACKOVERFLOWSEARCH_SUCCESS,
  componentClass
});

export const ACTION_LOAD_COMPONENT_STACKOVERFLOWSEARCH_FAILURE = "ACTION_LOAD_COMPONENT_STACKOVERFLOWSEARCH_FAILURE";
export const loadComponentStackOverflowSearchFailure = (error) => ({
  type: ACTION_LOAD_COMPONENT_STACKOVERFLOWSEARCH_FAILURE,
  error
});