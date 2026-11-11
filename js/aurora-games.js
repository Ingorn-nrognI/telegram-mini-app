window.__SCV_FIX=2
window.__SCV_APP=1
window.__DCV_APP=1
window.__DCV_FIX=1
window.__DCV_ROOMS=1
window.__PK_EMBED=1
window.__KC=4
window.__RN=2;(function(){var DIA='<svg class="ww-dia" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#2a9ef1"/><path d="M7.5 8h9l2.6 3.3L12 18.5 4.9 11.3z" fill="#fff"/></svg>'
function G(){return typeof CASE_GRAM_ICON_SVG!=='undefined'?'<span class="ww-gi">'+CASE_GRAM_ICON_SVG+'</span>':DIA}function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,(function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]}))}function n2(v){return(Number(v)||0).toFixed(2)}var el=null,tmr=0,onClose=null,DUR=1e4
var COL=['#5eead4','#86efac','#fbbf24','#f472b6','#38bdf8','#a78bfa','#fde68a','#ffffff']
function runConfetti(card,kind){card.querySelectorAll('.ww-cv').forEach((function(c){c._stop=true
c.remove()}))
var cv=document.createElement('canvas')
cv.className='ww-cv'
card.insertBefore(cv,card.firstChild)
var ctx=cv.getContext('2d'),W=0,H=0,dpr=Math.min(2,devicePixelRatio||1),P=[],t0=performance.now(),last=t0,alive=true
function size(){var r=card.getBoundingClientRect()
if(Math.round(r.width)!==W||Math.round(r.height)!==H){W=Math.round(r.width)
H=Math.round(r.height)
cv.width=W*dpr
cv.height=H*dpr}}size()
var av=card.querySelector('.ww-av'),ar=av?av.getBoundingClientRect():null,cr=card.getBoundingClientRect(),ax=ar?ar.left-cr.left+ar.width/2:W/2,ay=ar?ar.top-cr.top+ar.height/2:90
function rnd(a,b){return a+Math.random()*(b-a)}function add(x,y,vx,vy,delay,o){o=o||{}
P.push({x:x,y:y,vx:vx,vy:vy,d:delay||0,rot:rnd(0,6.28),vr:rnd(-6,6),wob:rnd(0,6.28),vw:rnd(5,11),sway:rnd(14,34),w:o.w||rnd(6,11),h:o.h||rnd(4,7),c:COL[Math.floor(Math.random()*COL.length)],sh:o.sh||(Math.random()<.2?'c':'r'),g:o.g||260,drag:o.drag||1.6,tr:o.sh==='rib'?[]:null,tw:rnd(0,6.28),len:rnd(16,26),coil:rnd(2.6,3.6),spin:rnd(9,15)*(Math.random()<.5?-1:1),floor:o.floor?H-rnd(4,14):0,
landed:false})}var k=kind||1
if(k===1||k===5){var fl=k===5
for(var i=0;i<110;i++)add(rnd(0,W),rnd(-80,-10),rnd(-30,30),rnd(80,150),rnd(0,1.6),{g:230,drag:1.1,floor:fl})
for(i=0;i<26;i++)add(rnd(0,W),rnd(-90,-20),rnd(-30,30),rnd(80,160),rnd(0,1.4),{sh:'sp',w:3,g:280,drag:1.2,floor:fl})}function gs(){return(Math.random()+Math.random()+Math.random()-1.5)/.5}function popper(left,n,fl,nsp){var x0=left?6:W-6,y0=H-8,base=left?-58:-122
for(var j=0;j<n+(nsp||0);j++){var an=(base+gs()*13)*Math.PI/180,sp=Math.max(260,720+gs()*210),sprl=j>=n
add(x0+rnd(-4,4),y0+rnd(-4,4),Math.cos(an)*sp,Math.sin(an)*sp,rnd(0,.09),{g:330,drag:rnd(2.2,3.4),floor:fl,sh:sprl?'sp':null,w:sprl?3:null})}}if(k===6){popper(true,55,1,7)
popper(false,55,1,7)
for(i=0;i<70;i++)add(rnd(0,W),rnd(-140,-10),rnd(-30,30),rnd(80,150),rnd(0,1.6),{g:230,drag:1.1,floor:1})
for(i=0;i<16;i++)add(rnd(0,W),rnd(-140,-20),rnd(-30,30),rnd(80,150),rnd(0,1.6),{sh:'sp',w:3,g:230,drag:1.2,floor:1})}if(k===2){popper(true,70,0,6)
popper(false,70,0,6)}if(k===3)for(i=0;i<130;i++){var an=rnd(0,6.28),sp=rnd(160,560)
add(ax,ay,Math.cos(an)*sp,Math.sin(an)*sp-120,rnd(0,.12),{g:300,drag:2.2})}if(k===4){for(i=0;i<26;i++)add(rnd(0,W),rnd(-120,-10),rnd(-30,30),rnd(40,90),rnd(0,1.6),{sh:'rib',w:3,g:110,drag:1.1})
for(i=0;i<60;i++)add(rnd(0,W),rnd(-60,H*.5),rnd(-10,10),rnd(10,40),rnd(0,1.5),{sh:'s',w:rnd(3,6),g:40,drag:1.5})}function frame(now){if(!alive||!cv.isConnected||cv._stop)return
requestAnimationFrame(frame)
size()
var dt=Math.min(.033,(now-last)/1e3),T=(now-t0)/1e3
last=now
ctx.setTransform(dpr,0,0,dpr,0,0)
ctx.clearRect(0,0,W,H)
var live=0,moving=0
P.forEach((function(p){if(T<p.d){live++
moving++
return}if(p.landed){drawP(p,1)
live++
return}var dr=Math.exp(-p.drag*dt)
p.vx*=dr
p.vy=p.vy*dr+p.g*dt
p.wob+=p.vw*dt
p.rot+=p.vr*dt
p.tw+=8*dt
var sx=Math.cos(p.wob)*p.sway*dt*2.2
p.x+=p.vx*dt+sx
p.y+=p.vy*dt
if(p.floor&&p.y>=p.floor&&p.vy>0){p.y=p.floor
if(p.vy>140){p.vy=-p.vy*.28
p.vx*=.5}else{p.landed=true
p.vr=0
p.wob=Math.PI*(Math.random()<.5?0:1)
p.spin=0}}if(p.y>H+40)return
live++
moving++
drawP(p,Math.min(1,(H+40-p.y)/120))}))
if(!live){alive=false
cv.remove()}}function spiral(p){var n=48,L=p.len,R=4.2,ph=p.tw*p.spin/8,base=ctx.globalAlpha
for(var pass=0;pass<2;pass++){ctx.beginPath()
var on=false
for(var k=0;k<=n;k++){var u=k/n,a=u*p.coil*6.283+ph,x=(u-.5)*L,y=Math.sin(a)*R,front=Math.cos(a)>0
if(front===(pass===1)){if(!on){ctx.moveTo(x,y)
on=true}else ctx.lineTo(x,y)}else on=false}ctx.strokeStyle=p.c
ctx.globalAlpha=base*(pass?1:.5)
ctx.lineWidth=pass?2.4:2
ctx.lineCap='round'
ctx.stroke()}ctx.globalAlpha=base}function drawP(p,fade){if(p.sh==='rib'){p.tr.push(p.x,p.y)
if(p.tr.length>40)p.tr.splice(0,2)
ctx.strokeStyle=p.c
ctx.globalAlpha=.9*fade
ctx.lineWidth=3.2
ctx.lineCap='round'
ctx.beginPath()
for(var j=0;j<p.tr.length;j+=2){var off=Math.sin(p.wob+j*.35)*4
ctx[j?'lineTo':'moveTo'](p.tr[j]+off,p.tr[j+1])}ctx.stroke()
ctx.globalAlpha=1
return}ctx.save()
ctx.translate(p.x,p.y)
ctx.rotate(p.rot)
ctx.globalAlpha=fade
if(p.sh==='sp'){spiral(p)
ctx.restore()
return}if(p.sh==='s'){var sc=.5+.5*Math.abs(Math.sin(p.tw))
ctx.scale(sc,sc)
ctx.fillStyle='#fff'
ctx.shadowColor='#5eead4'
ctx.shadowBlur=8
ctx.beginPath()
for(var q=0;q<8;q++){var rr=q%2?p.w*.35:p.w
ctx.lineTo(Math.cos(q*Math.PI/4)*rr,Math.sin(q*Math.PI/4)*rr)}ctx.fill()
ctx.restore()
return}var fl=p.landed?(Math.cos(p.wob)>=0?1:-1)*.35:Math.cos(p.wob*1.3)
ctx.scale(1,fl)
ctx.fillStyle=p.c
if(fl<0)ctx.globalAlpha=fade*.7
if(p.sh==='c'){ctx.beginPath()
ctx.arc(0,0,p.w*.45,0,7)
ctx.fill()}else ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h)
ctx.restore()}requestAnimationFrame(frame)
return{stop:function(){alive=false
cv.remove()}}}function hide(){if(!el)return
clearTimeout(tmr)
el.classList.remove('on')
var e=el
el=null
setTimeout((function(){e.remove()}),300)
document.documentElement.classList.remove('ww-open')
var f=onClose
onClose=null
if(f)try{f()}catch(x){}}function show(o){var H=!!o.host
if(!H&&document.querySelector('#rmOwn.on'))return
if(!H){if(el){el.remove()
el=null
clearTimeout(tmr)}onClose=o.onClose||null}var x=o.stake>0?o.total/o.stake:0,gifts=o.gifts||[]
var gv=gifts.reduce((function(a,g){return a+(Number(g.value)||0)}),0),gram=o.gram!=null?o.gram:Math.max(0,o.total-gv)
var R=17,C=2*Math.PI*R
var nd=document.createElement('div')
nd.className='ww'
if(!H)el=nd
nd.innerHTML='<div class="ww-card" style="--c:'+(o.color||'#5eead4')+'">'+'<button type="button" class="ww-x" aria-label="Закрыть"><svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="'+R+'" class="t"/><circle cx="20" cy="20" r="'+R+'" class="f" stroke-dasharray="'+C.toFixed(2)+'" style="--C:'+C.toFixed(2)+'px;animation-duration:'+DUR+'ms"/></svg><i>✕</i></button>'+'<small class="ww-k">'+esc(o.title||'Победитель')+'</small>'+'<div class="ww-hd"><span class="ww-av">'+(o.avaHtml||'')+'</span><span class="ww-who"><b class="ww-nm">'+esc(o.name)+'</b>'+(o.line?'<small class="ww-ln">'+o.line+'</small>':'')+'</span>'+'<span class="ww-won"><span class="ww-x2">x'+x.toFixed(2)+'</span><b>'+G()+n2(o.total)+'</b></span></div>'+'<div class="ww-gifts">'+(gram>.004?'<span class="ww-g gr"><span class="im">'+G()+'</span><b>GRAM</b><em>'+G()+n2(gram)+'</em></span>':'')+gifts.map((function(g){
return'<span class="ww-g"><span class="im">'+(g.img?'<img src="'+g.img+'" alt="">':'')+'</span><b>'+esc(g.title||'')+'</b><em>'+G()+n2(g.value)+'</em></span>'})).join('')+'</div>'+'</div>'
if(H){nd.classList.add('in')
o.host.appendChild(nd)
nd.querySelector('.ww-x').addEventListener('click',(function(){if(o.onClose)o.onClose()}))}else{document.body.appendChild(nd)
document.documentElement.classList.add('ww-open')
nd.querySelector('.ww-x').addEventListener('click',hide)
nd.addEventListener('click',(function(e){if(e.target===nd)hide()}))}var me=nd
requestAnimationFrame((function(){me.classList.add('on')
setTimeout((function(){runConfetti(me.querySelector('.ww-card'),o.conf||window.__WWCONF||6)}),250)}))
if(!o.host)tmr=setTimeout(hide,DUR)}window.WinWin={show:show,hide:hide,isOpen:function(){return!!el},confetti:runConfetti}})();(function(){var C=[94,234,212],W1=[210,255,248]
function rgba(c,a){return'rgba('+c[0]+','+c[1]+','+c[2]+','+Math.max(0,Math.min(1,a)).toFixed(3)+')'}function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,(function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]}))}var DOTS='<i class="el"><i>.</i><i>.</i><i>.</i></i>'
var TXT={grid:function(o){return'<b class="nt">Ожидание раунда'+DOTS+'</b>'},tiles:function(o){return'<b>Ожидание раунда</b><small>'+esc(o.sub)+'</small>'},cross:function(o){return'<b>Ожидание раунда</b><small>'+esc(o.sub)+'</small>'},hex:function(o){return'<b>Ожидание раунда</b><small>'+esc(o.sub)+'</small>'},pulse:function(o){
return'<b class="big">Раунд №'+esc(o.rn)+'</b><small>скоро старт'+DOTS+'</small>'},pool:function(o){return'<span class="pill"><b>Ожидание раунда</b><small>'+esc(o.sub)+'</small></span>'},topo:function(o){return'<b>Ожидание раунда</b><small>раунд №'+esc(o.rn)+'</small>'},sonar:function(o){return'<span class="pill"><b>Ищем игроков</b><small>'+esc(o.sub)+'</small></span>'}}
var HOLE=[.1,.41,.9,.59]
function inHole(x,y){return x>HOLE[0]&&x<HOLE[2]&&y>HOLE[1]&&y<HOLE[3]}function bd(b,x,y){var dx=Math.cos(b.a),dy=Math.sin(b.a)
return Math.abs((x-b.x)*dy-(y-b.y)*dx)}var ST={}
function base(ctx,S,b){var g=ctx.createRadialGradient(S*.5,S*.45,0,S*.5,S*.5,S*.75)
g.addColorStop(0,'#06302f')
g.addColorStop(1,'#021416')
ctx.fillStyle=g
ctx.fillRect(0,0,S,S)}function decay(arr,n,f){if(!arr||arr.length!==n){arr=new Float32Array(n)}for(var i=0;i<n;i++)arr[i]*=f
return arr}var BG={grid:function(ctx,S,b,t,dt){base(ctx,S,b)
var n=12,s=1/n,k=0,st=ST.grid=decay(ST.grid,2*n*n,Math.pow(.2,dt))
for(var i=1;i<n;i++)for(var j=0;j<n;j++){[[i*s,j*s,i*s,(j+1)*s],[j*s,i*s,(j+1)*s,i*s]].forEach((function(sg){var idx=k++,mx=(sg[0]+sg[2])/2,my=(sg[1]+sg[3])/2
if(inHole(mx,my))return
var h=Math.max(0,1-bd(b,mx,my)/.07)
st[idx]=Math.max(st[idx],h*h)
var v=st[idx]
ctx.strokeStyle=rgba(C,.12+.7*v)
ctx.lineWidth=1+1.3*v
ctx.beginPath()
ctx.moveTo(sg[0]*S,sg[1]*S)
ctx.lineTo(sg[2]*S,sg[3]*S)
ctx.stroke()}))}for(i=1;i<n;i++)for(j=1;j<n;j++){var x=i*s,y=j*s
if(inHole(x,y))continue
var q=Math.max(0,1-bd(b,x,y)/.05)
if(q>.02){ctx.fillStyle=rgba(W1,q)
ctx.beginPath()
ctx.arc(x*S,y*S,1.2+2.2*q,0,7)
ctx.fill()}}},tiles:function(ctx,S,b,t,dt){base(ctx,S,b)
var n=8,s=1/n,gap=.013,st=ST.tiles=decay(ST.tiles,n*n,Math.pow(.25,dt))
for(var i=0;i<n;i++)for(var j=0;j<n;j++){var cx=(i+.5)*s,cy=(j+.5)*s,idx=i*n+j
if(inHole(cx,cy))continue
st[idx]=Math.max(st[idx],Math.max(0,1-bd(b,cx,cy)/(s*.62)))
var v=st[idx],x=(i*s+gap)*S,y=(j*s+gap)*S,w=(s-2*gap)*S,r=w*.22
ctx.fillStyle=rgba(C,.045+.4*v)
ctx.strokeStyle=rgba(C,.13+.6*v)
ctx.lineWidth=1
ctx.beginPath()
ctx.roundRect(x,y,w,w,r)
ctx.fill()
ctx.stroke()}},cross:function(ctx,S,b,t,dt){base(ctx,S,b)
var n=16,s=1/n,st=ST.cross=decay(ST.cross,n*n,Math.pow(.3,dt))
for(var i=1;i<n;i++)for(var j=1;j<n;j++){var x=i*s,y=j*s,idx=i*n+j
if(inHole(x,y))continue
st[idx]=Math.max(st[idx],Math.max(0,1-bd(b,x,y)/.08))
var v=st[idx],z=2.4+4.5*v
ctx.strokeStyle=rgba(C,.18+.8*v)
ctx.lineWidth=1+v
ctx.beginPath()
ctx.moveTo(x*S-z,y*S)
ctx.lineTo(x*S+z,y*S)
ctx.moveTo(x*S,y*S-z)
ctx.lineTo(x*S,y*S+z)
ctx.stroke()}},hex:function(ctx,S,b,t,dt){base(ctx,S,b)
var r=S/14,hw=Math.sqrt(3)*r,cols=Math.ceil(S/hw)+2,rows=Math.ceil(S/(1.5*r))+2,st=ST.hex=decay(ST.hex,cols*rows,Math.pow(.22,dt))
for(var j=0;j<rows;j++)for(var i=0;i<cols;i++){var cx=i*hw+(j%2?hw/2:0)-hw/2,cy=j*1.5*r-r/2,fx=cx/S,fy=cy/S,idx=j*cols+i
if(inHole(fx,fy))continue
st[idx]=Math.max(st[idx],Math.max(0,1-bd(b,fx,fy)/.06))
var v=st[idx]
ctx.beginPath()
for(var k=0;k<6;k++){var a=Math.PI/3*k+Math.PI/6,rr=r*.9
ctx[k?'lineTo':'moveTo'](cx+Math.cos(a)*rr,cy+Math.sin(a)*rr)}ctx.closePath()
ctx.fillStyle=rgba(C,.03+.32*v)
ctx.fill()
ctx.strokeStyle=rgba(C,.12+.6*v)
ctx.lineWidth=1
ctx.stroke()}},pulse:function(ctx,S,b,t){base(ctx,S,b)
var n=18,s=1/n,ph=t%1400/1400,R=ph*.9
for(var i=1;i<n;i++)for(var j=1;j<n;j++){var x=i*s,y=j*s,d=Math.hypot(x-b.x,y-b.y),k=Math.max(0,1-Math.abs(d-R)/.05)*(1-ph),near=Math.max(0,1-bd(b,x,y)/.04)
var v=Math.max(k,near*.7)
ctx.fillStyle=rgba(C,.14+.85*v)
ctx.beginPath()
ctx.arc(x*S,y*S,1.3+2.4*v,0,7)
ctx.fill()}},pool:function(ctx,S,b,t){base(ctx,S,b)
var cx=b.x*S,cy=b.y*S,R=S*.42
var g=ctx.createRadialGradient(cx,cy,0,cx,cy,R)
g.addColorStop(0,'rgba(94,234,212,.22)')
g.addColorStop(.5,'rgba(45,180,200,.08)')
g.addColorStop(1,'rgba(94,234,212,0)')
ctx.fillStyle=g
ctx.fillRect(0,0,S,S)
var n=14,s=S/n
ctx.save()
ctx.beginPath()
ctx.arc(cx,cy,R,0,7)
ctx.clip()
for(var i=1;i<n;i++){var a=.28
var gl=ctx.createRadialGradient(cx,cy,0,cx,cy,R)
gl.addColorStop(0,'rgba(94,234,212,'+a+')')
gl.addColorStop(1,'rgba(94,234,212,0)')
ctx.strokeStyle=gl
ctx.lineWidth=1
ctx.beginPath()
ctx.moveTo(i*s,0)
ctx.lineTo(i*s,S)
ctx.moveTo(0,i*s)
ctx.lineTo(S,i*s)
ctx.stroke()}ctx.restore()},topo:function(ctx,S,b,t){base(ctx,S,b)
var cx=b.x*S,cy=b.y*S,step=S*.07,off=t/60%step
for(var r=off;r<S*1.5;r+=step){var f=Math.max(0,1-r/(S*1.2))
ctx.strokeStyle=rgba(C,.05+.3*f)
ctx.lineWidth=1
ctx.beginPath()
for(var k=0;k<=64;k++){var a=k/64*6.283,w=1+.06*Math.sin(a*3+t/900+r*.02)
ctx[k?'lineTo':'moveTo'](cx+Math.cos(a)*r*w,cy+Math.sin(a)*r*w)}ctx.stroke()}},sonar:function(ctx,S,b,t){base(ctx,S,b)
var cx=b.x*S,cy=b.y*S,R0=S*.7,ang=t/2400*Math.PI*2
ctx.strokeStyle=rgba(C,.1)
ctx.lineWidth=1;[.2,.4,.6,.8].forEach((function(f){ctx.beginPath()
ctx.arc(cx,cy,R0*f,0,7)
ctx.stroke()}))
for(var s2=0;s2<36;s2++){var aa=ang-s2*.025
ctx.strokeStyle=rgba(C,.32*(1-s2/36))
ctx.lineWidth=3
ctx.beginPath()
ctx.moveTo(cx,cy)
ctx.lineTo(cx+Math.cos(aa)*R0,cy+Math.sin(aa)*R0)
ctx.stroke()}var bl=ST.sonar=ST.sonar||[]
if(Math.random()<.04)bl.push({x:Math.random(),y:Math.random(),t:null})
ST.sonar=bl.filter((function(p){var a=Math.atan2(p.y*S-cy,p.x*S-cx),d=((ang-a)%6.283+6.283)%6.283
if(p.t==null&&d<.1)p.t=t
if(p.t==null)return bl.length<30
var age=(t-p.t)/1500
if(age>1)return false
ctx.fillStyle=rgba(W1,1-age)
ctx.beginPath()
ctx.arc(p.x*S,p.y*S,2.6,0,7)
ctx.fill()
ctx.strokeStyle=rgba(C,(1-age)*.6)
ctx.beginPath()
ctx.arc(p.x*S,p.y*S,3+age*12,0,7)
ctx.stroke()
return true}))}}
var lastT=0
function bg(kind,ctx,S,beam,now){var dt=lastT?Math.min(.05,(now-lastT)/1e3):.016
lastT=now;(BG[kind]||BG.grid)(ctx,S,beam,now,dt)}function text(kind,o){return(TXT[kind]||TXT.grid)(o||{})}function Beam(){this.x=.15+Math.random()*.7
this.y=Math.random()<.5?.22:.74
this.vx=(Math.random()<.5?-1:1)*.11
this.vy=(Math.random()<.5?-1:1)*.08
this.a=Math.random()*3.14
this.va=.2*(Math.random()<.5?-1:1)}Beam.prototype.step=function(dt){this.x+=this.vx*dt
this.y+=this.vy*dt
this.a+=this.va*dt
var m=.045
if(this.x<m||this.x>1-m){this.vx=-this.vx
this.x=Math.max(m,Math.min(1-m,this.x))
this.hit=1}if(this.y<m||this.y>1-m){this.vy=-this.vy
this.y=Math.max(m,Math.min(1-m,this.y))
this.hit=1}}
function drawBeam(ctx,S,b){var dx=Math.cos(b.a),dy=Math.sin(b.a),L=2,x0=(b.x-dx*L)*S,y0=(b.y-dy*L)*S,x1=(b.x+dx*L)*S,y1=(b.y+dy*L)*S,cx=b.x*S,cy=b.y*S,r=Math.max(10,S*.028)
ctx.save()
ctx.lineCap='round'
ctx.shadowColor='rgba(45,225,255,.9)'
ctx.shadowBlur=14
ctx.strokeStyle='rgba(45,225,255,.7)'
ctx.lineWidth=6;[[x0,y0,cx-dx*r,cy-dy*r],[cx+dx*r,cy+dy*r,x1,y1]].forEach((function(l){ctx.beginPath()
ctx.moveTo(l[0],l[1])
ctx.lineTo(l[2],l[3])
ctx.stroke()}))
ctx.shadowBlur=6
ctx.strokeStyle='rgba(255,255,255,.92)'
ctx.lineWidth=2;[[x0,y0,cx-dx*r,cy-dy*r],[cx+dx*r,cy+dy*r,x1,y1]].forEach((function(l){ctx.beginPath()
ctx.moveTo(l[0],l[1])
ctx.lineTo(l[2],l[3])
ctx.stroke()}))
ctx.shadowBlur=12
ctx.strokeStyle='rgba(225,252,255,.95)'
ctx.lineWidth=2.4
ctx.beginPath()
ctx.arc(cx,cy,r,0,7)
ctx.stroke()
ctx.shadowBlur=0
ctx.lineWidth=1.6
ctx.beginPath()
ctx.moveTo(cx-3.5,cy-3.5)
ctx.lineTo(cx+3.5,cy+3.5)
ctx.moveTo(cx+3.5,cy-3.5)
ctx.lineTo(cx-3.5,cy+3.5)
ctx.stroke()
ctx.restore()}function demo(el,kind,opts){var cv=document.createElement('canvas'),tx=document.createElement('div')
tx.className='swt-t'
var wrap=document.createElement('div')
wrap.className='swt'
wrap.appendChild(cv)
wrap.appendChild(tx)
el.appendChild(wrap)
tx.innerHTML=text(kind,opts)
var ctx=cv.getContext('2d'),b=new Beam,last=performance.now(),st={},own={}
function frame(now){requestAnimationFrame(frame)
var r=wrap.getBoundingClientRect(),S=Math.round(r.width),dpr=Math.min(2,devicePixelRatio||1)
if(cv.width!==S*dpr){cv.width=S*dpr
cv.height=S*dpr}var dt=Math.min(.05,(now-last)/1e3)
last=now
b.step(dt)
ctx.setTransform(dpr,0,0,dpr,0,0)
ctx.clearRect(0,0,S,S)
var keep=ST
ST=own
BG[kind](ctx,S,b,now,dt)
own=ST
ST=keep
drawBeam(ctx,S,b)}requestAnimationFrame(frame)
return{beam:b}}var GS={}
function gbg(ctx,S){var g=ctx.createRadialGradient(S*.5,S*.42,0,S*.5,S*.5,S*.78)
g.addColorStop(0,'#0c3b3d')
g.addColorStop(1,'#03141a')
ctx.fillStyle=g
ctx.fillRect(0,0,S,S)}function hole(S){var fs=Math.max(22,S*.074)
return[S*.5-S*.4,S*.5-fs*.9,S*.5+S*.4,S*.5+fs*.9]}function inH(h,x,y){return x>h[0]&&x<h[2]&&y>h[1]&&y<h[3]}function edgeFade(x,y){var d=Math.max(Math.abs(x-.5),Math.abs(y-.5))*2
return 1-Math.pow(Math.max(0,d-.55)/.45,1.6)*.75}function segs(S,n,h,cb){var s=S/n
for(var i=1;i<n;i++)for(var j=0;j<n;j++){cb(i*s,j*s,i*s,(j+1)*s,'v'+i+'_'+j)
cb(j*s,i*s,(j+1)*s,i*s,'h'+i+'_'+j)}}function heat(key,b,S,mx,my,dt,rad,dec){var st=GS[key]=GS[key]||{}
return function(id){var v=st[id]||0,d=bd(b,mx/S,my/S),h=Math.max(0,1-d/rad)
v=Math.max(v*Math.pow(dec,dt),h*h)
st[id]=v
return v}}var GRID={glow:function(ctx,S,b,t,dt){var h=hole(S),n=12,s=S/n
ctx.strokeStyle='rgba(94,234,212,.05)'
ctx.lineWidth=1
for(var i=0;i<n;i++){var p=(i+.5)*s
ctx.beginPath()
ctx.moveTo(p,0)
ctx.lineTo(p,S)
ctx.moveTo(0,p)
ctx.lineTo(S,p)
ctx.stroke()}for(i=1;i<n;i++)for(var j=1;j<n;j++){var x=i*s,y=j*s
if(inH(h,x,y))continue
var q=Math.max(0,1-bd(b,x/S,y/S)/.07),f=edgeFade(x/S,y/S),z=2.6+2.6*q
ctx.strokeStyle='rgba('+(q>.3?'225,255,250':'120,240,222')+','+((.32+.68*q)*f).toFixed(3)+')'
ctx.lineWidth=1.2+q
if(q>.2){ctx.shadowColor='rgba(94,234,212,.9)'
ctx.shadowBlur=8*q}else ctx.shadowBlur=0
ctx.beginPath()
ctx.moveTo(x-z,y)
ctx.lineTo(x+z,y)
ctx.moveTo(x,y-z)
ctx.lineTo(x,y+z)
ctx.stroke()}ctx.shadowBlur=0
var v=ctx.createRadialGradient(S/2,S/2,S*.3,S/2,S/2,S*.75)
v.addColorStop(0,'rgba(2,14,16,0)')
v.addColorStop(1,'rgba(2,14,16,.45)')
ctx.fillStyle=v
ctx.fillRect(0,0,S,S)},neon:function(ctx,S,b,t,dt){var h=hole(S),n=12,s=S/n,sh=t/5200%1*2.6-.8
ctx.save()
ctx.globalCompositeOperation='lighter'
segs(S,n,h,(function(x0,y0,x1,y1){var mx=(x0+x1)/2,my=(y0+y1)/2
if(inH(h,mx,my))return
var k=Math.max(0,1-Math.abs((mx+my)/S/2-sh)/.1)
if(k<.03)return
ctx.strokeStyle='rgba(94,234,212,'+(.45*k).toFixed(3)+')'
ctx.shadowColor='rgba(94,234,212,.9)'
ctx.shadowBlur=8*k
ctx.lineWidth=1.4
ctx.beginPath()
ctx.moveTo(x0,y0)
ctx.lineTo(x1,y1)
ctx.stroke()}))
ctx.restore()
ctx.shadowBlur=0
for(var i=1;i<n;i++)for(var j=1;j<n;j++){var x=i*s,y=j*s
if(inH(h,x,y))continue
var q=Math.max(0,1-bd(b,x/S,y/S)/.05)
ctx.fillStyle='rgba(210,255,248,'+(.32+.68*q).toFixed(3)+')'
ctx.beginPath()
ctx.arc(x,y,1.4+2*q,0,7)
ctx.fill()}},hud:function(ctx,S,b,t,dt){var h=hole(S),n=12,s=S/n,ci=Math.floor(b.x*n),cj=Math.floor(b.y*n),cs=GS.hudc=GS.hudc||{}
cs[ci+'_'+cj]=1
for(var key in cs){cs[key]*=Math.pow(.3,dt)
if(cs[key]<.02){delete cs[key]
continue}var p=key.split('_'),cx=+p[0]*s,cy=+p[1]*s
if(inH(h,cx+s/2,cy+s/2))continue
ctx.fillStyle='rgba(94,234,212,'+(.16*cs[key]).toFixed(3)+')'
ctx.fillRect(cx+1,cy+1,s-2,s-2)}var bw=Math.max(11,S*.031)+1,m=bw+S*.025,c=S*.07
ctx.strokeStyle='rgba(94,234,212,.32)'
ctx.lineWidth=1
for(var i=1;i<n*4;i++){var q=i*s/4,L=i%4?3:7
if(q<bw||q>S-bw)continue
ctx.beginPath()
ctx.moveTo(q,bw)
ctx.lineTo(q,bw+L)
ctx.moveTo(q,S-bw)
ctx.lineTo(q,S-bw-L)
ctx.moveTo(bw,q)
ctx.lineTo(bw+L,q)
ctx.moveTo(S-bw,q)
ctx.lineTo(S-bw-L,q)
ctx.stroke()}ctx.strokeStyle='rgba(160,255,240,.7)'
ctx.lineWidth=2;[[m,m,1,1],[S-m,m,-1,1],[m,S-m,1,-1],[S-m,S-m,-1,-1]].forEach((function(q){ctx.beginPath()
ctx.moveTo(q[0],q[1]+c*q[3])
ctx.lineTo(q[0],q[1])
ctx.lineTo(q[0]+c*q[2],q[1])
ctx.stroke()}))}}
var glt=0
window.SvGrid={draw:function(style,ctx,S,b,now){var dt=glt?Math.min(.05,(now-glt)/1e3):.016
glt=now;(GRID[style]||GRID.glow)(ctx,S,b,now,dt)},styles:['glow','neon','hud']}
var BS={}
function rnd(seed){var x=Math.sin(seed)*43758.5453
return x-Math.floor(x)}var BGN={aurora:function(ctx,S,b,t){ctx.fillStyle='#021214'
ctx.fillRect(0,0,S,S)
ctx.save()
ctx.globalCompositeOperation='lighter';[[.25,'13,148,136',7e3,0],[.55,'37,99,235',9e3,2],[.78,'101,163,13',8e3,4]].forEach((function(L){for(var k=0;k<3;k++){var y0=(L[0]+.06*Math.sin(t/L[2]+k+L[3]))*S,amp=S*.09,ph=t/(L[2]*.6)+k*1.7
ctx.beginPath()
ctx.moveTo(0,y0)
for(var x=0;x<=S;x+=S/24)ctx.lineTo(x,y0+Math.sin(x/S*5+ph)*amp*(.6+.4*Math.sin(ph*.7+x/S*2)))
var near=Math.max(0,1-Math.abs(y0/S-b.y)/.35)
ctx.strokeStyle='rgba('+L[1]+','+(.2+.16*near).toFixed(3)+')'
ctx.lineWidth=S*(.07-k*.018)
ctx.filter='blur('+Math.round(S*.03)+'px)'
ctx.stroke()}}))
ctx.filter='none'
ctx.restore()
var v=ctx.createRadialGradient(S/2,S/2,S*.25,S/2,S/2,S*.75)
v.addColorStop(0,'rgba(2,14,16,0)')
v.addColorStop(1,'rgba(2,14,16,.6)')
ctx.fillStyle=v
ctx.fillRect(0,0,S,S)},stars:function(ctx,S,b,t){var g=ctx.createRadialGradient(S*.5,S*.4,0,S*.5,S*.5,S*.8)
g.addColorStop(0,'#08302f')
g.addColorStop(1,'#020c0e')
ctx.fillStyle=g
ctx.fillRect(0,0,S,S)
var dx=Math.cos(b.a),dy=Math.sin(b.a)
for(var i=0;i<140;i++){var x=(rnd(i*3.1)+t/9e4*(.3+rnd(i)))%1,y=(rnd(i*7.7)+t/14e4*(.2+rnd(i*2)))%1,z=rnd(i*5.3)
var near=Math.max(0,1-bd(b,x,y)/.05),tw=.5+.5*Math.sin(t/(600+z*900)+i)
var a=(.18+.45*z)*(.6+.4*tw)+.8*near,r=.5+1.3*z+1.4*near
ctx.fillStyle='rgba('+(near>.2?'220,255,250':'170,240,230')+','+Math.min(1,a).toFixed(3)+')'
ctx.beginPath()
ctx.arc(x*S,y*S,r,0,7)
ctx.fill()
if(near>.15){ctx.strokeStyle='rgba(94,234,212,'+(near*.7).toFixed(3)+')'
ctx.lineWidth=1
var L=10*near
ctx.beginPath()
ctx.moveTo(x*S-dx*L,y*S-dy*L)
ctx.lineTo(x*S+dx*L,y*S+dy*L)
ctx.stroke()}}},trail:function(ctx,S,b,t){var st=BS.trail
if(!st||st.S!==S){var c=document.createElement('canvas')
c.width=c.height=S
st=BS.trail={S:S,c:c,g:c.getContext('2d'),last:t}}var dt=Math.min(.05,(t-st.last)/1e3)
st.last=t
var g2=st.g
g2.globalCompositeOperation='destination-out'
g2.fillStyle='rgba(0,0,0,'+Math.min(.5,dt*.9).toFixed(3)+')'
g2.fillRect(0,0,S,S)
g2.globalCompositeOperation='lighter'
var dx=Math.cos(b.a),dy=Math.sin(b.a)
var gr=g2.createLinearGradient(b.x*S-dy*16,b.y*S+dx*16,b.x*S+dy*16,b.y*S-dx*16)
gr.addColorStop(0,'rgba(94,234,212,0)')
gr.addColorStop(.5,'rgba(94,234,212,'+(dt*1.6).toFixed(3)+')')
gr.addColorStop(1,'rgba(94,234,212,0)')
g2.strokeStyle=gr
g2.lineWidth=30
g2.beginPath()
g2.moveTo((b.x-dx*2)*S,(b.y-dy*2)*S)
g2.lineTo((b.x+dx*2)*S,(b.y+dy*2)*S)
g2.stroke()
var g=ctx.createRadialGradient(S*.5,S*.45,0,S*.5,S*.5,S*.78)
g.addColorStop(0,'#062a2b')
g.addColorStop(1,'#020e10')
ctx.fillStyle=g
ctx.fillRect(0,0,S,S)
ctx.drawImage(st.c,0,0)},dust:function(ctx,S,b,t){var g=ctx.createRadialGradient(S*.5,S*.45,0,S*.5,S*.5,S*.78)
g.addColorStop(0,'#07302f')
g.addColorStop(1,'#020e10')
ctx.fillStyle=g
ctx.fillRect(0,0,S,S)
var st=BS.dust
if(!st){st=BS.dust={p:[],last:t}
for(var i=0;i<230;i++)st.p.push({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.06,vy:(Math.random()-.5)*.06,z:Math.random(),ph:Math.random()*6.28,px:0,py:0})}var dt=Math.min(.05,(t-st.last)/1e3)
st.last=t
var dx=Math.cos(b.a),dy=Math.sin(b.a),T=t/1e3
ctx.save()
ctx.globalCompositeOperation='lighter'
st.p.forEach((function(p){p.px=p.x
p.py=p.y
p.vx+=Math.sin(T*(.7+p.z)+p.ph)*.05*dt
p.vy+=Math.cos(T*(.9+p.z*.6)+p.ph*1.3)*.05*dt
var px=p.x-b.x,py=p.y-b.y,off=px*dy-py*dx,d=Math.abs(off),pull=Math.max(0,1-d/.16)
p.vx+=-off*dy*pull*1.6*dt+dx*pull*.12*dt
p.vy+=off*dx*pull*1.6*dt+dy*pull*.12*dt
var cd=Math.hypot(px,py)
if(cd<.09){p.vx+=px/(cd+.01)*.25*dt
p.vy+=py/(cd+.01)*.25*dt}p.vx*=Math.pow(.55,dt)
p.vy*=Math.pow(.55,dt)
p.x+=p.vx*dt*4
p.y+=p.vy*dt*4
if(p.x<0){p.x+=1
p.px=p.x}if(p.x>1){p.x-=1
p.px=p.x}if(p.y<0){p.y+=1
p.py=p.y}if(p.y>1){p.y-=1
p.py=p.y}var glow=Math.max(0,1-d/.06),tw=.55+.45*Math.sin(T*(2+p.z*3)+p.ph),r=.7+1.5*p.z+1.8*glow
var a=Math.min(1,(.2+.45*p.z)*tw+.75*glow),col=glow>.3?'225,255,250':p.z>.7?'160,255,236':'94,234,212'
var sp=Math.hypot(p.x-p.px,p.y-p.py)*S
if(sp>.6){ctx.strokeStyle='rgba('+col+','+(a*.45).toFixed(3)+')'
ctx.lineWidth=r
ctx.lineCap='round'
ctx.beginPath()
ctx.moveTo(p.px*S-(p.x-p.px)*S*3,p.py*S-(p.y-p.py)*S*3)
ctx.lineTo(p.x*S,p.y*S)
ctx.stroke()}ctx.fillStyle='rgba('+col+','+a.toFixed(3)+')'
ctx.beginPath()
ctx.arc(p.x*S,p.y*S,r,0,7)
ctx.fill()
if(p.z>.85||glow>.5){var hg=ctx.createRadialGradient(p.x*S,p.y*S,0,p.x*S,p.y*S,r*5)
hg.addColorStop(0,'rgba(94,234,212,'+(a*.25).toFixed(3)+')')
hg.addColorStop(1,'rgba(94,234,212,0)')
ctx.fillStyle=hg
ctx.fillRect(p.x*S-r*5,p.y*S-r*5,r*10,r*10)}}))
ctx.restore()}}
window.SvBg={draw:function(k,ctx,S,b,now){(BGN[k]||BGN.aurora)(ctx,S,b,now)},kinds:['aurora','stars','trail','dust']}
window.SvWait={bg:bg,text:text,demo:demo,Beam:Beam,drawBeam:drawBeam,kinds:['grid','tiles','cross','hex','pulse','pool','topo','sonar']}})();(function(){var PIPS={1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]}
var FACES=[[1,'translateZ(H)',[0,0,1]],[6,'rotateY(180deg) translateZ(H)',[0,0,-1]],[3,'rotateY(90deg) translateZ(H)',[1,0,0]],[4,'rotateY(-90deg) translateZ(H)',[-1,0,0]],[2,'rotateX(90deg) translateZ(H)',[0,-1,0]],[5,'rotateX(-90deg) translateZ(H)',[0,1,0]]]
var L=function(){var v=[-.38,-.55,.74],n=Math.hypot(v[0],v[1],v[2])
return[v[0]/n,v[1]/n,v[2]/n]}()
function I(){return[[1,0,0],[0,1,0],[0,0,1]]}function mul(A,B){var C=[[0,0,0],[0,0,0],[0,0,0]]
for(var i=0;i<3;i++)for(var j=0;j<3;j++)C[i][j]=A[i][0]*B[0][j]+A[i][1]*B[1][j]+A[i][2]*B[2][j]
return C}function rot(ax,ang){var n=Math.hypot(ax[0],ax[1],ax[2])
if(!n||!ang)return I()
var x=ax[0]/n,y=ax[1]/n,z=ax[2]/n,c=Math.cos(ang),s=Math.sin(ang),t=1-c
return[[t*x*x+c,t*x*y-s*z,t*x*z+s*y],[t*x*y+s*z,t*y*y+c,t*y*z-s*x],[t*x*z-s*y,t*y*z+s*x,t*z*z+c]]}function ortho(M){var a=[M[0][0],M[1][0],M[2][0]],b=[M[0][1],M[1][1],M[2][1]],na=Math.hypot(a[0],a[1],a[2])
a=a.map((function(v){return v/na}))
var d=a[0]*b[0]+a[1]*b[1]+a[2]*b[2]
b=[b[0]-d*a[0],b[1]-d*a[1],b[2]-d*a[2]]
var nb=Math.hypot(b[0],b[1],b[2])
b=b.map((function(v){return v/nb}))
var c=[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]
return[[a[0],b[0],c[0]],[a[1],b[1],c[1]],[a[2],b[2],c[2]]]}function faceM(v,yaw){var B={1:I(),6:rot([0,1,0],Math.PI),3:rot([0,1,0],-Math.PI/2),4:rot([0,1,0],Math.PI/2),2:rot([1,0,0],-Math.PI/2),5:rot([1,0,0],Math.PI/2)}[v]
return mul(rot([0,0,1],yaw||0),B)}function make(size){var el=document.createElement('div')
el.className='d3'
el.style.setProperty('--z',size+'px')
var sh=document.createElement('i')
sh.className='d3s'
el.appendChild(sh)
var cube=document.createElement('div')
cube.className='d3c'
el.appendChild(cube)
var H=size/2,faces=[]
FACES.forEach((function(f){var core=document.createElement('i')
core.className='d3k'
core.style.transform=f[1].replace('H',H-.6+'px')
cube.appendChild(core)}))
FACES.forEach((function(f){var e=document.createElement('div')
e.className='d3f'
e.style.transform=f[1].replace('H',H+'px')
for(var k=0;k<9;k++){var p=document.createElement('i')
if(PIPS[f[0]].indexOf(k)>=0)p.className='on'
e.appendChild(p)}cube.appendChild(e)
faces.push([e,f[2],f[0]])}))
var o={el:el,cube:cube,sh:sh,size:size,M:I()}
o.setM=function(M){o.M=M
cube.style.transform='matrix3d('+[M[0][0],M[1][0],M[2][0],0,M[0][1],M[1][1],M[2][1],0,M[0][2],M[1][2],M[2][2],0,0,0,0,1].map((function(v){return v.toFixed(5)})).join(',')+')'
faces.forEach((function(f){var n=f[1],w=[M[0][0]*n[0]+M[0][1]*n[1]+M[0][2]*n[2],M[1][0]*n[0]+M[1][1]*n[1]+M[1][2]*n[2],M[2][0]*n[0]+M[2][1]*n[1]+M[2][2]*n[2]]
var b=w[0]*L[0]+w[1]*L[1]+w[2]*L[2]
f[0].style.setProperty('--s',(.42*(1-Math.max(0,b))).toFixed(3))}))}
o.top=function(){var best=-2,v=1
faces.forEach((function(f){var n=f[1],z=o.M[2][0]*n[0]+o.M[2][1]*n[1]+o.M[2][2]*n[2]
if(z>best){best=z
v=f[2]}}))
return v}
o.show=function(v,yaw){o.setM(faceM(v,yaw==null?(Math.random()-.5)*.5:yaw))}
o.pos=function(x,y,h){h=h||0
el.style.transform='translate('+(x-H).toFixed(1)+'px,'+(y-H-h*.35).toFixed(1)+'px) scale('+(1+h/160).toFixed(3)+')'
sh.style.transform='translate('+(3+h*.22).toFixed(1)+'px,'+(5+h*.5).toFixed(1)+'px) scale('+(1-Math.min(.4,h/300)).toFixed(3)+')'
sh.style.opacity=(.5-Math.min(.3,h/400)).toFixed(2)}
o.show(1,0)
return o}function easeOut(t,p){return 1-Math.pow(1-t,p||3)}function fly(d,x0,y0,x1,y1,v,ms,arc){var T=faceM(v,(Math.random()-.5)*.8),ax=[Math.random()-.5,Math.random()-.5,Math.random()-.5],A=Math.PI*(3+Math.random()*2),t0=performance.now()
arc=arc==null?70:arc
return new Promise((function(res){function f(now){var t=Math.min(1,(now-t0)/ms),e=easeOut(t,3),h=Math.sin(Math.PI*Math.min(1,t/.82))*arc*(t<.82?1:0)
if(t>.82)h=Math.abs(Math.sin((t-.82)/.18*Math.PI))*arc*.12
d.setM(mul(T,rot(ax,A*(1-easeOut(t,2.4)))))
d.pos(x0+(x1-x0)*e,y0+(y1-y0)*e,h)
if(t<1)requestAnimationFrame(f)
else{d.setM(T)
d.pos(x1,y1,0)
res()}}requestAnimationFrame(f)}))}function table(box,n,size,opts){opts=opts||{}
var D=[],r=size/2,alive=true
for(var i=0;i<n;i++){var d=make(size)
box.appendChild(d.el)
D.push({d:d,x:0,y:0,vx:0,vy:0,h:0,vh:0,w:[0,0,0],rest:0})}var W=0,Hh=0,idle=0,last=performance.now(),started=false
function throwAll(){var side=Math.random()<.5?-1:1
D.forEach((function(p,k){if(!started){p.x=side<0?W*.18:W*.82
p.y=Hh*(.35+k*.3)}var ang=side<0?(Math.random()-.5)*1.1:Math.PI+(Math.random()-.5)*1.1,sp=300+Math.random()*160
p.vx=Math.cos(ang)*sp
p.vy=Math.sin(ang)*sp
p.h=Math.max(p.h,2)
p.vh=260+Math.random()*120
p.w=[(Math.random()-.5)*26,(Math.random()-.5)*26,(Math.random()-.5)*10]}))
started=true
idle=0}function frame(now){if(!alive||!box.isConnected)return
requestAnimationFrame(frame)
var dt=Math.min(.033,(now-last)/1e3)
last=now
if(box.clientWidth!==W){W=box.clientWidth
Hh=box.clientHeight
if(!started)throwAll()}var cx=W/2,cy=Hh/2,a=W/2-r-(opts.pad||14),b=Hh/2-r-(opts.pad||14),moving=false
D.forEach((function(p){p.x+=p.vx*dt
p.y+=p.vy*dt
if(p.h>0||p.vh>0){p.vh-=1300*dt
p.h+=p.vh*dt
p.d.setM(mul(rot(p.w,Math.hypot(p.w[0],p.w[1],p.w[2])*dt),p.d.M))
if(p.h<=0){p.h=0
if(p.vh<-140){p.vh=-p.vh*.38
p.vx*=.82
p.vy*=.82
p.w=p.w.map((function(v){return v*.55}))}else p.vh=0}moving=true}else{var fr=Math.exp(-2.4*dt)
p.vx*=fr
p.vy*=fr
var sp=Math.hypot(p.vx,p.vy)
if(sp>2)p.d.setM(mul(rot([-p.vy,p.vx,0],sp*dt/r),p.d.M))
if(sp<70){var M=p.d.M,bc=0,bz=0
for(var c=0;c<3;c++)if(Math.abs(M[2][c])>Math.abs(bz)){bz=M[2][c]
bc=c}var u=[M[0][bc]*Math.sign(bz),M[1][bc]*Math.sign(bz),M[2][bc]*Math.sign(bz)],ang=Math.acos(Math.min(1,u[2]))
if(ang>.002)p.d.setM(ortho(mul(rot([u[1],-u[0],0],ang*Math.min(1,dt*(sp<15?14:6))),M)))
if(sp<6){p.vx=0
p.vy=0}}if(sp>6)moving=true}var ex=(p.x-cx)/a,ey=(p.y-cy)/b
if(ex*ex+ey*ey>1){var nx=(p.x-cx)/(a*a),ny=(p.y-cy)/(b*b),nn=Math.hypot(nx,ny)
nx/=nn
ny/=nn
var k2=1/Math.sqrt(ex*ex+ey*ey)
p.x=cx+(p.x-cx)*k2
p.y=cy+(p.y-cy)*k2
var dot=p.vx*nx+p.vy*ny
if(dot>0){p.vx=(p.vx-2*dot*nx)*.7
p.vy=(p.vy-2*dot*ny)*.7
p.w=[p.w[0]+ny*6,p.w[1]-nx*6,p.w[2]]}}}))
for(var i=0;i<D.length;i++)for(var j=i+1;j<D.length;j++){var A=D[i],B=D[j],dx=B.x-A.x,dy=B.y-A.y,dd=Math.hypot(dx,dy)
if(dd<size*1.05&&dd>0){var nx2=dx/dd,ny2=dy/dd,ov=(size*1.05-dd)/2
A.x-=nx2*ov
A.y-=ny2*ov
B.x+=nx2*ov
B.y+=ny2*ov
var rv=(B.vx-A.vx)*nx2+(B.vy-A.vy)*ny2
if(rv<0){var im=rv*.9
A.vx+=nx2*im
A.vy+=ny2*im
B.vx-=nx2*im
B.vy-=ny2*im}}}D.forEach((function(p){p.d.pos(p.x,p.y,p.h)}))
if(!moving){idle+=dt
if(idle>(opts.pause||1.8))throwAll()}}requestAnimationFrame(frame)
return{stop:function(){alive=false
D.forEach((function(p){p.d.el.remove()}))},dice:D}}function world(layer,getB,size){var D=[],r=size/2,last=performance.now(),alive=true,run=true
/* физика спит, когда все кубики лежат (раньше считала и двигала их каждый кадр всегда) */
function step(now){if(!alive||!layer.isConnected||!D.length||D.every(function(p){return p.rest&&p.h===0&&p.vh===0})){run=false
return}requestAnimationFrame(step)
var dt=Math.min(.033,(now-last)/1e3)
last=now
var B=getB()
D.forEach((function(p){p.x+=p.vx*dt
p.y+=p.vy*dt
if(p.h>0||p.vh>0){p.vh-=1300*dt
p.h+=p.vh*dt
p.d.setM(mul(rot(p.w,Math.hypot(p.w[0],p.w[1],p.w[2])*dt),p.d.M))
if(p.h<=0){p.h=0
if(p.vh<-90){p.vh=-p.vh*.48
p.vx*=.86
p.vy*=.86
p.w=[p.w[0]*.6+(Math.random()-.5)*8,p.w[1]*.6+(Math.random()-.5)*8,p.w[2]*.7]}else p.vh=0}}else{var sp0=Math.hypot(p.vx,p.vy),dec=sp0>0?Math.max(0,sp0-(55+sp0*.55)*dt)/sp0:0
p.vx*=dec
p.vy*=dec
var sp=Math.hypot(p.vx,p.vy)
if(sp>2)p.d.setM(mul(rot([-p.vy,p.vx,0],sp*dt/r),p.d.M))
if(sp<48){var M=p.d.M,bc=0,bz=0
for(var c=0;c<3;c++)if(Math.abs(M[2][c])>Math.abs(bz)){bz=M[2][c]
bc=c}var u=[M[0][bc]*Math.sign(bz),M[1][bc]*Math.sign(bz),M[2][bc]*Math.sign(bz)],ang=Math.acos(Math.min(1,u[2]))
if(ang>.002)p.d.setM(ortho(mul(rot([u[1],-u[0],0],ang*Math.min(1,dt*(sp<15?12:5))),M)))
else if(sp<6)p.rest=true
if(sp<6){p.vx=0
p.vy=0}}}if(Math.hypot(p.vx,p.vy)>6||p.h>0)p.rest=false
var m=r+3,hw=B.w/2,hh=B.h/2,RR=Math.min(B.R,hh),lx=hw-RR,dx0=p.x-B.cx,dy0=p.y-B.cy,nx=0,ny=0,out=false,X1=p.x,Y1=p.y
if(Math.abs(dx0)<=lx){var lim=hh-m
if(Math.abs(dy0)>lim){out=true
ny=Math.sign(dy0)
Y1=B.cy+ny*lim}}else{var ccx=Math.sign(dx0)*lx,qx=dx0-ccx,dd0=Math.hypot(qx,dy0),lim2=RR-m
if(dd0>lim2){out=true
nx=qx/dd0
ny=dy0/dd0
X1=B.cx+ccx+nx*lim2
Y1=B.cy+ny*lim2}}if(!out)p.inside=true
else if(p.inside){p.x=X1
p.y=Y1
var dot=p.vx*nx+p.vy*ny
if(dot>0){p.vx=(p.vx-2*dot*nx)*.74
p.vy=(p.vy-2*dot*ny)*.74
p.w=[p.w[0]+ny*10,p.w[1]-nx*10,p.w[2]+(Math.random()-.5)*8]
if(dot>160&&p.h<4)p.vh=Math.max(p.vh,dot*.35)}}}))
for(var i=0;i<D.length;i++)for(var j=i+1;j<D.length;j++){var A=D[i],C=D[j]
if(Math.abs(A.h-C.h)>size*.8)continue
var dx=C.x-A.x,dy=C.y-A.y,dd=Math.hypot(dx,dy),md=size*1.06
if(dd<md&&dd>0){var nx2=dx/dd,ny2=dy/dd,ma=A.rest?3:1,mc=C.rest?3:1,ov=md-dd
A.x-=nx2*ov*mc/(ma+mc)
A.y-=ny2*ov*mc/(ma+mc)
C.x+=nx2*ov*ma/(ma+mc)
C.y+=ny2*ov*ma/(ma+mc)
var rv=(C.vx-A.vx)*nx2+(C.vy-A.vy)*ny2
if(rv<0){var J=-1.75*rv/(1/ma+1/mc)
if(-rv>140){if(A.h<4)A.vh=Math.max(A.vh,-rv*.22/ma)
if(C.h<4)C.vh=Math.max(C.vh,-rv*.22/mc)
A.rest=C.rest=false}A.vx-=J/ma*nx2
A.vy-=J/ma*ny2
C.vx+=J/mc*nx2
C.vy+=J/mc*ny2
A.w=[A.w[0]-ny2*4,A.w[1]+nx2*4,A.w[2]]
C.w=[C.w[0]+ny2*4,C.w[1]-nx2*4,C.w[2]]}}}D.forEach((function(p){p.d.pos(p.x,p.y,p.h)}))}requestAnimationFrame(step)
return{dice:D,throw:function(x0,y0,tx,ty,cls){var d=make(size)
if(cls)d.el.classList.add(cls)
layer.appendChild(d.el)
var air=.42,sc=1.15+Math.random()*.35,p={d:d,x:x0,y:y0,h:24,vh:1300*air/2,vx:(tx-x0)/air*sc+(Math.random()-.5)*60,vy:(ty-y0)/air*sc+(Math.random()-.5)*60,w:[(Math.random()-.5)*30,(Math.random()-.5)*30,(Math.random()-.5)*12],rest:false,inside:false}
d.setM(mul(rot([Math.random(),Math.random(),Math.random()],Math.random()*6),I()))
D.push(p)
if(!run){run=true
last=performance.now()
requestAnimationFrame(step)}
return new Promise((function(res){var t0=performance.now();(function wait(){if(p.rest&&performance.now()-t0>600){setTimeout((function(){res(d.top())}),120)}else setTimeout(wait,80)})()}))},clear:function(){D.splice(0).forEach((function(p){p.d.el.style.transition='opacity .35s'
p.d.el.style.opacity='0'
setTimeout((function(){p.d.el.remove()}),400)}))},stop:function(){alive=false}}}window.Dice3D={make:make,fly:fly,table:table,world:world,faceM:faceM}})();(function(){var N_V=4
var FIX=window.__SCV_FIX||0,V=1
try{V=FIX||parseInt(localStorage.getItem('scv2'),10)||1}catch(e){}if(V>N_V)V=1
var H=document.documentElement
H.setAttribute('data-scv',V)
var DIA='<svg class="sv-dia" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#2a9ef1"/><path d="M7.5 8h9l2.6 3.3L12 18.5 4.9 11.3z" fill="#fff"/></svg>'
function q(s,r){return(r||document).querySelector(s)}function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,(function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]}))}function n2(v){return(Number(v)||0).toFixed(2)}function fmt(ms){var t=Math.max(0,Math.ceil(ms/1e3))
return'00:'+(t<10?'0':'')+t}var ARENA={1:{band:['#134e4a','#0b2a33'],glow:'band',acc:'94,234,212'},2:{band:['#134e4a','#0b2a33'],glow:'band',acc:'94,234,212'},3:{band:['#134e4a','#0b2a33'],glow:'band',acc:'94,234,212'},4:{band:['#134e4a','#0b2a33'],glow:'band',acc:'94,234,212'}}
var GMOD={1:'bg:dust',2:'bg:dust',3:'bg:dust',4:'bg:dust'},WTXT={1:'Ожидание раунда...',2:'Ожидание раунда...',3:'Ожидание раунда...',4:'Ожидание раунда...'}
var WAITK={1:'grid',2:'tiles',3:'sonar',4:'pulse',5:'grid'},TSTY={1:'punch2',2:'neon2',3:'punch3',4:'neon3',5:'punch2'}
var curWait=false
function bandPath(ctx,size,bw){ctx.beginPath()
ctx.rect(0,0,size,size)
ctx.rect(bw,bw,size-bw*2,size-bw*2)}function paintBand(ctx,size,bw){var A=ARENA[V],lg=ctx.createLinearGradient(0,0,size,size)
A.band.forEach((function(c,k){lg.addColorStop(k/(A.band.length-1),c)}))
ctx.save()
bandPath(ctx,size,bw)
ctx.fillStyle=lg
ctx.fill('evenodd')
ctx.clip('evenodd')
var hl=ctx.createLinearGradient(0,0,0,size)
hl.addColorStop(0,'rgba(255,255,255,.10)')
hl.addColorStop(.5,'rgba(255,255,255,0)')
hl.addColorStop(1,'rgba(0,0,0,.12)')
ctx.fillStyle=hl
ctx.fillRect(0,0,size,size)
ctx.restore()}function perim(s,size,bw){var m=bw/2,L=size-bw,P=L*4
s=(s%P+P)%P
if(s<L)return[m+s,m]
s-=L
if(s<L)return[size-m,m+s]
s-=L
if(s<L)return[size-m-s,size-m]
s-=L
return[m,size-m-s]}function toPerim(x,y,size,bw){var m=bw/2,L=size-bw,dL=x,dR=size-x,dT=y,dB=size-y,d=Math.min(dL,dR,dT,dB)
if(d===dT)return Math.max(0,Math.min(L,x-m))
if(d===dR)return L+Math.max(0,Math.min(L,y-m))
if(d===dB)return 2*L+Math.max(0,Math.min(L,size-m-x))
return 3*L+Math.max(0,Math.min(L,size-m-y))}function inner(p0,size,bw){var m=bw/2,e=.6
if(Math.abs(p0[1]-m)<e)return[p0[0],bw]
if(Math.abs(p0[0]-(size-m))<e)return[size-bw,p0[1]]
if(Math.abs(p0[1]-(size-m))<e)return[p0[0],size-bw]
return[bw,p0[1]]}function dome(ctx,c,bw,a,acc){var R=bw*.98,g=ctx.createRadialGradient(c[0],c[1],0,c[0],c[1],R)
g.addColorStop(0,'rgba(255,255,255,'+a.toFixed(3)+')')
g.addColorStop(.42,'rgba('+acc+','+(a*.95).toFixed(3)+')')
g.addColorStop(.82,'rgba('+acc+','+(a*.7).toFixed(3)+')')
g.addColorStop(1,'rgba('+acc+',0)')
ctx.fillStyle=g
ctx.beginPath()
ctx.arc(c[0],c[1],R,0,7)
ctx.fill()
ctx.strokeStyle='rgba(255,255,255,'+(a*.85).toFixed(3)+')'
ctx.lineWidth=1.4
ctx.beginPath()
ctx.arc(c[0],c[1],R*.9,0,7)
ctx.stroke()}function halfGlow(ctx,pin,p0,size,bw,a,acc){var horiz=Math.abs(p0[1]-bw/2)<.6||Math.abs(p0[1]-(size-bw/2))<.6,rx=bw*3,ry=bw
ctx.save()
ctx.translate(pin[0],pin[1])
if(!horiz)ctx.rotate(Math.PI/2)
ctx.scale(rx/ry,1)
var g=ctx.createRadialGradient(0,0,0,0,0,ry)
g.addColorStop(0,'rgba(255,255,255,'+a.toFixed(3)+')')
g.addColorStop(.35,'rgba('+acc+','+(a*.9).toFixed(3)+')')
g.addColorStop(1,'rgba('+acc+',0)')
ctx.fillStyle=g
ctx.beginPath()
ctx.arc(0,0,ry,0,7)
ctx.fill()
ctx.restore()}function blob(ctx,x,y,r,a,acc){var g=ctx.createRadialGradient(x,y,0,x,y,r)
g.addColorStop(0,'rgba(255,255,255,'+a.toFixed(3)+')')
g.addColorStop(.3,'rgba('+acc+','+(a*.85).toFixed(3)+')')
g.addColorStop(1,'rgba('+acc+',0)')
ctx.fillStyle=g
ctx.fillRect(x-r,y-r,r*2,r*2)}function glow(ctx,size,bw){var A=ARENA[V],now=performance.now(),pts=typeof _borderGlowPoints!=='undefined'?_borderGlowPoints:[]
for(var i=pts.length-1;i>=0;i--){var pt=pts[i],age=now-pt.t,T=A.glow==='run'?1100:A.glow==='drop'?1e3:800
if(age>T){if(age>1200)pts.splice(i,1)
continue}var a=Math.pow(Math.max(0,1-age/T),1.3),s0=toPerim(pt.x,pt.y,size,bw),p0=perim(s0,size,bw),pin=inner(p0,size,bw)
ctx.save()
ctx.globalCompositeOperation='lighter'
ctx.save()
bandPath(ctx,size,bw)
ctx.clip('evenodd')
if(A.glow==='flash'){ctx.fillStyle='rgba('+A.acc+','+(a*.3).toFixed(3)+')'
ctx.fillRect(0,0,size,size)}if(A.glow==='run'){var d=age/T*size*1.6;[s0+d,s0-d].forEach((function(s){var p=perim(s,size,bw)
blob(ctx,p[0],p[1],bw*3.2,a,A.acc)}))}else if(A.glow==='drop'){for(var k=0;k<3;k++){var ak=age-k*150,f=ak/760
if(ak<0||f>=1)continue
var dd=bw*(1.2+7.5*f),al=Math.pow(1-f,1.5)*(1-k*.22);[s0+dd,s0-dd].forEach((function(sx){var pp=perim(sx,size,bw)
halfGlow(ctx,inner(pp,size,bw),pp,size,bw,al*.9,A.acc)}))}}halfGlow(ctx,pin,p0,size,bw,a,A.acc)
ctx.restore()
if(A.glow==='spill'||A.glow==='ripple'){ctx.save()
ctx.beginPath()
ctx.rect(bw,bw,size-bw*2,size-bw*2)
ctx.clip()
var ix=Math.max(bw,Math.min(size-bw,p0[0])),iy=Math.max(bw,Math.min(size-bw,p0[1]))
if(A.glow==='spill')blob(ctx,ix,iy,bw*8,a*.55,A.acc)
else{var rr=bw*(1+9*(age/T))
ctx.strokeStyle='rgba('+A.acc+','+(a*.9).toFixed(3)+')'
ctx.lineWidth=3*a+1
ctx.beginPath()
ctx.arc(ix,iy,rr,0,7)
ctx.stroke()
ctx.strokeStyle='rgba(255,255,255,'+(a*.6).toFixed(3)+')'
ctx.lineWidth=1.2
ctx.beginPath()
ctx.arc(ix,iy,rr*.7,0,7)
ctx.stroke()}ctx.restore()}ctx.restore()}}var EMPTYW=null;(function(){var _e=window.drawScannerEmptyArenaState,_b=window.drawScannerArenaBase,_t=window.drawScannerWaitingText
if(typeof _e==='function')window.drawScannerEmptyArenaState=function(ctx,size,smp){var s=smp
try{s=s||getScannerSharedLobbyBeamSample()}catch(e){}var a=0
try{a=scannerLobbyLaserVisual.angle||0}catch(e){}var bw=Math.max(11,size*.031)+1
EMPTYW=s?{x:Math.max(bw,Math.min(size-bw,size*s.x))/size,y:Math.max(bw,Math.min(size-bw,size*s.y))/size,a:a}:null
var txt=window.__WAITTXT||WTXT[V]
if(txt){var o=Object.assign({},arguments[3]||{},{waitingText:txt})
arguments[3]=o
if(arguments.length<4)arguments.length=4}try{return _e.apply(this,arguments)}finally{EMPTYW=null}}
if(typeof _b==='function')window.drawScannerArenaBase=function(ctx,size){if(!EMPTYW||!window.SvWait)return _b.apply(this,arguments)
var gm=window.__GRIDMOD||GMOD[V]
if(gm&&gm.indexOf('bg:')===0&&window.SvBg){ctx.save()
ctx.beginPath()
ctx.rect(0,0,size,size)
ctx.clip()
SvBg.draw(gm.slice(3),ctx,size,EMPTYW,performance.now())
ctx.restore()
return}var r=_b.apply(this,arguments)
if(gm==='native'||!window.SvGrid)return r
ctx.save()
ctx.beginPath()
ctx.rect(0,0,size,size)
ctx.clip()
SvGrid.draw(gm,ctx,size,EMPTYW,performance.now())
ctx.restore()
return r}})()
function bwOf(size){return Math.max(11,size*.031)+1}window.drawScannerArenaBorderBackground=function(ctx,size){ctx.save()
ctx.globalAlpha=1
ctx.shadowBlur=0
ctx.globalCompositeOperation='source-over'
paintBand(ctx,size,bwOf(size))
ctx.restore()}
window.drawScannerArenaBorder=function(ctx,size){ctx.save()
ctx.globalAlpha=1
ctx.shadowBlur=0
ctx.shadowColor='transparent'
ctx.globalCompositeOperation='source-over'
var bw=bwOf(size)
paintBand(ctx,size,bw)
try{glow(ctx,size,bw)}catch(e){}ctx.restore()}
var maxCd=0,lastKey=null
function srvParts(){try{var m={}
window.__srvreq('./roundState').getAllParticipants().forEach((function(p){m[String(p.playerId)]=p}))
return m}catch(e){return{}}}function data(){var s=typeof scannerGridState!=='undefined'&&scannerGridState||{},pl=(s.players||[]).filter((function(p){return!p.left}))
var tot=pl.reduce((function(a,p){return a+(Number(p.stake)||0)}),0)||0,me=String(s.myPlayerId||''),SP=srvParts()
var list=pl.map((function(p){var a=''
try{a=getScannerPlayerAvatarHtml({name:p.name,avatar:p.avatar})}catch(e){a='<div class="scanner-player-avatar">'+esc((p.name||'?')[0])+'</div>'}var sp=SP[String(p.id)]||{},gifts=sp.gifts||[],gram=sp.gramStake!=null?Number(sp.gramStake):Number(p.stake)||0
return{id:String(p.id),name:p.name||'—',color:p.color||'#5eead4',stake:Number(p.stake)||0,share:tot?(Number(p.stake)||0)/tot*100:0,me:String(p.id)===me,ava:a,gifts:gifts,gram:gram,giftValue:Number(sp.giftValue)||0}}))
var byStake=list.slice().sort((function(a,b){return b.stake-a.stake}))
function tx(id){var e=document.getElementById(id)
return e?e.textContent.trim():''}function hp(k){var x=(tx('scanner'+k+'Multiplier').match(/x\s*([\d.,]+)/i)||[])[1]||''
return{n:tx('scanner'+k+'Name')||'—',v:tx('scanner'+k+'Amount').replace(/[^\d.,]/g,''),x:x?'x'+x:''}}var st=String(s.status||'idle'),key=(s.roundId||'')+'|'+st
if(key!==lastKey){lastKey=key
maxCd=0}var cd=Number(s.countdownMs)||0
if(cd>maxCd)maxCd=cd
var rn=((q('#scannerRoundNumberDisplay')||{}).textContent||'').match(/\d+/)
rn=rn?rn[0]:''
var mine=list.filter((function(p){return p.me}))[0],isCd=st==='countdown'
var wait=st==='idle'||st==='waiting'||!list.length&&st!=='finished'&&st!=='preparing_next_round'
var main=isCd?fmt(cd):{shuffling:'Перемешиваем',active:'Идёт',finished:'Итоги',preparing_next_round:'Скоро новый'}[st]||'Ожидание'
return{list:list,byStake:byStake,pot:Number(s.totalPot)||tot,n:list.length,st:st,cd:cd,isCd:isCd,wait:wait,timer:main,frac:maxCd&&isCd?Math.max(0,Math.min(1,cd/maxCd)):0,rn:rn,top:hp('TopDay'),last:hp('LastRound'),chance:mine?mine.share:0,inRound:!!mine,maxCd:maxCd,winner:s.winnerPlayerId?String(s.winnerPlayerId):null}}function lbl(d){return d.isCd?'Начало через':'Раунд №'+esc(d.rn)}
function gimg(g){var k=(g.giftType||'')+'-'+(g.number||'')
var u=window.__FR&&window.__FR[k]||''
if(!u){try{u=getGiftImageUrl(g)}catch(e){}}return'<img class="sv-gi" src="'+esc(u)+'" alt="" title="'+esc(g.giftTitle||'')+'">'}function gifts(p,max){max=max||3
var g=p.gifts.slice(0,max).map(gimg).join('')
return g+(p.gifts.length>max?'<i class="sv-gm">+'+(p.gifts.length-max)+'</i>':'')}function stake(p,compact){var hasG=p.gifts.length>0,hasM=p.gram>0
if(!hasG)return'<span class="sv-sk"><span class="sv-gr">'+DIA+n2(p.gram||p.stake)+'</span></span>'
var h='<span class="sv-sk'+(compact?' c':'')+'"><span class="sv-gs">'+gifts(p,2)+'</span>'
if(hasM)h+='<span class="sv-pl">+</span><span class="sv-gr">'+DIA+n2(p.gram)+'</span>'
else h+='<span class="sv-gv">≈'+n2(p.giftValue)+'</span>'
return h+'</span>'}function kind(p){return p.gifts.length&&p.gram>0?'подарки + GRAM':p.gifts.length?'подарки':'GRAM'}function ava(p,sz,ring){return'<span class="sv-av'+(ring?' ring':'')+'" style="--c:'+p.color+';--s:'+sz+'px">'+p.ava+'</span>'}function hl(d,cls){function c(k,t,o){
return'<div class="'+k+'"><small>'+t+'</small><b>'+esc(o.n)+'</b><em>'+esc(o.v)+DIA+'</em>'+(o.x?'<i class="x">'+esc(o.x)+'</i>':'')+'</div>'}return'<div class="sv-hl '+(cls||'')+'">'+c('a','Топ дня',d.top)+c('b','Последний',d.last)+'</div>'}function head(d,right){return'<div class="sv-h"><b>Игроки</b><i>'+d.n+'</i><span>'+(right||'Раунд №'+esc(d.rn))+'</span></div>'}function cls(p,d){
return(p.me?' me':'')+(d.winner===p.id?' win':'')}function rows(d,bars){if(!d.n)return'<div class="sv-empty">Пока никого — сделай первую ставку</div>'
return'<div class="sv-list">'+d.byStake.map((function(p){return'<div class="sv-r'+cls(p,d)+'" data-pid="'+esc(p.id)+'" style="--c:'+p.color+'">'+ava(p,34,true)+'<span class="nm"><b>'+esc(p.name)+(p.me?' · ты':'')+'</b>'+(bars?'<i class="sb"><i style="width:'+p.share.toFixed(1)+'%"></i></i>':'')+'<small>'+p.share.toFixed(1)+'% · '+kind(p)+'</small></span>'+stake(p)+'</div>'})).join('')+'</div>'}
function chips(d){return'<div class="sv-chips">'+(d.n?d.byStake.map((function(p){return'<span class="sv-chip'+cls(p,d)+'" data-pid="'+esc(p.id)+'" style="--c:'+p.color+'">'+ava(p,24)+'<b>'+esc(p.name)+'</b><em>'+p.share.toFixed(1)+'%</em>'+(p.gifts.length?'<span class="sv-gs s">'+gifts(p,2)+'</span>':'')+'</span>'})).join(''):'<span class="sv-empty sm">ждём игроков…</span>')+'</div>'}
function ringSvg(frac,r){var c=2*Math.PI*r
return'<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="'+r+'" class="t"/><circle cx="50" cy="50" r="'+r+'" class="f" stroke-dasharray="'+c.toFixed(1)+'" stroke-dashoffset="'+(c*(1-frac)).toFixed(1)+'"/></svg>'}var WMAP={1:3,2:3,3:7}
function waitHtml(k,d){var n=d.n,rn=esc(d.rn),sub=n?'за столом '+n+' из 2 — ждём ещё '+Math.max(0,2-n):'раунд начнётся, когда зайдут 2 игрока'
var slots='<span class="sv-slots">'+[0,1].map((function(i){var p=d.list[i]
return p?'<span class="on">'+ava(p,34)+'</span>':'<span>+</span>'})).join('')+'</span>'
return{1:'<div class="sv-w w1"><i class="rad"></i><b>Ожидание раунда</b><small>'+sub+'</small></div>',2:'<div class="sv-w w2"><i class="rp"></i><i class="rp d2"></i><i class="rp d3"></i>'+slots+'<b>Ждём игроков</b><small>раунд №'+rn+'</small></div>',3:'<div class="sv-w w3"><b>Раунд №'+rn+'</b><small>скоро старт<i class="dots"><i></i><i></i><i></i></i></small></div>',
4:'<div class="sv-w w4"><span class="coin">'+DIA+'</span><b>Сделай ставку первым</b><small>'+sub+'</small></div>',5:'<div class="sv-w w5"><i class="scan"></i><b>Сканер ждёт игроков</b><small>раунд №'+rn+'</small></div>',
6:'<div class="sv-w w6"><span class="orb"><i class="o1">'+(d.list[0]?ava(d.list[0],30):'+')+'</i><i class="o2">'+(d.list[1]?ava(d.list[1],30):'+')+'</i><em>VS</em></span><b>Ждём соперника</b><small>'+sub+'</small></div>',7:'<div class="sv-w w7"><i class="au a1"></i><i class="au a2"></i><i class="au a3"></i><small class="k">скоро</small><b>Раунд №'+rn+'</b><small>'+sub+'</small></div>',
8:'<div class="sv-w w8"><i class="lz"></i><i class="lz l2"></i><b>Лазер готов</b><small>'+sub+'</small></div>'}[k]}window.__svWait=waitHtml
function waitOv(d){return d.wait?waitHtml(WMAP[V],d):''}var PLATE='<div class="sv-plate"><div class="pi bank"><small>Банк</small><b>'+DIA+'<span>0.00</span></b></div><div class="pi tmr"><small>Старт</small><b>00:15</b></div>'+'<div class="pi ch"><small>Мой шанс</small><b>0.0%</b></div><div class="pi rd"><b>Раунд</b><i class="dot"></i></div></div>'
var potShown=0,potTo=0,potT0=0
function plateUpdate(root,d){var el=root&&root.querySelector('.sv-plate')
if(!el)return
var running=!d.wait&&!d.isCd&&d.n>0,pos={bank:'h',tmr:'h',ch:'h',rd:'h'}
if(!d.n)pos.tmr='c'
else if(!running){pos.bank='l'
if(d.inRound){pos.tmr='c'
pos.ch='r'}else pos.tmr='r'}else if(d.inRound){pos.bank='l'
pos.rd='c'
pos.ch='r'}else{pos.bank='l'
pos.rd='r'}el.dataset.tmr=pos.tmr;['bank','tmr','ch','rd'].forEach((function(k){var c=el.querySelector('.pi.'+k)
if(c.dataset.p!==pos[k])c.dataset.p=pos[k]}))
el.querySelector('.tmr b').textContent=d.isCd?fmt(d.cd):fmt(d.maxCd||15e3)
el.querySelector('.ch b').textContent=d.chance.toFixed(1)+'%'
el.querySelector('.rd').classList.toggle('done',d.st==='finished'||d.st==='preparing_next_round')
if(Math.abs(d.pot-potTo)>.001){potShown=currentPot()
potTo=d.pot
potT0=performance.now()
potKick()}}function currentPot(){var t=Math.min(1,(performance.now()-potT0)/600)
return potShown+(potTo-potShown)*(1-Math.pow(1-t,3))}/* банк докручивается только пока меняется (раньше цикл шёл каждый кадр всегда) */
var potRun=false
function potLoop(){var v=currentPot()
document.querySelectorAll('.sv-plate .bank b span').forEach((function(e){var s2=n2(v)
if(e.textContent!==s2)e.textContent=s2}))
if(performance.now()-potT0<700)requestAnimationFrame(potLoop)
else potRun=false}function potKick(){if(!potRun){potRun=true;requestAnimationFrame(potLoop)}}potKick()
var lastSec=null
function cdUpdate(d){var el=box.cd
if(!el)return
var sec=d.isCd&&d.n>0?Math.max(0,Math.ceil(d.cd/1e3)):null
if(sec===lastSec)return
var old=el.querySelector('.d:not(.out)')
if(old){old.classList.add('out')
setTimeout((function(){old.remove()}),650)}if(sec==null&&lastSec!=null&&lastSec<=1){var b=document.createElement('i')
b.className='go'
el.appendChild(b)
setTimeout((function(){b.remove()}),900)}if(sec!=null){var n=document.createElement('span')
n.className='d'+(sec<=3?' hot':'')
n.textContent=sec
el.appendChild(n)}lastSec=sec}function pcards(d){if(!d.n)return'<div class="sv-empty">Пока никого — сделай первую ставку</div>'
return'<div class="sv-mc">'+d.byStake.map((function(p){var c=2*Math.PI*21
return'<div class="m'+cls(p,d)+'" data-pid="'+esc(p.id)+'" style="--c:'+p.color+'"><span class="ra"><svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="21" class="t"/><circle cx="25" cy="25" r="21" class="f" stroke-dasharray="'+(c*p.share/100).toFixed(1)+' '+c.toFixed(1)+'"/></svg>'+ava(p,34)+'</span><b>'+esc(p.name)+'</b><em>'+p.share.toFixed(1)+'%</em>'+stake(p,true)+'</div>'
})).join('')+'</div>'}function donut2(d){var R0=78,C=2*Math.PI*R0,gap=d.n>1?3:0,off=0,segs='',avs='',minL=5
var tot=d.byStake.reduce((function(a,p){return a+Math.max(p.share,0)}),0)||1
var Ls=d.byStake.map((function(p){return Math.max(minL+gap,C*p.share/tot)})),sum=Ls.reduce((function(a,b){return a+b}),0),k=C/(sum||1)
d.byStake.forEach((function(p,i){var L=Ls[i]*k,mid=(off+L/2)/C*360-90,rad=mid*Math.PI/180
segs+='<circle cx="100" cy="100" r="'+R0+'" class="sg'+(p.me?' me':'')+(d.winner===p.id?' win':'')+'" style="--c:'+p.color+'" stroke-dasharray="'+Math.max(.5,L-gap).toFixed(2)+' '+C.toFixed(2)+'" stroke-dashoffset="'+(-off).toFixed(2)+'"/>'
if(p.share>=4)avs+='<span class="dv" data-pid="'+esc(p.id)+'" style="left:'+(50+48.5*Math.cos(rad)).toFixed(2)+'%;top:'+(50+48.5*Math.sin(rad)).toFixed(2)+'%">'+ava(p,24,true)+'</span>'
off+=L}))
var running=!d.wait&&!d.isCd&&d.n>0
return'<div class="sv-dn3"><div class="sv-h"><b>Игроки</b><i>'+d.n+'</i><span>Раунд №'+esc(d.rn)+'</span></div>'+'<div class="rg3"><svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="'+R0+'" class="bg"/>'+segs+'</svg>'+avs+'<span class="ctr"><small>Банк</small><b>'+DIA+n2(d.pot)+'</b>'+(d.inRound?'<em class="mc">мой шанс '+d.chance.toFixed(1)+'%</em>':'')+(running?'<em class="live">Раунд<i></i></em>':'')+'</span></div>'+rows(d,true)+'</div>'
}var R={1:function(d){return{top:hl(d,'two sm'),bottom:head(d)+rows(d)}},2:function(d){return{top:hl(d,'two sm'),bottom:head(d)+rows(d)}},3:function(d){return{under:'<div class="sv-h"><b>Игроки</b><i>'+d.n+'</i><span>Раунд №'+esc(d.rn)+'</span></div>'+pcards(d)+hl(d,'two sm')}},4:function(d){return{under:donut2(d),bottom:hl(d,'two sm')}},5:function(d){return{top:hl(d,'two sm'),
bottom:head(d)+rows(d)}}}
var sheet=null
function openStake(pid){var d=data(),p=d.list.filter((function(x){return x.id===pid}))[0]
if(!p)return
if(!sheet){sheet=document.createElement('div')
sheet.id='svSheet'
document.body.appendChild(sheet)
sheet.addEventListener('click',(function(e){if(e.target===sheet||e.target.closest('.x')){sheet.classList.remove('open')}}))}var tiles=p.gifts.map((function(g){return'<span class="t">'+gimg(g)+'<b>'+esc(g.giftTitle||g.giftType)+'</b><small>#'+esc(g.number)+'</small><em>'+DIA+n2(g.value)+'</em></span>'})).join('')
if(p.gram>0)tiles+='<span class="t gr"><span class="gi">'+DIA+'</span><b>GRAM</b><small>'+(p.gifts.length?'доплата':'ставка')+'</small><em>'+DIA+n2(p.gram)+'</em></span>'
sheet.innerHTML='<div class="sh"><i class="grab"></i><div class="hd">'+ava(p,46,true)+'<span><b>'+esc(p.name)+(p.me?' · ты':'')+'</b><small>раунд №'+esc(d.rn)+' · шанс '+p.share.toFixed(1)+'%</small></span><button type="button" class="x">✕</button></div>'+'<div class="sum"><span><small>ставка · '+kind(p)+'</small><b>'+DIA+n2(p.stake)+'</b></span><span class="r"><small>'+(p.gifts.length?'подарков':'')+'</small><b>'+(p.gifts.length||'')+'</b></span></div>'+'<div class="grid">'+tiles+'</div></div>'
requestAnimationFrame((function(){sheet.classList.add('open')}))}document.addEventListener('click',(function(e){var t=e.target.closest&&e.target.closest('[data-pid]')
if(t&&t.closest('.sv-bottom, .sv-under, .sv-top')){e.stopPropagation()
openStake(t.getAttribute('data-pid'))}}),true)
var box={}
function ensure(){var sec=q('#scannerScreen .scanner-arena-card'),shell=q('#scannerScreenCanvasShell')
if(!sec||!shell)return false
if(!box.top){box.top=document.createElement('div')
box.top.className='sv-top'
sec.parentNode.insertBefore(box.top,sec)
box.plate=document.createElement('div')
box.plate.className='sv-peek t plt'
box.plate.innerHTML=PLATE
if(V===2){box.plate.className='sv-peek b plb'
sec.parentNode.insertBefore(box.plate,sec.nextSibling)}else sec.parentNode.insertBefore(box.plate,sec)
if(V===3||V===4)box.plate.style.display='none'
box.plate.style.setProperty('--b1',ARENA[V].band[0])
box.plate.style.setProperty('--b2',ARENA[V].band[1])
box.under=document.createElement('div')
box.under.className='sv-under'
sec.parentNode.insertBefore(box.under,sec.nextSibling)
box.bottom=document.createElement('div')
box.bottom.className='sv-bottom'
box.under.parentNode.insertBefore(box.bottom,box.under.nextSibling)
if(V===2)sec.parentNode.insertBefore(box.plate,sec.nextSibling)
box.over=document.createElement('div')
box.over.className='sv-over'
shell.appendChild(box.over)
box.wo=document.createElement('div')
box.wo.className='sv-wo'
shell.appendChild(box.wo)
box.tm=document.createElement('div')
box.tm.className='sv-tm'
shell.appendChild(box.tm)
box.timer=null
if(V===3){box.isl=document.createElement('div')
box.isl.className='sv-isl'
box.isl.innerHTML=PLATE
shell.appendChild(box.isl)}}return true}var lastH={}
function put(k,h){if(lastH[k]!==h){lastH[k]=h
box[k].innerHTML=h}}var wwRound=null
function winCheck(){var g=typeof scannerGridState!=='undefined'&&scannerGridState||{},rd=g.roundData||{}
if(g.status!=='finished'||!window.WinWin||!rd.winnerName||wwRound===rd.id)return
wwRound=rd.id
var parts=[]
try{parts=window.__srvreq('./roundState').getAllParticipants()}catch(e){}var gifts=[]
parts.forEach((function(p){(p.gifts||[]).forEach((function(x){var k=(x.giftType||'')+'-'+(x.number||'')
gifts.push({img:window.__FR&&window.__FR[k]||'',title:x.giftTitle,number:x.number,value:x.value})}))}))
var gv=gifts.reduce((function(a,x){return a+(Number(x.value)||0)}),0),tot=Number(rd.winnerPayout)||0,wp=g.winningPlayer||{}
var av=''
try{av=getScannerPlayerAvatarHtml({name:rd.winnerName,avatar:wp.avatar})}catch(e){}WinWin.show({name:rd.winnerName,color:wp.color||'#5eead4',avaHtml:av,line:'шанс: <b style="color:#cfe9e5">'+(Number(wp.sharePercent)||0).toFixed(2)+'%</b>',total:tot,gram:Math.max(0,tot-gv),gifts:gifts,stake:Number(rd.winnerStake)||0})}var waitW=null
function tick(){winCheck()
if(!ensure())return
var d=data(),o=R[V](d)
curWait=d.wait;['top','under','bottom'].forEach((function(k){put(k,o[k]||'')}))
var sub=d.n?'за столом '+d.n+' из 2 — ждём ещё '+Math.max(0,2-d.n):'раунд начнётся, когда зайдут 2 игрока'
var wt=''
if(waitW!==wt){waitW=wt
box.wo.innerHTML=wt}if(V<=2||V===5)plateUpdate(box.plate,d)
else if(V===3)plateUpdate(box.isl,d)
box.plate.classList.toggle('hid',!d.n)
if(box.isl)box.isl.classList.toggle('hid',!d.n)
if(box.timer)box.timer.set(d.isCd&&d.n>0?Math.max(0,Math.ceil(d.cd/1e3)):null,d.maxCd?d.cd/d.maxCd:0)}setInterval(tick,200)
var idleT=0
setInterval((function(){var s=window.__demoSrv
if(!s)return
var st=s.getStatus()
if((st==='idle'||st==='waiting')&&!window.__svHold&&(!window.__SCV_APP||(document.getElementById('scannerScreen')||{}).offsetParent)){if(!idleT)idleT=Date.now()
if(Date.now()-idleT>6500){idleT=0
try{s.demoRound()}catch(e){}}}else idleT=0}),400)
function go(){try{setMenuView('scannerScreen')}catch(e){}}if(!window.__SCV_APP)window.addEventListener('load',(function(){setTimeout(go,3600)}))
var sw=document.createElement('div')
sw.id='svSw'
sw.innerHTML=Array.apply(null,Array(N_V)).map((function(_,i){return'<button type="button" data-v="'+(i+1)+'">'+(i+1)+'</button>'})).join('')
function mark(){sw.querySelectorAll('button').forEach((function(b){b.classList.toggle('on',+b.dataset.v===V)}))}sw.addEventListener('click',(function(e){var b=e.target.closest('button')
if(!b)return
e.stopPropagation()
V=+b.dataset.v
H.setAttribute('data-scv',V)
try{localStorage.setItem('scv2',V)}catch(er){}lastH={}
mark()
tick()
go()}))
function mount(){if(FIX)return
document.body.appendChild(sw)
mark()}if(document.body)mount()
else document.addEventListener('DOMContentLoaded',mount)})();(function(){var H=document.documentElement,N_V=4,V=1,FIX=window.__DCV_FIX||0
try{V=FIX||+localStorage.getItem('dcv')||1}catch(e){}if(V<1||V>N_V)V=1
H.setAttribute('data-dcv',V)
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,(function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]}))}function n2(v){return Number(v||0).toFixed(2)}function rnd(n){return 1+Math.floor(Math.random()*n)}function G(){return typeof CASE_GRAM_ICON_SVG!=='undefined'?CASE_GRAM_ICON_SVG:''}function gram(v,cls){
return'<span class="dv-g'+(cls?' '+cls:'')+'"><span class="dv-gi">'+G()+'</span>'+v+'</span>'}function ava(s){var a=''
try{a=getScannerPlayerAvatarHtml({name:s.name})}catch(e){}return'<span class="dv-av" style="--c:'+s.color+'">'+(a||'<span class="scanner-player-avatar">'+esc(s.name[0])+'</span>')+'</span>'}var FACE={1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]}
function die(v,cls){var h=''
for(var i=0;i<9;i++)h+='<i'+(FACE[v].indexOf(i)>=0?' class="on"':'')+'></i>'
return'<span class="dv-die'+(cls?' '+cls:'')+'">'+h+'</span>'}function gimg(g){var u=window.__FR&&window.__FR[g.slug]||''
return u?'<img src="'+u+'" alt="">':''}function gt(g,cls){return'<span class="dv-gt'+(cls?' '+cls:'')+'" title="'+esc(g.title)+'">'+gimg(g)+'</span>'}var ENTRY=10
var GP={plushpepe:['plushpepe-1837','Plush Pepe',1837,38.5],heartlocket:['heartlocket-369','Heart Locket',369,21.4],resistancedog:['resistancedog-2478','Resistance Dog',2478,6.2],durovsglasses:['durovsglasses-1081',"Durov's Glasses",1081,9.8],preciouspeach:['preciouspeach-881','Precious Peach',881,14.6],heroichelmet:['heroichelmet-3001','Heroic Helmet',3001,11.3],
scaredcat:['scaredcat-10596','Scared Cat',10596,4.9],lootbag:['lootbag-169','Loot Bag',169,17.2],durovscap:['durovscap-1966',"Durov's Cap",1966,26],mightyarm:['mightyarm-1721','Mighty Arm',1721,7.4]}
function gift(k){var g=GP[k]
return{slug:g[0],title:g[1],number:g[2],value:g[3]}}var BOTS=[{name:'nightowl',color:'#ff5d8f',stake:{gram:0,gifts:[gift('resistancedog'),gift('mightyarm')]}},{name:'Sasha_V',color:'#ffb547',stake:{gram:ENTRY,gifts:[]}},{name:'grammaster',color:'#34d17f',stake:{gram:5.1,gifts:[gift('scaredcat')]}},{name:'lucky_bobr',color:'#8b5cf6',stake:{gram:0,gifts:[gift('heroichelmet')]}},{name:'dice_king',
color:'#38bdf8',stake:{gram:ENTRY,gifts:[]}}]
var EMO=['🔥','😂','😱','👏','🎲']
var S=null,T=[],root=null,sheetEl=null
function later(fn,ms){var t=setTimeout((function(){var k=T.indexOf(t)
if(k>=0)T.splice(k,1)
fn()}),ms)
T.push(t)
return t}function clearT(){T.forEach(clearTimeout)
T=[]
if(S&&S.tick){clearInterval(S.tick)
S.tick=null}if(S&&S.tiv){clearInterval(S.tiv)
S.tiv=null}}function me(){try{var p=getCurrentPlayer()
return p.name||p.username||'Ты'}catch(e){return'Ты'}}function stakeVal(st){return(st.gram||0)+st.gifts.reduce((function(a,g){return a+g.value}),0)}function bank(){var gr=0,gifts=[]
S.seats.forEach((function(s){if(!s)return
gr+=s.stake.gram||0
s.stake.gifts.forEach((function(g){gifts.push(g)}))}))
return{gram:gr,gifts:gifts,total:gr+gifts.reduce((function(a,g){return a+g.value}),0)}}function kindOf(st){return st.gifts.length?st.gram?'gg':'g':'gram'}function kindLbl(st){return{gram:'GRAM',g:'подарки',gg:'подарки + GRAM'}[kindOf(st)]}function stake(st,max){var g=st.gifts,m=max||2
if(!g.length)return'<span class="dv-sk k-gram">'+gram(n2(st.gram))+'</span>'
return'<span class="dv-sk k-'+kindOf(st)+'"><span class="dv-gs">'+g.slice(0,m).map((function(x){return gt(x)})).join('')+(g.length>m?'<em>+'+(g.length-m)+'</em>':'')+'</span>'+(st.gram?'<span class="dv-plus">+</span>'+gram(n2(st.gram)):'<span class="dv-ap">≈'+n2(stakeVal(st))+'</span>')+'</span>'}var ROOMS_ON=!!window.__DCV_ROOMS,ROOMS=[{n:'Стол',ic:'1',min:.1,max:.1,chips:[.1,.1,.1,.1]},{n:'Стол',ic:'2',min:.5,max:.5,chips:[.5,.5,.5,.5]},{n:'Стол',ic:'3',min:1,max:1,chips:[1,1,1,1]},{n:'Стол',ic:'4',min:3,max:3,chips:[3,3,3,3]},{n:'Покер 21',pk:true,min:5,max:5,chips:[5,5,5,5]}],ROOM=0,JOIN=null,PICK=.25,BOTN=['nightowl','Sasha_V','grammaster','lucky_bobr','dice_king','Mira'],BOTC=['#ff5d8f','#ffb547','#34d17f','#8b5cf6','#38bdf8','#f472b6']
function rbot(k,used){var i
do{i=Math.floor(Math.random()*BOTN.length)}while(used[BOTN[i]])
used[BOTN[i]]=1
var R0=ROOMS[ROOM]
return{name:BOTN[i],color:BOTC[i],bot:true,dice:[],moves:[],sum:0,st:'ready',stake:{gram:R0.chips[Math.floor(Math.random()*R0.chips.length)],gifts:[]}}}function freeSeat(seats,pref){if(pref!=null&&!seats[pref])return pref
var f=[0,1,2,3,4,5].filter((function(i){return!seats[i]}))
return f.length?f[Math.floor(Math.random()*f.length)]:-1}function roomsNewRound(){clearT()
physClear()
if(window.WinWin)WinWin.hide()
var prev=S,seats=[null,null,null,null,null,null],used={},mi=-1
if(JOIN){mi=4
seats[4]={name:me(),color:'#34d6ff',me:true,dice:[],moves:[],sum:0,st:'ready',stake:{gram:JOIN,gifts:[]}}}var keep=prev&&prev.seats?prev.seats.filter((function(x){return x&&x.bot&&Math.random()<.5})):[]
keep.slice(0,2).forEach((function(b){used[b.name]=1
var k=freeSeat(seats)
seats[k]={name:b.name,color:b.color,bot:true,dice:[],moves:[],sum:0,st:'ready',stake:{gram:ROOMS[ROOM].chips[Math.floor(Math.random()*4)],gifts:[]}}}))
S={rid:Math.random(),me:mi,seats:seats,phase:'wait',turn:-1,timer:30,emo:{},cd:10,hist:prev&&prev.hist||roomHist(),feed:[],info:null,res:false,round:(prev?prev.round:1180)+1,used:used,idleT:0}
render()
S.tick=setInterval((function(){var n=S.seats.filter(Boolean).length
if(n<5&&Math.random()<(n<2?.35:.12)){var k=freeSeat(S.seats)
if(k>=0&&k!==4){S.seats[k]=rbot(k,S.used)
feed(S.seats[k].name+' сел за стол')
n++}}if(S.phase==='wait'){if(n>=2){S.phase='gather'
S.cd=10}}else if(S.phase==='gather'){S.cd--
if(S.cd<=0&&!S.idleBusy){clearInterval(S.tick)
S.tick=null
physClear()
deal()
return}if(S.cd<0)S.cd=0}idleTick()
render()}),1e3)}var IDLE_MS=3200
function idleTick(){if(!PHYS||!layer||!S||S.idleBusy||S.phase!=='wait'&&S.phase!=='gather')return
if(Date.now()<(S.idleAt||0))return
if(S.phase==='gather'&&S.cd*1e3<IDLE_MS+800)return
idleThrow()}function idleThrow(){var fe=root.querySelector('.kq1-felt')
if(!fe||!fe.offsetWidth)return
physClear()
var f=relOf(fe),W=world(),side=Math.random()<.5?-1:1,rid=S.rid,ps=[]
S.idleBusy=true
var done=function(){if(S&&S.rid===rid&&S.idleBusy){S.idleBusy=false
S.idleAt=Date.now()+1300}}
setTimeout(done,IDLE_MS+1500)
for(var k=0;k<2;k++)ps.push(W.throw(f.x+side*f.w*.36,f.y+(k-.5)*30,f.x-side*f.w*.1+(Math.random()-.5)*60,f.y+(Math.random()-.5)*40))
Promise.all(ps).then(done)}window.dvRoom=function(k){if(k===ROOM)return
var wasPk=ROOMS[ROOM].pk
ROOM=k
JOIN=null
PICK=ROOMS[k].chips[1]
ENTRY=ROOMS[k].min
swUpd()
if(wasPk&&window.pkStop)pkStop()
clearT()
physClear()
if(window.WinWin)WinWin.hide()
S=null
root.classList.toggle('pk-root',!!ROOMS[k].pk)
if(ROOMS[k].pk){root._in.innerHTML=''
root._in.style.display='none'
root._pk.style.display=''
if(window.pkStart)pkStart(root._pk,ROOMS[k].min)
return}root._pk.style.display='none'
root._pk.innerHTML=''
root._in.style.display=''
roomsNewRound()}
var SPADE='<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path fill="currentColor" d="M12 2.2c-.5 0-.9.3-1.3.7C8.4 5.4 3.8 8.6 3.8 12.6c0 2.6 2 4.5 4.4 4.5 1.3 0 2.4-.5 3.1-1.3-.2 2-.9 3.6-2.6 4.9-.3.2-.1.7.3.7h6c.4 0 .6-.5.3-.7-1.7-1.3-2.4-2.9-2.6-4.9.7.8 1.8 1.3 3.1 1.3 2.4 0 4.4-1.9 4.4-4.5 0-4-4.6-7.2-6.9-9.7-.4-.4-.8-.7-1.3-.7z"/></svg>'
function roomHead(){if(root._hd)return
root._hd=document.createElement('div')
root._hd.className='dv-head rm-h'
root._hd.innerHTML='<div class="dv-ti"><span><b>Кости 21</b><i class="dv-q">?</i></span><small class="dv-rn2"></small></div><div class="rm-sw">'+ROOMS.map((function(r,k){return'<button type="button" data-k="'+k+'" onclick="dvRoom('+k+')">'+(r.pk?'<i class="ic">'+SPADE+'</i><span>'+r.n+'</span>':'<span>'+r.n+'</span><i class="ic n">'+r.ic+'</i>')+'</button>'})).join('')+'</div>'
root.insertBefore(root._hd,root.firstChild)
root._ow=document.createElement('button')
root._ow.type='button'
root._ow.className='rm-own'
root._ow.setAttribute('onclick','dvOwnOpen()')
root._ow.innerHTML=OWN_BTN()
root.insertBefore(root._ow,root._hd.nextSibling)
root._pk=document.createElement('div')
root._pk.className='rm-pk'
root._pk.style.display='none'
root.insertBefore(root._pk,root._in.nextSibling)
swUpd()}function swUpd(){if(!root||!root._hd)return
root._hd.querySelectorAll('.rm-sw button').forEach((function(b){b.classList.toggle('on',+b.dataset.k===ROOM)}))
if(root._ow){root._ow.innerHTML=OWN_BTN()
root._ow.classList.toggle('on',!!(ROOMS[ROOM]&&ROOMS[ROOM].own))}}/* ===== Столы игроков: список чужих столов + создание своего (Кости 21 и Покер) ===== */
var OWN_IC='<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.2"/><path d="M3 19c.6-3.2 3-5 6-5s5.4 1.8 6 5"/><circle cx="17" cy="9" r="2.6"/><path d="M15.6 14.3c2.6-.4 4.8 1 5.4 4.2"/></svg>'
var LOCK='<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>'
var OWN_LIST=[{g:'d',t:'Стол Mira',h:'Mira',c:'#f472b6',e:.25,p:3},{g:'d',t:'Быстрые кости',h:'lucky_bobr',c:'#8b5cf6',e:.3,p:2},{g:'d',t:'Ночной стол',h:'nightowl',c:'#ff5d8f',e:.75,p:1},{g:'d',t:'Только свои',h:'grammaster',c:'#34d17f',e:1.5,p:2,lock:1},{g:'d',t:'Двадцать одно',h:'Sasha_V',c:'#ffb547',e:2.5,p:4},{g:'d',t:'High roller',h:'dice_king',c:'#38bdf8',e:10,p:6},
{g:'p',t:'Новички',h:'lucky_bobr',c:'#8b5cf6',e:1,p:5},{g:'p',t:'Покер у Миры',h:'Mira',c:'#f472b6',e:2,p:3},{g:'p',t:'Блеф-клуб',h:'grammaster',c:'#34d17f',e:7.5,p:4},{g:'p',t:'Киты',h:'dice_king',c:'#38bdf8',e:25,p:2}]
var OWN={g:'d',v:'list',cg:'d',ce:1,ct:'',cl:0},OWN_Q=[.1,.5,1,3,5,10,25],OWN_ST=[.1,.2,.25,.3,.5,.75,1,1.5,2,2.5,3,4,5,7.5,10,15,20,25,50,100]
function OWN_BTN(){var R0=ROOMS[ROOM]||{}
if(R0.own)return'<span class="ro-ic">'+OWN_IC+'</span><span class="ro-t"><b>«'+esc(R0.t)+'»</b><small>'+(R0.mine?'твой стол':'стол игрока')+' · вход '+n2(R0.min)+' GRAM</small></span><span class="ro-plus" aria-hidden="true">⇄</span>'
return'<span class="ro-ic">'+OWN_IC+'</span><span class="ro-t"><b>Столы игроков</b></span><span class="ro-plus" aria-hidden="true">+</span>'}
function ownEl(){var m=document.getElementById('rmOwn')
if(m)return m
m=document.createElement('div')
m.id='rmOwn'
m.className='ro-ov'
m.innerHTML='<div class="ro-bg" onclick="dvOwnClose()"></div><div class="ro-sh" role="dialog" aria-modal="true" aria-label="Столы игроков"></div>'
document.body.appendChild(m)
return m}
function ownHap(){try{Telegram.WebApp.HapticFeedback.selectionChanged()}catch(e){}}
window.dvOwnOpen=function(){var m=ownEl()
OWN.v='list'
var R0=ROOMS[ROOM]
if(R0)OWN.g=R0.pk?'p':'d'
ownR()
requestAnimationFrame((function(){m.classList.add('on')}))
ownHap()}
window.dvOwnClose=function(){var m=document.getElementById('rmOwn')
if(m)m.classList.remove('on')}
window.dvOwnG=function(g){OWN.g=g
ownHap()
ownR()}
window.dvOwnV=function(v){OWN.v=v
if(v==='new')OWN.cg=OWN.g
ownR()}
window.dvOwnCG=function(g){OWN.cg=g
ownR()}
window.dvOwnCL=function(l){OWN.cl=l==='l'?1:0
ownR()}
window.dvOwnName=function(v){OWN.ct=v}
function ownAmtOk(){return OWN.ce>=.1&&OWN.ce<=1000}
function ownUpd(){var sh=document.querySelector('#rmOwn .ro-sh')
if(!sh)return
sh.querySelectorAll('.ro-q button').forEach((function(b){b.classList.toggle('on',+b.dataset.v===OWN.ce)}))
var mk=sh.querySelector('.ro-mk')
if(mk){mk.disabled=!ownAmtOk()
mk.innerHTML=ownAmtOk()?'Создать стол · вход '+n2(OWN.ce)+' GRAM':'Вход от 0.1 до 1000 GRAM'}var nt=sh.querySelector('.ro-note')
if(nt)nt.innerHTML=ownNote()}
window.dvOwnAmt=function(v){var x=parseFloat(String(v).replace(',','.'))
OWN.ce=isFinite(x)?Math.round(x*100)/100:0
ownUpd()}
window.dvOwnSet=function(v){OWN.ce=v
var i=document.getElementById('roAmt')
if(i)i.value=v
ownHap()
ownUpd()}
window.dvOwnStep=function(d){var c=OWN.ce,v=c
if(d>0){v=OWN_ST.filter((function(x){return x>c+1e-9}))[0]||c}else{var l=OWN_ST.filter((function(x){return x<c-1e-9}))
v=l.length?l[l.length-1]:c}window.dvOwnSet(v)}
function ownNote(){var e=OWN.ce
return'Победитель забирает банк, комиссия 5%. '+(OWN.cg==='p'?'Анте '+n2(e*.1)+' · рейзы '+n2(e*.1)+' / '+n2(e*.25)+' / '+n2(e*.5)+' GRAM. ':'')+'Стол закрывается, если 10 минут за ним никого нет.'}
function ownSeg(cur,fn,items){return'<div class="ro-seg">'+items.map((function(it){return'<button type="button" class="'+(it[0]===cur?'on':'')+'" onclick="'+fn+'(\''+it[0]+'\')">'+it[1]+'</button>'})).join('')+'</div>'}
function ownR(){var sh=document.querySelector('#rmOwn .ro-sh')
if(!sh)return
var GAMES=[['d','Кости 21'],['p','<i class="ro-sp">'+SPADE+'</i>Покер 21']],X='<button type="button" class="ro-x" aria-label="Закрыть" onclick="dvOwnClose()">×</button>'
if(OWN.v==='list'){var L=OWN_LIST.filter((function(r){return r.g===OWN.g})).sort((function(a,b){return(b.mine?1:0)-(a.mine?1:0)||a.e-b.e}))
sh.innerHTML='<div class="ro-hd"><b>Столы игроков</b>'+X+'</div>'+ownSeg(OWN.g,'dvOwnG',GAMES)+'<div class="ro-list">'+(L.length?L.map((function(r){var i=OWN_LIST.indexOf(r),full=r.p>=6
return'<div class="ro-row'+(full?' full':'')+(r.mine?' mine':'')+'"><span class="ro-av" style="--c:'+r.c+'">'+esc(r.h.charAt(0).toUpperCase())+'</span><span class="ro-rt"><b>'+(r.lock?'<i class="ro-lk">'+LOCK+'</i>':'')+esc(r.t)+'</b><small>'+(r.mine?'твой стол':esc(r.h))+' · '+r.p+' из 6</small></span><span class="ro-en"><small>вход</small>'+gram(n2(r.e))+'</span><button type="button" class="ro-go"'+(full?' disabled':'')+' onclick="dvOwnJoin('+i+')">'+(full?'Мест нет':'Войти')+'</button></div>'})).join(''):'<div class="ro-empty">Пока никто не создал стол — будь первым</div>')+'</div><div class="ro-ft"><button type="button" class="ro-new" onclick="dvOwnV(\'new\')"><b>+</b> Создать свой стол</button></div>'
return}sh.innerHTML='<div class="ro-hd"><button type="button" class="ro-bk" aria-label="Назад" onclick="dvOwnV(\'list\')">←</button><b>Новый стол</b>'+X+'</div>'+'<div class="ro-lb">Игра</div>'+ownSeg(OWN.cg,'dvOwnCG',GAMES)+'<div class="ro-lb">Вход за стол</div><div class="ro-amt"><button type="button" aria-label="Меньше" onclick="dvOwnStep(-1)">−</button><label class="ro-val"><span class="ro-gi">'+G()+'</span><input id="roAmt" type="text" inputmode="decimal" autocomplete="off" value="'+OWN.ce+'" oninput="dvOwnAmt(this.value)"><small>GRAM</small></label><button type="button" aria-label="Больше" onclick="dvOwnStep(1)">+</button></div><div class="ro-q">'+OWN_Q.map((function(q){return'<button type="button" data-v="'+q+'" class="'+(q===OWN.ce?'on':'')+'" onclick="dvOwnSet('+q+')">'+q+'</button>'})).join('')+'</div>'+'<div class="ro-lb">Название <i>— необязательно</i></div><input class="ro-in" id="roName" maxlength="24" autocomplete="off" placeholder="Стол '+esc(me())+'" value="'+esc(OWN.ct)+'" oninput="dvOwnName(this.value)">'+'<div class="ro-lb">Кто может сесть</div>'+ownSeg(OWN.cl?'l':'o','dvOwnCL',[['o','Все игроки'],['l','<i class="ro-lk">'+LOCK+'</i>По ссылке']])+'<div class="ro-note">'+ownNote()+'</div><div class="ro-ft"><button type="button" class="ro-new ro-mk" onclick="dvOwnCreate()"></button></div>'
ownUpd()}
function ownToast(t){var e=document.createElement('div')
e.className='ro-toast'
e.textContent=t
document.body.appendChild(e)
setTimeout((function(){e.classList.add('on')}),20)
setTimeout((function(){e.classList.remove('on')
setTimeout((function(){e.remove()}),400)}),2600)}
function ownOpen(r){window.dvOwnClose()
var e=r.e,room={n:r.g==='p'?'Покер 21':'Стол',ic:'★',own:1,mine:!!r.mine,t:r.t,min:e,max:e,chips:[e,e,e,e],pk:r.g==='p'}
ROOMS.push(room)
window.dvRoom(ROOMS.length-1)
if(root)root.scrollTop=0}
window.dvOwnJoin=function(i){var r=OWN_LIST[i]
if(r)ownOpen(r)}
window.dvOwnCreate=function(){if(!ownAmtOk())return
var t=(OWN.ct||'').trim()||'Стол '+me(),r={g:OWN.cg,t:t,h:me(),c:'#34d6ff',e:OWN.ce,p:1,lock:OWN.cl,mine:1}
OWN_LIST.unshift(r)
OWN.ct=''
ownOpen(r)
ownToast(r.lock?'Стол создан · ссылка-приглашение скопирована':'Стол создан · он появился в списке у всех игроков')}
window.dvHeadSub=function(t){var e=root&&root._hd&&root._hd.querySelector('.dv-rn2')
if(e&&e.textContent!==t)e.textContent=t}
window.dvPick=function(v){PICK=v
render()}
window.dvSit=function(){JOIN=PICK
if(S&&(S.phase==='wait'||S.phase==='gather')&&S.me<0){var k=freeSeat(S.seats,4)
if(k>=0){S.me=k
S.seats[k]={name:me(),color:'#34d6ff',me:true,dice:[],moves:[],sum:0,st:'ready',stake:{gram:JOIN,gifts:[]}}
feed('Ты сел за стол')
if(S.phase==='wait'&&S.seats.filter(Boolean).length>=2){S.phase='gather'
S.cd=10}}}render()}
window.dvStay=function(){var m=S&&S.seats[S.me]
if(m)JOIN=m.stake.gram
render()}
window.dvLeave=function(){JOIN=null
if(S&&(S.phase==='wait'||S.phase==='gather')&&S.me>=0){S.seats[S.me]=null
S.me=-1
if(S.seats.filter(Boolean).length<2)S.phase='wait'}render()}
function roomHist(){var c=ROOMS[ROOM].chips
return[['Mira','#f472b6',20,3],['Sasha_V','#ffb547',21,4],['lucky_bobr','#8b5cf6',19,2],['dice_king','#38bdf8',18,3],['nightowl','#ff5d8f',21,5]].map((function(h,k){return{name:h[0],color:h[1],sum:h[2],pot:c[(k+1)%4]*h[3]*.95}}))}function roomTabs(){return'<div class="rm-tabs">'+ROOMS.map((function(r,k){
return'<button type="button" class="'+(k===ROOM?'on':'')+'" onclick="dvRoom('+k+')"><b>'+r.n+'</b><small>'+r.min+' – '+r.max+' GRAM</small></button>'})).join('')+'</div>'}function roomsCtrl(){var c=cur(),R0=ROOMS[ROOM]
if(S.me<0||S.phase==='play'&&!S.seats[S.me]){var nx=S.phase==='play'||S.phase==='result'
return'<div class="dv-ctrl">'+(R0.max>R0.min?'<div class="rm-bet">'+R0.chips.map((function(v){return'<button type="button" class="'+(v===PICK?'on':'')+'" onclick="dvPick('+v+')">'+v+'</button>'
})).join('')+'</div>':'')+'<button type="button" class="dv-btn main rm-sit'+(JOIN?' wait':'')+'" onclick="dvSit()">'+(JOIN?'Ты в очереди на следующий раунд · '+JOIN:(nx?'Сесть на следующий раунд · ':'Сесть за стол · ')+PICK+' GRAM')+'</button></div>'}
if(S.phase==='result')return'<div class="dv-ctrl"><div class="dv-acts nx"><div class="dv-next"><i style="--n:'+S.next+'"></i><span>'+(JOIN?'Новый раунд через':'Ты выйдешь через')+' <b>'+S.next+'</b> с</span></div>'+(JOIN?'<button type="button" class="dv-btn ghost" onclick="dvLeave()">Встать</button>':'<button type="button" class="dv-btn ghost" onclick="dvStay()">Остаться</button>')+'</div></div>'
if(S.phase==='wait')return'<div class="dv-ctrl"><div class="dv-acts"><div class="dv-info">Ждём ещё игроков…</div><button type="button" class="dv-btn ghost" onclick="dvLeave()">Встать</button></div></div>'
if(S.phase==='gather')return'<div class="dv-ctrl"><div class="dv-acts"><div class="dv-info">Старт через <b>'+Math.max(0,S.cd)+'</b> с</div><button type="button" class="dv-btn ghost" onclick="dvLeave()">Встать</button></div></div>'
return null}function newRound(){if(ROOMS_ON)return roomsNewRound()
clearT()
var seats=[null,null,null,null,null,null],order=[3,0,2,5,1,4]
var mi=4
seats[mi]={name:me(),color:'#34d6ff',me:true,dice:[],moves:[],sum:0,st:'ready',stake:{gram:ENTRY,gifts:[]}}
if(window.WinWin)WinWin.hide()
for(var b=0;b<3;b++)seats[order[b]]=mk(BOTS[b])
var hist=[['Mira','#f472b6',20,28.5],['Sasha_V','#ffb547',21,47.5],['lucky_bobr','#8b5cf6',19,38],['dice_king','#38bdf8',18,19],['nightowl','#ff5d8f',21,57]].map((function(h){return{name:h[0],color:h[1],sum:h[2],pot:h[3]}}))
physClear()
S={rid:Math.random(),me:mi,seats:seats,phase:'gather',turn:-1,timer:15,emo:{},cd:6,hist:hist,feed:[],info:null,res:false,round:(S?S.round:1180)+1}
feed('Ты сел за стол — место №'+(mi+1))
render()
S.tick=setInterval((function(){S.cd--
if(S.cd===3){seats[order[3]]=mk(BOTS[3])
feed(BOTS[3].name+' сел за стол')}if(S.cd<=0){clearInterval(S.tick)
S.tick=null
deal()
return}render()}),1e3)}function mk(b){return{name:b.name,color:b.color,bot:true,dice:[],moves:[],sum:0,st:'ready',stake:{gram:b.stake.gifts.length?b.stake.gram:ENTRY,gifts:b.stake.gifts.slice()}}}function nm(s){return s.me?'Ты':s.name}function feed(t,cls){S.feed.unshift({t:t,c:cls||''})
if(S.feed.length>14)S.feed.pop()}function order(){var o=[];[0,1,2,5,4,3].forEach((function(i){if(S.seats[i])o.push(i)}))
return o}function deal(){S.phase='play'
S.dealing=true
feed('Раздача — всем по 2 кубика')
var o=order(),k=0
o.forEach((function(i){var s=S.seats[i]
s.dice=[]
s.moves=[]
s.sum=0
s.st='wait'}));(function next(){if(k>=o.length){S.turn=-1
return later((function(){S.dealing=false
S.q=o.slice()
turn()}),500)}var i=o[k++],s=S.seats[i]
S.turn=i
roll(s,2,(function(){if(s.sum===21){s.st='b21'
feed(nm(s)+' — ровно 21!','w')}later(next,420)}))})()}var PHYS=window.Dice3D&&window.__DCV_PHYS!==false,W3=null,layer=null
function relOf(el){var r=el.getBoundingClientRect(),R=root.getBoundingClientRect()
return{x:r.left-R.left+r.width/2,y:r.top-R.top+root.scrollTop+r.height/2,w:r.width,h:r.height}}function world(){if(W3)return W3
W3=Dice3D.world(layer,(function(){var fe=root.querySelector('.kq1-felt')
if(!fe)return{cx:-999,cy:-999,w:10,h:10,R:5}
var r=relOf(fe)
return{cx:r.x,cy:r.y,w:r.w,h:r.h,R:parseFloat(getComputedStyle(fe).borderTopLeftRadius)||r.h/2}}),30)
return W3}function physClear(){if(W3)W3.clear()
S&&(S.physOwner=null)}function roll(s,n,done){if(PHYS&&layer)return rollPhys(s,n,done)
S.rolling=true
S.lastN=n
var mv=[]
for(var j=0;j<n;j++){var v=rnd(6)
s.dice.push(v)
mv.push(v)}s.moves.push(mv)
s.sum=s.dice.reduce((function(a,b){return a+b}),0)
if(!S.dealing||s.moves.length>1)feed(nm(s)+' бросил '+mv.join(' + ')+' → '+s.sum,s.sum>21?'b':s.sum===21?'w':'')
render()
later((function(){S.rolling=false
render()
done()}),700)}function rollPhys(s,n,done){S.rolling=true
S.lastN=n
var i=S.seats.indexOf(s)
if(S.physOwner!==s){physClear()
S.physOwner=s}render()
var card=root.querySelector('.kc[onclick="dvInfo('+i+')"] .kca')||root.querySelector('.kq1-felt'),fe=root.querySelector('.kq1-felt')
if(!card||!fe){S.rolling=false
return done()}var c=relOf(card),f=relOf(fe),W=world(),rid=S.rid
var ps=[]
for(var k=0;k<n;k++)ps.push(W.throw(c.x+k*10,c.y,f.x+(Math.random()-.5)*f.w*.45,f.y+16+(Math.random()-.5)*f.h*.3))
Promise.all(ps).then((function(mv){if(!S||S.rid!==rid)return
mv.forEach((function(v){s.dice.push(v)}))
s.moves.push(mv)
s.sum=s.dice.reduce((function(a,b){return a+b}),0)
if(!S.dealing||s.moves.length>1)feed(nm(s)+' бросил '+mv.join(' + ')+' → '+s.sum,s.sum>21?'b':s.sum===21?'w':'')
S.rolling=false
render()
done()}))}function turn(){if(!S||!S.q)return
var i=S.q.shift()
if(i==null)return finish()
var s=S.seats[i]
if(s.st==='b21'||s.st==='bust')return turn()
S.turn=i
s.st='turn'
S.timer=30
render()
bindTimer()
if(s.bot)return later((function(){botMove(s)}),1e3)}function after(s){if(s.sum>21){s.st='bust'
feed(nm(s)+' — перебор '+s.sum,'b')
render()
return later(turn,800)}if(s.sum===21){s.st='b21'
feed(nm(s)+' — ровно 21!','w')
render()
return later(turn,800)}s.st='turn'
render()
bindTimer()
if(s.bot)later((function(){botMove(s)}),900)}function botMove(s){if(!S||S.phase!=='play')return
var risk=s.sum<=9,hit=s.sum<16||s.sum<18&&Math.random()<.3
if(Math.random()<.2)emo(S.turn,EMO[rnd(EMO.length)-1])
if(!hit){s.st='stand'
feed(nm(s)+': хватит на '+s.sum)
render()
return later(turn,700)}roll(s,risk?2:1,(function(){after(s)}))}window.dvHit=function(n){var s=S&&S.seats[S.me]
if(!s||S.turn!==S.me||S.rolling||S.dealing)return
roll(s,n,(function(){after(s)}))}
window.dvStand=function(){var s=S&&S.seats[S.me]
if(!s||S.turn!==S.me||S.dealing||s.st!=='turn')return
s.st='stand'
feed('Ты: хватит на '+s.sum)
render()
later(turn,400)}
function bindTimer(){if(S.tiv){clearInterval(S.tiv)
S.tiv=null}S.tiv=setInterval((function(){if(!S||S.phase!=='play'||S.turn<0)return
if(S.rolling)return
S.timer=Math.max(0,S.timer-1)
document.querySelectorAll('#dcv [data-tm]').forEach((function(el){el.style.setProperty('--t',S.timer)
var x=el.querySelector('[data-tmv]')
if(x)x.textContent=S.timer}))
if(S.timer<=0&&S.turn===S.me){clearInterval(S.tiv)
S.tiv=null
window.dvStand()}}),1e3)}function finish(){if(S.tiv){clearInterval(S.tiv)
S.tiv=null}S.turn=-1
S.phase='result'
physClear()
var best=-1
S.seats.forEach((function(s){if(s&&s.sum<=21&&s.sum>best)best=s.sum}))
var win=[]
S.seats.forEach((function(s,i){if(s){if(s.sum===best&&best>0){s.st='win'
win.push(i)}else s.st=s.sum>21?'bust':'lose'}}))
S.win=win
S.res=true
S.next=10
S.tick=setInterval((function(){if(!S||S.phase!=='result')return
S.next--
if(S.next<=0){clearInterval(S.tick)
S.tick=null
if(window.WinWin)WinWin.hide()
newRound()
return}var b=root.querySelector('.dv-next b')
if(b){b.textContent=S.next
root.querySelector('.dv-next i').style.setProperty('--n',S.next)}}),1e3)
var B=bank()
if(win.length){var w=S.seats[win[0]]
feed((win.length>1?'Ничья на ':nm(w)+' забирает банк — ')+best,'w')
S.hist.unshift({name:nm(w),color:w.color,sum:best,pot:B.gram*.95/win.length})
if(S.hist.length>6)S.hist.length=6}render()}function emo(i,x){S.emo[i]=x
render()
later((function(){if(S){delete S.emo[i]
render()}}),1800)}window.dvEmo=function(x){if(S&&S.seats[S.me])emo(S.me,x)}
window.dvAgain=function(){newRound()}
var LEVELS=[1,5,10,25,50],WAITN={1:2,5:3,10:3,25:1,50:2}
window.dvStake=function(){if(!sheetEl)return
var h='<div class="dv-sheet" onclick="if(event.target===this)dvStakeClose()"><div class="dv-sh dv-stk"><i class="grab"></i><div class="dv-sh-h"><span><b>Сменить ставку</b><small>все за столом ставят одинаково · место — случайное</small></span><button type="button" onclick="dvStakeClose()">✕</button></div>'+'<div class="dv-lv">'+LEVELS.map((function(x){
return'<button type="button" class="'+(x===ENTRY?'on':'')+'" onclick="dvStakeSet('+x+')"><b>'+x+'</b><small>GRAM</small><em>'+(x===ENTRY?'ты здесь':'ждут '+WAITN[x])+'</em></button>'})).join('')+'</div></div></div>'
sheetEl.innerHTML=h
sheetEl.dataset.k='stake'}
window.dvStakeClose=function(){sheetEl.innerHTML=''
sheetEl.dataset.k=''}
window.dvStakeSet=function(x){ENTRY=x
dvStakeClose()
if(window.WinWin)WinWin.hide()
newRound()}
window.dvInfo=function(i){if(S&&S.seats[i]){S.info=i
render()}}
window.dvClose=function(){if(S){S.info=null
S.res=false
render()}}
var STL={ready:'готов',wait:'ждёт',turn:'ходит',stand:'хватит',bust:'перебор',b21:'21!',win:'победа',lose:''}
function flag(s){var t=STL[s.st]||''
return t?'<span class="dv-fl f-'+s.st+'">'+t+'</span>':''}function sumTxt(s){return s.dice.length?s.sum:'—'}function pct(s){return Math.min(1,s.sum/21)}function cls(s,i){return'dv-s s-'+s.st+(s.me?' me':'')+(S.turn===i?' turn':'')}function attrs(s,i){return' style="--c:'+s.color+';--t:'+pct(s).toFixed(3)+'" onclick="dvInfo('+i+')"'}function emoH(i){
return S.emo[i]?'<span class="dv-emo">'+S.emo[i]+'</span>':''}function freeH(extra){return'<div class="dv-s free'+(extra||'')+'"><span>свободно</span></div>'}function cur(){return S.turn>=0?S.seats[S.turn]:null}function tray(big){var c=cur()
if(S.phase==='gather')return'<div class="dv-tray wait"><span>старт через <b>'+Math.max(0,S.cd)+'</b> с</span></div>'
if(S.phase==='result'){var w=S.win.map((function(i){return S.seats[i]}))
return'<div class="dv-tray res">'+(w.length?'<span>'+(w.length>1?'ничья':esc(nm(w[0])))+' · <b>'+w[0].sum+'</b></span>':'<span>все перебрали</span>')+'</div>'}if(!c||!c.dice.length)return'<div class="dv-tray wait"><span>раздача…</span></div>'
var n=c.dice.length
return'<div class="dv-tray'+(big?' big':'')+'">'+c.dice.map((function(v,k){return die(v,S.rolling&&k>=n-S.lastN?'roll':'')})).join('')+'</div>'}function curTxt(){var c=cur()
if(!c||!c.dice.length||S.phase!=='play')return''
return'<div class="dv-cur">'+esc(c.me?'Твоя сумма':c.name)+': <b>'+c.sum+'</b>'+(c.sum>21?' — перебор':c.sum===21?' — очко!':'')+'</div>'}function bankH(cl){var B=bank()
return'<div class="dv-bank '+(cl||'')+'"><small>банк</small>'+gram(n2(B.gram),'b')+(B.gifts.length?'<span class="dv-gs">'+B.gifts.slice(0,3).map((function(g){return gt(g)})).join('')+(B.gifts.length>3?'<em>+'+(B.gifts.length-3)+'</em>':'')+'</span>':'')+'</div>'}function head(sm){if(ROOMS_ON){var R0=ROOMS[ROOM]
swUpd()
dvHeadSub((R0.max>R0.min?R0.min+'–'+R0.max:'Вход '+R0.min)+' GRAM · №'+S.round)
return''}return'<div class="dv-head"><button type="button" class="dv-back" aria-label="Назад" onclick="dvBack()">←</button><div class="dv-ti"><span><b>Стол · '+ENTRY+' GRAM</b><i class="dv-q">?</i></span>'+(RN()===2?'<small class="dv-rn2">Раунд №'+S.round+'</small>':'')+'</div>'+(RN()===1?'<span class="dv-rn">Раунд №'+S.round+'</span>':'')+'</div>'}function ctrl(){var c=cur()
if(ROOMS_ON){var rc=roomsCtrl()
if(rc)return rc}var r6=RN()===6?'<span class="rn6">№'+S.round+'</span>':''
if(S.phase==='gather')return'<div class="dv-ctrl"><div class="dv-info">'+r6+'Ждём игроков · старт через <b>'+Math.max(0,S.cd)+'</b> с</div></div>'
if(S.phase==='result')return'<div class="dv-ctrl"><div class="dv-acts nx"><div class="dv-next"><i style="--n:'+S.next+'"></i><span>Новый раунд через <b>'+S.next+'</b> с</span></div><button type="button" class="dv-btn ghost" onclick="dvStake()">Сменить ставку</button></div></div>'
if(S.turn===S.me&&!S.rolling&&!S.dealing)return'<div class="dv-ctrl"><div class="dv-acts my"><button type="button" class="dv-btn main" onclick="dvHit(1)">'+die(5,'xs')+'Ещё кубик</button><button type="button" class="dv-btn risk" onclick="dvHit(2)">Риск: 2 кубика</button><button type="button" class="dv-btn ghost" onclick="dvStand()">Хватит</button></div>'+tmr()+'</div>'
return'<div class="dv-ctrl"><div class="dv-info">'+r6+(c&&!S.dealing?'Ходит <b>'+esc(nm(c))+'</b>'+(c.bot?' · '+tmrIn():''):'Раздача…')+'</div></div>'}function tmr(){return'<div class="dv-tm" data-tm style="--t:'+S.timer+'"><i></i><span><b data-tmv>'+S.timer+'</b> с на ход</span></div>'}function tmrIn(){
return'<span class="dv-tmi" data-tm style="--t:'+S.timer+'"><b data-tmv>'+S.timer+'</b> с</span>'}function emos(){return'<div class="dv-emos">'+EMO.map((function(x){return'<button type="button" onclick="dvEmo(\''+x+'\')">'+x+'</button>'})).join('')+'</div>'}function hist(){return'<div class="dv-hist"><small>История стола</small><div class="dv-hr">'+S.hist.map((function(h){
return'<span class="dv-hi">'+ava(h)+'<b>'+esc(h.name)+'</b><em>'+h.sum+'</em>'+gram('+'+n2(h.pot))+'</span>'})).join('')+'</div></div>'}function bar(s){return'<span class="dv-bar"><i style="width:'+(pct(s)*100).toFixed(0)+'%"></i></span>'}function ring(s,r){var c=2*Math.PI*r,p=s.dice.length?pct(s):0
return'<svg class="dv-ring" viewBox="0 0 '+(2*r+8)+' '+(2*r+8)+'"><circle cx="'+(r+4)+'" cy="'+(r+4)+'" r="'+r+'" class="tr"/><circle cx="'+(r+4)+'" cy="'+(r+4)+'" r="'+r+'" class="fl" stroke-dasharray="'+(c*p).toFixed(1)+' '+c.toFixed(1)+'"/></svg>'}function minidice(s,m){var d=s.dice
if(!d.length)return'<span class="dv-md e">—</span>'
var k=m||4
return'<span class="dv-md">'+(d.length>k?'<em>+'+(d.length-k)+'</em>':'')+d.slice(-k).map((function(v){return die(v,'sm')})).join('')+'</span>'}var R={}
R[1]=function(){function seat(i){var s=S.seats[i]
if(!s)return freeH(' v1')
return'<div class="'+cls(s,i)+' v1"'+attrs(s,i)+'>'+emoH(i)+'<span class="v1-t">'+ava(s)+flag(s)+'<span class="sm">'+sumTxt(s)+'</span></span><b class="nm">'+esc(nm(s))+'</b>'+stake(s.stake,2)+bar(s)+'</div>'}
return head()+'<div class="v1-row">'+[0,1,2].map(seat).join('')+'</div><div class="v1-felt">'+bankH()+tray()+curTxt()+'</div><div class="v1-row">'+[3,4,5].map(seat).join('')+'</div>'+ctrl()+emos()+hist()}
R[2]=function(){var A=[-150,-90,-30,30,90,150],W=366,CY=240,RR=150
var seats=S.seats.map((function(s,i){var a=A[i]*Math.PI/180,x=W/2+RR*Math.cos(a),y=CY+RR*Math.sin(a),up=Math.sin(a)<0
var pos='left:'+x.toFixed(1)+'px;top:'+y.toFixed(1)+'px'
if(!s)return'<div class="v2-p free'+(up?' up':'')+'" style="'+pos+'"><span class="v2-a"><span class="dv-av e">+</span></span><small>свободно</small></div>'
return'<div class="v2-p '+cls(s,i)+(up?' up':'')+'" style="'+pos+';--c:'+s.color+';--t:'+pct(s).toFixed(3)+'" onclick="dvInfo('+i+')">'+emoH(i)+'<span class="v2-a">'+ring(s,27)+ava(s)+'<span class="sm">'+sumTxt(s)+'</span></span><b class="nm">'+esc(nm(s))+'</b>'+stake(s.stake,1)+flag(s)+'</div>'})).join('')
return head()+'<div class="v2-wrap"><div class="v2-rail"><div class="v2-felt">'+bankH('c')+tray()+curTxt()+'</div></div>'+seats+'</div>'+ctrl()+emos()+hist()}
R[3]=function(){var rows=[0,1,2,3,4,5].map((function(i){var s=S.seats[i]
if(!s)return'<div class="v3-r free"><span class="dv-av e">'+(i+1)+'</span><span>свободное место</span></div>'
return'<div class="v3-r '+cls(s,i)+'"'+attrs(s,i)+'>'+emoH(i)+'<span class="no">'+(i+1)+'</span>'+ava(s)+'<span class="who"><b class="nm">'+esc(nm(s))+'</b>'+stake(s.stake,2)+'</span>'+minidice(s,4)+'<span class="sm">'+sumTxt(s)+'</span>'+flag(s)+(S.turn===i&&S.phase==='play'?'<span class="v3-tm" data-tm style="--t:'+S.timer+'"></span>':'')+'</div>'})).join('')
return head()+'<div class="v3-top">'+bankH()+'<div class="v3-tr">'+tray()+curTxt()+'</div></div>'+ctrl()+'<div class="v3-l">'+rows+'</div>'+emos()+hist()}
R[4]=function(){var ANG=[-145,-90,-35,35,90,145],CX=183,CY=262,RR=166,RD=84
var parts=S.seats.map((function(s,i){var a=ANG[i]*Math.PI/180,x=CX+RR*Math.cos(a),y=CY+RR*Math.sin(a),dx=CX+RD*Math.cos(a),dy=CY+RD*Math.sin(a),up=Math.sin(a)<-.1
var seat='<div class="kq4-s'+(up?' up':'')+'" style="left:'+x.toFixed(1)+'px;top:'+y.toFixed(1)+'px">'+seatB(s,i,'kq4')+'</div>'
var dz=s&&s.dice.length?'<div class="kq4-d'+(S.turn===i&&S.phase==='play'?' on':'')+(s.sum>21?' bust':'')+(s.st==='win'?' win':'')+'" style="left:'+dx.toFixed(1)+'px;top:'+dy.toFixed(1)+'px;--c:'+s.color+'">'+s.dice.slice(-3).map((function(v,k){return die(v,'sm'+(S.rolling&&S.turn===i&&k>=Math.min(3,s.dice.length)-S.lastN?' roll':''))
})).join('')+(s.dice.length>3?'<em>+'+(s.dice.length-3)+'</em>':'')+'</div>':''
return seat+dz})).join('')
var c=cur(),w=S.phase==='result'?S.win.map((function(i){return S.seats[i]})):[]
var mid=S.phase==='gather'?'<b class="big">'+Math.max(0,S.cd)+'</b><small>до раздачи</small>':S.phase==='result'?w.length?'<small>'+(w.length>1?'ничья':'победил')+'</small><b class="nm2">'+esc(w.length>1?w.length+' игрока':nm(w[0]))+'</b><b class="big win">'+w[0].sum+'</b>':'<small>все перебрали</small>':c&&c.dice.length?'<small>ходит</small><b class="nm2" style="color:'+c.color+'">'+esc(nm(c))+'</b><b class="big'+(c.sum>21?' bust':'')+'">'+c.sum+'<i>/21</i></b>':'<small>раздача…</small>'
return head()+'<div class="kq4-top">'+bankChip()+'</div><div class="kq4"><div class="kq-rail kq4-rail"><div class="kq-felt kq4-felt"><div class="kq4-mid">'+mid+'</div></div></div>'+parts+'</div>'+ctrl()+emos()+hist()}
R[5]=function(){var cards=[0,1,2,3,4,5].map((function(i){var s=S.seats[i]
if(!s)return freeH(' v5')
return'<div class="'+cls(s,i)+' v5"'+attrs(s,i)+'>'+emoH(i)+'<span class="v5-l">'+ava(s)+'<span class="who"><b class="nm">'+esc(nm(s))+'</b>'+stake(s.stake,2)+'</span></span><span class="v5-g">'+ring(s,21)+'<b>'+sumTxt(s)+'</b></span>'+flag(s)+'</div>'})).join('')
return head()+'<div class="v5-felt">'+bankH()+'<div class="v5-tr">'+tray()+curTxt()+'</div></div><div class="v5-grid">'+cards+'</div>'+ctrl()+emos()+hist()}
R[6]=function(){var strip=[0,1,2,3,4,5].map((function(i){var s=S.seats[i]
if(!s)return'<span class="v6-c free"><span class="dv-av e">+</span><em>—</em></span>'
return'<span class="v6-c '+cls(s,i)+'"'+attrs(s,i)+'>'+emoH(i)+ava(s)+'<em>'+sumTxt(s)+'</em><small>'+esc(nm(s))+'</small></span>'})).join('')
var c=cur()||S.seats[S.me],ci=S.seats.indexOf(c)
if(S.phase==='result'&&S.win.length){c=S.seats[S.win[0]]
ci=S.win[0]}var spot='<div class="v6-spot s-'+c.st+'" style="--c:'+c.color+';--t:'+pct(c).toFixed(3)+'" onclick="dvInfo('+ci+')"><div class="v6-who">'+ava(c)+'<span><b>'+esc(nm(c))+'</b>'+stake(c.stake,3)+'</span>'+flag(c)+'</div>'+'<div class="v6-gauge">'+ring(c,64)+'<span><b>'+sumTxt(c)+'</b><small>из 21</small></span></div>'+tray(true)+'</div>'
return head()+'<div class="v6-strip">'+strip+'</div>'+bankH('wide')+spot+ctrl()+emos()+hist()}
R[7]=function(){function g(i){var s=S.seats[i]
if(!s)return'<div class="v7-g free"><span class="v7-o"><span class="dv-av e">+</span></span><small>свободно</small></div>'
return'<div class="v7-g '+cls(s,i)+'"'+attrs(s,i)+'>'+emoH(i)+'<span class="v7-o">'+ring(s,38)+ava(s)+'</span><b class="sm">'+sumTxt(s)+'</b><small class="nm">'+esc(nm(s))+'</small>'+stake(s.stake,1)+flag(s)+'</div>'}
return head()+'<div class="v7-row">'+[0,1,2].map(g).join('')+'</div><div class="v7-mid">'+bankH()+'<div class="v7-tr">'+tray()+curTxt()+'</div></div><div class="v7-row">'+[3,4,5].map(g).join('')+'</div>'+ctrl()+emos()+hist()}
R[8]=function(){function p(i,side){var s=S.seats[i]
if(!s)return'<div class="v8-p dv-s free '+side+'"><span>свободно</span></div>'
return'<div class="v8-p '+side+' '+cls(s,i)+'"'+attrs(s,i)+'>'+emoH(i)+flag(s)+ava(s)+'<b class="nm">'+esc(nm(s))+'</b>'+stake(s.stake,1)+'<span class="sm">'+sumTxt(s)+'</span>'+bar(s)+'</div>'}
return head()+'<div class="v8-t">'+p(0,'top')+'<div class="v8-mid"><div class="v8-col">'+p(5,'l')+p(4,'l')+'</div><div class="v8-felt">'+bankH('c')+tray()+curTxt()+'</div><div class="v8-col">'+p(1,'r')+p(2,'r')+'</div></div>'+p(3,'bot')+'</div>'+ctrl()+emos()+hist()}
R[9]=function(){var chips=[0,1,2,3,4,5].map((function(i){var s=S.seats[i]
if(!s)return'<span class="v9-c free"><span class="dv-av e">+</span></span>'
return'<span class="v9-c '+cls(s,i)+'"'+attrs(s,i)+'>'+emoH(i)+ava(s)+'<b>'+sumTxt(s)+'</b>'+flag(s)+'</span>'})).join('')
var stakes=[0,1,2,3,4,5].filter((function(i){return S.seats[i]})).map((function(i){var s=S.seats[i]
return'<span class="v9-st" style="--c:'+s.color+'" onclick="dvInfo('+i+')"><i></i><b>'+esc(nm(s))+'</b>'+stake(s.stake,2)+'</span>'})).join('')
var fd=S.feed.map((function(f,k){return'<div class="v9-f '+f.c+(k===0?' new':'')+'"><i></i><span>'+esc(f.t)+'</span></div>'})).join('')
return head()+'<div class="v9-chips">'+chips+'</div><div class="v9-felt">'+bankH()+'<div class="v9-tr">'+tray()+curTxt()+'</div></div>'+ctrl()+'<div class="v9-feed"><small>Что происходит</small>'+fd+'</div><div class="v9-stakes"><small>Ставки за столом</small>'+stakes+'</div>'+emos()}
R[10]=function(){var others=[5,0,1,2,3],pos=[[11,112],[30,18],[50,0],[70,18],[89,112]]
var arc=others.map((function(i,k){var s=S.seats[i],st='left:'+pos[k][0]+'%;top:'+pos[k][1]+'px'
if(!s)return'<div class="v10-p free" style="'+st+'"><span class="dv-av e">+</span><small>свободно</small></div>'
return'<div class="v10-p '+cls(s,i)+'" style="'+st+';--c:'+s.color+';--t:'+pct(s).toFixed(3)+'" onclick="dvInfo('+i+')">'+emoH(i)+'<span class="v10-a">'+ring(s,25)+ava(s)+'<em>'+sumTxt(s)+'</em></span><b class="nm">'+esc(nm(s))+'</b>'+stake(s.stake,1)+flag(s)+'</div>'})).join('')
var m=S.seats[S.me],mine='<div class="v10-me '+cls(m,S.me)+'"'+attrs(m,S.me)+'>'+emoH(S.me)+'<div class="v10-mh">'+ava(m)+'<span><b>Твоя рука</b>'+stake(m.stake)+'</span>'+flag(m)+'<span class="v10-ms"><b>'+sumTxt(m)+'</b><small>'+(m.dice.length?m.sum>21?'перебор':'до 21 — '+(21-m.sum):'ждёт раздачи')+'</small></span></div><div class="v10-md">'+(m.dice.length?m.dice.map((function(v,k){
return die(v,S.rolling&&S.turn===S.me&&k>=m.dice.length-S.lastN?'roll':'')})).join(''):'')+'</div>'+bar(m)+'</div>'
return head()+'<div class="v10-arc">'+arc+'<div class="v10-felt">'+bankH('c')+tray()+'</div></div>'+mine+ctrl()+emos()+hist()}
function ringSeat(s,r){var c=2*Math.PI*r,p=s.dice.length?pct(s):0
return'<svg class="kqr" viewBox="0 0 '+(2*r+8)+' '+(2*r+8)+'"><circle cx="'+(r+4)+'" cy="'+(r+4)+'" r="'+r+'" class="kqtr"/><circle cx="'+(r+4)+'" cy="'+(r+4)+'" r="'+r+'" class="kqfl" stroke-dasharray="'+(c*p).toFixed(1)+' '+c.toFixed(1)+'"/></svg>'}function RN(){return window.__RN||2}function bankChip(cl){var B=bank()
return'<div class="kq-bank '+(cl||'')+'"><small>банк</small>'+gram(n2(B.gram),'b')+(RN()===5?'<span class="rn5">№'+S.round+'</span>':'')+(B.gifts.length?'<span class="dv-gs">'+B.gifts.slice(0,3).map((function(g){return gt(g)})).join('')+(B.gifts.length>3?'<em>+'+(B.gifts.length-3)+'</em>':'')+'</span>':'')+'</div>'}function stage(big){var c=cur()
if(S.phase==='wait')return'<div class="rm-wt"><span>Ожидание раунда<i class="el"><i>.</i><i>.</i><i>.</i></i></span></div>'
if(S.phase==='gather')return'<div class="kq-st wait"><b class="kqcd">'+Math.max(0,S.cd)+'</b><small>до раздачи</small></div>'
if(S.phase==='result'){var w=S.win.map((function(i){return S.seats[i]}))
if(!w.length)return'<div class="kq-st res"><small>все перебрали</small></div>'
return'<div class="kq-st res"><span class="kqwho">'+ava(w[0])+'<b>'+(w.length>1?'Ничья':esc(nm(w[0])))+'</b></span><div class="kqtray">'+w[0].dice.map((function(v){return die(v,'kqd')})).join('')+'</div><span class="sm win">'+w[0].sum+'</span></div>'}if(!c||!c.dice.length)return'<div class="kq-st wait"><small>раздача…</small></div>'
var n=c.dice.length
if(PHYS&&layer)return'<div class="kq-st ph'+(c.sum>21?' bust':c.sum===21?' b21':'')+'" style="--c:'+c.color+'"><span class="kqwho">'+ava(c)+'<b>'+esc(c.me?'Твой бросок':c.name)+'</b></span><span class="sm">'+(c.dice.length?c.sum:'…')+'<small>/21</small></span></div>'
return'<div class="kq-st'+(c.sum>21?' bust':c.sum===21?' b21':'')+'" style="--c:'+c.color+'"><span class="kqwho">'+ava(c)+'<b>'+esc(c.me?'Твой бросок':c.name)+'</b></span><div class="kqtray'+(big?' big':'')+'">'+c.dice.map((function(v,k){return die(v,'kqd'+(S.rolling&&k>=n-S.lastN?' roll':''))})).join('')+'</div><span class="sm">'+c.sum+'<small>/21</small></span></div>'}function seatB(s,i,extra){
if(!s)return'<div class="kq-p free '+(extra||'')+'"><span class="kq0">+</span><small>свободно</small></div>'
return'<div class="kq-p ks-'+s.st+(s.me?' me':'')+(S.turn===i?' turn':'')+' '+(extra||'')+'" style="--c:'+s.color+'" onclick="dvInfo('+i+')">'+emoH(i)+'<span class="kqa">'+ringSeat(s,25)+ava(s)+(S.turn===i&&S.phase==='play'?'<i class="kqt" data-tm style="--t:'+S.timer+'"></i>':'')+'</span>'+'<span class="kql"><b class="nm">'+esc(nm(s))+'</b><span class="kqv">'+stake(s.stake,1)+'</span><span class="kqf">'+(s.dice.length?'<em class="kqs">'+s.sum+'</em>':'')+flag(s)+'</span></span></div>'
}R[1]=function(){function row(ix){return'<div class="kq1-row">'+ix.map((function(i){return seatB(S.seats[i],i,'kq1')})).join('')+'</div>'}
return head()+'<div class="kq1">'+row([0,1,2])+'<div class="kq-rail kq1-rail">'+(RN()===4?'<span class="rn4">Раунд №'+S.round+'</span>':'')+'<div class="kq-felt kq1-felt"><i class="kqlogo">21</i>'+bankChip()+(RN()===3?'<span class="rn3">раунд №'+S.round+'</span>':'')+stage()+'</div></div>'+row([5,4,3])+'</div>'+ctrl()+emos()+hist()}
R[2]=function(){var ANG=[-150,-90,-30,30,90,150],CX=183,CY=222,RR=158
var seats=S.seats.map((function(s,i){var a=ANG[i]*Math.PI/180,x=CX+RR*Math.cos(a),y=CY+RR*Math.sin(a),up=Math.sin(a)<-.1
return'<div class="kq2-s'+(up?' up':'')+'" style="left:'+x.toFixed(1)+'px;top:'+y.toFixed(1)+'px">'+seatB(s,i,'kq2')+'</div>'})).join('')
var ptr=S.turn>=0&&S.phase==='play'?'<i class="kq2-ptr" style="--a:'+(ANG[S.turn]+90)+'deg;--c:'+S.seats[S.turn].color+'"></i>':''
return head()+'<div class="kq2"><div class="kq-rail kq2-rail"><div class="kq-felt kq2-felt">'+ptr+bankChip('c')+stage()+'</div></div>'+seats+'</div>'+ctrl()+emos()+hist()}
R[3]=function(){var strip=[0,1,2,3,4,5].map((function(i){var s=S.seats[i]
if(!s)return'<span class="kq3-c free"><span class="kq0">+</span></span>'
return'<span class="kq3-c ks-'+s.st+(s.me?' me':'')+(S.turn===i?' turn':'')+'" style="--c:'+s.color+'" onclick="dvInfo('+i+')">'+emoH(i)+'<span class="kqa">'+ringSeat(s,19)+ava(s)+'</span><em>'+sumTxt(s)+'</em><small>'+esc(nm(s))+'</small></span>'})).join('')
var c=cur()||(S.phase==='result'&&S.win.length?S.seats[S.win[0]]:S.seats[S.me]),ci=S.seats.indexOf(c)
var trackX=c.dice.length?Math.min(c.sum,24)/24*100:0
return head()+'<div class="kq3-strip">'+strip+'</div>'+'<div class="kq-rail kq3-rail'+(S.phase==='result'?' res':'')+'" style="--c:'+c.color+'"><div class="kq-felt kq3-felt"><div class="kq3-top">'+bankChip()+'<span class="kq3-who" onclick="dvInfo('+ci+')">'+ava(c)+'<span><b>'+esc(nm(c))+'</b>'+stake(c.stake,2)+'</span>'+flag(c)+'</span></div>'+stage(true)+'<div class="kq3-trk"><span class="kqz"></span><span class="kqfn"></span><span class="kqfill" style="width:'+trackX.toFixed(1)+'%"></span><span class="kqmk" style="left:'+trackX.toFixed(1)+'%"></span><small class="a">0</small><small class="b">21</small></div></div></div>'+ctrl()+emos()+hist()
}
function seatC(s,i,dice){if(!s)return'<div class="kc free"><span class="kc0">+</span><small>свободно</small></div>'
var on=S.turn===i&&S.phase==='play'
var dz=dice?'<span class="kcd">'+(s.dice.length?s.dice.slice(-4).map((function(v,k){return die(v,'sm'+(S.rolling&&on&&k>=Math.min(4,s.dice.length)-S.lastN?' roll':''))})).join('')+(s.dice.length>4?'<em>+'+(s.dice.length-4)+'</em>':''):'<em class="e">ждёт раздачи</em>')+'</span>':''
var KV=window.__KC||0,cl='kc ks-'+s.st+(s.me?' me':'')+(on?' turn':'')+(KV?' kv'+KV:''),at='" style="--c:'+s.color+';--p:'+(s.dice.length?Math.min(1,s.sum/21):0).toFixed(3)+'" onclick="dvInfo('+i+')">'+emoH(i)
var av='<span class="kca">'+ringSeat(s,20)+ava(s)+(on?'<i class="kqt" data-tm style="--t:'+S.timer+'"></i>':'')+'</span>'
var sum=s.dice.length?s.sum:'—',fl=flag(s),nmH='<b class="nm kcn">'+esc(nm(s))+'</b>',stH='<span class="kcv">'+stake(s.stake,1)+'</span>'
var miniDice='<span class="kmd">'+(s.dice.length?(s.dice.length>2?'<em>+'+(s.dice.length-2)+'</em>':'')+s.dice.slice(-2).map((function(v){return die(v,'sm')})).join(''):'<em class="e">ждёт</em>')+'</span>'
if(KV===1)return'<div class="'+cl+at+av+'<span class="k1s"><b class="big">'+sum+'</b><small>'+(fl||'<i class="of">из 21</i>')+'</small></span>'+nmH+stH+'</div>'
if(KV===2)return'<div class="'+cl+at+av+nmH+stH+'<em class="kcs">'+sum+'</em></div>'
if(KV===3)return'<div class="'+cl+at+av+'<span class="k3s"><span class="t"><em class="kcs">'+sum+'</em></span>'+miniDice+'</span>'+nmH+stH+'</div>'
if(KV===4){var add=s.dice.length-(s._sh||0)
s._sh=s.dice.length
var dd=s.dice.slice().reverse().slice(0,5).map((function(v,k){return die(v,'sm'+(add>0&&k<add?' nw':''))})).join('')
var av4='<span class="kca">'+ava(s)+(on?'<i class="kqt" data-tm style="--t:'+S.timer+'"></i>':'')+'</span>'
return'<div class="'+cl+at+av4+nmH+stH+'<span class="k4n"><b>'+sum+'</b><span class="k4d'+(add>0&&s.dice.length>add?' push':'')+'" style="--n:'+Math.max(0,add)+'">'+(dd||'<em>ждёт</em>')+'</span></span></div>'}return'<div class="'+cl+at+av+'<span class="kcf">'+(s.dice.length?'<em class="kcs">'+s.sum+'</em>':'<em class="kcs e">—</em>')+fl+'</span>'+nmH+stH+dz+'</div>'}R[1]=function(){
function row(ix){return'<div class="kc-row">'+ix.map((function(i){return seatC(S.seats[i],i)})).join('')+'</div>'}
return head()+'<div class="kq1">'+row([0,1,2])+'<div class="kq-rail kq1-rail">'+(RN()===4?'<span class="rn4">Раунд №'+S.round+'</span>':'')+'<div class="kq-felt kq1-felt"><i class="kqlogo">21</i>'+bankChip()+(RN()===3?'<span class="rn3">раунд №'+S.round+'</span>':'')+stage()+'</div></div>'+row([5,4,3])+'</div>'+ctrl()+emos()+hist()}
var POS6=function(cy,dx,dy,dt){return[[183-dx,cy-dy],[183,cy-dt],[183+dx,cy-dy],[183+dx,cy+dy],[183,cy+dt],[183-dx,cy+dy]]}
R[2]=function(){var P=POS6(215,124,128,170)
var cards=S.seats.map((function(s,i){return'<div class="kc-at" style="left:'+P[i][0]+'px;top:'+P[i][1]+'px">'+seatC(s,i)+'</div>'})).join('')
return head()+'<div class="kq2 kc2"><div class="kq-rail kq2-rail kc2-rail"><div class="kq-felt kq2-felt">'+bankChip('c')+stage()+'</div></div>'+cards+'</div>'+ctrl()+emos()+hist()}
R[4]=function(){var P=POS6(243,124,146,196)
var cards=S.seats.map((function(s,i){return'<div class="kc-at" style="left:'+P[i][0]+'px;top:'+P[i][1]+'px">'+seatC(s,i,true)+'</div>'})).join('')
var c=cur(),w=S.phase==='result'?S.win.map((function(i){return S.seats[i]})):[]
var mid=S.phase==='gather'?'<b class="big">'+Math.max(0,S.cd)+'</b><small>до раздачи</small>':S.phase==='result'?w.length?'<small>'+(w.length>1?'ничья':'победил')+'</small><b class="nm2">'+esc(w.length>1?w.length+' игрока':nm(w[0]))+'</b><b class="big win">'+w[0].sum+'</b>':'<small>все перебрали</small>':c&&c.dice.length?'<small>ходит</small><b class="nm2" style="color:'+c.color+'">'+esc(nm(c))+'</b><b class="big'+(c.sum>21?' bust':'')+'">'+c.sum+'<i>/21</i></b>':'<small>раздача…</small>'
return head()+'<div class="kq4 kc4"><div class="kq-rail kq4-rail kc4-rail"><div class="kq-felt kq4-felt">'+bankChip('c sm')+'<div class="kq4-mid">'+mid+'</div></div></div>'+cards+'</div>'+ctrl()+emos()+hist()}
function infoSheet(){var s=S.seats[S.info]
if(!s)return''
var st={ready:'готов к игре',wait:'ждёт хода',turn:'сейчас ходит',stand:'остановился',bust:'перебор',b21:'ровно 21',win:'победил',lose:'проиграл'}[s.st]||''
var run=0,moves=s.moves.map((function(m,k){var a=m.reduce((function(x,y){return x+y}),0)
run+=a
return'<div class="dv-mv'+(run>21?' x':'')+'"><span class="n">'+(k===0?'раздача':'ход '+k+(m.length>1?' · риск':''))+'</span><span class="d">'+m.map((function(v){return die(v,'sm')})).join('')+'</span><b>'+(k?'+':'')+a+'</b><em>'+run+'</em></div>'})).join('')
var gl=s.stake.gifts
return'<div class="dv-sheet" onclick="if(event.target===this)dvClose()"><div class="dv-sh"><i class="grab"></i><div class="dv-sh-h">'+ava(s)+'<span><b>'+esc(nm(s))+'</b><small>место №'+(S.info+1)+' · '+st+'</small></span><button type="button" onclick="dvClose()">✕</button></div>'+'<div class="dv-is"><div class="dv-is-sum" style="--c:'+s.color+';--t:'+pct(s).toFixed(3)+'"><small>сумма</small><b>'+sumTxt(s)+'</b>'+bar(s)+'<small>'+(s.dice.length?s.sum>21?'перебор на '+(s.sum-21):'до 21 осталось '+(21-s.sum):'ещё не бросал')+'</small></div>'+'<div class="dv-is-st"><small>ставка · '+kindLbl(s.stake)+'</small><b>'+gram(n2(stakeVal(s.stake)),'big')+'</b><small>шанс на банк '+(100/Math.max(1,S.seats.filter(Boolean).length)).toFixed(0)+'%</small></div></div>'+(gl.length?'<div class="dv-is-gl">'+gl.map((function(g){
return'<span class="dv-is-gi">'+gt(g,'l')+'<b>'+esc(g.title)+'</b><small>#'+g.number+'</small><em>'+gram(n2(g.value))+'</em></span>'
})).join('')+(s.stake.gram?'<span class="dv-is-gi gr"><span class="dv-gt l gg">'+G()+'</span><b>GRAM</b><small>доплата</small><em>'+gram(n2(s.stake.gram))+'</em></span>':'')+'</div>':'')+'<div class="dv-mvs"><small>броски</small>'+(moves||'<div class="dv-w">Броски появятся после раздачи</div>')+'</div></div></div>'}function winWindow(){var B=bank(),w=S.win.map((function(i){return S.seats[i]}))
if(!w.length)return
var one=w.length===1,share=B.gram/w.length*.95,gifts=one?B.gifts.map((function(g){return{img:window.__FR&&window.__FR[g.slug]||'',title:g.title,number:g.number,value:g.value}})):[]
var gv=gifts.reduce((function(a,g){return a+g.value}),0),stakeV=stakeVal(w[0].stake)
WinWin.show({title:one?'Победитель':'Ничья — банк делится',name:w.map((function(x){return x.name})).join(' и '),color:w[0].color,avaHtml:function(){try{return getScannerPlayerAvatarHtml({name:w[0].name})}catch(e){return''}}(),line:'очки: <b style="color:#86efac">'+w[0].sum+'</b> из 21',total:share+gv,gram:share,gifts:gifts,stake:stakeV})}function resSheet(){var B=bank(),w=S.win.map((function(i){
return S.seats[i]})),mine=w.some((function(s){return s.me})),share=w.length?B.gram/w.length*.95:0
var conf=mine?'<div class="dv-conf">'+Array.apply(null,Array(22)).map((function(_,k){return'<i style="left:'+(k*4.6+2).toFixed(1)+'%;--d:'+(k%7*.13).toFixed(2)+'s;--x:'+(k*37%60-30)+'px;--c:'+['#5eead4','#f472b6','#fbbf24','#38bdf8','#a78bfa'][k%5]+'"></i>'})).join('')+'</div>':''
return'<div class="dv-sheet res" onclick="if(event.target===this)dvClose()"><div class="dv-sh'+(mine?' win':'')+'"><i class="grab"></i>'+conf+'<small class="dv-r-k">'+(w.length>1?'ничья — банк делится':w.length?mine?'ты победил':'победитель':'все перебрали')+'</small>'+'<div class="dv-r-w">'+w.map((function(s){
return'<span style="--c:'+s.color+'">'+ava(s)+'<b>'+esc(nm(s))+'</b><em>'+s.sum+'</em><span class="d">'+s.dice.map((function(v){return die(v,'sm')})).join('')+'</span></span>'
})).join('')+'</div>'+(w.length?'<div class="dv-r-p"><small>'+(mine?'ты забираешь':'забирает')+'</small>'+gram('+'+n2(share),'big')+(B.gifts.length&&w.length===1?'<small>и подарки из банка</small><span class="dv-gs l">'+B.gifts.map((function(g){return gt(g,'l')
})).join('')+'</span>':'')+'</div>':'<div class="dv-r-p"><small>ставки возвращены</small></div>')+'<div class="dv-r-t">'+S.seats.map((function(s,i){if(!s||s.st==='win')return''
return'<span class="s-'+s.st+'" onclick="dvInfo('+i+')">'+ava(s)+'<b>'+esc(nm(s))+'</b><em>'+s.sum+'</em></span>'})).join('')+'</div>'+'<div class="dv-acts"><button type="button" class="dv-btn main" onclick="dvAgain()">Сыграть ещё</button><button type="button" class="dv-btn ghost" onclick="dvClose()">Закрыть</button></div></div></div>'}function render(){if(!root||!S)return
var sc=root.scrollTop
if(!root._in){root.innerHTML=''
root._in=document.createElement('div')
root.appendChild(root._in)
layer=document.createElement('div')
layer.className='dv-phys'
root.appendChild(layer)}if(ROOMS_ON)roomHead()
root._in.innerHTML='<div class="dv-in">'+R[V]()+'</div>'
if(S.res&&window.WinWin&&!S.wwShown){S.wwShown=true
S.res=false
winWindow()}var sh=S.info!=null?infoSheet():S.res?resSheet():''
if(sheetEl.dataset.k==='stake'&&!sh){}else if(sheetEl.dataset.k!==sh){var keep=!!sheetEl.innerHTML&&!!sh
sheetEl.innerHTML=sh
sheetEl.dataset.k=sh
sheetEl.classList.toggle('keep',keep)}root.scrollTop=sc}window.__dcv={get S(){return S},render:render,newRound:newRound}
function mount(){root=document.createElement('div')
root.id='dcv'
sheetEl=document.createElement('div')
sheetEl.id='dcvSheet'
document.body.appendChild(sheetEl);(document.getElementById('menu')||document.body).appendChild(root)
H.classList.add('dz-open','dcv-open')
try{setActiveBottomNav('pvp')}catch(x){}newRound()}if(!window.__DCV_APP)window.addEventListener('load',(function(){setTimeout(mount,3600)}))
var LASTR=0
window.dvOpenTable=function(entry,room){if(ROOMS_ON){var t=room!=null?room:LASTR
if(!root){root=document.createElement('div')
root.id='dcv'
sheetEl=document.createElement('div')
sheetEl.id='dcvSheet'
document.body.appendChild(sheetEl);(document.getElementById('menu')||document.body).appendChild(root)}root.style.display=''
root.scrollTop=0
H.classList.add('dz-open','dcv-open')
try{setActiveBottomNav('pvp')}catch(x){}ROOM=ROOMS[t].pk?0:t
ENTRY=ROOMS[ROOM].min
PICK=ROOMS[ROOM].chips[1]
JOIN=null
S=null
roomsNewRound()
if(ROOMS[t].pk)window.dvRoom(t)
tgBack(true)
return}ENTRY=entry||ENTRY
if(!root){root=document.createElement('div')
root.id='dcv'
sheetEl=document.createElement('div')
sheetEl.id='dcvSheet'
document.body.appendChild(sheetEl);(document.getElementById('menu')||document.body).appendChild(root)}root.style.display=''
root.scrollTop=0
H.classList.add('dz-open','dcv-open')
try{setActiveBottomNav('pvp')}catch(x){}newRound()
tgBack(true)}
/* стрелка «назад» в шапке Telegram: на столе ведёт со стола, после выхода — как обычно для экрана */
function tgBack(on){try{if(on)syncAppBackButton({forceShow:true,onClick:function(){window.dvCloseTable()}})
else syncAppBackButton()}catch(e){}}
window.dvCloseTable=function(){if(!root)return
clearT()
physClear()
if(window.WinWin)WinWin.hide()
if(sheetEl){sheetEl.innerHTML=''
sheetEl.dataset.k=''}if(ROOMS_ON){LASTR=ROOM
JOIN=null
if(ROOMS[ROOM].pk){if(window.pkStop)pkStop()
root._pk.style.display='none'
root._pk.innerHTML=''
root._in.style.display=''
root.classList.remove('pk-root')
ROOM=0}}S=null
root.style.display='none'
H.classList.remove('dz-open','dcv-open')
tgBack(false)}
window.dvBack=function(){if(window.__DCV_APP&&ROOMS_ON){window.dvCloseTable()
return}if(window.__DCV_APP){window.dvCloseTable()
try{window.mxDiceOpen()}catch(e){}}else window.dvStake()}
if(window.__DCV_APP){window.addEventListener('load',(function(){if(ROOMS_ON){window.mxDiceOpen=function(e){if(e&&e.stopPropagation)e.stopPropagation()
try{window.mxDiceClose()}catch(x){}window.dvOpenTable()}
window.mxDiceAt=function(amt,e){if(e&&e.stopPropagation)e.stopPropagation()
window.dvOpenTable(null,Number(amt)>1?1:0)}}var go=window.mxDiceGo
window.mxDiceGo=function(){var b=document.querySelector('#mxDice .dz-go'),m=b&&b.textContent.match(/(\d+(?:[.,]\d+)?)\s*GRAM/),n=m?parseFloat(m[1].replace(',','.')):5
try{window.mxDiceClose()}catch(e){}window.dvOpenTable(Math.round(n))}
var nav=window.handleBottomNav
if(typeof nav==='function')window.handleBottomNav=function(){if(H.classList.contains('dcv-open'))window.dvCloseTable()
return nav.apply(this,arguments)}
var bk=window.handleTelegramAppBack
if(typeof bk==='function')window.handleTelegramAppBack=function(){if(H.classList.contains('dcv-open')){window.dvBack()
return}return bk.apply(this,arguments)}}))}var sw=document.createElement('div')
sw.id='dvSw'
sw.innerHTML=Array.apply(null,Array(N_V)).map((function(_,i){return'<button type="button" data-v="'+(i+1)+'">'+(i+1)+'</button>'})).join('')
function mark(){sw.querySelectorAll('button').forEach((function(b){b.classList.toggle('on',+b.dataset.v===V)}))}sw.addEventListener('click',(function(e){var b=e.target.closest('button')
if(!b)return
e.stopPropagation()
V=+b.dataset.v
H.setAttribute('data-dcv',V)
try{localStorage.setItem('dcv',V)}catch(er){}mark()
if(root)root.scrollTop=0
render()}))
function msw(){if(FIX)return
document.body.appendChild(sw)
mark()}if(document.body)msw()
else document.addEventListener('DOMContentLoaded',msw)})();(function(){var H=document.documentElement,EMBED=!!window.__PK_EMBED
var ENTRY=1,ANTE=.1,RAISES=[.1,.25,.5],MAXR=3,TURN=30
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,(function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]}))}function n2(v){return(Math.round(v*100)/100).toFixed(2)}function r2(v){return Math.round(v*100)/100}function rnd(n){return 1+Math.floor(Math.random()*n)}function G(){return typeof CASE_GRAM_ICON_SVG!=='undefined'?CASE_GRAM_ICON_SVG:''}function gram(v,cls){
return'<span class="dv-g'+(cls?' '+cls:'')+'"><span class="dv-gi">'+G()+'</span>'+v+'</span>'}function ava(s){var a=''
try{a=getScannerPlayerAvatarHtml({name:s.name})}catch(e){}return'<span class="dv-av" style="--c:'+s.color+'">'+(a||'<span class="scanner-player-avatar">'+esc(s.name[0])+'</span>')+'</span>'}var FACE={1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]}
function die(v,cls){var h=''
for(var i=0;i<9;i++)h+='<i'+(FACE[v].indexOf(i)>=0?' class="on"':'')+'></i>'
return'<span class="dv-die'+(cls?' '+cls:'')+'">'+h+'</span>'}function me(){try{var p=getCurrentPlayer()
return p.name||p.username||'Ты'}catch(e){return'Ты'}}var BOTS=[['nightowl','#ff5d8f'],['Sasha_V','#ffb547'],['grammaster','#34d17f'],['lucky_bobr','#8b5cf6'],['dice_king','#38bdf8'],['Mira','#f472b6']]
var EMO=['🔥','😂','😱','👏','🎲']
var S=null,T=[],root=null,layer=null,W3=null
function later(fn,ms){var t=setTimeout((function(){var k=T.indexOf(t)
if(k>=0)T.splice(k,1)
fn()}),ms)
T.push(t)
return t}function clearT(){T.forEach(clearTimeout)
T=[]
if(S&&S.tick){clearInterval(S.tick)
S.tick=null}if(S&&S.tiv){clearInterval(S.tiv)
S.tiv=null}}function sum(p){return p.hid+p.dice.reduce((function(a,b){return a+b}),0)}function open(p){return p.dice.reduce((function(a,b){return a+b}),0)}function live(p){return p&&(p.st==='in'||p.st==='allin')}function lives(){return S.seats.map((function(p,i){return live(p)?i:-1})).filter((function(i){return i>=0}))}function nm(p){return p.me?'Ты':p.name}function newRound(){clearT()
physClear()
if(window.WinWin)WinWin.hide()
var seats=[null,null,null,null,null,null],used={},prev=S
seats[4]=mk(me(),'#34d6ff',true)
var pool=BOTS.slice().sort((function(){return Math.random()-.5}));[0,2,3,5].forEach((function(i,k){seats[i]=mk(pool[k][0],pool[k][1])}))
if(Math.random()<.5)seats[1]=mk(pool[4][0],pool[4][1])
S={rid:Math.random(),me:4,seats:seats,phase:'gather',cd:8,pot:0,cur:0,raises:0,turn:-1,timer:TURN,emo:{},round:(prev?prev.round:1180)+1,dealer:prev?nextSeat(prev.dealer,seats):0,betN:0,hist:prev?prev.hist:[]}
render()
S.tick=setInterval((function(){S.cd--
if(S.cd<=0){clearInterval(S.tick)
S.tick=null
deal()
return}render()}),1e3)}function mk(name,color,isMe){return{name:name,color:color,me:!!isMe,bot:!isMe,stack:ENTRY,inPot:0,rb:0,hid:0,dice:[],st:'in',act:'',acted:false}}function nextSeat(i,seats){seats=seats||S.seats
for(var k=1;k<=6;k++){var j=(i+k)%6
if(seats[j])return j}return i}function pay(p,a){a=r2(Math.min(a,p.stack))
p.stack=r2(p.stack-a)
p.rb=r2(p.rb+a)
p.inPot=r2(p.inPot+a)
S.pot=r2(S.pot+a)
if(p.stack<=0&&p.st==='in')p.st='allin'
return a}function deal(){S.phase='deal'
render()
var ord=[],i=S.dealer
for(var k=0;k<6;k++){i=(i+1)%6
if(S.seats[i])ord.push(i)}ord.forEach((function(j){var p=S.seats[j]
pay(p,ANTE)
p.rb=0}))
var k2=0;(function nx(){if(k2>=ord.length*2)return later((function(){betRound(1)}),500)
var p=S.seats[ord[k2%ord.length]]
if(k2<ord.length)p.hid=rnd(6)
else p.dice.push(rnd(6))
k2++
render()
later(nx,260)})()}function betRound(n){S.phase='bet'
S.betN=n
S.cur=0
S.raises=0
S.seats.forEach((function(p){if(p){p.rb=0
p.acted=false
if(live(p))p.act=''}}))
if(S.seats.filter((function(p){return p&&p.st==='in'})).length<2)return n===1?drawPhase():showdown()
S.turn=S.dealer
nextActor()}function nextActor(){if(lives().length<=1)return showdown()
for(var k=1;k<=6;k++){var j=(S.turn+k)%6,p=S.seats[j]
if(p&&p.st==='in'&&(!p.acted||p.rb<S.cur)){if(p.acted&&p.rb>=S.cur)continue
S.turn=j
S.timer=TURN
render()
bindTimer()
if(p.bot)later((function(){botBet(p)}),900+Math.random()*900)
return}}S.turn=-1
if(S.tiv){clearInterval(S.tiv)
S.tiv=null}render()
later((function(){S.betN===1?drawPhase():showdown()}),600)}function act(p,kind,x){if(!S||S.phase!=='bet'||S.seats[S.turn]!==p)return
var call=r2(S.cur-p.rb)
if(kind==='fold'){p.st='fold'
p.act='пас'}else if(kind==='check'){if(call>0)return
p.act='чек'}else if(kind==='call'){pay(p,call)
p.act=p.st==='allin'?'ва-банк':'колл'}else if(kind==='raise'||kind==='allin'){var add=kind==='allin'?p.stack:r2(call+x)
if(add>=p.stack)add=p.stack
pay(p,add)
if(p.rb>S.cur){S.cur=p.rb
S.raises++
S.seats.forEach((function(q){if(q&&q!==p&&q.st==='in')q.acted=false}))}p.act=p.st==='allin'?'ва-банк':'рейз'}p.acted=true
render()
later(nextActor,350)}function botBet(p){if(!S||S.phase!=='bet'||S.seats[S.turn]!==p)return
var s=sum(p),call=r2(S.cur-p.rb),r=Math.random(),canR=S.raises<MAXR&&p.stack>call
if(Math.random()<.15)emo(S.seats.indexOf(p),EMO[rnd(EMO.length)-1])
var str=S.betN===1?s>=9?.7:s>=6?.45:.25:s>=20?.95:s>=18?.75:s>=16?.45:.2
if(canR&&r<str*.45){if(S.betN===2&&s>=20&&Math.random()<.3)return act(p,'allin')
return act(p,'raise',RAISES[Math.floor(Math.random()*(str>.7?3:2))])}if(call<=0)return act(p,'check')
if(call>.3&&r>str+.25)return act(p,'fold')
if(r>str+.5)return act(p,'fold')
act(p,'call')}window.pkAct=function(k,x){var p=S&&S.seats[S.me]
if(p&&S.turn===S.me)act(p,k,x)}
function drawPhase(){S.phase='draw'
S.q=[]
var i=S.dealer
for(var k=0;k<6;k++){i=(i+1)%6
if(live(S.seats[i]))S.q.push(i)}S.seats.forEach((function(p){if(live(p))p.act=''}))
S.turn=-1
drawNext()}function drawNext(){if(S.tiv){clearInterval(S.tiv)
S.tiv=null}var i=S.q.shift()
if(i==null){S.turn=-1
physClear()
render()
return later((function(){betRound(2)}),600)}var p=S.seats[i]
S.turn=i
S.timer=TURN
physClear()
render()
bindTimer()
if(p.bot)later((function(){botDraw(p)}),900)}function botDraw(p){if(!S||S.phase!=='draw'||S.seats[S.turn]!==p)return
var s=sum(p)
if(s<15||s<17&&Math.random()<.35)return hit(p)
stand(p)}function hit(p){S.rolling=true
render()
var i=S.seats.indexOf(p),card=root.querySelector('.kc[data-i="'+i+'"] .kca'),fe=root.querySelector('.kq1-felt'),rid=S.rid
var done=function(v){if(!S||S.rid!==rid)return
p.dice.push(v)
S.rolling=false
var s=sum(p)
if(s>21&&!p.me){p.st='bust'
p.act='перебор'
render()
return later(drawNext,900)}if(s>21){p.st='bust'
p.act='перебор'
render()
return later(drawNext,900)}if(s===21){p.act='21!'
render()
return later(drawNext,800)}render()
if(p.bot)later((function(){botDraw(p)}),800)}
if(!(window.Dice3D&&layer&&card&&fe))return later((function(){done(rnd(6))}),600)
var c=relOf(card),f=relOf(fe)
world().throw(c.x,c.y,f.x+(Math.random()-.5)*f.w*.45,f.y+16+(Math.random()-.5)*f.h*.3).then(done)}function stand(p){p.act='хватит'
render()
later(drawNext,400)}window.pkHit=function(){var p=S&&S.seats[S.me]
if(p&&S.phase==='draw'&&S.turn===S.me&&!S.rolling)hit(p)}
window.pkStand=function(){var p=S&&S.seats[S.me]
if(p&&S.phase==='draw'&&S.turn===S.me&&!S.rolling)stand(p)}
function bindTimer(){if(S.tiv)clearInterval(S.tiv)
S.tiv=setInterval((function(){if(!S||S.turn<0||S.rolling)return
S.timer=Math.max(0,S.timer-1)
root.querySelectorAll('[data-tm]').forEach((function(el){el.style.setProperty('--t',S.timer)
var x=el.querySelector('[data-tmv]')
if(x)x.textContent=S.timer}))
if(S.timer<=0&&S.turn===S.me){clearInterval(S.tiv)
S.tiv=null
var p=S.seats[S.me]
if(S.phase==='bet')act(p,S.cur-p.rb>0?'fold':'check')
else if(S.phase==='draw')stand(p)}}),1e3)}function showdown(){if(S.tiv){clearInterval(S.tiv)
S.tiv=null}S.turn=-1
S.phase='result'
S.show=true
physClear()
var L=lives(),best=-1
L.forEach((function(i){var s=sum(S.seats[i])
if(s<=21&&s>best)best=s}))
var win=L.filter((function(i){return sum(S.seats[i])===best}))
S.win=win
S.ret=0
S.refund=false
if(!win.length){S.refund=true
S.seats.forEach((function(p){if(p){p.stack=r2(p.stack+p.inPot)}}))}else{S.share=r2(S.pot*.95/win.length)
win.forEach((function(i){var p=S.seats[i]
p.st='win'
p.won=S.share}))
S.seats.forEach((function(p,i){if(p&&win.indexOf(i)<0&&p.st!=='fold'&&p.st!=='bust')p.st='lose'}))
var w=S.seats[win[0]]
S.hist.unshift({name:nm(w),color:w.color,sum:best,pot:S.share})
if(S.hist.length>6)S.hist.length=6}var m=S.seats[S.me]
S.ret=m?m.stack:0
S.next=10
render()
if(win.length&&window.WinWin){var w0=S.seats[win[0]]
WinWin.show({title:win.length>1?'Ничья — банк делится':'Победитель',name:win.length>2?win.length+' игрока':win.map((function(i){return S.seats[i].name})).join(' и '),color:w0.color,avaHtml:function(){try{return getScannerPlayerAvatarHtml({name:w0.name})}catch(e){return''}}(),line:'очки: <b style="color:#86efac">'+best+'</b> из 21',total:S.share+w0.stack,gram:S.share+w0.stack,gifts:[],stake:ENTRY})
}S.tick=setInterval((function(){if(!S)return
S.next--
if(S.next<=0){clearInterval(S.tick)
S.tick=null
newRound()
return}var b=root.querySelector('.dv-next b')
if(b){b.textContent=S.next
root.querySelector('.dv-next i').style.setProperty('--n',S.next)}}),1e3)}function relOf(el){var r=el.getBoundingClientRect(),R=root.getBoundingClientRect()
return{x:r.left-R.left+r.width/2,y:r.top-R.top+root.scrollTop+r.height/2,w:r.width,h:r.height}}function world(){if(W3)return W3
W3=Dice3D.world(layer,(function(){var fe=root.querySelector('.kq1-felt')
if(!fe)return{cx:-999,cy:-999,w:10,h:10,R:5}
var r=relOf(fe)
return{cx:r.x,cy:r.y,w:r.w,h:r.h,R:parseFloat(getComputedStyle(fe).borderTopLeftRadius)||r.h/2}}),30)
return W3}function physClear(){if(W3)W3.clear()}function emo(i,x){S.emo[i]=x
render()
later((function(){if(S){delete S.emo[i]
render()}}),1800)}window.pkEmo=function(x){if(S)emo(S.me,x)}
var ACT={'пас':'f','чек':'k','колл':'c','рейз':'r','ва-банк':'a','хватит':'s','перебор':'b','21!':'w'}
function card(i){var p=S.seats[i]
if(!p)return'<div class="kc kv4 free"><span class="kc0">+</span><small>свободно</small></div>'
var on=S.turn===i,see=p.me||S.show,st=p.st==='allin'?'in':p.st
var add=p.dice.length-(p._sh||0)
p._sh=p.dice.length
var dd=p.dice.slice().reverse().slice(0,5).map((function(v,k){return die(v,'sm'+(add>0&&k<add?' nw':''))})).join('')
var hid=p.hid?see?die(p.hid,'sm pk-hd'+(p.me&&!S.show?' mine':'')):'<span class="dv-die sm pk-hd q">?</span>':''
var sm=!p.hid?'—':see?sum(p):p.dice.length?open(p)+'+?':'?'
var pill=p.act?'<em class="pk-a a-'+(ACT[p.act]||'k')+'">'+p.act+(p.rb>0&&S.phase==='bet'&&(p.act==='рейз'||p.act==='колл')?' '+n2(p.rb):'')+'</em>':''
return'<div class="kc kv4 pk ks-'+st+(p.me?' me':'')+(on?' turn':'')+'" data-i="'+i+'" style="--c:'+p.color+'">'+(S.emo[i]?'<span class="dv-emo">'+S.emo[i]+'</span>':'')+'<span class="kca">'+ava(p)+(on?'<i class="kqt" data-tm style="--t:'+S.timer+'"></i>':'')+'</span><b class="nm kcn">'+esc(nm(p))+'</b>'+'<span class="kcv pk-v">'+gram(n2(p.stack))+pill+'</span>'+'<span class="k4n"><b>'+sm+'</b>'+hid+'<span class="k4d'+(add>0&&p.dice.length>add?' push':'')+'" style="--n:'+Math.max(0,add)+'">'+dd+'</span></span></div>'
}function row(ix){return'<div class="kc-row">'+ix.map(card).join('')+'</div>'}function stage(){if(S.phase==='gather')return'<div class="kq-st wait"><b class="kqcd">'+Math.max(0,S.cd)+'</b><small>до раздачи</small></div>'
if(S.phase==='deal')return'<div class="kq-st wait"><small>раздача…</small></div>'
if(S.phase==='result'){if(S.refund)return'<div class="kq-st res"><small>все перебрали — вклады возвращены</small></div>'
var w=S.seats[S.win[0]]
return'<div class="kq-st res"><span class="kqwho">'+ava(w)+'<b>'+(S.win.length>1?'Ничья':esc(nm(w)))+'</b></span><div class="kqtray">'+die(w.hid,'kqd')+w.dice.map((function(v){return die(v,'kqd')})).join('')+'</div><span class="sm win">'+sum(w)+'</span></div>'}var c=S.turn>=0?S.seats[S.turn]:null
var who=c?'<span class="kqwho" style="--c:'+c.color+'">'+ava(c)+'<b>'+esc(c.me?'Твой ход':c.name)+'</b></span>':''
if(S.phase==='bet')return'<div class="kq-st ph pk-b">'+who+'<span class="pk-ph"><small>торги · круг '+S.betN+' из 2</small><b>'+(S.cur>0?'ставка '+n2(S.cur):'ставок нет')+'</b></span></div>'
var see=c&&(c.me||S.show),s=c?see?sum(c):open(c)+'+?':''
return'<div class="kq-st ph'+(c&&see&&sum(c)>21?' bust':'')+'" style="--c:'+(c?c.color:'#5eead4')+'">'+who+'<span class="sm">'+s+'<small>/21</small></span></div>'}function ctrl(){var m=S.seats[S.me],mine='<div class="pk-me"><span>Твои фишки '+gram(n2(m.stack),'w')+'</span><span>в банке '+gram(n2(m.inPot))+'</span></div>'
if(S.phase==='gather')return'<div class="dv-ctrl"><div class="dv-info">Вход '+ENTRY+' GRAM · анте '+n2(ANTE)+' · старт через <b>'+Math.max(0,S.cd)+'</b> с</div></div>'
if(S.phase==='result')return'<div class="dv-ctrl">'+(S.ret>0?'<div class="pk-ret">Неставленные фишки вернулись на баланс: '+gram(n2(S.ret),'w')+'</div>':'')+'<div class="dv-next"><i style="--n:'+S.next+'"></i><span>Новый раунд через <b>'+S.next+'</b> с</span></div></div>'
var tm='<div class="dv-tm" data-tm style="--t:'+S.timer+'"><i></i><span><b data-tmv>'+S.timer+'</b> с на ход</span></div>'
if(S.turn===S.me&&S.phase==='bet'){var call=r2(S.cur-m.rb),canR=S.raises<MAXR
return'<div class="dv-ctrl pk-c">'+mine+'<div class="dv-acts"><button type="button" class="dv-btn ghost" onclick="pkAct(\'fold\')">Пас</button>'+(call>0?'<button type="button" class="dv-btn main" onclick="pkAct(\'call\')">'+(call>=m.stack?'Ва-банк '+n2(m.stack):'Колл '+n2(call))+'</button>':'<button type="button" class="dv-btn main" onclick="pkAct(\'check\')">Чек</button>')+'</div>'+'<div class="pk-rs">'+RAISES.map((function(x){
var dis=!canR||call+x>=m.stack
return'<button type="button"'+(dis?' disabled':'')+' onclick="pkAct(\'raise\','+x+')"><small>рейз</small>+'+n2(x)+'</button>'})).join('')+'<button type="button" class="ai" onclick="pkAct(\'allin\')"><small>ва-банк</small>'+n2(m.stack)+'</button></div>'+tm+'</div>'}
if(S.turn===S.me&&S.phase==='draw'&&!S.rolling)return'<div class="dv-ctrl pk-c">'+mine+'<div class="dv-acts"><button type="button" class="dv-btn main" onclick="pkHit()">'+die(5,'xs')+'Ещё кубик</button><button type="button" class="dv-btn ghost" onclick="pkStand()">Хватит</button></div>'+tm+'</div>'
var c=S.turn>=0?S.seats[S.turn]:null,ph=S.phase==='bet'?'Торги · ':S.phase==='draw'?'Добор · ':''
return'<div class="dv-ctrl pk-c">'+mine+'<div class="dv-info">'+(c?ph+(c.me?'твой бросок':'ходит <b>'+esc(c.name)+'</b> · <span class="dv-tmi" data-tm style="--t:'+S.timer+'"><b data-tmv>'+S.timer+'</b> с</span>'):S.phase==='deal'?'Раздача: 1 закрытый + 1 открытый кубик':'…')+'</div></div>'}function hist(){
return S.hist.length?'<div class="dv-hist"><small>История стола</small><div class="dv-hr">'+S.hist.map((function(h){return'<span class="dv-hi">'+ava(h)+'<b>'+esc(h.name)+'</b><em>'+h.sum+'</em>'+gram('+'+n2(h.pot))+'</span>'})).join('')+'</div></div>':''}function render(){if(!root||!S)return
var sc=root.scrollTop
if(!root._in){root.innerHTML=''
root._in=document.createElement('div')
root.appendChild(root._in)
layer=document.createElement('div')
layer.className='dv-phys'
root.appendChild(layer)}if(EMBED&&window.dvHeadSub)dvHeadSub('Вход '+ENTRY+' GRAM · №'+S.round)
var bank='<div class="kq-bank"><small>банк</small>'+gram(n2(S.pot),'b')+'</div>'
root._in.innerHTML='<div class="dv-in">'+(EMBED?'':'<div class="dv-head"><div class="dv-ti"><span><b>Кости 21 · покер</b><i class="dv-q">?</i></span><small class="dv-rn2">Вход '+ENTRY+' GRAM · раунд №'+S.round+'</small></div></div>')+'<div class="kq1">'+row([0,1,2])+'<div class="kq-rail kq1-rail"><div class="kq-felt kq1-felt"><i class="kqlogo">21</i>'+bank+stage()+'</div></div>'+row([5,4,3])+'</div>'+ctrl()+'<div class="dv-emos">'+EMO.map((function(x){
return'<button type="button" onclick="pkEmo(\''+x+'\')">'+x+'</button>'})).join('')+'</div>'+hist()+'</div>'
root.scrollTop=sc}window.__pk={get S(){return S},newRound:newRound}
function mount(){root=document.createElement('div')
root.id='dcv'
root.className='pk-root';(document.getElementById('menu')||document.body).appendChild(root)
H.classList.add('dz-open','dcv-open')
try{setActiveBottomNav('pvp')}catch(x){}newRound()}window.pkStart=function(el,entry){if(entry){ENTRY=entry
ANTE=r2(entry*.1)
RAISES=[.1,.25,.5].map((function(x){return r2(x*entry)}))}root=el
root._in=null
layer=null
W3=null
S=null
newRound()}
window.pkStop=function(){clearT()
physClear()
S=null
if(root)root._in=null}
if(!EMBED)window.addEventListener('load',(function(){setTimeout(mount,3600)}))})()
