"use strict";(()=>{var e={};e.id=157,e.ids=[157],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},11565:(e,t,o)=>{o.r(t),o.d(t,{originalPathname:()=>x,patchFetch:()=>j,requestAsyncStorage:()=>f,routeModule:()=>m,serverHooks:()=>k,staticGenerationAsyncStorage:()=>b});var r={};o.r(r),o.d(r,{POST:()=>h});var n=o(49303),a=o(88716),i=o(60670),s=o(87070),u=o(81772),c=o(24330);o(60166);var p=o(97215),l=o(40618);let g=(0,c.j)("891fb05d628306cac988715beff5a26531bbd625",d);async function d(e){try{let t=await fetch(`${p.T5}/accounts/google-sign-in/`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e})});if(!t.ok)throw Error("Failed to authenticate with Django");return await t.json()}catch(e){return console.error("Google Login Error:",e),{error:"Failed to authenticate with Google"}}}async function h(e){let{id_token:t}=await e.json(),o=await g(t);if("error"in o)return s.NextResponse.json({error:o.error},{status:401});if("message"in o){let t="true"===p.yg,r=s.NextResponse.json({message:o.message,account:o.account});return(0,u.setCookie)("token",o.token,{req:e,res:r,httpOnly:!0,secure:t,maxAge:2592e3,path:"/"}),(0,u.setCookie)("nickname",o.account.nickname,{req:e,res:r,path:"/"}),(0,u.setCookie)("username",o.account.username,{req:e,res:r,path:"/"}),(0,u.setCookie)("id",o.account.id,{req:e,res:r,path:"/"}),(0,u.setCookie)("license",o.license,{req:e,res:r,path:"/"}),r}return s.NextResponse.json({error:"Unexpected error"},{status:500})}(0,l.h)([g]),(0,c.j)("9fc7eeea8890bd880bb66fb7993a58b5cb8eb32b",g);let m=new n.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/google-login/route",pathname:"/api/google-login",filename:"route",bundlePath:"app/api/google-login/route"},resolvedPagePath:"/Users/taisei_yamaguchi/Desktop/Egg-Health/frontend/src/app/api/google-login/route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:f,staticGenerationAsyncStorage:b,serverHooks:k}=m,x="/api/google-login/route";function j(){return(0,i.patchFetch)({serverHooks:k,staticGenerationAsyncStorage:b})}},97215:(e,t,o)=>{o.d(t,{T5:()=>r,yg:()=>n});let r="https://wellnessmons.com/backend",n="true"}};var t=require("../../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),r=t.X(0,[8948,4209,7879],()=>o(11565));module.exports=r})();