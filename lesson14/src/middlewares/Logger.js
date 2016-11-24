
const logger = store => next => action => {
  console.log("before dispatch action, action:", action, " state:", store.getState());
  //调用middleware链中下一个middleware的dispatch
  let returnValue = next(action);
  console.log("after dispatch action, state:", store.getState());
  return returnValue;
}

// 等价于
// function logger(store){
//   return function(next){
//     return function(action){
//       console.log("before dispatch action, action:", action, " state:", store.getState());
//       //调用middleware链中下一个middleware的dispatch
//       let returnValue = next(action);
//       console.log("after dispatch action, state:", store.getState());
//       return returnValue;
//     }
//   }
// }

export default logger;