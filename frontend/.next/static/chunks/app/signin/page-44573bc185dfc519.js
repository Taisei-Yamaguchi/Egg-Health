(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4281],{1304:function(e,t,s){Promise.resolve().then(s.bind(s,9392)),Promise.resolve().then(s.bind(s,3595))},9392:function(e,t,s){"use strict";var n=s(7437);s(2265);var r=s(8735),o=s(1422),i=s(4297),a=s(8354),l=s(8440),u=s(6463);let d=null!==o.wL&&void 0!==o.wL?o.wL:"";t.default=()=>{let e=(0,u.useRouter)(),t=(0,i.TL)(),s=async s=>{let n=s.credential;try{let s=await fetch("/api/google-login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_token:n})}),r=await s.json();if(200!==s.status){t((0,a.fz)({message:r.error,type:"error"})),setTimeout(()=>t((0,a.Qu)()),3e3);return}"message"in r&&(t((0,a.fz)({message:r.message,type:"success"})),t((0,l.QV)(r.account)),e.push("/dashboard"))}catch(e){t((0,a.fz)({message:"Something went wrong. Please try again.",type:"error"})),setTimeout(()=>t((0,a.Qu)()),3e3)}};return(0,n.jsx)(r.rg,{clientId:d,children:(0,n.jsx)("div",{className:"flex justify-center items-center w-full my-10",children:(0,n.jsx)(r.kZ,{onSuccess:s,onError:()=>{t((0,a.fz)({message:"Google Signin Error. Please try again.",type:"error"})),setTimeout(()=>t((0,a.Qu)()),3e3)},theme:"outline",size:"large",shape:"rectangular",text:"signin_with"})})})}},3595:function(e,t,s){"use strict";s.d(t,{LoginForm:function(){return p}});var n=s(7437),r=s(2265),o=s(6463),i=s(9381),a=s(7138),l=s(4245),u=s(1942),d=s(4297),c=s(8354),m=s(8440),f=s(4839);let g=l.Ry().shape({username:l.Z_().email("Invalid email format!").required("Email is required!"),password:l.Z_().required("Password is required !")}),_={username:"",password:""};function p(){let e=(0,o.useRouter)(),t=(0,d.TL)(),s=(0,i.TA)({initialValues:_,validationSchema:g,onSubmit:async n=>{let r=await fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}),o=await r.json();if(200!==r.status){t((0,c.fz)({message:o.error,type:"error"})),setTimeout(()=>t((0,c.Qu)()),3e3);return}"message"in o&&(t((0,c.fz)({message:o.message,type:"success"})),t((0,m.QV)(o.account)),s.resetForm(),e.push("/dashboard"))}}),[l,p]=(0,r.useState)(!1);return(0,n.jsxs)("div",{className:"flex flex-col justify-center px-6 lg:px-8 ",children:[(0,n.jsx)("div",{className:"sm:mx-auto sm:w-full sm:max-w-sm",children:(0,n.jsx)("h1",{className:"mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900",children:"Sign In"})}),(0,n.jsx)("div",{className:"mt-10 sm:mx-auto sm:w-full sm:max-w-sm",children:(0,n.jsxs)("form",{className:"space-y-6",onSubmit:s.handleSubmit,children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{htmlFor:"username",className:"block text-sm font-medium leading-6 text-gray-900",children:"Email address"}),(0,n.jsxs)("div",{className:"mt-2",children:[(0,n.jsx)("input",{id:"username",name:"username",type:"email",autoComplete:"off",value:s.values.username,onChange:s.handleChange,onBlur:s.handleBlur,className:(0,f.Z)("block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",{"border-2 border-red-500 bg-red-100 text-red-800":s.touched.username&&s.errors.username})}),s.errors.username&&s.touched.username&&(0,n.jsx)("p",{className:"text-red-500 ml-1 my-3",children:s.errors.username})]})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{className:"flex items-center justify-between",children:(0,n.jsx)("label",{htmlFor:"password",className:"block text-sm font-medium leading-6 text-gray-900",children:"Password"})}),(0,n.jsxs)("div",{className:"mt-2",children:[(0,n.jsxs)("section",{className:"flex items-center gap-3 relative",children:[(0,n.jsx)("input",{id:"password",name:"password",type:l?"text":"password",value:s.values.password,onChange:s.handleChange,onBlur:s.handleBlur,className:(0,f.Z)("block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",{"border-2 border-red-500 bg-red-100 text-red-800":s.touched.password&&s.errors.password})}),(0,n.jsx)("div",{className:(0,f.Z)("text-gray-300 absolute right-2 cursor-pointer",{"text-blue-800":l}),children:l?(0,n.jsx)(u.dSq,{size:25,onClick:()=>p(e=>!e)}):(0,n.jsx)(u.tgn,{size:25,onClick:()=>p(e=>!e)})})]}),s.errors.password&&s.touched.password&&(0,n.jsx)("p",{className:"text-red-500 ml-1 my-3",children:s.errors.password})]})]}),(0,n.jsxs)("section",{className:"flex flex-col lg:flex-row gap-y-3 lg:gap-y-0 justify-between items-end lg:items-center lg:justify-between",children:[(0,n.jsxs)("span",{className:"text-gray-600 order-2 lg:order-1",children:[(0,n.jsx)("span",{className:"mr-2",children:"Not a member?"}),(0,n.jsx)(a.default,{href:"/signup",className:"text-blue-700 hover:text-blue-500",children:"Sign Up"})]}),(0,n.jsx)("button",{type:"submit",className:"flex w-full order-1 lg:order-2 lg:w-fit justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",children:"sign in"})]})]})})]})}},1422:function(e,t,s){"use strict";s.d(t,{Yw:function(){return r},wL:function(){return n}});let n="990098268270-qu8llv8qmu44i9fpne01u2ugj8fg4j5r.apps.googleusercontent.com",r="'pk_live_51PUhFK08HSrizKfhEs0uCBtk3GYZsDDYgrfC3GSbw7NDq0Yx9i5ytb3jaJejAmnAbVE7l6jc1lvORjNcta3eS9yj00ZJW7whIC'STRIPE_PRICE_ID_PREMIUM_MONTH=price_1PWQ5f08HSrizKfhBQ3JiB1x"},2808:function(e,t,s){"use strict";var n=s(7437),r=s(1444),o=s(4297);t.default=e=>{let{children:t}=e;return(0,n.jsx)(r.zt,{store:o.w_,children:t})}},4297:function(e,t,s){"use strict";s.d(t,{w_:function(){return p},TL:function(){return x},CG:function(){return h}});var n=s(1444),r=s(9753),o=s(8440),i=s(8354),a=s(4459),l=s(4646),u=s(5585);let d=(0,r.oM)({name:"food_meal",initialState:{date:null},reducers:{setDate:(e,t)=>{e.date=t.payload},resetDate:e=>{e.date=null}}}),{setDate:c,resetDate:m}=d.actions;var f=d.reducer,g=s(2072),_=s(2035);s(2808);let p=(0,r.xC)({reducer:{toast:i.ZP,auth:o.ZP,food_meal:a.ZP,load:l.ZP,workout_exercise:u.ZP,date:f,latest_weight:g.ZP,license:_.ZP}}),x=n.I0,h=n.v9},8440:function(e,t,s){"use strict";s.d(t,{Li:function(){return o},QV:function(){return r}});let n=(0,s(9753).oM)({name:"auth",initialState:{account:null},reducers:{setAuth:(e,t)=>{e.account={id:t.payload.id,nickname:t.payload.nickname,username:t.payload.username}},resetAuth:e=>{e.account=null}}}),{setAuth:r,resetAuth:o}=n.actions;t.ZP=n.reducer},5585:function(e,t,s){"use strict";s.d(t,{AW:function(){return d},Gt:function(){return o},H3:function(){return f},N8:function(){return r},QK:function(){return c},c0:function(){return l},mE:function(){return a},nY:function(){return i},nw:function(){return m},zO:function(){return u}});let n=(0,s(9753).oM)({name:"workout_exercise",initialState:{used_workout:null,edit_exercise:null,select_workout_list:null,exercise_set_list:null,edit_exercise_pre:null},reducers:{setUsedWorkout:(e,t)=>{e.used_workout=t.payload},resetUsedWorkout:e=>{e.used_workout=null},setEditExercise:(e,t)=>{e.edit_exercise=t.payload},resetEditExercise:e=>{e.edit_exercise=null},setSelectWorkoutList:(e,t)=>{e.select_workout_list=t.payload},resetSelectWorkoutList:e=>{e.select_workout_list=null},setExerciseSetList:(e,t)=>{e.exercise_set_list=t.payload},resetExerciseSetList:e=>{e.exercise_set_list=null},setEditExercisePre:(e,t)=>{e.edit_exercise_pre=t.payload},resetEditExercisePre:e=>{e.edit_exercise_pre=null}}}),{setUsedWorkout:r,resetUsedWorkout:o,setEditExercise:i,resetEditExercise:a,setSelectWorkoutList:l,resetSelectWorkoutList:u,setExerciseSetList:d,resetExerciseSetList:c,setEditExercisePre:m,resetEditExercisePre:f}=n.actions;t.ZP=n.reducer},2072:function(e,t,s){"use strict";s.d(t,{HW:function(){return r}});let n=(0,s(9753).oM)({name:"latest_weight",initialState:{latest_weight:null},reducers:{setLatestWeight:(e,t)=>{e.latest_weight=t.payload},resetLatestweight:e=>{e.latest_weight=null}}}),{setLatestWeight:r,resetLatestweight:o}=n.actions;t.ZP=n.reducer},2035:function(e,t,s){"use strict";s.d(t,{BE:function(){return r}});let n=(0,s(9753).oM)({name:"license",initialState:{license:null},reducers:{setLicense:(e,t)=>{e.license=t.payload},resetLicense:e=>{e.license=null}}}),{setLicense:r,resetLicense:o}=n.actions;t.ZP=n.reducer},4646:function(e,t,s){"use strict";s.d(t,{Dv:function(){return f},OV:function(){return u},RO:function(){return m},Tr:function(){return r},ex:function(){return l},lc:function(){return d},ly:function(){return a},mH:function(){return c},wO:function(){return o},yP:function(){return i}});let n=(0,s(9753).oM)({name:"loading",initialState:{meal_loading:!1,often_food_loading:!1,history_food_loading:!1,custom_food_loading:!1,exercise_loading:!1,history_workout_loading:!1,custom_workout_loading:!1,often_workout_loading:!1,monster_loading:!1,set_loading:!1},reducers:{setMealLoading:(e,t)=>{e.meal_loading=t.payload},setOftenFoodLoading:(e,t)=>{e.often_food_loading=t.payload},setHistoryFoodLoading:(e,t)=>{e.history_food_loading=t.payload},setCustomFoodLoading:(e,t)=>{e.custom_food_loading=t.payload},setExerciseLoading:(e,t)=>{e.exercise_loading=t.payload},setHistoryWorkoutLoading:(e,t)=>{e.history_workout_loading=t.payload},setCustomWorkoutLoading:(e,t)=>{e.custom_workout_loading=t.payload},setOftenWorkoutLoading:(e,t)=>{e.often_workout_loading=t.payload},setMonsterLoading:(e,t)=>{e.monster_loading=t.payload},setSetLoading:(e,t)=>{e.set_loading=t.payload}}}),{setMealLoading:r,setOftenFoodLoading:o,setHistoryFoodLoading:i,setCustomFoodLoading:a,setExerciseLoading:l,setCustomWorkoutLoading:u,setHistoryWorkoutLoading:d,setOftenWorkoutLoading:c,setMonsterLoading:m,setSetLoading:f}=n.actions;t.ZP=n.reducer},4459:function(e,t,s){"use strict";s.d(t,{Fe:function(){return o},GA:function(){return i},Go:function(){return g},Jo:function(){return _},RR:function(){return d},Td:function(){return m},Xl:function(){return a},bI:function(){return f},km:function(){return l},wc:function(){return c},x9:function(){return r},zo:function(){return u}});let n=(0,s(9753).oM)({name:"food_meal",initialState:{used_food:null,edit_meal:null,used_fatsecret_food:null,select_food_list:null,meal_set_list:null,edit_meal_pre:null},reducers:{setUsedFood:(e,t)=>{e.used_food=t.payload},resetUsedFood:e=>{e.used_food=null},setEditMeal:(e,t)=>{e.edit_meal=t.payload},resetEditMeal:e=>{e.edit_meal=null},setUsedFatSecretFood:(e,t)=>{e.used_fatsecret_food=t.payload},resetUsedFatSecretFood:e=>{e.used_fatsecret_food=null},setSelectFoodList:(e,t)=>{e.select_food_list=t.payload},resetSelectFoodList:e=>{e.select_food_list=null},setMealSetList:(e,t)=>{e.meal_set_list=t.payload},resetMealSetList:e=>{e.meal_set_list=null},setEditMealPre:(e,t)=>{e.edit_meal_pre=t.payload},resetEditMealPre:e=>{e.edit_meal_pre=null}}}),{setUsedFood:r,resetUsedFood:o,setEditMeal:i,resetEditMeal:a,setUsedFatSecretFood:l,resetUsedFatSecretFood:u,setSelectFoodList:d,resetSelectFoodList:c,setMealSetList:m,resetMealSetList:f,setEditMealPre:g,resetEditMealPre:_}=n.actions;t.ZP=n.reducer},8354:function(e,t,s){"use strict";s.d(t,{Qu:function(){return a},fz:function(){return i}});var n=s(9753);let r={message:"",type:"info"},o=(0,n.oM)({name:"toast",initialState:r,reducers:{setToast:(e,t)=>{e.message=t.payload.message,e.type=t.payload.type},resetToast:e=>{e.message=r.message,e.type=r.type}}}),{setToast:i,resetToast:a}=o.actions;t.ZP=o.reducer}},function(e){e.O(0,[7699,7123,4349,231,5662,2971,7023,1744],function(){return e(e.s=1304)}),_N_E=e.O()}]);