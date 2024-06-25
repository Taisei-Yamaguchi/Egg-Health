(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4966],{1619:function(e,t,s){Promise.resolve().then(s.bind(s,2174)),Promise.resolve().then(s.bind(s,3888))},8064:function(e,t,s){"use strict";Object.defineProperty(t,"$",{enumerable:!0,get:function(){return n}});let r=s(4590);function n(e){let{createServerReference:t}=s(6671);return t(e,r.callServer)}},2174:function(e,t,s){"use strict";s.d(t,{default:function(){return u}});var r=s(7437);s(2265);var n=s(8735),a=s(4297),o=s(8354),i=s(8440),l=s(6463),d=s(2857),u=()=>{let e=(0,l.useRouter)(),t=(0,a.TL)(),s=async s=>{let r=s.credential;try{let s=await fetch("/api/google-login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_token:r})}),n=await s.json();if(200!==s.status){t((0,o.fz)({message:n.error,type:"error"})),setTimeout(()=>t((0,o.Qu)()),3e3);return}"message"in n&&(t((0,o.fz)({message:n.message,type:"success"})),t((0,i.QV)(n.account)),e.push("/dashboard"))}catch(e){t((0,o.fz)({message:"Something error happend. Please try ageain.",type:"error"})),setTimeout(()=>t((0,o.Qu)()),3e3)}};return(0,r.jsx)(n.rg,{clientId:"990098268270-qu8llv8qmu44i9fpne01u2ugj8fg4j5r.apps.googleusercontent.com",children:(0,r.jsxs)("div",{className:"flex justify-center items-center w-full my-10",children:[(0,r.jsxs)("button",{className:"px-4 flex items-center justify-center w-full py-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-100",onClick:()=>{let e=document.querySelector('div[role="button"]');e&&e.click()},children:[(0,r.jsx)(d.JM8,{className:"text-2xl mr-3"}),(0,r.jsx)("span",{className:"text-lg text-gray-700 font-medium mx-2 px-2",children:"Sign in with Google"})]}),(0,r.jsx)("div",{style:{display:"none"},children:(0,r.jsx)(n.kZ,{onSuccess:s,onError:()=>{t((0,o.fz)({message:"Google Signin Error . Please try again.",type:"error"})),setTimeout(()=>t((0,o.Qu)()),3e3)},theme:"outline",size:"large",shape:"rectangular",text:"signin_with"})})]})})}},3888:function(e,t,s){"use strict";s.d(t,{SignUpForm:function(){return x}});var r=s(7437);s(4590);var n=(0,s(8064).$)("98d37d666a2bb0b30d666be621ef240184c721d2"),a=s(4839),o=s(9381),i=s(6463),l=s(2265),d=s(1942),u=s(4245),c=s(6685),m=s.n(c),g=s(7138);let f=u.Ry().shape({nickname:u.Z_().min(2,"Must be at least 2 characters").max(20,"Nickname must be less than 20 characters").required("Nickname is required !"),username:u.Z_().email("Invalid email format !").required("Email is required !"),password:u.Z_().min(8,"Password must be at least 8 characters").max(100,"Password must be maximum 100 characters").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,"Password must contain minimum 5 characters, 1 uppercase letter, 1 lowercase letter, 1 numeric digit.").required("Password is required !"),confirmPassword:u.Z_().min(8,"Password must be at least 8 characters").max(100,"Password must be maximum 100 characters").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,"Password must contain minimum 5 characters, 1 uppercase letter, 1 lowercase letter, 1 numeric digit.").required("Password is required !").oneOf([u.iH("password"),""],"Passwords must match !")});function x(){let e=(0,i.useRouter)(),t=(0,o.TA)({initialValues:{nickname:"",username:"",password:"",confirmPassword:""},validationSchema:f,onSubmit:async t=>{let s={nickname:t.nickname,username:t.username,password:t.password},r=await n(s);r.error?(u({message:r.error,type:"error"}),setTimeout(()=>u({message:"",type:""}),4e3)):(u({message:r.message,type:"success"}),setTimeout(()=>u({message:"",type:""}),4e3),e.push("/verify/".concat(r.uid)))}}),[s,u]=(0,l.useState)({message:"",type:""}),[c,x]=(0,l.useState)(!1),[p,h]=(0,l.useState)(!1);return(0,r.jsxs)("div",{className:"flex flex-col justify-center px-6 lg:px-8 ",children:[(0,r.jsx)("h2",{className:"text-center text-2xl font-bold leading-9 tracking-tight text-gray-900",children:"Sign Up New Account"}),s.message&&(0,r.jsx)("div",{className:(0,a.Z)("fixed z-[100] top-5 right-5 w-fit text-white text-lg px-5 py-3 rounded-md mb-5 ".concat(m().slideLeft),{"bg-red-500":"error"===s.type,"bg-green-500":"success"===s.type}),children:s.message}),(0,r.jsx)("div",{className:"mt-10 sm:mx-auto sm:w-full sm:max-w-sm",children:(0,r.jsxs)("form",{className:"space-y-6",onSubmit:t.handleSubmit,children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"name",className:"block text-sm font-medium leading-6 text-gray-900",children:"Nickname:"}),(0,r.jsx)("input",{type:"text",id:"nickname",name:"nickname",value:t.values.nickname,onChange:t.handleChange,onBlur:t.handleBlur,className:(0,a.Z)("block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",{"border-2 border-red-500 bg-red-100 text-red-800":t.touched.nickname&&t.errors.nickname}),autoComplete:"off"}),t.errors.nickname&&t.touched.nickname&&(0,r.jsx)("p",{className:"text-red-500 ml-1 my-3",children:t.errors.nickname})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"email",className:"block text-sm font-medium leading-6 text-gray-900",children:"Email:"}),(0,r.jsx)("input",{type:"text",id:"username",name:"username",value:t.values.username,onChange:t.handleChange,onBlur:t.handleBlur,autoComplete:"off",className:(0,a.Z)("block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",{"border-2 border-red-500 bg-red-100 text-red-800":t.touched.username&&t.errors.username})}),t.errors.username&&t.touched.username&&(0,r.jsx)("p",{className:"text-red-500 ml-1 my-3",children:t.errors.username})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"password",className:"block text-sm font-medium leading-6 text-gray-900",children:"Password:"}),(0,r.jsxs)("section",{className:"flex items-center gap-3 relative",children:[(0,r.jsx)("input",{type:c?"text":"password",id:"password",name:"password",value:t.values.password,onChange:t.handleChange,onBlur:t.handleBlur,autoComplete:"off",className:(0,a.Z)("block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",{"border-2 border-red-500 bg-red-100 text-red-800":t.touched.password&&t.errors.password})}),(0,r.jsx)("div",{className:(0,a.Z)("text-gray-300 absolute right-2 cursor-pointer",{"text-blue-800":c}),children:c?(0,r.jsx)(d.dSq,{size:25,onClick:()=>x(e=>!e)}):(0,r.jsx)(d.tgn,{size:25,onClick:()=>x(e=>!e)})})]}),t.errors.password&&t.touched.password&&(0,r.jsx)("p",{className:"text-red-500 ml-1 my-3",children:t.errors.password})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"confirmPassword",className:"block text-sm font-medium leading-6 text-gray-900",children:"Confirm Password:"}),(0,r.jsxs)("section",{className:"flex items-center gap-3 relative",children:[(0,r.jsx)("input",{type:p?"text":"password",id:"confirmPassword",name:"confirmPassword",value:t.values.confirmPassword,onChange:t.handleChange,onBlur:t.handleBlur,autoComplete:"off",className:(0,a.Z)("block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",{"border-2 border-red-500 bg-red-100 text-red-800":t.touched.confirmPassword&&t.errors.confirmPassword})}),(0,r.jsx)("div",{className:(0,a.Z)("text-gray-300 absolute right-2 cursor-pointer",{"text-blue-800":c}),children:p?(0,r.jsx)(d.dSq,{size:25,onClick:()=>h(e=>!e)}):(0,r.jsx)(d.tgn,{size:25,onClick:()=>h(e=>!e)})})]}),t.errors.confirmPassword&&t.touched.confirmPassword&&(0,r.jsx)("p",{className:"text-red-500 ml-1 my-3 order-first",children:t.errors.confirmPassword})]}),(0,r.jsxs)("section",{className:"w-full flex flex-col gap-y-3 justify-start items-end lg:items-center lg:flex-row lg:gap-y-0 lg:justify-between",children:[(0,r.jsxs)("span",{className:"order-2 lg:order-1 text-right lg:text-left",children:[(0,r.jsx)("span",{className:"text-gray-600 mr-2",children:"Already registered ?"}),(0,r.jsx)(g.default,{className:"text-blue-700 hover:text-blue-500",href:"/signin",children:"Signin"})]}),(0,r.jsx)("button",{type:"submit",className:"flex w-full order-1 lg:order-2 lg:w-fit justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",children:"Register"})]})]})})]})}},2808:function(e,t,s){"use strict";var r=s(7437),n=s(1444),a=s(4297);t.default=e=>{let{children:t}=e;return(0,r.jsx)(n.zt,{store:a.w_,children:t})}},4297:function(e,t,s){"use strict";s.d(t,{w_:function(){return p},TL:function(){return h},CG:function(){return y}});var r=s(1444),n=s(9753),a=s(8440),o=s(8354),i=s(4459),l=s(4646),d=s(5585);let u=(0,n.oM)({name:"food_meal",initialState:{date:null},reducers:{setDate:(e,t)=>{e.date=t.payload},resetDate:e=>{e.date=null}}}),{setDate:c,resetDate:m}=u.actions;var g=u.reducer,f=s(2072),x=s(2035);s(2808);let p=(0,n.xC)({reducer:{toast:o.ZP,auth:a.ZP,food_meal:i.ZP,load:l.ZP,workout_exercise:d.ZP,date:g,latest_weight:f.ZP,license:x.ZP}}),h=r.I0,y=r.v9},8440:function(e,t,s){"use strict";s.d(t,{Li:function(){return a},QV:function(){return n}});let r=(0,s(9753).oM)({name:"auth",initialState:{account:null},reducers:{setAuth:(e,t)=>{e.account={id:t.payload.id,nickname:t.payload.nickname,username:t.payload.username}},resetAuth:e=>{e.account=null}}}),{setAuth:n,resetAuth:a}=r.actions;t.ZP=r.reducer},5585:function(e,t,s){"use strict";s.d(t,{Gt:function(){return a},N8:function(){return n},QK:function(){return c},c0:function(){return l},mE:function(){return i},nY:function(){return o}});let r=(0,s(9753).oM)({name:"workout_exercise",initialState:{used_workout:null,edit_exercise:null,select_workout_list:null,exercise_set_list:null,edit_exercise_pre:null},reducers:{setUsedWorkout:(e,t)=>{e.used_workout=t.payload},resetUsedWorkout:e=>{e.used_workout=null},setEditExercise:(e,t)=>{e.edit_exercise=t.payload},resetEditExercise:e=>{e.edit_exercise=null},setSelectWorkoutList:(e,t)=>{e.select_workout_list=t.payload},resetSelectWorkoutList:e=>{e.select_workout_list=null},setExerciseSetList:(e,t)=>{e.exercise_set_list=t.payload},resetExerciseSetList:e=>{e.exercise_set_list=null},setEditExercisePre:(e,t)=>{e.edit_exercise_pre=t.payload},resetEditExercisePre:e=>{e.edit_exercise_pre=null}}}),{setUsedWorkout:n,resetUsedWorkout:a,setEditExercise:o,resetEditExercise:i,setSelectWorkoutList:l,resetSelectWorkoutList:d,setExerciseSetList:u,resetExerciseSetList:c,setEditExercisePre:m,resetEditExercisePre:g}=r.actions;t.ZP=r.reducer},2072:function(e,t,s){"use strict";s.d(t,{HW:function(){return n}});let r=(0,s(9753).oM)({name:"latest_weight",initialState:{latest_weight:null},reducers:{setLatestWeight:(e,t)=>{e.latest_weight=t.payload},resetLatestweight:e=>{e.latest_weight=null}}}),{setLatestWeight:n,resetLatestweight:a}=r.actions;t.ZP=r.reducer},2035:function(e,t,s){"use strict";s.d(t,{BE:function(){return n}});let r=(0,s(9753).oM)({name:"license",initialState:{license:null},reducers:{setLicense:(e,t)=>{e.license=t.payload},resetLicense:e=>{e.license=null}}}),{setLicense:n,resetLicense:a}=r.actions;t.ZP=r.reducer},4646:function(e,t,s){"use strict";s.d(t,{Dv:function(){return g},OV:function(){return d},RO:function(){return m},Tr:function(){return n},ex:function(){return l},lc:function(){return u},ly:function(){return i},yP:function(){return o}});let r=(0,s(9753).oM)({name:"loading",initialState:{meal_loading:!1,often_food_loading:!1,history_food_loading:!1,custom_food_loading:!1,exercise_loading:!1,history_workout_loading:!1,custom_workout_loading:!1,often_workout_loading:!1,monster_loading:!1,set_loading:!1},reducers:{setMealLoading:(e,t)=>{e.meal_loading=t.payload},setOftenFoodLoading:(e,t)=>{e.often_food_loading=t.payload},setHistoryFoodLoading:(e,t)=>{e.history_food_loading=t.payload},setCustomFoodLoading:(e,t)=>{e.custom_food_loading=t.payload},setExerciseLoading:(e,t)=>{e.exercise_loading=t.payload},setHistoryWorkoutLoading:(e,t)=>{e.history_workout_loading=t.payload},setCustomWorkoutLoading:(e,t)=>{e.custom_workout_loading=t.payload},setOftenWorkoutLoading:(e,t)=>{e.often_workout_loading=t.payload},setMonsterLoading:(e,t)=>{e.monster_loading=t.payload},setSetLoading:(e,t)=>{e.set_loading=t.payload}}}),{setMealLoading:n,setOftenFoodLoading:a,setHistoryFoodLoading:o,setCustomFoodLoading:i,setExerciseLoading:l,setCustomWorkoutLoading:d,setHistoryWorkoutLoading:u,setOftenWorkoutLoading:c,setMonsterLoading:m,setSetLoading:g}=r.actions;t.ZP=r.reducer},4459:function(e,t,s){"use strict";s.d(t,{Fe:function(){return a},GA:function(){return o},RR:function(){return u},Xl:function(){return i},bI:function(){return g},km:function(){return l},x9:function(){return n},zo:function(){return d}});let r=(0,s(9753).oM)({name:"food_meal",initialState:{used_food:null,edit_meal:null,used_fatsecret_food:null,select_food_list:null,meal_set_list:null,edit_meal_pre:null},reducers:{setUsedFood:(e,t)=>{e.used_food=t.payload},resetUsedFood:e=>{e.used_food=null},setEditMeal:(e,t)=>{e.edit_meal=t.payload},resetEditMeal:e=>{e.edit_meal=null},setUsedFatSecretFood:(e,t)=>{e.used_fatsecret_food=t.payload},resetUsedFatSecretFood:e=>{e.used_fatsecret_food=null},setSelectFoodList:(e,t)=>{e.select_food_list=t.payload},resetSelectFoodList:e=>{e.select_food_list=null},setMealSetList:(e,t)=>{e.meal_set_list=t.payload},resetMealSetList:e=>{e.meal_set_list=null},setEditMealPre:(e,t)=>{e.edit_meal_pre=t.payload},resetEditMealPre:e=>{e.edit_meal_pre=null}}}),{setUsedFood:n,resetUsedFood:a,setEditMeal:o,resetEditMeal:i,setUsedFatSecretFood:l,resetUsedFatSecretFood:d,setSelectFoodList:u,resetSelectFoodList:c,setMealSetList:m,resetMealSetList:g,setEditMealPre:f,resetEditMealPre:x}=r.actions;t.ZP=r.reducer},8354:function(e,t,s){"use strict";s.d(t,{Qu:function(){return i},fz:function(){return o}});var r=s(9753);let n={message:"",type:"info"},a=(0,r.oM)({name:"toast",initialState:n,reducers:{setToast:(e,t)=>{e.message=t.payload.message,e.type=t.payload.type},resetToast:e=>{e.message=n.message,e.type=n.type}}}),{setToast:o,resetToast:i}=a.actions;t.ZP=a.reducer},6685:function(e){e.exports={slideLeft:"signup_slideLeft__ZJEPq"}}},function(e){e.O(0,[3594,7699,680,7123,4349,231,5662,2971,7023,1744],function(){return e(e.s=1619)}),_N_E=e.O()}]);