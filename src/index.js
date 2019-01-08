import { isIos } from './util';

// for android
const connectWebViewJavascriptBridge = callback => {
	if (window.WebViewJavascriptBridge) {
    callback(WebViewJavascriptBridge)
  } else {
 		document.addEventListener(
      'WebViewJavascriptBridgeReady'
      , function() {
          callback(WebViewJavascriptBridge)
      },
      false
    ); 	
  }
}

// for ios
const setupWebViewJavascriptBridge = callback => {
	if (window.WebViewJavascriptBridge) { 
		return callback(WebViewJavascriptBridge); 
	}
	if (window.WVJBCallbacks) { 
		return window.WVJBCallbacks.push(callback); 
	}

	window.WVJBCallbacks = [callback];
	let WVJBIframe = document.createElement('iframe');

	WVJBIframe.style.display = 'none';
	WVJBIframe.src = 'https://__bridge_loaded__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0);		
}

let jsBridge = {
	init(callback) {
		if (isIos()) {
			setupWebViewJavascriptBridge(callback);	
		} else {
			connectWebViewJavascriptBridge(callback);	
		}
	},
	registerHandler(name, fun) {
		this.init(bridge => {
			bridge.registerHandler(name, fun);	
		});
	},
	callHandler(name, data, fun) {
		this.init(bridge => {
			bridge.callHandler(name, data, fun);	
		});
	}
};

jsBridge.install = (Vue, opt) => {
	Object.defineProperty(Vue.prototype, '$jsBridge', { value: jsBridge })
}


export default jsBridge;