// Generated by IcedCoffeeScript 1.7.1-f
(function() {
  var INTERVAL_MS, main, startTimer;

  INTERVAL_MS = 60 * 60 * 1000;

  startTimer = function() {
    return setInterval((function() {
      return fetchBackgroundImage();
    }), INTERVAL_MS);
  };

  main = function() {
    return startTimer();
  };

  main();

}).call(this);
