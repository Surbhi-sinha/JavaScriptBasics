define(function(require){
      var myteam = require("./team");
      var mylogger = require("./player");
      alert("Player name :" + myteam.player);
      mylogger.myfunc();
})