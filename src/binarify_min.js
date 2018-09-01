!function(){var c={byte:256,short:65536,tribyte:16777216,int:4294967296,float:16777217,double:Number.MAX_SAFE_INTEGER},r=["byte","short","tribyte","int","float","double"],t=["uByte","sByte","uShort","sShort","uTribyte","sTribyte","uInt","sInt","float","double"];function d(t){switch(t){case"byte":return 1;case"short":return 2;case"tribyte":return 3;case"int":case"float":return 4;case"double":return 8;default:throw new Error("Incorrect number type '"+t+"'")}}function e(t){switch(t){case 1:return"byte";case 2:return"short";case 3:return"tribyte";case 4:return"int";default:return"double"}}function n(t,r){return(t%r+r)%r}var o=/^[0-9a-fA-F]+$/;var s=0,i={version:"2.0.1",Boolean:function(){this.encode=function(t){return t?"":"\0"},this.decode=function(t,r){return!0!==r&&(s=0),1===t.charCodeAt(s++)}},Number:function(n){if(n=n||"double",-1===t.indexOf(n))throw new Error("Incorrect Number type '"+n+"'");var o=d(("double"!==n&&"float"!==n?n.slice(1):n).toLowerCase());this.encode=function(t){return l.to[n](t)},this.decode=function(t,r){!0!==r&&(s=0);var e=l.from[n](t.substr(s,o));return s+=o,e}},String:function(t){var i="number"==typeof t;if(i){if((t=Math.floor(t))<0)throw new Error("String cannot have a fixed length shorter than 0");var h=t}else{var u=t||"nullTer";if("nullTer"!==u&&-1===r.indexOf(u))throw new Error("Incorrect String size number type '"+u+"'")}this.encode=function(t){if(i){if(t.length===h)return t;throw new Error("Passed string isn't of specified length "+h+"!")}return"nullTer"===u?(-1!==t.indexOf("\0")&&t.replace(/\u0000/g," "),t+"\0"):(t=t.slice(0,c[u]-1),l.to[u](t.length)+t)},this.decode=function(t,r){var e;if(!0!==r&&(s=0),i)e=t.substr(s,h),s+=h;else if("nullTer"===u)e=t.slice(s,t.indexOf("\0",s)),s+=e.length+1;else{var n=d(u),o=l.from[u](t.substr(s,n));e=t.substr(s+n,o),s+=n+o}return e}},HexString:function(a){var f="number"==typeof a;if(f&&(a=Math.floor(a))<0)throw new Error("HexString cannot have a fixed length shorter than 0");this.encode=function(t){if(r=t,!o.test(r))throw new Error("Passed string is not a HexString!");var r;if(f&&t.length!==a)throw new Error("Passed string isn't of specified length "+a+"!");var e="";f||(e+=String.fromCharCode(t.length%2==0?1:0));for(var n=0;n<t.length;n+=2)e+=String.fromCharCode(parseInt(t.substr(n,2<=t.length-n?2:1),16));return f||(e+="Ā"),e},this.decode=function(t,r){var e;if(!0!==r&&(s=0),f)e=t.substr(s,Math.ceil(a/2));else{var n=1===t.charCodeAt(s),o=t.indexOf("Ā",s);e=t.slice(s+1,o)}for(var i="",h=0;h<e.length;h++)if(h!==e.length-1)i+=("00"+e.charCodeAt(h).toString(16)).slice(-2);else{var u=!1;f||n||(u=!0),f&&a%2==1&&(u=!0),i+=u?e.charCodeAt(h).toString(16):("00"+e.charCodeAt(h).toString(16)).slice(-2)}return s+=e.length+(f?0:2),i}},Object:function(h,u){var a=Object.keys(h);if(a.sort(),u){var f=Math.ceil(Math.log2(a.length)/8)||1,c=e(f);f=d(c)}this.encode=function(t){var r="";if(u)for(var e in r+=l.to[c](Object.keys(t).length),t){if(void 0===h[e])throw new Error("Key '"+e+"' is not defined in the blueprint!");r+=l.to[c](a.indexOf(e))+h[e].encode(t[e])}else for(var n=0;n<a.length;n++){if(void 0===t[e=a[n]])throw new Error("Key '"+e+"' is defined in the blueprint, but not in the input object!");r+=h[e].encode(t[e])}return r},this.decode=function(t,r){!0!==r&&(s=0);var e={};if(u){var n=l.from[c](t.substr(s,f));s+=f;for(o=0;o<n;o++){i=a[l.from[c](t.substr(s,f))];s+=f,e[i]=h[i].decode(t,!0)}}else for(var o=0;o<a.length;o++){var i;e[i=a[o]]=h[i].decode(t,!0)}return e}},Array:function(h,u){if(void 0!==u){var a="number"==typeof u;if(a){if((u=Math.floor(u))<0)throw new Error("Array cannot have a fixed length shorter than 0")}else{if(!(-1<r.indexOf(u)))throw new Error("Incorrect Array size number type '"+u+"'");var f=d(u)}}this.encode=function(t){if(t.length%h.length!=0)throw new Error("Array (length "+t.length+") contains at least one incomplete pattern!");var r="";if(void 0!==u){if(a){if(t.length!==u*h.length)throw new Error("Array pattern in the input isn't repeated exactly "+u+" times, as was specified")}else t=t.slice(0,(c[u]-1)*h.length);for(var e=Math.ceil(t.length/h.length),n=0;n<e;n++)for(var o=0;o<h.length;o++)r+=h[o].encode(t[n*h.length+o]);a||(r=l.to[u](e)+r)}else for(n=0;n<h.length;n++)r+=h[n].encode(t[n]);return r},this.decode=function(t,r){!0!==r&&(s=0);var e=[];if(u){var n;a?n=u:(n=l.from[u](t.substr(s,f)),s+=f);for(var o=0;o<n;o++)for(var i=0;i<h.length;i++)e[o*h.length+i]=h[i].decode(t,!0)}else for(o=0;o<h.length;o++)e[o]=h[o].decode(t,!0);return e}},Dynamic:function(o){var i=Object.keys(o);i.sort();var n=Math.ceil(Math.log2(i.length)/8)||1,h=e(n);n=d(h),this.encode=function(t,r){var e,n;if(void 0!==r?(e=t,n=r):(e=t.key,n=t.value),void 0===o[e])throw new Error("Key '"+e+"' is not defined!");return l.to[h](i.indexOf(e))+(null===o[e]?"":o[e].encode(n))},this.decode=function(t,r){!0!==r&&(s=0);var e=i[l.from[h](t.slice(s,n))];return s+=n,{key:e,value:null===o[e]?null:o[e].decode(t,!0)}}},NullWrapper:function(e){this.encode=function(t){return null===t?"\0":""+e.encode(t)},this.decode=function(t,r){return!0!==r&&(s=0),0===t.charCodeAt(s++)?null:e.decode(t,!0)}}},h=new ArrayBuffer(8),u=new Uint8Array(h),a=new Float32Array(h),f=new Float64Array(h),l={to:{uByte:function(t){return t=n(Math.round(t),c.byte),String.fromCharCode(t)},uShort:function(t){return t=n(Math.round(t),c.short),String.fromCharCode(Math.floor(t/c.byte))+String.fromCharCode(t%c.byte)},uTribyte:function(t){return t=n(Math.round(t),c.tribyte),String.fromCharCode(Math.floor(t/c.short))+String.fromCharCode(Math.floor(t%c.short/c.byte))+String.fromCharCode(t%c.byte)},uInt:function(t){return t=n(Math.round(t),c.int),String.fromCharCode(Math.floor(t/c.tribyte))+String.fromCharCode(Math.floor(t%c.tribyte/c.short))+String.fromCharCode(Math.floor(t%c.short/c.byte))+String.fromCharCode(t%c.byte)},sByte:function(t){return this.uByte(t+c.byte/2)},sShort:function(t){return this.uShort(t+c.short/2)},sTribyte:function(t){return this.uTribyte(t+c.tribyte/2)},sInt:function(t){return this.uInt(t+c.int/2)},float:function(t){return a[0]=t,String.fromCharCode(u[0])+String.fromCharCode(u[1])+String.fromCharCode(u[2])+String.fromCharCode(u[3])},double:function(t){return f[0]=t,String.fromCharCode(u[0])+String.fromCharCode(u[1])+String.fromCharCode(u[2])+String.fromCharCode(u[3])+String.fromCharCode(u[4])+String.fromCharCode(u[5])+String.fromCharCode(u[6])+String.fromCharCode(u[7])}},from:{uByte:function(t){return n(t.charCodeAt(0),c.byte)},uShort:function(t){return n(t.charCodeAt(0)*c.byte+t.charCodeAt(1),c.short)},uTribyte:function(t){return n(t.charCodeAt(0)*c.short+t.charCodeAt(1)*c.byte+t.charCodeAt(2),c.tribyte)},uInt:function(t){return n(t.charCodeAt(0)*c.tribyte+t.charCodeAt(1)*c.short+t.charCodeAt(2)*c.byte+t.charCodeAt(3),c.int)},sByte:function(t){return this.uByte(t)-c.byte/2},sShort:function(t){return this.uShort(t)-c.short/2},sTribyte:function(t){return this.uTribyte(t)-c.tribyte/2},sInt:function(t){return this.uInt(t)-c.int/2},float:function(t){return u[0]=t.charCodeAt(0),u[1]=t.charCodeAt(1),u[2]=t.charCodeAt(2),u[3]=t.charCodeAt(3),a[0]},double:function(t){return u[0]=t.charCodeAt(0),u[1]=t.charCodeAt(1),u[2]=t.charCodeAt(2),u[3]=t.charCodeAt(3),u[4]=t.charCodeAt(4),u[5]=t.charCodeAt(5),u[6]=t.charCodeAt(6),u[7]=t.charCodeAt(7),f[0]}}};l.to.byte=l.to.uByte,l.to.short=l.to.uShort,l.to.tribyte=l.to.uTribyte,l.to.int=l.to.uInt,l.from.byte=l.from.uByte,l.from.short=l.from.uShort,l.from.tribyte=l.from.uTribyte,l.from.int=l.from.uInt,"object"==typeof module&&"object"==typeof module.exports?module.exports=i:"undefined"!=typeof window?window.Binarify=i:this.Binarify=i}();