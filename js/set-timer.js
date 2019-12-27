window.updateExpireTime = function(count) {
  var restTime = window.constants.MAX_EXPIRE_TIME() - count;
  document.getElementById('expire-time-minute').innerText = Math.floor(restTime/60);
  document.getElementById('expire-time-second').innerText = restTime%60;
  window.refreshGrantCode();
  window.renderDashboard(1-count/window.constants.MAX_EXPIRE_TIME());
}

window.setTimer = function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', window.location, true);
  xhr.onload = function() {
    var epoch = new Date(xhr.getResponseHeader('date')).getTime();
    window.timeOffset = epoch - Date.now();
    var count = Math.floor((epoch % 30000)/1000+0.5);
    window.updateExpireTime(count);
    window.setInterval(function() {
      count++;
      if (count === window.constants.MAX_EXPIRE_TIME()) {
        count = 0;
        window.refreshGrantCode();
      }
      window.updateExpireTime(count);
    }, 1000);
  }
  xhr.send(null);
};