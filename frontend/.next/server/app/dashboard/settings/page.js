(()=>{var e={};e.id=3455,e.ids=[3455],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},71017:e=>{"use strict";e.exports=require("path")},57310:e=>{"use strict";e.exports=require("url")},24709:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>o.a,__next_app__:()=>m,originalPathname:()=>u,pages:()=>d,routeModule:()=>f,tree:()=>l}),r(72269),r(96162),r(12975),r(7629),r(12523);var s=r(23191),a=r(88716),i=r(37922),o=r.n(i),n=r(95231),c={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(c[e]=()=>n[e]);r.d(t,c);let l=["",{children:["dashboard",{children:["settings",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,72269)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/dashboard/settings/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,96162)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/dashboard/layout.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,50592))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,12975)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/layout.tsx"],error:[()=>Promise.resolve().then(r.bind(r,7629)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/error.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,12523)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/not-found.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,50592))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/dashboard/settings/page.tsx"],u="/dashboard/settings/page",m={require:r,loadChunk:()=>Promise.resolve()},f=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/dashboard/settings/page",pathname:"/dashboard/settings",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},29999:(e,t,r)=>{let s={"9b620fd0496b5f84341347bb1aa716807cb13cf4":()=>Promise.resolve().then(r.bind(r,32518)).then(e=>e.$$ACTION_0),c9fde3ec68f4a81eecae4315446ee002b122a688:()=>Promise.resolve().then(r.bind(r,32518)).then(e=>e.fetchAccount),"04c8ca4404b3c24dc11957f513907aa154f7302b":()=>Promise.resolve().then(r.bind(r,71506)).then(e=>e.$$ACTION_0),bbd69a1fd1c52af0630ca2ae44f76e0f3ed9ada7:()=>Promise.resolve().then(r.bind(r,71506)).then(e=>e.updateAccount),daa22de9bf9c0c80b16f4086db22822116b64052:()=>Promise.resolve().then(r.bind(r,78694)).then(e=>e.fetchLicenseDetail),ec1947a7872854c940b411230dab37e4a1fac393:()=>Promise.resolve().then(r.bind(r,78694)).then(e=>e.$$ACTION_0),"3e793398c34ccf0e9a41e8b783f764896bcc54b8":()=>Promise.resolve().then(r.bind(r,17346)).then(e=>e.$$ACTION_0),"78e50616bcc9f3a4ab9f0d6b75948676d37239cc":()=>Promise.resolve().then(r.bind(r,17346)).then(e=>e.fetchLicenseType)};async function a(e,...t){return(await s[e]()).apply(null,t)}e.exports={"9b620fd0496b5f84341347bb1aa716807cb13cf4":a.bind(null,"9b620fd0496b5f84341347bb1aa716807cb13cf4"),c9fde3ec68f4a81eecae4315446ee002b122a688:a.bind(null,"c9fde3ec68f4a81eecae4315446ee002b122a688"),"04c8ca4404b3c24dc11957f513907aa154f7302b":a.bind(null,"04c8ca4404b3c24dc11957f513907aa154f7302b"),bbd69a1fd1c52af0630ca2ae44f76e0f3ed9ada7:a.bind(null,"bbd69a1fd1c52af0630ca2ae44f76e0f3ed9ada7"),daa22de9bf9c0c80b16f4086db22822116b64052:a.bind(null,"daa22de9bf9c0c80b16f4086db22822116b64052"),ec1947a7872854c940b411230dab37e4a1fac393:a.bind(null,"ec1947a7872854c940b411230dab37e4a1fac393"),"3e793398c34ccf0e9a41e8b783f764896bcc54b8":a.bind(null,"3e793398c34ccf0e9a41e8b783f764896bcc54b8"),"78e50616bcc9f3a4ab9f0d6b75948676d37239cc":a.bind(null,"78e50616bcc9f3a4ab9f0d6b75948676d37239cc")}},45630:(e,t,r)=>{Promise.resolve().then(r.bind(r,69998))},35629:(e,t,r)=>{Promise.resolve().then(r.bind(r,7624))},35602:(e,t)=>{"use strict";/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */t.parse=function(e,t){if("string"!=typeof e)throw TypeError("argument str must be a string");for(var r={},s=(t||{}).decode||a,i=0;i<e.length;){var o=e.indexOf("=",i);if(-1===o)break;var n=e.indexOf(";",i);if(-1===n)n=e.length;else if(n<o){i=e.lastIndexOf(";",o-1)+1;continue}var c=e.slice(i,o).trim();if(void 0===r[c]){var l=e.slice(o+1,n).trim();34===l.charCodeAt(0)&&(l=l.slice(1,-1)),r[c]=function(e,t){try{return t(e)}catch(t){return e}}(l,s)}i=n+1}return r},t.serialize=function(e,t,a){var o=a||{},n=o.encode||i;if("function"!=typeof n)throw TypeError("option encode is invalid");if(!s.test(e))throw TypeError("argument name is invalid");var c=n(t);if(c&&!s.test(c))throw TypeError("argument val is invalid");var l=e+"="+c;if(null!=o.maxAge){var d=o.maxAge-0;if(isNaN(d)||!isFinite(d))throw TypeError("option maxAge is invalid");l+="; Max-Age="+Math.floor(d)}if(o.domain){if(!s.test(o.domain))throw TypeError("option domain is invalid");l+="; Domain="+o.domain}if(o.path){if(!s.test(o.path))throw TypeError("option path is invalid");l+="; Path="+o.path}if(o.expires){var u=o.expires;if("[object Date]"!==r.call(u)&&!(u instanceof Date)||isNaN(u.valueOf()))throw TypeError("option expires is invalid");l+="; Expires="+u.toUTCString()}if(o.httpOnly&&(l+="; HttpOnly"),o.secure&&(l+="; Secure"),o.partitioned&&(l+="; Partitioned"),o.priority)switch("string"==typeof o.priority?o.priority.toLowerCase():o.priority){case"low":l+="; Priority=Low";break;case"medium":l+="; Priority=Medium";break;case"high":l+="; Priority=High";break;default:throw TypeError("option priority is invalid")}if(o.sameSite)switch("string"==typeof o.sameSite?o.sameSite.toLowerCase():o.sameSite){case!0:case"strict":l+="; SameSite=Strict";break;case"lax":l+="; SameSite=Lax";break;case"none":l+="; SameSite=None";break;default:throw TypeError("option sameSite is invalid")}return l};var r=Object.prototype.toString,s=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function a(e){return -1!==e.indexOf("%")?decodeURIComponent(e):e}function i(e){return encodeURIComponent(e)}},86615:function(e,t,r){"use strict";var s=this&&this.__assign||function(){return(s=Object.assign||function(e){for(var t,r=1,s=arguments.length;r<s;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},a=this&&this.__rest||function(e,t){var r={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&0>t.indexOf(s)&&(r[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var a=0,s=Object.getOwnPropertySymbols(e);a<s.length;a++)0>t.indexOf(s[a])&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(r[s[a]]=e[s[a]]);return r};Object.defineProperty(t,"__esModule",{value:!0}),t.hasCookie=t.deleteCookie=t.setCookie=t.getCookie=t.getCookies=void 0;var i=r(35602),o=function(){return"undefined"!=typeof window},n=function(e){return!!e&&"getAll"in e&&"set"in e&&"function"==typeof e.getAll&&"function"==typeof e.set},c=function(e){return!!(null==e?void 0:e.req)&&"cookies"in e.req&&n(null==e?void 0:e.req.cookies)||!!(null==e?void 0:e.res)&&"cookies"in e.res&&n(null==e?void 0:e.res.cookies)||!!(null==e?void 0:e.cookies)&&n(e.cookies())},l=function(e){var t={};return e.getAll().forEach(function(e){var r=e.name,s=e.value;t[r]=s}),t},d=function(e){try{if("string"==typeof e)return e;return JSON.stringify(e)}catch(t){return e}};t.getCookies=function(e){if(c(e)){if(null==e?void 0:e.req)return l(e.req.cookies);if(null==e?void 0:e.cookies)return l(e.cookies())}if(e&&(t=e.req),!o())return t&&t.cookies?t.cookies:t&&t.headers.cookie?(0,i.parse)(t.headers.cookie):{};for(var t,r={},s=document.cookie?document.cookie.split("; "):[],a=0,n=s.length;a<n;a++){var d=s[a].split("="),u=d.slice(1).join("=");r[d[0]]=u}return r},t.getCookie=function(e,r){var s=(0,t.getCookies)(r)[e];if(void 0!==s)return s?s.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent):s},t.setCookie=function(e,t,r){if(c(r)){var n,l,u,m=r.req,f=r.res,h=r.cookies,b=a(r,["req","res","cookies"]),p=s({name:e,value:d(t)},b);m&&m.cookies.set(p),f&&f.cookies.set(p),h&&h().set(p);return}if(r){var m=r.req,f=r.res,g=a(r,["req","res"]);l=m,u=f,n=g}var x=(0,i.serialize)(e,d(t),s({path:"/"},n));if(o())document.cookie=x;else if(u&&l){var y=u.getHeader("Set-Cookie");if(Array.isArray(y)||(y=y?[String(y)]:[]),u.setHeader("Set-Cookie",y.concat(x)),l&&l.cookies){var v=l.cookies;""===t?delete v[e]:v[e]=d(t)}if(l&&l.headers&&l.headers.cookie){var v=(0,i.parse)(l.headers.cookie);""===t?delete v[e]:v[e]=d(t),l.headers.cookie=Object.entries(v).reduce(function(e,t){return e.concat("".concat(t[0],"=").concat(t[1],";"))},"")}}},t.deleteCookie=function(e,r){return(0,t.setCookie)(e,"",s(s({},r),{maxAge:-1}))},t.hasCookie=function(e,r){return!!e&&(0,t.getCookies)(r).hasOwnProperty(e)}},5696:(e,t,r)=>{"use strict";r.d(t,{g:()=>s}),r(15424);var s=(0,r(46242).$)("daa22de9bf9c0c80b16f4086db22822116b64052")},69998:(e,t,r)=>{"use strict";r.d(t,{default:()=>k});var s=r(10326),a=r(17577),i=r(39530),o=r(74132);r(15424);var n=r(46242),c=(0,n.$)("c9fde3ec68f4a81eecae4315446ee002b122a688"),l=r(23703),d=r(10123),u=(0,n.$)("bbd69a1fd1c52af0630ca2ae44f76e0f3ed9ada7"),m=r(86615);let f=({nickname:e})=>{let t=(0,i.TL)(),r=(0,l.TA)({initialValues:{nickname:e},validationSchema:d.Ry({nickname:d.Z_().min(2,"Must be at least 2 characters").max(20,"Must be 20 characters or less").required("Required")}),onSubmit:async(e,{setSubmitting:r})=>{try{let r=await u({nickname:e.nickname});"error"in r?t((0,o.fz)({message:r.error,type:"error"})):"detail"in r?t((0,o.fz)({message:r.detail,type:"error"})):"message"in r&&t((0,o.fz)({message:r.message,type:"success"})),"data"in r&&(0,m.setCookie)("nickname",r.data.nickname),setTimeout(()=>t((0,o.Qu)()),3e3)}catch(e){t((0,o.fz)({message:"An error occurred while updating the nickname.",type:"error"})),setTimeout(()=>t((0,o.Qu)()),3e3)}finally{r(!1)}}});return(0,s.jsxs)("form",{onSubmit:r.handleSubmit,className:"flex",children:[(0,s.jsxs)("div",{className:"w-1/2 mr-1",children:[s.jsx("label",{htmlFor:"nickname",className:"block text-sm font-medium text-gray-700",children:"Nickname"}),s.jsx("input",{id:"nickname",name:"nickname",type:"text",onChange:r.handleChange,onBlur:r.handleBlur,value:r.values.nickname,className:"mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg"}),r.touched.nickname&&r.errors.nickname?s.jsx("div",{className:"text-red-500 text-sm",children:r.errors.nickname}):null]}),s.jsx("div",{className:"mt-6",children:s.jsx("button",{type:"submit",className:"w-[100px] inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",disabled:r.isSubmitting,children:"save"})})]})};var h=r(44046),b=r(41135);let p=()=>{let e=(0,i.TL)(),[t,r]=(0,a.useState)(!1),[n,c]=(0,a.useState)(!1),m=(0,l.TA)({initialValues:{password:"",passwordConfirmation:""},validationSchema:d.Ry({password:d.Z_().min(8,"Password must be at least 8 characters").max(100,"Password must be maximum 100 characters").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,"Password must contain minimum 5 characters, 1 uppercase letter, 1 lowercase letter, 1 numeric digit.").required("Password is required !"),passwordConfirmation:d.Z_().min(8,"Password must be at least 8 characters").max(100,"Password must be maximum 100 characters").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,"Password must contain minimum 5 characters, 1 uppercase letter, 1 lowercase letter, 1 numeric digit.").required("Password is required !").oneOf([d.iH("password"),""],"Passwords must match !")}),onSubmit:async t=>{let r=await u({password:t.password});"error"in r?e((0,o.fz)({message:r.error,type:"error"})):"detail"in r?e((0,o.fz)({message:r.detail,type:"error"})):"message"in r&&e((0,o.fz)({message:r.message,type:"success"})),m.resetForm(),setTimeout(()=>e((0,o.Qu)()),4e3)}});return(0,s.jsxs)("form",{className:"w-full mb-10",onSubmit:m.handleSubmit,children:[(0,s.jsxs)("section",{className:"grid grid-cols-1 lg:grid-cols-2 w-full gap-x-10",children:[(0,s.jsxs)("section",{className:"mb-5",children:[s.jsx("label",{htmlFor:"password",className:"block text-sm font-medium leading-6 text-gray-900 mb-4",children:"New Password"}),(0,s.jsxs)("section",{className:"flex items-center gap-3 relative",children:[s.jsx("input",{id:"password",name:"password",type:t?"text":"password",value:m.values.password,onChange:m.handleChange,onBlur:m.handleBlur,className:(0,b.Z)("block w-full h-10 rounded-md px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",{"border-2 border-red-500":m.touched.password&&m.errors.password})}),s.jsx("div",{className:(0,b.Z)("text-gray-300 absolute right-2 cursor-pointer",{"text-blue-800":t}),children:t?s.jsx(h.dSq,{size:25,onClick:()=>r(e=>!e)}):s.jsx(h.tgn,{size:25,onClick:()=>r(e=>!e)})})]}),m.errors.password&&m.touched.password&&s.jsx("p",{className:"text-red-500 ml-1 my-3",children:m.errors.password})]}),(0,s.jsxs)("section",{className:"mb-10 md:mb-5",children:[s.jsx("label",{htmlFor:"passwordConfirmation",className:"block text-sm font-medium leading-6 text-gray-900 mb-4",children:"Confirm Password"}),(0,s.jsxs)("section",{className:"flex items-center gap-3 relative",children:[s.jsx("input",{id:"passwordConfirmation",name:"passwordConfirmation",type:n?"text":"password",value:m.values.passwordConfirmation,onChange:m.handleChange,onBlur:m.handleBlur,className:(0,b.Z)("block w-full h-10 rounded-md px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",{"border-2 border-red-500":m.touched.passwordConfirmation&&m.errors.passwordConfirmation})}),s.jsx("div",{className:(0,b.Z)("text-gray-300 absolute right-2 cursor-pointer",{"text-blue-800":n}),children:n?s.jsx(h.dSq,{size:25,onClick:()=>c(e=>!e)}):s.jsx(h.tgn,{size:25,onClick:()=>c(e=>!e)})})]}),m.errors.passwordConfirmation&&m.touched.passwordConfirmation&&s.jsx("p",{className:"text-red-500 ml-1 my-3",children:m.errors.passwordConfirmation})]})]}),s.jsx("section",{className:"w-full flex justify-start md:justify-end",children:s.jsx("button",{type:"submit",className:"flex w-[200px] h-14 md:h-auto justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-lg md:text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",children:"change password"})})]})};var g=r(88736),x=r.n(g),y=r(35047),v=r(31551);let w=()=>{let e=(0,i.TL)(),t=(0,y.useRouter)();return s.jsx("div",{className:"w-full",children:s.jsx("button",{onClick:()=>{x().fire({title:"Are you sure?",text:"You won't possibly be able to revert this! If you want to reuse this account, you need to contact us.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#d33",cancelButtonColor:"gray",confirmButtonText:"Yes, deactivate it!"}).then(async r=>{if(r.isConfirmed)try{let r=await fetch("/api/deactivate",{method:"POST",headers:{"Content-Type":"application/json"}});if(r.ok)e((0,v.Li)()),t.push("/");else{let e=await r.json();x().fire("Error",e.error||e.detail||"Failed to deactivate account","error")}}catch(e){console.error("Error deactivating account:",e),x().fire("Error","Failed to deactivate account","error")}})},className:"flex w-full md:w-[50%] h-14 lg:h-auto justify-center items-center rounded-md bg-red-600 px-3 py-1.5 text-lg lg:text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600",children:"deactivate"})})};var j=r(5696);let k=()=>{let e=(0,i.TL)(),[t,r]=(0,a.useState)(null),[n,l]=(0,a.useState)(null);return(0,a.useEffect)(()=>{(async()=>{try{let t=await (0,j.g)();if("error"in t){e((0,o.fz)({message:t.error,type:"error"})),setTimeout(()=>e((0,o.Qu)()),3e3);return}"message"in t&&l(t.data)}catch(e){}})()},[e]),(0,a.useEffect)(()=>{(async()=>{try{let t=await c();if("error"in t){e((0,o.fz)({message:t.error,type:"error"})),setTimeout(()=>e((0,o.Qu)()),3e3);return}"message"in t&&r(t.data)}catch(e){}})()},[e]),s.jsx("section",{className:"relative",children:(0,s.jsxs)("section",{className:"w-[95%] md:w-[80%] mx-auto py-10",children:[s.jsx("h1",{className:"text-3xl text-slate-700 font-semibold tracking-tight mb-10",children:"Account Profile"}),s.jsx("h2",{className:"text-2xl text-slate-700 font-semibold tracking-tight mb-5",children:"Account Details"}),s.jsx("hr",{className:"border-b-1 w-full mb-10"}),(0,s.jsxs)("section",{className:"mb-5",children:[s.jsx("label",{htmlFor:"email",className:"block text-sm font-medium leading-6 text-gray-900 mb-2",children:"Email address"}),s.jsx("p",{className:"block w-full h-10 rounded-md px-4 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg sm:leading-6 pl-2",children:t&&t.username})]}),t&&s.jsx(f,{nickname:t?.nickname}),s.jsx("hr",{className:"border-b-1 w-full my-10"}),s.jsx("h2",{className:"text-2xl text-slate-700 font-semibold tracking-tight mb-5",children:"Update Password"}),s.jsx("hr",{className:"border-b-1 w-full mb-10"}),s.jsx(p,{}),s.jsx("hr",{className:"border-b-1 w-full mb-10"}),s.jsx("h2",{className:"text-2xl text-stone-700 font-semibold tracking-tight mb-10",children:"Membership Plan"}),(()=>{if(!n)return null;let{license_type:e,billing_period:t,start_date:r,end_date:a,is_subscription_active:i}=n,o="premium_plus"===e?"Premium+":e.charAt(0).toUpperCase()+e.slice(1);return(0,s.jsxs)("div",{className:"bg-gray-100 rounded-lg shadow-md p-6 mb-8",children:[s.jsx("h3",{className:"text-2xl text-slate-700 font-semibold mb-4",children:"Current Plan"}),s.jsx("div",{className:"flex items-center mb-4",children:s.jsx("span",{className:`px-4 py-2 rounded font-bold
                        ${"free"===e&&"text-white bg-gradient-to-r from-orange-600 to-rose-800"}
                        ${"premium"===e&&"text-black bg-gradient-to-r from-gray-200 to-gray-400"}
                        ${"premium_plus"===e&&"text-black bg-gradient-to-r from-yellow-400 to-yellow-600"}
                    `,children:o})}),"free"!==e&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"flex mb-4",children:[s.jsx("span",{className:"font-bold w-32",children:"Start Date:"}),s.jsx("span",{children:r})]}),i?s.jsx(s.Fragment,{children:(0,s.jsxs)("div",{className:"flex mb-4",children:[s.jsx("span",{className:"font-bold w-32",children:"Billing Period:"}),(0,s.jsxs)("span",{children:[t.charAt(0).toUpperCase()+t.slice(1)," - $","yearly"===t?"premium"===e?"66/year":"99/year":"premium"===e?"6.6/month":"9.9/month"]})]})}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"flex mb-4",children:[s.jsx("span",{className:"font-bold w-32",children:"End Date:"}),s.jsx("span",{children:a})]}),s.jsx("span",{className:"text-purple-400",children:"*Subscription is canceled but active until the end date."})]})]})]})})(),s.jsx("div",{className:"text-center mb-8",children:s.jsx("a",{className:"flex w-fit mx-auto justify-center rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",href:"/dashboard/premium",children:"See more"})}),s.jsx("hr",{className:"border-b-1 w-full my-10"}),(0,s.jsxs)("section",{className:"block lg:flex lg:items-center lg:gap-x-3 w-full",children:[s.jsx("h2",{className:"lg:w-4/12 text-xl text-stone-700 font-semibold tracking-tight mb-6 lg:mb-0",children:"Deactivate Account"}),s.jsx("div",{className:"lg:w-8/12 h-auto",children:s.jsx(w,{})})]})]})})}},7624:(e,t,r)=>{"use strict";r.d(t,{default:()=>h});var s=r(10326),a=r(35047),i=r(41135),o=r(45884),n=r(44046),c=r(89632),l=r(18013);r(15424);var d=(0,r(46242).$)("78e50616bcc9f3a4ab9f0d6b75948676d37239cc"),u=r(39530),m=r(17577),f=r(74132);let h=()=>{let e=(0,u.TL)(),t=(0,a.usePathname)(),r=(0,o.W6)(),[h,b]=(0,m.useState)(null);return(0,m.useEffect)(()=>{(async()=>{try{let t=await d();"error"in t?(e((0,f.fz)({message:t.error,type:"error"})),setTimeout(()=>e((0,f.Qu)()),3e3)):"message"in t&&(b(t.license_type),e((0,l.BE)(t.license_type)))}catch(t){console.error("Error fetching data:",t),e((0,f.fz)({message:"An error occurred while fetching license type",type:"error"})),setTimeout(()=>e((0,f.Qu)()),3e3)}})()},[e]),(0,s.jsxs)("nav",{className:"bg-yellow-200 shadow-md z-40",children:[s.jsx("div",{className:"flex justify-between items-center p-2 max-sm:justify-center ",children:h&&(0,s.jsxs)("div",{className:"flex items-center space-x-2 ",children:[(0,s.jsxs)("span",{className:(0,i.Z)("px-2 py-1 rounded-full  font-bold text-sm shadow-lg","free"===h&&"text-white bg-gradient-to-r from-orange-600 to-rose-800","premium"===h&&"text-black bg-gradient-to-r from-gray-200 to-gray-400","premium_plus"===h&&"text-black bg-gradient-to-r from-yellow-400 to-yellow-600"),children:["free"===h&&"Free","premium"===h&&"Premium","premium_plus"===h&&"Premium+"]}),"free"===h&&s.jsx("a",{href:"/dashboard/premium",className:"text-blue-500 hover:underline text-sm",children:"See Premium Plans"})]})}),(0,s.jsxs)("ul",{className:"flex justify-around py-4 max-sm:flex-col max-sm:mx-2 items-center",children:[(0,s.jsxs)("li",{className:"group relative my-2",children:[(0,s.jsxs)("a",{href:"/dashboard",className:(0,i.Z)("flex items-center space-x-2 text-gray-700 hover:text-gray-500 transition-colors duration-300",{"font-bold":"/dashboard"===t}),children:[s.jsx(n.P31,{className:"text-xl"}),s.jsx("span",{children:"Dashboard"})]}),s.jsx("div",{className:(0,i.Z)("absolute left-0 right-0 mx-auto mt-1 h-1 bg-yellow-500 transition-all duration-300",{"w-full":"/dashboard"===t,"w-0 group-hover:w-full":"/dashboard"!==t})})]}),(0,s.jsxs)("li",{className:"group relative my-2",children:[(0,s.jsxs)("a",{href:`/dashboard/record/${r}`,className:(0,i.Z)("flex items-center space-x-2 text-gray-700 hover:text-gray-500 transition-colors duration-300",{"font-bold":t.startsWith("/dashboard/record/")||t.startsWith("/dashboard/meal/")||t.startsWith("/dashboard/exercise/")}),children:[s.jsx(n.Pll,{className:"text-xl"}),s.jsx("span",{children:"Daily Record"})]}),s.jsx("div",{className:(0,i.Z)("absolute left-0 right-0 mx-auto mt-1 h-1 bg-yellow-500 transition-all duration-300",{"w-full":t.startsWith("/dashboard/record/")||t.startsWith("/dashboard/meal/")||t.startsWith("/dashboard/exercise/"),"w-0 group-hover:w-full":!(t.startsWith("/dashboard/record/")||t.startsWith("/dashboard/meal/")||t.startsWith("/dashboard/exercise/"))})})]}),(0,s.jsxs)("li",{className:"group relative my-2",children:[(0,s.jsxs)("a",{href:"/dashboard/graph/weight",className:(0,i.Z)("flex items-center space-x-2 text-gray-700 hover:text-gray-500 transition-colors duration-300",{"font-bold":t.startsWith("/dashboard/graph/")}),children:[s.jsx(n.Op,{className:"text-xl"}),s.jsx("span",{children:"Graph"})]}),s.jsx("div",{className:(0,i.Z)("absolute left-0 right-0 mx-auto mt-1 h-1 bg-yellow-500 transition-all duration-300",{"w-full":t.startsWith("/dashboard/graph/"),"w-0 group-hover:w-full":!t.startsWith("/dashboard/graph/")})})]}),(0,s.jsxs)("li",{className:"group relative my-2",children:[(0,s.jsxs)("a",{href:"/dashboard/personal-details",className:(0,i.Z)("flex items-center space-x-2 text-gray-700 hover:text-gray-500 transition-colors duration-300",{"font-bold":"/dashboard/personal-details"===t||"/dashboard/goal"===t||"/dashboard/goal/confirm"===t}),children:[s.jsx(n.ULU,{className:"text-xl"}),s.jsx("span",{children:"Goal Settings"})]}),s.jsx("div",{className:(0,i.Z)("absolute left-0 right-0 mx-auto mt-1 h-1 bg-yellow-500 transition-all duration-300",{"w-full":"/dashboard/personal-details"===t||"/dashboard/goal"===t||"/dashboard/goal/confirm"===t,"w-0 group-hover:w-full":!("/dashboard/personal-details"===t||"/dashboard/goal"===t||"/dashboard/goal/confirm"===t)})})]}),(0,s.jsxs)("li",{className:"group relative my-2",children:[(0,s.jsxs)("a",{href:"/dashboard/monsters",className:(0,i.Z)("flex items-center space-x-2 text-gray-700 hover:text-gray-500 transition-colors duration-300",{"font-bold":"/dashboard/monsters"===t}),children:[s.jsx(c.NzJ,{className:"text-xl"}),s.jsx("span",{children:"Monsters"})]}),s.jsx("div",{className:(0,i.Z)("absolute left-0 right-0 mx-auto mt-1 h-1 bg-yellow-500 transition-all duration-300",{"w-full":"/dashboard/monsters"===t,"w-0 group-hover:w-full":"/dashboard/monsters"!==t})})]})]})]})}},45884:(e,t,r)=>{"use strict";r.d(t,{W6:()=>i,_Y:()=>o,kh:()=>n});var s=r(14774);let a="America/New_York";function i(){let e=new Date,t=(0,s.zW)(e,a);return(0,s.WU)(t,"yyyy-MM-dd")}function o(e){return(0,s.zW)(e,a)}function n(e,t){let r=(0,s.zW)(e,a);return(0,s.WU)(r,t)}},96162:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>m,metadata:()=>u});var s=r(19510),a=r(71615),i=r(58585),o=r(68570);let n=(0,o.createProxy)(String.raw`/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/components/navigation/DashboardNav.tsx`),{__esModule:c,$$typeof:l}=n;n.default;let d=(0,o.createProxy)(String.raw`/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/components/navigation/DashboardNav.tsx#default`),u={title:"Dashboard",description:"This is the dashboard for Egg Health."},m=async({children:e})=>{let t=(0,a.cookies)(),r=t.get("token"),o=t.get("id")?.toString(),n=t.get("nickname")?.toString(),c=t.get("username")?.toString();return o&&n&&c&&r?(0,s.jsxs)("div",{className:"mt-14 max-sm:mt-2",children:[s.jsx(d,{}),e]}):(0,i.redirect)("/")}},72269:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var s=r(19510),a=r(68570);let i=(0,a.createProxy)(String.raw`/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/components/account/AccountUpdateForm.tsx`),{__esModule:o,$$typeof:n}=i;i.default;let c=(0,a.createProxy)(String.raw`/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/components/account/AccountUpdateForm.tsx#default`),l=async()=>s.jsx(s.Fragment,{children:s.jsx(c,{})})},32518:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$ACTION_0:()=>c,fetchAccount:()=>n});var s=r(27745);r(26461);var a=r(53973),i=r(97228),o=r(85723);let n=(0,s.registerServerReference)("9b620fd0496b5f84341347bb1aa716807cb13cf4",c);async function c(){let e=(0,a.cookies)(),t=e.get("token")?.value;return t?(await fetch(`${i.API_URL}/accounts/get/`,{method:"GET",headers:{"content-type":"application/json",Authorization:`Token ${t}`}})).json():{error:"Token not found"}}(0,o.ensureServerEntryExports)([n]),(0,s.registerServerReference)("c9fde3ec68f4a81eecae4315446ee002b122a688",n)},71506:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$ACTION_0:()=>c,updateAccount:()=>n});var s=r(27745);r(26461);var a=r(53973),i=r(97228),o=r(85723);let n=(0,s.registerServerReference)("04c8ca4404b3c24dc11957f513907aa154f7302b",c);async function c(e){let t=(0,a.cookies)(),r=t.get("token")?.value;return r?(await fetch(`${i.API_URL}/accounts/update/`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Token ${r}`},body:JSON.stringify(e)})).json():{error:"Token not found"}}(0,o.ensureServerEntryExports)([n]),(0,s.registerServerReference)("bbd69a1fd1c52af0630ca2ae44f76e0f3ed9ada7",n)},78694:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$ACTION_0:()=>c,fetchLicenseDetail:()=>n});var s=r(27745);r(26461);var a=r(53973),i=r(97228),o=r(85723);let n=(0,s.registerServerReference)("ec1947a7872854c940b411230dab37e4a1fac393",c);async function c(){let e=(0,a.cookies)(),t=e.get("token")?.value;return t?(await fetch(`${i.API_URL}/license/get-license-detail/`,{method:"GET",headers:{"content-type":"application/json",Authorization:`Token ${t}`}})).json():{error:"Token not found"}}(0,o.ensureServerEntryExports)([n]),(0,s.registerServerReference)("daa22de9bf9c0c80b16f4086db22822116b64052",n)},17346:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$ACTION_0:()=>c,fetchLicenseType:()=>n});var s=r(27745);r(26461);var a=r(53973),i=r(97228),o=r(85723);let n=(0,s.registerServerReference)("3e793398c34ccf0e9a41e8b783f764896bcc54b8",c);async function c(){let e=(0,a.cookies)(),t=e.get("token")?.value;return t?(await fetch(`${i.API_URL}/license/get-license-type/`,{method:"GET",headers:{"content-type":"application/json",Authorization:`Token ${t}`}})).json():{error:"Token not found"}}(0,o.ensureServerEntryExports)([n]),(0,s.registerServerReference)("78e50616bcc9f3a4ab9f0d6b75948676d37239cc",n)},97228:(e,t,r)=>{"use strict";r.d(t,{API_URL:()=>s});let s="https://wellnessmons.com/backend"}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[8948,5898,7039,4046,362,9632,8587,1855,8736,6329],()=>r(24709));module.exports=s})();