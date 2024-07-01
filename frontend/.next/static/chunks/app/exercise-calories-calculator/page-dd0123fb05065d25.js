(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3314],{6554:function(e,t,r){Promise.resolve().then(r.bind(r,9188)),Promise.resolve().then(r.bind(r,9272)),Promise.resolve().then(r.bind(r,2958))},8064:function(e,t,r){"use strict";Object.defineProperty(t,"$",{enumerable:!0,get:function(){return i}});let n=r(4590);function i(e){let{createServerReference:t}=r(6671);return t(e,n.callServer)}},2662:function(e,t,r){"use strict";var n=r(7437),i=r(2265),s=r(1942);t.Z=()=>{let[e,t]=(0,i.useState)(!1);return(0,n.jsxs)("div",{children:[(0,n.jsx)("button",{onClick:()=>{t(!0)},className:"text-blue-500 hover:text-blue-700 underline",children:"What is METs?"}),e&&(0,n.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50",children:(0,n.jsxs)("div",{className:"relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full",children:[(0,n.jsx)("button",{onClick:()=>{t(!1)},className:"absolute top-2 right-2 text-gray-500 hover:text-gray-700",children:(0,n.jsx)(s.aHS,{className:"text-xl"})}),(0,n.jsx)("h2",{className:"text-xl font-bold mb-4",children:"About METs"}),(0,n.jsx)("p",{className:"mb-4",children:"METs (Metabolic Equivalents) is a measure of the energy cost of physical activities."}),(0,n.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Calculation Formula:"}),(0,n.jsxs)("p",{className:"mb-4",children:["The formula to calculate burned calories  is:",(0,n.jsx)("br",{}),(0,n.jsx)("code",{className:"block bg-gray-100 p-2 rounded mt-2",children:"Burned Calories= MET value \xd7 weight (kg) \xd7 time (hours) \xd7 1.05"})]}),(0,n.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Example:"}),(0,n.jsxs)("p",{className:"mb-4",children:["If a person weighs 80 kg and runs at a MET value of 11 for 10 minutes:",(0,n.jsx)("br",{}),(0,n.jsx)("code",{className:"block bg-gray-100 p-2 rounded mt-2",children:"Burned Calories = 11 \xd7 80 kg \xd7 (10/60) hours \xd7 1.05 = 154(kcal)"})]})]})})]})}},9188:function(e,t,r){"use strict";r.d(t,{default:function(){return h}});var n=r(7437),i=r(2265);r(4590);var s=r(8064);(0,s.$)("342aa06a21a97e561d55aaedcb6b3ac8a9205816");var l=(0,s.$)("cc101c4f44c8ca786c397e3d7252dbdcdf5c24da"),a=r(4297),o=r(8354),c=r(5585),u=r(1942),d=r(6356),m=r(5027);let f=[{type:"Daily Living Activities",icon:d.ssk,label:"Daily Living"},{type:"Walking・Running",icon:u.BLk,label:"Walking・Running"},{type:"Cardio",icon:u.F9M,label:"Cardio"},{type:"Fitness",icon:d.AWU,label:"Fitness"},{type:"Ball Sports",icon:u.Qh7,label:"Ball Sports"},{type:"Martial Arts",icon:d.GAQ,label:"Martial Arts"},{type:"Water and Winter Sports",icon:u.rMl,label:"Water & Winter"},{type:"Other",icon:m.ol$,label:"Other"}];var h=()=>{let e=(0,a.TL)(),[t,r]=(0,i.useState)("");(0,i.useEffect)(()=>{let r=async()=>{try{let r=await l(t);if("error"in r){e((0,o.fz)({message:r.error,type:"error"})),setTimeout(()=>e((0,o.Qu)()),3e3);return}"message"in r&&(e((0,c.QK)()),e((0,c.c0)(r.data)))}catch(e){}};""!==t&&r()},[t]);let s=e=>{r(e)};return(0,n.jsx)("div",{children:(0,n.jsx)("div",{className:"flex flex-wrap gap-1",children:f.map(e=>(0,n.jsxs)("button",{onClick:()=>s(e.type),className:"hover:scale-105 flex flex-col items-center justify-center w-20 h-20 p-0 rounded-md ".concat(t===e.type?"bg-orange-500 text-white":"bg-yellow-200 text-gray-800"),children:[(0,n.jsx)(e.icon,{className:"text-2xl m-1"}),(0,n.jsx)("span",{className:"text-xs",children:e.label})]},e.type))})})}},9272:function(e,t,r){"use strict";var n=r(7437),i=r(2265),s=r(9381),l=r(4245),a=r(4297);t.default=()=>{let e=(0,a.CG)(e=>e.workout_exercise.used_workout),[t,r]=(0,i.useState)(null),o=(0,s.TA)({initialValues:{weight:"",weightUnit:"kg",duration:""},validationSchema:l.Ry({weight:l.Rx().required("Weight is required").positive("Weight must be a positive number"),duration:l.Rx().required("Duration is required").positive("Duration must be a positive number")}),onSubmit:t=>{if(!e){alert("Please select an activity");return}let n=parseFloat(t.weight);"lbs"===t.weightUnit&&(n*=.453592),r(1.05*n*parseFloat(t.duration)/60*e.mets)}});return(0,n.jsxs)("div",{className:"w-full mx-auto p-6 bg-white rounded-lg shadow-md",children:[e&&(0,n.jsxs)("div",{className:"mb-4",children:[(0,n.jsxs)("h2",{className:"text-xl font-semibold capitalize",children:["Selected Workout: ",e.name]}),(0,n.jsxs)("p",{children:["METS: ",e.mets]})]}),(0,n.jsxs)("form",{onSubmit:o.handleSubmit,children:[(0,n.jsxs)("div",{className:"mb-4",children:[(0,n.jsx)("label",{className:"block mb-2",children:"Weight"}),(0,n.jsxs)("div",{className:"flex",children:[(0,n.jsx)("input",{type:"text",name:"weight",value:o.values.weight,onChange:o.handleChange,onBlur:o.handleBlur,className:"border p-2 rounded-l w-full"}),(0,n.jsxs)("select",{name:"weightUnit",value:o.values.weightUnit,onChange:o.handleChange,className:"border p-2 rounded-r",children:[(0,n.jsx)("option",{value:"kg",children:"kg"}),(0,n.jsx)("option",{value:"lbs",children:"lbs"})]})]}),o.touched.weight&&o.errors.weight?(0,n.jsx)("div",{className:"text-red-500 text-sm mt-1",children:o.errors.weight}):null]}),(0,n.jsxs)("div",{className:"mb-4",children:[(0,n.jsx)("label",{className:"block mb-2",children:"Duration (minutes)"}),(0,n.jsx)("input",{type:"text",name:"duration",value:o.values.duration,onChange:o.handleChange,onBlur:o.handleBlur,className:"border p-2 rounded w-full"}),o.touched.duration&&o.errors.duration?(0,n.jsx)("div",{className:"text-red-500 text-sm mt-1",children:o.errors.duration}):null]}),(0,n.jsx)("button",{type:"submit",className:"bg-blue-500 text-white p-2 rounded",children:"Calculate Calories"})]}),null!==t&&(0,n.jsx)("div",{className:"mt-4",children:(0,n.jsxs)("h2",{className:"text-2xl font-semibold",children:["Predicted Calories Burned is",(0,n.jsx)("br",{}),t.toFixed(2)," (kcal)"]})})]})}},2958:function(e,t,r){"use strict";var n=r(7437);r(2265);var i=r(4297),s=r(5585),l=r(2662);t.default=()=>{let e=(0,i.TL)(),t=(0,i.CG)(e=>e.workout_exercise.select_workout_list),r=t=>{e((0,s.N8)(t))};return(0,n.jsx)("div",{className:"sm:mx-auto w-full",children:(0,n.jsxs)("div",{className:"bg-white border border-gray-300 rounded-md",children:[(0,n.jsxs)("div",{className:"bg-red-100 px-4 py-2 text-left text-xs font-medium text-gray-500 rounded-t-md flex",children:[(0,n.jsx)("span",{className:"mr-4",children:"Select Activity"}),(0,n.jsx)(l.Z,{})]}),(0,n.jsx)("div",{className:"flex flex-col h-56 overflow-y-auto",children:t&&t.length>0?(0,n.jsx)("table",{className:"min-w-full divide-y divide-gray-200",children:(0,n.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:t.map(e=>(0,n.jsx)("tr",{className:"hover:bg-gray-100 cursor-pointer",children:(0,n.jsxs)("td",{className:"px-4 py-2 text-sm text-gray-900 w-32 ",onClick:()=>r(e),children:[(0,n.jsx)("div",{className:"overflow-ellipsis overflow-hidden whitespace-nowrap capitalize",children:e.name}),(0,n.jsx)("div",{className:"flex items-center",children:(0,n.jsxs)("span",{className:"text-xs font-semibold",children:["(",e.mets,"METs)"]})})]})},e.id))})}):(0,n.jsx)("p",{className:"text-gray-500 p-4",children:"No activity yet"})})]})})}},2808:function(e,t,r){"use strict";var n=r(7437),i=r(1444),s=r(4297);t.default=e=>{let{children:t}=e;return(0,n.jsx)(i.zt,{store:s.w_,children:t})}},4297:function(e,t,r){"use strict";r.d(t,{w_:function(){return x},TL:function(){return g},CG:function(){return y}});var n=r(1444),i=r(9753),s=r(8440),l=r(8354),a=r(4459),o=r(4646),c=r(5585);let u=(0,i.oM)({name:"food_meal",initialState:{date:null},reducers:{setDate:(e,t)=>{e.date=t.payload},resetDate:e=>{e.date=null}}}),{setDate:d,resetDate:m}=u.actions;var f=u.reducer,h=r(2072),p=r(2035);r(2808);let x=(0,i.xC)({reducer:{toast:l.ZP,auth:s.ZP,food_meal:a.ZP,load:o.ZP,workout_exercise:c.ZP,date:f,latest_weight:h.ZP,license:p.ZP}}),g=n.I0,y=n.v9},8440:function(e,t,r){"use strict";r.d(t,{Li:function(){return s},QV:function(){return i}});let n=(0,r(9753).oM)({name:"auth",initialState:{account:null},reducers:{setAuth:(e,t)=>{e.account={id:t.payload.id,nickname:t.payload.nickname,username:t.payload.username}},resetAuth:e=>{e.account=null}}}),{setAuth:i,resetAuth:s}=n.actions;t.ZP=n.reducer},5585:function(e,t,r){"use strict";r.d(t,{AW:function(){return u},Gt:function(){return s},H3:function(){return f},N8:function(){return i},QK:function(){return d},c0:function(){return o},mE:function(){return a},nY:function(){return l},nw:function(){return m},zO:function(){return c}});let n=(0,r(9753).oM)({name:"workout_exercise",initialState:{used_workout:null,edit_exercise:null,select_workout_list:null,exercise_set_list:null,edit_exercise_pre:null},reducers:{setUsedWorkout:(e,t)=>{e.used_workout=t.payload},resetUsedWorkout:e=>{e.used_workout=null},setEditExercise:(e,t)=>{e.edit_exercise=t.payload},resetEditExercise:e=>{e.edit_exercise=null},setSelectWorkoutList:(e,t)=>{e.select_workout_list=t.payload},resetSelectWorkoutList:e=>{e.select_workout_list=null},setExerciseSetList:(e,t)=>{e.exercise_set_list=t.payload},resetExerciseSetList:e=>{e.exercise_set_list=null},setEditExercisePre:(e,t)=>{e.edit_exercise_pre=t.payload},resetEditExercisePre:e=>{e.edit_exercise_pre=null}}}),{setUsedWorkout:i,resetUsedWorkout:s,setEditExercise:l,resetEditExercise:a,setSelectWorkoutList:o,resetSelectWorkoutList:c,setExerciseSetList:u,resetExerciseSetList:d,setEditExercisePre:m,resetEditExercisePre:f}=n.actions;t.ZP=n.reducer},2072:function(e,t,r){"use strict";r.d(t,{HW:function(){return i}});let n=(0,r(9753).oM)({name:"latest_weight",initialState:{latest_weight:null},reducers:{setLatestWeight:(e,t)=>{e.latest_weight=t.payload},resetLatestweight:e=>{e.latest_weight=null}}}),{setLatestWeight:i,resetLatestweight:s}=n.actions;t.ZP=n.reducer},2035:function(e,t,r){"use strict";r.d(t,{BE:function(){return i}});let n=(0,r(9753).oM)({name:"license",initialState:{license:null},reducers:{setLicense:(e,t)=>{e.license=t.payload},resetLicense:e=>{e.license=null}}}),{setLicense:i,resetLicense:s}=n.actions;t.ZP=n.reducer},4646:function(e,t,r){"use strict";r.d(t,{Dv:function(){return f},OV:function(){return c},RO:function(){return m},Tr:function(){return i},ex:function(){return o},lc:function(){return u},ly:function(){return a},mH:function(){return d},wO:function(){return s},yP:function(){return l}});let n=(0,r(9753).oM)({name:"loading",initialState:{meal_loading:!1,often_food_loading:!1,history_food_loading:!1,custom_food_loading:!1,exercise_loading:!1,history_workout_loading:!1,custom_workout_loading:!1,often_workout_loading:!1,monster_loading:!1,set_loading:!1},reducers:{setMealLoading:(e,t)=>{e.meal_loading=t.payload},setOftenFoodLoading:(e,t)=>{e.often_food_loading=t.payload},setHistoryFoodLoading:(e,t)=>{e.history_food_loading=t.payload},setCustomFoodLoading:(e,t)=>{e.custom_food_loading=t.payload},setExerciseLoading:(e,t)=>{e.exercise_loading=t.payload},setHistoryWorkoutLoading:(e,t)=>{e.history_workout_loading=t.payload},setCustomWorkoutLoading:(e,t)=>{e.custom_workout_loading=t.payload},setOftenWorkoutLoading:(e,t)=>{e.often_workout_loading=t.payload},setMonsterLoading:(e,t)=>{e.monster_loading=t.payload},setSetLoading:(e,t)=>{e.set_loading=t.payload}}}),{setMealLoading:i,setOftenFoodLoading:s,setHistoryFoodLoading:l,setCustomFoodLoading:a,setExerciseLoading:o,setCustomWorkoutLoading:c,setHistoryWorkoutLoading:u,setOftenWorkoutLoading:d,setMonsterLoading:m,setSetLoading:f}=n.actions;t.ZP=n.reducer},4459:function(e,t,r){"use strict";r.d(t,{Fe:function(){return s},GA:function(){return l},Go:function(){return h},Jo:function(){return p},RR:function(){return u},Td:function(){return m},Xl:function(){return a},bI:function(){return f},km:function(){return o},wc:function(){return d},x9:function(){return i},zo:function(){return c}});let n=(0,r(9753).oM)({name:"food_meal",initialState:{used_food:null,edit_meal:null,used_fatsecret_food:null,select_food_list:null,meal_set_list:null,edit_meal_pre:null},reducers:{setUsedFood:(e,t)=>{e.used_food=t.payload},resetUsedFood:e=>{e.used_food=null},setEditMeal:(e,t)=>{e.edit_meal=t.payload},resetEditMeal:e=>{e.edit_meal=null},setUsedFatSecretFood:(e,t)=>{e.used_fatsecret_food=t.payload},resetUsedFatSecretFood:e=>{e.used_fatsecret_food=null},setSelectFoodList:(e,t)=>{e.select_food_list=t.payload},resetSelectFoodList:e=>{e.select_food_list=null},setMealSetList:(e,t)=>{e.meal_set_list=t.payload},resetMealSetList:e=>{e.meal_set_list=null},setEditMealPre:(e,t)=>{e.edit_meal_pre=t.payload},resetEditMealPre:e=>{e.edit_meal_pre=null}}}),{setUsedFood:i,resetUsedFood:s,setEditMeal:l,resetEditMeal:a,setUsedFatSecretFood:o,resetUsedFatSecretFood:c,setSelectFoodList:u,resetSelectFoodList:d,setMealSetList:m,resetMealSetList:f,setEditMealPre:h,resetEditMealPre:p}=n.actions;t.ZP=n.reducer},8354:function(e,t,r){"use strict";r.d(t,{Qu:function(){return a},fz:function(){return l}});var n=r(9753);let i={message:"",type:"info"},s=(0,n.oM)({name:"toast",initialState:i,reducers:{setToast:(e,t)=>{e.message=t.payload.message,e.type=t.payload.type},resetToast:e=>{e.message=i.message,e.type=i.type}}}),{setToast:l,resetToast:a}=s.actions;t.ZP=s.reducer},1810:function(e,t,r){"use strict";r.d(t,{w_:function(){return u}});var n=r(2265),i={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},s=n.createContext&&n.createContext(i),l=["attr","size","title"];function a(){return(a=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach(function(t){var n,i;n=t,i=r[t],(n=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=typeof n)return n;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(n))in e?Object.defineProperty(e,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[n]=i}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function u(e){return t=>n.createElement(d,a({attr:c({},e.attr)},t),function e(t){return t&&t.map((t,r)=>n.createElement(t.tag,c({key:r},t.attr),e(t.child)))}(e.child))}function d(e){var t=t=>{var r,{attr:i,size:s,title:o}=e,u=function(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r={};for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){if(t.indexOf(n)>=0)continue;r[n]=e[n]}return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}(e,l),d=s||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),n.createElement("svg",a({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,i,u,{className:r,style:c(c({color:e.color||t.color},t.style),e.style),height:d,width:d,xmlns:"http://www.w3.org/2000/svg"}),o&&n.createElement("title",null,o),e.children)};return void 0!==s?n.createElement(s.Consumer,null,e=>t(e)):t(i)}}},function(e){e.O(0,[7699,6051,5505,7123,4349,2971,7023,1744],function(){return e(e.s=6554)}),_N_E=e.O()}]);