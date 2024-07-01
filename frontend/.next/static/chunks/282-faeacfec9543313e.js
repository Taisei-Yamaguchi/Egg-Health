"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[282],{2360:function(e,t,r){r.d(t,{Z:function(){return d}});var s=r(7437),a=r(2265),o=r(4297),n=r(8354);r(4590);var i=(0,r(8064).$)("ed632e20977b91e6ea402bab649de27090a0ee47"),l=r(4459),d=()=>{let e=(0,o.TL)(),t=(0,o.CG)(e=>e.load.custom_food_loading),r=async()=>{try{let t=await i();if("error"in t){e((0,n.fz)({message:t.error,type:"error"})),setTimeout(()=>e((0,n.Qu)()),3e3);return}"message"in t&&(e((0,l.bI)()),e((0,l.RR)(t.data)))}catch(e){}};return(0,a.useEffect)(()=>{t&&r()},[t,e]),(0,s.jsxs)("button",{className:"w-[60px] h-[50px] cursor-pointer p-3 bg-gradient-to-b from-orange-300 to-orange-500 hover:from-orange-400 hover:to-orange-600 shadow-md rounded-lg flex flex-col items-center",onClick:r,children:[(0,s.jsx)("p",{className:"text-sm font-bold text-white shadow-text",children:"Custom"}),(0,s.jsx)("p",{className:"text-[10px] font-normal text-white shadow-text",children:" Foods"})]})}},4920:function(e,t,r){r.d(t,{Z:function(){return l}});var s=r(7437);r(2265);var a=r(4297),o=r(8354);r(4590);var n=(0,r(8064).$)("367dc209dd2fdf097b31f5b71e50ba108ae3f123"),i=r(4459),l=()=>{let e=(0,a.TL)(),t=async()=>{try{let t=await n();if("error"in t){e((0,o.fz)({message:t.error,type:"error"})),setTimeout(()=>e((0,o.Qu)()),3e3);return}"message"in t&&(e((0,i.bI)()),e((0,i.RR)(t.data)))}catch(e){}};return(0,s.jsxs)("button",{className:"w-[60px] h-[50px] cursor-pointer p-2 bg-gradient-to-b from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 shadow-md rounded-lg flex flex-col items-center",onClick:t,children:[(0,s.jsx)("p",{className:"text-[8px] font-normal text-white",children:"Choose from"}),(0,s.jsx)("p",{className:"text-xs font-bold text-white shadow-text",children:"History"})]})}},5622:function(e,t,r){r.d(t,{Z:function(){return d}});var s=r(7437);r(2265);var a=r(4297),o=r(8354);r(4590);var n=(0,r(8064).$)("3a5f0154e89d11624aa90c0eb5f71251b7c55474"),i=r(4459),l=r(6463),d=()=>{let e=(0,l.useRouter)(),t=(0,a.TL)(),r=(0,a.CG)(e=>e.license.license),d=async()=>{if(!r||"free"===r){e.push("/dashboard/premium");return}try{let e=await n();if("error"in e){t((0,o.fz)({message:e.error,type:"error"})),setTimeout(()=>t((0,o.Qu)()),3e3);return}"message"in e&&(t((0,i.bI)()),t((0,i.RR)(e.data)))}catch(e){}};return(0,s.jsxs)("div",{className:"relative inline-block",children:[(0,s.jsx)("button",{className:"w-[60px] h-[50px] cursor-pointer p-3 bg-gradient-to-b from-green-300 to-green-500 hover:from-green-400 hover:to-green-600 shadow-md rounded-lg flex flex-col items-center",onClick:d,children:(0,s.jsx)("p",{className:"text-sm font-bold shadow-text text-white self-center",children:"Often"})}),(0,s.jsx)("span",{className:"absolute top-[-10px] right-0 text-[8px] bg-gradient-to-b from-gray-200 to-gray-400 text-black px-1 py-0.5 rounded-full font-bold",children:"Premium"})]})}},2329:function(e,t,r){r.d(t,{Z:function(){return x}});var s=r(7437),a=r(2265),o=r(9381),n=r(4245);r(4590);var i=(0,r(8064).$)("19cb0e72dbbcbcf49c393ba7e48690d825ebad7c"),l=r(8354),d=r(4297),c=r(4459);let m=n.Ry().shape({searchKey:n.Z_().trim().required("Search key is required!")});var x=()=>{let e=(0,d.TL)(),[t,r]=(0,a.useState)(!1),n=(0,o.TA)({initialValues:{searchKey:""},validationSchema:m,onSubmit:async(t,r)=>{let{resetForm:s}=r;try{let r=await i(t.searchKey);if("error"in r){e((0,l.fz)({message:r.error,type:"error"})),setTimeout(()=>e((0,l.Qu)()),3e3);return}"message"in r&&(e((0,c.bI)()),e((0,c.RR)(r.data)))}catch(e){}finally{s()}}});return(0,s.jsxs)("div",{className:"flex items-center bg-green-300 p-1 rounded w-80",children:[(0,s.jsxs)("form",{onSubmit:n.handleSubmit,className:"flex items-center",children:[(0,s.jsx)("input",{type:"text",id:"searchKey",name:"searchKey",value:n.values.searchKey,onChange:n.handleChange,onBlur:n.handleBlur,placeholder:"Search Food",className:"px-2 py-1 text-gray-700 bg-white border rounded-l-md text-xs w-48 focus:outline-none"}),(0,s.jsx)("button",{type:"submit",className:"flex items-center justify-center px-2 py-1 text-white bg-slate-100 border border-l-0 rounded-r-md hover:bg-gray-200 text-xs",children:(0,s.jsxs)("span",{className:"flex items-center",children:[(0,s.jsx)("svg",{className:"w-3 h-3 mr-1 text-green-500",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"}),(0,s.jsx)("span",{className:"text-slate-500 ",children:"Search"})]})})]}),(0,s.jsxs)("div",{className:"ml-2 relative",children:[(0,s.jsx)("button",{onClick:()=>{r(!0)},className:"text-gray-700 text-xs hover:border-b border-color-black",children:"How ?"}),t&&(0,s.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50",children:(0,s.jsxs)("div",{className:"bg-white p-4 rounded shadow-lg max-w-lg mx-4 my-8 relative",children:[(0,s.jsx)("button",{onClick:()=>{r(!1)},className:"absolute top-4 right-4 bg-gray-300 text-gray-700 p-1 rounded-full text-xs",children:"✕"}),(0,s.jsx)("h2",{className:"text-lg font-bold mb-4",children:"How to Search"}),(0,s.jsxs)("ul",{className:"list-disc list-inside",children:[(0,s.jsx)("li",{children:"Search using alphabets."}),(0,s.jsx)("li",{children:'Examples: search using product names, food names, types such as "McDonald" or "mushroom".'})]})]})})]})]})}},3438:function(e,t,r){r.d(t,{Z:function(){return u}});var s=r(7437);r(2265);var a=r(4297),o=r(4459),n=r(4763),i=r(4379),l=r.n(i),d=r(6356);r(4590);var c=(0,r(8064).$)("82dde3b48fab94c911a9f98f3bb8c59a069ede72"),m=r(8354),x=r(4646),f=e=>{let{id:t}=e,r=(0,a.TL)();return(0,s.jsx)("div",{className:"flex items-center gap-x-2 p-2",children:(0,s.jsx)("button",{className:"hover:text-red-800 transition",onClick:()=>{l().fire({title:"Are you sure?",text:"This action will delete the food and all associated meals. Do you really want to proceed?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#d33",cancelButtonColor:"gray",confirmButtonText:"Yes, delete it!"}).then(async e=>{if(e.isConfirmed)try{r((0,x.Tr)(!0)),r((0,x.ly)(!0));let e=await c(t);"error"in e?r((0,m.fz)({message:e.error,type:"error"})):"detail"in e?r((0,m.fz)({message:e.detail,type:"error"})):"message"in e&&r((0,m.fz)({message:e.message,type:"success"}))}catch(e){r((0,m.fz)({message:"An error occurred while deleting the food.",type:"error"}))}finally{r((0,m.Qu)()),r((0,x.Tr)(!1)),r((0,x.ly)(!1))}})},children:(0,s.jsx)(d.I0,{size:15})})})},u=()=>{let e=(0,a.TL)(),t=(0,a.CG)(e=>e.food_meal.select_food_list),r=t=>{"food_id"in t?(e((0,o.km)(t)),e((0,o.Fe)())):(e((0,o.x9)(t)),e((0,o.zo)()))};return(0,s.jsx)(s.Fragment,{children:t&&(0,s.jsx)("div",{className:"lg:mx-auto lg:w-full lg:max-w-md",children:(0,s.jsxs)("div",{className:"bg-white border border-gray-300 rounded-md",children:[(0,s.jsx)("div",{className:"bg-green-100 px-4 py-2 text-left text-xs font-medium text-gray-500 rounded-t-md",children:"Select Menu"}),(0,s.jsx)("div",{className:"flex flex-col h-56 overflow-y-auto",children:t.length>0?(0,s.jsx)("table",{className:"min-w-full divide-y divide-gray-200",children:(0,s.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:t.map(e=>(0,s.jsxs)("tr",{className:"hover:bg-gray-100 cursor-pointer",children:[(0,s.jsxs)("td",{className:"px-2 py-2 text-sm text-gray-900 truncate max-w-xs flex items-center",title:e.name,onClick:()=>r(e),children:[(0,s.jsxs)("span",{className:"font-semibold",children:[e.name," "]}),"food_id"in e?(0,s.jsxs)("span",{children:[" ",e.brand_name&&(0,s.jsxs)(s.Fragment,{children:["(",e.brand_name,")"]})]}):(0,s.jsx)(f,{id:e.id})]}),(0,s.jsx)("td",{className:"px-2 py-2 whitespace-nowrap text-sm text-gray-900",children:"food_id"in e?(0,s.jsx)(n.Z,{fatsecret_food:e}):(0,s.jsx)(n.Z,{food:e})})]},e.id))})}):(0,s.jsx)("p",{className:"text-gray-500 p-4",children:"No food yet"})})]})})})}},4763:function(e,t,r){r.d(t,{Z:function(){return x}});var s=r(7437),a=r(2265),o=r(8354),n=r(4297);r(4590);var i=r(8064),l=(0,i.$)("c0abb00a59556c65ce05db222d997708cb5100e6"),d=(0,i.$)("16c0ed9660f48207bf5371167b9fd9573d2b5d52"),c=r(6356),m=r(4646),x=e=>{let t=(0,n.TL)(),[r,i]=(0,a.useState)(!1),x=(0,n.CG)(e=>e.license.license);(0,a.useEffect)(()=>{x&&"free"!==x&&(async()=>{let r=await d();if("error"in r){t((0,o.fz)({message:r.error,type:"error"})),setTimeout(()=>t((0,o.Qu)()),3e3);return}if("detail"in r){t((0,o.fz)({message:r.detail,type:"error"})),setTimeout(()=>t((0,o.Qu)()),3e3);return}"food"in e?i(r.data.some(t=>t.food===e.food.id)):i(r.data.some(t=>t.fatsecret_food===e.fatsecret_food.id))})()},[e,t,x]);let f=async()=>{try{let s;if(t((0,m.Tr)(!0)),t((0,m.wO)(!0)),s="food"in e?await l({food_id:e.food.id}):await l({fatsecret_food_id:e.fatsecret_food.id}),"error"in s){t((0,o.fz)({message:s.error,type:"error"})),setTimeout(()=>t((0,o.Qu)()),3e3);return}if("detail"in s){t((0,o.fz)({message:s.detail,type:"error"})),setTimeout(()=>t((0,o.Qu)()),3e3);return}"message"in s&&(t((0,o.fz)({message:s.message,type:"success"})),setTimeout(()=>t((0,o.Qu)()),3e3),i(!r))}catch(e){t((0,o.fz)({message:"An error occurred while toggling often food.",type:"error"})),setTimeout(()=>t((0,o.Qu)()),3e3)}finally{t((0,m.Tr)(!1)),t((0,m.wO)(!1))}};return(0,s.jsx)(s.Fragment,{children:x&&"free"!==x?(0,s.jsx)("div",{className:"flex items-center gap-x-2 p-2 ",children:(0,s.jsx)("button",{onClick:f,className:"hover:text-yellow-600 transition",children:r?(0,s.jsx)(c.y5A,{size:20}):(0,s.jsx)(c.hrt,{size:20})})}):(0,s.jsx)(s.Fragment,{children:"-"})})}}}]);