var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,a)=>(a=n==null?{}:e(i(n)),s(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var ee=Array.isArray;function S(){}var C={H:null,A:null,T:null,S:null},w=Object.prototype.hasOwnProperty;function T(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function te(e,t){return T(e.type,t,e.props)}function ne(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function re(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ie=/\/+/g;function ae(e,t){return typeof e==`object`&&e&&e.key!=null?re(``+e.key):t.toString(36)}function oe(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(S,S):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function se(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,se(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+ae(e,0):a,ee(o)?(i=``,c!=null&&(i=c.replace(ie,`$&/`)+`/`),se(o,r,i,``,function(e){return e})):o!=null&&(ne(o)&&(o=te(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ie,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(ee(e))for(var u=0;u<e.length;u++)a=e[u],s=l+ae(a,u),c+=se(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+ae(a,u++),c+=se(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return se(oe(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function ce(e,t,n){if(e==null)return e;var r=[],i=0;return se(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function le(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var E=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},D={map:ce,forEach:function(e,t,n){ce(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ce(e,function(){t++}),t},toArray:function(e){return ce(e,function(e){return e})||[]},only:function(e){if(!ne(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=D,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=C,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return C.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!w.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return T(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)w.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return T(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=ne,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:le}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=C.T,n={};C.T=n;try{var r=e(),i=C.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(S,E)}catch(e){E(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),C.T=t}},e.unstable_useCacheRefresh=function(){return C.H.useCacheRefresh()},e.use=function(e){return C.H.use(e)},e.useActionState=function(e,t,n){return C.H.useActionState(e,t,n)},e.useCallback=function(e,t){return C.H.useCallback(e,t)},e.useContext=function(e){return C.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return C.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return C.H.useEffect(e,t)},e.useEffectEvent=function(e){return C.H.useEffectEvent(e)},e.useId=function(){return C.H.useId()},e.useImperativeHandle=function(e,t,n){return C.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return C.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return C.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return C.H.useMemo(e,t)},e.useOptimistic=function(e,t){return C.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return C.H.useReducer(e,t,n)},e.useRef=function(e){return C.H.useRef(e)},e.useState=function(e){return C.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return C.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return C.H.useTransition()},e.version=`19.2.4`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m)if(n(c)!==null)m=!0,ee||(ee=!0,ne());else{var t=n(l);t!==null&&ae(x,t.startTime-e)}}var ee=!1,S=-1,C=5,w=-1;function T(){return g?!0:!(e.unstable_now()-w<C)}function te(){if(g=!1,ee){var t=e.unstable_now();w=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(S),S=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&T());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&ae(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?ne():ee=!1}}}var ne;if(typeof y==`function`)ne=function(){y(te)};else if(typeof MessageChannel<`u`){var re=new MessageChannel,ie=re.port2;re.port1.onmessage=te,ne=function(){ie.postMessage(null)}}else ne=function(){_(te,0)};function ae(t,n){S=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):C=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(S),S=-1):h=!0,ae(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,ee||(ee=!0,ne()))),r},e.unstable_shouldYield=T,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=u();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`)if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`)if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.2.4`})),m=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=f(),n=u(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}var h=Object.assign,g=Symbol.for(`react.element`),_=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),ee=Symbol.for(`react.consumer`),S=Symbol.for(`react.context`),C=Symbol.for(`react.forward_ref`),w=Symbol.for(`react.suspense`),T=Symbol.for(`react.suspense_list`),te=Symbol.for(`react.memo`),ne=Symbol.for(`react.lazy`),re=Symbol.for(`react.activity`),ie=Symbol.for(`react.memo_cache_sentinel`),ae=Symbol.iterator;function oe(e){return typeof e!=`object`||!e?null:(e=ae&&e[ae]||e[`@@iterator`],typeof e==`function`?e:null)}var se=Symbol.for(`react.client.reference`);function ce(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===se?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case w:return`Suspense`;case T:return`SuspenseList`;case re:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case S:return e.displayName||`Context`;case ee:return(e._context.displayName||`Context`)+`.Consumer`;case C:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case te:return t=e.displayName||null,t===null?ce(e.type)||`Memo`:t;case ne:t=e._payload,e=e._init;try{return ce(e(t))}catch{}}return null}var le=Array.isArray,E=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,D=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ue={pending:!1,data:null,method:null,action:null},de=[],fe=-1;function pe(e){return{current:e}}function me(e){0>fe||(e.current=de[fe],de[fe]=null,fe--)}function O(e,t){fe++,de[fe]=e.current,e.current=t}var he=pe(null),ge=pe(null),_e=pe(null),ve=pe(null);function ye(e,t){switch(O(_e,t),O(ge,e),O(he,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Hd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Hd(t),e=Ud(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}me(he),O(he,e)}function be(){me(he),me(ge),me(_e)}function xe(e){e.memoizedState!==null&&O(ve,e);var t=he.current,n=Ud(t,e.type);t!==n&&(O(ge,e),O(he,n))}function Se(e){ge.current===e&&(me(he),me(ge)),ve.current===e&&(me(ve),$f._currentValue=ue)}var Ce,we;function Te(e){if(Ce===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Ce=t&&t[1]||``,we=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Ce+e+we}var Ee=!1;function De(e,t){if(!e||Ee)return``;Ee=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,`props`,{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,`name`,{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Ee=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Te(n):``}function Oe(e,t){switch(e.tag){case 26:case 27:case 5:return Te(e.type);case 16:return Te(`Lazy`);case 13:return e.child!==t&&t!==null?Te(`Suspense Fallback`):Te(`Suspense`);case 19:return Te(`SuspenseList`);case 0:case 15:return De(e.type,!1);case 11:return De(e.type.render,!1);case 1:return De(e.type,!0);case 31:return Te(`Activity`);default:return``}}function ke(e){try{var t=``,n=null;do t+=Oe(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Ae=Object.prototype.hasOwnProperty,je=t.unstable_scheduleCallback,Me=t.unstable_cancelCallback,Ne=t.unstable_shouldYield,Pe=t.unstable_requestPaint,Fe=t.unstable_now,Ie=t.unstable_getCurrentPriorityLevel,Le=t.unstable_ImmediatePriority,Re=t.unstable_UserBlockingPriority,ze=t.unstable_NormalPriority,Be=t.unstable_LowPriority,Ve=t.unstable_IdlePriority,He=t.log,Ue=t.unstable_setDisableYieldValue,We=null,Ge=null;function Ke(e){if(typeof He==`function`&&Ue(e),Ge&&typeof Ge.setStrictMode==`function`)try{Ge.setStrictMode(We,e)}catch{}}var qe=Math.clz32?Math.clz32:Xe,Je=Math.log,Ye=Math.LN2;function Xe(e){return e>>>=0,e===0?32:31-(Je(e)/Ye|0)|0}var Ze=256,Qe=262144,$e=4194304;function et(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function tt(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=et(n))):i=et(o):i=et(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=et(n))):i=et(o)):i=et(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function nt(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function rt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function it(){var e=$e;return $e<<=1,!($e&62914560)&&($e=4194304),e}function at(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ot(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function st(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-qe(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&ct(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function ct(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-qe(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function lt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-qe(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function ut(e,t){var n=t&-t;return n=n&42?1:dt(n),(n&(e.suspendedLanes|t))===0?n:0}function dt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ft(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function pt(){var e=D.p;return e===0?(e=window.event,e===void 0?32:hp(e.type)):e}function mt(e,t){var n=D.p;try{return D.p=e,t()}finally{D.p=n}}var ht=Math.random().toString(36).slice(2),gt=`__reactFiber$`+ht,_t=`__reactProps$`+ht,vt=`__reactContainer$`+ht,yt=`__reactEvents$`+ht,bt=`__reactListeners$`+ht,xt=`__reactHandles$`+ht,St=`__reactResources$`+ht,Ct=`__reactMarker$`+ht;function wt(e){delete e[gt],delete e[_t],delete e[yt],delete e[bt],delete e[xt]}function Tt(e){var t=e[gt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[vt]||n[gt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=ff(e);e!==null;){if(n=e[gt])return n;e=ff(e)}return t}e=n,n=e.parentNode}return null}function Et(e){if(e=e[gt]||e[vt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Dt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Ot(e){var t=e[St];return t||=e[St]={hoistableStyles:new Map,hoistableScripts:new Map},t}function kt(e){e[Ct]=!0}var At=new Set,jt={};function Mt(e,t){Nt(e,t),Nt(e+`Capture`,t)}function Nt(e,t){for(jt[e]=t,e=0;e<t.length;e++)At.add(t[e])}var Pt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),k={},Ft={};function It(e){return Ae.call(Ft,e)?!0:Ae.call(k,e)?!1:Pt.test(e)?Ft[e]=!0:(k[e]=!0,!1)}function Lt(e,t,n){if(It(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}function Rt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function zt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function Bt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Vt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Ht(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ut(e){if(!e._valueTracker){var t=Vt(e)?`checked`:`value`;e._valueTracker=Ht(e,t,``+e[t])}}function Wt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Vt(e)?e.checked?`true`:`false`:e.value),e=r,e===n?!1:(t.setValue(e),!0)}function Gt(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Kt=/[\n"\\]/g;function qt(e){return e.replace(Kt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Jt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Bt(t)):e.value!==``+Bt(t)&&(e.value=``+Bt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Xt(e,o,Bt(n)):Xt(e,o,Bt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Bt(s):e.removeAttribute(`name`)}function Yt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Ut(e);return}n=n==null?``:``+Bt(n),t=t==null?n:``+Bt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Ut(e)}function Xt(e,t,n){t===`number`&&Gt(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Zt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Bt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Qt(e,t,n){if(t!=null&&(t=``+Bt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Bt(n)}function $t(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(le(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Bt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Ut(e)}function en(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var tn=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function nn(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||tn.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function rn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&nn(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&nn(e,o,t[o])}function an(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var on=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),sn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function cn(e){return sn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function ln(){}var un=null;function dn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var fn=null,pn=null;function mn(e){var t=Et(e);if(t&&(e=t.stateNode)){var n=e[_t]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Jt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+qt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[_t]||null;if(!a)throw Error(i(90));Jt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Wt(r)}break a;case`textarea`:Qt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Zt(e,!!n.multiple,t,!1)}}}var hn=!1;function gn(e,t,n){if(hn)return e(t,n);hn=!0;try{return e(t)}finally{if(hn=!1,(fn!==null||pn!==null)&&(xu(),fn&&(t=fn,e=pn,pn=fn=null,mn(t),e)))for(t=0;t<e.length;t++)mn(e[t])}}function _n(e,t){var n=e.stateNode;if(n===null)return null;var r=n[_t]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var vn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),yn=!1;if(vn)try{var bn={};Object.defineProperty(bn,`passive`,{get:function(){yn=!0}}),window.addEventListener(`test`,bn,bn),window.removeEventListener(`test`,bn,bn)}catch{yn=!1}var xn=null,Sn=null,Cn=null;function wn(){if(Cn)return Cn;var e,t=Sn,n=t.length,r,i=`value`in xn?xn.value:xn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return Cn=i.slice(e,1<r?1-r:void 0)}function Tn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function En(){return!0}function Dn(){return!1}function On(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?En:Dn,this.isPropagationStopped=Dn,this}return h(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=En)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=En)},persist:function(){},isPersistent:En}),t}var kn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},An=On(kn),jn=h({},kn,{view:0,detail:0}),Mn=On(jn),Nn,Pn,Fn,In=h({},jn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:A,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Fn&&(Fn&&e.type===`mousemove`?(Nn=e.screenX-Fn.screenX,Pn=e.screenY-Fn.screenY):Pn=Nn=0,Fn=e),Nn)},movementY:function(e){return`movementY`in e?e.movementY:Pn}}),Ln=On(In),Rn=On(h({},In,{dataTransfer:0})),zn=On(h({},jn,{relatedTarget:0})),Bn=On(h({},kn,{animationName:0,elapsedTime:0,pseudoElement:0})),Vn=On(h({},kn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Hn=On(h({},kn,{data:0})),Un={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Wn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Gn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Kn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Gn[e])?!!t[e]:!1}function A(){return Kn}var qn=On(h({},jn,{key:function(e){if(e.key){var t=Un[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Tn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Wn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:A,charCode:function(e){return e.type===`keypress`?Tn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Tn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Jn=On(h({},In,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Yn=On(h({},jn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:A})),Xn=On(h({},kn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Zn=On(h({},In,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Qn=On(h({},kn,{newState:0,oldState:0})),$n=[9,13,27,32],er=vn&&`CompositionEvent`in window,tr=null;vn&&`documentMode`in document&&(tr=document.documentMode);var nr=vn&&`TextEvent`in window&&!tr,rr=vn&&(!er||tr&&8<tr&&11>=tr),ir=` `,ar=!1;function or(e,t){switch(e){case`keyup`:return $n.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function sr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var cr=!1;function lr(e,t){switch(e){case`compositionend`:return sr(t);case`keypress`:return t.which===32?(ar=!0,ir):null;case`textInput`:return e=t.data,e===ir&&ar?null:e;default:return null}}function ur(e,t){if(cr)return e===`compositionend`||!er&&or(e,t)?(e=wn(),Cn=Sn=xn=null,cr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return rr&&t.locale!==`ko`?null:t.data;default:return null}}var dr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function fr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!dr[e.type]:t===`textarea`}function pr(e,t,n,r){fn?pn?pn.push(r):pn=[r]:fn=r,t=Dd(t,`onChange`),0<t.length&&(n=new An(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var mr=null,hr=null;function gr(e){bd(e,0)}function _r(e){if(Wt(Dt(e)))return e}function vr(e,t){if(e===`change`)return t}var yr=!1;if(vn){var br;if(vn){var xr=`oninput`in document;if(!xr){var Sr=document.createElement(`div`);Sr.setAttribute(`oninput`,`return;`),xr=typeof Sr.oninput==`function`}br=xr}else br=!1;yr=br&&(!document.documentMode||9<document.documentMode)}function Cr(){mr&&(mr.detachEvent(`onpropertychange`,wr),hr=mr=null)}function wr(e){if(e.propertyName===`value`&&_r(hr)){var t=[];pr(t,hr,e,dn(e)),gn(gr,t)}}function Tr(e,t,n){e===`focusin`?(Cr(),mr=t,hr=n,mr.attachEvent(`onpropertychange`,wr)):e===`focusout`&&Cr()}function Er(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return _r(hr)}function Dr(e,t){if(e===`click`)return _r(t)}function Or(e,t){if(e===`input`||e===`change`)return _r(t)}function kr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Ar=typeof Object.is==`function`?Object.is:kr;function jr(e,t){if(Ar(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Ae.call(t,i)||!Ar(e[i],t[i]))return!1}return!0}function Mr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Nr(e,t){var n=Mr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Mr(n)}}function Pr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Pr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Fr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Gt(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Gt(e.document)}return t}function Ir(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Lr=vn&&`documentMode`in document&&11>=document.documentMode,Rr=null,zr=null,Br=null,Vr=!1;function Hr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Vr||Rr==null||Rr!==Gt(r)||(r=Rr,`selectionStart`in r&&Ir(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Br&&jr(Br,r)||(Br=r,r=Dd(zr,`onSelect`),0<r.length&&(t=new An(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Rr)))}function Ur(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Wr={animationend:Ur(`Animation`,`AnimationEnd`),animationiteration:Ur(`Animation`,`AnimationIteration`),animationstart:Ur(`Animation`,`AnimationStart`),transitionrun:Ur(`Transition`,`TransitionRun`),transitionstart:Ur(`Transition`,`TransitionStart`),transitioncancel:Ur(`Transition`,`TransitionCancel`),transitionend:Ur(`Transition`,`TransitionEnd`)},Gr={},Kr={};vn&&(Kr=document.createElement(`div`).style,`AnimationEvent`in window||(delete Wr.animationend.animation,delete Wr.animationiteration.animation,delete Wr.animationstart.animation),`TransitionEvent`in window||delete Wr.transitionend.transition);function qr(e){if(Gr[e])return Gr[e];if(!Wr[e])return e;var t=Wr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Kr)return Gr[e]=t[n];return e}var Jr=qr(`animationend`),Yr=qr(`animationiteration`),Xr=qr(`animationstart`),Zr=qr(`transitionrun`),Qr=qr(`transitionstart`),$r=qr(`transitioncancel`),ei=qr(`transitionend`),ti=new Map,ni=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);ni.push(`scrollEnd`);function ri(e,t){ti.set(e,t),Mt(t,[e])}var ii=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},ai=[],oi=0,si=0;function ci(){for(var e=oi,t=si=oi=0;t<e;){var n=ai[t];ai[t++]=null;var r=ai[t];ai[t++]=null;var i=ai[t];ai[t++]=null;var a=ai[t];if(ai[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&fi(n,i,a)}}function li(e,t,n,r){ai[oi++]=e,ai[oi++]=t,ai[oi++]=n,ai[oi++]=r,si|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function ui(e,t,n,r){return li(e,t,n,r),pi(e)}function di(e,t){return li(e,null,null,t),pi(e)}function fi(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-qe(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function pi(e){if(50<fu)throw fu=0,pu=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var mi={};function hi(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function gi(e,t,n,r){return new hi(e,t,n,r)}function _i(e){return e=e.prototype,!(!e||!e.isReactComponent)}function vi(e,t){var n=e.alternate;return n===null?(n=gi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function yi(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function bi(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)_i(e)&&(s=1);else if(typeof e==`string`)s=Wf(e,n,he.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case re:return e=gi(31,n,t,a),e.elementType=re,e.lanes=o,e;case y:return xi(n.children,a,o,t);case b:s=8,a|=24;break;case x:return e=gi(12,n,t,a|2),e.elementType=x,e.lanes=o,e;case w:return e=gi(13,n,t,a),e.elementType=w,e.lanes=o,e;case T:return e=gi(19,n,t,a),e.elementType=T,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case S:s=10;break a;case ee:s=9;break a;case C:s=11;break a;case te:s=14;break a;case ne:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=gi(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function xi(e,t,n,r){return e=gi(7,e,r,t),e.lanes=n,e}function Si(e,t,n){return e=gi(6,e,null,t),e.lanes=n,e}function Ci(e){var t=gi(18,null,null,0);return t.stateNode=e,t}function wi(e,t,n){return t=gi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Ti=new WeakMap;function Ei(e,t){if(typeof e==`object`&&e){var n=Ti.get(e);return n===void 0?(t={value:e,source:t,stack:ke(t)},Ti.set(e,t),t):n}return{value:e,source:t,stack:ke(t)}}var Di=[],Oi=0,ki=null,Ai=0,ji=[],Mi=0,Ni=null,Pi=1,Fi=``;function Ii(e,t){Di[Oi++]=Ai,Di[Oi++]=ki,ki=e,Ai=t}function Li(e,t,n){ji[Mi++]=Pi,ji[Mi++]=Fi,ji[Mi++]=Ni,Ni=e;var r=Pi;e=Fi;var i=32-qe(r)-1;r&=~(1<<i),n+=1;var a=32-qe(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Pi=1<<32-qe(t)+i|n<<i|r,Fi=a+e}else Pi=1<<a|n<<i|r,Fi=e}function Ri(e){e.return!==null&&(Ii(e,1),Li(e,1,0))}function zi(e){for(;e===ki;)ki=Di[--Oi],Di[Oi]=null,Ai=Di[--Oi],Di[Oi]=null;for(;e===Ni;)Ni=ji[--Mi],ji[Mi]=null,Fi=ji[--Mi],ji[Mi]=null,Pi=ji[--Mi],ji[Mi]=null}function Bi(e,t){ji[Mi++]=Pi,ji[Mi++]=Fi,ji[Mi++]=Ni,Pi=t.id,Fi=t.overflow,Ni=e}var Vi=null,j=null,M=!1,Hi=null,Ui=!1,Wi=Error(i(519));function Gi(e){throw Zi(Ei(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Wi}function Ki(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[gt]=e,t[_t]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<vd.length;n++)Q(vd[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),Yt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),$t(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||Nd(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=ln),t=!0):t=!1,t||Gi(e,!0)}function qi(e){for(Vi=e.return;Vi;)switch(Vi.tag){case 5:case 31:case 13:Ui=!1;return;case 27:case 3:Ui=!0;return;default:Vi=Vi.return}}function Ji(e){if(e!==Vi)return!1;if(!M)return qi(e),M=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!==`form`&&n!==`button`)||Wd(e.type,e.memoizedProps)),n=!n),n&&j&&Gi(e),qi(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));j=df(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));j=df(e)}else t===27?(t=j,Qd(e.type)?(e=uf,uf=null,j=e):j=t):j=Vi?lf(e.stateNode.nextSibling):null;return!0}function Yi(){j=Vi=null,M=!1}function Xi(){var e=Hi;return e!==null&&(Ql===null?Ql=e:Ql.push.apply(Ql,e),Hi=null),e}function Zi(e){Hi===null?Hi=[e]:Hi.push(e)}var Qi=pe(null),$i=null,ea=null;function ta(e,t,n){O(Qi,t._currentValue),t._currentValue=n}function na(e){e._currentValue=Qi.current,me(Qi)}function ra(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function ia(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),ra(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),ra(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function aa(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Ar(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===ve.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[$f]:e.push($f))}a=a.return}e!==null&&ia(t,e,n,r),t.flags|=262144}function oa(e){for(e=e.firstContext;e!==null;){if(!Ar(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function sa(e){$i=e,ea=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function ca(e){return ua($i,e)}function la(e,t){return $i===null&&sa(e),ua(e,t)}function ua(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},ea===null){if(e===null)throw Error(i(308));ea=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else ea=ea.next=t;return n}var da=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},fa=t.unstable_scheduleCallback,pa=t.unstable_NormalPriority,N={$$typeof:S,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ma(){return{controller:new da,data:new Map,refCount:0}}function ha(e){e.refCount--,e.refCount===0&&fa(pa,function(){e.controller.abort()})}var ga=null,_a=0,va=0,ya=null;function ba(e,t){if(ga===null){var n=ga=[];_a=0,va=fd(),ya={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return _a++,t.then(xa,xa),t}function xa(){if(--_a===0&&ga!==null){ya!==null&&(ya.status=`fulfilled`);var e=ga;ga=null,va=0,ya=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Sa(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Ca=E.S;E.S=function(e,t){tu=Fe(),typeof t==`object`&&t&&typeof t.then==`function`&&ba(e,t),Ca!==null&&Ca(e,t)};var wa=pe(null);function Ta(){var e=wa.current;return e===null?K.pooledCache:e}function Ea(e,t){t===null?O(wa,wa.current):O(wa,t.pool)}function Da(){var e=Ta();return e===null?null:{parent:N._currentValue,pool:e}}var Oa=Error(i(460)),ka=Error(i(474)),Aa=Error(i(542)),ja={then:function(){}};function Ma(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Na(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(ln,ln),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,La(e),e;default:if(typeof t.status==`string`)t.then(ln,ln);else{if(e=K,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,La(e),e}throw Fa=t,Oa}}function Pa(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Fa=e,Oa):e}}var Fa=null;function Ia(){if(Fa===null)throw Error(i(459));var e=Fa;return Fa=null,e}function La(e){if(e===Oa||e===Aa)throw Error(i(483))}var Ra=null,za=0;function Ba(e){var t=za;return za+=1,Ra===null&&(Ra=[]),Na(Ra,e,t)}function Va(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Ha(e,t){throw t.$$typeof===g?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Ua(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=vi(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=Si(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===ne&&Pa(i)===t.type)?(t=a(t,n.props),Va(t,n),t.return=e,t):(t=bi(n.type,n.key,n.props,null,e.mode,r),Va(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=wi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=xi(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=Si(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case _:return n=bi(t.type,t.key,t.props,null,e.mode,n),Va(n,t),n.return=e,n;case v:return t=wi(t,e.mode,n),t.return=e,t;case ne:return t=Pa(t),f(e,t,n)}if(le(t)||oe(t))return t=xi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Ba(t),n);if(t.$$typeof===S)return f(e,la(e,t),n);Ha(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case _:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case ne:return n=Pa(n),p(e,t,n,r)}if(le(n)||oe(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Ba(n),r);if(n.$$typeof===S)return p(e,t,la(e,n),r);Ha(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case _:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case ne:return r=Pa(r),m(e,t,n,r,i)}if(le(r)||oe(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,Ba(r),i);if(r.$$typeof===S)return m(e,t,n,la(t,r),i);Ha(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),M&&Ii(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return M&&Ii(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),M&&Ii(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),M&&Ii(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return M&&Ii(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),M&&Ii(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===y&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case _:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===y){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===ne&&Pa(l)===r.type){n(e,r.sibling),c=a(r,o.props),Va(c,o),c.return=e,e=c;break a}n(e,r);break}else t(e,r);r=r.sibling}o.type===y?(c=xi(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=bi(o.type,o.key,o.props,null,e.mode,c),Va(c,o),c.return=e,e=c)}return s(e);case v:a:{for(l=o.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}else{n(e,r);break}else t(e,r);r=r.sibling}c=wi(o,e.mode,c),c.return=e,e=c}return s(e);case ne:return o=Pa(o),b(e,r,o,c)}if(le(o))return h(e,r,o,c);if(oe(o)){if(l=oe(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,Ba(o),c);if(o.$$typeof===S)return b(e,r,la(e,o),c);Ha(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=Si(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{za=0;var i=b(e,t,n,r);return Ra=null,i}catch(t){if(t===Oa||t===Aa)throw t;var a=gi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Wa=Ua(!0),Ga=Ua(!1),Ka=!1;function qa(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ja(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ya(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Xa(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,G&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=pi(e),fi(e,null,n),t}return li(e,r,t,n),pi(e)}function Za(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,lt(e,n)}}function Qa(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var $a=!1;function eo(){if($a){var e=ya;if(e!==null)throw e}}function to(e,t,n,r){$a=!1;var i=e.updateQueue;Ka=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(J&f)===f:(r&f)===f){f!==0&&f===va&&($a=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(m=g.payload,typeof m==`function`){d=m.call(_,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=g.payload,f=typeof m==`function`?m.call(_,d,f):m,f==null)break a;d=h({},d,f);break a;case 2:Ka=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Kl|=o,e.lanes=o,e.memoizedState=d}}function no(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function ro(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)no(n[e],t)}var io=pe(null),ao=pe(0);function oo(e,t){e=Gl,O(ao,e),O(io,t),Gl=e|t.baseLanes}function so(){O(ao,Gl),O(io,io.current)}function co(){Gl=ao.current,me(io),me(ao)}var lo=pe(null),uo=null;function fo(e){var t=e.alternate;O(P,P.current&1),O(lo,e),uo===null&&(t===null||io.current!==null||t.memoizedState!==null)&&(uo=e)}function po(e){O(P,P.current),O(lo,e),uo===null&&(uo=e)}function mo(e){e.tag===22?(O(P,P.current),O(lo,e),uo===null&&(uo=e)):ho(e)}function ho(){O(P,P.current),O(lo,lo.current)}function go(e){me(lo),uo===e&&(uo=null),me(P)}var P=pe(0);function _o(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||of(n)||sf(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var vo=0,F=null,I=null,R=null,yo=!1,bo=!1,xo=!1,So=0,Co=0,wo=null,To=0;function z(){throw Error(i(321))}function Eo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ar(e[n],t[n]))return!1;return!0}function Do(e,t,n,r,i,a){return vo=a,F=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,E.H=e===null||e.memoizedState===null?Us:Ws,xo=!1,a=n(r,i),xo=!1,bo&&(a=ko(t,n,r,i)),Oo(e),a}function Oo(e){E.H=Hs;var t=I!==null&&I.next!==null;if(vo=0,R=I=F=null,yo=!1,Co=0,wo=null,t)throw Error(i(300));e===null||V||(e=e.dependencies,e!==null&&oa(e)&&(V=!0))}function ko(e,t,n,r){F=e;var a=0;do{if(bo&&(wo=null),Co=0,bo=!1,25<=a)throw Error(i(301));if(a+=1,R=I=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}E.H=Gs,o=t(n,r)}while(bo);return o}function Ao(){var e=E.H,t=e.useState()[0];return t=typeof t.then==`function`?Io(t):t,e=e.useState()[0],(I===null?null:I.memoizedState)!==e&&(F.flags|=1024),t}function jo(){var e=So!==0;return So=0,e}function Mo(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function No(e){if(yo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}yo=!1}vo=0,R=I=F=null,bo=!1,Co=So=0,wo=null}function Po(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return R===null?F.memoizedState=R=e:R=R.next=e,R}function B(){if(I===null){var e=F.alternate;e=e===null?null:e.memoizedState}else e=I.next;var t=R===null?F.memoizedState:R.next;if(t!==null)R=t,I=e;else{if(e===null)throw F.alternate===null?Error(i(467)):Error(i(310));I=e,e={memoizedState:I.memoizedState,baseState:I.baseState,baseQueue:I.baseQueue,queue:I.queue,next:null},R===null?F.memoizedState=R=e:R=R.next=e}return R}function Fo(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Io(e){var t=Co;return Co+=1,wo===null&&(wo=[]),e=Na(wo,e,t),t=F,(R===null?t.memoizedState:R.next)===null&&(t=t.alternate,E.H=t===null||t.memoizedState===null?Us:Ws),e}function Lo(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Io(e);if(e.$$typeof===S)return ca(e)}throw Error(i(438,String(e)))}function Ro(e){var t=null,n=F.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=F.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=Fo(),F.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ie;return t.index++,n}function zo(e,t){return typeof t==`function`?t(e):t}function Bo(e){return Vo(B(),I,e)}function Vo(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(vo&f)===f:(J&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===va&&(d=!0);else if((vo&p)===p){u=u.next,p===va&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,F.lanes|=p,Kl|=p;f=u.action,xo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,F.lanes|=f,Kl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Ar(o,e.memoizedState)&&(V=!0,d&&(n=ya,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Ho(e){var t=B(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Ar(o,t.memoizedState)||(V=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Uo(e,t,n){var r=F,a=B(),o=M;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Ar((I||a).memoizedState,n);if(s&&(a.memoizedState=n,V=!0),a=a.queue,ms(Ko.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||R!==null&&R.memoizedState.tag&1){if(r.flags|=2048,ls(9,{destroy:void 0},Go.bind(null,r,a,n,t),null),K===null)throw Error(i(349));o||vo&127||Wo(r,t,n)}return n}function Wo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=F.updateQueue,t===null?(t=Fo(),F.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Go(e,t,n,r){t.value=n,t.getSnapshot=r,qo(t)&&Jo(e)}function Ko(e,t,n){return n(function(){qo(t)&&Jo(e)})}function qo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ar(e,n)}catch{return!0}}function Jo(e){var t=di(e,2);t!==null&&gu(t,e,2)}function Yo(e){var t=Po();if(typeof e==`function`){var n=e;if(e=n(),xo){Ke(!0);try{n()}finally{Ke(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:zo,lastRenderedState:e},t}function Xo(e,t,n,r){return e.baseState=n,Vo(e,I,typeof r==`function`?r:zo)}function Zo(e,t,n,r,a){if(zs(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};E.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Qo(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Qo(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=E.T,o={};E.T=o;try{var s=n(i,r),c=E.S;c!==null&&c(o,s),$o(e,t,s)}catch(n){ts(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),E.T=a}}else try{a=n(i,r),$o(e,t,a)}catch(n){ts(e,t,n)}}function $o(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){es(e,t,n)},function(n){return ts(e,t,n)}):es(e,t,n)}function es(e,t,n){t.status=`fulfilled`,t.value=n,ns(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Qo(e,n)))}function ts(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,ns(t),t=t.next;while(t!==r)}e.action=null}function ns(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function rs(e,t){return t}function is(e,t){if(M){var n=K.formState;if(n!==null){a:{var r=F;if(M){if(j){b:{for(var i=j,a=Ui;i.nodeType!==8;){if(!a){i=null;break b}if(i=lf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){j=lf(i.nextSibling),r=i.data===`F!`;break a}}Gi(r)}r=!1}r&&(t=n[0])}}return n=Po(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:rs,lastRenderedState:t},n.queue=r,n=Is.bind(null,F,r),r.dispatch=n,r=Yo(!1),a=Rs.bind(null,F,!1,r.queue),r=Po(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Zo.bind(null,F,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function as(e){return os(B(),I,e)}function os(e,t,n){if(t=Vo(e,t,rs)[0],e=Bo(zo)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Io(t)}catch(e){throw e===Oa?Aa:e}else r=t;t=B();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(F.flags|=2048,ls(9,{destroy:void 0},ss.bind(null,i,n),null)),[r,a,e]}function ss(e,t){e.action=t}function cs(e){var t=B(),n=I;if(n!==null)return os(t,n,e);B(),t=t.memoizedState,n=B();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function ls(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=F.updateQueue,t===null&&(t=Fo(),F.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function us(){return B().memoizedState}function ds(e,t,n,r){var i=Po();F.flags|=e,i.memoizedState=ls(1|t,{destroy:void 0},n,r===void 0?null:r)}function fs(e,t,n,r){var i=B();r=r===void 0?null:r;var a=i.memoizedState.inst;I!==null&&r!==null&&Eo(r,I.memoizedState.deps)?i.memoizedState=ls(t,a,n,r):(F.flags|=e,i.memoizedState=ls(1|t,a,n,r))}function ps(e,t){ds(8390656,8,e,t)}function ms(e,t){fs(2048,8,e,t)}function hs(e){F.flags|=4;var t=F.updateQueue;if(t===null)t=Fo(),F.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function gs(e){var t=B().memoizedState;return hs({ref:t,nextImpl:e}),function(){if(G&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function _s(e,t){return fs(4,2,e,t)}function vs(e,t){return fs(4,4,e,t)}function ys(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function bs(e,t,n){n=n==null?null:n.concat([e]),fs(4,4,ys.bind(null,t,e),n)}function xs(){}function Ss(e,t){var n=B();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Eo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Cs(e,t){var n=B();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Eo(t,r[1]))return r[0];if(r=e(),xo){Ke(!0);try{e()}finally{Ke(!1)}}return n.memoizedState=[r,t],r}function ws(e,t,n){return n===void 0||vo&1073741824&&!(J&261930)?e.memoizedState=t:(e.memoizedState=n,e=hu(),F.lanes|=e,Kl|=e,n)}function Ts(e,t,n,r){return Ar(n,t)?n:io.current===null?!(vo&42)||vo&1073741824&&!(J&261930)?(V=!0,e.memoizedState=n):(e=hu(),F.lanes|=e,Kl|=e,t):(e=ws(e,n,r),Ar(e,t)||(V=!0),e)}function Es(e,t,n,r,i){var a=D.p;D.p=a!==0&&8>a?a:8;var o=E.T,s={};E.T=s,Rs(e,!1,t,n);try{var c=i(),l=E.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?Ls(e,t,Sa(c,r),mu(e)):Ls(e,t,r,mu(e))}catch(n){Ls(e,t,{then:function(){},status:`rejected`,reason:n},mu())}finally{D.p=a,o!==null&&s.types!==null&&(o.types=s.types),E.T=o}}function Ds(){}function Os(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=ks(e).queue;Es(e,a,t,ue,n===null?Ds:function(){return As(e),n(r)})}function ks(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ue,baseState:ue,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:zo,lastRenderedState:ue},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:zo,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function As(e){var t=ks(e);t.next===null&&(t=e.alternate.memoizedState),Ls(e,t.next.queue,{},mu())}function js(){return ca($f)}function Ms(){return B().memoizedState}function Ns(){return B().memoizedState}function Ps(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=mu();e=Ya(n);var r=Xa(t,e,n);r!==null&&(gu(r,t,n),Za(r,t,n)),t={cache:ma()},e.payload=t;return}t=t.return}}function Fs(e,t,n){var r=mu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},zs(e)?Bs(t,n):(n=ui(e,t,n,r),n!==null&&(gu(n,e,r),Vs(n,t,r)))}function Is(e,t,n){Ls(e,t,n,mu())}function Ls(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(zs(e))Bs(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Ar(s,o))return li(e,t,i,0),K===null&&ci(),!1}catch{}if(n=ui(e,t,i,r),n!==null)return gu(n,e,r),Vs(n,t,r),!0}return!1}function Rs(e,t,n,r){if(r={lane:2,revertLane:fd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},zs(e)){if(t)throw Error(i(479))}else t=ui(e,n,r,2),t!==null&&gu(t,e,2)}function zs(e){var t=e.alternate;return e===F||t!==null&&t===F}function Bs(e,t){bo=yo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Vs(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,lt(e,n)}}var Hs={readContext:ca,use:Lo,useCallback:z,useContext:z,useEffect:z,useImperativeHandle:z,useLayoutEffect:z,useInsertionEffect:z,useMemo:z,useReducer:z,useRef:z,useState:z,useDebugValue:z,useDeferredValue:z,useTransition:z,useSyncExternalStore:z,useId:z,useHostTransitionStatus:z,useFormState:z,useActionState:z,useOptimistic:z,useMemoCache:z,useCacheRefresh:z};Hs.useEffectEvent=z;var Us={readContext:ca,use:Lo,useCallback:function(e,t){return Po().memoizedState=[e,t===void 0?null:t],e},useContext:ca,useEffect:ps,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),ds(4194308,4,ys.bind(null,t,e),n)},useLayoutEffect:function(e,t){return ds(4194308,4,e,t)},useInsertionEffect:function(e,t){ds(4,2,e,t)},useMemo:function(e,t){var n=Po();t=t===void 0?null:t;var r=e();if(xo){Ke(!0);try{e()}finally{Ke(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=Po();if(n!==void 0){var i=n(t);if(xo){Ke(!0);try{n(t)}finally{Ke(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=Fs.bind(null,F,e),[r.memoizedState,e]},useRef:function(e){var t=Po();return e={current:e},t.memoizedState=e},useState:function(e){e=Yo(e);var t=e.queue,n=Is.bind(null,F,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:xs,useDeferredValue:function(e,t){return ws(Po(),e,t)},useTransition:function(){var e=Yo(!1);return e=Es.bind(null,F,e.queue,!0,!1),Po().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=F,a=Po();if(M){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),K===null)throw Error(i(349));J&127||Wo(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,ps(Ko.bind(null,r,o,e),[e]),r.flags|=2048,ls(9,{destroy:void 0},Go.bind(null,r,o,n,t),null),n},useId:function(){var e=Po(),t=K.identifierPrefix;if(M){var n=Fi,r=Pi;n=(r&~(1<<32-qe(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=So++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=To++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:js,useFormState:is,useActionState:is,useOptimistic:function(e){var t=Po();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Rs.bind(null,F,!0,n),n.dispatch=t,[e,t]},useMemoCache:Ro,useCacheRefresh:function(){return Po().memoizedState=Ps.bind(null,F)},useEffectEvent:function(e){var t=Po(),n={impl:e};return t.memoizedState=n,function(){if(G&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},Ws={readContext:ca,use:Lo,useCallback:Ss,useContext:ca,useEffect:ms,useImperativeHandle:bs,useInsertionEffect:_s,useLayoutEffect:vs,useMemo:Cs,useReducer:Bo,useRef:us,useState:function(){return Bo(zo)},useDebugValue:xs,useDeferredValue:function(e,t){return Ts(B(),I.memoizedState,e,t)},useTransition:function(){var e=Bo(zo)[0],t=B().memoizedState;return[typeof e==`boolean`?e:Io(e),t]},useSyncExternalStore:Uo,useId:Ms,useHostTransitionStatus:js,useFormState:as,useActionState:as,useOptimistic:function(e,t){return Xo(B(),I,e,t)},useMemoCache:Ro,useCacheRefresh:Ns};Ws.useEffectEvent=gs;var Gs={readContext:ca,use:Lo,useCallback:Ss,useContext:ca,useEffect:ms,useImperativeHandle:bs,useInsertionEffect:_s,useLayoutEffect:vs,useMemo:Cs,useReducer:Ho,useRef:us,useState:function(){return Ho(zo)},useDebugValue:xs,useDeferredValue:function(e,t){var n=B();return I===null?ws(n,e,t):Ts(n,I.memoizedState,e,t)},useTransition:function(){var e=Ho(zo)[0],t=B().memoizedState;return[typeof e==`boolean`?e:Io(e),t]},useSyncExternalStore:Uo,useId:Ms,useHostTransitionStatus:js,useFormState:cs,useActionState:cs,useOptimistic:function(e,t){var n=B();return I===null?(n.baseState=e,[e,n.queue.dispatch]):Xo(n,I,e,t)},useMemoCache:Ro,useCacheRefresh:Ns};Gs.useEffectEvent=gs;function Ks(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:h({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var qs={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=mu(),i=Ya(r);i.payload=t,n!=null&&(i.callback=n),t=Xa(e,i,r),t!==null&&(gu(t,e,r),Za(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=mu(),i=Ya(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Xa(e,i,r),t!==null&&(gu(t,e,r),Za(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=mu(),r=Ya(n);r.tag=2,t!=null&&(r.callback=t),t=Xa(e,r,n),t!==null&&(gu(t,e,n),Za(t,e,n))}};function Js(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!jr(n,r)||!jr(i,a):!0}function Ys(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&qs.enqueueReplaceState(t,t.state,null)}function Xs(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=h({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Zs(e){ii(e)}function Qs(e){console.error(e)}function $s(e){ii(e)}function ec(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function tc(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function nc(e,t,n){return n=Ya(n),n.tag=3,n.payload={element:null},n.callback=function(){ec(e,t)},n}function rc(e){return e=Ya(e),e.tag=3,e}function ic(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){tc(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){tc(t,n,r),typeof i!=`function`&&(iu===null?iu=new Set([this]):iu.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function ac(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&aa(t,n,a,!0),n=lo.current,n!==null){switch(n.tag){case 31:case 13:return uo===null?Ou():n.alternate===null&&X===0&&(X=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===ja?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Ku(e,r,a)),!1;case 22:return n.flags|=65536,r===ja?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Ku(e,r,a)),!1}throw Error(i(435,n.tag))}return Ku(e,r,a),Ou(),!1}if(M)return t=lo.current,t===null?(r!==Wi&&(t=Error(i(423),{cause:r}),Zi(Ei(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Ei(r,n),a=nc(e.stateNode,r,a),Qa(e,a),X!==4&&(X=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==Wi&&(e=Error(i(422),{cause:r}),Zi(Ei(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Ei(o,n),Zl===null?Zl=[o]:Zl.push(o),X!==4&&(X=2),t===null)return!0;r=Ei(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=nc(n.stateNode,r,e),Qa(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(iu===null||!iu.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=rc(a),ic(a,e,n,r),Qa(n,a),!1}n=n.return}while(n!==null);return!1}var oc=Error(i(461)),V=!1;function sc(e,t,n,r){t.child=e===null?Ga(t,null,n,r):Wa(t,e.child,n,r)}function cc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return sa(t),r=Do(e,t,n,o,a,i),s=jo(),e!==null&&!V?(Mo(e,t,i),Mc(e,t,i)):(M&&s&&Ri(t),t.flags|=1,sc(e,t,r,i),t.child)}function lc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!_i(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,uc(e,t,a,r,i)):(e=bi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Nc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?jr:n,n(o,r)&&e.ref===t.ref)return Mc(e,t,i)}return t.flags|=1,e=vi(a,r),e.ref=t.ref,e.return=t,t.child=e}function uc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(jr(a,r)&&e.ref===t.ref)if(V=!1,t.pendingProps=r=a,Nc(e,i))e.flags&131072&&(V=!0);else return t.lanes=e.lanes,Mc(e,t,i)}return vc(e,t,n,r,i)}function dc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return pc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ea(t,a===null?null:a.cachePool),a===null?so():oo(t,a),mo(t);else return r=t.lanes=536870912,pc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Ea(t,null),so(),ho(t)):(Ea(t,a.cachePool),oo(t,a),ho(t),t.memoizedState=null);return sc(e,t,i,n),t.child}function fc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function pc(e,t,n,r,i){var a=Ta();return a=a===null?null:{parent:N._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Ea(t,null),so(),mo(t),e!==null&&aa(e,t,r,!0),t.childLanes=i,null}function mc(e,t){return t=Dc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function hc(e,t,n){return Wa(t,e.child,null,n),e=mc(t,t.pendingProps),e.flags|=2,go(t),t.memoizedState=null,e}function gc(e,t,n){var r=t.pendingProps,a=(t.flags&128)!=0;if(t.flags&=-129,e===null){if(M){if(r.mode===`hidden`)return e=mc(t,r),t.lanes=536870912,fc(null,e);if(po(t),(e=j)?(e=af(e,Ui),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ni===null?null:{id:Pi,overflow:Fi},retryLane:536870912,hydrationErrors:null},n=Ci(e),n.return=t,t.child=n,Vi=t,j=null)):e=null,e===null)throw Gi(t);return t.lanes=536870912,null}return mc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(po(t),a)if(t.flags&256)t.flags&=-257,t=hc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558));else if(V||aa(e,t,n,!1),a=(n&e.childLanes)!==0,V||a){if(r=K,r!==null&&(s=ut(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,di(e,s),gu(r,e,s),oc;Ou(),t=hc(e,t,n)}else e=o.treeContext,j=lf(s.nextSibling),Vi=t,M=!0,Hi=null,Ui=!1,e!==null&&Bi(t,e),t=mc(t,r),t.flags|=4096;return t}return e=vi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function _c(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function vc(e,t,n,r,i){return sa(t),n=Do(e,t,n,r,void 0,i),r=jo(),e!==null&&!V?(Mo(e,t,i),Mc(e,t,i)):(M&&r&&Ri(t),t.flags|=1,sc(e,t,n,i),t.child)}function yc(e,t,n,r,i,a){return sa(t),t.updateQueue=null,n=ko(t,r,n,i),Oo(e),r=jo(),e!==null&&!V?(Mo(e,t,a),Mc(e,t,a)):(M&&r&&Ri(t),t.flags|=1,sc(e,t,n,a),t.child)}function bc(e,t,n,r,i){if(sa(t),t.stateNode===null){var a=mi,o=n.contextType;typeof o==`object`&&o&&(a=ca(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=qs,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},qa(t),o=n.contextType,a.context=typeof o==`object`&&o?ca(o):mi,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Ks(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&qs.enqueueReplaceState(a,a.state,null),to(t,r,a,i),eo(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Xs(n,s);a.props=c;var l=a.context,u=n.contextType;o=mi,typeof u==`object`&&u&&(o=ca(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Ys(t,a,r,o),Ka=!1;var f=t.memoizedState;a.state=f,to(t,r,a,i),eo(),l=t.memoizedState,s||f!==l||Ka?(typeof d==`function`&&(Ks(t,n,d,r),l=t.memoizedState),(c=Ka||Js(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Ja(e,t),o=t.memoizedProps,u=Xs(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=mi,typeof l==`object`&&l&&(c=ca(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Ys(t,a,r,c),Ka=!1,f=t.memoizedState,a.state=f,to(t,r,a,i),eo();var p=t.memoizedState;o!==d||f!==p||Ka||e!==null&&e.dependencies!==null&&oa(e.dependencies)?(typeof s==`function`&&(Ks(t,n,s,r),p=t.memoizedState),(u=Ka||Js(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&oa(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,_c(e,t),r=(t.flags&128)!=0,a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Wa(t,e.child,null,i),t.child=Wa(t,null,n,i)):sc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=Mc(e,t,i),e}function xc(e,t,n,r){return Yi(),t.flags|=256,sc(e,t,n,r),t.child}var Sc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Cc(e){return{baseLanes:e,cachePool:Da()}}function wc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Yl),e}function Tc(e,t,n){var r=t.pendingProps,a=!1,o=(t.flags&128)!=0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(P.current&2)!=0),s&&(a=!0,t.flags&=-129),s=(t.flags&32)!=0,t.flags&=-33,e===null){if(M){if(a?fo(t):ho(t),(e=j)?(e=af(e,Ui),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ni===null?null:{id:Pi,overflow:Fi},retryLane:536870912,hydrationErrors:null},n=Ci(e),n.return=t,t.child=n,Vi=t,j=null)):e=null,e===null)throw Gi(t);return sf(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?(ho(t),a=t.mode,c=Dc({mode:`hidden`,children:c},a),r=xi(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=Cc(n),r.childLanes=wc(e,s,n),t.memoizedState=Sc,fc(null,r)):(fo(t),Ec(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(fo(t),t.flags&=-257,t=Oc(e,t,n)):t.memoizedState===null?(ho(t),c=r.fallback,a=t.mode,r=Dc({mode:`visible`,children:r.children},a),c=xi(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,Wa(t,e.child,null,n),r=t.child,r.memoizedState=Cc(n),r.childLanes=wc(e,s,n),t.memoizedState=Sc,t=fc(null,r)):(ho(t),t.child=e.child,t.flags|=128,t=null);else if(fo(t),sf(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,Zi({value:r,source:null,stack:null}),t=Oc(e,t,n)}else if(V||aa(e,t,n,!1),s=(n&e.childLanes)!==0,V||s){if(s=K,s!==null&&(r=ut(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,di(e,r),gu(s,e,r),oc;of(c)||Ou(),t=Oc(e,t,n)}else of(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,j=lf(c.nextSibling),Vi=t,M=!0,Hi=null,Ui=!1,e!==null&&Bi(t,e),t=Ec(t,r.children),t.flags|=4096);return t}return a?(ho(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=vi(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=xi(c,a,n,null),c.flags|=2):c=vi(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,fc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=Cc(n):(a=c.cachePool,a===null?a=Da():(l=N._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=wc(e,s,n),t.memoizedState=Sc,fc(e.child,r)):(fo(t),n=e.child,e=n.sibling,n=vi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function Ec(e,t){return t=Dc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Dc(e,t){return e=gi(22,e,null,t),e.lanes=0,e}function Oc(e,t,n){return Wa(t,e.child,null,n),e=Ec(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function kc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ra(e.return,t,n)}function Ac(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function jc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=P.current,s=(o&2)!=0;if(s?(o=o&1|2,t.flags|=128):o&=1,O(P,o),sc(e,t,r,n),r=M?Ai:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&kc(e,n,t);else if(e.tag===19)kc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&_o(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Ac(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&_o(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Ac(t,!0,n,null,a,r);break;case`together`:Ac(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function Mc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Kl|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(aa(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=vi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=vi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Nc(e,t){return(e.lanes&t)===0?(e=e.dependencies,!!(e!==null&&oa(e))):!0}function Pc(e,t,n){switch(t.tag){case 3:ye(t,t.stateNode.containerInfo),ta(t,N,e.memoizedState.cache),Yi();break;case 27:case 5:xe(t);break;case 4:ye(t,t.stateNode.containerInfo);break;case 10:ta(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,po(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(fo(t),e=Mc(e,t,n),e===null?null:e.sibling):Tc(e,t,n):(fo(t),t.flags|=128,null);fo(t);break;case 19:var i=(e.flags&128)!=0;if(r=(n&t.childLanes)!==0,r||=(aa(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return jc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),O(P,P.current),r)break;return null;case 22:return t.lanes=0,dc(e,t,n,t.pendingProps);case 24:ta(t,N,e.memoizedState.cache)}return Mc(e,t,n)}function Fc(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)V=!0;else{if(!Nc(e,n)&&!(t.flags&128))return V=!1,Pc(e,t,n);V=!!(e.flags&131072)}else V=!1,M&&t.flags&1048576&&Li(t,Ai,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Pa(t.elementType),t.type=e,typeof e==`function`)_i(e)?(r=Xs(e,r),t.tag=1,t=bc(null,t,e,r,n)):(t.tag=0,t=vc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===C){t.tag=11,t=cc(null,t,e,r,n);break a}else if(a===te){t.tag=14,t=lc(null,t,e,r,n);break a}}throw t=ce(e)||e,Error(i(306,t,``))}}return t;case 0:return vc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Xs(r,t.pendingProps),bc(e,t,r,a,n);case 3:a:{if(ye(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Ja(e,t),to(t,r,null,n);var s=t.memoizedState;if(r=s.cache,ta(t,N,r),r!==o.cache&&ia(t,[N],n,!0),eo(),r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=xc(e,t,r,n);break a}else if(r!==a){a=Ei(Error(i(424)),t),Zi(a),t=xc(e,t,r,n);break a}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(j=lf(e.firstChild),Vi=t,M=!0,Hi=null,Ui=!0,n=Ga(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Yi(),r===a){t=Mc(e,t,n);break a}sc(e,t,r,n)}t=t.child}return t;case 26:return _c(e,t),e===null?(n=Af(t.type,null,t.pendingProps,null))?t.memoizedState=n:M||(n=t.type,e=t.pendingProps,r=Vd(_e.current).createElement(n),r[gt]=t,r[_t]=e,Fd(r,n,e),kt(r),t.stateNode=r):t.memoizedState=Af(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return xe(t),e===null&&M&&(r=t.stateNode=pf(t.type,t.pendingProps,_e.current),Vi=t,Ui=!0,a=j,Qd(t.type)?(uf=a,j=lf(r.firstChild)):j=a),sc(e,t,t.pendingProps.children,n),_c(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&M&&((a=r=j)&&(r=nf(r,t.type,t.pendingProps,Ui),r===null?a=!1:(t.stateNode=r,Vi=t,j=lf(r.firstChild),Ui=!1,a=!0)),a||Gi(t)),xe(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Wd(a,o)?r=null:s!==null&&Wd(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=Do(e,t,Ao,null,null,n),$f._currentValue=a),_c(e,t),sc(e,t,r,n),t.child;case 6:return e===null&&M&&((e=n=j)&&(n=rf(n,t.pendingProps,Ui),n===null?e=!1:(t.stateNode=n,Vi=t,j=null,e=!0)),e||Gi(t)),null;case 13:return Tc(e,t,n);case 4:return ye(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Wa(t,null,r,n):sc(e,t,r,n),t.child;case 11:return cc(e,t,t.type,t.pendingProps,n);case 7:return sc(e,t,t.pendingProps,n),t.child;case 8:return sc(e,t,t.pendingProps.children,n),t.child;case 12:return sc(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,ta(t,t.type,r.value),sc(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,sa(t),a=ca(a),r=r(a),t.flags|=1,sc(e,t,r,n),t.child;case 14:return lc(e,t,t.type,t.pendingProps,n);case 15:return uc(e,t,t.type,t.pendingProps,n);case 19:return jc(e,t,n);case 31:return gc(e,t,n);case 22:return dc(e,t,n,t.pendingProps);case 24:return sa(t),r=ca(N),e===null?(a=Ta(),a===null&&(a=K,o=ma(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},qa(t),ta(t,N,a)):((e.lanes&n)!==0&&(Ja(e,t),to(t,null,null,n),eo()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,ta(t,N,r),r!==a.cache&&ia(t,[N],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),ta(t,N,r))),sc(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function Ic(e){e.flags|=4}function Lc(e,t,n,r,i){if((t=(e.mode&32)!=0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(Tu())e.flags|=8192;else throw Fa=ja,ka}else e.flags&=-16777217}function Rc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Gf(t))if(Tu())e.flags|=8192;else throw Fa=ja,ka}function zc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:it(),e.lanes|=t,Xl|=t)}function Bc(e,t){if(!M)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function H(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Vc(e,t,n){var r=t.pendingProps;switch(zi(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return H(t),null;case 1:return H(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),na(N),be(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Ji(t)?Ic(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Xi())),H(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(Ic(t),o===null?(H(t),Lc(t,a,null,r,n)):(H(t),Rc(t,o))):o?o===e.memoizedState?(H(t),t.flags&=-16777217):(Ic(t),H(t),Rc(t,o)):(e=e.memoizedProps,e!==r&&Ic(t),H(t),Lc(t,a,e,r,n)),null;case 27:if(Se(t),n=_e.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Ic(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return H(t),null}e=he.current,Ji(t)?Ki(t,e):(e=pf(a,r,n),t.stateNode=e,Ic(t))}return H(t),null;case 5:if(Se(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Ic(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return H(t),null}if(o=he.current,Ji(t))Ki(t,o);else{var s=Vd(_e.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[gt]=t,o[_t]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(Fd(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&Ic(t)}}return H(t),Lc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Ic(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=_e.current,Ji(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=Vi,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[gt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||Nd(e.nodeValue,n)),e||Gi(t,!0)}else e=Vd(e).createTextNode(r),e[gt]=t,t.stateNode=e}return H(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Ji(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[gt]=t}else Yi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;H(t),e=!1}else n=Xi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(go(t),t):(go(t),null);if(t.flags&128)throw Error(i(558))}return H(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Ji(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[gt]=t}else Yi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;H(t),a=!1}else a=Xi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(go(t),t):(go(t),null)}return go(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),zc(t,t.updateQueue),H(t),null);case 4:return be(),e===null&&Cd(t.stateNode.containerInfo),H(t),null;case 10:return na(t.type),H(t),null;case 19:if(me(P),r=t.memoizedState,r===null)return H(t),null;if(a=(t.flags&128)!=0,o=r.rendering,o===null)if(a)Bc(r,!1);else{if(X!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=_o(e),o!==null){for(t.flags|=128,Bc(r,!1),e=o.updateQueue,t.updateQueue=e,zc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)yi(n,e),n=n.sibling;return O(P,P.current&1|2),M&&Ii(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Fe()>nu&&(t.flags|=128,a=!0,Bc(r,!1),t.lanes=4194304)}else{if(!a)if(e=_o(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,zc(t,e),Bc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!M)return H(t),null}else 2*Fe()-r.renderingStartTime>nu&&n!==536870912&&(t.flags|=128,a=!0,Bc(r,!1),t.lanes=4194304);r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(H(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Fe(),e.sibling=null,n=P.current,O(P,a?n&1|2:n&1),M&&Ii(t,r.treeForkCount),e);case 22:case 23:return go(t),co(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(H(t),t.subtreeFlags&6&&(t.flags|=8192)):H(t),n=t.updateQueue,n!==null&&zc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&me(wa),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),na(N),H(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Hc(e,t){switch(zi(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return na(N),be(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Se(t),null;case 31:if(t.memoizedState!==null){if(go(t),t.alternate===null)throw Error(i(340));Yi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(go(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Yi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return me(P),null;case 4:return be(),null;case 10:return na(t.type),null;case 22:case 23:return go(t),co(),e!==null&&me(wa),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return na(N),null;case 25:return null;default:return null}}function Uc(e,t){switch(zi(t),t.tag){case 3:na(N),be();break;case 26:case 27:case 5:Se(t);break;case 4:be();break;case 31:t.memoizedState!==null&&go(t);break;case 13:go(t);break;case 19:me(P);break;case 10:na(t.type);break;case 22:case 23:go(t),co(),e!==null&&me(wa);break;case 24:na(N)}}function Wc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Gc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function Kc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{ro(t,n)}catch(t){Z(e,e.return,t)}}}function qc(e,t,n){n.props=Xs(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Jc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function Yc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null)if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}function Xc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function Zc(e,t,n){try{var r=e.stateNode;Id(r,e.type,n,t),r[_t]=t}catch(t){Z(e,e.return,t)}}function Qc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Qd(e.type)||e.tag===4}function $c(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Qc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Qd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function el(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ln));else if(r!==4&&(r===27&&Qd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(el(e,t,n),e=e.sibling;e!==null;)el(e,t,n),e=e.sibling}function tl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Qd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(tl(e,t,n),e=e.sibling;e!==null;)tl(e,t,n),e=e.sibling}function nl(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Fd(t,r,n),t[gt]=e,t[_t]=n}catch(t){Z(e,e.return,t)}}var rl=!1,U=!1,il=!1,al=typeof WeakSet==`function`?WeakSet:Set,ol=null;function sl(e,t){if(e=e.containerInfo,zd=cp,e=Fr(e),Ir(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(Bd={focusedElem:e,selectionRange:n},cp=!1,ol=t;ol!==null;)if(t=ol,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,ol=e;else for(;ol!==null;){switch(t=ol,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=Xs(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Z(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)tf(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:tf(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,ol=e;break}ol=t.return}}function cl(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Sl(e,n),r&4&&Wc(5,n);break;case 1:if(Sl(e,n),r&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=Xs(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}r&64&&Kc(n),r&512&&Jc(n,n.return);break;case 3:if(Sl(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{ro(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&nl(n);case 26:case 5:Sl(e,n),t===null&&r&4&&Xc(n),r&512&&Jc(n,n.return);break;case 12:Sl(e,n);break;case 31:Sl(e,n),r&4&&pl(e,n);break;case 13:Sl(e,n),r&4&&ml(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Yu.bind(null,n),cf(e,n))));break;case 22:if(r=n.memoizedState!==null||rl,!r){t=t!==null&&t.memoizedState!==null||U,i=rl;var a=U;rl=r,(U=t)&&!a?wl(e,n,(n.subtreeFlags&8772)!=0):Sl(e,n),rl=i,U=a}break;case 30:break;default:Sl(e,n)}}function ll(e){var t=e.alternate;t!==null&&(e.alternate=null,ll(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&wt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var W=null,ul=!1;function dl(e,t,n){for(n=n.child;n!==null;)fl(e,t,n),n=n.sibling}function fl(e,t,n){if(Ge&&typeof Ge.onCommitFiberUnmount==`function`)try{Ge.onCommitFiberUnmount(We,n)}catch{}switch(n.tag){case 26:U||Yc(n,t),dl(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:U||Yc(n,t);var r=W,i=ul;Qd(n.type)&&(W=n.stateNode,ul=!1),dl(e,t,n),mf(n.stateNode),W=r,ul=i;break;case 5:U||Yc(n,t);case 6:if(r=W,i=ul,W=null,dl(e,t,n),W=r,ul=i,W!==null)if(ul)try{(W.nodeType===9?W.body:W.nodeName===`HTML`?W.ownerDocument.body:W).removeChild(n.stateNode)}catch(e){Z(n,t,e)}else try{W.removeChild(n.stateNode)}catch(e){Z(n,t,e)}break;case 18:W!==null&&(ul?(e=W,$d(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Pp(e)):$d(W,n.stateNode));break;case 4:r=W,i=ul,W=n.stateNode.containerInfo,ul=!0,dl(e,t,n),W=r,ul=i;break;case 0:case 11:case 14:case 15:Gc(2,n,t),U||Gc(4,n,t),dl(e,t,n);break;case 1:U||(Yc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&qc(n,t,r)),dl(e,t,n);break;case 21:dl(e,t,n);break;case 22:U=(r=U)||n.memoizedState!==null,dl(e,t,n),U=r;break;default:dl(e,t,n)}}function pl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Pp(e)}catch(e){Z(t,t.return,e)}}}function ml(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Pp(e)}catch(e){Z(t,t.return,e)}}function hl(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new al),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new al),t;default:throw Error(i(435,e.tag))}}function gl(e,t){var n=hl(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Xu.bind(null,e,t);t.then(r,r)}})}function _l(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(Qd(c.type)){W=c.stateNode,ul=!1;break a}break;case 5:W=c.stateNode,ul=!1;break a;case 3:case 4:W=c.stateNode.containerInfo,ul=!0;break a}c=c.return}if(W===null)throw Error(i(160));fl(o,s,a),W=null,ul=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)yl(t,e),t=t.sibling}var vl=null;function yl(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:_l(t,e),bl(e),r&4&&(Gc(3,e,e.return),Wc(3,e),Gc(5,e,e.return));break;case 1:_l(t,e),bl(e),r&512&&(U||n===null||Yc(n,n.return)),r&64&&rl&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=vl;if(_l(t,e),bl(e),r&512&&(U||n===null||Yc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null)if(r===null)if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[Ct]||o[gt]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Fd(o,r,n),o[gt]=e,kt(o),r=o;break a;case`link`:var s=Hf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Fd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Hf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Fd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[gt]=e,kt(o),r=o}e.stateNode=r}else Uf(a,e.type,e.stateNode);else e.stateNode=Lf(a,r,e.memoizedProps);else o===r?r===null&&e.stateNode!==null&&Zc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Uf(a,e.type,e.stateNode):Lf(a,r,e.memoizedProps))}break;case 27:_l(t,e),bl(e),r&512&&(U||n===null||Yc(n,n.return)),n!==null&&r&4&&Zc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(_l(t,e),bl(e),r&512&&(U||n===null||Yc(n,n.return)),e.flags&32){a=e.stateNode;try{en(a,``)}catch(t){Z(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,Zc(e,a,n===null?a:n.memoizedProps)),r&1024&&(il=!0);break;case 6:if(_l(t,e),bl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Z(e,e.return,t)}}break;case 3:if(Vf=null,a=vl,vl=_f(t.containerInfo),_l(t,e),vl=a,bl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Pp(t.containerInfo)}catch(t){Z(e,e.return,t)}il&&(il=!1,xl(e));break;case 4:r=vl,vl=_f(e.stateNode.containerInfo),_l(t,e),bl(e),vl=r;break;case 12:_l(t,e),bl(e);break;case 31:_l(t,e),bl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,gl(e,r)));break;case 13:_l(t,e),bl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(eu=Fe()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,gl(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=rl,d=U;if(rl=u||a,U=d||l,_l(t,e),U=d,rl=u,bl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||rl||U||Cl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Z(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Z(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?ef(m,!0):ef(l.stateNode,!1)}catch(e){Z(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,gl(e,n))));break;case 19:_l(t,e),bl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,gl(e,r)));break;case 30:break;case 21:break;default:_l(t,e),bl(e)}}function bl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Qc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;tl(e,$c(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(en(o,``),n.flags&=-33),tl(e,$c(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;el(e,$c(e),s);break;default:throw Error(i(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function xl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;xl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Sl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)cl(e,t.alternate,t),t=t.sibling}function Cl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Gc(4,t,t.return),Cl(t);break;case 1:Yc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&qc(t,t.return,n),Cl(t);break;case 27:mf(t.stateNode);case 26:case 5:Yc(t,t.return),Cl(t);break;case 22:t.memoizedState===null&&Cl(t);break;case 30:Cl(t);break;default:Cl(t)}e=e.sibling}}function wl(e,t,n){for(n&&=(t.subtreeFlags&8772)!=0,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:wl(i,a,n),Wc(4,a);break;case 1:if(wl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)no(c[i],s)}catch(e){Z(r,r.return,e)}}n&&o&64&&Kc(a),Jc(a,a.return);break;case 27:nl(a);case 26:case 5:wl(i,a,n),n&&r===null&&o&4&&Xc(a),Jc(a,a.return);break;case 12:wl(i,a,n);break;case 31:wl(i,a,n),n&&o&4&&pl(i,a);break;case 13:wl(i,a,n),n&&o&4&&ml(i,a);break;case 22:a.memoizedState===null&&wl(i,a,n),Jc(a,a.return);break;case 30:break;default:wl(i,a,n)}t=t.sibling}}function Tl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ha(n))}function El(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ha(e))}function Dl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Ol(e,t,n,r),t=t.sibling}function Ol(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Dl(e,t,n,r),i&2048&&Wc(9,t);break;case 1:Dl(e,t,n,r);break;case 3:Dl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ha(e)));break;case 12:if(i&2048){Dl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else Dl(e,t,n,r);break;case 31:Dl(e,t,n,r);break;case 13:Dl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?Dl(e,t,n,r):(a._visibility|=2,kl(e,t,n,r,(t.subtreeFlags&10256)!=0||!1)):a._visibility&2?Dl(e,t,n,r):Al(e,t),i&2048&&Tl(o,t);break;case 24:Dl(e,t,n,r),i&2048&&El(t.alternate,t);break;default:Dl(e,t,n,r)}}function kl(e,t,n,r,i){for(i&&=(t.subtreeFlags&10256)!=0||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:kl(a,o,s,c,i),Wc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,kl(a,o,s,c,i)):u._visibility&2?kl(a,o,s,c,i):Al(a,o),i&&l&2048&&Tl(o.alternate,o);break;case 24:kl(a,o,s,c,i),i&&l&2048&&El(o.alternate,o);break;default:kl(a,o,s,c,i)}t=t.sibling}}function Al(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Al(n,r),i&2048&&Tl(r.alternate,r);break;case 24:Al(n,r),i&2048&&El(r.alternate,r);break;default:Al(n,r)}t=t.sibling}}var jl=8192;function Ml(e,t,n){if(e.subtreeFlags&jl)for(e=e.child;e!==null;)Nl(e,t,n),e=e.sibling}function Nl(e,t,n){switch(e.tag){case 26:Ml(e,t,n),e.flags&jl&&e.memoizedState!==null&&Kf(n,vl,e.memoizedState,e.memoizedProps);break;case 5:Ml(e,t,n);break;case 3:case 4:var r=vl;vl=_f(e.stateNode.containerInfo),Ml(e,t,n),vl=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=jl,jl=16777216,Ml(e,t,n),jl=r):Ml(e,t,n));break;default:Ml(e,t,n)}}function Pl(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Fl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];ol=r,Rl(r,e)}Pl(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Il(e),e=e.sibling}function Il(e){switch(e.tag){case 0:case 11:case 15:Fl(e),e.flags&2048&&Gc(9,e,e.return);break;case 3:Fl(e);break;case 12:Fl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Ll(e)):Fl(e);break;default:Fl(e)}}function Ll(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];ol=r,Rl(r,e)}Pl(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Gc(8,t,t.return),Ll(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Ll(t));break;default:Ll(t)}e=e.sibling}}function Rl(e,t){for(;ol!==null;){var n=ol;switch(n.tag){case 0:case 11:case 15:Gc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ha(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,ol=r;else a:for(n=e;ol!==null;){r=ol;var i=r.sibling,a=r.return;if(ll(r),r===n){ol=null;break a}if(i!==null){i.return=a,ol=i;break a}ol=a}}}var zl={getCacheForType:function(e){var t=ca(N),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return ca(N).controller.signal}},Bl=typeof WeakMap==`function`?WeakMap:Map,G=0,K=null,q=null,J=0,Y=0,Vl=null,Hl=!1,Ul=!1,Wl=!1,Gl=0,X=0,Kl=0,ql=0,Jl=0,Yl=0,Xl=0,Zl=null,Ql=null,$l=!1,eu=0,tu=0,nu=1/0,ru=null,iu=null,au=0,ou=null,su=null,cu=0,lu=0,uu=null,du=null,fu=0,pu=null;function mu(){return G&2&&J!==0?J&-J:E.T===null?pt():fd()}function hu(){if(Yl===0)if(!(J&536870912)||M){var e=Qe;Qe<<=1,!(Qe&3932160)&&(Qe=262144),Yl=e}else Yl=536870912;return e=lo.current,e!==null&&(e.flags|=32),Yl}function gu(e,t,n){(e===K&&(Y===2||Y===9)||e.cancelPendingCommit!==null)&&(Cu(e,0),bu(e,J,Yl,!1)),ot(e,n),(!(G&2)||e!==K)&&(e===K&&(!(G&2)&&(ql|=n),X===4&&bu(e,J,Yl,!1)),id(e))}function _u(e,t,n){if(G&6)throw Error(i(327));var r=!n&&(t&127)==0&&(t&e.expiredLanes)===0||nt(e,t),a=r?ju(e,t):ku(e,t,!0),o=r;do{if(a===0){Ul&&!r&&bu(e,t,0,!1);break}else{if(n=e.current.alternate,o&&!yu(n)){a=ku(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=Zl;var l=c.current.memoizedState.isDehydrated;if(l&&(Cu(c,s).flags|=256),s=ku(c,s,!1),s!==2){if(Wl&&!l){c.errorRecoveryDisabledLanes|=o,ql|=o,a=4;break a}o=Ql,Ql=a,o!==null&&(Ql===null?Ql=o:Ql.push.apply(Ql,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Cu(e,0),bu(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:bu(r,t,Yl,!Hl);break a;case 2:Ql=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=eu+300-Fe(),10<a)){if(bu(r,t,Yl,!Hl),tt(r,0,!0)!==0)break a;cu=t,r.timeoutHandle=qd(vu.bind(null,r,n,Ql,ru,$l,t,Yl,ql,Xl,Hl,o,`Throttled`,-0,0),a);break a}vu(r,n,Ql,ru,$l,t,Yl,ql,Xl,Hl,o,null,-0,0)}}break}while(1);id(e)}function vu(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ln},Nl(t,a,d);var m=(a&62914560)===a?eu-Fe():(a&4194048)===a?tu-Fe():0;if(m=Jf(d,m),m!==null){cu=a,e.cancelPendingCommit=m(Ru.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),bu(e,a,o,!l);return}}Ru(e,t,a,n,r,i,o,s,c)}function yu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Ar(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function bu(e,t,n,r){t&=~Jl,t&=~ql,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-qe(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&ct(e,n,t)}function xu(){return G&6?!0:(ad(0,!1),!1)}function Su(){if(q!==null){if(Y===0)var e=q.return;else e=q,ea=$i=null,No(e),Ra=null,za=0,e=q;for(;e!==null;)Uc(e.alternate,e),e=e.return;q=null}}function Cu(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,Jd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),cu=0,Su(),K=e,q=n=vi(e.current,null),J=t,Y=0,Vl=null,Hl=!1,Ul=nt(e,t),Wl=!1,Xl=Yl=Jl=ql=Kl=X=0,Ql=Zl=null,$l=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-qe(r),a=1<<i;t|=e[i],r&=~a}return Gl=t,ci(),n}function wu(e,t){F=null,E.H=Hs,t===Oa||t===Aa?(t=Ia(),Y=3):t===ka?(t=Ia(),Y=4):Y=t===oc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Vl=t,q===null&&(X=1,ec(e,Ei(t,e.current)))}function Tu(){var e=lo.current;return e===null?!0:(J&4194048)===J?uo===null:(J&62914560)===J||J&536870912?e===uo:!1}function Eu(){var e=E.H;return E.H=Hs,e===null?Hs:e}function Du(){var e=E.A;return E.A=zl,e}function Ou(){X=4,Hl||(J&4194048)!==J&&lo.current!==null||(Ul=!0),!(Kl&134217727)&&!(ql&134217727)||K===null||bu(K,J,Yl,!1)}function ku(e,t,n){var r=G;G|=2;var i=Eu(),a=Du();(K!==e||J!==t)&&(ru=null,Cu(e,t)),t=!1;var o=X;a:do try{if(Y!==0&&q!==null){var s=q,c=Vl;switch(Y){case 8:Su(),o=6;break a;case 3:case 2:case 9:case 6:lo.current===null&&(t=!0);var l=Y;if(Y=0,Vl=null,Fu(e,s,c,l),n&&Ul){o=0;break a}break;default:l=Y,Y=0,Vl=null,Fu(e,s,c,l)}}Au(),o=X;break}catch(t){wu(e,t)}while(1);return t&&e.shellSuspendCounter++,ea=$i=null,G=r,E.H=i,E.A=a,q===null&&(K=null,J=0,ci()),o}function Au(){for(;q!==null;)Nu(q)}function ju(e,t){var n=G;G|=2;var r=Eu(),a=Du();K!==e||J!==t?(ru=null,nu=Fe()+500,Cu(e,t)):Ul=nt(e,t);a:do try{if(Y!==0&&q!==null){t=q;var o=Vl;b:switch(Y){case 1:Y=0,Vl=null,Fu(e,t,o,1);break;case 2:case 9:if(Ma(o)){Y=0,Vl=null,Pu(t);break}t=function(){Y!==2&&Y!==9||K!==e||(Y=7),id(e)},o.then(t,t);break a;case 3:Y=7;break a;case 4:Y=5;break a;case 7:Ma(o)?(Y=0,Vl=null,Pu(t)):(Y=0,Vl=null,Fu(e,t,o,7));break;case 5:var s=null;switch(q.tag){case 26:s=q.memoizedState;case 5:case 27:var c=q;if(s?Gf(s):c.stateNode.complete){Y=0,Vl=null;var l=c.sibling;if(l!==null)q=l;else{var u=c.return;u===null?q=null:(q=u,Iu(u))}break b}}Y=0,Vl=null,Fu(e,t,o,5);break;case 6:Y=0,Vl=null,Fu(e,t,o,6);break;case 8:Su(),X=6;break a;default:throw Error(i(462))}}Mu();break}catch(t){wu(e,t)}while(1);return ea=$i=null,E.H=r,E.A=a,G=n,q===null?(K=null,J=0,ci(),X):0}function Mu(){for(;q!==null&&!Ne();)Nu(q)}function Nu(e){var t=Fc(e.alternate,e,Gl);e.memoizedProps=e.pendingProps,t===null?Iu(e):q=t}function Pu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=yc(n,t,t.pendingProps,t.type,void 0,J);break;case 11:t=yc(n,t,t.pendingProps,t.type.render,t.ref,J);break;case 5:No(t);default:Uc(n,t),t=q=yi(t,Gl),t=Fc(n,t,Gl)}e.memoizedProps=e.pendingProps,t===null?Iu(e):q=t}function Fu(e,t,n,r){ea=$i=null,No(t),Ra=null,za=0;var i=t.return;try{if(ac(e,i,t,n,J)){X=1,ec(e,Ei(n,e.current)),q=null;return}}catch(t){if(i!==null)throw q=i,t;X=1,ec(e,Ei(n,e.current)),q=null;return}t.flags&32768?(M||r===1?e=!0:Ul||J&536870912?e=!1:(Hl=e=!0,(r===2||r===9||r===3||r===6)&&(r=lo.current,r!==null&&r.tag===13&&(r.flags|=16384))),Lu(t,e)):Iu(t)}function Iu(e){var t=e;do{if(t.flags&32768){Lu(t,Hl);return}e=t.return;var n=Vc(t.alternate,t,Gl);if(n!==null){q=n;return}if(t=t.sibling,t!==null){q=t;return}q=t=e}while(t!==null);X===0&&(X=5)}function Lu(e,t){do{var n=Hc(e.alternate,e);if(n!==null){n.flags&=32767,q=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){q=e;return}q=e=n}while(e!==null);X=6,q=null}function Ru(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do Uu();while(au!==0);if(G&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=si,st(e,n,o,s,c,l),e===K&&(q=K=null,J=0),su=t,ou=e,cu=n,lu=o,uu=a,du=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Zu(ze,function(){return Wu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!=0,t.subtreeFlags&13878||r){r=E.T,E.T=null,a=D.p,D.p=2,s=G,G|=4;try{sl(e,t,n)}finally{G=s,D.p=a,E.T=r}}au=1,zu(),Bu(),Vu()}}function zu(){if(au===1){au=0;var e=ou,t=su,n=(t.flags&13878)!=0;if(t.subtreeFlags&13878||n){n=E.T,E.T=null;var r=D.p;D.p=2;var i=G;G|=4;try{yl(t,e);var a=Bd,o=Fr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&Pr(s.ownerDocument.documentElement,s)){if(c!==null&&Ir(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Nr(s,h),v=Nr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}cp=!!zd,Bd=zd=null}finally{G=i,D.p=r,E.T=n}}e.current=t,au=2}}function Bu(){if(au===2){au=0;var e=ou,t=su,n=(t.flags&8772)!=0;if(t.subtreeFlags&8772||n){n=E.T,E.T=null;var r=D.p;D.p=2;var i=G;G|=4;try{cl(e,t.alternate,t)}finally{G=i,D.p=r,E.T=n}}au=3}}function Vu(){if(au===4||au===3){au=0,Pe();var e=ou,t=su,n=cu,r=du;t.subtreeFlags&10256||t.flags&10256?au=5:(au=0,su=ou=null,Hu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(iu=null),ft(n),t=t.stateNode,Ge&&typeof Ge.onCommitFiberRoot==`function`)try{Ge.onCommitFiberRoot(We,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=E.T,i=D.p,D.p=2,E.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{E.T=t,D.p=i}}cu&3&&Uu(),id(e),i=e.pendingLanes,n&261930&&i&42?e===pu?fu++:(fu=0,pu=e):fu=0,ad(0,!1)}}function Hu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ha(t)))}function Uu(){return zu(),Bu(),Vu(),Wu()}function Wu(){if(au!==5)return!1;var e=ou,t=lu;lu=0;var n=ft(cu),r=E.T,a=D.p;try{D.p=32>n?32:n,E.T=null,n=uu,uu=null;var o=ou,s=cu;if(au=0,su=ou=null,cu=0,G&6)throw Error(i(331));var c=G;if(G|=4,Il(o.current),Ol(o,o.current,s,n),G=c,ad(0,!1),Ge&&typeof Ge.onPostCommitFiberRoot==`function`)try{Ge.onPostCommitFiberRoot(We,o)}catch{}return!0}finally{D.p=a,E.T=r,Hu(e,t)}}function Gu(e,t,n){t=Ei(n,t),t=nc(e.stateNode,t,2),e=Xa(e,t,2),e!==null&&(ot(e,2),id(e))}function Z(e,t,n){if(e.tag===3)Gu(e,e,n);else for(;t!==null;){if(t.tag===3){Gu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(iu===null||!iu.has(r))){e=Ei(n,e),n=rc(2),r=Xa(t,n,2),r!==null&&(ic(n,r,t,e),ot(r,2),id(r));break}}t=t.return}}function Ku(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Bl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Wl=!0,i.add(n),e=qu.bind(null,e,t,n),t.then(e,e))}function qu(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,K===e&&(J&n)===n&&(X===4||X===3&&(J&62914560)===J&&300>Fe()-eu?!(G&2)&&Cu(e,0):Jl|=n,Xl===J&&(Xl=0)),id(e)}function Ju(e,t){t===0&&(t=it()),e=di(e,t),e!==null&&(ot(e,t),id(e))}function Yu(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ju(e,n)}function Xu(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),Ju(e,n)}function Zu(e,t){return je(e,t)}var Qu=null,$u=null,ed=!1,td=!1,nd=!1,rd=0;function id(e){e!==$u&&e.next===null&&($u===null?Qu=$u=e:$u=$u.next=e),td=!0,ed||(ed=!0,dd())}function ad(e,t){if(!nd&&td){nd=!0;do for(var n=!1,r=Qu;r!==null;){if(!t)if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-qe(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,ud(r,a))}else a=J,a=tt(r,r===K?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||nt(r,a)||(n=!0,ud(r,a));r=r.next}while(n);nd=!1}}function od(){sd()}function sd(){td=ed=!1;var e=0;rd!==0&&Kd()&&(e=rd);for(var t=Fe(),n=null,r=Qu;r!==null;){var i=r.next,a=cd(r,t);a===0?(r.next=null,n===null?Qu=i:n.next=i,i===null&&($u=n)):(n=r,(e!==0||a&3)&&(td=!0)),r=i}au!==0&&au!==5||ad(e,!1),rd!==0&&(rd=0)}function cd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-qe(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=rt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=K,n=J,n=tt(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(Y===2||Y===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Me(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||nt(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Me(r),ft(n)){case 2:case 8:n=Re;break;case 32:n=ze;break;case 268435456:n=Ve;break;default:n=ze}return r=ld.bind(null,e),n=je(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Me(r),e.callbackPriority=2,e.callbackNode=null,2}function ld(e,t){if(au!==0&&au!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Uu()&&e.callbackNode!==n)return null;var r=J;return r=tt(e,e===K?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(_u(e,r,t),cd(e,Fe()),e.callbackNode!=null&&e.callbackNode===n?ld.bind(null,e):null)}function ud(e,t){if(Uu())return null;_u(e,t,!0)}function dd(){Xd(function(){G&6?je(Le,od):sd()})}function fd(){if(rd===0){var e=va;e===0&&(e=Ze,Ze<<=1,!(Ze&261888)&&(Ze=256)),rd=e}return rd}function pd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:cn(``+e)}function md(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function hd(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=pd((i[_t]||null).action),o=r.submitter;o&&(t=(t=o[_t]||null)?pd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new An(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(rd!==0){var e=o?md(i,o):new FormData(i);Os(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?md(i,o):new FormData(i),Os(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var gd=0;gd<ni.length;gd++){var _d=ni[gd];ri(_d.toLowerCase(),`on`+(_d[0].toUpperCase()+_d.slice(1)))}ri(Jr,`onAnimationEnd`),ri(Yr,`onAnimationIteration`),ri(Xr,`onAnimationStart`),ri(`dblclick`,`onDoubleClick`),ri(`focusin`,`onFocus`),ri(`focusout`,`onBlur`),ri(Zr,`onTransitionRun`),ri(Qr,`onTransitionStart`),ri($r,`onTransitionCancel`),ri(ei,`onTransitionEnd`),Nt(`onMouseEnter`,[`mouseout`,`mouseover`]),Nt(`onMouseLeave`,[`mouseout`,`mouseover`]),Nt(`onPointerEnter`,[`pointerout`,`pointerover`]),Nt(`onPointerLeave`,[`pointerout`,`pointerover`]),Mt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Mt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Mt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Mt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Mt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Mt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var vd=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),yd=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(vd));function bd(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ii(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ii(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[yt];n===void 0&&(n=t[yt]=new Set);var r=e+`__bubble`;n.has(r)||(wd(t,e,2,!1),n.add(r))}function xd(e,t,n){var r=0;t&&(r|=4),wd(n,e,r,t)}var Sd=`_reactListening`+Math.random().toString(36).slice(2);function Cd(e){if(!e[Sd]){e[Sd]=!0,At.forEach(function(t){t!==`selectionchange`&&(yd.has(t)||xd(t,!1,e),xd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Sd]||(t[Sd]=!0,xd(`selectionchange`,!1,t))}}function wd(e,t,n,r){switch(hp(t)){case 2:var i=lp;break;case 8:i=up;break;default:i=dp}n=i.bind(null,t,n,e),i=void 0,!yn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Td(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=Tt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}gn(function(){var r=a,i=dn(n),s=[];a:{var c=ti.get(e);if(c!==void 0){var l=An,u=e;switch(e){case`keypress`:if(Tn(n)===0)break a;case`keydown`:case`keyup`:l=qn;break;case`focusin`:u=`focus`,l=zn;break;case`focusout`:u=`blur`,l=zn;break;case`beforeblur`:case`afterblur`:l=zn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Ln;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Rn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=Yn;break;case Jr:case Yr:case Xr:l=Bn;break;case ei:l=Xn;break;case`scroll`:case`scrollend`:l=Mn;break;case`wheel`:l=Zn;break;case`copy`:case`cut`:case`paste`:l=Vn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=Jn;break;case`toggle`:case`beforetoggle`:l=Qn}var d=(t&4)!=0,f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=_n(m,p),g!=null&&d.push(Ed(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==un&&(u=n.relatedTarget||n.fromElement)&&(Tt(u)||u[vt]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?Tt(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=Ln,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Jn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:Dt(l),h=u==null?c:Dt(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,Tt(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=Od,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&kd(s,c,l,d,!1),u!==null&&f!==null&&kd(s,f,u,d,!0)}}a:{if(c=r?Dt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=vr;else if(fr(c))if(yr)v=Or;else{v=Er;var y=Tr}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&an(r.elementType)&&(v=vr):v=Dr;if(v&&=v(e,r)){pr(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&Xt(c,`number`,c.value)}switch(y=r?Dt(r):window,e){case`focusin`:(fr(y)||y.contentEditable===`true`)&&(Rr=y,zr=r,Br=null);break;case`focusout`:Br=zr=Rr=null;break;case`mousedown`:Vr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Vr=!1,Hr(s,n,i);break;case`selectionchange`:if(Lr)break;case`keydown`:case`keyup`:Hr(s,n,i)}var b;if(er)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else cr?or(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(rr&&n.locale!==`ko`&&(cr||x!==`onCompositionStart`?x===`onCompositionEnd`&&cr&&(b=wn()):(xn=i,Sn=`value`in xn?xn.value:xn.textContent,cr=!0)),y=Dd(r,x),0<y.length&&(x=new Hn(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=sr(n),b!==null&&(x.data=b)))),(b=nr?lr(e,n):ur(e,n))&&(x=Dd(r,`onBeforeInput`),0<x.length&&(y=new Hn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),hd(s,e,r,n,i)}bd(s,t)})}function Ed(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Dd(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=_n(e,n),i!=null&&r.unshift(Ed(e,i,a)),i=_n(e,t),i!=null&&r.push(Ed(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Od(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function kd(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=_n(n,a),l!=null&&o.unshift(Ed(n,l,c))):i||(l=_n(n,a),l!=null&&o.push(Ed(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Ad=/\r\n?/g,jd=/\u0000|\uFFFD/g;function Md(e){return(typeof e==`string`?e:``+e).replace(Ad,`
`).replace(jd,``)}function Nd(e,t){return t=Md(t),Md(e)===t}function $(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||en(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&en(e,``+r);break;case`className`:Rt(e,`class`,r);break;case`tabIndex`:Rt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Rt(e,n,r);break;case`style`:rn(e,r,o);break;case`data`:if(t!==`object`){Rt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=cn(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}else typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null)));if(r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=cn(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=ln);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=cn(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),Lt(e,`popover`,r);break;case`xlinkActuate`:zt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:zt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:zt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:zt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:zt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:zt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:zt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:zt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:zt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Lt(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=on.get(n)||n,Lt(e,n,r))}}function Pd(e,t,n,r,a,o){switch(n){case`style`:rn(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?en(e,r):(typeof r==`number`||typeof r==`bigint`)&&en(e,``+r);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=ln);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!jt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[_t]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):Lt(e,n,r)}}}function Fd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}Yt(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&Zt(e,!!r,n,!0):Zt(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}$t(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<vd.length;r++)Q(vd[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if(an(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Pd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}function Id(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}Jt(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?Zt(e,!!n,n?[]:``,!1):Zt(e,!!n,t,!0)):Zt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}Qt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(an(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Pd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Pd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function Ld(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Rd(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Ld(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Ld(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var zd=null,Bd=null;function Vd(e){return e.nodeType===9?e:e.ownerDocument}function Hd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Ud(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Wd(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Gd=null;function Kd(){var e=window.event;return e&&e.type===`popstate`?e===Gd?!1:(Gd=e,!0):(Gd=null,!1)}var qd=typeof setTimeout==`function`?setTimeout:void 0,Jd=typeof clearTimeout==`function`?clearTimeout:void 0,Yd=typeof Promise==`function`?Promise:void 0,Xd=typeof queueMicrotask==`function`?queueMicrotask:Yd===void 0?qd:function(e){return Yd.resolve(null).then(e).catch(Zd)};function Zd(e){setTimeout(function(){throw e})}function Qd(e){return e===`head`}function $d(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Pp(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)mf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,mf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[Ct]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&mf(e.ownerDocument.body);n=i}while(n);Pp(t)}function ef(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8)if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++;n=r}while(n)}function tf(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:tf(n),wt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function nf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r)if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e;else if(!e[Ct])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=lf(e.nextSibling),e===null)break}return null}function rf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=lf(e.nextSibling),e===null))return null;return e}function af(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=lf(e.nextSibling),e===null))return null;return e}function of(e){return e.data===`$?`||e.data===`$~`}function sf(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function cf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function lf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var uf=null;function df(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return lf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function ff(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function pf(e,t,n){switch(t=Vd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function mf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);wt(e)}var hf=new Map,gf=new Set;function _f(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var vf=D.d;D.d={f:yf,r:bf,D:Cf,C:wf,L:Tf,m:Ef,X:Of,S:Df,M:kf};function yf(){var e=vf.f(),t=xu();return e||t}function bf(e){var t=Et(e);t!==null&&t.tag===5&&t.type===`form`?As(t):vf.r(e)}var xf=typeof document>`u`?null:document;function Sf(e,t,n){var r=xf;if(r&&typeof t==`string`&&t){var i=qt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),gf.has(i)||(gf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Fd(t,`link`,e),kt(t),r.head.appendChild(t)))}}function Cf(e){vf.D(e),Sf(`dns-prefetch`,e,null)}function wf(e,t){vf.C(e,t),Sf(`preconnect`,e,t)}function Tf(e,t,n){vf.L(e,t,n);var r=xf;if(r&&e&&t){var i=`link[rel="preload"][as="`+qt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+qt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+qt(n.imageSizes)+`"]`)):i+=`[href="`+qt(e)+`"]`;var a=i;switch(t){case`style`:a=jf(e);break;case`script`:a=Ff(e)}hf.has(a)||(e=h({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),hf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(Mf(a))||t===`script`&&r.querySelector(If(a))||(t=r.createElement(`link`),Fd(t,`link`,e),kt(t),r.head.appendChild(t)))}}function Ef(e,t){vf.m(e,t);var n=xf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+qt(r)+`"][href="`+qt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Ff(e)}if(!hf.has(a)&&(e=h({rel:`modulepreload`,href:e},t),hf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(If(a)))return}r=n.createElement(`link`),Fd(r,`link`,e),kt(r),n.head.appendChild(r)}}}function Df(e,t,n){vf.S(e,t,n);var r=xf;if(r&&e){var i=Ot(r).hoistableStyles,a=jf(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(Mf(a)))s.loading=5;else{e=h({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=hf.get(a))&&zf(e,n);var c=o=r.createElement(`link`);kt(c),Fd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Rf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Of(e,t){vf.X(e,t);var n=xf;if(n&&e){var r=Ot(n).hoistableScripts,i=Ff(e),a=r.get(i);a||(a=n.querySelector(If(i)),a||(e=h({src:e,async:!0},t),(t=hf.get(i))&&Bf(e,t),a=n.createElement(`script`),kt(a),Fd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t){vf.M(e,t);var n=xf;if(n&&e){var r=Ot(n).hoistableScripts,i=Ff(e),a=r.get(i);a||(a=n.querySelector(If(i)),a||(e=h({src:e,async:!0,type:`module`},t),(t=hf.get(i))&&Bf(e,t),a=n.createElement(`script`),kt(a),Fd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Af(e,t,n,r){var a=(a=_e.current)?_f(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=jf(n.href),n=Ot(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=jf(n.href);var o=Ot(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(Mf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),hf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},hf.set(e,n),o||Pf(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Ff(n),n=Ot(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function jf(e){return`href="`+qt(e)+`"`}function Mf(e){return`link[rel="stylesheet"][`+e+`]`}function Nf(e){return h({},e,{"data-precedence":e.precedence,precedence:null})}function Pf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Fd(t,`link`,n),kt(t),e.head.appendChild(t))}function Ff(e){return`[src="`+qt(e)+`"]`}function If(e){return`script[async]`+e}function Lf(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+qt(n.href)+`"]`);if(r)return t.instance=r,kt(r),r;var a=h({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),kt(r),Fd(r,`style`,a),Rf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=jf(n.href);var o=e.querySelector(Mf(a));if(o)return t.state.loading|=4,t.instance=o,kt(o),o;r=Nf(n),(a=hf.get(a))&&zf(r,a),o=(e.ownerDocument||e).createElement(`link`),kt(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Fd(o,`link`,r),t.state.loading|=4,Rf(o,n.precedence,e),t.instance=o;case`script`:return o=Ff(n.src),(a=e.querySelector(If(o)))?(t.instance=a,kt(a),a):(r=n,(a=hf.get(o))&&(r=h({},n),Bf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),kt(a),Fd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Rf(r,n.precedence,e));return t.instance}function Rf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function Bf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Vf=null;function Hf(e,t,n){if(Vf===null){var r=new Map,i=Vf=new Map;i.set(n,r)}else i=Vf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[Ct]||a[gt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Uf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Wf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Gf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Kf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=jf(r.href),a=t.querySelector(Mf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Yf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,kt(a);return}a=t.ownerDocument||t,r=Nf(r),(i=hf.get(i))&&zf(r,i),a=a.createElement(`link`),kt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Fd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Yf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var qf=0;function Jf(e,t){return e.stylesheets&&e.count===0&&Zf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Zf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&qf===0&&(qf=62500*Rd());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Zf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>qf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Yf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Zf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Xf=null;function Zf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Xf=new Map,t.forEach(Qf,e),Xf=null,Yf.call(e))}function Qf(e,t){if(!(t.state.loading&4)){var n=Xf.get(e);if(n)var r=n.get(null);else{n=new Map,Xf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Yf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var $f={$$typeof:S,Provider:null,Consumer:null,_currentValue:ue,_currentValue2:ue,_threadCount:0};function ep(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=at(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=at(0),this.hiddenUpdates=at(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function tp(e,t,n,r,i,a,o,s,c,l,u,d){return e=new ep(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=gi(3,null,null,t),e.current=a,a.stateNode=e,t=ma(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},qa(a),e}function np(e){return e?(e=mi,e):mi}function rp(e,t,n,r,i,a){i=np(i),r.context===null?r.context=i:r.pendingContext=i,r=Ya(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Xa(e,r,t),n!==null&&(gu(n,e,t),Za(n,e,t))}function ip(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ap(e,t){ip(e,t),(e=e.alternate)&&ip(e,t)}function op(e){if(e.tag===13||e.tag===31){var t=di(e,67108864);t!==null&&gu(t,e,67108864),ap(e,67108864)}}function sp(e){if(e.tag===13||e.tag===31){var t=mu();t=dt(t);var n=di(e,t);n!==null&&gu(n,e,t),ap(e,t)}}var cp=!0;function lp(e,t,n,r){var i=E.T;E.T=null;var a=D.p;try{D.p=2,dp(e,t,n,r)}finally{D.p=a,E.T=i}}function up(e,t,n,r){var i=E.T;E.T=null;var a=D.p;try{D.p=8,dp(e,t,n,r)}finally{D.p=a,E.T=i}}function dp(e,t,n,r){if(cp){var i=fp(r);if(i===null)Td(e,t,r,pp,n),wp(e,r);else if(Ep(i,e,t,n,r))r.stopPropagation();else if(wp(e,r),t&4&&-1<Cp.indexOf(e)){for(;i!==null;){var a=Et(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=et(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-qe(o);s.entanglements[1]|=c,o&=~c}id(a),!(G&6)&&(nu=Fe()+500,ad(0,!1))}}break;case 31:case 13:s=di(a,2),s!==null&&gu(s,a,2),xu(),ap(a,2)}if(a=fp(r),a===null&&Td(e,t,r,pp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Td(e,t,r,null,n)}}function fp(e){return e=dn(e),mp(e)}var pp=null;function mp(e){if(pp=null,e=Tt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return pp=e,null}function hp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Ie()){case Le:return 2;case Re:return 8;case ze:case Be:return 32;case Ve:return 268435456;default:return 32}default:return 32}}var gp=!1,_p=null,vp=null,yp=null,bp=new Map,xp=new Map,Sp=[],Cp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function wp(e,t){switch(e){case`focusin`:case`focusout`:_p=null;break;case`dragenter`:case`dragleave`:vp=null;break;case`mouseover`:case`mouseout`:yp=null;break;case`pointerover`:case`pointerout`:bp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:xp.delete(t.pointerId)}}function Tp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Et(t),t!==null&&op(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Ep(e,t,n,r,i){switch(t){case`focusin`:return _p=Tp(_p,e,t,n,r,i),!0;case`dragenter`:return vp=Tp(vp,e,t,n,r,i),!0;case`mouseover`:return yp=Tp(yp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return bp.set(a,Tp(bp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,xp.set(a,Tp(xp.get(a)||null,e,t,n,r,i)),!0}return!1}function Dp(e){var t=Tt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,mt(e.priority,function(){sp(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,mt(e.priority,function(){sp(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Op(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=fp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);un=r,n.target.dispatchEvent(r),un=null}else return t=Et(n),t!==null&&op(t),e.blockedOn=n,!1;t.shift()}return!0}function kp(e,t,n){Op(e)&&n.delete(t)}function Ap(){gp=!1,_p!==null&&Op(_p)&&(_p=null),vp!==null&&Op(vp)&&(vp=null),yp!==null&&Op(yp)&&(yp=null),bp.forEach(kp),xp.forEach(kp)}function jp(e,n){e.blockedOn===n&&(e.blockedOn=null,gp||(gp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,Ap)))}var Mp=null;function Np(e){Mp!==e&&(Mp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Mp===e&&(Mp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(mp(r||n)===null)continue;break}var a=Et(n);a!==null&&(e.splice(t,3),t-=3,Os(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Pp(e){function t(t){return jp(t,e)}_p!==null&&jp(_p,e),vp!==null&&jp(vp,e),yp!==null&&jp(yp,e),bp.forEach(t),xp.forEach(t);for(var n=0;n<Sp.length;n++){var r=Sp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Sp.length&&(n=Sp[0],n.blockedOn===null);)Dp(n),n.blockedOn===null&&Sp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[_t]||null;if(typeof a==`function`)o||Np(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[_t]||null)s=o.formAction;else if(mp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Np(n)}}}function Fp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Ip(e){this._internalRoot=e}Lp.prototype.render=Ip.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;rp(n,mu(),e,t,null,null)},Lp.prototype.unmount=Ip.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;rp(e.current,2,null,e,null,null),xu(),t[vt]=null}};function Lp(e){this._internalRoot=e}Lp.prototype.unstable_scheduleHydration=function(e){if(e){var t=pt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Sp.length&&t!==0&&t<Sp[n].priority;n++);Sp.splice(n,0,e),n===0&&Dp(e)}};var Rp=n.version;if(Rp!==`19.2.4`)throw Error(i(527,Rp,`19.2.4`));D.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var zp={bundleType:0,version:`19.2.4`,rendererPackageName:`react-dom`,currentDispatcherRef:E,reconcilerVersion:`19.2.4`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Bp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Bp.isDisabled&&Bp.supportsFiber)try{We=Bp.inject(zp),Ge=Bp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Zs,s=Qs,c=$s;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=tp(e,1,!1,null,null,n,r,null,o,s,c,Fp),e[vt]=t.current,Cd(e),new Ip(t)}})),g=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=`modulepreload`,v=function(e){return`/`+e},y={},b=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=v(t,n),t in y)return;y[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:_,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},x=c(u(),1),ee=`popstate`;function S(e){return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e}function C(e={}){function t(e,t){let n=t.state?.masked,{pathname:r,search:i,hash:a}=n||e.location;return re(``,{pathname:r,search:i,hash:a},t.state&&t.state.usr||null,t.state&&t.state.key||`default`,n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)}function n(e,t){return typeof t==`string`?t:ie(t)}return oe(t,n,null,e)}function w(e,t){if(e===!1||e==null)throw Error(t)}function T(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function te(){return Math.random().toString(36).substring(2,10)}function ne(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.unstable_mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function re(e,t,n=null,r,i){return{pathname:typeof e==`string`?e:e.pathname,search:``,hash:``,...typeof t==`string`?ae(t):t,state:n,key:t&&t.key||r||te(),unstable_mask:i}}function ie({pathname:e=`/`,search:t=``,hash:n=``}){return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),e}function ae(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function oe(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=`POP`,c=null,l=u();l??(l=0,o.replaceState({...o.state,idx:l},``));function u(){return(o.state||{idx:null}).idx}function d(){s=`POP`;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=`PUSH`;let r=S(e)?e:re(h.location,e,t);n&&n(r,e),l=u()+1;let d=ne(r,l),f=h.createHref(r.unstable_mask||r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=`REPLACE`;let r=S(e)?e:re(h.location,e,t);n&&n(r,e),l=u();let i=ne(r,l),d=h.createHref(r.unstable_mask||r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){return se(e)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(ee,d),c=e,()=>{i.removeEventListener(ee,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}function se(e,t=!1){let n=`http://localhost`;typeof window<`u`&&(n=window.location.origin===`null`?window.location.href:window.location.origin),w(n,`No window.location.(origin|href) available to create URL`);let r=typeof e==`string`?e:ie(e);return r=r.replace(/ $/,`%20`),!t&&r.startsWith(`//`)&&(r=n+r),new URL(r,n)}function ce(e,t,n=`/`){return le(e,t,n,!1)}function le(e,t,n,r){let i=we((typeof t==`string`?ae(t):t).pathname||`/`,n);if(i==null)return null;let a=D(e);de(a);let o=null;for(let e=0;o==null&&e<a.length;++e){let t=Ce(i);o=be(a[e],t,r)}return o}function E(e,t){let{route:n,pathname:r,params:i}=e;return{id:n.id,pathname:r,params:i,data:t[n.id],loaderData:t[n.id],handle:n.handle}}function D(e,t=[],n=[],r=``,i=!1){let a=(e,a,o=i,s)=>{let c={relativePath:s===void 0?e.path||``:s,caseSensitive:e.caseSensitive===!0,childrenIndex:a,route:e};if(c.relativePath.startsWith(`/`)){if(!c.relativePath.startsWith(r)&&o)return;w(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length)}let l=Me([r,c.relativePath]),u=n.concat(c);e.children&&e.children.length>0&&(w(e.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),D(e.children,t,u,l,o)),!(e.path==null&&!e.index)&&t.push({path:l,score:ve(l,e.index),routesMeta:u})};return e.forEach((e,t)=>{if(e.path===``||!e.path?.includes(`?`))a(e,t);else for(let n of ue(e.path))a(e,t,!0,n)}),t}function ue(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=ue(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function de(e){e.sort((e,t)=>e.score===t.score?ye(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var fe=/^:[\w-]+$/,pe=3,me=2,O=1,he=10,ge=-2,_e=e=>e===`*`;function ve(e,t){let n=e.split(`/`),r=n.length;return n.some(_e)&&(r+=ge),t&&(r+=me),n.filter(e=>!_e(e)).reduce((e,t)=>e+(fe.test(t)?pe:t===``?O:he),r)}function ye(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function be(e,t,n=!1){let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u=xe({path:s.relativePath,caseSensitive:s.caseSensitive,end:c},l),d=s.route;if(!u&&c&&n&&!r[r.length-1].route.index&&(u=xe({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!u)return null;Object.assign(i,u.params),o.push({params:i,pathname:Me([a,u.pathname]),pathnameBase:Ne(Me([a,u.pathnameBase])),route:d}),u.pathnameBase!==`/`&&(a=Me([a,u.pathnameBase]))}return o}function xe(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Se(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,{paramName:t,isOptional:n},r)=>{if(t===`*`){let e=s[r]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let i=s[r];return n&&!i?e[t]=void 0:e[t]=(i||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function Se(e,t=!1,n=!0){T(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n,i,a)=>{if(r.push({paramName:t,isOptional:n!=null}),n){let t=a.charAt(i+e.length);return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`}return`/([^\\/]+)`}).replace(/\/([\w-]+)\?(\/|$)/g,`(/$1)?$2`);return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function Ce(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return T(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function we(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}var Te=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function Ee(e,t=`/`){let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?ae(e):e,a;return n?(n=n.replace(/\/\/+/g,`/`),a=n.startsWith(`/`)?De(n.substring(1),`/`):De(n,t)):a=t,{pathname:a,search:Pe(r),hash:Fe(i)}}function De(e,t){let n=t.replace(/\/+$/,``).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function Oe(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function ke(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function Ae(e){let t=ke(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function je(e,t,n,r=!1){let i;typeof e==`string`?i=ae(e):(i={...e},w(!i.pathname||!i.pathname.includes(`?`),Oe(`?`,`pathname`,`search`,i)),w(!i.pathname||!i.pathname.includes(`#`),Oe(`#`,`pathname`,`hash`,i)),w(!i.search||!i.search.includes(`#`),Oe(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=Ee(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var Me=e=>e.join(`/`).replace(/\/\/+/g,`/`),Ne=e=>e.replace(/\/+$/,``).replace(/^\/*/,`/`),Pe=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,Fe=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,Ie=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||``,this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Le(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}function Re(e){return e.map(e=>e.route.path).filter(Boolean).join(`/`).replace(/\/\/*/g,`/`)||`/`}var ze=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;function Be(e,t){let n=e;if(typeof n!=`string`||!Te.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if(ze)try{let e=new URL(window.location.href),r=n.startsWith(`//`)?new URL(e.protocol+n):new URL(n),a=we(r.pathname,t);r.origin===e.origin&&a!=null?n=a+r.search+r.hash:i=!0}catch{T(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var Ve=[`POST`,`PUT`,`PATCH`,`DELETE`];new Set(Ve);var He=[`GET`,...Ve];new Set(He);var Ue=x.createContext(null);Ue.displayName=`DataRouter`;var We=x.createContext(null);We.displayName=`DataRouterState`;var Ge=x.createContext(!1),Ke=x.createContext({isTransitioning:!1});Ke.displayName=`ViewTransition`;var qe=x.createContext(new Map);qe.displayName=`Fetchers`;var Je=x.createContext(null);Je.displayName=`Await`;var Ye=x.createContext(null);Ye.displayName=`Navigation`;var Xe=x.createContext(null);Xe.displayName=`Location`;var Ze=x.createContext({outlet:null,matches:[],isDataRoute:!1});Ze.displayName=`Route`;var Qe=x.createContext(null);Qe.displayName=`RouteError`;var $e=`REACT_ROUTER_ERROR`,et=`REDIRECT`,tt=`ROUTE_ERROR_RESPONSE`;function nt(e){if(e.startsWith(`${$e}:${et}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t}catch{}}function rt(e){if(e.startsWith(`${$e}:${tt}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new Ie(t.status,t.statusText,t.data)}catch{}}function it(e,{relative:t}={}){w(at(),`useHref() may be used only in the context of a <Router> component.`);let{basename:n,navigator:r}=x.useContext(Ye),{hash:i,pathname:a,search:o}=dt(e,{relative:t}),s=a;return n!==`/`&&(s=a===`/`?n:Me([n,a])),r.createHref({pathname:s,search:o,hash:i})}function at(){return x.useContext(Xe)!=null}function ot(){return w(at(),`useLocation() may be used only in the context of a <Router> component.`),x.useContext(Xe).location}var st=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;function ct(e){x.useContext(Ye).static||x.useLayoutEffect(e)}function lt(){let{isDataRoute:e}=x.useContext(Ze);return e?At():ut()}function ut(){w(at(),`useNavigate() may be used only in the context of a <Router> component.`);let e=x.useContext(Ue),{basename:t,navigator:n}=x.useContext(Ye),{matches:r}=x.useContext(Ze),{pathname:i}=ot(),a=JSON.stringify(Ae(r)),o=x.useRef(!1);return ct(()=>{o.current=!0}),x.useCallback((r,s={})=>{if(T(o.current,st),!o.current)return;if(typeof r==`number`){n.go(r);return}let c=je(r,JSON.parse(a),i,s.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:Me([t,c.pathname])),(s.replace?n.replace:n.push)(c,s.state,s)},[t,n,a,i,e])}x.createContext(null);function dt(e,{relative:t}={}){let{matches:n}=x.useContext(Ze),{pathname:r}=ot(),i=JSON.stringify(Ae(n));return x.useMemo(()=>je(e,JSON.parse(i),r,t===`path`),[e,i,r,t])}function ft(e,t){return pt(e,t)}function pt(e,t,n){w(at(),`useRoutes() may be used only in the context of a <Router> component.`);let{navigator:r}=x.useContext(Ye),{matches:i}=x.useContext(Ze),a=i[i.length-1],o=a?a.params:{},s=a?a.pathname:`/`,c=a?a.pathnameBase:`/`,l=a&&a.route;{let e=l&&l.path||``;Mt(s,!l||e.endsWith(`*`)||e.endsWith(`*?`),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${e}/*`}">.`)}let u=ot(),d;if(t){let e=typeof t==`string`?ae(t):t;w(c===`/`||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),d=e}else d=u;let f=d.pathname||`/`,p=f;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);p=`/`+f.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let m=ce(e,{pathname:p});T(l||m!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),T(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=bt(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:Me([c,r.encodeLocation?r.encodeLocation(e.pathname.replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:Me([c,r.encodeLocation?r.encodeLocation(e.pathnameBase.replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathnameBase])})),i,n);return t&&h?x.createElement(Xe.Provider,{value:{location:{pathname:`/`,search:``,hash:``,state:null,key:`default`,unstable_mask:void 0,...d},navigationType:`POP`}},h):h}function mt(){let e=kt(),t=Le(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r=`rgba(200,200,200, 0.5)`,i={padding:`0.5rem`,backgroundColor:r},a={padding:`2px 4px`,backgroundColor:r},o=null;return console.error(`Error handled by React Router default ErrorBoundary:`,e),o=x.createElement(x.Fragment,null,x.createElement(`p`,null,`💿 Hey developer 👋`),x.createElement(`p`,null,`You can provide a way better UX than this when your app throws errors by providing your own `,x.createElement(`code`,{style:a},`ErrorBoundary`),` or`,` `,x.createElement(`code`,{style:a},`errorElement`),` prop on your route.`)),x.createElement(x.Fragment,null,x.createElement(`h2`,null,`Unexpected Application Error!`),x.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?x.createElement(`pre`,{style:i},n):null,o)}var ht=x.createElement(mt,null),gt=class extends x.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error(`React Router caught the following error during render`,e)}render(){let e=this.state.error;if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){let t=rt(e.digest);t&&(e=t)}let t=e===void 0?this.props.children:x.createElement(Ze.Provider,{value:this.props.routeContext},x.createElement(Qe.Provider,{value:e,children:this.props.component}));return this.context?x.createElement(vt,{error:e},t):t}};gt.contextType=Ge;var _t=new WeakMap;function vt({children:e,error:t}){let{basename:n}=x.useContext(Ye);if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){let e=nt(t.digest);if(e){let r=_t.get(t);if(r)throw r;let i=Be(e.location,n);if(ze&&!_t.get(t))if(i.isExternal||e.reloadDocument)window.location.href=i.absoluteURL||i.to;else{let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw _t.set(t,n),n}return x.createElement(`meta`,{httpEquiv:`refresh`,content:`0;url=${i.absoluteURL||i.to}`})}}return e}function yt({routeContext:e,match:t,children:n}){let r=x.useContext(Ue);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),x.createElement(Ze.Provider,{value:e},n)}function bt(e,t=[],n){let r=n?.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,a=r?.errors;if(a!=null){let e=i.findIndex(e=>e.route.id&&a?.[e.route.id]!==void 0);w(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`),i=i.slice(0,Math.min(i.length,e+1))}let o=!1,s=-1;if(n&&r){o=r.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:a}=r,c=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!a||a[t.route.id]===void 0);if(t.route.lazy||c){n.isStatic&&(o=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,l=r&&c?(e,t)=>{c(e,{location:r.location,params:r.matches?.[0]?.params??{},unstable_pattern:Re(r.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,c)=>{let u,d=!1,f=null,p=null;r&&(u=a&&n.route.id?a[n.route.id]:void 0,f=n.route.errorElement||ht,o&&(s<0&&c===0?(Mt(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),d=!0,p=null):s===c&&(d=!0,p=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),h=()=>{let t;return t=u?f:d?p:n.route.Component?x.createElement(n.route.Component,null):n.route.element?n.route.element:e,x.createElement(yt,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:r!=null},children:t})};return r&&(n.route.ErrorBoundary||n.route.errorElement||c===0)?x.createElement(gt,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:l}):h()},null)}function xt(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function St(e){let t=x.useContext(Ue);return w(t,xt(e)),t}function Ct(e){let t=x.useContext(We);return w(t,xt(e)),t}function wt(e){let t=x.useContext(Ze);return w(t,xt(e)),t}function Tt(e){let t=wt(e),n=t.matches[t.matches.length-1];return w(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function Et(){return Tt(`useRouteId`)}function Dt(){return Ct(`useNavigation`).navigation}function Ot(){let{matches:e,loaderData:t}=Ct(`useMatches`);return x.useMemo(()=>e.map(e=>E(e,t)),[e,t])}function kt(){let e=x.useContext(Qe),t=Ct(`useRouteError`),n=Tt(`useRouteError`);return e===void 0?t.errors?.[n]:e}function At(){let{router:e}=St(`useNavigate`),t=Tt(`useNavigate`),n=x.useRef(!1);return ct(()=>{n.current=!0}),x.useCallback(async(r,i={})=>{T(n.current,st),n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var jt={};function Mt(e,t,n){!t&&!jt[e]&&(jt[e]=!0,T(!1,n))}x.useOptimistic,x.memo(Nt);function Nt({routes:e,future:t,state:n,isStatic:r,onError:i}){return pt(e,void 0,{state:n,isStatic:r,onError:i,future:t})}function Pt({to:e,replace:t,state:n,relative:r}){w(at(),`<Navigate> may be used only in the context of a <Router> component.`);let{static:i}=x.useContext(Ye);T(!i,`<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.`);let{matches:a}=x.useContext(Ze),{pathname:o}=ot(),s=lt(),c=je(e,Ae(a),o,r===`path`),l=JSON.stringify(c);return x.useEffect(()=>{s(JSON.parse(l),{replace:t,state:n,relative:r})},[s,l,r,t,n]),null}function k(e){w(!1,`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)}function Ft({basename:e=`/`,children:t=null,location:n,navigationType:r=`POP`,navigator:i,static:a=!1,unstable_useTransitions:o}){w(!at(),`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);let s=e.replace(/^\/*/,`/`),c=x.useMemo(()=>({basename:s,navigator:i,static:a,unstable_useTransitions:o,future:{}}),[s,i,a,o]);typeof n==`string`&&(n=ae(n));let{pathname:l=`/`,search:u=``,hash:d=``,state:f=null,key:p=`default`,unstable_mask:m}=n,h=x.useMemo(()=>{let e=we(l,s);return e==null?null:{location:{pathname:e,search:u,hash:d,state:f,key:p,unstable_mask:m},navigationType:r}},[s,l,u,d,f,p,r,m]);return T(h!=null,`<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),h==null?null:x.createElement(Ye.Provider,{value:c},x.createElement(Xe.Provider,{children:t,value:h}))}function It({children:e,location:t}){return ft(Lt(e),t)}function Lt(e,t=[]){let n=[];return x.Children.forEach(e,(e,r)=>{if(!x.isValidElement(e))return;let i=[...t,r];if(e.type===x.Fragment){n.push.apply(n,Lt(e.props.children,i));return}w(e.type===k,`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),w(!e.props.index||!e.props.children,`An index route cannot have child routes.`);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=Lt(e.props.children,i)),n.push(a)}),n}var Rt=`get`,zt=`application/x-www-form-urlencoded`;function Bt(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement}function Vt(e){return Bt(e)&&e.tagName.toLowerCase()===`button`}function Ht(e){return Bt(e)&&e.tagName.toLowerCase()===`form`}function Ut(e){return Bt(e)&&e.tagName.toLowerCase()===`input`}function Wt(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Gt(e,t){return e.button===0&&(!t||t===`_self`)&&!Wt(e)}var Kt=null;function qt(){if(Kt===null)try{new FormData(document.createElement(`form`),0),Kt=!1}catch{Kt=!0}return Kt}var Jt=new Set([`application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`]);function Yt(e){return e!=null&&!Jt.has(e)?(T(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${zt}"`),null):e}function Xt(e,t){let n,r,i,a,o;if(Ht(e)){let o=e.getAttribute(`action`);r=o?we(o,t):null,n=e.getAttribute(`method`)||Rt,i=Yt(e.getAttribute(`enctype`))||zt,a=new FormData(e)}else if(Vt(e)||Ut(e)&&(e.type===`submit`||e.type===`image`)){let o=e.form;if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);if(r=s?we(s,t):null,n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||Rt,i=Yt(e.getAttribute(`formenctype`))||Yt(o.getAttribute(`enctype`))||zt,a=new FormData(o,e),!qt()){let{name:t,type:n,value:r}=e;if(n===`image`){let e=t?`${t}.`:``;a.append(`${e}x`,`0`),a.append(`${e}y`,`0`)}else t&&a.append(t,r)}}else if(Bt(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);else n=Rt,r=null,i=zt,o=e;return a&&i===`text/plain`&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var Zt={"&":`\\u0026`,">":`\\u003e`,"<":`\\u003c`,"\u2028":`\\u2028`,"\u2029":`\\u2029`},Qt=/[&><\u2028\u2029]/g;function $t(e){return e.replace(Qt,e=>Zt[e])}function en(e,t){if(e===!1||e==null)throw Error(t)}function tn(e,t,n,r){let i=typeof e==`string`?new URL(e,typeof window>`u`?`server://singlefetch/`:window.location.origin):e;return n?i.pathname.endsWith(`/`)?i.pathname=`${i.pathname}_.${r}`:i.pathname=`${i.pathname}.${r}`:i.pathname===`/`?i.pathname=`_root.${r}`:t&&we(i.pathname,t)===`/`?i.pathname=`${t.replace(/\/$/,``)}/_root.${r}`:i.pathname=`${i.pathname.replace(/\/$/,``)}.${r}`,i}async function nn(e,t){if(e.id in t)return t[e.id];try{let n=await b(()=>import(e.module),[]);return t[e.id]=n,n}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function rn(e){return e!=null&&typeof e.page==`string`}function an(e){return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`}async function on(e,t,n){return dn((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await nn(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(an).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{...e,rel:`prefetch`,as:`style`}:{...e,rel:`prefetch`}))}function sn(e,t,n,r,i,a){let o=(e,t)=>n[t]?e.route.id!==n[t].route.id:!0,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith(`*`)&&n[t].params[`*`]!==e.params[`*`];return a===`assets`?t.filter((e,t)=>o(e,t)||s(e,t)):a===`data`?t.filter((t,a)=>{let c=r.routes[t.route.id];if(!c||!c.hasLoader)return!1;if(o(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if(typeof r==`boolean`)return r}return!0}):[]}function cn(e,t,{includeHydrateFallback:n}={}){return ln(e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function ln(e){return[...new Set(e)]}function un(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function dn(e,t){let n=new Set,r=new Set(t);return e.reduce((e,i)=>{if(t&&!rn(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;let a=JSON.stringify(un(i));return n.has(a)||(n.add(a),e.push({key:a,link:i})),e},[])}function fn(){let e=x.useContext(Ue);return en(e,`You must render this element inside a <DataRouterContext.Provider> element`),e}function pn(){let e=x.useContext(We);return en(e,`You must render this element inside a <DataRouterStateContext.Provider> element`),e}var mn=x.createContext(void 0);mn.displayName=`FrameworkContext`;function hn(){let e=x.useContext(mn);return en(e,`You must render this element inside a <HydratedRouter> element`),e}function gn(e,t){let n=x.useContext(mn),[r,i]=x.useState(!1),[a,o]=x.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:d}=t,f=x.useRef(null);x.useEffect(()=>{if(e===`render`&&o(!0),e===`viewport`){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),x.useEffect(()=>{if(r){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[r]);let p=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?e===`intent`?[a,f,{onFocus:_n(s,p),onBlur:_n(c,m),onMouseEnter:_n(l,p),onMouseLeave:_n(u,m),onTouchStart:_n(d,p)}]:[a,f,{}]:[!1,f,{}]}function _n(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function vn({page:e,...t}){let{router:n}=fn(),r=x.useMemo(()=>ce(n.routes,e,n.basename),[n.routes,e,n.basename]);return r?x.createElement(bn,{page:e,matches:r,...t}):null}function yn(e){let{manifest:t,routeModules:n}=hn(),[r,i]=x.useState([]);return x.useEffect(()=>{let r=!1;return on(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),r}function bn({page:e,matches:t,...n}){let r=ot(),{future:i,manifest:a,routeModules:o}=hn(),{basename:s}=fn(),{loaderData:c,matches:l}=pn(),u=x.useMemo(()=>sn(e,t,l,a,r,`data`),[e,t,l,a,r]),d=x.useMemo(()=>sn(e,t,l,a,r,`assets`),[e,t,l,a,r]),f=x.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=new Set,l=!1;if(t.forEach(e=>{let t=a.routes[e.route.id];!t||!t.hasLoader||(!u.some(t=>t.route.id===e.route.id)&&e.route.id in c&&o[e.route.id]?.shouldRevalidate||t.hasClientLoader?l=!0:n.add(e.route.id))}),n.size===0)return[];let d=tn(e,s,i.unstable_trailingSlashAwareDataRequests,`data`);return l&&n.size>0&&d.searchParams.set(`_routes`,t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),[d.pathname+d.search]},[s,i.unstable_trailingSlashAwareDataRequests,c,r,a,u,t,e,o]),p=x.useMemo(()=>cn(d,a),[d,a]),m=yn(d);return x.createElement(x.Fragment,null,f.map(e=>x.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})),p.map(e=>x.createElement(`link`,{key:e,rel:`modulepreload`,href:e,...n})),m.map(({key:e,link:t})=>x.createElement(`link`,{key:e,nonce:n.nonce,...t,crossOrigin:t.crossOrigin??n.crossOrigin})))}function xn(...e){return t=>{e.forEach(e=>{typeof e==`function`?e(t):e!=null&&(e.current=t)})}}var Sn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;try{Sn&&(window.__reactRouterVersion=`7.13.1`)}catch{}function Cn({basename:e,children:t,unstable_useTransitions:n,window:r}){let i=x.useRef();i.current??=C({window:r,v5Compat:!0});let a=i.current,[o,s]=x.useState({action:a.action,location:a.location}),c=x.useCallback(e=>{n===!1?s(e):x.startTransition(()=>s(e))},[n]);return x.useLayoutEffect(()=>a.listen(c),[a,c]),x.createElement(Ft,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:a,unstable_useTransitions:n})}function wn({basename:e,children:t,history:n,unstable_useTransitions:r}){let[i,a]=x.useState({action:n.action,location:n.location}),o=x.useCallback(e=>{r===!1?a(e):x.startTransition(()=>a(e))},[r]);return x.useLayoutEffect(()=>n.listen(o),[n,o]),x.createElement(Ft,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:n,unstable_useTransitions:r})}wn.displayName=`unstable_HistoryRouter`;var Tn=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,En=x.forwardRef(function({onClick:e,discover:t=`render`,prefetch:n=`none`,relative:r,reloadDocument:i,replace:a,unstable_mask:o,state:s,target:c,to:l,preventScrollReset:u,viewTransition:d,unstable_defaultShouldRevalidate:f,...p},m){let{basename:h,navigator:g,unstable_useTransitions:_}=x.useContext(Ye),v=typeof l==`string`&&Tn.test(l),y=Be(l,h);l=y.to;let b=it(l,{relative:r}),ee=ot(),S=null;if(o){let e=je(o,[],ee.unstable_mask?ee.unstable_mask.pathname:`/`,!0);h!==`/`&&(e.pathname=e.pathname===`/`?h:Me([h,e.pathname])),S=g.createHref(e)}let[C,w,T]=gn(n,p),te=Nn(l,{replace:a,unstable_mask:o,state:s,target:c,preventScrollReset:u,relative:r,viewTransition:d,unstable_defaultShouldRevalidate:f,unstable_useTransitions:_});function ne(t){e&&e(t),t.defaultPrevented||te(t)}let re=!(y.isExternal||i),ie=x.createElement(`a`,{...p,...T,href:(re?S:void 0)||y.absoluteURL||b,onClick:re?ne:e,ref:xn(m,w),target:c,"data-discover":!v&&t===`render`?`true`:void 0});return C&&!v?x.createElement(x.Fragment,null,ie,x.createElement(vn,{page:b})):ie});En.displayName=`Link`;var Dn=x.forwardRef(function({"aria-current":e=`page`,caseSensitive:t=!1,className:n=``,end:r=!1,style:i,to:a,viewTransition:o,children:s,...c},l){let u=dt(a,{relative:c.relative}),d=ot(),f=x.useContext(We),{navigator:p,basename:m}=x.useContext(Ye),h=f!=null&&Un(u)&&o===!0,g=p.encodeLocation?p.encodeLocation(u).pathname:u.pathname,_=d.pathname,v=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;t||(_=_.toLowerCase(),v=v?v.toLowerCase():null,g=g.toLowerCase()),v&&m&&(v=we(v,m)||v);let y=g!==`/`&&g.endsWith(`/`)?g.length-1:g.length,b=_===g||!r&&_.startsWith(g)&&_.charAt(y)===`/`,ee=v!=null&&(v===g||!r&&v.startsWith(g)&&v.charAt(g.length)===`/`),S={isActive:b,isPending:ee,isTransitioning:h},C=b?e:void 0,w;w=typeof n==`function`?n(S):[n,b?`active`:null,ee?`pending`:null,h?`transitioning`:null].filter(Boolean).join(` `);let T=typeof i==`function`?i(S):i;return x.createElement(En,{...c,"aria-current":C,className:w,ref:l,style:T,to:a,viewTransition:o},typeof s==`function`?s(S):s)});Dn.displayName=`NavLink`;var On=x.forwardRef(({discover:e=`render`,fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=Rt,action:s,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:d,unstable_defaultShouldRevalidate:f,...p},m)=>{let{unstable_useTransitions:h}=x.useContext(Ye),g=In(),_=Ln(s,{relative:l}),v=o.toLowerCase()===`get`?`get`:`post`,y=typeof s==`string`&&Tn.test(s);return x.createElement(`form`,{ref:m,method:v,action:_,onSubmit:r?c:e=>{if(c&&c(e),e.defaultPrevented)return;e.preventDefault();let r=e.nativeEvent.submitter,s=r?.getAttribute(`formmethod`)||o,p=()=>g(r||e.currentTarget,{fetcherKey:t,method:s,navigate:n,replace:i,state:a,relative:l,preventScrollReset:u,viewTransition:d,unstable_defaultShouldRevalidate:f});h&&n!==!1?x.startTransition(()=>p()):p()},...p,"data-discover":!y&&e===`render`?`true`:void 0})});On.displayName=`Form`;function kn({getKey:e,storageKey:t,...n}){let r=x.useContext(mn),{basename:i}=x.useContext(Ye),a=ot(),o=Ot();Vn({getKey:e,storageKey:t});let s=x.useMemo(()=>{if(!r||!e)return null;let t=Bn(a,o,i,e);return t===a.key?null:t},[]);if(!r||r.isSpaMode)return null;let c=((e,t)=>{if(!window.history.state||!window.history.state.key){let e=Math.random().toString(32).slice(2);window.history.replaceState({key:e},``)}try{let n=JSON.parse(sessionStorage.getItem(e)||`{}`)[t||window.history.state.key];typeof n==`number`&&window.scrollTo(0,n)}catch(t){console.error(t),sessionStorage.removeItem(e)}}).toString();return x.createElement(`script`,{...n,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${c})(${$t(JSON.stringify(t||Rn))}, ${$t(JSON.stringify(s))})`}})}kn.displayName=`ScrollRestoration`;function An(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function jn(e){let t=x.useContext(Ue);return w(t,An(e)),t}function Mn(e){let t=x.useContext(We);return w(t,An(e)),t}function Nn(e,{target:t,replace:n,unstable_mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,unstable_defaultShouldRevalidate:c,unstable_useTransitions:l}={}){let u=lt(),d=ot(),f=dt(e,{relative:o});return x.useCallback(p=>{if(Gt(p,t)){p.preventDefault();let t=n===void 0?ie(d)===ie(f):n,m=()=>u(e,{replace:t,unstable_mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,unstable_defaultShouldRevalidate:c});l?x.startTransition(()=>m()):m()}},[d,u,f,n,r,i,t,e,a,o,s,c,l])}var Pn=0,Fn=()=>`__${String(++Pn)}__`;function In(){let{router:e}=jn(`useSubmit`),{basename:t}=x.useContext(Ye),n=Et(),r=e.fetch,i=e.navigate;return x.useCallback(async(e,a={})=>{let{action:o,method:s,encType:c,formData:l,body:u}=Xt(e,t);a.navigate===!1?await r(a.fetcherKey||Fn(),n,a.action||o,{unstable_defaultShouldRevalidate:a.unstable_defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,flushSync:a.flushSync}):await i(a.action||o,{unstable_defaultShouldRevalidate:a.unstable_defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,i,t,n])}function Ln(e,{relative:t}={}){let{basename:n}=x.useContext(Ye),r=x.useContext(Ze);w(r,`useFormAction must be used inside a RouteContext`);let[i]=r.matches.slice(-1),a={...dt(e||`.`,{relative:t})},o=ot();if(e==null){a.search=o.search;let e=new URLSearchParams(a.search),t=e.getAll(`index`);if(t.some(e=>e===``)){e.delete(`index`),t.filter(e=>e).forEach(t=>e.append(`index`,t));let n=e.toString();a.search=n?`?${n}`:``}}return(!e||e===`.`)&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,`?index&`):`?index`),n!==`/`&&(a.pathname=a.pathname===`/`?n:Me([n,a.pathname])),ie(a)}var Rn=`react-router-scroll-positions`,zn={};function Bn(e,t,n,r){let i=null;return r&&(i=r(n===`/`?e:{...e,pathname:we(e.pathname,n)||e.pathname},t)),i??=e.key,i}function Vn({getKey:e,storageKey:t}={}){let{router:n}=jn(`useScrollRestoration`),{restoreScrollPosition:r,preventScrollReset:i}=Mn(`useScrollRestoration`),{basename:a}=x.useContext(Ye),o=ot(),s=Ot(),c=Dt();x.useEffect(()=>(window.history.scrollRestoration=`manual`,()=>{window.history.scrollRestoration=`auto`}),[]),Hn(x.useCallback(()=>{if(c.state===`idle`){let t=Bn(o,s,a,e);zn[t]=window.scrollY}try{sessionStorage.setItem(t||Rn,JSON.stringify(zn))}catch(e){T(!1,`Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`)}window.history.scrollRestoration=`auto`},[c.state,e,a,o,s,t])),typeof document<`u`&&(x.useLayoutEffect(()=>{try{let e=sessionStorage.getItem(t||Rn);e&&(zn=JSON.parse(e))}catch{}},[t]),x.useLayoutEffect(()=>{let t=n?.enableScrollRestoration(zn,()=>window.scrollY,e?(t,n)=>Bn(t,n,a,e):void 0);return()=>t&&t()},[n,a,e]),x.useLayoutEffect(()=>{if(r!==!1){if(typeof r==`number`){window.scrollTo(0,r);return}try{if(o.hash){let e=document.getElementById(decodeURIComponent(o.hash.slice(1)));if(e){e.scrollIntoView();return}}}catch{T(!1,`"${o.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`)}i!==!0&&window.scrollTo(0,0)}},[o,r,i]))}function Hn(e,t){let{capture:n}=t||{};x.useEffect(()=>{let t=n==null?void 0:{capture:n};return window.addEventListener(`pagehide`,e,t),()=>{window.removeEventListener(`pagehide`,e,t)}},[e,n])}function Un(e,{relative:t}={}){let n=x.useContext(Ke);w(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=jn(`useViewTransitionState`),i=dt(e,{relative:t});if(!n.isTransitioning)return!1;let a=we(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=we(n.nextLocation.pathname,r)||n.nextLocation.pathname;return xe(i.pathname,o)!=null||xe(i.pathname,a)!=null}var Wn=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),Gn=o(((e,t)=>{t.exports=Wn()})),Kn=c(g()),A=Gn();function qn(){let e=lt();return(0,x.useEffect)(()=>{document.querySelectorAll(`.grupo-campo__ojo`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=e.parentElement.querySelector(`.input-contrasena`),r=e.querySelector(`.ojo-abierto`),i=e.querySelector(`.ojo-cerrado`);n.type===`password`?(n.type=`text`,r.style.display=`none`,i.style.display=`block`):(n.type=`password`,r.style.display=`block`,i.style.display=`none`)})})},[]),(0,A.jsxs)(`div`,{className:`contenedor-pagina`,children:[(0,A.jsxs)(`main`,{className:`contenedor-inicio`,children:[(0,A.jsx)(`section`,{className:`contenedor-inicio__izquierda`,children:(0,A.jsxs)(`div`,{className:`bloque-marca`,children:[(0,A.jsx)(`div`,{className:`marca`,children:(0,A.jsx)(`img`,{src:`/piWeb/images/logoSinFondo.png`,alt:`Sistema de Logistica`})}),(0,A.jsxs)(`h1`,{children:[`Sistema de Logística`,(0,A.jsx)(`br`,{}),`de Transporte de Paquetería`]})]})}),(0,A.jsx)(`section`,{className:`contenedor-inicio__derecha`,children:(0,A.jsxs)(`div`,{className:`tarjeta-formulario`,children:[(0,A.jsx)(`h2`,{children:`Iniciar Sesión`}),(0,A.jsx)(`p`,{className:`tarjeta-formulario__subtitulo`,children:`Bienvenido. Por favor inicie sesión para continuar.`}),(0,A.jsxs)(`div`,{className:`grupo-campo`,children:[(0,A.jsx)(`span`,{className:`grupo-campo__icono`,children:(0,A.jsx)(`img`,{src:`/piWeb/images/gmail.png`,alt:`Correo`})}),(0,A.jsx)(`input`,{type:`email`,placeholder:`Correo electrónico`})]}),(0,A.jsxs)(`div`,{className:`grupo-campo grupo-campo--contrasena`,children:[(0,A.jsx)(`span`,{className:`grupo-campo__icono`,children:(0,A.jsx)(`img`,{src:`/piWeb/images/candado.png`,alt:`Contraseña`})}),(0,A.jsx)(`input`,{type:`password`,placeholder:`Contraseña`,className:`input-contrasena`}),(0,A.jsxs)(`button`,{className:`grupo-campo__ojo`,type:`button`,"aria-label":`Mostrar/ocultar contraseña`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/ojo-abierto.png`,alt:`Ver contraseña`,className:`ojo-abierto`}),(0,A.jsx)(`img`,{src:`/piWeb/images/ojo.png`,alt:`Ocultar contraseña`,className:`ojo-cerrado`,style:{display:`none`}})]})]}),(0,A.jsx)(`button`,{className:`boton boton--primario`,onClick:()=>e(`/operador/dashboard`),children:`Iniciar Sesión`}),(0,A.jsx)(`a`,{className:`enlace-olvido`,href:`/recuperacionContraseña.html`,children:`¿Olvidaste tu contraseña?`}),(0,A.jsxs)(`p`,{className:`tarjeta-formulario__nota`,children:[`¿No tienes cuenta? `,(0,A.jsx)(`a`,{href:`/registro.html`,children:`Regístrate`})]}),(0,A.jsx)(`div`,{className:`tarjeta-formulario__divisor`,children:`o`}),(0,A.jsxs)(`button`,{className:`boton boton--social boton--google`,children:[(0,A.jsx)(`span`,{className:`boton__icono`,children:`G`}),`Iniciar sesión con Google`]})]})})]}),(0,A.jsx)(`footer`,{className:`pie-pagina`,children:(0,A.jsx)(`p`,{className:`derechos-reservados`,children:`2026 Sistema de Logística de Transporte de Paquetería. Todos los derechos reservados.`})})]})}function Jn(){return(0,x.useEffect)(()=>{let e=document.getElementById(`btnMenu`),t=document.getElementById(`menuContainer`),n=document.getElementById(`menuBackdrop`),r=t?.querySelector(`.menu-hamburguesa__cerrar`);function i(){t?.classList.add(`menu-overlay--abierto`),n?.classList.add(`menu-overlay__backdrop--visible`)}function a(){t?.classList.remove(`menu-overlay--abierto`),n?.classList.remove(`menu-overlay__backdrop--visible`)}function o(){t?.classList.contains(`menu-overlay--abierto`)?a():i()}e?.addEventListener(`click`,o),r?.addEventListener(`click`,a),n?.addEventListener(`click`,a);let s=window.location.pathname;return t?.querySelectorAll(`.menu-hamburguesa__item`).forEach(e=>{e.getAttribute(`href`)===s&&e.classList.add(`menu-hamburguesa__item--activo`)}),()=>{e?.removeEventListener(`click`,o),r?.removeEventListener(`click`,a),n?.removeEventListener(`click`,a)}},[]),(0,A.jsxs)(`nav`,{className:`menu-hamburguesa`,children:[(0,A.jsxs)(`div`,{className:`menu-hamburguesa__cabecera`,children:[(0,A.jsx)(`div`,{className:`menu-hamburguesa__logo`,children:(0,A.jsx)(`img`,{src:`/piWeb/images/logoSinFondo.png`,alt:`Metzvia`})}),(0,A.jsx)(`h2`,{className:`menu-hamburguesa__marca`,children:`METZVIA`}),(0,A.jsx)(`button`,{className:`menu-hamburguesa__cerrar`,"aria-label":`Cerrar menu`,children:`×`})]}),(0,A.jsxs)(`div`,{className:`menu-hamburguesa__links`,children:[(0,A.jsxs)(`a`,{href:`/operador/dashboard`,className:`menu-hamburguesa__item`,children:[(0,A.jsx)(`span`,{className:`menu-hamburguesa__icono-txt`,children:`☷`}),`Dashboard`]}),(0,A.jsxs)(`a`,{href:`/operador/envios`,className:`menu-hamburguesa__item`,children:[(0,A.jsx)(`span`,{className:`menu-hamburguesa__icono-txt`,children:`✉`}),`Envios`]}),(0,A.jsxs)(`a`,{href:`/operador/registrar-paquete`,className:`menu-hamburguesa__item`,children:[(0,A.jsx)(`span`,{className:`menu-hamburguesa__icono-txt`,children:`☐`}),`Registrar Paquete`]}),(0,A.jsxs)(`a`,{href:`/operador/dashboard`,className:`menu-hamburguesa__item`,children:[(0,A.jsx)(`span`,{className:`menu-hamburguesa__icono-txt`,children:`⌕`}),`Escaneo`]}),(0,A.jsxs)(`a`,{href:`/operador/incidencias`,className:`menu-hamburguesa__item`,children:[(0,A.jsx)(`span`,{className:`menu-hamburguesa__icono-txt`,children:`⚠`}),`Incidencias`,(0,A.jsx)(`span`,{className:`badge`,children:`4`})]}),(0,A.jsxs)(`a`,{href:`/operador/mi-cuenta`,className:`menu-hamburguesa__item`,children:[(0,A.jsx)(`span`,{className:`menu-hamburguesa__icono-txt`,children:`☻`}),`Mi Cuenta`]})]}),(0,A.jsx)(`div`,{className:`menu-hamburguesa__pie`,children:(0,A.jsxs)(`a`,{href:`/login`,className:`menu-hamburguesa__item menu-hamburguesa__item--salir`,children:[(0,A.jsx)(`span`,{className:`menu-hamburguesa__icono-txt`,children:`➪`}),`Salir`]})})]})}function Yn(){return(0,A.jsxs)(`div`,{className:`tablero-operador tablero-operador--sin-sidebar`,children:[(0,A.jsx)(`div`,{id:`menuContainer`,className:`menu-overlay`,children:(0,A.jsx)(Jn,{})}),(0,A.jsx)(`div`,{id:`menuBackdrop`,className:`menu-overlay__backdrop`}),(0,A.jsxs)(`main`,{className:`panel-principal panel-principal--full`,children:[(0,A.jsxs)(`header`,{className:`barra-superior barra-superior--con-logo`,children:[(0,A.jsxs)(`div`,{className:`barra-superior__left`,children:[(0,A.jsx)(`button`,{id:`btnMenu`,className:`btn-menu-hamburguesa`,"aria-label":`Abrir menú`,children:(0,A.jsxs)(`svg`,{width:`26`,height:`26`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,children:[(0,A.jsx)(`line`,{x1:`3`,y1:`6`,x2:`21`,y2:`6`}),(0,A.jsx)(`line`,{x1:`3`,y1:`12`,x2:`21`,y2:`12`}),(0,A.jsx)(`line`,{x1:`3`,y1:`18`,x2:`21`,y2:`18`})]})}),(0,A.jsx)(`div`,{className:`header-logo`,children:(0,A.jsx)(`img`,{src:`/piWeb/images/logoSinFondo.png`,alt:`Metzvia`})}),(0,A.jsx)(`h1`,{className:`barra-superior__titulo`,children:`Operador logístico`})]}),(0,A.jsxs)(`div`,{className:`barra-superior__perfil`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Operador`,className:`barra-superior__avatar`}),(0,A.jsx)(`span`,{className:`barra-superior__chevron`,children:`▾`})]})]}),(0,A.jsxs)(`section`,{className:`bienvenida`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:``,className:`bienvenida__avatar`}),(0,A.jsxs)(`p`,{children:[`Bienvenido de vuelta, `,(0,A.jsx)(`strong`,{children:`Alejandro Ríos`})]})]}),(0,A.jsxs)(`section`,{className:`resumen-operador`,children:[(0,A.jsxs)(`article`,{className:`tarjeta-resumen`,children:[(0,A.jsx)(`span`,{className:`tarjeta-resumen__icono`}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`h3`,{children:`Pendientes por Procesar`}),(0,A.jsx)(`p`,{children:`5`})]})]}),(0,A.jsxs)(`article`,{className:`tarjeta-resumen`,children:[(0,A.jsx)(`span`,{className:`tarjeta-resumen__icono`}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`h3`,{children:`En Proceso`}),(0,A.jsx)(`p`,{children:`8`})]})]}),(0,A.jsxs)(`article`,{className:`tarjeta-resumen tarjeta-resumen--alerta`,children:[(0,A.jsx)(`span`,{className:`tarjeta-resumen__icono`}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`h3`,{children:`Pendientes de Entrega`}),(0,A.jsx)(`p`,{children:`2`})]})]}),(0,A.jsxs)(`article`,{className:`tarjeta-resumen`,children:[(0,A.jsx)(`span`,{className:`tarjeta-resumen__icono`}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`h3`,{children:`Total de Envíos Hoy`}),(0,A.jsx)(`p`,{children:`25`})]})]})]}),(0,A.jsxs)(`section`,{className:`contenido-operador`,children:[(0,A.jsxs)(`div`,{className:`panel-tabla`,children:[(0,A.jsxs)(`div`,{className:`panel-tabla__encabezado`,children:[(0,A.jsx)(`input`,{type:`text`,placeholder:`Buscar ID o destinatario...`,className:`panel-tabla__busqueda`}),(0,A.jsx)(`a`,{href:`/operador/envios`,className:`panel-tabla__ver`,children:`Ver Todo`})]}),(0,A.jsx)(`div`,{className:`tabla-envios`,children:(0,A.jsxs)(`table`,{children:[(0,A.jsx)(`thead`,{children:(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`th`,{children:`ID`}),(0,A.jsx)(`th`,{children:`Destinatario`}),(0,A.jsx)(`th`,{children:`Estado`}),(0,A.jsx)(`th`,{children:`Repartidor`}),(0,A.jsx)(`th`,{children:`Acciones`})]})}),(0,A.jsxs)(`tbody`,{children:[(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:`PAK123456789`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`Ana Martínez`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`estado estado--transito`,children:`● En Tránsito`})}),(0,A.jsx)(`td`,{children:`Juan Morales`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`button`,{className:`boton-detalles`,children:`Ver Detalles`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:`PAK987654321`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`Carlos Ramírez`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`estado estado--pendiente`,children:`● Recogido`})}),(0,A.jsx)(`td`,{children:`Miguel López`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`button`,{className:`boton-detalles`,children:`Ver Detalles`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:`PAK456123789`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`Juan Pérez`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`estado estado--retrasado`,children:`● Pendiente`})}),(0,A.jsx)(`td`,{children:`Javier Torres`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`button`,{className:`boton-detalles`,children:`Ver Detalles`})})]})]})]})})]}),(0,A.jsxs)(`aside`,{className:`panel-escaneo`,children:[(0,A.jsx)(`h2`,{children:`Escaneo de Paquetes`}),(0,A.jsxs)(`div`,{className:`control-escaneo`,children:[(0,A.jsx)(`input`,{type:`text`,placeholder:`||||||||||||`}),(0,A.jsx)(`button`,{children:`Escanear`})]})]})]})]})]})}function Xn(){return(0,x.useEffect)(()=>{let e=document.getElementById(`boton-guardar`),t=document.getElementById(`modal-exito`),n=document.getElementById(`boton-aceptar`),r=document.getElementById(`guia-generada`);function i(){return`PAK${Math.floor(1e7+Math.random()*9e7)}`}e.addEventListener(`click`,()=>{r.textContent=i(),t.classList.remove(`modal-exito--oculto`)}),n.addEventListener(`click`,()=>{let e=r.textContent;window.location.href=`/operador/envios?registro=ok&guia=${encodeURIComponent(e)}`})},[]),(0,A.jsxs)(A.Fragment,{children:[(0,A.jsxs)(`div`,{className:`tablero-operador tablero-operador--sin-sidebar`,children:[(0,A.jsx)(`div`,{id:`menuContainer`,className:`menu-overlay`,children:(0,A.jsx)(Jn,{})}),(0,A.jsx)(`div`,{id:`menuBackdrop`,className:`menu-overlay__backdrop`}),(0,A.jsxs)(`main`,{className:`panel-principal panel-principal--full`,children:[(0,A.jsxs)(`header`,{className:`barra-superior barra-superior--con-logo`,children:[(0,A.jsxs)(`div`,{className:`barra-superior__left`,children:[(0,A.jsx)(`button`,{id:`btnMenu`,className:`btn-menu-hamburguesa`,"aria-label":`Abrir menú`,children:(0,A.jsxs)(`svg`,{width:`26`,height:`26`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,children:[(0,A.jsx)(`line`,{x1:`3`,y1:`6`,x2:`21`,y2:`6`}),(0,A.jsx)(`line`,{x1:`3`,y1:`12`,x2:`21`,y2:`12`}),(0,A.jsx)(`line`,{x1:`3`,y1:`18`,x2:`21`,y2:`18`})]})}),(0,A.jsx)(`div`,{className:`header-logo`,children:(0,A.jsx)(`img`,{src:`/piWeb/images/logoSinFondo.png`,alt:`Metzvia`})}),(0,A.jsx)(`h1`,{className:`barra-superior__titulo`,children:`Registrar paquete`})]}),(0,A.jsxs)(`div`,{className:`barra-superior__perfil`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Operador`,className:`barra-superior__avatar`}),(0,A.jsx)(`span`,{className:`barra-superior__chevron`,children:`▾`})]})]}),(0,A.jsxs)(`section`,{className:`modulo-registro`,children:[(0,A.jsxs)(`div`,{className:`registro-encabezado`,children:[(0,A.jsx)(`span`,{className:`registro-encabezado__icono`,children:`▣`}),(0,A.jsx)(`h2`,{children:`Registrar Paquete`})]}),(0,A.jsxs)(`article`,{className:`tarjeta-formulario`,children:[(0,A.jsxs)(`section`,{className:`bloque-registro`,children:[(0,A.jsx)(`h3`,{className:`bloque-registro__titulo`,children:`Datos del Paquete`}),(0,A.jsxs)(`div`,{className:`grupo-campos grupo-campos--cuatro`,children:[(0,A.jsxs)(`label`,{children:[`Peso (kg)`,(0,A.jsx)(`input`,{type:`number`,defaultValue:`1`})]}),(0,A.jsxs)(`label`,{children:[`Largo (cm)`,(0,A.jsx)(`input`,{type:`number`,defaultValue:`20`})]}),(0,A.jsxs)(`label`,{children:[`Ancho (cm)`,(0,A.jsx)(`input`,{type:`number`,defaultValue:`15`})]}),(0,A.jsxs)(`label`,{children:[`Alto (cm)`,(0,A.jsx)(`input`,{type:`number`,defaultValue:`10`})]})]}),(0,A.jsxs)(`div`,{className:`grupo-campos grupo-campos--dos`,children:[(0,A.jsxs)(`label`,{children:[`Valor Declarado`,(0,A.jsx)(`input`,{type:`text`,placeholder:`Ingrese monto...`})]}),(0,A.jsxs)(`label`,{children:[`Guía (opcional)`,(0,A.jsx)(`input`,{type:`text`,placeholder:`Ingresar observaciones...`})]})]}),(0,A.jsxs)(`div`,{className:`checks-linea`,children:[(0,A.jsxs)(`label`,{className:`check-item`,children:[(0,A.jsx)(`input`,{type:`checkbox`}),` ¿Es frágil?`]}),(0,A.jsxs)(`label`,{className:`check-item`,children:[(0,A.jsx)(`input`,{type:`checkbox`}),` ¿Requiere seguro?`]})]})]}),(0,A.jsxs)(`section`,{className:`bloque-registro bloque-registro--secundario`,children:[(0,A.jsx)(`h3`,{className:`bloque-registro__titulo`,children:`Información Logística`}),(0,A.jsxs)(`div`,{className:`subbloque`,children:[(0,A.jsx)(`p`,{className:`campo-titulo`,children:`Tipo de Servicio`}),(0,A.jsxs)(`div`,{className:`opciones-linea`,children:[(0,A.jsxs)(`label`,{className:`radio-item`,children:[(0,A.jsx)(`input`,{type:`radio`,name:`servicio`,defaultChecked:!0}),` Normal`]}),(0,A.jsxs)(`label`,{className:`radio-item`,children:[(0,A.jsx)(`input`,{type:`radio`,name:`servicio`}),` Exprés`]}),(0,A.jsxs)(`label`,{className:`radio-item`,children:[(0,A.jsx)(`input`,{type:`radio`,name:`servicio`}),` Mismo día`]})]})]}),(0,A.jsxs)(`div`,{className:`subbloque grupo-campos grupo-campos--dos`,children:[(0,A.jsxs)(`label`,{children:[`Fecha programada de envío`,(0,A.jsx)(`input`,{type:`date`,defaultValue:`2026-03-05`})]}),(0,A.jsxs)(`label`,{children:[`Repartidor asignado`,(0,A.jsxs)(`select`,{children:[(0,A.jsx)(`option`,{children:`Seleccionar repartidor...`}),(0,A.jsx)(`option`,{children:`Javier Torres`}),(0,A.jsx)(`option`,{children:`Juan Morales`}),(0,A.jsx)(`option`,{children:`Miguel López`})]})]})]}),(0,A.jsxs)(`div`,{className:`subbloque grupo-campos grupo-campos--dos`,children:[(0,A.jsxs)(`label`,{children:[`Ruta asignada`,(0,A.jsxs)(`select`,{children:[(0,A.jsx)(`option`,{children:`Seleccionar ruta...`}),(0,A.jsx)(`option`,{children:`CDMX-015`}),(0,A.jsx)(`option`,{children:`CDMX-030`}),(0,A.jsx)(`option`,{children:`QRO-018`})]})]}),(0,A.jsxs)(`label`,{children:[`Centro de distribución origen`,(0,A.jsxs)(`select`,{children:[(0,A.jsx)(`option`,{children:`CDMX-CD01`}),(0,A.jsx)(`option`,{children:`CDMX-CD02`})]})]})]})]})]}),(0,A.jsxs)(`div`,{className:`acciones-formulario`,children:[(0,A.jsx)(`a`,{href:`/operador/registrar-paquete`,className:`boton-secundario`,children:`Cancelar`}),(0,A.jsx)(`button`,{type:`button`,className:`boton-primario boton-primario--texto`,id:`boton-guardar`,children:`Guardar`})]})]})]})]}),(0,A.jsx)(`div`,{className:`modal-exito modal-exito--oculto`,id:`modal-exito`,role:`dialog`,"aria-modal":`true`,"aria-labelledby":`titulo-exito`,children:(0,A.jsxs)(`div`,{className:`modal-exito__tarjeta`,children:[(0,A.jsx)(`div`,{className:`modal-exito__check`,children:`✓`}),(0,A.jsx)(`h2`,{id:`titulo-exito`,children:`¡Paquete Registrado!`}),(0,A.jsxs)(`p`,{children:[`El paquete se ha registrado exitosamente con el número de guía `,(0,A.jsx)(`strong`,{id:`guia-generada`,children:`PAK00000000`}),`.`]}),(0,A.jsx)(`div`,{className:`modal-exito__acciones`,children:(0,A.jsx)(`button`,{type:`button`,className:`boton-primario boton-primario--texto`,id:`boton-aceptar`,children:`Aceptar`})})]})})]})}function Zn(){return(0,A.jsxs)(`div`,{className:`tablero-operador tablero-operador--sin-sidebar`,children:[(0,A.jsx)(`div`,{id:`menuContainer`,className:`menu-overlay`,children:(0,A.jsx)(Jn,{})}),(0,A.jsx)(`div`,{id:`menuBackdrop`,className:`menu-overlay__backdrop`}),(0,A.jsxs)(`main`,{className:`panel-principal panel-principal--full`,children:[(0,A.jsxs)(`header`,{className:`barra-superior barra-superior--con-logo`,children:[(0,A.jsxs)(`div`,{className:`barra-superior__left`,children:[(0,A.jsx)(`button`,{id:`btnMenu`,className:`btn-menu-hamburguesa`,"aria-label":`Abrir menú`,children:(0,A.jsxs)(`svg`,{width:`26`,height:`26`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,children:[(0,A.jsx)(`line`,{x1:`3`,y1:`6`,x2:`21`,y2:`6`}),(0,A.jsx)(`line`,{x1:`3`,y1:`12`,x2:`21`,y2:`12`}),(0,A.jsx)(`line`,{x1:`3`,y1:`18`,x2:`21`,y2:`18`})]})}),(0,A.jsx)(`div`,{className:`header-logo`,children:(0,A.jsx)(`img`,{src:`/piWeb/images/logoSinFondo.png`,alt:`Metzvia`})}),(0,A.jsx)(`h1`,{className:`barra-superior__titulo`,children:`Detalle envío`})]}),(0,A.jsxs)(`div`,{className:`barra-superior__perfil`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Operador`,className:`barra-superior__avatar`}),(0,A.jsx)(`span`,{className:`barra-superior__chevron`,children:`▾`})]})]}),(0,A.jsxs)(`section`,{className:`modulo-detalle`,children:[(0,A.jsxs)(`div`,{className:`miga-detalle`,children:[(0,A.jsx)(`span`,{className:`miga-detalle__icono`,children:`◘`}),` Envíos `,(0,A.jsx)(`span`,{className:`miga-detalle__separador`,children:`/`}),` Detalles del Envío`]}),(0,A.jsxs)(`h2`,{className:`titulo-detalle`,children:[`Detalles del Envío ID: `,(0,A.jsx)(`strong`,{children:`PAK123456789`})]}),(0,A.jsxs)(`div`,{className:`detalle-grid`,children:[(0,A.jsxs)(`div`,{className:`detalle-columna`,children:[(0,A.jsxs)(`article`,{className:`tarjeta-detalle`,children:[(0,A.jsx)(`h3`,{children:`Información del Paquete`}),(0,A.jsxs)(`div`,{className:`info-lista`,children:[(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`span`,{children:`Peso:`}),` 3.5 kg`]}),(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`span`,{children:`Dimensiones:`}),` 30 x 25 x 15 cm`]})]}),(0,A.jsxs)(`div`,{className:`info-lista`,children:[(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`span`,{children:`¿Es Frágil?`}),` No`]}),(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`span`,{children:`¿Requiere Seguro?`}),` Sí`]})]})]}),(0,A.jsxs)(`article`,{className:`tarjeta-detalle`,children:[(0,A.jsx)(`h3`,{children:`Destinatario`}),(0,A.jsxs)(`div`,{className:`info-lista info-lista--dos-columnas`,children:[(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`span`,{children:`Nombre Completo/Razón Social:`}),` Ana Martínez`]}),(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`span`,{children:`Teléfono:`}),` +52 55 6789 0123`]}),(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`span`,{children:`Calle y Número:`}),` Av. Revolución 456`]}),(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`span`,{children:`Colonia:`}),` Escandón`]}),(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`span`,{children:`Ciudad:`}),` Ciudad de México`]}),(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`span`,{children:`Estado:`}),` CDMX`]}),(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`span`,{children:`Código Postal:`}),` 11800`]})]})]})]}),(0,A.jsxs)(`div`,{className:`detalle-columna`,children:[(0,A.jsxs)(`article`,{className:`tarjeta-detalle`,children:[(0,A.jsx)(`h3`,{children:`Repartidor`}),(0,A.jsxs)(`div`,{className:`repartidor`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Repartidor`,className:`repartidor__foto`}),(0,A.jsxs)(`div`,{className:`repartidor__datos`,children:[(0,A.jsxs)(`p`,{className:`repartidor__nombre`,children:[`Juan Pérez `,(0,A.jsx)(`span`,{className:`repartidor__estado`})]}),(0,A.jsx)(`p`,{children:`+52 55 9876 5432`}),(0,A.jsx)(`p`,{children:`juanperes@email.com`})]})]})]}),(0,A.jsxs)(`article`,{className:`tarjeta-detalle`,children:[(0,A.jsx)(`h3`,{children:`Información de Envío`}),(0,A.jsxs)(`div`,{className:`info-lista`,children:[(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`span`,{children:`Estado:`}),` `,(0,A.jsx)(`span`,{className:`estado estado--pendiente`,children:`● Pendiente`}),` `,(0,A.jsx)(`strong`,{className:`hora`,children:`Hoy, 12:45 PM`})]}),(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`span`,{children:`Prioridad:`}),` `,(0,A.jsx)(`span`,{className:`prioridad prioridad--expres`,children:`□ Exprés`})]}),(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`span`,{children:`Ruta Asignada:`}),` CDMX-015`]}),(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`span`,{children:`Centro de Distribución:`}),` CDMX-CD01`]}),(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`span`,{children:`Tipo de Servicio:`}),` Exprés`]})]})]}),(0,A.jsx)(`article`,{className:`tarjeta-detalle tarjeta-detalle--acciones`,children:(0,A.jsx)(`a`,{className:`boton-volver`,href:`/operador/envios`,children:`Volver`})})]})]})]})]})]})}function Qn(){return(0,x.useEffect)(()=>{let e=new URLSearchParams(window.location.search),t=document.getElementById(`alerta-registro`);if(e.get(`registro`)===`ok`){let n=e.get(`guia`);n&&(t.textContent=`Envío registrado correctamente con guía ${n}.`),t.classList.remove(`alerta-registro--oculta`),window.setTimeout(()=>{t.classList.add(`alerta-registro--oculta`)},3500),window.history.replaceState&&window.history.replaceState({},document.title,window.location.pathname)}},[]),(0,A.jsxs)(`div`,{className:`tablero-operador tablero-operador--sin-sidebar`,children:[(0,A.jsx)(`div`,{id:`menuContainer`,className:`menu-overlay`,children:(0,A.jsx)(Jn,{})}),(0,A.jsx)(`div`,{id:`menuBackdrop`,className:`menu-overlay__backdrop`}),(0,A.jsxs)(`main`,{className:`panel-principal panel-principal--full`,children:[(0,A.jsxs)(`header`,{className:`barra-superior barra-superior--con-logo`,children:[(0,A.jsxs)(`div`,{className:`barra-superior__left`,children:[(0,A.jsx)(`button`,{id:`btnMenu`,className:`btn-menu-hamburguesa`,"aria-label":`Abrir menú`,children:(0,A.jsxs)(`svg`,{width:`26`,height:`26`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,children:[(0,A.jsx)(`line`,{x1:`3`,y1:`6`,x2:`21`,y2:`6`}),(0,A.jsx)(`line`,{x1:`3`,y1:`12`,x2:`21`,y2:`12`}),(0,A.jsx)(`line`,{x1:`3`,y1:`18`,x2:`21`,y2:`18`})]})}),(0,A.jsx)(`div`,{className:`header-logo`,children:(0,A.jsx)(`img`,{src:`/piWeb/images/logoSinFondo.png`,alt:`Metzvia`})}),(0,A.jsx)(`h1`,{className:`barra-superior__titulo`,children:`Envíos`})]}),(0,A.jsxs)(`div`,{className:`barra-superior__perfil`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Operador`,className:`barra-superior__avatar`}),(0,A.jsx)(`span`,{className:`barra-superior__chevron`,children:`▾`})]})]}),(0,A.jsxs)(`section`,{className:`modulo-envios`,children:[(0,A.jsx)(`div`,{className:`alerta-registro alerta-registro--oculta`,id:`alerta-registro`,children:`Envío registrado correctamente.`}),(0,A.jsxs)(`div`,{className:`envios-encabezado`,children:[(0,A.jsx)(`h2`,{className:`envios-encabezado__titulo`,children:`// Envíos`}),(0,A.jsx)(`a`,{href:`#`,className:`envios-encabezado__ver`,children:`Ver Todo`})]}),(0,A.jsxs)(`div`,{className:`filtros-envios`,children:[(0,A.jsxs)(`div`,{className:`filtros-envios__fila`,children:[(0,A.jsxs)(`div`,{className:`campo-filtro`,children:[(0,A.jsx)(`label`,{htmlFor:`filtro-estado`,children:`Estado`}),(0,A.jsxs)(`select`,{id:`filtro-estado`,children:[(0,A.jsx)(`option`,{children:`Estado`}),(0,A.jsx)(`option`,{children:`Pendiente`}),(0,A.jsx)(`option`,{children:`En Tránsito`}),(0,A.jsx)(`option`,{children:`Retrasado`})]})]}),(0,A.jsxs)(`div`,{className:`campo-filtro campo-filtro--fecha`,children:[(0,A.jsx)(`label`,{htmlFor:`filtro-fecha`,children:`Fecha:`}),(0,A.jsx)(`input`,{id:`filtro-fecha`,type:`text`,defaultValue:`24/04/2024 - 24/04/2024`})]}),(0,A.jsxs)(`div`,{className:`buscador-envios`,children:[(0,A.jsx)(`input`,{type:`text`,placeholder:`Buscar ID o destinatario...`}),(0,A.jsx)(`button`,{children:`Buscar`})]})]}),(0,A.jsx)(`div`,{className:`tabla-envios`,children:(0,A.jsxs)(`table`,{children:[(0,A.jsx)(`thead`,{children:(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`th`,{children:`ID`}),(0,A.jsx)(`th`,{children:`Cliente`}),(0,A.jsx)(`th`,{children:`Estado`}),(0,A.jsx)(`th`,{children:`Prioridad`}),(0,A.jsx)(`th`,{children:`Ruta`}),(0,A.jsx)(`th`,{children:`Última Actualización`}),(0,A.jsx)(`th`,{children:`Acciones`})]})}),(0,A.jsxs)(`tbody`,{children:[(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:`PAK123456789`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`Ana Martínez`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`estado estado--pendiente`,children:`● Pendiente`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`prioridad prioridad--expres`,children:`□ Exprés`})}),(0,A.jsx)(`td`,{children:`CDMX-015`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`Hoy; 12:45 PM`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`a`,{className:`boton-detalles`,href:`/operador/detalle-envio?id=PAK123456789`,children:`Ver Detalles`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:`PAK987654321`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`Carlos Ramírez`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`estado estado--transito`,children:`● En Tránsito`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`prioridad prioridad--normal`,children:`□ Normal`})}),(0,A.jsx)(`td`,{children:`GDL-024`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`Hoy; 12:32 PM`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`a`,{className:`boton-detalles`,href:`/operador/detalle-envio?id=PAK987654321`,children:`Ver Detalles`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:`PAK456123789`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`Juan Pérez`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`estado estado--retrasado`,children:`● Retrasado`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`prioridad prioridad--expres`,children:`□ Exprés`})}),(0,A.jsx)(`td`,{children:`CDMX-030`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`Hoy; 11:54 AM`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`a`,{className:`boton-detalles`,href:`/operador/detalle-envio?id=PAK456123789`,children:`Ver Detalles`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:`PAK789654123`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`Lorena Morales`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`estado estado--pendiente`,children:`● Pendiente`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`prioridad prioridad--normal`,children:`□ Normal`})}),(0,A.jsx)(`td`,{children:`MTY-042`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`Hoy; 09:51 AM`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`a`,{className:`boton-detalles`,href:`/operador/detalle-envio?id=PAK789654123`,children:`Ver Detalles`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:`PAK654987213`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`Samuel Torres`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`estado estado--transito`,children:`● En Tránsito`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`prioridad prioridad--normal`,children:`□ Normal`})}),(0,A.jsx)(`td`,{children:`QRO-018`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`Pasa 2 días ago, 3:45 PM`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`a`,{className:`boton-detalles`,href:`/operador/detalle-envio?id=PAK654987213`,children:`Ver Detalles`})})]})]})]})})]})]})]})]})}function $n(){return(0,A.jsxs)(`div`,{className:`tablero-operador tablero-operador--sin-sidebar`,children:[(0,A.jsx)(`div`,{id:`menuContainer`,className:`menu-overlay`,children:(0,A.jsx)(Jn,{})}),(0,A.jsx)(`div`,{id:`menuBackdrop`,className:`menu-overlay__backdrop`}),(0,A.jsxs)(`main`,{className:`panel-principal panel-principal--full`,children:[(0,A.jsxs)(`header`,{className:`barra-superior barra-superior--con-logo`,children:[(0,A.jsxs)(`div`,{className:`barra-superior__left`,children:[(0,A.jsx)(`button`,{id:`btnMenu`,className:`btn-menu-hamburguesa`,"aria-label":`Abrir menú`,children:(0,A.jsxs)(`svg`,{width:`26`,height:`26`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,children:[(0,A.jsx)(`line`,{x1:`3`,y1:`6`,x2:`21`,y2:`6`}),(0,A.jsx)(`line`,{x1:`3`,y1:`12`,x2:`21`,y2:`12`}),(0,A.jsx)(`line`,{x1:`3`,y1:`18`,x2:`21`,y2:`18`})]})}),(0,A.jsx)(`div`,{className:`header-logo`,children:(0,A.jsx)(`img`,{src:`/piWeb/images/logoSinFondo.png`,alt:`Metzvia`})}),(0,A.jsx)(`h1`,{className:`barra-superior__titulo`,children:`Incidencias`})]}),(0,A.jsxs)(`div`,{className:`barra-superior__perfil`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Operador`,className:`barra-superior__avatar`}),(0,A.jsx)(`span`,{className:`barra-superior__chevron`,children:`▾`})]})]}),(0,A.jsxs)(`section`,{className:`modulo-incidencias`,children:[(0,A.jsxs)(`div`,{className:`incidencias-encabezado`,children:[(0,A.jsx)(`span`,{className:`incidencias-encabezado__icono`,children:`▣`}),(0,A.jsx)(`h2`,{children:`Incidencias`})]}),(0,A.jsx)(`div`,{className:`tabla-incidencias`,children:(0,A.jsxs)(`table`,{children:[(0,A.jsx)(`thead`,{children:(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`th`,{children:`Número de Guía`}),(0,A.jsx)(`th`,{children:`Estado`}),(0,A.jsx)(`th`,{children:`Repartidor`}),(0,A.jsx)(`th`,{children:`Motivo`}),(0,A.jsx)(`th`,{children:`Reportado el`})]})}),(0,A.jsxs)(`tbody`,{children:[(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`PAK00281356`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`estado-incidencia`,children:`En Incidencia`})}),(0,A.jsx)(`td`,{children:(0,A.jsxs)(`div`,{className:`repartidor-celda`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Javier Torres`}),(0,A.jsx)(`span`,{children:`Javier Torres`})]})}),(0,A.jsx)(`td`,{children:`Dirección incorrecta, cliente no encontrado`}),(0,A.jsx)(`td`,{children:`Hoy, 9:30 AM`})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`PAK00271234`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`estado-incidencia`,children:`En Incidencia`})}),(0,A.jsx)(`td`,{children:(0,A.jsxs)(`div`,{className:`repartidor-celda`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Juan Morales`}),(0,A.jsx)(`span`,{children:`Juan Morales`})]})}),(0,A.jsx)(`td`,{children:`Destinatario no estaba disponible`}),(0,A.jsx)(`td`,{children:`Ayer, 3:45 PM`})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`PAK00236290`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`estado-incidencia`,children:`En Incidencia`})}),(0,A.jsx)(`td`,{children:(0,A.jsxs)(`div`,{className:`repartidor-celda`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Miguel López`}),(0,A.jsx)(`span`,{children:`Miguel López`})]})}),(0,A.jsx)(`td`,{children:`Rechazo de entrega por el cliente`}),(0,A.jsx)(`td`,{children:`Ayer, 10:20 AM`})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`PAK00196745`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`estado-incidencia`,children:`En Incidencia`})}),(0,A.jsx)(`td`,{children:(0,A.jsxs)(`div`,{className:`repartidor-celda`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Javier Torres`}),(0,A.jsx)(`span`,{children:`Javier Torres`})]})}),(0,A.jsx)(`td`,{children:`Paquete dañado durante el trayecto`}),(0,A.jsx)(`td`,{children:`22/04/2024, 7:00 PM`})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`PAK00193210`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`estado-incidencia`,children:`En Incidencia`})}),(0,A.jsx)(`td`,{children:(0,A.jsxs)(`div`,{className:`repartidor-celda`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Javier Torres`}),(0,A.jsx)(`span`,{children:`Javier Torres`})]})}),(0,A.jsx)(`td`,{children:`Cliente solicitó reprogramación de entrega`}),(0,A.jsx)(`td`,{children:`22/04/2024, 2:18 PM`})]})]})]})})]})]})]})}function er(){return(0,A.jsxs)(`div`,{className:`tablero-operador tablero-operador--sin-sidebar`,children:[(0,A.jsx)(`div`,{id:`menuContainer`,className:`menu-overlay`,children:(0,A.jsx)(Jn,{})}),(0,A.jsx)(`div`,{id:`menuBackdrop`,className:`menu-overlay__backdrop`}),(0,A.jsxs)(`main`,{className:`panel-principal panel-principal--full`,children:[(0,A.jsxs)(`header`,{className:`barra-superior barra-superior--con-logo`,children:[(0,A.jsxs)(`div`,{className:`barra-superior__left`,children:[(0,A.jsx)(`button`,{id:`btnMenu`,className:`btn-menu-hamburguesa`,"aria-label":`Abrir menú`,children:(0,A.jsxs)(`svg`,{width:`26`,height:`26`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,children:[(0,A.jsx)(`line`,{x1:`3`,y1:`6`,x2:`21`,y2:`6`}),(0,A.jsx)(`line`,{x1:`3`,y1:`12`,x2:`21`,y2:`12`}),(0,A.jsx)(`line`,{x1:`3`,y1:`18`,x2:`21`,y2:`18`})]})}),(0,A.jsx)(`div`,{className:`header-logo`,children:(0,A.jsx)(`img`,{src:`/piWeb/images/logoSinFondo.png`,alt:`Metzvia`})}),(0,A.jsx)(`h1`,{className:`barra-superior__titulo`,children:`Mi cuenta`})]}),(0,A.jsxs)(`div`,{className:`barra-superior__perfil`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Operador`,className:`barra-superior__avatar`}),(0,A.jsx)(`span`,{className:`barra-superior__chevron`,children:`▾`})]})]}),(0,A.jsxs)(`section`,{className:`modulo-cuenta`,children:[(0,A.jsx)(`div`,{className:`cuenta-fondo-superior`}),(0,A.jsxs)(`div`,{className:`cuenta-perfil-principal`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Foto de perfil`,className:`cuenta-perfil-principal__avatar`}),(0,A.jsx)(`h2`,{children:`Juan Pérez`}),(0,A.jsxs)(`p`,{className:`cuenta-perfil-principal__estado`,children:[(0,A.jsx)(`span`,{className:`cuenta-perfil-principal__punto`}),`Operador Logístico`]})]}),(0,A.jsxs)(`div`,{className:`cuenta-datos`,children:[(0,A.jsxs)(`div`,{className:`cuenta-datos__fila`,children:[(0,A.jsx)(`span`,{className:`cuenta-datos__etiqueta`,children:`Trabajo:`}),(0,A.jsx)(`span`,{className:`cuenta-datos__valor`,children:`Operador Logístico`})]}),(0,A.jsxs)(`div`,{className:`cuenta-datos__fila`,children:[(0,A.jsx)(`span`,{className:`cuenta-datos__etiqueta`,children:`Email:`}),(0,A.jsx)(`span`,{className:`cuenta-datos__valor`,children:`juanperes@email.com`})]}),(0,A.jsxs)(`div`,{className:`cuenta-datos__fila`,children:[(0,A.jsx)(`span`,{className:`cuenta-datos__etiqueta`,children:`Teléfono:`}),(0,A.jsx)(`span`,{className:`cuenta-datos__valor`,children:`+52 55 1234 5678`})]}),(0,A.jsxs)(`div`,{className:`cuenta-datos__fila cuenta-datos__fila--select`,children:[(0,A.jsx)(`label`,{htmlFor:`centro-distribucion`,className:`cuenta-datos__etiqueta`,children:`Centro de Distribución:`}),(0,A.jsxs)(`select`,{id:`centro-distribucion`,className:`cuenta-datos__selector`,children:[(0,A.jsx)(`option`,{selected:!0,children:`🇲🇽 CDMX-CD01`}),(0,A.jsx)(`option`,{children:`🇲🇽 GDL-CD02`}),(0,A.jsx)(`option`,{children:`🇲🇽 MTY-CD03`})]})]})]})]})]})]})}function tr(){return(0,x.useEffect)(()=>{let e=[`remitente`,`destinatario`],t=0,n=document.querySelectorAll(`.paso-formulario`),r=document.querySelectorAll(`.paso-chip`),i=document.getElementById(`boton-siguiente`);function a(a){t=a,n.forEach(n=>{n.classList.toggle(`paso-formulario--activo`,n.dataset.step===e[t])}),r.forEach(n=>{n.classList.toggle(`paso-chip--activo`,n.dataset.stepTarget===e[t])}),i.textContent=t===0?`→`:`✓`,i.setAttribute(`aria-label`,t===0?`Ir a destinatario`:`Finalizar registro`)}r.forEach((e,t)=>{e.addEventListener(`click`,()=>{a(t)})}),i.addEventListener(`click`,()=>{if(t===0){a(1);return}window.location.href=`/operador/datos-paquete`})},[]),(0,A.jsxs)(`div`,{className:`tablero-operador tablero-operador--sin-sidebar`,children:[(0,A.jsx)(`div`,{id:`menuContainer`,className:`menu-overlay`,children:(0,A.jsx)(Jn,{})}),(0,A.jsx)(`div`,{id:`menuBackdrop`,className:`menu-overlay__backdrop`}),(0,A.jsxs)(`main`,{className:`panel-principal panel-principal--full`,children:[(0,A.jsxs)(`header`,{className:`barra-superior barra-superior--con-logo`,children:[(0,A.jsxs)(`div`,{className:`barra-superior__left`,children:[(0,A.jsx)(`button`,{id:`btnMenu`,className:`btn-menu-hamburguesa`,"aria-label":`Abrir menú`,children:(0,A.jsxs)(`svg`,{width:`26`,height:`26`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,children:[(0,A.jsx)(`line`,{x1:`3`,y1:`6`,x2:`21`,y2:`6`}),(0,A.jsx)(`line`,{x1:`3`,y1:`12`,x2:`21`,y2:`12`}),(0,A.jsx)(`line`,{x1:`3`,y1:`18`,x2:`21`,y2:`18`})]})}),(0,A.jsx)(`div`,{className:`header-logo`,children:(0,A.jsx)(`img`,{src:`/piWeb/images/logoSinFondo.png`,alt:`Metzvia`})}),(0,A.jsx)(`h1`,{className:`barra-superior__titulo`,children:`Registrar paquete`})]}),(0,A.jsxs)(`div`,{className:`barra-superior__perfil`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Operador`,className:`barra-superior__avatar`}),(0,A.jsx)(`span`,{className:`barra-superior__chevron`,children:`▾`})]})]}),(0,A.jsxs)(`section`,{className:`modulo-registro`,children:[(0,A.jsxs)(`div`,{className:`registro-encabezado`,children:[(0,A.jsx)(`span`,{className:`registro-encabezado__icono`,children:`▣`}),(0,A.jsx)(`h2`,{children:`Registrar Paquete`})]}),(0,A.jsxs)(`article`,{className:`tarjeta-formulario`,children:[(0,A.jsx)(`h3`,{children:`Nuevo Envío`}),(0,A.jsxs)(`div`,{className:`pasos-formulario`,role:`tablist`,"aria-label":`Pasos de registro`,children:[(0,A.jsx)(`button`,{type:`button`,className:`paso-chip paso-chip--activo`,"data-step-target":`remitente`,children:`Datos del Remitente`}),(0,A.jsx)(`button`,{type:`button`,className:`paso-chip`,"data-step-target":`destinatario`,children:`Datos del Destinatario`})]}),(0,A.jsxs)(`div`,{className:`seccion-formulario paso-formulario paso-formulario--activo`,"data-step":`remitente`,children:[(0,A.jsx)(`p`,{className:`seccion-formulario__titulo`,children:`Datos del Remitente`}),(0,A.jsxs)(`div`,{className:`grupo-campos grupo-campos--dos`,children:[(0,A.jsxs)(`label`,{children:[`Nombre Completo / Razón Social`,(0,A.jsx)(`input`,{type:`text`,placeholder:`Ingresar nombre...`})]}),(0,A.jsxs)(`label`,{children:[`Teléfono`,(0,A.jsx)(`input`,{type:`tel`,placeholder:`Ingresar teléfono...`})]})]}),(0,A.jsx)(`div`,{className:`grupo-campos grupo-campos--uno`,children:(0,A.jsxs)(`label`,{children:[`Correo Electrónico (opcional)`,(0,A.jsx)(`input`,{type:`email`,placeholder:`Ingresar correo...`})]})}),(0,A.jsxs)(`div`,{className:`grupo-campos grupo-campos--dos`,children:[(0,A.jsxs)(`label`,{children:[`Calle y número`,(0,A.jsx)(`input`,{type:`text`,placeholder:`Ingresar dirección...`})]}),(0,A.jsxs)(`label`,{children:[`Colonia`,(0,A.jsx)(`input`,{type:`text`,placeholder:`Ingresar colonia...`})]})]}),(0,A.jsxs)(`div`,{className:`grupo-campos grupo-campos--tres`,children:[(0,A.jsxs)(`label`,{children:[`Ciudad`,(0,A.jsx)(`input`,{type:`text`,defaultValue:`Ciudad de México`})]}),(0,A.jsxs)(`label`,{children:[`Estado`,(0,A.jsxs)(`select`,{children:[(0,A.jsx)(`option`,{children:`Seleccionar estado...`}),(0,A.jsx)(`option`,{children:`CDMX`}),(0,A.jsx)(`option`,{children:`Jalisco`}),(0,A.jsx)(`option`,{children:`Nuevo León`})]})]}),(0,A.jsxs)(`label`,{children:[`Código postal`,(0,A.jsx)(`input`,{type:`text`,placeholder:`Ingresar código postal...`})]})]})]}),(0,A.jsxs)(`div`,{className:`seccion-formulario paso-formulario`,"data-step":`destinatario`,children:[(0,A.jsx)(`p`,{className:`seccion-formulario__titulo`,children:`Datos del Destinatario`}),(0,A.jsxs)(`div`,{className:`grupo-campos grupo-campos--dos`,children:[(0,A.jsxs)(`label`,{children:[`Nombre Completo / Razón Social`,(0,A.jsx)(`input`,{type:`text`,placeholder:`Ingresar nombre...`})]}),(0,A.jsxs)(`label`,{children:[`Teléfono`,(0,A.jsx)(`input`,{type:`tel`,placeholder:`Ingresar teléfono...`})]})]}),(0,A.jsx)(`div`,{className:`grupo-campos grupo-campos--uno`,children:(0,A.jsxs)(`label`,{children:[`Correo Electrónico (opcional)`,(0,A.jsx)(`input`,{type:`email`,placeholder:`Ingresar correo...`})]})}),(0,A.jsxs)(`div`,{className:`grupo-campos grupo-campos--dos`,children:[(0,A.jsxs)(`label`,{children:[`Calle y número`,(0,A.jsx)(`input`,{type:`text`,placeholder:`Ingresar dirección...`})]}),(0,A.jsxs)(`label`,{children:[`Colonia`,(0,A.jsx)(`input`,{type:`text`,placeholder:`Ingresar colonia...`})]})]}),(0,A.jsxs)(`div`,{className:`grupo-campos grupo-campos--tres`,children:[(0,A.jsxs)(`label`,{children:[`Ciudad`,(0,A.jsx)(`input`,{type:`text`,defaultValue:`Ciudad de México`})]}),(0,A.jsxs)(`label`,{children:[`Estado`,(0,A.jsxs)(`select`,{children:[(0,A.jsx)(`option`,{children:`Seleccionar estado...`}),(0,A.jsx)(`option`,{children:`CDMX`}),(0,A.jsx)(`option`,{children:`Jalisco`}),(0,A.jsx)(`option`,{children:`Nuevo León`})]})]}),(0,A.jsxs)(`label`,{children:[`Código postal`,(0,A.jsx)(`input`,{type:`text`,placeholder:`Ingresar código postal...`})]})]})]})]}),(0,A.jsxs)(`div`,{className:`acciones-formulario`,children:[(0,A.jsx)(`a`,{href:`/operador/dashboard`,className:`boton-secundario`,children:`Cancelar`}),(0,A.jsx)(`button`,{type:`button`,className:`boton-primario`,id:`boton-siguiente`,"aria-label":`Siguiente paso`,children:`→`})]})]})]})]})}function nr(){return(0,A.jsxs)(`div`,{className:`tablero-operador tablero-operador--sin-sidebar`,children:[(0,A.jsx)(`div`,{id:`menuContainer`,className:`menu-overlay`}),(0,A.jsx)(`div`,{id:`menuBackdrop`,className:`menu-overlay__backdrop`}),(0,A.jsxs)(`main`,{className:`panel-principal panel-principal--full`,children:[(0,A.jsxs)(`header`,{className:`barra-superior barra-superior--con-logo`,children:[(0,A.jsxs)(`div`,{className:`barra-superior__left`,children:[(0,A.jsx)(`button`,{id:`btnMenu`,className:`btn-menu-hamburguesa`,"aria-label":`Abrir menú`,children:(0,A.jsxs)(`svg`,{width:`26`,height:`26`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,children:[(0,A.jsx)(`line`,{x1:`3`,y1:`6`,x2:`21`,y2:`6`}),(0,A.jsx)(`line`,{x1:`3`,y1:`12`,x2:`21`,y2:`12`}),(0,A.jsx)(`line`,{x1:`3`,y1:`18`,x2:`21`,y2:`18`})]})}),(0,A.jsx)(`div`,{className:`header-logo`,children:(0,A.jsx)(`img`,{src:`/piWeb/images/logoSinFondo.png`,alt:`Metzvia`})}),(0,A.jsx)(`h1`,{className:`barra-superior__titulo`,children:`Supervisor`})]}),(0,A.jsxs)(`div`,{className:`barra-superior__perfil`,children:[(0,A.jsxs)(`span`,{className:`badge-servicio`,children:[(0,A.jsx)(`span`,{className:`header-sv__punto-verde`}),` En servicio`]}),(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Supervisor`,className:`barra-superior__avatar`}),(0,A.jsx)(`span`,{className:`barra-superior__chevron`,children:`▾`})]})]}),(0,A.jsxs)(`section`,{className:`bienvenida-sv`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:``,className:`bienvenida-sv__avatar`}),(0,A.jsxs)(`div`,{className:`bienvenida-sv__info`,children:[(0,A.jsxs)(`h2`,{children:[`Bienvenido, `,(0,A.jsx)(`strong`,{children:`Juan Pérez`})]}),(0,A.jsxs)(`span`,{className:`bienvenida-sv__estado`,children:[(0,A.jsx)(`span`,{className:`header-sv__punto-verde`}),` En servicio`]})]})]}),(0,A.jsxs)(`section`,{className:`resumen-sv`,children:[(0,A.jsxs)(`article`,{className:`tarjeta-sv tarjeta-sv--azul`,children:[(0,A.jsx)(`span`,{className:`tarjeta-sv__icono`,children:`📦`}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`p`,{className:`tarjeta-sv__numero`,children:`148`}),(0,A.jsx)(`p`,{className:`tarjeta-sv__label`,children:`Entregas hoy`})]})]}),(0,A.jsxs)(`article`,{className:`tarjeta-sv tarjeta-sv--amarillo`,children:[(0,A.jsx)(`span`,{className:`tarjeta-sv__icono`,children:`⚠`}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`p`,{className:`tarjeta-sv__numero`,children:`32`}),(0,A.jsx)(`p`,{className:`tarjeta-sv__label`,children:`Pendientes`})]})]}),(0,A.jsxs)(`article`,{className:`tarjeta-sv tarjeta-sv--rojo`,children:[(0,A.jsx)(`span`,{className:`tarjeta-sv__icono`,children:`▲`}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`p`,{className:`tarjeta-sv__numero`,children:`8`}),(0,A.jsx)(`p`,{className:`tarjeta-sv__label`,children:`Retrasadas`})]})]}),(0,A.jsxs)(`article`,{className:`tarjeta-sv tarjeta-sv--gris`,children:[(0,A.jsx)(`span`,{className:`tarjeta-sv__icono`,children:`💻`}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`p`,{className:`tarjeta-sv__numero`,children:`5`}),(0,A.jsx)(`p`,{className:`tarjeta-sv__label`,children:`Incidencias`})]})]}),(0,A.jsxs)(`article`,{className:`tarjeta-sv tarjeta-sv--morado`,children:[(0,A.jsx)(`span`,{className:`tarjeta-sv__icono`,children:`👥`}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`p`,{className:`tarjeta-sv__numero`,children:`-`}),(0,A.jsx)(`p`,{className:`tarjeta-sv__label`,children:`Entregados`})]})]})]}),(0,A.jsxs)(`section`,{className:`contenido-sv`,children:[(0,A.jsxs)(`div`,{className:`envios-sv`,children:[(0,A.jsxs)(`div`,{className:`envios-sv__header`,children:[(0,A.jsx)(`h2`,{children:`Envíos Activos`}),(0,A.jsxs)(`div`,{className:`envios-sv__buscar-wrap`,children:[(0,A.jsx)(`input`,{type:`text`,placeholder:`Buscar dirección o número de guía`,className:`envios-sv__busqueda`}),(0,A.jsxs)(`button`,{className:`envios-sv__btn-todos`,children:[`Todos `,(0,A.jsx)(`span`,{children:`⌄`})]})]})]}),(0,A.jsxs)(`div`,{className:`envios-sv__filtros`,children:[(0,A.jsxs)(`button`,{className:`filtro-sv filtro-sv--activo`,children:[`Todos `,(0,A.jsx)(`span`,{children:`⌄`})]}),(0,A.jsxs)(`button`,{className:`filtro-sv`,children:[(0,A.jsx)(`span`,{className:`filtro-sv__dot filtro-sv__dot--amarillo`}),` Pendiente`]}),(0,A.jsxs)(`button`,{className:`filtro-sv`,children:[(0,A.jsx)(`span`,{className:`filtro-sv__dot filtro-sv__dot--verde`}),` En ruta`]}),(0,A.jsxs)(`button`,{className:`filtro-sv`,children:[(0,A.jsx)(`span`,{className:`filtro-sv__dot filtro-sv__dot--rojo`}),` Retrasado `,(0,A.jsx)(`span`,{children:`⌄`})]}),(0,A.jsxs)(`button`,{className:`filtro-sv`,children:[(0,A.jsx)(`span`,{className:`filtro-sv__dot filtro-sv__dot--teal`}),` Entregado `,(0,A.jsx)(`span`,{children:`⌄`})]}),(0,A.jsx)(`button`,{className:`filtro-sv filtro-sv--more`,children:`⋯`})]}),(0,A.jsxs)(`div`,{className:`envios-sv__lista`,children:[(0,A.jsxs)(`div`,{className:`envio-card`,children:[(0,A.jsxs)(`div`,{className:`envio-card__top`,children:[(0,A.jsxs)(`div`,{className:`envio-card__info`,children:[(0,A.jsx)(`span`,{className:`envio-card__id`,children:`PAK123456789`}),(0,A.jsx)(`span`,{className:`envio-card__dots`,children:`● ● ●`})]}),(0,A.jsx)(`span`,{className:`envio-card__horario`,children:`10:00 – 11:00`})]}),(0,A.jsxs)(`div`,{className:`envio-card__body`,children:[(0,A.jsxs)(`p`,{className:`envio-card__nombre`,children:[(0,A.jsx)(`strong`,{children:`Ana Martínez`}),` · Col. Roma Norte, CDMX`]}),(0,A.jsx)(`p`,{className:`envio-card__repartidor`,children:`Luis Garcia · Luis Garcia`})]}),(0,A.jsxs)(`div`,{className:`envio-card__footer`,children:[(0,A.jsx)(`span`,{className:`envio-card__estado envio-card__estado--pendiente`,children:`● Pendiente`}),(0,A.jsxs)(`div`,{className:`envio-card__acciones`,children:[(0,A.jsx)(`button`,{className:`envio-card__btn`,children:`Ver detalle`}),(0,A.jsx)(`button`,{className:`envio-card__btn`,children:`Reasignar`})]})]})]}),(0,A.jsxs)(`div`,{className:`envio-card`,children:[(0,A.jsxs)(`div`,{className:`envio-card__top`,children:[(0,A.jsxs)(`div`,{className:`envio-card__info`,children:[(0,A.jsx)(`span`,{className:`envio-card__id`,children:`MX267584321`}),(0,A.jsx)(`span`,{className:`envio-card__dots`,children:`● ● ●`})]}),(0,A.jsx)(`span`,{className:`envio-card__horario`,children:`12:00 – 1:00`})]}),(0,A.jsxs)(`div`,{className:`envio-card__body`,children:[(0,A.jsxs)(`p`,{className:`envio-card__nombre`,children:[(0,A.jsx)(`strong`,{children:`Carlos Ramírez`}),` · Av. Tecnológico 210,`]}),(0,A.jsx)(`p`,{className:`envio-card__repartidor`,children:`Javier Torres · Javier Torres`})]}),(0,A.jsxs)(`div`,{className:`envio-card__footer`,children:[(0,A.jsx)(`span`,{className:`envio-card__estado envio-card__estado--enruta`,children:`✔ En ruta`}),(0,A.jsxs)(`div`,{className:`envio-card__acciones`,children:[(0,A.jsx)(`button`,{className:`envio-card__btn`,children:`Ver detalle`}),(0,A.jsx)(`button`,{className:`envio-card__btn`,children:`Reasignar`})]})]})]}),(0,A.jsxs)(`div`,{className:`envio-card`,children:[(0,A.jsxs)(`div`,{className:`envio-card__top`,children:[(0,A.jsxs)(`div`,{className:`envio-card__info`,children:[(0,A.jsx)(`span`,{className:`envio-card__id`,children:`PAK987654321`}),(0,A.jsx)(`span`,{className:`envio-card__dots`,children:`● ● ●`})]}),(0,A.jsx)(`span`,{className:`envio-card__horario`,children:`1:00 – 3:00`})]}),(0,A.jsxs)(`div`,{className:`envio-card__body`,children:[(0,A.jsxs)(`p`,{className:`envio-card__nombre`,children:[(0,A.jsx)(`strong`,{children:`Laura Gómez`}),` · Av. Revolución 456, Col. Del Valle, CDMX`]}),(0,A.jsx)(`p`,{className:`envio-card__repartidor`,children:`CDMX · Ricardo Muñoz`})]}),(0,A.jsxs)(`div`,{className:`envio-card__footer`,children:[(0,A.jsx)(`span`,{className:`envio-card__estado envio-card__estado--retrasado`,children:`▲ Retrasado`}),(0,A.jsxs)(`div`,{className:`envio-card__acciones`,children:[(0,A.jsx)(`button`,{className:`envio-card__btn`,children:`Ver detalle`}),(0,A.jsx)(`button`,{className:`envio-card__btn`,children:`Reasignar`})]})]})]}),(0,A.jsxs)(`div`,{className:`envio-card`,children:[(0,A.jsxs)(`div`,{className:`envio-card__top`,children:[(0,A.jsxs)(`div`,{className:`envio-card__info`,children:[(0,A.jsx)(`span`,{className:`envio-card__id`,children:`MX247360219`}),(0,A.jsx)(`span`,{className:`envio-card__dots`,children:`● ● ●`})]}),(0,A.jsx)(`span`,{className:`envio-card__horario`,children:`2:00 – 3:00`})]}),(0,A.jsxs)(`div`,{className:`envio-card__body`,children:[(0,A.jsxs)(`p`,{className:`envio-card__nombre`,children:[(0,A.jsx)(`strong`,{children:`Pedro Sánchez`}),` · Av. Universidad 789, Col. Coyoacán, CDMX`]}),(0,A.jsx)(`p`,{className:`envio-card__repartidor`,children:`CDMX · Jorge Medina`})]}),(0,A.jsxs)(`div`,{className:`envio-card__footer`,children:[(0,A.jsx)(`span`,{className:`envio-card__estado envio-card__estado--entregado`,children:`✔ Entregado`}),(0,A.jsxs)(`div`,{className:`envio-card__acciones`,children:[(0,A.jsx)(`button`,{className:`envio-card__btn`,children:`Ver detalle`}),(0,A.jsx)(`button`,{className:`envio-card__btn`,children:`Reasignar`})]})]})]}),(0,A.jsxs)(`div`,{className:`envio-card`,children:[(0,A.jsxs)(`div`,{className:`envio-card__top`,children:[(0,A.jsxs)(`div`,{className:`envio-card__info`,children:[(0,A.jsx)(`span`,{className:`envio-card__id`,children:`MX247260219`}),(0,A.jsx)(`span`,{className:`envio-card__dots`,children:`● ● ●`})]}),(0,A.jsx)(`span`,{className:`envio-card__horario`,children:`3:00 – 4:30`})]}),(0,A.jsxs)(`div`,{className:`envio-card__body`,children:[(0,A.jsxs)(`p`,{className:`envio-card__nombre`,children:[(0,A.jsx)(`strong`,{children:`Sofía Lozano`}),` · Centro Oriente 230`]}),(0,A.jsx)(`p`,{className:`envio-card__repartidor`,children:`CDMX · José Herrera`})]}),(0,A.jsxs)(`div`,{className:`envio-card__footer`,children:[(0,A.jsx)(`span`,{className:`envio-card__estado envio-card__estado--entregado`,children:`✔ Entregado`}),(0,A.jsxs)(`div`,{className:`envio-card__acciones`,children:[(0,A.jsx)(`button`,{className:`envio-card__btn`,children:`Ver detalle`}),(0,A.jsx)(`button`,{className:`envio-card__btn`,children:`Reasignar`})]})]})]})]})]}),(0,A.jsxs)(`aside`,{className:`stats-sv`,children:[(0,A.jsxs)(`div`,{className:`stats-sv__header`,children:[(0,A.jsxs)(`button`,{className:`stats-sv__filtro-btn`,children:[`Filtro `,(0,A.jsx)(`span`,{children:`⌄`})]}),(0,A.jsxs)(`button`,{className:`stats-sv__export-btn`,children:[`📄 Exportar PDF `,(0,A.jsx)(`span`,{children:`⌄`})]})]}),(0,A.jsxs)(`div`,{className:`stats-sv__card`,children:[(0,A.jsx)(`p`,{className:`stats-sv__label`,children:`Entregas completadas hoy`}),(0,A.jsx)(`p`,{className:`stats-sv__valor`,children:`116`})]}),(0,A.jsxs)(`div`,{className:`stats-sv__card`,children:[(0,A.jsx)(`p`,{className:`stats-sv__label`,children:`Tiempo promedio`}),(0,A.jsx)(`p`,{className:`stats-sv__valor`,children:`42 min`})]}),(0,A.jsxs)(`div`,{className:`stats-sv__card`,children:[(0,A.jsx)(`p`,{className:`stats-sv__label`,children:`Cumplimiento`}),(0,A.jsx)(`p`,{className:`stats-sv__valor`,children:`93%`})]}),(0,A.jsxs)(`div`,{className:`stats-sv__card stats-sv__card--resumen`,children:[(0,A.jsx)(`p`,{className:`stats-sv__label`,children:`Entregas completadas hoy`}),(0,A.jsx)(`p`,{className:`stats-sv__valor`,children:`116`}),(0,A.jsx)(`p`,{className:`stats-sv__cumpl`,children:`Cumplimiento ✔`}),(0,A.jsx)(`button`,{className:`stats-sv__reporte-btn`,children:`Ver reporte completo`})]})]})]})]})]})}function rr(){return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(`style`,{children:`
    /* ── Detalle del Envío ── */
    .det-header {
      display: flex;
      align-items: center;
      gap: 14px;
      margin: 20px 0 22px;
    }
    .det-header__titulo {
      font-size: 26px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0;
    }
    .det-header__guia {
      display: inline-block;
      padding: 4px 16px;
      border-radius: 8px;
      background: #1a2d50;
      color: #fff;
      font-size: 14px;
      font-weight: 700;
      font-family: monospace;
      letter-spacing: 0.5px;
    }

    /* Layout 2 columnas */
    .det-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 24px;
    }

    /* Tarjeta genérica */
    .det-card {
      background: rgba(220,230,250,0.35);
      border: 1px solid rgba(200,215,240,0.45);
      border-radius: 16px;
      padding: 20px 24px;
    }
    .det-card__titulo {
      font-size: 17px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0 0 16px;
      padding-bottom: 10px;
      border-bottom: 1.5px solid rgba(200,215,240,0.4);
    }

    /* ── Info Paquete ── */
    .det-paq__guia-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 14px;
    }
    .det-paq__guia-icono {
      font-size: 18px;
      color: #3b6aaa;
    }
    .det-paq__guia {
      font-size: 16px;
      font-weight: 700;
      color: #1a2d50;
      font-family: monospace;
    }
    .det-paq__campo {
      display: flex;
      gap: 8px;
      margin-bottom: 10px;
      font-size: 14px;
      line-height: 1.5;
    }
    .det-paq__label {
      color: #5a6d8a;
      min-width: 90px;
      font-weight: 500;
    }
    .det-paq__valor {
      color: #1a2d50;
      font-weight: 600;
    }

    /* ── Timeline estado del envío ── */
    .det-timeline {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      position: relative;
      padding: 10px 0 0;
      margin-bottom: 10px;
    }
    .det-timeline::before {
      content: '';
      position: absolute;
      top: 30px;
      left: 32px;
      right: 32px;
      height: 3px;
      background: #d0d8e8;
      z-index: 0;
    }
    .det-timeline__step {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      z-index: 1;
      flex: 1;
    }
    .det-timeline__circle {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: #fff;
      margin-bottom: 8px;
      border: 3px solid #fff;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .det-timeline__circle--done {
      background: #5a9bd5;
    }
    .det-timeline__circle--active {
      background: #3b6aaa;
      width: 50px;
      height: 50px;
      font-size: 22px;
    }
    .det-timeline__circle--pending {
      background: #b0c4de;
    }
    .det-timeline__label {
      font-size: 13px;
      font-weight: 700;
      color: #1a2d50;
      text-align: center;
    }
    .det-timeline__label--active {
      font-weight: 800;
    }
    .det-timeline__fecha {
      font-size: 11px;
      color: #8899b4;
      text-align: center;
      margin-top: 2px;
    }

    /* ── Repartidor asignado ── */
    .det-rep {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .det-rep__foto {
      width: 80px;
      height: 80px;
      border-radius: 14px;
      object-fit: cover;
      border: 2px solid rgba(200,215,240,0.5);
    }
    .det-rep__info {
      flex: 1;
      min-width: 120px;
    }
    .det-rep__nombre {
      font-size: 18px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0 0 4px;
    }
    .det-rep__zona {
      font-size: 14px;
      color: #5a6d8a;
      margin: 0 0 8px;
    }
    .det-rep__badge {
      display: inline-block;
      padding: 4px 14px;
      border-radius: 8px;
      background: #3b6aaa;
      color: #fff;
      font-size: 13px;
      font-weight: 700;
    }
    .det-rep__acciones {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .det-rep-btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 8px 18px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      border: none;
      transition: opacity 0.2s;
      white-space: nowrap;
    }
    .det-rep-btn:hover { opacity: 0.88; }
    .det-rep-btn--reasignar {
      background: #3b6aaa;
      color: #fff;
    }
    .det-rep-btn--retraso {
      background: #f5a623;
      color: #fff;
    }
    .det-rep-btn--incidencia {
      background: #e53935;
      color: #fff;
    }
    .det-rep-btn__icono { font-size: 15px; }

    /* Vehículo */
    .det-vehiculo {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 12px 0 0;
      border-top: 1px solid rgba(200,215,240,0.35);
      margin-top: 4px;
    }
    .det-vehiculo__img {
      width: 80px;
      height: 50px;
      object-fit: contain;
      border-radius: 8px;
      background: rgba(240,244,255,0.5);
      padding: 4px;
    }
    .det-vehiculo__nombre {
      font-size: 15px;
      font-weight: 700;
      color: #1a2d50;
    }

    /* ── Estado del envío (lista vertical) ── */
    .det-estado-lista {
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .det-estado-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 0;
      border-bottom: 1px solid rgba(200,215,240,0.25);
      position: relative;
    }
    .det-estado-item:last-child { border-bottom: none; }
    .det-estado-item__check {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      flex-shrink: 0;
    }
    .det-estado-item__check--done {
      background: #43a047;
      color: #fff;
    }
    .det-estado-item__check--pending {
      background: #d0d8e8;
      color: #fff;
    }
    .det-estado-item__label {
      font-size: 15px;
      color: #1a2d50;
      font-weight: 600;
    }
    .det-estado-item__label--active {
      font-weight: 800;
    }
    .det-estado-item--line::before {
      content: '';
      position: absolute;
      left: 13px;
      top: 0;
      height: 12px;
      width: 2px;
      background: #43a047;
    }

    /* ── Acciones Supervisor ── */
    .det-acciones-sv {
      margin-top: 4px;
    }
    .det-acciones-sv__btns {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 14px;
    }
    .det-sv-btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 10px 22px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      border: none;
      transition: opacity 0.2s, background 0.2s;
    }
    .det-sv-btn:hover { opacity: 0.88; }
    .det-sv-btn--reasignar {
      background: rgba(255,255,255,0.85);
      color: #3b5585;
      border: 1.5px solid #d0d8e8;
    }
    .det-sv-btn--reasignar:hover { background: #fff; }
    .det-sv-btn--retraso {
      background: #f5a623;
      color: #fff;
    }
    .det-sv-btn__icono { font-size: 16px; }
    .det-sv-btn__flecha {
      font-size: 14px;
      margin-left: 4px;
    }

    /* ── Barra inferior ── */
    .det-barra-inf {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0 24px;
      flex-wrap: wrap;
      gap: 12px;
    }
    .det-barra-btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 10px 22px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      border: none;
      text-decoration: none;
      transition: opacity 0.2s;
    }
    .det-barra-btn:hover { opacity: 0.88; }
    .det-barra-btn--volver {
      background: #3b6aaa;
      color: #fff;
    }
    .det-barra-btn--detalles {
      background: rgba(255,255,255,0.85);
      color: #3b5585;
      border: 1px solid #d0d8e8;
    }
    .det-barra-btn--detalles:hover { background: #fff; }
    .det-barra-btn__icono { font-size: 16px; }

    /* Responsive */
    @media (max-width: 860px) {
      .det-layout { grid-template-columns: 1fr; }
      .det-timeline { flex-wrap: wrap; gap: 12px; }
      .det-timeline::before { display: none; }
    }
    @media (max-width: 600px) {
      .det-header { flex-direction: column; align-items: flex-start; }
      .det-rep { flex-direction: column; align-items: flex-start; }
      .det-rep__acciones { flex-direction: row; flex-wrap: wrap; }
      .det-acciones-sv__btns { flex-direction: column; }
      .det-barra-inf { flex-direction: column; align-items: stretch; }
      .det-barra-btn { justify-content: center; }
    }
  `}),(0,A.jsxs)(`div`,{className:`tablero-operador tablero-operador--sin-sidebar`,children:[(0,A.jsx)(`div`,{id:`menuContainer`,className:`menu-overlay`}),(0,A.jsx)(`div`,{id:`menuBackdrop`,className:`menu-overlay__backdrop`}),(0,A.jsxs)(`main`,{className:`panel-principal panel-principal--full`,children:[(0,A.jsxs)(`header`,{className:`barra-superior barra-superior--con-logo`,children:[(0,A.jsxs)(`div`,{className:`barra-superior__left`,children:[(0,A.jsx)(`button`,{id:`btnMenu`,className:`btn-menu-hamburguesa`,"aria-label":`Abrir menú`,children:(0,A.jsxs)(`svg`,{width:`26`,height:`26`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,children:[(0,A.jsx)(`line`,{x1:`3`,y1:`6`,x2:`21`,y2:`6`}),(0,A.jsx)(`line`,{x1:`3`,y1:`12`,x2:`21`,y2:`12`}),(0,A.jsx)(`line`,{x1:`3`,y1:`18`,x2:`21`,y2:`18`})]})}),(0,A.jsx)(`div`,{className:`header-logo`,children:(0,A.jsx)(`img`,{src:`/piWeb/images/logoSinFondo.png`,alt:`Metzvia`})}),(0,A.jsx)(`h1`,{className:`barra-superior__titulo`,children:`Supervisor`})]}),(0,A.jsxs)(`div`,{className:`barra-superior__perfil`,children:[(0,A.jsxs)(`span`,{className:`badge-servicio`,children:[(0,A.jsx)(`span`,{className:`header-sv__punto-verde`}),` En servicio`]}),(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Supervisor`,className:`barra-superior__avatar`}),(0,A.jsx)(`span`,{className:`barra-superior__chevron`,children:`▾`})]})]}),(0,A.jsxs)(`div`,{className:`det-header`,children:[(0,A.jsx)(`h2`,{className:`det-header__titulo`,children:`Detalle del Envío`}),(0,A.jsx)(`span`,{className:`det-header__guia`,children:`PAK123456789`})]}),(0,A.jsxs)(`div`,{className:`det-layout`,children:[(0,A.jsxs)(`div`,{className:`det-card`,children:[(0,A.jsx)(`h3`,{className:`det-card__titulo`,children:`Información del Paquete`}),(0,A.jsxs)(`div`,{className:`det-paq__guia-row`,children:[(0,A.jsx)(`span`,{className:`det-paq__guia-icono`,children:`📦`}),(0,A.jsx)(`span`,{className:`det-paq__guia`,children:`PAK123456789`})]}),(0,A.jsxs)(`div`,{className:`det-paq__campo`,children:[(0,A.jsx)(`span`,{className:`det-paq__label`,children:`Cliente`}),(0,A.jsx)(`span`,{className:`det-paq__valor`,children:`Ana Martínez`})]}),(0,A.jsxs)(`div`,{className:`det-paq__campo`,children:[(0,A.jsx)(`span`,{className:`det-paq__label`,children:`Teléfono`}),(0,A.jsx)(`span`,{className:`det-paq__valor`,children:`(55) 1234 5678`})]}),(0,A.jsxs)(`div`,{className:`det-paq__campo`,children:[(0,A.jsx)(`span`,{className:`det-paq__label`,children:`Dirección`}),(0,A.jsx)(`span`,{className:`det-paq__valor`,children:`Col. Roma Norte, CDMX`})]}),(0,A.jsxs)(`div`,{className:`det-paq__campo`,children:[(0,A.jsx)(`span`,{className:`det-paq__label`,children:`Peso`}),(0,A.jsx)(`span`,{className:`det-paq__valor`,children:`2.6 kg`})]}),(0,A.jsxs)(`div`,{className:`det-paq__campo`,children:[(0,A.jsx)(`span`,{className:`det-paq__label`,children:`Dimensiones`}),(0,A.jsx)(`span`,{className:`det-paq__valor`,children:`30 cm x 25 cm x 20 cm`})]})]}),(0,A.jsxs)(`div`,{className:`det-card`,children:[(0,A.jsx)(`h3`,{className:`det-card__titulo`,children:`Estado del Envío`}),(0,A.jsxs)(`div`,{className:`det-timeline`,children:[(0,A.jsxs)(`div`,{className:`det-timeline__step`,children:[(0,A.jsx)(`div`,{className:`det-timeline__circle det-timeline__circle--done`,children:`✔`}),(0,A.jsx)(`span`,{className:`det-timeline__label`,children:`Registrado`}),(0,A.jsx)(`span`,{className:`det-timeline__fecha`,children:`24 abr 8:00 AM`})]}),(0,A.jsxs)(`div`,{className:`det-timeline__step`,children:[(0,A.jsx)(`div`,{className:`det-timeline__circle det-timeline__circle--active`,children:`✔`}),(0,A.jsx)(`span`,{className:`det-timeline__label det-timeline__label--active`,children:`En almacén`}),(0,A.jsx)(`span`,{className:`det-timeline__fecha`,children:`24 abr 8:45 AM`})]}),(0,A.jsxs)(`div`,{className:`det-timeline__step`,children:[(0,A.jsx)(`div`,{className:`det-timeline__circle det-timeline__circle--done`,children:`✔`}),(0,A.jsx)(`span`,{className:`det-timeline__label det-timeline__label--active`,children:`En ruta`}),(0,A.jsx)(`span`,{className:`det-timeline__fecha`,children:`24 abr 9:20 AM`})]}),(0,A.jsxs)(`div`,{className:`det-timeline__step`,children:[(0,A.jsx)(`div`,{className:`det-timeline__circle det-timeline__circle--done`,children:`✔`}),(0,A.jsx)(`span`,{className:`det-timeline__label`,children:`Entregado`}),(0,A.jsx)(`span`,{className:`det-timeline__fecha`,children:`24 abr 10:30 AM`})]})]})]}),(0,A.jsxs)(`div`,{className:`det-card`,children:[(0,A.jsx)(`h3`,{className:`det-card__titulo`,children:`Estado del Envío`}),(0,A.jsxs)(`div`,{className:`det-estado-lista`,children:[(0,A.jsxs)(`div`,{className:`det-estado-item`,children:[(0,A.jsx)(`span`,{className:`det-estado-item__check det-estado-item__check--done`,children:`✔`}),(0,A.jsx)(`span`,{className:`det-estado-item__label`,children:`Registrado`})]}),(0,A.jsxs)(`div`,{className:`det-estado-item det-estado-item--line`,children:[(0,A.jsx)(`span`,{className:`det-estado-item__check det-estado-item__check--done`,children:`✔`}),(0,A.jsx)(`span`,{className:`det-estado-item__label`,children:`En almacén`})]}),(0,A.jsxs)(`div`,{className:`det-estado-item det-estado-item--line`,children:[(0,A.jsx)(`span`,{className:`det-estado-item__check det-estado-item__check--done`,children:`✔`}),(0,A.jsx)(`span`,{className:`det-estado-item__label det-estado-item__label--active`,children:`En ruta`})]}),(0,A.jsxs)(`div`,{className:`det-estado-item det-estado-item--line`,children:[(0,A.jsx)(`span`,{className:`det-estado-item__check det-estado-item__check--done`,children:`✔`}),(0,A.jsx)(`span`,{className:`det-estado-item__label`,children:`Entregado`})]})]})]}),(0,A.jsxs)(`div`,{className:`det-card`,children:[(0,A.jsx)(`h3`,{className:`det-card__titulo`,children:`Repartidor Asignado`}),(0,A.jsxs)(`div`,{className:`det-rep`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Luis García`,className:`det-rep__foto`}),(0,A.jsxs)(`div`,{className:`det-rep__info`,children:[(0,A.jsx)(`p`,{className:`det-rep__nombre`,children:`Luis García`}),(0,A.jsx)(`p`,{className:`det-rep__zona`,children:`Centro`}),(0,A.jsx)(`span`,{className:`det-rep__badge`,children:`Centro`})]}),(0,A.jsxs)(`div`,{className:`det-rep__acciones`,children:[(0,A.jsxs)(`button`,{className:`det-rep-btn det-rep-btn--reasignar`,children:[(0,A.jsx)(`span`,{className:`det-rep-btn__icono`,children:`📦`}),` Reasignar repartidor`]}),(0,A.jsxs)(`button`,{className:`det-rep-btn det-rep-btn--retraso`,children:[(0,A.jsx)(`span`,{className:`det-rep-btn__icono`,children:`⚠`}),` Marcar retraso`]}),(0,A.jsxs)(`button`,{className:`det-rep-btn det-rep-btn--incidencia`,children:[(0,A.jsx)(`span`,{className:`det-rep-btn__icono`,children:`⚠`}),` Reportar incidencia`]})]})]}),(0,A.jsxs)(`div`,{className:`det-vehiculo`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/logoSinFondo.png`,alt:`Nissan NV200`,className:`det-vehiculo__img`}),(0,A.jsx)(`span`,{className:`det-vehiculo__nombre`,children:`Nissan NV200`})]})]})]}),(0,A.jsxs)(`div`,{className:`det-card det-acciones-sv`,children:[(0,A.jsx)(`h3`,{className:`det-card__titulo`,children:`Acciones Supervisor`}),(0,A.jsxs)(`div`,{className:`det-acciones-sv__btns`,children:[(0,A.jsxs)(`button`,{className:`det-sv-btn det-sv-btn--reasignar`,children:[(0,A.jsx)(`span`,{className:`det-sv-btn__icono`,children:`📦`}),` Reasignar repartidor`,(0,A.jsx)(`span`,{className:`det-sv-btn__flecha`,children:`›`})]}),(0,A.jsxs)(`button`,{className:`det-sv-btn det-sv-btn--retraso`,children:[(0,A.jsx)(`span`,{className:`det-sv-btn__icono`,children:`⏰`}),` Marcar retraso`]})]})]}),(0,A.jsxs)(`div`,{className:`det-barra-inf`,children:[(0,A.jsx)(`a`,{href:`/piWeb/src/pages/supervisor/enviosSupervisor.html`,className:`det-barra-btn det-barra-btn--volver`,children:`‹ Volver`}),(0,A.jsxs)(`button`,{className:`det-barra-btn det-barra-btn--detalles`,children:[(0,A.jsx)(`span`,{className:`det-barra-btn__icono`,children:`☰`}),` Detalles`]})]})]})]})]})}function ir(){return(0,x.useEffect)(()=>{(function(){var e=document.getElementById(`modalReasignarBackdrop`),t=document.getElementById(`modalCerrarBtn`),n=document.getElementById(`modalCancelarBtn`),r=document.getElementById(`modalConfirmarBtn`),i=document.querySelectorAll(`.modal-rep`),a=document.getElementById(`modalBuscarInput`),o=document.getElementById(`modalGuia`),s=document.getElementById(`modalCliente`),c=document.getElementById(`modalDir`),l=null;document.querySelectorAll(`.ent-accion-btn--reasignar`).forEach(function(e){e.addEventListener(`click`,function(){var t=e.closest(`tr`);if(t){var n=t.querySelector(`.td-guia`),r=t.querySelector(`.td-cliente`),i=t.querySelector(`.td-dir`);n&&(o.textContent=n.textContent.trim().split(`
`)[0]),r&&(s.textContent=r.textContent),i&&(c.textContent=i.textContent)}u()})}),document.querySelector(`.ent-bar-btn--reasignar`).addEventListener(`click`,function(){o.textContent=`—`,s.textContent=`Seleccione desde la tabla`,c.textContent=``,u()});function u(){l=null,i.forEach(function(e){e.classList.remove(`modal-rep--selected`)}),r.disabled=!0,document.getElementById(`modalMotivo`).value=``,a.value=``,f(``),e.classList.add(`modal-reasignar-backdrop--visible`)}function d(){e.classList.remove(`modal-reasignar-backdrop--visible`)}t.addEventListener(`click`,d),n.addEventListener(`click`,d),e.addEventListener(`click`,function(t){t.target===e&&d()}),i.forEach(function(e){e.addEventListener(`click`,function(){i.forEach(function(e){e.classList.remove(`modal-rep--selected`)}),e.classList.add(`modal-rep--selected`),l=e.getAttribute(`data-rep`),r.disabled=!1})}),a.addEventListener(`input`,function(){f(a.value.toLowerCase())});function f(e){i.forEach(function(t){var n=t.querySelector(`.modal-rep__nombre`).textContent.toLowerCase(),r=t.querySelector(`.modal-rep__zona`).textContent.toLowerCase();t.style.display=n.indexOf(e)!==-1||r.indexOf(e)!==-1?``:`none`})}r.addEventListener(`click`,function(){if(l){var e=document.querySelector(`.modal-rep--selected .modal-rep__nombre`).textContent;alert(`Paquete reasignado exitosamente a `+e),d()}})})()},[]),(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(`style`,{children:`
    /* ── Entregas del Repartidor ── */
    .ent-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 20px 0 18px;
    }
    .ent-header__titulo {
      font-size: 26px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0;
    }
    .ent-header__volver {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 18px;
      border-radius: 10px;
      border: 1px solid #d0d8e8;
      background: rgba(255,255,255,0.85);
      font-size: 14px;
      font-weight: 600;
      color: #3b5585;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.2s;
    }
    .ent-header__volver:hover { background: #fff; }

    /* Info del repartidor */
    .ent-driver {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 20px 24px;
      background: rgba(220,230,250,0.4);
      border: 1px solid rgba(200,215,240,0.45);
      border-radius: 16px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }
    .ent-driver__foto {
      width: 72px;
      height: 72px;
      border-radius: 14px;
      object-fit: cover;
      border: 2px solid rgba(200,215,240,0.5);
    }
    .ent-driver__info {
      flex: 1;
      min-width: 170px;
    }
    .ent-driver__nombre {
      font-size: 20px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0 0 4px;
    }
    .ent-driver__zona-text {
      font-size: 14px;
      color: #5a6d8a;
      margin: 0 0 8px;
    }
    .ent-driver__badges {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .ent-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 5px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      color: #fff;
    }
    .ent-badge--zona { background: #3b6aaa; }
    .ent-badge--vehiculo { background: #4a6fa5; }

    /* Tarjetas resumen */
    .ent-resumen {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
      align-items: stretch;
    }
    .ent-stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 14px 22px;
      border-radius: 12px;
      border: 1.5px solid rgba(200,215,240,0.5);
      background: rgba(255,255,255,0.75);
      min-width: 110px;
      text-align: center;
    }
    .ent-stat__numero {
      font-size: 28px;
      font-weight: 800;
      margin: 0;
    }
    .ent-stat__numero--azul { color: #3b6aaa; }
    .ent-stat__numero--verde { color: #43a047; }
    .ent-stat__numero--naranja { color: #f5a623; }
    .ent-stat__numero--rojo { color: #e53935; }
    .ent-stat__label {
      font-size: 13px;
      color: #5a6d8a;
      font-weight: 600;
      margin: 2px 0 0;
    }

    /* Estado repartidor */
    .ent-estado-row {
      padding: 12px 24px 0;
      font-size: 15px;
      color: #1a2d50;
    }
    .ent-estado-row strong {
      color: #1a2d50;
    }
    .ent-estado-valor {
      font-weight: 700;
      color: #43a047;
    }
    .ent-estado-valor::before {
      content: "";
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #43a047;
      margin-right: 6px;
    }

    /* Tabla de entregas */
    .ent-seccion {
      margin-top: 22px;
    }
    .ent-seccion__titulo {
      font-size: 18px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0 0 14px;
    }
    .ent-tabla-wrap {
      background: rgba(230,237,250,0.4);
      border: 1px solid rgba(200,215,240,0.45);
      border-radius: 14px;
      overflow: hidden;
    }
    .ent-tabla {
      width: 100%;
      border-collapse: collapse;
    }
    .ent-tabla thead th {
      text-align: left;
      font-size: 13px;
      font-weight: 600;
      color: #8899b4;
      padding: 14px 16px 10px;
      border-bottom: 1.5px solid #e4eaf4;
      background: rgba(240,244,255,0.5);
    }
    .ent-tabla tbody tr {
      transition: background 0.15s;
    }
    .ent-tabla tbody tr:hover {
      background: rgba(255,255,255,0.5);
    }
    .ent-tabla tbody td {
      font-size: 14px;
      color: #2b3552;
      padding: 14px 16px;
      border-bottom: 1px solid rgba(200,215,240,0.3);
      vertical-align: middle;
    }
    .ent-tabla tbody tr:last-child td {
      border-bottom: none;
    }
    .ent-tabla .td-guia {
      font-size: 13px;
      font-weight: 600;
      color: #5a6d8a;
      font-family: monospace;
    }
    .ent-tabla .td-cliente {
      font-weight: 700;
      color: #1a2d50;
    }
    .ent-tabla .td-cliente-sub {
      font-size: 12px;
      color: #8899b4;
      font-weight: 400;
    }
    .ent-tabla .td-dir {
      color: #3b5585;
      max-width: 200px;
    }
    .ent-tabla .td-hora {
      white-space: nowrap;
    }

    /* Badges estado */
    .ent-estado-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 16px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 700;
      color: #fff;
      white-space: nowrap;
    }
    .ent-estado-badge--pendiente { background: #f5a623; }
    .ent-estado-badge--enruta { background: #43a047; }
    .ent-estado-badge--retrasado { background: #e53935; }
    .ent-estado-badge--completada { background: #3b6aaa; }
    .ent-estado-badge__icono { font-size: 14px; }

    /* Botón acción en tabla */
    .ent-accion-btn {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 6px 14px;
      border-radius: 8px;
      border: 1px solid #d0d8e8;
      background: rgba(255,255,255,0.8);
      font-size: 13px;
      font-weight: 600;
      color: #3b5585;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.2s;
    }
    .ent-accion-btn:hover { background: #fff; }
    .ent-accion-btn--reasignar {
      border-color: #f5a623;
      color: #e68a00;
    }
    .ent-accion-btn--reasignar:hover { background: #fff8ec; }
    .ent-accion-btn__icono { font-size: 15px; }

    /* Paginación interna */
    .ent-paginacion {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      flex-wrap: wrap;
      gap: 10px;
      border-top: 1px solid rgba(200,215,240,0.3);
    }
    .ent-paginacion__info {
      font-size: 13px;
      color: #5a6d8a;
    }
    .ent-paginacion__paginas {
      display: flex;
      align-items: center;
      gap: 3px;
    }
    .ent-pag-btn {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      border: 1px solid #d0d8e8;
      background: #fff;
      font-size: 13px;
      font-weight: 600;
      color: #3b5585;
      cursor: pointer;
      transition: background 0.2s;
    }
    .ent-pag-btn:hover { background: #e8f0fb; }
    .ent-pag-btn--activo {
      background: #3b6aaa;
      color: #fff;
      border-color: #3b6aaa;
    }

    /* Barra de acciones inferior */
    .ent-acciones-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 22px;
      padding-bottom: 24px;
      flex-wrap: wrap;
    }
    .ent-bar-btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 10px 22px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      border: none;
      transition: opacity 0.2s, background 0.2s;
      text-decoration: none;
    }
    .ent-bar-btn:hover { opacity: 0.88; }
    .ent-bar-btn--volver {
      background: #3b6aaa;
      color: #fff;
    }
    .ent-bar-btn--reasignar {
      background: rgba(255,255,255,0.85);
      color: #3b5585;
      border: 1px solid #d0d8e8;
    }
    .ent-bar-btn--reasignar:hover { background: #fff; }
    .ent-bar-btn--contactar {
      background: #43a047;
      color: #fff;
    }
    .ent-bar-btn--incidencia {
      background: #e53935;
      color: #fff;
    }
    .ent-bar-btn__icono { font-size: 16px; }

    /* ── Modal Reasignar ── */
    .modal-reasignar-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(20,30,55,0.55);
      z-index: 1000;
      backdrop-filter: blur(3px);
    }
    .modal-reasignar-backdrop--visible { display: flex; align-items: center; justify-content: center; }

    .modal-reasignar {
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 12px 48px rgba(20,30,55,0.25);
      width: 520px;
      max-width: 94vw;
      max-height: 90vh;
      overflow-y: auto;
      animation: modalIn 0.25s ease;
    }
    @keyframes modalIn {
      from { opacity: 0; transform: translateY(24px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    .modal-reasignar__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 24px 14px;
      border-bottom: 1.5px solid #e4eaf4;
    }
    .modal-reasignar__titulo {
      font-size: 20px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0;
    }
    .modal-reasignar__cerrar {
      width: 34px; height: 34px;
      border-radius: 8px;
      border: 1px solid #d0d8e8;
      background: rgba(255,255,255,0.8);
      font-size: 20px;
      color: #5a6d8a;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s;
    }
    .modal-reasignar__cerrar:hover { background: #f0f4fb; }

    /* Info del paquete en el modal */
    .modal-paq {
      padding: 18px 24px;
      background: rgba(230,237,250,0.35);
      border-bottom: 1px solid #e4eaf4;
    }
    .modal-paq__label {
      font-size: 12px;
      font-weight: 600;
      color: #8899b4;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0 0 8px;
    }
    .modal-paq__row {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
    }
    .modal-paq__guia {
      font-size: 14px;
      font-weight: 700;
      color: #3b6aaa;
      font-family: monospace;
    }
    .modal-paq__cliente {
      font-size: 15px;
      font-weight: 700;
      color: #1a2d50;
    }
    .modal-paq__dir {
      font-size: 13px;
      color: #5a6d8a;
    }
    .modal-paq__estado {
      margin-left: auto;
    }

    /* Selección de repartidor */
    .modal-seleccion {
      padding: 18px 24px;
    }
    .modal-seleccion__titulo {
      font-size: 15px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0 0 12px;
    }
    .modal-buscar {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(240,244,255,0.6);
      border: 1px solid #d0d8e8;
      border-radius: 10px;
      padding: 10px 14px;
      margin-bottom: 14px;
    }
    .modal-buscar__icono { color: #8899b4; font-size: 16px; }
    .modal-buscar input {
      border: none; background: transparent; outline: none;
      font-size: 14px; color: #2b3552; width: 100%;
    }
    .modal-buscar input::placeholder { color: #9aa8c0; }

    /* Lista de repartidores disponibles */
    .modal-repartidores {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 220px;
      overflow-y: auto;
    }
    .modal-rep {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      border-radius: 10px;
      border: 2px solid transparent;
      background: rgba(240,244,255,0.4);
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s;
    }
    .modal-rep:hover { background: rgba(230,237,250,0.7); }
    .modal-rep--selected {
      border-color: #3b6aaa;
      background: rgba(59,106,170,0.08);
    }
    .modal-rep__foto {
      width: 42px; height: 42px;
      border-radius: 10px;
      object-fit: cover;
      border: 1.5px solid rgba(200,215,240,0.5);
    }
    .modal-rep__info { flex: 1; }
    .modal-rep__nombre {
      font-size: 14px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0 0 2px;
    }
    .modal-rep__zona {
      font-size: 12px;
      color: #5a6d8a;
      margin: 0;
    }
    .modal-rep__estado {
      font-size: 12px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 12px;
      white-space: nowrap;
    }
    .modal-rep__estado--disponible {
      background: rgba(67,160,71,0.12);
      color: #43a047;
    }
    .modal-rep__estado--enruta {
      background: rgba(59,106,170,0.12);
      color: #3b6aaa;
    }
    .modal-rep__radio {
      width: 20px; height: 20px;
      border-radius: 50%;
      border: 2px solid #d0d8e8;
      display: flex; align-items: center; justify-content: center;
      transition: border-color 0.15s;
    }
    .modal-rep--selected .modal-rep__radio {
      border-color: #3b6aaa;
    }
    .modal-rep--selected .modal-rep__radio::after {
      content: '';
      width: 10px; height: 10px;
      border-radius: 50%;
      background: #3b6aaa;
    }

    /* Motivo */
    .modal-motivo {
      padding: 14px 24px 0;
    }
    .modal-motivo__label {
      font-size: 13px;
      font-weight: 600;
      color: #1a2d50;
      margin: 0 0 6px;
    }
    .modal-motivo__textarea {
      width: 100%;
      min-height: 60px;
      border-radius: 10px;
      border: 1px solid #d0d8e8;
      background: rgba(240,244,255,0.5);
      padding: 10px 14px;
      font-size: 14px;
      color: #2b3552;
      resize: vertical;
      outline: none;
      font-family: inherit;
    }
    .modal-motivo__textarea:focus { border-color: #3b6aaa; }

    /* Botones del modal */
    .modal-acciones {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      padding: 18px 24px 20px;
    }
    .modal-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 24px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      border: none;
      transition: opacity 0.2s, background 0.2s;
    }
    .modal-btn:hover { opacity: 0.88; }
    .modal-btn--cancelar {
      background: rgba(255,255,255,0.85);
      color: #5a6d8a;
      border: 1px solid #d0d8e8;
    }
    .modal-btn--cancelar:hover { background: #fff; }
    .modal-btn--confirmar {
      background: #3b6aaa;
      color: #fff;
    }
    .modal-btn--confirmar:disabled {
      background: #b0c4de;
      cursor: not-allowed;
      opacity: 0.7;
    }

    /* Responsive */
    @media (max-width: 860px) {
      .ent-driver { flex-direction: column; align-items: flex-start; }
      .ent-resumen { justify-content: center; }
      .ent-tabla-wrap { overflow-x: auto; }
      .ent-tabla { min-width: 700px; }
    }
    @media (max-width: 600px) {
      .ent-header { flex-direction: column; align-items: flex-start; gap: 10px; }
      .ent-acciones-bar { flex-direction: column; align-items: stretch; }
      .ent-bar-btn { justify-content: center; }
      .ent-resumen { flex-direction: column; }
      .ent-stat { min-width: auto; }
    }
  `}),(0,A.jsxs)(`div`,{className:`tablero-operador tablero-operador--sin-sidebar`,children:[(0,A.jsx)(`div`,{id:`menuContainer`,className:`menu-overlay`}),(0,A.jsx)(`div`,{id:`menuBackdrop`,className:`menu-overlay__backdrop`}),(0,A.jsxs)(`main`,{className:`panel-principal panel-principal--full`,children:[(0,A.jsxs)(`header`,{className:`barra-superior barra-superior--con-logo`,children:[(0,A.jsxs)(`div`,{className:`barra-superior__left`,children:[(0,A.jsx)(`button`,{id:`btnMenu`,className:`btn-menu-hamburguesa`,"aria-label":`Abrir menú`,children:(0,A.jsxs)(`svg`,{width:`26`,height:`26`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,children:[(0,A.jsx)(`line`,{x1:`3`,y1:`6`,x2:`21`,y2:`6`}),(0,A.jsx)(`line`,{x1:`3`,y1:`12`,x2:`21`,y2:`12`}),(0,A.jsx)(`line`,{x1:`3`,y1:`18`,x2:`21`,y2:`18`})]})}),(0,A.jsx)(`div`,{className:`header-logo`,children:(0,A.jsx)(`img`,{src:`/piWeb/images/logoSinFondo.png`,alt:`Metzvia`})}),(0,A.jsx)(`h1`,{className:`barra-superior__titulo`,children:`Supervisor`})]}),(0,A.jsxs)(`div`,{className:`barra-superior__perfil`,children:[(0,A.jsxs)(`span`,{className:`badge-servicio`,children:[(0,A.jsx)(`span`,{className:`header-sv__punto-verde`}),` En servicio`]}),(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Supervisor`,className:`barra-superior__avatar`}),(0,A.jsx)(`span`,{className:`barra-superior__chevron`,children:`▾`})]})]}),(0,A.jsxs)(`div`,{className:`ent-header`,children:[(0,A.jsx)(`h2`,{className:`ent-header__titulo`,children:`Entregas del Repartidor`}),(0,A.jsx)(`a`,{href:`/piWeb/src/pages/supervisor/gestRepartidorSupervisor.html`,className:`ent-header__volver`,children:`‹ Volver`})]}),(0,A.jsxs)(`div`,{className:`ent-driver`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Luis García`,className:`ent-driver__foto`}),(0,A.jsxs)(`div`,{className:`ent-driver__info`,children:[(0,A.jsx)(`p`,{className:`ent-driver__nombre`,children:`Luis García`}),(0,A.jsx)(`p`,{className:`ent-driver__zona-text`,children:`Centro`}),(0,A.jsxs)(`div`,{className:`ent-driver__badges`,children:[(0,A.jsx)(`span`,{className:`ent-badge ent-badge--zona`,children:`Centro`}),(0,A.jsx)(`span`,{className:`ent-badge ent-badge--vehiculo`,children:`Nissan NV200`})]})]}),(0,A.jsxs)(`div`,{className:`ent-resumen`,children:[(0,A.jsxs)(`div`,{className:`ent-stat`,children:[(0,A.jsx)(`p`,{className:`ent-stat__numero ent-stat__numero--azul`,children:`13`}),(0,A.jsxs)(`p`,{className:`ent-stat__label`,children:[`Entregas`,(0,A.jsx)(`br`,{}),`asignadas`]})]}),(0,A.jsxs)(`div`,{className:`ent-stat`,children:[(0,A.jsx)(`p`,{className:`ent-stat__numero ent-stat__numero--verde`,children:`8`}),(0,A.jsxs)(`p`,{className:`ent-stat__label`,children:[`Entregas`,(0,A.jsx)(`br`,{}),`completadas`]})]}),(0,A.jsxs)(`div`,{className:`ent-stat`,children:[(0,A.jsx)(`p`,{className:`ent-stat__numero ent-stat__numero--naranja`,children:`4`}),(0,A.jsx)(`p`,{className:`ent-stat__label`,children:`Pendientes`})]}),(0,A.jsxs)(`div`,{className:`ent-stat`,children:[(0,A.jsx)(`p`,{className:`ent-stat__numero ent-stat__numero--rojo`,children:`1`}),(0,A.jsx)(`p`,{className:`ent-stat__label`,children:`Retrasadas`})]})]})]}),(0,A.jsxs)(`p`,{className:`ent-estado-row`,children:[(0,A.jsx)(`strong`,{children:`Estado`}),`\xA0\xA0`,(0,A.jsx)(`span`,{className:`ent-estado-valor`,children:`En ruta`})]}),(0,A.jsxs)(`div`,{className:`ent-seccion`,children:[(0,A.jsx)(`h3`,{className:`ent-seccion__titulo`,children:`Entregas Asignadas a Luis García`}),(0,A.jsxs)(`div`,{className:`ent-tabla-wrap`,children:[(0,A.jsxs)(`table`,{className:`ent-tabla`,children:[(0,A.jsx)(`thead`,{children:(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`th`,{children:`Guía`}),(0,A.jsx)(`th`,{children:`Cliente`}),(0,A.jsx)(`th`,{children:`Dirección`}),(0,A.jsx)(`th`,{children:`Hora estimada`}),(0,A.jsx)(`th`,{children:`Estado`}),(0,A.jsx)(`th`,{})]})}),(0,A.jsxs)(`tbody`,{children:[(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`td-guia`,children:`PAK123456789`}),(0,A.jsx)(`td`,{className:`td-cliente`,children:`Ana Martínez`}),(0,A.jsx)(`td`,{className:`td-dir`,children:`Roma Norte`}),(0,A.jsx)(`td`,{className:`td-hora`,children:`10:00 – 11:00`}),(0,A.jsx)(`td`,{children:(0,A.jsxs)(`span`,{className:`ent-estado-badge ent-estado-badge--pendiente`,children:[(0,A.jsx)(`span`,{className:`ent-estado-badge__icono`,children:`◀`}),` Pendiente`]})}),(0,A.jsx)(`td`,{children:(0,A.jsxs)(`button`,{className:`ent-accion-btn`,children:[(0,A.jsx)(`span`,{className:`ent-accion-btn__icono`,children:`📄`}),` Ver detalle`]})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`td-guia`,children:`MX267584321`}),(0,A.jsx)(`td`,{className:`td-cliente`,children:`Carlos Ramírez`}),(0,A.jsx)(`td`,{className:`td-dir`,children:`Av. Tecnológico 210`}),(0,A.jsx)(`td`,{className:`td-hora`,children:`12:00 – 1:00`}),(0,A.jsx)(`td`,{children:(0,A.jsxs)(`span`,{className:`ent-estado-badge ent-estado-badge--enruta`,children:[(0,A.jsx)(`span`,{className:`ent-estado-badge__icono`,children:`✔`}),` En ruta`]})}),(0,A.jsx)(`td`,{children:(0,A.jsxs)(`button`,{className:`ent-accion-btn`,children:[(0,A.jsx)(`span`,{className:`ent-accion-btn__icono`,children:`📄`}),` Ver detalle`]})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`td-guia`,children:`MX987654321`}),(0,A.jsx)(`td`,{className:`td-cliente`,children:`Laura Gómez`}),(0,A.jsx)(`td`,{className:`td-dir`,children:`Av. Revolución 456, Col. Del Valle`}),(0,A.jsx)(`td`,{className:`td-hora`,children:`1:00 – 3:00 PM`}),(0,A.jsx)(`td`,{children:(0,A.jsxs)(`span`,{className:`ent-estado-badge ent-estado-badge--retrasado`,children:[(0,A.jsx)(`span`,{className:`ent-estado-badge__icono`,children:`▲`}),` Retrasado`]})}),(0,A.jsx)(`td`,{children:(0,A.jsxs)(`button`,{className:`ent-accion-btn ent-accion-btn--reasignar`,children:[(0,A.jsx)(`span`,{className:`ent-accion-btn__icono`,children:`📄`}),` Reasignar`]})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsxs)(`td`,{className:`td-guia`,children:[`MX247630219`,(0,A.jsx)(`br`,{}),(0,A.jsx)(`span`,{className:`td-cliente-sub`,children:`PAK123466789`})]}),(0,A.jsx)(`td`,{className:`td-cliente`,children:`Jorge Sánchez`}),(0,A.jsx)(`td`,{className:`td-dir`,children:`Av. Universidad 789, Col. Coyoacán`}),(0,A.jsx)(`td`,{className:`td-hora`,children:`2:00 – 3:30 PM`}),(0,A.jsx)(`td`,{children:(0,A.jsxs)(`span`,{className:`ent-estado-badge ent-estado-badge--pendiente`,children:[(0,A.jsx)(`span`,{className:`ent-estado-badge__icono`,children:`◀`}),` Pendiente`]})}),(0,A.jsx)(`td`,{children:(0,A.jsxs)(`button`,{className:`ent-accion-btn`,children:[(0,A.jsx)(`span`,{className:`ent-accion-btn__icono`,children:`📄`}),` Ver detalle`]})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`td-guia`,children:`MX2476502010`}),(0,A.jsx)(`td`,{className:`td-cliente`,children:`Pilar Suárez`}),(0,A.jsx)(`td`,{className:`td-dir`,children:`Campestre Oriente 230, Toluca`}),(0,A.jsx)(`td`,{className:`td-hora`,children:`3:00 – 4:30 PM`}),(0,A.jsx)(`td`,{children:(0,A.jsxs)(`span`,{className:`ent-estado-badge ent-estado-badge--pendiente`,children:[(0,A.jsx)(`span`,{className:`ent-estado-badge__icono`,children:`◀`}),` Pendiente`]})}),(0,A.jsx)(`td`,{children:(0,A.jsxs)(`button`,{className:`ent-accion-btn`,children:[(0,A.jsx)(`span`,{className:`ent-accion-btn__icono`,children:`📄`}),` Ver detalle`]})})]})]})]}),(0,A.jsxs)(`div`,{className:`ent-paginacion`,children:[(0,A.jsx)(`span`,{className:`ent-paginacion__info`,children:`Mostrando 5 de 13 entregas`}),(0,A.jsxs)(`div`,{className:`ent-paginacion__paginas`,children:[(0,A.jsx)(`button`,{className:`ent-pag-btn ent-pag-btn--activo`,children:`1`}),(0,A.jsx)(`button`,{className:`ent-pag-btn`,children:`2`}),(0,A.jsx)(`button`,{className:`ent-pag-btn`,children:`3`}),(0,A.jsx)(`button`,{className:`ent-pag-btn`,children:`4`}),(0,A.jsx)(`button`,{className:`ent-pag-btn`,children:`5`}),(0,A.jsx)(`button`,{className:`ent-pag-btn`,children:`··`})]})]})]})]}),(0,A.jsxs)(`div`,{className:`ent-acciones-bar`,children:[(0,A.jsx)(`a`,{href:`/piWeb/src/pages/supervisor/gestRepartidorSupervisor.html`,className:`ent-bar-btn ent-bar-btn--volver`,children:`‹ Volver`}),(0,A.jsxs)(`button`,{className:`ent-bar-btn ent-bar-btn--reasignar`,children:[(0,A.jsx)(`span`,{className:`ent-bar-btn__icono`,children:`📦`}),` Reasignar paquete`]}),(0,A.jsxs)(`button`,{className:`ent-bar-btn ent-bar-btn--contactar`,children:[(0,A.jsx)(`span`,{className:`ent-bar-btn__icono`,children:`📞`}),` Contactar repartidor`]}),(0,A.jsxs)(`button`,{className:`ent-bar-btn ent-bar-btn--incidencia`,children:[(0,A.jsx)(`span`,{className:`ent-bar-btn__icono`,children:`⚠`}),` Marcar incidencia`]})]})]})]}),(0,A.jsx)(`div`,{id:`modalReasignarBackdrop`,className:`modal-reasignar-backdrop`,children:(0,A.jsxs)(`div`,{className:`modal-reasignar`,children:[(0,A.jsxs)(`div`,{className:`modal-reasignar__header`,children:[(0,A.jsx)(`h3`,{className:`modal-reasignar__titulo`,children:`Reasignar Paquete`}),(0,A.jsx)(`button`,{id:`modalCerrarBtn`,className:`modal-reasignar__cerrar`,"aria-label":`Cerrar`,children:`×`})]}),(0,A.jsxs)(`div`,{className:`modal-paq`,children:[(0,A.jsx)(`p`,{className:`modal-paq__label`,children:`Paquete a reasignar`}),(0,A.jsxs)(`div`,{className:`modal-paq__row`,children:[(0,A.jsx)(`span`,{id:`modalGuia`,className:`modal-paq__guia`,children:`MX987654321`}),(0,A.jsx)(`span`,{id:`modalCliente`,className:`modal-paq__cliente`,children:`Laura Gómez`}),(0,A.jsx)(`span`,{id:`modalDir`,className:`modal-paq__dir`,children:`Av. Revolución 456, Col. Del Valle`}),(0,A.jsx)(`span`,{className:`modal-paq__estado`,children:(0,A.jsxs)(`span`,{id:`modalEstado`,className:`ent-estado-badge ent-estado-badge--retrasado`,children:[(0,A.jsx)(`span`,{className:`ent-estado-badge__icono`,children:`▲`}),` Retrasado`]})})]})]}),(0,A.jsxs)(`div`,{className:`modal-seleccion`,children:[(0,A.jsx)(`p`,{className:`modal-seleccion__titulo`,children:`Seleccionar nuevo repartidor`}),(0,A.jsxs)(`div`,{className:`modal-buscar`,children:[(0,A.jsx)(`span`,{className:`modal-buscar__icono`,children:`🔍`}),(0,A.jsx)(`input`,{type:`text`,id:`modalBuscarInput`,placeholder:`Buscar repartidor...`})]}),(0,A.jsxs)(`div`,{className:`modal-repartidores`,id:`modalRepLista`,children:[(0,A.jsxs)(`div`,{className:`modal-rep`,"data-rep":`javier`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Javier Torres`,className:`modal-rep__foto`}),(0,A.jsxs)(`div`,{className:`modal-rep__info`,children:[(0,A.jsx)(`p`,{className:`modal-rep__nombre`,children:`Javier Torres`}),(0,A.jsx)(`p`,{className:`modal-rep__zona`,children:`Roma Norte · 3 entregas asignadas`})]}),(0,A.jsx)(`span`,{className:`modal-rep__estado modal-rep__estado--disponible`,children:`Disponible`}),(0,A.jsx)(`span`,{className:`modal-rep__radio`})]}),(0,A.jsxs)(`div`,{className:`modal-rep`,"data-rep":`ricardo`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Ricardo Muñoz`,className:`modal-rep__foto`}),(0,A.jsxs)(`div`,{className:`modal-rep__info`,children:[(0,A.jsx)(`p`,{className:`modal-rep__nombre`,children:`Ricardo Muñoz`}),(0,A.jsx)(`p`,{className:`modal-rep__zona`,children:`Del Valle · 5 entregas asignadas`})]}),(0,A.jsx)(`span`,{className:`modal-rep__estado modal-rep__estado--enruta`,children:`En ruta`}),(0,A.jsx)(`span`,{className:`modal-rep__radio`})]}),(0,A.jsxs)(`div`,{className:`modal-rep`,"data-rep":`pedro`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Pedro Sánchez`,className:`modal-rep__foto`}),(0,A.jsxs)(`div`,{className:`modal-rep__info`,children:[(0,A.jsx)(`p`,{className:`modal-rep__nombre`,children:`Pedro Sánchez`}),(0,A.jsx)(`p`,{className:`modal-rep__zona`,children:`Coyoacán · 4 entregas asignadas`})]}),(0,A.jsx)(`span`,{className:`modal-rep__estado modal-rep__estado--enruta`,children:`En ruta`}),(0,A.jsx)(`span`,{className:`modal-rep__radio`})]}),(0,A.jsxs)(`div`,{className:`modal-rep`,"data-rep":`sofia`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Sofía Lozano`,className:`modal-rep__foto`}),(0,A.jsxs)(`div`,{className:`modal-rep__info`,children:[(0,A.jsx)(`p`,{className:`modal-rep__nombre`,children:`Sofía Lozano`}),(0,A.jsx)(`p`,{className:`modal-rep__zona`,children:`Toluca · 0 entregas asignadas`})]}),(0,A.jsx)(`span`,{className:`modal-rep__estado modal-rep__estado--disponible`,children:`Disponible`}),(0,A.jsx)(`span`,{className:`modal-rep__radio`})]})]})]}),(0,A.jsxs)(`div`,{className:`modal-motivo`,children:[(0,A.jsx)(`p`,{className:`modal-motivo__label`,children:`Motivo de la reasignación (opcional)`}),(0,A.jsx)(`textarea`,{className:`modal-motivo__textarea`,id:`modalMotivo`,placeholder:`Ej: Repartidor actual tiene retraso en zona...`})]}),(0,A.jsxs)(`div`,{className:`modal-acciones`,children:[(0,A.jsx)(`button`,{id:`modalCancelarBtn`,className:`modal-btn modal-btn--cancelar`,children:`Cancelar`}),(0,A.jsx)(`button`,{id:`modalConfirmarBtn`,className:`modal-btn modal-btn--confirmar`,disabled:!0,children:`Confirmar reasignación`})]})]})})]})}function ar(){return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(`style`,{children:`
    /* ── Gestión de Envíos ── */
    .genv-titulo {
      font-size: 26px;
      font-weight: 700;
      color: #1a2d50;
      margin: 24px 0 18px;
    }

    /* Barra de búsqueda y filtros */
    .genv-barra {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 12px;
    }
    .genv-buscar {
      flex: 1;
      min-width: 240px;
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,0.7);
      border: 1px solid #d0d8e8;
      border-radius: 10px;
      padding: 10px 14px;
    }
    .genv-buscar__icono {
      color: #8899b4;
      font-size: 18px;
    }
    .genv-buscar input {
      border: none;
      background: transparent;
      outline: none;
      font-size: 14px;
      color: #2b3552;
      width: 100%;
    }
    .genv-buscar input::placeholder { color: #9aa8c0; }

    /* Chips de estado */
    .genv-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 18px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      color: #fff;
      transition: opacity 0.2s;
    }
    .genv-chip:hover { opacity: 0.85; }
    .genv-chip--todos {
      background: #3b6aaa;
    }
    .genv-chip--pendiente {
      background: #f5a623;
    }
    .genv-chip--retrasado {
      background: #e53935;
    }
    .genv-chip--entregado {
      background: #43a047;
    }
    .genv-chip__flecha { font-size: 11px; }

    .genv-filtro-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 10px;
      border: 1px solid #d0d8e8;
      background: rgba(255,255,255,0.7);
      font-size: 14px;
      font-weight: 600;
      color: #3b5585;
      cursor: pointer;
      margin-left: auto;
    }
    .genv-filtro-btn:hover { background: #fff; }

    /* Ordenar por */
    .genv-ordenar {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
      color: #5a6d8a;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }
    .genv-ordenar span { font-weight: 600; color: #1a2d50; }
    .genv-ordenar select {
      border: none;
      background: transparent;
      font-size: 14px;
      color: #3b5585;
      font-weight: 600;
      cursor: pointer;
      outline: none;
    }
    .genv-ordenar__dots {
      margin-left: auto;
      font-size: 22px;
      color: #8899b4;
      cursor: pointer;
      letter-spacing: 2px;
    }

    /* Tabla */
    .genv-tabla-wrap {
      background: rgba(230,237,250,0.45);
      border-radius: 14px;
      overflow-x: auto;
      border: 1px solid rgba(200,215,240,0.4);
    }
    .genv-tabla {
      width: 100%;
      border-collapse: collapse;
      min-width: 820px;
    }
    .genv-tabla thead th {
      text-align: left;
      padding: 14px 16px;
      font-size: 13px;
      font-weight: 700;
      color: #3b5585;
      border-bottom: 2px solid rgba(180,200,230,0.4);
    }
    .genv-tabla tbody tr {
      border-bottom: 1px solid rgba(200,215,240,0.35);
      transition: background 0.15s;
    }
    .genv-tabla tbody tr:hover {
      background: rgba(220,232,250,0.35);
    }
    .genv-tabla tbody td {
      padding: 14px 16px;
      font-size: 14px;
      color: #2b3552;
      vertical-align: top;
    }
    .genv-guia {
      font-weight: 600;
      color: #1a2d50;
      font-size: 13px;
      letter-spacing: 0.3px;
    }
    .genv-cliente {
      font-weight: 700;
      color: #1a2d50;
    }
    .genv-direccion {
      font-size: 13px;
      color: #5a6d8a;
    }
    .genv-direccion::before {
      content: '● ';
      color: #43a047;
      font-size: 10px;
    }
    .genv-sub {
      font-size: 12px;
      color: #8899b4;
    }
    .genv-hora {
      font-weight: 600;
      color: #2b3552;
    }
    .genv-repartidor {
      color: #2b3552;
      font-weight: 500;
    }

    /* Badges de estado */
    .genv-estado {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 5px 14px;
      border-radius: 16px;
      font-size: 13px;
      font-weight: 700;
      white-space: nowrap;
    }
    .genv-estado--pendiente {
      background: #fff3e0;
      color: #e68a00;
    }
    .genv-estado--enruta {
      background: #e0f2f1;
      color: #00897b;
    }
    .genv-estado--retrasado {
      background: #fbe9e7;
      color: #e53935;
    }
    .genv-estado--entregado {
      background: #e8f5e9;
      color: #2e7d32;
    }

    .genv-ver-btn {
      padding: 5px 14px;
      border-radius: 6px;
      border: 1px solid #d0d8e8;
      background: rgba(255,255,255,0.7);
      font-size: 13px;
      color: #3b5585;
      cursor: pointer;
      transition: background 0.2s;
      text-decoration: none;
      display: inline-block;
    }
    .genv-ver-btn:hover { background: #fff; }

    /* Paginación */
    .genv-paginacion {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0;
      flex-wrap: wrap;
      gap: 12px;
    }
    .genv-paginacion__info {
      font-size: 14px;
      color: #5a6d8a;
    }
    .genv-paginacion__paginas {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .genv-pag-btn {
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      border: 1px solid #d0d8e8;
      background: #fff;
      font-size: 14px;
      font-weight: 600;
      color: #3b5585;
      cursor: pointer;
      transition: background 0.2s;
    }
    .genv-pag-btn:hover { background: #e8f0fb; }
    .genv-pag-btn--activo {
      background: #3b6aaa;
      color: #fff;
      border-color: #3b6aaa;
    }
    .genv-pag-btn--dots {
      border: none;
      background: none;
      cursor: default;
    }

    @media (max-width: 768px) {
      .genv-barra { flex-direction: column; align-items: stretch; }
      .genv-buscar { min-width: auto; }
      .genv-filtro-btn { margin-left: 0; }
      .genv-paginacion { flex-direction: column; align-items: flex-start; }
    }
  `}),(0,A.jsxs)(`div`,{className:`tablero-operador tablero-operador--sin-sidebar`,children:[(0,A.jsx)(`div`,{id:`menuContainer`,className:`menu-overlay`}),(0,A.jsx)(`div`,{id:`menuBackdrop`,className:`menu-overlay__backdrop`}),(0,A.jsxs)(`main`,{className:`panel-principal panel-principal--full`,children:[(0,A.jsxs)(`header`,{className:`barra-superior barra-superior--con-logo`,children:[(0,A.jsxs)(`div`,{className:`barra-superior__left`,children:[(0,A.jsx)(`button`,{id:`btnMenu`,className:`btn-menu-hamburguesa`,"aria-label":`Abrir menú`,children:(0,A.jsxs)(`svg`,{width:`26`,height:`26`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,children:[(0,A.jsx)(`line`,{x1:`3`,y1:`6`,x2:`21`,y2:`6`}),(0,A.jsx)(`line`,{x1:`3`,y1:`12`,x2:`21`,y2:`12`}),(0,A.jsx)(`line`,{x1:`3`,y1:`18`,x2:`21`,y2:`18`})]})}),(0,A.jsx)(`div`,{className:`header-logo`,children:(0,A.jsx)(`img`,{src:`/piWeb/images/logoSinFondo.png`,alt:`Metzvia`})}),(0,A.jsx)(`h1`,{className:`barra-superior__titulo`,children:`Supervisor`})]}),(0,A.jsxs)(`div`,{className:`barra-superior__perfil`,children:[(0,A.jsxs)(`span`,{className:`badge-servicio`,children:[(0,A.jsx)(`span`,{className:`header-sv__punto-verde`}),` En servicio`]}),(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Supervisor`,className:`barra-superior__avatar`}),(0,A.jsx)(`span`,{className:`barra-superior__chevron`,children:`▾`})]})]}),(0,A.jsx)(`h2`,{className:`genv-titulo`,children:`Gestión de Envíos`}),(0,A.jsxs)(`div`,{className:`genv-barra`,children:[(0,A.jsxs)(`div`,{className:`genv-buscar`,children:[(0,A.jsx)(`span`,{className:`genv-buscar__icono`,children:`🔍`}),(0,A.jsx)(`input`,{type:`text`,placeholder:`Buscar dirección o número de guía`})]}),(0,A.jsxs)(`button`,{className:`genv-chip genv-chip--todos`,children:[`Todos `,(0,A.jsx)(`span`,{className:`genv-chip__flecha`,children:`▾`})]}),(0,A.jsx)(`button`,{className:`genv-chip genv-chip--pendiente`,children:`⏱ Pendiente`}),(0,A.jsx)(`button`,{className:`genv-chip genv-chip--retrasado`,children:`⚠ Retrasado`}),(0,A.jsx)(`button`,{className:`genv-chip genv-chip--entregado`,children:`✔ Entregado`}),(0,A.jsx)(`button`,{className:`genv-filtro-btn`,children:`☰ Filtro`})]}),(0,A.jsxs)(`div`,{className:`genv-ordenar`,children:[(0,A.jsx)(`span`,{children:`Ordenar por:`}),(0,A.jsx)(`select`,{children:(0,A.jsx)(`option`,{children:`Hora`})}),(0,A.jsx)(`select`,{children:(0,A.jsx)(`option`,{children:`Zona`})}),(0,A.jsx)(`select`,{children:(0,A.jsx)(`option`,{children:`Prioridad`})}),(0,A.jsx)(`span`,{className:`genv-ordenar__dots`,children:`⋯`})]}),(0,A.jsx)(`div`,{className:`genv-tabla-wrap`,children:(0,A.jsxs)(`table`,{className:`genv-tabla`,children:[(0,A.jsx)(`thead`,{children:(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`th`,{children:`Guía`}),(0,A.jsx)(`th`,{children:`Cliente`}),(0,A.jsx)(`th`,{children:`Dirección`}),(0,A.jsx)(`th`,{children:`Hora estimada`}),(0,A.jsx)(`th`,{children:`Repartidor`}),(0,A.jsx)(`th`,{children:`Estado`}),(0,A.jsx)(`th`,{})]})}),(0,A.jsxs)(`tbody`,{children:[(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-guia`,children:`PAK123456789`})}),(0,A.jsxs)(`td`,{children:[(0,A.jsx)(`span`,{className:`genv-cliente`,children:`Ana Martínez`}),(0,A.jsx)(`br`,{}),(0,A.jsx)(`span`,{className:`genv-sub`,children:`CDMX`})]}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-direccion`,children:`Col. Roma Norte, CDMX`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-hora`,children:`10:00 – 11:00`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-repartidor`,children:`Luis Garcia`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-estado genv-estado--pendiente`,children:`➤ Pendiente`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`a`,{href:`/piWeb/src/pages/supervisor/detalleEnvioSupervisor.html`,className:`genv-ver-btn`,children:`ver detalle`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-guia`,children:`MXZ67584321`})}),(0,A.jsxs)(`td`,{children:[(0,A.jsx)(`span`,{className:`genv-cliente`,children:`Carlos Ramírez`}),(0,A.jsx)(`br`,{}),(0,A.jsx)(`span`,{className:`genv-sub`,children:`Querétaro, CDMX · Javier Torres`})]}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-direccion`,children:`Av. Tecnológico 210, Querétaro`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-hora`,children:`12:00 – 1:00`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-repartidor`,children:`Javier Torres`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-estado genv-estado--enruta`,children:`✔ En ruta`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`a`,{href:`/piWeb/src/pages/supervisor/detalleEnvioSupervisor.html`,className:`genv-ver-btn`,children:`ver detalle`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-guia`,children:`MX987654321`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-cliente`,children:`Laura Gómez`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-direccion`,children:`Av. Revolución 456, Col. Del Valle`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-hora`,children:`1:00 – 3:00`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-repartidor`,children:`Ricardo Muñoz`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-estado genv-estado--retrasado`,children:`⚠ Retrasado`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`a`,{href:`/piWeb/src/pages/supervisor/detalleEnvioSupervisor.html`,className:`genv-ver-btn`,children:`ver detalle`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-guia`,children:`MXZ47630219`})}),(0,A.jsxs)(`td`,{children:[(0,A.jsx)(`span`,{className:`genv-cliente`,children:`Pedro Sanchez`}),(0,A.jsx)(`br`,{}),(0,A.jsx)(`span`,{className:`genv-sub`,children:`Coyoacán, CDMX · Jorge Medina`})]}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-direccion`,children:`Av. Universidad 789, Col. Coyoacán`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-hora`,children:`2:00 – 3:30`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-repartidor`,children:`Jorge Medina`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-estado genv-estado--entregado`,children:`📦 Entregado`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`a`,{href:`/piWeb/src/pages/supervisor/detalleEnvioSupervisor.html`,className:`genv-ver-btn`,children:`ver detalle`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-guia`,children:`MXZ47620210`})}),(0,A.jsxs)(`td`,{children:[(0,A.jsx)(`span`,{className:`genv-cliente`,children:`Sofia Lozano`}),(0,A.jsx)(`br`,{}),(0,A.jsx)(`span`,{className:`genv-sub`,children:`Javier Torres`})]}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-direccion`,children:`Campestre Oriente 230, Toluca`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-hora`,children:`3:00 – 4:30`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-repartidor`,children:`Javier Torres`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-estado genv-estado--entregado`,children:`📦 Entregado`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`a`,{href:`/piWeb/src/pages/supervisor/detalleEnvioSupervisor.html`,className:`genv-ver-btn`,children:`ver detalle`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-guia`,children:`MXZ47620210`})}),(0,A.jsxs)(`td`,{children:[(0,A.jsx)(`span`,{className:`genv-cliente`,children:`Sofia Lozano`}),(0,A.jsx)(`br`,{}),(0,A.jsx)(`span`,{className:`genv-sub`,children:`Javier Torres`})]}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-direccion`,children:`Campestre Oriente 230, Toluca`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-hora`,children:`3:00 – 4:30`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-repartidor`,children:`Javier Torres`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`genv-estado genv-estado--entregado`,children:`📦 Entregado`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`a`,{href:`/piWeb/src/pages/supervisor/detalleEnvioSupervisor.html`,className:`genv-ver-btn`,children:`ver detalle`})})]})]})]})}),(0,A.jsxs)(`div`,{className:`genv-paginacion`,children:[(0,A.jsxs)(`div`,{className:`genv-paginacion__info`,children:[`Mostrando 5 de 268 envíos`,(0,A.jsxs)(`span`,{className:`genv-paginacion__paginas`,style:{display:`inline-flex`,marginLeft:`8px`},children:[(0,A.jsx)(`button`,{className:`genv-pag-btn genv-pag-btn--activo`,children:`1`}),(0,A.jsx)(`button`,{className:`genv-pag-btn`,children:`2`}),(0,A.jsx)(`button`,{className:`genv-pag-btn`,children:`3`}),(0,A.jsx)(`button`,{className:`genv-pag-btn`,children:`4`}),(0,A.jsx)(`button`,{className:`genv-pag-btn`,children:`5`}),(0,A.jsx)(`button`,{className:`genv-pag-btn genv-pag-btn--dots`,children:`⋯`})]})]}),(0,A.jsxs)(`div`,{className:`genv-paginacion__paginas`,children:[(0,A.jsx)(`button`,{className:`genv-pag-btn`,children:`<`}),(0,A.jsx)(`button`,{className:`genv-pag-btn genv-pag-btn--activo`,children:`1`}),(0,A.jsx)(`button`,{className:`genv-pag-btn`,children:`2`}),(0,A.jsx)(`button`,{className:`genv-pag-btn`,children:`3`}),(0,A.jsx)(`button`,{className:`genv-pag-btn`,children:`>`})]})]})]})]})]})}function or(){return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(`style`,{children:`
    /* ── Gestión de Repartidores ── */
    .grep-titulo {
      font-size: 26px;
      font-weight: 700;
      color: #1a2d50;
      margin: 24px 0 18px;
    }

    /* Barra búsqueda + filtros */
    .grep-barra {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 22px;
      background: rgba(220,230,250,0.45);
      border: 1px solid rgba(200,215,240,0.4);
      border-radius: 14px;
      padding: 12px 16px;
    }
    .grep-buscar {
      flex: 1;
      min-width: 200px;
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,0.7);
      border: 1px solid #d0d8e8;
      border-radius: 10px;
      padding: 10px 14px;
    }
    .grep-buscar__icono { color: #8899b4; font-size: 18px; }
    .grep-buscar input {
      border: none; background: transparent; outline: none;
      font-size: 14px; color: #2b3552; width: 100%;
    }
    .grep-buscar input::placeholder { color: #9aa8c0; }

    .grep-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      color: #fff;
      transition: opacity 0.2s;
    }
    .grep-chip:hover { opacity: 0.85; }
    .grep-chip--activos { background: #3b6aaa; }
    .grep-chip--enruta  { background: #43a047; }
    .grep-chip--sin     { background: #f5a623; }
    .grep-chip__count {
      background: rgba(255,255,255,0.3);
      border-radius: 10px;
      padding: 1px 8px;
      font-size: 12px;
    }

    .grep-filtro-btn {
      display: flex; align-items: center; gap: 6px;
      padding: 8px 16px; border-radius: 10px;
      border: 1px solid #d0d8e8;
      background: rgba(255,255,255,0.7);
      font-size: 14px; font-weight: 600; color: #3b5585;
      cursor: pointer;
    }
    .grep-filtro-btn:hover { background: #fff; }
    .grep-agregar-btn {
      display: flex; align-items: center; gap: 6px;
      padding: 8px 18px; border-radius: 10px;
      border: none;
      background: #1a2d50;
      font-size: 14px; font-weight: 600; color: #fff;
      cursor: pointer;
      transition: background 0.2s;
    }
    .grep-agregar-btn:hover { background: #2a4a7a; }

    /* Grid de tarjetas */
    .grep-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 18px;
      margin-bottom: 22px;
    }

    /* Tarjeta repartidor */
    .grep-card {
      background: rgba(230,237,250,0.5);
      border: 1px solid rgba(200,215,240,0.45);
      border-radius: 14px;
      padding: 18px 20px 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .grep-card__top {
      display: flex;
      align-items: flex-start;
      gap: 14px;
    }
    .grep-card__foto {
      width: 72px; height: 72px;
      border-radius: 12px;
      object-fit: cover;
      border: 2px solid rgba(200,215,240,0.5);
    }
    .grep-card__info { flex: 1; }
    .grep-card__nombre {
      font-size: 18px; font-weight: 700; color: #1a2d50;
      margin: 0 0 2px;
    }
    .grep-card__zona {
      font-size: 14px; color: #5a6d8a; margin: 0 0 6px;
    }
    .grep-card__badge-zona {
      display: inline-block;
      padding: 3px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      color: #fff;
      background: #3b6aaa;
    }

    /* Estado del repartidor */
    .grep-estado {
      font-size: 14px;
      font-weight: 700;
      white-space: nowrap;
    }
    .grep-estado--enruta  { color: #43a047; }
    .grep-estado--sin     { color: #f5a623; }
    .grep-estado--fuera   { color: #e53935; }
    .grep-estado__dot {
      display: inline-block;
      width: 10px; height: 10px;
      border-radius: 50%;
      margin-right: 4px;
    }
    .grep-estado--enruta .grep-estado__dot  { background: #43a047; }
    .grep-estado--sin .grep-estado__dot     { background: #f5a623; }
    .grep-estado--fuera .grep-estado__dot   { background: #e53935; }

    /* Botones de acción */
    .grep-card__acciones {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .grep-accion {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 6px 14px;
      border-radius: 8px;
      border: 1px solid #d0d8e8;
      background: rgba(255,255,255,0.7);
      font-size: 13px;
      font-weight: 500;
      color: #3b5585;
      cursor: pointer;
      transition: background 0.2s;
    }
    .grep-accion:hover { background: #fff; }
    .grep-accion__icono { font-size: 15px; }

    /* Paginación */
    .grep-paginacion {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0 20px;
      flex-wrap: wrap;
      gap: 12px;
    }
    .grep-paginacion__info {
      font-size: 14px; color: #5a6d8a;
    }
    .grep-paginacion__paginas {
      display: flex; align-items: center; gap: 4px;
    }
    .grep-pag-btn {
      width: 34px; height: 34px;
      display: flex; align-items: center; justify-content: center;
      border-radius: 6px;
      border: 1px solid #d0d8e8;
      background: #fff;
      font-size: 14px; font-weight: 600; color: #3b5585;
      cursor: pointer;
      transition: background 0.2s;
    }
    .grep-pag-btn:hover { background: #e8f0fb; }
    .grep-pag-btn--activo {
      background: #3b6aaa; color: #fff; border-color: #3b6aaa;
    }

    @media (max-width: 860px) {
      .grep-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 600px) {
      .grep-barra { flex-direction: column; align-items: stretch; }
      .grep-buscar { min-width: auto; }
      .grep-paginacion { flex-direction: column; align-items: flex-start; }
    }
  `}),(0,A.jsxs)(`div`,{className:`tablero-operador tablero-operador--sin-sidebar`,children:[(0,A.jsx)(`div`,{id:`menuContainer`,className:`menu-overlay`}),(0,A.jsx)(`div`,{id:`menuBackdrop`,className:`menu-overlay__backdrop`}),(0,A.jsxs)(`main`,{className:`panel-principal panel-principal--full`,children:[(0,A.jsxs)(`header`,{className:`barra-superior barra-superior--con-logo`,children:[(0,A.jsxs)(`div`,{className:`barra-superior__left`,children:[(0,A.jsx)(`button`,{id:`btnMenu`,className:`btn-menu-hamburguesa`,"aria-label":`Abrir menú`,children:(0,A.jsxs)(`svg`,{width:`26`,height:`26`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,children:[(0,A.jsx)(`line`,{x1:`3`,y1:`6`,x2:`21`,y2:`6`}),(0,A.jsx)(`line`,{x1:`3`,y1:`12`,x2:`21`,y2:`12`}),(0,A.jsx)(`line`,{x1:`3`,y1:`18`,x2:`21`,y2:`18`})]})}),(0,A.jsx)(`div`,{className:`header-logo`,children:(0,A.jsx)(`img`,{src:`/piWeb/images/logoSinFondo.png`,alt:`Metzvia`})}),(0,A.jsx)(`h1`,{className:`barra-superior__titulo`,children:`Supervisor`})]}),(0,A.jsxs)(`div`,{className:`barra-superior__perfil`,children:[(0,A.jsxs)(`span`,{className:`badge-servicio`,children:[(0,A.jsx)(`span`,{className:`header-sv__punto-verde`}),` En servicio`]}),(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Supervisor`,className:`barra-superior__avatar`}),(0,A.jsx)(`span`,{className:`barra-superior__chevron`,children:`▾`})]})]}),(0,A.jsx)(`h2`,{className:`grep-titulo`,children:`Gestión de Repartidores`}),(0,A.jsxs)(`div`,{className:`grep-barra`,children:[(0,A.jsxs)(`div`,{className:`grep-buscar`,children:[(0,A.jsx)(`span`,{className:`grep-buscar__icono`,children:`🔍`}),(0,A.jsx)(`input`,{type:`text`,placeholder:`Buscar repartidor...`})]}),(0,A.jsxs)(`button`,{className:`grep-chip grep-chip--activos`,children:[`✔ Activos `,(0,A.jsx)(`span`,{className:`grep-chip__count`,children:`148`})]}),(0,A.jsxs)(`button`,{className:`grep-chip grep-chip--enruta`,children:[`● En ruta `,(0,A.jsx)(`span`,{className:`grep-chip__count`,children:`58`})]}),(0,A.jsx)(`button`,{className:`grep-chip grep-chip--sin`,children:`● Sin asignación`}),(0,A.jsx)(`button`,{className:`grep-filtro-btn`,children:`☰ Filtro ▾`}),(0,A.jsx)(`button`,{className:`grep-agregar-btn`,children:`👤 Agregar Repartidor`})]}),(0,A.jsxs)(`div`,{className:`grep-grid`,children:[(0,A.jsxs)(`div`,{className:`grep-card`,children:[(0,A.jsxs)(`div`,{className:`grep-card__top`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Luis Garcia`,className:`grep-card__foto`}),(0,A.jsxs)(`div`,{className:`grep-card__info`,children:[(0,A.jsx)(`p`,{className:`grep-card__nombre`,children:`Luis Garcia`}),(0,A.jsx)(`p`,{className:`grep-card__zona`,children:`Centro`}),(0,A.jsx)(`span`,{className:`grep-card__badge-zona`,children:`Centro`})]}),(0,A.jsxs)(`span`,{className:`grep-estado grep-estado--enruta`,children:[(0,A.jsx)(`span`,{className:`grep-estado__dot`}),` En ruta`]})]}),(0,A.jsxs)(`div`,{className:`grep-card__acciones`,children:[(0,A.jsxs)(`a`,{href:`/piWeb/src/pages/supervisor/rutaRepartidorSupervisor.html`,className:`grep-accion`,children:[(0,A.jsx)(`span`,{className:`grep-accion__icono`,children:`📍`}),` Ver ruta`]}),(0,A.jsxs)(`a`,{href:`/piWeb/src/pages/supervisor/entregasRepartidorSupervisor.html`,className:`grep-accion`,children:[(0,A.jsx)(`span`,{className:`grep-accion__icono`,children:`📋`}),` Ver entregas`]}),(0,A.jsxs)(`button`,{className:`grep-accion`,children:[(0,A.jsx)(`span`,{className:`grep-accion__icono`,children:`🔄`}),` Reasignar >`]})]})]}),(0,A.jsxs)(`div`,{className:`grep-card`,children:[(0,A.jsxs)(`div`,{className:`grep-card__top`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Javier Torres`,className:`grep-card__foto`}),(0,A.jsxs)(`div`,{className:`grep-card__info`,children:[(0,A.jsx)(`p`,{className:`grep-card__nombre`,children:`Javier Torres`}),(0,A.jsx)(`p`,{className:`grep-card__zona`,children:`Roma Norte`}),(0,A.jsx)(`span`,{className:`grep-card__badge-zona`,style:{background:`#f5a623`},children:`Perr.`})]}),(0,A.jsxs)(`span`,{className:`grep-estado grep-estado--sin`,children:[(0,A.jsx)(`span`,{className:`grep-estado__dot`}),` Sin asignación`]})]}),(0,A.jsxs)(`div`,{className:`grep-card__acciones`,children:[(0,A.jsxs)(`a`,{href:`/piWeb/src/pages/supervisor/rutaRepartidorSupervisor.html`,className:`grep-accion`,children:[(0,A.jsx)(`span`,{className:`grep-accion__icono`,children:`📍`}),` Ver ruta`]}),(0,A.jsxs)(`a`,{href:`/piWeb/src/pages/supervisor/entregasRepartidorSupervisor.html`,className:`grep-accion`,children:[(0,A.jsx)(`span`,{className:`grep-accion__icono`,children:`📋`}),` Ver entregas`]}),(0,A.jsxs)(`button`,{className:`grep-accion`,children:[(0,A.jsx)(`span`,{className:`grep-accion__icono`,children:`🔄`}),` Reasignar paquetes`]})]})]}),(0,A.jsxs)(`div`,{className:`grep-card`,children:[(0,A.jsxs)(`div`,{className:`grep-card__top`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Javier Torres`,className:`grep-card__foto`}),(0,A.jsxs)(`div`,{className:`grep-card__info`,children:[(0,A.jsx)(`p`,{className:`grep-card__nombre`,children:`Javier Torres`}),(0,A.jsx)(`p`,{className:`grep-card__zona`,children:`Roma Norte`}),(0,A.jsx)(`span`,{className:`grep-card__badge-zona`,style:{background:`#f5a623`},children:`Sert.`})]}),(0,A.jsxs)(`span`,{className:`grep-estado grep-estado--sin`,children:[(0,A.jsx)(`span`,{className:`grep-estado__dot`}),` Sin asignación`]})]}),(0,A.jsxs)(`div`,{className:`grep-card__acciones`,children:[(0,A.jsxs)(`a`,{href:`/piWeb/src/pages/supervisor/rutaRepartidorSupervisor.html`,className:`grep-accion`,children:[(0,A.jsx)(`span`,{className:`grep-accion__icono`,children:`📍`}),` Ver ruta`]}),(0,A.jsxs)(`a`,{href:`/piWeb/src/pages/supervisor/entregasRepartidorSupervisor.html`,className:`grep-accion`,children:[(0,A.jsx)(`span`,{className:`grep-accion__icono`,children:`📋`}),` Ver entregas`]}),(0,A.jsxs)(`button`,{className:`grep-accion`,children:[(0,A.jsx)(`span`,{className:`grep-accion__icono`,children:`🔄`}),` Reasignar >`]})]})]}),(0,A.jsxs)(`div`,{className:`grep-card`,children:[(0,A.jsxs)(`div`,{className:`grep-card__top`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Ricardo Muñoz`,className:`grep-card__foto`}),(0,A.jsxs)(`div`,{className:`grep-card__info`,children:[(0,A.jsx)(`p`,{className:`grep-card__nombre`,children:`Ricardo Muñoz`}),(0,A.jsx)(`p`,{className:`grep-card__zona`,children:`Del Valle`}),(0,A.jsx)(`span`,{className:`grep-card__badge-zona`,style:{background:`#f5a623`},children:`Perc.`})]}),(0,A.jsxs)(`span`,{className:`grep-estado grep-estado--enruta`,children:[(0,A.jsx)(`span`,{className:`grep-estado__dot`}),` En ruta`]})]}),(0,A.jsxs)(`div`,{className:`grep-card__acciones`,children:[(0,A.jsxs)(`a`,{href:`/piWeb/src/pages/supervisor/rutaRepartidorSupervisor.html`,className:`grep-accion`,children:[(0,A.jsx)(`span`,{className:`grep-accion__icono`,children:`📍`}),` Ver ruta`]}),(0,A.jsxs)(`a`,{href:`/piWeb/src/pages/supervisor/entregasRepartidorSupervisor.html`,className:`grep-accion`,children:[(0,A.jsx)(`span`,{className:`grep-accion__icono`,children:`📋`}),` Ver entregas`]}),(0,A.jsxs)(`button`,{className:`grep-accion`,children:[(0,A.jsx)(`span`,{className:`grep-accion__icono`,children:`🔄`}),` Reasignar paquetes`]})]})]}),(0,A.jsxs)(`div`,{className:`grep-card`,children:[(0,A.jsxs)(`div`,{className:`grep-card__top`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Pedro Sanchez`,className:`grep-card__foto`}),(0,A.jsxs)(`div`,{className:`grep-card__info`,children:[(0,A.jsx)(`p`,{className:`grep-card__nombre`,children:`Pedro Sanchez`}),(0,A.jsx)(`p`,{className:`grep-card__zona`,children:`Coyoacán`}),(0,A.jsx)(`span`,{className:`grep-card__badge-zona`,style:{background:`#f5a623`},children:`Perc.`})]}),(0,A.jsxs)(`span`,{className:`grep-estado grep-estado--enruta`,children:[(0,A.jsx)(`span`,{className:`grep-estado__dot`}),` En ruta`]})]}),(0,A.jsxs)(`div`,{className:`grep-card__acciones`,children:[(0,A.jsxs)(`a`,{href:`/piWeb/src/pages/supervisor/rutaRepartidorSupervisor.html`,className:`grep-accion`,children:[(0,A.jsx)(`span`,{className:`grep-accion__icono`,children:`📍`}),` Ver ruta`]}),(0,A.jsxs)(`a`,{href:`/piWeb/src/pages/supervisor/entregasRepartidorSupervisor.html`,className:`grep-accion`,children:[(0,A.jsx)(`span`,{className:`grep-accion__icono`,children:`📋`}),` Ver entregas`]}),(0,A.jsxs)(`button`,{className:`grep-accion`,children:[(0,A.jsx)(`span`,{className:`grep-accion__icono`,children:`🔄`}),` Reasignar >`]})]})]}),(0,A.jsxs)(`div`,{className:`grep-card`,children:[(0,A.jsxs)(`div`,{className:`grep-card__top`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Sofia Lozano`,className:`grep-card__foto`}),(0,A.jsxs)(`div`,{className:`grep-card__info`,children:[(0,A.jsx)(`p`,{className:`grep-card__nombre`,children:`Sofia Lozano`}),(0,A.jsx)(`p`,{className:`grep-card__zona`,children:`Toluca`}),(0,A.jsx)(`span`,{className:`grep-card__badge-zona`,style:{background:`#f5a623`},children:`Sert.`})]}),(0,A.jsxs)(`span`,{className:`grep-estado grep-estado--fuera`,children:[(0,A.jsx)(`span`,{className:`grep-estado__dot`}),` Fuera de servicio`]})]}),(0,A.jsxs)(`div`,{className:`grep-card__acciones`,children:[(0,A.jsxs)(`a`,{href:`/piWeb/src/pages/supervisor/rutaRepartidorSupervisor.html`,className:`grep-accion`,children:[(0,A.jsx)(`span`,{className:`grep-accion__icono`,children:`📍`}),` Ver ruta`]}),(0,A.jsxs)(`a`,{href:`/piWeb/src/pages/supervisor/entregasRepartidorSupervisor.html`,className:`grep-accion`,children:[(0,A.jsx)(`span`,{className:`grep-accion__icono`,children:`📋`}),` Ver entregas`]}),(0,A.jsxs)(`button`,{className:`grep-accion`,children:[(0,A.jsx)(`span`,{className:`grep-accion__icono`,children:`🔄`}),` Reasignar paquetes`]})]})]})]}),(0,A.jsxs)(`div`,{className:`grep-paginacion`,children:[(0,A.jsx)(`span`,{className:`grep-paginacion__info`,children:`Mostrando 5 de 148 repartidores`}),(0,A.jsxs)(`div`,{className:`grep-paginacion__paginas`,children:[(0,A.jsx)(`button`,{className:`grep-pag-btn`,children:`<`}),(0,A.jsx)(`button`,{className:`grep-pag-btn grep-pag-btn--activo`,children:`1`}),(0,A.jsx)(`button`,{className:`grep-pag-btn`,children:`2`}),(0,A.jsx)(`button`,{className:`grep-pag-btn`,children:`3`}),(0,A.jsx)(`button`,{className:`grep-pag-btn`,children:`4`}),(0,A.jsx)(`button`,{className:`grep-pag-btn`,children:`>`})]})]})]})]})]})}function sr(){return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(`style`,{children:`
    /* ── Gestión de Incidencias ── */
    .ginc-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 24px 0 18px;
      flex-wrap: wrap;
      gap: 10px;
    }
    .ginc-titulo {
      font-size: 26px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0;
    }
    .ginc-header__acciones {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .ginc-header-btn {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 7px 14px;
      border-radius: 8px;
      border: 1px solid #d0d8e8;
      background: rgba(255,255,255,0.7);
      font-size: 14px;
      font-weight: 600;
      color: #3b5585;
      cursor: pointer;
    }
    .ginc-header-btn:hover { background: #fff; }

    /* Barra búsqueda + filtros */
    .ginc-barra {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 20px;
      background: rgba(220,230,250,0.45);
      border: 1px solid rgba(200,215,240,0.4);
      border-radius: 14px;
      padding: 12px 16px;
    }
    .ginc-buscar {
      flex: 1;
      min-width: 200px;
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,0.7);
      border: 1px solid #d0d8e8;
      border-radius: 10px;
      padding: 10px 14px;
    }
    .ginc-buscar__icono { color: #8899b4; font-size: 18px; }
    .ginc-buscar input {
      border: none; background: transparent; outline: none;
      font-size: 14px; color: #2b3552; width: 100%;
    }
    .ginc-buscar input::placeholder { color: #9aa8c0; }

    .ginc-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      color: #fff;
      transition: opacity 0.2s;
    }
    .ginc-chip:hover { opacity: 0.85; }
    .ginc-chip--pendiente { background: #3b6aaa; }
    .ginc-chip--progreso  { background: #43a047; }
    .ginc-chip--resuelto  { background: #43a047; }
    .ginc-chip__count {
      background: rgba(255,255,255,0.3);
      border-radius: 10px;
      padding: 1px 8px;
      font-size: 12px;
    }
    .ginc-filtro-btn {
      display: flex; align-items: center; gap: 6px;
      padding: 8px 16px; border-radius: 10px;
      border: 1px solid #d0d8e8;
      background: rgba(255,255,255,0.7);
      font-size: 14px; font-weight: 600; color: #3b5585;
      cursor: pointer;
    }
    .ginc-filtro-btn:hover { background: #fff; }

    /* Tabla contenedor */
    .ginc-tabla-wrap {
      background: rgba(230,237,250,0.45);
      border-radius: 14px;
      overflow-x: auto;
      border: 1px solid rgba(200,215,240,0.4);
      padding: 4px 0;
    }
    .ginc-seccion-titulo {
      font-size: 18px;
      font-weight: 700;
      color: #1a2d50;
      padding: 16px 20px 6px;
      margin: 0;
    }

    .ginc-tabla {
      width: 100%;
      border-collapse: collapse;
      min-width: 780px;
    }
    .ginc-tabla thead th {
      text-align: left;
      padding: 12px 18px;
      font-size: 13px;
      font-weight: 700;
      color: #3b5585;
      border-bottom: 2px solid rgba(180,200,230,0.4);
    }
    .ginc-tabla tbody tr {
      border-bottom: 1px solid rgba(200,215,240,0.35);
      transition: background 0.15s;
    }
    .ginc-tabla tbody tr:hover { background: rgba(220,232,250,0.35); }
    .ginc-tabla tbody td {
      padding: 14px 18px;
      font-size: 14px;
      color: #2b3552;
      vertical-align: middle;
    }

    .ginc-guia {
      font-weight: 600;
      color: #1a2d50;
      font-size: 13px;
      letter-spacing: 0.3px;
    }

    /* Repartidor cell */
    .ginc-rep {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .ginc-rep__foto {
      width: 48px; height: 48px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid rgba(200,215,240,0.5);
    }
    .ginc-rep__nombre {
      font-weight: 700; color: #1a2d50; font-size: 15px;
      margin: 0 0 1px;
    }
    .ginc-rep__zona {
      font-size: 13px; color: #5a6d8a; margin: 0;
    }
    .ginc-rep__email {
      font-size: 12px; color: #8899b4; margin: 0;
      display: flex; align-items: center; gap: 4px;
    }

    /* Tipo de problema */
    .ginc-problema {
      font-weight: 700; color: #1a2d50; font-size: 14px;
      margin: 0 0 2px;
    }
    .ginc-problema-hora {
      font-size: 13px; color: #5a6d8a; margin: 0;
    }

    /* Badges de estado */
    .ginc-estado {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 5px 14px;
      border-radius: 16px;
      font-size: 13px;
      font-weight: 700;
      white-space: nowrap;
    }
    .ginc-estado--pendiente {
      background: #fff3e0; color: #e68a00;
    }
    .ginc-estado--progreso {
      background: #e8f5e9; color: #2e7d32;
    }
    .ginc-estado--resuelto {
      background: #e0f7fa; color: #00838f;
    }

    .ginc-ver-btn {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 6px 14px;
      border-radius: 6px;
      border: 1px solid #d0d8e8;
      background: rgba(255,255,255,0.7);
      font-size: 13px; color: #3b5585;
      cursor: pointer;
      transition: background 0.2s;
    }
    .ginc-ver-btn:hover { background: #fff; }

    /* Paginación */
    .ginc-paginacion {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 0 20px;
      flex-wrap: wrap;
      gap: 12px;
    }
    .ginc-paginacion__info { font-size: 14px; color: #5a6d8a; }
    .ginc-paginacion__paginas {
      display: flex; align-items: center; gap: 4px;
    }
    .ginc-pag-btn {
      width: 34px; height: 34px;
      display: flex; align-items: center; justify-content: center;
      border-radius: 6px;
      border: 1px solid #d0d8e8;
      background: #fff;
      font-size: 14px; font-weight: 600; color: #3b5585;
      cursor: pointer;
      transition: background 0.2s;
    }
    .ginc-pag-btn:hover { background: #e8f0fb; }
    .ginc-pag-btn--activo {
      background: #3b6aaa; color: #fff; border-color: #3b6aaa;
    }

    @media (max-width: 768px) {
      .ginc-barra { flex-direction: column; align-items: stretch; }
      .ginc-buscar { min-width: auto; }
      .ginc-paginacion { flex-direction: column; align-items: flex-start; }
    }
  `}),(0,A.jsxs)(`div`,{className:`tablero-operador tablero-operador--sin-sidebar`,children:[(0,A.jsx)(`div`,{id:`menuContainer`,className:`menu-overlay`}),(0,A.jsx)(`div`,{id:`menuBackdrop`,className:`menu-overlay__backdrop`}),(0,A.jsxs)(`main`,{className:`panel-principal panel-principal--full`,children:[(0,A.jsxs)(`header`,{className:`barra-superior barra-superior--con-logo`,children:[(0,A.jsxs)(`div`,{className:`barra-superior__left`,children:[(0,A.jsx)(`button`,{id:`btnMenu`,className:`btn-menu-hamburguesa`,"aria-label":`Abrir menú`,children:(0,A.jsxs)(`svg`,{width:`26`,height:`26`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,children:[(0,A.jsx)(`line`,{x1:`3`,y1:`6`,x2:`21`,y2:`6`}),(0,A.jsx)(`line`,{x1:`3`,y1:`12`,x2:`21`,y2:`12`}),(0,A.jsx)(`line`,{x1:`3`,y1:`18`,x2:`21`,y2:`18`})]})}),(0,A.jsx)(`div`,{className:`header-logo`,children:(0,A.jsx)(`img`,{src:`/piWeb/images/logoSinFondo.png`,alt:`Metzvia`})}),(0,A.jsx)(`h1`,{className:`barra-superior__titulo`,children:`Supervisor`})]}),(0,A.jsxs)(`div`,{className:`barra-superior__perfil`,children:[(0,A.jsxs)(`span`,{className:`badge-servicio`,children:[(0,A.jsx)(`span`,{className:`header-sv__punto-verde`}),` En servicio`]}),(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Supervisor`,className:`barra-superior__avatar`}),(0,A.jsx)(`span`,{className:`barra-superior__chevron`,children:`▾`})]})]}),(0,A.jsxs)(`div`,{className:`ginc-header`,children:[(0,A.jsx)(`h2`,{className:`ginc-titulo`,children:`Gestión de Incidencias`}),(0,A.jsxs)(`div`,{className:`ginc-header__acciones`,children:[(0,A.jsx)(`button`,{className:`ginc-header-btn`,children:`☰ Filtro ▾`}),(0,A.jsx)(`button`,{className:`ginc-header-btn`,children:`☰ ⚑ ▾`})]})]}),(0,A.jsxs)(`div`,{className:`ginc-barra`,children:[(0,A.jsxs)(`div`,{className:`ginc-buscar`,children:[(0,A.jsx)(`span`,{className:`ginc-buscar__icono`,children:`🔍`}),(0,A.jsx)(`input`,{type:`text`,placeholder:`Buscar incidencia...`})]}),(0,A.jsxs)(`button`,{className:`ginc-chip ginc-chip--pendiente`,children:[`📋 Pendiente `,(0,A.jsx)(`span`,{className:`ginc-chip__count`,children:`5`})]}),(0,A.jsxs)(`button`,{className:`ginc-chip ginc-chip--progreso`,children:[`✔ En progreso `,(0,A.jsx)(`span`,{className:`ginc-chip__count`,children:`3`})]}),(0,A.jsxs)(`button`,{className:`ginc-chip ginc-chip--resuelto`,children:[`✔ Resuelto `,(0,A.jsx)(`span`,{className:`ginc-chip__count`,children:`14`})]}),(0,A.jsx)(`button`,{className:`ginc-filtro-btn`,children:`☰ Filtro ▾`})]}),(0,A.jsxs)(`div`,{className:`ginc-tabla-wrap`,children:[(0,A.jsx)(`h3`,{className:`ginc-seccion-titulo`,children:`Información del Envio`}),(0,A.jsxs)(`table`,{className:`ginc-tabla`,children:[(0,A.jsx)(`thead`,{children:(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`th`,{children:`Guía`}),(0,A.jsx)(`th`,{children:`Repartidor`}),(0,A.jsx)(`th`,{children:`Tipo de problema`}),(0,A.jsx)(`th`,{children:`Estado`}),(0,A.jsx)(`th`,{})]})}),(0,A.jsxs)(`tbody`,{children:[(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`ginc-guia`,children:`PAK123456789`})}),(0,A.jsx)(`td`,{children:(0,A.jsxs)(`div`,{className:`ginc-rep`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Luis García`,className:`ginc-rep__foto`}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`p`,{className:`ginc-rep__nombre`,children:`Luis García`}),(0,A.jsx)(`p`,{className:`ginc-rep__zona`,children:`Centro`}),(0,A.jsx)(`p`,{className:`ginc-rep__email`,children:`✉ Minar Inn`})]})]})}),(0,A.jsxs)(`td`,{children:[(0,A.jsx)(`p`,{className:`ginc-problema`,children:`Cliente ausente`}),(0,A.jsx)(`p`,{className:`ginc-problema-hora`,children:`10:30 AM`})]}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`ginc-estado ginc-estado--pendiente`,children:`✔ Pendiente`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`button`,{className:`ginc-ver-btn`,children:`📋 Ver detalle`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`ginc-guia`,children:`MXZ4567320`})}),(0,A.jsx)(`td`,{children:(0,A.jsxs)(`div`,{className:`ginc-rep`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Jorge Sánchez`,className:`ginc-rep__foto`}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`p`,{className:`ginc-rep__nombre`,children:`Jorge Sánchez`}),(0,A.jsx)(`p`,{className:`ginc-rep__zona`,children:`Coyoacán`}),(0,A.jsx)(`p`,{className:`ginc-rep__email`,children:`✉ Minar Inn`})]})]})}),(0,A.jsxs)(`td`,{children:[(0,A.jsx)(`p`,{className:`ginc-problema`,children:`Dirección incorrecta`}),(0,A.jsx)(`p`,{className:`ginc-problema-hora`,children:`3:15 PM`})]}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`ginc-estado ginc-estado--progreso`,children:`➤ En progreso`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`button`,{className:`ginc-ver-btn`,children:`📋 Ver detalle`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`ginc-guia`,children:`MXZ67584321`})}),(0,A.jsx)(`td`,{children:(0,A.jsxs)(`div`,{className:`ginc-rep`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Carlos Ramirez`,className:`ginc-rep__foto`}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`p`,{className:`ginc-rep__nombre`,children:`Carlos Ramirez`}),(0,A.jsx)(`p`,{className:`ginc-rep__zona`,children:`Norte`}),(0,A.jsx)(`p`,{className:`ginc-rep__email`,children:`✉ Minar Inn`})]})]})}),(0,A.jsxs)(`td`,{children:[(0,A.jsx)(`p`,{className:`ginc-problema`,children:`Retraso logístico`}),(0,A.jsx)(`p`,{className:`ginc-problema-hora`,children:`12:45 PM`})]}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`ginc-estado ginc-estado--pendiente`,children:`✔ Pendiente`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`button`,{className:`ginc-ver-btn`,children:`📋 Ver detalle`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`ginc-guia`,children:`MX274760219`})}),(0,A.jsx)(`td`,{children:(0,A.jsxs)(`div`,{className:`ginc-rep`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Pilar Suarez`,className:`ginc-rep__foto`}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`p`,{className:`ginc-rep__nombre`,children:`Pilar Suarez`}),(0,A.jsx)(`p`,{className:`ginc-rep__zona`,children:`Toluca`}),(0,A.jsx)(`p`,{className:`ginc-rep__email`,children:`✉ Minar Inn`})]})]})}),(0,A.jsxs)(`td`,{children:[(0,A.jsx)(`p`,{className:`ginc-problema`,children:`Paquete dañado`}),(0,A.jsx)(`p`,{className:`ginc-problema-hora`,children:`4:45 PM`})]}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`ginc-estado ginc-estado--resuelto`,children:`✔ Resuelto`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`button`,{className:`ginc-ver-btn`,children:`📋 Ver detalle`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`ginc-guia`,children:`MX967654321`})}),(0,A.jsx)(`td`,{children:(0,A.jsxs)(`div`,{className:`ginc-rep`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Laura Gómez`,className:`ginc-rep__foto`}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`p`,{className:`ginc-rep__nombre`,children:`Laura Gómez`}),(0,A.jsx)(`p`,{className:`ginc-rep__zona`,children:`Del Valle`})]})]})}),(0,A.jsxs)(`td`,{children:[(0,A.jsx)(`p`,{className:`ginc-problema`,children:`Retraso logístico`}),(0,A.jsx)(`p`,{className:`ginc-problema-hora`,children:`1:10 PM`})]}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`ginc-estado ginc-estado--pendiente`,children:`✔ Pendiente`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`button`,{className:`ginc-ver-btn`,children:`📋 Ver detalle`})})]})]})]})]}),(0,A.jsxs)(`div`,{className:`ginc-paginacion`,children:[(0,A.jsx)(`span`,{className:`ginc-paginacion__info`,children:`Mostrando 5 de 122 incidencias`}),(0,A.jsxs)(`div`,{className:`ginc-paginacion__paginas`,children:[(0,A.jsx)(`button`,{className:`ginc-pag-btn`,children:`<`}),(0,A.jsx)(`button`,{className:`ginc-pag-btn ginc-pag-btn--activo`,children:`1`}),(0,A.jsx)(`button`,{className:`ginc-pag-btn`,children:`2`}),(0,A.jsx)(`button`,{className:`ginc-pag-btn`,children:`3`}),(0,A.jsx)(`button`,{className:`ginc-pag-btn`,children:`4`}),(0,A.jsx)(`button`,{className:`ginc-pag-btn`,children:`5`}),(0,A.jsx)(`button`,{className:`ginc-pag-btn`,children:`>`}),(0,A.jsx)(`button`,{className:`ginc-pag-btn`,children:`>`}),(0,A.jsx)(`button`,{className:`ginc-pag-btn`,children:`>`})]})]})]})]})]})}function cr(){return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(`style`,{children:`
    /* ── Contenido Mi Cuenta ── */
    .perfil-contenedor {
      display: flex;
      justify-content: center;
      padding: 40px 20px;
    }
    .perfil-card {
      background: rgba(220,230,245,0.75);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      width: min(520px, 100%);
      padding: 36px 40px 32px;
      position: relative;
      box-shadow: 0 12px 40px rgba(30,54,96,0.18);
      border: 1px solid rgba(255,255,255,0.3);
    }
    .perfil-card__cerrar {
      position: absolute;
      top: 16px;
      right: 18px;
      background: none;
      border: none;
      font-size: 28px;
      color: #4c5880;
      cursor: pointer;
      line-height: 1;
      text-decoration: none;
    }
    .perfil-card__cerrar:hover { color: #1a2d50; }

    /* Avatar */
    .perfil-avatar-wrap {
      text-align: center;
      margin-bottom: 14px;
    }
    .perfil-avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid rgba(255,255,255,0.6);
      box-shadow: 0 4px 20px rgba(30,54,96,0.2);
    }
    .perfil-nombre {
      text-align: center;
      margin: 0 0 2px;
      font-size: 24px;
      font-weight: 700;
      color: #1a2d50;
    }
    .perfil-rol {
      text-align: center;
      font-size: 14px;
      color: #4c5880;
      margin: 0 0 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .perfil-rol__dot {
      width: 10px;
      height: 10px;
      background: #4caf50;
      border-radius: 50%;
      display: inline-block;
    }

    /* Info datos */
    .perfil-datos {
      margin-bottom: 20px;
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }
    .perfil-datos__left {
      flex: 1;
      min-width: 220px;
    }
    .perfil-datos__right {
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: flex-end;
    }
    .perfil-dato {
      margin: 0 0 8px;
      font-size: 15px;
      color: #2b3552;
    }
    .perfil-dato strong {
      color: #3b6aaa;
      font-weight: 700;
    }
    .perfil-dato .perfil-dato__pin {
      color: #e53935;
    }

    /* Botones editar / cambiar */
    .perfil-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 9px 18px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid #d8e0f0;
      background: rgba(255,255,255,0.7);
      color: #3b6aaa;
      transition: background 0.2s;
    }
    .perfil-btn:hover {
      background: rgba(255,255,255,0.95);
    }
    .perfil-btn__icon {
      font-size: 16px;
    }

    /* Formulario contraseñas */
    .perfil-form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 18px;
    }
    .perfil-input-row {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(255,255,255,0.55);
      border: 1px solid rgba(200,210,230,0.5);
      border-radius: 8px;
      padding: 10px 14px;
    }
    .perfil-input-row label {
      font-size: 13px;
      color: #4c5880;
      min-width: 160px;
      flex-shrink: 0;
    }
    .perfil-input-row input {
      flex: 1;
      border: none;
      background: transparent;
      font-size: 14px;
      color: #2b3552;
      outline: none;
    }

    /* Botón guardar */
    .perfil-guardar {
      display: block;
      margin: 0 auto;
      background: linear-gradient(180deg, #f2c44e 0%, #d4a235 100%);
      color: #fff;
      border: none;
      padding: 12px 40px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.2s;
    }
    .perfil-guardar:hover {
      background: linear-gradient(180deg, #d4a235 0%, #f2c44e 100%);
    }

    @media (max-width: 540px) {
      .perfil-card { padding: 24px 20px; }
      .perfil-datos { flex-direction: column; }
      .perfil-datos__right { align-items: stretch; }
      .perfil-input-row { flex-direction: column; align-items: flex-start; }
      .perfil-input-row label { min-width: auto; }
    }
  `}),(0,A.jsxs)(`div`,{className:`tablero-operador tablero-operador--sin-sidebar`,children:[(0,A.jsx)(`div`,{id:`menuContainer`,className:`menu-overlay`}),(0,A.jsx)(`div`,{id:`menuBackdrop`,className:`menu-overlay__backdrop`}),(0,A.jsxs)(`main`,{className:`panel-principal panel-principal--full`,children:[(0,A.jsxs)(`header`,{className:`barra-superior barra-superior--con-logo`,children:[(0,A.jsxs)(`div`,{className:`barra-superior__left`,children:[(0,A.jsx)(`button`,{id:`btnMenu`,className:`btn-menu-hamburguesa`,"aria-label":`Abrir menú`,children:(0,A.jsxs)(`svg`,{width:`26`,height:`26`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,children:[(0,A.jsx)(`line`,{x1:`3`,y1:`6`,x2:`21`,y2:`6`}),(0,A.jsx)(`line`,{x1:`3`,y1:`12`,x2:`21`,y2:`12`}),(0,A.jsx)(`line`,{x1:`3`,y1:`18`,x2:`21`,y2:`18`})]})}),(0,A.jsx)(`div`,{className:`header-logo`,children:(0,A.jsx)(`img`,{src:`/piWeb/images/logoSinFondo.png`,alt:`Metzvia`})}),(0,A.jsx)(`h1`,{className:`barra-superior__titulo`,children:`Supervisor`})]}),(0,A.jsxs)(`div`,{className:`barra-superior__perfil`,children:[(0,A.jsxs)(`span`,{className:`badge-servicio`,children:[(0,A.jsx)(`span`,{className:`header-sv__punto-verde`}),` En servicio`]}),(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Supervisor`,className:`barra-superior__avatar`}),(0,A.jsx)(`span`,{className:`barra-superior__chevron`,children:`▾`})]})]}),(0,A.jsx)(`section`,{className:`perfil-contenedor`,children:(0,A.jsxs)(`div`,{className:`perfil-card`,children:[(0,A.jsx)(`a`,{href:`/piWeb/src/pages/supervisor/dashboardSupervisor.html`,className:`perfil-card__cerrar`,children:`×`}),(0,A.jsx)(`div`,{className:`perfil-avatar-wrap`,children:(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Roberto Salazar`,className:`perfil-avatar`})}),(0,A.jsx)(`h2`,{className:`perfil-nombre`,children:`Roberto Salazar`}),(0,A.jsxs)(`p`,{className:`perfil-rol`,children:[(0,A.jsx)(`span`,{className:`perfil-rol__dot`}),` Supervisor`]}),(0,A.jsxs)(`div`,{className:`perfil-datos`,children:[(0,A.jsxs)(`div`,{className:`perfil-datos__left`,children:[(0,A.jsxs)(`p`,{className:`perfil-dato`,children:[(0,A.jsx)(`strong`,{children:`Trabajo:`}),` Supervisor`]}),(0,A.jsxs)(`p`,{className:`perfil-dato`,children:[(0,A.jsx)(`strong`,{children:`Zona asignada:`}),` `,(0,A.jsx)(`span`,{className:`perfil-dato__pin`,children:`📍`}),` Centro`]}),(0,A.jsxs)(`p`,{className:`perfil-dato`,children:[(0,A.jsx)(`strong`,{children:`Correo:`}),` roberto.salazar@metzvia.com`]}),(0,A.jsxs)(`p`,{className:`perfil-dato`,children:[(0,A.jsx)(`strong`,{children:`Teléfono:`}),` +32 55 1234 5678`]})]}),(0,A.jsxs)(`div`,{className:`perfil-datos__right`,children:[(0,A.jsxs)(`button`,{className:`perfil-btn`,children:[(0,A.jsx)(`span`,{className:`perfil-btn__icon`,children:`✎`}),` Editar perfil`]}),(0,A.jsxs)(`button`,{className:`perfil-btn`,children:[(0,A.jsx)(`span`,{className:`perfil-btn__icon`,children:`🔒`}),` Cambiar contraseña`]})]})]}),(0,A.jsxs)(`div`,{className:`perfil-form`,children:[(0,A.jsxs)(`div`,{className:`perfil-input-row`,children:[(0,A.jsx)(`label`,{children:`Contraseña Actual`}),(0,A.jsx)(`input`,{type:`password`})]}),(0,A.jsxs)(`div`,{className:`perfil-input-row`,children:[(0,A.jsx)(`label`,{children:`Nueva Contraseña`}),(0,A.jsx)(`input`,{type:`password`})]}),(0,A.jsxs)(`div`,{className:`perfil-input-row`,children:[(0,A.jsx)(`label`,{children:`Confirmar Contraseña`}),(0,A.jsx)(`input`,{type:`password`})]})]}),(0,A.jsx)(`button`,{className:`perfil-guardar`,children:`Guardar Cambios`})]})})]})]})]})}function lr(){return(0,A.jsxs)(`div`,{className:`tablero-operador tablero-operador--sin-sidebar`,children:[(0,A.jsx)(`div`,{id:`menuContainer`,className:`menu-overlay`}),(0,A.jsx)(`div`,{id:`menuBackdrop`,className:`menu-overlay__backdrop`}),(0,A.jsxs)(`main`,{className:`panel-principal panel-principal--full`,children:[(0,A.jsxs)(`header`,{className:`barra-superior barra-superior--con-logo`,children:[(0,A.jsxs)(`div`,{className:`barra-superior__left`,children:[(0,A.jsx)(`button`,{id:`btnMenu`,className:`btn-menu-hamburguesa`,"aria-label":`Abrir menú`,children:(0,A.jsxs)(`svg`,{width:`26`,height:`26`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,children:[(0,A.jsx)(`line`,{x1:`3`,y1:`6`,x2:`21`,y2:`6`}),(0,A.jsx)(`line`,{x1:`3`,y1:`12`,x2:`21`,y2:`12`}),(0,A.jsx)(`line`,{x1:`3`,y1:`18`,x2:`21`,y2:`18`})]})}),(0,A.jsx)(`div`,{className:`header-logo`,children:(0,A.jsx)(`img`,{src:`/piWeb/images/logoSinFondo.png`,alt:`Metzvia`})}),(0,A.jsx)(`h1`,{className:`barra-superior__titulo`,children:`Supervisor`})]}),(0,A.jsxs)(`div`,{className:`barra-superior__perfil`,children:[(0,A.jsxs)(`span`,{className:`badge-servicio`,children:[(0,A.jsx)(`span`,{className:`header-sv__punto-verde`}),` En servicio`]}),(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Supervisor`,className:`barra-superior__avatar`}),(0,A.jsx)(`span`,{className:`barra-superior__chevron`,children:`▾`})]})]}),(0,A.jsxs)(`div`,{className:`rep-header`,children:[(0,A.jsx)(`h2`,{className:`rep-header__titulo`,children:`Reportes`}),(0,A.jsxs)(`div`,{className:`rep-header__controles`,children:[(0,A.jsxs)(`button`,{className:`rep-header__fecha`,children:[`📅 15 – 21 Abr, 2024 `,(0,A.jsx)(`span`,{children:`⌄`})]}),(0,A.jsx)(`button`,{className:`rep-header__exportar`,children:`📄 Exportar PDF`}),(0,A.jsx)(`button`,{className:`rep-header__flecha`,children:`↑`})]})]}),(0,A.jsxs)(`section`,{className:`rep-resumen`,children:[(0,A.jsxs)(`article`,{className:`rep-card rep-card--azul`,children:[(0,A.jsx)(`span`,{className:`rep-card__icono`,children:`📦`}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`p`,{className:`rep-card__numero`,children:`1,152`}),(0,A.jsx)(`p`,{className:`rep-card__label`,children:`Entregas Totales`})]})]}),(0,A.jsxs)(`article`,{className:`rep-card rep-card--verde`,children:[(0,A.jsx)(`span`,{className:`rep-card__icono`,children:`✔`}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`p`,{className:`rep-card__numero`,children:`1,050`}),(0,A.jsx)(`p`,{className:`rep-card__label`,children:`Entregas Completadas`})]})]}),(0,A.jsxs)(`article`,{className:`rep-card rep-card--rojo`,children:[(0,A.jsx)(`span`,{className:`rep-card__icono`,children:`▲`}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`p`,{className:`rep-card__numero`,children:`84`}),(0,A.jsx)(`p`,{className:`rep-card__label`,children:`Entregas Retrasadas`})]})]}),(0,A.jsxs)(`article`,{className:`rep-card rep-card--amarillo`,children:[(0,A.jsx)(`span`,{className:`rep-card__icono`,children:`💬`}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`p`,{className:`rep-card__numero`,children:`34`}),(0,A.jsx)(`p`,{className:`rep-card__label`,children:`Incidencias Registradas`})]})]}),(0,A.jsxs)(`article`,{className:`rep-card rep-card--gris`,children:[(0,A.jsx)(`span`,{className:`rep-card__icono`,children:`⏱`}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`p`,{className:`rep-card__numero`,children:`39 min`}),(0,A.jsx)(`p`,{className:`rep-card__label`,children:`Nivel de cumplimiento`}),(0,A.jsx)(`div`,{className:`rep-card__stars`,children:`★★★★☆`})]})]})]}),(0,A.jsxs)(`section`,{className:`rep-grid-top`,children:[(0,A.jsxs)(`div`,{className:`rep-panel`,children:[(0,A.jsxs)(`div`,{className:`rep-panel__header`,children:[(0,A.jsx)(`h3`,{children:`Entregas por Día`}),(0,A.jsx)(`button`,{className:`rep-panel__more`,children:`⋯`})]}),(0,A.jsxs)(`div`,{className:`rep-entregas-dia`,children:[(0,A.jsxs)(`div`,{className:`rep-barras`,children:[(0,A.jsxs)(`div`,{className:`rep-barra-row`,children:[(0,A.jsx)(`span`,{className:`rep-barra-row__label`,children:`Lunes`}),(0,A.jsxs)(`div`,{className:`rep-barra-row__track`,children:[(0,A.jsx)(`div`,{className:`rep-barra-row__fill rep-barra-row__fill--entregado`,style:{width:`70%`}}),(0,A.jsx)(`div`,{className:`rep-barra-row__fill rep-barra-row__fill--enruta`,style:{width:`12%`}})]})]}),(0,A.jsxs)(`div`,{className:`rep-barra-row`,children:[(0,A.jsx)(`span`,{className:`rep-barra-row__label`,children:`Martes`}),(0,A.jsxs)(`div`,{className:`rep-barra-row__track`,children:[(0,A.jsx)(`div`,{className:`rep-barra-row__fill rep-barra-row__fill--entregado`,style:{width:`85%`}}),(0,A.jsx)(`div`,{className:`rep-barra-row__fill rep-barra-row__fill--enruta`,style:{width:`10%`}})]})]}),(0,A.jsxs)(`div`,{className:`rep-barra-row`,children:[(0,A.jsx)(`span`,{className:`rep-barra-row__label`,children:`Martes`}),(0,A.jsxs)(`div`,{className:`rep-barra-row__track`,children:[(0,A.jsx)(`div`,{className:`rep-barra-row__fill rep-barra-row__fill--entregado`,style:{width:`60%`}}),(0,A.jsx)(`div`,{className:`rep-barra-row__fill rep-barra-row__fill--enruta`,style:{width:`15%`}})]})]}),(0,A.jsxs)(`div`,{className:`rep-barra-row`,children:[(0,A.jsx)(`span`,{className:`rep-barra-row__label`,children:`Jues`}),(0,A.jsxs)(`div`,{className:`rep-barra-row__track`,children:[(0,A.jsx)(`div`,{className:`rep-barra-row__fill rep-barra-row__fill--entregado`,style:{width:`75%`}}),(0,A.jsx)(`div`,{className:`rep-barra-row__fill rep-barra-row__fill--enruta`,style:{width:`8%`}})]})]}),(0,A.jsxs)(`div`,{className:`rep-barra-row`,children:[(0,A.jsx)(`span`,{className:`rep-barra-row__label`,children:`Viern`}),(0,A.jsxs)(`div`,{className:`rep-barra-row__track`,children:[(0,A.jsx)(`div`,{className:`rep-barra-row__fill rep-barra-row__fill--entregado`,style:{width:`90%`}}),(0,A.jsx)(`div`,{className:`rep-barra-row__fill rep-barra-row__fill--enruta`,style:{width:`5%`}})]})]}),(0,A.jsxs)(`div`,{className:`rep-barra-row`,children:[(0,A.jsx)(`span`,{className:`rep-barra-row__label`,children:`Sab`}),(0,A.jsxs)(`div`,{className:`rep-barra-row__track`,children:[(0,A.jsx)(`div`,{className:`rep-barra-row__fill rep-barra-row__fill--entregado`,style:{width:`50%`}}),(0,A.jsx)(`div`,{className:`rep-barra-row__fill rep-barra-row__fill--enruta`,style:{width:`10%`}})]})]}),(0,A.jsxs)(`div`,{className:`rep-barra-row`,children:[(0,A.jsx)(`span`,{className:`rep-barra-row__label`,children:`Dom`}),(0,A.jsxs)(`div`,{className:`rep-barra-row__track`,children:[(0,A.jsx)(`div`,{className:`rep-barra-row__fill rep-barra-row__fill--entregado`,style:{width:`30%`}}),(0,A.jsx)(`div`,{className:`rep-barra-row__fill rep-barra-row__fill--enruta`,style:{width:`10%`}})]})]})]}),(0,A.jsxs)(`div`,{className:`rep-donut-wrap`,children:[(0,A.jsx)(`div`,{className:`rep-donut`,children:(0,A.jsxs)(`svg`,{viewBox:`0 0 36 36`,className:`rep-donut__svg`,children:[(0,A.jsx)(`circle`,{cx:`18`,cy:`18`,r:`15.9`,fill:`none`,stroke:`#e8ecf4`,strokeWidth:`3.5`}),(0,A.jsx)(`circle`,{cx:`18`,cy:`18`,r:`15.9`,fill:`none`,stroke:`#3b6aaa`,strokeWidth:`3.5`,strokeDasharray:`70 30`,strokeDashoffset:`25`}),(0,A.jsx)(`circle`,{cx:`18`,cy:`18`,r:`15.9`,fill:`none`,stroke:`#4caf50`,strokeWidth:`3.5`,strokeDasharray:`12 88`,strokeDashoffset:`55`}),(0,A.jsx)(`circle`,{cx:`18`,cy:`18`,r:`15.9`,fill:`none`,stroke:`#f2c44e`,strokeWidth:`3.5`,strokeDasharray:`9 91`,strokeDashoffset:`43`})]})}),(0,A.jsxs)(`div`,{className:`rep-donut-legend`,children:[(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`span`,{className:`rep-donut-legend__val`,children:`70%`}),` Entregado`]}),(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`span`,{className:`rep-donut-legend__val`,children:`12%`}),` En ruta`]}),(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`span`,{className:`rep-donut-legend__val`,children:`9%`}),` Retrasado`]})]})]})]}),(0,A.jsxs)(`div`,{className:`rep-panel__footer`,children:[(0,A.jsxs)(`span`,{className:`rep-leyenda`,children:[(0,A.jsx)(`span`,{className:`rep-leyenda__dot rep-leyenda__dot--azul`}),` Entregado`]}),(0,A.jsxs)(`span`,{className:`rep-leyenda`,children:[(0,A.jsx)(`span`,{className:`rep-leyenda__dot rep-leyenda__dot--verde`}),` En ruta`]})]}),(0,A.jsx)(`p`,{className:`rep-panel__promedio`,children:`Promedio: 165 entregas`})]}),(0,A.jsxs)(`div`,{className:`rep-panel`,children:[(0,A.jsxs)(`div`,{className:`rep-panel__header`,children:[(0,A.jsx)(`h3`,{children:`Rendimiento por Repartidor`}),(0,A.jsx)(`button`,{className:`rep-panel__more`,children:`⋯`})]}),(0,A.jsxs)(`table`,{className:`rep-tabla-rendimiento`,children:[(0,A.jsx)(`thead`,{children:(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`th`,{children:`Repartidor`}),(0,A.jsx)(`th`,{children:`Entregas completadas`}),(0,A.jsx)(`th`,{children:`Tiempo promedio`}),(0,A.jsx)(`th`,{children:`Estado`})]})}),(0,A.jsxs)(`tbody`,{children:[(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:`Luis Garcia`}),(0,A.jsxs)(`td`,{children:[(0,A.jsx)(`span`,{className:`rep-rend__num`,children:`232`}),(0,A.jsx)(`div`,{className:`rep-rend__bar`,children:(0,A.jsx)(`div`,{className:`rep-rend__fill`,style:{width:`95%`,background:`#4caf50`}})})]}),(0,A.jsx)(`td`,{children:`4 h 12 min`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`rep-rend__estado rep-rend__estado--ok`,children:`✔`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:`Javier Torres`}),(0,A.jsxs)(`td`,{children:[(0,A.jsx)(`span`,{className:`rep-rend__num`,children:`189`}),(0,A.jsx)(`div`,{className:`rep-rend__bar`,children:(0,A.jsx)(`div`,{className:`rep-rend__fill`,style:{width:`78%`,background:`#4caf50`}})})]}),(0,A.jsx)(`td`,{children:`4 h 45 min`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`rep-rend__estado rep-rend__estado--ok`,children:`✔`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:`Ricardo Muñoz`}),(0,A.jsxs)(`td`,{children:[(0,A.jsx)(`span`,{className:`rep-rend__num`,children:`156`}),(0,A.jsx)(`div`,{className:`rep-rend__bar`,children:(0,A.jsx)(`div`,{className:`rep-rend__fill`,style:{width:`64%`,background:`#4caf50`}})})]}),(0,A.jsx)(`td`,{children:`5 h 20 min`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`rep-rend__estado rep-rend__estado--warn`,children:`●`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:`Jorge Medina`}),(0,A.jsxs)(`td`,{children:[(0,A.jsx)(`span`,{className:`rep-rend__num`,children:`134`}),(0,A.jsx)(`div`,{className:`rep-rend__bar`,children:(0,A.jsx)(`div`,{className:`rep-rend__fill`,style:{width:`55%`,background:`#f2c44e`}})})]}),(0,A.jsx)(`td`,{children:`4 h 05 min`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`rep-rend__estado rep-rend__estado--warn`,children:`●`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:`Jose Herrera`}),(0,A.jsxs)(`td`,{children:[(0,A.jsx)(`span`,{className:`rep-rend__num`,children:`98`}),(0,A.jsx)(`div`,{className:`rep-rend__bar`,children:(0,A.jsx)(`div`,{className:`rep-rend__fill`,style:{width:`40%`,background:`#f2c44e`}})})]}),(0,A.jsx)(`td`,{children:`4 h 30 min`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`rep-rend__estado rep-rend__estado--warn`,children:`●`})})]})]})]})]})]}),(0,A.jsxs)(`section`,{className:`rep-grid-bottom`,children:[(0,A.jsxs)(`div`,{className:`rep-panel`,children:[(0,A.jsxs)(`div`,{className:`rep-panel__header`,children:[(0,A.jsx)(`h3`,{children:`Estados de Envíos`}),(0,A.jsx)(`button`,{className:`rep-panel__more`,children:`⋯`})]}),(0,A.jsxs)(`div`,{className:`rep-estados`,children:[(0,A.jsxs)(`div`,{className:`rep-estados__donut`,children:[(0,A.jsxs)(`svg`,{viewBox:`0 0 36 36`,className:`rep-donut__svg rep-donut__svg--grande`,children:[(0,A.jsx)(`circle`,{cx:`18`,cy:`18`,r:`13`,fill:`none`,stroke:`#e8ecf4`,strokeWidth:`5`}),(0,A.jsx)(`circle`,{cx:`18`,cy:`18`,r:`13`,fill:`none`,stroke:`#4caf50`,strokeWidth:`5`,strokeDasharray:`50 50`,strokeDashoffset:`25`}),(0,A.jsx)(`circle`,{cx:`18`,cy:`18`,r:`13`,fill:`none`,stroke:`#3b6aaa`,strokeWidth:`5`,strokeDasharray:`20 80`,strokeDashoffset:`75`}),(0,A.jsx)(`circle`,{cx:`18`,cy:`18`,r:`13`,fill:`none`,stroke:`#e53935`,strokeWidth:`5`,strokeDasharray:`15 85`,strokeDashoffset:`55`}),(0,A.jsx)(`circle`,{cx:`18`,cy:`18`,r:`13`,fill:`none`,stroke:`#f2c44e`,strokeWidth:`5`,strokeDasharray:`10 90`,strokeDashoffset:`40`})]}),(0,A.jsxs)(`div`,{className:`rep-estados__centro`,children:[(0,A.jsx)(`span`,{className:`rep-estados__total`,children:`100+`}),(0,A.jsx)(`span`,{className:`rep-estados__sub`,children:`Entregas`})]})]}),(0,A.jsxs)(`div`,{className:`rep-estados__leyenda`,children:[(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`span`,{className:`rep-leyenda__dot rep-leyenda__dot--verde-check`}),` Entregado`]}),(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`span`,{className:`rep-leyenda__dot rep-leyenda__dot--azul`}),` En ruta`]}),(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`span`,{className:`rep-leyenda__dot rep-leyenda__dot--rojo`}),` Retrasado`]}),(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`span`,{className:`rep-leyenda__dot rep-leyenda__dot--amarillo-inc`}),` Incidencia`]})]})]}),(0,A.jsx)(`p`,{className:`rep-panel__promedio`,children:`Promedio: 165 entregas`}),(0,A.jsxs)(`table`,{className:`rep-tabla-mini`,children:[(0,A.jsx)(`thead`,{children:(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`th`,{children:`Guía`}),(0,A.jsx)(`th`,{children:`Cliente`}),(0,A.jsx)(`th`,{children:`Repartidor`}),(0,A.jsx)(`th`,{children:`Entrega completada`})]})}),(0,A.jsxs)(`tbody`,{children:[(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:`PAK12345789`}),(0,A.jsx)(`td`,{children:`Ana Martinez`}),(0,A.jsx)(`td`,{children:`Luis Garcia`}),(0,A.jsxs)(`td`,{children:[`10 Abr 2024, ra `,(0,A.jsx)(`span`,{className:`rep-badge rep-badge--selccion`,children:`Selcción`})]})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:`MX267584321`}),(0,A.jsx)(`td`,{children:`Carlos Ramirez`}),(0,A.jsx)(`td`,{children:`Javier Torres`}),(0,A.jsxs)(`td`,{children:[`10 Abr 2024, `,(0,A.jsx)(`span`,{className:`rep-badge rep-badge--gestion`,children:`Gestión`})]})]})]})]})]}),(0,A.jsxs)(`div`,{className:`rep-panel`,children:[(0,A.jsx)(`div`,{className:`rep-panel__header`,children:(0,A.jsx)(`h3`,{children:`Rendimiento por Repartidor`})}),(0,A.jsxs)(`table`,{className:`rep-tabla-detalle`,children:[(0,A.jsx)(`thead`,{children:(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`th`,{children:`Guía`}),(0,A.jsx)(`th`,{children:`Cliente`}),(0,A.jsx)(`th`,{children:`Repartidor`}),(0,A.jsx)(`th`,{children:`Entrega completada`}),(0,A.jsx)(`th`,{children:`Tiempo de entrega`}),(0,A.jsx)(`th`,{children:`Estado`})]})}),(0,A.jsxs)(`tbody`,{children:[(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:`PAK12345789`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`Ana Martinez`})}),(0,A.jsx)(`td`,{children:`Luis Garcia`}),(0,A.jsx)(`td`,{children:`10 Abr 2024, 10:43 am`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`45 min`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`rep-badge rep-badge--entregado`,children:`Entregado`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:`MX267584321`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`Carlos Ramirez`})}),(0,A.jsx)(`td`,{children:`Javier Torres`}),(0,A.jsx)(`td`,{children:`10 Abr 2024, 12:38 pm`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`36 min`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`rep-badge rep-badge--retrasado`,children:`Retrasado`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:`PAK987694321`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`Laura Gómez`})}),(0,A.jsx)(`td`,{children:`Ricardo Muñoz`}),(0,A.jsx)(`td`,{children:`10 Abr 2024, 1:40 am`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`2 horas 40 min`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`rep-badge rep-badge--selccion`,children:`Selción`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:`MX247360210`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`Sofia Lozano`})}),(0,A.jsx)(`td`,{children:`Luis Garcia`}),(0,A.jsx)(`td`,{children:`10 Abr 2024, 1:52 pm`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`52 min`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`rep-badge rep-badge--retrasado`,children:`Retrasado`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:`MX266495201`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`Pedro Sanchez`})}),(0,A.jsx)(`td`,{children:`Javier Torres`}),(0,A.jsx)(`td`,{children:`10 Abr 2024, 2:22 pm`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`strong`,{children:`1 hr 20 min`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`span`,{className:`rep-badge rep-badge--pendiente`,children:`Pendiente`})})]})]})]}),(0,A.jsxs)(`div`,{className:`rep-filtros-bottom`,children:[(0,A.jsxs)(`button`,{className:`rep-filtro-btn`,children:[`Filtro `,(0,A.jsx)(`span`,{children:`⌄`})]}),(0,A.jsxs)(`button`,{className:`rep-filtro-btn`,children:[`Zona – `,(0,A.jsx)(`span`,{children:`⌄`})]}),(0,A.jsxs)(`button`,{className:`rep-filtro-btn`,children:[`Estado `,(0,A.jsx)(`span`,{children:`⌄`})]}),(0,A.jsx)(`input`,{type:`text`,className:`rep-filtro-search`,placeholder:`Buscar...`}),(0,A.jsx)(`button`,{className:`rep-filtro-btn rep-filtro-btn--primary`,children:`Ver detalle`})]})]})]})]})]})}function ur(){return(0,x.useEffect)(()=>{(function(){var e=L.map(`rutaMapa`,{zoomControl:!1}).setView([19.4326,-99.1332],14);L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{attribution:`&copy; OpenStreetMap contributors`,maxZoom:19}).addTo(e);var t=L.divIcon({className:``,html:`<div style="background:#3b6aaa;color:#fff;border-radius:8px;padding:4px 8px;font-size:13px;font-weight:700;white-space:nowrap;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.2);">&#9642; Almacén</div>`,iconSize:[80,30],iconAnchor:[40,15]});function n(e,t){return L.divIcon({className:``,html:`<div style="background:`+t+`;color:#fff;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.25);">`+e+`</div>`,iconSize:[30,30],iconAnchor:[15,15]})}var r=L.divIcon({className:``,html:`<div style="background:#f5a623;color:#fff;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:16px;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);">&#128666;</div>`,iconSize:[32,32],iconAnchor:[16,16]}),i=[19.428,-99.148],a=[{coord:[19.423,-99.14],nombre:`Ana García`,color:`#3b6aaa`},{coord:[19.426,-99.135],nombre:`Carlos Ramírez`,color:`#3b6aaa`},{coord:[19.431,-99.13],nombre:`Laura Gómez`,color:`#3b6aaa`},{coord:[19.438,-99.125],nombre:`Jorge Sánchez`,color:`#f5a623`},{coord:[19.442,-99.12],nombre:`Pilar Suárez`,color:`#3b6aaa`}];L.marker(i,{icon:t}).addTo(e).bindPopup(`<strong>Almacén Central</strong><br>Punto de salida`),a.forEach(function(t,r){L.marker(t.coord,{icon:n(r+1,t.color)}).addTo(e).bindPopup(`<strong>`+t.nombre+`</strong>`)}),L.marker([19.426,-99.137],{icon:r}).addTo(e).bindPopup(`<strong>Luis García</strong><br>Repartidor en ruta`);var o=[i].concat(a.map(function(e){return e.coord}));L.polyline(o,{color:`#3b6aaa`,weight:4,opacity:.8,dashArray:`8, 6`}).addTo(e);var s=L.latLngBounds(o);e.fitBounds(s,{padding:[40,40]});var c=setInterval(function(){console.log(`Actualizando posición del repartidor...`)},3e4);window.addEventListener(`beforeunload`,function(){clearInterval(c)})})(),(function(){var e=document.querySelectorAll(`.ruta-tab`);e.forEach(function(t){t.addEventListener(`click`,function(){e.forEach(function(e){e.classList.remove(`ruta-tab--activo`)}),t.classList.add(`ruta-tab--activo`)})})})()},[]),(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(`style`,{children:`
    /* ── Ruta del Repartidor ── */
    .ruta-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 20px 0 18px;
    }
    .ruta-header__titulo {
      font-size: 26px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0;
    }
    .ruta-header__volver {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 18px;
      border-radius: 10px;
      border: 1px solid #d0d8e8;
      background: rgba(255,255,255,0.85);
      font-size: 14px;
      font-weight: 600;
      color: #3b5585;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.2s;
    }
    .ruta-header__volver:hover { background: #fff; }

    /* Layout principal */
    .ruta-layout {
      display: grid;
      grid-template-columns: 1fr 360px;
      gap: 18px;
      min-height: 520px;
    }

    /* Panel izquierdo */
    .ruta-panel-izq {
      display: flex;
      flex-direction: column;
      gap: 0;
      background: rgba(220,230,250,0.35);
      border: 1px solid rgba(200,215,240,0.45);
      border-radius: 16px;
      overflow: hidden;
    }

    /* Info del repartidor */
    .ruta-driver {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 18px 22px 14px;
      background: rgba(230,237,250,0.55);
      border-bottom: 1px solid rgba(200,215,240,0.35);
      flex-wrap: wrap;
    }
    .ruta-driver__foto {
      width: 64px;
      height: 64px;
      border-radius: 12px;
      object-fit: cover;
      border: 2px solid rgba(200,215,240,0.5);
    }
    .ruta-driver__info {
      flex: 1;
      min-width: 180px;
    }
    .ruta-driver__nombre {
      font-size: 20px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0 0 4px;
    }
    .ruta-driver__zona-text {
      font-size: 14px;
      color: #5a6d8a;
      margin: 0 0 8px;
    }
    .ruta-driver__badges {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .ruta-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      color: #fff;
    }
    .ruta-badge--zona { background: #3b6aaa; }
    .ruta-badge--vehiculo { background: #4a6fa5; }
    .ruta-badge--vehiculo::before { content: "🚐 "; }

    .ruta-driver__estado {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 4px;
    }
    .ruta-estado-label {
      font-size: 13px;
      color: #5a6d8a;
    }
    .ruta-estado-valor {
      font-size: 15px;
      font-weight: 700;
      color: #43a047;
    }
    .ruta-estado-valor::before {
      content: "";
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #43a047;
      margin-right: 6px;
    }

    /* Mapa */
    .ruta-mapa-wrap {
      position: relative;
      flex: 1;
      min-height: 320px;
    }
    #rutaMapa {
      width: 100%;
      height: 100%;
      min-height: 320px;
      z-index: 1;
    }
    .ruta-mapa__zoom {
      position: absolute;
      right: 14px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 4px;
      z-index: 500;
    }
    .ruta-mapa__zoom-btn {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      border: 1px solid #d0d8e8;
      background: rgba(255,255,255,0.92);
      font-size: 20px;
      font-weight: 700;
      color: #3b5585;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }
    .ruta-mapa__zoom-btn:hover { background: #fff; }

    /* Panel entregas sobre el mapa */
    .ruta-entregas-mapa {
      position: absolute;
      bottom: 14px;
      left: 14px;
      right: 60px;
      background: rgba(255,255,255,0.95);
      border: 1px solid rgba(200,215,240,0.5);
      border-radius: 14px;
      padding: 14px 18px 12px;
      z-index: 500;
      backdrop-filter: blur(6px);
    }
    .ruta-entregas-mapa__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .ruta-entregas-mapa__titulo {
      font-size: 16px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0;
    }
    .ruta-entregas-mapa__meta {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .ruta-tiempo {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 13px;
      color: #5a6d8a;
      font-weight: 600;
    }
    .ruta-tiempo__icono { font-size: 16px; }
    .ruta-entregas-mapa__more {
      border: none;
      background: none;
      font-size: 20px;
      color: #5a6d8a;
      cursor: pointer;
      letter-spacing: 2px;
    }

    .ruta-entregas-mapa__tabla {
      width: 100%;
      border-collapse: collapse;
    }
    .ruta-entregas-mapa__tabla th {
      text-align: left;
      font-size: 13px;
      font-weight: 600;
      color: #8899b4;
      padding: 4px 8px 8px;
      border-bottom: 1px solid #e4eaf4;
    }
    .ruta-entregas-mapa__tabla td {
      font-size: 14px;
      color: #2b3552;
      padding: 8px;
      vertical-align: middle;
    }
    .ruta-entregas-mapa__tabla .td-icono {
      width: 30px;
      text-align: center;
      color: #3b6aaa;
      font-size: 18px;
    }
    .ruta-entregas-mapa__tabla .td-guia {
      font-size: 12px;
      color: #8899b4;
    }
    .ruta-entregas-mapa__tabla .td-nombre {
      font-weight: 600;
    }

    /* Badges estado entrega */
    .entrega-estado {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 14px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 700;
      color: #fff;
      white-space: nowrap;
    }
    .entrega-estado--enruta { background: #43a047; }
    .entrega-estado--pendiente { background: #f5a623; }
    .entrega-estado--completada { background: #3b6aaa; }
    .entrega-estado__dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #fff;
    }
    .entrega-estado__flecha { font-size: 14px; }

    /* ── Panel derecho: lista entregas ── */
    .ruta-panel-der {
      background: rgba(230,237,250,0.5);
      border: 1px solid rgba(200,215,240,0.45);
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .ruta-lista__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 18px 0;
    }
    .ruta-lista__titulo {
      font-size: 18px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0;
    }
    .ruta-lista__view-toggle {
      display: flex;
      gap: 4px;
    }
    .ruta-lista__view-btn {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      border: 1px solid #d0d8e8;
      background: rgba(255,255,255,0.7);
      font-size: 16px;
      color: #3b5585;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ruta-lista__view-btn--activo {
      background: #3b6aaa;
      color: #fff;
      border-color: #3b6aaa;
    }

    /* Tabs */
    .ruta-lista__tabs {
      display: flex;
      gap: 0;
      padding: 14px 18px 0;
      border-bottom: 2px solid #e4eaf4;
    }
    .ruta-tab {
      padding: 8px 18px;
      font-size: 14px;
      font-weight: 600;
      color: #5a6d8a;
      border: none;
      background: none;
      cursor: pointer;
      border-bottom: 3px solid transparent;
      margin-bottom: -2px;
      transition: color 0.2s, border-color 0.2s;
    }
    .ruta-tab:hover { color: #1a2d50; }
    .ruta-tab--activo {
      color: #1a2d50;
      border-bottom-color: #3b6aaa;
    }
    .ruta-tab--completadas {
      color: #3b6aaa;
    }

    /* Encabezados tabla lista */
    .ruta-lista__cols {
      display: grid;
      grid-template-columns: 36px 1fr 100px;
      gap: 6px;
      padding: 12px 18px 6px;
      font-size: 13px;
      font-weight: 600;
      color: #8899b4;
    }

    /* Tarjetas de entrega */
    .ruta-lista__items {
      flex: 1;
      overflow-y: auto;
      padding: 0 12px 12px;
    }
    .ruta-entrega-card {
      display: grid;
      grid-template-columns: 36px 1fr 100px;
      gap: 6px;
      align-items: center;
      padding: 14px 8px;
      border-bottom: 1px solid rgba(200,215,240,0.35);
      transition: background 0.15s;
    }
    .ruta-entrega-card:hover { background: rgba(255,255,255,0.5); }
    .ruta-entrega-card:last-child { border-bottom: none; }
    .ruta-entrega-card__icono {
      font-size: 20px;
      color: #3b6aaa;
      text-align: center;
    }
    .ruta-entrega-card__info {
      min-width: 0;
    }
    .ruta-entrega-card__nombre {
      font-size: 15px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0 0 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ruta-entrega-card__dir {
      font-size: 13px;
      color: #5a6d8a;
      margin: 0 0 2px;
    }
    .ruta-entrega-card__hora {
      font-size: 12px;
      color: #8899b4;
      margin: 0;
    }
    .ruta-entrega-card__estado {
      text-align: right;
    }

    /* Paginación */
    .ruta-paginacion {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 0 18px;
      flex-wrap: wrap;
      gap: 12px;
    }
    .ruta-paginacion__info {
      font-size: 14px;
      color: #5a6d8a;
    }
    .ruta-paginacion__paginas {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .ruta-pag-btn {
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      border: 1px solid #d0d8e8;
      background: #fff;
      font-size: 14px;
      font-weight: 600;
      color: #3b5585;
      cursor: pointer;
      transition: background 0.2s;
    }
    .ruta-pag-btn:hover { background: #e8f0fb; }
    .ruta-pag-btn--activo {
      background: #3b6aaa;
      color: #fff;
      border-color: #3b6aaa;
    }

    /* Responsive */
    @media (max-width: 960px) {
      .ruta-layout {
        grid-template-columns: 1fr;
      }
      .ruta-panel-der {
        max-height: 400px;
      }
    }
    @media (max-width: 600px) {
      .ruta-header { flex-direction: column; align-items: flex-start; gap: 10px; }
      .ruta-driver { flex-direction: column; align-items: flex-start; }
      .ruta-driver__estado { align-items: flex-start; }
      .ruta-entregas-mapa { right: 14px; }
      .ruta-lista__cols { grid-template-columns: 30px 1fr 90px; }
      .ruta-entrega-card { grid-template-columns: 30px 1fr 90px; }
    }
  `}),(0,A.jsxs)(`div`,{className:`tablero-operador tablero-operador--sin-sidebar`,children:[(0,A.jsx)(`div`,{id:`menuContainer`,className:`menu-overlay`}),(0,A.jsx)(`div`,{id:`menuBackdrop`,className:`menu-overlay__backdrop`}),(0,A.jsxs)(`main`,{className:`panel-principal panel-principal--full`,children:[(0,A.jsxs)(`header`,{className:`barra-superior barra-superior--con-logo`,children:[(0,A.jsxs)(`div`,{className:`barra-superior__left`,children:[(0,A.jsx)(`button`,{id:`btnMenu`,className:`btn-menu-hamburguesa`,"aria-label":`Abrir menú`,children:(0,A.jsxs)(`svg`,{width:`26`,height:`26`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,children:[(0,A.jsx)(`line`,{x1:`3`,y1:`6`,x2:`21`,y2:`6`}),(0,A.jsx)(`line`,{x1:`3`,y1:`12`,x2:`21`,y2:`12`}),(0,A.jsx)(`line`,{x1:`3`,y1:`18`,x2:`21`,y2:`18`})]})}),(0,A.jsx)(`div`,{className:`header-logo`,children:(0,A.jsx)(`img`,{src:`/piWeb/images/logoSinFondo.png`,alt:`Metzvia`})}),(0,A.jsx)(`h1`,{className:`barra-superior__titulo`,children:`Supervisor`})]}),(0,A.jsxs)(`div`,{className:`barra-superior__perfil`,children:[(0,A.jsxs)(`span`,{className:`badge-servicio`,children:[(0,A.jsx)(`span`,{className:`header-sv__punto-verde`}),` En servicio`]}),(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Supervisor`,className:`barra-superior__avatar`}),(0,A.jsx)(`span`,{className:`barra-superior__chevron`,children:`▾`})]})]}),(0,A.jsxs)(`div`,{className:`ruta-header`,children:[(0,A.jsx)(`h2`,{className:`ruta-header__titulo`,children:`Ruta del Repartidor`}),(0,A.jsx)(`a`,{href:`/piWeb/src/pages/supervisor/gestRepartidorSupervisor.html`,className:`ruta-header__volver`,children:`‹ Volver`})]}),(0,A.jsxs)(`div`,{className:`ruta-layout`,children:[(0,A.jsxs)(`div`,{className:`ruta-panel-izq`,children:[(0,A.jsxs)(`div`,{className:`ruta-driver`,children:[(0,A.jsx)(`img`,{src:`/piWeb/images/usuario.png`,alt:`Luis García`,className:`ruta-driver__foto`}),(0,A.jsxs)(`div`,{className:`ruta-driver__info`,children:[(0,A.jsx)(`p`,{className:`ruta-driver__nombre`,children:`Luis García`}),(0,A.jsx)(`p`,{className:`ruta-driver__zona-text`,children:`Centro`}),(0,A.jsxs)(`div`,{className:`ruta-driver__badges`,children:[(0,A.jsx)(`span`,{className:`ruta-badge ruta-badge--zona`,children:`Centro`}),(0,A.jsx)(`span`,{className:`ruta-badge ruta-badge--vehiculo`,children:`Nissan NV200`})]})]}),(0,A.jsxs)(`div`,{className:`ruta-driver__estado`,children:[(0,A.jsx)(`span`,{className:`ruta-estado-label`,children:`Estado`}),(0,A.jsx)(`span`,{className:`ruta-estado-valor`,children:`En ruta`})]})]}),(0,A.jsxs)(`div`,{className:`ruta-mapa-wrap`,children:[(0,A.jsx)(`div`,{id:`rutaMapa`}),(0,A.jsxs)(`div`,{className:`ruta-entregas-mapa`,children:[(0,A.jsxs)(`div`,{className:`ruta-entregas-mapa__header`,children:[(0,A.jsx)(`h3`,{className:`ruta-entregas-mapa__titulo`,children:`Entregas de la Ruta`}),(0,A.jsxs)(`div`,{className:`ruta-entregas-mapa__meta`,children:[(0,A.jsxs)(`span`,{className:`ruta-tiempo`,children:[(0,A.jsx)(`span`,{className:`ruta-tiempo__icono`,children:`⏱`}),` Tiempo restante`]}),(0,A.jsx)(`button`,{className:`ruta-entregas-mapa__more`,"aria-label":`Más opciones`,children:`⋯`})]})]}),(0,A.jsxs)(`table`,{className:`ruta-entregas-mapa__tabla`,children:[(0,A.jsx)(`thead`,{children:(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`th`,{}),(0,A.jsx)(`th`,{children:`Guía`}),(0,A.jsx)(`th`,{children:`Cliente`}),(0,A.jsx)(`th`,{children:`Dirección`}),(0,A.jsx)(`th`,{children:`Estado`})]})}),(0,A.jsx)(`tbody`,{children:(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`td-icono`,children:`☰`}),(0,A.jsxs)(`td`,{children:[(0,A.jsx)(`span`,{className:`td-nombre`,children:`Ana Martínez`}),(0,A.jsx)(`br`,{}),(0,A.jsx)(`span`,{className:`td-guia`,children:`PAK123456299`})]}),(0,A.jsx)(`td`,{}),(0,A.jsxs)(`td`,{children:[`Roma Norte`,(0,A.jsx)(`br`,{}),`10:00 – 11:00 AM`]}),(0,A.jsx)(`td`,{children:(0,A.jsxs)(`span`,{className:`entrega-estado entrega-estado--enruta`,children:[(0,A.jsx)(`span`,{className:`entrega-estado__dot`}),` En ruta`,(0,A.jsx)(`span`,{className:`entrega-estado__flecha`,children:`›`})]})})]})})]})]})]})]}),(0,A.jsxs)(`div`,{className:`ruta-panel-der`,children:[(0,A.jsxs)(`div`,{className:`ruta-lista__header`,children:[(0,A.jsx)(`h3`,{className:`ruta-lista__titulo`,children:`Entregas de la Ruta`}),(0,A.jsxs)(`div`,{className:`ruta-lista__view-toggle`,children:[(0,A.jsx)(`button`,{className:`ruta-lista__view-btn ruta-lista__view-btn--activo`,"aria-label":`Lista`,children:`☰`}),(0,A.jsx)(`button`,{className:`ruta-lista__view-btn`,"aria-label":`Compacto`,children:`⎯`})]})]}),(0,A.jsxs)(`div`,{className:`ruta-lista__tabs`,children:[(0,A.jsx)(`button`,{className:`ruta-tab ruta-tab--activo`,children:`En ruta`}),(0,A.jsx)(`button`,{className:`ruta-tab`,children:`Pendientes`}),(0,A.jsx)(`button`,{className:`ruta-tab ruta-tab--completadas`,children:`Completadas`})]}),(0,A.jsxs)(`div`,{className:`ruta-lista__cols`,children:[(0,A.jsx)(`span`,{children:`Guía`}),(0,A.jsx)(`span`,{children:`Cliente`}),(0,A.jsx)(`span`,{children:`Estado`})]}),(0,A.jsxs)(`div`,{className:`ruta-lista__items`,children:[(0,A.jsxs)(`div`,{className:`ruta-entrega-card`,children:[(0,A.jsx)(`span`,{className:`ruta-entrega-card__icono`,children:`☰`}),(0,A.jsxs)(`div`,{className:`ruta-entrega-card__info`,children:[(0,A.jsx)(`p`,{className:`ruta-entrega-card__nombre`,children:`Ana García`}),(0,A.jsx)(`p`,{className:`ruta-entrega-card__dir`,children:`Roma Norte`}),(0,A.jsx)(`p`,{className:`ruta-entrega-card__hora`,children:`10:00 – 11:00 AM`})]}),(0,A.jsx)(`div`,{className:`ruta-entrega-card__estado`,children:(0,A.jsxs)(`span`,{className:`entrega-estado entrega-estado--enruta`,children:[(0,A.jsx)(`span`,{className:`entrega-estado__dot`}),` En ruta`]})})]}),(0,A.jsxs)(`div`,{className:`ruta-entrega-card`,children:[(0,A.jsx)(`span`,{className:`ruta-entrega-card__icono`,children:`☰`}),(0,A.jsxs)(`div`,{className:`ruta-entrega-card__info`,children:[(0,A.jsx)(`p`,{className:`ruta-entrega-card__nombre`,children:`Carlos Ramírez`}),(0,A.jsx)(`p`,{className:`ruta-entrega-card__dir`,children:`Tecnológico 210`}),(0,A.jsx)(`p`,{className:`ruta-entrega-card__hora`,children:`12:00 – 1:00 PM`})]}),(0,A.jsx)(`div`,{className:`ruta-entrega-card__estado`,children:(0,A.jsxs)(`span`,{className:`entrega-estado entrega-estado--enruta`,children:[(0,A.jsx)(`span`,{className:`entrega-estado__dot`}),` En ruta`]})})]}),(0,A.jsxs)(`div`,{className:`ruta-entrega-card`,children:[(0,A.jsx)(`span`,{className:`ruta-entrega-card__icono`,children:`☰`}),(0,A.jsxs)(`div`,{className:`ruta-entrega-card__info`,children:[(0,A.jsx)(`p`,{className:`ruta-entrega-card__nombre`,children:`Laura Gómez`}),(0,A.jsx)(`p`,{className:`ruta-entrega-card__dir`,children:`Revolución 456`}),(0,A.jsx)(`p`,{className:`ruta-entrega-card__hora`,children:`1:00 – 3:00 PM`})]}),(0,A.jsx)(`div`,{className:`ruta-entrega-card__estado`,children:(0,A.jsxs)(`span`,{className:`entrega-estado entrega-estado--enruta`,children:[(0,A.jsx)(`span`,{className:`entrega-estado__dot`}),` En ruta`]})})]}),(0,A.jsxs)(`div`,{className:`ruta-entrega-card`,children:[(0,A.jsx)(`span`,{className:`ruta-entrega-card__icono`,children:`☰`}),(0,A.jsxs)(`div`,{className:`ruta-entrega-card__info`,children:[(0,A.jsx)(`p`,{className:`ruta-entrega-card__nombre`,children:`Jorge Sánchez`}),(0,A.jsx)(`p`,{className:`ruta-entrega-card__dir`,children:`Universidad 789`}),(0,A.jsx)(`p`,{className:`ruta-entrega-card__hora`,children:`2:00 – 3:30 PM`})]}),(0,A.jsx)(`div`,{className:`ruta-entrega-card__estado`,children:(0,A.jsxs)(`span`,{className:`entrega-estado entrega-estado--enruta`,children:[(0,A.jsx)(`span`,{className:`entrega-estado__dot`}),` En ruta`]})})]}),(0,A.jsxs)(`div`,{className:`ruta-entrega-card`,children:[(0,A.jsx)(`span`,{className:`ruta-entrega-card__icono`,children:`☰`}),(0,A.jsxs)(`div`,{className:`ruta-entrega-card__info`,children:[(0,A.jsx)(`p`,{className:`ruta-entrega-card__nombre`,children:`Pilar Suárez`}),(0,A.jsx)(`p`,{className:`ruta-entrega-card__dir`,children:`Oriente 230, Toluca`}),(0,A.jsx)(`p`,{className:`ruta-entrega-card__hora`,children:`3:00 – 4:30 PM`})]}),(0,A.jsx)(`div`,{className:`ruta-entrega-card__estado`,children:(0,A.jsxs)(`span`,{className:`entrega-estado entrega-estado--enruta`,children:[(0,A.jsx)(`span`,{className:`entrega-estado__dot`}),` En ruta`]})})]})]})]})]}),(0,A.jsxs)(`div`,{className:`ruta-paginacion`,children:[(0,A.jsx)(`span`,{className:`ruta-paginacion__info`,children:`Mostrando 5 de 148 repartidores`}),(0,A.jsxs)(`div`,{className:`ruta-paginacion__paginas`,children:[(0,A.jsx)(`button`,{className:`ruta-pag-btn`,children:`<`}),(0,A.jsx)(`button`,{className:`ruta-pag-btn`,children:`1`}),(0,A.jsx)(`button`,{className:`ruta-pag-btn ruta-pag-btn--activo`,children:`2`}),(0,A.jsx)(`button`,{className:`ruta-pag-btn`,children:`3`}),(0,A.jsx)(`button`,{className:`ruta-pag-btn`,children:`4`}),(0,A.jsx)(`button`,{className:`ruta-pag-btn`,children:`5`}),(0,A.jsx)(`button`,{className:`ruta-pag-btn`,children:`>`})]})]})]})]})]})}function dr(){return(0,A.jsxs)(It,{children:[(0,A.jsx)(k,{path:`/`,element:(0,A.jsx)(Pt,{to:`/login`,replace:!0})}),(0,A.jsx)(k,{path:`/login`,element:(0,A.jsx)(qn,{})}),(0,A.jsx)(k,{path:`/operador/dashboard`,element:(0,A.jsx)(Yn,{})}),(0,A.jsx)(k,{path:`/operador/datos-paquete`,element:(0,A.jsx)(Xn,{})}),(0,A.jsx)(k,{path:`/operador/detalle-envio`,element:(0,A.jsx)(Zn,{})}),(0,A.jsx)(k,{path:`/operador/envios`,element:(0,A.jsx)(Qn,{})}),(0,A.jsx)(k,{path:`/operador/incidencias`,element:(0,A.jsx)($n,{})}),(0,A.jsx)(k,{path:`/operador/mi-cuenta`,element:(0,A.jsx)(er,{})}),(0,A.jsx)(k,{path:`/operador/registrar-paquete`,element:(0,A.jsx)(tr,{})}),(0,A.jsx)(k,{path:`/supervisor/dashboard`,element:(0,A.jsx)(nr,{})}),(0,A.jsx)(k,{path:`/supervisor/detalle-envio`,element:(0,A.jsx)(rr,{})}),(0,A.jsx)(k,{path:`/supervisor/entregas-repartidor`,element:(0,A.jsx)(ir,{})}),(0,A.jsx)(k,{path:`/supervisor/envios`,element:(0,A.jsx)(ar,{})}),(0,A.jsx)(k,{path:`/supervisor/gestion-repartidores`,element:(0,A.jsx)(or,{})}),(0,A.jsx)(k,{path:`/supervisor/incidencias`,element:(0,A.jsx)(sr,{})}),(0,A.jsx)(k,{path:`/supervisor/mi-cuenta`,element:(0,A.jsx)(cr,{})}),(0,A.jsx)(k,{path:`/supervisor/reportes`,element:(0,A.jsx)(lr,{})}),(0,A.jsx)(k,{path:`/supervisor/ruta-repartidor`,element:(0,A.jsx)(ur,{})})]})}Kn.createRoot(document.getElementById(`root`)).render((0,A.jsx)(x.StrictMode,{children:(0,A.jsx)(Cn,{children:(0,A.jsx)(dr,{})})}));