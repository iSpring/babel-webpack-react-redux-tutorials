import * as asyncLoadComponentsStatusActions from '../actions/asyncLoadComponentsStatus';

const defaultState = {
  GitHubSearch: {
    componentStatus: 'not-loaded',//loading, loaded, load-error
    componentClass: null
  },
  StackOverflowSearch: {
    componentStatus: 'not-loaded',//loading, loaded, load-error
    componentClass: null
  }
};

const asyncLoadComponentsStatusReducer = (state = defaultState, action) => {
  switch(action.type){
    case asyncLoadComponentsStatusActions.ACTION_ASYNC_LOAD_COMPONENT_GITHUBSEARCH:
      return {
        ...defaultState,
        GitHubSearch: {
          componentStatus: 'loading',
          componentClass: null
        }
      };
    case asyncLoadComponentsStatusActions.ACTION_LOAD_COMPONENT_GITHUBSEARCH_SUCCESS:
      return {
        ...defaultState,
        GitHubSearch: {
          componentStatus: 'loaded',
          componentClass: action.componentClass
        }
      };
    case asyncLoadComponentsStatusActions.ACTION_LOAD_COMPONENT_GITHUBSEARCH_FAILURE:
      return {
        ...defaultState,
        GitHubSearch: {
          componentStatus: 'load-error',
          componentClass: null
        }
      };
    default:
      return state;
  }
};

export default asyncLoadComponentsStatusReducer;