window.refreshGrantCode = function() {
  var secret = window.location.hash.slice(2);
  window.otplib.totp.options = { epoch: Date.now()+window.timeOffset };
  var token = window.otplib.totp.generate(secret);
  document.getElementById('grant-code').innerText = token;
}