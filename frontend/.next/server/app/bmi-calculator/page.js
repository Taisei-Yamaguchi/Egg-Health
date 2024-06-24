(()=>{var e={};e.id=3241,e.ids=[3241],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},71017:e=>{"use strict";e.exports=require("path")},57310:e=>{"use strict";e.exports=require("url")},61492:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>n.a,__next_app__:()=>x,originalPathname:()=>h,pages:()=>c,routeModule:()=>u,tree:()=>o}),s(69280),s(12975),s(7629),s(12523);var r=s(23191),a=s(88716),l=s(37922),n=s.n(l),i=s(95231),d={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>i[e]);s.d(t,d);let o=["",{children:["bmi-calculator",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,69280)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/bmi-calculator/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,50592))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(s.bind(s,12975)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/layout.tsx"],error:[()=>Promise.resolve().then(s.bind(s,7629)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/error.tsx"],"not-found":[()=>Promise.resolve().then(s.bind(s,12523)),"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/not-found.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,50592))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/bmi-calculator/page.tsx"],h="/bmi-calculator/page",x={require:s,loadChunk:()=>Promise.resolve()},u=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/bmi-calculator/page",pathname:"/bmi-calculator",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:o}})},76966:(e,t,s)=>{let r={"8f758dba1c4981e0f8e3691d1c9e1f35a48fd432":()=>Promise.resolve().then(s.bind(s,7924)).then(e=>e.$$ACTION_0),"9b33d9685808d4a88868ba66022b2800b25d6f39":()=>Promise.resolve().then(s.bind(s,7924)).then(e=>e.fetchLogout)};async function a(e,...t){return(await r[e]()).apply(null,t)}e.exports={"8f758dba1c4981e0f8e3691d1c9e1f35a48fd432":a.bind(null,"8f758dba1c4981e0f8e3691d1c9e1f35a48fd432"),"9b33d9685808d4a88868ba66022b2800b25d6f39":a.bind(null,"9b33d9685808d4a88868ba66022b2800b25d6f39")}},78143:(e,t,s)=>{Promise.resolve().then(s.bind(s,58038))},58038:(e,t,s)=>{"use strict";s.d(t,{default:()=>i});var r=s(10326),a=s(17577),l=s(23703),n=s(10123);let i=()=>{let[e,t]=(0,a.useState)(null),[s,i]=(0,a.useState)(null),d=(0,l.TA)({initialValues:{weight:"",height:"",weightUnit:"kg",heightUnit:"cm"},validationSchema:n.Ry({weight:n.Rx().required("This value is required.").positive("Must be greater than zero."),height:n.Rx().required("This value is required.").positive("Must be greater than zero.")}),onSubmit:e=>{let s=Number(e.weight),r=Number(e.height);"lb"===e.weightUnit&&(s*=.453592),"ft"===e.heightUnit&&(r*=30.48);let a=r/100,l=s/(a*a);t(l),l<18.5?i("Underweight"):l<24.9?i("Normal weight"):l<29.9?i("Overweight"):i("Obesity")}});return(0,r.jsxs)("div",{className:"max-w-xl mx-auto p-6 mt-4 bg-white rounded-lg shadow-md text-left",children:[r.jsx("h2",{className:"text-2xl font-bold mb-4",children:"BMI Calculator"}),(0,r.jsxs)("form",{onSubmit:d.handleSubmit,children:[(0,r.jsxs)("div",{className:"mb-4",children:[r.jsx("label",{className:"block mb-2",children:"Weight"}),(0,r.jsxs)("div",{className:"flex",children:[r.jsx("input",{type:"text",name:"weight",onChange:d.handleChange,onBlur:d.handleBlur,value:d.values.weight,className:"border p-2 rounded-l w-full"}),(0,r.jsxs)("select",{name:"weightUnit",onChange:d.handleChange,value:d.values.weightUnit,className:"border p-2 rounded-r",children:[r.jsx("option",{value:"kg",children:"kg"}),r.jsx("option",{value:"lb",children:"lb"})]})]}),d.touched.weight&&d.errors.weight?r.jsx("div",{className:"text-red-500 text-xs mt-1",children:d.errors.weight}):null]}),(0,r.jsxs)("div",{className:"mb-4",children:[r.jsx("label",{className:"block mb-2",children:"Height"}),(0,r.jsxs)("div",{className:"flex",children:[r.jsx("input",{type:"text",name:"height",onChange:d.handleChange,onBlur:d.handleBlur,value:d.values.height,className:"border p-2 rounded-l w-full"}),(0,r.jsxs)("select",{name:"heightUnit",onChange:d.handleChange,value:d.values.heightUnit,className:"border p-2 rounded-r",children:[r.jsx("option",{value:"cm",children:"cm"}),r.jsx("option",{value:"ft",children:"ft"})]})]}),d.touched.height&&d.errors.height?r.jsx("div",{className:"text-red-500 text-xs mt-1",children:d.errors.height}):null]}),r.jsx("button",{type:"submit",className:"bg-blue-500 text-white p-2 rounded",children:"Calculate BMI"})]}),null!==e&&(0,r.jsxs)("div",{className:"mt-4 p-4 bg-gray-100 rounded",children:[r.jsx("h3",{className:"text-lg font-bold",children:"Your Predicted BMI is"}),r.jsx("p",{children:e.toFixed(2)}),(0,r.jsxs)("p",{children:["Category: ",s]})]})]})}},54365:(e,t)=>{"use strict";function s(){return null}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return s}}),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},69280:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>u});var r=s(19510);s(71159);var a=s(54365),l=s.n(a),n=s(68570);let i=(0,n.createProxy)(String.raw`/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/components/other_service/BMICalculator.tsx`),{__esModule:d,$$typeof:o}=i;i.default;let c=(0,n.createProxy)(String.raw`/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/components/other_service/BMICalculator.tsx#default`),h=()=>(0,r.jsxs)("div",{className:"max-w-xl mx-auto p-6 mt-4 bg-white rounded-lg shadow-md text-left",children:[r.jsx("h2",{className:"text-2xl font-bold mb-6",children:"BMI Classification"}),(0,r.jsxs)("table",{className:"min-w-full bg-white",children:[r.jsx("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsxs)("th",{className:"py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider",children:["BMI (kg/m",r.jsx("sup",{children:"2"}),")"]}),(0,r.jsxs)("th",{className:"py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 tracking-wider",children:["Classification ",r.jsx("span",{className:"tex-xs",children:"(WHO standard)"})]})]})}),(0,r.jsxs)("tbody",{children:[(0,r.jsxs)("tr",{children:[r.jsx("td",{className:"py-2 px-4 border-b border-gray-200",children:"< 18.5"}),r.jsx("td",{className:"py-2 px-4 border-b border-gray-200",children:"Underweight"})]}),(0,r.jsxs)("tr",{children:[r.jsx("td",{className:"py-2 px-4 border-b border-gray-200",children:"18.5 ≤ BMI < 25.0"}),r.jsx("td",{className:"py-2 px-4 border-b border-gray-200",children:"Normal range"})]}),(0,r.jsxs)("tr",{children:[r.jsx("td",{className:"py-2 px-4 border-b border-gray-200",children:"25.0 ≤ BMI < 30.0"}),r.jsx("td",{className:"py-2 px-4 border-b border-gray-200",children:"Overweight"})]}),(0,r.jsxs)("tr",{children:[r.jsx("td",{className:"py-2 px-4 border-b border-gray-200",children:"30.0 ≤ BMI < 35.0"}),r.jsx("td",{className:"py-2 px-4 border-b border-gray-200",children:"Obese Class I"})]}),(0,r.jsxs)("tr",{children:[r.jsx("td",{className:"py-2 px-4 border-b border-gray-200",children:"35.0 ≤ BMI < 40.0"}),r.jsx("td",{className:"py-2 px-4 border-b border-gray-200",children:"Obese Class II"})]}),(0,r.jsxs)("tr",{children:[r.jsx("td",{className:"py-2 px-4 border-b border-gray-200",children:"≥ 40.0"}),r.jsx("td",{className:"py-2 px-4 border-b border-gray-200",children:"Obese Class III"})]})]})]}),r.jsx("p",{className:"mt-4 text-sm text-gray-600",children:"Note: The BMI classification is not a diagnostic tool. It should be used as a guideline. It does not take into account factors such as gender, age, and muscle mass, which can influence overall health."})]});var x=s(97443);let u=()=>(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(l(),{children:[r.jsx("title",{children:"BMI Calculator | Calculate Your Body Mass Index | Wellness Mons"}),r.jsx("meta",{name:"description",content:"Use the Wellness Mons BMI Calculator to calculate your Body Mass Index. Enter your weight and height to get started and learn more about your health."}),r.jsx("meta",{name:"keywords",content:"BMI calculator, calculate BMI, Body Mass Index, health calculator, BMI, health, fitness"}),r.jsx("meta",{name:"author",content:"Wellness Mons"}),r.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),r.jsx("link",{rel:"icon",href:"/icon.ico"})]}),r.jsx("div",{className:"min-h-full bg-gray-100 py-10 mt-8",children:(0,r.jsxs)("div",{className:"flex items-center max-md:flex-col text-center",children:[(0,r.jsxs)("div",{className:"w-2/3 max-md:w-full ",children:[r.jsx("h1",{className:"text-3xl font-bold mb-6",children:"BMI Calculator"}),r.jsx("p",{className:"text-lg mb-6 max-w-xl text-left mx-10",children:"Calculate your Body Mass Index (BMI) using our simple and effective BMI Calculator. Track your health and fitness goals with Wellness Mons."}),r.jsx(c,{}),r.jsx(h,{}),(0,r.jsxs)("div",{className:"mt-6 text-center",children:[r.jsx("p",{className:"text-lg",children:"Want to achieve your fitness goals faster?"}),r.jsx("a",{href:"/signup",className:"bg-blue-500 text-white p-2 rounded mt-4 inline-block hover:scale-105",children:"Sign Up for Wellness Mons"}),r.jsx("p",{className:"mt-4 text-lg",children:"Want to know more about our services?"}),r.jsx("a",{href:"/",className:"bg-green-500 text-white p-2 rounded mt-4 inline-block hover:scale-105",children:"Visit Our Landing Page"})]})]}),(0,r.jsxs)("div",{className:"w-1/6 flex flex-col max-md:w-full max-md:flex-row max-md:flex-wrap",children:[r.jsx("div",{className:"h-[180px] w-[300px]",children:r.jsx(x.Z,{})}),r.jsx("div",{className:"h-[180px] w-[300px]",children:r.jsx(x.Z,{})}),r.jsx("div",{className:"h-[180px] w-[300px]",children:r.jsx(x.Z,{})}),r.jsx("div",{className:"h-[180px] w-[300px]",children:r.jsx(x.Z,{})})]})]})})]})},97443:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});var r=s(19510);let a=()=>r.jsx("div",{className:"w-full h-full bg-red-50 flex items-center justify-center border",children:r.jsx("p",{children:"Advertisements"})})}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[8948,7211,1855,130],()=>s(61492));module.exports=r})();