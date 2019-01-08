const isIos = () => {
  var u = window.navigator.userAgent;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  
  return isiOS;
};

const isAndroid = () => {
  var u = window.navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  
  return isAndroid;
};

export { isIos, isAndroid };