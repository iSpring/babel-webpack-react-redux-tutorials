if(process.env.NODE_ENV === 'production'){
  //for production
  exports.max = function(){
    return Math.max.apply(null, arguments);
  };

  exports.min = function(){
    return Math.min.apply(null, arguments);
  };
}else{
  //for development
  exports.max = function(){
    var result = Infinity;
    for(var i = 0; i < arguments.length; i++){
      if(arguments[i] < result){
        result = arguments[i];
      }
    }
    return result;
  };

  exports.min = function(){
    var result = -Infinity;
    for(var i = 0; i < arguments.length; i++){
      if(arguments[i] > result){
        result = arguments[i];
      }
    }
    return result;
  };
}

if(__DEV__ > 10){
  console.log("development environment");
}else{
  console.log("production environment");
}

