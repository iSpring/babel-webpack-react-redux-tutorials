import * as gitHubActions from '../actions/GitHub';
import * as stackOverflowActions from '../actions/StackOverflow';

const defaultState = {
  gitHub: {
    keyword: '',
    loading: false,
    items: []
  },
  stackOverflow: {
    keyword: '',
    loading: false,
    items: []
  }
};

const reducer = (state = defaultState, action) => {
  const {gitHub, stackOverflow} = state;

  switch(action.type){
    //GitHub actions
    case gitHubActions.ACTION_GITHUB_INPUT_CHANGE:
      return Object.assign({}, state, {
        gitHub: {
          keyword: action.keyword
        }
      });
    case gitHubActions.ACTION_GITHUB_FETCH_DATA:
      return Object.assign({}, state, {
        loading: true,
        items: []
      });
    case gitHubActions.ACTION_GITHUB_FETCH_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        items: action.items
      });
    case gitHubActions.ACTION_GITHUB_FETCH_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        items: action.items
      });

    //StackOverflow actions
    case stackOverflowActions.ACTION_STACKOVERFLOW_INPUT_CHANGE:
      return Object.assign({}, state, {
        keyword: action.keyword
      });
    case stackOverflowActions.ACTION_STACKOVERFLOW_FETCH_DATA:
      return Object.assign({}, state, {
        loading: true,
        items: []
      });
    case stackOverflowActions.ACTION_STACKOVERFLOW_FETCH_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        items: action.items
      });
    case stackOverflowActions.ACTION_STACKOVERFLOW_FETCH_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        items: []
      });

    //default
    default:
      return state;
  }
};

export default reducer;