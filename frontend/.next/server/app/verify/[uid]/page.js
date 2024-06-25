(()=>{var e={};e.id=6021,e.ids=[6021],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},71017:e=>{"use strict";e.exports=require("path")},57310:e=>{"use strict";e.exports=require("url")},68303:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>n.a,__next_app__:()=>m,originalPathname:()=>d,pages:()=>u,routeModule:()=>p,tree:()=>c}),s(59128),s(12975),s(7629),s(12523);var r=s(23191),i=s(88716),a=s(37922),n=s.n(a),o=s(95231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);s.d(t,l);let c=["",{children:["verify",{children:["[uid]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,59128)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/verify/[uid]/page.tsx"]}]},{}]},{metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,50592))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(s.bind(s,12975)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/layout.tsx"],error:[()=>Promise.resolve().then(s.bind(s,7629)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/error.tsx"],"not-found":[()=>Promise.resolve().then(s.bind(s,12523)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/not-found.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,50592))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],u=["/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/verify/[uid]/page.tsx"],d="/verify/[uid]/page",m={require:s,loadChunk:()=>Promise.resolve()},p=new r.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/verify/[uid]/page",pathname:"/verify/[uid]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},95811:(e,t,s)=>{Promise.resolve().then(s.bind(s,70928))},70928:(e,t,s)=>{"use strict";s.d(t,{default:()=>u});var r=s(10326),i=s(17577),a=s(35047),n=s(90434),o=s(39530),l=s(74132),c=s(31551);let u=({uid:e})=>{let t=(0,a.useRouter)(),s=(0,o.TL)(),[u,d]=(0,i.useState)(Array(6).fill("")),m=(e,t)=>{if(isNaN(Number(e.value)))return;let s=e.value;d(e=>{let r=[...e];return r[t]=s,r}),e.nextElementSibling&&e.nextElementSibling.focus()},p=(e,t)=>{let s=e.currentTarget;"Backspace"===e.key&&(d(e=>{let s=[...e];return s[t]="",s}),s.previousElementSibling&&s.previousElementSibling.focus())},g=async r=>{r.preventDefault();let i=u.join(""),a=await fetch("/api/verify",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({otp:i,uid:e})}),n=await a.json();if(200!==a.status){s((0,l.fz)({message:n.error,type:"error"})),setTimeout(()=>s((0,l.Qu)()),3e3);return}"message"in n&&(s((0,l.fz)({message:n.message,type:"success"})),s((0,c.QV)(n.account)),t.push("/dashboard"))};return(0,r.jsxs)("div",{className:"flex min-h-full flex-col justify-center px-6 py-4 lg:px-8 h-screen",children:[r.jsx("div",{className:"sm:mx-auto sm:w-full sm:max-w-sm",children:r.jsx("h1",{className:"mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900",children:"Verify Account"})}),(0,r.jsxs)("div",{className:"mt-10 sm:mx-auto sm:w-full sm:max-w-sm",children:[(0,r.jsxs)("form",{className:"space-y-6",onSubmit:g,children:[(0,r.jsxs)("div",{children:[r.jsx("label",{htmlFor:"otp",className:"block text-sm font-medium leading-6 text-gray-900",children:"Please enter the 6-digit code sent to your registered email to activate your account."}),r.jsx("div",{className:"mt-2 flex justify-between",children:u.map((e,t)=>r.jsx("input",{type:"text",name:"otp",maxLength:1,value:e,onChange:e=>m(e.target,t),onKeyDown:e=>p(e,t),className:"text-xl font-bold block w-12 h-12 text-center text-lg rounded-md border-0 py-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"},t))})]}),(0,r.jsxs)("section",{className:"flex flex-col lg:flex-row gap-y-3 lg:gap-y-0 justify-between items-end lg:items-center lg:justify-between",children:[(0,r.jsxs)("span",{className:"text-gray-600 order-2 lg:order-1",children:[r.jsx("span",{className:"mr-2",children:"Not signed up yet?"}),r.jsx(n.default,{href:"/signup",className:"text-blue-700 hover:text-blue-500",children:"Sign Up"})]}),r.jsx("button",{type:"submit",className:"flex w-full order-1 lg:order-2 lg:w-fit justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",children:"Verify"})]})]}),r.jsx("p",{className:"text-xs text-gray-500 mt-1",children:"* If account verification fails, please try signing up again."})]})]})}},59128:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>c});var r=s(19510),i=s(68570);let a=(0,i.createProxy)(String.raw`/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/components/auth/verifyForm.tsx`),{__esModule:n,$$typeof:o}=a;a.default;let l=(0,i.createProxy)(String.raw`/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/components/auth/verifyForm.tsx#default`),c=async({params:{uid:e}})=>r.jsx(l,{uid:e})}};var t=require("../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[8948,5898,7039,6329],()=>s(68303));module.exports=r})();