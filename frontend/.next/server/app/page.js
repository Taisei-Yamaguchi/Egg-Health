(()=>{var e={};e.id=1931,e.ids=[1931],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},71017:e=>{"use strict";e.exports=require("path")},57310:e=>{"use strict";e.exports=require("url")},36709:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>a.a,__next_app__:()=>m,originalPathname:()=>u,pages:()=>d,routeModule:()=>f,tree:()=>c}),r(61607),r(12975),r(7629),r(12523);var s=r(23191),n=r(88716),i=r(37922),a=r.n(i),l=r(95231),o={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>l[e]);r.d(t,o);let c=["",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,61607)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/page.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,50592))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,12975)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/layout.tsx"],error:[()=>Promise.resolve().then(r.bind(r,7629)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/error.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,12523)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/not-found.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,50592))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/page.tsx"],u="/page",m={require:r,loadChunk:()=>Promise.resolve()},f=new s.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/page",pathname:"/",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},76966:(e,t,r)=>{let s={"8f758dba1c4981e0f8e3691d1c9e1f35a48fd432":()=>Promise.resolve().then(r.bind(r,7924)).then(e=>e.$$ACTION_0),"9b33d9685808d4a88868ba66022b2800b25d6f39":()=>Promise.resolve().then(r.bind(r,7924)).then(e=>e.fetchLogout)};async function n(e,...t){return(await s[e]()).apply(null,t)}e.exports={"8f758dba1c4981e0f8e3691d1c9e1f35a48fd432":n.bind(null,"8f758dba1c4981e0f8e3691d1c9e1f35a48fd432"),"9b33d9685808d4a88868ba66022b2800b25d6f39":n.bind(null,"9b33d9685808d4a88868ba66022b2800b25d6f39")}},69558:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,92481,23)),Promise.resolve().then(r.t.bind(r,79404,23))},92481:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"Image",{enumerable:!0,get:function(){return y}});let s=r(91174),n=r(58374),i=r(10326),a=n._(r(17577)),l=s._(r(60962)),o=s._(r(60815)),c=r(23078),d=r(35248),u=r(31206);r(576);let m=r(50131),f=s._(r(86820)),p={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1};function h(e,t,r,s,n,i,a){let l=null==e?void 0:e.src;e&&e["data-loaded-src"]!==l&&(e["data-loaded-src"]=l,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&n(!0),null==r?void 0:r.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let s=!1,n=!1;r.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>s,isPropagationStopped:()=>n,persist:()=>{},preventDefault:()=>{s=!0,t.preventDefault()},stopPropagation:()=>{n=!0,t.stopPropagation()}})}(null==s?void 0:s.current)&&s.current(e)}}))}function g(e){let[t,r]=a.version.split(".",2),s=parseInt(t,10),n=parseInt(r,10);return s>18||18===s&&n>=3?{fetchPriority:e}:{fetchpriority:e}}globalThis.__NEXT_IMAGE_IMPORTED=!0;let x=(0,a.forwardRef)((e,t)=>{let{src:r,srcSet:s,sizes:n,height:l,width:o,decoding:c,className:d,style:u,fetchPriority:m,placeholder:f,loading:p,unoptimized:x,fill:b,onLoadRef:y,onLoadingCompleteRef:w,setBlurComplete:v,setShowAltText:j,sizesInput:_,onLoad:P,onError:N,...O}=e;return(0,i.jsx)("img",{...O,...g(m),loading:p,width:o,height:l,decoding:c,"data-nimg":b?"fill":"1",className:d,style:u,sizes:n,srcSet:s,src:r,ref:(0,a.useCallback)(e=>{t&&("function"==typeof t?t(e):"object"==typeof t&&(t.current=e)),e&&(N&&(e.src=e.src),e.complete&&h(e,f,y,w,v,x,_))},[r,f,y,w,v,N,x,_,t]),onLoad:e=>{h(e.currentTarget,f,y,w,v,x,_)},onError:e=>{j(!0),"empty"!==f&&v(!0),N&&N(e)}})});function b(e){let{isAppRouter:t,imgAttributes:r}=e,s={as:"image",imageSrcSet:r.srcSet,imageSizes:r.sizes,crossOrigin:r.crossOrigin,referrerPolicy:r.referrerPolicy,...g(r.fetchPriority)};return t&&l.default.preload?(l.default.preload(r.src,s),null):(0,i.jsx)(o.default,{children:(0,i.jsx)("link",{rel:"preload",href:r.srcSet?void 0:r.src,...s},"__nimg-"+r.src+r.srcSet+r.sizes)})}let y=(0,a.forwardRef)((e,t)=>{let r=(0,a.useContext)(m.RouterContext),s=(0,a.useContext)(u.ImageConfigContext),n=(0,a.useMemo)(()=>{let e=p||s||d.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),r=e.deviceSizes.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:r}},[s]),{onLoad:l,onLoadingComplete:o}=e,h=(0,a.useRef)(l);(0,a.useEffect)(()=>{h.current=l},[l]);let g=(0,a.useRef)(o);(0,a.useEffect)(()=>{g.current=o},[o]);let[y,w]=(0,a.useState)(!1),[v,j]=(0,a.useState)(!1),{props:_,meta:P}=(0,c.getImgProps)(e,{defaultLoader:f.default,imgConf:n,blurComplete:y,showAltText:v});return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(x,{..._,unoptimized:P.unoptimized,placeholder:P.placeholder,fill:P.fill,onLoadRef:h,onLoadingCompleteRef:g,setBlurComplete:w,setShowAltText:j,sizesInput:e.sizes,ref:t}),P.priority?(0,i.jsx)(b,{isAppRouter:!r,imgAttributes:_}):null]})});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},23484:(e,t,r)=>{"use strict";e.exports=r(81616).vendored.contexts.AmpContext},81157:(e,t,r)=>{"use strict";e.exports=r(81616).vendored.contexts.HeadManagerContext},31206:(e,t,r)=>{"use strict";e.exports=r(81616).vendored.contexts.ImageConfigContext},98710:(e,t)=>{"use strict";function r(e){let{ampFirst:t=!1,hybrid:r=!1,hasQuery:s=!1}=void 0===e?{}:e;return t||r&&s}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isInAmpMode",{enumerable:!0,get:function(){return r}})},23078:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImgProps",{enumerable:!0,get:function(){return l}}),r(576);let s=r(20380),n=r(35248);function i(e){return void 0!==e.default}function a(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function l(e,t){var r;let l,o,c,{src:d,sizes:u,unoptimized:m=!1,priority:f=!1,loading:p,className:h,quality:g,width:x,height:b,fill:y=!1,style:w,overrideSrc:v,onLoad:j,onLoadingComplete:_,placeholder:P="empty",blurDataURL:N,fetchPriority:O,layout:S,objectFit:M,objectPosition:C,lazyBoundary:E,lazyRoot:k,...z}=e,{imgConf:I,showAltText:A,blurComplete:R,defaultLoader:D}=t,B=I||n.imageConfigDefault;if("allSizes"in B)l=B;else{let e=[...B.deviceSizes,...B.imageSizes].sort((e,t)=>e-t),t=B.deviceSizes.sort((e,t)=>e-t);l={...B,allSizes:e,deviceSizes:t}}if(void 0===D)throw Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config");let W=z.loader||D;delete z.loader,delete z.srcSet;let L="__next_img_default"in W;if(L){if("custom"===l.loader)throw Error('Image with src "'+d+'" is missing "loader" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader')}else{let e=W;W=t=>{let{config:r,...s}=t;return e(s)}}if(S){"fill"===S&&(y=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[S];e&&(w={...w,...e});let t={responsive:"100vw",fill:"100vw"}[S];t&&!u&&(u=t)}let G="",U=a(x),F=a(b);if("object"==typeof(r=d)&&(i(r)||void 0!==r.src)){let e=i(d)?d.default:d;if(!e.src)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received "+JSON.stringify(e));if(!e.height||!e.width)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received "+JSON.stringify(e));if(o=e.blurWidth,c=e.blurHeight,N=N||e.blurDataURL,G=e.src,!y){if(U||F){if(U&&!F){let t=U/e.width;F=Math.round(e.height*t)}else if(!U&&F){let t=F/e.height;U=Math.round(e.width*t)}}else U=e.width,F=e.height}}let T=!f&&("lazy"===p||void 0===p);(!(d="string"==typeof d?d:G)||d.startsWith("data:")||d.startsWith("blob:"))&&(m=!0,T=!1),l.unoptimized&&(m=!0),L&&d.endsWith(".svg")&&!l.dangerouslyAllowSVG&&(m=!0),f&&(O="high");let q=a(g),H=Object.assign(y?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:M,objectPosition:C}:{},A?{}:{color:"transparent"},w),V=R||"empty"===P?null:"blur"===P?'url("data:image/svg+xml;charset=utf-8,'+(0,s.getImageBlurSvg)({widthInt:U,heightInt:F,blurWidth:o,blurHeight:c,blurDataURL:N||"",objectFit:H.objectFit})+'")':'url("'+P+'")',$=V?{backgroundSize:H.objectFit||"cover",backgroundPosition:H.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:V}:{},Y=function(e){let{config:t,src:r,unoptimized:s,width:n,quality:i,sizes:a,loader:l}=e;if(s)return{src:r,srcSet:void 0,sizes:void 0};let{widths:o,kind:c}=function(e,t,r){let{deviceSizes:s,allSizes:n}=e;if(r){let e=/(^|\s)(1?\d?\d)vw/g,t=[];for(let s;s=e.exec(r);s)t.push(parseInt(s[2]));if(t.length){let e=.01*Math.min(...t);return{widths:n.filter(t=>t>=s[0]*e),kind:"w"}}return{widths:n,kind:"w"}}return"number"!=typeof t?{widths:s,kind:"w"}:{widths:[...new Set([t,2*t].map(e=>n.find(t=>t>=e)||n[n.length-1]))],kind:"x"}}(t,n,a),d=o.length-1;return{sizes:a||"w"!==c?a:"100vw",srcSet:o.map((e,s)=>l({config:t,src:r,quality:i,width:e})+" "+("w"===c?e:s+1)+c).join(", "),src:l({config:t,src:r,quality:i,width:o[d]})}}({config:l,src:d,unoptimized:m,width:U,quality:q,sizes:u,loader:W});return{props:{...z,loading:T?"lazy":p,fetchPriority:O,width:U,height:F,decoding:"async",className:h,style:{...H,...$},sizes:Y.sizes,srcSet:Y.srcSet,src:v||Y.src},meta:{unoptimized:m,priority:f,placeholder:P,fill:y}}}},60815:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{default:function(){return h},defaultHead:function(){return u}});let s=r(91174),n=r(58374),i=r(10326),a=n._(r(17577)),l=s._(r(78003)),o=r(23484),c=r(81157),d=r(98710);function u(e){void 0===e&&(e=!1);let t=[(0,i.jsx)("meta",{charSet:"utf-8"})];return e||t.push((0,i.jsx)("meta",{name:"viewport",content:"width=device-width"})),t}function m(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===a.default.Fragment?e.concat(a.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}r(576);let f=["name","httpEquiv","charSet","itemProp"];function p(e,t){let{inAmpMode:r}=t;return e.reduce(m,[]).reverse().concat(u(r).reverse()).filter(function(){let e=new Set,t=new Set,r=new Set,s={};return n=>{let i=!0,a=!1;if(n.key&&"number"!=typeof n.key&&n.key.indexOf("$")>0){a=!0;let t=n.key.slice(n.key.indexOf("$")+1);e.has(t)?i=!1:e.add(t)}switch(n.type){case"title":case"base":t.has(n.type)?i=!1:t.add(n.type);break;case"meta":for(let e=0,t=f.length;e<t;e++){let t=f[e];if(n.props.hasOwnProperty(t)){if("charSet"===t)r.has(t)?i=!1:r.add(t);else{let e=n.props[t],r=s[t]||new Set;("name"!==t||!a)&&r.has(e)?i=!1:(r.add(e),s[t]=r)}}}}return i}}()).reverse().map((e,t)=>{let s=e.key||t;if(!r&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(t=>e.props.href.startsWith(t))){let t={...e.props||{}};return t["data-href"]=t.href,t.href=void 0,t["data-optimized-fonts"]=!0,a.default.cloneElement(e,t)}return a.default.cloneElement(e,{key:s})})}let h=function(e){let{children:t}=e,r=(0,a.useContext)(o.AmpStateContext),s=(0,a.useContext)(c.HeadManagerContext);return(0,i.jsx)(l.default,{reduceComponentsToState:p,headManager:s,inAmpMode:(0,d.isInAmpMode)(r),children:t})};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},20380:(e,t)=>{"use strict";function r(e){let{widthInt:t,heightInt:r,blurWidth:s,blurHeight:n,blurDataURL:i,objectFit:a}=e,l=s?40*s:t,o=n?40*n:r,c=l&&o?"viewBox='0 0 "+l+" "+o+"'":"";return"%3Csvg xmlns='http://www.w3.org/2000/svg' "+c+"%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='"+(c?"none":"contain"===a?"xMidYMid":"cover"===a?"xMidYMid slice":"none")+"' style='filter: url(%23b);' href='"+i+"'/%3E%3C/svg%3E"}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImageBlurSvg",{enumerable:!0,get:function(){return r}})},35248:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{VALID_LOADERS:function(){return r},imageConfigDefault:function(){return s}});let r=["default","imgix","cloudinary","akamai","custom"],s={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:60,formats:["image/webp"],dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"inline",remotePatterns:[],unoptimized:!1}},86820:(e,t)=>{"use strict";function r(e){let{config:t,src:r,width:s,quality:n}=e;return t.path+"?url="+encodeURIComponent(r)+"&w="+s+"&q="+(n||75)}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return s}}),r.__next_img_default=!0;let s=r},78003:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return a}});let s=r(17577),n=()=>{},i=()=>{};function a(e){var t;let{headManager:r,reduceComponentsToState:a}=e;function l(){if(r&&r.mountedInstances){let t=s.Children.toArray(Array.from(r.mountedInstances).filter(Boolean));r.updateHead(a(t,e))}}return null==r||null==(t=r.mountedInstances)||t.add(e.children),l(),n(()=>{var t;return null==r||null==(t=r.mountedInstances)||t.add(e.children),()=>{var t;null==r||null==(t=r.mountedInstances)||t.delete(e.children)}}),n(()=>(r&&(r._pendingUpdate=l),()=>{r&&(r._pendingUpdate=l)})),i(()=>(r&&r._pendingUpdate&&(r._pendingUpdate(),r._pendingUpdate=null),()=>{r&&r._pendingUpdate&&(r._pendingUpdate(),r._pendingUpdate=null)})),null}},54365:(e,t)=>{"use strict";function r(){return null}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r}}),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},10221:(e,t,r)=>{"use strict";let{createProxy:s}=r(68570);e.exports=s("/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/node_modules/next/dist/client/image-component.js")},79241:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImgProps",{enumerable:!0,get:function(){return l}}),r(96501);let s=r(95728),n=r(29472);function i(e){return void 0!==e.default}function a(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function l(e,t){var r;let l,o,c,{src:d,sizes:u,unoptimized:m=!1,priority:f=!1,loading:p,className:h,quality:g,width:x,height:b,fill:y=!1,style:w,overrideSrc:v,onLoad:j,onLoadingComplete:_,placeholder:P="empty",blurDataURL:N,fetchPriority:O,layout:S,objectFit:M,objectPosition:C,lazyBoundary:E,lazyRoot:k,...z}=e,{imgConf:I,showAltText:A,blurComplete:R,defaultLoader:D}=t,B=I||n.imageConfigDefault;if("allSizes"in B)l=B;else{let e=[...B.deviceSizes,...B.imageSizes].sort((e,t)=>e-t),t=B.deviceSizes.sort((e,t)=>e-t);l={...B,allSizes:e,deviceSizes:t}}if(void 0===D)throw Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config");let W=z.loader||D;delete z.loader,delete z.srcSet;let L="__next_img_default"in W;if(L){if("custom"===l.loader)throw Error('Image with src "'+d+'" is missing "loader" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader')}else{let e=W;W=t=>{let{config:r,...s}=t;return e(s)}}if(S){"fill"===S&&(y=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[S];e&&(w={...w,...e});let t={responsive:"100vw",fill:"100vw"}[S];t&&!u&&(u=t)}let G="",U=a(x),F=a(b);if("object"==typeof(r=d)&&(i(r)||void 0!==r.src)){let e=i(d)?d.default:d;if(!e.src)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received "+JSON.stringify(e));if(!e.height||!e.width)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received "+JSON.stringify(e));if(o=e.blurWidth,c=e.blurHeight,N=N||e.blurDataURL,G=e.src,!y){if(U||F){if(U&&!F){let t=U/e.width;F=Math.round(e.height*t)}else if(!U&&F){let t=F/e.height;U=Math.round(e.width*t)}}else U=e.width,F=e.height}}let T=!f&&("lazy"===p||void 0===p);(!(d="string"==typeof d?d:G)||d.startsWith("data:")||d.startsWith("blob:"))&&(m=!0,T=!1),l.unoptimized&&(m=!0),L&&d.endsWith(".svg")&&!l.dangerouslyAllowSVG&&(m=!0),f&&(O="high");let q=a(g),H=Object.assign(y?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:M,objectPosition:C}:{},A?{}:{color:"transparent"},w),V=R||"empty"===P?null:"blur"===P?'url("data:image/svg+xml;charset=utf-8,'+(0,s.getImageBlurSvg)({widthInt:U,heightInt:F,blurWidth:o,blurHeight:c,blurDataURL:N||"",objectFit:H.objectFit})+'")':'url("'+P+'")',$=V?{backgroundSize:H.objectFit||"cover",backgroundPosition:H.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:V}:{},Y=function(e){let{config:t,src:r,unoptimized:s,width:n,quality:i,sizes:a,loader:l}=e;if(s)return{src:r,srcSet:void 0,sizes:void 0};let{widths:o,kind:c}=function(e,t,r){let{deviceSizes:s,allSizes:n}=e;if(r){let e=/(^|\s)(1?\d?\d)vw/g,t=[];for(let s;s=e.exec(r);s)t.push(parseInt(s[2]));if(t.length){let e=.01*Math.min(...t);return{widths:n.filter(t=>t>=s[0]*e),kind:"w"}}return{widths:n,kind:"w"}}return"number"!=typeof t?{widths:s,kind:"w"}:{widths:[...new Set([t,2*t].map(e=>n.find(t=>t>=e)||n[n.length-1]))],kind:"x"}}(t,n,a),d=o.length-1;return{sizes:a||"w"!==c?a:"100vw",srcSet:o.map((e,s)=>l({config:t,src:r,quality:i,width:e})+" "+("w"===c?e:s+1)+c).join(", "),src:l({config:t,src:r,quality:i,width:o[d]})}}({config:l,src:d,unoptimized:m,width:U,quality:q,sizes:u,loader:W});return{props:{...z,loading:T?"lazy":p,fetchPriority:O,width:U,height:F,decoding:"async",className:h,style:{...H,...$},sizes:Y.sizes,srcSet:Y.srcSet,src:v||Y.src},meta:{unoptimized:m,priority:f,placeholder:P,fill:y}}}},95728:(e,t)=>{"use strict";function r(e){let{widthInt:t,heightInt:r,blurWidth:s,blurHeight:n,blurDataURL:i,objectFit:a}=e,l=s?40*s:t,o=n?40*n:r,c=l&&o?"viewBox='0 0 "+l+" "+o+"'":"";return"%3Csvg xmlns='http://www.w3.org/2000/svg' "+c+"%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='"+(c?"none":"contain"===a?"xMidYMid":"cover"===a?"xMidYMid slice":"none")+"' style='filter: url(%23b);' href='"+i+"'/%3E%3C/svg%3E"}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImageBlurSvg",{enumerable:!0,get:function(){return r}})},29472:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{VALID_LOADERS:function(){return r},imageConfigDefault:function(){return s}});let r=["default","imgix","cloudinary","akamai","custom"],s={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:60,formats:["image/webp"],dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"inline",remotePatterns:[],unoptimized:!1}},66794:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{default:function(){return o},getImageProps:function(){return l}});let s=r(53370),n=r(79241),i=r(10221),a=s._(r(52049));function l(e){let{props:t}=(0,n.getImgProps)(e,{defaultLoader:a.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[e,r]of Object.entries(t))void 0===r&&delete t[e];return{props:t}}let o=i.Image},52049:(e,t)=>{"use strict";function r(e){let{config:t,src:r,width:s,quality:n}=e;return t.path+"?url="+encodeURIComponent(r)+"&w="+s+"&q="+(n||75)}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return s}}),r.__next_img_default=!0;let s=r},96501:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"warnOnce",{enumerable:!0,get:function(){return r}});let r=e=>{}},61607:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>w});var s=r(19510),n=r(54365),i=r.n(n),a=r(57371),l=r(66794),o=r.n(l),c=r(71159),d={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},u=c.createContext&&c.createContext(d),m=["attr","size","title"];function f(){return(f=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(e[s]=r[s])}return e}).apply(this,arguments)}function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,s)}return r}function h(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach(function(t){var s,n;s=t,n=r[t],(s=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var s=r.call(e,t||"default");if("object"!=typeof s)return s;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(s))in e?Object.defineProperty(e,s,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[s]=n}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function g(e){return t=>c.createElement(x,f({attr:h({},e.attr)},t),function e(t){return t&&t.map((t,r)=>c.createElement(t.tag,h({key:r},t.attr),e(t.child)))}(e.child))}function x(e){var t=t=>{var r,{attr:s,size:n,title:i}=e,a=function(e,t){if(null==e)return{};var r,s,n=function(e,t){if(null==e)return{};var r={};for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){if(t.indexOf(s)>=0)continue;r[s]=e[s]}return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(s=0;s<i.length;s++)r=i[s],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}(e,m),l=n||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),c.createElement("svg",f({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,s,a,{className:r,style:h(h({color:e.color||t.color},t.style),e.style),height:l,width:l,xmlns:"http://www.w3.org/2000/svg"}),i&&c.createElement("title",null,i),e.children)};return void 0!==u?c.createElement(u.Consumer,null,e=>t(e)):t(d)}function b(e){return g({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"},child:[]}]})(e)}function y(e){return g({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"},child:[]}]})(e)}let w=()=>(0,s.jsxs)("div",{className:"mx-0 border",children:[(0,s.jsxs)(i(),{children:[s.jsx("title",{children:"Wellness Mons - Diet and Exercise Management App"}),s.jsx("meta",{name:"description",content:"Wellness Mons helps you manage your diet and exercise while growing your monster towards your goals. Available for free!"}),s.jsx("meta",{name:"keywords",content:"wellness mons, wellness, diet management, meal management, exercise management, monster, health, fitness, diet, meal, exercise, PFC balance,  calorie management, fitness app, burned calories, calories burned, intake calories, calories intake, tdee calculator, bmr calculator, basal metabolic rate calculator, metabolic rate calculator, weight loss programs, lose weight fast, lose weight, weight loss tips, free workout apps, pfc, carbs, meal, exercise, monsters, healthy eating"}),s.jsx("meta",{name:"author",content:"Wellness Mons"}),s.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),s.jsx("link",{rel:"icon",href:"/icon.ico"})]}),(0,s.jsxs)("header",{className:"relative bg-gray-200 mt-14 max-md:mt-0",children:[s.jsx("img",{src:"/landing-bg.png",alt:"landing background",className:"w-full opacity-30 max-md:h-[300px]"}),(0,s.jsxs)("div",{className:"absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4",children:[(0,s.jsxs)("h1",{className:"text-5xl max-md:text-3xl font-bold mb-4 text-shadow text-gray-600 flex items-center justify-center",children:[s.jsx(o(),{src:"/icon.png",alt:"Wellness Mons ",width:60,height:40,className:"mx-auto max-md:w-[40px] w-auto h-auto"}),"Wellness Mons"]}),s.jsx("p",{className:"text-xl max-sm:text-lg mb-6 text-shadow text-black w-3/4 font-semibold border-b",children:"Manage your diet and exercise while growing your monster towards your goals!"}),(0,s.jsxs)("div",{className:"flex space-x-4",children:[s.jsx(a.default,{href:"/signup",legacyBehavior:!0,children:s.jsx("a",{className:"bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transform transition-transform hover:scale-110",children:"Sign Up (for free)"})}),s.jsx(a.default,{href:"/signin",legacyBehavior:!0,children:s.jsx("a",{className:"bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transform transition-transform hover:scale-110",children:"Sign In"})})]})]})]}),(0,s.jsxs)("main",{className:"p-4 mt-0 mx-0 max-sm:p-1",children:[(0,s.jsxs)("section",{id:"intro",className:"py-8 bg-white mb-10 text-center items-center flex justify-between max-md:flex-col",children:[(0,s.jsxs)("div",{className:"flex flex-col w-2/3 max-md:w-full items-center hover:scale-105",children:[s.jsx("h2",{className:"text-4xl font-bold mb-4 max-md:text-2xl transform transition-transform hover:scale-105",children:"What is Wellness Mons?"}),s.jsx("div",{className:"p-4 flex w-4/5 items-center justify-between rounded-lg shadow-lg max-md:flex-col",children:(0,s.jsxs)("p",{className:"w-full text-2xl text-left p-2 max-md:text-lg",children:[s.jsx("span",{className:"font-bold text-4xl text-yellow-500 max-md:text-2xl",children:"Wellness Mons  "}),"is a diet and exercise management app that helps you reach your goals by growing ",s.jsx("span",{className:"font-bold ",children:"your monster"}),". It's ",s.jsx("span",{className:"font-bold",children:"free to use"}),"!"]})})]}),s.jsx(o(),{src:"/dashboard-page.png",alt:"Wellness Mons dashboard page",width:360,height:260,className:"mx-auto mt-4 rounded-lg shadow-lg hover:scale-105 w-auto h-auto"})]}),(0,s.jsxs)("section",{id:"premium",className:"mb-10 bg-yellow-50 py-10",children:[s.jsx("h2",{className:"text-2xl font-bold mb-4 text-center transform transition-transform hover:scale-105",children:"Monster Growth !?"}),s.jsx("p",{className:"text-center font-semibold",children:"Have fun growing your monster and achieve your ideal body!"}),(0,s.jsxs)("div",{className:"flex flex-wrap justify-center items-center space-x-4 mt-4",children:[(0,s.jsxs)("div",{className:"w-[800px] flex justify-between items-center max-sm:w-full rounded-lg shadow-lg",children:[(0,s.jsxs)("div",{className:"flex flex-col items-center",children:[s.jsx("span",{className:"text-xl font-bold",children:"Egg"}),s.jsx(o(),{src:"/monster-growth1.png",alt:"Wellness Mons Monster Egg",width:200,height:200,className:"rounded-lg max-md:w-[160px] w-auto h-auto"})]}),s.jsx(y,{className:"mx-0 text-3xl text-gray-500"}),(0,s.jsxs)("div",{className:"flex flex-col items-center max-sm:hidden",children:[s.jsx("span",{className:"text-xl font-bold",children:"Baby"}),s.jsx(o(),{src:"/monster-growth2.png",alt:"Wellness Mons Monster Baby",width:200,height:200,className:"rounded-lg max-md:w-[160px] w-auto h-auto"})]}),s.jsx(y,{className:"mx-0 text-3xl text-gray-500 max-sm:hidden"}),(0,s.jsxs)("div",{className:"flex flex-col items-center",children:[s.jsx("span",{className:"text-xl font-bold",children:"Adult"}),s.jsx(o(),{src:"/monster-growth3.png",alt:"Wellness Mons Monster Adult",width:200,height:200,className:"rounded-lg max-md:w-[160px] w-auto h-auto"})]})]}),(0,s.jsxs)("p",{className:"mt-4 w-3/4 max-sm:w-full text-sm",children:["Entering your meal, exercise, and weight data will help your monster grow. Additionally, if your daily intake and burned calories are",s.jsx("span",{className:"font-semibold text-base",children:" close to your goals"}),", your monster will grow even more. Keep up with your daily records and watch your monster reach its full potential!"]})]})]}),s.jsx("section",{id:"features",className:"mb-6",children:(0,s.jsxs)("div",{className:"flex flex-row-reverse items-center space-x-2 max-md:flex-col",children:[(0,s.jsxs)("div",{className:"w-2/3 max-md:w-full flex flex-col items-center hover:scale-105",children:[s.jsx("h2",{className:"text-2xl font-bold mb-4 text-center transform transition-transform hover:scale-105",children:"App Features"}),s.jsx("div",{className:"w-4/5 p-8 max-md:p-4 shadow-lg rounded-lg",children:(0,s.jsxs)("ul",{className:"list-disc list-inside text-left max-md:text-sm",children:[s.jsx("li",{children:"Intake calories calculated from meal data"}),s.jsx("li",{children:"Burned calories calculated from BMR, TEF, exercise calories and other calories"}),s.jsx("li",{children:"Accurate tracking of calorie balance and PFC balance"}),s.jsx("li",{children:"Grow your monster by keeping daily records"}),s.jsx("li",{children:"Visualize weight changes and calorie balance with graphs"}),s.jsx("li",{children:"Automatically calculates your Basal Metabolic Rate (BMR) based on your personal details, acting as a bmr calculator."}),s.jsx("li",{children:'You can see  "how many calories should be burned a day" and "how many calories should you intake a day" based on your goal.'})]})})]}),(0,s.jsxs)("div",{className:"flex flex-col max-md:flex-row max-sm:flex-col space-x-4 mt-4 w-1/3 max-md:w-full items-center",children:[s.jsx(o(),{src:"/meal-page.png",alt:"Wellness Mons meal page",width:300,height:200,className:"rounded-lg shadow-lg hover:scale-105 w-auto h-auto"}),s.jsx(o(),{src:"/exercise-page.png",alt:"Wellness Mons exercise page",width:300,height:200,className:"rounded-lg shadow-lg hover:scale-105 w-auto h-auto"})]})]})}),(0,s.jsxs)("section",{id:"how-to-use",className:"mb-10 bg-white py-10 flex flex-col items-center mx-4",children:[s.jsx("h2",{className:"text-2xl font-bold mb-4 text-center transform transition-transform hover:scale-105",children:"How to Use"}),(0,s.jsxs)("div",{className:"flex flex-col space-y-4 w-2/3 max-sm:w-full",children:[(0,s.jsxs)("div",{className:"flex items-center space-x-2",children:[s.jsx("span",{className:"text-xl font-bold",children:"1. "}),s.jsx("p",{className:"text-lg",children:"Sign up or sign in"})]}),(0,s.jsxs)("div",{className:"flex items-center space-x-2",children:[s.jsx("span",{className:"text-xl font-bold",children:"2. "}),s.jsx("p",{className:"text-lg",children:"Enter your personal details and goals at first"})]}),(0,s.jsxs)("div",{className:"flex items-center space-x-2",children:[s.jsx("span",{className:"text-xl font-bold",children:"3. "}),s.jsx("p",{className:"text-lg",children:"Record your meal, exercise, and weight data daily"})]}),(0,s.jsxs)("div",{className:"flex items-center space-x-2",children:[s.jsx("span",{className:"text-xl font-bold",children:"4. "}),s.jsx("p",{className:"text-lg",children:"Watch your monster grow based on your records from two days ago!"})]})]})]}),(0,s.jsxs)("section",{id:"premium",className:"mb-10 bg-yellow-50 py-10",children:[s.jsx("h2",{className:"text-2xl font-bold mb-4 text-center transform transition-transform hover:scale-105",children:"Premium Plan (under development)"}),s.jsx("p",{className:"text-center",children:"Premium features are currently under development! Please wait a little longer."}),s.jsx("p",{className:"text-center",children:"The premium features will be as follows (subject to change)."}),(0,s.jsxs)("p",{className:"text-center mt-6",children:["By subscribing to the ",s.jsx("span",{className:"font-semibold",children:"Premium Plan"}),", you can use the following features:"]}),s.jsx("div",{className:"flex flex-wrap justify-center items-center space-x-4",children:(0,s.jsxs)("div",{className:"w-full md:w-1/2 p-2",children:[(0,s.jsxs)("ul",{className:"list-disc list-inside text-left",children:[s.jsx("li",{children:'The "Often" feature allows you to register frequently used foods and activities'}),s.jsx("li",{children:'The "Latest" feature allows you to reuse the latest records'}),s.jsx("li",{children:'The "Set" feature allows you to pre-set meals and exercises, recording them with a single click'})]}),(0,s.jsxs)("p",{className:"mt-4",children:["By subscribing to the ",s.jsx("span",{className:"font-semibold",children:"Premium＋ Plan"}),", you can unlock and grow multiple monsters in addition to the features of the Premium Plan!"]})]})})]}),(0,s.jsxs)("section",{id:"download",className:"mb-10 text-center",children:[s.jsx("h2",{className:"text-2xl font-bold mb-4 transform transition-transform hover:scale-105",children:"Download the App (under development)"}),s.jsx("p",{children:"iOS and Android versions are currently under development! Please wait a little longer."})]})]}),(0,s.jsxs)("footer",{className:"text-center py-6 bg-white border-t",children:[s.jsx(b,{className:"mx-auto text-3xl text-orange-500 animate-bounce"}),s.jsx("p",{className:"text-lg font-semibold text-gray-600 my-4",children:"Sign up now and start your journey towards better health!"}),s.jsx(a.default,{href:"/signup",legacyBehavior:!0,children:s.jsx("a",{className:"bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transform transition-transform hover:scale-110",children:"Sign Up For Free"})})]})]})},53370:(e,t,r)=>{"use strict";function s(e){return e&&e.__esModule?e:{default:e}}r.r(t),r.d(t,{_:()=>s,_interop_require_default:()=>s})}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[8948,7211,130],()=>r(36709));module.exports=s})();