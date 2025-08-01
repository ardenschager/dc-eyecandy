// Chroma.js inline (not loading an external resource, as required by NAC)
!function(r,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(r="undefined"!=typeof globalThis?globalThis:r||self).chroma=n()}(this,(function(){"use strict";var r=Math.min,n=Math.max;function e(e,t,a){return void 0===t&&(t=0),void 0===a&&(a=1),r(n(t,e),a)}function t(r){r._clipped=!1,r._unclipped=r.slice(0);for(var n=0;n<=3;n++)n<3?((r[n]<0||r[n]>255)&&(r._clipped=!0),r[n]=e(r[n],0,255)):3===n&&(r[n]=e(r[n],0,1));return r}for(var a={},f=0,o=["Boolean","Number","String","Function","Array","Date","RegExp","Undefined","Null"];f<o.length;f+=1){var u=o[f];a["[object "+u+"]"]=u.toLowerCase()}function c(r){return a[Object.prototype.toString.call(r)]||"object"}function i(r,n){return void 0===n&&(n=null),r.length>=3?Array.prototype.slice.call(r):"object"==c(r[0])&&n?n.split("").filter((function(n){return void 0!==r[0][n]})).map((function(n){return r[0][n]})):r[0].slice(0)}function l(r){if(r.length<2)return null;var n=r.length-1;return"string"==c(r[n])?r[n].toLowerCase():null}var h=Math.PI,s=Math.min,d=Math.max,b=function(r){return Math.round(100*r)/100},g=function(r){return Math.round(100*r)/100},v=2*h,p=h/3,m=h/180,y=180/h;function w(r){return r.slice(0,3).reverse().concat(r.slice(3))}var k={format:{},autodetect:[]},M=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e=this;if("object"===c(r[0])&&r[0].constructor&&r[0].constructor===this.constructor)return r[0];var a=l(r),f=!1;if(!a){f=!0,k.sorted||(k.autodetect=k.autodetect.sort((function(r,n){return n.p-r.p})),k.sorted=!0);for(var o=0,u=k.autodetect;o<u.length;o+=1){var i=u[o];if(a=i.test.apply(i,r))break}}if(!k.format[a])throw new Error("unknown format: "+r);var h=k.format[a].apply(null,f?r:r.slice(0,-1));e._rgb=t(h),3===e._rgb.length&&e._rgb.push(1)};M.prototype.toString=function(){return"function"==c(this.hex)?this.hex():"["+this._rgb.join(",")+"]"};var N=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];return new(Function.prototype.bind.apply(M,[null].concat(r)))};N.version="3.1.2";var x=Math.max;M.prototype.cmyk=function(){return function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e=i(r,"rgb"),t=e[0],a=e[1],f=e[2],o=1-x(t/=255,x(a/=255,f/=255)),u=o<1?1/(1-o):0;return[(1-t-o)*u,(1-a-o)*u,(1-f-o)*u,o]}(this._rgb)};var _=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];return new(Function.prototype.bind.apply(M,[null].concat(r,["cmyk"])))};Object.assign(N,{cmyk:_}),k.format.cmyk=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e=(r=i(r,"cmyk"))[0],t=r[1],a=r[2],f=r[3],o=r.length>4?r[4]:1;return 1===f?[0,0,0,o]:[e>=1?0:255*(1-e)*(1-f),t>=1?0:255*(1-t)*(1-f),a>=1?0:255*(1-a)*(1-f),o]},k.autodetect.push({p:2,test:function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];if("array"===c(r=i(r,"cmyk"))&&4===r.length)return"cmyk"}});var A=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e,t,a=(r=i(r,"rgba"))[0],f=r[1],o=r[2],u=s(a/=255,f/=255,o/=255),c=d(a,f,o),l=(c+u)/2;return c===u?(e=0,t=Number.NaN):e=l<.5?(c-u)/(c+u):(c-u)/(2-c-u),a==c?t=(f-o)/(c-u):f==c?t=2+(o-a)/(c-u):o==c&&(t=4+(a-f)/(c-u)),(t*=60)<0&&(t+=360),r.length>3&&void 0!==r[3]?[t,e,l,r[3]]:[t,e,l]},j={Kn:18,labWhitePoint:"d65",Xn:.95047,Yn:1,Zn:1.08883,t0:.137931034,t1:.206896552,t2:.12841855,t3:.008856452,kE:216/24389,kKE:8,kK:24389/27,RefWhiteRGB:{X:.95047,Y:1,Z:1.08883},MtxRGB2XYZ:{m00:.4124564390896922,m01:.21267285140562253,m02:.0193338955823293,m10:.357576077643909,m11:.715152155287818,m12:.11919202588130297,m20:.18043748326639894,m21:.07217499330655958,m22:.9503040785363679},MtxXYZ2RGB:{m00:3.2404541621141045,m01:-.9692660305051868,m02:.055643430959114726,m10:-1.5371385127977166,m11:1.8760108454466942,m12:-.2040259135167538,m20:-.498531409556016,m21:.041556017530349834,m22:1.0572251882231791},As:.9414285350000001,Bs:1.040417467,Cs:1.089532651,MtxAdaptMa:{m00:.8951,m01:-.7502,m02:.0389,m10:.2664,m11:1.7135,m12:-.0685,m20:-.1614,m21:.0367,m22:1.0296},MtxAdaptMaI:{m00:.9869929054667123,m01:.43230526972339456,m02:-.008528664575177328,m10:-.14705425642099013,m11:.5183602715367776,m12:.04004282165408487,m20:.15996265166373125,m21:.0492912282128556,m22:.9684866957875502}},E=new Map([["a",[1.0985,.35585]],["b",[1.0985,.35585]],["c",[.98074,1.18232]],["d50",[.96422,.82521]],["d55",[.95682,.92149]],["d65",[.95047,1.08883]],["e",[1,1,1]],["f2",[.99186,.67393]],["f7",[.95041,1.08747]],["f11",[1.00962,.6435]],["icc",[.96422,.82521]]]);function R(r){var n=E.get(String(r).toLowerCase());if(!n)throw new Error("unknown Lab illuminant "+r);j.labWhitePoint=r,j.Xn=n[0],j.Zn=n[1]}function O(){return j.labWhitePoint}var P=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e=i(r,"rgb"),t=e[0],a=e[1],f=e[2],o=e.slice(3),u=L(t,a,f),c=function(r,n,e){var t=j.Xn,a=j.Yn,f=j.Zn,o=j.kE,u=j.kK,c=r/t,i=n/a,l=e/f,h=c>o?Math.pow(c,1/3):(u*c+16)/116,s=i>o?Math.pow(i,1/3):(u*i+16)/116,d=l>o?Math.pow(l,1/3):(u*l+16)/116;return[116*s-16,500*(h-s),200*(s-d)]}(u[0],u[1],u[2]);return[c[0],c[1],c[2]].concat(o.length>0&&o[0]<1?[o[0]]:[])};function F(r){var n=Math.sign(r);return((r=Math.abs(r))<=.04045?r/12.92:Math.pow((r+.055)/1.055,2.4))*n}var L=function(r,n,e){r=F(r/255),n=F(n/255),e=F(e/255);var t=j.MtxRGB2XYZ,a=j.MtxAdaptMa,f=j.MtxAdaptMaI,o=j.Xn,u=j.Yn,c=j.Zn,i=j.As,l=j.Bs,h=j.Cs,s=r*t.m00+n*t.m10+e*t.m20,d=r*t.m01+n*t.m11+e*t.m21,b=r*t.m02+n*t.m12+e*t.m22,g=o*a.m00+u*a.m10+c*a.m20,v=o*a.m01+u*a.m11+c*a.m21,p=o*a.m02+u*a.m12+c*a.m22,m=s*a.m00+d*a.m10+b*a.m20,y=s*a.m01+d*a.m11+b*a.m21,w=s*a.m02+d*a.m12+b*a.m22;return y*=v/l,w*=p/h,[s=(m*=g/i)*f.m00+y*f.m10+w*f.m20,d=m*f.m01+y*f.m11+w*f.m21,b=m*f.m02+y*f.m12+w*f.m22]},B=Math.sqrt,G=Math.atan2,Y=Math.round,q=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e=i(r,"lab"),t=e[0],a=e[1],f=e[2],o=B(a*a+f*f),u=(G(f,a)*y+360)%360;return 0===Y(1e4*o)&&(u=Number.NaN),[t,o,u]},C=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e=i(r,"rgb"),t=e[0],a=e[1],f=e[2],o=e.slice(3),u=P(t,a,f),c=u[0],l=u[1],h=u[2],s=q(c,l,h);return[s[0],s[1],s[2]].concat(o.length>0&&o[0]<1?[o[0]]:[])};function X(r,n){var e=r.length;Array.isArray(r[0])||(r=[r]),Array.isArray(n[0])||(n=n.map((function(r){return[r]})));var t=n[0].length,a=n[0].map((function(r,e){return n.map((function(r){return r[e]}))})),f=r.map((function(r){return a.map((function(n){return Array.isArray(r)?r.reduce((function(r,e,t){return r+e*(n[t]||0)}),0):n.reduce((function(n,e){return n+e*r}),0)}))}));return 1===e&&(f=f[0]),1===t?f.map((function(r){return r[0]})):f}var Z=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e,t,a=i(r,"rgb"),f=a[0],o=a[1],u=a[2],c=a.slice(3),l=L(f,o,u);return(e=[[.210454268309314,.7936177747023054,-.0040720430116193],[1.9779985324311684,-2.42859224204858,.450593709617411],[.0259040424655478,.7827717124575296,-.8086757549230774]],t=X([[.819022437996703,.3619062600528904,-.1288737815209879],[.0329836539323885,.9292868615863434,.0361446663506424],[.0481771893596242,.2642395317527308,.6335478284694309]],l),X(e,t.map((function(r){return Math.cbrt(r)})))).concat(c.length>0&&c[0]<1?[c[0]]:[])};var $=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e=i(r,"rgb"),t=e[0],a=e[1],f=e[2],o=e.slice(3),u=Z(t,a,f),c=u[0],l=u[1],h=u[2],s=q(c,l,h);return[s[0],s[1],s[2]].concat(o.length>0&&o[0]<1?[o[0]]:[])},S=Math.round,W=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e=i(r,"rgba"),t=l(r)||"rgb";if("hsl"===t.substr(0,3))return function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e=i(r,"hsla"),t=l(r)||"lsa";return e[0]=b(e[0]||0)+"deg",e[1]=b(100*e[1])+"%",e[2]=b(100*e[2])+"%","hsla"===t||e.length>3&&e[3]<1?(e[3]="/ "+(e.length>3?e[3]:1),t="hsla"):e.length=3,t.substr(0,3)+"("+e.join(" ")+")"}(A(e),t);if("lab"===t.substr(0,3)){var a=O();R("d50");var f=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e=i(r,"lab"),t=l(r)||"lab";return e[0]=b(e[0])+"%",e[1]=b(e[1]),e[2]=b(e[2]),"laba"===t||e.length>3&&e[3]<1?e[3]="/ "+(e.length>3?e[3]:1):e.length=3,"lab("+e.join(" ")+")"}(P(e),t);return R(a),f}if("lch"===t.substr(0,3)){var o=O();R("d50");var u=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e=i(r,"lch"),t=l(r)||"lab";return e[0]=b(e[0])+"%",e[1]=b(e[1]),e[2]=isNaN(e[2])?"none":b(e[2])+"deg","lcha"===t||e.length>3&&e[3]<1?e[3]="/ "+(e.length>3?e[3]:1):e.length=3,"lch("+e.join(" ")+")"}(C(e),t);return R(o),u}return"oklab"===t.substr(0,5)?function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e=i(r,"lab");return e[0]=b(100*e[0])+"%",e[1]=g(e[1]),e[2]=g(e[2]),e.length>3&&e[3]<1?e[3]="/ "+(e.length>3?e[3]:1):e.length=3,"oklab("+e.join(" ")+")"}(Z(e)):"oklch"===t.substr(0,5)?function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e=i(r,"lch");return e[0]=b(100*e[0])+"%",e[1]=g(e[1]),e[2]=isNaN(e[2])?"none":b(e[2])+"deg",e.length>3&&e[3]<1?e[3]="/ "+(e.length>3?e[3]:1):e.length=3,"oklch("+e.join(" ")+")"}($(e)):(e[0]=S(e[0]),e[1]=S(e[1]),e[2]=S(e[2]),("rgba"===t||e.length>3&&e[3]<1)&&(e[3]="/ "+(e.length>3?e[3]:1),t="rgba"),t.substr(0,3)+"("+e.slice(0,"rgb"===t?3:4).join(" ")+")")},I=function(){for(var r,n=[],e=arguments.length;e--;)n[e]=arguments[e];var t,a,f,o=(n=i(n,"hsl"))[0],u=n[1],c=n[2];if(0===u)t=a=f=255*c;else{var l=[0,0,0],h=[0,0,0],s=c<.5?c*(1+u):c+u-c*u,d=2*c-s,b=o/360;l[0]=b+1/3,l[1]=b,l[2]=b-1/3;for(var g=0;g<3;g++)l[g]<0&&(l[g]+=1),l[g]>1&&(l[g]-=1),6*l[g]<1?h[g]=d+6*(s-d)*l[g]:2*l[g]<1?h[g]=s:3*l[g]<2?h[g]=d+(s-d)*(2/3-l[g])*6:h[g]=d;t=(r=[255*h[0],255*h[1],255*h[2]])[0],a=r[1],f=r[2]}return n.length>3?[t,a,f,n[3]]:[t,a,f,1]},K=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e=(r=i(r,"lab"))[0],t=r[1],a=r[2],f=z(e,t,a),o=f[0],u=f[1],c=f[2],l=V(o,u,c);return[l[0],l[1],l[2],r.length>3?r[3]:1]},z=function(r,n,e){var t=j.kE,a=j.kK,f=j.kKE,o=j.Xn,u=j.Yn,c=j.Zn,i=(r+16)/116,l=.002*n+i,h=i-.005*e,s=l*l*l,d=h*h*h;return[(s>t?s:(116*l-16)/a)*o,(r>f?Math.pow((r+16)/116,3):r/a)*u,(d>t?d:(116*h-16)/a)*c]},U=function(r){var n=Math.sign(r);return((r=Math.abs(r))<=.0031308?12.92*r:1.055*Math.pow(r,1/2.4)-.055)*n},V=function(r,n,e){var t=j.MtxAdaptMa,a=j.MtxAdaptMaI,f=j.MtxXYZ2RGB,o=j.RefWhiteRGB,u=j.Xn,c=j.Yn,i=j.Zn,l=u*t.m00+c*t.m10+i*t.m20,h=u*t.m01+c*t.m11+i*t.m21,s=u*t.m02+c*t.m12+i*t.m22,d=o.X*t.m00+o.Y*t.m10+o.Z*t.m20,b=o.X*t.m01+o.Y*t.m11+o.Z*t.m21,g=o.X*t.m02+o.Y*t.m12+o.Z*t.m22,v=(r*t.m00+n*t.m10+e*t.m20)*(d/l),p=(r*t.m01+n*t.m11+e*t.m21)*(b/h),m=(r*t.m02+n*t.m12+e*t.m22)*(g/s),y=v*a.m00+p*a.m10+m*a.m20,w=v*a.m01+p*a.m11+m*a.m21,k=v*a.m02+p*a.m12+m*a.m22;return[255*U(y*f.m00+w*f.m10+k*f.m20),255*U(y*f.m01+w*f.m11+k*f.m21),255*U(y*f.m02+w*f.m12+k*f.m22)]},D=Math.sin,T=Math.cos,H=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e=i(r,"lch"),t=e[0],a=e[1],f=e[2];return isNaN(f)&&(f=0),[t,T(f*=m)*a,D(f)*a]},J=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e=(r=i(r,"lch"))[0],t=r[1],a=r[2],f=H(e,t,a),o=f[0],u=f[1],c=f[2],l=K(o,u,c);return[l[0],l[1],l[2],r.length>3?r[3]:1]},Q=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e,t,a=(r=i(r,"lab"))[0],f=r[1],o=r[2],u=r.slice(3),c=(e=[[1.2268798758459243,-.5578149944602171,.2813910456659647],[-.0405757452148008,1.112286803280317,-.0717110580655164],[-.0763729366746601,-.4214933324022432,1.5869240198367816]],t=X([[1,.3963377773761749,.2158037573099136],[1,-.1055613458156586,-.0638541728258133],[1,-.0894841775298119,-1.2914855480194092]],[a,f,o]),X(e,t.map((function(r){return Math.pow(r,3)})))),l=c[0],h=c[1],s=c[2],d=V(l,h,s);return[d[0],d[1],d[2]].concat(u.length>0&&u[0]<1?[u[0]]:[])};var rr=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e=(r=i(r,"lch"))[0],t=r[1],a=r[2],f=r.slice(3),o=H(e,t,a),u=o[0],c=o[1],l=o[2],h=Q(u,c,l);return[h[0],h[1],h[2]].concat(f.length>0&&f[0]<1?[f[0]]:[])},nr=/((?:-?\d+)|(?:-?\d+(?:\.\d+)?)%|none)/.source,er=/((?:-?(?:\d+(?:\.\d*)?|\.\d+)%?)|none)/.source,tr=/((?:-?(?:\d+(?:\.\d*)?|\.\d+)%)|none)/.source,ar=/\s*/.source,fr=/\s+/.source,or=/\s*,\s*/.source,ur=/((?:-?(?:\d+(?:\.\d*)?|\.\d+)(?:deg)?)|none)/.source,cr=/\s*(?:\/\s*((?:[01]|[01]?\.\d+)|\d+(?:\.\d+)?%))?/.source,ir=new RegExp("^rgba?\\("+ar+[nr,nr,nr].join(fr)+cr+"\\)$"),lr=new RegExp("^rgb\\("+ar+[nr,nr,nr].join(or)+ar+"\\)$"),hr=new RegExp("^rgba\\("+ar+[nr,nr,nr,er].join(or)+ar+"\\)$"),sr=new RegExp("^hsla?\\("+ar+[ur,tr,tr].join(fr)+cr+"\\)$"),dr=new RegExp("^hsl?\\("+ar+[ur,tr,tr].join(or)+ar+"\\)$"),br=/^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/,gr=new RegExp("^lab\\("+ar+[er,er,er].join(fr)+cr+"\\)$"),vr=new RegExp("^lch\\("+ar+[er,er,ur].join(fr)+cr+"\\)$"),pr=new RegExp("^oklab\\("+ar+[er,er,er].join(fr)+cr+"\\)$"),mr=new RegExp("^oklch\\("+ar+[er,er,ur].join(fr)+cr+"\\)$"),yr=Math.round,wr=function(r){return r.map((function(r,n){return n<=2?e(yr(r),0,255):r}))},kr=function(r,n,e,t){return void 0===n&&(n=0),void 0===e&&(e=100),void 0===t&&(t=!1),"string"==typeof r&&r.endsWith("%")&&(r=parseFloat(r.substring(0,r.length-1))/100,r=t?n+.5*(r+1)*(e-n):n+r*(e-n)),+r},Mr=function(r,n){return"none"===r?n:r},Nr=function(r){if("transparent"===(r=r.toLowerCase().trim()))return[0,0,0,0];var n;if(k.format.named)try{return k.format.named(r)}catch(r){}if((n=r.match(ir))||(n=r.match(lr))){for(var e=n.slice(1,4),t=0;t<3;t++)e[t]=+kr(Mr(e[t],0),0,255);e=wr(e);var a=void 0!==n[4]?+kr(n[4],0,1):1;return e[3]=a,e}if(n=r.match(hr)){for(var f=n.slice(1,5),o=0;o<4;o++)f[o]=+kr(f[o],0,255);return f}if((n=r.match(sr))||(n=r.match(dr))){var u=n.slice(1,4);u[0]=+Mr(u[0].replace("deg",""),0),u[1]=.01*+kr(Mr(u[1],0),0,100),u[2]=.01*+kr(Mr(u[2],0),0,100);var c=wr(I(u)),i=void 0!==n[4]?+kr(n[4],0,1):1;return c[3]=i,c}if(n=r.match(br)){var l=n.slice(1,4);l[1]*=.01,l[2]*=.01;for(var h=I(l),s=0;s<3;s++)h[s]=yr(h[s]);return h[3]=+n[4],h}if(n=r.match(gr)){var d=n.slice(1,4);d[0]=kr(Mr(d[0],0),0,100),d[1]=kr(Mr(d[1],0),-125,125,!0),d[2]=kr(Mr(d[2],0),-125,125,!0);var b=O();R("d50");var g=wr(K(d));R(b);var v=void 0!==n[4]?+kr(n[4],0,1):1;return g[3]=v,g}if(n=r.match(vr)){var p=n.slice(1,4);p[0]=kr(p[0],0,100),p[1]=kr(Mr(p[1],0),0,150,!1),p[2]=+Mr(p[2].replace("deg",""),0);var m=O();R("d50");var y=wr(J(p));R(m);var w=void 0!==n[4]?+kr(n[4],0,1):1;return y[3]=w,y}if(n=r.match(pr)){var M=n.slice(1,4);M[0]=kr(Mr(M[0],0),0,1),M[1]=kr(Mr(M[1],0),-.4,.4,!0),M[2]=kr(Mr(M[2],0),-.4,.4,!0);var N=wr(Q(M)),x=void 0!==n[4]?+kr(n[4],0,1):1;return N[3]=x,N}if(n=r.match(mr)){var _=n.slice(1,4);_[0]=kr(Mr(_[0],0),0,1),_[1]=kr(Mr(_[1],0),0,.4,!1),_[2]=+Mr(_[2].replace("deg",""),0);var A=wr(rr(_)),j=void 0!==n[4]?+kr(n[4],0,1):1;return A[3]=j,A}};Nr.test=function(r){return ir.test(r)||sr.test(r)||gr.test(r)||vr.test(r)||pr.test(r)||mr.test(r)||lr.test(r)||hr.test(r)||dr.test(r)||br.test(r)||"transparent"===r},M.prototype.css=function(r){return W(this._rgb,r)};var xr=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];return new(Function.prototype.bind.apply(M,[null].concat(r,["css"])))};N.css=xr,k.format.css=Nr,k.autodetect.push({p:5,test:function(r){for(var n=[],e=arguments.length-1;e-- >0;)n[e]=arguments[e+1];if(!n.length&&"string"===c(r)&&Nr.test(r))return"css"}}),k.format.gl=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e=i(r,"rgba");return e[0]*=255,e[1]*=255,e[2]*=255,e};var _r=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];return new(Function.prototype.bind.apply(M,[null].concat(r,["gl"])))};N.gl=_r,M.prototype.gl=function(){var r=this._rgb;return[r[0]/255,r[1]/255,r[2]/255,r[3]]};var Ar=Math.floor;M.prototype.hcg=function(){return function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e,t=i(r,"rgb"),a=t[0],f=t[1],o=t[2],u=s(a,f,o),c=d(a,f,o),l=c-u,h=100*l/255,b=u/(255-l)*100;return 0===l?e=Number.NaN:(a===c&&(e=(f-o)/l),f===c&&(e=2+(o-a)/l),o===c&&(e=4+(a-f)/l),(e*=60)<0&&(e+=360)),[e,h,b]}(this._rgb)};var jr=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];return new(Function.prototype.bind.apply(M,[null].concat(r,["hcg"])))};N.hcg=jr,k.format.hcg=function(){for(var r,n,e,t,a,f,o=[],u=arguments.length;u--;)o[u]=arguments[u];var c,l,h,s=(o=i(o,"hcg"))[0],d=o[1],b=o[2];b*=255;var g=255*d;if(0===d)c=l=h=b;else{360===s&&(s=0),s>360&&(s-=360),s<0&&(s+=360);var v=Ar(s/=60),p=s-v,m=b*(1-d),y=m+g*(1-p),w=m+g*p,k=m+g;switch(v){case 0:c=(r=[k,w,m])[0],l=r[1],h=r[2];break;case 1:c=(n=[y,k,m])[0],l=n[1],h=n[2];break;case 2:c=(e=[m,k,w])[0],l=e[1],h=e[2];break;case 3:c=(t=[m,y,k])[0],l=t[1],h=t[2];break;case 4:c=(a=[w,m,k])[0],l=a[1],h=a[2];break;case 5:c=(f=[k,m,y])[0],l=f[1],h=f[2]}}return[c,l,h,o.length>3?o[3]:1]},k.autodetect.push({p:1,test:function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];if("array"===c(r=i(r,"hcg"))&&3===r.length)return"hcg"}});var Er=/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,Rr=/^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/,Or=function(r){if(r.match(Er)){4!==r.length&&7!==r.length||(r=r.substr(1)),3===r.length&&(r=(r=r.split(""))[0]+r[0]+r[1]+r[1]+r[2]+r[2]);var n=parseInt(r,16);return[n>>16,n>>8&255,255&n,1]}if(r.match(Rr)){5!==r.length&&9!==r.length||(r=r.substr(1)),4===r.length&&(r=(r=r.split(""))[0]+r[0]+r[1]+r[1]+r[2]+r[2]+r[3]+r[3]);var e=parseInt(r,16);return[e>>24&255,e>>16&255,e>>8&255,Math.round((255&e)/255*100)/100]}throw new Error("unknown hex color: "+r)},Pr=Math.round,Fr=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e=i(r,"rgba"),t=e[0],a=e[1],f=e[2],o=e[3],u=l(r)||"auto";void 0===o&&(o=1),"auto"===u&&(u=o<1?"rgba":"rgb");var c="000000"+((t=Pr(t))<<16|(a=Pr(a))<<8|(f=Pr(f))).toString(16);c=c.substr(c.length-6);var h="0"+Pr(255*o).toString(16);switch(h=h.substr(h.length-2),u.toLowerCase()){case"rgba":return"#"+c+h;case"argb":return"#"+h+c;default:return"#"+c}};M.prototype.hex=function(r){return Fr(this._rgb,r)};var Lr=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];return new(Function.prototype.bind.apply(M,[null].concat(r,["hex"])))};N.hex=Lr,k.format.hex=Or,k.autodetect.push({p:4,test:function(r){for(var n=[],e=arguments.length-1;e-- >0;)n[e]=arguments[e+1];if(!n.length&&"string"===c(r)&&[3,4,5,6,7,8,9].indexOf(r.length)>=0)return"hex"}});var Br=Math.cos,Gr=Math.min,Yr=Math.sqrt,qr=Math.acos;M.prototype.hsi=function(){return function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e,t=i(r,"rgb"),a=t[0],f=t[1],o=t[2],u=Gr(a/=255,f/=255,o/=255),c=(a+f+o)/3,l=c>0?1-u/c:0;return 0===l?e=NaN:(e=(a-f+(a-o))/2,e/=Yr((a-f)*(a-f)+(a-o)*(f-o)),e=qr(e),o>f&&(e=v-e),e/=v),[360*e,l,c]}(this._rgb)};var Cr=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];return new(Function.prototype.bind.apply(M,[null].concat(r,["hsi"])))};N.hsi=Cr,k.format.hsi=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var t,a,f,o=(r=i(r,"hsi"))[0],u=r[1],c=r[2];return isNaN(o)&&(o=0),isNaN(u)&&(u=0),o>360&&(o-=360),o<0&&(o+=360),(o/=360)<1/3?a=1-((f=(1-u)/3)+(t=(1+u*Br(v*o)/Br(p-v*o))/3)):o<2/3?f=1-((t=(1-u)/3)+(a=(1+u*Br(v*(o-=1/3))/Br(p-v*o))/3)):t=1-((a=(1-u)/3)+(f=(1+u*Br(v*(o-=2/3))/Br(p-v*o))/3)),[255*(t=e(c*t*3)),255*(a=e(c*a*3)),255*(f=e(c*f*3)),r.length>3?r[3]:1]},k.autodetect.push({p:2,test:function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];if("array"===c(r=i(r,"hsi"))&&3===r.length)return"hsi"}}),M.prototype.hsl=function(){return A(this._rgb)};var Xr=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];return new(Function.prototype.bind.apply(M,[null].concat(r,["hsl"])))};N.hsl=Xr,k.format.hsl=I,k.autodetect.push({p:2,test:function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];if("array"===c(r=i(r,"hsl"))&&3===r.length)return"hsl"}});var Zr=Math.floor,$r=Math.min,Sr=Math.max;M.prototype.hsv=function(){return function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e,t,a,f=(r=i(r,"rgb"))[0],o=r[1],u=r[2],c=$r(f,o,u),l=Sr(f,o,u),h=l-c;return a=l/255,0===l?(e=Number.NaN,t=0):(t=h/l,f===l&&(e=(o-u)/h),o===l&&(e=2+(u-f)/h),u===l&&(e=4+(f-o)/h),(e*=60)<0&&(e+=360)),[e,t,a]}(this._rgb)};var Wr=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];return new(Function.prototype.bind.apply(M,[null].concat(r,["hsv"])))};N.hsv=Wr,k.format.hsv=function(){for(var r,n,e,t,a,f,o=[],u=arguments.length;u--;)o[u]=arguments[u];var c,l,h,s=(o=i(o,"hsv"))[0],d=o[1],b=o[2];if(b*=255,0===d)c=l=h=b;else{360===s&&(s=0),s>360&&(s-=360),s<0&&(s+=360);var g=Zr(s/=60),v=s-g,p=b*(1-d),m=b*(1-d*v),y=b*(1-d*(1-v));switch(g){case 0:c=(r=[b,y,p])[0],l=r[1],h=r[2];break;case 1:c=(n=[m,b,p])[0],l=n[1],h=n[2];break;case 2:c=(e=[p,b,y])[0],l=e[1],h=e[2];break;case 3:c=(t=[p,m,b])[0],l=t[1],h=t[2];break;case 4:c=(a=[y,p,b])[0],l=a[1],h=a[2];break;case 5:c=(f=[b,p,m])[0],l=f[1],h=f[2]}}return[c,l,h,o.length>3?o[3]:1]},k.autodetect.push({p:2,test:function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];if("array"===c(r=i(r,"hsv"))&&3===r.length)return"hsv"}}),M.prototype.lab=function(){return P(this._rgb)};var Ir=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];return new(Function.prototype.bind.apply(M,[null].concat(r,["lab"])))};Object.assign(N,{lab:Ir,getLabWhitePoint:O,setLabWhitePoint:R}),k.format.lab=K,k.autodetect.push({p:2,test:function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];if("array"===c(r=i(r,"lab"))&&3===r.length)return"lab"}});M.prototype.lch=function(){return C(this._rgb)},M.prototype.hcl=function(){return w(C(this._rgb))};var Kr=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];return new(Function.prototype.bind.apply(M,[null].concat(r,["lch"])))},zr=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];return new(Function.prototype.bind.apply(M,[null].concat(r,["hcl"])))};Object.assign(N,{lch:Kr,hcl:zr}),k.format.lch=J,k.format.hcl=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e=w(i(r,"hcl"));return J.apply(void 0,e)},["lch","hcl"].forEach((function(r){return k.autodetect.push({p:2,test:function(){for(var n=[],e=arguments.length;e--;)n[e]=arguments[e];if("array"===c(n=i(n,r))&&3===n.length)return r}})}));M.prototype.num=function(){return function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e=i(r,"rgb");return(e[0]<<16)+(e[1]<<8)+e[2]}(this._rgb)};var Ur=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];return new(Function.prototype.bind.apply(M,[null].concat(r,["num"])))};Object.assign(N,{num:Ur}),k.format.num=function(r){if("number"==c(r)&&r>=0&&r<=16777215)return[r>>16,r>>8&255,255&r,1];throw new Error("unknown num color: "+r)},k.autodetect.push({p:5,test:function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];if(1===r.length&&"number"===c(r[0])&&r[0]>=0&&r[0]<=16777215)return"num"}});var Vr=Math.round;M.prototype.rgb=function(r){return void 0===r&&(r=!0),!1===r?this._rgb.slice(0,3):this._rgb.slice(0,3).map(Vr)},M.prototype.rgba=function(r){return void 0===r&&(r=!0),this._rgb.slice(0,4).map((function(n,e){return e<3?!1===r?n:Vr(n):n}))};var Dr=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];return new(Function.prototype.bind.apply(M,[null].concat(r,["rgb"])))};Object.assign(N,{rgb:Dr}),k.format.rgb=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];var e=i(r,"rgba");return void 0===e[3]&&(e[3]=1),e},k.autodetect.push({p:3,test:function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];if("array"===c(r=i(r,"rgba"))&&(3===r.length||4===r.length&&"number"==c(r[3])&&r[3]>=0&&r[3]<=1))return"rgb"}});var Tr=Math.log,Hr=function(r){var n,e,t,a=r/100;return a<66?(n=255,e=a<6?0:-155.25485562709179-.44596950469579133*(e=a-2)+104.49216199393888*Tr(e),t=a<20?0:.8274096064007395*(t=a-10)-254.76935184120902+115.67994401066147*Tr(t)):(n=351.97690566805693+.114206453784165*(n=a-55)-40.25366309332127*Tr(n),e=325.4494125711974+.07943456536662342*(e=a-50)-28.0852963507957*Tr(e),t=255),[n,e,t,1]},Jr=Math.round;M.prototype.temp=M.prototype.kelvin=M.prototype.temperature=function(){return function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];for(var e,t=i(r,"rgb"),a=t[0],f=t[2],o=1e3,u=4e4;u-o>.4;){var c=Hr(e=.5*(u+o));c[2]/c[0]>=f/a?u=e:o=e}return Jr(e)}(this._rgb)};var Qr=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];return new(Function.prototype.bind.apply(M,[null].concat(r,["temp"])))};Object.assign(N,{temp:Qr,kelvin:Qr,temperature:Qr}),k.format.temp=k.format.kelvin=k.format.temperature=Hr,M.prototype.oklab=function(){return Z(this._rgb)};var rn=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];return new(Function.prototype.bind.apply(M,[null].concat(r,["oklab"])))};Object.assign(N,{oklab:rn}),k.format.oklab=Q,k.autodetect.push({p:2,test:function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];if("array"===c(r=i(r,"oklab"))&&3===r.length)return"oklab"}}),M.prototype.oklch=function(){return $(this._rgb)};var nn=function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];return new(Function.prototype.bind.apply(M,[null].concat(r,["oklch"])))};Object.assign(N,{oklch:nn}),k.format.oklch=rr,k.autodetect.push({p:2,test:function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];if("array"===c(r=i(r,"oklch"))&&3===r.length)return"oklch"}});var en={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",laserlemon:"#ffff54",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrod:"#fafad2",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",maroon2:"#7f0000",maroon3:"#b03060",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",purple2:"#7f007f",purple3:"#a020f0",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};M.prototype.name=function(){for(var r=Fr(this._rgb,"rgb"),n=0,e=Object.keys(en);n<e.length;n+=1){var t=e[n];if(en[t]===r)return t.toLowerCase()}return r},k.format.named=function(r){if(r=r.toLowerCase(),en[r])return Or(en[r]);throw new Error("unknown color name: "+r)},k.autodetect.push({p:5,test:function(r){for(var n=[],e=arguments.length-1;e-- >0;)n[e]=arguments[e+1];if(!n.length&&"string"===c(r)&&en[r.toLowerCase()])return"named"}}),M.prototype.alpha=function(r,n){return void 0===n&&(n=!1),void 0!==r&&"number"===c(r)?n?(this._rgb[3]=r,this):new M([this._rgb[0],this._rgb[1],this._rgb[2],r],"rgb"):this._rgb[3]},M.prototype.clipped=function(){return this._rgb._clipped||!1},M.prototype.darken=function(r){void 0===r&&(r=1);var n=this.lab();return n[0]-=j.Kn*r,new M(n,"lab").alpha(this.alpha(),!0)},M.prototype.brighten=function(r){return void 0===r&&(r=1),this.darken(-r)},M.prototype.darker=M.prototype.darken,M.prototype.brighter=M.prototype.brighten,M.prototype.get=function(r){var n=r.split("."),e=n[0],t=n[1],a=this[e]();if(t){var f=e.indexOf(t)-("ok"===e.substr(0,2)?2:0);if(f>-1)return a[f];throw new Error("unknown channel "+t+" in mode "+e)}return a};var tn=Math.pow;M.prototype.luminance=function(r,n){if(void 0===n&&(n="rgb"),void 0!==r&&"number"===c(r)){if(0===r)return new M([0,0,0,this._rgb[3]],"rgb");if(1===r)return new M([255,255,255,this._rgb[3]],"rgb");var e=this.luminance(),t=20,a=function(e,f){var o=e.interpolate(f,.5,n),u=o.luminance();return Math.abs(r-u)<1e-7||!t--?o:u>r?a(e,o):a(o,f)},f=(e>r?a(new M([0,0,0]),this):a(this,new M([255,255,255]))).rgb();return new M(f.concat([this._rgb[3]]))}return an.apply(void 0,this._rgb.slice(0,3))};var an=function(r,n,e){return.2126*(r=fn(r))+.7152*(n=fn(n))+.0722*(e=fn(e))},fn=function(r){return(r/=255)<=.03928?r/12.92:tn((r+.055)/1.055,2.4)},on={};function un(r,n,e){void 0===e&&(e=.5);for(var t=[],a=arguments.length-3;a-- >0;)t[a]=arguments[a+3];var f=t[0]||"lrgb";if(on[f]||t.length||(f=Object.keys(on)[0]),!on[f])throw new Error("interpolation mode "+f+" is not defined");return"object"!==c(r)&&(r=new M(r)),"object"!==c(n)&&(n=new M(n)),on[f](r,n,e).alpha(r.alpha()+e*(n.alpha()-r.alpha()))}M.prototype.mix=M.prototype.interpolate=function(r,n){void 0===n&&(n=.5);for(var e=[],t=arguments.length-2;t-- >0;)e[t]=arguments[t+2];return un.apply(void 0,[this,r,n].concat(e))},M.prototype.premultiply=function(r){void 0===r&&(r=!1);var n=this._rgb,e=n[3];return r?(this._rgb=[n[0]*e,n[1]*e,n[2]*e,e],this):new M([n[0]*e,n[1]*e,n[2]*e,e],"rgb")},M.prototype.saturate=function(r){void 0===r&&(r=1);var n=this.lch();return n[1]+=j.Kn*r,n[1]<0&&(n[1]=0),new M(n,"lch").alpha(this.alpha(),!0)},M.prototype.desaturate=function(r){return void 0===r&&(r=1),this.saturate(-r)},M.prototype.set=function(r,n,e){void 0===e&&(e=!1);var t=r.split("."),a=t[0],f=t[1],o=this[a]();if(f){var u=a.indexOf(f)-("ok"===a.substr(0,2)?2:0);if(u>-1){if("string"==c(n))switch(n.charAt(0)){case"+":case"-":o[u]+=+n;break;case"*":o[u]*=+n.substr(1);break;case"/":o[u]/=+n.substr(1);break;default:o[u]=+n}else{if("number"!==c(n))throw new Error("unsupported value for Color.set");o[u]=n}var i=new M(o,a);return e?(this._rgb=i._rgb,this):i}throw new Error("unknown channel "+f+" in mode "+a)}return o},M.prototype.tint=function(r){void 0===r&&(r=.5);for(var n=[],e=arguments.length-1;e-- >0;)n[e]=arguments[e+1];return un.apply(void 0,[this,"white",r].concat(n))},M.prototype.shade=function(r){void 0===r&&(r=.5);for(var n=[],e=arguments.length-1;e-- >0;)n[e]=arguments[e+1];return un.apply(void 0,[this,"black",r].concat(n))};on.rgb=function(r,n,e){var t=r._rgb,a=n._rgb;return new M(t[0]+e*(a[0]-t[0]),t[1]+e*(a[1]-t[1]),t[2]+e*(a[2]-t[2]),"rgb")};var cn=Math.sqrt,ln=Math.pow;on.lrgb=function(r,n,e){var t=r._rgb,a=t[0],f=t[1],o=t[2],u=n._rgb,c=u[0],i=u[1],l=u[2];return new M(cn(ln(a,2)*(1-e)+ln(c,2)*e),cn(ln(f,2)*(1-e)+ln(i,2)*e),cn(ln(o,2)*(1-e)+ln(l,2)*e),"rgb")};function hn(r,n,e,t){var a,f,o,u,c,i,l,h,s,d,b,g,v;return"hsl"===t?(o=r.hsl(),u=n.hsl()):"hsv"===t?(o=r.hsv(),u=n.hsv()):"hcg"===t?(o=r.hcg(),u=n.hcg()):"hsi"===t?(o=r.hsi(),u=n.hsi()):"lch"===t||"hcl"===t?(t="hcl",o=r.hcl(),u=n.hcl()):"oklch"===t&&(o=r.oklch().reverse(),u=n.oklch().reverse()),"h"!==t.substr(0,1)&&"oklch"!==t||(c=(a=o)[0],l=a[1],s=a[2],i=(f=u)[0],h=f[1],d=f[2]),isNaN(c)||isNaN(i)?isNaN(c)?isNaN(i)?g=Number.NaN:(g=i,1!=s&&0!=s||"hsv"==t||(b=h)):(g=c,1!=d&&0!=d||"hsv"==t||(b=l)):g=c+e*(i>c&&i-c>180?i-(c+360):i<c&&c-i>180?i+360-c:i-c),void 0===b&&(b=l+e*(h-l)),v=s+e*(d-s),new M("oklch"===t?[v,b,g]:[g,b,v],t)}on.lab=function(r,n,e){var t=r.lab(),a=n.lab();return new M(t[0]+e*(a[0]-t[0]),t[1]+e*(a[1]-t[1]),t[2]+e*(a[2]-t[2]),"lab")};var sn=function(r,n,e){return hn(r,n,e,"lch")};on.lch=sn,on.hcl=sn;on.num=function(r,n,e){var t=r.num(),a=n.num();return new M(t+e*(a-t),"num")};on.hcg=function(r,n,e){return hn(r,n,e,"hcg")};on.hsi=function(r,n,e){return hn(r,n,e,"hsi")};on.hsl=function(r,n,e){return hn(r,n,e,"hsl")};on.hsv=function(r,n,e){return hn(r,n,e,"hsv")};on.oklab=function(r,n,e){var t=r.oklab(),a=n.oklab();return new M(t[0]+e*(a[0]-t[0]),t[1]+e*(a[1]-t[1]),t[2]+e*(a[2]-t[2]),"oklab")};on.oklch=function(r,n,e){return hn(r,n,e,"oklch")};var dn=Math.pow,bn=Math.sqrt,gn=Math.PI,vn=Math.cos,pn=Math.sin,mn=Math.atan2;var yn=function(r,n){for(var e=r.length,a=[0,0,0,0],f=0;f<r.length;f++){var o=r[f],u=n[f]/e,c=o._rgb;a[0]+=dn(c[0],2)*u,a[1]+=dn(c[1],2)*u,a[2]+=dn(c[2],2)*u,a[3]+=c[3]*u}return a[0]=bn(a[0]),a[1]=bn(a[1]),a[2]=bn(a[2]),a[3]>.9999999&&(a[3]=1),new M(t(a))},wn=Math.pow;function kn(r){var n="rgb",t=N("#ccc"),a=0,f=[0,1],o=[],u=[0,0],i=!1,l=[],h=!1,s=0,d=1,b=!1,g={},v=!0,p=1,m=function(r){if((r=r||["#fff","#000"])&&"string"===c(r)&&N.brewer&&N.brewer[r.toLowerCase()]&&(r=N.brewer[r.toLowerCase()]),"array"===c(r)){1===r.length&&(r=[r[0],r[0]]),r=r.slice(0);for(var n=0;n<r.length;n++)r[n]=N(r[n]);o.length=0;for(var e=0;e<r.length;e++)o.push(e/(r.length-1))}return M(),l=r},y=function(r){return r},w=function(r){return r},k=function(r,a){var f,h;if(null==a&&(a=!1),isNaN(r)||null===r)return t;if(a)h=r;else if(i&&i.length>2){var b=function(r){if(null!=i){for(var n=i.length-1,e=0;e<n&&r>=i[e];)e++;return e-1}return 0}(r);h=b/(i.length-2)}else h=d!==s?(r-s)/(d-s):1;h=w(h),a||(h=y(h)),1!==p&&(h=wn(h,p)),h=e(h=u[0]+h*(1-u[0]-u[1]),0,1);var m=Math.floor(1e4*h);if(v&&g[m])f=g[m];else{if("array"===c(l))for(var k=0;k<o.length;k++){var M=o[k];if(h<=M){f=l[k];break}if(h>=M&&k===o.length-1){f=l[k];break}if(h>M&&h<o[k+1]){h=(h-M)/(o[k+1]-M),f=N.interpolate(l[k],l[k+1],h,n);break}}else"function"===c(l)&&(f=l(h));v&&(g[m]=f)}return f},M=function(){return g={}};m(r);var x=function(r){var n=N(k(r));return h&&n[h]?n[h]():n};return x.classes=function(r){if(null!=r){if("array"===c(r))i=r,f=[r[0],r[r.length-1]];else{var n=N.analyze(f);i=0===r?[n.min,n.max]:N.limits(n,"e",r)}return x}return i},x.domain=function(r){if(!arguments.length)return f;s=r[0],d=r[r.length-1],o=[];var n=l.length;if(r.length===n&&s!==d)for(var e=0,t=Array.from(r);e<t.length;e+=1){var a=t[e];o.push((a-s)/(d-s))}else{for(var u=0;u<n;u++)o.push(u/(n-1));if(r.length>2){var c=r.map((function(n,e){return e/(r.length-1)})),i=r.map((function(r){return(r-s)/(d-s)}));i.every((function(r,n){return c[n]===r}))||(w=function(r){if(r<=0||r>=1)return r;for(var n=0;r>=i[n+1];)n++;var e=(r-i[n])/(i[n+1]-i[n]);return c[n]+e*(c[n+1]-c[n])})}}return f=[s,d],x},x.mode=function(r){return arguments.length?(n=r,M(),x):n},x.range=function(r,n){return m(r),x},x.out=function(r){return h=r,x},x.spread=function(r){return arguments.length?(a=r,x):a},x.correctLightness=function(r){return null==r&&(r=!0),b=r,M(),y=b?function(r){for(var n=k(0,!0).lab()[0],e=k(1,!0).lab()[0],t=n>e,a=k(r,!0).lab()[0],f=n+(e-n)*r,o=a-f,u=0,c=1,i=20;Math.abs(o)>.01&&i-- >0;)t&&(o*=-1),o<0?(u=r,r+=.5*(c-r)):(c=r,r+=.5*(u-r)),a=k(r,!0).lab()[0],o=a-f;return r}:function(r){return r},x},x.padding=function(r){return null!=r?("number"===c(r)&&(r=[r,r]),u=r,x):u},x.colors=function(n,e){arguments.length<2&&(e="hex");var t=[];if(0===arguments.length)t=l.slice(0);else if(1===n)t=[x(.5)];else if(n>1){var a=f[0],o=f[1]-a;t=function(r,n){for(var e=[],t=r<n,a=n,f=r;t?f<a:f>a;t?f++:f--)e.push(f);return e}(0,n).map((function(r){return x(a+r/(n-1)*o)}))}else{r=[];var u=[];if(i&&i.length>2)for(var c=1,h=i.length,s=1<=h;s?c<h:c>h;s?c++:c--)u.push(.5*(i[c-1]+i[c]));else u=f;t=u.map((function(r){return x(r)}))}return N[e]&&(t=t.map((function(r){return r[e]()}))),t},x.cache=function(r){return null!=r?(v=r,x):v},x.gamma=function(r){return null!=r?(p=r,x):p},x.nodata=function(r){return null!=r?(t=N(r),x):t},x}var Mn=function(r,n,e){if(!Mn[e])throw new Error("unknown blend mode "+e);return Mn[e](r,n)},Nn=function(r){return function(n,e){var t=N(e).rgb(),a=N(n).rgb();return N.rgb(r(t,a))}},xn=function(r){return function(n,e){var t=[];return t[0]=r(n[0],e[0]),t[1]=r(n[1],e[1]),t[2]=r(n[2],e[2]),t}};Mn.normal=Nn(xn((function(r){return r}))),Mn.multiply=Nn(xn((function(r,n){return r*n/255}))),Mn.screen=Nn(xn((function(r,n){return 255*(1-(1-r/255)*(1-n/255))}))),Mn.overlay=Nn(xn((function(r,n){return n<128?2*r*n/255:255*(1-2*(1-r/255)*(1-n/255))}))),Mn.darken=Nn(xn((function(r,n){return r>n?n:r}))),Mn.lighten=Nn(xn((function(r,n){return r>n?r:n}))),Mn.dodge=Nn(xn((function(r,n){return 255===r||(r=n/255*255/(1-r/255))>255?255:r}))),Mn.burn=Nn(xn((function(r,n){return 255*(1-(1-n/255)/(r/255))})));var _n=Math.pow,An=Math.sin,jn=Math.cos;var En=Math.floor,Rn=Math.random;var On=Math.log,Pn=Math.pow,Fn=Math.floor,Ln=Math.abs;function Bn(r,n){void 0===n&&(n=null);var e={min:Number.MAX_VALUE,max:-1*Number.MAX_VALUE,sum:0,values:[],count:0};return"object"===c(r)&&(r=Object.values(r)),r.forEach((function(r){n&&"object"===c(r)&&(r=r[n]),null==r||isNaN(r)||(e.values.push(r),e.sum+=r,r<e.min&&(e.min=r),r>e.max&&(e.max=r),e.count+=1)})),e.domain=[e.min,e.max],e.limits=function(r,n){return Gn(e,r,n)},e}function Gn(r,n,e){void 0===n&&(n="equal"),void 0===e&&(e=7),"array"==c(r)&&(r=Bn(r));var t=r.min,a=r.max,f=r.values.sort((function(r,n){return r-n}));if(1===e)return[t,a];var o=[];if("c"===n.substr(0,1)&&(o.push(t),o.push(a)),"e"===n.substr(0,1)){o.push(t);for(var u=1;u<e;u++)o.push(t+u/e*(a-t));o.push(a)}else if("l"===n.substr(0,1)){if(t<=0)throw new Error("Logarithmic scales are only possible for values > 0");var i=Math.LOG10E*On(t),l=Math.LOG10E*On(a);o.push(t);for(var h=1;h<e;h++)o.push(Pn(10,i+h/e*(l-i)));o.push(a)}else if("q"===n.substr(0,1)){o.push(t);for(var s=1;s<e;s++){var d=(f.length-1)*s/e,b=Fn(d);if(b===d)o.push(f[b]);else{var g=d-b;o.push(f[b]*(1-g)+f[b+1]*g)}}o.push(a)}else if("k"===n.substr(0,1)){var v,p=f.length,m=new Array(p),y=new Array(e),w=!0,k=0,M=null;(M=[]).push(t);for(var N=1;N<e;N++)M.push(t+N/e*(a-t));for(M.push(a);w;){for(var x=0;x<e;x++)y[x]=0;for(var _=0;_<p;_++)for(var A=f[_],j=Number.MAX_VALUE,E=void 0,R=0;R<e;R++){var O=Ln(M[R]-A);O<j&&(j=O,E=R),y[E]++,m[_]=E}for(var P=new Array(e),F=0;F<e;F++)P[F]=null;for(var L=0;L<p;L++)null===P[v=m[L]]?P[v]=f[L]:P[v]+=f[L];for(var B=0;B<e;B++)P[B]*=1/y[B];w=!1;for(var G=0;G<e;G++)if(P[G]!==M[G]){w=!0;break}M=P,++k>200&&(w=!1)}for(var Y={},q=0;q<e;q++)Y[q]=[];for(var C=0;C<p;C++)Y[v=m[C]].push(f[C]);for(var X=[],Z=0;Z<e;Z++)X.push(Y[Z][0]),X.push(Y[Z][Y[Z].length-1]);X=X.sort((function(r,n){return r-n})),o.push(X[0]);for(var $=1;$<X.length;$+=2){var S=X[$];isNaN(S)||-1!==o.indexOf(S)||o.push(S)}}return o}
var Yn=.022;function qn(r,n,e){return.2126729*Math.pow(r/255,2.4)+.7151522*Math.pow(n/255,2.4)+.072175*Math.pow(e/255,2.4)}var Cn=Math.sqrt,Xn=Math.pow,Zn=Math.min,$n=Math.max,Sn=Math.atan2,Wn=Math.abs,In=Math.cos,Kn=Math.sin,zn=Math.exp,Un=Math.PI;var Vn={cool:function(){return kn([N.hsl(180,1,.9),N.hsl(250,.7,.4)])},hot:function(){return kn(["#000","#f00","#ff0","#fff"]).mode("rgb")}},Dn={OrRd:["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#b30000","#7f0000"],PuBu:["#fff7fb","#ece7f2","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#045a8d","#023858"],BuPu:["#f7fcfd","#e0ecf4","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#810f7c","#4d004b"],Oranges:["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#a63603","#7f2704"],BuGn:["#f7fcfd","#e5f5f9","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#006d2c","#00441b"],YlOrBr:["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#993404","#662506"],YlGn:["#ffffe5","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#006837","#004529"],Reds:["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d"],RdPu:["#fff7f3","#fde0dd","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177","#49006a"],Greens:["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#006d2c","#00441b"],YlGnBu:["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"],Purples:["#fcfbfd","#efedf5","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#54278f","#3f007d"],GnBu:["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#0868ac","#084081"],Greys:["#ffffff","#f0f0f0","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525","#000000"],YlOrRd:["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#bd0026","#800026"],PuRd:["#f7f4f9","#e7e1ef","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#980043","#67001f"],Blues:["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c","#08306b"],PuBuGn:["#fff7fb","#ece2f0","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016c59","#014636"],Viridis:["#440154","#482777","#3f4a8a","#31678e","#26838f","#1f9d8a","#6cce5a","#b6de2b","#fee825"],Spectral:["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"],RdYlGn:["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"],RdBu:["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac","#053061"],PiYG:["#8e0152","#c51b7d","#de77ae","#f1b6da","#fde0ef","#f7f7f7","#e6f5d0","#b8e186","#7fbc41","#4d9221","#276419"],PRGn:["#40004b","#762a83","#9970ab","#c2a5cf","#e7d4e8","#f7f7f7","#d9f0d3","#a6dba0","#5aae61","#1b7837","#00441b"],RdYlBu:["#a50026","#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"],BrBG:["#543005","#8c510a","#bf812d","#dfc27d","#f6e8c3","#f5f5f5","#c7eae5","#80cdc1","#35978f","#01665e","#003c30"],RdGy:["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#ffffff","#e0e0e0","#bababa","#878787","#4d4d4d","#1a1a1a"],PuOr:["#7f3b08","#b35806","#e08214","#fdb863","#fee0b6","#f7f7f7","#d8daeb","#b2abd2","#8073ac","#542788","#2d004b"],Set2:["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#b3b3b3"],Accent:["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f","#bf5b17","#666666"],Set1:["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf","#999999"],Set3:["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"],Dark2:["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666"],Paired:["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"],Pastel2:["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fff2ae","#f1e2cc","#cccccc"],Pastel1:["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd","#fddaec","#f2f2f2"]},Tn=Object.keys(Dn),Hn=new Map(Tn.map((function(r){return[r.toLowerCase(),r]}))),Jn="function"==typeof Proxy?new Proxy(Dn,{get:function(r,n){var e=n.toLowerCase();if(Hn.has(e))return r[Hn.get(e)]},getOwnPropertyNames:function(){return Object.getOwnPropertyNames(Tn)}}):Dn;return Object.assign(N,{analyze:Bn,average:function(r,n,e){void 0===n&&(n="lrgb"),void 0===e&&(e=null);var t=r.length;e||(e=Array.from(new Array(t)).map((function(){return 1})));var a=t/e.reduce((function(r,n){return r+n}));if(e.forEach((function(r,n){e[n]*=a})),r=r.map((function(r){return new M(r)})),"lrgb"===n)return yn(r,e);for(var f=r.shift(),o=f.get(n),u=[],c=0,i=0,l=0;l<o.length;l++)if(o[l]=(o[l]||0)*e[0],u.push(isNaN(o[l])?0:e[0]),"h"===n.charAt(l)&&!isNaN(o[l])){var h=o[l]/180*gn;c+=vn(h)*e[0],i+=pn(h)*e[0]}var s=f.alpha()*e[0];r.forEach((function(r,t){var a=r.get(n);s+=r.alpha()*e[t+1];for(var f=0;f<o.length;f++)if(!isNaN(a[f]))if(u[f]+=e[t+1],"h"===n.charAt(f)){var l=a[f]/180*gn;c+=vn(l)*e[t+1],i+=pn(l)*e[t+1]}else o[f]+=a[f]*e[t+1]}));for(var d=0;d<o.length;d++)if("h"===n.charAt(d)){for(var b=mn(i/u[d],c/u[d])/gn*180;b<0;)b+=360;for(;b>=360;)b-=360;o[d]=b}else o[d]=o[d]/u[d];return s/=t,new M(o,n).alpha(s>.99999?1:s,!0)},bezier:function(r){var n=function(r){var n,e,t,a,f,o,u;if(2===(r=r.map((function(r){return new M(r)}))).length)n=r.map((function(r){return r.lab()})),f=n[0],o=n[1],a=function(r){var n=[0,1,2].map((function(n){return f[n]+r*(o[n]-f[n])}));return new M(n,"lab")};else if(3===r.length)e=r.map((function(r){return r.lab()})),f=e[0],o=e[1],u=e[2],a=function(r){var n=[0,1,2].map((function(n){return(1-r)*(1-r)*f[n]+2*(1-r)*r*o[n]+r*r*u[n]}));return new M(n,"lab")};else if(4===r.length){var c;t=r.map((function(r){return r.lab()})),f=t[0],o=t[1],u=t[2],c=t[3],a=function(r){var n=[0,1,2].map((function(n){return(1-r)*(1-r)*(1-r)*f[n]+3*(1-r)*(1-r)*r*o[n]+3*(1-r)*r*r*u[n]+r*r*r*c[n]}));return new M(n,"lab")}}else{if(!(r.length>=5))throw new RangeError("No point in running bezier with only one color.");var i,l,h;i=r.map((function(r){return r.lab()})),h=r.length-1,l=function(r){for(var n=[1,1],e=1;e<r;e++){for(var t=[1],a=1;a<=n.length;a++)t[a]=(n[a]||0)+n[a-1];n=t}return n}(h),a=function(r){var n=1-r,e=[0,1,2].map((function(e){return i.reduce((function(t,a,f){return t+l[f]*Math.pow(n,h-f)*Math.pow(r,f)*a[e]}),0)}));return new M(e,"lab")}}return a}(r);return n.scale=function(){return kn(n)},n},blend:Mn,brewer:Jn,Color:M,colors:en,contrast:function(r,n){r=new M(r),n=new M(n);var e=r.luminance(),t=n.luminance();return e>t?(e+.05)/(t+.05):(t+.05)/(e+.05)},contrastAPCA:function(r,n){r=new M(r),n=new M(n),r.alpha()<1&&(r=un(n,r,r.alpha(),"rgb"));var e=qn.apply(void 0,r.rgb()),t=qn.apply(void 0,n.rgb()),a=e>=Yn?e:e+Math.pow(Yn-e,1.414),f=t>=Yn?t:t+Math.pow(Yn-t,1.414),o=Math.pow(f,.56)-Math.pow(a,.57),u=Math.pow(f,.65)-Math.pow(a,.62),c=Math.abs(f-a)<5e-4?0:a<f?1.14*o:1.14*u;return 100*(Math.abs(c)<.1?0:c>0?c-.027:c+.027)},cubehelix:function(r,n,e,a,f){void 0===r&&(r=300),void 0===n&&(n=-1.5),void 0===e&&(e=1),void 0===a&&(a=1),void 0===f&&(f=[0,1]);var o,u=0;"array"===c(f)?o=f[1]-f[0]:(o=0,f=[f,f]);var i=function(c){var i=v*((r+120)/360+n*c),l=_n(f[0]+o*c,a),h=(0!==u?e[0]+c*u:e)*l*(1-l)/2,s=jn(i),d=An(i);return N(t([255*(l+h*(-.14861*s+1.78277*d)),255*(l+h*(-.29227*s-.90649*d)),255*(l+h*(1.97294*s)),1]))};return i.start=function(n){return null==n?r:(r=n,i)},i.rotations=function(r){return null==r?n:(n=r,i)},i.gamma=function(r){return null==r?a:(a=r,i)},i.hue=function(r){return null==r?e:("array"===c(e=r)?0===(u=e[1]-e[0])&&(e=e[1]):u=0,i)},i.lightness=function(r){return null==r?f:("array"===c(r)?(f=r,o=r[1]-r[0]):(f=[r,r],o=0),i)},i.scale=function(){return N.scale(i)},i.hue(e),i},deltaE:function(r,n,e,t,a){void 0===e&&(e=1),void 0===t&&(t=1),void 0===a&&(a=1);var f=function(r){return 360*r/(2*Un)},o=function(r){return 2*Un*r/360};r=new M(r),n=new M(n);var u=Array.from(r.lab()),c=u[0],i=u[1],l=u[2],h=Array.from(n.lab()),s=h[0],d=h[1],b=h[2],g=(c+s)/2,v=(Cn(Xn(i,2)+Xn(l,2))+Cn(Xn(d,2)+Xn(b,2)))/2,p=.5*(1-Cn(Xn(v,7)/(Xn(v,7)+Xn(25,7)))),m=i*(1+p),y=d*(1+p),w=Cn(Xn(m,2)+Xn(l,2)),k=Cn(Xn(y,2)+Xn(b,2)),N=(w+k)/2,x=f(Sn(l,m)),_=f(Sn(b,y)),A=x>=0?x:x+360,j=_>=0?_:_+360,E=Wn(A-j)>180?(A+j+360)/2:(A+j)/2,R=1-.17*In(o(E-30))+.24*In(o(2*E))+.32*In(o(3*E+6))-.2*In(o(4*E-63)),O=j-A;O=Wn(O)<=180?O:j<=A?O+360:O-360,O=2*Cn(w*k)*Kn(o(O)/2);var P=s-c,F=k-w,L=1+.015*Xn(g-50,2)/Cn(20+Xn(g-50,2)),B=1+.045*N,G=1+.015*N*R,Y=30*zn(-Xn((E-275)/25,2)),q=-(2*Cn(Xn(N,7)/(Xn(N,7)+Xn(25,7))))*Kn(2*o(Y)),C=Cn(Xn(P/(e*L),2)+Xn(F/(t*B),2)+Xn(O/(a*G),2)+q*(F/(t*B))*(O/(a*G)));return $n(0,Zn(100,C))},distance:function(r,n,e){void 0===e&&(e="lab"),r=new M(r),n=new M(n);var t=r.get(e),a=n.get(e),f=0;for(var o in t){var u=(t[o]||0)-(a[o]||0);f+=u*u}return Math.sqrt(f)},input:k,interpolate:un,limits:Gn,mix:un,random:function(){for(var r="#",n=0;n<6;n++)r+="0123456789abcdef".charAt(En(16*Rn()));return new M(r,"hex")},scale:kn,scales:Vn,valid:function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];try{return new(Function.prototype.bind.apply(M,[null].concat(r))),!0}catch(r){return!1}},cmyk:_,css:xr,gl:_r,hcg:jr,hex:Lr,hsi:Cr,hsl:Xr,hsv:Wr,lab:Ir,lch:Kr,hcl:zr,num:Ur,rgb:Dr,temp:Qr,kelvin:Qr,temperature:Qr,oklab:rn,oklch:nn,getLabWhitePoint:O,setLabWhitePoint:R}),N}));

