import{r as t,c as o,e as n,d as r,h as s,H as i}from"./p-70082a31.js";import"./p-1074393c.js";import{o as e,c as a}from"./p-ba834eff.js";import{e as c}from"./p-c90aaa66.js";class h{constructor(n){t(this,n),this.url="",this.ionRouteDataChanged=o(this,"ionRouteDataChanged",7)}onUpdate(t){this.ionRouteDataChanged.emit(t)}onComponentProps(t,o){if(t===o)return;const n=t?Object.keys(t):[],r=o?Object.keys(o):[];if(n.length===r.length){for(const r of n)if(t[r]!==o[r])return void this.onUpdate(t)}else this.onUpdate(t)}componentDidLoad(){this.ionRouteDataChanged.emit()}componentDidUnload(){this.ionRouteDataChanged.emit()}static get watchers(){return{url:["onUpdate"],component:["onUpdate"],componentProps:["onComponentProps"]}}}class u{constructor(n){t(this,n),this.ionRouteRedirectChanged=o(this,"ionRouteRedirectChanged",7)}propDidChange(){this.ionRouteRedirectChanged.emit()}componentDidLoad(){this.ionRouteRedirectChanged.emit()}componentDidUnload(){this.ionRouteRedirectChanged.emit()}static get watchers(){return{from:["propDidChange"],to:["propDidChange"]}}}const l="root",f="forward",d="back",p=t=>"/"+t.filter(t=>t.length>0).join("/"),w=t=>{const o=[];for(const n of t)for(const t of n.path)if(":"===t[0]){const r=n.params&&n.params[t.slice(1)];if(!r)return null;o.push(r)}else""!==t&&o.push(t);return o},m=(t,o,n,r,s,i)=>{let e=p([...R(o),...r]);n&&(e="#"+e),s===f?t.pushState(i,"",e):t.replaceState(i,"",e)},g=(t,o,n)=>{let r=t.pathname;if(n){const o=t.hash;r="#"===o[0]?o.slice(1):""}return((t,o)=>{if(t.length>o.length)return null;if(t.length<=1&&""===t[0])return o;for(let n=0;n<t.length;n++)if(t[n].length>0&&t[n]!==o[n])return null;return o.length===t.length?[""]:o.slice(t.length)})(R(o),R(r))},R=t=>{if(null==t)return[""];const o=t.split("/").map(t=>t.trim()).filter(t=>t.length>0);return 0===o.length?[""]:o},C=t=>{console.group(`[ion-core] ROUTES[${t.length}]`);for(const o of t){const t=[];o.forEach(o=>t.push(...o.path));const n=o.map(t=>t.id);p(t),n.join(", ")}console.groupEnd()},y=t=>{console.group(`[ion-core] REDIRECTS[${t.length}]`);for(const o of t)o.to&&(p(o.from),p(o.to));console.groupEnd()},v=async(t,o,n,r,s=!1)=>{try{const i=L(t);if(r>=o.length||!i)return s;await i.componentOnReady();const e=o[r],a=await i.setRouteId(e.id,e.params,n);return a.changed&&(n=l,s=!0),s=await v(a.element,o,n,r+1,s),a.markVisible&&await a.markVisible(),s}catch(t){return console.error(t),!1}},D=async t=>{const o=[];let n,r=t;for(;n=L(r);){const t=await n.getRouteId();if(!t)break;r=t.element,t.element=void 0,o.push(t)}return{ids:o,outlet:n}},b=()=>L(document.body)?Promise.resolve():new Promise(t=>{window.addEventListener("ionNavWillLoad",t,{once:!0})}),E=":not([no-router]) ion-nav, :not([no-router]) ion-tabs, :not([no-router]) ion-router-outlet",L=t=>{if(!t)return;if(t.matches(E))return t;return t.querySelector(E)||void 0},O=(t,o)=>o.find(o=>((t,o)=>{const{from:n,to:r}=o;if(void 0===r)return!1;if(n.length>t.length)return!1;for(let o=0;o<n.length;o++){const r=n[o];if("*"===r)return!0;if(r!==t[o])return!1}return n.length===t.length})(t,o)),P=(t,o)=>{const n=Math.min(t.length,o.length);let r=0;for(;r<n&&t[r].toLowerCase()===o[r].id;r++);return r},U=(t,o)=>{const n=new S(t);let r,s=!1;for(let t=0;t<o.length;t++){const i=o[t].path;if(""===i[0])s=!0;else{for(const o of i){const s=n.next();if(":"===o[0]){if(""===s)return null;((r=r||[])[t]||(r[t]={}))[o.slice(1)]=s}else if(s!==o)return null}s=!1}}return s&&s!==(""===n.next())?null:r?o.map((t,o)=>({id:t.id,path:t.path,params:j(t.params,r[o])})):o},j=(t,o)=>!t&&o?o:t&&!o?t:t&&o?Object.assign({},t,o):void 0,k=(t,o)=>{let n=null,r=0;const s=t.map(t=>t.id);for(const t of o){const o=P(s,t);o>r&&(n=t,r=o)}return n?n.map((o,n)=>({id:o.id,path:o.path,params:j(o.params,t[n]&&t[n].params)})):null},T=(t,o)=>{let n=null,r=0;for(const s of o){const o=U(t,s);if(null!==o){const t=_(o);t>r&&(r=t,n=o)}}return n},_=t=>{let o=1,n=1;for(const r of t)for(const t of r.path)":"===t[0]?o+=Math.pow(1,n):""!==t&&(o+=Math.pow(2,n)),n++;return o};class S{constructor(t){this.path=t.slice()}next(){return this.path.length>0?this.path.shift():""}}const N=t=>Array.from(t.children).filter(t=>"ION-ROUTE-REDIRECT"===t.tagName).map(t=>{const o=A(t,"to");return{from:R(A(t,"from")),to:null==o?void 0:R(o)}}),I=t=>M(W(t)),W=(t,o=t)=>Array.from(o.children).filter(t=>"ION-ROUTE"===t.tagName&&t.component).map(o=>{const n=A(o,"component");if(null==n)throw new Error("component missing in ion-route");return{path:R(A(o,"url")),id:n.toLowerCase(),params:o.componentProps,children:W(t,o)}}),A=(t,o)=>o in t?t[o]:t.hasAttribute(o)?t.getAttribute(o):null,M=t=>{const o=[];for(const n of t)x([],o,n);return o},x=(t,o,n)=>{const r=t.slice();if(r.push({id:n.id,path:n.path,params:n.params}),0!==n.children.length)for(const t of n.children)x(r,o,t);else o.push(r)};class B{constructor(n){t(this,n),this.previousPath=null,this.busy=!1,this.state=0,this.lastState=0,this.root="/",this.useHash=!0,this.ionRouteWillChange=o(this,"ionRouteWillChange",7),this.ionRouteDidChange=o(this,"ionRouteDidChange",7)}async componentWillLoad(){await b(),await this.onRoutesChanged()}componentDidLoad(){window.addEventListener("ionRouteRedirectChanged",c(this.onRedirectChanged.bind(this),10)),window.addEventListener("ionRouteDataChanged",c(this.onRoutesChanged.bind(this),100))}onPopState(){const t=this.historyDirection(),o=this.getPath();return this.writeNavStateRoot(o,t)}onBackButton(t){t.detail.register(0,()=>this.back())}push(t,o="forward"){t.startsWith(".")&&(t=new URL(t,window.location.href).pathname);const n=R(t);return this.setPath(n,o),this.writeNavStateRoot(n,o)}back(){return window.history.back(),Promise.resolve(this.waitPromise)}async printDebug(){this.getPath(),C(I(this.el)),y(N(this.el))}async navChanged(t){if(this.busy)return console.warn("[ion-router] router is busy, navChanged was cancelled"),!1;const{ids:o,outlet:n}=await D(window.document.body),r=I(this.el),s=k(o,r);if(!s)return console.warn("[ion-router] no matching URL for ",o.map(t=>t.id)),!1;const i=w(s);return i?(this.setPath(i,t),await this.safeWriteNavState(n,s,l,i,null,o.length),!0):(console.warn("[ion-router] router could not match path because some required param is missing"),!1)}onRedirectChanged(){const t=this.getPath();t&&O(t,N(this.el))&&this.writeNavStateRoot(t,l)}onRoutesChanged(){return this.writeNavStateRoot(this.getPath(),l)}historyDirection(){const t=window;null===t.history.state&&(this.state++,t.history.replaceState(this.state,t.document.title,t.document.location&&t.document.location.href));const o=t.history.state,n=this.lastState;return this.lastState=o,o>n?f:o<n?d:l}async writeNavStateRoot(t,o){if(!t)return console.error("[ion-router] URL is not part of the routing set"),!1;const n=N(this.el),r=O(t,n);let s=null;r&&(this.setPath(r.to,o),s=r.from,t=r.to);const i=I(this.el),e=T(t,i);return e?this.safeWriteNavState(document.body,e,o,t,s):(console.error("[ion-router] the path does not match any route"),!1)}async safeWriteNavState(t,o,n,r,s,i=0){const e=await this.lock();let a=!1;try{a=await this.writeNavState(t,o,n,r,s,i)}catch(t){console.error(t)}return e(),a}async lock(){const t=this.waitPromise;let o;return this.waitPromise=new Promise(t=>o=t),void 0!==t&&await t,o}async writeNavState(t,o,n,r,s,i=0){if(this.busy)return console.warn("[ion-router] router is busy, transition was cancelled"),!1;this.busy=!0;const e=this.routeChangeEvent(r,s);e&&this.ionRouteWillChange.emit(e);const a=await v(t,o,n,i);return this.busy=!1,e&&this.ionRouteDidChange.emit(e),a}setPath(t,o){this.state++,m(window.history,this.root,this.useHash,t,o,this.state)}getPath(){return g(window.location,this.root,this.useHash)}routeChangeEvent(t,o){const n=this.previousPath,r=p(t);return this.previousPath=r,r===n?null:{from:n,redirectedFrom:o?p(o):null,to:r}}get el(){return n(this)}}class H{constructor(o){t(this,o),this.routerDirection="forward",this.onClick=t=>{e(this.href,t,this.routerDirection)}}render(){const t=r(this),o={href:this.href,rel:this.rel,target:this.target};return s(i,{onClick:this.onClick,class:Object.assign({},a(this.color),{[t]:!0,"ion-activatable":!0})},s("a",Object.assign({},o),s("slot",null)))}static get style(){return":host{--background:transparent;--color:var(--ion-color-primary,#3880ff);background:var(--background);color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}a{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit}"}}export{h as ion_route,u as ion_route_redirect,B as ion_router,H as ion_router_link};