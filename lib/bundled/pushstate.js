(function(window,undefined){
   var History = window.History;
     History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
      var State = History.getState();
      if(State.data.timestamp in window.navigation_.timestamps){
          delete window.navigation_.timestamps[State.data.timestamp];
      }
      else{
          //window.location.reload();
      }
     });
 })(window);