// === Three.js Objects ===
const clock = new THREE.Clock(); // for animation

// === NAC Room Parameters ===
room.canFly = true;
room.spawnPointX = 0;
room.spawnPointY = 100;
room.spawnPointZ = 0;
room.cameraFar = 1500;

// === Diurnal Parameters (Editable) ===
const durationInMinutes = 1; // day night cycle duration
const minNightIntensity = 0.05;
const maxDayIntensity = 1.2;
const diurnalUniformOffset = 0.15; // this is the floor on the darkness
const diurnalCycleResolutionMs = 50;

// === Diurnal constants (don't edit)
let ambientLightSource;
const diurnalUniform = { value: 1.0 }; // For the shader

// CHANGE ME
// === Diurnal LAB color scale (midnight > dawn > noon > dusk > midnight)
const diurnalColorScale = chroma.scale([
    '#0d1b2a', // midnight – deep navy
    '#2a4c6f', // dawn – cool steel blue
    '#f4c38b', // sunrise – pale peach gold
    '#fff3cc', // noon – creamy yellow white
    '#f4c38b', // sunset – same as sunrise
    '#2a4c6f', // dusk – symmetrical to dawn
    '#0d1b2a'  // midnight again
]).mode('lab').domain([0, 0.15, 0.25, 0.5, 0.75, 0.85, 1]);

