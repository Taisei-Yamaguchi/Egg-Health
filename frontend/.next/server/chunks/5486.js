"use strict";exports.id=5486,exports.ids=[5486],exports.modules={85362:(e,t,r)=>{r.d(t,{A:()=>s}),r(15424);var s=(0,r(46242).$)("7fff429c69b867e3800b043a2b917d4159e82b1e")},25698:(e,t,r)=>{r.d(t,{Z:()=>d});var s=r(10326);r(17577);var a=r(74132),n=r(39530);r(15424);var l=(0,r(46242).$)("8013d8ddf5b012fce6c7c8149e1e3478c4a525fb"),i=r(3062),o=r(74587),c=r(94835);let d=({id:e})=>{let t=(0,n.TL)(),r=async()=>{try{t((0,i.ex)(!0));let r=await l(e);if("error"in r){t((0,a.fz)({message:r.error,type:"error"})),setTimeout(()=>t((0,a.Qu)()),3e3);return}if("detail"in r){t((0,a.fz)({message:r.detail,type:"error"})),setTimeout(()=>t((0,a.Qu)()),3e3);return}"message"in r&&(t((0,a.fz)({message:r.message,type:"success"})),setTimeout(()=>t((0,a.Qu)()),3e3),t((0,o.mE)()))}catch(e){t((0,a.fz)({message:"An error occurred while deleting the exercise.",type:"error"})),setTimeout(()=>t((0,a.Qu)()),3e3)}finally{t((0,i.ex)(!1))}};return s.jsx("div",{className:"flex items-center gap-x-2 p-2 ",children:s.jsx("button",{className:"hover:text-red-800 transition",onClick:r,children:s.jsx(c.I0,{size:15})})})}},87744:(e,t,r)=>{r.d(t,{Z:()=>x});var s=r(10326),a=r(17577),n=r(35047),l=r(39530),i=r(74132),o=r(3062);r(15424);var c=r(46242),d=(0,c.$)("f5687b3fcdd5f0ea1dd0920ddf06bbd9e6b8a92c"),u=(0,c.$)("ddd0865cef06bac702cae7707b8bcb1587583512"),m=r(94835);let x=({date:e})=>{let t=(0,n.useRouter)(),r=(0,l.TL)(),[c,x]=(0,a.useState)([]),[f,b]=(0,a.useState)(!1),h=(0,l.CG)(e=>e.license.license);(0,a.useEffect)(()=>{h&&"free"!==h&&(async()=>{try{let e=await u();if("error"in e){r((0,i.fz)({message:e.error,type:"error"})),setTimeout(()=>r((0,i.Qu)()),3e3);return}"message"in e&&x(e.data)}catch(e){}})()},[r,h]);let y=async()=>{if(!h||"free"===h){t.push("/dashboard/premium");return}try{r((0,o.ex)(!0));let t=await d({date:e});if("error"in t){r((0,i.fz)({message:t.error,type:"error"})),setTimeout(()=>r((0,i.Qu)()),3e3);return}"message"in t&&(r((0,i.fz)({message:t.message,type:"success"})),setTimeout(()=>r((0,i.Qu)()),4e3))}catch(e){r((0,i.fz)({message:"An error occurred while registering the exercise.",type:"error"})),setTimeout(()=>r((0,i.Qu)()),3e3)}finally{r((0,o.ex)(!1))}};return(0,s.jsxs)("div",{className:"relative",onMouseEnter:()=>b(!0),onMouseLeave:()=>b(!1),children:[s.jsx("button",{className:" flex items-center justify-center p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition",onClick:y,children:s.jsx(m.BMe,{size:20})}),f&&s.jsx("div",{className:"absolute z-10 p-2 bg-white border-2 border-blue-500 rounded shadow-lg w-64 ml-2 mt-2",children:s.jsx("div",{className:"border-2 border-blue-500 p-2 rounded-md bg-blue-50",children:(0,s.jsxs)("ul",{children:[c.map((e,t)=>s.jsx("li",{className:"text-xs text-gray-700 truncate",children:e.workout.name},t)),!h||"free"===h&&(0,s.jsxs)("div",{className:"font-bold ",children:["This is for ",s.jsx("span",{className:"rounded-lg py-0.5 px-1 bg-gradient-to-r from-gray-200 to-gray-400 text-black font-bold",children:"Premium"})]})]})})})]})}},29319:(e,t,r)=>{r.d(t,{Z:()=>i});var s=r(10326);r(17577);var a=r(35047),n=r(41135),l=r(45884);let i=({date:e})=>{let t=(0,a.usePathname)(),r=e||(0,l.W6)(),i=[{label:"Record",href:`/dashboard/record/${r}`},{label:"Breakfast",href:`/dashboard/meal/Breakfast/${r}`},{label:"Lunch",href:`/dashboard/meal/Lunch/${r}`},{label:"Dinner",href:`/dashboard/meal/Dinner/${r}`},{label:"Snack",href:`/dashboard/meal/Snack/${r}`},{label:"Exercise",href:`/dashboard/exercise/${r}`}];return s.jsx("div",{className:"w-full flex justify-start rounded-md border-b-2 border-yellow-100",children:s.jsx("nav",{className:"w-full",children:s.jsx("ul",{className:"flex flex-wrap space-x-1 py-1 px-1 w-full pb-0",children:i.map(e=>s.jsx("li",{className:"flex-none bg-yellow-100",children:s.jsx("a",{href:e.href,className:(0,n.Z)("block py-1 px-1 text-center text-gray-700 rounded-t-md","hover:bg-white hover:text-gray-900 border border-yellow-200 transition-all","text-xs md:text-sm lg:text-base",{"bg-white text-gray-900 font-bold":t===e.href}),style:{minWidth:"60px"},children:e.label})},e.label))})})})}},66627:(e,t,r)=>{r.d(t,{Z:()=>u});var s=r(10326),a=r(35047),n=r(92977),l=r(88206),i=r(94629),o=r(89818),c=r(45884),d=r(17577);let u=({date:e})=>{var t;let r=(0,a.usePathname)()||"/",u=(0,a.useRouter)(),m=(0,c._Y)(new Date),x=(0,c.W6)(),f=(0,n.E)(m,2),[b,h]=(0,d.useState)(x);(0,d.useEffect)(()=>{e&&/^\d{4}-\d{2}-\d{2}$/.test(e)&&(0,l.J)((0,i.D)(e))&&h(e)},[e]);let y=(0,o.WU)((t=(0,i.D)(b),(0,n.E)(t,-1)),"yyyy-MM-dd"),p=(0,o.WU)((0,n.E)((0,i.D)(b),1),"yyyy-MM-dd"),g=(0,i.D)(p)>f,v=e=>{let t=r.split("/").slice(0,-1).join("/"),s=`${t}/${e}`;u.push(s)},j=(0,o.WU)((0,i.D)(b),"yyyy, MMMM do");return s.jsx("nav",{className:"bg-yellow-400 shadow-md rounded-full my-2 mx-auto w-[280px] max-w-lg",children:(0,s.jsxs)("ul",{className:"flex justify-between items-center py-1",children:[s.jsx("li",{children:s.jsx("button",{onClick:()=>v(y),className:"text-white font-medium px-2 py-1 rounded-full bg-yellow-400 hover:bg-yellow-500 text-xs",style:{fontSize:"0.625rem"},children:"Previous Day"})}),s.jsx("li",{children:s.jsx("span",{className:"text-white font-bold text-sm",children:j})}),g?s.jsx("div",{className:"w-[70px]",children:" "}):s.jsx("li",{children:s.jsx("button",{onClick:()=>v(p),className:"text-white font-medium px-2 py-1 rounded-full bg-yellow-400 hover:bg-yellow-500 text-xs",style:{fontSize:"0.625rem"},children:"Next Day"})})]})})}},49041:(e,t,r)=>{r.d(t,{Z:()=>c});var s=r(10326),a=r(17577),n=r(39530),l=r(74132),i=r(8981),o=r(31051);let c=({date:e})=>{let t=(0,n.TL)(),[r,c]=(0,a.useState)(null),d=(0,n.CG)(e=>e.load.meal_loading),u=(0,n.CG)(e=>e.load.exercise_loading);(0,a.useEffect)(()=>{(async()=>{try{let r=await (0,i.q)(e);"error"in r?(t((0,l.fz)({message:r.error,type:"error"})),setTimeout(()=>t((0,l.Qu)()),3e3)):"message"in r&&c(r.data)}catch(e){t((0,l.fz)({message:"An error occurred while fetching cals & nutrients",type:"error"})),setTimeout(()=>t((0,l.Qu)()),3e3)}})()},[e,t,d,u]);let m=(e,t)=>0===t?"0%":`${(e/t*100).toFixed(1)}%`,x=r||{sum_intake_cal:0,sum_intake_protein:0,sum_intake_fat:0,sum_intake_carbs:0,total_consume_cal:0},f=x.sum_intake_protein+x.sum_intake_fat+x.sum_intake_carbs;return f&&(x.sum_intake_protein,x.sum_intake_fat,x.sum_intake_carbs),(0,s.jsxs)("div",{className:"max-w-lg mx-auto mt-1 relative",children:[s.jsx(o.Z,{}),(0,s.jsxs)("div",{className:"max-w-lg mx-auto mt-1 relative p-4 bg-yellow-100 rounded-lg shadow-md text-xs w-full",children:[(0,s.jsxs)("div",{className:"flex max-md:flex-col justify-between",children:[(0,s.jsxs)("div",{className:"flex justify-between items-center border-b pb-2 max-md:col-span-2",children:[s.jsx("span",{className:"text-sm font-semibold",children:"Intake Calories"}),(0,s.jsxs)("span",{className:"text-base font-bold ml-4",children:[Math.round(x.sum_intake_cal)," kcal"]})]}),(0,s.jsxs)("div",{className:"flex justify-between items-center border-b pb-2 max-md:col-span-2",children:[s.jsx("span",{className:"text-sm font-semibold",children:"Burned Calories"}),(0,s.jsxs)("span",{className:"text-base font-bold ml-4",children:[Math.round(x.total_consume_cal)," kcal"]})]})]}),s.jsx("div",{className:" m-1 p-0",children:(0,s.jsxs)("div",{className:"flex justify-between items-center",children:[(0,s.jsxs)("div",{children:[s.jsx("span",{className:"text-gray-500 text-xs",children:"Protein: "}),(0,s.jsxs)("span",{className:"font-bold text-sm",children:[Math.round(x.sum_intake_protein)," g (",m(x.sum_intake_protein,f),")"]})]}),(0,s.jsxs)("div",{children:[s.jsx("span",{className:"text-gray-500 text-xs",children:"Fat: "}),(0,s.jsxs)("span",{className:"font-bold text-sm",children:[Math.round(x.sum_intake_fat)," g (",m(x.sum_intake_fat,f),")"]})]}),(0,s.jsxs)("div",{children:[s.jsx("span",{className:"text-gray-500 text-xs",children:"Carbs: "}),(0,s.jsxs)("span",{className:"font-bold text-sm",children:[Math.round(x.sum_intake_carbs)," g (",m(x.sum_intake_carbs,f),")"]})]})]})})]})]})}},12403:(e,t,r)=>{r.r(t),r.d(t,{$$ACTION_0:()=>o,createExerciseWithLatest:()=>i});var s=r(27745);r(26461);var a=r(53973),n=r(97228),l=r(85723);let i=(0,s.registerServerReference)("6fd628c01c86ae0814b5f19ff6e6c274c72b8273",o);async function o(e){let t=(0,a.cookies)(),r=t.get("token")?.value;return r?(await fetch(`${n.API_URL}/exercises/create-exercises-with-latest-exercise/`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Token ${r}`},body:JSON.stringify(e)})).json():{error:"Token not found"}}(0,l.ensureServerEntryExports)([i]),(0,s.registerServerReference)("f5687b3fcdd5f0ea1dd0920ddf06bbd9e6b8a92c",i)},36439:(e,t,r)=>{r.r(t),r.d(t,{$$ACTION_0:()=>o,deleteExercise:()=>i});var s=r(27745);r(26461);var a=r(53973),n=r(97228),l=r(85723);let i=(0,s.registerServerReference)("3dd8d10b3176c8c2392b83498a74749941158ff7",o);async function o(e){let t=(0,a.cookies)(),r=t.get("token")?.value;return r?(await fetch(`${n.API_URL}/exercises/delete-exercise/${e}/`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Token ${r}`}})).json():{error:"Token not found"}}(0,l.ensureServerEntryExports)([i]),(0,s.registerServerReference)("8013d8ddf5b012fce6c7c8149e1e3478c4a525fb",i)},51518:(e,t,r)=>{r.r(t),r.d(t,{$$ACTION_0:()=>o,fetchExercises:()=>i});var s=r(27745);r(26461);var a=r(53973),n=r(97228),l=r(85723);let i=(0,s.registerServerReference)("4830e0c49bbac743d67133287e5018f429b7a52e",o);async function o(e){let t=(0,a.cookies)(),r=t.get("token")?.value;return r?(await fetch(`${n.API_URL}/exercises/get-exercises/${e}/`,{method:"GET",headers:{"content-type":"application/json",Authorization:`Token ${r}`}})).json():{error:"Token not found"}}(0,l.ensureServerEntryExports)([i]),(0,s.registerServerReference)("7fff429c69b867e3800b043a2b917d4159e82b1e",i)},21553:(e,t,r)=>{r.r(t),r.d(t,{$$ACTION_0:()=>o,fetchLatestExercises:()=>i});var s=r(27745);r(26461);var a=r(53973),n=r(97228),l=r(85723);let i=(0,s.registerServerReference)("7e145bb97ebae76184d8265a9e323bd111d197f2",o);async function o(){let e=(0,a.cookies)(),t=e.get("token")?.value;return t?(await fetch(`${n.API_URL}/exercises/get-latest-exercise/`,{method:"GET",headers:{"content-type":"application/json",Authorization:`Token ${t}`}})).json():{error:"Token not found"}}(0,l.ensureServerEntryExports)([i]),(0,s.registerServerReference)("ddd0865cef06bac702cae7707b8bcb1587583512",i)}};