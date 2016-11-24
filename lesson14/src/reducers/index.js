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
      return {
        gitHub: {
          ...gitHub,
          keyword: action.keyword
        },
        stackOverflow: {
          ...stackOverflow
        }
      };
    case gitHubActions.ACTION_GITHUB_FETCH_DATA:
      return {
        gitHub: {
          ...gitHub,
          loading: true,
          items: []
        },
        stackOverflow: {
          ...stackOverflow
        }
      };
    case gitHubActions.ACTION_GITHUB_FETCH_SUCCESS:
      return {
        gitHub: {
          ...gitHub,
          loading: false,
          items: action.items
        },
        stackOverflow: {
          ...stackOverflow
        }
      };
    case gitHubActions.ACTION_GITHUB_FETCH_FAILURE:
      return {
        gitHub: {
          ...gitHub,
          loading: false,
          items: action.items
        },
        stackOverflow: {
          ...stackOverflow
        }
      };

    //StackOverflow actions
    case stackOverflowActions.ACTION_STACKOVERFLOW_INPUT_CHANGE:
      return {
        gitHub: {
          ...gitHub
        },
        stackOverflow: {
          ...stackOverflow,
          keyword: action.keyword
        }
      };
    case stackOverflowActions.ACTION_STACKOVERFLOW_FETCH_DATA:
      return {
        gitHub: {
          ...gitHub
        },
        stackOverflow: {
          ...stackOverflow,
          loading: true,
          items: []
        }
      };
    case stackOverflowActions.ACTION_STACKOVERFLOW_FETCH_SUCCESS:
      return {
        gitHub: {
          ...gitHub
        },
        stackOverflow: {
          ...stackOverflow,
          loading: false,
          items: action.items
        }
      };
    case stackOverflowActions.ACTION_STACKOVERFLOW_FETCH_FAILURE:
      return {
        gitHub: {
          ...gitHub
        },
        stackOverflow: {
          ...stackOverflow,
          loading: false,
          items: []
        }
      };

    //default
    default:
      return state;
  }
};

export default reducer;