// === Diurnal System Responsive Meshes {three.js obj name: isAnimated bool} ===
//     Important for triggering the color change, you have to know the name of the object to do this
const responsiveObjectNames = {
    'Curve002': false,
    'fox': true,
    'cube': true,
};

// === Diurnal Event System ===
const diurnalEvents = [];

// TODO
// === Platform objects, for being able to walk on them on approach, and fly otherwise ===
// Start and end are between [0-1]
function registerDiurnalEvent(start, end, { onStart = () => {}, onEnd = () => {} }) {
    diurnalEvents.push({
        start,
        end,
        onStart,
        onEnd,
        active: false
    });
}

const glbControllers = [];

function getLightsInScene(scene) {
    return scene.children.filter(o => o.isLight);
}

function easeInOutCubic(t) {
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function convertToDiurnalShader(mesh, isAnimated = false) {
    mesh.traverse(child => {
        if (!child.isMesh) return;

        const oldMat = child.material;
        const newMat = oldMat.clone();
        
        newMat.skinning = child.isSkinnedMesh;
        
        newMat.onBeforeCompile = (shader) => {
            shader.uniforms.uBrightness = diurnalUniform;
        
            shader.fragmentShader = shader.fragmentShader.replace(
                `void main() {`,
                `uniform float uBrightness;\nvoid main() {`
            );
        
            shader.fragmentShader = shader.fragmentShader.replace(
                `#include <dithering_fragment>`,
                `
                    #include <dithering_fragment>
                    gl_FragColor.rgb *= clamp(uBrightness, 0.0, 1.0);
                `
            );
        };
        
        child.material = newMat;
        child.material.needsUpdate = true;
    });
}

function initDiurnalLighting() {
    const sceneLights = getLightsInScene(scene);
    ambientLightSource = sceneLights.find(l => l.isHemisphereLight);

    if (!ambientLightSource) {
        console.warn("No HemisphereLight found.");
        return;
    }

    const totalDurationMs = durationInMinutes * 60 * 1000;
    const cycleSpeed = (Math.PI * 2) / (totalDurationMs / diurnalCycleResolutionMs);
    let timeOfDay = 0;

    // Diurnal system loop
    setInterval(() => {
        timeOfDay = (timeOfDay + cycleSpeed) % (Math.PI * 2);

        const angleT = timeOfDay / (Math.PI * 2);
        const rawT = 1 - (Math.cos(timeOfDay) * 0.5 + 0.5);
        const easedT = rawT;

        ambientLightSource.intensity = minNightIntensity + (maxDayIntensity - minNightIntensity) * easedT;

        const hexColor = diurnalColorScale(angleT % 1).hex();
        const diurnalThreeColor = new THREE.Color(hexColor);
        ambientLightSource.color.copy(diurnalThreeColor);
        scene.background = diurnalThreeColor.clone();

        diurnalUniform.value = easedT + diurnalUniformOffset;

        diurnalEvents.forEach(event => {
            const isInRange = easedT >= event.start && easedT <= event.end;
            if (isInRange && !event._active) {
                event._active = true;
                event.onStart && event.onStart();
            } else if (!isInRange && event._active) {
                event._active = false;
                event.onEnd && event.onEnd();
            }
        });
    }, diurnalCycleResolutionMs);
}

class GLBAnimationController {
    constructor(rootGroup) {
        this.model = rootGroup;
        const mixerEntry = animations.mixers?.[rootGroup.name];
        if (!mixerEntry) {
            console.warn(`No mixer found for root group ${rootGroup.name}`);
            this.loaded = false;
            return;
        }

        this.mixer = mixerEntry.mixer;
        this.loaded = true;
        this.clips = {};
        this.actions = {};
        this.activeAction = null;

        for (const action of this.mixer._actions) {
            const clip = action._clip;
            this.clips[clip.name] = clip;
            this.actions[clip.name] = action;
        }
    }

    play(name, { loopOnce = false, fadeDuration = 0.5, timeScale = 1.0 } = {}) {
        if (!this.loaded || !this.actions[name]) return;
        const action = this.actions[name];
        action.reset();
        action.setLoop(loopOnce ? THREE.LoopOnce : THREE.LoopRepeat);
        action.clampWhenFinished = loopOnce;
        action.timeScale = timeScale;
        
        if (this.activeAction && this.activeAction !== action) {
            this.activeAction.fadeOut(fadeDuration);
        }
        
        action.fadeIn(fadeDuration).play();
        this.activeAction = action;
        console.log(`Playing animation: ${name} (speed: ${timeScale}x)`);
    }

    setSpeed(speed) {
        if (this.activeAction) {
            this.activeAction.timeScale = speed;
            console.log(`Changed animation speed to: ${speed}x`);
        }
    }

    stop(name) {
        if (this.actions[name]) {
            this.actions[name].stop();
            if (this.activeAction === this.actions[name]) this.activeAction = null;
            console.log(`Stopped animation: ${name}`);
        }
    }

    stopAll() {
        Object.keys(this.actions).forEach(name => {
            this.actions[name].stop();
        });
        this.activeAction = null;
        console.log(`Stopped all animations for ${this.model.name}`);
    }

    update(deltaTime) {
        if (this.loaded && this.mixer) {
            this.mixer.update(deltaTime);
        }
    }

    listAnimations() {
        console.log(Object.keys(this.clips));
    }
}

function setupAnimatedObject(objectName) {
    const obj = scene.getObjectByName(objectName);
    if (!obj || !obj.parent || !obj.parent.parent) {
        console.warn(`${objectName} hierarchy not found`);
        return null;
    }

    // Get the root object to extract animations (due to NAC's animation structure)
    const rootGroup = obj.parent.parent;
    const controller = new GLBAnimationController(rootGroup);
    
    if (controller.loaded) {
        console.log(`✓ ${objectName} animations loaded:`, Object.keys(controller.clips));
        glbControllers.push(controller);
        return controller;
    } else {
        console.warn(`✗ Failed to load animations for ${objectName}`);
        return null;
    }
}

room.afterInit = function () {
    scene.traverse(obj => {
        if (obj.isMesh && responsiveObjectNames.hasOwnProperty(obj.name)) {
            convertToDiurnalShader(obj, responsiveObjectNames[obj.name]);
        }
    });

    initDiurnalLighting();

    console.log("=== available animated objects ===");
    if (animations && animations.mixers) {
        Object.keys(animations.mixers).forEach(mixerName => {
            const mixerEntry = animations.mixers[mixerName];
            if (mixerEntry.mixer && mixerEntry.mixer._actions) {
                const animationNames = mixerEntry.mixer._actions.map(action => action._clip.name);
                console.log(`Group ${mixerName} has animations:`, animationNames);
                
                const group = scene.getObjectByName(mixerName);
                if (group) {
                    group.traverse(child => {
                        if (child.isMesh || child.isSkinnedMesh) {
                            console.log(`  └─ Object: "${child.name}" (${child.type})`);
                        }
                    });
                }
            }
        });
    }

    // CHANGE HERE: Add the names of your animated objects
    const foxController = setupAnimatedObject('fox');
    const cubeController = setupAnimatedObject('Cube');

    // CHANGE HERE: Configure when animations play during the day/night cycle

    // fox: run at night, survey during day with speed variations
    registerDiurnalEvent(0.0, 0.4, {
        onStart: () => foxController.play('Run', { timeScale: 1.5 }),
        onEnd: () => foxController.play('Survey', { timeScale: 0.8 }),
    });

    // cube: 5 phases throughout the day
    registerDiurnalEvent(0.0, 0.2, {
        onStart: () => {
            cubeController.stopAll();
            cubeController.play('CubeAction.002', { timeScale: 0.6 });
            console.log("cube phase 1");
        },
        onEnd: () => {}
    });

    registerDiurnalEvent(0.2, 0.4, {
        onStart: () => {
            cubeController.stopAll();
            cubeController.play('CubeAction.003', { timeScale: 1.3 });
            console.log("cube phase 2");
        },
        onEnd: () => {}
    });

    registerDiurnalEvent(0.4, 0.6, {
        onStart: () => {
            cubeController.stopAll();
            cubeController.play('CubeAction.002', { timeScale: 1.0 });
            console.log("cube phase 3");
        },
        onEnd: () => {}
    });

    registerDiurnalEvent(0.6, 0.8, {
        onStart: () => {
            cubeController.stopAll();
            cubeController.play('CubeAction.003', { timeScale: 1.8 });
            console.log("cube phase 4");
        },
        onEnd: () => {}
    });

    registerDiurnalEvent(0.8, 1.0, {
        onStart: () => {
            cubeController.stopAll();
            cubeController.play('CubeAction.002', { timeScale: 0.7 });
            console.log("cube phase 5");
        },
        onEnd: () => {}
    });

    function initializeAnimationsForCurrentTime() {
        const currentDiurnalTime = 0.0;
        
        console.log(`initializing animations for time: ${currentDiurnalTime}`);
        
        glbControllers.forEach(controller => {
            controller.stopAll();
        });
        
        diurnalEvents.forEach((event, index) => {
            const isInRange = currentDiurnalTime >= event.start && currentDiurnalTime <= event.end;
            
            if (isInRange) {
                event.onStart && event.onStart();
                event._active = true;
            } else {
                event.onEnd && event.onEnd();
                event._active = false;
            }
        });
        
        console.log("animation setup complete");
    }
    
    setTimeout(initializeAnimationsForCurrentTime, 200);

    console.log("fox animations:", Object.keys(foxController.clips));
    console.log("cube animations:", Object.keys(cubeController.clips));
};
