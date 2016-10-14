(function(){var e=this,t=e._,a={},n=Array.prototype,r=Object.prototype,i=Function.prototype,s=n.push,o=n.slice,u=n.concat,l=r.toString,d=r.hasOwnProperty,_=n.forEach,m=n.map,c=n.reduce,h=n.reduceRight,M=n.filter,L=n.every,p=n.some,y=n.indexOf,f=n.lastIndexOf,Y=Array.isArray,T=Object.keys,k=i.bind,v=function(e){return e instanceof v?e:this instanceof v?void(this._wrapped=e):new v(e)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=v),exports._=v):e._=v,v.VERSION="1.4.4";var D=v.each=v.forEach=function(e,t,n){if(null!=e)if(_&&e.forEach===_)e.forEach(t,n);else if(e.length===+e.length){for(var r=0,i=e.length;r<i;r++)if(t.call(n,e[r],r,e)===a)return}else for(var s in e)if(v.has(e,s)&&t.call(n,e[s],s,e)===a)return};v.map=v.collect=function(e,t,a){var n=[];return null==e?n:m&&e.map===m?e.map(t,a):(D(e,function(e,r,i){n[n.length]=t.call(a,e,r,i)}),n)};var g="Reduce of empty array with no initial value";v.reduce=v.foldl=v.inject=function(e,t,a,n){var r=arguments.length>2;if(null==e&&(e=[]),c&&e.reduce===c)return n&&(t=v.bind(t,n)),r?e.reduce(t,a):e.reduce(t);if(D(e,function(e,i,s){r?a=t.call(n,a,e,i,s):(a=e,r=!0)}),!r)throw new TypeError(g);return a},v.reduceRight=v.foldr=function(e,t,a,n){var r=arguments.length>2;if(null==e&&(e=[]),h&&e.reduceRight===h)return n&&(t=v.bind(t,n)),r?e.reduceRight(t,a):e.reduceRight(t);var i=e.length;if(i!==+i){var s=v.keys(e);i=s.length}if(D(e,function(o,u,l){u=s?s[--i]:--i,r?a=t.call(n,a,e[u],u,l):(a=e[u],r=!0)}),!r)throw new TypeError(g);return a},v.find=v.detect=function(e,t,a){var n;return w(e,function(e,r,i){if(t.call(a,e,r,i))return n=e,!0}),n},v.filter=v.select=function(e,t,a){var n=[];return null==e?n:M&&e.filter===M?e.filter(t,a):(D(e,function(e,r,i){t.call(a,e,r,i)&&(n[n.length]=e)}),n)},v.reject=function(e,t,a){return v.filter(e,function(e,n,r){return!t.call(a,e,n,r)},a)},v.every=v.all=function(e,t,n){t||(t=v.identity);var r=!0;return null==e?r:L&&e.every===L?e.every(t,n):(D(e,function(e,i,s){if(!(r=r&&t.call(n,e,i,s)))return a}),!!r)};var w=v.some=v.any=function(e,t,n){t||(t=v.identity);var r=!1;return null==e?r:p&&e.some===p?e.some(t,n):(D(e,function(e,i,s){if(r||(r=t.call(n,e,i,s)))return a}),!!r)};v.contains=v.include=function(e,t){return null!=e&&(y&&e.indexOf===y?e.indexOf(t)!=-1:w(e,function(e){return e===t}))},v.invoke=function(e,t){var a=o.call(arguments,2),n=v.isFunction(t);return v.map(e,function(e){return(n?t:e[t]).apply(e,a)})},v.pluck=function(e,t){return v.map(e,function(e){return e[t]})},v.where=function(e,t,a){return v.isEmpty(t)?a?null:[]:v[a?"find":"filter"](e,function(e){for(var a in t)if(t[a]!==e[a])return!1;return!0})},v.findWhere=function(e,t){return v.where(e,t,!0)},v.max=function(e,t,a){if(!t&&v.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.max.apply(Math,e);if(!t&&v.isEmpty(e))return-(1/0);var n={computed:-(1/0),value:-(1/0)};return D(e,function(e,r,i){var s=t?t.call(a,e,r,i):e;s>=n.computed&&(n={value:e,computed:s})}),n.value},v.min=function(e,t,a){if(!t&&v.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.min.apply(Math,e);if(!t&&v.isEmpty(e))return 1/0;var n={computed:1/0,value:1/0};return D(e,function(e,r,i){var s=t?t.call(a,e,r,i):e;s<n.computed&&(n={value:e,computed:s})}),n.value},v.shuffle=function(e){var t,a=0,n=[];return D(e,function(e){t=v.random(a++),n[a-1]=n[t],n[t]=e}),n};var b=function(e){return v.isFunction(e)?e:function(t){return t[e]}};v.sortBy=function(e,t,a){var n=b(t);return v.pluck(v.map(e,function(e,t,r){return{value:e,index:t,criteria:n.call(a,e,t,r)}}).sort(function(e,t){var a=e.criteria,n=t.criteria;if(a!==n){if(a>n||void 0===a)return 1;if(a<n||void 0===n)return-1}return e.index<t.index?-1:1}),"value")};var x=function(e,t,a,n){var r={},i=b(t||v.identity);return D(e,function(t,s){var o=i.call(a,t,s,e);n(r,o,t)}),r};v.groupBy=function(e,t,a){return x(e,t,a,function(e,t,a){(v.has(e,t)?e[t]:e[t]=[]).push(a)})},v.countBy=function(e,t,a){return x(e,t,a,function(e,t){v.has(e,t)||(e[t]=0),e[t]++})},v.sortedIndex=function(e,t,a,n){a=null==a?v.identity:b(a);for(var r=a.call(n,t),i=0,s=e.length;i<s;){var o=i+s>>>1;a.call(n,e[o])<r?i=o+1:s=o}return i},v.toArray=function(e){return e?v.isArray(e)?o.call(e):e.length===+e.length?v.map(e,v.identity):v.values(e):[]},v.size=function(e){return null==e?0:e.length===+e.length?e.length:v.keys(e).length},v.first=v.head=v.take=function(e,t,a){if(null!=e)return null==t||a?e[0]:o.call(e,0,t)},v.initial=function(e,t,a){return o.call(e,0,e.length-(null==t||a?1:t))},v.last=function(e,t,a){if(null!=e)return null==t||a?e[e.length-1]:o.call(e,Math.max(e.length-t,0))},v.rest=v.tail=v.drop=function(e,t,a){return o.call(e,null==t||a?1:t)},v.compact=function(e){return v.filter(e,v.identity)};var S=function(e,t,a){return D(e,function(e){v.isArray(e)?t?s.apply(a,e):S(e,t,a):a.push(e)}),a};v.flatten=function(e,t){return S(e,t,[])},v.without=function(e){return v.difference(e,o.call(arguments,1))},v.uniq=v.unique=function(e,t,a,n){v.isFunction(t)&&(n=a,a=t,t=!1);var r=a?v.map(e,a,n):e,i=[],s=[];return D(r,function(a,n){(t?n&&s[s.length-1]===a:v.contains(s,a))||(s.push(a),i.push(e[n]))}),i},v.union=function(){return v.uniq(u.apply(n,arguments))},v.intersection=function(e){var t=o.call(arguments,1);return v.filter(v.uniq(e),function(e){return v.every(t,function(t){return v.indexOf(t,e)>=0})})},v.difference=function(e){var t=u.apply(n,o.call(arguments,1));return v.filter(e,function(e){return!v.contains(t,e)})},v.zip=function(){for(var e=o.call(arguments),t=v.max(v.pluck(e,"length")),a=new Array(t),n=0;n<t;n++)a[n]=v.pluck(e,""+n);return a},v.object=function(e,t){if(null==e)return{};for(var a={},n=0,r=e.length;n<r;n++)t?a[e[n]]=t[n]:a[e[n][0]]=e[n][1];return a},v.indexOf=function(e,t,a){if(null==e)return-1;var n=0,r=e.length;if(a){if("number"!=typeof a)return n=v.sortedIndex(e,t),e[n]===t?n:-1;n=a<0?Math.max(0,r+a):a}if(y&&e.indexOf===y)return e.indexOf(t,a);for(;n<r;n++)if(e[n]===t)return n;return-1},v.lastIndexOf=function(e,t,a){if(null==e)return-1;var n=null!=a;if(f&&e.lastIndexOf===f)return n?e.lastIndexOf(t,a):e.lastIndexOf(t);for(var r=n?a:e.length;r--;)if(e[r]===t)return r;return-1},v.range=function(e,t,a){arguments.length<=1&&(t=e||0,e=0),a=arguments[2]||1;for(var n=Math.max(Math.ceil((t-e)/a),0),r=0,i=new Array(n);r<n;)i[r++]=e,e+=a;return i},v.bind=function(e,t){if(e.bind===k&&k)return k.apply(e,o.call(arguments,1));var a=o.call(arguments,2);return function(){return e.apply(t,a.concat(o.call(arguments)))}},v.partial=function(e){var t=o.call(arguments,1);return function(){return e.apply(this,t.concat(o.call(arguments)))}},v.bindAll=function(e){var t=o.call(arguments,1);return 0===t.length&&(t=v.functions(e)),D(t,function(t){e[t]=v.bind(e[t],e)}),e},v.memoize=function(e,t){var a={};return t||(t=v.identity),function(){var n=t.apply(this,arguments);return v.has(a,n)?a[n]:a[n]=e.apply(this,arguments)}},v.delay=function(e,t){var a=o.call(arguments,2);return setTimeout(function(){return e.apply(null,a)},t)},v.defer=function(e){return v.delay.apply(v,[e,1].concat(o.call(arguments,1)))},v.throttle=function(e,t){var a,n,r,i,s=0,o=function(){s=new Date,r=null,i=e.apply(a,n)};return function(){var u=new Date,l=t-(u-s);return a=this,n=arguments,l<=0?(clearTimeout(r),r=null,s=u,i=e.apply(a,n)):r||(r=setTimeout(o,l)),i}},v.debounce=function(e,t,a){var n,r;return function(){var i=this,s=arguments,o=function(){n=null,a||(r=e.apply(i,s))},u=a&&!n;return clearTimeout(n),n=setTimeout(o,t),u&&(r=e.apply(i,s)),r}},v.once=function(e){var t,a=!1;return function(){return a?t:(a=!0,t=e.apply(this,arguments),e=null,t)}},v.wrap=function(e,t){return function(){var a=[e];return s.apply(a,arguments),t.apply(this,a)}},v.compose=function(){var e=arguments;return function(){for(var t=arguments,a=e.length-1;a>=0;a--)t=[e[a].apply(this,t)];return t[0]}},v.after=function(e,t){return e<=0?t():function(){if(--e<1)return t.apply(this,arguments)}},v.keys=T||function(e){if(e!==Object(e))throw new TypeError("Invalid object");var t=[];for(var a in e)v.has(e,a)&&(t[t.length]=a);return t},v.values=function(e){var t=[];for(var a in e)v.has(e,a)&&t.push(e[a]);return t},v.pairs=function(e){var t=[];for(var a in e)v.has(e,a)&&t.push([a,e[a]]);return t},v.invert=function(e){var t={};for(var a in e)v.has(e,a)&&(t[e[a]]=a);return t},v.functions=v.methods=function(e){var t=[];for(var a in e)v.isFunction(e[a])&&t.push(a);return t.sort()},v.extend=function(e){return D(o.call(arguments,1),function(t){if(t)for(var a in t)e[a]=t[a]}),e},v.pick=function(e){var t={},a=u.apply(n,o.call(arguments,1));return D(a,function(a){a in e&&(t[a]=e[a])}),t},v.omit=function(e){var t={},a=u.apply(n,o.call(arguments,1));for(var r in e)v.contains(a,r)||(t[r]=e[r]);return t},v.defaults=function(e){return D(o.call(arguments,1),function(t){if(t)for(var a in t)null==e[a]&&(e[a]=t[a])}),e},v.clone=function(e){return v.isObject(e)?v.isArray(e)?e.slice():v.extend({},e):e},v.tap=function(e,t){return t(e),e};var j=function(e,t,a,n){if(e===t)return 0!==e||1/e==1/t;if(null==e||null==t)return e===t;e instanceof v&&(e=e._wrapped),t instanceof v&&(t=t._wrapped);var r=l.call(e);if(r!=l.call(t))return!1;switch(r){case"[object String]":return e==String(t);case"[object Number]":return e!=+e?t!=+t:0==e?1/e==1/t:e==+t;case"[object Date]":case"[object Boolean]":return+e==+t;case"[object RegExp]":return e.source==t.source&&e.global==t.global&&e.multiline==t.multiline&&e.ignoreCase==t.ignoreCase}if("object"!=typeof e||"object"!=typeof t)return!1;for(var i=a.length;i--;)if(a[i]==e)return n[i]==t;a.push(e),n.push(t);var s=0,o=!0;if("[object Array]"==r){if(s=e.length,o=s==t.length)for(;s--&&(o=j(e[s],t[s],a,n)););}else{var u=e.constructor,d=t.constructor;if(u!==d&&!(v.isFunction(u)&&u instanceof u&&v.isFunction(d)&&d instanceof d))return!1;for(var _ in e)if(v.has(e,_)&&(s++,!(o=v.has(t,_)&&j(e[_],t[_],a,n))))break;if(o){for(_ in t)if(v.has(t,_)&&!s--)break;o=!s}}return a.pop(),n.pop(),o};v.isEqual=function(e,t){return j(e,t,[],[])},v.isEmpty=function(e){if(null==e)return!0;if(v.isArray(e)||v.isString(e))return 0===e.length;for(var t in e)if(v.has(e,t))return!1;return!0},v.isElement=function(e){return!(!e||1!==e.nodeType)},v.isArray=Y||function(e){return"[object Array]"==l.call(e)},v.isObject=function(e){return e===Object(e)},D(["Arguments","Function","String","Number","Date","RegExp"],function(e){v["is"+e]=function(t){return l.call(t)=="[object "+e+"]"}}),v.isArguments(arguments)||(v.isArguments=function(e){return!(!e||!v.has(e,"callee"))}),"function"!=typeof/./&&(v.isFunction=function(e){return"function"==typeof e}),v.isFinite=function(e){return isFinite(e)&&!isNaN(parseFloat(e))},v.isNaN=function(e){return v.isNumber(e)&&e!=+e},v.isBoolean=function(e){return e===!0||e===!1||"[object Boolean]"==l.call(e)},v.isNull=function(e){return null===e},v.isUndefined=function(e){return void 0===e},v.has=function(e,t){return d.call(e,t)},v.noConflict=function(){return e._=t,this},v.identity=function(e){return e},v.times=function(e,t,a){for(var n=Array(e),r=0;r<e;r++)n[r]=t.call(a,r);return n},v.random=function(e,t){return null==t&&(t=e,e=0),e+Math.floor(Math.random()*(t-e+1))};var H={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};H.unescape=v.invert(H.escape);var F={escape:new RegExp("["+v.keys(H.escape).join("")+"]","g"),unescape:new RegExp("("+v.keys(H.unescape).join("|")+")","g")};v.each(["escape","unescape"],function(e){v[e]=function(t){return null==t?"":(""+t).replace(F[e],function(t){return H[e][t]})}}),v.result=function(e,t){if(null==e)return null;var a=e[t];return v.isFunction(a)?a.call(e):a},v.mixin=function(e){D(v.functions(e),function(t){var a=v[t]=e[t];v.prototype[t]=function(){var e=[this._wrapped];return s.apply(e,arguments),A.call(this,a.apply(v,e))}})};var W=0;v.uniqueId=function(e){var t=++W+"";return e?e+t:t},v.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var P=/(.)^/,E={"'":"'","\\":"\\","\r":"r","\n":"n","\t":"t","\u2028":"u2028","\u2029":"u2029"},z=/\\|'|\r|\n|\t|\u2028|\u2029/g;v.template=function(e,t,a){var n;a=v.defaults({},a,v.templateSettings);var r=new RegExp([(a.escape||P).source,(a.interpolate||P).source,(a.evaluate||P).source].join("|")+"|$","g"),i=0,s="__p+='";e.replace(r,function(t,a,n,r,o){return s+=e.slice(i,o).replace(z,function(e){return"\\"+E[e]}),a&&(s+="'+\n((__t=("+a+"))==null?'':_.escape(__t))+\n'"),n&&(s+="'+\n((__t=("+n+"))==null?'':__t)+\n'"),r&&(s+="';\n"+r+"\n__p+='"),i=o+t.length,t}),s+="';\n",a.variable||(s="with(obj||{}){\n"+s+"}\n"),s="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+s+"return __p;\n";try{n=new Function(a.variable||"obj","_",s)}catch(e){throw e.source=s,e}if(t)return n(t,v);var o=function(e){return n.call(this,e,v)};return o.source="function("+(a.variable||"obj")+"){\n"+s+"}",o},v.chain=function(e){return v(e).chain()};var A=function(e){return this._chain?v(e).chain():e};v.mixin(v),D(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var t=n[e];v.prototype[e]=function(){var a=this._wrapped;return t.apply(a,arguments),"shift"!=e&&"splice"!=e||0!==a.length||delete a[0],A.call(this,a)}}),D(["concat","join","slice"],function(e){var t=n[e];v.prototype[e]=function(){return A.call(this,t.apply(this._wrapped,arguments))}}),v.extend(v.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);