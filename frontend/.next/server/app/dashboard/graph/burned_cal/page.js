(()=>{var e={};e.id=9863,e.ids=[9863],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},71017:e=>{"use strict";e.exports=require("path")},57310:e=>{"use strict";e.exports=require("url")},78012:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>d.a,__next_app__:()=>f,originalPathname:()=>u,pages:()=>c,routeModule:()=>b,tree:()=>l}),a(87222),a(52150),a(96162),a(12975),a(7629),a(12523);var r=a(23191),s=a(88716),n=a(37922),d=a.n(n),i=a(95231),o={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>i[e]);a.d(t,o);let l=["",{children:["dashboard",{children:["graph",{children:["burned_cal",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,87222)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/dashboard/graph/burned_cal/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,52150)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/dashboard/graph/layout.tsx"]}]},{layout:[()=>Promise.resolve().then(a.bind(a,96162)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/dashboard/layout.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,50592))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(a.bind(a,12975)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/layout.tsx"],error:[()=>Promise.resolve().then(a.bind(a,7629)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/error.tsx"],"not-found":[()=>Promise.resolve().then(a.bind(a,12523)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/not-found.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,50592))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/dashboard/graph/burned_cal/page.tsx"],u="/dashboard/graph/burned_cal/page",f={require:a,loadChunk:()=>Promise.resolve()},b=new r.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/dashboard/graph/burned_cal/page",pathname:"/dashboard/graph/burned_cal",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},94193:(e,t,a)=>{let r={"2c902168e78f69f01f314a4d688ff3a9d9e9f036":()=>Promise.resolve().then(a.bind(a,58888)).then(e=>e.fetchExerciseCal),"362327ad8fe509f0eb3d0b8990c97e782d9bcd34":()=>Promise.resolve().then(a.bind(a,58888)).then(e=>e.$$ACTION_0),"8d6ecfcbb4b8cd3c3de50d97fb3bd81f1b7d29ea":()=>Promise.resolve().then(a.bind(a,25087)).then(e=>e.fetchGoal),bd823d0613ec645d321466a579ecb55214ec52c4:()=>Promise.resolve().then(a.bind(a,25087)).then(e=>e.$$ACTION_0),"8f758dba1c4981e0f8e3691d1c9e1f35a48fd432":()=>Promise.resolve().then(a.bind(a,7924)).then(e=>e.$$ACTION_0),"9b33d9685808d4a88868ba66022b2800b25d6f39":()=>Promise.resolve().then(a.bind(a,7924)).then(e=>e.fetchLogout)};async function s(e,...t){return(await r[e]()).apply(null,t)}e.exports={"2c902168e78f69f01f314a4d688ff3a9d9e9f036":s.bind(null,"2c902168e78f69f01f314a4d688ff3a9d9e9f036"),"362327ad8fe509f0eb3d0b8990c97e782d9bcd34":s.bind(null,"362327ad8fe509f0eb3d0b8990c97e782d9bcd34"),"8d6ecfcbb4b8cd3c3de50d97fb3bd81f1b7d29ea":s.bind(null,"8d6ecfcbb4b8cd3c3de50d97fb3bd81f1b7d29ea"),bd823d0613ec645d321466a579ecb55214ec52c4:s.bind(null,"bd823d0613ec645d321466a579ecb55214ec52c4"),"8f758dba1c4981e0f8e3691d1c9e1f35a48fd432":s.bind(null,"8f758dba1c4981e0f8e3691d1c9e1f35a48fd432"),"9b33d9685808d4a88868ba66022b2800b25d6f39":s.bind(null,"9b33d9685808d4a88868ba66022b2800b25d6f39")}},42343:(e,t,a)=>{Promise.resolve().then(a.bind(a,26067))},26067:(e,t,a)=>{"use strict";a.d(t,{default:()=>g});var r=a(10326),s=a(17577),n=a(39530),d=a(74132);a(15424);var i=(0,a(46242).$)("2c902168e78f69f01f314a4d688ff3a9d9e9f036"),o=a(64707),l=a(43360),c=a(67390),u=a(61636),f=a(38236);c.kL.register(u.Z),c.kL.register(f.Z),c.kL.register(...c.zX);let b=({data:e,goal:t})=>{let a=e.map(e=>e.date),s=e.map(e=>e.sum_exercise_cal),n=t?.goal_consume_cal??null,d=null!==n?Math.round(n):null,i=s.map(e=>null!==n&&null!==e&&e>=n-200&&e<=n+200?"rgba(255, 165, 0, 0.2)":null!==n&&null!==e&&e>n+200?"rgba(255, 165, 0, 0.2)":"rgba(173, 216, 230, 0.2)"),o=s.map(e=>null!==n&&null!==e&&e>=n-200&&e<=n+200?"rgba(255, 165, 0, 1)":null!==n&&null!==e&&e>n+200?"rgba(255, 165, 0, 1)":"rgba(173, 216, 230, 1)"),c=Math.max(...s);return(0,r.jsxs)("div",{className:"relative min-w-[355px]",children:[null!==d&&(0,r.jsxs)("div",{className:"w-full text-center text-gray-700 py-2 z-10",children:["Goal Daily Burned Calories: ",d," kcal"]}),r.jsx(l.$Q,{data:{labels:a,datasets:[{data:s,backgroundColor:i,borderColor:o,borderWidth:1}]},options:{scales:{x:{type:"category",title:{display:!0,text:"Date"},ticks:{callback:function(e,t){let r=new Date(a[t]),s=r.getUTCMonth()+1,n=r.getUTCDate();return`${s}/${n}`}},grid:{display:!1},offset:!0},y:{type:"linear",position:"left",title:{display:!0,text:"Burned Calories (kcal)"},beginAtZero:!0,max:null!==n?Math.max(n+400,c+400):c+200}},plugins:{annotation:"number"==typeof n?{annotations:{line1:{type:"line",yMin:n,yMax:n,borderColor:"rgba(255, 140, 0, 1)",borderWidth:2}}}:void 0,legend:{display:!1},datalabels:{display:function(e){let t=e.dataset.data[e.dataIndex];return"number"==typeof t&&null!==n&&(t>=n-200&&t<=n+200||t>n+200)},align:"end",anchor:"end",backgroundColor:"rgba(255, 165, 0, 0.8)",borderRadius:4,color:"white",font:{weight:"bold"},formatter:function(){return"Good!"}}},layout:{padding:{right:20,left:20}}},height:200,className:"border"})]})};var p=a(31051);let g=()=>{let e=(0,n.TL)(),[t,a]=(0,s.useState)([]),[l,c]=(0,s.useState)(null);return(0,s.useEffect)(()=>{(async()=>{try{let t=await i();if("error"in t){e((0,d.fz)({message:t.error,type:"error"})),setTimeout(()=>e((0,d.Qu)()),3e3);return}"message"in t&&a(t.data)}catch(e){}})()},[]),(0,s.useEffect)(()=>{(async()=>{try{let t=await (0,o.V)();"error"in t?(e((0,d.fz)({message:t.error,type:"error"})),setTimeout(()=>e((0,d.Qu)()),3e3)):"message"in t&&c(t.data)}catch(t){e((0,d.fz)({message:"An error occurred while fetching Goal.",type:"error"})),setTimeout(()=>e((0,d.Qu)()),3e3)}})()},[]),r.jsx("div",{className:"flex justify-center",children:(0,r.jsxs)("div",{className:"w-full p-4",children:[r.jsx(p.Z,{}),r.jsx(b,{data:t,goal:l})]})})}},87222:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>l});var r=a(19510),s=a(68570);let n=(0,s.createProxy)(String.raw`/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/components/graph/burned_cal/RenderExerciseCalBar.tsx`),{__esModule:d,$$typeof:i}=n;n.default;let o=(0,s.createProxy)(String.raw`/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/components/graph/burned_cal/RenderExerciseCalBar.tsx#default`),l=async()=>r.jsx(o,{})},58888:(e,t,a)=>{"use strict";a.r(t),a.d(t,{$$ACTION_0:()=>o,fetchExerciseCal:()=>i});var r=a(27745);a(26461);var s=a(53973),n=a(97228),d=a(85723);let i=(0,r.registerServerReference)("362327ad8fe509f0eb3d0b8990c97e782d9bcd34",o);async function o(){let e=(0,s.cookies)(),t=e.get("token")?.value;return t?(await fetch(`${n.API_URL}/user-details/get-exercise-cal/`,{method:"GET",headers:{"content-type":"application/json",Authorization:`Token ${t}`}})).json():{error:"Token not found"}}(0,d.ensureServerEntryExports)([i]),(0,r.registerServerReference)("2c902168e78f69f01f314a4d688ff3a9d9e9f036",i)}};var t=require("../../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),r=t.X(0,[8948,7211,4046,9632,0,1636,8236,130,3830],()=>a(78012));module.exports=r})();