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
    //GitHubSearch component
    case asyncLoadComponentsStatusActions.ACTION_ASYNC_LOAD_COMPONENT_GITHUBSEARCH:
      return {
        ...state,
        GitHubSearch: {
          componentStatus: 'loading',
          componentClass: null
        }
      };
    case asyncLoadComponentsStatusActions.ACTION_LOAD_COMPONENT_GITHUBSEARCH_SUCCESS:
      return {
        ...state,
        GitHubSearch: {
          componentStatus: 'loaded',
          componentClass: action.componentClass
        }
      };
    case asyncLoadComponentsStatusActions.ACTION_LOAD_COMPONENT_GITHUBSEARCH_FAILURE:
      return {
        ...state,
        GitHubSearch: {
          componentStatus: 'load-error',
          componentClass: null
        }
      };
    //StackOverflowSearch component
    case asyncLoadComponentsStatusActions.ACTION_ASYNC_LOAD_COMPONENT_STACKOVERFLOWSEARCH:
      return {
        ...state,
        StackOverflowSearch: {
          componentStatus: 'loading',
          componentClass: null
        }
      };
    case asyncLoadComponentsStatusActions.ACTION_LOAD_COMPONENT_STACKOVERFLOWSEARCH_SUCCESS:
      return {
        ...state,
        StackOverflowSearch: {
          componentStatus: 'loaded',
          componentClass: action.componentClass
        }
      };
    case asyncLoadComponentsStatusActions.ACTION_LOAD_COMPONENT_STACKOVERFLOWSEARCH_FAILURE:
      return {
        ...state,
        StackOverflowSearch: {
          componentStatus: 'load-error',
          componentClass: null
        }
      };
    //default
    default:
      return state;
  }
};

export default asyncLoadComponentsStatusReducer;