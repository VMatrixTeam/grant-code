window.refreshGrantCode = function() {
  var secret = window.location.hash.slice(2);
  var token = window.otplib.totp.generate(secret);
  document.getElementById('grant-code').innerText = token;
}