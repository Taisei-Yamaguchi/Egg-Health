(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9629],{9761:function(e,t,l){Promise.resolve().then(l.bind(l,59)),Promise.resolve().then(l.bind(l,8881)),Promise.resolve().then(l.bind(l,4210))},595:function(e,t,l){"use strict";l.d(t,{b:function(){return a}}),l(4590);var a=(0,l(8064).$)("15b8c45c3fd79559957768505bde1059ed210faf")},1408:function(e,t,l){"use strict";l.d(t,{g:function(){return a}}),l(4590);var a=(0,l(8064).$)("892cc758dd7498b095fd597cd94936f3e8e8c661")},4340:function(e,t,l){"use strict";l.d(t,{a:function(){return a}}),l(4590);var a=(0,l(8064).$)("78dfd0e5bd7df20d36ec3775fedb5c4459e4f642")},59:function(e,t,l){"use strict";var a=l(7437);l(2265);var s=l(6463),r=l(4839);t.default=()=>{let e=(0,s.usePathname)();return(0,a.jsx)("div",{className:"w-full flex justify-start rounded-md border-b-2 border-yellow-100",children:(0,a.jsx)("nav",{className:"w-full",children:(0,a.jsx)("ul",{className:"flex flex-wrap space-x-1 py-1 px-1 w-full pb-0",children:[{label:"Personal Details",href:"/dashboard/personal-details"},{label:"Goal Set",href:"/dashboard/goal"},{label:"Goal Confirm",href:"/dashboard/goal/confirm"}].map(t=>(0,a.jsx)("li",{className:"flex-none bg-yellow-100",children:(0,a.jsx)("a",{href:t.href,className:(0,r.Z)("block py-1 px-1 text-center text-gray-700 rounded-t-md","hover:bg-white hover:text-gray-900 border border-yellow-200 transition-all","text-xs md:text-sm lg:text-base",{"bg-white text-gray-900 font-bold":e===t.href}),style:{minWidth:"60px"},children:t.label})},t.label))})})})}},8881:function(e,t,l){"use strict";var a=l(7437),s=l(2265),r=l(6463),i=l(4839),n=l(9381),o=l(4245),d=l(4297),c=l(8354),u=l(595),m=l(1408),h=l(2072);let g=o.Ry().shape({weight:o.Rx().typeError("Weight must be a number").min(10,"Weight must be at least 10").max(400,"Weight must be at most 400").required()});t.default=()=>{var e;(0,r.useRouter)();let t=(0,d.TL)(),l=(0,d.CG)(e=>e.latest_weight.latest_weight),[o,x]=(0,s.useState)("lbs");(0,s.useEffect)(()=>{(async()=>{try{let e=await (0,m.g)();if("error"in e)t((0,c.fz)({message:e.error,type:"error"})),setTimeout(()=>t((0,c.Qu)()),3e3);else if("data"in e&&null!==e.data){let l=parseFloat(f(e.data,"lbs"));t((0,h.HW)(l))}}catch(e){t((0,c.fz)({message:"An error occurred while fetching current weight.",type:"error"})),setTimeout(()=>t((0,c.Qu)()),3e3)}})()},[]),(0,s.useEffect)(()=>{b.setFieldValue("weight",l)},[l]);let f=(e,t)=>"kg"===t?(e/2.20462).toFixed(1):(2.20462*e).toFixed(0),b=(0,n.TA)({initialValues:{weight:null},validationSchema:g,onSubmit:async e=>{try{let l=new Date().toISOString().split("T")[0],a="kg"===o?e.weight:e.weight?parseFloat(f(e.weight,"kg")):null,s=await (0,u.b)({...e,weight:a,date:l});"error"in s?(t((0,c.fz)({message:s.error,type:"error"})),setTimeout(()=>t((0,c.Qu)()),3e3)):"message"in s&&(t((0,c.fz)({message:s.message,type:"success"})),setTimeout(()=>{t((0,c.Qu)()),window.location.reload()},1e3))}catch(e){t((0,c.fz)({message:"An error occurred while saving Weight & Body Fat.",type:"error"})),setTimeout(()=>t((0,c.Qu)()),3e3)}finally{}}});return(0,a.jsxs)("div",{className:"max-w-lg mx-auto mt-4 p-6 bg-white rounded-lg shadow-md",children:[(0,a.jsxs)("button",{type:"button",onClick:()=>{if(null!==b.values.weight){let e=parseFloat(f(b.values.weight,"kg"===o?"lbs":"kg"));b.setFieldValue("weight",e)}x(e=>"kg"===e?"lbs":"kg")},className:"ml-2 p-1 border border-indigo-600 shadow-sm text-xs font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:["Show in ","kg"===o?"lbs":"kg"]}),(0,a.jsxs)("form",{onSubmit:b.handleSubmit,className:"flex items-center space-x-4",children:[(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("label",{htmlFor:"weight",className:"block text-lg font-medium text-gray-700 mr-4",children:"Weight"}),(0,a.jsx)("input",{type:"number",id:"weight",name:"weight",value:null!==(e=b.values.weight)&&void 0!==e?e:"",onChange:e=>{let t=e.target.value;b.setFieldValue("weight",""===t?null:parseFloat(t))},onBlur:b.handleBlur,className:(0,i.Z)("block w-28 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 pl-2",{"border-2 border-red-500 bg-red-100 text-red-800":b.touched.weight&&b.errors.weight}),autoComplete:"off"}),(0,a.jsx)("span",{className:"ml-2 text-lg font-medium text-gray-700",children:o})]}),(0,a.jsx)("button",{type:"submit",className:"py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Save"})]}),b.errors.weight&&b.touched.weight&&(0,a.jsx)("p",{className:"text-red-500 mt-2",children:b.errors.weight})]})}},4210:function(e,t,l){"use strict";l.d(t,{default:function(){return w}});var a=l(7437),s=l(2265),r=l(6463),i=l(4839),n=l(9381),o=l(4245),d=l(4297),c=l(8354),u=l(4340);l(4590);var m=(0,l(8064).$)("6ee0a030db72f394be962b19c514d8d1a5237067"),h=l(8466),g=l(9135),x=l(1942),f=e=>{let{isOpen:t,closeModal:l,activeLevel:r,setFieldValue:i,handleBlur:n}=e,o=[{value:"very low",label:"No Exercise",description:"Little to no exercise.",icon:(0,a.jsx)(x.BLk,{className:"w-6 h-6 mr-2 text-green-600"})},{value:"low",label:"Rare Exercise",description:"Light exercise or sports 1-3 days a week.",icon:(0,a.jsx)(x.EaM,{className:"w-6 h-6 mr-2 text-green-600"})},{value:"middle",label:"Moderate Exercise",description:"Moderate exercise or sports 3-5 days a week.",icon:(0,a.jsx)(x.ee,{className:"w-6 h-6 mr-2 text-green-600"})},{value:"high",label:"Frequent Exercise",description:"Hard exercise or sports 6-7 days a week.",icon:(0,a.jsx)(x.w4S,{className:"w-6 h-6 mr-2 text-green-600"})},{value:"very high",label:"Daily Exercise",description:"Very hard exercise or physical job.",icon:(0,a.jsx)(x.rcG,{className:"w-6 h-6 mr-2 text-green-600"})}],d=e=>{i("active_level",e),n({target:{name:"active_level"}})};return(0,a.jsx)(h.u,{appear:!0,show:t,as:s.Fragment,children:(0,a.jsx)(g.Vq,{as:"div",className:"fixed inset-0 z-50 overflow-y-auto",onClose:l,children:(0,a.jsxs)("div",{className:"min-h-screen px-4 text-center",children:[(0,a.jsx)(h.u.Child,{as:s.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,a.jsx)("div",{className:"fixed inset-0 bg-black opacity-30"})}),(0,a.jsx)("span",{className:"inline-block h-screen align-middle","aria-hidden":"true",children:"​"}),(0,a.jsx)(h.u.Child,{as:s.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:(0,a.jsxs)("div",{className:"inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl",children:[(0,a.jsxs)("div",{className:"flex justify-between items-center",children:[(0,a.jsx)(g.Vq.Title,{as:"h3",className:"text-lg font-medium leading-6 text-gray-900",children:"Select Activity Level"}),(0,a.jsxs)("button",{type:"button",className:"text-gray-400 hover:text-gray-500",onClick:l,children:[(0,a.jsx)("span",{className:"sr-only",children:"Close"}),"✕"]})]}),(0,a.jsx)("div",{className:"mt-2 text-sm text-gray-500",children:"This activity level will be used to calculate your daily calorie goals when setting weight targets. It is also used to estimate 'other calories' since it is difficult to fully track all calorie consumption. Additionally, it is utilized in various calculations based on your body information. Please select the one that best describes you from the options below."}),(0,a.jsx)("div",{className:"mt-4 space-y-4",children:o.map(e=>(0,a.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,a.jsx)("input",{type:"radio",id:e.value,name:"active_level",value:e.value,checked:r===e.value,onChange:()=>d(e.value),className:"form-radio"}),(0,a.jsxs)("label",{htmlFor:e.value,className:"flex items-center space-x-2",children:[e.icon,(0,a.jsx)("span",{className:"font-medium",children:e.label}),(0,a.jsx)("span",{className:"text-sm text-gray-500",children:e.description})]})]},e.value))})]})})]})})})},b=()=>{let[e,t]=(0,s.useState)(!1),l=()=>t(!0),r=()=>t(!1);return e?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("button",{type:"button",onClick:l,className:"text-gray-700 text-xs hover:border-b border-color-black ml-4",children:"What is BMR?"}),(0,a.jsxs)("div",{className:"fixed inset-0 flex items-center justify-center z-50",children:[(0,a.jsx)("div",{className:"fixed inset-0 bg-black opacity-50",onClick:r}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow-lg p-6 z-10 relative w-3/4",children:[(0,a.jsx)("h1",{className:"text-xl font-bold m-4",children:"What is BMR?"}),(0,a.jsx)("button",{onClick:r,className:"absolute top-2 right-2 text-gray-500",children:(0,a.jsx)(x.aHS,{className:"text-xl"})}),(0,a.jsxs)("div",{className:"text-xs text-gray-500",children:[(0,a.jsx)("p",{children:"BMR (Basal Metabolic Rate) is the amount of energy expended while at rest in a neutrally temperate environment, in the post-absorptive state (meaning that the digestive system is inactive, which requires about 12 hours of fasting in humans)."}),(0,a.jsx)("p",{children:"In this app, BMR is calculated based on your weight, height, sex, and birthday. You can also manually input your BMR if you know it."}),(0,a.jsx)("p",{children:"Since it is difficult to completely track all calories burned, this app estimates other calories based on BMR and active level, and adds them to your daily consumed calories. This app represents the basal metabolic rate as BMR."})]})]})]})]}):(0,a.jsx)("button",{type:"button",onClick:l,className:"text-gray-700 text-xs hover:border-b border-color-black ml-4",children:"What is BMR?"})};let y=new Date,p=new Date(y.getFullYear()-5,y.getMonth(),y.getDate()),v=o.Ry({tall:o.Rx().min(.5,"Height must be at least 0.5 m or 1.6 ft").max(7.8,"Height must be at most 2.4 m or 7.8 ft").required("Height is required"),birthday:o.hT().max(p,"Birthday must be at least 5 years ago").required("Birthday is required"),sex:o.nK().oneOf(["male","female"],"Invalid sex").required("Gender is required"),bmr:o.Rx().nullable().min(10,"BMR must be at least 10").max(6e3,"BMR must be at most 6000"),active_level:o.nK().oneOf(["very low","low","middle","high","very high"],"Invalid activity level").required("Activity level is required")});var w=()=>{var e,t,l;let o=(0,r.useRouter)(),h=(0,d.TL)(),[g,x]=(0,s.useState)(null),[y,p]=(0,s.useState)(!1),[w,_]=(0,s.useState)(!1),[j,N]=(0,s.useState)(!1),k=(0,d.CG)(e=>e.latest_weight.latest_weight),[F,S]=(0,s.useState)(!1),[M,E]=(0,s.useState)("ft"),C=(e,t)=>"m"===t?(e/100).toFixed(2):(e/30.48).toFixed(2),L=async()=>{try{let e=await (0,u.a)();"error"in e?(h((0,c.fz)({message:e.error,type:"error"})),setTimeout(()=>h((0,c.Qu)()),3e3)):"message"in e&&(x(e.data),null!==e.data&&e.data.bmr&&p(!0))}catch(e){h((0,c.fz)({message:"An error occurred while fetching data.",type:"error"})),setTimeout(()=>h((0,c.Qu)()),3e3)}};(0,s.useEffect)(()=>{L()},[F]),(0,s.useEffect)(()=>{if(g){var e,t,l;B.setFieldValue("tall",g.tall?parseFloat(C(g.tall,M)):null),B.setFieldValue("birthday",null!==(e=g.birthday)&&void 0!==e?e:null),B.setFieldValue("sex",null!==(t=g.sex)&&void 0!==t?t:"female"),B.setFieldValue("bmr",null!==g.bmr?Math.round(g.bmr):null),B.setFieldValue("active_level",null!==(l=g.active_level)&&void 0!==l?l:"low")}},[g,M]);let B=(0,n.TA)({initialValues:{tall:null,birthday:null,sex:null,bmr:null,active_level:"very low"},validationSchema:v,onSubmit:async e=>{try{S(!0);let t=await m({...e,tall:"m"===M?e.tall?100*e.tall:null:e.tall?30.48*e.tall:null});"error"in t?(h((0,c.fz)({message:t.error,type:"error"})),setTimeout(()=>h((0,c.Qu)()),3e3)):"message"in t&&(h((0,c.fz)({message:t.message,type:"success"})),setTimeout(()=>h((0,c.Qu)()),1e3),o.push("/dashboard/goal"))}catch(e){h((0,c.fz)({message:"An error occurred while saving data.",type:"error"})),setTimeout(()=>h((0,c.Qu)()),3e3)}finally{S(!1)}}});return(0,a.jsxs)("div",{className:"max-w-lg mx-auto mt-4 p-6 bg-white rounded-lg shadow-md",children:[k?(0,a.jsxs)("form",{onSubmit:B.handleSubmit,className:"space-y-4",children:[(0,a.jsxs)("button",{type:"button",onClick:()=>{if(null!==B.values.tall){let e=parseFloat(C(B.values.tall,"m"===M?"ft":"m"));B.setFieldValue("tall",e)}E(e=>"m"===e?"ft":"m")},className:"ml-2 p-1 border border-indigo-600 shadow-sm text-xs font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:["Show in ","m"===M?"ft":"m"]}),(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("label",{htmlFor:"tall",className:"block text-lg font-medium text-gray-700 mr-4",children:"Height"}),(0,a.jsx)("input",{type:"number",id:"tall",name:"tall",value:null!==(e=B.values.tall)&&void 0!==e?e:"",onChange:e=>{let t=e.target.value;B.setFieldValue("tall",""===t?null:parseFloat(t))},onBlur:B.handleBlur,className:(0,i.Z)("block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 pl-2",{"border-2 border-red-500 bg-red-100 text-red-800":B.touched.tall&&B.errors.tall}),autoComplete:"off"}),(0,a.jsx)("span",{className:"ml-2 text-sm font-medium text-gray-700",children:M}),B.errors.tall&&B.touched.tall&&(0,a.jsx)("p",{className:"text-red-500 ml-1",children:B.errors.tall})]}),(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("label",{htmlFor:"birthday",className:"block text-lg font-medium text-gray-700 mr-4",children:"Birthday"}),(0,a.jsx)("input",{type:"date",id:"birthday",name:"birthday",value:null!==(t=B.values.birthday)&&void 0!==t?t:"",onChange:e=>{let t=e.target.value;B.setFieldValue("birthday",""===t?null:t)},onBlur:B.handleBlur,className:(0,i.Z)("block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 pl-2",{"border-2 border-red-500 bg-red-100 text-red-800":B.touched.birthday&&B.errors.birthday}),autoComplete:"off"}),B.errors.birthday&&B.touched.birthday&&(0,a.jsx)("p",{className:"text-red-500 ml-1",children:B.errors.birthday})]}),(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("label",{className:"block text-lg font-medium text-gray-700 mr-4",children:"Gender"}),(0,a.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,a.jsxs)("label",{className:"inline-flex items-center",children:[(0,a.jsx)("input",{type:"radio",name:"sex",value:"male",checked:"male"===B.values.sex,onChange:B.handleChange,className:"form-radio"}),(0,a.jsx)("span",{className:"ml-2",children:"Male"})]}),(0,a.jsxs)("label",{className:"inline-flex items-center",children:[(0,a.jsx)("input",{type:"radio",name:"sex",value:"female",checked:"female"===B.values.sex,onChange:B.handleChange,className:"form-radio"}),(0,a.jsx)("span",{className:"ml-2",children:"Female"})]})]}),B.errors.sex&&B.touched.sex&&(0,a.jsx)("p",{className:"text-red-500 ml-1",children:B.errors.sex})]}),(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("label",{htmlFor:"active_level",className:"block text-lg font-medium text-gray-700 mr-4",children:"Activity Level"}),(0,a.jsx)("span",{className:"mr-4 text-lg font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded",children:(e=>{switch(e){case"very low":return"No Exercise";case"low":return"Rare Exercise";case"middle":return"Moderate Exercise";case"high":return"Frequent Exercise";case"very high":return"Daily Exercise";default:return"Unknown"}})(B.values.active_level)}),(0,a.jsx)("button",{type:"button",onClick:()=>_(!0),className:"px-2 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-300",children:"Change"}),B.errors.active_level&&B.touched.active_level&&(0,a.jsx)("p",{className:"text-red-500 ml-1",children:B.errors.active_level})]}),y&&(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("label",{htmlFor:"bmr",className:"block text-lg font-medium text-gray-700 mr-4",children:"BMR"}),(0,a.jsx)("input",{type:"number",id:"bmr",name:"bmr",value:null!==(l=B.values.bmr)&&void 0!==l?l:"",onChange:e=>{let t=e.target.value;B.setFieldValue("bmr",""===t?null:parseFloat(t))},onBlur:B.handleBlur,className:(0,i.Z)("block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 pl-2",{"border-2 border-red-500 bg-red-100 text-red-800":B.touched.bmr&&B.errors.bmr}),autoComplete:"off"}),(0,a.jsx)("span",{className:"ml-2 text-lg font-medium text-gray-700",children:"kcal"}),B.errors.bmr&&B.touched.bmr&&(0,a.jsx)("p",{className:"text-red-500 ml-1",children:B.errors.bmr})]}),(0,a.jsx)("p",{className:"text-xs text-gray-500 mt-1",children:"If you leave the BMR form empty and save, your BMR will be automatically estimated based on your body information."}),!y&&(0,a.jsx)("div",{children:(0,a.jsx)("button",{type:"button",onClick:()=>p(!0),className:"text-blue-500 underline",children:"Enter BMR manually"})}),(0,a.jsxs)("div",{className:"mt-4",children:[(0,a.jsx)("button",{type:"submit",className:"py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Save"}),(0,a.jsx)(b,{})]})]}):(0,a.jsx)("div",{children:"Please register weight first!"}),(0,a.jsx)(f,{isOpen:w,closeModal:()=>_(!1),activeLevel:B.values.active_level,setFieldValue:B.setFieldValue,handleBlur:B.handleBlur})]})}},2808:function(e,t,l){"use strict";var a=l(7437),s=l(1444),r=l(4297);t.default=e=>{let{children:t}=e;return(0,a.jsx)(s.zt,{store:r.w_,children:t})}},4297:function(e,t,l){"use strict";l.d(t,{w_:function(){return f},TL:function(){return b},CG:function(){return y}});var a=l(1444),s=l(9753),r=l(8440),i=l(8354),n=l(4459),o=l(4646),d=l(5585);let c=(0,s.oM)({name:"food_meal",initialState:{date:null},reducers:{setDate:(e,t)=>{e.date=t.payload},resetDate:e=>{e.date=null}}}),{setDate:u,resetDate:m}=c.actions;var h=c.reducer,g=l(2072),x=l(2035);l(2808);let f=(0,s.xC)({reducer:{toast:i.ZP,auth:r.ZP,food_meal:n.ZP,load:o.ZP,workout_exercise:d.ZP,date:h,latest_weight:g.ZP,license:x.ZP}}),b=a.I0,y=a.v9},8440:function(e,t,l){"use strict";l.d(t,{Li:function(){return r},QV:function(){return s}});let a=(0,l(9753).oM)({name:"auth",initialState:{account:null},reducers:{setAuth:(e,t)=>{e.account={id:t.payload.id,nickname:t.payload.nickname,username:t.payload.username}},resetAuth:e=>{e.account=null}}}),{setAuth:s,resetAuth:r}=a.actions;t.ZP=a.reducer},5585:function(e,t,l){"use strict";l.d(t,{Gt:function(){return r},N8:function(){return s},QK:function(){return u},c0:function(){return o},mE:function(){return n},nY:function(){return i}});let a=(0,l(9753).oM)({name:"workout_exercise",initialState:{used_workout:null,edit_exercise:null,select_workout_list:null,exercise_set_list:null,edit_exercise_pre:null},reducers:{setUsedWorkout:(e,t)=>{e.used_workout=t.payload},resetUsedWorkout:e=>{e.used_workout=null},setEditExercise:(e,t)=>{e.edit_exercise=t.payload},resetEditExercise:e=>{e.edit_exercise=null},setSelectWorkoutList:(e,t)=>{e.select_workout_list=t.payload},resetSelectWorkoutList:e=>{e.select_workout_list=null},setExerciseSetList:(e,t)=>{e.exercise_set_list=t.payload},resetExerciseSetList:e=>{e.exercise_set_list=null},setEditExercisePre:(e,t)=>{e.edit_exercise_pre=t.payload},resetEditExercisePre:e=>{e.edit_exercise_pre=null}}}),{setUsedWorkout:s,resetUsedWorkout:r,setEditExercise:i,resetEditExercise:n,setSelectWorkoutList:o,resetSelectWorkoutList:d,setExerciseSetList:c,resetExerciseSetList:u,setEditExercisePre:m,resetEditExercisePre:h}=a.actions;t.ZP=a.reducer},2072:function(e,t,l){"use strict";l.d(t,{HW:function(){return s}});let a=(0,l(9753).oM)({name:"latest_weight",initialState:{latest_weight:null},reducers:{setLatestWeight:(e,t)=>{e.latest_weight=t.payload},resetLatestweight:e=>{e.latest_weight=null}}}),{setLatestWeight:s,resetLatestweight:r}=a.actions;t.ZP=a.reducer},2035:function(e,t,l){"use strict";l.d(t,{BE:function(){return s}});let a=(0,l(9753).oM)({name:"license",initialState:{license:null},reducers:{setLicense:(e,t)=>{e.license=t.payload},resetLicense:e=>{e.license=null}}}),{setLicense:s,resetLicense:r}=a.actions;t.ZP=a.reducer},4646:function(e,t,l){"use strict";l.d(t,{Dv:function(){return h},OV:function(){return d},RO:function(){return m},Tr:function(){return s},ex:function(){return o},lc:function(){return c},ly:function(){return n},yP:function(){return i}});let a=(0,l(9753).oM)({name:"loading",initialState:{meal_loading:!1,often_food_loading:!1,history_food_loading:!1,custom_food_loading:!1,exercise_loading:!1,history_workout_loading:!1,custom_workout_loading:!1,often_workout_loading:!1,monster_loading:!1,set_loading:!1},reducers:{setMealLoading:(e,t)=>{e.meal_loading=t.payload},setOftenFoodLoading:(e,t)=>{e.often_food_loading=t.payload},setHistoryFoodLoading:(e,t)=>{e.history_food_loading=t.payload},setCustomFoodLoading:(e,t)=>{e.custom_food_loading=t.payload},setExerciseLoading:(e,t)=>{e.exercise_loading=t.payload},setHistoryWorkoutLoading:(e,t)=>{e.history_workout_loading=t.payload},setCustomWorkoutLoading:(e,t)=>{e.custom_workout_loading=t.payload},setOftenWorkoutLoading:(e,t)=>{e.often_workout_loading=t.payload},setMonsterLoading:(e,t)=>{e.monster_loading=t.payload},setSetLoading:(e,t)=>{e.set_loading=t.payload}}}),{setMealLoading:s,setOftenFoodLoading:r,setHistoryFoodLoading:i,setCustomFoodLoading:n,setExerciseLoading:o,setCustomWorkoutLoading:d,setHistoryWorkoutLoading:c,setOftenWorkoutLoading:u,setMonsterLoading:m,setSetLoading:h}=a.actions;t.ZP=a.reducer},4459:function(e,t,l){"use strict";l.d(t,{Fe:function(){return r},GA:function(){return i},RR:function(){return c},Xl:function(){return n},bI:function(){return h},km:function(){return o},x9:function(){return s},zo:function(){return d}});let a=(0,l(9753).oM)({name:"food_meal",initialState:{used_food:null,edit_meal:null,used_fatsecret_food:null,select_food_list:null,meal_set_list:null,edit_meal_pre:null},reducers:{setUsedFood:(e,t)=>{e.used_food=t.payload},resetUsedFood:e=>{e.used_food=null},setEditMeal:(e,t)=>{e.edit_meal=t.payload},resetEditMeal:e=>{e.edit_meal=null},setUsedFatSecretFood:(e,t)=>{e.used_fatsecret_food=t.payload},resetUsedFatSecretFood:e=>{e.used_fatsecret_food=null},setSelectFoodList:(e,t)=>{e.select_food_list=t.payload},resetSelectFoodList:e=>{e.select_food_list=null},setMealSetList:(e,t)=>{e.meal_set_list=t.payload},resetMealSetList:e=>{e.meal_set_list=null},setEditMealPre:(e,t)=>{e.edit_meal_pre=t.payload},resetEditMealPre:e=>{e.edit_meal_pre=null}}}),{setUsedFood:s,resetUsedFood:r,setEditMeal:i,resetEditMeal:n,setUsedFatSecretFood:o,resetUsedFatSecretFood:d,setSelectFoodList:c,resetSelectFoodList:u,setMealSetList:m,resetMealSetList:h,setEditMealPre:g,resetEditMealPre:x}=a.actions;t.ZP=a.reducer},8354:function(e,t,l){"use strict";l.d(t,{Qu:function(){return n},fz:function(){return i}});var a=l(9753);let s={message:"",type:"info"},r=(0,a.oM)({name:"toast",initialState:s,reducers:{setToast:(e,t)=>{e.message=t.payload.message,e.type=t.payload.type},resetToast:e=>{e.message=s.message,e.type=s.type}}}),{setToast:i,resetToast:n}=r.actions;t.ZP=r.reducer}},function(e){e.O(0,[7699,7123,4349,9805,2971,7023,1744],function(){return e(e.s=9761)}),_N_E=e.O()}]);