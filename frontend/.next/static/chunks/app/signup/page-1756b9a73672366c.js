(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4966],{1619:function(e,t,r){Promise.resolve().then(r.bind(r,9392)),Promise.resolve().then(r.bind(r,3888))},8064:function(e,t,r){"use strict";Object.defineProperty(t,"$",{enumerable:!0,get:function(){return n}});let s=r(4590);function n(e){let{createServerReference:t}=r(6671);return t(e,s.callServer)}},9392:function(e,t,r){"use strict";var s=r(7437);r(2265);var n=r(8735),o=r(1422),a=r(4297),i=r(8354),l=r(8440),u=r(6463);let d=null!==o.wL&&void 0!==o.wL?o.wL:"";t.default=()=>{let e=(0,u.useRouter)(),t=(0,a.TL)(),r=async r=>{let s=r.credential;try{let r=await fetch("/api/google-login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_token:s})}),n=await r.json();if(200!==r.status){t((0,i.fz)({message:n.error,type:"error"})),setTimeout(()=>t((0,i.Qu)()),3e3);return}"message"in n&&(t((0,i.fz)({message:n.message,type:"success"})),t((0,l.QV)(n.account)),e.push("/dashboard"))}catch(e){t((0,i.fz)({message:"Something went wrong. Please try again.",type:"error"})),setTimeout(()=>t((0,i.Qu)()),3e3)}};return(0,s.jsx)(n.rg,{clientId:d,children:(0,s.jsx)("div",{className:"flex justify-center items-center w-full my-10",children:(0,s.jsx)(n.kZ,{onSuccess:r,onError:()=>{t((0,i.fz)({message:"Google Signin Error. Please try again.",type:"error"})),setTimeout(()=>t((0,i.Qu)()),3e3)},theme:"outline",size:"large",shape:"rectangular",text:"signin_with"})})})}},3888:function(e,t,r){"use strict";r.d(t,{SignUpForm:function(){return p}});var s=r(7437);r(4590);var n=(0,r(8064).$)("98d37d666a2bb0b30d666be621ef240184c721d2"),o=r(4839),a=r(9381),i=r(6463),l=r(2265),u=r(1942),d=r(4245),c=r(6685),m=r.n(c),f=r(7138);let g=d.Ry().shape({nickname:d.Z_().min(2,"Must be at least 2 characters").max(20,"Nickname must be less than 20 characters").required("Nickname is required !"),username:d.Z_().email("Invalid email format !").required("Email is required !"),password:d.Z_().min(8,"Password must be at least 8 characters").max(100,"Password must be maximum 100 characters").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,"Password must contain minimum 5 characters, 1 uppercase letter, 1 lowercase letter, 1 numeric digit.").required("Password is required !"),confirmPassword:d.Z_().min(8,"Password must be at least 8 characters").max(100,"Password must be maximum 100 characters").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,"Password must contain minimum 5 characters, 1 uppercase letter, 1 lowercase letter, 1 numeric digit.").required("Password is required !").oneOf([d.iH("password"),""],"Passwords must match !")});function p(){let e=(0,i.useRouter)(),t=(0,a.TA)({initialValues:{nickname:"",username:"",password:"",confirmPassword:""},validationSchema:g,onSubmit:async t=>{let r={nickname:t.nickname,username:t.username,password:t.password},s=await n(r);s.error?(d({message:s.error,type:"error"}),setTimeout(()=>d({message:"",type:""}),4e3)):(d({message:s.message,type:"success"}),setTimeout(()=>d({message:"",type:""}),4e3),e.push("/verify/".concat(s.uid)))}}),[r,d]=(0,l.useState)({message:"",type:""}),[c,p]=(0,l.useState)(!1),[x,h]=(0,l.useState)(!1);return(0,s.jsxs)("div",{className:"flex flex-col justify-center px-6 lg:px-8 ",children:[(0,s.jsx)("h2",{className:"text-center text-2xl font-bold leading-9 tracking-tight text-gray-900",children:"Sign Up New Account"}),r.message&&(0,s.jsx)("div",{className:(0,o.Z)("fixed z-[100] top-5 right-5 w-fit text-white text-lg px-5 py-3 rounded-md mb-5 ".concat(m().slideLeft),{"bg-red-500":"error"===r.type,"bg-green-500":"success"===r.type}),children:r.message}),(0,s.jsx)("div",{className:"mt-10 sm:mx-auto sm:w-full sm:max-w-sm",children:(0,s.jsxs)("form",{className:"space-y-6",onSubmit:t.handleSubmit,children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{htmlFor:"name",className:"block text-sm font-medium leading-6 text-gray-900",children:"Nickname:"}),(0,s.jsx)("input",{type:"text",id:"nickname",name:"nickname",value:t.values.nickname,onChange:t.handleChange,onBlur:t.handleBlur,className:(0,o.Z)("block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",{"border-2 border-red-500 bg-red-100 text-red-800":t.touched.nickname&&t.errors.nickname}),autoComplete:"off"}),t.errors.nickname&&t.touched.nickname&&(0,s.jsx)("p",{className:"text-red-500 ml-1 my-3",children:t.errors.nickname})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{htmlFor:"email",className:"block text-sm font-medium leading-6 text-gray-900",children:"Email:"}),(0,s.jsx)("input",{type:"text",id:"username",name:"username",value:t.values.username,onChange:t.handleChange,onBlur:t.handleBlur,autoComplete:"off",className:(0,o.Z)("block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",{"border-2 border-red-500 bg-red-100 text-red-800":t.touched.username&&t.errors.username})}),t.errors.username&&t.touched.username&&(0,s.jsx)("p",{className:"text-red-500 ml-1 my-3",children:t.errors.username})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{htmlFor:"password",className:"block text-sm font-medium leading-6 text-gray-900",children:"Password:"}),(0,s.jsxs)("section",{className:"flex items-center gap-3 relative",children:[(0,s.jsx)("input",{type:c?"text":"password",id:"password",name:"password",value:t.values.password,onChange:t.handleChange,onBlur:t.handleBlur,autoComplete:"off",className:(0,o.Z)("block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",{"border-2 border-red-500 bg-red-100 text-red-800":t.touched.password&&t.errors.password})}),(0,s.jsx)("div",{className:(0,o.Z)("text-gray-300 absolute right-2 cursor-pointer",{"text-blue-800":c}),children:c?(0,s.jsx)(u.dSq,{size:25,onClick:()=>p(e=>!e)}):(0,s.jsx)(u.tgn,{size:25,onClick:()=>p(e=>!e)})})]}),t.errors.password&&t.touched.password&&(0,s.jsx)("p",{className:"text-red-500 ml-1 my-3",children:t.errors.password})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{htmlFor:"confirmPassword",className:"block text-sm font-medium leading-6 text-gray-900",children:"Confirm Password:"}),(0,s.jsxs)("section",{className:"flex items-center gap-3 relative",children:[(0,s.jsx)("input",{type:x?"text":"password",id:"confirmPassword",name:"confirmPassword",value:t.values.confirmPassword,onChange:t.handleChange,onBlur:t.handleBlur,autoComplete:"off",className:(0,o.Z)("block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",{"border-2 border-red-500 bg-red-100 text-red-800":t.touched.confirmPassword&&t.errors.confirmPassword})}),(0,s.jsx)("div",{className:(0,o.Z)("text-gray-300 absolute right-2 cursor-pointer",{"text-blue-800":c}),children:x?(0,s.jsx)(u.dSq,{size:25,onClick:()=>h(e=>!e)}):(0,s.jsx)(u.tgn,{size:25,onClick:()=>h(e=>!e)})})]}),t.errors.confirmPassword&&t.touched.confirmPassword&&(0,s.jsx)("p",{className:"text-red-500 ml-1 my-3 order-first",children:t.errors.confirmPassword})]}),(0,s.jsxs)("section",{className:"w-full flex flex-col gap-y-3 justify-start items-end lg:items-center lg:flex-row lg:gap-y-0 lg:justify-between",children:[(0,s.jsxs)("span",{className:"order-2 lg:order-1 text-right lg:text-left",children:[(0,s.jsx)("span",{className:"text-gray-600 mr-2",children:"Already registered ?"}),(0,s.jsx)(f.default,{className:"text-blue-700 hover:text-blue-500",href:"/signin",children:"Signin"})]}),(0,s.jsx)("button",{type:"submit",className:"flex w-full order-1 lg:order-2 lg:w-fit justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",children:"Register"})]})]})})]})}},1422:function(e,t,r){"use strict";r.d(t,{Yw:function(){return n},wL:function(){return s}});let s="990098268270-qu8llv8qmu44i9fpne01u2ugj8fg4j5r.apps.googleusercontent.com",n="'pk_live_51PUhFK08HSrizKfhEs0uCBtk3GYZsDDYgrfC3GSbw7NDq0Yx9i5ytb3jaJejAmnAbVE7l6jc1lvORjNcta3eS9yj00ZJW7whIC'STRIPE_PRICE_ID_PREMIUM_MONTH=price_1PWQ5f08HSrizKfhBQ3JiB1x"},2808:function(e,t,r){"use strict";var s=r(7437),n=r(1444),o=r(4297);t.default=e=>{let{children:t}=e;return(0,s.jsx)(n.zt,{store:o.w_,children:t})}},4297:function(e,t,r){"use strict";r.d(t,{w_:function(){return x},TL:function(){return h},CG:function(){return _}});var s=r(1444),n=r(9753),o=r(8440),a=r(8354),i=r(4459),l=r(4646),u=r(5585);let d=(0,n.oM)({name:"food_meal",initialState:{date:null},reducers:{setDate:(e,t)=>{e.date=t.payload},resetDate:e=>{e.date=null}}}),{setDate:c,resetDate:m}=d.actions;var f=d.reducer,g=r(2072),p=r(2035);r(2808);let x=(0,n.xC)({reducer:{toast:a.ZP,auth:o.ZP,food_meal:i.ZP,load:l.ZP,workout_exercise:u.ZP,date:f,latest_weight:g.ZP,license:p.ZP}}),h=s.I0,_=s.v9},8440:function(e,t,r){"use strict";r.d(t,{Li:function(){return o},QV:function(){return n}});let s=(0,r(9753).oM)({name:"auth",initialState:{account:null},reducers:{setAuth:(e,t)=>{e.account={id:t.payload.id,nickname:t.payload.nickname,username:t.payload.username}},resetAuth:e=>{e.account=null}}}),{setAuth:n,resetAuth:o}=s.actions;t.ZP=s.reducer},5585:function(e,t,r){"use strict";r.d(t,{AW:function(){return d},Gt:function(){return o},H3:function(){return f},N8:function(){return n},QK:function(){return c},c0:function(){return l},mE:function(){return i},nY:function(){return a},nw:function(){return m},zO:function(){return u}});let s=(0,r(9753).oM)({name:"workout_exercise",initialState:{used_workout:null,edit_exercise:null,select_workout_list:null,exercise_set_list:null,edit_exercise_pre:null},reducers:{setUsedWorkout:(e,t)=>{e.used_workout=t.payload},resetUsedWorkout:e=>{e.used_workout=null},setEditExercise:(e,t)=>{e.edit_exercise=t.payload},resetEditExercise:e=>{e.edit_exercise=null},setSelectWorkoutList:(e,t)=>{e.select_workout_list=t.payload},resetSelectWorkoutList:e=>{e.select_workout_list=null},setExerciseSetList:(e,t)=>{e.exercise_set_list=t.payload},resetExerciseSetList:e=>{e.exercise_set_list=null},setEditExercisePre:(e,t)=>{e.edit_exercise_pre=t.payload},resetEditExercisePre:e=>{e.edit_exercise_pre=null}}}),{setUsedWorkout:n,resetUsedWorkout:o,setEditExercise:a,resetEditExercise:i,setSelectWorkoutList:l,resetSelectWorkoutList:u,setExerciseSetList:d,resetExerciseSetList:c,setEditExercisePre:m,resetEditExercisePre:f}=s.actions;t.ZP=s.reducer},2072:function(e,t,r){"use strict";r.d(t,{HW:function(){return n}});let s=(0,r(9753).oM)({name:"latest_weight",initialState:{latest_weight:null},reducers:{setLatestWeight:(e,t)=>{e.latest_weight=t.payload},resetLatestweight:e=>{e.latest_weight=null}}}),{setLatestWeight:n,resetLatestweight:o}=s.actions;t.ZP=s.reducer},2035:function(e,t,r){"use strict";r.d(t,{BE:function(){return n}});let s=(0,r(9753).oM)({name:"license",initialState:{license:null},reducers:{setLicense:(e,t)=>{e.license=t.payload},resetLicense:e=>{e.license=null}}}),{setLicense:n,resetLicense:o}=s.actions;t.ZP=s.reducer},4646:function(e,t,r){"use strict";r.d(t,{Dv:function(){return f},OV:function(){return u},RO:function(){return m},Tr:function(){return n},ex:function(){return l},lc:function(){return d},ly:function(){return i},mH:function(){return c},wO:function(){return o},yP:function(){return a}});let s=(0,r(9753).oM)({name:"loading",initialState:{meal_loading:!1,often_food_loading:!1,history_food_loading:!1,custom_food_loading:!1,exercise_loading:!1,history_workout_loading:!1,custom_workout_loading:!1,often_workout_loading:!1,monster_loading:!1,set_loading:!1},reducers:{setMealLoading:(e,t)=>{e.meal_loading=t.payload},setOftenFoodLoading:(e,t)=>{e.often_food_loading=t.payload},setHistoryFoodLoading:(e,t)=>{e.history_food_loading=t.payload},setCustomFoodLoading:(e,t)=>{e.custom_food_loading=t.payload},setExerciseLoading:(e,t)=>{e.exercise_loading=t.payload},setHistoryWorkoutLoading:(e,t)=>{e.history_workout_loading=t.payload},setCustomWorkoutLoading:(e,t)=>{e.custom_workout_loading=t.payload},setOftenWorkoutLoading:(e,t)=>{e.often_workout_loading=t.payload},setMonsterLoading:(e,t)=>{e.monster_loading=t.payload},setSetLoading:(e,t)=>{e.set_loading=t.payload}}}),{setMealLoading:n,setOftenFoodLoading:o,setHistoryFoodLoading:a,setCustomFoodLoading:i,setExerciseLoading:l,setCustomWorkoutLoading:u,setHistoryWorkoutLoading:d,setOftenWorkoutLoading:c,setMonsterLoading:m,setSetLoading:f}=s.actions;t.ZP=s.reducer},4459:function(e,t,r){"use strict";r.d(t,{Fe:function(){return o},GA:function(){return a},Go:function(){return g},Jo:function(){return p},RR:function(){return d},Td:function(){return m},Xl:function(){return i},bI:function(){return f},km:function(){return l},wc:function(){return c},x9:function(){return n},zo:function(){return u}});let s=(0,r(9753).oM)({name:"food_meal",initialState:{used_food:null,edit_meal:null,used_fatsecret_food:null,select_food_list:null,meal_set_list:null,edit_meal_pre:null},reducers:{setUsedFood:(e,t)=>{e.used_food=t.payload},resetUsedFood:e=>{e.used_food=null},setEditMeal:(e,t)=>{e.edit_meal=t.payload},resetEditMeal:e=>{e.edit_meal=null},setUsedFatSecretFood:(e,t)=>{e.used_fatsecret_food=t.payload},resetUsedFatSecretFood:e=>{e.used_fatsecret_food=null},setSelectFoodList:(e,t)=>{e.select_food_list=t.payload},resetSelectFoodList:e=>{e.select_food_list=null},setMealSetList:(e,t)=>{e.meal_set_list=t.payload},resetMealSetList:e=>{e.meal_set_list=null},setEditMealPre:(e,t)=>{e.edit_meal_pre=t.payload},resetEditMealPre:e=>{e.edit_meal_pre=null}}}),{setUsedFood:n,resetUsedFood:o,setEditMeal:a,resetEditMeal:i,setUsedFatSecretFood:l,resetUsedFatSecretFood:u,setSelectFoodList:d,resetSelectFoodList:c,setMealSetList:m,resetMealSetList:f,setEditMealPre:g,resetEditMealPre:p}=s.actions;t.ZP=s.reducer},8354:function(e,t,r){"use strict";r.d(t,{Qu:function(){return i},fz:function(){return a}});var s=r(9753);let n={message:"",type:"info"},o=(0,s.oM)({name:"toast",initialState:n,reducers:{setToast:(e,t)=>{e.message=t.payload.message,e.type=t.payload.type},resetToast:e=>{e.message=n.message,e.type=n.type}}}),{setToast:a,resetToast:i}=o.actions;t.ZP=o.reducer},6685:function(e){e.exports={slideLeft:"signup_slideLeft__ZJEPq"}}},function(e){e.O(0,[3594,7699,7123,4349,231,5662,2971,7023,1744],function(){return e(e.s=1619)}),_N_E=e.O()}]);