import{r as t,c as s,d as i,h as e,e as o}from"./p-70082a31.js";import{b as r}from"./p-1074393c.js";import{d as n,b as a,c as h}from"./p-94c4865f.js";import{b as c}from"./p-c90aaa66.js";import{a as u}from"./p-00265c49.js";import{l as d,t as v,s as l}from"./p-a74bc4d9.js";const p=1,m=2,f=3;class w{constructor(t,s){this.component=t,this.params=s,this.state=p}async init(t){if(this.state=m,!this.element){const s=this.component;this.element=await u(this.delegate,t,s,["ion-page","ion-page-invisible"],this.params)}}_destroy(){c(this.state!==f,"view state must be ATTACHED");const t=this.element;t&&(this.delegate?this.delegate.removeViewFromDom(t.parentElement,t):t.remove()),this.nav=void 0,this.state=f}}const g=(t,s,i)=>{if(!t)return!1;if(t.component!==s)return!1;const e=t.params;if(e===i)return!0;if(!e&&!i)return!0;if(!e||!i)return!1;const o=Object.keys(e),r=Object.keys(i);if(o.length!==r.length)return!1;for(const t of o)if(e[t]!==i[t])return!1;return!0},b=(t,s)=>t?t instanceof w?t:new w(t,s):null,y=t=>t.map(t=>t instanceof w?t:"page"in t?b(t.page,t.params):b(t,void 0)).filter(t=>null!==t);class k{constructor(i){t(this,i),this.transInstr=[],this.useRouter=!1,this.isTransitioning=!1,this.destroyed=!1,this.views=[],this.animated=!0,this.ionNavWillLoad=s(this,"ionNavWillLoad",7),this.ionNavWillChange=s(this,"ionNavWillChange",3),this.ionNavDidChange=s(this,"ionNavDidChange",3)}swipeGestureChanged(){this.gesture&&this.gesture.setDisabled(!0!==this.swipeGesture)}rootChanged(){void 0!==this.root&&(this.useRouter||this.setRoot(this.root,this.rootParams))}componentWillLoad(){if(this.useRouter=!!document.querySelector("ion-router")&&!this.el.closest("[no-router]"),void 0===this.swipeGesture){const t=i(this);this.swipeGesture=r.getBoolean("swipeBackEnabled","ios"===t)}this.ionNavWillLoad.emit()}async componentDidLoad(){this.rootChanged(),this.gesture=(await __sc_import_ionic("./p-7a8bbbc3.js")).createSwipeBackGesture(this.el,this.canStart.bind(this),this.onStart.bind(this),this.onMove.bind(this),this.onEnd.bind(this)),this.swipeGestureChanged()}componentDidUnload(){for(const t of this.views)d(t.element,n),t._destroy();this.gesture&&(this.gesture.destroy(),this.gesture=void 0),this.transInstr.length=this.views.length=0,this.destroyed=!0}push(t,s,i,e){return this.queueTrns({insertStart:-1,insertViews:[{page:t,params:s}],opts:i},e)}insert(t,s,i,e,o){return this.queueTrns({insertStart:t,insertViews:[{page:s,params:i}],opts:e},o)}insertPages(t,s,i,e){return this.queueTrns({insertStart:t,insertViews:s,opts:i},e)}pop(t,s){return this.queueTrns({removeStart:-1,removeCount:1,opts:t},s)}popTo(t,s,i){const e={removeStart:-1,removeCount:-1,opts:s};return"object"==typeof t&&t.component?(e.removeView=t,e.removeStart=1):"number"==typeof t&&(e.removeStart=t+1),this.queueTrns(e,i)}popToRoot(t,s){return this.queueTrns({removeStart:1,removeCount:-1,opts:t},s)}removeIndex(t,s=1,i,e){return this.queueTrns({removeStart:t,removeCount:s,opts:i},e)}setRoot(t,s,i,e){return this.setPages([{page:t,params:s}],i,e)}setPages(t,s,i){return null==s&&(s={}),!0!==s.animated&&(s.animated=!1),this.queueTrns({insertStart:0,insertViews:t,removeStart:0,removeCount:-1,opts:s},i)}setRouteId(t,s,i){const e=this.getActiveSync();if(g(e,t,s))return Promise.resolve({changed:!1,element:e.element});let o;const r=new Promise(t=>o=t);let n;const a={updateURL:!1,viewIsReady:t=>{let s;const i=new Promise(t=>s=t);return o({changed:!0,element:t,markVisible:async()=>{s(),await n}}),i}};if("root"===i)n=this.setRoot(t,s,a);else{const e=this.views.find(i=>g(i,t,s));e?n=this.popTo(e,Object.assign({},a,{direction:"back"})):"forward"===i?n=this.push(t,s,a):"back"===i&&(n=this.setRoot(t,s,Object.assign({},a,{direction:"back",animated:!0})))}return r}async getRouteId(){const t=this.getActiveSync();return t?{id:t.element.tagName,params:t.params,element:t.element}:void 0}getActive(){return Promise.resolve(this.getActiveSync())}getByIndex(t){return Promise.resolve(this.views[t])}canGoBack(t){return Promise.resolve(this.canGoBackSync(t))}getPrevious(t){return Promise.resolve(this.getPreviousSync(t))}getLength(){return this.views.length}getActiveSync(){return this.views[this.views.length-1]}canGoBackSync(t=this.getActiveSync()){return!(!t||!this.getPreviousSync(t))}getPreviousSync(t=this.getActiveSync()){if(!t)return;const s=this.views,i=s.indexOf(t);return i>0?s[i-1]:void 0}queueTrns(t,s){if(this.isTransitioning&&null!=t.opts&&t.opts.skipIfBusy)return Promise.resolve(!1);const i=new Promise((s,i)=>{t.resolve=s,t.reject=i});return t.done=s,t.insertViews&&0===t.insertViews.length&&(t.insertViews=void 0),this.transInstr.push(t),this.nextTrns(),i}success(t,s){if(this.destroyed)this.fireError("nav controller was destroyed",s);else if(s.done&&s.done(t.hasCompleted,t.requiresTransition,t.enteringView,t.leavingView,t.direction),s.resolve(t.hasCompleted),!1!==s.opts.updateURL&&this.useRouter){const s=document.querySelector("ion-router");s&&s.navChanged("back"===t.direction?"back":"forward")}}failed(t,s){this.destroyed?this.fireError("nav controller was destroyed",s):(this.transInstr.length=0,this.fireError(t,s))}fireError(t,s){s.done&&s.done(!1,!1,t),s.reject&&!this.destroyed?s.reject(t):s.resolve(!1)}nextTrns(){if(this.isTransitioning)return!1;const t=this.transInstr.shift();return!!t&&(this.runTransition(t),!0)}async runTransition(t){try{this.ionNavWillChange.emit(),this.isTransitioning=!0,this.prepareTI(t);const s=this.getActiveSync(),i=this.getEnteringView(t,s);if(!s&&!i)throw new Error("no views in the stack to be removed");i&&i.state===p&&await i.init(this.el),this.postViewInit(i,s,t);const e=(t.enteringRequiresTransition||t.leavingRequiresTransition)&&i!==s?await this.transition(i,s,t):{hasCompleted:!0,requiresTransition:!1};this.success(e,t),this.ionNavDidChange.emit()}catch(s){this.failed(s,t)}this.isTransitioning=!1,this.nextTrns()}prepareTI(t){const s=this.views.length;if(t.opts=t.opts||{},void 0===t.opts.delegate&&(t.opts.delegate=this.delegate),void 0!==t.removeView){c(void 0!==t.removeStart,"removeView needs removeStart"),c(void 0!==t.removeCount,"removeView needs removeCount");const s=this.views.indexOf(t.removeView);if(s<0)throw new Error("removeView was not found");t.removeStart+=s}void 0!==t.removeStart&&(t.removeStart<0&&(t.removeStart=s-1),t.removeCount<0&&(t.removeCount=s-t.removeStart),t.leavingRequiresTransition=t.removeCount>0&&t.removeStart+t.removeCount===s),t.insertViews&&((t.insertStart<0||t.insertStart>s)&&(t.insertStart=s),t.enteringRequiresTransition=t.insertStart===s);const i=t.insertViews;if(!i)return;c(i.length>0,"length can not be zero");const e=y(i);if(0===e.length)throw new Error("invalid views to insert");for(const s of e){s.delegate=t.opts.delegate;const i=s.nav;if(i&&i!==this)throw new Error("inserted view was already inserted");if(s.state===f)throw new Error("inserted view was already destroyed")}t.insertViews=e}getEnteringView(t,s){const i=t.insertViews;if(void 0!==i)return i[i.length-1];const e=t.removeStart;if(void 0!==e){const i=this.views,o=e+t.removeCount;for(let t=i.length-1;t>=0;t--){const r=i[t];if((t<e||t>=o)&&r!==s)return r}}}postViewInit(t,s,i){c(s||t,"Both leavingView and enteringView are null"),c(i.resolve,"resolve must be valid"),c(i.reject,"reject must be valid");const e=i.opts,o=i.insertViews,r=i.removeStart,u=i.removeCount;let v;if(void 0!==r&&void 0!==u){c(r>=0,"removeStart can not be negative"),c(u>=0,"removeCount can not be negative"),v=[];for(let i=0;i<u;i++){const e=this.views[i+r];e&&e!==t&&e!==s&&v.push(e)}e.direction=e.direction||"back"}const l=this.views.length+(void 0!==o?o.length:0)-(void 0!==u?u:0);if(c(l>=0,"final balance can not be negative"),0===l)throw console.warn("You can't remove all the pages in the navigation stack. nav.pop() is probably called too many times.",this,this.el),new Error("navigation stack needs at least one root page");if(o){let t=i.insertStart;for(const s of o)this.insertViewAt(s,t),t++;i.enteringRequiresTransition&&(e.direction=e.direction||"forward")}if(v&&v.length>0){for(const t of v)d(t.element,a),d(t.element,h),d(t.element,n);for(const t of v)this.destroyView(t)}}async transition(t,s,e){const o=e.opts,n=o.progressAnimation?t=>this.sbAni=t:void 0,a=i(this),h=t.element,c=s&&s.element,u=Object.assign({mode:a,showGoBack:this.canGoBackSync(t),baseEl:this.el,animationBuilder:this.animation||o.animationBuilder||r.get("navAnimation"),progressCallback:n,animated:this.animated&&r.getBoolean("animated",!0),enteringEl:h,leavingEl:c},o),{hasCompleted:d}=await v(u);return this.transitionFinish(d,t,s,o)}transitionFinish(t,s,i,e){const o=t?s:i;return o&&this.cleanup(o),{hasCompleted:t,requiresTransition:!0,enteringView:s,leavingView:i,direction:e.direction}}insertViewAt(t,s){const i=this.views,e=i.indexOf(t);e>-1?(c(t.nav===this,"view is not part of the nav"),i.splice(s,0,i.splice(e,1)[0])):(c(!t.nav,"nav is used"),t.nav=this,i.splice(s,0,t))}removeView(t){c(t.state===m||t.state===f,"view state should be loaded or destroyed");const s=this.views,i=s.indexOf(t);c(i>-1,"view must be part of the stack"),i>=0&&s.splice(i,1)}destroyView(t){t._destroy(),this.removeView(t)}cleanup(t){if(this.destroyed)return;const s=this.views,i=s.indexOf(t);for(let t=s.length-1;t>=0;t--){const e=s[t],o=e.element;t>i?(d(o,n),this.destroyView(e)):t<i&&l(o,!0)}}canStart(){return!!this.swipeGesture&&!this.isTransitioning&&0===this.transInstr.length&&this.canGoBackSync()}onStart(){this.queueTrns({removeStart:-1,removeCount:1,opts:{direction:"back",progressAnimation:!0}},void 0)}onMove(t){this.sbAni&&this.sbAni.progressStep(t)}onEnd(t,s,i){this.sbAni&&this.sbAni.progressEnd(t,s,i)}render(){return e("slot",null)}get el(){return o(this)}static get watchers(){return{swipeGesture:["swipeGestureChanged"],root:["rootChanged"]}}static get style(){return":host{left:0;right:0;top:0;bottom:0;position:absolute;contain:layout size style;overflow:hidden;z-index:0}"}}class C{constructor(s){t(this,s)}pop(){const t=this.el.closest("ion-nav");t&&t.pop({skipIfBusy:!0})}get el(){return o(this)}}class E{constructor(s){t(this,s)}push(){const t=this.el.closest("ion-nav"),s=this.component;t&&void 0!==s&&t.push(s,this.componentProps,{skipIfBusy:!0})}get el(){return o(this)}}class S{constructor(s){t(this,s)}push(){const t=this.el.closest("ion-nav"),s=this.component;t&&void 0!==s&&t.setRoot(s,this.componentProps,{skipIfBusy:!0})}get el(){return o(this)}}export{k as ion_nav,C as ion_nav_pop,E as ion_nav_push,S as ion_nav_set_root};