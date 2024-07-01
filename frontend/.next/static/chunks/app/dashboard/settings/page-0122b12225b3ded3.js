(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3455],{6679:function(e,t,s){Promise.resolve().then(s.bind(s,7455))},4818:function(e,t,s){"use strict";s.d(t,{g:function(){return r}}),s(4590);var r=(0,s(8064).$)("daa22de9bf9c0c80b16f4086db22822116b64052")},7455:function(e,t,s){"use strict";s.d(t,{default:function(){return k}});var r=s(7437),n=s(2265),a=s(4297),i=s(8354);s(4590);var o=s(8064),l=(0,o.$)("c9fde3ec68f4a81eecae4315446ee002b122a688"),c=s(9381),d=s(4245),u=(0,o.$)("bbd69a1fd1c52af0630ca2ae44f76e0f3ed9ada7"),m=s(3375),f=e=>{let{nickname:t}=e,s=(0,a.TL)(),n=(0,c.TA)({initialValues:{nickname:t},validationSchema:d.Ry({nickname:d.Z_().min(2,"Must be at least 2 characters").max(20,"Must be 20 characters or less").required("Required")}),onSubmit:async(e,t)=>{let{setSubmitting:r}=t;try{let t=await u({nickname:e.nickname});"error"in t?s((0,i.fz)({message:t.error,type:"error"})):"detail"in t?s((0,i.fz)({message:t.detail,type:"error"})):"message"in t&&s((0,i.fz)({message:t.message,type:"success"})),"data"in t&&(0,m.setCookie)("nickname",t.data.nickname),setTimeout(()=>s((0,i.Qu)()),3e3)}catch(e){s((0,i.fz)({message:"An error occurred while updating the nickname.",type:"error"})),setTimeout(()=>s((0,i.Qu)()),3e3)}finally{r(!1)}}});return(0,r.jsxs)("form",{onSubmit:n.handleSubmit,className:"flex",children:[(0,r.jsxs)("div",{className:"w-1/2 mr-1",children:[(0,r.jsx)("label",{htmlFor:"nickname",className:"block text-sm font-medium text-gray-700",children:"Nickname"}),(0,r.jsx)("input",{id:"nickname",name:"nickname",type:"text",onChange:n.handleChange,onBlur:n.handleBlur,value:n.values.nickname,className:"mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg"}),n.touched.nickname&&n.errors.nickname?(0,r.jsx)("div",{className:"text-red-500 text-sm",children:n.errors.nickname}):null]}),(0,r.jsx)("div",{className:"mt-6",children:(0,r.jsx)("button",{type:"submit",className:"w-[100px] inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",disabled:n.isSubmitting,children:"save"})})]})},g=s(1942),x=s(4839),h=()=>{let e=(0,a.TL)(),[t,s]=(0,n.useState)(!1),[o,l]=(0,n.useState)(!1),m=(0,c.TA)({initialValues:{password:"",passwordConfirmation:""},validationSchema:d.Ry({password:d.Z_().min(8,"Password must be at least 8 characters").max(100,"Password must be maximum 100 characters").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,"Password must contain minimum 5 characters, 1 uppercase letter, 1 lowercase letter, 1 numeric digit.").required("Password is required !"),passwordConfirmation:d.Z_().min(8,"Password must be at least 8 characters").max(100,"Password must be maximum 100 characters").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,"Password must contain minimum 5 characters, 1 uppercase letter, 1 lowercase letter, 1 numeric digit.").required("Password is required !").oneOf([d.iH("password"),""],"Passwords must match !")}),onSubmit:async t=>{let s=await u({password:t.password});"error"in s?e((0,i.fz)({message:s.error,type:"error"})):"detail"in s?e((0,i.fz)({message:s.detail,type:"error"})):"message"in s&&e((0,i.fz)({message:s.message,type:"success"})),m.resetForm(),setTimeout(()=>e((0,i.Qu)()),4e3)}});return(0,r.jsxs)("form",{className:"w-full mb-10",onSubmit:m.handleSubmit,children:[(0,r.jsxs)("section",{className:"grid grid-cols-1 lg:grid-cols-2 w-full gap-x-10",children:[(0,r.jsxs)("section",{className:"mb-5",children:[(0,r.jsx)("label",{htmlFor:"password",className:"block text-sm font-medium leading-6 text-gray-900 mb-4",children:"New Password"}),(0,r.jsxs)("section",{className:"flex items-center gap-3 relative",children:[(0,r.jsx)("input",{id:"password",name:"password",type:t?"text":"password",value:m.values.password,onChange:m.handleChange,onBlur:m.handleBlur,className:(0,x.Z)("block w-full h-10 rounded-md px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",{"border-2 border-red-500":m.touched.password&&m.errors.password})}),(0,r.jsx)("div",{className:(0,x.Z)("text-gray-300 absolute right-2 cursor-pointer",{"text-blue-800":t}),children:t?(0,r.jsx)(g.dSq,{size:25,onClick:()=>s(e=>!e)}):(0,r.jsx)(g.tgn,{size:25,onClick:()=>s(e=>!e)})})]}),m.errors.password&&m.touched.password&&(0,r.jsx)("p",{className:"text-red-500 ml-1 my-3",children:m.errors.password})]}),(0,r.jsxs)("section",{className:"mb-10 md:mb-5",children:[(0,r.jsx)("label",{htmlFor:"passwordConfirmation",className:"block text-sm font-medium leading-6 text-gray-900 mb-4",children:"Confirm Password"}),(0,r.jsxs)("section",{className:"flex items-center gap-3 relative",children:[(0,r.jsx)("input",{id:"passwordConfirmation",name:"passwordConfirmation",type:o?"text":"password",value:m.values.passwordConfirmation,onChange:m.handleChange,onBlur:m.handleBlur,className:(0,x.Z)("block w-full h-10 rounded-md px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",{"border-2 border-red-500":m.touched.passwordConfirmation&&m.errors.passwordConfirmation})}),(0,r.jsx)("div",{className:(0,x.Z)("text-gray-300 absolute right-2 cursor-pointer",{"text-blue-800":o}),children:o?(0,r.jsx)(g.dSq,{size:25,onClick:()=>l(e=>!e)}):(0,r.jsx)(g.tgn,{size:25,onClick:()=>l(e=>!e)})})]}),m.errors.passwordConfirmation&&m.touched.passwordConfirmation&&(0,r.jsx)("p",{className:"text-red-500 ml-1 my-3",children:m.errors.passwordConfirmation})]})]}),(0,r.jsx)("section",{className:"w-full flex justify-start md:justify-end",children:(0,r.jsx)("button",{type:"submit",className:"flex w-[200px] h-14 md:h-auto justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-lg md:text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",children:"change password"})})]})},p=s(4379),b=s.n(p),w=s(6463),y=s(8440),_=()=>{let e=(0,a.TL)(),t=(0,w.useRouter)();return(0,r.jsx)("div",{className:"w-full",children:(0,r.jsx)("button",{onClick:()=>{b().fire({title:"Are you sure?",text:"You won't possibly be able to revert this! If you want to reuse this account, you need to contact us.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#d33",cancelButtonColor:"gray",confirmButtonText:"Yes, deactivate it!"}).then(async s=>{if(s.isConfirmed)try{let s=await fetch("/api/deactivate",{method:"POST",headers:{"Content-Type":"application/json"}});if(s.ok)e((0,y.Li)()),t.push("/");else{let e=await s.json();b().fire("Error",e.error||e.detail||"Failed to deactivate account","error")}}catch(e){console.error("Error deactivating account:",e),b().fire("Error","Failed to deactivate account","error")}})},className:"flex w-full md:w-[50%] h-14 lg:h-auto justify-center items-center rounded-md bg-red-600 px-3 py-1.5 text-lg lg:text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600",children:"deactivate"})})},j=s(4818),k=()=>{let e=(0,a.TL)(),[t,s]=(0,n.useState)(null),[o,c]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{try{let t=await (0,j.g)();if("error"in t){e((0,i.fz)({message:t.error,type:"error"})),setTimeout(()=>e((0,i.Qu)()),3e3);return}"message"in t&&c(t.data)}catch(e){}})()},[e]),(0,n.useEffect)(()=>{(async()=>{try{let t=await l();if("error"in t){e((0,i.fz)({message:t.error,type:"error"})),setTimeout(()=>e((0,i.Qu)()),3e3);return}"message"in t&&s(t.data)}catch(e){}})()},[e]),(0,r.jsx)("section",{className:"relative",children:(0,r.jsxs)("section",{className:"w-[95%] md:w-[80%] mx-auto py-10",children:[(0,r.jsx)("h1",{className:"text-3xl text-slate-700 font-semibold tracking-tight mb-10",children:"Account Profile"}),(0,r.jsx)("h2",{className:"text-2xl text-slate-700 font-semibold tracking-tight mb-5",children:"Account Details"}),(0,r.jsx)("hr",{className:"border-b-1 w-full mb-10"}),(0,r.jsxs)("section",{className:"mb-5",children:[(0,r.jsx)("label",{htmlFor:"email",className:"block text-sm font-medium leading-6 text-gray-900 mb-2",children:"Email address"}),(0,r.jsx)("p",{className:"block w-full h-10 rounded-md px-4 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg sm:leading-6 pl-2",children:t&&t.username})]}),t&&(0,r.jsx)(f,{nickname:null==t?void 0:t.nickname}),(0,r.jsx)("hr",{className:"border-b-1 w-full my-10"}),(0,r.jsx)("h2",{className:"text-2xl text-slate-700 font-semibold tracking-tight mb-5",children:"Update Password"}),(0,r.jsx)("hr",{className:"border-b-1 w-full mb-10"}),(0,r.jsx)(h,{}),(0,r.jsx)("hr",{className:"border-b-1 w-full mb-10"}),(0,r.jsx)("h2",{className:"text-2xl text-stone-700 font-semibold tracking-tight mb-10",children:"Membership Plan"}),(()=>{if(!o)return null;let{license_type:e,billing_period:t,start_date:s,end_date:n,is_subscription_active:a}=o,i="premium_plus"===e?"Premium+":e.charAt(0).toUpperCase()+e.slice(1);return(0,r.jsxs)("div",{className:"bg-gray-100 rounded-lg shadow-md p-6 mb-8",children:[(0,r.jsx)("h3",{className:"text-2xl text-slate-700 font-semibold mb-4",children:"Current Plan"}),(0,r.jsx)("div",{className:"flex items-center mb-4",children:(0,r.jsx)("span",{className:"px-4 py-2 rounded font-bold\n                        ".concat("free"===e&&"text-white bg-gradient-to-r from-orange-600 to-rose-800","\n                        ").concat("premium"===e&&"text-black bg-gradient-to-r from-gray-200 to-gray-400","\n                        ").concat("premium_plus"===e&&"text-black bg-gradient-to-r from-yellow-400 to-yellow-600","\n                    "),children:i})}),"free"!==e&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"flex mb-4",children:[(0,r.jsx)("span",{className:"font-bold w-32",children:"Start Date:"}),(0,r.jsx)("span",{children:s})]}),a?(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"flex mb-4",children:[(0,r.jsx)("span",{className:"font-bold w-32",children:"Billing Period:"}),(0,r.jsxs)("span",{children:[t.charAt(0).toUpperCase()+t.slice(1)," - $","yearly"===t?"premium"===e?"66/year":"99/year":"premium"===e?"6.6/month":"9.9/month"]})]})}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"flex mb-4",children:[(0,r.jsx)("span",{className:"font-bold w-32",children:"End Date:"}),(0,r.jsx)("span",{children:n})]}),(0,r.jsx)("span",{className:"text-purple-400",children:"*Subscription is canceled but active until the end date."})]})]})]})})(),(0,r.jsx)("div",{className:"text-center mb-8",children:(0,r.jsx)("a",{className:"flex w-fit mx-auto justify-center rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",href:"/dashboard/premium",children:"See more"})}),(0,r.jsx)("hr",{className:"border-b-1 w-full my-10"}),(0,r.jsxs)("section",{className:"block lg:flex lg:items-center lg:gap-x-3 w-full",children:[(0,r.jsx)("h2",{className:"lg:w-4/12 text-xl text-stone-700 font-semibold tracking-tight mb-6 lg:mb-0",children:"Deactivate Account"}),(0,r.jsx)("div",{className:"lg:w-8/12 h-auto",children:(0,r.jsx)(_,{})})]})]})})}},2808:function(e,t,s){"use strict";var r=s(7437),n=s(1444),a=s(4297);t.default=e=>{let{children:t}=e;return(0,r.jsx)(n.zt,{store:a.w_,children:t})}},4297:function(e,t,s){"use strict";s.d(t,{w_:function(){return h},TL:function(){return p},CG:function(){return b}});var r=s(1444),n=s(9753),a=s(8440),i=s(8354),o=s(4459),l=s(4646),c=s(5585);let d=(0,n.oM)({name:"food_meal",initialState:{date:null},reducers:{setDate:(e,t)=>{e.date=t.payload},resetDate:e=>{e.date=null}}}),{setDate:u,resetDate:m}=d.actions;var f=d.reducer,g=s(2072),x=s(2035);s(2808);let h=(0,n.xC)({reducer:{toast:i.ZP,auth:a.ZP,food_meal:o.ZP,load:l.ZP,workout_exercise:c.ZP,date:f,latest_weight:g.ZP,license:x.ZP}}),p=r.I0,b=r.v9},8440:function(e,t,s){"use strict";s.d(t,{Li:function(){return a},QV:function(){return n}});let r=(0,s(9753).oM)({name:"auth",initialState:{account:null},reducers:{setAuth:(e,t)=>{e.account={id:t.payload.id,nickname:t.payload.nickname,username:t.payload.username}},resetAuth:e=>{e.account=null}}}),{setAuth:n,resetAuth:a}=r.actions;t.ZP=r.reducer},5585:function(e,t,s){"use strict";s.d(t,{AW:function(){return d},Gt:function(){return a},H3:function(){return f},N8:function(){return n},QK:function(){return u},c0:function(){return l},mE:function(){return o},nY:function(){return i},nw:function(){return m},zO:function(){return c}});let r=(0,s(9753).oM)({name:"workout_exercise",initialState:{used_workout:null,edit_exercise:null,select_workout_list:null,exercise_set_list:null,edit_exercise_pre:null},reducers:{setUsedWorkout:(e,t)=>{e.used_workout=t.payload},resetUsedWorkout:e=>{e.used_workout=null},setEditExercise:(e,t)=>{e.edit_exercise=t.payload},resetEditExercise:e=>{e.edit_exercise=null},setSelectWorkoutList:(e,t)=>{e.select_workout_list=t.payload},resetSelectWorkoutList:e=>{e.select_workout_list=null},setExerciseSetList:(e,t)=>{e.exercise_set_list=t.payload},resetExerciseSetList:e=>{e.exercise_set_list=null},setEditExercisePre:(e,t)=>{e.edit_exercise_pre=t.payload},resetEditExercisePre:e=>{e.edit_exercise_pre=null}}}),{setUsedWorkout:n,resetUsedWorkout:a,setEditExercise:i,resetEditExercise:o,setSelectWorkoutList:l,resetSelectWorkoutList:c,setExerciseSetList:d,resetExerciseSetList:u,setEditExercisePre:m,resetEditExercisePre:f}=r.actions;t.ZP=r.reducer},2072:function(e,t,s){"use strict";s.d(t,{HW:function(){return n}});let r=(0,s(9753).oM)({name:"latest_weight",initialState:{latest_weight:null},reducers:{setLatestWeight:(e,t)=>{e.latest_weight=t.payload},resetLatestweight:e=>{e.latest_weight=null}}}),{setLatestWeight:n,resetLatestweight:a}=r.actions;t.ZP=r.reducer},2035:function(e,t,s){"use strict";s.d(t,{BE:function(){return n}});let r=(0,s(9753).oM)({name:"license",initialState:{license:null},reducers:{setLicense:(e,t)=>{e.license=t.payload},resetLicense:e=>{e.license=null}}}),{setLicense:n,resetLicense:a}=r.actions;t.ZP=r.reducer},4646:function(e,t,s){"use strict";s.d(t,{Dv:function(){return f},OV:function(){return c},RO:function(){return m},Tr:function(){return n},ex:function(){return l},lc:function(){return d},ly:function(){return o},mH:function(){return u},wO:function(){return a},yP:function(){return i}});let r=(0,s(9753).oM)({name:"loading",initialState:{meal_loading:!1,often_food_loading:!1,history_food_loading:!1,custom_food_loading:!1,exercise_loading:!1,history_workout_loading:!1,custom_workout_loading:!1,often_workout_loading:!1,monster_loading:!1,set_loading:!1},reducers:{setMealLoading:(e,t)=>{e.meal_loading=t.payload},setOftenFoodLoading:(e,t)=>{e.often_food_loading=t.payload},setHistoryFoodLoading:(e,t)=>{e.history_food_loading=t.payload},setCustomFoodLoading:(e,t)=>{e.custom_food_loading=t.payload},setExerciseLoading:(e,t)=>{e.exercise_loading=t.payload},setHistoryWorkoutLoading:(e,t)=>{e.history_workout_loading=t.payload},setCustomWorkoutLoading:(e,t)=>{e.custom_workout_loading=t.payload},setOftenWorkoutLoading:(e,t)=>{e.often_workout_loading=t.payload},setMonsterLoading:(e,t)=>{e.monster_loading=t.payload},setSetLoading:(e,t)=>{e.set_loading=t.payload}}}),{setMealLoading:n,setOftenFoodLoading:a,setHistoryFoodLoading:i,setCustomFoodLoading:o,setExerciseLoading:l,setCustomWorkoutLoading:c,setHistoryWorkoutLoading:d,setOftenWorkoutLoading:u,setMonsterLoading:m,setSetLoading:f}=r.actions;t.ZP=r.reducer},4459:function(e,t,s){"use strict";s.d(t,{Fe:function(){return a},GA:function(){return i},Go:function(){return g},Jo:function(){return x},RR:function(){return d},Td:function(){return m},Xl:function(){return o},bI:function(){return f},km:function(){return l},wc:function(){return u},x9:function(){return n},zo:function(){return c}});let r=(0,s(9753).oM)({name:"food_meal",initialState:{used_food:null,edit_meal:null,used_fatsecret_food:null,select_food_list:null,meal_set_list:null,edit_meal_pre:null},reducers:{setUsedFood:(e,t)=>{e.used_food=t.payload},resetUsedFood:e=>{e.used_food=null},setEditMeal:(e,t)=>{e.edit_meal=t.payload},resetEditMeal:e=>{e.edit_meal=null},setUsedFatSecretFood:(e,t)=>{e.used_fatsecret_food=t.payload},resetUsedFatSecretFood:e=>{e.used_fatsecret_food=null},setSelectFoodList:(e,t)=>{e.select_food_list=t.payload},resetSelectFoodList:e=>{e.select_food_list=null},setMealSetList:(e,t)=>{e.meal_set_list=t.payload},resetMealSetList:e=>{e.meal_set_list=null},setEditMealPre:(e,t)=>{e.edit_meal_pre=t.payload},resetEditMealPre:e=>{e.edit_meal_pre=null}}}),{setUsedFood:n,resetUsedFood:a,setEditMeal:i,resetEditMeal:o,setUsedFatSecretFood:l,resetUsedFatSecretFood:c,setSelectFoodList:d,resetSelectFoodList:u,setMealSetList:m,resetMealSetList:f,setEditMealPre:g,resetEditMealPre:x}=r.actions;t.ZP=r.reducer},8354:function(e,t,s){"use strict";s.d(t,{Qu:function(){return o},fz:function(){return i}});var r=s(9753);let n={message:"",type:"info"},a=(0,r.oM)({name:"toast",initialState:n,reducers:{setToast:(e,t)=>{e.message=t.payload.message,e.type=t.payload.type},resetToast:e=>{e.message=n.message,e.type=n.type}}}),{setToast:i,resetToast:o}=a.actions;t.ZP=a.reducer}},function(e){e.O(0,[7699,9461,7123,4349,2961,2971,7023,1744],function(){return e(e.s=6679)}),_N_E=e.O()}]);