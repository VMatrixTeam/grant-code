window.hsl2rgb = function(h, s, l) {
  var q;
  var result;
  if (!s) {
    return { r: l, g: l, b: l };
  }
  if (l < 0.5) {
    q = l*(1+s)
  } else {
    q = l+s-l*s;
  }
  p = 2*l-q;
  h = h/360;
  result = { r: h+1/3, g: h, b: h-1/3 };
  Object.keys(result)
    .forEach(function(key) {
      if (result[key] < 0) {
        result[key]++;
      }
      if (result[key] > 1) {
        result[key]--;
      }
      if (result[key] < 1/6) {
        result[key] = p+(q-p)*6*result[key];
      } else if (result[key] < 1/2) {
        result[key] = q;
      } else if (result[key] < 2/3) {
        result[key] = p+(q-p)*6*(2/3-result[key]);
      } else {
        result[key] = p;
      }
      result[key] = Math.floor(result[key]*255+0.5);
    });
  return result;
}

function formatRGB(r, g, b) {
  return 'rgb('+r+', '+g+', '+b+')';
}