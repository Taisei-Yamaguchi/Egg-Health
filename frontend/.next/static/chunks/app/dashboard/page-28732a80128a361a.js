(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7702],{6807:function(e,s,t){Promise.resolve().then(t.bind(t,5815))},5815:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return B}});var r=t(7437),a=t(2265),l=t(1942),n=t(6463),c=t(2322),i=t(624);t(4590);var o=t(8064),d=(0,o.$)("bb2e7d366530e2ee692c077ffd05216c1104cf7b"),x=(0,o.$)("f57a34ec462674618cf965300839d90e1b419145"),m=t(4297),u=t(8354),h=e=>{let{date:s}=e,t=(0,m.TL)(),o=(0,n.useRouter)(),[d,h]=(0,a.useState)(null),g=[{name:"Breakfast",icon:(0,r.jsx)(l.Mei,{}),path:"/dashboard/meal/Breakfast/".concat(s),check:"check_breakfast"},{name:"Lunch",icon:(0,r.jsx)(l.mMb,{}),path:"/dashboard/meal/Lunch/".concat(s),check:"check_lunch"},{name:"Dinner",icon:(0,r.jsx)(l.TLr,{}),path:"/dashboard/meal/Dinner/".concat(s),check:"check_dinner"},{name:"Snack",icon:(0,r.jsx)(l.EKJ,{}),path:"/dashboard/meal/Snack/".concat(s),check:"check_snack"},{name:"Exercise",icon:(0,r.jsx)(l.EaM,{}),path:"/dashboard/exercise/".concat(s),check:"check_exercise"}],f=(0,c.WU)((0,i.D)(s),"yyyy, MMMM do");return(0,a.useEffect)(()=>{(async()=>{try{let e=await x(s);"error"in e?(t((0,u.fz)({message:e.error,type:"error"})),setTimeout(()=>t((0,u.Qu)()),3e3)):"message"in e&&h(e.data)}catch(e){t((0,u.fz)({message:"An error occurred while fetching Input status.",type:"error"})),setTimeout(()=>t((0,u.Qu)()),3e3)}})()},[s,t]),(0,r.jsxs)("div",{className:"max-w-lg mx-auto mt-4 p-4 bg-yellow-100 rounded-lg shadow-md",children:[(0,r.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[(0,r.jsx)("button",{onClick:()=>o.push("/dashboard/record/".concat(s)),className:"hover:scale-105 px-2 py-1 bg-green-300 text-green-800 rounded-md shadow-sm text-sm",children:"Today's Record"}),(0,r.jsx)("span",{className:"text-md font-semibold",children:f})]}),(0,r.jsx)("div",{className:"flex justify-between",children:g.map((e,s)=>(0,r.jsxs)("button",{onClick:()=>o.push(e.path),className:"relative flex flex-col items-center p-2 bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-lg shadow-lg w-1/5 mx-1 transform hover:scale-105 transition-transform",children:[(0,r.jsx)("div",{className:"text-2xl mb-1 max-sm:text-base",children:e.icon}),(0,r.jsx)("div",{className:"text-sm font-semibold max-sm:text-[10px]",children:e.name}),d&&d[e.check]&&(0,r.jsx)(l.l_A,{className:"absolute top-1 right-1 text-white bg-green-500 rounded-full p-1 text-xs"})]},s))})]})},g=t(355),f=t(9130),b=t(7333),j=t(9044),w=t(2469),p=t(3107),y=t(6717),N=t(343),v=t(5062),k=t(4192),_=t(3831),M=t(3275),E=t(2781),T=e=>{let{currentDate:s}=e,t=(0,m.TL)(),n=(0,g._Y)((0,i.D)(s)),[c,o]=(0,a.useState)((0,w.N)(n)),[x,h]=(0,a.useState)(n),[f,b]=(0,a.useState)([]);(0,a.useEffect)(()=>{(async()=>{let e=(0,g.kh)(c,"yyyy-MM");try{let s=await d(e);"error"in s?(t((0,u.fz)({message:s.error,type:"error"})),setTimeout(()=>t((0,u.Qu)()),3e3)):"message"in s&&b(s.data)}catch(e){t((0,u.fz)({message:"An error occurred while fetching input status.",type:"error"})),setTimeout(()=>t((0,u.Qu)()),3e3)}})()},[c,t]),(0,a.useEffect)(()=>{o((0,w.N)(n))},[n]);let j=()=>{let e=(0,p.z)(c,1);(0,y.A)(e,n)||o(e)},T=()=>{let e=(0,N.W)(c,1);(0,v.R)(e,(0,N.W)(n,3))||o(e)};return(0,r.jsxs)("div",{className:"mx-auto mt-4 p-4 bg-white rounded-lg shadow-md h-full w-[350px]",children:[(()=>{let e=!(0,v.R)((0,p.z)(c,1),n),s=!(0,y.A)((0,N.W)(c,1),(0,N.W)(n,3));return(0,r.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[!s&&(0,r.jsx)("button",{onClick:T,className:"hover:scale-105 px-2 py-1 bg-green-300 text-green-800 rounded-md shadow-sm text-xs",children:"Previous"}),(0,r.jsx)("div",{className:"text-md font-semibold",children:(0,g.kh)(c,"yyyy MMMM")}),!e&&(0,r.jsx)("button",{onClick:j,className:" hover:scale-105 px-2 py-1 bg-green-300 text-green-800 rounded-md shadow-sm text-xs",children:"Next"})]})})(),(0,r.jsxs)("div",{className:"flex justify-between items-center mb-2 font-semibold text-xs",children:[(0,r.jsx)("span",{className:"w-1/5 text-left pl-2",children:"Date"}),(0,r.jsx)("span",{className:"w-1/10 text-center",children:"Meal"}),(0,r.jsx)("span",{className:"w-1/10 text-center",children:"Exercise"}),(0,r.jsx)("span",{className:"w-1/10 text-center",children:"Weight"}),(0,r.jsx)("span",{className:"w-1/5 text-center",children:"Record"})]}),(()=>{let e=(0,w.N)(c),s=(0,k.V)(e),t=[],a=e;for(;a<=s;){let e=(0,g.kh)(a,"yyyy-MM-dd"),s=f.find(s=>s.date===e),c=(0,_.j)(a,n)>1;t.push((0,r.jsxs)("div",{className:"flex justify-between items-center py-1 ".concat((0,M.K)(a,n)?"bg-yellow-300":""),onClick:()=>!c&&h(a),children:[(0,r.jsx)("span",{className:"w-1/5 text-left text-xs pl-2 ".concat(c?"text-gray-400":""),children:(0,g.kh)(a,"d (EEE)")}),(0,r.jsx)("span",{className:"w-1/10 text-center text-xs ".concat(c?"text-gray-400":""," flex justify-center items-center"),children:(null==s?void 0:s.meal)?(0,r.jsx)(l.l_A,{className:"text-green-500"}):"-"}),(0,r.jsx)("span",{className:"w-1/10 text-center text-xs ".concat(c?"text-gray-400":""," flex justify-center items-center"),children:(null==s?void 0:s.exercise)?(0,r.jsx)(l.l_A,{className:"text-green-500"}):"-"}),(0,r.jsx)("span",{className:"w-1/10 text-center text-xs ".concat(c?"text-gray-400":""," flex justify-center items-center"),children:(null==s?void 0:s.weight)?(0,r.jsx)(l.l_A,{className:"text-green-500"}):"-"}),(0,r.jsx)("span",{className:"w-1/5 text-center text-xs ".concat(c?"text-gray-400":""),children:c?"-":(0,r.jsx)("a",{href:"/dashboard/record/".concat(e),className:"text-blue-500 hover:text-blue-700 transition-colors",children:"record"})})]},a.toString())),a=(0,E.E)(a,1)}return(0,r.jsx)("div",{children:t})})()]})},z=t(3054),C=t(1408),S=e=>{let{goal:s}=e;(0,n.useRouter)();let t=(0,m.TL)(),[c,i]=(0,a.useState)(null),[o,d]=(0,a.useState)(null),[x,h]=(0,a.useState)("lbs");(0,a.useEffect)(()=>{(async()=>{try{let e=await (0,z.V)();"error"in e?(t((0,u.fz)({message:e.error,type:"error"})),setTimeout(()=>t((0,u.Qu)()),3e3)):"message"in e&&i(e.data)}catch(e){t((0,u.fz)({message:"An error occurred while fetching BMR data",type:"error"})),setTimeout(()=>t((0,u.Qu)()),3e3)}})()},[t]),(0,a.useEffect)(()=>{(async()=>{try{let e=await (0,C.g)();"error"in e?(t((0,u.fz)({message:e.error,type:"error"})),setTimeout(()=>t((0,u.Qu)()),3e3)):"message"in e&&d(e.data)}catch(e){t((0,u.fz)({message:"An error occurred while fetching weight data",type:"error"})),setTimeout(()=>t((0,u.Qu)()),3e3)}})()},[t]);let g=(e,s)=>"kg"===s?e.toFixed(1):(2.20462*e).toFixed(0);return(0,r.jsx)("div",{className:"max-w-xl mx-auto mt-4 p-4 bg-yellow-50 rounded-lg shadow-md text-sm",children:s&&null!==s.goal_weight&&null!==o&&null!==c?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"text-center py-2",children:[(0,r.jsx)("a",{href:"/dashboard/personal-details/",className:"text-blue-500 underline text-sm mx-2",children:"Edit your Personal Details"}),(0,r.jsx)("a",{href:"/dashboard/goal/",className:"text-blue-500 underline text-sm mx-2",children:"Edit your Goal"})]}),(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-2 text-sm",children:[(0,r.jsxs)("div",{className:"bg-white p-2 rounded-lg shadow-md flex flex-col items-center",children:[(0,r.jsx)("div",{className:"font-semibold",children:"Current Weight"}),(0,r.jsxs)("div",{className:"text-lg font-bold",children:["kg"===x?o:parseFloat(g(o,"lbs"))," ",x]})]}),(0,r.jsxs)("div",{className:"bg-white p-2 rounded-lg shadow-md flex flex-col items-center",children:[(0,r.jsx)("div",{className:"font-semibold",children:"Goal Weight"}),(0,r.jsxs)("div",{className:"text-lg font-bold",children:["kg"===x?s.goal_weight:s.goal_weight?parseFloat(g(s.goal_weight,"lbs")):"-"," ",x]})]}),(0,r.jsxs)("div",{className:"bg-white p-2 rounded-lg shadow-md flex flex-col items-center",children:[(0,r.jsx)("div",{className:"font-semibold",children:"Activity Level"}),(0,r.jsxs)("div",{className:"flex items-center",children:[(0,r.jsx)("div",{children:(e=>{switch(e){case"very low":return(0,r.jsx)(l.BLk,{className:"w-6 h-6 mr-2 text-green-600"});case"low":return(0,r.jsx)(l.EaM,{className:"w-6 h-6 mr-2 text-green-600"});case"middle":return(0,r.jsx)(l.ee,{className:"w-6 h-6 mr-2 text-green-600"});case"high":return(0,r.jsx)(l.w4S,{className:"w-6 h-6 mr-2 text-green-600"});case"very high":return(0,r.jsx)(l.rcG,{className:"w-6 h-6 mr-2 text-green-600"});default:return(0,r.jsx)(l.F9M,{className:"w-6 h-6 mr-2 text-green-600"})}})(c.active_level)}),(0,r.jsx)("div",{className:"text-lg font-bold",children:(e=>{switch(e){case"very low":return"No Exercise";case"low":return"Rare Exercise";case"middle":return"Moderate Exercise";case"high":return"Frequent Exercise";case"very high":return"Daily Exercise";default:return"Unknown"}})(c.active_level)})]})]}),(0,r.jsxs)("div",{className:"bg-white p-2 rounded-lg shadow-md flex flex-col items-center",children:[(0,r.jsx)("div",{className:"font-semibold",children:"BMR"}),(0,r.jsxs)("div",{className:"text-lg font-bold",children:[Math.round(c.bmr)," kcal"]})]})]}),(0,r.jsx)("div",{className:"text-center mt-4",children:(0,r.jsxs)("button",{type:"button",onClick:()=>{h(e=>"kg"===e?"lbs":"kg")},className:"ml-2 p-1 border border-indigo-600 shadow-sm text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:["show in ","kg"===x?"lbs":"kg"]})})]}):(0,r.jsxs)("div",{className:"text-center py-2 flex flex-col ",children:[(0,r.jsx)("a",{href:"/dashboard/personal-details/",className:"text-blue-500 underline text-2xl mb-4 hover:scale-105",children:"Set your Personal Details!"}),(0,r.jsx)("a",{href:"/dashboard/goal/",className:"text-blue-500 underline text-2xl hover:scale-105",children:"Set your Goal!"})]})})},R=t(8581),A=e=>{let{monsterRes:s}=e,t=(()=>{if(!s)return"/images/1-egg.png";let{monster:e,selected_stage:t}=s,r="1-";switch(e.monster_type){case"Premium":r="2-";break;case"Cat":r="3-";break;default:r="1-"}if(e.grow_points>=600)switch(t){case 0:default:return"/images/".concat(r,"egg.png");case 1:return"/images/".concat(r,"baby.png");case 2:return"/images/".concat(r,"young.png");case 3:return"/images/".concat(r,"adolescent.png");case 4:return"/images/".concat(r,"adult.png");case 5:return"/images/".concat(r,"final.png")}if(e.grow_points<100);else if(e.grow_points<200)return"/images/".concat(r,"baby.png");else if(e.grow_points<300)return"/images/".concat(r,"young.png");else if(e.grow_points<400)return"/images/".concat(r,"adolescent.png");else if(e.grow_points<500)return"/images/".concat(r,"adult.png");else if(e.grow_points<600)return"/images/".concat(r,"final.png");return"/images/".concat(r,"egg.png")})();return(0,r.jsxs)("div",{className:"max-w-[300px] mx-auto mt-4 p-4 bg-yellow-50 rounded-lg shadow-md text-sm",children:[(0,r.jsx)("img",{src:t,alt:"Monster",className:"mx-auto"}),s&&(0,r.jsxs)("div",{className:"flex flex-col items-center",children:[(0,r.jsxs)("p",{className:"text-sm font-semibold",children:[" ",s.monster.monster_type]}),(0,r.jsx)(R.Z,{grow_points:s.monster.grow_points})]})]})},W=(0,o.$)("0bd1b33ae9815055e2e27b003303518177317590"),Q=(0,o.$)("809d41713c2eae8caf6d26cb0eeed4470a32f0e9"),F=t(4646),Z=e=>{let{monsterRes:s}=e,t=(0,m.TL)(),a=async()=>{if(!s)return;let e=(s.selected_stage+1)%6;try{t((0,F.RO)(!0));let s=await Q({selected_stage:e});"error"in s?t((0,u.fz)({message:s.error,type:"error"})):t((0,u.fz)({message:"Monster stage updated successfully!",type:"success"})),setTimeout(()=>t((0,u.Qu)()),3e3)}catch(e){t((0,u.fz)({message:"An error occurred while updating monster stage",type:"error"})),setTimeout(()=>t((0,u.Qu)()),3e3)}finally{t((0,F.RO)(!1))}};return!s||s.monster.grow_points<600?null:(0,r.jsx)("button",{onClick:a,className:"bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600 text-[10px] m-2",children:"Change Stage"})},L=t(1394),D=t(8062);function B(){let e=(0,m.TL)(),s=(0,g.W6)(),[t,l]=(0,a.useState)(null),[n,c]=(0,a.useState)(null),i=(0,m.CG)(e=>e.load.monster_loading);return(0,a.useEffect)(()=>{(async()=>{try{let s=await W();"error"in s?(e((0,u.fz)({message:s.error,type:"error"})),setTimeout(()=>e((0,u.Qu)()),3e3)):"message"in s&&c(s.data)}catch(s){console.error("Error fetching data:",s),e((0,u.fz)({message:"An error occurred while fetching monster data",type:"error"})),setTimeout(()=>e((0,u.Qu)()),3e3)}})()},[e,i]),(0,a.useEffect)(()=>{(0,j.V)().then(s=>{"error"in s?(e((0,u.fz)({message:s.error,type:"error"})),setTimeout(()=>e((0,u.Qu)()),3e3)):"message"in s&&l(s.data)}).catch(s=>{console.error("Error fetching goal data:",s),e((0,u.fz)({message:"An error occurred while fetching goal",type:"error"})),setTimeout(()=>e((0,u.Qu)()),3e3)})},[e]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"flex justify-center mt-6 w-full border",children:(0,r.jsxs)("div",{className:"w-full flex flex-row items-center max-lg:flex-col",children:[(0,r.jsxs)("div",{className:"p-4 bg-yellow-100 rounded-lg shadow-md mb-4 w-full flex max-md:flex-col-reverse max-md:items-center",children:[(0,r.jsxs)("div",{className:"w-3/4 max-md:w-full",children:[(0,r.jsx)(S,{goal:t}),(0,r.jsx)(h,{date:s}),(0,r.jsx)(b.Z,{date:s,goal:t})]}),(0,r.jsxs)("div",{className:"w-1/2 max-md:w-full flex items-center self-start md:flex-col",children:[(0,r.jsxs)("div",{className:"w-full max-md:w-1/2 max-md:self-start",children:[(0,r.jsx)(A,{monsterRes:n}),(0,r.jsx)(Z,{monsterRes:n}),(0,r.jsxs)("div",{className:"flex gap-2 max-lg:flex-col items-center",children:[(0,r.jsx)("button",{className:" border-b text-purple-600 hover:text-purple-400",children:(0,r.jsx)("a",{className:"text-xs",href:"/dashboard/monsters",children:"Monsters list"})}),(0,r.jsx)(D.Z,{})]})]}),(0,r.jsx)("div",{className:"w-1/2 h-[150px] mx-1 md:w-full max-md:h-3/4",children:(0,r.jsx)(L.Z,{})})]})]}),(0,r.jsxs)("div",{className:"flex lg:flex-col max-lg:w-full border justify-between",children:[(0,r.jsx)("div",{className:"ml-4 max-lg:w-1/2 h-[200px] w-[300px] max-lg:h-[150px]",children:(0,r.jsx)(L.Z,{})}),(0,r.jsx)("div",{className:"ml-4 max-lg:w-1/2 h-[200px] w-[300px] max-lg:h-[150px]",children:(0,r.jsx)(L.Z,{})})]})]})}),(0,r.jsxs)("div",{className:"p-4 bg-yellow-100 rounded-lg shadow-md mb-4 w-full flex max-md:flex-col",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"text-center py-2",children:(0,r.jsx)("a",{href:"/dashboard/graph/weight",className:"text-blue-500 underline text-sm",children:"See more graphs"})}),(0,r.jsx)(f.default,{})]}),(0,r.jsx)(T,{currentDate:s})]}),(0,r.jsxs)("div",{className:"flex",children:[(0,r.jsx)("div",{className:"w-1/3 h-[180px] max-sm:w-1/2 border",children:(0,r.jsx)(L.Z,{})}),(0,r.jsx)("div",{className:"w-1/3 h-[180px] max-sm:w-1/2 border",children:(0,r.jsx)(L.Z,{})})]})]})}},3054:function(e,s,t){"use strict";t.d(s,{V:function(){return r}}),t(4590);var r=(0,t(8064).$)("3b90bc0be11b469df52a91c0564cd25f615ff5cf")},5116:function(e,s,t){"use strict";t.d(s,{q:function(){return r}}),t(4590);var r=(0,t(8064).$)("e00845c7b15f0a1c05269c75f8f7898eaadb5328")},1408:function(e,s,t){"use strict";t.d(s,{g:function(){return r}}),t(4590);var r=(0,t(8064).$)("892cc758dd7498b095fd597cd94936f3e8e8c661")},1394:function(e,s,t){"use strict";var r=t(7437);s.Z=()=>(0,r.jsx)("div",{className:"w-full h-full bg-red-50 flex items-center justify-center border",children:(0,r.jsx)("p",{children:"Advertisements"})})},8581:function(e,s,t){"use strict";var r=t(7437);t(2265),s.Z=e=>{let{grow_points:s}=e,t=s>=600;return(0,r.jsxs)("div",{className:"flex items-center space-x-2 w-full",children:[(0,r.jsx)("div",{className:"w-full bg-gray-200 rounded-full h-4",children:(0,r.jsx)("div",{className:"h-4 rounded-full ".concat(t?"bg-yellow-300":"bg-green-200"),style:{width:"".concat(t?100:Math.min(s%100/100*100,100),"%")}})}),(0,r.jsx)("span",{className:"text-base font-medium",children:t?"Max":"Lv.".concat(Math.min(Math.floor(s/100),6)+1)})]})}},8062:function(e,s,t){"use strict";var r=t(7437),a=t(2265),l=t(1942);s.Z=()=>{let[e,s]=(0,a.useState)(!1),t=()=>s(!1);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("button",{type:"button",onClick:()=>s(!0),className:"border-b text-purple-600 hover:text-purple-400 text-xs",children:"* Monster Growth Rules"}),e&&(0,r.jsxs)("div",{className:"fixed inset-0 flex items-center justify-center z-50",children:[(0,r.jsx)("div",{className:"fixed inset-0 bg-black opacity-50",onClick:t}),(0,r.jsxs)("div",{className:"bg-white rounded-lg shadow-lg p-6 z-10 relative w-3/4",children:[(0,r.jsx)("button",{onClick:t,className:"absolute top-2 right-2 text-gray-500",children:(0,r.jsx)(l.aHS,{className:"text-xl"})}),(0,r.jsx)("h1",{className:"text-xl font-bold m-4",children:"Monster Growth Rules"}),(0,r.jsx)("div",{className:"text-base text-gray-500",children:(0,r.jsxs)("ul",{children:[(0,r.jsx)("li",{children:"1. Monsters grow based on your daily inputs."}),(0,r.jsx)("li",{children:"2. The closer your records are to your goal intake and goal burn calories, the more your monster will grow."}),(0,r.jsx)("li",{children:"3. The currently selected monster will grow with your progress."}),(0,r.jsx)("li",{children:"4. If you want to grow different monsters, unlock and select new ones from the monster list (Premium+ plan)."}),(0,r.jsx)("li",{children:"5. Each monster goes through 6 growth stages."}),(0,r.jsx)("li",{children:"6. Once a monster reaches its maximum level, you can freely change its appearance to any of its growth stages on the dashboard!"})]})})]})]})]})}},3112:function(e,s,t){"use strict";var r=t(7437),a=t(2265),l=t(1942);s.Z=()=>{let[e,s]=(0,a.useState)(!1),t=()=>s(!0),n=()=>s(!1);return e?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("button",{type:"button",onClick:t,className:"text-gray-700 text-xs hover:border-b border-color-black ml-4",children:"How do we handle calories?"}),(0,r.jsxs)("div",{className:"fixed inset-0 flex items-center justify-center z-50",children:[(0,r.jsx)("div",{className:"fixed inset-0 bg-black opacity-50",onClick:n}),(0,r.jsxs)("div",{className:"bg-white rounded-lg shadow-lg p-6 z-10 relative w-3/4",children:[(0,r.jsx)("h1",{className:"text-xl font-bold m-4",children:"How do we handle calories?"}),(0,r.jsx)("button",{onClick:n,className:"absolute top-2 right-2 text-gray-500",children:(0,r.jsx)(l.aHS,{className:"text-xl"})}),(0,r.jsxs)("div",{className:"text-xs text-gray-500",children:[(0,r.jsx)("p",{children:"1. Calorie intake is calculated from your meal data."}),(0,r.jsx)("p",{children:"2. Calorie burn is the sum of BMR (Basal Metabolic Rate), other calories (calculated from BMR and active level), TEF (Thermic Effect of Food), and exercise calories (calories burned from daily exercise records)."}),(0,r.jsx)("p",{children:"3. Try to bring these values closer to your goals!"})]})]})]})]}):(0,r.jsx)("button",{type:"button",onClick:t,className:"text-gray-700 text-xs hover:border-b border-color-black ml-4",children:"How do we handle calories?"})}},355:function(e,s,t){"use strict";t.d(s,{W6:function(){return l},_Y:function(){return n},kh:function(){return c}});var r=t(1553);let a="America/New_York";function l(){let e=new Date,s=(0,r.zW)(e,a);return(0,r.WU)(s,"yyyy-MM-dd")}function n(e){return(0,r.zW)(e,a)}function c(e,s){let t=(0,r.zW)(e,a);return(0,r.WU)(t,s)}}},function(e){e.O(0,[7699,7674,7123,5329,8048,5759,1217,588,9130,2971,7023,1744],function(){return e(e.s=6807)}),_N_E=e.O()}]);