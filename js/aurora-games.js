window.__SCV_FIX=2
window.__SCV_APP=1;(function(){var DIA='<svg class="ww-dia" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#2a9ef1"/><path d="M7.5 8h9l2.6 3.3L12 18.5 4.9 11.3z" fill="#fff"/></svg>'
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
o.label=function(arr){faces.forEach((function(f,i){f[2]=arr[i]
for(var k=0;k<9;k++)f[0].children[k].className=PIPS[arr[i]].indexOf(k)>=0?'on':''}))}
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
D.forEach((function(p){p.d.el.remove()}))},dice:D}}/* разметка граней: какое число на какой грани, чтобы при этой ориентации M сверху было t */
function forceLabels(M,t){var N=FACES.map((function(f){return f[2]})),Lb=FACES.map((function(f){return f[0]})),k=0,bz=-2
N.forEach((function(n,i){var z=M[2][0]*n[0]+M[2][1]*n[1]+M[2][2]*n[2]
if(z>bz){bz=z
k=i}}))
var nk=N[k],nt=N[Lb.indexOf(t)],Q,dt=nk[0]*nt[0]+nk[1]*nt[1]+nk[2]*nt[2]
if(dt>.5)Q=I()
else if(dt<-.5){var a=[0,0,0]
for(var j=0;j<3;j++)if(!nt[j]){a[j]=1
break}Q=[0,1,2].map((function(x){return[0,1,2].map((function(y){return 2*a[x]*a[y]-(x===y?1:0)}))}))}else Q=rot([nt[1]*nk[2]-nt[2]*nk[1],nt[2]*nk[0]-nt[0]*nk[2],nt[0]*nk[1]-nt[1]*nk[0]],Math.PI/2).map((function(row){return row.map(Math.round)}))
return N.map((function(n){var q=[Q[0][0]*n[0]+Q[1][0]*n[1]+Q[2][0]*n[2],Q[0][1]*n[0]+Q[1][1]*n[1]+Q[2][1]*n[2],Q[0][2]*n[0]+Q[1][2]*n[1]+Q[2][2]*n[2]]
for(var i=0;i<6;i++)if(N[i][0]===q[0]&&N[i][1]===q[1]&&N[i][2]===q[2])return Lb[i]
return 1}))}
/* Стол с физикой кубиков. Шаг физики фиксированный (1/120 с) и случайность внутри шага —
   своя, с сохраняемым состоянием: поэтому бросок можно заранее «прокрутить» в памяти,
   узнать, какой гранью кубик ляжет, и разметить грани так, чтобы сверху оказалось
   число, которое выбросил сервер. Сам полёт при этом не меняется. */
