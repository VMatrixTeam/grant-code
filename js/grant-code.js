window.refreshGrantCode = function() {
  var secret = window.location.hash.slice(2).toUpperCase();
  window.otplib.authenticator.options = { epoch: Date.now()+window.timeOffset };
  var token = window.otplib.authenticator.generate(secret);
  document.getElementById('grant-code').innerText = token;
}