import*as r from"three";import{GLTFLoader as ie}from"three/addons/loaders/GLTFLoader.js";const ne=await(async()=>{function mt(J,b,y){if(y<=0)return J<b?J:b;const I=Math.max(y-Math.abs(J-b),0)/y;return(J<b?J:b)-I*I*y*.25}function lt(J,b,y){return-mt(-J,-b,y)}function st(J,b,y){const I=Math.min(1,Math.max(0,(y-J)/(b-J)));return I*I*(3-2*I)}class X{constructor(){this.data=[],this.n=0,this.post=null,this.grid=null,this.out=[0,0]}_push(b,y,I,D,R,p,z){const M=this.data,c=this.n*20;for(let C=0;C<20;C++)M.push(0);M[c]=b,M[c+1]=y[0],M[c+2]=y[1],M[c+3]=y[2],M[c+4]=1/I[0],M[c+5]=1/I[1],M[c+6]=1/I[2],M[c+7]=Math.min(I[0],I[1],I[2]),M[c+8]=D;for(let C=0;C<R.length;C++)M[c+9+C]=R[C];return M[c+17]=p,M[c+18]=z||0,this.n++}rc(b,y,I,D,R=.02,p=null,z=0){const M=p||[1,1,1],c=[(b[0]+y[0])/2,(b[1]+y[1])/2,(b[2]+y[2])/2],C=[(b[0]-c[0])/M[0],(b[1]-c[1])/M[1],(b[2]-c[2])/M[2],(y[0]-c[0])/M[0],(y[1]-c[1])/M[1],(y[2]-c[2])/M[2],I,D],U=Math.hypot(y[0]-b[0],y[1]-b[1],y[2]-b[2])/2;return this._push(0,c,M,R,C,U+Math.max(I,D)*Math.max(M[0],M[1],M[2]),z)}el(b,y,I=.02,D=0){return this._push(1,b,[1,1,1],I,[y[0],y[1],y[2]],Math.max(y[0],y[1],y[2]),D)}box(b,y,I,D=0,R=0){return this._push(2,b,[1,1,1],D,[y[0],y[1],y[2],0,0,0,I],Math.hypot(y[0],y[1],y[2])+I,R)}finish(){return this.D=new Float64Array(this.data),this}prim(b,y,I,D){const R=this.D,p=b*20,z=(y-R[p+1])*R[p+4],M=(I-R[p+2])*R[p+5],c=(D-R[p+3])*R[p+6],C=R[p];let U;if(C===0){const O=R[p+9],A=R[p+10],L=R[p+11],$=R[p+12]-O,H=R[p+13]-A,Q=R[p+14]-L,F=R[p+15],W=R[p+16],et=$*$+H*H+Q*Q,G=F-W,e=et-G*G,o=1/et,n=z-O,u=M-A,w=c-L,E=n*$+u*H+w*Q,_=E-et,v=n*et-$*E,i=u*et-H*E,d=w*et-Q*E,k=v*v+i*i+d*d,s=E*E*et,f=_*_*et,l=Math.sign(G)*G*G*k;Math.sign(_)*e*f>l?U=Math.sqrt(k+f)*o-W:Math.sign(E)*e*s<l?U=Math.sqrt(k+s)*o-F:U=(Math.sqrt(k*e*o)+E*G)*o-F}else if(C===1){const O=R[p+9],A=R[p+10],L=R[p+11],$=z/O,H=M/A,Q=c/L,F=Math.sqrt($*$+H*H+Q*Q),W=$/O,et=H/A,G=Q/L,e=Math.sqrt(W*W+et*et+G*G);U=e<1e-9?-Math.min(O,A,L):F*(F-1)/e}else{const O=Math.abs(z)-R[p+9],A=Math.abs(M)-R[p+10],L=Math.abs(c)-R[p+11],$=Math.max(O,0),H=Math.max(A,0),Q=Math.max(L,0);U=Math.sqrt($*$+H*H+Q*Q)+Math.min(Math.max(O,A,L),0)-R[p+15]}return U*R[p+7]}_fold(b,y,I,D,R){const p=this.D;let z=1e3,M=1e3;for(let c=0;c<y;c++){const C=b?b[c]:c,U=C*20,O=this.prim(C,I,D,R);p[U+18]===0?z=mt(z,O,p[U+8]):M=mt(M,O,p[U+8])}return this.post?this.post(I,D,R,z,M):z<M?z:M}eval(b,y,I){return this._fold(null,this.n,b,y,I)}buildGrid(b=.03,y=.035){const I=this.D;let D=[1e9,1e9,1e9],R=[-1e9,-1e9,-1e9];for(let c=0;c<this.n;c++){const C=c*20,U=I[C+17]+I[C+8]+y;for(let O=0;O<3;O++)D[O]=Math.min(D[O],I[C+1+O]-U),R[O]=Math.max(R[O],I[C+1+O]+U)}const p=[0,1,2].map(c=>Math.max(1,Math.ceil((R[c]-D[c])/b))),z=new Array(p[0]*p[1]*p[2]),M=b*.866;for(let c=0;c<this.n;c++){const C=c*20,U=I[C+17]+I[C+8]+y,O=[0,1,2].map(L=>Math.max(0,Math.floor((I[C+1+L]-U-D[L])/b))),A=[0,1,2].map(L=>Math.min(p[L]-1,Math.floor((I[C+1+L]+U-D[L])/b)));for(let L=O[2];L<=A[2];L++)for(let $=O[1];$<=A[1];$++)for(let H=O[0];H<=A[0];H++){const Q=D[0]+(H+.5)*b,F=D[1]+($+.5)*b,W=D[2]+(L+.5)*b;if(this.prim(c,Q,F,W)>M+I[C+8]+y)continue;const et=H+p[0]*($+p[1]*L);(z[et]||(z[et]=[])).push(c)}}return this.grid={mn:D,mx:R,dim:p,cell:b,lists:z},this}_cell(b,y,I){const D=this.grid,R=Math.floor((b-D.mn[0])/D.cell),p=Math.floor((y-D.mn[1])/D.cell),z=Math.floor((I-D.mn[2])/D.cell);return R<0||p<0||z<0||R>=D.dim[0]||p>=D.dim[1]||z>=D.dim[2]?null:D.lists[R+D.dim[0]*(p+D.dim[1]*z)]||null}fast(b,y,I){const D=this._cell(b,y,I);return D?this._fold(D,D.length,b,y,I):this.post?this.post(b,y,I,1e3,1e3):1e3}nearest(b,y,I,D=1){const R=this._cell(b,y,I);if(!R)return-1;let p=-1,z=1e9;for(let M=0;M<R.length;M++){if(this.D[R[M]*20+18]!==D)continue;const c=this.prim(R[M],b,y,I);c<z&&(z=c,p=R[M])}return p}start(b){const y=this.D,I=b*20;return[y[I+1]+y[I+9]/y[I+4],y[I+2]+y[I+10]/y[I+5],y[I+3]+y[I+11]/y[I+6],y[I+19]]}axis(b){const y=this.D,I=b*20,D=(y[I+12]-y[I+9])/y[I+4],R=(y[I+13]-y[I+10])/y[I+5],p=(y[I+14]-y[I+11])/y[I+6],z=Math.hypot(D,R,p)||1;return[D/z,R/z,p/z]}}return{smin:mt,smax:lt,sstep:st,Shape:X}})(),Wt=await(async()=>{const{Shape:Z,smin:mt,smax:lt,sstep:st}=ne,X=[.012,.145,-.715];function J(c){let C=c>>>0;return()=>(C=C*1664525+1013904223>>>0)/4294967296}const b=(c,C,U=1)=>[c[0]+C[0]*U,c[1]+C[1]*U,c[2]+C[2]*U],y=c=>{const C=Math.hypot(c[0],c[1],c[2])||1;return[c[0]/C,c[1]/C,c[2]/C]};function I(c,C,U,O,A){U=y(U);const L=[U[2]*O,0,-U[0]*O];c.rc(b(C,U,.012),b(C,U,.082),.022,.021,.02,[1.7,.55,1]);const $=b(C,U,.09),H=[.066,.078,.073,.057];for(let W=0;W<4;W++){const et=b($,L,-.03+W*.02),G=y(b(U,L,-.14+W*.09)),e=b(b(et,G,H[W]*.55),[0,.004,0]),o=b(b(et,G,H[W]),[0,-.007,0]);c.rc(et,e,.0092,.0082,.008),c.rc(e,o,.0082,.0068,.004),A.push([...o,.02])}const Q=b(b(C,U,.03),L,-.034),F=b(Q,y(b(U,L,-.75)),.05);c.rc(Q,F,.0115,.0085,.012),A.push([...F,.02])}function D(c){const C=new Z;C.el([0,.095,0],[.165,.092,.13],.04);for(const A of[1,-1])C.el([A*.082,.128,.045],[.092,.092,.115],.035);C.rc([0,.088,-.24],[0,.09,-.1],.085,.095,.06,[1.32,.9,1]),C.rc([0,.098,-.47],[0,.092,-.31],.098,.092,.06,[1.42,.98,1]),C.rc([-.135,.115,-.515],[.135,.115,-.515],.058,.058,.05);for(const A of[1,-1])C.el([A*.075,.165,-.43],[.06,.03,.075],.05),C.el([A*.085,.045,-.4],[.085,.052,.085],.03),C.el([A*.19,.11,-.515],[.055,.052,.06],.03),c.push([A*.2,.15,-.52,.07]);C.rc([0,.125,-.535],[.012,.14,-.635],.05,.046,.03),C.el(X,[.094,.078,.105],.03),C.el([.045,.14,-.655],[.06,.062,.06],.03),C.el([.072,.14,-.628],[.03,.04,.028],.03),C.rc([.098,.142,-.705],[.114,.142,-.686],.008,.011,.012),c.push([.085,.185,-.685,.035],[.085,.1,-.685,.035],[.116,.142,-.686,.012]);const U={sh:[.185,.105,-.52],el:[.4,.047,-.6],wr:[.3,.112,-.86],dir:[-.35,.02,-.93],side:1},O={sh:[-.185,.105,-.52],el:[-.41,.047,-.57],wr:[-.335,.112,-.84],dir:[.25,.02,-.97],side:-1};for(const A of[U,O])C.rc(A.sh,A.el,.047,.037,.03),C.rc(A.el,A.wr,.037,.026,.04),I(C,A.wr,A.dir,A.side,c),c.push([...A.el,.05]);for(const A of[1,-1]){C.rc([A*.085,.098,.06],[A*.095,.072,.4],.088,.056,.04),C.rc([A*.095,.072,.4],[A*.105,.058,.775],.052,.031,.03),C.el([A*.098,.085,.53],[.052,.05,.12],.04),C.el([A*.105,.082,.8],[.028,.03,.035],.02),C.rc([A*.105,.05,.8],[A*.1,.03,.935],.03,.028,.025,[1.35,.75,1]);const L=[.032,.028,.025,.022,.018],$=[.0125,.0088,.0082,.0076,.007];for(let H=0;H<5;H++){const Q=A*.1-A*(.032-H*.0165),F=.948-H*.006;C.rc([Q,.027,F],[Q-A*.002,.021,F+L[H]],$[H],$[H]*.9,.006),c.push([Q,.021,F+L[H],.022])}c.push([A*.105,.1,.81,.045],[A*.1,.05,.93,.05],[A*.095,.11,.4,.06])}return C.finish().buildGrid()}function R(){const c=new Z,C=.0035;c.el([0,.095,0],[.165+C,.092+C,.13+C],.05);for(const O of[1,-1])c.el([O*.082,.128,.045],[.092+C,.092+C,.115+C],.06);c.rc([0,.088,-.3],[0,.09,-.1],.085+.006,.095+C,.05,[1.32,.9,1]),c.rc([0,.098,-.47],[0,.092,-.31],.098+C,.092+C,.05,[1.42,.98,1]);for(const O of[1,-1])c.el([O*.085,.045,-.4],[.085+C,.052+C,.085+C],.03),c.rc([O*.085,.098,.06],[O*.095,.072,.4],.088+C+.002,.056+C+.002,.09);c.rc([-.095,.072,.4],[-.104,.06,.72],.052+C,.036+C,.05),c.el([-.098,.085,.53],[.052+C,.05+C,.12],.05),c.rc([-.16,.012,.3],[-.42,.01,.95],.1,.16,.05,[1,.22,1]),c.rc([-.02,.012,.36],[-.02,.01,.98],.05,.1,.05,[1,.22,1]),c.rc([-.3,.012,.55],[-.62,.01,1.02],.12,.14,.05,[1,.22,1]);const U=[[.075,.062,-.47],[.085,.12,-.545],[.052,.168,-.575],[0,.182,-.58]];for(const O of[1,-1])for(let A=0;A<3;A++){const L=[U[A][0]*O,U[A][1],U[A][2]],$=[U[A+1][0]*O,U[A+1][1],U[A+1][2]];c.rc(L,$,.0075,.0075,.004,null,1)}return c.post=(O,A,L,$,H)=>{let Q=$;const F=st(.02,.3,L);F>0&&(Q-=F*(.0035*(.5+.5*Math.sin(40*O+5*Math.sin(8*L)))+.002*(.5+.5*Math.sin(83*O-11*L))));const W=st(-.29,-.26,L)*(1-st(-.15,-.12,L));return W>0&&(Q-=W*(.003+.0025*(.5+.5*Math.sin(L*230+3*Math.sin(O*20))))),Q=lt(Q,Math.min(-.27-L,Math.max(-.47-L,A-.072)),.003),L>.2&&(Q=lt(Q,O-(.26-.23*st(.22,.42,L)),.004)),Math.min(Q,H)},c.finish().buildGrid()}function p(c){const C=new Z;return C.box([0,-.14,0],[.9,.09,1.1],.05),C.box([.02,.045,-.84],[.3,.012,.17],.06,.01),C.box([.68,.05,-.86],[.17,.012,.17],.06,.01),C.rc([.66,.035,.15],[.72,.045,.95],.17,.2,.03,[1,.42,1]),C.post=(U,O,A,L)=>{let $=L-.0025*Math.sin(21*U+3.5*Math.sin(8.5*A))*Math.sin(15*A+3*Math.sin(10*U))-.0015*Math.sin(47*U+31*A);if(U>.4&&A>-.1&&($-=.012*(.5+.5*Math.sin(18*A+4*Math.sin(9*U)))*st(.42,.55,U)),O>-.05&&U>-.97&&U<.97){const H=c.fast(U,O,A);H<.05&&($=lt($,-(H-.0025),.012))}return $},C.finish().buildGrid(.08,.09)}function z(c,C){const U=new Z,O=J(7);U.el([X[0]-.012,X[1]+.004,X[2]-.008],[.104,.088,.115],.01,0);const A=(F,W)=>{let et=.45;for(let G=0;G<80;G++){const e=Math.min(c.fast(F,et,W),C.fast(F,et,W));if(e<.0015)break;et-=Math.min(.02,Math.max(e*.8,.0015))}return et};let L=0;const $=(F,W,et,G)=>{L++;for(let e=0;e<F.length-1;e++){const o=e/(F.length-1),n=(e+1)/(F.length-1),u=W+(et-W)*Math.pow(o,1.5),w=W+(et-W)*Math.pow(n,1.5),E=U.rc(F[e],F[e+1],u,w,.012,[1,G,1],1);U.data[E*20+19]=L}},H=(F,W,et,G,e,o,n)=>{const u=O()*6.28,w=1.6+O()*1.2,E=[],_=8;for(let v=0;v<=_;v++){const i=v/_,d=(1-i)*(1-i),k=2*i*(1-i),s=i*i;let f=d*F[0]+k*W[0]+s*et[0],l=d*F[1]+k*W[1]+s*et[1];const t=2*(1-i)*(W[0]-F[0])+2*i*(et[0]-W[0]),a=2*(1-i)*(W[1]-F[1])+2*i*(et[1]-W[1]),P=Math.hypot(t,a)||1,g=o*Math.sin(i*6.28*w+u)*i;f+=-a/P*g,l+=t/P*g;const h=G+(e-G)*Math.pow(i,1.5);E.push([f,A(f,l)+h*.3+n,l])}$(E,G,e,.55)},Q=24;for(let F=0;F<Q;F++){const W=F/(Q-1),et=Math.sin(W*Math.PI);H([-.085+.085*W,-.75+.05*et],[-.27+.27*W+(O()-.5)*.03,-.66+.12*et],[-.52+.63*Math.pow(W,1.1)+(O()-.5)*.04,-.52+.3*Math.pow(et,.75)+(O()-.5)*.05],.027,.0095,.02,F%3*.004)}for(let F=0;F<10;F++){const W=F/9,et=Math.sin(W*Math.PI);H([-.08+.07*W,-.745+.04*et],[-.2+.2*W,-.68+.08*et],[-.34+.38*W+(O()-.5)*.04,-.6+.14*et+(O()-.5)*.04],.03,.016,.012,0)}return $([[.02,.215,-.79],[.07,.2,-.775],[.1,.175,-.752],[.108,.152,-.737]],.017,.006,1),$([[.05,.19,-.8],[.095,.16,-.776],[.112,.135,-.757]],.016,.006,1),$([[.03,.09,-.8],[.085,.086,-.772],[.105,.1,-.747]],.016,.006,1),$([[0,.226,-.76],[.03,.226,-.7],[.05,.214,-.64],[.062,.188,-.59],[.09,.165,-.54]],.017,.007,1),U.post=(F,W,et,G,e)=>mt(lt(G,Math.min(F-.047,et+.78),.01),e,.01),U.finish().buildGrid(.02,.015)}function M(c,C,U,O){let A=0;for(const L of c){const $=Math.hypot(C-L[0],U-L[1],O-L[2])/L[3];$<1&&(A=Math.max(A,(1-$)*(1-$)))}return A}return{HEAD:X,buildSkin:D,buildDress:R,buildBed:p,buildHair:z,tintAt:M}})(),re=await(async()=>{const Z=[[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]];function mt(J,{min:b,max:y,voxel:I,ao:D}){const R=I,p=8,z=p+1,M=[0,1,2].map(e=>Math.ceil((y[e]-b[e])/R/p)*p),c=(e,o,n)=>J.fast(e,o,n),C=new Float32Array(z*z*z),U=[],O=new Map,A=[],L=p*R*.866;for(let e=0;e<M[2];e+=p)for(let o=0;o<M[1];o+=p)for(let n=0;n<M[0];n+=p){const u=b[0]+(n+p/2)*R,w=b[1]+(o+p/2)*R,E=b[2]+(e+p/2)*R;if(Math.abs(c(u,w,E))>L*2+.012)continue;let _=0;for(let v=0;v<z;v++)for(let i=0;i<z;i++)for(let d=0;d<z;d++){const k=c(b[0]+(n+d)*R,b[1]+(o+i)*R,b[2]+(e+v)*R);C[d+z*(i+z*v)]=k,k<0&&_++}if(!(_===0||_===z*z*z))for(let v=0;v<p;v++)for(let i=0;i<p;i++)for(let d=0;d<p;d++){const k=[0,0,0,0,0,0,0,0];let s=0;for(let m=0;m<8;m++)k[m]=C[d+(m&1)+z*(i+(m>>1&1)+z*(v+(m>>2)))],k[m]<0&&(s|=1<<m);if(s===0||s===255)continue;let f=0,l=0,t=0,a=0;for(let m=0;m<12;m++){const K=Z[m][0],x=Z[m][1];if(k[K]<0==k[x]<0)continue;const q=k[K]/(k[K]-k[x]);f+=(K&1)+((x&1)-(K&1))*q,l+=(K>>1&1)+((x>>1&1)-(K>>1&1))*q,t+=(K>>2)+((x>>2)-(K>>2))*q,a++}const P=n+d,g=o+i,h=e+v;O.set(P+M[0]*(g+M[1]*h),U.length/3),U.push(b[0]+(P+f/a)*R,b[1]+(g+l/a)*R,b[2]+(h+t/a)*R);const B=k[0]<0;k[1]<0!==B&&A.push(P,g,h,0,B?1:0),k[2]<0!==B&&A.push(P,g,h,1,B?1:0),k[4]<0!==B&&A.push(P,g,h,2,B?1:0)}}const $=[],H=(e,o,n)=>O.get(e+M[0]*(o+M[1]*n));for(let e=0;e<A.length;e+=5){const o=A[e],n=A[e+1],u=A[e+2],w=A[e+3],E=A[e+4];let _,v,i,d;w===0?(_=H(o,n-1,u-1),v=H(o,n,u-1),i=H(o,n,u),d=H(o,n-1,u)):w===1?(_=H(o-1,n,u-1),v=H(o-1,n,u),i=H(o,n,u),d=H(o,n,u-1)):(_=H(o-1,n-1,u),v=H(o,n-1,u),i=H(o,n,u),d=H(o-1,n,u)),!(_===void 0||v===void 0||i===void 0||d===void 0)&&(E?$.push(_,v,i,_,i,d):$.push(_,i,v,_,d,i))}const Q=U.length/3,F=new Float32Array(U),W=new Float32Array(Q*3),et=new Float32Array(Q),G=R*.3;for(let e=0;e<Q;e++){let o=F[e*3],n=F[e*3+1],u=F[e*3+2],w=c(o,n,u),E=c(o+G,n,u)-c(o-G,n,u),_=c(o,n+G,u)-c(o,n-G,u),v=c(o,n,u+G)-c(o,n,u-G);const i=Math.hypot(E,_,v)||1;E/=i,_/=i,v/=i;for(let d=0;d<2;d++){const k=Math.max(-R*.6,Math.min(R*.6,w));o-=E*k,n-=_*k,u-=v*k,d===0&&(w=c(o,n,u))}F[e*3]=o,F[e*3+1]=n,F[e*3+2]=u,W[e*3]=E,W[e*3+1]=_,W[e*3+2]=v,et[e]=D?D(o,n,u,E,_,v):1}return{pos:F,nrm:W,ao:et,idx:new Uint32Array($)}}function lt(J){const b=[.005,.013,.03],y=[.38,.34,.28];return(I,D,R,p,z,M)=>{let c=0;for(let C=0;C<3;C++){const U=b[C],O=I+p*U,A=D+z*U,L=R+M*U;let $=1e3;for(const H of J){const Q=H.fast(O,A,L);Q<$&&($=Q)}c+=y[C]*Math.min(1,Math.max(0,1-$/U))}return 1-c}}function st(J,b,y=!1){const I=[],D=[],R=[],p=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];for(const z of p){const M=z[0]!==0?[0,1,0]:[1,0,0],c=[z[1]*M[2]-z[2]*M[1],z[2]*M[0]-z[0]*M[2],z[0]*M[1]-z[1]*M[0]],C=I.length/3;for(const[U,O]of[[-1,-1],[1,-1],[1,1],[-1,1]]){for(let A=0;A<3;A++)I.push(J[A]+b[A]*(z[A]+M[A]*U+c[A]*O));for(let A=0;A<3;A++)D.push(y?-z[A]:z[A])}y?R.push(C,C+2,C+1,C,C+3,C+2):R.push(C,C+1,C+2,C,C+2,C+3)}return{pos:new Float32Array(I),nrm:new Float32Array(D),ao:new Float32Array(I.length/3).fill(1),idx:new Uint32Array(R)}}function X(J){let b=0,y=0;for(const p of J)b+=p.pos.length/3,y+=p.idx.length;const I={pos:new Float32Array(b*3),nrm:new Float32Array(b*3),ao:new Float32Array(b),idx:new Uint32Array(y),col:new Float32Array(b*3)};let D=0,R=0;for(const p of J){I.pos.set(p.pos,D*3),I.nrm.set(p.nrm,D*3),I.ao.set(p.ao,D);const z=p.pos.length/3,M=p.color||[1,1,1];for(let c=0;c<z;c++)I.col.set(M,(D+c)*3);for(let c=0;c<p.idx.length;c++)I.idx[R+c]=p.idx[c]+D;D+=z,R+=p.idx.length}return I}return{meshShape:mt,makeAO:lt,boxMesh:st,mergeMeshes:X}})(),jt=await(async()=>{const Z=Math.PI/180,mt={spine:[0,0,0],chest:[0,0,0],upperChest:[0,0,0],neck:[-12,-30,0],head:[-8,-48,-6],rightShoulder:[0,0,-5],leftShoulder:[0,0,4],rightUpperArm:[-90,20,-15],leftUpperArm:[-90,-20,12],rightLowerArm:[0,88,0],leftLowerArm:[0,-80,0],rightHand:[0,-10,6],leftHand:[0,10,-6],rightUpperLeg:[-6,0,-4],leftUpperLeg:[-7,0,5],rightLowerLeg:[2,0,0],leftLowerLeg:[4,0,0],rightFoot:[62,0,0],leftFoot:[58,0,0],rightToes:[10,0,0],leftToes:[10,0,0]},lt=["Index","Middle","Ring","Little"];for(const e of["left","right"])for(const o of lt)for(const n of["Proximal","Intermediate","Distal"]){const u=e==="left"?-1:1;mt[e+o+n]=[0,0,u*(n==="Proximal"?12:16)]}const st={relaxed:.45,blink:0};function X(e){const o=e||"",n=/EyeHighlight|FaceEyeline|FaceEyelash|FaceBrow|FaceMouth|Eyelash|Eyeline|Brow|Mouth|Tooth|Teeth|Tongue/i.test(o),u=/_EYE\b|EyeWhite|EyeIris|Iris|EyeWhite/i.test(o);let w=0;return/_HAIR\b|Hair/i.test(o)?w=2:/_CLOTH\b|Tops|Bottoms|Onepiece|One_?piece|Dress|Skirt|Shoes|Shoe|Socks|Accessory|Cloth/i.test(o)&&(w=1),{surf:w,overlay:n,eye:u,face:/Face|_FACE\b|_EYE\b/i.test(o)}}function J(e){const o=e.extensions||{};if(o.VRMC_vrm){const n=o.VRMC_vrm,u={};for(const[E,_]of Object.entries(n.humanoid.humanBones))u[E]=_.node;const w={};for(const[E,_]of Object.entries({...n.expressions?.preset||{},...n.expressions?.custom||{}}))w[E]=(_.morphTargetBinds||[]).map(v=>({node:v.node,index:v.index,weight:v.weight}));return{version:1,bones:u,ex:w}}if(o.VRM){const n=o.VRM,u={};for(const v of n.humanoid.humanBones)u[v.bone]=v.node;const w={};e.nodes.forEach((v,i)=>{v.mesh!==void 0&&w[v.mesh]===void 0&&(w[v.mesh]=i)});const E={joy:"happy",fun:"relaxed",sorrow:"sad",a:"aa",i:"ih",u:"ou",e:"ee",o:"oh",blink_l:"blinkLeft",blink_r:"blinkRight"},_={};for(const v of n.blendShapeMaster?.blendShapeGroups||[]){const i=v.presetName&&v.presetName!=="未知"?E[v.presetName]||v.presetName:v.name;_[i]=(v.binds||[]).map(d=>({node:w[d.mesh],index:d.index,weight:d.weight/100}))}return{version:0,bones:u,ex:_}}return null}const b={hips:["spine",[0,0,1]],spine:["chest",[0,0,1]],chest:["upperChest",[0,0,1]],upperChest:["neck",[0,0,1]],neck:["head",[0,0,1]]};for(const[e,o]of[["left",1],["right",-1]])b[e+"Shoulder"]=[e+"UpperArm",[0,-1,0]],b[e+"UpperArm"]=[e+"LowerArm",[0,-1,0]],b[e+"LowerArm"]=[e+"Hand",[0,-1,0]],b[e+"Hand"]=[e+"MiddleProximal",[0,-1,0]],b[e+"UpperLeg"]=[e+"LowerLeg",[0,0,1]],b[e+"LowerLeg"]=[e+"Foot",[0,0,1]],b[e+"Foot"]=[e+"Toes",[0,-1,0]],b["_"+e]=o;const y=e=>new r.Vector3().fromArray(e),I=e=>e.getWorldPosition(new r.Vector3);function D(e,o){const n=e.parent.getWorldQuaternion(new r.Quaternion);e.quaternion.copy(n.invert().multiply(o)),e.updateMatrixWorld(!0)}function R(e,o){const n=new Map(Object.entries(o).map(([w,E])=>[E,w])),u=[];return e.traverse(w=>{n.has(w)&&u.push([n.get(w),w])}),u}function p(e,o,n,u){if(u)for(const[k,s]of u)k.quaternion.copy(s);e.updateMatrixWorld(!0);const w=R(e,o),E=new Map,_=new Map;for(const[k,s]of w){E.set(s,s.getWorldQuaternion(new r.Quaternion));const f=b[k]&&o[b[k][0]];f&&_.set(s,I(f).sub(I(s)).normalize())}const v=new Map,i=k=>{for(let s=k.parent;s;s=s.parent)if(v.has(s))return v.get(s);return new r.Quaternion},d=new r.Euler;for(const[k,s]of w){const f=n[k];let l;if(f&&!Array.isArray(f)&&f.aim&&_.has(s)){const t=_.get(s),a=y(f.aim).normalize();if(f.ref){const P=(B,m)=>{const K=m.clone().addScaledVector(B,-m.dot(B)).normalize();return new r.Matrix4().makeBasis(B,K,new r.Vector3().crossVectors(B,K))},g=P(t,y(b[k][1])),h=P(a,y(f.ref));l=new r.Quaternion().setFromRotationMatrix(h.multiply(g.transpose()))}else l=new r.Quaternion().setFromUnitVectors(t,a)}else l=i(s).clone(),Array.isArray(f)&&l.multiply(new r.Quaternion().setFromEuler(d.set(f[0]*Z,f[1]*Z,f[2]*Z,"ZYX")));v.set(s,l),D(s,l.clone().multiply(E.get(s)))}}function z(e,o,n,u){if(!o.hips||!o.rightUpperLeg||!o.rightLowerLeg||!o.rightFoot||!o.leftFoot||!Array.isArray(n.rightUpperLeg)||!Array.isArray(n.leftUpperLeg))return n;const w=I;e.updateMatrixWorld(!0);const _=-.063*(w(o.rightUpperLeg).distanceTo(w(o.rightLowerLeg))+w(o.rightLowerLeg).distanceTo(w(o.rightFoot))),v=k=>({...n,rightUpperLeg:[n.rightUpperLeg[0]+k,...n.rightUpperLeg.slice(1)],leftUpperLeg:[n.leftUpperLeg[0]+k,...n.leftUpperLeg.slice(1)]});let i=-25,d=25;for(let k=0;k<16;k++){const s=(i+d)/2;p(e,o,v(s),u);const f=-w(o.hips).z;(-w(o.rightFoot).z-f+-w(o.leftFoot).z-f)/2>_?d=s:i=s}return v((i+d)/2)}function M(e,o,n){for(const[u,w]of Object.entries(n))for(const E of o[u]||[]){const _=e(E.node);_&&_.traverse(v=>{v.morphTargetInfluences&&E.index<v.morphTargetInfluences.length&&(v.morphTargetInfluences[E.index]+=w*E.weight)})}}function c(e){const o=e.geometry,n=o.attributes.position,u=o.attributes.normal,w=n.count,E=new Float32Array(w*3),_=new Float32Array(w*3),v=o.morphAttributes.position,i=o.morphAttributes.normal,d=e.morphTargetInfluences,k=d?d.map((x,q)=>[x,q]).filter(([x])=>Math.abs(x)>1e-4):[],s=new r.Vector3,f=new r.Vector3,l=new r.Vector3,t=new r.Vector3,a=new r.Vector3;let P=null;if(e.isSkinnedMesh){const x=e.skeleton;P=x.bones.map((q,T)=>new r.Matrix4().multiplyMatrices(q.matrixWorld,x.boneInverses[T]).multiply(e.bindMatrix))}const g=new r.Matrix3,h=o.attributes.skinIndex,B=o.attributes.skinWeight;for(let x=0;x<w;x++){s.fromBufferAttribute(n,x),u?f.fromBufferAttribute(u,x):f.set(0,1,0);for(const[q,T]of k)s.addScaledVector(a.fromBufferAttribute(v[T],x),q),i&&i[T]&&f.addScaledVector(a.fromBufferAttribute(i[T],x),q);if(P){l.set(0,0,0),t.set(0,0,0);for(let q=0;q<4;q++){const T=B.getComponent(x,q);if(T===0)continue;const S=P[h.getComponent(x,q)];l.addScaledVector(a.copy(s).applyMatrix4(S),T),t.addScaledVector(a.copy(f).applyMatrix3(g.setFromMatrix4(S)),T)}}else l.copy(s).applyMatrix4(e.matrixWorld),t.copy(f).applyMatrix3(g.getNormalMatrix(e.matrixWorld));t.normalize(),E[x*3]=l.x,E[x*3+1]=l.y,E[x*3+2]=l.z,_[x*3]=t.x,_[x*3+1]=t.y,_[x*3+2]=t.z}const m=new Float32Array(w*2);if(o.attributes.uv)for(let x=0;x<w;x++)m[x*2]=o.attributes.uv.getX(x),m[x*2+1]=o.attributes.uv.getY(x);let K;if(o.index)K=Uint32Array.from(o.index.array);else{K=new Uint32Array(w);for(let x=0;x<w;x++)K[x]=x}if(!P&&e.matrixWorld.determinant()<0)for(let x=0;x<K.length;x+=3){const q=K[x+1];K[x+1]=K[x+2],K[x+2]=q}return{pos:E,nrm:_,uv:m,idx:K}}const C=new Map;function U(e){if(!e||!e.image)return null;if(C.has(e.image))return C.get(e.image);const o=e.image,n=o.width,u=o.height,w=document.createElement("canvas");w.width=n,w.height=u;const E=w.getContext("2d",{willReadFrequently:!0});E.drawImage(o,0,0);const _=E.getImageData(0,0,n,u).data,v=new Float32Array(256);for(let d=0;d<256;d++){const k=d/255;v[d]=k<=.04045?k/12.92:Math.pow((k+.055)/1.055,2.4)}const i={w:n,h:u,d:_,lut:v,flipY:e.flipY};return C.set(e.image,i),i}function O(e,o,n,u,w){o-=Math.floor(o),n-=Math.floor(n),e.flipY&&(n=1-n);const E=Math.min(e.w-1,Math.floor(o*e.w)),_=Math.min(e.h-1,Math.floor(n*e.h)),v=(_*e.w+E)*4;return u[w]=e.lut[e.d[v]],u[w+1]=e.lut[e.d[v+1]],u[w+2]=e.lut[e.d[v+2]],e.d[v+3]/255}function A(e,o,n,u){const w=new Float32Array(u*3);for(let E=0;E<n.length;E+=3){const _=n[E],v=n[E+1],i=n[E+2],d=[e[v*3]-e[_*3],e[v*3+1]-e[_*3+1],e[v*3+2]-e[_*3+2]],k=[e[i*3]-e[_*3],e[i*3+1]-e[_*3+1],e[i*3+2]-e[_*3+2]],s=o[v*2]-o[_*2],f=o[v*2+1]-o[_*2+1],l=o[i*2]-o[_*2],t=o[i*2+1]-o[_*2+1],a=s*t-l*f;if(Math.abs(a)<1e-12)continue;const P=1/a;for(let g=0;g<3;g++){const h=(k[g]*s-d[g]*l)*P;w[_*3+g]+=h,w[v*3+g]+=h,w[i*3+g]+=h}}for(let E=0;E<u;E++){const _=Math.hypot(w[E*3],w[E*3+1],w[E*3+2]);if(_>1e-12)for(let v=0;v<3;v++)w[E*3+v]/=_;else w.set([0,0,1],E*3)}return w}function L(e,o=.006){let n=[1e9,1e9],u=[-1e9,-1e9];for(const l of e)for(let t=0;t<l.pos.length;t+=3)n[0]=Math.min(n[0],l.pos[t]),u[0]=Math.max(u[0],l.pos[t]),n[1]=Math.min(n[1],l.pos[t+2]),u[1]=Math.max(u[1],l.pos[t+2]);const w=.12;n=[n[0]-w,n[1]-w],u=[u[0]+w,u[1]+w];const E=Math.ceil((u[0]-n[0])/o),_=Math.ceil((u[1]-n[1])/o),v=new Float32Array(E*_).fill(1e9),i=new Float32Array(E*_).fill(-1e9);for(const l of e){const t=l.pos,a=l.idx;for(let P=0;P<a.length;P+=3){const g=a[P]*3,h=a[P+1]*3,B=a[P+2]*3,m=Math.min(t[g],t[h],t[B]),K=Math.max(t[g],t[h],t[B]),x=Math.min(t[g+2],t[h+2],t[B+2]),q=Math.max(t[g+2],t[h+2],t[B+2]),T=Math.min(t[g+1],t[h+1],t[B+1]),S=Math.max(t[g+1],t[h+1],t[B+1]);for(let N=Math.floor((x-n[1])/o);N<=Math.floor((q-n[1])/o);N++)for(let tt=Math.floor((m-n[0])/o);tt<=Math.floor((K-n[0])/o);tt++){const j=tt+E*N;T<v[j]&&(v[j]=T),S>i[j]&&(i[j]=S)}}}const d=new Float32Array(E*_),k=new Float32Array(E*_);for(let l=0;l<E*_;l++)d[l]=v[l]<1e8?0:1e9,k[l]=v[l];const s=(l,t,a)=>{d[t]+a<d[l]&&(d[l]=d[t]+a,k[l]=k[t])},f=o*Math.SQRT2;for(let l=0;l<_;l++)for(let t=0;t<E;t++){const a=t+E*l;t>0&&s(a,a-1,o),l>0&&(s(a,a-E,o),t>0&&s(a,a-E-1,f),t<E-1&&s(a,a-E+1,f))}for(let l=_-1;l>=0;l--)for(let t=E-1;t>=0;t--){const a=t+E*l;t<E-1&&s(a,a+1,o),l<_-1&&(s(a,a+E,o),t<E-1&&s(a,a+E+1,f),t>0&&s(a,a+E-1,f))}return{fast(l,t,a){const P=Math.floor((l-n[0])/o),g=Math.floor((a-n[1])/o);if(P<0||g<0||P>=E||g>=_)return 1;const h=P+E*g;return d[h]===0?Math.max(v[h]-t,t-i[h]):Math.hypot(d[h],Math.max(0,k[h]-t))}}}function $(e,o,n,u={}){const w=e.pos.length/3,E=e.idx.length/3,_=[0,0,0],v=[0,0,0],i=t=>t<=.0031308?t*12.92:1.055*Math.pow(t,1/2.4)-.055,d=new Int32Array(w),k=new Map;for(let t=0;t<w;t++){const a=Math.round(e.pos[t*3]*1e4)+","+Math.round(e.pos[t*3+1]*1e4)+","+Math.round(e.pos[t*3+2]*1e4);let P=k.get(a);P===void 0&&(P=t,k.set(a,t)),d[t]=P}let s=new Uint8Array(w);for(let t=0;t<w;t++)O(o,e.uv[t*2],e.uv[t*2+1],_,0),v[0]=e.pos[t*3],v[1]=e.pos[t*3+1],v[2]=e.pos[t*3+2],s[t]=n(v,[i(_[0]),i(_[1]),i(_[2])]);const f=new Uint8Array(E),l=()=>{for(let t=0;t<E;t++){const a=s[d[e.idx[t*3]]],P=s[d[e.idx[t*3+1]]],g=s[d[e.idx[t*3+2]]];f[t]=a===P||a===g?a:P===g?P:1}};for(let t=0;t<w;t++)s[t]=s[d[t]];l();for(let t=0;t<3;t++){const a=new Uint16Array(w*3);for(let P=0;P<E;P++)for(let g=0;g<3;g++)a[d[e.idx[P*3+g]]*3+f[P]]++;for(let P=0;P<w;P++)if(d[P]===P){const g=P*3;s[P]=a[g]>=a[g+1]&&a[g]>=a[g+2]?0:a[g+1]>=a[g+2]?1:2}l()}for(const[t,a]of Object.entries(u)){const P=+t,g=new Int32Array(w).map((K,x)=>x),h=K=>{for(;g[K]!==K;)g[K]=g[g[K]],K=g[K];return K};for(let K=0;K<E;K++)if(f[K]===P){const x=h(d[e.idx[K*3]]);for(let q=1;q<3;q++){const T=h(d[e.idx[K*3+q]]);T!==x&&(g[T]=x)}}const B=new Set,m=[0,0,0];for(let K=0;K<E;K++)if(f[K]===P){const x=e.idx[K*3];m[0]=e.pos[x*3],m[1]=e.pos[x*3+1],m[2]=e.pos[x*3+2],a(m)&&B.add(h(d[x]))}for(let K=0;K<E;K++)f[K]===P&&!B.has(h(d[e.idx[K*3]]))&&(f[K]=1)}return f}async function H(e,o=()=>{}){const n=await fetch(e);if(!n.ok)throw new Error(n.status+" "+e);const u=+n.headers.get("content-length")||0;let w;if(n.body&&u){const E=n.body.getReader(),_=[];let v=0;for(;;){const{done:d,value:k}=await E.read();if(d)break;_.push(k),v+=k.length,o(Math.min(1,v/u))}w=new Uint8Array(v);let i=0;for(const d of _)w.set(d,i),i+=d.length}else w=new Uint8Array(await n.arrayBuffer());if(o(1),w.length>2&&w[0]===31&&w[1]===139){if(typeof DecompressionStream>"u")throw new Error("当前浏览器不支持解压资源："+e);return await new Response(new Blob([w]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer()}return w.buffer}async function Q(e,{pose:o=mt,expression:n=st,progress:u=()=>{},static:w=!1,rot:E=[0,0,0],scale:_=1,split:v=null,splitSeeds:i={},tints:d={}}={}){const k=await new ie().parseAsync(await H(e,u),r.LoaderUtils.extractUrlBase(e)),s=k.parser.json,f=J(s),l=k.scene,t=async x=>x===void 0?null:k.parser.getDependency("node",x),a={};if(f)for(const[x,q]of Object.entries(f.bones))a[x]=await t(q);const P=new r.Group;if(P.add(l),P.scale.setScalar(_||1),f&&f.version===0&&P.quaternion.setFromAxisAngle(new r.Vector3(0,1,0),Math.PI),P.updateMatrixWorld(!0),f){const x=new Map;for(const T of Object.values(f.ex))for(const S of T)S.node!==void 0&&!x.has(S.node)&&x.set(S.node,await t(S.node));M(T=>x.get(T),f.ex,n);const q=new Map(Object.values(a).map(T=>[T,T.quaternion.clone()]));p(P,a,z(P,a,o,q),q)}const g=w?new r.Quaternion().setFromEuler(new r.Euler(E[0]*Z,E[1]*Z,E[2]*Z,"YXZ")):new r.Quaternion().setFromRotationMatrix(new r.Matrix4().makeBasis(new r.Vector3(-1,0,0),new r.Vector3(0,0,-1),new r.Vector3(0,-1,0)));P.quaternion.premultiply(g),P.updateMatrixWorld(!0);const h=[];l.traverse(x=>{x.isMesh&&x.visible&&h.push(x)});const B=[];for(const x of h){const q=Array.isArray(x.material)?x.material:[x.material],T=c(x),S=x.geometry.groups.length&&Array.isArray(x.material)?x.geometry.groups:[{start:0,count:T.idx.length,materialIndex:0}];if(v&&S.length===1&&q[0].map){const N=q[0],tt=U(N.map),j=$(T,tt,v,i);for(const[V,rt]of[[0,"skin"],[1,"fabric"],[2,"hair"]]){const ut=T.idx.filter((at,dt)=>j[dt/3|0]===V);ut.length&&B.push({name:rt,surf:V,overlay:!1,eye:!1,face:!1,auto:!0,pos:T.pos,nrm:T.nrm,uv:T.uv,idx:ut,map:N.map,color:(N.color?N.color.clone():new r.Color(1,1,1)).multiply(new r.Color(...d[V]||[1,1,1])),alphaCut:0,doubleSided:!0})}continue}for(const N of S){const tt=q[N.materialIndex]||q[0],j=X(tt.name||x.name);B.push({name:tt.name||x.name,...j,pos:T.pos,nrm:T.nrm,uv:T.uv,idx:T.idx.slice(N.start,N.start+N.count),map:tt.map||null,color:tt.color?tt.color.clone():new r.Color(1,1,1),alphaCut:tt.alphaTest>0?tt.alphaTest:tt.transparent?.5:0,doubleSided:tt.side===r.DoubleSide})}}const m=x=>a[x]?a[x].getWorldPosition(new r.Vector3).toArray():null,K={};for(const x of Object.keys(a))K[x]=m(x);return{parts:B,bones:K,boneObjs:a,vrm:!!f,scene:P}}function F(e,o){const n=e.pos,u=e.nrm,w=e.uv,E=e.idx,_=n.length/3,v=new Float32Array(_*3),i=new Map,d=m=>Math.round(n[m*3]*2e4)+","+Math.round(n[m*3+1]*2e4)+","+Math.round(n[m*3+2]*2e4);for(let m=0;m<_;m++){const K=d(m),x=i.get(K)||[0,0,0];x[0]+=u[m*3],x[1]+=u[m*3+1],x[2]+=u[m*3+2],i.set(K,x)}for(let m=0;m<_;m++){const K=i.get(d(m)),x=Math.hypot(K[0],K[1],K[2])||1;v[m*3]=K[0]/x,v[m*3+1]=K[1]/x,v[m*3+2]=K[2]/x}const k=[],s=[],f=[],l=[],t=[],a=[],P=new Map,g=E.length/3,h=(m,K,x,q)=>{const T=E[m*3],S=E[m*3+1],N=E[m*3+2],tt=W(n,v,T,S,N,K,x,q);k.push(tt[0],tt[1],tt[2]);let j=u[T*3]*K+u[S*3]*x+u[N*3]*q,V=u[T*3+1]*K+u[S*3+1]*x+u[N*3+1]*q,rt=u[T*3+2]*K+u[S*3+2]*x+u[N*3+2]*q;const ut=Math.hypot(j,V,rt)||1;return s.push(j/ut,V/ut,rt/ut),f.push(w[T*2]*K+w[S*2]*x+w[N*2]*q,w[T*2+1]*K+w[S*2+1]*x+w[N*2+1]*q),l.push(T,S,N),t.push(K,x,q),k.length/3-1},B=new Map;for(let m=0;m<g;m++){const K=[E[m*3],E[m*3+1],E[m*3+2]],x=new Int32Array((o+1)*(o+1)),q=(T,S)=>T+S*(o+1);for(let T=0;T<=o;T++)for(let S=0;S+T<=o;S++){const N=S/o,tt=T/o,j=1-N-tt;let V;if(S===0&&T===0||S===o||T===o){const rt=S===o?K[1]:T===o?K[2]:K[0];V=B.get(rt),V===void 0&&(V=h(m,S===0&&T===0?1:0,S===o?1:0,T===o?1:0),B.set(rt,V))}else if(T===0||S===0||S+T===o){const[rt,ut,at]=T===0?[K[0],K[1],S]:S===0?[K[0],K[2],T]:[K[1],K[2],T],dt=Math.min(rt,ut),ot=Math.max(rt,ut),nt=dt*_+ot,ht=rt===dt?at:o-at;let pt=P.get(nt);pt||(pt=new Int32Array(o-1).fill(-1),P.set(nt,pt)),pt[ht-1]<0&&(pt[ht-1]=h(m,j,N,tt)),V=pt[ht-1]}else V=h(m,j,N,tt);x[q(S,T)]=V}for(let T=0;T<o;T++)for(let S=0;S+T<o;S++)a.push(x[q(S,T)],x[q(S+1,T)],x[q(S,T+1)]),S+T<o-1&&a.push(x[q(S+1,T)],x[q(S+1,T+1)],x[q(S,T+1)])}return{pos:new Float32Array(k),nrm:new Float32Array(s),uv:new Float32Array(f),idx:new Uint32Array(a),src:{pos:n,nrm:u,corner:new Uint32Array(l),bary:new Float32Array(t)}}}function W(e,o,n,u,w,E,_,v){const i=(g,h)=>e[g*3+h],d=(g,h)=>o[g*3+h],k=[0,0,0],s=(e[u*3]-e[n*3])*o[n*3]+(e[u*3+1]-e[n*3+1])*o[n*3+1]+(e[u*3+2]-e[n*3+2])*o[n*3+2],f=(e[n*3]-e[u*3])*o[u*3]+(e[n*3+1]-e[u*3+1])*o[u*3+1]+(e[n*3+2]-e[u*3+2])*o[u*3+2],l=(e[w*3]-e[u*3])*o[u*3]+(e[w*3+1]-e[u*3+1])*o[u*3+1]+(e[w*3+2]-e[u*3+2])*o[u*3+2],t=(e[u*3]-e[w*3])*o[w*3]+(e[u*3+1]-e[w*3+1])*o[w*3+1]+(e[u*3+2]-e[w*3+2])*o[w*3+2],a=(e[n*3]-e[w*3])*o[w*3]+(e[n*3+1]-e[w*3+1])*o[w*3+1]+(e[n*3+2]-e[w*3+2])*o[w*3+2],P=(e[w*3]-e[n*3])*o[n*3]+(e[w*3+1]-e[n*3+1])*o[n*3+1]+(e[w*3+2]-e[n*3+2])*o[n*3+2];for(let g=0;g<3;g++){const h=i(n,g),B=i(u,g),m=i(w,g),K=(2*h+B-s*d(n,g))/3,x=(2*B+h-f*d(u,g))/3,q=(2*B+m-l*d(u,g))/3,T=(2*m+B-t*d(w,g))/3,S=(2*m+h-a*d(w,g))/3,N=(2*h+m-P*d(n,g))/3,tt=(K+x+q+T+S+N)/6,j=(h+B+m)/3,V=tt+(tt-j)/2;k[g]=h*E*E*E+B*_*_*_+m*v*v*v+3*K*E*E*_+3*x*E*_*_+3*N*E*E*v+3*q*_*_*v+3*S*E*v*v+3*T*_*v*v+6*V*E*_*v}return k}function et(e,o,n,u=3,{crown:w=null}={}){const E=[],_=(i,d,k=[0,0,0])=>{const s=n[i];s&&E.push([s[0]+o[0]+k[0],s[1]+o[1]+k[1],s[2]+o[2]+k[2],d])};for(const i of["left","right"]){_(i+"LowerArm",.045),_(i+"LowerLeg",.055),_(i+"Foot",.04),_(i+"Toes",.045);for(const d of["Thumb",...lt])_(i+d+"Distal",.018)}const v=[];for(const i of e){const d=new Map,k=i.idx;let s=new Uint32Array(k.length);for(let q=0;q<k.length;q++){let T=d.get(k[q]);T===void 0&&(T=d.size,d.set(k[q],T)),s[q]=T}let f=d.size,l=new Float32Array(f*3),t=new Float32Array(f*3),a=new Float32Array(f*2),P=null;for(const[q,T]of d){for(let S=0;S<3;S++)l[T*3+S]=i.pos[q*3+S]+o[S],t[T*3+S]=i.nrm[q*3+S];a[T*2]=i.uv[q*2],a[T*2+1]=i.uv[q*2+1]}const g=typeof u=="function"?u(i):i.face||i.overlay?1:i.surf===2?2:u;g>1&&({pos:l,nrm:t,uv:a,idx:s,src:P}=F({pos:l,nrm:t,uv:a,idx:s},g),f=l.length/3);const h=new Float32Array(f*3),B=U(i.map),m=i.color;for(let q=0;q<f;q++)B?O(B,a[q*2],a[q*2+1],h,q*3):h.set([1,1,1],q*3),h[q*3]*=m.r,h[q*3+1]*=m.g,h[q*3+2]*=m.b;const K=new Float32Array(f);let x;if(i.surf===2&&w){x=new Float32Array(f*3);for(let q=0;q<f;q++){let T=l[q*3]-w[0],S=l[q*3+1]-w[1],N=l[q*3+2]-w[2];const tt=Math.hypot(T,S,N)||1,j=Math.min(1,Math.max(0,(tt-.08)/.12));T=T/tt*(1-j),S=S/tt*(1-j)-j,N=N/tt*(1-j);const V=t[q*3],rt=t[q*3+1],ut=t[q*3+2],at=T*V+S*rt+N*ut;x[q*3]=T-at*V,x[q*3+1]=S-at*rt,x[q*3+2]=N-at*ut,K[q]=(Math.atan2(l[q*3]-w[0],l[q*3+2]-w[2])+Math.PI)*60}}else if(i.surf===2){x=A(l,a,s,f);for(let q=0;q<f;q++)K[q]=a[q*2]*900}else if(i.surf===0&&!i.face)for(let q=0;q<f;q++){let T=0;for(const S of E){const N=Math.hypot(l[q*3]-S[0],l[q*3+1]-S[1],l[q*3+2]-S[2])/S[3];N<1&&(T=Math.max(T,(1-N)*(1-N)))}K[q]=T}v.push({...i,pos:l,nrm:t,uv:a,idx:s,col:h,tint:K,tan:x,src:P,ao:new Float32Array(f).fill(1)})}return v}function G(e,o,n=.05,u=8){const w={},E=[];for(let k=0;k<u;k++){const s=Math.sqrt((k+.5)/u),f=k*2.39996;E.push([s*Math.cos(f),s*Math.sin(f),Math.sqrt(1-s*s)])}const _=o.src?o.src.pos:o.pos,v=o.src?o.src.nrm:o.nrm,i=_.length/3,d=o.src?new Float32Array(i):o.ao;for(let k=0;k<i;k++){const s=[v[k*3],v[k*3+1],v[k*3+2]],f=Math.abs(s[0])<.9?[1,0,0]:[0,1,0];let l=[s[1]*f[2]-s[2]*f[1],s[2]*f[0]-s[0]*f[2],s[0]*f[1]-s[1]*f[0]];const t=Math.hypot(...l);l=l.map(h=>h/t);const a=[s[1]*l[2]-s[2]*l[1],s[2]*l[0]-s[0]*l[2],s[0]*l[1]-s[1]*l[0]],P=[_[k*3]+s[0]*.0015,_[k*3+1]+s[1]*.0015,_[k*3+2]+s[2]*.0015];let g=0;for(const h of E){const B=l[0]*h[0]+a[0]*h[1]+s[0]*h[2],m=l[1]*h[0]+a[1]*h[1]+s[1]*h[2],K=l[2]*h[0]+a[2]*h[1]+s[2]*h[2];e.raycast(P[0],P[1],P[2],B,m,K,n,w)&&(g+=1-w.t/n*.6)}d[k]=1-.8*g/u}if(o.src){const k=o.src.corner,s=o.src.bary;for(let f=0;f<o.ao.length;f++)o.ao[f]=d[k[f*3]]*s[f*3]+d[k[f*3+1]]*s[f*3+1]+d[k[f*3+2]]*s[f*3+2]}}return{PRONE_POSE:mt,PRONE_EXPRESSION:st,bodyField:L,fetchBytes:H,loadCharacter:Q,finishParts:et,rayAO:G}})(),le=await(async()=>{const{fetchBytes:Z}=jt,mt=new Float32Array(256);for(let X=0;X<256;X++){const J=X/255;mt[X]=J<=.04045?J/12.92:Math.pow((J+.055)/1.055,2.4)}async function lt(X){const J=await Z(X),b=new DataView(J);if(b.getUint32(0,!0)!==1413825862)throw new Error("not a feet file");const y=b.getUint32(4,!0),I=JSON.parse(new TextDecoder().decode(new Uint8Array(J,8,y))),D={};let R=8+y;for(const[o,n]of I.arrays)D[o]=J.slice(R,R+n),R+=n+3&-4;const p=I.verts,z=new Float32Array(D.pos),M=new Float32Array(D.ridge),c=new Float32Array(D.cu),C=new Int16Array(D.nuv),U=new Uint8Array(D.q8),O=new Float32Array(D.pore),A=new Uint8Array(D.pw),L=new Float32Array(p*3),$=new Float32Array(p*3),H=new Float32Array(p),Q=new Float32Array(p*4),F=new Float32Array(p*4),W=new Uint8Array(p);for(let o=0;o<p;o++){const n=o*8;$[o*3]=mt[U[n]],$[o*3+1]=mt[U[n+1]],$[o*3+2]=mt[U[n+2]],H[o]=U[n+3]/255,W[o]=U[n+7],Q[o*4]=U[n+4]/255,Q[o*4+1]=M[o],Q[o*4+2]=U[n+5]/255,Q[o*4+3]=U[n+6]/255,F[o*4]=C[o*2]/4096,F[o*4+1]=C[o*2+1]/4096,F[o*4+2]=c[o],F[o*4+3]=A[o]/255,L[o*3]=O[o*2],L[o*3+1]=O[o*2+1]}let et=0;for(const o of I.feet)et+=o.nt;const G=new Uint32Array(et*3);let e=0;return I.feet.forEach((o,n)=>{const u=new Uint16Array(D["idx"+n]);for(let w=0;w<u.length;w++)G[e++]=u[w]+o.v0}),{pos:z,idx:G,col:$,tint:H,footA:Q,footB:F,tan:L,seam:W}}function st(X,J){const{pos:b,idx:y,col:I,seam:D}=X,R=b.length/3,p=new Float32Array(R*3),z=6,M=new Float32Array(R*z*3),c=L=>[X.footA[L*4+1],X.footB[L*4],X.footB[L*4+1],X.footB[L*4+2],X.tan[L*3],X.tan[L*3+1]];for(let L=0;L<y.length;L+=3){const $=y[L]*3,H=y[L+1]*3,Q=y[L+2]*3,F=[b[H]-b[$],b[H+1]-b[$+1],b[H+2]-b[$+2]],W=[b[Q]-b[$],b[Q+1]-b[$+1],b[Q+2]-b[$+2]],et=F[1]*W[2]-F[2]*W[1],G=F[2]*W[0]-F[0]*W[2],e=F[0]*W[1]-F[1]*W[0];for(const i of[$,H,Q])p[i]+=et,p[i+1]+=G,p[i+2]+=e;const o=et*et+G*G+e*e;if(o<1e-24)continue;const n=[W[1]*e-W[2]*G,W[2]*et-W[0]*e,W[0]*G-W[1]*et],u=[G*F[2]-e*F[1],e*F[0]-et*F[2],et*F[1]-G*F[0]],w=c(y[L]),E=c(y[L+1]),_=c(y[L+2]),v=Math.sqrt(o);for(let i=0;i<z;i++){const d=E[i]-w[i],k=_[i]-w[i];for(let s=0;s<3;s++){const f=(d*n[s]+k*u[s])/o*v;for(const l of[y[L],y[L+1],y[L+2]])M[l*z*3+i*3+s]+=f}}}const C=new Float32Array(R);for(let L=0;L<R;L++){const $=Math.hypot(p[L*3],p[L*3+1],p[L*3+2])||1;C[L]=$,p[L*3]/=$,p[L*3+1]/=$,p[L*3+2]/=$}for(let L=0;L<R;L++)for(let $=0;$<z*3;$++)M[L*z*3+$]/=C[L];let U=0,O=0;if(J){const L=J.pos,$=[1e9,1e9,1e9],H=[-1e9,-1e9,-1e9];for(let F=0;F<R;F++)if(D[F])for(let W=0;W<3;W++)$[W]=Math.min($[W],b[F*3+W]-.003),H[W]=Math.max(H[W],b[F*3+W]+.003);const Q=[];for(let F=0;F<L.length;F+=3)L[F]>$[0]&&L[F]<H[0]&&L[F+1]>$[1]&&L[F+1]<H[1]&&L[F+2]>$[2]&&L[F+2]<H[2]&&Q.push(F);for(let F=0;F<R;F++)if(D[F]){let W=-1,et=1e9;for(const G of Q){const e=(L[G]-b[F*3])**2+(L[G+1]-b[F*3+1])**2+(L[G+2]-b[F*3+2])**2;e<et&&(et=e,W=G)}if(W<0||et>25e-7)continue;for(let G=0;G<3;G++)b[F*3+G]=L[W+G],p[F*3+G]=J.nrm[W+G],I[F*3+G]=J.col[W+G];U++,O=Math.max(O,et)}}let A=0;for(let L=0;L<R;L++)A+=D[L];return console.info("[feet]",R,"vertices,",y.length/3,"triangles; seam",U+"/"+A,"welded, worst",(Math.sqrt(O)*1e3).toFixed(3),"mm"),{pos:b,nrm:p,idx:y,col:I,tint:X.tint,ao:new Float32Array(R).fill(1),tan:X.tan,footA:X.footA,footB:X.footB,footGrad:M}}return{loadFeet:lt,finishFeet:st}})(),ce=await(async()=>{class Z{constructor(lt,st,X,J){this.pos=lt,this.nrm=st,this.idx=X,this.type=J;const b=X.length/3;this.order=new Uint32Array(b);const y=new Float32Array(b*3);for(let D=0;D<b;D++){this.order[D]=D;for(let R=0;R<3;R++)y[D*3+R]=(lt[X[D*3]*3+R]+lt[X[D*3+1]*3+R]+lt[X[D*3+2]*3+R])/3}const I=Math.max(8,b);this.bb=new Float32Array(I*6),this.left=new Int32Array(I),this.right=new Int32Array(I),this.start=new Int32Array(I),this.count=new Int32Array(I),this.nn=0,this._cen=y,this._build(0,b),this._cen=null,this.stack=new Int32Array(128)}_build(lt,st){const X=this.nn++,{pos:J,idx:b,order:y,bb:I}=this,D=this._cen;let R=[1e9,1e9,1e9],p=[-1e9,-1e9,-1e9],z=[1e9,1e9,1e9],M=[-1e9,-1e9,-1e9];for(let L=lt;L<lt+st;L++){const $=y[L];for(let H=0;H<3;H++){const Q=b[$*3+H]*3;for(let F=0;F<3;F++){const W=J[Q+F];W<R[F]&&(R[F]=W),W>p[F]&&(p[F]=W)}}for(let H=0;H<3;H++){const Q=D[$*3+H];Q<z[H]&&(z[H]=Q),Q>M[H]&&(M[H]=Q)}}for(let L=0;L<3;L++)I[X*6+L]=R[L]-1e-6,I[X*6+3+L]=p[L]+1e-6;if(this.left[X]=-1,this.start[X]=lt,this.count[X]=st,st<=6)return X;let c=0;M[1]-z[1]>M[c]-z[c]&&(c=1),M[2]-z[2]>M[c]-z[c]&&(c=2);const C=(z[c]+M[c])/2;let U=lt,O=lt+st-1;for(;U<=O;)if(D[y[U]*3+c]<C)U++;else{const L=y[U];y[U]=y[O],y[O]=L,O--}let A=U-lt;return(A===0||A===st)&&(A=st>>1),this.left[X]=this._build(lt,A),this.right[X]=this._build(lt+A,st-A),X}_boxD2(lt,st,X,J){const b=this.bb,y=lt*6,I=st<b[y]?b[y]-st:st>b[y+3]?st-b[y+3]:0,D=X<b[y+1]?b[y+1]-X:X>b[y+4]?X-b[y+4]:0,R=J<b[y+2]?b[y+2]-J:J>b[y+5]?J-b[y+5]:0;return I*I+D*D+R*R}closest(lt,st,X,J,b){const{pos:y,idx:I,order:D,stack:R}=this;let p=J*J,z=!1,M=0;for(R[M++]=0;M>0;){const c=R[--M];if(!(this._boxD2(c,lt,st,X)>=p))if(this.left[c]<0)for(let C=this.start[c],U=C+this.count[c];C<U;C++){const O=D[C],A=I[O*3]*3,L=I[O*3+1]*3,$=I[O*3+2]*3,H=y[A],Q=y[A+1],F=y[A+2],W=y[L]-H,et=y[L+1]-Q,G=y[L+2]-F,e=y[$]-H,o=y[$+1]-Q,n=y[$+2]-F,u=lt-H,w=st-Q,E=X-F,_=W*u+et*w+G*E,v=e*u+o*w+n*E;let i,d;if(_<=0&&v<=0)i=0,d=0;else{const t=u-W,a=w-et,P=E-G,g=W*t+et*a+G*P,h=e*t+o*a+n*P;if(g>=0&&h<=g)i=1,d=0;else{const B=_*h-g*v;if(B<=0&&_>=0&&g<=0)i=_/(_-g),d=0;else{const m=u-e,K=w-o,x=E-n,q=W*m+et*K+G*x,T=e*m+o*K+n*x;if(T>=0&&q<=T)i=0,d=1;else{const S=q*v-_*T;if(S<=0&&v>=0&&T<=0)i=0,d=v/(v-T);else{const N=g*T-q*h;if(N<=0&&h-g>=0&&q-T>=0)d=(h-g)/(h-g+(q-T)),i=1-d;else{const tt=1/(N+S+B);i=S*tt,d=B*tt}}}}}}const k=H+W*i+e*d,s=Q+et*i+o*d,f=F+G*i+n*d,l=(lt-k)*(lt-k)+(st-s)*(st-s)+(X-f)*(X-f);l<p&&(p=l,z=!0,b.x=k,b.y=s,b.z=f,b.tri=O,b.b0=1-i-d,b.b1=i,b.b2=d)}else{const C=this.left[c],U=this.right[c],O=this._boxD2(C,lt,st,X),A=this._boxD2(U,lt,st,X);O<A?(A<p&&(R[M++]=U),O<p&&(R[M++]=C)):(O<p&&(R[M++]=C),A<p&&(R[M++]=U))}}return b.d=Math.sqrt(p),z}raycast(lt,st,X,J,b,y,I,D,R=-1){const{pos:p,idx:z,order:M,stack:c,bb:C}=this,U=1/J,O=1/b,A=1/y;let L=I,$=!1,H=0;for(c[H++]=0;H>0;){const Q=c[--H],F=Q*6;let W=(C[F]-lt)*U,et=(C[F+3]-lt)*U,G=Math.min(W,et),e=Math.max(W,et);if(W=(C[F+1]-st)*O,et=(C[F+4]-st)*O,G=Math.max(G,Math.min(W,et)),e=Math.min(e,Math.max(W,et)),W=(C[F+2]-X)*A,et=(C[F+5]-X)*A,G=Math.max(G,Math.min(W,et)),e=Math.min(e,Math.max(W,et)),!(!(e>=Math.max(G,0))||G>L))if(this.left[Q]<0)for(let o=this.start[Q],n=o+this.count[Q];o<n;o++){const u=M[o];if(R>=0&&this.type[u]!==R)continue;const w=z[u*3]*3,E=z[u*3+1]*3,_=z[u*3+2]*3,v=p[w],i=p[w+1],d=p[w+2],k=p[E]-v,s=p[E+1]-i,f=p[E+2]-d,l=p[_]-v,t=p[_+1]-i,a=p[_+2]-d,P=b*a-y*t,g=y*l-J*a,h=J*t-b*l,B=k*P+s*g+f*h;if(B>-1e-30&&B<1e-30)continue;const m=1/B,K=lt-v,x=st-i,q=X-d,T=(K*P+x*g+q*h)*m;if(T<-1e-9||T>1+1e-9)continue;const S=x*f-q*s,N=q*k-K*f,tt=K*s-x*k,j=(J*S+b*N+y*tt)*m;if(j<-1e-9||T+j>1+1e-9)continue;const V=(l*S+t*N+a*tt)*m;V>0&&V<L&&(L=V,$=!0,D.tri=u,D.b0=1-T-j,D.b1=T,D.b2=j)}else c[H++]=this.left[Q],c[H++]=this.right[Q]}return D.t=L,$}faceNormal(lt,st){const{pos:X,idx:J}=this,b=J[lt*3]*3,y=J[lt*3+1]*3,I=J[lt*3+2]*3,D=X[y]-X[b],R=X[y+1]-X[b+1],p=X[y+2]-X[b+2],z=X[I]-X[b],M=X[I+1]-X[b+1],c=X[I+2]-X[b+2];let C=R*c-p*M,U=p*z-D*c,O=D*M-R*z;const A=Math.hypot(C,U,O)||1;return st[0]=C/A,st[1]=U/A,st[2]=O/A,st}smoothNormal(lt,st,X,J,b){const{nrm:y,idx:I}=this,D=I[lt*3]*3,R=I[lt*3+1]*3,p=I[lt*3+2]*3;let z=y[D]*st+y[R]*X+y[p]*J,M=y[D+1]*st+y[R+1]*X+y[p+1]*J,c=y[D+2]*st+y[R+2]*X+y[p+2]*J;const C=Math.hypot(z,M,c)||1;return b[0]=z/C,b[1]=M/C,b[2]=c/C,b}}return{BVH:Z}})(),$t=await(async()=>{const Z=[[4e-4,3e-5,15e-7,6e-8,3e-10],[25e-5,12e-6,8e-7,4e-8,35e-11],[7e-5,6e-6,4e-7,6e-8,3e-10],[32e-5,16e-6,8e-7,4e-8,35e-11],[.001,5e-5,2e-6,6e-8,3e-10]],mt=`
uniform vec3 uLv[5];     // xy: fractional pattern offset in cells, z: cells per local unit
uniform vec2 uLvI[5];    // integer pattern offset in cells (0..255)
uniform float uLvW[5], uLvC[5], uLvK[5], uLvG[5];
uniform vec4 uRot4, uM0;
uniform sampler2D uCen;   // 5x4, per level under the player: value+gradient, curvature, colour of a white and of a black base
vec3 dCol; float dGloss; float dEmis; float gWarp; vec2 gI=vec2(0.);
// The eyes (SURF 0): gEye says how much of the surface is eye. There the skin's levels 0..3 are left out
// (an eye is smooth down to its cells) and the cells of the last level are clear blue instead of flesh pink.
uniform float uEyeK; uniform vec3 uEyeCell; float gEye=0.;
// Smallest skin level as real balls (see BALLS below): gAbyss (0..1) sinks the terrain patch into the deep
// red abyss under them; gMaxLv=3 leaves level 4 out (the ball pass adds it per ball).
uniform float uBallK, uBallR;
float gAbyss=0.; int gMaxLv=4;
float abyssAt(vec2 xz){ return uBallK*(1.-smoothstep(.75*uBallR,.95*uBallR,length(xz))); }

// Hashes of integer lattice points in exact integer arithmetic. A float hash is chaotic: the last-bit
// differences between shader programs (fused multiply-adds) turned into different cell ids, so the
// pattern under the player read back by one pass disagreed with the terrain another pass built.
uint pcg(uint v){ uint s=v*747796405u+2891336453u; uint w=((s>>((s>>28u)+4u))^s)*277803737u; return (w>>22u)^w; }
uint hkey(vec2 p){ uvec2 q=uvec2(ivec2(floor(p+.5))+4096); return q.x+(q.y<<16u); }
vec2 h22(vec2 p){ uint h=pcg(hkey(p)); return vec2(float(h&65535u),float(h>>16u))*(1./65536.); }
float h21(vec2 p){ return float(pcg(hkey(p)^0x9e3779b9u)>>8u)*(1./16777216.); }
float h21s(vec2 p, float salt){ return float(pcg(hkey(p)^(uint(salt)*0x85ebca6bu))>>8u)*(1./16777216.); }
// hash cell of lattice point n (relative to the level's integer origin gI)
vec2 cid(vec2 n){ return mod(gI+n,256.); }
// q's long-period phase: (gI+q) mod p, kept small and exact
vec2 ph(vec2 q, float p){ return mod(gI,p)+q; }
float ph1(float I, float q, float p){ return mod(I,p)+q; }
// value noise at (I+q)*s with period per (in scaled cells); I is the integer origin
float vnoise(vec2 I, vec2 q, vec2 per, vec2 s){
  vec2 qq=(mod(I,1./s)+q)*s, i=floor(I*s)+floor(qq), f=fract(qq); f=f*f*(3.-2.*f);
  float a=h21(mod(i,per)), b=h21(mod(i+vec2(1.,0.),per)), c=h21(mod(i+vec2(0.,1.),per)), d=h21(mod(i+vec2(1.,1.),per));
  return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
}
// x: distance to nearest site, y: to second nearest, z: site id
vec3 vor(vec2 q){
  vec2 n=floor(q), f=fract(q); float d1=8., d2=8., id=0.;
  for(int j=-1;j<=1;j++) for(int i=-1;i<=1;i++){
    vec2 g=vec2(float(i),float(j)); vec2 c=cid(n+g); vec2 r=g+h22(c)-f; float d=dot(r,r);
    if(d<d1){ d2=d1; d1=d; id=h21s(c,7.); } else if(d<d2) d2=d;
  }
  return vec3(sqrt(d1),sqrt(d2),id);
}
// x: distance to the border of q's cell with the corners rounded off (blend width k), y: distance to
// the cell's site, z: site id. Plates built on this have soft, rounded outlines instead of sharp
// polygons: near a corner the two nearest borders are blended with a smooth minimum.
vec3 vorR(vec2 q, float k){
  vec2 n=floor(q), f=fract(q), m=vec2(0.); float d1=8., d2=8., d3=8.;
  for(int j=-1;j<=1;j++) for(int i=-1;i<=1;i++){
    vec2 g=vec2(float(i),float(j)); vec2 r=g+h22(cid(n+g))-f; float d=dot(r,r);
    if(d<d1){ d3=d2; d2=d1; d1=d; m=g; } else if(d<d2){ d3=d2; d2=d; } else if(d<d3) d3=d;
  }
  d1=sqrt(d1); float a=(sqrt(d2)-d1)*.5, b=(sqrt(d3)-d1)*.5, h=max(k-abs(a-b),0.)/k;
  return vec3(min(a,b)-h*h*k*.25,d1,h21s(cid(n+m),7.));
}
// pillow profile: zero slope on top, rounded shoulder down into the furrow
float pillow(float d, float w){ float s=clamp(d/w,0.,1.); return s*(2.-s); }
// rounded ridge with finite slopes (a height field cannot carry sub-patterns on vertical walls)
float cyl(float t){ float f=fract(t)-.5; float u=max(0.,1.-f*f*4.6); return u*(1.4-.4*u); }

float atoms(vec2 q, float w, vec3 c0, vec3 c1, vec3 c2, float jit){
  vec2 n=floor(q), f=fract(q); float best=0., id=0., acc=0.;
  for(int j=-1;j<=1;j++) for(int i=-1;i<=1;i++){
    vec2 g=vec2(float(i),float(j)); vec2 c=cid(n+g); float hh=h21s(c,3.);
    vec2 r=g+.5+(h22(c)-.5)*jit-f; float rad=.42+.2*hh; float s=max(0.,1.-dot(r,r)/(rad*rad));
    float z=rad*s*(2.-s)*(.75+.6*h21s(c,9.));   // dome with a finite slope at the rim: no cliffs, no jagged rims
    acc+=exp(8.*z); if(z>best){ best=z; id=hh; }
  }
  vec3 ac=id<.4?c0:(id<.75?c1:c2);
  dCol=mix(dCol,ac*(.3+.7*smoothstep(0.,.55,best)),w); dGloss=mix(dGloss,.7,w); dEmis=mix(dEmis,.5,w);
  return (log(acc)-2.1972)*.125;   // smooth union of the domes: soft creases, no 2x2-pixel dashes along them
}
// BALLS: the smallest skin level is two layers of whole round cells. The top layer sits on the cell
// centres (n+.5), the second one .62 cells lower on the corners (n), filling the top layer's gaps; below
// them is the abyss. Positions are in cells; the same function places the 3D balls (ball pass) and gives
// the top envelope that the player walks on and the camera keeps above, so nobody falls through a gap.
#define BALL_DZ .62
#define ABYSS_H -3.4
void ballOf(vec2 n, int L, out vec2 c, out float r, out float z, out float id){
  vec2 k=cid(n); vec2 j=h22(L==1?mod(k+vec2(97.,13.),256.):k);
  id=h21s(k,L==1?5.:3.);
  c=n+(L==1?vec2(0.):vec2(.5))+(j-.5)*.1;
  r=.49+.05*h21s(k,L==1?6.:4.);   // neighbours touch: only the diagonal holes show the lower layer
  z=L==1?-BALL_DZ+(h21s(k,8.)-.5)*.08:(h21s(k,9.)-.5)*.1;
}
// height of one ball's top (continued as a cone below its equator, so the envelope stays continuous)
float ballTop(vec2 q, vec2 c, float r, float z){ float d=length(q-c), s=r*r-d*d; return s>0.?z+sqrt(s):z-(d-r)*2.; }
float cellBalls(vec2 q, float w){
  vec2 n=floor(q); float acc=0., best=-9., id=0., dn=1.; int bl=0;
  for(int L=0;L<2;L++) for(int j=-1;j<=1;j++) for(int i=-1;i<=1;i++){
    if(L==1&&(i<0||j<0)) continue;   // corners of the cell: (0,0)..(1,1)
    vec2 c; float r,z,hh; ballOf(n+vec2(float(i),float(j)),L,c,r,z,hh);
    float t=ballTop(q,c,r,z); acc+=exp(24.*t);
    if(t>best){ best=t; id=hh; dn=length(q-c)/r; bl=L; }
  }
  float hgt=log(acc)/24.;   // smooth max: the balls meet in soft creases
  vec3 cc=mix(dCol*mix(vec3(.97,.84,.85),vec3(1.06,.97,.95),id),uEyeCell*mix(vec3(.84,.94,.98),vec3(1.06,1.03,1.),id),gEye);
  cc*=(1.-.14*smoothstep(.34,.12,dn))*(1.-.24*smoothstep(.7,1.,dn));
  if(bl==1) cc*=mix(vec3(.62,.40,.43),vec3(.4,.55,.75),gEye);   // the lower layer, deeper (and redder on skin)
  dCol=mix(dCol,cc,w); dGloss=mix(dGloss,.3,w); dEmis=mix(dEmis,.18,w);
  return hgt;
}
// keratin filaments: two crossing bundles with periodic banding
float keratin(vec2 q, float w, vec3 ca, vec3 cb){
  float m=smoothstep(.35,.65,vnoise(gI,q,vec2(32.),vec2(.125)));
  vec2 p4=ph(q,4.);
  float ha=cyl(q.y+.12*sin(6.2832*p4.x*.25)), hb=cyl(q.x+.12*sin(6.2832*p4.y*.25));
  float ba=.5+.5*sin(6.2832*(q.x+h21(vec2(mod(gI.y+floor(q.y),256.),1.)))), bb=.5+.5*sin(6.2832*(q.y+h21(vec2(mod(gI.x+floor(q.x),256.),2.))));
  float p=mix(ha,hb,m), band=mix(ba,bb,m);
  dCol=mix(dCol,mix(ca,cb,band)*(.55+.45*p),w); dGloss=mix(dGloss,.5,w);
  return p;
}
float ridges(vec2 q, float w, vec3 ca, vec3 cb){
  vec2 p=q+1.3*vec2(vnoise(gI,q,vec2(128.),vec2(.5)),vnoise(gI,q+62.,vec2(128.),vec2(.5)));
  float r=pow(.5+.5*sin(6.2832*(p.x+.35*sin(6.2832*ph1(gI.y,p.y,2.)*.5))),1.4);
  dCol=mix(dCol,mix(ca,cb,r),w*.9); dGloss=mix(dGloss,.35,w);
  return r*.75+.25*vnoise(gI,q,vec2(512.),vec2(2.));
}

#if SURF==0
// FOOT: the feet carry their own detail (feet.js, tools/feet/detail.py). On the sole and the toe pads the
// first level is not the criss-cross relief of ordinary skin but papillary ridges (the lines of a
// footprint): parallel rounded ridges following the ridge-phase field, a row of sweat pores along each
// crest. The pores sit where the crest meets the lines of a fixed pore coordinate (gPc + gPg . (q - player);
// two such coordinates, gPw choosing the one that crosses the ridges here), so they stay put on the foot
// and are the same pores on the mesh and on the micro patch. On the nails it is the fine lengthwise striation of the plate. gSole / gNail say how much of
// each applies; the ridge phase is gRph + gRg . (q - player), its integer part in gRi. footCtx() takes
// them from the fields of the mesh itself (FOOT: the body shader of the feet), from the fields under the
// player (micro patch, probes), or switches them off (NOFOOT: the rest of the body).
uniform vec4 uFootA, uFootB, uFootR, uFootP, uFootQ;
float gSole=0., gNail=0., gRph=0., gRi=0., gPix=0., gSlope=1., gPw=0.; vec2 gRg=vec2(0.), gPc=vec2(0.); vec4 gPg=vec4(0.);
void footCtx(){
#if defined(FOOT)
  gSole=vFootA.x; gRph=vFootA.y; gRg=vec2(0.); gRi=0.; gEye=0.; gPc=vTan.xy; gPg=vec4(0.); gPw=vFootB.w;
#elif defined(NOFOOT)
  gSole=0.; gNail=0.;   // (gEye: set by the body shader from where the fragment is)
#else
  gSole=uFootA.x; gRph=uFootR.z; gRg=uFootR.xy; gRi=uFootR.w; gEye=uEyeK; gPc=uFootP.xy; gPg=uFootQ; gPw=uFootP.z;
#ifndef FRAG_FOOT
  gNail=uFootB.w;
#endif
#endif
}
// Skin keeps its own flesh tone at every level: each level only shades the colour it is given.
float lv0(vec2 q, float w){
  vec3 v=vorR(q,.16); float fur=pillow(v.x,.2); float pore=smoothstep(.16,.02,v.y)*step(.55,v.z);
  vec3 c=dCol*mix(vec3(.86,.72,.74),vec3(1.02,1.,1.),fur)*(1.-.16*pore); float hh=fur*(.75+.25*v.z)-.5*pore;
  if(gSole>.003){
    vec2 dq=q-uLv[0].xy; float ph=gRph+dot(gRg,dq), dp=fract(ph+.5)-.5;   // dp: distance from the crest, in ridges
    float rd=1.-dp*dp*4.; rd=rd*(1.6-.6*rd);                              // rounded crest, narrow furrow
    float g2=dot(gRg,gRg), hk=h21(vec2(mod(gRi+floor(ph+.5),256.),7.));   // (each ridge shifts its row of pores)
    vec2 pd=(fract(gPc+vec2(dot(gPg.xy,dq),dot(gPg.zw,dq))+vec2(hk,hk*1.618))-.5)*.95;
    float po=mix(1.-smoothstep(.025,.075,length(vec2(dp,pd.x))),1.-smoothstep(.025,.075,length(vec2(dp,pd.y))),gPw);   // ~65 um across
    // regular lines beat against the pixel grid long before irregular relief does: once a ridge is only
    // a few pixels wide it settles into its mean (gPix: level-0 cells per pixel, or per patch vertex)
    { float k=1.-smoothstep(.13,.34,gPix*sqrt(max(g2,.79))); rd=mix(.72,rd,k); po*=k; }
    c=mix(c,dCol*mix(vec3(.84,.71,.73),vec3(1.03,1.,1.),rd)*(1.-.22*po),gSole); hh=mix(hh,1.5*rd-.5*po,gSole);
  }
  if(gNail>.003){ float st=.5+.5*cos(6.2832*q.x*3.); c=mix(c,dCol*(.975+.025*st),gNail); hh=mix(hh,.1*st,gNail); }
  dCol=mix(dCol,c,w);
  return hh;
}
float lv1(vec2 q, float w){
  vec3 v=vorR(q,.12); float plate=pillow(v.x,.13); float curl=smoothstep(.3,.06,v.x)*v.z;
  dCol=mix(dCol,dCol*mix(vec3(.9,.8,.81),vec3(1.05,1.,1.),v.z)*(.84+.16*plate),w*.85*(1.-.6*gNail)); dGloss=mix(dGloss,mix(.25,.7,gNail),w);
  // the horny layer of the sole is thick and flaky, the nail plate nearly flat
  return (plate*(.35+.45*v.z)+.3*curl*plate)*(1.+.5*gSole)*(1.-.75*gNail);
}
float lv2(vec2 q, float w){ return ridges(q,w,dCol*vec3(.86,.76,.78),dCol*vec3(1.05,1.,1.)); }
float lv3(vec2 q, float w){ return keratin(q,w,dCol*vec3(.8,.68,.7),dCol*vec3(1.06,1.,1.)); }
float lv4(vec2 q, float w){ return cellBalls(q,w); }
#endif

#if SURF==1 || SURF==3
#if SURF==1
#define GAPK 5.4
#define FAB_COL vec3(.050,.046,.062)
#define FIL_COL vec3(.085,.078,.115)
#define FIL_GLOSS .9
#define SUR_A vec3(.05,.05,.07)
#define SUR_B vec3(.16,.16,.22)
#define FIBRIL_COL vec3(.16,.19,.30)
#define AT0 vec3(.16,.18,.22)
#define AT1 vec3(.95,.16,.12)
#define AT2 vec3(.92,.95,1.)
#else
#define GAPK 3.7
#define FAB_COL vec3(.97,.95,.92)
#define FIL_COL vec3(.98,.96,.90)
#define FIL_GLOSS .3
#define SUR_A vec3(.80,.74,.62)
#define SUR_B vec3(.99,.97,.90)
#define FIBRIL_COL vec3(.92,.86,.70)
#define AT0 vec3(.35,.36,.38)
#define AT1 vec3(.98,.35,.22)
#define AT2 vec3(.95,.97,1.)
#endif
float lv0(vec2 q, float w){
  vec2 n=floor(q), f=fract(q)-.5; float par=mod(gI.x+gI.y+n.x+n.y,2.)<.5?1.:-1.;
  float pw=max(0.,1.-f.x*f.x*GAPK), pf=max(0.,1.-f.y*f.y*GAPK); pw*=1.4-.4*pw; pf*=1.4-.4*pf;
  float zw=pw*(.55+.45*par*cos(3.14159*f.y)), zf=pf*(.55-.45*par*cos(3.14159*f.x));
  gWarp=step(zf,zw); float z=max(zw,zf);
  dCol=mix(dCol,FAB_COL*(.3+.7*z)*(1.-.85*step(z,.02)),w);
  return z;
}
float lv1(vec2 q, float w){
  float ac=mix(q.y,q.x,gWarp), al=mix(q.x,q.y,gWarp), Ia=mix(gI.y,gI.x,gWarp), Il=mix(gI.x,gI.y,gWarp);
  float t=ac+.18*sin(6.2832*ph1(Il,al,8.)*.125); float hh=h21(vec2(mod(Ia+floor(t),256.),3.));
  float p=cyl(t)*(.75+.25*hh);
  dCol=mix(dCol,FIL_COL*(.35+.65*p)*(.8+.4*hh),w); dGloss=mix(dGloss,FIL_GLOSS,w);
  return p;
}
float lv2(vec2 q, float w){
  float ac=mix(q.y,q.x,gWarp), al=mix(q.x,q.y,gWarp), Ia=mix(gI.y,gI.x,gWarp), Il=mix(gI.x,gI.y,gWarp);
  float st=vnoise(vec2(Ia,Il),vec2(ac,al),vec2(256.,64.),vec2(4.,.25)); vec3 v=vor(q); float speck=smoothstep(.22,.05,v.x)*step(.72,v.z);
  dCol=mix(dCol,mix(SUR_A,SUR_B,st)+speck*vec3(.5),w);
  return st*.5+speck*.9;
}
// fibrils: one per cell across, cut into 4-cell pieces along their length; the ends of a piece are pulled
// back near its sides along a small arc, so each block has slightly rounded corners
float lv3(vec2 q, float w){
  float ac=mix(q.y,q.x,gWarp), al=mix(q.x,q.y,gWarp), Ia=mix(gI.y,gI.x,gWarp), Il=mix(gI.x,gI.y,gWarp);
  float fa=fract(ph1(Il,al,4.)*.25+h21(vec2(mod(Ia+floor(ac),256.),11.)));
  float e=min(fa,1.-fa)*4., x=abs(fract(ac)-.5), RC=.22, k=max(x-(.466-RC),0.);   // cells to the end, off-centre
  float p=smoothstep(0.,.24,e-(RC-sqrt(max(RC*RC-k*k,0.))))*cyl(ac);
  dCol=mix(dCol,FIBRIL_COL*(.4+.7*p),w); dGloss=mix(dGloss,.6,w);
  return p;
}
float lv4(vec2 q, float w){ return atoms(q,w,AT0,AT1,AT2,.22); }
#endif

#if SURF==2
float lv0(vec2 q, float w){
  float t=q.x+.2*sin(6.2832*ph1(gI.y,q.y,16.)*.0625); float hh=h21(vec2(mod(gI.x+floor(t),256.),5.)); float p=cyl(t)*(.7+.3*hh);
  dCol=mix(dCol,dCol*(.5+.8*p)*(.8+.5*hh),w);
  return p;
}
float lv1(vec2 q, float w){
  float b=floor(gI.x*.5)+floor(ph1(gI.x,q.x,2.)*.5);
  float u=q.y+.5*h21(vec2(mod(b,256.),2.))+.12*sin(6.2832*q.x); float s=fract(u); float p=s*s;
  dCol=mix(dCol,mix(vec3(.20,.12,.09),vec3(.58,.40,.28),p),w*.8); dGloss=mix(dGloss,.6,w);
  return p;
}
float lv2(vec2 q, float w){ return ridges(q,w,vec3(.30,.19,.14),vec3(.70,.52,.38)); }
float lv3(vec2 q, float w){ return keratin(q,w,vec3(.46,.30,.20),vec3(.99,.93,.84)); }
float lv4(vec2 q, float w){ return atoms(q,w,vec3(.08,.78,.74),vec3(.98,.28,.56),vec3(.25,.42,1.),.55); }
#endif

#if SURF==4
float lv0(vec2 q, float w){ float n=vnoise(gI,q,vec2(256.),vec2(1.)); dCol=mix(dCol,dCol*(.8+.4*n),w); return n; }
float lv1(vec2 q, float w){ return ridges(q,w,dCol*.7,dCol*1.1); }
float lv2(vec2 q, float w){ vec3 v=vor(q); dCol=mix(dCol,dCol*(.6+.6*v.z),w); return v.x; }
float lv3(vec2 q, float w){ return ridges(q,w,vec3(.4,.3,.2),vec3(.8,.7,.55)); }
float lv4(vec2 q, float w){ return atoms(q,w,vec3(.3,.32,.36),vec3(.9,.5,.2),vec3(.9,.9,1.),.4); }
#endif

const float AMP0=AMPS0, AMP1=AMPS1, AMP2=AMPS2, AMP3=AMPS3, AMP4=AMPS4;
#define LVW(i) (uLvW[i]*(1.-smoothstep(60.,220.,dist*uLv[i].z))*smoothstep(1.5*minL,4.*minL+1e-6,1./uLv[i].z))
// Everything is taken relative to the level's value under the player (cd.x), so the ground under the
// player stays put. That difference is formed directly: subtracting two nearly equal pattern values
// cancels away the float32 bits that a huge level (a cell millions of player heights wide) needs, and
// the leftover rounding came out as a per-pixel checkerboard in the normals. Within 0.005 cells of the
// player the level is its local quadratic, measured once per frame by the center pass (which also
// gives its colour there, so the pattern itself is not evaluated at all), blending into the exact
// pattern by 0.01 cells; further out the cancellation is far below a pixel.
float tq(int i, vec2 dq){
  vec4 a=texelFetch(uCen,ivec2(i,0),0), b=texelFetch(uCen,ivec2(i,1),0);
  return dot(a.yz,dq)+.5*(b.x*dq.x*dq.x+b.z*dq.y*dq.y)+b.y*dq.x*dq.y;
}
void tcol(int i, float wc){ vec3 c1=texelFetch(uCen,ivec2(i,2),0).rgb, c0=texelFetch(uCen,ivec2(i,3),0).rgb; dCol=mix(dCol,dCol*(c1-c0)+c0,wc); }
// a level that is still small is only partly pinned to the player (uLvK < 1): the rest sits at mid-height
#define REM(i) ((1.-uLvK[i])*(.5-cd.x))
#define LEVEL(I,LVF,AMPI,DQ) w=LVW(I)*(I<4?ek:1.); if(w>.002){ gI=uLvI[I]; cd=texelFetch(uCen,ivec2(I,0),0); dq=DQ; float l=length(dq), v;   if(l<.005){ v=tq(I,dq); tcol(I,w*uLvC[I]); }   else { v=LVF(uLv[I].xy+dq,w*uLvC[I])-cd.x; if(l<.01) v=mix(tq(I,dq),v,smoothstep(.005,.01,l)); }   h+=w*AMPI*(v-REM(I))/uLv[I].z; }
// height in local units at tangent-plane position xz; also updates dCol/dGloss/dEmis
float surfDetail(vec2 xz, float dist, float minL){
  vec2 xr=mat2(uRot4.xy,uRot4.zw)*xz, dq; float h=0., w, ek=1.; vec4 cd; gWarp=1.;
#if SURF==0
  footCtx(); gPix=minL*uLv[0].z*gSlope; ek=1.-gEye;
#endif
#if SURF==1 || SURF==3
  // the weave (level 0) also decides warp/weft for the finer levels, so it always runs
  w=LVW(0); gI=uLvI[0]; cd=texelFetch(uCen,ivec2(0,0),0); dq=mat2(uM0.xy,uM0.zw)*xz;
  { float v=lv0(uLv[0].xy+dq,w*uLvC[0])-cd.x; float l=length(dq); if(l<.01) v=mix(tq(0,dq),v,smoothstep(.005,.01,l)); h+=w*AMP0*(v-REM(0))/uLv[0].z; }
#else
  LEVEL(0,lv0,AMP0,mat2(uM0.xy,uM0.zw)*xz)
#endif
  LEVEL(1,lv1,AMP1,xr*uLv[1].z)
  LEVEL(2,lv2,AMP2,xr*uLv[2].z)
  LEVEL(3,lv3,AMP3,xr*uLv[3].z)
  float h3=h;
#if SURF==0
  dCol=mix(dCol,uEyeCell*vec3(.9,.96,1.),gEye*uLvW[4]);   // an eye's ground turns to the colour of its cells as they grow in
#endif
  if(gMaxLv>3){ LEVEL(4,lv4,AMP4,xr*uLv[4].z) }
#if SURF==0
  // inside the ball region the patch drops into the abyss below the second layer of balls
  if(gAbyss>0.){ vec4 c4=texelFetch(uCen,ivec2(4,0),0); float va=ABYSS_H-c4.x-(1.-uLvK[4])*(.5-c4.x);
    h=mix(h,h3+uLvW[4]*AMP4*va/uLv[4].z,gAbyss);
    dCol=mix(dCol,dCol*mix(vec3(.28,.045,.055),vec3(.05,.12,.3),gEye),gAbyss); dGloss=mix(dGloss,.08,gAbyss); dEmis=mix(dEmis,.3,gAbyss); }
#endif
  gI=vec2(0.);
  return h;
}
// raw pattern value of one level at cell offset dq from the player (in that level's own cells); wc
// applies the level's colour to dCol
float levelAt(int i, vec2 dq, float wc){
#if SURF==0
  footCtx(); gPix=0.;
#endif
  gWarp=1.; gI=uLvI[0]; float p0=lv0(uLv[0].xy+(i==0?dq:vec2(0.)),i==0?wc:0.);
  if(i==0) return p0;
  if(i==1){ gI=uLvI[1]; return lv1(uLv[1].xy+dq,wc); }
  if(i==2){ gI=uLvI[2]; return lv2(uLv[2].xy+dq,wc); }
  if(i==3){ gI=uLvI[3]; return lv3(uLv[3].xy+dq,wc); }
  gI=uLvI[4]; return lv4(uLv[4].xy+dq,wc);
}
`,lt=[[.1,.05,.2,.18,1],[.38,.42,.12,.25,.95],[.4,.06,.1,.22,.95],[.34,.42,.12,.25,.95],[.05,.1,.1,.2,.95]];function st(X){let J=mt;for(let b=0;b<5;b++)J=J.replace("AMPS"+b,lt[X][b].toFixed(3));return J}return{LEVELS:Z,DETAIL:mt,AMPS:lt,detailFor:st}})(),zt=await(async()=>{const{detailFor:Z}=$t,{HEAD:mt}=Wt,lt=()=>new r.Vector3,st={uAnchorHi:{value:lt()},uAnchorLo:{value:lt()},uAnchorF:{value:lt()},uInvH:{value:1},uH:{value:1},uCamLocal:{value:lt()},uLogC:{value:1},uSun:{value:new r.Vector3(.55,.72,.42).normalize()},uShadowMat:{value:new r.Matrix4},uShadowMap:{value:null},uShadowRad:{value:9e-4},uG:{value:lt()},uT:{value:new r.Vector3(1,0,0)},uB:{value:new r.Vector3(0,0,1)},uNp:{value:new r.Vector3(0,1,0)},uPatchR:{value:0},uPatchType:{value:-1},uTol:{value:0},uCtrl:{value:null},uCen:{value:null},uDispK:{value:0},uMacroW:{value:1},uFogR:{value:0},uFogK:{value:0},uFocus:{value:4},uDofK:{value:0},uBlob:{value:0},uFoot:{value:lt()},uRes:{value:new r.Vector2(1,1)},uProjXY:{value:new r.Vector2(1,1)},uTime:{value:0},uFaceTex:{value:null},uPatchCol:{value:new r.Vector3(1,1,1)},uPatchTan:{value:new r.Vector3(0,0,1)},uPatchAO:{value:1},uPatchTint:{value:0},uBallK:{value:0},uBallR:{value:0},uFootA:{value:new r.Vector4},uFootB:{value:new r.Vector4(4,-3,0,0)},uFootR:{value:new r.Vector4},uFootN:{value:new r.Vector4},uFootP:{value:new r.Vector4},uFootQ:{value:new r.Vector4},uEyeC:{value:[new r.Vector4(0,-99,0,1),new r.Vector4(0,-99,0,1)]},uEyeU:{value:[new r.Vector4(1,0,0,1),new r.Vector4(1,0,0,1)]},uEyeV:{value:[new r.Vector4(0,1,0,1),new r.Vector4(0,1,0,1)]},uEyeK:{value:0},uEyeCell:{value:new r.Vector3(.5,.8,.98)}},X=36,J=20,b=7,y=G=>(Math.exp(b*G)-1)/(Math.exp(b)-1),I=(()=>{if(typeof document>"u")return!1;try{if(new URLSearchParams(location.search).get("ctrl")==="near")return!0;const G=document.createElement("canvas").getContext("webgl2"),e=!!G.getExtension("OES_texture_float_linear"),o=G.getExtension("WEBGL_lose_context");return o&&o.loseContext(),!e}catch{return!1}})(),D=`
uniform vec3 uG,uT,uB,uNp,uCamLocal; uniform float uPatchR,uDispK,uH,uTol; uniform int uPatchType; uniform sampler2D uCtrl;
vec4 ctrlAt(vec2 xz){
  float r=length(xz); float th=r>1e-6?atan(xz.y,xz.x):0.;
  float t=log(1.+min(r/uPatchR,1.)*${(Math.exp(b)-1).toFixed(3)})*${(1/b).toFixed(6)};
  vec2 uv=vec2(th/6.2831853+.5/${X}.,(t*${J-1}.+.5)/${J}.);
  ${I?`vec2 p=uv*vec2(${X}.,${J}.)-.5, i=floor(p), f=p-i;
  int x0=int(mod(i.x,${X}.)), x1=int(mod(i.x+1.,${X}.)), y0=int(clamp(i.y,0.,${J-1}.)), y1=int(clamp(i.y+1.,0.,${J-1}.));
  return mix(mix(texelFetch(uCtrl,ivec2(x0,y0),0),texelFetch(uCtrl,ivec2(x1,y0),0),f.x),mix(texelFetch(uCtrl,ivec2(x0,y1),0),texelFetch(uCtrl,ivec2(x1,y1),0),f.x),f.y);`:"return texture2D(uCtrl,uv);"}
}
`,R=D+`
varying vec3 vLocal,vWorld,vN,vBase,vCol,vTan; varying vec2 vXZ,vUv; varying float vAO,vTint,vW,vHg;
#ifdef FOOT
varying vec4 vFootA,vFootB;   // the feet's detail fields (feet.js): sole, ridge phase, -, pad / nail u, v, -, pore set
#endif
`,p=`
attribute float aAO; attribute float aTint; attribute vec3 aTan; attribute vec3 aCol;
#ifdef FOOT
attribute vec4 aFootA,aFootB;
#endif
uniform vec3 uAnchorHi,uAnchorLo; uniform float uInvH;
${R}
void main(){
  vec3 rel=(position-uAnchorHi)-uAnchorLo;
  vLocal=rel*uInvH; vBase=vLocal; vWorld=position; vN=normal; vAO=aAO; vTint=aTint; vTan=aTan; vCol=aCol; vXZ=vec2(0.); vUv=uv;
  // height above the ground plane, taken per vertex: for the triangle the player stands on it is ~0 at
  // all three corners, so it stays ~0 across the triangle however coarse the interpolation gets
  vHg=dot(vLocal-uG,uNp);
#ifdef FOOT
  vFootA=aFootA; vFootB=aFootB;
#endif
  gl_Position=projectionMatrix*viewMatrix*vec4(vLocal,1.); vW=1.+gl_Position.w;
}`,z=G=>`
#define SURF ${G}
uniform vec3 uAnchorF,uPatchCol,uPatchTan; uniform float uPatchAO,uPatchTint;
${R}
${Z(G)}
void main(){
  float rn=(exp(10.*position.x)-1.)/(exp(10.)-1.); float r=rn*uPatchR; vHg=0.;
  vec2 xz=r*vec2(cos(position.y),sin(position.y));
  vec4 c=ctrlAt(xz);
  vBase=uG+uT*xz.x+uB*xz.y+uNp*c.a;
  dCol=vec3(1.); dGloss=0.; dEmis=0.; gAbyss=abyssAt(xz);
  // the relief settles toward the rim by distance (r/R, the same fade the probe and the ball pass use),
  // inside the mist; fading by the grid coordinate rn flattened everything past ~1% of R, which cut
  // the tops off far ridges with a straight horizontal line
  float h=surfDetail(xz,length(uCamLocal-vBase),.05*(r+.2))*(1.-smoothstep(.62,.92,r/max(uPatchR,1e-6)))*uDispK;
  vLocal=vBase+uNp*h; vN=normalize(c.rgb); vXZ=xz; vWorld=uAnchorF+vLocal*uH;
  vAO=uPatchAO; vTint=uPatchTint; vCol=uPatchCol; vTan=uPatchTan; vUv=vec2(0.);
  gl_Position=projectionMatrix*viewMatrix*vec4(vLocal,1.); vW=(1.+gl_Position.w)*.9985;
}`,M=(G,e)=>`
#define SURF ${G}
${e?"#define PATCH":""}
uniform vec3 uSun,uFoot; uniform mat4 uShadowMat; uniform sampler2D uFaceTex; uniform highp sampler2DShadow uShadowMap;
uniform float uShadowRad,uLogC,uMacroW,uL0Inv,uFocus,uDofK,uBlob,uTime,uFineRange,uFogR,uFogK; uniform vec2 uRes,uProjXY;
uniform sampler2D uMap; uniform float uAlphaCut; uniform vec3 uMapTint; uniform float uSheer; uniform vec4 uFootN;
${R}
#if !defined(PATCH)&&!defined(FOOT)
#define NOFOOT
#endif
#define FRAG_FOOT
${Z(G)}
${G===0?C+c:""}
float shadowAt(vec3 wp, vec3 n){
  vec3 s=(uShadowMat*vec4(wp+n*.004,1.)).xyz*.5+.5;
  if(s.x<0.||s.y<0.||s.x>1.||s.y>1.||s.z>1.) return 1.;
  s.z-=.0012; float r=uShadowRad;   // 4 hardware-filtered taps on a rotated grid
  return .25*(texture(uShadowMap,vec3(s.xy+vec2(-.6,-.2)*r,s.z))+texture(uShadowMap,vec3(s.xy+vec2(.2,-.6)*r,s.z))
             +texture(uShadowMap,vec3(s.xy+vec2(.6,.2)*r,s.z))+texture(uShadowMap,vec3(s.xy+vec2(-.2,.6)*r,s.z)));
}
void main(){
  vec3 Ng=normalize(vN); vec3 Vv=uCamLocal-vLocal; float dist=length(Vv); vec3 V=Vv/dist;
#ifdef DOUBLE_SIDED
  // seen from behind (hair cards, skirts): face the normal toward the viewer. gl_FrontFacing comes
  // out inverted on some Intel/ANGLE drivers here, so compare with the screen-space face normal.
  { vec3 sn=cross(dFdx(vLocal),dFdy(vLocal)); if(dot(sn,Ng)<0.) Ng=-Ng; }
#endif
#if SURF==0
  gSlope=1./max(abs(dot(Ng,V)),.22);   // a surface seen at a grazing angle packs more of its pattern into a pixel
#endif
  // base colour: the vertex colour (also the micro patch's colour), or the model's own texture
  vec3 base=vCol;
#if defined(USE_MAP)&&!defined(PATCH)
  { vec4 tx=texture2D(uMap,vUv); if(tx.a<uAlphaCut) discard; base=tx.rgb*uMapTint; }
#endif
#ifdef PATCH
  vec2 xz=vXZ; vec3 basePos=vBase; float dd=dist, wz=vW; gAbyss=abyssAt(xz);
  // where the control grid could not follow the mesh (a wall climbing too fast, the surface falling away)
  // the body mesh keeps drawing (see below, the same test): the patch stays out of it, or the two tear
  // through each other
  { vec4 cc=ctrlAt(xz); if(dot(cc.rgb,cc.rgb)>=2.25) discard; }
#else
  // Position on the ground plane straight from the pixel ray: interpolating a triangle that is
  // millions of local units wide is far too coarse for nanometre patterns.
  vec3 dG=vLocal-uG; float hg=vHg; vec3 basePos=vLocal; float dd=dist, wz=vW;
  vec2 ndc=gl_FragCoord.xy/uRes*2.-1.;
  vec3 ray=normalize(vec3(ndc/uProjXY,-1.)*mat3(viewMatrix));
  float dn=dot(ray,uNp), tp=dot(uG-uCamLocal,uNp)/dn;
  // (only below ~3 µm: at larger scales the triangles are fine enough, and the snapping caught strips
  // of far body parts that happened to cross the plane's extension: a band of sparkle across a leg)
  // Only fragments that really lie near the plane, judged by their own distance: the ray must come down
  // onto the plane from above it and meet it close to the fragment. (The tolerance used to grow with the
  // distance to where the ray meets the plane, which is endless for rays grazing it: looking up lowers
  // the camera toward the plane, and every far fold near its horizon was flattened onto it, a flat band
  // with a straight top edge where the far view should be. On a crest, looking up even put the camera
  // under the plane, and rays going up met it overhead.)
  if(uTol>.02&&dn<-1e-4&&tp>0.&&abs(hg)<.5+.1*dist+uTol&&abs(tp-dist)<.5+.15*dist+2.*uTol){
    basePos=uCamLocal+ray*tp; dG=basePos-uG; dd=tp;
    // below ~100 nm the rasteriser's own depth and distance for this triangle are noise: use the analytic ones
    if(uTol>.4){ dist=tp; wz=1.-(viewMatrix*vec4(basePos,1.)).z; hg=0.; }
  }
  // A fragment is never nearer than its own distance allows. At the smallest scales the triangle under
  // the player is millions of units wide and its vertices sit hundreds of units off (float32): it can end
  // up just above the camera, and a double-sided one (the gown) is then seen from below as a thin band
  // along its horizon, far away and in full mist, but with a depth that is pure noise (w came out below
  // zero), so it was drawn over the terrain: a pale dashed line across the view.
  wz=max(wz,1.+.5*dist);
  vec2 xz=vec2(dot(dG,uT),dot(dG,uB));
  // the patch draws this part of the body instead (unless its sample here is marked as not covered:
  // normal stored at length 2, where the surface climbed too fast or fell away)
  if(uPatchR>0.&&uPatchType==SURF){ float r=length(xz); vec4 cc=ctrlAt(xz); if(r<uPatchR*.93&&dot(cc.rgb,cc.rgb)<2.25&&abs(hg-cc.a)<.4+.06*r+uTol) discard; }
#endif
  vec3 alb=vCol, shT=vec3(.86,.88,1.), rimC=vec3(1.); float r0=-.05,r1=.3,specK=.03,gloss=.2,rimK=.1,emit=0.,hFoot=0.;
#if SURF==0
  alb=base*mix(vec3(1.),vec3(1.,.789,.82),vTint*.55);
#ifdef PROC_FACE
  { vec2 fu=vec2((vWorld.y-${mt[1].toFixed(4)})/.086,(vWorld.z-(${mt[2].toFixed(4)}))/.112)*.5+.5;
    float fm=smoothstep(.25,.55,Ng.x)*step(${(mt[0]+.03).toFixed(4)},vWorld.x);
    if(fm>0.&&fu.x>0.&&fu.x<1.&&fu.y>0.&&fu.y<1.){ vec4 ft=texture2D(uFaceTex,fu); alb=mix(alb,ft.rgb,ft.a*fm); } }
#endif
  shT=vec3(1.,.78,.80); r0=-.12; r1=.28; specK=.06; gloss=.25; rimK=.28; rimC=vec3(1.,.86,.8);
  // the eyes: no skin relief, wet and glossy (on the mesh from the place of the fragment, on the micro patch
  // from where the player stands)
#if defined(PATCH)
  gEye=uEyeK;
#elif defined(FOOT)
  gEye=0.;
#else
  gEye=eyeMask(vWorld);
#endif
  gloss=mix(gloss,.85,gEye); specK=mix(specK,.4,gEye); alb=mix(alb,base,gEye);
#if defined(FOOT)||defined(PATCH)
  // the feet: nails drawn from their fields. On the mesh these are interpolated per vertex; on the micro
  // patch they are the fields under the player, continued linearly, so the edge of a nail stays where it
  // is when the patch takes over
  {
#ifdef FOOT
    vec4 fA=vFootA, fB=vFootB;
#else
    vec4 fA=vec4(uFootA.x,0.,0.,uFootA.y), fB=vec4(uFootB.xy+vec2(dot(uFootN.xy,xz),dot(uFootN.zw,xz)),0.,0.);
#endif
    footShade(fA,fB,alb,gloss,specK,rimK,gNail,hFoot); }
#endif
#elif SURF==1
  alb=base; shT=vec3(.7,.7,.9); r0=-.2; r1=.5; specK=.22; gloss=.3; rimK=.55; rimC=vec3(.42,.43,.58);
  // sheer chiffon (uSheer=1): a soft warm sheen instead of the satin's cool rim and gloss
  shT=mix(shT,vec3(.86,.74,.8),uSheer); specK=mix(specK,.06,uSheer); gloss=mix(gloss,.12,uSheer); rimK=mix(rimK,.32,uSheer); rimC=mix(rimC,vec3(.66,.46,.5),uSheer);
#elif SURF==2
  vec3 Tn=normalize(vTan-Ng*dot(vTan,Ng)+vec3(1e-5,0.,0.)); vec3 Bn=cross(Ng,Tn);
  float sf=fract(vTint), sid=floor(vTint);
  float st=mix(h21(vec2(mod(sid,256.),1.)),h21(vec2(mod(sid+1.,256.),1.)),smoothstep(.35,.65,sf));
  alb=base*(.8+.45*st); shT=vec3(.75,.7,.85); specK=.12; gloss=.5; rimK=.35; rimC=vec3(.75,.5,.42);
#elif SURF==4
  if(vCol.r>1.5){ emit=1.; }
#endif
  dCol=alb; dGloss=gloss; dEmis=0.; float h=0.;
  // levels whose cells shrink below a few pixels fade out (they only made shimmering noise); past the
  // detail range everything fades out over its last 30% (no hard edge where the detail stops)
  { float fk=1.-smoothstep(.7*uFineRange,uFineRange,dd);
    if(fk>0.){ h=surfDetail(xz,dd,dd*2./(uProjXY.y*uRes.y))*fk; dCol=mix(alb,dCol,fk); dGloss=mix(gloss,dGloss,fk); dEmis*=fk; } }
#ifndef PATCH
  { float sc=uL0Inv*uH; float wm=uMacroW*(1.-smoothstep(120.,400.,dist*sc))*smoothstep(1.2,3.,1./(sc*dist*2./(uProjXY.y*uRes.y)));
#if SURF==0
    wm*=1.-gEye;
#endif
    if(wm>.002){ float p=0.;
#if SURF==2
      p=lv0(vec2(dot(vWorld,Bn),dot(vWorld,Tn))*uL0Inv,wm);
#else
#if SURF==0
      footCtx(); gPix=sc*dist*2./(uProjXY.y*uRes.y)*gSlope;   // (on the feet the ridges of the sole follow their own field instead of the world-space pattern)
#endif
      vec3 aw=pow(abs(Ng),vec3(8.)); aw/=aw.x+aw.y+aw.z;
      if(aw.x>.02) p+=aw.x*lv0(vWorld.zy*uL0Inv,wm*aw.x);
      if(aw.y>.02) p+=aw.y*lv0(vWorld.xz*uL0Inv,wm*aw.y);
      if(aw.z>.02) p+=aw.z*lv0(vWorld.xy*uL0Inv,wm*aw.z);
#endif
      h+=wm*AMP0*p/sc; } }
#endif
  h+=hFoot/uH;
  vec3 dpx=dFdx(basePos),dpy=dFdy(basePos); float hx=dFdx(h),hy=dFdy(h);
  // normalise first: at atomic scale the far body has screen derivatives of 1e10 units and the
  // products below overflowed float32 into NaN normals (the flickering black patches)
  float ds=1./max(max(length(dpx),length(dpy)),1e-12); dpx*=ds; dpy*=ds; hx*=ds; hy*=ds;
  vec3 c1=cross(dpy,Ng),c2=cross(Ng,dpx); float det=dot(dpx,c1);
  vec3 N=Ng; if(abs(hx)+abs(hy)>0.&&abs(det)>1e-9) N=normalize(abs(det)*Ng-sign(det)*(hx*c1+hy*c2));
  alb=dCol;
  float sh=shadowAt(vWorld,Ng);
  sh*=1.-uBlob*smoothstep(1.1,.15,length(vLocal-uFoot))*.55;
  float ndl=dot(N,uSun); float lit=smoothstep(r0,r1,ndl)*sh;
  vec3 amb=mix(vec3(.50,.43,.42),vec3(.56,.60,.72),N.y*.5+.5)*mix(.3,1.,vAO);
  vec3 col=alb*(amb*.86*mix(shT,vec3(1.),lit)+vec3(.60,.55,.47)*lit);
#if SURF==0
  col+=alb*vec3(.5,.12,.08)*exp(-pow((ndl-.06)*5.,2.))*.22*sh;
#endif
  vec3 Hh=normalize(uSun+V); float ndh=max(dot(N,Hh),0.), ndv=max(dot(N,V),0.);
  col+=vec3(1.,.95,.88)*specK*pow(ndh,mix(6.,200.,dGloss))*lit*(.3+2.5*dGloss);
  float fr=pow(max(1.-ndv,0.),3.5);
  col+=rimC*rimK*fr*(.3+.7*lit)*mix(.4,1.,vAO);
  col+=dEmis*alb*(fr*1.6+.15);
#if SURF==2
  { float th=dot(Tn,Hh); col+=vec3(.95,.72,.55)*pow(sqrt(max(0.,1.-th*th)),70.)*.45*lit*(.4+st); }
#endif
  if(emit>0.) col=vCol;
  float q=log(1.+dist/200.)*.4343; float hz=min(.92,1.-exp(-.3*q));
  // micro-scale mist: the procedural terrain ends at the edge of its patch, so the far distance fades out;
  // it is fully dense by .6 R, before the relief starts settling toward the rim (.62 R): far hills
  // recede into the mist instead of sinking behind nearer ones. uFogK is its density, which grows
  // slowly with shrinking, so the macro world dissolves in it instead of vanishing at some size
  if(uFogR>0.) hz=max(hz,uFogK*smoothstep(.16*uFogR,.6*uFogR,dist));
  col=mix(col,mix(vec3(.80,.85,.95),vec3(1.05,.96,.84),pow(max(dot(-V,uSun),0.),2.)),hz);
  if(!(col.r+col.g+col.b<1e5)) col=vec3(.8,.85,.95);
  gl_FragColor=vec4(col,smoothstep(1.3,3.2,log(dist/uFocus)*.4343)*uDofK);
  gl_FragDepth=log2(max(wz,1.))*uLogC*.5;
}`,c=`
uniform vec4 uEyeC[2],uEyeU[2],uEyeV[2];
float eyeMask(vec3 wp){
  float m=0.;
  for(int i=0;i<2;i++){
    vec3 d=wp-uEyeC[i].xyz; float a=uEyeC[i].w;
    if(dot(d,d)<a*a*1.5){ float u=dot(d,uEyeU[i].xyz)/a, v=dot(d,uEyeV[i].xyz); v/=v>0.?uEyeU[i].w:uEyeV[i].w; m=max(m,1.-smoothstep(.72,1.,u*u+v*v)); }
  }
  return m;
}`,C=`
void footShade(vec4 fA, vec4 fB, inout vec3 alb, inout float gloss, inout float specK, inout float rimK, out float nail, out float hf){
  vec2 d=vec2(abs(fB.x),abs(fB.y-.5)*2.), d2=d*d; float s=sqrt(sqrt(d2.x*d2.x+d2.y*d2.y));   // rounded-off rectangle
  float aa=clamp(fwidth(s),.004,.5);
  nail=1.-smoothstep(1.-aa,1.+aa,s);
  float fold=(1.-smoothstep(0.,.14+aa,abs(s-1.03)))*step(s,3.)*(1.-smoothstep(.08,.25,aa));   // the groove round the plate
  float x2=fB.x*fB.x;
  float lun=1.-smoothstep(-.03,.04,fB.y-(.24-.2*x2));      // the pale crescent at the cuticle
  float tip=smoothstep(-.02,.03,fB.y-(.86-.07*x2));        // the free edge
  vec3 plate=alb*vec3(1.04,.83,.84);
  plate=mix(plate,alb*vec3(1.12,1.,.99),lun*.6);
  plate=mix(plate,alb*vec3(1.2,1.12,1.07),tip*.85);
  alb=mix(alb*(1.-.22*fold),plate,nail);
  gloss=mix(gloss,.8,nail); specK=mix(specK,.4,nail); rimK=mix(rimK,.2,nail);
  hf=-8e-5*fold*(1.-nail);   // metres
}`;function U(){return{uLv:{value:[0,1,2,3,4].map(()=>new r.Vector3(0,0,1))},uLvI:{value:[0,1,2,3,4].map(()=>new r.Vector2)},uLvW:{value:[0,0,0,0,0]},uLvC:{value:[1,1,1,1,1]},uLvK:{value:[0,0,0,0,0]},uLvG:{value:[0,0,0,0,0]},uRot4:{value:new r.Vector4(1,0,0,1)},uM0:{value:new r.Vector4(1,0,0,1)},uL0Inv:{value:1},uFineRange:{value:0},uSheer:{value:0}}}function O(G,e,o=!1,n={}){const u={};n.map&&!o&&(u.USE_MAP=1),n.procFace&&!o&&(u.PROC_FACE=1),n.foot&&!o&&(u.FOOT=1);const w=n.tint||{r:1,g:1,b:1};return new r.ShaderMaterial({uniforms:{...st,...e,uMap:{value:n.map||null},uAlphaCut:{value:n.alphaCut||0},uMapTint:{value:new r.Vector3(w.r,w.g,w.b)}},defines:u,side:n.doubleSided&&!o?r.DoubleSide:r.FrontSide,vertexShader:o?z(G):p,fragmentShader:M(G,o)})}function A(G,e,o={},n=-1){return new r.ShaderMaterial({uniforms:{...st,uOutCol:{value:new r.Color(G)},uOutPx:{value:e},uMap:{value:o.map||null},uAlphaCut:{value:o.alphaCut||0}},defines:{SURF:n,...o.map&&o.alphaCut>0?{USE_MAP:1}:{}},side:r.BackSide,vertexShader:`
uniform vec3 uAnchorHi,uAnchorLo,uCamLocal,uG,uNp; uniform float uInvH,uOutPx; uniform vec2 uRes;
varying float vW; varying float vDist; varying vec2 vUv; varying vec3 vLp; varying float vHg;
void main(){
  vUv=uv;
  vec3 lp=((position-uAnchorHi)-uAnchorLo)*uInvH;
  vec4 cp=projectionMatrix*viewMatrix*vec4(lp,1.);
  vec3 nv=mat3(viewMatrix)*normal;
  vec2 d=normalize(vec2(nv.x*projectionMatrix[0][0],nv.y*projectionMatrix[1][1])+1e-7);
  cp.xy+=d*uOutPx*2./uRes*cp.w;
  gl_Position=cp; vW=1.+cp.w; vDist=length(uCamLocal-lp); vLp=lp; vHg=dot(lp-uG,uNp);
}`,fragmentShader:`
uniform vec3 uOutCol; uniform float uLogC,uFocus,uDofK,uFogR,uFogK; uniform sampler2D uMap; uniform float uAlphaCut; varying float vW; varying float vDist; varying vec2 vUv;
varying vec3 vLp; varying float vHg;
${D}
void main(){
#ifdef USE_MAP
  if(texture2D(uMap,vUv).a<uAlphaCut) discard;
#endif
  // Where the micro patch draws the body, the shell has no business either. From above, the skin there
  // faces the camera and its shell is culled, but once the camera sinks under the skin's plane (behind
  // the player on a slope, looking up) the shell is that plane seen from below: a ceiling over the camera,
  // in full mist colour (vDist comes from corners far away), that hid every hill rising above the plane:
  // the far view cut off by a straight line at eye level. Same test as the body's own patch discard.
  if(uPatchR>0.&&uPatchType==SURF){ vec3 dG=vLp-uG; vec2 xz=vec2(dot(dG,uT),dot(dG,uB)); float r=length(xz); vec4 cc=ctrlAt(xz);
    if(r<uPatchR*.93&&dot(cc.rgb,cc.rgb)<2.25&&abs(vHg-cc.a)<.4+.06*r+uTol) discard; }
  float hz=min(.92,1.-exp(-.3*log(1.+vDist/200.)*.4343));
  if(uFogR>0.) hz=max(hz,uFogK*smoothstep(.16*uFogR,.6*uFogR,vDist));
  gl_FragColor=vec4(mix(uOutCol,vec3(.82,.86,.95),hz),smoothstep(1.3,3.2,log(vDist/uFocus)*.4343)*uDofK);
  gl_FragDepth=log2(max(vW,1.+.5*vDist)*1.0015)*uLogC*.5;   // (never nearer than its distance: see the surface shader)
}`})}const L=new r.ShaderMaterial({vertexShader:"void main(){ gl_Position=projectionMatrix*viewMatrix*vec4(position,1.); }",fragmentShader:"void main(){ gl_FragColor=vec4(1.); }",side:r.DoubleSide});function $(G,e){return new r.ShaderMaterial({uniforms:{...e,uPatchR:st.uPatchR,uDispK:st.uDispK,uCen:st.uCen,uFootA:st.uFootA,uFootB:st.uFootB,uFootR:st.uFootR,uFootP:st.uFootP,uFootQ:st.uFootQ,uEyeK:st.uEyeK,uEyeCell:st.uEyeCell,uProbe:{value:[0,1,2,3,4,5,6,7].map(()=>new r.Vector2)}},vertexShader:"void main(){ gl_Position=vec4(position.xy,0.,1.); }",fragmentShader:`
#define SURF ${G}
uniform float uPatchR,uDispK; uniform vec2 uProbe[8];
${Z(G)}
void main(){
  vec2 xz=uProbe[int(clamp(gl_FragCoord.x,0.,7.5))];
  dCol=vec3(1.); dGloss=0.; dEmis=0.;
  float h=surfDetail(xz,3.,.02)*(1.-smoothstep(.62,.92,length(xz)/max(uPatchR,1e-3)))*uDispK;
  gl_FragColor=vec4(h,0.,0.,1.);
}`,depthTest:!1,depthWrite:!1})}function H(G,e){return new r.ShaderMaterial({uniforms:{...e,uFootA:st.uFootA,uFootB:st.uFootB,uFootR:st.uFootR,uFootP:st.uFootP,uFootQ:st.uFootQ,uEyeK:st.uEyeK,uEyeCell:st.uEyeCell},vertexShader:"void main(){ gl_Position=vec4(position.xy,0.,1.); }",fragmentShader:`
#define SURF ${G}
${Z(G)}
void main(){
  int i=int(gl_FragCoord.x), row=int(gl_FragCoord.y); const float e=.004;
  dGloss=0.; dEmis=0.;
  if(row>=2){ dCol=vec3(row==2?1.:0.); levelAt(i,vec2(0.),1.); gl_FragColor=vec4(dCol,1.); return; }
  dCol=vec3(1.);
  float f0=levelAt(i,vec2(0.),0.), fxp=levelAt(i,vec2(e,0.),0.), fxm=levelAt(i,vec2(-e,0.),0.), fyp=levelAt(i,vec2(0.,e),0.), fym=levelAt(i,vec2(0.,-e),0.);
  if(row==0) gl_FragColor=vec4(f0,(fxp-fxm)/(2.*e),(fyp-fym)/(2.*e),1.);
  else {
    float fpp=levelAt(i,vec2(e,e),0.), fpm=levelAt(i,vec2(e,-e),0.), fmp=levelAt(i,vec2(-e,e),0.), fmm=levelAt(i,vec2(-e,-e),0.);
    gl_FragColor=vec4((fxp-2.*f0+fxm)/(e*e),(fpp-fpm-fmp+fmm)/(4.*e*e),(fyp-2.*f0+fym)/(e*e),1.);
  }
}`,depthTest:!1,depthWrite:!1})}const Q=36,F=2*Q+1;function W(G){return new r.ShaderMaterial({uniforms:{...st,...G},vertexShader:"void main(){ gl_Position=vec4(position.xy,0.,1.); }",fragmentShader:`
#define SURF 0
${D}
${Z(0)}
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy); int L=p.y>=${F}?1:0;
  vec2 g=vec2(float(p.x-${Q}),float(p.y-L*${F}-${Q}));
  gI=uLvI[4]; vec2 c; float r,z,id; ballOf(g,L,c,r,z,id);
  vec2 dq=c-uLv[4].xy;
  if(length(g)>${Q}.||uBallK<=0.){ gl_FragColor=vec4(0.); return; }
  vec2 xz=inverse(mat2(uRot4.xy,uRot4.zw))*(dq/uLv[4].z);
  vec4 cb=ctrlAt(xz); vec3 b=uG+uT*xz.x+uB*xz.y+uNp*cb.a; float rr=length(xz);
  dCol=vec3(1.); dGloss=0.; dEmis=0.; gMaxLv=3;
  float h=surfDetail(xz,length(uCamLocal-b),.05*(rr+.2));
  vec4 c4=texelFetch(uCen,ivec2(4,0),0);
  float w4=uLvW[4], fade=(1.-smoothstep(.62,.92,rr/max(uPatchR,1e-6)))*uDispK;
  h+=w4*AMP4*(z-c4.x-(1.-uLvK[4])*(.5-c4.x))/uLv[4].z;
  gl_FragColor=vec4(b+uNp*h*fade,r/uLv[4].z*w4*fade);
}`,depthTest:!1,depthWrite:!1})}function et(G,e){return new r.ShaderMaterial({uniforms:{...st,...G,uBallTex:{value:e}},vertexShader:`
#define SURF 0
uniform sampler2D uBallTex; uniform vec3 uCamLocal,uNp,uT,uB;
${Z(0)}
varying vec3 vP,vC,vNuc; varying float vR,vLayer,vId;
void main(){
  int k=gl_InstanceID, L=k/(${F*F}); k-=L*${F*F};
  ivec2 t=ivec2(k-(k/${F})*${F},k/${F}+L*${F});
  vec4 b=texelFetch(uBallTex,t,0);
  vec3 toC=b.xyz-uCamLocal; float d=length(toC);
  if(b.w<=1e-6||d<b.w*1.001){ gl_Position=vec4(2.,2.,2.,1.); return; }
  gI=uLvI[4]; vec2 c; float r,z,id; ballOf(vec2(float(t.x-${Q}),float(t.y-L*${F}-${Q})),L,c,r,z,id);
  vec3 ax=toC/d, up0=abs(ax.y)<.95?vec3(0.,1.,0.):vec3(1.,0.,0.), rt=normalize(cross(ax,up0)), up=cross(rt,ax);
  float sz=(d-b.w)*b.w/sqrt(d*d-b.w*b.w)*1.04;
  vP=b.xyz-ax*b.w+(rt*position.x+up*position.y)*sz;
  vC=b.xyz; vR=b.w; vLayer=float(L); vId=id;
  vec2 hn=h22(mod(cid(c)+vec2(31.,7.),256.))-.5; vNuc=normalize(uNp*1.6+uT*hn.x+uB*hn.y);   // nucleus seen through the top
  gl_Position=projectionMatrix*viewMatrix*vec4(vP,1.);
}`,fragmentShader:`
uniform vec3 uCamLocal,uSun,uNp,uAnchorF,uPatchCol,uEyeCell; uniform float uLogC,uFocus,uDofK,uFogR,uFogK,uPatchTint,uH,uEyeK;
uniform mat4 uShadowMat; uniform highp sampler2DShadow uShadowMap;
varying vec3 vP,vC,vNuc; varying float vR,vLayer,vId;
void main(){
  vec3 dir=normalize(vP-uCamLocal), oc=uCamLocal-vC;
  float bb=dot(oc,dir), disc=bb*bb-(dot(oc,oc)-vR*vR); if(disc<0.) discard;
  float sq=sqrt(disc), t=-bb-sq; if(t<=1e-4) discard; vec3 hit=uCamLocal+dir*t, N=normalize(hit-vC), V=-dir; float dist=t;
  float ndv=max(dot(N,V),0.);   // = half the chord through the cell / r: 1 through the middle, 0 at the rim
  // flesh colour of this cell (as the skin patch would start from) with its own hue
  vec3 alb=uPatchCol*mix(vec3(1.),vec3(1.,.789,.82),uPatchTint*.55)*mix(vec3(.97,.84,.85),vec3(1.06,.97,.95),vId);
  // on the eye the cells are clear and blue instead of flesh pink; their depths, glow and nuclei follow
  alb=mix(alb,uEyeCell*mix(vec3(.84,.94,.98),vec3(1.06,1.03,1.),vId),uEyeK);
  vec3 deep=mix(vec3(.28,.045,.055),vec3(.05,.12,.3),uEyeK), warm=mix(vec3(.6,.24,.2),vec3(.2,.45,.6),uEyeK), nucC=mix(vec3(.68,.42,.54),vec3(.4,.55,.85),uEyeK);
  // occlusion by the neighbours: the underside of the top layer and most of the lower layer sit in
  // the dark between the cells, sliding into the abyss's deep red
  float up=dot(N,uNp), occ=clamp(vLayer*.55+(.25-up)*.55,0.,1.);
  vec3 s=(uShadowMat*vec4(uAnchorF+hit*uH,1.)).xyz*.5+.5; float sh=1.;
  if(s.x>0.&&s.y>0.&&s.x<1.&&s.y<1.&&s.z<1.) sh=texture(uShadowMap,vec3(s.xy,s.z-.0012));
  float ndl=dot(N,uSun), lit=smoothstep(-.38,.5,ndl)*sh*(1.-.7*occ);   // wide wrap: soft, translucent
  vec3 amb=mix(vec3(.50,.43,.42),vec3(.56,.60,.72),up*.5+.5)*mix(1.,.35,occ);
  // translucent cytoplasm: lit through its whole body, glowing warm where the ray runs deep through it
  vec3 col=alb*vec3(1.03,.92,.92)*(amb*.8*mix(vec3(1.,.8,.82),vec3(1.),lit)+vec3(.55,.5,.43)*lit);
  float sunIn=sh*(1.-.6*occ)*(.45+.55*smoothstep(-.6,.6,dot(uSun,uNp)));
  col+=alb*warm*ndv*ndv*.4*sunIn;
  // the nucleus: a smaller sphere inside, seen through the cytoplasm in front of it (the deeper it lies
  // the fainter), its edge soft, a darker nucleolus in its middle
  float rn=vR*(.34+.1*vId); vec3 nc=vC+vNuc*vR*.2, on=uCamLocal-nc;
  float nb=dot(on,dir), nd=nb*nb-(dot(on,on)-rn*rn);
  if(nd>0.){
    float tn=-nb-sqrt(nd); vec3 Nn=normalize(on+dir*tn);
    float vis=exp(-2.2*max(tn-t,0.)/vR)*smoothstep(0.,.3,sqrt(nd)/rn);
    float nl=smoothstep(-.5,.7,dot(Nn,uSun))*sh*(1.-.6*occ);
    vec3 ncol=alb*nucC*(amb*.85+vec3(.6,.55,.47)*nl);
    ncol*=1.-.32*smoothstep(.4,.15,sqrt(max(dot(on,on)-nb*nb,0.))/rn);
    col=mix(col,ncol,vis*.8);
  }
  col=mix(col,alb*deep*(.55+.45*lit),occ*.8);
  // thin rim: the membrane seen edge-on, the cell clear there (the dim depths show through) with a bright
  // fresnel line; a crisp wet highlight
  float fr=pow(max(1.-ndv,0.),3.);
  col=mix(col,alb*vec3(.7,.46,.5)*(amb+.35*lit),smoothstep(.45,0.,ndv)*.4);
  col+=vec3(1.,.9,.86)*.3*fr*(.35+.65*lit)*(1.-occ);
  vec3 Hh=normalize(uSun+V); col+=vec3(1.,.96,.9)*.28*pow(max(dot(N,Hh),0.),60.)*lit;
  float q=log(1.+dist/200.)*.4343; float hz=min(.92,1.-exp(-.3*q));
  if(uFogR>0.) hz=max(hz,uFogK*smoothstep(.16*uFogR,.6*uFogR,dist));
  col=mix(col,mix(vec3(.80,.85,.95),vec3(1.05,.96,.84),pow(max(dot(dir,uSun),0.),2.)),hz);
  if(!(col.r+col.g+col.b<1e5)) col=vec3(.8,.85,.95);
  gl_FragColor=vec4(col,smoothstep(1.3,3.2,log(dist/uFocus)*.4343)*uDofK);
  gl_FragDepth=log2(max(1.-(viewMatrix*vec4(hit,1.)).z,1.))*uLogC*.5;
}`})}return{G:st,CTRL_NA:X,CTRL_NR:J,CTRL_K:b,ctrlRing:y,CTRL_NEAR:I,surfaceUniforms:U,surfaceMaterial:O,outlineMaterial:A,depthMaterial:L,probeMaterial:$,centerMaterial:H,BALL_RC:Q,BALL_W:F,ballPassMaterial:W,ballMaterial:et}})(),he=await(async()=>{const{G:Z}=zt,mt=4500,lt=12,st=4,X=(b,y,I)=>{const D=Math.min(1,Math.max(0,(I-b)/(y-b)));return D*D*(3-2*D)};class J{constructor(y){const I=new r.InstancedBufferGeometry;I.setAttribute("position",new r.BufferAttribute(new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,1,0]),3)),I.setIndex([0,1,2,0,2,3]),I.instanceCount=2*mt,this.u={uOff:{value:[new r.Vector3,new r.Vector3]},uScale:{value:[1,1]},uW:{value:[0,0]},uSeed:{value:[0,0]},uVel:{value:new r.Vector3},uZoom:{value:0},uDustK:{value:0}};const D=new r.ShaderMaterial({uniforms:{...Z,...this.u},vertexShader:`
#define N ${mt}
#define S ${lt}.
uniform vec3 uCamLocal,uOff[2],uVel,uSun; uniform float uScale[2],uW[2],uSeed[2],uZoom,uDustK,uTime,uLogC; uniform vec2 uRes,uProjXY;
varying vec2 vQ; varying float vHL,vA; varying vec3 vCol;
uint pcg(uint v){ uint s=v*747796405u+2891336453u; uint w=((s>>((s>>28u)+4u))^s)*277803737u; return (w>>22u)^w; }
void main(){
  int id=gl_InstanceID, o=id/N; uint k=pcg(uint(id-o*N)*2654435761u^uint(uSeed[o]));
  uint k2=pcg(k), k3=pcg(k2), k4=pcg(k3);
  vec3 h=vec3(float(k>>8u),float(k2>>8u),float(k3>>8u))*(1./16777216.);
  float hs=float(k4>>8u)*(1./16777216.);
  vec3 A=h*S+.35*sin(uTime*(.07+.12*h.zxy)+h.yzx*60.);   // slow drift on the air
  vec3 rel=mod(A-uOff[o]+S*.5,S)-S*.5;                    // octave units, around the camera
  vec3 R=rel*uScale[o];                                   // local units, from the camera
  float sz=(.012+.05*hs*hs*hs)*uScale[o], dR=length(R);
  // where it was a moment ago relative to the camera: camera motion, plus the swelling from shrinking
  vec3 dP=(uVel+R*uZoom)*.02; float lp=length(dP); if(lp>.6*dR) dP*=.6*dR/lp;
  float a=uDustK*uW[o]*(1.-smoothstep(.3,.5,max(abs(rel.x),max(abs(rel.y),abs(rel.z)))/S))*smoothstep(.25,1.,dR);   // none right on the lens
  vec3 P0=(viewMatrix*vec4(uCamLocal+R,1.)).xyz, P1=(viewMatrix*vec4(uCamLocal+R+dP,1.)).xyz;
  vec4 C0=projectionMatrix*vec4(P0,1.), C1=projectionMatrix*vec4(P1,1.);
  if(a<.004||C0.w<.05){ gl_Position=vec4(2.,2.,2.,1.); return; }
  if(C1.w<.05) C1=C0;
  // built in pixels: a speck of at most a few pixels (a mote right in front of the lens would otherwise
  // cover half the screen), at least one pixel (fainter instead of flickering), a streak of at most 70:
  // near motes streak while far ones stay specks, so a fast flight has depth
  vec2 hf=uRes*.5, s0=C0.xy/C0.w*hf, ax=C1.xy/C1.w*hf-s0;
  float rp=sz*uProjXY.y*hf.y/C0.w, rc=clamp(rp,1.1,3.+3.*hs); a*=min(1.,rp*rp/1.21);
  float L=length(ax); if(L>70.){ ax*=70./L; L=70.; }
  vec2 al=L>.01?ax/L:vec2(1.,0.), pe=vec2(-al.y,al.x);
  vec2 sp=s0+ax*(position.x*.5+.5)+al*position.x*rc+pe*position.y*rc;
  vHL=.5*L/rc; vQ=vec2(position.x*(vHL+1.),position.y);
  // lit by the sun: they sparkle when you look toward it (forward scattering)
  float fw=pow(max(dot(normalize(R),uSun),0.),6.);
  vCol=vec3(1.,.95,.9)*(1.3+2.4*fw);
  vA=a*(.8+.2*hs)*inversesqrt(1.+vHL);   // a streak spreads its light over its length
  // the same logarithmic depth as the scene, set per vertex (no per-pixel depth: keeps early-z)
  gl_Position=vec4(sp/hf*C0.w,(log2(1.+C0.w)*uLogC-1.)*C0.w,C0.w);
}`,fragmentShader:`
varying vec2 vQ; varying float vHL,vA; varying vec3 vCol;
void main(){
  float d=length(vec2(max(abs(vQ.x)-vHL,0.),vQ.y));
  float tl=clamp((vQ.x+vHL)/max(2.*vHL,1e-3),0.,1.);   // 0 at the mote, 1 at the end of its tail
  float a=vA*exp(-d*d*3.2)*(1.-smoothstep(.8,1.,d))*(1.-.85*tl*tl)*(1.+.6*smoothstep(.3,0.,tl)*step(.5,vHL));
  if(a<.002) discard;
  gl_FragColor=vec4(vCol,a);
}`,transparent:!0,depthWrite:!1,depthTest:!0,blending:r.CustomBlending,blendEquation:r.AddEquation,blendSrc:r.SrcAlphaFactor,blendDst:r.OneMinusSrcAlphaFactor,blendEquationAlpha:r.AddEquation,blendSrcAlpha:r.ZeroFactor,blendDstAlpha:r.OneFactor});this.mesh=new r.Mesh(I,D),this.mesh.frustumCulled=!1,this.mesh.matrixAutoUpdate=!1,this.mesh.visible=!1,this.mesh.renderOrder=10,y.add(this.mesh),this.prev=null,this.prevLogH=0,this.vel=[0,0,0],this.zoom=0}update(y,I,D,R){const p=Math.exp(R),z=this.u,M=1-X(Math.log(6e-5),Math.log(6e-4),R);z.uDustK.value=M,this.mesh.visible=M>.01;const c=[I[0]+D[0]*p,I[1]+D[1]*p,I[2]+D[2]*p];if(this.prev&&y>0){const O=1-Math.exp(-y*20);for(let A=0;A<3;A++)this.vel[A]+=((c[A]-this.prev[A])/p/y-this.vel[A])*O;this.zoom+=((R-this.prevLogH)/y-this.zoom)*O}if(this.prev=c,this.prevLogH=R,!this.mesh.visible)return;z.uVel.value.fromArray(this.vel),z.uZoom.value=this.zoom;const C=R/Math.log(st),U=Math.ceil(C);for(const O of[U,U+1]){const A=(O%2+2)%2,L=Math.pow(st,O),$=O-C;z.uScale.value[A]=L/p,z.uW.value[A]=Math.sin(Math.PI*$/2)**2,z.uSeed.value[A]=(O*7919%65536+65536)%65536;const H=z.uOff.value[A];for(let Q=0;Q<3;Q++){const F=c[Q]/L;H.setComponent(Q,(F%lt+lt)%lt)}}}}return{Dust:J}})(),ue=await(async()=>{const Z="varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.,1.); }",mt=(st,X)=>new r.ShaderMaterial({vertexShader:Z,fragmentShader:st,uniforms:X,depthTest:!1,depthWrite:!1});class lt{constructor(X,{samples:J=4,taps:b=20}={}){this.r=X,this.samples=J,this.cam=new r.OrthographicCamera(-1,1,1,-1,0,1),this.quad=new r.Mesh(new r.PlaneGeometry(2,2),null),this.quad.frustumCulled=!1,this.scene=new r.Scene,this.scene.add(this.quad),this.dof=mt(`
#define TAPS ${b}
uniform sampler2D tSrc; uniform vec2 uPx; uniform float uMaxR; varying vec2 vUv;
void main(){
  vec4 c=texture2D(tSrc,vUv); float coc=c.a*uMaxR;
  vec3 acc=c.rgb; float ws=1.;
  for(int i=0;i<TAPS;i++){
    float r=sqrt((float(i)+.5)/float(TAPS))*coc, a=float(i)*2.39996;
    vec4 s=texture2D(tSrc,vUv+vec2(cos(a),sin(a))*r*uPx);
    float w=mix(.04,1.,smoothstep(0.,1.,s.a/max(c.a,1e-3)));
    acc+=s.rgb*w; ws+=w;
  }
  gl_FragColor=vec4(acc/ws,c.a);
}`,{tSrc:{value:null},uPx:{value:new r.Vector2},uMaxR:{value:6}}),this.down=mt(`
uniform sampler2D tSrc; uniform vec2 uPx; uniform float uKnee; varying vec2 vUv;
void main(){
  vec4 c=texture2D(tSrc,vUv)*4.;
  c+=texture2D(tSrc,vUv+uPx)+texture2D(tSrc,vUv-uPx)+texture2D(tSrc,vUv+vec2(uPx.x,-uPx.y))+texture2D(tSrc,vUv+vec2(-uPx.x,uPx.y));
  c/=8.;
  if(!(c.r+c.g+c.b<1e5)) c=vec4(0.);   // never let a stray NaN/inf spread through the mip chain
  if(uKnee>0.){ float l=max(c.r,max(c.g,c.b)); c.rgb*=smoothstep(uKnee*.6,uKnee*1.6,l); }
  gl_FragColor=c;
}`,{tSrc:{value:null},uPx:{value:new r.Vector2},uKnee:{value:0}}),this.up=mt(`
uniform sampler2D tSrc; uniform vec2 uPx; varying vec2 vUv;
void main(){
  vec3 c=texture2D(tSrc,vUv+vec2(-uPx.x*2.,0.)).rgb+texture2D(tSrc,vUv+vec2(uPx.x*2.,0.)).rgb+texture2D(tSrc,vUv+vec2(0.,uPx.y*2.)).rgb+texture2D(tSrc,vUv+vec2(0.,-uPx.y*2.)).rgb;
  c+=2.*(texture2D(tSrc,vUv+uPx).rgb+texture2D(tSrc,vUv-uPx).rgb+texture2D(tSrc,vUv+vec2(uPx.x,-uPx.y)).rgb+texture2D(tSrc,vUv+vec2(-uPx.x,uPx.y)).rgb);
  gl_FragColor=vec4(c/12.,1.);
}`,{tSrc:{value:null},uPx:{value:new r.Vector2}}),this.up.blending=r.AdditiveBlending,this.up.transparent=!0,this.final=mt(`
uniform sampler2D tScene,tDof,tBloom; uniform float uBloom,uExposure,uTime,uDof; varying vec2 vUv;
void main(){
  vec4 s=texture2D(tScene,vUv); vec3 c=s.rgb;
  if(uDof>0.) c=mix(c,texture2D(tDof,vUv).rgb,smoothstep(.04,.3,s.a));
  c+=texture2D(tBloom,vUv).rgb*uBloom;
  c*=uExposure;
  c=c/(1.+c*.38);
  float l=dot(c,vec3(.299,.587,.114)); c=mix(vec3(l),c,1.14);
  vec2 d=vUv-.5; c*=1.-dot(d,d)*.55;
  c=pow(max(c,0.),vec3(1./2.2));
  c+=(fract(sin(dot(gl_FragCoord.xy+uTime*61.,vec2(12.9898,78.233)))*43758.5453)-.5)/255.*1.5;
  gl_FragColor=vec4(c,1.);
}`,{tScene:{value:null},tDof:{value:null},tBloom:{value:null},uBloom:{value:.16},uExposure:{value:1},uTime:{value:0},uDof:{value:0}}),this.mips=[]}setSize(X,J){const b={type:r.HalfFloatType,minFilter:r.LinearFilter,magFilter:r.LinearFilter,depthBuffer:!1};for(const D of[this.rtScene,this.rtDof,...this.mips])D&&D.dispose();this.rtScene=new r.WebGLRenderTarget(X,J,{...b,depthBuffer:!0,samples:this.samples}),this.mips=[];let y=X,I=J;for(let D=0;D<6;D++)y=Math.max(2,y>>1),I=Math.max(2,I>>1),this.mips.push(new r.WebGLRenderTarget(y,I,b));this.rtDof=new r.WebGLRenderTarget(this.mips[0].width,this.mips[0].height,b),this.w=X,this.h=J}_draw(X,J){this.quad.material=X,this.r.setRenderTarget(J),this.r.render(this.scene,this.cam)}render(X,J,b,y=!0,I=null){const D=this.r,R=this.mips;if(D.setRenderTarget(this.rtScene),D.setClearColor(14673653,0),D.clear(),X&&D.render(X,J),I)for(const[M,c]of I)D.render(M,c);let p=this.rtScene;for(let M=0;M<R.length;M++)this.down.uniforms.tSrc.value=p.texture,this.down.uniforms.uPx.value.set(.5/p.width,.5/p.height),this.down.uniforms.uKnee.value=M===1?1.15:0,this._draw(this.down,R[M]),p=R[M];for(let M=R.length-1;M>1;M--)this.up.uniforms.tSrc.value=R[M].texture,this.up.uniforms.uPx.value.set(.5/R[M].width,.5/R[M].height),this._draw(this.up,R[M-1]);y&&(this.dof.uniforms.tSrc.value=R[0].texture,this.dof.uniforms.uPx.value.set(1/R[0].width,1/R[0].height),this.dof.uniforms.uMaxR.value=R[0].height/85,this._draw(this.dof,this.rtDof));const z=this.final.uniforms;z.tScene.value=this.rtScene.texture,z.tDof.value=this.rtDof.texture,z.tBloom.value=R[1].texture,z.uTime.value=b,z.uDof.value=y?1:0,this._draw(this.final,null)}}return{Post:lt}})(),Bt=await(async()=>{const{G:Z}=zt,mt=`
uniform float uPush; varying vec3 vN,vP; varying float vW;
void main(){
  vec4 wp=modelMatrix*vec4(position+normal*uPush,1.); vP=wp.xyz; vN=normalize(mat3(modelMatrix)*normal);
  gl_Position=projectionMatrix*viewMatrix*wp; vW=1.+gl_Position.w;
}`,lt=`
uniform vec3 uColor,uSun,uCamLocal,uAnchorF; uniform float uLogC,uEmit,uFlat; uniform mat4 uShadowMat; uniform highp sampler2DShadow uShadowMap;
varying vec3 vN,vP; varying float vW;
void main(){
  vec3 N=normalize(vN), V=normalize(uCamLocal-vP);
  vec3 s=(uShadowMat*vec4(uAnchorF+uSun*.004,1.)).xyz*.5+.5; float sh=1.;
  if(s.x>0.&&s.y>0.&&s.x<1.&&s.y<1.&&s.z<1.) sh=texture(uShadowMap,vec3(s.xy,s.z-.0015));
  float lit=smoothstep(-.02,.12,dot(N,uSun))*mix(.3,1.,sh);
  vec3 col=uColor*(vec3(.46,.46,.55)+vec3(.58,.54,.47)*lit);
  col+=pow(1.-max(dot(N,V),0.),3.)*.35*vec3(1.,.95,.9)+uColor*uEmit;
  col=mix(col,uColor,uFlat);
  gl_FragColor=vec4(col,0.); gl_FragDepth=log2(vW)*uLogC*.5;
}`;function st(y,I=0){return new r.ShaderMaterial({uniforms:{uSun:Z.uSun,uCamLocal:Z.uCamLocal,uAnchorF:Z.uAnchorF,uLogC:Z.uLogC,uShadowMat:Z.uShadowMat,uShadowMap:Z.uShadowMap,uColor:{value:new r.Color(y)},uEmit:{value:I},uPush:{value:0},uFlat:{value:0}},vertexShader:mt,fragmentShader:lt})}const X=st(2759724);X.uniforms.uPush.value=.016,X.uniforms.uFlat.value=1,X.side=r.BackSide;class J{constructor(I){const D=this.group=new r.Group;D.matrixAutoUpdate=!1;const R=(O,A,L,$,H,Q,F=!0)=>{const W=new r.Mesh(A,L);if(W.position.set($,H,Q),W.frustumCulled=!1,O.add(W),F){const et=new r.Mesh(A,X);et.frustumCulled=!1,W.add(et)}return W},p=st(16738877),z=st(16774374),M=st(16768200),c=st(3424382),C=st(2760752);this.flame=st(9431295,3.5),this.body=new r.Group,D.add(this.body),R(this.body,new r.CapsuleGeometry(.125,.15,6,16),p,0,.44,0),R(this.body,new r.SphereGeometry(.205,24,18),M,0,.76,0),R(this.body,new r.SphereGeometry(.222,24,14,0,Math.PI*2,0,Math.PI*.56),c,0,.775,-.012).rotation.x=-.35;for(const O of[-1,1])R(this.body,new r.SphereGeometry(.03,10,8),C,O*.075,.755,.185,!1).scale.set(1,1.35,.5);R(this.body,new r.TorusGeometry(.115,.035,8,20),z,0,.585,0).rotation.x=Math.PI/2,R(this.body,new r.BoxGeometry(.17,.2,.09),z,0,.46,-.15),this.jets=[-1,1].map(O=>R(this.body,new r.SphereGeometry(.035,10,8),this.flame,O*.05,.33,-.16,!1));const U=(O,A,L,$,H)=>{const Q=new r.Group;return Q.position.set(O,A,0),this.body.add(Q),R(Q,new r.CapsuleGeometry($,L,5,10),H,0,-L/2-$*.5,0),Q};this.legs=[U(-.065,.32,.17,.052,C),U(.065,.32,.17,.052,C)],this.arms=[U(-.165,.535,.14,.042,p),U(.165,.535,.14,.042,p)],this.phase=0,I.add(D)}update(I,D,R,p,z,M,c){const C=new r.Vector3().crossVectors(R,p).normalize(),U=new r.Vector3().crossVectors(C,R);this.group.matrix.makeBasis(C,R,U).setPosition(D),this.group.matrixWorldNeedsUpdate=!0,this.phase+=I*(M?3:9*Math.min(1.6,c));const O=M?0:Math.sin(this.phase)*.75*z;this.legs[0].rotation.x=M?.5+.1*Math.sin(this.phase):O,this.legs[1].rotation.x=M?.35-.1*Math.sin(this.phase):-O,this.arms[0].rotation.x=M?.9:-O*.8,this.arms[1].rotation.x=M?.9:O*.8,this.arms[0].rotation.z=M?-.5:-.12,this.arms[1].rotation.z=M?.5:.12,this.body.rotation.x=M?.35*Math.min(1,c):.06*z,this.body.position.y=M?.06*Math.sin(this.phase*.7):Math.abs(Math.sin(this.phase))*.025*z;const A=M?1+.35*Math.sin(this.phase*9):.001;for(const L of this.jets)L.scale.setScalar(A)}}function b(y=300,I=360){const D=new Float32Array((y+1)*I*3),R=new Uint32Array(y*I*6);for(let M=0;M<=y;M++)for(let c=0;c<I;c++){const C=(M*I+c)*3;D[C]=M/y,D[C+1]=(c+(M&1)*.5)/I*Math.PI*2,D[C+2]=0}let p=0;for(let M=0;M<y;M++)for(let c=0;c<I;c++){const C=(c+1)%I,U=M*I+c,O=M*I+C,A=(M+1)*I+c,L=(M+1)*I+C;M&1?(R[p++]=U,R[p++]=L,R[p++]=O,R[p++]=U,R[p++]=A,R[p++]=L):(R[p++]=U,R[p++]=A,R[p++]=O,R[p++]=O,R[p++]=A,R[p++]=L)}const z=new r.BufferGeometry;return z.setAttribute("position",new r.BufferAttribute(D,3)),z.setIndex(new r.BufferAttribute(R,1)),z}return{PlayerView:J,patchGeometry:b}})(),fe=await(async()=>{const{buildSkin:Z,buildDress:mt,buildBed:lt,buildHair:st,tintAt:X,HEAD:J}=Wt,{meshShape:b,makeAO:y,boxMesh:I,mergeMeshes:D}=re,{loadCharacter:R,finishParts:p,bodyField:z,rayAO:M}=jt,{loadFeet:c,finishFeet:C}=le,{BVH:U}=ce,{G:O,surfaceMaterial:A,surfaceUniforms:L,outlineMaterial:$,depthMaterial:H}=zt,Q=()=>new Promise(s=>setTimeout(s,0));function F(s){const f=new r.BufferGeometry,l=s.pos.length/3;return f.setAttribute("position",new r.BufferAttribute(s.pos,3)),f.setAttribute("normal",new r.BufferAttribute(s.nrm,3)),f.setAttribute("aAO",new r.BufferAttribute(s.ao,1)),f.setAttribute("aTint",new r.BufferAttribute(s.tint||new Float32Array(l),1)),f.setAttribute("aTan",new r.BufferAttribute(s.tan||new Float32Array(l*3).fill(.577),3)),f.setAttribute("aCol",new r.BufferAttribute(s.col||new Float32Array(l*3).fill(1),3)),s.uv&&f.setAttribute("uv",new r.BufferAttribute(s.uv,2)),s.footA&&(f.setAttribute("aFootA",new r.BufferAttribute(s.footA,4)),f.setAttribute("aFootB",new r.BufferAttribute(s.footB,4))),f.setIndex(new r.BufferAttribute(s.idx,1)),f}function W(){const s=document.createElement("canvas");s.width=s.height=512;const f=s.getContext("2d"),l=(a,P)=>{const g=f.createRadialGradient(a,P,0,a,P,70);g.addColorStop(0,"rgba(255,120,130,0.55)"),g.addColorStop(1,"rgba(255,120,130,0)"),f.fillStyle=g,f.fillRect(a-80,P-80,160,160)};l(120,318),l(392,318),f.lineCap="round",f.strokeStyle="#3a2420";for(const a of[-1,1]){const P=256+a*112;f.lineWidth=9,f.beginPath(),f.arc(P,236,46,Math.PI*.14,Math.PI*.86),f.stroke(),f.lineWidth=5;for(let g=0;g<4;g++){const h=Math.PI*(.2+g*.2);f.beginPath(),f.moveTo(P+Math.cos(h)*46,236+Math.sin(h)*46),f.lineTo(P+Math.cos(h)*60+a*4,236+Math.sin(h)*60),f.stroke()}f.lineWidth=7,f.strokeStyle="#4a302a",f.beginPath(),f.moveTo(P-52,196),f.quadraticCurveTo(P,176,P+52,196),f.stroke(),f.strokeStyle="#3a2420"}f.strokeStyle="#c4566a",f.lineWidth=7,f.beginPath(),f.moveTo(232,398),f.quadraticCurveTo(256,410,280,398),f.stroke(),f.fillStyle="rgba(214,96,112,0.75)",f.beginPath(),f.ellipse(256,406,20,7,0,0,Math.PI),f.fill();const t=new r.CanvasTexture(s);return t.flipY=!1,t.colorSpace=r.NoColorSpace,t}const et=[-.2181,.4803,.22],G=[-.21,.955,.226],e=[{c:[-.29268,.84621,.22955],u:[.545,-.1528,.8244],v:[-.1648,.9446,.284],a:.013,hu:.0047,hd:.005},{c:[-.26236,.83276,.28307],u:[.545,-.1528,.8244],v:[-.1648,.9446,.284],a:.0138,hu:.0045,hd:.004}];function o(s,f,l,t){const a=f-s.c[0],P=l-s.c[1],g=t-s.c[2],h=s.u,B=s.v,m=a*B[0]+P*B[1]+g*B[2];return[(a*h[0]+P*h[1]+g*h[2])/s.a,m/(m>0?s.hu:s.hd),a*(h[1]*B[2]-h[2]*B[1])+P*(h[2]*B[0]-h[0]*B[2])+g*(h[0]*B[1]-h[1]*B[0])]}const n={static:!0,rot:[0,205,0],scale:.58,offset:et,split:(s,f)=>{for(const l of e){const t=o(l,s[0]+et[0],s[1]+et[1],s[2]+et[2]);if(Math.abs(t[2])<.007&&Math.abs(t[0])<1.9&&t[1]>-3.2&&t[1]<5.5)return 0}return(f[0]+f[1]+f[2])/3>.55?0:f[0]-f[2]>.095?2:1},splitSeeds:{2:s=>Math.hypot(s[0]+et[0]-G[0],s[1]+et[1]-G[1],s[2]+et[2]-G[2])<.1},tints:{0:[1.09,1.39,1.44],1:[1,1,1],2:[1,1,1]},sheer:!0,crown:G,tess:2,eyes:e,start:{pos:[-1.55,.6,1],fwd:[.93,0,-.368],pitch:.1}};function u(s,f="model/gltf-binary"){const l=typeof document<"u"&&document.getElementById(s);if(!l)return[];const t=atob(l.textContent.trim()),a=new Uint8Array(t.length);for(let P=0;P<t.length;P++)a[P]=t.charCodeAt(P);return l.remove(),[URL.createObjectURL(new Blob([a],{type:f}))]}const w={feet:[],glb:[],oldFeet:null},E=typeof window<"u"&&window.__ASSETS||{},_=[...u("heroine-feet","application/octet-stream"),...E.feet||[],...w.feet],v=w.oldFeet?w.oldFeet.map(s=>({...n,url:s})):[...u("heroine-glb"),...E.glb||[],...w.glb].map(s=>({...n,url:s,feet:_}));async function i(s,f,l){for(const S of f||[]){const N=typeof S=="string"?{url:S}:S,tt=N.url;try{s(.02,"正在加载角色…");const j=await R(tt,{progress:ot=>s(.02+.3*ot,"正在加载角色…"),static:N.static,rot:N.rot,scale:N.scale,split:N.split,splitSeeds:N.splitSeeds,tints:N.tints});l("model "+tt);let V=N.offset;if(!V){const ot=[];for(const wt of j.parts)if(!wt.overlay&&wt.surf!==2)for(let xt=1;xt<wt.pos.length;xt+=21)ot.push(wt.pos[xt]);ot.sort((wt,xt)=>wt-xt);const nt=ot.length?ot[Math.floor(ot.length*.002)]:0,ht=j.bones.hips||[0,0,0],pt=j.bones.head||ht;V=[-ht[0],-.008-nt,J[2]-pt[2]]}const rt=p(j.parts,V,j.bones,N.tess,{crown:N.crown}).map(ot=>({m:{pos:ot.pos,nrm:ot.nrm,ao:ot.ao,idx:ot.idx,col:ot.col,tint:ot.tint,tan:ot.tan,uv:ot.uv,src:ot.src},surf:ot.surf,collide:!ot.overlay,model:!0,name:ot.name,opts:{map:ot.map,alphaCut:ot.alphaCut,tint:ot.color,doubleSided:ot.doubleSided},outline:ot.overlay||ot.eye?null:ot.surf===0?[9062984,1.2]:ot.surf===1?[328970,1.3]:[1838602,1.3]}));for(const ot of rt)ot.opts.map&&(ot.opts.map.anisotropy=8);let ut=null;for(const ot of N.feet||[])try{ut=C(await c(ot),(rt.find(nt=>nt.surf===0&&nt.collide)||{}).m);break}catch(nt){console.warn("[feet] could not load",ot,nt)}if(N.feet&&!ut)throw new Error("feet missing");ut&&rt.push({m:ut,surf:0,collide:!0,model:!0,name:"feet",opts:{foot:!0},outline:[9062984,1.2]});const at=z(rt.filter(ot=>ot.collide).map(ot=>ot.m));l("model parts");const dt={};for(const[ot,nt]of Object.entries(j.bones))nt&&(dt[ot]=nt.map((ht,pt)=>ht+V[pt]));return{parts:rt,body:at,model:!0,offset:V,bones:dt,start:N.start||null,sheer:!!N.sheer,eyes:N.eyes||[]}}catch(j){console.warn("[model] could not load",tt,j)}}s(.02,"正在构建角色…"),await Q();const t=[],a=Z(t),P=lt(a),g=st(a,P),h=mt(),B=y([a,h,g,P]);l("sdf");const m=b(a,{min:[-.52,-.03,-1],max:[.52,.27,1.03],voxel:.0032,ao:B});m.tint=new Float32Array(m.pos.length/3);for(let S=0;S<m.tint.length;S++)m.tint[S]=X(t,m.pos[S*3],m.pos[S*3+1],m.pos[S*3+2]);l("skin"),s(.4,"正在制作服装…"),await Q();const K=b(h,{min:[-.82,-.03,-.62],max:[.34,.27,1.2],voxel:.004,ao:B});l("dress"),s(.55,"正在整理头发…"),await Q();const x=b(g,{min:[-.68,-.02,-.88],max:[.42,.28,-.08],voxel:.004,ao:B});x.tan=new Float32Array(x.pos.length),x.tint=new Float32Array(x.pos.length/3);for(let S=0;S<x.pos.length/3;S++){const N=x.pos[S*3],tt=x.pos[S*3+1],j=x.pos[S*3+2],V=g.nearest(N,tt,j,1),rt=V>=0?g.axis(V):[.3,0,.95];x.tan.set(rt,S*3);const ut=[x.nrm[S*3],x.nrm[S*3+1],x.nrm[S*3+2]];let at=rt[1]*ut[2]-rt[2]*ut[1],dt=rt[2]*ut[0]-rt[0]*ut[2],ot=rt[0]*ut[1]-rt[1]*ut[0];const nt=Math.hypot(at,dt,ot)||1,ht=V>=0?g.start(V):[0,0,0,0];x.tint[S]=((N-ht[0])*at+(tt-ht[1])*dt+(j-ht[2])*ot)/nt*900+ht[3]*17.37}l("hair");const q=(S,N)=>{S.col=new Float32Array(S.pos.length);for(let tt=0;tt<S.col.length;tt+=3)S.col.set(N,tt)};return q(m,[1,.875,.805]),q(K,[.034,.031,.042]),q(x,[.105,.068,.066]),d(m,(S,N,tt)=>h.fast(S,N,tt)<-.0012||g.fast(S,N,tt)<-.003),{parts:[{m,surf:0,collide:!0,opts:{procFace:!0},outline:[9062984,1.4]},{m:K,surf:1,collide:!0,opts:{},outline:[328970,1.4]},{m:x,surf:2,collide:!0,opts:{},outline:[1838602,1.4]}],body:a,model:!1,hide:(S,N,tt)=>h.fast(S,N,tt)<-.002}}function d(s,f){const l=[],t=new Uint8Array(s.pos.length/3);for(let a=0;a<t.length;a++)t[a]=f(s.pos[a*3],s.pos[a*3+1],s.pos[a*3+2])?1:0;for(let a=0;a<s.idx.length;a+=3)t[s.idx[a]]&&t[s.idx[a+1]]&&t[s.idx[a+2]]||l.push(s.idx[a],s.idx[a+1],s.idx[a+2]);s.idx=new Uint32Array(l)}async function k(s,f,l,{modelUrls:t}={}){const a=performance.now(),P=ct=>console.info("[build]",ct,Math.round(performance.now()-a)+" ms"),g=await i(l,t,P);l(.7,"正在布置场景…"),await Q();const h=lt(g.body),B=b(h,{min:[-1,-.3,-1.2],max:[1,.3,1.2],voxel:.013,ao:y([h,g.body])});B.col=new Float32Array(B.pos.length);for(let ct=0;ct<B.pos.length/3;ct++){const gt=B.pos[ct*3],bt=B.pos[ct*3+1],Rt=B.pos[ct*3+2],Pt=gt>.45&&Rt>-.1&&bt>.012,Et=Rt<-.58&&bt>.012;B.col.set(Pt?[.93,.8,.84]:Et?[1,.985,.97]:[.98,.955,.93],ct*3)}d(B,(ct,gt,bt)=>gt<-.26||g.body.fast(ct,gt,bt)<.0045||(g.hide?g.hide(ct,gt,bt):!1));const m=(ct,gt,bt,Rt)=>{const Pt=I(ct,gt,Rt);return Pt.color=bt,Pt},K=[.52,.37,.28],x=D([m([0,-.36,0],[.95,.11,1.19],K),m([0,.05,-1.25],[1.03,.62,.05],[.9,.78,.78]),m([0,-.56,.3],[3,.06,3],[.74,.62,.52]),m([0,-.495,.95],[1.7,.006,1.25],[.88,.84,.92]),m([-1.38,-.27,-.95],[.25,.23,.22],K),m([-1.38,0,-.95],[.035,.05,.035],[.8,.7,.5]),m([-1.38,.17,-.95],[.13,.12,.13],[2.6,2,1.35])]),q=D([m([0,1.05,.3],[3,1.6,3],[.95,.9,.89],!0),m([2.985,1.15,.2],[.01,.75,1],[3.2,3,2.6])]);P("bed"),l(.85,"正在设置光照…"),await Q();const T=[...g.parts,{m:B,surf:3,collide:!0,opts:{}},{m:x,surf:4,collide:!0,opts:{}},{m:q,surf:4,collide:!0,opts:{}}],S=T.filter(ct=>ct.collide);let N=0,tt=0;for(const{m:ct}of S)N+=ct.pos.length/3,tt+=ct.idx.length/3;const j=new Float32Array(N*3),V=new Float32Array(N*3),rt=new Uint32Array(tt*3),ut=new Uint8Array(tt);let at=0,dt=0;for(const ct of S){const gt=ct.m;ct.vo=at,j.set(gt.pos,at*3),V.set(gt.nrm,at*3);for(let bt=0;bt<gt.idx.length;bt++)rt[dt*3+bt]=gt.idx[bt]+at;ut.fill(ct.surf,dt,dt+gt.idx.length/3),at+=gt.pos.length/3,dt+=gt.idx.length/3}const ot=new U(j,V,rt,ut);if(P("bvh"),g.model){for(const ct of g.parts)M(ot,ct.m);P("ao")}const nt=new Float32Array(N),ht=new Float32Array(N),pt=new Float32Array(N*3).fill(1),wt=new Float32Array(N*3).fill(.577);let xt=null;for(const ct of S){const gt=ct.m,bt=ct.vo;nt.set(gt.ao,bt),gt.tint&&ht.set(gt.tint,bt),gt.col&&pt.set(gt.col,bt*3),gt.tan&&wt.set(gt.tan,bt*3),gt.footA&&(xt={v0:bt,nv:gt.pos.length/3,A:gt.footA,B:gt.footB,P:gt.tan,grad:gt.footGrad})}const Y=[0,1,2,3,4].map(()=>L());Y[1].uSheer.value=g.sheer?1:0;const it=[],vt=[];for(const ct of T){const gt=new r.Mesh(F(ct.m),A(ct.surf,Y[ct.surf],!1,ct.opts));if(gt.frustumCulled=!1,gt.matrixAutoUpdate=!1,f.add(gt),it.push(gt),ct.outline){const bt=new r.Mesh(gt.geometry,$(ct.outline[0],ct.outline[1],ct.opts,ct.surf));bt.frustumCulled=!1,bt.matrixAutoUpdate=!1,f.add(bt),vt.push(bt)}}const ft=it[it.length-1],yt=O.uSun.value,Mt=new r.OrthographicCamera(-2.1,2.1,2.1,-2.1,.5,10);Mt.position.copy(yt).multiplyScalar(5).add(new r.Vector3(0,0,0)),Mt.lookAt(0,0,0),Mt.updateMatrixWorld(),Mt.updateProjectionMatrix();const At=new r.WebGLRenderTarget(4096,4096,{depthBuffer:!0});At.depthTexture=new r.DepthTexture(4096,4096,r.UnsignedIntType),At.depthTexture.minFilter=At.depthTexture.magFilter=r.LinearFilter,At.depthTexture.compareFunction=r.LessEqualCompare,ft.visible=!1,vt.forEach(ct=>ct.visible=!1),f.overrideMaterial=H,s.setRenderTarget(At),s.clear(),s.render(f,Mt),s.setRenderTarget(null),f.overrideMaterial=null,ft.visible=!0,vt.forEach(ct=>ct.visible=!0),O.uShadowMap.value=At.depthTexture,O.uShadowMat.value.multiplyMatrices(Mt.projectionMatrix,Mt.matrixWorldInverse),O.uFaceTex.value=W();const Ct=g.eyes||[];Ct.slice(0,2).forEach((ct,gt)=>{O.uEyeC.value[gt].set(ct.c[0],ct.c[1],ct.c[2],ct.a),O.uEyeU.value[gt].set(ct.u[0],ct.u[1],ct.u[2],ct.hu),O.uEyeV.value[gt].set(ct.v[0],ct.v[1],ct.v[2],ct.hd)});const kt=(ct,gt,bt)=>{let Rt=0;for(const Pt of Ct){if((ct-Pt.c[0])**2+(gt-Pt.c[1])**2+(bt-Pt.c[2])**2>Pt.a*Pt.a*1.5)continue;const Et=o(Pt,ct,gt,bt),qt=Math.min(1,Math.max(0,(Et[0]*Et[0]+Et[1]*Et[1]-.72)/.28));Rt=Math.max(Rt,1-qt*qt*(3-2*qt))}return Rt};return g.model&&console.info("[model] parts",g.parts.map(ct=>ct.name+":"+ct.surf+(ct.collide?"":" (overlay)")).join(", ")),P("done"),{bvh:ot,own:Y,vao:nt,vtint:ht,vcol:pt,vtan:wt,foot:xt,eyes:Ct,eyeMask:kt,stats:{tris:tt,verts:N},HEAD:J,model:g.model,meshes:it,bones:g.bones||null,start:g.start||null}}return{HEROINE_MODELS:v,buildWorld:k}})(),Yt=await(async()=>{const{G:Z,probeMaterial:mt,surfaceMaterial:lt,centerMaterial:st,ballPassMaterial:X,ballMaterial:J,BALL_RC:b,BALL_W:y,CTRL_NA:I,CTRL_NR:D,ctrlRing:R}=zt,{LEVELS:p}=$t,{patchGeometry:z}=Bt,M=(G,e,o)=>{const n=Math.min(1,Math.max(0,(o-G)/(e-G)));return n*n*(3-2*n)},c=(G,e)=>G[0]*e[0]+G[1]*e[1]+G[2]*e[2],C=(G,e)=>[G[1]*e[2]-G[2]*e[1],G[2]*e[0]-G[0]*e[2],G[0]*e[1]-G[1]*e[0]],U=G=>{const e=Math.hypot(G[0],G[1],G[2])||1;return[G[0]/e,G[1]/e,G[2]/e]},O=(G,e,o)=>[G[0]+e[0]*o,G[1]+e[1]*o,G[2]+e[2]*o],A=(G,e)=>[G[0]-e[0],G[1]-e[1],G[2]-e[2]],L=G=>(G%256+256)%256,$=(G,e,o,n,u)=>{const w=L(o),E=L(n),_=Math.min(255,Math.floor(w)),v=Math.min(255,Math.floor(E));G.uLv.value[e].set(w-_,E-v,u),G.uLvI.value[e].set(_,v)},H=2e-10,Q=.12,F=I,W=D;class et{constructor(e,o,n,u){Object.assign(this,{renderer:e,scene:o,camera:n,world:u,bvh:u.bvh}),this.pos=[.72,.5,1.22],this.vel=[0,0,0],this.logH=this.logHT=Math.log(.06),this.up=[0,1,0],this.fwd=U([-.55,0,-.83]),this.pitch=.32,u.start&&(this.pos=u.start.pos.slice(),this.fwd=U(u.start.fwd),u.start.pitch!==void 0&&(this.pitch=u.start.pitch)),this.face=this.fwd.slice(),this.mode="fly",this.grace=0,this.hFoot=0,this.hCam=0,this.camD=3.6,this.moving=0,this.T=[1,0,0],this.B=[0,0,1],this.Np=[0,1,0],this.odo=[0,0],this.odoH=[0,0],this.prevG=null,this.q={},this.q2={},this.ray={},this.nf=[0,1,0],this.ns=[0,1,0];const w=z(320,256);this.patches=[0,1,2,3,4].map(_=>{const v=new r.Mesh(w,lt(_,u.own[_],!0));return v.material.side=r.DoubleSide,v.visible=!1,v.frustumCulled=!1,v.matrixAutoUpdate=!1,o.add(v),v}),this.ctrlData=new Float32Array(F*W*4),this.ctrl=new r.DataTexture(this.ctrlData,F,W,r.RGBAFormat,r.FloatType),this.ctrl.wrapS=r.RepeatWrapping,this.ctrl.minFilter=this.ctrl.magFilter=r.LinearFilter,Z.uCtrl.value=this.ctrl,this.probes=[0,1,2,3,4].map(_=>mt(_,u.own[_])),this.centers=[0,1,2,3,4].map(_=>st(_,u.own[_])),this.cenRT=new r.WebGLRenderTarget(5,4,{type:r.FloatType,depthBuffer:!1,minFilter:r.NearestFilter,magFilter:r.NearestFilter}),Z.uCen.value=this.cenRT.texture,this.probeRT=new r.WebGLRenderTarget(8,1,{type:r.FloatType,depthBuffer:!1,minFilter:r.NearestFilter,magFilter:r.NearestFilter}),this.probeScene=new r.Scene,this.probeQuad=new r.Mesh(new r.PlaneGeometry(2,2),this.probes[0]),this.probeQuad.frustumCulled=!1,this.probeScene.add(this.probeQuad),this.probeCam=new r.OrthographicCamera(-1,1,1,-1,0,1),this.probeBuf=new Float32Array(32),this.lift=0,this.ballRT=new r.WebGLRenderTarget(y,2*y,{type:r.FloatType,depthBuffer:!1,minFilter:r.NearestFilter,magFilter:r.NearestFilter}),this.ballPass=X(u.own[0]);const E=new r.InstancedBufferGeometry;E.setAttribute("position",new r.BufferAttribute(new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,1,0]),3)),E.setIndex([0,1,2,0,2,3]),E.instanceCount=2*y*y,this.balls=new r.Mesh(E,J(u.own[0],this.ballRT.texture)),this.balls.frustumCulled=!1,this.balls.matrixAutoUpdate=!1,this.balls.visible=!1,o.add(this.balls),this.camXZ=[0,0],this.info={}}get H(){return Math.exp(this.logH)}_ground(e){const o=this.pos,n=this.q;return this.bvh.closest(o[0],o[1],o[2],e,n)?(this.bvh.faceNormal(n.tri,this.nf),this.bvh.smoothNormal(n.tri,n.b0,n.b1,n.b2,this.ns),!0):!1}update(e,o){const n=this.bvh,u=this.q;this.logHT=Math.min(Math.log(Q),Math.max(Math.log(H),this.logHT-o.wheel*.0016+(o.grow-o.shrink)*e*1.7)),this.logH+=(this.logHT-this.logH)*(1-Math.exp(-e*7));const w=this.H,E=-o.mx*.0024,_=Math.cos(E),v=Math.sin(E),i=C(this.up,this.fwd);this.fwd=U([this.fwd[0]*_+i[0]*v,this.fwd[1]*_+i[1]*v,this.fwd[2]*_+i[2]*v]),this.pitch=Math.min(1.45,Math.max(-1.2,this.pitch+o.my*.0024));const d=C(this.fwd,this.up),k=o.right-o.left,s=o.fwd-o.back,f=Math.hypot(k,s)>1?1/Math.hypot(k,s):1,l=Math.min(3,Math.max(700*w,.02));let t=this._ground(l);o.toggle&&(this.mode==="walk"?(this.mode="fly",this.vel=O([0,0,0],this.up,3.5),this.grace=.4):this.grace=-1);let a=0;if(this.mode==="walk"&&!t&&(this.mode="fly"),this.mode==="walk"){const T=2.4*(o.boost?2.8:1),S=[(this.fwd[0]*s+d[0]*k)*f,(this.fwd[1]*s+d[1]*k)*f,(this.fwd[2]*s+d[2]*k)*f];if(a=Math.hypot(S[0],S[1],S[2])*T/2.4,a>0&&(this.face=U(S)),this.pos=O([u.x,u.y,u.z],S,T*w*e),a>0){const N=O(this.pos,this.up,.7*w);n.raycast(N[0],N[1],N[2],-this.up[0],-this.up[1],-this.up[2],1.2*w,this.ray)&&(this.pos=O(N,this.up,.001*w-this.ray.t))}this._ground(Math.max(30*w,.01))&&(this.pos=[u.x,u.y,u.z]),o.up&&(this.mode="fly",this.vel=O([0,0,0],this.up,3.5),this.grace=.4)}else{const T=this.pitch-.3,S=Math.cos(T),N=Math.sin(T),tt=[this.fwd[0]*S-this.up[0]*N,this.fwd[1]*S-this.up[1]*N,this.fwd[2]*S-this.up[2]*N],j=t?u.d/w:700,V=4.5*(o.boost?4:1)*Math.max(1,Math.min(j,1500)/25),rt=o.up-o.down,ut=1-Math.exp(-e*5);for(let nt=0;nt<3;nt++)this.vel[nt]+=((tt[nt]*s+d[nt]*k)*f*V+this.up[nt]*rt*V*.8-this.vel[nt])*ut;const at=Math.hypot(this.vel[0],this.vel[1],this.vel[2]);if(a=at/4.5,a>.05){const nt=A(this.vel,O([0,0,0],this.up,c(this.vel,this.up)));Math.hypot(nt[0],nt[1],nt[2])>.2&&(this.face=U(nt))}const dt=at*w*e;this.grace-=e;let ot=!1;if(dt>0){const nt=U(this.vel);n.raycast(this.pos[0],this.pos[1],this.pos[2],nt[0],nt[1],nt[2],dt+.05*w,this.ray)?(this.pos=O(this.pos,nt,Math.max(0,this.ray.t-.05*w)),ot=!0):this.pos=O(this.pos,nt,dt)}if(this.pos[0]=Math.min(2.9,Math.max(-2.9,this.pos[0])),this.pos[1]=Math.min(2.5,Math.max(-.45,this.pos[1])),this.pos[2]=Math.min(3.2,Math.max(-2.6,this.pos[2])),t=this._ground(l),t){const nt=c(A(this.pos,[u.x,u.y,u.z]),this.nf);if(ot||u.d<.06*w||nt<0){const ht=c(this.vel,this.nf),pt=o.down||ht<0&&-ht>.55*at;this.grace<=0&&!o.up&&pt?(this.mode="walk",this.vel=[0,0,0],this.pos=[u.x,u.y,u.z]):(this.pos=O([u.x,u.y,u.z],this.nf,.08*w),ht<0&&(this.vel=O(this.vel,this.nf,-ht)))}}}this.moving+=((this.mode==="walk"?Math.min(1,a):0)-this.moving)*(1-Math.exp(-e*10));const P=t?[u.x,u.y,u.z]:null,g=t?Math.hypot(this.pos[0]-u.x,this.pos[1]-u.y,this.pos[2]-u.z)/w:1e9,h=this.mode==="walk"?1:0,B=U([this.ns[0]*h,1-h+this.ns[1]*h,this.ns[2]*h]),m=1-Math.exp(-e*(h?9:3.5));this.up=U([this.up[0]+(B[0]-this.up[0])*m,this.up[1]+(B[1]-this.up[1])*m,this.up[2]+(B[2]-this.up[2])*m]),this.fwd=U(O(this.fwd,this.up,-c(this.fwd,this.up))),this.face=U(O(this.face,this.up,-c(this.face,this.up)));let K=-1,x=this.T,q=this.B;if(t){K=n.type[u.tri],this.Np=this.nf.slice(),this.T=U(O(this.T,this.Np,-c(this.T,this.Np))),this.B=C(this.Np,this.T);const T=n.idx[u.tri*3]*3,S=[this.world.vtan[T],this.world.vtan[T+1],this.world.vtan[T+2]],N=O(S,this.Np,-c(S,this.Np));if(q=Math.hypot(N[0],N[1],N[2])>.05?U(N):this.B,x=C(q,this.Np),this.prevG){const tt=A(P,this.prevG);Math.hypot(tt[0],tt[1],tt[2])<40*w&&(this.odo[0]+=c(tt,this.T),this.odo[1]+=c(tt,this.B),this.odoH[0]+=c(tt,x),this.odoH[1]+=c(tt,q))}this.prevG=P}else this.prevG=null;this._uniforms(w,t,P,g,K,x,q,e),this.info={H:w,type:this.mode==="walk"||g<4?K:-1,mode:this.mode,speed:a}}_uniforms(e,o,n,u,w,E,_,v){const{world:i,pos:d}=this,k=M(4e-4,.001,e),s=this.Np,f=Math.abs(s[0])>Math.abs(s[1])&&Math.abs(s[0])>Math.abs(s[2])?0:Math.abs(s[1])>Math.abs(s[2])?1:2,l=f===0?2:0,t=f===1?2:1,a=Math.min(27e3,.012/e),P=o?M(Math.max(60,.75*a),Math.max(90,.85*a),u):1,g=o?M(Math.max(90,.85*a),Math.max(150,1.4*a),u):1,h=o&&e<35e-5&&g<1,B=1-M(Math.log(5e-7),Math.log(12e-6),Math.log(e)),m=200/e,K=h&&B>.001?Math.exp(Math.log(a)*(1-g)+Math.log(m)*g):0,x=Math.min(3,Math.max(700*e,.02)),q=o?1-M(.5*x,.9*x,this.q.d):0;for(let ot=0;ot<5;ot++){const nt=i.own[ot],ht=ot===2?this.odoH:this.odo,pt=o&&ot===w;let wt=0;for(let Y=0;Y<5;Y++){const it=p[ot][Y],vt=it/e;let ft=M(.03,.12,vt)*q;Y===0&&(ft*=1-k),$(nt,Y,ht[0]/it,ht[1]/it,e/it),nt.uLvW.value[Y]=ft,nt.uLvC.value[Y]=Y===0?1:M(.12,2.5,vt),nt.uLvK.value[Y]=pt?M(.25,1,vt):0,nt.uLvG.value[Y]=0,ft>0&&(wt=Math.max(wt,400*vt))}nt.uFineRange.value=Math.min(wt,.05/e,K?.62*K/Math.max(B**4,1e-4):1/0),nt.uL0Inv.value=1/p[ot][0];const xt=e/p[ot][0];ot===2?(nt.uRot4.value.set(c(this.T,E),c(this.T,_),c(this.B,E),c(this.B,_)),nt.uM0.value.copy(nt.uRot4.value).multiplyScalar(xt)):o&&($(nt,0,n[l]/p[ot][0],n[t]/p[ot][0],xt),nt.uM0.value.set(this.T[l]*xt,this.T[t]*xt,this.B[l]*xt,this.B[t]*xt))}this._foot(e,o),Z.uEyeK.value=o&&w===0?this.world.eyeMask(this.q.x,this.q.y,this.q.z):0,o&&this._center(w),Z.uMacroW.value=k,Z.uTol.value=Math.min(1e3,6e-8/e),Z.uFogR.value=K,Z.uFogK.value=B,Z.uPatchR.value=h?a:0,Z.uPatchType.value=h?w:-1,Z.uDispK.value=(1-M(12e-5,35e-5,e))*(1-P),this.patches.forEach((ot,nt)=>ot.visible=h&&nt===w);const T=o?[(n[0]-d[0])/e,(n[1]-d[1])/e,(n[2]-d[2])/e]:[0,-1e6,0];Z.uG.value.fromArray(T),Z.uT.value.fromArray(this.T),Z.uB.value.fromArray(this.B),Z.uNp.value.fromArray(this.Np),h&&this._control(e,n,a,w);for(let ot=0;ot<3;ot++){const nt=Math.fround(d[ot]);Z.uAnchorHi.value.setComponent(ot,nt),Z.uAnchorLo.value.setComponent(ot,d[ot]-nt)}Z.uAnchorF.value.fromArray(d),Z.uInvH.value=1/e,Z.uH.value=e,Z.uBlob.value=1-M(.5,2.5,u),Z.uFoot.value.set(0,0,0),Z.uDofK.value=1-M(Math.log(.003),Math.log(.03),this.logH);const S=this.camera,N=Math.cos(this.pitch),tt=Math.sin(this.pitch),j=this.up,V=[this.fwd[0]*N-j[0]*tt,this.fwd[1]*N-j[1]*tt,this.fwd[2]*N-j[2]*tt];let rt=3.6;const ut=O(d,j,.8*e);this.bvh.raycast(ut[0],ut[1],ut[2],-V[0],-V[1],-V[2],rt*e,this.ray)&&(rt=Math.max(.45,this.ray.t/e-.25)),this.camD+=(rt-this.camD)*(1-Math.exp(-v*(rt<this.camD?30:4)));let at=[j[0]*.8-V[0]*this.camD,j[1]*.8-V[1]*this.camD,j[2]*.8-V[2]*this.camD],dt=0;if(h){const ot=A(at,T),nt=.8,ht=c(ot,this.T),pt=c(ot,this.B),wt=this._probe(w,ht,pt,e,Math.abs(this.logHT-this.logH)>.001);let xt=wt[1]+.35;for(let Y=1;Y<=6;Y++)xt=Math.max(xt,nt+(wt[Y+1]+.3-nt)*7/Y);dt=Math.max(0,Math.min(xt,400)-c(ot,this.Np))}this.lift+=(dt-this.lift)*(1-Math.exp(-v*(dt>this.lift?60:5))),at=O(at,this.Np,this.lift),S.position.fromArray(at),S.up.fromArray(j),S.lookAt(j[0]*.95,j[1]*.95,j[2]*.95),S.near=.03,S.far=25/e,S.updateProjectionMatrix(),S.updateMatrixWorld(),Z.uProjXY.value.set(S.projectionMatrix.elements[0],S.projectionMatrix.elements[5]),Z.uCamLocal.value.fromArray(at),Z.uLogC.value=2/Math.log2(S.far+1),Z.uFocus.value=Math.max(1,this.camD),this._balls(e,h,w,P)}_foot(e,o){const n=this.world.foot,u=this.q,w=this.bvh,E=Z.uFootA.value,_=Z.uFootB.value,v=Z.uFootR.value,i=Z.uFootN.value,d=Z.uFootP.value,k=Z.uFootQ.value,s=o&&n?w.idx[u.tri*3]-n.v0:-1;if(s<0||s>=n.nv){E.set(0,0,0,0),_.set(4,-3,0,0),v.set(0,0,0,0),i.set(0,0,0,0),d.set(0,0,0,0),k.set(0,0,0,0);return}const f=[s,w.idx[u.tri*3+1]-n.v0,w.idx[u.tri*3+2]-n.v0],l=[u.b0,u.b1,u.b2],t=(ht,pt,wt)=>ht[f[0]*pt+wt]*l[0]+ht[f[1]*pt+wt]*l[1]+ht[f[2]*pt+wt]*l[2],a=ht=>[t(n.grad,18,ht*3),t(n.grad,18,ht*3+1),t(n.grad,18,ht*3+2)],P=t(n.A,4,1),g=t(n.B,4,0),h=t(n.B,4,1),B=a(0),m=a(1),K=a(2),x=this.T,q=this.B,T=this.Np,S=Math.pow(Math.pow(Math.abs(g),4)+Math.pow(Math.abs(h-.5)*2,4),.25);E.set(t(n.A,4,0),t(n.A,4,3),0,0),_.set(g,h,0,1-M(.95,1.05,S)),i.set(c(m,x)*e,c(m,q)*e,c(K,x)*e,c(K,q)*e);const N=Math.abs(T[0])>Math.abs(T[1])&&Math.abs(T[0])>Math.abs(T[2])?0:Math.abs(T[1])>Math.abs(T[2])?1:2,tt=N===0?2:0,j=N===1?2:1,V=p[0][0],rt=ht=>[V*(ht[tt]-ht[N]*T[tt]/T[N]),V*(ht[j]-ht[N]*T[j]/T[N])],ut=rt(B),at=t(n.P,3,0),dt=t(n.P,3,1),ot=rt(a(4)),nt=rt(a(5));v.set(ut[0],ut[1],P-Math.floor(P),L(Math.floor(P))),d.set(at-Math.floor(at),dt-Math.floor(dt),t(n.B,4,3),0),k.set(ot[0],ot[1],nt[0],nt[1])}_control(e,o,n,u){const{bvh:w,ctrlData:E,q:_,T:v,B:i,Np:d}=this,k=this.ray,s=[0,0,0],f=w.idx[_.tri*3]*3,l=w.idx[_.tri*3+1]*3,t=w.idx[_.tri*3+2]*3,a=w.pos,P=[a[f],a[f+1],a[f+2]],g=A([a[l],a[l+1],a[l+2]],P),h=A([a[t],a[t+1],a[t+2]],P),B=c(g,g),m=c(g,h),K=c(h,h),x=1/(B*K-m*m),q=this.ctrlPrev||(this.ctrlPrev=new Float64Array(F)),T=Z.uEyeK.value,S=[o[0],o[1],o[2],e,v[0],v[1],v[2],d[0],d[1],d[2],u,T,_.tri],N=this._ck,tt=N&&S.every((at,dt)=>at===N[dt]);this._ck=S;for(let at=0;!tt&&at<W;at++){const dt=n*R(at/(W-1)),ot=at?dt-n*R((at-1)/(W-1)):0,nt=2.5*Math.min(ot,n/12)+3;for(let ht=0;ht<F;ht++){const pt=ht/F*Math.PI*2,wt=dt*Math.cos(pt)*e,xt=dt*Math.sin(pt)*e,Y=[o[0]+v[0]*wt+i[0]*xt,o[1]+v[1]*wt+i[1]*xt,o[2]+v[2]*wt+i[2]*xt],it=A(Y,P),vt=c(it,g),ft=c(it,h),yt=(K*vt-m*ft)*x,Mt=(B*ft-m*vt)*x;let At=0,Ct=1;if(at===0||yt>=-1e-9&&Mt>=-1e-9&&yt+Mt<=1+1e-9)w.smoothNormal(_.tri,1-yt-Mt,yt,Mt,s);else{const ct=Math.max(q[ht],0)+nt,gt=Math.min(q[ht],0)-2.5*ot-.6*dt-3;w.raycast(Y[0]+d[0]*ct*e,Y[1]+d[1]*ct*e,Y[2]+d[2]*ct*e,-d[0],-d[1],-d[2],(ct-gt)*e,k,u)?(w.smoothNormal(k.tri,k.b0,k.b1,k.b2,s),c(s,d)<-.05?(At=ct,s[0]=d[0],s[1]=d[1],s[2]=d[2],Ct=2):At=ct-k.t/e):(s[0]=d[0],s[1]=d[1],s[2]=d[2],At=q[ht]-.5*ot,Ct=2)}if(q[ht]=At,T>0){At*=1-T;for(let ct=0;ct<3;ct++)s[ct]+=(d[ct]-s[ct])*T;Ct===2&&T>.5&&(Ct=1)}const kt=(at*F+ht)*4;E[kt]=s[0]*Ct,E[kt+1]=s[1]*Ct,E[kt+2]=s[2]*Ct,E[kt+3]=At}if(at){const ht=at*F*4,pt=1.5*Math.max(ot,dt*2*Math.PI/F)+4,wt=this.ctrlRow||(this.ctrlRow=new Float64Array(F));for(let xt=0;xt<F;xt++)wt[xt]=E[ht+xt*4+3];for(let xt=0;xt<F;xt++){const Y=ht+xt*4,it=Math.max(wt[(xt+1)%F],wt[(xt+F-1)%F],E[Y-F*4+3]);E[Y]*E[Y]+E[Y+1]*E[Y+1]+E[Y+2]*E[Y+2]<2.25&&wt[xt]-it>pt&&(E[Y]=d[0]*2,E[Y+1]=d[1]*2,E[Y+2]=d[2]*2,E[Y+3]=it,q[xt]=it)}}}tt||(this.ctrl.needsUpdate=!0);const j=this.world,V=w.idx[_.tri*3],rt=w.idx[_.tri*3+1],ut=w.idx[_.tri*3+2];Z.uPatchAO.value=j.vao[V]*_.b0+j.vao[rt]*_.b1+j.vao[ut]*_.b2,Z.uPatchTint.value=j.vtint[V]*_.b0+j.vtint[rt]*_.b1+j.vtint[ut]*_.b2,Z.uPatchCol.value.set(j.vcol[V*3],j.vcol[V*3+1],j.vcol[V*3+2]),Z.uPatchTan.value.set(j.vtan[V*3],j.vtan[V*3+1],j.vtan[V*3+2])}_balls(e,o,n,u){const w=p[0][4]/e,E=o&&n===0?M(.1,.18,w)*(1-u):0;if(Z.uBallK.value=E,Z.uBallR.value=b*w,this.balls.visible=E>0,E>0){const _=this.renderer;this.probeQuad.material=this.ballPass,_.setRenderTarget(this.ballRT),_.render(this.probeScene,this.probeCam),_.setRenderTarget(null)}}_center(e){const o=this.renderer;this.probeQuad.material=this.centers[e],o.setRenderTarget(this.cenRT),o.render(this.probeScene,this.probeCam),o.setRenderTarget(null)}_probe(e,o,n,u,w){const E=this.probes[e],_=this.renderer,v=_.getContext(),i=E.uniforms.uProbe.value,d=this.probeBuf;this.pData||(this.pData=new Float64Array(8),w=!0);const k=f=>{for(let l=0;l<8;l++)Number.isFinite(d[l*4])&&(this.pData[l]=d[l*4]*f)};if(this.pbo||(this.pbo=v.createBuffer(),v.bindBuffer(v.PIXEL_PACK_BUFFER,this.pbo),v.bufferData(v.PIXEL_PACK_BUFFER,128,v.STREAM_READ),v.bindBuffer(v.PIXEL_PACK_BUFFER,null)),this.sync){const f=v.clientWaitSync(this.sync,0,0);(f===v.ALREADY_SIGNALED||f===v.CONDITION_SATISFIED)&&(v.deleteSync(this.sync),this.sync=null,v.bindBuffer(v.PIXEL_PACK_BUFFER,this.pbo),v.getBufferSubData(v.PIXEL_PACK_BUFFER,0,d),v.bindBuffer(v.PIXEL_PACK_BUFFER,null),k(this.probeH))}if(w||!this.sync){i[0].set(0,0),i[1].set(o,n);for(let f=1;f<=6;f++)i[f+1].set(o*f/7,n*f/7);this.probeQuad.material=E,_.setRenderTarget(this.probeRT),_.render(this.probeScene,this.probeCam),w?(_.readRenderTargetPixels(this.probeRT,0,0,8,1,d),k(u),this.sync&&(v.deleteSync(this.sync),this.sync=null)):(v.bindBuffer(v.PIXEL_PACK_BUFFER,this.pbo),v.readPixels(0,0,8,1,v.RGBA,v.FLOAT,0),v.bindBuffer(v.PIXEL_PACK_BUFFER,null),this.sync=v.fenceSync(v.SYNC_GPU_COMMANDS_COMPLETE,0),v.flush(),this.probeH=u),_.setRenderTarget(null)}const s=[];for(let f=0;f<8;f++)s.push(this.pData[f]/u);return s}}return{H_MIN:H,H_MAX:Q,Sim:et}})(),Xt=await(async()=>{const mt=`
#define PR ${1e3.toFixed(1)}
uniform uint uSeed;
uint pcg(uint v){ uint s=v*747796405u+2891336453u; uint w=((s>>((s>>28u)+4u))^s)*277803737u; return (w>>22u)^w; }
uint hsh(ivec3 c,uint s){ return pcg(pcg(pcg(uint(c.z)+s)+uint(c.y))+uint(c.x)); }
uint S(int i){ return uSeed+uint(i)*0x9E3779B9u; }
float hv(ivec3 c,uint s){ return float(hsh(c,s)>>8u)*(1./8388608.)-1.; }
float vn(vec3 p,uint s){
  vec3 fi=floor(p); ivec3 i=ivec3(fi); vec3 f=p-fi; vec3 u=f*f*f*(f*(f*6.-15.)+10.);
  float a=hv(i,s),b=hv(i+ivec3(1,0,0),s),c=hv(i+ivec3(0,1,0),s),d=hv(i+ivec3(1,1,0),s);
  float e=hv(i+ivec3(0,0,1),s),f1=hv(i+ivec3(1,0,1),s),g=hv(i+ivec3(0,1,1),s),h=hv(i+ivec3(1,1,1),s);
  return mix(mix(mix(a,b,u.x),mix(c,d,u.x),u.y),mix(mix(e,f1,u.x),mix(g,h,u.x),u.y),u.z);
}
// value noise with its analytic gradient (fragment-only detail)
vec4 vnd(vec3 p,uint s){
  vec3 fi=floor(p); ivec3 i=ivec3(fi); vec3 f=p-fi;
  vec3 u=f*f*f*(f*(f*6.-15.)+10.), du=30.*f*f*(f*(f-2.)+1.);
  float a=hv(i,s),b=hv(i+ivec3(1,0,0),s),c=hv(i+ivec3(0,1,0),s),d=hv(i+ivec3(1,1,0),s);
  float e=hv(i+ivec3(0,0,1),s),f1=hv(i+ivec3(1,0,1),s),g=hv(i+ivec3(0,1,1),s),h=hv(i+ivec3(1,1,1),s);
  float k1=b-a,k2=c-a,k3=e-a,k4=a-b-c+d,k5=a-c-e+g,k6=a-b-e+f1,k7=-a+b+c-d+e-f1-g+h;
  return vec4(a+k1*u.x+k2*u.y+k3*u.z+k4*u.x*u.y+k5*u.y*u.z+k6*u.z*u.x+k7*u.x*u.y*u.z,
    du*vec3(k1+k4*u.y+k6*u.z+k7*u.y*u.z,k2+k5*u.z+k4*u.x+k7*u.z*u.x,k3+k6*u.x+k5*u.y+k7*u.x*u.y));
}
// sparse round pits with a rim and a deeper hole in the middle (2x2x2 cellular search; radii < .5 cell)
float craters(vec3 x,uint s,float dens,float rmin,float rmax,float hole,out float inside){
  vec3 b=floor(x-.5); float h=0.; inside=0.;
  for(int k=0;k<8;k++){
    ivec3 c=ivec3(b)+ivec3(k&1,(k>>1)&1,(k>>2)&1);
    uint hh=hsh(c,s); float pr=float(hh&255u)*(1./255.);
    if(pr>dens) continue;
    vec3 fp=vec3(c)+.25+.5*vec3(float((hh>>8u)&255u),float((hh>>16u)&255u),float(hh>>24u))*(1./255.);
    float rr=mix(rmin,rmax,pr/dens), q=length(x-fp)/rr;
    if(q>2.) continue;
    if(q<1.) h+=(q*q-1.)-hole*exp(-q*q*9.);
    h+=.35*exp(-(q-1.)*(q-1.)*14.);
    inside=max(inside,1.-q);
  }
  return h;
}
float bw(float lam,float sp){ return clamp(lam/max(sp,1e-4)*.5-1.,0.,1.); }
// height above the radius PR (pu) of the unit direction d, carried by a grid of spacing sp (pu);
// ridge: 0..1 how close to the crest of a membrane fold; crat: 0..1 inside a pit
float terrainH(vec3 d,float sp,out float ridge,out float crat){
  vec3 p=d*PR; float h=0.,w; ridge=0.; crat=0.;
  w=bw(260.,sp); if(w>0.) h+=9.*w*vn(p*(1./260.),S(0));
  w=bw(120.,sp); if(w>0.) h+=4.5*w*vn(p*(1./120.),S(1));
  w=bw(46.,sp);
  if(w>0.){
    // the wavy membrane folds: ridged noise on a warped domain
    vec3 q=p+20.*vec3(vn(p*(1./95.),S(2)),vn(p*(1./95.),S(3)),vn(p*(1./95.),S(4)));
    float r1=1.-abs(vn(q*(1./46.),S(5))); r1*=r1; h+=6.*w*(r1-.45); ridge=r1*w;
    float w2=bw(19.,sp);
    if(w2>0.){ float r2=1.-abs(vn(q*(1./19.),S(6))); r2*=r2; h+=2.*w2*(r2-.45); ridge=max(ridge,r2*w2*.8); }
    // and the small folds a walker climbs over (a few player heights apart)
    float w3=bw(7.,sp);
    if(w3>0.){ float r3=1.-abs(vn(q*(1./7.),S(13))); r3*=r3; h+=.9*w3*(r3-.45); ridge=max(ridge,r3*w3*.75); }
  }
  float ci;
  w=bw(30.,sp); if(w>0.){ h+=5.*w*craters(p*(1./85.),S(7),.22,.17,.3,.6,ci); crat=ci*w; }
  w=bw(8.,sp);  if(w>0.) h+=.8*w*vn(p*(1./8.),S(8));
  w=bw(3.4,sp); if(w>0.) h+=.42*w*vn(p*(1./3.4),S(9));
  w=bw(2.,sp);  if(w>0.){ h+=.5*w*craters(p*(1./8.),S(10),.3,.08,.16,.3,ci); crat=max(crat,ci*w*.6); }
  w=bw(1.5,sp); if(w>0.) h+=.17*w*vn(p*(1./1.5),S(11));
  w=bw(.7,sp);  if(w>0.) h+=.05*w*vn(p*(1./.7),S(12));
  return h;
}
`;function lt(p){const z=Math.imul(p,747796405)+2891336453>>>0,M=Math.imul(z>>>(z>>>28)+4^z,277803737)>>>0;return(M>>>22^M)>>>0}function st(p,z,M,c){return lt(lt(lt(M+c>>>0)+z>>>0)+p>>>0)}const X=(p,z,M,c)=>(st(p,z,M,c)>>>8)/8388608-1,J=p=>p*p*p*(p*(p*6-15)+10),b=(p,z,M)=>p+(z-p)*M;function y(p,z,M,c){const C=Math.floor(p),U=Math.floor(z),O=Math.floor(M),A=J(p-C),L=J(z-U),$=J(M-O);return b(b(b(X(C,U,O,c),X(C+1,U,O,c),A),b(X(C,U+1,O,c),X(C+1,U+1,O,c),A),L),b(b(X(C,U,O+1,c),X(C+1,U,O+1,c),A),b(X(C,U+1,O+1,c),X(C+1,U+1,O+1,c),A),L),$)}const I={inside:0};function D(p,z,M,c,C,U,O,A){const L=Math.floor(p-.5),$=Math.floor(z-.5),H=Math.floor(M-.5);let Q=0;I.inside=0;for(let F=0;F<8;F++){const W=L+(F&1),et=$+(F>>1&1),G=H+(F>>2&1),e=st(W,et,G,c),o=(e&255)/255;if(o>C)continue;const n=W+.25+.5*(e>>>8&255)/255,u=et+.25+.5*(e>>>16&255)/255,w=G+.25+.5*(e>>>24)/255,E=U+(O-U)*(o/C),_=Math.hypot(p-n,z-u,M-w)/E;_>2||(_<1&&(Q+=_*_-1-A*Math.exp(-_*_*9)),Q+=.35*Math.exp(-(_-1)*(_-1)*14),I.inside=Math.max(I.inside,1-_))}return Q}function R(p){const z=A=>p+Math.imul(A,2654435769)>>>0,M=[...Array(14)].map((A,L)=>z(L)),c={ridge:0,crat:0};function C(A,L,$){const H=A*1e3,Q=L*1e3,F=$*1e3;let W=9*y(H/260,Q/260,F/260,M[0])+4.5*y(H/120,Q/120,F/120,M[1]);const et=H+20*y(H/95,Q/95,F/95,M[2]),G=Q+20*y(H/95,Q/95,F/95,M[3]),e=F+20*y(H/95,Q/95,F/95,M[4]);let o=1-Math.abs(y(et/46,G/46,e/46,M[5]));o*=o,W+=6*(o-.45);let n=1-Math.abs(y(et/19,G/19,e/19,M[6]));n*=n,W+=2*(n-.45);let u=1-Math.abs(y(et/7,G/7,e/7,M[13]));return u*=u,W+=.9*(u-.45),c.ridge=Math.max(o,n*.8,u*.75),W+=5*D(H/85,Q/85,F/85,M[7],.22,.17,.3,.6),c.crat=I.inside,W+=.8*y(H/8,Q/8,F/8,M[8]),W+=.42*y(H/3.4,Q/3.4,F/3.4,M[9]),W+=.5*D(H/8,Q/8,F/8,M[10],.3,.08,.16,.3),c.crat=Math.max(c.crat,I.inside*.6),W+=.17*y(H/1.5,Q/1.5,F/1.5,M[11]),W+=.05*y(H/.7,Q/.7,F/.7,M[12]),W}function U(A){const L=Math.hypot(A[0],A[1],A[2]);return C(A[0]/L,A[1]/L,A[2]/L)}function O(A,L=1){const $=Math.abs(A[0])<.9?[1,0,0]:[0,1,0];let H=[A[1]*$[2]-A[2]*$[1],A[2]*$[0]-A[0]*$[2],A[0]*$[1]-A[1]*$[0]];const Q=Math.hypot(...H);H=H.map(o=>o/Q);const F=[A[1]*H[2]-A[2]*H[1],A[2]*H[0]-A[0]*H[2],A[0]*H[1]-A[1]*H[0]],W=L/1e3,et=C(...A),G=(U([A[0]+H[0]*W,A[1]+H[1]*W,A[2]+H[2]*W])-et)/L,e=(U([A[0]+F[0]*W,A[1]+F[1]*W,A[2]+F[2]*W])-et)/L;return Math.hypot(G,e)}return{height:C,heightAt:U,slope:O,out:c}}return{PR:1e3,TERRAIN_GLSL:mt,hsh:st,makeTerrain:R}})(),de=await(async()=>{const{PR:Z,hsh:mt}=Xt,{G:lt}=zt,st=()=>new r.Vector3,X={uSunP:{value:new r.Vector3(0,1,0)},uCamPu:{value:st()},uCamL:{value:st()},uInvh:{value:1},uHp:{value:1},uPTime:{value:0},uPxK:{value:1},uAtmK:{value:1/90},uAtmHs:{value:26},uAtmTop:{value:110},uAtmU:{value:0},uTint:{value:new r.Vector3(1,1,1)},uCellCol:{value:new r.Vector3(1,.7,.7)},uU0:{value:new r.Vector3(0,1,0)},uWc:{value:st()},uDK:{value:1},uPLogC:{value:1},uPShMat:lt.uShadowMat,uPShMap:lt.uShadowMap,uPFocus:{value:4},uPDofK:{value:0}},J=`
#ifndef PR
#define PR ${Z.toFixed(1)}
#endif
uniform vec3 uSunP,uCamPu,uCamL,uTint,uCellCol,uU0,uWc; uniform float uInvh,uHp,uPTime,uPxK,uAtmK,uAtmHs,uAtmTop,uAtmU,uDK,uPLogC,uPFocus,uPDofK;
uniform mat4 uPShMat; uniform highp sampler2DShadow uPShMap;
vec3 inscCol(float su){ return mix(vec3(.12,.04,.06),vec3(1.04,.64,.70)*uTint,smoothstep(-.3,.25,su)); }
vec4 atmos(vec3 a,vec3 b,int n){
  if(uAtmU<=0.) return vec4(0.,0.,0.,1.);
  vec3 ab=b-a; float L=length(ab); vec3 rd=ab/max(L,1e-6);
  float top=PR+uAtmTop, bq=dot(a,rd), c=dot(a,a)-top*top, disc=bq*bq-c;
  if(disc<=0.) return vec4(0.,0.,0.,1.);
  float sq=sqrt(disc), t0=max(0.,-bq-sq), t1=min(L,-bq+sq);
  if(t1<=t0) return vec4(0.,0.,0.,1.);
  float mu=dot(rd,uSunP), ph=.75+.25*mu*mu+.8*pow(max(mu,0.),8.);
  float ds=(t1-t0)/float(n), tau=0., K=uAtmK*uAtmU; vec3 acc=vec3(0.);
  for(int i=0;i<10;i++){ if(i>=n) break;
    vec3 p=a+rd*(t0+(float(i)+.5)*ds); float r=length(p);
    float dt=exp(-max(r-PR,-25.)/uAtmHs)*K*ds;
    acc+=exp(-tau)*(1.-exp(-dt))*inscCol(dot(p,uSunP)/r); tau+=dt; }
  return vec4(acc*ph,exp(-tau));
}
float dayAt(vec3 p){ return smoothstep(-.14,.22,dot(normalize(p),uSunP)); }
// the body scene's logarithmic depth, in its local units (uDK converts from this tier's)
float logDepth(float w){ return log2(1.+max(w,0.)*uDK)*uPLogC*.5; }
// the body scene's depth-of-field amount (alpha), same formula, distances in player heights
float dofA(float d){ return smoothstep(1.3,3.2,log(max(d,1e-6)/uPFocus)*.4343)*uPDofK; }
// the body's shadow where this cell is (the whole planet is far smaller than one shadow-map texel)
float cellShadow(){ vec3 s=(uPShMat*vec4(uWc,1.)).xyz*.5+.5; if(s.x<0.||s.y<0.||s.x>1.||s.y>1.||s.z>1.) return 1.; return texture(uPShMap,vec3(s.xy,s.z-.0012)); }
// what lies beyond everything: the body scene's pale sky above, the deep red abyss under the cell layer
vec3 bgSky(vec3 rd){
  vec3 sky=mix(vec3(.80,.85,.95),vec3(1.05,.96,.84),pow(max(dot(rd,uSunP),0.),2.));
  float e=dot(rd,uU0);
  // just under the skin's horizon the far, hazy skin; deep below, the abyss (from inside a cell world's
  // atmosphere a deeper flesh tone rather than near black)
  vec3 far=mix(sky,uCellCol*vec3(.86,.62,.62),.55);
  vec3 deep=uCellCol*vec3(.3,.05,.06);
  vec3 bg=mix(mix(far,deep,smoothstep(-.3,-.8,e)),sky,smoothstep(-.06,.06,e));
  // shrunk down to a cell world, the gaps under the cell layer (below the skin's horizon) read as deep
  // flesh-red space: a faint warm glow towards the light, darker away from it. Above the layer the sky stays.
  float mu=clamp(dot(rd,uSunP),-1.,1.), m2=max(mu,0.)*max(mu,0.);   // no pow(0,y): NaN on some Intel D3D drivers
  vec3 space=uCellCol*vec3(.24,.04,.055)*(.75+.35*mu+.6*m2*m2*m2);
  return mix(bg,space,smoothstep(.1,.85,uAtmU)*(1.-smoothstep(-.1,.03,e)));
}
// the body scene's skin lighting (materials.js, SURF 0), dimmed on the planet's night side
vec3 cellLight(vec3 alb,vec3 N,vec3 V,float sh,float day){
  float ndl=dot(N,uSunP), lit=smoothstep(-.12,.28,ndl)*sh;
  vec3 amb=mix(vec3(.50,.43,.42),vec3(.56,.60,.72),N.y*.5+.5)*(.35+.65*day);
  vec3 col=alb*(amb*.86*mix(vec3(1.,.78,.80),vec3(1.),lit)+vec3(.60,.55,.47)*lit);
  col+=alb*vec3(.5,.12,.08)*exp(-pow((ndl-.06)*5.,2.))*.22*sh;
  col+=vec3(1.,.86,.8)*.28*pow(max(1.-max(dot(N,V),0.),0.),3.5)*(.3+.7*lit);
  return col;
}
`;function b({sway:l=!1,bubble:t=!1}={}){const a={...X,uO:{value:st()},uOP:{value:st()},uFadeD:{value:1e9},uK:{value:1}};return new r.ShaderMaterial({uniforms:a,defines:{...l?{SWAY:1}:{},...t?{BUBBLE:1}:{}},transparent:t,depthWrite:!t,vertexShader:`
${J}
attribute vec3 iPos,iUp,iF; attribute vec4 iP,iC; attribute vec3 color; attribute float aEm;
uniform vec3 uO,uOP; uniform float uFadeD;
varying vec3 vN,vL,vPu,vCol,vUp; varying float vEm,vDay,vW; varying vec4 vFog;
void main(){
  vec3 up=normalize(iUp), bz=normalize(iF-up*dot(iF,up)+vec3(1e-5,0.,0.)), bx=cross(up,bz);
  float k=1.-smoothstep(.75*uFadeD,uFadeD,length(iPos+uOP));   // shrink away at the edge of the scatter range
  vec3 s=vec3(iP.y,iP.x,iP.y)*k, lp=position*s;
#ifdef SWAY
  lp.x+=sin(uPTime*1.1+iP.z*6.283)*.05*position.y*position.y*s.y;
#endif
  vec3 wp=iPos+bx*lp.x+up*lp.y+bz*lp.z;
  vN=normalize(bx*normal.x/max(s.x,1e-6)+up*normal.y/max(s.y,1e-6)+bz*normal.z/max(s.z,1e-6));
  vPu=uO+wp; vL=(wp+uOP)*uInvh; vUp=up;
  vCol=aEm<.5?color*iC.rgb:color; vEm=aEm;
  vFog=atmos(uCamPu,vPu,4); vDay=dayAt(vPu);
  gl_Position=projectionMatrix*viewMatrix*vec4(vL,1.); vW=gl_Position.w;
}`,fragmentShader:`
${J}
uniform float uK;
varying vec3 vN,vL,vPu,vCol,vUp; varying float vEm,vDay,vW; varying vec4 vFog;
void main(){
  if(uK<1.){ float n=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715)))); if(n>uK) discard; }
  vec3 N=normalize(vN), V=normalize(uCamL-vL), Hh=normalize(uSunP+V);
  float ndv=max(dot(N,V),0.), fr=pow(1.-ndv,3.), sh=cellShadow()*vDay;
#ifdef BUBBLE
  // a vesicle: clear in the middle, its membrane bright where seen edge-on, a wet highlight on top
  vec3 col=cellLight(vCol,N,V,sh,vDay)*.7+vCol*vec3(.6,.24,.2)*pow(max(dot(-V,uSunP),0.),4.)*.6*sh;
  col+=vec3(1.,.92,.92)*fr*(.35+.5*sh)+vec3(1.)*pow(max(dot(N,Hh),0.),120.)*1.4*sh;
  float a=.14+.66*fr;
  col=col*vFog.a+vFog.rgb*a;
  gl_FragColor=vec4(col,a);
#else
  vec3 col=cellLight(vCol,N,V,sh,vDay);
  col+=vCol*vec3(.6,.24,.2)*pow(max(dot(-V,uSunP),0.),3.)*.45*sh;   // light through the tissue
  col+=vec3(1.,.97,.94)*.22*pow(max(dot(N,Hh),0.),50.)*sh;
  if(vEm>.5&&vEm<1.5) col=vCol*(1.3+1.4*(1.-vDay));                  // windows and lamps, brighter at night
  if(vEm>1.5&&vEm<2.5) col=vec3(.04,.025,.04)+vec3(1.)*smoothstep(.93,.98,dot(N,normalize(V+vUp*.5)));
  col=col*vFog.a+vFog.rgb;
  gl_FragColor=vec4(col,dofA(length(uCamL-vL)));
#endif
  gl_FragDepth=logDepth(vW);
}`})}function y(l,t,a,P){const g=new r.InstancedBufferGeometry;for(const m of["position","normal","color","aEm"])g.setAttribute(m,l.getAttribute(m));g.setIndex(l.getIndex());const h={};for(const[m,K]of[["iPos",3],["iUp",3],["iF",3],["iP",4],["iC",4]])h[m]=new r.InstancedBufferAttribute(new Float32Array(t*K),K),h[m].setUsage(r.DynamicDrawUsage),g.setAttribute(m,h[m]);g.instanceCount=0;const B=new r.Mesh(g,a);return B.frustumCulled=!1,B.matrixAutoUpdate=!1,P.add(B),{mesh:B,geo:g,at:h,cap:t,n:0}}function I(l,t,a,P,g,h,B){const m=l.at;m.iPos.array.set(a,t*3),m.iUp.array.set(P,t*3),m.iF.array.set(g,t*3),m.iP.array.set(h,t*4),m.iC.array.set(B,t*4)}function D(l,t){l.geo.instanceCount=t,l.n=t;for(const a in l.at)l.at[a].needsUpdate=!0}function R(l){const t=[],a=[],P=[],g=[],h=[];for(const[m,K,x,q]of l){const T=(m.index,m);T.applyMatrix4(q);const S=T.getAttribute("position"),N=T.getAttribute("normal"),tt=t.length/3;for(let V=0;V<S.count;V++)t.push(S.getX(V),S.getY(V),S.getZ(V)),a.push(N.getX(V),N.getY(V),N.getZ(V)),P.push(...K),g.push(x);const j=T.getIndex();if(j)for(let V=0;V<j.count;V++)h.push(tt+j.getX(V));else for(let V=0;V<S.count;V++)h.push(tt+V)}const B=new r.BufferGeometry;return B.setAttribute("position",new r.Float32BufferAttribute(t,3)),B.setAttribute("normal",new r.Float32BufferAttribute(a,3)),B.setAttribute("color",new r.Float32BufferAttribute(P,3)),B.setAttribute("aEm",new r.Float32BufferAttribute(g,1)),B.setIndex(h),B}const p=(l=0,t=0,a=0,P=1,g=1,h=1,B=0,m=0)=>new r.Matrix4().compose(new r.Vector3(l,t,a),new r.Quaternion().setFromEuler(new r.Euler(B,0,m)),new r.Vector3(P,g,h)),z=(l=16,t=12)=>new r.SphereGeometry(1,l,t),M=[1,.78,.42],c=[1,.62,.8],C=[.26,.08,.15],U=[1,1,1];function O(){const l=[[0,-.2],[.17,-.12],[.12,.05],[.085,.3],[.068,.6],[.075,.72],[.15,.8],[.225,.9],[.235,1],[.19,1.09],[.1,1.14],[.001,1.16]].map(([h,B])=>new r.Vector2(h,B)),t=new r.LatheGeometry(l,9);t.deleteAttribute("uv"),t.computeVertexNormals();const a=t.getAttribute("position"),P=[],g=[];for(let h=0;h<a.count;h++){const B=Math.min(1,Math.max(0,(a.getY(h)-.68)/.3));P.push(1,.84+.16*B,.86+.12*B),g.push(0)}return t.setAttribute("color",new r.Float32BufferAttribute(P,3)),t.setAttribute("aEm",new r.Float32BufferAttribute(g,1)),t}function A(){return R([[z(18,12),U,0,p()]])}function L(){return R([[new r.SphereGeometry(1,22,10,0,Math.PI*2,0,Math.PI/2),U,0,p(0,0,0,1,.8,1)],[new r.TorusGeometry(.97,.075,6,30),[.9,.86,.86],0,p(0,.03,0,1,1,1,Math.PI/2)],[z(12,8),C,3,p(0,.17,.95,.22,.3,.08)],[z(10,8),M,1,p(.62,.42,.5,.1,.1,.1)],[z(10,8),M,1,p(-.62,.42,.5,.1,.1,.1)],[z(10,8),M,1,p(0,.5,-.66,.1,.1,.1)],[new r.CylinderGeometry(.03,.045,.4,6),[.85,.75,.8],0,p(.28,.86,0,1,1,1)],[z(10,8),c,1,p(.28,1.1,0,.08,.08,.08)]])}function $(){return R([[z(20,14),U,0,p(0,.42,0,.6,.5,.6)],[z(18,12),U,0,p(0,.95,0,.44,.38,.44)],[z(14,10),U,0,p(0,1.36,0,.29,.26,.29)],[z(12,8),C,3,p(0,.2,.56,.17,.24,.07)],[z(10,8),M,1,p(0,1,.4,.08,.08,.08)],[z(10,8),M,1,p(.37,.95,-.16,.08,.08,.08)],[z(10,8),M,1,p(-.5,.5,.2,.08,.08,.08)],[new r.CylinderGeometry(.02,.03,.3,6),[.85,.75,.8],0,p(0,1.7,0)],[z(10,8),c,1,p(0,1.88,0,.07,.07,.07)]])}function H(){return R([[z(14,8),U,0,p(0,0,0,.35,.12,.35)],[new r.CylinderGeometry(.04,.07,1.5,7),U,0,p(0,.75,0)],[z(14,10),c,1,p(0,1.6,0,.2,.2,.2)]])}function Q(){return R([[z(16,12),U,0,p(0,.5,0,.42,.5,.42)],[z(8,6),U,2,p(.14,.62,.36,.075,.09,.05)],[z(8,6),U,2,p(-.14,.62,.36,.075,.09,.05)],[z(8,6),[1,.5,.6],3,p(.25,.5,.3,.06,.04,.03)],[z(8,6),[1,.5,.6],3,p(-.25,.5,.3,.06,.04,.03)],[new r.CylinderGeometry(.015,.02,.24,5),[.9,.85,.85],0,p(0,1.1,0)],[z(8,6),c,1,p(0,1.24,0,.065,.065,.065)],[z(8,6),[.45,.25,.32],3,p(.16,.05,.06,.13,.07,.17)],[z(8,6),[.45,.25,.32],3,p(-.16,.05,.06,.13,.07,.17)]])}const F=l=>Math.hypot(l[0],l[1],l[2]),W=l=>{const t=F(l)||1;return[l[0]/t,l[1]/t,l[2]/t]},et=(l,t)=>[l[1]*t[2]-l[2]*t[1],l[2]*t[0]-l[0]*t[2],l[0]*t[1]-l[1]*t[0]],G=(l,t)=>l[0]*t[0]+l[1]*t[1]+l[2]*t[2];function e(l){const t=Math.abs(l[0])<.9?[1,0,0]:[0,1,0],a=W(et(l,t));return[a,et(l,a)]}const o=(l,t,a,P,g)=>W([l[0]*Z+t[0]*P+a[0]*g,l[1]*Z+t[1]*P+a[1]*g,l[2]*Z+t[2]*P+a[2]*g]);function n(l){return()=>{l=l+1831565813>>>0;let t=Math.imul(l^l>>>15,1|l);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}const u=26,w=300,E=[[1,.6,.62],[1,.7,.64],[.98,.52,.58],[1,.8,.74],[.95,.62,.72]];class _{constructor(t,a,P){this.villi=y(O(),P?2600:4200,b({sway:!0}),t),this.bubbles=y(A(),500,b({bubble:!0}),a),this.bubbles.mesh.renderOrder=10;for(const g of[this.villi,this.bubbles])g.mesh.material.uniforms.uFadeD.value=w;this.cache=new Map,this.O=null}reset(t,a){this.terr=t,this.seed=(a^1540483477)>>>0,this.cache.clear(),this.O=null,this.pending=!1}_cell(t,a,P){const g=t+","+a+","+P;let h=this.cache.get(g);if(h)return h;h={v:[],b:[]},this.cache.set(g,h);const B=mt(t,a,P,this.seed),m=n(B),K=[(t+m())*u,(a+m())*u,(P+m())*u],x=F(K);if(x<Z-u/2||x>=Z+u/2)return h;const q=m(),T=W(K),[S,N]=e(T),tt=this.terr;if(q<.3){const j=8+Math.floor(m()*20),V=2.5+m()*6,rt=1.4+m()*3,ut=E[Math.floor(m()*E.length)];for(let at=0;at<j;at++){const dt=m()*Math.PI*2,ot=Math.sqrt(m())*V,nt=Math.cos(dt)*ot,ht=Math.sin(dt)*ot,pt=o(T,S,N,nt,ht),wt=tt.height(...pt),xt=rt*(1-.6*ot/V)*(.6+.5*m()),Y=.18+.12*m(),it=ot>.01?[(S[0]*nt+N[0]*ht)/ot,(S[1]*nt+N[1]*ht)/ot,(S[2]*nt+N[2]*ht)/ot]:S,vt=W([pt[0]+it[0]*Y*ot/V,pt[1]+it[1]*Y*ot/V,pt[2]+it[2]*Y*ot/V]),ft=.85+.25*m();h.v.push([pt[0]*(Z+wt-.1),pt[1]*(Z+wt-.1),pt[2]*(Z+wt-.1)],vt,S,[xt,xt*(.22+.1*m())+.25,m(),0],[ut[0]*ft,ut[1]*ft,ut[2]*ft,1])}}else if(q<.45){const j=1+Math.floor(m()*4);for(let V=0;V<j;V++){const rt=m()*Math.PI*2,ut=m()*6,at=o(T,S,N,Math.cos(rt)*ut,Math.sin(rt)*ut),dt=1+m()*m()*4.5,ot=tt.height(...at)+dt*(.15+.3*m());h.b.push([at[0]*(Z+ot),at[1]*(Z+ot),at[2]*(Z+ot)],at,S,[dt,dt,0,0],[1,.8+.1*m(),.84,1])}}return h}update(t,a){const P=Math.min(1,Math.max(0,(14-a)/4));if(this.villi.mesh.visible=this.bubbles.mesh.visible=P>0,P<=0)return;(!this.O||this.pending||Math.hypot(t[0]-this.O[0],t[1]-this.O[1],t[2]-this.O[2])>18)&&this._rebuild(t);const g=this.O;for(const h of[this.villi,this.bubbles]){const B=h.mesh.material.uniforms;B.uO.value.set(g[0],g[1],g[2]),B.uOP.value.set(g[0]-t[0],g[1]-t[1],g[2]-t[2]),B.uK.value=P}}_rebuild(t){this.O=t.slice(),this.pending=!1;let a=40,P=0,g=0;const h=t.map(m=>Math.floor((m-w)/u)),B=t.map(m=>Math.floor((m+w)/u));for(let m=h[0];m<=B[0];m++)for(let K=h[1];K<=B[1];K++)for(let x=h[2];x<=B[2];x++){const q=(m+.5)*u,T=(K+.5)*u,S=(x+.5)*u,N=Math.hypot(q,T,S);if(Math.abs(N-Z)>u*1.4||Math.hypot(q-t[0],T-t[1],S-t[2])>w+u)continue;const tt=m+","+K+","+x;if(!this.cache.has(tt)&&a--<=0){this.pending=!0;continue}const j=this._cell(m,K,x);for(let V=0;V<j.v.length&&P<this.villi.cap;V+=5){const rt=j.v[V];I(this.villi,P++,[rt[0]-t[0],rt[1]-t[1],rt[2]-t[2]],j.v[V+1],j.v[V+2],j.v[V+3],j.v[V+4])}for(let V=0;V<j.b.length&&g<this.bubbles.cap;V+=5){const rt=j.b[V];I(this.bubbles,g++,[rt[0]-t[0],rt[1]-t[1],rt[2]-t[2]],j.b[V+1],j.b[V+2],j.b[V+3],j.b[V+4])}}if(D(this.villi,P),D(this.bubbles,g),this.cache.size>6e3)for(const m of this.cache.keys()){const[K,x,q]=m.split(",").map(Number);Math.hypot((K+.5)*u-t[0],(x+.5)*u-t[1],(q+.5)*u-t[2])>2.5*w&&this.cache.delete(m)}}}const v=[[1,.93,.88],[.92,.84,1],[1,.84,.74],[.86,1,.93],[1,.97,.8],[1,.82,.88]],i=[[1,.66,.74],[1,.8,.6],[.8,.72,1],[.66,.95,.82],[1,.92,.56],[.62,.82,1]],d=["哇！你好，巨人旅行者！","欢迎来到我们的小村庄！","你好！小心囊泡，它们会弹跳。","你好呀！今天细胞膜上的天气真好。","欢迎你，来自细胞外的访客！","嘿！你见过细胞核吗？我们还没见过呢。","你好你好！你是从天上来的！","祝你平安，ATP 能量满满！","哇，有客人来了！这里很少有人来呢。","你好！请别踩到绒毛。"],k=["你好！","你好呀！","嗨！","祝你今天愉快！","你好！"],s=l=>l[Math.floor(Math.random()*l.length)];class f{constructor(t){this.kinds=[L(),$(),H()].map(P=>y(P,120,b(),t)),this.folkI=y(Q(),90,b(),t),this.list=[],this.t=0,this.ui=document.createElement("div"),this.ui.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:3;font-family:"Segoe UI",system-ui,sans-serif',document.body.appendChild(this.ui);const a=document.createElement("style");a.textContent=`.pbub{position:absolute;transform:translate(-50%,-100%);background:rgba(255,250,252,.93);color:#5a3048;font-size:13px;padding:6px 11px;border-radius:12px;white-space:nowrap;box-shadow:0 2px 10px rgba(80,20,50,.25);transition:opacity .35s}
.pbub:after{content:"";position:absolute;left:50%;bottom:-6px;margin-left:-6px;border:6px solid transparent;border-bottom:0;border-top-color:rgba(255,250,252,.93)}
.pbub.me{background:rgba(255,226,210,.95)}
#ptalk{position:fixed;left:50%;bottom:16%;transform:translateX(-50%);font-size:14px;padding:6px 14px;border-radius:14px;background:rgba(40,28,44,.42);backdrop-filter:blur(6px);color:#fff;opacity:0;transition:opacity .25s;pointer-events:none}
#ptalk b{color:#ffe3d2}`,document.head.appendChild(a),this.prompt=document.createElement("div"),this.prompt.id="ptalk",this.prompt.innerHTML="<b>T</b> &nbsp;打招呼",document.body.appendChild(this.prompt),this.bubbles=[]}reset(t){this.terr=t,this.list=[],this.t=0,this.first=!0,this.clearUI();for(const a of[...this.kinds,this.folkI])D(a,0)}clearUI(){for(const t of this.bubbles)t.el.remove();this.bubbles=[],this.prompt.style.opacity=0}setVisible(t){for(const a of[...this.kinds,this.folkI])a.mesh.visible=t;this.ui.style.display=t?"":"none",t||(this.prompt.style.opacity=0)}_site(t){const a=this.terr;return a.height(...t),a.out.crat<=0&&a.slope(t,3)<.35}_spawn(t,a,P){const g=W(t),[h,B]=e(g);for(let m=0;m<8;m++){let K,x;if(P){const T=(Math.random()-.5)*.9,S=22+Math.random()*16,N=W([a[0]-g[0]*G(a,g),a[1]-g[1]*G(a,g),a[2]-g[2]*G(a,g)]),tt=et(g,N);K=0,x=0;const j=(N[0]*Math.cos(T)+tt[0]*Math.sin(T))*S,V=(N[1]*Math.cos(T)+tt[1]*Math.sin(T))*S,rt=(N[2]*Math.cos(T)+tt[2]*Math.sin(T))*S;K=G([j,V,rt],h),x=G([j,V,rt],B)}else{const T=Math.random()*Math.PI*2,S=140+Math.random()*240;K=Math.cos(T)*S,x=Math.sin(T)*S}const q=o(g,h,B,K,x);if(!this.list.some(T=>F([T.c[0]-q[0],T.c[1]-q[1],T.c[2]-q[2]])*Z<70)&&this._site(q))return this.list.push(this._village(q)),!0}return!1}_village(t){const[a,P]=e(t),g=this.terr,h=[],B=[];h.push({d:t,kind:2,s:.75,col:[1,1,1],f:a});const m=3+Math.floor(Math.random()*6),K=[[0,0]];for(let q=0,T=0;q<m&&T<40;T++){const S=Math.random()*Math.PI*2,N=3.5+Math.random()*7,tt=Math.cos(S)*N,j=Math.sin(S)*N;if(K.some(([at,dt])=>Math.hypot(at-tt,dt-j)<3))continue;const V=o(t,a,P,tt,j);if(g.slope(V,1.5)>.6)continue;K.push([tt,j]),q++;const rt=Math.random()<.68?0:1,ut=W([t[0]-V[0],t[1]-V[1],t[2]-V[2]]);h.push({d:V,kind:rt,s:rt===0?1.05+Math.random()*.55:.9+Math.random()*.35,col:s(v),f:ut})}const x=3+Math.floor(Math.random()*5);for(let q=0;q<x;q++){const T=Math.random()*Math.PI*2,S=1+Math.random()*5;B.push({d:o(t,a,P,Math.cos(T)*S,Math.sin(T)*S),f:a,tgt:null,wait:Math.random()*3,phase:Math.random()*6,col:s(i),size:.32+Math.random()*.12,greet:0,hop:0,look:0,line:null})}for(const q of h)q.gh=g.height(...q.d);return{c:t,t1:a,t2:P,houses:h,folk:B}}update(t,a,P,g,h,B){const m=Math.min(1,Math.max(0,(3.5-P)/1));for(const N of[...this.kinds,this.folkI]){const tt=N.mesh.material.uniforms;tt.uO.value.set(a[0],a[1],a[2]),tt.uOP.value.set(0,0,0),tt.uK.value=m}if(this.setVisible(m>0),m<=0)return;this.t-=t,this.t<=0&&(this.t=1.5,this.list=this.list.filter(N=>F([N.c[0]*Z-a[0],N.c[1]*Z-a[1],N.c[2]*Z-a[2]])<480),this.first&&(this.first=!1,this._spawn(a,g,!0)),this.list.length<6&&this._spawn(a,g,!1));const K=this.terr,x=[0,0,0,0];let q=null,T=3.2*P+.6;for(const N of this.list){const tt=F([N.c[0]*Z-a[0],N.c[1]*Z-a[1],N.c[2]*Z-a[2]])<220;for(const j of N.houses){const V=this.kinds[j.kind];if(x[j.kind]>=V.cap)continue;const rt=Z+j.gh-.12;I(V,x[j.kind]++,[j.d[0]*rt-a[0],j.d[1]*rt-a[1],j.d[2]*rt-a[2]],j.d,j.f,[j.s,j.s,0,0],[...j.col,1])}for(const j of N.folk){tt&&this._walk(j,N,t,a,P);const V=Z+(j.gh??(j.gh=K.height(...j.d)))+j.hop,rt=[j.d[0]*V-a[0],j.d[1]*V-a[1],j.d[2]*V-a[2]],ut=1+.07*Math.sin(j.phase*2)*(j.moving?1:.3)-(j.hop>0?-.1:0);x[3]<this.folkI.cap&&I(this.folkI,x[3]++,rt,j.d,j.f,[j.size*ut,j.size/Math.sqrt(ut),0,0],[...j.col,1]);const at=F(rt);at<T&&(T=at,q=j),j.rel=rt}}for(let N=0;N<3;N++)D(this.kinds[N],x[N]);D(this.folkI,x[3]);const S=!!q&&P<2;this.prompt.style.opacity=S&&!(q.greet>0)?1:0,S&&h&&(q.greet=3.4,q.hopV=2.2*q.size,this._say(q,s(d),!1,3.4),this._say(null,s(k),!0,2.2)),this._bubbles(t,B,P)}_walk(t,a,P,g,h){const B=this.terr,m=W(g);t.phase+=P*6;const K=[m[0]-t.d[0],m[1]-t.d[1],m[2]-t.d[2]],x=F(K)*Z;if(t.moving=!1,t.greet>0||x<6*h)t.greet=Math.max(0,t.greet-P),t.f=W([K[0]+t.f[0]*1e-6,K[1]+t.f[1]*1e-6,K[2]+t.f[2]*1e-6]);else if(t.wait>0)t.wait-=P;else{if(!t.tgt){const S=Math.random()*Math.PI*2,N=Math.random()*9;t.tgt=o(a.c,a.t1,a.t2,Math.cos(S)*N,Math.sin(S)*N)}const q=[t.tgt[0]-t.d[0],t.tgt[1]-t.d[1],t.tgt[2]-t.d[2]],T=F(q)*Z;if(T<.3)t.tgt=null,t.wait=1+Math.random()*5;else{const S=Math.min(T,.42*P);t.f=W(q),t.d=W([t.d[0]*Z+t.f[0]*S,t.d[1]*Z+t.f[1]*S,t.d[2]*Z+t.f[2]*S]),t.gh=B.height(...t.d),t.moving=!0}}t.hopV!==void 0&&(t.hop>0||t.hopV>0)?(t.hop+=t.hopV*P,t.hopV-=9*t.size*P,t.hop<=0&&(t.hop=0,t.hopV=t.greet>.6?2.2*t.size:0)):t.hop=t.moving?Math.abs(Math.sin(t.phase))*.05*t.size:0}_say(t,a,P,g){for(const B of this.bubbles)B.F===t&&B.me===P&&(B.life=0);const h=document.createElement("div");h.className="pbub"+(P?" me":""),h.textContent=a,this.ui.appendChild(h),this.bubbles.push({el:h,F:t,me:P,life:g,max:g})}_bubbles(t,a,P){const g=new r.Vector3,h=window.innerWidth,B=window.innerHeight;this.bubbles=this.bubbles.filter(m=>{if(m.life-=t,m.life<=0)return m.el.remove(),!1;if(m.me){const N=this.meUp||[0,1,0];g.set(N[0]*1.3,N[1]*1.3,N[2]*1.3)}else{const N=m.F.rel,tt=m.F.d,j=1/P,V=m.F.size*1.45;g.set((N[0]+tt[0]*V)*j,(N[1]+tt[1]*V)*j,(N[2]+tt[2]*V)*j)}g.project(a);const K=g.z<1&&Math.abs(g.x)<1.2&&Math.abs(g.y)<1.2;m.el.style.display=K?"":"none";const x=m.el.offsetWidth*.5+8,q=m.el.offsetHeight+8,T=Math.min(h-x,Math.max(x,(g.x*.5+.5)*h)),S=Math.min(B-8,Math.max(q,(-g.y*.5+.5)*B));return m.el.style.left=T.toFixed(1)+"px",m.el.style.top=S.toFixed(1)+"px",m.el.style.opacity=Math.min(1,m.life/.35,(m.max-m.life)/.2+.2),!0})}}return{PU:X,ATMOS_GLSL:J,Scatter:_,Settlements:f}})(),ve=await(async()=>{const{G:Z,BALL_W:mt}=zt,{PlayerView:lt,patchGeometry:st}=Bt,{H_MIN:X}=Yt,{PR:J,TERRAIN_GLSL:b,makeTerrain:y,hsh:I}=Xt,{PU:D,ATMOS_GLSL:R,Scatter:p,Settlements:z}=de,M=.4,c=5e-14,C=1e4,U=(v,i,d)=>{const k=Math.min(1,Math.max(0,(d-v)/(i-v)));return k*k*(3-2*k)},O=(v,i)=>v[0]*i[0]+v[1]*i[1]+v[2]*i[2],A=(v,i)=>[v[1]*i[2]-v[2]*i[1],v[2]*i[0]-v[0]*i[2],v[0]*i[1]-v[1]*i[0]],L=v=>Math.hypot(v[0],v[1],v[2]),$=v=>{const i=L(v)||1;return[v[0]/i,v[1]/i,v[2]/i]},H=(v,i,d)=>[v[0]+i[0]*d,v[1]+i[1]*d,v[2]+i[2]*d],Q=(v,i)=>[v[0]-i[0],v[1]-i[1],v[2]-i[2]],F=(v,i)=>H(v,i,-O(v,i)),W=(v,i,d)=>[v[0]+(i[0]-v[0])*d,v[1]+(i[1]-v[1])*d,v[2]+(i[2]-v[2])*d],et=`
${b}
${R}
uniform vec3 uC,uE1,uE2; uniform float uThMax,uK,uPr,uNR,uNA;
varying vec3 vN,vP,vL; varying float vRidge,vCrat,vHt,vW; varying vec4 vFog;
void main(){
  float s=position.x, ph=position.y, ek=exp(uK)-1., es=exp(uK*s), th=uThMax*(es-1.)/ek;
  float sp=PR*max(uThMax*uK*es/ek/uNR,sin(th)*6.2831853/uNA);   // vertex spacing here (pu)
  vec3 e=uE1*cos(ph)+uE2*sin(ph);
  float st=sin(th), sh=sin(.5*th);
  vec3 dd=e*st-uC*(2.*sh*sh), d=uC+dd;     // d-uC kept apart: exact next to the player
  float rg,cr,r2,c2;
  float h=terrainH(d,sp,rg,cr);
  vec3 t1=e*cos(th)-uC*st, t2=cross(d,t1);
  float eps=max(sp,.004)*.7/PR;
  float h1=terrainH(normalize(d+t1*eps),sp,r2,c2), h2=terrainH(normalize(d+t2*eps),sp,r2,c2);
  vN=normalize(d-(t1*(h1-h)+t2*(h2-h))/(eps*PR));
  vL=(dd*(PR+h)+uC*(h-uPr))*uInvh; vP=d*(PR+h); vRidge=rg; vCrat=cr; vHt=h;
  vFog=atmos(uCamPu,vP,5);
  gl_Position=projectionMatrix*viewMatrix*vec4(vL,1.); vW=gl_Position.w;
}`,G=`
${b}
${R}
uniform vec3 uUpL; uniform float uBlob,uPAlt;
varying vec3 vN,vP,vL; varying float vRidge,vCrat,vHt,vW; varying vec4 vFog;
// nearest round spot of a sparse cellular pattern, as distance / spot radius (and that spot's id)
float spots(vec3 x,uint s,uint dens,float rmin,float rmax,out uint id){
  vec3 b=floor(x-.5); float q=9.; id=0u;
  for(int k=0;k<8;k++){
    ivec3 c=ivec3(b)+ivec3(k&1,(k>>1)&1,(k>>2)&1); uint hh=hsh(c,s);
    if((hh&255u)>dens) continue;
    vec3 fp=vec3(c)+.25+.5*vec3(float((hh>>8u)&255u),float((hh>>16u)&255u),float(hh>>24u))*(1./255.);
    float qq=length(x-fp)/mix(rmin,rmax,float((hh>>8u)&255u)*(1./255.));
    if(qq<q){ q=qq; id=hh; }
  }
  return q;
}
void main(){
  vec3 N=normalize(vN), Vv=uCamL-vL; float dist=length(Vv); vec3 V=Vv/dist, up=normalize(vP);
  float px=dist*uPxK*uHp;   // one pixel, in pu
  // fine relief as normals only, each octave fading out before it would shimmer
  vec3 g=vec3(0.); float lam=1.2;
  for(int i=0;i<3;i++){ float w=clamp(lam/px*.25-1.,0.,1.); if(w>0.) g+=w*.14*vnd(vP/lam,S(20+i)).yzw; lam*=.42; }
  N=normalize(N-(g-up*dot(g,up)));
  uint sid;
  float wp=clamp(.9/px*.25-1.,0.,1.), pit=0., bead=0.;
  if(wp>0.) pit=(1.-smoothstep(.6,1.,spots(vP/.9,S(30),110u,.16,.3,sid)))*wp;
  float crest=smoothstep(.55,.95,vRidge);
  float wb=clamp(.35/px*.25-1.,0.,1.);
  if(wb>0.&&crest>.3) bead=(1.-smoothstep(.55,1.,spots(vP/.35,S(31),255u,.32,.4,sid)))*wb*smoothstep(.3,.8,crest);
  // the cell's own flesh colour (as the ball was drawn), deeper in the hollows and pits, paler and
  // translucent along the crests of the membrane folds
  float hn=vn(vP*(1./180.),S(40));
  vec3 alb=uCellCol*mix(vec3(.74,.42,.54),vec3(1.02,.9,.93),smoothstep(-7.,5.,vHt+hn*4.));
  alb=mix(alb,uCellCol*vec3(1.1,1.05,1.04),crest*.75);
  alb=mix(alb,uCellCol*vec3(.55,.22,.3),smoothstep(.05,.6,vCrat));
  // once fully shrunk the tissue reads in deeper flesh tones (rose hollows, pale pink membrane crests)
  vec3 fl=mix(vec3(.66,.2,.28),vec3(.95,.5,.54),smoothstep(-7.,5.,vHt+hn*4.));
  fl=mix(fl,vec3(1.,.7,.7),crest*.7); fl=mix(fl,vec3(.45,.1,.17),smoothstep(.05,.6,vCrat));
  alb=mix(alb,mix(fl,alb,.2),uAtmU*.9);
  alb=mix(alb,vec3(1.,.92,.88),bead*.7);
  alb*=1.-.4*pit;
  float sh=cellShadow(), day=dayAt(vP);
  vec3 col=cellLight(alb,N,V,sh*day,day);
  col+=alb*vec3(.6,.24,.2)*(pow(max(dot(-V,uSunP),0.),2.)*.8+.25)*crest*sh*day;   // light through thin membrane
  vec3 Hh=normalize(uSunP+V); float ndh=max(dot(N,Hh),0.);
  col+=vec3(1.,.96,.9)*.16*pow(ndh,50.)*sh*day*(1.-.7*pit);
  // tiny wet glints: points, not cells
  if(px<.15){ vec3 gq=vP/.16; vec3 gc=floor(gq); uint gh=hsh(ivec3(gc),S(50));
    if((gh&1023u)<9u){ vec3 gp=gc+.5+.3*(vec3(float((gh>>10u)&255u),float((gh>>18u)&255u),float(gh>>26u)*4.)*(1./255.)-.5);
      col+=vec3(1.,.95,.9)*pow(ndh,4.)*2.2*sh*day*smoothstep(max(px/.16,.06),0.,length(gq-gp))*(1.-px/.15); } }
  col+=vec3(.9,.25,.5)*(crest*.06+bead*.2)*(1.-day);   // faint glow on the night side
  // the player's soft shadow
  float lat=length(vL-uUpL*dot(vL,uUpL));
  col*=1.-uBlob*(1.-smoothstep(.12,.5,lat))*.45*exp(-uPAlt*.4);
  col=col*vFog.a+vFog.rgb;
  if(!(col.r+col.g+col.b<1e5)) col=uCellCol;
  gl_FragColor=vec4(col,dofA(dist));
  gl_FragDepth=logDepth(vW);
}`,e=`
uniform mat4 uInvProj,uCamRot; varying vec3 vRd;
void main(){ gl_Position=vec4(position.xy,.99999,1.); vec4 v=uInvProj*vec4(position.xy,-1.,1.); vRd=mat3(uCamRot)*(v.xyz/v.w); }`,o=`
${b}
${R}
varying vec3 vRd;
#ifdef OVERLAY
uniform float uBodyK;
#endif
void main(){
  vec3 rd=normalize(vRd), ro=uCamPu;
  float bq=dot(ro,rd), c0=dot(ro,ro)-PR*PR, dsc=bq*bq-c0, tP=1e9;
  if(dsc>0.){ float t=-bq-sqrt(dsc); if(t>0.) tP=t; }
  vec3 col=bgSky(rd);
  if(tP<1e9) col=uCellCol*.5*(.2+.8*dayAt(ro+rd*tP));   // own ground (normally covered by the terrain)
  vec3 cl=vec3(0.); float ca=0.;
  if(uAtmU>0.){
    float cR=PR+30., cc2=dot(ro,ro)-cR*cR, cd=bq*bq-cc2;
    if(cd>0.){ float sq=sqrt(cd), tc=cc2<0.?-bq+sq:-bq-sq;
      if(tc>0.&&tc<tP&&tc<1800.){ vec3 p=ro+rd*tc, dn=p/cR;
        float n=vn(dn*30.,S(80))*.55+vn(dn*67.,S(81))*.3;
        if(n>-.05) n+=vn(dn*150.,S(82))*.15;   // the fine octave only where it can still matter
        ca=smoothstep(.1,.5,n)*(1.-smoothstep(700.,1800.,tc))*uAtmU;
        }
      if(ca>.003){ vec3 p=ro+rd*tc, dn=p/cR; float n=ca;
        float su=dot(dn,uSunP), sh=cellShadow();
        cl=mix(vec3(.3,.16,.2),vec3(1.06,.97,.97),smoothstep(-.2,.3,su)*sh)*(.86+.3*n)+vec3(1.,.72,.62)*pow(max(dot(rd,uSunP),0.),5.)*.4*smoothstep(-.1,.3,su);
        vec4 ac=atmos(ro,p,3); cl=cl*ac.a+ac.rgb;
      } } }
  vec4 a=atmos(ro,ro+rd*min(tP,2e4),7);
#ifdef OVERLAY
  // blended over the frozen body scene (dst*a + rgb): its far skin gets this sky's haze and clouds in
  // front, and fades (uBodyK) into the sky behind it, so it can stop being drawn without a pop
  vec3 add=(uBodyK*col*a.a+a.rgb)*(1.-ca)+cl*ca; float keep=(1.-uBodyK)*a.a*(1.-ca);
  if(!(add.r+add.g+add.b<1e5)){ add=vec3(0.); keep=1.; }
  gl_FragColor=vec4(add,keep);
#else
  col=col*a.a+a.rgb;
  col=mix(col,cl,ca);
  if(!(col.r+col.g+col.b<1e5)) col=vec3(.8,.85,.95);
  gl_FragColor=vec4(col,uPDofK);
#endif
}`,n=`
uniform float uPush; varying vec3 vN,vP; varying float vW;
void main(){ vec4 wp=modelMatrix*vec4(position+normal*uPush,1.); vP=wp.xyz; vN=normalize(mat3(modelMatrix)*normal); gl_Position=projectionMatrix*viewMatrix*wp; vW=gl_Position.w; }`,u=`
${R}
uniform vec3 uColor; uniform float uEmit,uFlat,uDayA; varying vec3 vN,vP; varying float vW;
void main(){
  vec3 N=normalize(vN), V=normalize(uCamL-vP);
  float lit=smoothstep(-.02,.12,dot(N,uSunP))*uDayA*mix(.3,1.,cellShadow());
  vec3 col=uColor*(vec3(.46,.46,.55)+vec3(.58,.54,.47)*lit);
  col+=pow(1.-max(dot(N,V),0.),3.)*.35*vec3(1.,.95,.9)+uColor*uEmit;
  col=mix(col,uColor,uFlat);
  gl_FragColor=vec4(col,dofA(length(uCamL-vP))); gl_FragDepth=logDepth(vW);
}`,w=["细胞","肌元","溶酶","核糖","神经","角质","内质","囊泡","原生","高尔基","线粒","真皮","表皮","纤维","中层"],E=["城","谷","镇","湾","原","岛","洲","苑","林","泉","域","港"];class _{constructor(i,d){this.r=i,this.active=!1,this.fadeA=0,this.exitT=0,this.cool=0;const k=this.scene=new r.Scene;this.skyScene=new r.Scene,this.tScene=new r.Scene,this.ballScene=new r.Scene,this.camera=new r.PerspectiveCamera(58,1,.03,1e4),this.oldCam=new r.PerspectiveCamera(58,1,1e-6,C),this.oldCam.matrixAutoUpdate=!1,this.extra=[[this.ballScene,this.oldCam],[this.skyScene,this.camera],[this.tScene,this.camera]];const s=d?150:220,f=d?176:256;this.NR=s,this.tu={uC:{value:new r.Vector3(0,1,0)},uE1:{value:new r.Vector3(1,0,0)},uE2:{value:new r.Vector3(0,0,1)},uThMax:{value:1},uK:{value:5},uPr:{value:0},uNR:{value:s},uNA:{value:f},uSeed:{value:1},uUpL:{value:new r.Vector3(0,1,0)},uBlob:{value:1},uPAlt:{value:0}},this.terrain=new r.Mesh(st(s,f),new r.ShaderMaterial({uniforms:{...D,...this.tu},vertexShader:et,fragmentShader:G})),this.terrain.frustumCulled=!1,this.terrain.matrixAutoUpdate=!1,k.add(this.terrain),this.su={uInvProj:{value:new r.Matrix4},uCamRot:{value:new r.Matrix4},uSeed:this.tu.uSeed},this.sky=new r.Mesh(new r.PlaneGeometry(2,2),new r.ShaderMaterial({uniforms:{...D,...this.su},vertexShader:e,fragmentShader:o,depthWrite:!1})),this.sky.frustumCulled=!1,this.skyScene.add(this.sky),this.scatter=new p(k,this.tScene,d),this.settle=new z(k),this.view=new lt(k),this.uDayA={value:1};const l=new Map;this.view.group.traverse(h=>{if(!h.isMesh||!h.material.uniforms)return;let B=l.get(h.material);if(!B){const m=h.material.uniforms;B=new r.ShaderMaterial({uniforms:{...D,uColor:m.uColor,uEmit:m.uEmit,uPush:m.uPush,uFlat:m.uFlat,uDayA:this.uDayA},vertexShader:n,fragmentShader:u,side:h.material.side}),l.set(h.material,B)}h.material=B}),this.fadeMat=new r.ShaderMaterial({uniforms:{tMap:{value:null},uA:{value:0}},transparent:!0,depthTest:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.,1.); }",fragmentShader:"uniform sampler2D tMap; uniform float uA; varying vec2 vUv; void main(){ gl_FragColor=vec4(texture2D(tMap,vUv).rgb,uA); }"}),this.ou={uBodyK:{value:0}};const t=new r.ShaderMaterial({uniforms:{...D,...this.su,...this.ou},defines:{OVERLAY:1},vertexShader:e,fragmentShader:o,depthTest:!1,depthWrite:!1,transparent:!0,blending:r.CustomBlending,blendEquation:r.AddEquation,blendSrc:r.OneFactor,blendDst:r.SrcAlphaFactor,blendSrcAlpha:r.ZeroFactor,blendDstAlpha:r.OneFactor});this.ovScene=new r.Scene;const a=new r.Mesh(new r.PlaneGeometry(2,2),t);a.frustumCulled=!1,this.ovScene.add(a),this.layers=[[this.scene,this.camera],...this.extra],this.dof=!1,this.farOld=C,this.fadeScene=new r.Scene;const P=new r.Mesh(new r.PlaneGeometry(2,2),this.fadeMat);P.frustumCulled=!1,this.fadeScene.add(P),this.fadeCam=new r.OrthographicCamera(-1,1,1,-1,0,1);const g=h=>{const B=document.createElement("div");return B.style.cssText='position:fixed;left:50%;transform:translateX(-50%);pointer-events:none;color:#fff;font-family:"Segoe UI",system-ui,sans-serif;transition:opacity .8s;opacity:0;z-index:3;text-shadow:0 1px 8px rgba(40,10,30,.6);'+h,document.body.appendChild(B),B};this.hintEl=g("bottom:16%;font-size:14px;padding:6px 14px;border-radius:14px;background:rgba(40,28,44,.42);backdrop-filter:blur(6px);text-shadow:none"),this.hintEl.innerHTML="继续缩小（<b style=\"color:#ffe3d2\">Q</b>），降落到这颗细胞上",this.banner=g("top:9%;text-align:center;font-weight:300;letter-spacing:4px"),this.terr=y(1),this.scatter.reset(this.terr,1),this.settle.reset(this.terr),this.settle.setVisible(!1),this.H=1,this.info={H:1}}_ballMesh(i){if(this.balls)return;const d=i.balls.material,k="gl_FragColor=vec4(col,";let s=d.fragmentShader;if(s.lastIndexOf(k)>=0&&/\bhit\b/.test(s)){s=s.replace(/void main\(\)\{/,`${R}
uniform vec3 uPOrig; uniform float uPS;
void main(){`);const t=s.lastIndexOf(k);s=s.slice(0,t)+`{ vec4 pa=atmos(uCamPu,uPOrig+hit*uPS,4); col=col*pa.a+pa.rgb; }
  `+s.slice(t)}else s=null;this.bu={uPOrig:{value:new r.Vector3},uPS:{value:1}};const l=s?new r.ShaderMaterial({uniforms:{...d.uniforms,...D,...this.bu},defines:{...d.defines},vertexShader:d.vertexShader,fragmentShader:s}):d;this.balls=new r.Mesh(i.balls.geometry,l),this.balls.frustumCulled=!1,this.balls.matrixAutoUpdate=!1,this.ballScene.add(this.balls)}checkEnter(i,d,k){this.cool-=k;const s=i.logHT<=Math.log(X)+1e-6,f=Z.uBallK.value>.5&&this.cool<=0;return this.hintEl.style.opacity=s&&f&&i.logH<Math.log(X)+.02?1:0,s&&f&&(d.shrink||d.wheel>0)?this.enter(i,d,k):!1}enter(i,d,k){const s=mt,f=this.ballBuf||(this.ballBuf=new Float32Array(s*2*s*4));this.r.readRenderTargetPixels(i.ballRT,0,0,s,2*s,f);let l=-1,t=1/0;for(let S=0;S<2*s*s;S++){const N=f[S*4+3];if(!(N>1e-6))continue;const tt=f[S*4],j=f[S*4+1],V=f[S*4+2],rt=Math.hypot(tt,j,V);let ut=rt-N+1.5*N*(1+(tt*i.up[0]+j*i.up[1]+V*i.up[2])/Math.max(rt,1e-9));S>=s*s&&(ut+=.6*N),ut<t&&(t=ut,l=S)}if(l<0||t>2)return!1;this._ballMesh(i),this.ballMod=new Float32Array(f),this.bi=l,this.body=i.balls.parent,i.balls.visible=!1,this._hid=(this.bodyHide||[]).filter(Boolean).map(S=>[S,S.visible]);for(const[S]of this._hid)S.visible=!1;this.farOld=i.camera.far,this.oldCam.far=this.farOld,this.dof0=Z.uDofK.value;const a=this.c=[f[l*4],f[l*4+1],f[l*4+2]],P=this.rb=f[l*4+3],g=this.s=J/P,h=$([-a[0],-a[1],-a[2]]);this.U0=h;let B=$((i.Np||i.up).slice());L(B)>.5||(B=i.up.slice()),this.Ns=B,D.uU0.value.fromArray(B);const m=H(i.pos,a,i.H);this.seed=I(Math.round(m[0]*1e10),Math.round(m[1]*1e10),Math.round(m[2]*1e10),1374496523),this.terr=y(this.seed),this.tu.uSeed.value=this.seed;const K=Z.uPatchCol.value,x=Z.uPatchTint.value*.55;D.uCellCol.value.set(K.x*1.015,K.y*(1-.211*x)*.905,K.z*(1-.18*x)*.9),Z.uEyeK.value>0&&D.uCellCol.value.lerp(Z.uEyeCell.value,Z.uEyeK.value),D.uWc.value.fromArray(m),D.uSunP.value.copy(Z.uSun.value),this.sunP=Z.uSun.value.toArray();const q=this.terr.height(...h),T=i.mode==="walk"?0:Math.max(0,(L(a)-P)*g);return this.P=h.map(S=>S*(J+q+T)),this.loghMax=Math.log(g),this.Hentry=i.H,this.logh=this.loghMax+(i.logH-Math.log(X)),this.loghT=this.loghMax-(d.shrink?k*1.7:0)-d.wheel*.0016*(d.wheel>0?1:0),this.up=h,this.fwd=$(F(i.fwd,h)),L(F(i.fwd,h))>.001||(this.fwd=$(F([1,0,0],h))),this.face=$(F(i.face,h)),L(F(i.face,h))>.001||(this.face=this.fwd.slice()),this.pitch=i.pitch,this.mode=i.mode,this.vel=i.vel.slice(),this.grace=.3,this.camD=i.camD||3.6,this.camDT=3.6,this.lift=i.lift||0,this.moving=i.moving||0,this.camUp0=i.up.slice(),this.camF=$(F(i.fwd,i.up)),this.liftU=$((i.Np||i.up).slice()),this.E1=$(F([1,0,0],h)),L(F([1,0,0],h))>.1||(this.E1=$(F([0,0,1],h))),this.saved={pos:i.pos.slice(),H:i.H},this.scatter.reset(this.terr,this.seed),this.settle.reset(this.terr),this.name=w[this.seed%w.length]+E[(this.seed>>>8)%E.length]+" "+(100+(this.seed>>>16)%900),this.banner.innerHTML=`<div style="font-size:12px;opacity:.8">细胞世界</div><div style="font-size:28px;margin-top:4px">${this.name}</div>`,this.bannerShown=!1,this.bannerT=0,this.hintEl.style.opacity=0,this.exitT=0,this.wantExit=!1,this.active=!0,this.lastU=this.lastF=-1,!0}exit(i){const d=H(this.c,this.P,1/this.s);Object.assign(i,{pos:H(this.saved.pos,d,this.saved.H),fwd:this.fwd.slice(),up:this.up.slice(),face:this.face.slice(),pitch:this.pitch,mode:this.mode,vel:[0,0,0]}),i.logH=Math.log(X)+Math.max(0,this.logh-this.loghMax),i.logHT=Math.log(X)+.001,this.active=!1,this.wantExit=!1,this.cool=1.2;for(const[k,s]of this._hid||[])k.visible=s;this._hid=null,this.settle.setVisible(!1),this.settle.clearUI(),this.banner.style.opacity=0}capture(){const i=this.r,d=i.getDrawingBufferSize(new r.Vector2);(!this.fadeTex||this.fadeTex.image.width!==d.x||this.fadeTex.image.height!==d.y)&&(this.fadeTex&&this.fadeTex.dispose(),this.fadeTex=new r.FramebufferTexture(d.x,d.y)),i.setRenderTarget(null),i.copyFramebufferToTexture(new r.Vector2(0,0),this.fadeTex),this.fadeMat.uniforms.tMap.value=this.fadeTex,this.fadeA=1}drawFade(i){this.fadeA<=0||(this.fadeMat.uniforms.uA.value=U(0,1,this.fadeA),this.r.setRenderTarget(null),this.r.render(this.fadeScene,this.fadeCam),this.fadeA=Math.max(0,this.fadeA-i/.35))}_cells(i,d){if(Math.abs(i-this.lastF)<1e-4&&Math.abs(d-this.lastU)<1e-4)return;this.lastF=i,this.lastU=d;const k=mt,s=this.ballBuf,f=this.ballMod,l=this.c,t=this.Ns,a=this.rb;for(let h=0;h<2*k*k;h++){const B=h*4,m=s[B+3];if(!(m>1e-6))continue;if(h===this.bi){f[B+3]=m*(1-.035*i);continue}const K=[s[B]-l[0],s[B+1]-l[1],s[B+2]-l[2]],x=O(K,t),q=H(K,t,-x),T=L(q);let S=.5*a;if(h>=k*k){const tt=U(3*a,5*a,T);S=.5*a*tt-1.3*a*(1-tt)}const N=H(H(l,q,1+.5*d),t,x+S*d);f[B]=N[0],f[B+1]=N[1],f[B+2]=N[2],f[B+3]=m}const P=this.r.properties.get(this._ballTex).__webglTexture,g=this.r.getContext();P&&(this.r.state.bindTexture(g.TEXTURE_2D,P),g.texSubImage2D(g.TEXTURE_2D,0,0,0,k,2*k,g.RGBA,g.FLOAT,f))}_ballRay(i,d,k,s){const f=this.ballMod;if(!f)return 1/0;const l=this.s,t=H(this.c,i,1/l),a=k/l,P=s/l,g=f.length>>2;let h=1/0;for(let B=0;B<g;B++){const m=B*4,K=f[m+3];if(!(K>1e-6)||B===this.bi)continue;const x=K+P,q=t[0]-f[m],T=t[1]-f[m+1],S=t[2]-f[m+2],N=q*d[0]+T*d[1]+S*d[2],tt=q*q+T*T+S*S-x*x;if(tt<0){h=0;break}const j=N*N-tt;if(j<=0)continue;const V=-N-Math.sqrt(j);V>0&&V<a&&V<h&&(h=V)}return h*l}_ballBelow(i,d){const k=this.ballMod;if(!k)return-1e9;const s=H(this.c,i,1/this.s),f=k.length>>2;let l=-1e9;for(let t=0;t<f;t++){const a=t*4,P=k[a+3];if(!(P>1e-6)||t===this.bi)continue;const g=s[0]-k[a],h=s[1]-k[a+1],B=s[2]-k[a+2],m=g*d[0]+h*d[1]+B*d[2],K=g*g+h*h+B*B-m*m;if(K>=P*P)continue;const x=Math.sqrt(P*P-K);m>-x&&x-m>l&&(l=x-m)}return l}update(i,d,k,s,f){const l=this.terr;this._ballTex=f.ballRT.texture;const t=d.grow||d.wheel<0,a=this.loghT-d.wheel*.0016+(d.grow-d.shrink)*i*1.7;t&&this.loghT>=this.loghMax-1e-6?this.exitT+=d.grow?i:.12:this.exitT=0;const P=this.mode==="fly"?U(.6,2,(L(this.P)-J)/J):0,g=this.loghMax-(1-P)*(this.loghMax-Math.log(M));this.loghT=Math.min(this.loghMax,Math.max(Math.log(M),g,a)),this.logh+=(this.loghT-this.logh)*(1-Math.exp(-i*7)),(this.exitT>.15||P>=1)&&this.logh>this.loghMax-.05&&(this.wantExit=!0);const h=Math.exp(this.logh),B=this.loghMax-this.logh,m=U(.15,1.4,B),K=U(.4,3.5,B);let x=this.up;const q=-d.mx*.0024,T=Math.cos(q),S=Math.sin(q),N=A(this.camUp0,this.camF);this.camF=$([this.camF[0]*T+N[0]*S,this.camF[1]*T+N[1]*S,this.camF[2]*T+N[2]*S]),L(F(this.camF,x))>.001&&(this.fwd=$(F(this.camF,x))),this.pitch=Math.min(1.45,Math.max(-1.2,this.pitch+d.my*.0024));const tt=A(this.fwd,x),j=d.right-d.left,V=d.fwd-d.back,rt=Math.hypot(j,V)>1?1/Math.hypot(j,V):1;d.toggle&&(this.mode==="walk"?(this.mode="fly",this.vel=x.map(St=>St*3.5),this.grace=.4):this.grace=-1);let ut=0,at,dt;if(this.mode==="walk"){const St=2.4*(d.boost?2.8:1),Ft=[(this.fwd[0]*V+tt[0]*j)*rt,(this.fwd[1]*V+tt[1]*j)*rt,(this.fwd[2]*V+tt[2]*j)*rt];ut=L(Ft)*St/2.4,ut>0&&(this.face=$(Ft)),this.P=H(this.P,Ft,St*h*i),at=$(this.P),dt=l.height(...at),this.P=at.map(Tt=>Tt*(J+dt)),d.up&&(this.mode="fly",this.vel=x.map(Tt=>Tt*3.5),this.grace=.4)}else{const St=this.pitch-.3,Ft=Math.cos(St),Tt=Math.sin(St),Dt=[this.fwd[0]*Ft-x[0]*Tt,this.fwd[1]*Ft-x[1]*Tt,this.fwd[2]*Ft-x[2]*Tt];at=$(this.P),dt=l.height(...at);const ee=(L(this.P)-J-dt)/h,Gt=4.5*(d.boost?4:1)*Math.max(1,Math.min(ee,1500)/25),oe=d.up-d.down,se=1-Math.exp(-i*5);for(let Lt=0;Lt<3;Lt++)this.vel[Lt]+=((Dt[Lt]*V+tt[Lt]*j)*rt*Gt+x[Lt]*oe*Gt*.8-this.vel[Lt])*se;const Ht=L(this.vel);if(ut=Ht/4.5,ut>.05){const Lt=F(this.vel,x);L(Lt)>.2&&(this.face=$(Lt))}if(this.grace-=i,this.P=H(this.P,this.vel,h*i),L(this.P)>6*J&&(this.P=$(this.P).map(Lt=>Lt*6*J)),at=$(this.P),dt=l.height(...at),(L(this.P)-J-dt)/h<.06){const Lt=O(this.vel,at),ae=d.down||Lt<0&&-Lt>.55*Ht;this.grace<=0&&!d.up&&ae?(this.mode="walk",this.vel=[0,0,0],this.P=at.map(Ut=>Ut*(J+dt))):(this.P=at.map(Ut=>Ut*(J+dt+.06*h)),Lt<0&&(this.vel=H(this.vel,at,-Lt)))}}this.moving+=((this.mode==="walk"?Math.min(1,ut):0)-this.moving)*(1-Math.exp(-i*10)),x=this.up=at,this.fwd=$(F(this.fwd,x)),this.face=$(F(this.face,x));const ot=1-Math.exp(-i*3);this.camUp0=$(W(this.camUp0,x,ot)),this.liftU=$(W(this.liftU,x,ot));const nt=this.camUp0;L(F(this.camF,nt))>.001&&(this.camF=$(F(this.camF,nt)));const ht=(L(this.P)-J-dt)/h,pt=this.camera,wt=Math.cos(this.pitch),xt=Math.sin(this.pitch),Y=this.camF,it=[Y[0]*wt-nt[0]*xt,Y[1]*wt-nt[1]*xt,Y[2]*wt-nt[2]*xt],vt=this.camDT;this.camD+=(vt-this.camD)*(1-Math.exp(-i*(vt<this.camD?30:4)));let ft=[nt[0]*.8-it[0]*this.camD,nt[1]*.8-it[1]*this.camD,nt[2]*.8-it[2]*this.camD];const yt=this.P,Mt=St=>{const Ft=H(yt,St,h);return Math.max((J+l.heightAt(Ft)-L(Ft))/h,this._ballBelow(Ft,x)*this.s/h)};let At=Mt(ft)+.35;const Ct=nt.map(St=>St*.8);for(let St=1;St<=6;St++)At=Math.max(At,(Mt(H(Ct,Q(ft,Ct),St/7))+.3)*7/St);const kt=Math.max(0,Math.min(At,400));this.lift+=(kt-this.lift)*(1-Math.exp(-i*(kt>this.lift?60:5))),ft=H(ft,this.liftU,this.lift);{const St=Q(ft,Ct),Ft=L(St),Tt=this._ballRay(H(yt,Ct,h),St.map(Dt=>Dt/Ft),Ft*h,.06*h);this.camDT=Tt<1/0?Math.max(.45,this.camD*Tt/(Ft*h)-.25):3.6}const ct=H(yt,ft,h),gt=L(ct);pt.position.fromArray(ft),pt.up.fromArray(nt),pt.lookAt(nt[0]*.95,nt[1]*.95,nt[2]*.95),pt.near=.02,pt.far=this.farOld*this.s/h,pt.aspect=k,pt.updateProjectionMatrix(),pt.updateMatrixWorld();const bt=this.oldCam,Rt=H(this.c,ct,1/this.s);bt.position.fromArray(Rt),bt.quaternion.copy(pt.quaternion),bt.aspect=k,bt.near=Math.max(1e-7,.01*h/this.s),bt.updateProjectionMatrix(),bt.updateMatrix(),bt.updateMatrixWorld(!0),Z.uCamLocal.value.fromArray(Rt);const Pt=2/Math.log2(this.farOld+1);Z.uLogC.value=Pt,D.uPLogC.value=Pt,D.uDK.value=h/this.s;const Et=(this.dof0||0)*(1-U(1,4.5,B));D.uPDofK.value=Z.uDofK.value=Et,D.uPFocus.value=Math.max(1,this.camD),Z.uFocus.value=Math.max(1,this.camD)*h/this.s,this.dof=Et>.01;const qt=U(.6,2.4,B);this.ou.uBodyK.value=qt,this.layers=this.body&&qt<.999?[[this.body,this.oldCam],[this.ovScene,this.camera],[this.scene,this.camera],...this.extra]:[[this.scene,this.camera],...this.extra],this.bu&&(this.bu.uPOrig.value.set(-this.c[0]*this.s,-this.c[1]*this.s,-this.c[2]*this.s),this.bu.uPS.value=this.s),this._cells(m,K),D.uCamPu.value.fromArray(ct),D.uCamL.value.fromArray(ft),D.uInvh.value=1/h,D.uHp.value=h,D.uPTime.value+=i,D.uPxK.value=2/(pt.projectionMatrix.elements[5]*s),D.uAtmU.value=K,this.E1=F(this.E1,at),L(this.E1)<.1&&(this.E1=F(Math.abs(at[0])<.9?[1,0,0]:[0,1,0],at)),this.E1=$(this.E1);const Qt=A(at,this.E1),_t=this.tu;_t.uC.value.fromArray(at),_t.uE1.value.fromArray(this.E1),_t.uE2.value.fromArray(Qt),_t.uPr.value=L(yt)-J;const Zt=Math.acos(Math.min(1,J/Math.max(gt,J+.01))),Jt=Math.acos(J/(J+30)),te=Math.acos(Math.min(1,Math.max(-1,O($(ct),at)))),Nt=Math.min(Math.PI,Zt+Jt+te+.01),Ot=Math.max(.03*h,.004*Math.max(gt-J-dt,0),.004)/J;let It=.01,Vt=25;const Kt=St=>Nt*Math.expm1(St/this.NR)/Math.expm1(St);if(Kt(It)>Ot)for(let St=0;St<40;St++){const Ft=.5*(It+Vt);Kt(Ft)>Ot?It=Ft:Vt=Ft}_t.uThMax.value=Nt,_t.uK.value=It,_t.uUpL.value.fromArray(x),_t.uPAlt.value=Math.max(0,ht),this.su.uInvProj.value.copy(pt.projectionMatrixInverse),this.su.uCamRot.value.copy(pt.matrixWorld),this.uDayA.value=U(-.14,.22,O(x,this.sunP)),this.scatter.update(yt,h),this.settle.meUp=x,this.settle.update(i,yt,h,this.fwd,d.greet,pt),this.view.update(i,new r.Vector3,new r.Vector3().fromArray(x),new r.Vector3().fromArray(this.face),this.moving,this.mode==="fly",ut),this.H=this.Hentry*Math.exp(this.logh-this.loghMax),this.info={H:this.H,mode:this.mode,speed:ut},!this.bannerShown&&h<60&&(this.bannerShown=!0,this.bannerT=4.5),this.bannerT>0&&(this.bannerT-=i,this.banner.style.opacity=this.bannerT>.8&&this.bannerT<4.2?1:0)}warm(i){this._ballMesh(i);const d=[];for(const[k]of[[this.scene],...this.extra,[this.ovScene]])k.traverse(s=>{s.visible||(d.push(s),s.visible=!0)});for(const[k,s]of[[this.scene,this.camera],...this.extra,[this.ovScene,this.camera],[this.fadeScene,this.fadeCam]])this.r.compile(k,s);for(const k of d)k.visible=!1}}return{GAUGE_H_MIN:c,CellPlanet:_}})(),me=await(async()=>{const{buildWorld:Z,HEROINE_MODELS:mt}=fe,{Sim:lt,H_MIN:st,H_MAX:X}=Yt,{PlayerView:J}=Bt,{Post:b}=ue,{G:y,CTRL_NEAR:I}=zt,{Dust:D}=he,{CellPlanet:R,GAUGE_H_MIN:p}=ve,z=Y=>document.getElementById(Y),M=z("view"),c=new r.WebGLRenderer({canvas:M,antialias:!1,powerPreference:"high-performance",alpha:!1,stencil:!1});c.autoClear=!1,c.outputColorSpace=r.LinearSRGBColorSpace;const C=new r.Scene,U=new r.PerspectiveCamera(58,1,.03,1e4);U.matrixAutoUpdate=!0;const O=c.getContext().getExtension("WEBGL_debug_renderer_info"),A=O?c.getContext().getParameter(O.UNMASKED_RENDERER_WEBGL):"",L=/Android|iPhone|iPad|iPod|Mobile|HarmonyOS/i.test(navigator.userAgent)||/Macintosh/i.test(navigator.userAgent)&&navigator.maxTouchPoints>1,$=L||/Intel|UHD|Iris|Mali|Adreno|PowerVR|SwiftShader|llvmpipe/i.test(A)&&!/Arc/i.test(A),H=/SwiftShader|llvmpipe|Basic Render|WARP|Software/i.test(A),Q=new b(c,$?{samples:2,taps:12}:{samples:4,taps:24}),F=L?2:$?1:1.5,W=L?1e6:$?21e5:47e5,et=L?.375:.5,G=.25,e=(Y,it)=>Math.max(.5,Math.min(window.devicePixelRatio||1,F,Math.sqrt(W/Math.max(1,Y*it))));let o=1,n=0,u=0,w=0,E=0,_=!1;function v(){_||(_=!0,z("slowmsg").textContent=H?"当前浏览器未使用显卡渲染，游戏可能较卡顿。请在浏览器的系统设置中开启“使用图形加速”，然后重启浏览器；若已开启，请尝试更新显卡驱动。":"当前设备运行较慢，可尝试关闭其他标签页和程序。双显卡笔记本可将浏览器设为使用高性能显卡。",z("slowgpu").textContent="显卡："+(A||"未知"),z("slow").classList.remove("hidden"))}z("slow").addEventListener("click",()=>z("slow").classList.add("hidden"));function i(){const Y=Math.max(2,Math.round(M.width*o)),it=Math.max(2,Math.round(M.height*o));Q.setSize(Y,it),y.uRes.value.set(Y,it)}function d(){const Y=window.innerWidth,it=window.innerHeight;c.setPixelRatio(e(Y,it)),c.setSize(Y,it,!0),U.aspect=Y/it,U.updateProjectionMatrix(),i()}window.addEventListener("resize",d);const k={},s={mx:0,my:0,wheel:0,toggle:!1,greet:!1};let f=!1;window.addEventListener("keydown",Y=>{Y.code==="KeyF"&&!k.KeyF&&(s.toggle=!0),Y.code==="KeyT"&&!k.KeyT&&(s.greet=!0),Y.code==="KeyR"&&l(),Y.code==="KeyH"&&z("help").classList.toggle("hidden"),k[Y.code]=!0,["Space","ArrowUp","ArrowDown","ControlLeft"].includes(Y.code)&&Y.preventDefault()}),window.addEventListener("keyup",Y=>{k[Y.code]=!1}),window.addEventListener("blur",()=>{for(const Y in k)k[Y]=!1}),M.addEventListener("mousedown",()=>{if(f=!0,document.pointerLockElement!==M&&M.requestPointerLock)try{const Y=M.requestPointerLock();Y&&Y.catch&&Y.catch(()=>{})}catch{}}),window.addEventListener("mouseup",()=>{f=!1}),window.addEventListener("mousemove",Y=>{(document.pointerLockElement===M||f)&&(s.mx+=Y.movementX,s.my+=Y.movementY)}),M.addEventListener("wheel",Y=>{s.wheel+=Y.deltaY,Y.preventDefault()},{passive:!1}),M.addEventListener("contextmenu",Y=>Y.preventDefault());function l(){V&&(at&&at.active&&at.exit(V),V.reset())}const t={ax:0,ay:0,stick:null,look:[],pinch:0,hold:{},fast:!1},a=50,P=2.2,g=1400,h=z("stick"),B=z("knob");let m=0;function K(){if(document.body.classList.contains("touch"))return;document.body.classList.add("touch");const Y=document.documentElement,it=document.querySelector("#menu [data-tap=full]");it&&!(Y.requestFullscreen||Y.webkitRequestFullscreen)&&it.remove()}window.matchMedia&&matchMedia("(hover: none) and (pointer: coarse)").matches&&K();function x(){t.stick=null,t.ax=t.ay=0,B.style.transform="",h.classList.remove("on"),h.style.left=h.style.top=""}M.addEventListener("touchstart",Y=>{Y.preventDefault(),K();for(const it of Y.changedTouches)if(!t.stick&&it.clientX<window.innerWidth*.42){const vt=Math.max(64,it.clientX),ft=Math.min(window.innerHeight-64,it.clientY);t.stick={id:it.identifier,x:vt,y:ft},h.style.left=vt+"px",h.style.top=ft+"px",h.classList.add("on")}else t.look.length<2&&(t.look.push({id:it.identifier,x:it.clientX,y:it.clientY}),t.pinch=0)},{passive:!1}),M.addEventListener("touchmove",Y=>{Y.preventDefault();for(const it of Y.changedTouches){const vt=t.stick;if(vt&&it.identifier===vt.id){const yt=it.clientX-vt.x,Mt=it.clientY-vt.y,At=Math.hypot(yt,Mt)||1,Ct=Math.min(1,At/a);B.style.transform=`translate(${yt/At*Ct*a}px,${Mt/At*Ct*a}px)`;const kt=Ct<.15?0:(Ct-.15)/.85;t.ax=yt/At*kt,t.ay=Mt/At*kt;continue}const ft=t.look.find(yt=>yt.id===it.identifier);ft&&(t.look.length===1&&(s.mx+=(it.clientX-ft.x)*P,s.my+=(it.clientY-ft.y)*P),ft.x=it.clientX,ft.y=it.clientY)}if(t.look.length===2){const[it,vt]=t.look,ft=Math.hypot(it.x-vt.x,it.y-vt.y);t.pinch>0&&ft>0&&(s.wheel+=Math.log(ft/t.pinch)*g),t.pinch=ft}},{passive:!1});const q=Y=>{for(const it of Y.changedTouches){t.stick&&it.identifier===t.stick.id&&x();const vt=t.look.findIndex(ft=>ft.id===it.identifier);vt>=0&&(t.look.splice(vt,1),t.pinch=0)}};M.addEventListener("touchend",q),M.addEventListener("touchcancel",q),window.addEventListener("blur",()=>{x(),t.look.length=0,t.pinch=0;for(const Y in t.hold)t.hold[Y]=!1;document.querySelectorAll("#touch button.down").forEach(Y=>Y.classList.remove("down"))});const T={fast:Y=>{t.fast=!t.fast,Y.classList.toggle("on",t.fast)},greet:()=>{s.greet=!0},reset:()=>l(),help:()=>{clearTimeout(m),z("help").classList.toggle("hidden")},full:()=>{const Y=document,it=Y.documentElement;try{if(Y.fullscreenElement||Y.webkitFullscreenElement)(Y.exitFullscreen||Y.webkitExitFullscreen).call(Y);else{const vt=(it.requestFullscreen||it.webkitRequestFullscreen).call(it),ft=()=>{try{const yt=screen.orientation&&screen.orientation.lock&&screen.orientation.lock("landscape");yt&&yt.catch&&yt.catch(()=>{})}catch{}};vt&&vt.then?vt.then(ft,()=>{}):ft()}}catch{}}};for(const Y of document.querySelectorAll("#touch button")){const it=Y.dataset.hold,vt=Y.dataset.tap;if(it){const ft=yt=>{t.hold[it]=yt,Y.classList.toggle("down",yt)};Y.addEventListener("pointerdown",yt=>{yt.preventDefault();try{Y.setPointerCapture(yt.pointerId)}catch{}ft(!0)});for(const yt of["pointerup","pointercancel","lostpointercapture"])Y.addEventListener(yt,()=>ft(!1))}vt&&Y.addEventListener("click",()=>T[vt](Y)),Y.addEventListener("contextmenu",ft=>ft.preventDefault())}const S=.06;function N(Y){const it=Math.pow(10,Math.max(0,Math.floor(Math.log10(Y))-2));return Math.round(Y/it)*it}function tt(Y){const it=Y/S;if(it>=.995)return"×"+it.toFixed(it<1.995?2:1);const vt=1/it;let ft;return vt<10?ft=vt.toFixed(1):vt<1e6?ft=N(vt).toLocaleString("zh-CN"):vt<1e9?ft=+(vt/1e6).toPrecision(3)+" 百万":vt<1e12?ft=+(vt/1e9).toPrecision(3)+" 十亿":ft=+(vt/1e12).toPrecision(3)+" 万亿","×1/"+ft}function j(Y){z("size").textContent=tt(Y.H);const it=(Math.log(Y.H)-Math.log(p))/(Math.log(X)-Math.log(p));z("bar").style.height=(it*100).toFixed(1)+"%"}let V=null,rt=null,ut=null,at=null,dt=performance.now(),ot=0,nt=0,ht=60,pt=0;function wt(Y){requestAnimationFrame(wt),xt(Y)}function xt(Y){const it=Math.max(0,Math.min(.05,(Y-dt)/1e3));dt=Math.max(dt,Y);const vt={mx:s.mx,my:s.my,wheel:s.wheel,toggle:s.toggle,greet:s.greet,fwd:k.KeyW||k.ArrowUp?1:0,back:k.KeyS||k.ArrowDown?1:0,left:k.KeyA||k.ArrowLeft?1:0,right:k.KeyD||k.ArrowRight?1:0,up:k.Space||t.hold.up?1:0,down:k.ControlLeft||k.KeyC||t.hold.down?1:0,boost:k.ShiftLeft||k.ShiftRight||t.fast?1:0,shrink:k.KeyQ||t.hold.shrink?1:0,grow:k.KeyE||t.hold.grow?1:0};vt.fwd+=Math.max(0,-t.ay),vt.back+=Math.max(0,t.ay),vt.left+=Math.max(0,-t.ax),vt.right+=Math.max(0,t.ax),s.mx=s.my=s.wheel=0,s.toggle=s.greet=!1,y.uTime.value=Y/1e3,at.active?(at.update(it,vt,U.aspect,y.uRes.value.y,V),Q.render(null,null,Y/1e3,at.dof,at.layers),j(at.info),at.wantExit&&(at.capture(),at.exit(V))):(V.update(it,vt),rt.update(it,V.pos,y.uCamLocal.value.toArray(),V.logH),ut.update(it,new r.Vector3(0,0,0),new r.Vector3().fromArray(V.up),new r.Vector3().fromArray(V.face),V.moving,V.mode==="fly",V.info.speed),Q.render(C,U,Y/1e3,y.uDofK.value>.01),j(V.info),at.checkEnter(V,vt,it)),at.drawFade(it);const ft=Y-pt;if(pt=Y,document.hidden||ft>250){ot=0,nt=0,w=document.hidden||ft>2e4?0:w+1,w>=4&&(ht=1e3/ft,z("fps").textContent=ht.toFixed(ht<3?1:0)+" 帧/秒",v(),o>G&&(o=G,n=Y,u=Y+2e4,i()));return}if(w=0,ot+=ft/1e3,nt++,ot>1){ht=nt/ot,ot=0,nt=0,z("fps").textContent=ht.toFixed(0)+" 帧/秒";const yt=ht<20?G:Math.min(o,et);E=ht<12&&o<=G?E+1:0,E>=4&&v();const Mt=ht<42?Math.max(yt,o-(ht<20?.25:.125)):ht>57&&Y>u?Math.min(1,o+.125):o;Mt!==o&&Y-n>2500&&(Mt<o&&(u=Y+2e4),o=Mt,n=Y,i())}}return M.addEventListener("webglcontextlost",Y=>{Y.preventDefault();const it=z("loading");it.classList.remove("done"),it.style.cursor="pointer",z("ltext").textContent="画面渲染已中断，请点击重新加载。",it.addEventListener("click",()=>location.reload())}),(async()=>{const Y=c.getContext();if(!c.capabilities.isWebGL2||!Y.getExtension("EXT_color_buffer_float"))throw new Error("当前浏览器或设备不支持游戏所需的图形功能（WebGL 2 和浮点渲染目标）");d();const it=new URLSearchParams(location.search).get("model"),vt=it==="none"?[]:it?[it]:[...mt],ft=await Z(c,C,(Mt,At)=>{z("ltext").textContent=At,z("lbar").style.width=Mt*100+"%"},{modelUrls:vt});V=new lt(c,C,U,ft),I&&(V.ctrl.minFilter=V.ctrl.magFilter=r.NearestFilter,V.ctrl.needsUpdate=!0),rt=new D(C);const yt={pos:V.pos.slice(),fwd:V.fwd.slice(),logH:V.logH,pitch:V.pitch};V.reset=()=>{V.pos=yt.pos.slice(),V.fwd=yt.fwd.slice(),V.up=[0,1,0],V.logH=V.logHT=yt.logH,V.mode="fly",V.vel=[0,0,0],V.pitch=yt.pitch},ut=new J(C),at=new R(c,$),at.bodyHide=[rt.mesh,ut.group],at.warm(V),window.__game={sim:V,dust:rt,world:ft,renderer:c,scene:C,camera:U,G:y,post:Q,step:xt,planet:at,touch:t,mobile:L,lowTier:$,soft:H,gpuName:A,get rel(){return o},ctrlNear:I,get view(){return ut}},z("loading").classList.add("done"),H&&v(),document.body.classList.contains("touch")&&(m=setTimeout(()=>z("help").classList.add("hidden"),12e3)),dt=performance.now(),requestAnimationFrame(wt)})().catch(Y=>{z("ltext").textContent="加载失败："+Y.message,console.error(Y)}),{}})();
