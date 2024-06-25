(()=>{var e={};e.id=3314,e.ids=[3314],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},71017:e=>{"use strict";e.exports=require("path")},57310:e=>{"use strict";e.exports=require("url")},12108:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>i.a,__next_app__:()=>x,originalPathname:()=>u,pages:()=>d,routeModule:()=>m,tree:()=>o}),s(57037),s(12975),s(7629),s(12523);var a=s(23191),r=s(88716),l=s(37922),i=s.n(l),n=s(95231),c={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(c[e]=()=>n[e]);s.d(t,c);let o=["",{children:["exercise-calories-calculator",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,57037)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/exercise-calories-calculator/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,50592))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(s.bind(s,12975)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/layout.tsx"],error:[()=>Promise.resolve().then(s.bind(s,7629)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/error.tsx"],"not-found":[()=>Promise.resolve().then(s.bind(s,12523)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/not-found.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,50592))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/exercise-calories-calculator/page.tsx"],u="/exercise-calories-calculator/page",x={require:s,loadChunk:()=>Promise.resolve()},m=new a.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/exercise-calories-calculator/page",pathname:"/exercise-calories-calculator",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:o}})},70736:(e,t,s)=>{let a={"342aa06a21a97e561d55aaedcb6b3ac8a9205816":()=>Promise.resolve().then(s.bind(s,23506)).then(e=>e.fetchDefaultWorkoutsBySearch),"41d0f49605d595914463140b8662d63a0722d81e":()=>Promise.resolve().then(s.bind(s,23506)).then(e=>e.$$ACTION_1),"662407b8acbe2b7ab7f81f740e56bdd741d648f1":()=>Promise.resolve().then(s.bind(s,23506)).then(e=>e.$$ACTION_0),cc101c4f44c8ca786c397e3d7252dbdcdf5c24da:()=>Promise.resolve().then(s.bind(s,23506)).then(e=>e.fetchDefaultWorkoutsByType)};async function r(e,...t){return(await a[e]()).apply(null,t)}e.exports={"342aa06a21a97e561d55aaedcb6b3ac8a9205816":r.bind(null,"342aa06a21a97e561d55aaedcb6b3ac8a9205816"),"41d0f49605d595914463140b8662d63a0722d81e":r.bind(null,"41d0f49605d595914463140b8662d63a0722d81e"),"662407b8acbe2b7ab7f81f740e56bdd741d648f1":r.bind(null,"662407b8acbe2b7ab7f81f740e56bdd741d648f1"),cc101c4f44c8ca786c397e3d7252dbdcdf5c24da:r.bind(null,"cc101c4f44c8ca786c397e3d7252dbdcdf5c24da")}},29573:(e,t,s)=>{Promise.resolve().then(s.bind(s,93112)),Promise.resolve().then(s.bind(s,68217)),Promise.resolve().then(s.bind(s,51066))},34394:(e,t,s)=>{"use strict";s.d(t,{Z:()=>i});var a=s(10326),r=s(17577),l=s(44046);let i=()=>{let[e,t]=(0,r.useState)(!1);return(0,a.jsxs)("div",{children:[a.jsx("button",{onClick:()=>{t(!0)},className:"text-blue-500 hover:text-blue-700 underline",children:"What is METs?"}),e&&a.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50",children:(0,a.jsxs)("div",{className:"relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full",children:[a.jsx("button",{onClick:()=>{t(!1)},className:"absolute top-2 right-2 text-gray-500 hover:text-gray-700",children:a.jsx(l.aHS,{className:"text-xl"})}),a.jsx("h2",{className:"text-xl font-bold mb-4",children:"About METs"}),a.jsx("p",{className:"mb-4",children:"METs (Metabolic Equivalents) is a measure of the energy cost of physical activities."}),a.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Calculation Formula:"}),(0,a.jsxs)("p",{className:"mb-4",children:["The formula to calculate burned calories  is:",a.jsx("br",{}),a.jsx("code",{className:"block bg-gray-100 p-2 rounded mt-2",children:"Burned Calories= MET value \xd7 weight (kg) \xd7 time (hours) \xd7 1.05"})]}),a.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Example:"}),(0,a.jsxs)("p",{className:"mb-4",children:["If a person weighs 80 kg and runs at a MET value of 11 for 10 minutes:",a.jsx("br",{}),a.jsx("code",{className:"block bg-gray-100 p-2 rounded mt-2",children:"Burned Calories = 11 \xd7 80 kg \xd7 (10/60) hours \xd7 1.05 = 154(kcal)"})]})]})})]})}},93112:(e,t,s)=>{"use strict";s.d(t,{default:()=>h});var a=s(10326),r=s(17577);s(15424);var l=s(46242);(0,l.$)("342aa06a21a97e561d55aaedcb6b3ac8a9205816");var i=(0,l.$)("cc101c4f44c8ca786c397e3d7252dbdcdf5c24da"),n=s(39530),c=s(74132),o=s(74587),d=s(44046),u=s(94835),x=s(89632);let m=[{type:"Daily Living Activities",icon:u.ssk,label:"Daily Living"},{type:"Walking・Running",icon:d.BLk,label:"Walking・Running"},{type:"Cardio",icon:d.F9M,label:"Cardio"},{type:"Fitness",icon:u.AWU,label:"Fitness"},{type:"Ball Sports",icon:d.Qh7,label:"Ball Sports"},{type:"Martial Arts",icon:u.GAQ,label:"Martial Arts"},{type:"Water and Winter Sports",icon:d.rMl,label:"Water & Winter"},{type:"Other",icon:x.ol$,label:"Other"}],h=()=>{let e=(0,n.TL)(),[t,s]=(0,r.useState)("");(0,r.useEffect)(()=>{let s=async()=>{try{let s=await i(t);if("error"in s){e((0,c.fz)({message:s.error,type:"error"})),setTimeout(()=>e((0,c.Qu)()),3e3);return}"message"in s&&(e((0,o.QK)()),e((0,o.c0)(s.data)))}catch(e){}};""!==t&&s()},[t]);let l=e=>{s(e)};return a.jsx("div",{children:a.jsx("div",{className:"flex flex-wrap gap-1",children:m.map(e=>(0,a.jsxs)("button",{onClick:()=>l(e.type),className:`hover:scale-105 flex flex-col items-center justify-center w-20 h-20 p-0 rounded-md ${t===e.type?"bg-orange-500 text-white":"bg-yellow-200 text-gray-800"}`,children:[a.jsx(e.icon,{className:"text-2xl m-1"}),a.jsx("span",{className:"text-xs",children:e.label})]},e.type))})})}},68217:(e,t,s)=>{"use strict";s.d(t,{default:()=>c});var a=s(10326),r=s(17577),l=s(23703),i=s(10123),n=s(39530);let c=()=>{let e=(0,n.CG)(e=>e.workout_exercise.used_workout),[t,s]=(0,r.useState)(null),c=(0,l.TA)({initialValues:{weight:"",weightUnit:"kg",duration:""},validationSchema:i.Ry({weight:i.Rx().required("Weight is required").positive("Weight must be a positive number"),duration:i.Rx().required("Duration is required").positive("Duration must be a positive number")}),onSubmit:t=>{if(!e){alert("Please select an activity");return}let a=parseFloat(t.weight);"lbs"===t.weightUnit&&(a*=.453592),s(1.05*a*parseFloat(t.duration)/60*e.mets)}});return(0,a.jsxs)("div",{className:"w-full mx-auto p-6 bg-white rounded-lg shadow-md",children:[e&&(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsxs)("h2",{className:"text-xl font-semibold capitalize",children:["Selected Workout: ",e.name]}),(0,a.jsxs)("p",{children:["METS: ",e.mets]})]}),(0,a.jsxs)("form",{onSubmit:c.handleSubmit,children:[(0,a.jsxs)("div",{className:"mb-4",children:[a.jsx("label",{className:"block mb-2",children:"Weight"}),(0,a.jsxs)("div",{className:"flex",children:[a.jsx("input",{type:"text",name:"weight",value:c.values.weight,onChange:c.handleChange,onBlur:c.handleBlur,className:"border p-2 rounded-l w-full"}),(0,a.jsxs)("select",{name:"weightUnit",value:c.values.weightUnit,onChange:c.handleChange,className:"border p-2 rounded-r",children:[a.jsx("option",{value:"kg",children:"kg"}),a.jsx("option",{value:"lbs",children:"lbs"})]})]}),c.touched.weight&&c.errors.weight?a.jsx("div",{className:"text-red-500 text-sm mt-1",children:c.errors.weight}):null]}),(0,a.jsxs)("div",{className:"mb-4",children:[a.jsx("label",{className:"block mb-2",children:"Duration (minutes)"}),a.jsx("input",{type:"text",name:"duration",value:c.values.duration,onChange:c.handleChange,onBlur:c.handleBlur,className:"border p-2 rounded w-full"}),c.touched.duration&&c.errors.duration?a.jsx("div",{className:"text-red-500 text-sm mt-1",children:c.errors.duration}):null]}),a.jsx("button",{type:"submit",className:"bg-blue-500 text-white p-2 rounded",children:"Calculate Calories"})]}),null!==t&&a.jsx("div",{className:"mt-4",children:(0,a.jsxs)("h2",{className:"text-2xl font-semibold",children:["Predicted Calories Burned is",a.jsx("br",{}),t.toFixed(2)," (kcal)"]})})]})}},51066:(e,t,s)=>{"use strict";s.d(t,{default:()=>n});var a=s(10326);s(17577);var r=s(39530),l=s(74587),i=s(34394);let n=()=>{let e=(0,r.TL)(),t=(0,r.CG)(e=>e.workout_exercise.select_workout_list),s=t=>{e((0,l.N8)(t))};return a.jsx("div",{className:"sm:mx-auto w-full",children:(0,a.jsxs)("div",{className:"bg-white border border-gray-300 rounded-md",children:[(0,a.jsxs)("div",{className:"bg-red-100 px-4 py-2 text-left text-xs font-medium text-gray-500 rounded-t-md flex",children:[a.jsx("span",{className:"mr-4",children:"Select Activity"}),a.jsx(i.Z,{})]}),a.jsx("div",{className:"flex flex-col h-56 overflow-y-auto",children:t&&t.length>0?a.jsx("table",{className:"min-w-full divide-y divide-gray-200",children:a.jsx("tbody",{className:"bg-white divide-y divide-gray-200",children:t.map(e=>a.jsx("tr",{className:"hover:bg-gray-100 cursor-pointer",children:(0,a.jsxs)("td",{className:"px-4 py-2 text-sm text-gray-900 w-32 ",onClick:()=>s(e),children:[a.jsx("div",{className:"overflow-ellipsis overflow-hidden whitespace-nowrap capitalize",children:e.name}),a.jsx("div",{className:"flex items-center",children:(0,a.jsxs)("span",{className:"text-xs font-semibold",children:["(",e.mets,"METs)"]})})]})},e.id))})}):a.jsx("p",{className:"text-gray-500 p-4",children:"No activity yet"})})]})})}},54365:(e,t)=>{"use strict";function s(){return null}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return s}}),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},57037:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>y});var a=s(19510);s(71159);var r=s(54365),l=s.n(r),i=s(68570);let n=(0,i.createProxy)(String.raw`/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/components/exercise/DefaultWorkoutBytype.tsx`),{__esModule:c,$$typeof:o}=n;n.default;let d=(0,i.createProxy)(String.raw`/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/components/exercise/DefaultWorkoutBytype.tsx#default`),u=(0,i.createProxy)(String.raw`/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/components/other_service/SelectWorkoutCalcList.tsx`),{__esModule:x,$$typeof:m}=u;u.default;let h=(0,i.createProxy)(String.raw`/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/components/other_service/SelectWorkoutCalcList.tsx#default`),p=(0,i.createProxy)(String.raw`/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/components/other_service/ExerciseCaloriesCalculator.tsx`),{__esModule:f,$$typeof:b}=p;p.default;let g=(0,i.createProxy)(String.raw`/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/components/other_service/ExerciseCaloriesCalculator.tsx#default`);var v=s(97443);let y=()=>(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(l(),{children:[a.jsx("title",{children:"Exercise Calorie Calculator | Wellness Mons"}),a.jsx("meta",{name:"description",content:"Calculate the calories burned during exercise using the Wellness Mons Exercise Calorie Calculator. Enter your weight, duration, and select your activity to get started."}),a.jsx("meta",{name:"keywords",content:"Exercise calorie calculator, calories burned, workout, fitness calculator, Wellness Mons, activity"}),a.jsx("meta",{name:"author",content:"Wellness Mons"}),a.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),a.jsx("link",{rel:"icon",href:"/icon.ico"})]}),(0,a.jsxs)("div",{className:"min-h-full bg-gray-100 py-10 mt-14 px-10",children:[a.jsx("h1",{className:"text-3xl font-bold mb-6",children:"Exercise Calories Calculator"}),(0,a.jsxs)("div",{className:"flex items-center max-md:flex-col",children:[(0,a.jsxs)("div",{className:"w-2/3 max-md:w-full mx-4",children:[(0,a.jsxs)("div",{className:"flex flex-col text-left mb-4 w-3/4 max-sm:w-full",children:[a.jsx("h2",{className:"text-base font-semibold mb-2",children:"Step1. Search for Activity"}),a.jsx(d,{})]}),(0,a.jsxs)("div",{className:"flex flex-col text-left mb-4 w-3/4 max-sm:w-full",children:[a.jsx("h2",{className:"text-base font-semibold mb-2",children:"Step2. Select Activity"}),a.jsx(h,{})]}),(0,a.jsxs)("div",{className:"flex flex-col text-left mb-4 w-3/4 max-sm:w-full",children:[a.jsx("h2",{className:"text-base font-semibold mb-2",children:"Step3. Input Forms Below"}),a.jsx(g,{})]}),(0,a.jsxs)("div",{className:"mt-6 text-center",children:[a.jsx("p",{className:"text-lg",children:"Want to achieve your fitness goals faster?"}),a.jsx("a",{href:"/signup",className:"bg-blue-500 text-white p-2 rounded mt-4 inline-block",children:"Sign Up for Wellness Mons"}),a.jsx("p",{className:"mt-4 text-lg",children:"Want to know more about our services?"}),a.jsx("a",{href:"/",className:"bg-green-500 text-white p-2 rounded mt-4 inline-block",children:"Visit Our Landing Page"})]})]}),(0,a.jsxs)("div",{className:"w-1/6 flex flex-col max-md:w-full max-md:flex-row max-md:flex-wrap",children:[a.jsx("div",{className:"h-[180px] w-[300px]",children:a.jsx(v.Z,{})}),a.jsx("div",{className:"h-[180px] w-[300px]",children:a.jsx(v.Z,{})}),a.jsx("div",{className:"h-[180px] w-[300px]",children:a.jsx(v.Z,{})}),a.jsx("div",{className:"h-[180px] w-[300px]",children:a.jsx(v.Z,{})})]})]})]})]})},23506:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$ACTION_0:()=>n,$$ACTION_1:()=>o,fetchDefaultWorkoutsBySearch:()=>c,fetchDefaultWorkoutsByType:()=>i});var a=s(27745);s(26461);var r=s(97228),l=s(85723);let i=(0,a.registerServerReference)("662407b8acbe2b7ab7f81f740e56bdd741d648f1",n);async function n(e){return(await fetch(`${r.API_URL}/exercises/get-default-workouts/${e}/`,{method:"GET",headers:{"content-type":"application/json"}})).json()}let c=(0,a.registerServerReference)("41d0f49605d595914463140b8662d63a0722d81e",o);async function o(e){return(await fetch(`${r.API_URL}/exercises/get-default-workouts/?search_key=${e}`,{method:"GET",headers:{"content-type":"application/json"}})).json()}(0,l.ensureServerEntryExports)([i,c]),(0,a.registerServerReference)("cc101c4f44c8ca786c397e3d7252dbdcdf5c24da",i),(0,a.registerServerReference)("342aa06a21a97e561d55aaedcb6b3ac8a9205816",c)},97443:(e,t,s)=>{"use strict";s.d(t,{Z:()=>r});var a=s(19510);let r=()=>a.jsx("div",{className:"w-full h-full bg-red-50 flex items-center justify-center border",children:a.jsx("p",{children:"Advertisements"})})},97228:(e,t,s)=>{"use strict";s.d(t,{API_URL:()=>a});let a="https://wellnessmons.com/backend"}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),a=t.X(0,[8948,5898,7039,4046,9632,362,1855,6329],()=>s(12108));module.exports=a})();