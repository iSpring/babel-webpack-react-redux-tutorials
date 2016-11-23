
export const ACTION_UPDATE_NUMBER1 = "ACTION_UPDATE_NUMBER1";

export const updateNumber1 = (number1) => ({
  type: ACTION_UPDATE_NUMBER1,
  number1
});



export const ACTION_UPDATE_NUMBER2 = "ACTION_UPDATE_NUMBER2";

export const updateNumber2 = (number2) => ({
  type: ACTION_UPDATE_NUMBER2,
  number2
});



export const ACTION_UPDATE_OPERATOR = "ACTION_UPDATE_OPERATOR";

export const updateOperator = (isAddOperator) => ({
  type: ACTION_UPDATE_OPERATOR,
  isAddOperator
});