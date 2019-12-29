window.renderDashboard = function(restTimeProp) {
  var canvas = document.getElementById('time-dashboard');
  var ctx = canvas.getContext('2d');
  var lineWidth = 10;
  var shadowSize = 12;
  var canvasSize = canvas.width;
  var labelRadient = canvasSize/2-lineWidth-shadowSize;
  var centerPos = canvasSize/2;
  var shadowGradient = ctx.createRadialGradient(
    centerPos, centerPos, labelRadient-shadowSize,
    centerPos, centerPos, labelRadient+lineWidth+shadowSize
  );
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(centerPos, centerPos, labelRadient+lineWidth/2, Math.PI*(2*Math.min(restTimeProp, 1)-0.5), 1.5*Math.PI);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = '#F2F2F2';
  ctx.stroke();
  ctx.closePath();
  shadowGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
  shadowGradient.addColorStop(0.5, '#90cef2');
  shadowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.beginPath();
  ctx.arc(centerPos, centerPos, canvasSize/2, -Math.PI/2, Math.PI*(2*restTimeProp-0.5));
  ctx.lineTo(centerPos, centerPos);
  ctx.fillStyle = shadowGradient;
  ctx.fill();
  ctx.closePath();
  var strokeColor = { h: 202, s: 0.79, l: 0.75 };
  var endLightness = 0.3;
  var startLightness = 0.75;
  for (var i = 0; i < Math.ceil(restTimeProp*360); i++) {
    ctx.beginPath();
    ctx.arc(centerPos, centerPos, labelRadient+lineWidth/2, Math.PI*(i/180-0.5), Math.PI*((i+1)/180-0.5)+0.003);
    strokeColor.l = startLightness-(startLightness-endLightness)*i/360;
    var rgbColor = window.hsl2rgb(strokeColor.h, strokeColor.s, strokeColor.l);
    ctx.strokeStyle = window.formatRGB(rgbColor.r, rgbColor.g, rgbColor.b);
    ctx.stroke();
    ctx.closePath();
  }
}