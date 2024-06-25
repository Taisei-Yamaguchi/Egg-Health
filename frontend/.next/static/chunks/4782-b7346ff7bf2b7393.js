"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4782],{4858:function(t,e,r){r.d(e,{Z:function(){return M}});var n=r(1957),o=r(5211),i=function(){if("undefined"!=typeof window){if(window.devicePixelRatio)return window.devicePixelRatio;var t=window.screen;if(t)return(t.deviceXDPI||1)/(t.logicalXDPI||1)}return 1}(),a={toTextLines:function(t){var e,r=[];for(t=[].concat(t);t.length;)"string"==typeof(e=t.pop())?r.unshift.apply(r,e.split("\n")):Array.isArray(e)?t.push.apply(t,e):(0,n.k)(t)||r.unshift(""+e);return r},textSize:function(t,e,r){var n,o=[].concat(e),i=o.length,a=t.font,l=0;for(n=0,t.font=r.string;n<i;++n)l=Math.max(t.measureText(o[n]).width,l);return t.font=a,{height:i*r.lineHeight,width:l}},bound:function(t,e,r){return Math.max(t,Math.min(e,r))},arrayDiff:function(t,e){var r,n,o,i,a=t.slice(),l=[];for(r=0,o=e.length;r<o;++r)i=e[r],-1===(n=a.indexOf(i))?l.push([i,1]):a.splice(n,1);for(r=0,o=a.length;r<o;++r)l.push([a[r],-1]);return l},rasterize:function(t){return Math.round(t*i)/i}};function l(t,e){var r=e.x,n=e.y;if(null===r)return{x:0,y:-1};if(null===n)return{x:1,y:0};var o=t.x-r,i=t.y-n,a=Math.sqrt(o*o+i*i);return{x:a?o/a:0,y:a?i/a:-1}}function s(t,e,r){var n=0;return t<r.left?n|=1:t>r.right&&(n|=2),e<r.top?n|=8:e>r.bottom&&(n|=4),n}function c(t,e){var r,n,o=e.anchor,i=t;return e.clamp&&(i=function(t,e){for(var r,n,o,i=t.x0,a=t.y0,l=t.x1,c=t.y1,u=s(i,a,e),h=s(l,c,e);u|h&&!(u&h);)8&(r=u||h)?(n=i+(l-i)*(e.top-a)/(c-a),o=e.top):4&r?(n=i+(l-i)*(e.bottom-a)/(c-a),o=e.bottom):2&r?(o=a+(c-a)*(e.right-i)/(l-i),n=e.right):1&r&&(o=a+(c-a)*(e.left-i)/(l-i),n=e.left),r===u?u=s(i=n,a=o,e):h=s(l=n,c=o,e);return{x0:i,x1:l,y0:a,y1:c}}(i,e.area)),"start"===o?(r=i.x0,n=i.y0):"end"===o?(r=i.x1,n=i.y1):(r=(i.x0+i.x1)/2,n=(i.y0+i.y1)/2),function(t,e,r,n,o){switch(o){case"center":r=n=0;break;case"bottom":r=0,n=1;break;case"right":r=1,n=0;break;case"left":r=-1,n=0;break;case"top":r=0,n=-1;break;case"start":r=-r,n=-n;break;case"end":break;default:o*=Math.PI/180,r=Math.cos(o),n=Math.sin(o)}return{x:t,y:e,vx:r,vy:n}}(r,n,t.vx,t.vy,e.align)}var u={arc:function(t,e){var r=(t.startAngle+t.endAngle)/2,n=Math.cos(r),o=Math.sin(r),i=t.innerRadius,a=t.outerRadius;return c({x0:t.x+n*i,y0:t.y+o*i,x1:t.x+n*a,y1:t.y+o*a,vx:n,vy:o},e)},point:function(t,e){var r=l(t,e.origin),n=r.x*t.options.radius,o=r.y*t.options.radius;return c({x0:t.x-n,y0:t.y-o,x1:t.x+n,y1:t.y+o,vx:r.x,vy:r.y},e)},bar:function(t,e){var r=l(t,e.origin),n=t.x,o=t.y,i=0,a=0;return t.horizontal?(n=Math.min(t.x,t.base),i=Math.abs(t.base-t.x)):(o=Math.min(t.y,t.base),a=Math.abs(t.base-t.y)),c({x0:n,y0:o+a,x1:n+i,y1:o,vx:r.x,vy:r.y},e)},fallback:function(t,e){var r=l(t,e.origin);return c({x0:t.x,y0:t.y,x1:t.x+(t.width||0),y1:t.y+(t.height||0),vx:r.x,vy:r.y},e)}},h=a.rasterize,f=function(t,e,r,n){this._config=t,this._index=n,this._model=null,this._rects=null,this._ctx=e,this._el=r};(0,n.a4)(f.prototype,{_modelize:function(t,e,r,i){var l,s=this._index,c=(0,n.a0)((0,n.a)([r.font,{}],i,s)),h=(0,n.a)([r.color,n.d.color],i,s);return{align:(0,n.a)([r.align,"center"],i,s),anchor:(0,n.a)([r.anchor,"center"],i,s),area:i.chart.chartArea,backgroundColor:(0,n.a)([r.backgroundColor,null],i,s),borderColor:(0,n.a)([r.borderColor,null],i,s),borderRadius:(0,n.a)([r.borderRadius,0],i,s),borderWidth:(0,n.a)([r.borderWidth,0],i,s),clamp:(0,n.a)([r.clamp,!1],i,s),clip:(0,n.a)([r.clip,!1],i,s),color:h,display:t,font:c,lines:e,offset:(0,n.a)([r.offset,4],i,s),opacity:(0,n.a)([r.opacity,1],i,s),origin:function(t,e){var r=e.chart.getDatasetMeta(e.datasetIndex).vScale;if(!r)return null;if(void 0!==r.xCenter&&void 0!==r.yCenter)return{x:r.xCenter,y:r.yCenter};var n=r.getBasePixel();return t.horizontal?{x:n,y:null}:{x:null,y:n}}(this._el,i),padding:(0,n.E)((0,n.a)([r.padding,4],i,s)),positioner:(l=this._el)instanceof o.qi?u.arc:l instanceof o.od?u.point:l instanceof o.ZL?u.bar:u.fallback,rotation:(0,n.a)([r.rotation,0],i,s)*(Math.PI/180),size:a.textSize(this._ctx,e,c),textAlign:(0,n.a)([r.textAlign,"start"],i,s),textShadowBlur:(0,n.a)([r.textShadowBlur,0],i,s),textShadowColor:(0,n.a)([r.textShadowColor,h],i,s),textStrokeColor:(0,n.a)([r.textStrokeColor,h],i,s),textStrokeWidth:(0,n.a)([r.textStrokeWidth,0],i,s)}},update:function(t){var e,r,o,i,l,s,c,u,h,f,d=null,y=null,x=this._index,v=this._config,b=(0,n.a)([v.display,!0],t,x);b&&(e=t.dataset.data[x],r=(0,n.v)((0,n.Q)(v.formatter,[e,t]),e),(o=(0,n.k)(r)?[]:a.toTextLines(r)).length)&&(l=(i=d=this._modelize(b,o,v,t)).borderWidth||0,s=i.padding,c=i.size.height,h=-(u=i.size.width)/2,f=-c/2,y={frame:{x:h-s.left-l,y:f-s.top-l,w:u+s.width+2*l,h:c+s.height+2*l},text:{x:h,y:f,w:u,h:c}}),this._model=d,this._rects=y},geometry:function(){return this._rects?this._rects.frame:{}},rotation:function(){return this._model?this._model.rotation:0},visible:function(){return this._model&&this._model.opacity},model:function(){return this._model},draw:function(t,e){var r,n,o,i,l,s=t.ctx,c=this._model,u=this._rects;this.visible()&&(s.save(),c.clip&&(l=c.area,s.beginPath(),s.rect(l.left,l.top,l.right-l.left,l.bottom-l.top),s.clip()),s.globalAlpha=a.bound(0,c.opacity,1),s.translate(h(e.x),h(e.y)),s.rotate(c.rotation),r=u.frame,n=c.backgroundColor,o=c.borderColor,i=c.borderWidth,(n||o&&i)&&(s.beginPath(),function(t,e,r,n,o,i){var a=Math.PI/2;if(i){var l=Math.min(i,o/2,n/2),s=e+l,c=r+l,u=e+n-l,h=r+o-l;t.moveTo(e,c),s<u&&c<h?(t.arc(s,c,l,-Math.PI,-a),t.arc(u,c,l,-a,0),t.arc(u,h,l,0,a),t.arc(s,h,l,a,Math.PI)):s<u?(t.moveTo(s,r),t.arc(u,c,l,-a,a),t.arc(s,c,l,a,Math.PI+a)):c<h?(t.arc(s,c,l,-Math.PI,0),t.arc(s,h,l,0,Math.PI)):t.arc(s,c,l,-Math.PI,Math.PI),t.closePath(),t.moveTo(e,r)}else t.rect(e,r,n,o)}(s,h(r.x)+i/2,h(r.y)+i/2,h(r.w)-i,h(r.h)-i,c.borderRadius),s.closePath(),n&&(s.fillStyle=n,s.fill()),o&&i&&(s.strokeStyle=o,s.lineWidth=i,s.lineJoin="miter",s.stroke())),function(t,e,r,n){var o,i,a,l,s,c,u=n.textAlign,f=n.color,d=!!f,y=n.font,x=e.length,v=n.textStrokeColor,b=n.textStrokeWidth,p=v&&b;if(x&&(d||p))for(o=r,i=y.lineHeight,a=o.w,l=o.x,s=o.y+i/2,"center"===u?l+=a/2:("end"===u||"right"===u)&&(l+=a),r={h:i,w:a,x:l,y:s},t.font=y.string,t.textAlign=u,t.textBaseline="middle",t.shadowBlur=n.textShadowBlur,t.shadowColor=n.textShadowColor,d&&(t.fillStyle=f),p&&(t.lineJoin="round",t.lineWidth=b,t.strokeStyle=v),c=0,x=e.length;c<x;++c)!function(t,e,r){var n=t.shadowBlur,o=r.stroked,i=h(r.x),a=h(r.y),l=h(r.w);o&&t.strokeText(e,i,a,l),r.filled&&(n&&o&&(t.shadowBlur=0),t.fillText(e,i,a,l),n&&o&&(t.shadowBlur=n))}(t,e[c],{stroked:p,filled:d,w:r.w,x:r.x,y:r.y+r.h*c})}(s,c.lines,u.text,c),s.restore())}});var d=Number.MIN_SAFE_INTEGER||-9007199254740991,y=Number.MAX_SAFE_INTEGER||9007199254740991;function x(t,e,r){var n=Math.cos(r),o=Math.sin(r),i=e.x,a=e.y;return{x:i+n*(t.x-i)-o*(t.y-a),y:a+o*(t.x-i)+n*(t.y-a)}}function v(t,e){var r,n,o,i,a,l=y,s=d,c=e.origin;for(r=0;r<t.length;++r)o=(n=t[r]).x-c.x,i=n.y-c.y,l=Math.min(l,a=e.vx*o+e.vy*i),s=Math.max(s,a);return{min:l,max:s}}function b(t,e){var r=e.x-t.x,n=e.y-t.y,o=Math.sqrt(r*r+n*n);return{vx:(e.x-t.x)/o,vy:(e.y-t.y)/o,origin:t,ln:o}}var p=function(){this._rotation=0,this._rect={x:0,y:0,w:0,h:0}};function _(t,e,r){var n=e.positioner(t,e),o=n.vx,i=n.vy;if(!o&&!i)return{x:n.x,y:n.y};var a=r.w,l=r.h,s=e.rotation,c=Math.abs(a/2*Math.cos(s))+Math.abs(l/2*Math.sin(s)),u=Math.abs(a/2*Math.sin(s))+Math.abs(l/2*Math.cos(s)),h=1/Math.max(Math.abs(o),Math.abs(i));return c*=o*h,u*=i*h,c+=e.offset*o,u+=e.offset*i,{x:n.x+c,y:n.y+u}}(0,n.a4)(p.prototype,{center:function(){var t=this._rect;return{x:t.x+t.w/2,y:t.y+t.h/2}},update:function(t,e,r){this._rotation=r,this._rect={x:e.x+t.x,y:e.y+t.y,w:e.w,h:e.h}},contains:function(t){var e=this._rect;return!((t=x(t,this.center(),-this._rotation)).x<e.x-1||t.y<e.y-1||t.x>e.x+e.w+2||t.y>e.y+e.h+2)},intersects:function(t){var e,r,n,o=this._points(),i=t._points(),a=[b(o[0],o[1]),b(o[0],o[3])];for(this._rotation!==t._rotation&&a.push(b(i[0],i[1]),b(i[0],i[3])),e=0;e<a.length;++e)if(r=v(o,a[e]),n=v(i,a[e]),r.max<n.min||n.max<r.min)return!1;return!0},_points:function(){var t=this._rect,e=this._rotation,r=this.center();return[x({x:t.x,y:t.y},r,e),x({x:t.x+t.w,y:t.y},r,e),x({x:t.x+t.w,y:t.y+t.h},r,e),x({x:t.x,y:t.y+t.h},r,e)]}});var g={prepare:function(t){var e,r,n,o,i,a=[];for(e=0,n=t.length;e<n;++e)for(r=0,o=t[e].length;r<o;++r)i=t[e][r],a.push(i),i.$layout={_box:new p,_hidable:!1,_visible:!0,_set:e,_idx:i._index};return a.sort(function(t,e){var r=t.$layout,n=e.$layout;return r._idx===n._idx?n._set-r._set:n._idx-r._idx}),this.update(a),a},update:function(t){var e,r,n,o,i,a=!1;for(e=0,r=t.length;e<r;++e)o=(n=t[e]).model(),(i=n.$layout)._hidable=o&&"auto"===o.display,i._visible=n.visible(),a|=i._hidable;a&&function(t){var e,r,n,o,i,a,l;for(e=0,r=t.length;e<r;++e)(o=(n=t[e]).$layout)._visible&&(l=new Proxy(n._el,{get:(t,e)=>t.getProps([e],!0)[e]}),i=n.geometry(),a=_(l,n.model(),i),o._box.update(a,i,n.rotation()));!function(t,e){var r,n,o,i;for(r=t.length-1;r>=0;--r)for(o=t[r].$layout,n=r-1;n>=0&&o._visible;--n)(i=t[n].$layout)._visible&&o._box.intersects(i._box)&&e(o,i)}(t,function(t,e){var r=t._hidable,n=e._hidable;r&&n||n?e._visible=!1:r&&(t._visible=!1)})}(t)},lookup:function(t,e){var r,n;for(r=t.length-1;r>=0;--r)if((n=t[r].$layout)&&n._visible&&n._box.contains(e))return t[r];return null},draw:function(t,e){var r,n,o,i,a,l;for(r=0,n=e.length;r<n;++r)(i=(o=e[r]).$layout)._visible&&(a=o.geometry(),l=_(o._el,o.model(),a),i._box.update(l,a,o.rotation()),o.draw(t,l))}},m="$datalabels",w="$default";function k(t,e,r,o){if(e){var i,a=r.$context,l=r.$groups;e[l._set]&&(i=e[l._set][l._key])&&!0===(0,n.Q)(i,[a,o])&&(t[m]._dirty=!0,r.update(a))}}var M={id:"datalabels",defaults:{align:"center",anchor:"center",backgroundColor:null,borderColor:null,borderRadius:0,borderWidth:0,clamp:!1,clip:!1,color:void 0,display:!0,font:{family:void 0,lineHeight:1.2,size:void 0,style:void 0,weight:null},formatter:function(t){if((0,n.k)(t))return null;var e,r,o,i=t;if((0,n.i)(t)){if((0,n.k)(t.label)){if((0,n.k)(t.r))for(o=0,i="",r=(e=Object.keys(t)).length;o<r;++o)i+=(0!==o?", ":"")+e[o]+": "+t[e[o]];else i=t.r}else i=t.label}return""+i},labels:void 0,listeners:{},offset:4,opacity:1,padding:{top:4,right:4,bottom:4,left:4},rotation:0,textAlign:"start",textStrokeColor:void 0,textStrokeWidth:0,textShadowBlur:0,textShadowColor:void 0},beforeInit:function(t){t[m]={_actives:[]}},beforeUpdate:function(t){var e=t[m];e._listened=!1,e._listeners={},e._datasets=[],e._labels=[]},afterDatasetUpdate:function(t,e,r){var o,i,a,l,s,c,u,h,d,y,x,v,b,p,_=e.index,g=t[m],k=g._datasets[_]=[],M=t.isDatasetVisible(_),P=t.data.datasets[_],O=(o=r,l=P.datalabels,s={},c=[],!1===l?null:(!0===l&&(l={}),a=Object.keys(i=(o=(0,n.a4)({},[o,l])).labels||{}),delete o.labels,a.length?a.forEach(function(t){i[t]&&c.push((0,n.a4)({},[o,i[t],{_key:t}]))}):c.push(o),s=c.reduce(function(t,e){return(0,n.F)(e.listeners||{},function(r,n){t[n]=t[n]||{},t[n][e._key||w]=r}),delete e.listeners,t},{}),{labels:c,listeners:s})),S=e.meta.data||[],C=t.ctx;for(C.save(),u=0,d=S.length;u<d;++u)if((b=S[u])[m]=[],M&&b&&t.getDataVisibility(u)&&!b.skip)for(h=0,y=O.labels.length;h<y;++h)v=(x=O.labels[h])._key,(p=new f(x,C,b,u)).$groups={_set:_,_key:v||w},p.$context={active:!1,chart:t,dataIndex:u,dataset:P,datasetIndex:_},p.update(p.$context),b[m].push(p),k.push(p);C.restore(),(0,n.a4)(g._listeners,O.listeners,{merger:function(t,r,n){r[t]=r[t]||{},r[t][e.index]=n[t],g._listened=!0}})},afterUpdate:function(t){t[m]._labels=g.prepare(t[m]._datasets)},afterDatasetsDraw:function(t){g.draw(t,t[m]._labels)},beforeEvent:function(t,e){if(t[m]._listened){var r,n,o,i=e.event;switch(i.type){case"mousemove":case"mouseout":!function(t,e){var r,n,o,i,a,l=t[m],s=l._listeners;if(s.enter||s.leave){if("mousemove"===e.type)a=g.lookup(l._labels,e);else if("mouseout"!==e.type)return;i=l._hovered,l._hovered=a,r=a,(i||r)&&(i?r?i!==r&&(o=n=!0):o=!0:n=!0,o&&k(t,s.leave,i,e),n&&k(t,s.enter,r,e))}}(t,i);break;case"click":(o=(n=(r=t[m])._listeners.click)&&g.lookup(r._labels,i))&&k(t,n,o,i)}}},afterEvent:function(t){var e,r,n,o,i,l,s,c=t[m],u=c._actives,h=c._actives=t.getActiveElements(),f=a.arrayDiff(u,h);for(e=0,r=f.length;e<r;++e)if((i=f[e])[1])for(n=0,o=(s=i[0].element[m]||[]).length;n<o;++n)(l=s[n]).$context.active=1===i[1],l.update(l.$context);(c._dirty||f.length)&&(g.update(c._labels),t.render()),delete c._dirty}}},1810:function(t,e,r){r.d(e,{w_:function(){return u}});var n=r(2265),o={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},i=n.createContext&&n.createContext(o),a=["attr","size","title"];function l(){return(l=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t}).apply(this,arguments)}function s(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)}return r}function c(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?s(Object(r),!0).forEach(function(e){var n,o;n=e,o=r[e],(n=function(t){var e=function(t,e){if("object"!=typeof t||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,e||"default");if("object"!=typeof n)return n;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==typeof e?e:e+""}(n))in t?Object.defineProperty(t,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[n]=o}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function u(t){return e=>n.createElement(h,l({attr:c({},t.attr)},e),function t(e){return e&&e.map((e,r)=>n.createElement(e.tag,c({key:r},e.attr),t(e.child)))}(t.child))}function h(t){var e=e=>{var r,{attr:o,size:i,title:s}=t,u=function(t,e){if(null==t)return{};var r,n,o=function(t,e){if(null==t)return{};var r={};for(var n in t)if(Object.prototype.hasOwnProperty.call(t,n)){if(e.indexOf(n)>=0)continue;r[n]=t[n]}return r}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(n=0;n<i.length;n++)r=i[n],!(e.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(t,r)&&(o[r]=t[r])}return o}(t,a),h=i||e.size||"1em";return e.className&&(r=e.className),t.className&&(r=(r?r+" ":"")+t.className),n.createElement("svg",l({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},e.attr,o,u,{className:r,style:c(c({color:t.color||e.color},e.style),t.style),height:h,width:h,xmlns:"http://www.w3.org/2000/svg"}),s&&n.createElement("title",null,s),t.children)};return void 0!==i?n.createElement(i.Consumer,null,t=>e(t)):e(o)}}}]);