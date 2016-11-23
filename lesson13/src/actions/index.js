
export const ACTION_INPUT_CHANGE = 'ACTION_INPUT_CHANGE';

export const inputChange = (keyword) => ({
  type: ACTION_INPUT_CHANGE,
  keyword
});



export const ACTION_SEARCH = 'ACTION_SEARCH';

export const search = (keyword) => ({
  type: ACTION_SEARCH,
  keyword
});