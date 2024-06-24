(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3241],{8862:function(e,t,l){Promise.resolve().then(l.bind(l,7874))},7874:function(e,t,l){"use strict";var i=l(7437),s=l(2265),n=l(9381),a=l(4245);t.default=()=>{let[e,t]=(0,s.useState)(null),[l,h]=(0,s.useState)(null),r=(0,n.TA)({initialValues:{weight:"",height:"",weightUnit:"kg",heightUnit:"cm"},validationSchema:a.Ry({weight:a.Rx().required("This value is required.").positive("Must be greater than zero."),height:a.Rx().required("This value is required.").positive("Must be greater than zero.")}),onSubmit:e=>{let l=Number(e.weight),i=Number(e.height);"lb"===e.weightUnit&&(l*=.453592),"ft"===e.heightUnit&&(i*=30.48);let s=i/100,n=l/(s*s);t(n),n<18.5?h("Underweight"):n<24.9?h("Normal weight"):n<29.9?h("Overweight"):h("Obesity")}});return(0,i.jsxs)("div",{className:"max-w-xl mx-auto p-6 mt-4 bg-white rounded-lg shadow-md text-left",children:[(0,i.jsx)("h2",{className:"text-2xl font-bold mb-4",children:"BMI Calculator"}),(0,i.jsxs)("form",{onSubmit:r.handleSubmit,children:[(0,i.jsxs)("div",{className:"mb-4",children:[(0,i.jsx)("label",{className:"block mb-2",children:"Weight"}),(0,i.jsxs)("div",{className:"flex",children:[(0,i.jsx)("input",{type:"text",name:"weight",onChange:r.handleChange,onBlur:r.handleBlur,value:r.values.weight,className:"border p-2 rounded-l w-full"}),(0,i.jsxs)("select",{name:"weightUnit",onChange:r.handleChange,value:r.values.weightUnit,className:"border p-2 rounded-r",children:[(0,i.jsx)("option",{value:"kg",children:"kg"}),(0,i.jsx)("option",{value:"lb",children:"lb"})]})]}),r.touched.weight&&r.errors.weight?(0,i.jsx)("div",{className:"text-red-500 text-xs mt-1",children:r.errors.weight}):null]}),(0,i.jsxs)("div",{className:"mb-4",children:[(0,i.jsx)("label",{className:"block mb-2",children:"Height"}),(0,i.jsxs)("div",{className:"flex",children:[(0,i.jsx)("input",{type:"text",name:"height",onChange:r.handleChange,onBlur:r.handleBlur,value:r.values.height,className:"border p-2 rounded-l w-full"}),(0,i.jsxs)("select",{name:"heightUnit",onChange:r.handleChange,value:r.values.heightUnit,className:"border p-2 rounded-r",children:[(0,i.jsx)("option",{value:"cm",children:"cm"}),(0,i.jsx)("option",{value:"ft",children:"ft"})]})]}),r.touched.height&&r.errors.height?(0,i.jsx)("div",{className:"text-red-500 text-xs mt-1",children:r.errors.height}):null]}),(0,i.jsx)("button",{type:"submit",className:"bg-blue-500 text-white p-2 rounded",children:"Calculate BMI"})]}),null!==e&&(0,i.jsxs)("div",{className:"mt-4 p-4 bg-gray-100 rounded",children:[(0,i.jsx)("h3",{className:"text-lg font-bold",children:"Your Predicted BMI is"}),(0,i.jsx)("p",{children:e.toFixed(2)}),(0,i.jsxs)("p",{children:["Category: ",l]})]})]})}}},function(e){e.O(0,[4349,2971,7023,1744],function(){return e(e.s=8862)}),_N_E=e.O()}]);