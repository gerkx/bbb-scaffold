import{n as w,w as U,f as R,x as V,y as v,z as j,A as b,B as q,C as B,D as N,b as Q,E as T,F as W,G as X,H as Y,I as P,J as Z,K as tt,L as et,M as nt,N as st}from"./scheduler.3akfCV0v.js";const D=typeof window<"u";let F=D?()=>window.performance.now():()=>Date.now(),I=D?t=>requestAnimationFrame(t):w;const p=new Set;function L(t){p.forEach(e=>{e.c(t)||(p.delete(e),e.f())}),p.size!==0&&I(L)}function G(t){let e;return p.size===0&&I(L),{promise:new Promise(n=>{p.add(e={c:t,f:n})}),abort(){p.delete(e)}}}const k=new Map;let C=0;function it(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function rt(t,e){const n={stylesheet:V(e),rules:{}};return k.set(t,n),n}function H(t,e,n,s,r,a,u,l=0){const d=16.666/s;let i=`{
`;for(let g=0;g<=1;g+=d){const m=e+(n-e)*a(g);i+=g*100+`%{${u(m,1-m)}}
`}const f=i+`100% {${u(n,1-n)}}
}`,o=`__svelte_${it(f)}_${l}`,_=U(t),{stylesheet:c,rules:$}=k.get(_)||rt(_,t);$[o]||($[o]=!0,c.insertRule(`@keyframes ${o} ${f}`,c.cssRules.length));const h=t.style.animation||"";return t.style.animation=`${h?`${h}, `:""}${o} ${s}ms linear ${r}ms 1 both`,C+=1,o}function A(t,e){const n=(t.style.animation||"").split(", "),s=n.filter(e?a=>a.indexOf(e)<0:a=>a.indexOf("__svelte")===-1),r=n.length-s.length;r&&(t.style.animation=s.join(", "),C-=r,C||at())}function at(){I(()=>{C||(k.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&R(e)}),k.clear())})}let x;function J(){return x||(x=Promise.resolve(),x.then(()=>{x=null})),x}function O(t,e,n){t.dispatchEvent(q(`${e?"intro":"outro"}${n}`))}const S=new Set;let y;function _t(){y={r:0,c:[],p:y}}function $t(){y.r||v(y.c),y=y.p}function ot(t,e){t&&t.i&&(S.delete(t),t.i(e))}function ht(t,e,n,s){if(t&&t.o){if(S.has(t))return;S.add(t),y.c.push(()=>{S.delete(t),s&&(n&&t.d(1),s())}),t.o(e)}else s&&s()}const K={duration:0};function mt(t,e,n){const s={direction:"in"};let r=e(t,n,s),a=!1,u,l,d=0;function i(){u&&A(t,u)}function f(){const{delay:_=0,duration:c=300,easing:$=B,tick:h=w,css:g}=r||K;g&&(u=H(t,0,1,c,_,$,g,d++)),h(0,1);const m=F()+_,E=m+c;l&&l.abort(),a=!0,b(()=>O(t,!0,"start")),l=G(z=>{if(a){if(z>=E)return h(1,0),O(t,!0,"end"),i(),a=!1;if(z>=m){const M=$((z-m)/c);h(M,1-M)}}return a})}let o=!1;return{start(){o||(o=!0,A(t),j(r)?(r=r(s),J().then(f)):f())},invalidate(){o=!1},end(){a&&(i(),a=!1)}}}function gt(t,e,n){const s={direction:"out"};let r=e(t,n,s),a=!0,u;const l=y;l.r+=1;let d;function i(){const{delay:f=0,duration:o=300,easing:_=B,tick:c=w,css:$}=r||K;$&&(u=H(t,1,0,o,f,_,$));const h=F()+f,g=h+o;b(()=>O(t,!1,"start")),"inert"in t&&(d=t.inert,t.inert=!0),G(m=>{if(a){if(m>=g)return c(0,1),O(t,!1,"end"),--l.r||v(l.c),!1;if(m>=h){const E=_((m-h)/o);c(1-E,E)}}return a})}return j(r)?J().then(()=>{r=r(s),i()}):i(),{end(f){f&&"inert"in t&&(t.inert=d),f&&r.tick&&r.tick(1,0),a&&(u&&A(t,u),a=!1)}}}function yt(t,e,n){const s=t.$$.props[e];s!==void 0&&(t.$$.bound[s]=n,n(t.$$.ctx[s]))}function pt(t){t&&t.c()}function wt(t,e){t&&t.l(e)}function ft(t,e,n){const{fragment:s,after_update:r}=t.$$;s&&s.m(e,n),b(()=>{const a=t.$$.on_mount.map(Z).filter(j);t.$$.on_destroy?t.$$.on_destroy.push(...a):v(a),t.$$.on_mount=[]}),r.forEach(b)}function ut(t,e){const n=t.$$;n.fragment!==null&&(X(n.after_update),v(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function ct(t,e){t.$$.dirty[0]===-1&&(tt.push(t),et(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function xt(t,e,n,s,r,a,u=null,l=[-1]){const d=Y;P(t);const i=t.$$={fragment:null,ctx:[],props:a,update:w,not_equal:r,bound:N(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(d?d.$$.context:[])),callbacks:N(),dirty:l,skip_bound:!1,root:e.target||d.$$.root};u&&u(i.root);let f=!1;if(i.ctx=n?n(t,e.props||{},(o,_,...c)=>{const $=c.length?c[0]:_;return i.ctx&&r(i.ctx[o],i.ctx[o]=$)&&(!i.skip_bound&&i.bound[o]&&i.bound[o]($),f&&ct(t,o)),_}):[],i.update(),f=!0,v(i.before_update),i.fragment=s?s(i.ctx):!1,e.target){if(e.hydrate){nt();const o=Q(e.target);i.fragment&&i.fragment.l(o),o.forEach(R)}else i.fragment&&i.fragment.c();e.intro&&ot(t.$$.fragment),ft(t,e.target,e.anchor),st(),T()}P(d)}class vt{$$=void 0;$$set=void 0;$destroy(){ut(this,1),this.$destroy=w}$on(e,n){if(!j(n))return w;const s=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return s.push(n),()=>{const r=s.indexOf(n);r!==-1&&s.splice(r,1)}}$set(e){this.$$set&&!W(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const lt="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(lt);export{vt as S,ot as a,pt as b,$t as c,wt as d,ut as e,yt as f,_t as g,H as h,xt as i,A as j,mt as k,G as l,ft as m,F as n,gt as o,ht as t};