function world(layer,getB,size){var D=[],r=size/2,last=performance.now(),alive=true,run=false,acc=0,FX=1/120,BF=null,RG={s:(Math.random()*4294967296)>>>0}
function rnd(g){var t=g.s=(g.s+0x6D2B79F5)>>>0
t=Math.imul(t^(t>>>15),t|1)
t^=t+Math.imul(t^(t>>>7),t|61)
return((t^(t>>>14))>>>0)/4294967296}
function sim(D,B,dt,g){D.forEach((function(p){p.x+=p.vx*dt
p.y+=p.vy*dt
if(p.h>0||p.vh>0){p.vh-=1300*dt
p.h+=p.vh*dt
p.M=mul(rot(p.w,Math.hypot(p.w[0],p.w[1],p.w[2])*dt),p.M)
if(p.h<=0){p.h=0
if(p.vh<-90){p.vh=-p.vh*.48
p.vx*=.86
p.vy*=.86
p.w=[p.w[0]*.6+(rnd(g)-.5)*8,p.w[1]*.6+(rnd(g)-.5)*8,p.w[2]*.7]}else p.vh=0}}else{var sp0=Math.hypot(p.vx,p.vy),dec=sp0>0?Math.max(0,sp0-(55+sp0*.55)*dt)/sp0:0
p.vx*=dec
p.vy*=dec
var sp=Math.hypot(p.vx,p.vy)
if(sp>2)p.M=mul(rot([-p.vy,p.vx,0],sp*dt/r),p.M)
if(sp<48){var M=p.M,bc=0,bz=0
for(var c=0;c<3;c++)if(Math.abs(M[2][c])>Math.abs(bz)){bz=M[2][c]
bc=c}var u=[M[0][bc]*Math.sign(bz),M[1][bc]*Math.sign(bz),M[2][bc]*Math.sign(bz)],ang=Math.acos(Math.min(1,u[2]))
if(ang>.002)p.M=ortho(mul(rot([u[1],-u[0],0],ang*Math.min(1,dt*(sp<15?12:5))),M))
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
p.w=[p.w[0]+ny*10,p.w[1]-nx*10,p.w[2]+(rnd(g)-.5)*8]
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
C.w=[C.w[0]+ny2*4,C.w[1]-nx2*4,C.w[2]]}}}}
function still(D){return D.every((function(p){return p.rest&&p.h===0&&p.vh===0}))}
/* физика спит, когда все кубики лежат */
/* отрисовка между двумя шагами физики (a от 0 до 1): кадры экрана идут неровно,
   и без этого кубик двигался бы рывками — то один шаг за кадр, то два, то ни одного */
function draw(a){D.forEach((function(p){var q=p.pv
if(!q||a>=1){p.d.setM(p.M)
p.d.pos(p.x,p.y,p.h)
return}var M=p.M.map((function(r,i){return r.map((function(v,j){return q.M[i][j]+(v-q.M[i][j])*a}))}))
p.d.setM(ortho(M))
p.d.pos(q.x+(p.x-q.x)*a,q.y+(p.y-q.y)*a,q.h+(p.h-q.h)*a)}))}
function step(now){if(!alive||!layer.isConnected||!D.length){run=false
BF=null
return}if(still(D)){draw(1)
run=false
BF=null
return}requestAnimationFrame(step)
acc+=Math.min(.1,(now-last)/1e3)
last=now
var B=BF||getB()
while(acc>=FX){D.forEach((function(p){p.pv={x:p.x,y:p.y,h:p.h,M:p.M}}))
sim(D,B,FX,RG)
acc-=FX}draw(acc/FX)}
function wake(){if(!run){run=true
acc=0
last=performance.now()
requestAnimationFrame(step)}}
function cl(p){return{x:p.x,y:p.y,h:p.h,vh:p.vh,vx:p.vx,vy:p.vy,w:p.w.slice(),M:p.M.map((function(a){return a.slice()})),rest:p.rest,inside:p.inside}}
function spawn(o){var d=make(size)
if(o.cls)d.el.classList.add(o.cls)
var air=.42,sc=1.15+Math.random()*.35,M=mul(rot([Math.random(),Math.random(),Math.random()],Math.random()*6),I())
var p={d:d,x:o.x0,y:o.y0,h:24,vh:1300*air/2,vx:(o.tx-o.x0)/air*sc+(Math.random()-.5)*60,vy:(o.ty-o.y0)/air*sc+(Math.random()-.5)*60,w:[(Math.random()-.5)*30,(Math.random()-.5)*30,(Math.random()-.5)*12],M:M,rest:false,inside:false}
d.setM(M)
d.pos(p.x,p.y,p.h)
return p}
function settle(p){var t0=performance.now()
return new Promise((function(res){(function wait(){if(!alive||!layer.isConnected)return res(p.want||p.d.top())
if(p.rest&&performance.now()-t0>600){setTimeout((function(){if(p.want&&p.d.top()!==p.want){window.__d3fix=(window.__d3fix||0)+1
p.d.label(forceLabels(p.M,p.want))}res(p.d.top())}),120)}else setTimeout(wait,80)})()}))}
/* бросок нескольких кубиков сразу; v — число, которое должно выпасть (если задано) */
function throwMany(list){var B=getB()
var P=list.map(spawn)
if(list.some((function(o){return o.v}))){BF=BF||B
var S=D.concat(P).map(cl),k0=D.length,g={s:RG.s},n=0
while(n<2400&&!still(S)){sim(S,BF,FX,g)
n++}P.forEach((function(p,k){var v=list[k].v
if(v){p.want=v
p.d.label(forceLabels(S[k0+k].M,v))}}))}else if(!run)BF=null
P.forEach((function(p){layer.appendChild(p.d.el)
D.push(p)}))
wake()
return Promise.all(P.map(settle))}
return{dice:D,throwMany:throwMany,throw:function(x0,y0,tx,ty,cls){return throwMany([{x0:x0,y0:y0,tx:tx,ty:ty,cls:cls}]).then((function(v){return v[0]}))},clear:function(){BF=null
D.splice(0).forEach((function(p){p.d.el.style.transition='opacity .35s'
p.d.el.style.opacity='0'
setTimeout((function(){p.d.el.remove()}),400)}))},stop:function(){alive=false}}}window.Dice3D={make:make,fly:fly,table:table,world:world,faceM:faceM,forceLabels:forceLabels}})();(function(){var N_V=4
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
/* Скругление арены: канвас обрезан CSS-ом со скруглёнными углами. Берём этот радиус
   (в единицах канваса), чтобы внутренний край рамки и вспышка от удара лазера
   шли по дуге угла, а не прямой полосой, которая упирается в срезанный угол. */
var RC=typeof WeakMap!=='undefined'?new WeakMap():null
function arenaR(ctx,size){var cv=ctx&&ctx.canvas;if(!cv||!cv.getBoundingClientRect)return 0
var c=RC&&RC.get(cv),now=performance.now()
if(c&&now-c.t<1000&&c.size===size)return c.r
var r=0,e=cv,w=cv.clientWidth||0
for(var k=0;e&&k<4&&!r;k++,e=e.parentElement){var br=parseFloat(getComputedStyle(e).borderTopLeftRadius)||0
if(br>0)r=br}
r=w?r*size/w:0
if(RC)RC.set(cv,{t:now,r:r,size:size})
return r}
function innerR(ctx,size,bw){return Math.max(0,arenaR(ctx,size)-bw)}
function bandPath(ctx,size,bw){var ri=innerR(ctx,size,bw)
ctx.beginPath()
ctx.rect(0,0,size,size)
if(ri>.5&&ctx.roundRect)ctx.roundRect(bw,bw,size-bw*2,size-bw*2,ri)
else ctx.rect(bw,bw,size-bw*2,size-bw*2)}
/* точка на скруглённом внутреннем крае рамки по длине s (обход по часовой от левого верхнего угла) */
function rrAt(s,size,bw,ri){var a0=bw,a1=size-bw,Ls=Math.max(0,a1-a0-2*ri),Ar=Math.PI/2*ri,P=4*(Ls+Ar)
s=(s%P+P)%P
var segs=[[a0+ri,a0,1,0],[a1-ri,a0+ri,-Math.PI/2],[a1,a0+ri,0,1],[a1-ri,a1-ri,0],[a1-ri,a1,-1,0],[a0+ri,a1-ri,Math.PI/2],[a0,a1-ri,0,-1],[a0+ri,a0+ri,Math.PI]]
for(var i=0;i<8;i++){var g=segs[i]
if(i%2===0){if(s<=Ls)return[g[0]+g[2]*s,g[1]+g[3]*s];s-=Ls}
else{if(s<=Ar){var t=g[2]+(ri?s/ri:0);return[g[0]+ri*Math.cos(t),g[1]+ri*Math.sin(t)]}s-=Ar}}
return[a0+ri,a0]}
function rrLen(size,bw,ri){return 4*(Math.max(0,size-2*bw-2*ri)+Math.PI/2*ri)}
function rrNear(x,y,size,bw,ri){var P=rrLen(size,bw,ri),best=0,bd=1e18
for(var s=0;s<P;s+=1){var q=rrAt(s,size,bw,ri),d=(q[0]-x)*(q[0]-x)+(q[1]-y)*(q[1]-y);if(d<bd){bd=d;best=s}}
return best}
var SPR={}
function glowSprite(acc){if(SPR[acc])return SPR[acc]
var c=document.createElement('canvas');c.width=c.height=64
var x=c.getContext('2d'),g=x.createRadialGradient(32,32,0,32,32,32)
g.addColorStop(0,'rgba(255,255,255,1)')
g.addColorStop(.35,'rgba('+acc+',.9)')
g.addColorStop(1,'rgba('+acc+',0)')
x.fillStyle=g;x.fillRect(0,0,64,64)
return SPR[acc]=c}
var GN=null
/* вспышка вдоль скруглённого края: цепочка мягких пятен с гауссовым спадом по длине —
   на прямой стороне выглядит как прежний вытянутый блик, у угла загибается по дуге */
function arcGlow(ctx,pt,size,bw,a,acc){var ri=innerR(ctx,size,bw)
if(pt._rsz!==size||pt._rri!==ri){var m=bw/2,cx=Math.max(m,Math.min(size-m,pt.x)),cy=Math.max(m,Math.min(size-m,pt.y))
pt._rs=rrNear(cx,cy,size,bw,ri);pt._rsz=size;pt._rri=ri}
var st=bw*.4,sg=bw*1.25,K=Math.ceil(sg*2.6/st)
if(GN===null){var S=0;for(var k=-K;k<=K;k++){var d=k*.4;S+=Math.exp(-d*d/(2*1.5625))*Math.max(0,1-Math.abs(d))}GN=1/S}
var spr=glowSprite(acc),ga=ctx.globalAlpha
for(var k=-K;k<=K;k++){var d=k*st,w=Math.exp(-d*d/(2*sg*sg))*a*GN*1.15
if(w<.004)continue
var q=rrAt(pt._rs+d,size,bw,ri)
ctx.globalAlpha=Math.min(1,w)
ctx.drawImage(spr,q[0]-bw,q[1]-bw,bw*2,bw*2)}
ctx.globalAlpha=ga}function paintBand(ctx,size,bw){var A=ARENA[V],lg=ctx.createLinearGradient(0,0,size,size)
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
halfGlow(ctx,inner(pp,size,bw),pp,size,bw,al*.9,A.acc)}))}}arcGlow(ctx,pt,size,bw,a,A.acc)
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
else document.addEventListener('DOMContentLoaded',mount)})();
