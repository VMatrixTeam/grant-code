window.refreshGrantCode = function() {
  var secret = window.location.hash.slice(2);
  var token = window.otplib.totp.generate(secret, { epoch: Date.now()+window.timeOffset });
  document.getElementById('grant-code').innerText = token;
}