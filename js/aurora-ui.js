/* ===== Производительность на слабых телефонах =====
   Режим «лёгкой графики» (класс lq на <html>) включается, когда в Настройках выбрано
   «Качество графики: Низкое», либо при «Авто», если телефон не тянет 40 кадров/с (три замера подряд; метка живёт 3 дня).
   В нём: без размытия под стеклом, меньше частиц, канвасы в 1x и 30 к/с. */
window.__lq=function(){return document.documentElement.classList.contains('lq')};
/* Чёткость статуэток (лотти-модельки в баннерах и рефералах): рисуются в отдельном потоке и стоят дёшево,
   поэтому даже в лёгком режиме — не ниже 2x, иначе на телефонах они мыльные. */
window.__mdpr=function(){var d=window.devicePixelRatio||1;return Math.max(1,Math.min(d,window.__lq()?2:3))};
(function(){var R=document.documentElement,KEY='lm_perf_low'
function tier(){try{return getEffectiveQualityTier()}catch(e){return'mid'}}
/* Метка «телефон не тянет» живёт 3 дня, потом проверяем заново (старые метки '1' — сбрасываются) */
function flagged(){try{var v=+localStorage.getItem(KEY);if(v>1e12&&Date.now()-v<2592e5)return true;if(localStorage.getItem(KEY))localStorage.removeItem(KEY)}catch(e){}return false}
function apply(){R.classList.toggle('lq',tier()==='low')}
var det=window.detectOptimalQuality
if(typeof det==='function'){window.detectOptimalQuality=function(){if(flagged())return'low';return det.apply(this,arguments)}}
var setQ=window.setAppQuality
if(typeof setQ==='function'){window.setAppQuality=function(){var r=setQ.apply(this,arguments);apply();return r}}
function isAuto(){try{return appSettings.quality==='auto'}catch(e){return false}}
function low(){try{localStorage.setItem(KEY,String(Date.now()))}catch(e){}try{setAppQuality('auto')}catch(e){apply()}}
function probe(){var slow=0,n=0,t0=0
function f(t){if(!isAuto())return
if(document.hidden){t0=0;requestAnimationFrame(f);return}
if(!t0){t0=t;n=0;requestAnimationFrame(f);return}
n++
if(t-t0<2500){requestAnimationFrame(f);return}
var fps=n*1000/(t-t0);t0=0
if(fps<40){if(++slow>=3){low();return}}else if(slow)slow=0
setTimeout(function(){requestAnimationFrame(f)},4000)}
setTimeout(function(){requestAnimationFrame(f)},5000)}
apply()
try{if(isAuto()&&!flagged())probe()}catch(e){}
/* 5 статуэток в карточке «Зарабатывай до 15%» снова показываются (как в исходном приложении).
   Играют только когда окно рефералов открыто и карточка видна — это делает исходный код. */
})();
window.__origLvCards=window.renderReferralLevelCards
window.__origLvBadges=window.applyLevelRewardBadges;(function(){var TON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round" aria-hidden="true"><path d="M5.5 4.5h13a1.4 1.4 0 0 1 1.2 2.1L13 18.8a1.2 1.2 0 0 1-2 0L4.3 6.6a1.4 1.4 0 0 1 1.2-2.1zM12 4.5v14.6"/></svg>'
var HEART='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 1 1 12 6.1a5 5 0 1 1 7.5 6.5z"/></svg>'
var HEART_ON='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 1 1 12 6.1a5 5 0 1 1 7.5 6.5z"/></svg>'
var CART='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L21 8H6.2"/><circle cx="9.5" cy="20" r="1.2"/><circle cx="17" cy="20" r="1.2"/></svg>'
var CART_ON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>'
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,(function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]}))}function money(n){return Number(n||0).toFixed(2)}function plural(n,a,b,c){n=Math.abs(n)%100
var d=n%10
if(n>10&&n<20)return c
if(d>1&&d<5)return b
if(d===1)return a
return c}function giftsWord(n){return n+' '+plural(n,'подарок','подарка','подарков')}function compact(n){n=Number(n||0)
if(n>=1e3){var v=n/1e3
return(v%1?v.toFixed(1):String(v))+'k'}return String(Math.round(n))}function backdropCss(it){return it&&it.backdropCenterColor&&it.backdropEdgeColor?'background:radial-gradient(circle at 50% 42%,'+it.backdropCenterColor+','+it.backdropEdgeColor+');':''}function imgHtml(it){var url=typeof getGiftImageUrl==='function'?getGiftImageUrl(it):''
return url?'<img src="'+url+'" alt="" loading="lazy" onerror="this.setAttribute(\'data-broken\',\'1\')">':''}function nameOf(it){return esc(typeof getGiftDisplayName==='function'?getGiftDisplayName(it):it.giftType)}window.buildMarketGiftTileHtml=function(item){var isFav=typeof marketFavoriteIds!=='undefined'&&marketFavoriteIds.has(item.listingId)
var isCart=typeof marketCartIds!=='undefined'&&marketCartIds.has(item.listingId)
var id=Number(item.listingId)
return'<div class="market-gift-tile lx-gift" data-listing-id="'+id+'" onclick="openMarketGiftDetail('+id+')">'+'<div class="market-gift-tile-inner lx-gift-img" style="'+backdropCss(item)+'">'+imgHtml(item)+'<button type="button" class="market-gift-fav-btn'+(isFav?' is-active':'')+'" aria-label="'+(isFav?'Убрать из избранного':'В избранное')+'" onclick="toggleMarketGiftFavorite('+id+', event)">'+(isFav?HEART_ON:HEART)+'</button>'+'</div>'+'<div class="lx-gift-body"><div class="market-gift-name">'+nameOf(item)+'</div><div class="market-gift-number">#'+esc(item.number)+'</div></div>'+'<div class="market-gift-tile-footer">'+'<button type="button" class="lx-price" onclick="event.stopPropagation(); openMarketGiftDetail('+id+')">'+money(item.price)+TON+'</button>'+'<button type="button" class="market-gift-cart-btn'+(isCart?' is-active':'')+'" aria-label="'+(isCart?'Убрать из корзины':'В корзину')+'" onclick="toggleMarketGiftCart('+id+', event)">'+(isCart?CART_ON:CART)+'</button>'+'</div></div>'
}
window.buildInventoryGiftTileHtml=function(item){var id=Number(item.id)
var flag=item.hasActiveListing?'<span class="lx-gift-flag">На продаже</span>':''
var btn=item.hasActiveListing?'<button type="button" class="lx-wide-btn ghost" onclick="event.stopPropagation(); handleInventoryListToggle('+id+')">Снять · '+money(item.activeListingPrice)+'</button>':'<button type="button" class="lx-wide-btn" onclick="event.stopPropagation(); handleInventoryListToggle('+id+')">Продать</button>'
return'<div class="market-gift-tile lx-gift" onclick="openInventoryGiftDetail('+id+')">'+flag+'<div class="market-gift-tile-inner lx-gift-img" style="'+backdropCss(item)+'">'+imgHtml(item)+'</div>'+'<div class="lx-gift-body"><div class="market-gift-name">'+nameOf(item)+'</div><div class="market-gift-number">#'+esc(item.number)+'</div></div>'+'<div class="market-gift-tile-footer">'+btn+'</div></div>'
}
var _smv=window.setMenuView
window.setMenuView=function(view,opts){var cur=typeof currentMenuView!=='undefined'?currentMenuView:''
if(view==='home'&&cur==='scannerScreen'&&window.__fromPvp)view='pvpSelect'
if(view==='scannerScreen')window.__fromPvp=cur==='pvpSelect'||!!window.__fromPvp
else if(view!=='pvpSelect')window.__fromPvp=false
var r=_smv.call(this,view,opts)
var ps=document.getElementById('pvpSelectScreen')
if(ps)ps.classList.toggle('active',view==='pvpSelect')
if(view==='pvpSelect'){try{setActiveBottomNav('pvp')}catch(e){}}if(view==='profile')setTimeout(renderProfileExtras,0)
return r}
var _hbn=window.handleBottomNav
window.handleBottomNav=function(action,event){if(action==='pvp'){var btn=document.getElementById('navPvp')
var gavel=btn?btn.querySelector('.nav-icon-auction'):null
var auction=!!(gavel&&gavel.style.display!=='none')
var cur=typeof currentMenuView!=='undefined'?currentMenuView:''
if(!auction&&cur!=='scannerScreen'){if(event&&event.stopPropagation)event.stopPropagation()
try{closeModePopup()
closeHistoryPanel({preserveNav:true})
closeLeaderboard()}catch(e){}window.__fromPvp=false
setMenuView(cur==='pvpSelect'?'home':'pvpSelect')
try{syncAppBackButton()}catch(e){}return}}if(action==='arena')window.__fromPvp=false
return _hbn.apply(this,arguments)}
window.mkTab=function(t,e){if(e&&e.stopPropagation)e.stopPropagation()
try{if(t==='favorites')renderMarketFavorites()
if(t==='cart')renderMarketCart()
setMarketActiveView(t)}catch(x){}}
var _smav=window.setMarketActiveView
if(typeof _smav==='function')window.setMarketActiveView=function(v){var r=_smav.apply(this,arguments)
if(document.documentElement.hasAttribute('data-mix')){var pr=document.getElementById('marketPromoCarousel')
if(pr)pr.style.display=''}document.querySelectorAll('.lx-cat').forEach((function(b){b.classList.toggle('on',b.dataset.t===v)}))
return r}
window.lxFilter=function(key,e){if(e&&e.stopPropagation)e.stopPropagation()
var menu=document.getElementById('marketFilterMenu')
var open=menu&&menu.classList.contains('open')
if(key==='price'){if(!open)toggleMarketFilterMenu(e)
else closeFilterSection(e)
return}if(!open)toggleMarketFilterMenu(e)
try{openFilterSection(key,e)}catch(x){}}
function syncChips(){document.querySelectorAll('.lx-chip').forEach((function(c){var k=c.dataset.k,n=0
try{if(k==='price')n=(marketFilters.priceMin!=null?1:0)+(marketFilters.priceMax!=null?1:0)
else n=filterChosenCount(k)||0}catch(x){}c.classList.toggle('on',n>0)
var i=c.querySelector('i')
if(i)i.textContent=n?String(n):''}))}var _rmfm=window.renderMarketFilterMenu
if(typeof _rmfm==='function')window.renderMarketFilterMenu=function(){var r=_rmfm.apply(this,arguments)
syncChips()
return r}
function fillHome(){try{var list=typeof MARKET_LISTINGS!=='undefined'&&MARKET_LISTINGS?MARKET_LISTINGS.slice():[]
list.sort((function(a,b){return b.price-a.price}))
var box=document.getElementById('lxHomeLots')
if(box)box.innerHTML=list.length?list.slice(0,10).map((function(it){return window.buildMarketGiftTileHtml(it)})).join(''):'<div class="market-empty-state" style="flex:1">Лотов пока нет</div>'
var inv=typeof INVENTORY_GIFTS!=='undefined'&&INVENTORY_GIFTS?INVENTORY_GIFTS.length:0
document.querySelectorAll('.js-inv-word').forEach((function(e){e.textContent=giftsWord(inv)}))
document.querySelectorAll('.js-inv-n').forEach((function(e){e.textContent=String(inv)}))
syncChips()}catch(e){}}var _rmv=window.refreshMarketViews
if(typeof _rmv==='function')window.refreshMarketViews=function(){var r=_rmv.apply(this,arguments)
fillHome()
return r}
var _upg=window.updateProfileGiftsCount
if(typeof _upg==='function')window.updateProfileGiftsCount=function(){var r=_upg.apply(this,arguments)
fillHome()
return r}
function txt(id){var el=document.getElementById(id)
return el?(el.textContent||'').replace(/^Банк:\s*/i,'').replace(/^Раунд\s*№:\s*/i,'').trim():''}function put(id,t){var el=document.getElementById(id)
if(el&&t&&el.textContent!==t)el.textContent=t}setInterval((function(){put('pvpTimer',txt('scannerCountdownChip'))
put('pvpPool',txt('scannerPoolChip'))
put('pvpPlayers',txt('scannerPlayersCount'))
var rn=txt('scannerHomeRoundNumber')
put('pvpRound',rn?('№ '+rn).replace('№ —','—'):'')}),500)
function renderChart(series){var svg=document.getElementById('profileInvChart')
if(!svg||document.documentElement.hasAttribute('data-mix'))return
if(!series||series.length<2){svg.innerHTML=''
return}var min=Math.min.apply(null,series),max=Math.max.apply(null,series),span=max-min||1
var pts=series.map((function(v,i){return[i*(320/(series.length-1)),56-(v-min)/span*46]}))
var d=pts.map((function(p,i){return(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)})).join(' ')
var last=pts[pts.length-1]
svg.innerHTML='<defs><linearGradient id="lxg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".35"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs>'+'<path d="'+d+' L320 64 L0 64Z" fill="url(#lxg)"/><path d="'+d+'" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>'+'<circle cx="'+last[0]+'" cy="'+last[1]+'" r="4" fill="#fff" stroke="currentColor" stroke-width="2.5"/>'
}window.renderProfileExtras=function(){try{var bal=document.getElementById('profileScreenBalanceValue')
if(bal&&!bal.querySelector('small')){var m=(bal.textContent||'').match(/^([\d.,\s]+)\s*GRAM$/)
if(m)bal.innerHTML=m[1].trim()+'<small> GRAM</small>'}var best=document.getElementById('profileBestWinValue')
if(best){var t=(best.textContent||'').replace(/\s*GRAM$/,'')
if(t&&best.textContent!==t)best.textContent=t}var series=window.__invSeries||[],val=window.__invValue||0
put('profileInvValue',money(val)+' GRAM')
var dl=document.getElementById('profileInvDelta')
if(dl&&series.length>1){var ch=(series[series.length-1]-series[0])/(series[0]||1)*100
dl.textContent=(ch>=0?'+':'')+ch.toFixed(1)+'% за 7 дней'
dl.className='lx-delta'+(ch<0?' neg':'')}renderChart(series)
var data=typeof _lastReferralLevelsData!=='undefined'?_lastReferralLevelsData:null
if(data&&Array.isArray(data.levels)&&data.levels.length){var lv=data.levels,idx=Math.max(0,lv.findIndex((function(l){return l.key===data.levelKey})))
var cur=lv[idx],nxt=lv[idx+1],tv=Number(data.turnover||0)
put('profileRefLevel',cur.name||'—')
put('profileRefPercent',(cur.percent!=null?cur.percent:0)+'%')
put('profileRefTurnover',compact(tv)+' GRAM')
put('profileRefNext',nxt?compact(Math.max(0,nxt.threshold-tv))+' GRAM до следующего':'Максимальный уровень')
var steps=document.getElementById('profileRefSteps')
if(steps)steps.innerHTML=lv.map((function(l,i){return'<span class="lx-step'+(i<idx?' done':'')+(i===idx?' cur':'')+'">'+l.percent+'%</span>'})).join('')}}catch(e){console.warn(e)}}
var _rps=window.renderProfileScreen
if(typeof _rps==='function')window.renderProfileScreen=function(){var r=_rps.apply(this,arguments)
window.renderProfileExtras()
return r}
var _sbt=window.setBalanceTextIfChanged
if(typeof _sbt==='function')window.setBalanceTextIfChanged=function(el){var r=_sbt.apply(this,arguments)
if(el&&(el.id==='profileScreenBalanceValue'||el.id==='profileBestWinValue'))setTimeout(window.renderProfileExtras,0)
return r}
try{Object.defineProperty(window,'__invValue',{configurable:true,get:function(){try{return(typeof INVENTORY_GIFTS!=='undefined'&&INVENTORY_GIFTS||[]).reduce((function(a,g){return a+Number(g.price||g.activeListingPrice||0)}),0)}catch(e){return 0}}})}catch(e){}setTimeout((function(){fillHome()
window.renderProfileExtras()}),1200)
setTimeout(fillHome,2e3)})();(function(){function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,(function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]}))}function n2(v){return Number(v||0).toFixed(2)}function when(v){var ms=typeof tsToMs==='function'?tsToMs(v):new Date(v).getTime()
if(!ms)return'—'
var d=new Date(ms),now=new Date,pad=function(x){return String(x).padStart(2,'0')}
var t=pad(d.getHours())+':'+pad(d.getMinutes())
if(d.toDateString()===now.toDateString())return'Сегодня, '+t
var y=new Date(now)
y.setDate(now.getDate()-1)
if(d.toDateString()===y.toDateString())return'Вчера, '+t
return pad(d.getDate())+'.'+pad(d.getMonth()+1)+', '+t}var CROWN='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 7l4.5 4L12 4l4.5 7L21 7l-2 12H5z"/></svg>'
function rows(item){var me=String(getCurrentPlayer().id)
var list=(Array.isArray(item.results)?item.results:[]).map((function(r){return{id:String(r.playerId||r.id||''),name:r.name||'Игрок',avatar:r.avatar||null,color:r.color||r.roundColor||r.playerColor||'#34d6ff',stake:Number(r.stake||r.score||0),cells:Number(r.cellCount||0)}}))
var total=list.reduce((function(s,r){return s+r.cells}),0)||(typeof SCANNER_GRID_TOTAL_CELLS!=='undefined'?SCANNER_GRID_TOTAL_CELLS:1e4)
list.forEach((function(r){r.share=total?r.cells/total*100:0
r.isMe=r.id===me}))
return list}function bar(list){if(!list.length)return''
return'<div class="lx-rbar">'+list.map((function(r){return'<i style="flex:'+Math.max(r.share,1.5).toFixed(2)+';background:'+esc(r.color)+'"></i>'})).join('')+'</div>'}function playersHtml(list,winnerId){return list.slice().sort((function(a,b){return b.share-a.share})).map((function(r){var win=r.id===String(winnerId)
return'<div class="lx-rp'+(r.isMe?' me':'')+'">'+'<span class="lx-rp-dot" style="background:'+esc(r.color)+'"></span>'+getScannerPlayerAvatarHtml({name:r.name,avatar:r.avatar
})+'<span class="lx-rp-name">'+esc(r.name)+(r.isMe?' <em>вы</em>':'')+(win?'<span class="lx-crown">'+CROWN+'</span>':'')+'</span>'+'<span class="lx-rp-share">'+r.share.toFixed(1)+'%</span>'+'<span class="lx-rp-stake">'+n2(r.stake)+'</span></div>'})).join('')}window.getScannerRecentRoundCardHtml=function(item,index){var safeId=String(item.roundId||item.id||'recent_'+index)
var open=typeof expandedRecentRoundId!=='undefined'&&expandedRecentRoundId===safeId
var list=rows(item),w=getScannerHistoryWinnerMeta(item)
var wRow=list.filter((function(r){return r.id===w.id}))[0]
var mult=formatScannerMultiplier(w.payout||w.stake,w.stake)
var youWon=w.id===String(getCurrentPlayer().id)
return'<div class="history-match-card scanner-history-card lx-round'+(open?' is-expanded':'')+'" onclick="toggleScannerRecentRoundDetails(\''+esc(safeId)+'\', event)">'+'<div class="lx-round-top"><span class="lx-round-no">Раунд '+(item.roundNumber?'№'+esc(item.roundNumber):'')+'</span><span class="lx-round-time">'+when(item.finishedAt||item.playedAt)+'</span></div>'+'<div class="lx-round-main">'+'<span class="lx-round-ava" style="--c:'+esc(w.color)+'">'+getScannerPlayerAvatarHtml({
name:w.name,avatar:w.avatar
})+'</span>'+'<span class="lx-round-who"><b>'+esc(w.name)+(youWon?' <em>вы</em>':'')+'</b><small>Шанс '+(wRow?wRow.share.toFixed(1):'0')+'% · '+Number(item.participantCount||list.length)+' игр.</small></span>'+'<span class="lx-round-pay'+(youWon?' win':'')+'"><b>'+n2(w.payout)+'</b><small>'+mult+'</small></span>'+'</div>'+bar(list)+'<div id="'+getRecentRoundDetailsDomId(safeId)+'" class="scanner-history-details'+(open?' open':'')+'" data-scanner-recent-details="true" aria-hidden="'+(open?'false':'true')+'">'+'<div class="lx-round-pot"><span>Банк раунда</span><b>'+n2(item.totalPot)+' GRAM</b></div>'+playersHtml(list,w.id)+'</div></div>'
}
window.getScannerHistoryEntryHtml=function(item,index,matchId){var safe=String(matchId||'scanner_'+index)
var open=typeof expandedHistoryMatchId!=='undefined'&&expandedHistoryMatchId===safe
var list=rows(item),my=getScannerHistoryMyMeta(item),w=getScannerHistoryWinnerMeta(item)
var youWon=item.youWon===true||w.id&&w.id===String(getCurrentPlayer().id)
var myRow=list.filter((function(r){return r.isMe}))[0]
var amount=youWon?'+'+n2(w.payout):'−'+n2(my.stake)
return'<div class="history-match-card scanner-history-card lx-round lx-mine '+(youWon?'is-win':'is-lose')+(open?' is-expanded':'')+'" onclick="toggleScannerHistoryDetails(\''+esc(safe).replace(/'/g,'&#39;')+'\', event)">'+'<div class="lx-round-top"><span class="lx-round-no">Сканер'+(item.roundNumber?' · №'+esc(item.roundNumber):'')+'</span><span class="lx-round-time">'+when(item.playedAt||item.finishedAt)+'</span></div>'+'<div class="lx-round-main">'+'<span class="lx-res">'+(youWon?'Победа':'Поражение')+'</span>'+'<span class="lx-round-who"><b>Ставка '+n2(my.stake)+'</b><small>Шанс '+(myRow?myRow.share.toFixed(1):'0')+'% · '+Number(item.participantCount||list.length)+' игр.</small></span>'+'<span class="lx-round-pay '+(youWon?'win':'lose')+'"><b>'+amount+'</b><small>GRAM</small></span>'+'</div>'+bar(list)+'<div id="'+getHistoryDetailsDomId(safe)+'" class="scanner-history-details'+(open?' open':'')+'" data-scanner-history-details="true" aria-hidden="'+(open?'false':'true')+'">'+'<div class="lx-round-pot"><span>Банк раунда</span><b>'+n2(item.totalPot)+' GRAM</b></div>'+playersHtml(list,w.id)+'</div></div>'
}
var KIND={buy:{t:'Покупка',sign:'−',cls:'out',ico:'<path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L21 8H6.2"/>'},sell:{t:'Продажа',sign:'+',cls:'in',ico:'<path d="M7 17L17 7M8 7h9v9"/>'},withdraw:{t:'Вывод в Telegram',sign:'',cls:'neutral',ico:'<path d="M21 4L3 11l6 2 2 6 3-4 5 4z"/>'},deposit:{t:'Добавлен в маркет',sign:'',cls:'neutral',ico:'<path d="M12 5v14M5 12h14"/>'}
}
window.buildMarketHistoryRowHtml=function(item){var k=KIND[item.kind]||{t:item.kind,sign:'',cls:'neutral',ico:'<circle cx="12" cy="12" r="8"/>'}
var name=esc(item.giftTitle||item.giftSlug||'Подарок')+(item.number?' <span>#'+esc(item.number)+'</span>':'')
return'<div class="lx-tx">'+'<span class="lx-tx-ico '+k.cls+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+k.ico+'</svg></span>'+'<span class="lx-tx-body"><b>'+name+'</b><small>'+k.t+' · '+when(item.at)+'</small></span>'+(item.price!=null?'<span class="lx-tx-amt '+k.cls+'">'+k.sign+n2(item.price)+'</span>':'<span class="lx-tx-amt neutral">—</span>')+'</div>'
}
window.renderReferralTableRows=function(items){var listEl=document.getElementById('referralList')
if(!listEl)return
var box=document.getElementById('lxRefList')
if(!box){box=document.createElement('div')
box.id='lxRefList'
box.className='lx-ref-list'
var t=document.getElementById('referralTable')
if(t&&t.parentNode)t.parentNode.insertBefore(box,t)}var mode=typeof _referralMarketColumnMode!=='undefined'?_referralMarketColumnMode:'games'
box.innerHTML=(items||[]).map((function(it,i){var name=esc(it.name||it.username||'Игрок '+(it.playerId||it.id||''))
return'<div class="lx-ref">'+'<span class="lx-ref-n">'+(i+1)+'</span>'+'<span class="scanner-player-avatar">'+esc(name.charAt(0).toUpperCase())+'</span>'+'<span class="lx-ref-who"><b>'+name+'</b><small>оборот '+n2(it.turnover)+' GRAM</small></span>'+'<span class="lx-ref-earn"><b>+'+n2(it.totalEarn)+'</b><small>арена '+n2(it.gamesMarketEarn)+' · маркет '+n2(it.marketEarn)+'</small></span></div>'
})).join('')
listEl.innerHTML=''}})();(function(){var V=document.documentElement.getAttribute('data-v')||'1'
var TON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round" aria-hidden="true"><path d="M5.5 4.5h13a1.4 1.4 0 0 1 1.2 2.1L13 18.8a1.2 1.2 0 0 1-2 0L4.3 6.6a1.4 1.4 0 0 1 1.2-2.1zM12 4.5v14.6"/></svg>'
var HEART='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 1 1 12 6.1a5 5 0 1 1 7.5 6.5z"/></svg>'
var HEART_ON='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 1 1 12 6.1a5 5 0 1 1 7.5 6.5z"/></svg>'
var CART='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L21 8H6.2"/><circle cx="9.5" cy="20" r="1.2"/><circle cx="17" cy="20" r="1.2"/></svg>'
var PLUS='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>'
var CHECK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>'
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,(function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]}))}function money(n){return Number(n||0).toFixed(2)}function bg(it){return it.backdropCenterColor&&it.backdropEdgeColor?'background:radial-gradient(circle at 50% 42%,'+it.backdropCenterColor+','+it.backdropEdgeColor+');':''}function img(it){
var u=typeof getGiftImageUrl==='function'?getGiftImageUrl(it):''
return u?'<img src="'+u+'" alt="" loading="lazy" onerror="this.setAttribute(\'data-broken\',\'1\')">':''}function nm(it){return esc(typeof getGiftDisplayName==='function'?getGiftDisplayName(it):it.giftType)}function tier(it){var r=Number(it.modelRarity)
if(!isFinite(r)||!r)return{k:'rare',t:'Редкий'}
if(r<=1)return{k:'legend',t:'Легенда'}
if(r<=2)return{k:'epic',t:'Эпик'}
return{k:'rare',t:'Редкий'}}function favBtn(id,on){return'<button type="button" class="market-gift-fav-btn'+(on?' is-active':'')+'" aria-label="'+(on?'Убрать из избранного':'В избранное')+'" onclick="toggleMarketGiftFavorite('+id+', event)">'+(on?HEART_ON:HEART)+'</button>'}function cartBtn(id,on,icon){
return'<button type="button" class="market-gift-cart-btn'+(on?' is-active':'')+'" aria-label="'+(on?'Убрать из корзины':'В корзину')+'" onclick="toggleMarketGiftCart('+id+', event)">'+(on?CHECK:icon||CART)+'</button>'}var base=window.buildMarketGiftTileHtml
window.buildMarketGiftTileHtml=function(item){var id=Number(item.listingId)
var fav=typeof marketFavoriteIds!=='undefined'&&marketFavoriteIds.has(item.listingId)
var cart=typeof marketCartIds!=='undefined'&&marketCartIds.has(item.listingId)
var open='openMarketGiftDetail('+id+')'
var head='<div class="market-gift-tile lx-gift v'+V+'-gift" data-listing-id="'+id+'" onclick="'+open+'">'
if(V==='1'){
return head+'<div class="market-gift-tile-inner lx-gift-img" style="'+bg(item)+'">'+img(item)+favBtn(id,fav)+'</div>'+'<div class="lx-gift-body"><div class="market-gift-name">'+nm(item)+'</div><div class="market-gift-number">#'+esc(item.number)+'</div></div>'+'<div class="market-gift-tile-footer"><span class="v1-price">'+TON+money(item.price)+'</span>'+cartBtn(id,cart,PLUS)+'</div></div>'}
if(V==='2'){return head+'<div class="market-gift-tile-inner lx-gift-img" style="'+bg(item)+'">'+img(item)+favBtn(id,fav)+cartBtn(id,cart)+'<span class="v2-chip">'+money(item.price)+' GRAM</span></div>'+'<div class="lx-gift-body"><div class="market-gift-name">'+nm(item)+'</div><div class="market-gift-number">#'+esc(item.number)+(item.model?' · '+esc(item.model):'')+'</div></div></div>'}if(V==='3'){
return head+'<div class="market-gift-tile-inner lx-gift-img" style="'+bg(item)+'">'+img(item)+'</div>'+'<div class="lx-gift-body"><div class="market-gift-name">'+nm(item)+'</div><div class="market-gift-number">#'+esc(item.number)+(item.model?' · '+esc(item.model)+(item.modelRarity!=null?' '+esc(item.modelRarity)+'%':''):'')+'</div></div>'+'<div class="v3-px">'+money(item.price)+'</div>'+'<div class="market-gift-tile-footer"><button type="button" class="v3-buy" onclick="event.stopPropagation(); '+open+'">Купить</button>'+cartBtn(id,cart)+'</div></div>'
}if(V==='4'){var t=tier(item)
return'<div class="market-gift-tile lx-gift v4-gift t-'+t.k+'" data-listing-id="'+id+'" onclick="'+open+'"><span class="v4-tier">'+t.t+'</span>'+'<div class="market-gift-tile-inner lx-gift-img" style="'+bg(item)+'">'+img(item)+favBtn(id,fav)+'</div>'+'<div class="lx-gift-body"><div class="market-gift-name">'+nm(item)+'</div><div class="market-gift-number">#'+esc(item.number)+'</div></div>'+'<div class="market-gift-tile-footer"><button type="button" class="v4-price" onclick="event.stopPropagation(); '+open+'">'+money(item.price)+TON+'</button>'+cartBtn(id,cart)+'</div></div>'
}if(V==='5'){return head+'<div class="market-gift-tile-inner lx-gift-img" style="'+bg(item)+'">'+img(item)+favBtn(id,fav)+cartBtn(id,cart)+'<div class="v5-bar"><span><b class="market-gift-name">'+nm(item)+'</b><small class="market-gift-number">#'+esc(item.number)+'</small></span><em>'+money(item.price)+'</em></div></div></div>'}return base(item)}
function txt(id){var el=document.getElementById(id)
return el?(el.textContent||'').replace(/^Банк:\s*/i,'').trim():''}function setAll(sel,t){if(!t)return
document.querySelectorAll(sel).forEach((function(e){if(e.textContent!==t)e.textContent=t}))}function fill(){try{var list=typeof MARKET_LISTINGS!=='undefined'&&MARKET_LISTINGS?MARKET_LISTINGS.slice():[]
list.sort((function(a,b){return b.price-a.price}))
if(V==='3'){var tk=document.getElementById('v3Ticker')
if(tk&&list.length){var one=list.map((function(it,i){var ch=(i*37%13-5)/2
return'<span>'+nm(it)+' <b>'+money(it.price)+'</b> <i class="'+(ch>=0?'up':'dn')+'">'+(ch>=0?'▲':'▼')+Math.abs(ch).toFixed(1)+'%</i></span>'})).join('')
tk.innerHTML=one+one}}if(V==='2'){var f=document.getElementById('lxFeatured'),it=list[0]
if(f&&it)f.innerHTML='<div class="v2-feat-img" style="'+bg(it)+'">'+img(it)+'</div><div class="v2-feat-body"><span class="v2-feat-k">Лот дня</span><b>'+nm(it)+'</b><small>#'+esc(it.number)+(it.model?' · '+esc(it.model):'')+'</small><span class="v2-feat-price">'+money(it.price)+' <i>GRAM</i></span><button type="button" onclick="openMarketGiftDetail('+Number(it.listingId)+')">Смотреть</button></div>'
}}catch(e){}}var _rmv=window.refreshMarketViews
if(typeof _rmv==='function')window.refreshMarketViews=function(){var r=_rmv.apply(this,arguments)
fill()
return r}
setInterval((function(){setAll('.js-timer',txt('scannerCountdownChip'))
setAll('.js-pool',txt('scannerPoolChip'))
var b=document.getElementById('balanceValue')
if(b)setAll('.js-bal',(b.textContent||'').replace(/\s*GRAM/,''))
try{var p=getCurrentPlayer()
setAll('.js-name',p.name||'игрок')}catch(e){}}),600)
setTimeout(fill,1600)
if(V==='3')setTimeout((function(){try{if(marketViewMode==='grid')toggleMarketViewMode()}catch(e){}}),300)})();(function(){var V=document.documentElement.getAttribute('data-v')||'1'
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,(function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]}))}function n2(v){return Number(v||0).toFixed(2)}function txt(id){var el=document.getElementById(id)
return el?(el.textContent||'').trim():''}function put(el,t){if(el&&el.textContent!==t)el.textContent=t}var PAL={1:{a:'#070a14',b:'#0c1122',border:'rgb(24,28,44)',grid:'rgba(130,165,255,.07)',glow:'52,214,255'},2:{a:'#15120e',b:'#1b1712',border:'rgb(44,38,31)',grid:'rgba(212,247,74,.06)',glow:'212,247,74'},3:{a:'#060a08',b:'#0a120e',border:'rgb(22,34,27)',grid:'rgba(34,197,94,.09)',glow:'34,197,94'
},4:{a:'#1c0c3c',b:'#12072a',border:'rgb(59,37,119)',grid:'rgba(62,230,255,.09)',glow:'255,210,63'},5:{a:'#0d0f26',b:'#1a1238',border:'rgb(48,44,92)',grid:'rgba(255,255,255,.07)',glow:'245,208,254'}}[V]
var SUBP={2:{a:'#03130f',b:'#062019',border:'rgb(22,58,48)',grid:'rgba(110,231,183,.08)',glow:'110,231,183'},3:{a:'#1a0b14',b:'#2a0f1c',border:'rgb(84,36,52)',grid:'rgba(251,146,60,.08)',glow:'251,146,60'},4:{a:'#020a18',b:'#04122a',border:'rgb(18,60,92)',grid:'rgba(103,232,249,.09)',glow:'103,232,249'},5:{a:'#08051a',b:'#120a2c',border:'rgb(40,30,80)',grid:'rgba(255,255,255,.06)',
glow:'255,255,255'}}
var S5=document.documentElement.getAttribute('data-s')
if(V==='5'&&SUBP[S5])PAL=SUBP[S5]
var MX=document.documentElement.getAttribute('data-mix')
var MIXP={1:{a:'#0f0d2a',b:'#1b1340',border:'',grid:'rgba(196,181,253,.08)',glow:'245,208,254'},2:{a:'#06142a',b:'#0b1f3d',border:'',grid:'rgba(125,211,252,.09)',glow:'125,211,252'},3:{a:'#1a0718',b:'#2a0b2a',border:'',grid:'rgba(249,168,212,.08)',glow:'249,168,212'},4:{a:'#140b2e',b:'#1d1140',border:'',grid:'rgba(252,211,77,.07)',glow:'252,211,77'},5:{a:'#0b0f18',b:'#111827',border:'',
grid:'rgba(226,232,240,.07)',glow:'224,242,254'}}
MIXP['6']={a:'#03141a',b:'#0c3b3d',border:'',grid:'rgba(94,234,212,.1)',glow:'94,234,212'}
MIXP['7']={a:'#070b18',b:'#0a1022',border:'',grid:'rgba(251,191,36,.08)',glow:'251,191,36'}
MIXP['8']={a:'#07070b',b:'#1b1b28',border:'',grid:'rgba(255,255,255,.06)',glow:'224,231,255'}
MIXP['9']={a:'#2b1430',b:'#3a2346',border:'',grid:'rgba(255,214,231,.08)',glow:'125,200,255'}
MIXP['10']={a:'#12091f',b:'#1d0c2e',border:'',grid:'rgba(255,149,64,.08)',glow:'255,149,64'}
MIXP['11']={a:'#14532d',b:'#1d6b35',border:'',grid:'rgba(0,0,0,.2)',glow:'250,204,21'};['12','13','14'].forEach((function(k){MIXP[k]=MIXP['1']}));['15','16','17'].forEach((function(k){MIXP[k]=MIXP['6']}))
if(MX&&MIXP[MX])PAL=MIXP[MX]
var GRID_N=12,LASER='45,225,255'
var AR={1:{laser:'103,232,249',bgIn:'#1e2a6b',bgOut:'#0b0f2a',grid:'fine',gc:'rgba(165,180,252,.14)',bs:'grad',band:['rgba(99,102,241,.8)','rgba(34,211,238,.6)']},4:{laser:'255,214,102',bg:'#2b2552',grid:'fine',gc:'rgba(199,184,255,.22)',lw:2.2,bs:'clay',band:['#b9a7ff','#8f7cf0']},6:{laser:'94,234,212',bgIn:'#0c3b3d',bgOut:'#03141a',grid:'fine',gc:'rgba(94,234,212,.13)',bs:'aurora',
band:['#0f6b63','#0b5f78','#3f6a12']},7:{laser:'251,191,36',bg:'#0a1022',hatch:'rgba(251,191,36,.025)',grid:'fine',gc:'rgba(251,191,36,.14)',bs:'gold',band:['#141c33','#e8c26a']},8:{laser:'224,231,255',bgIn:'#1b1b28',bgOut:'#07070b',grid:'fine',gc:'rgba(224,231,255,.1)',bs:'holo',band:['#a5f3fc','#c4b5fd','#fde68a','#a7f3d0']},9:{laser:'125,200,255',bg:'#3a2346',grid:'fine',
gc:'rgba(255,214,231,.2)',lw:1.6,bs:'stitch',band:['#ffd6e7','#c98aa8']},10:{laser:'255,149,64',bg:'#1d0c2e',grid:'fine',gc:'rgba(183,148,255,.26)',lw:3,bs:'jelly',band:['#ff7a3d','#a855f7']},11:{laser:'250,204,21',bg:'#1d6b35',grid:'studs',bs:'brick',band:['#e3342f','#a61b17']}}[{12:'1',13:'1',14:'1',15:'6',16:'6',17:'6'}[MX]||MX]||null
if(AR){LASER=AR.laser
var CY=/45,\s?225,\s?255/g,TO=AR.laser.replace(/,/g,', ')
var tint=function(v){return typeof v==='string'&&v.indexOf('225')>0?v.replace(CY,TO):v};['strokeStyle','fillStyle','shadowColor'].forEach((function(k){var d=Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype,k)
if(!d||!d.set)return
Object.defineProperty(CanvasRenderingContext2D.prototype,k,{configurable:true,enumerable:d.enumerable,get:d.get,set:function(v){d.set.call(this,tint(v))}})}))
var _acs=CanvasGradient.prototype.addColorStop
CanvasGradient.prototype.addColorStop=function(o,c){return _acs.call(this,o,tint(c))}}if(AR)PAL.glow=AR.laser
function cutText(g,size,gap){if(!gap)return
g.save()
g.globalCompositeOperation='destination-out'
g.font='900 '+gap.fs+'px Arial'
g.textAlign='center'
g.textBaseline='middle'
g.lineJoin='round'
g.lineWidth=Math.max(26,gap.fs*.9)
g.strokeStyle='#000'
g.fillStyle='#000'
g.strokeText(gap.t,size/2,size/2)
g.fillText(gap.t,size/2,size/2)
g.restore()}function cutBand(g,size){var bw=Math.max(11,size*.031)+Math.max(8,size*.025)
g.save()
g.globalCompositeOperation='destination-out'
g.fillStyle='#000'
g.beginPath()
g.rect(0,0,size,size)
g.rect(bw,bw,size-bw*2,size-bw*2)
g.fill('evenodd')
g.restore()}function cellsSkip(i,j,step,gap){if(!gap)return false
var x0=i*step,y0=j*step
return x0+step>gap.x0&&x0<gap.x1&&y0+step>gap.y0&&y0<gap.y1}function mixGrid(g,size,gap){var step=size/GRID_N,i,j
if(AR.checker){for(i=0;i<GRID_N;i++)for(j=0;j<GRID_N;j++){if((i+j)%2&&!cellsSkip(i,j,step,gap)){g.fillStyle=AR.checker[0]
g.fillRect(i*step,j*step,step,step)}}return}if(AR.tile){var pd=Math.max(1.5,step*.07),rr=step*.24
for(i=0;i<GRID_N;i++)for(j=0;j<GRID_N;j++){if(cellsSkip(i,j,step,gap))continue
var x=i*step+pd,y=j*step+pd,w=step-pd*2
g.fillStyle=AR.tile[0]
g.beginPath()
g.roundRect(x,y,w,w,rr)
g.fill()
g.fillStyle=AR.tile[1]
g.beginPath()
g.roundRect(x+w*.12,y+w*.08,w*.76,w*.18,w*.09)
g.fill()}return}if(AR.grid==='fine'){drawGrid(g,size,AR.gc,Math.max(1,(AR.lw||1)*size/400),gap)
return}if(AR.grid==='studs'){var sr=step*.3
for(i=0;i<GRID_N;i++)for(j=0;j<GRID_N;j++){if(cellsSkip(i,j,step,gap))continue
var cx=i*step+step/2,cy=j*step+step/2
g.fillStyle='rgba(0,0,0,.22)'
g.beginPath()
g.arc(cx+sr*.12,cy+sr*.18,sr,0,Math.PI*2)
g.fill()
g.fillStyle='#26803f'
g.beginPath()
g.arc(cx,cy,sr,0,Math.PI*2)
g.fill()
g.fillStyle='rgba(255,255,255,.16)'
g.beginPath()
g.arc(cx-sr*.25,cy-sr*.25,sr*.45,0,Math.PI*2)
g.fill()}return}if(AR.grid==='dots'){drawGrid(g,size,AR.gc,1,gap)
g.fillStyle=AR.dc
for(i=1;i<GRID_N;i++)for(j=1;j<GRID_N;j++){var px=i*step,py=j*step
if(gap&&px>gap.x0&&px<gap.x1&&py>gap.y0&&py<gap.y1)continue
g.beginPath()
g.arc(px,py,Math.max(1.2,size/300),0,Math.PI*2)
g.fill()}return}if(AR.grid==='dash'){g.save()
g.setLineDash([Math.max(2,step*.12),Math.max(3,step*.16)])
drawGrid(g,size,AR.gc,1,gap)
g.restore()
g.strokeStyle=AR.dc
g.lineWidth=1.2
var c=Math.max(2.5,step*.12)
for(i=1;i<GRID_N;i++)for(j=1;j<GRID_N;j++){var qx=i*step,qy=j*step
if(gap&&qx>gap.x0-c&&qx<gap.x1+c&&qy>gap.y0-c&&qy<gap.y1+c)continue
g.beginPath()
g.moveTo(qx-c,qy)
g.lineTo(qx+c,qy)
g.moveTo(qx,qy-c)
g.lineTo(qx,qy+c)
g.stroke()}return}if(AR.grid==='bold'){drawGrid(g,size,'rgba(0,0,0,.55)',Math.max(1.5,size/220),gap)
g.save()
g.globalAlpha=.9
var thick=function(p){return p%4===0}
for(i=4;i<GRID_N;i+=4){var p=Math.round(i*step)
if(gap&&p>gap.y0&&p<gap.y1){seg(g,0,p,gap.x0,p,'rgba(196,240,65,.35)',false,true,step*.45)
seg(g,gap.x1,p,size,p,'rgba(196,240,65,.35)',true,false,step*.45)}else{g.lineWidth=1.5
seg(g,0,p,size,p,'rgba(196,240,65,.35)',false,false,0)}if(gap&&p>gap.x0&&p<gap.x1){seg(g,p,0,p,gap.y0,'rgba(196,240,65,.35)',false,true,step*.45)
seg(g,p,gap.y1,p,size,'rgba(196,240,65,.35)',true,false,step*.45)}else seg(g,p,0,p,size,'rgba(196,240,65,.35)',false,false,0)}g.restore()
return}drawGrid(g,size,AR.gc||PAL.grid,1,gap)}function mixBg(g,w){if(AR.bgIn){var r=g.createRadialGradient(w/2,w/2,0,w/2,w/2,w*.72)
r.addColorStop(0,AR.bgIn)
r.addColorStop(1,AR.bgOut)
g.fillStyle=r
g.fillRect(0,0,w,w)
return}if(AR.checker){g.fillStyle=AR.checker[1]
g.fillRect(0,0,w,w)
return}g.fillStyle=AR.bg
g.fillRect(0,0,w,w)
if(AR.hatch){g.strokeStyle=AR.hatch
g.lineWidth=Math.max(1,w/260)
for(var k=-w;k<w;k+=w/36){g.beginPath()
g.moveTo(k,w)
g.lineTo(k+w,0)
g.stroke()}}}function mixBand(ctx,size,bw){ctx.save()
ctx.beginPath()
ctx.rect(0,0,size,size)
ctx.rect(bw,bw,size-bw*2,size-bw*2)
ctx.clip('evenodd')
var B=AR.band,lg
if(AR.bs==='grad'){ctx.fillStyle='#1b1440'
ctx.fillRect(0,0,size,size)
lg=ctx.createLinearGradient(0,0,size,size)
lg.addColorStop(0,B[0])
lg.addColorStop(1,B[1])
ctx.fillStyle=lg
ctx.fillRect(0,0,size,size)
ctx.strokeStyle='rgba(255,255,255,.35)'
ctx.lineWidth=1
ctx.strokeRect(bw-.5,bw-.5,size-bw*2+1,size-bw*2+1)}else if(AR.bs==='clay'){ctx.fillStyle=B[0]
ctx.fillRect(0,0,size,size)
ctx.fillStyle='rgba(255,255,255,.35)'
ctx.fillRect(0,0,size,bw*.3)
ctx.fillStyle='rgba(40,20,90,.25)'
ctx.fillRect(0,size-bw*.3,size,bw*.3)
ctx.strokeStyle=B[1]
ctx.lineWidth=2
ctx.strokeRect(bw-1,bw-1,size-bw*2+2,size-bw*2+2)}else if(AR.bs==='aurora'){ctx.fillStyle='#04201f'
ctx.fillRect(0,0,size,size)
lg=ctx.createLinearGradient(0,0,size,0)
lg.addColorStop(0,B[0])
lg.addColorStop(.5,B[1])
lg.addColorStop(1,B[2])
ctx.globalAlpha=.85
ctx.fillStyle=lg
ctx.fillRect(0,0,size,size)
ctx.globalAlpha=1
ctx.fillStyle='rgba(255,255,255,.12)'
ctx.fillRect(0,0,size,bw*.22)}else if(AR.bs==='gold'){ctx.fillStyle=B[0]
ctx.fillRect(0,0,size,size)
ctx.strokeStyle=B[1]
ctx.lineWidth=1.5
ctx.strokeRect(bw*.3,bw*.3,size-bw*.6,size-bw*.6)
ctx.strokeRect(bw-1.5,bw-1.5,size-bw*2+3,size-bw*2+3)
ctx.fillStyle=B[1];[[bw/2,bw/2],[size-bw/2,bw/2],[bw/2,size-bw/2],[size-bw/2,size-bw/2]].forEach((function(q){ctx.save()
ctx.translate(q[0],q[1])
ctx.rotate(Math.PI/4)
ctx.fillRect(-bw*.22,-bw*.22,bw*.44,bw*.44)
ctx.restore()}))}else if(AR.bs==='holo'){lg=ctx.createLinearGradient(0,0,size,size)
B.forEach((function(c,k){lg.addColorStop(k/(B.length-1),c)}))
ctx.fillStyle=lg
ctx.fillRect(0,0,size,size)
lg=ctx.createLinearGradient(size,0,0,size)
lg.addColorStop(0,'rgba(255,255,255,0)')
lg.addColorStop(.5,'rgba(255,255,255,.45)')
lg.addColorStop(1,'rgba(255,255,255,0)')
ctx.fillStyle=lg
ctx.fillRect(0,0,size,size)
ctx.strokeStyle='#07070b'
ctx.lineWidth=2
ctx.strokeRect(bw-1,bw-1,size-bw*2+2,size-bw*2+2)}else if(AR.bs==='stitch'){ctx.fillStyle=B[0]
ctx.fillRect(0,0,size,size)
ctx.setLineDash([bw*.45,bw*.35])
ctx.strokeStyle=B[1]
ctx.lineWidth=1.6
ctx.strokeRect(bw/2,bw/2,size-bw,size-bw)
ctx.setLineDash([])
ctx.fillStyle='rgba(255,255,255,.5)'
ctx.fillRect(0,0,size,bw*.2)}else if(AR.bs==='jelly'){lg=ctx.createLinearGradient(0,0,size,size)
lg.addColorStop(0,B[0])
lg.addColorStop(1,B[1])
ctx.fillStyle=lg
ctx.fillRect(0,0,size,size)
ctx.fillStyle='rgba(255,255,255,.38)'
ctx.fillRect(bw*.2,bw*.12,size-bw*.4,bw*.22)
ctx.fillStyle='rgba(0,0,0,.2)'
ctx.fillRect(0,size-bw*.25,size,bw*.25)}else if(AR.bs==='brick'){ctx.fillStyle=B[0]
ctx.fillRect(0,0,size,size)
var bl=bw*2.6
ctx.strokeStyle=B[1]
ctx.lineWidth=1.5
for(var q=bl;q<size;q+=bl){ctx.beginPath()
ctx.moveTo(q,0)
ctx.lineTo(q,bw)
ctx.moveTo(q,size-bw)
ctx.lineTo(q,size)
ctx.moveTo(0,q)
ctx.lineTo(bw,q)
ctx.moveTo(size-bw,q)
ctx.lineTo(size,q)
ctx.stroke()}ctx.fillStyle='rgba(255,255,255,.25)'
ctx.fillRect(0,0,size,bw*.2)
ctx.strokeStyle='#7a1210'
ctx.lineWidth=2
ctx.strokeRect(bw-1,bw-1,size-bw*2+2,size-bw*2+2)}ctx.restore()}var EMPTY=null
var _bg={key:'',c:null},_grid={key:'',c:null,mask:null},_glow={key:'',c:null,g:null,p:null,pg:null,last:0}
function mk(w){var c=document.createElement('canvas')
c.width=c.height=Math.max(1,w)
return c}function dprOf(ctx){try{var t=ctx.getTransform()
return Math.max(1,Math.min(3,Math.abs(t.a)||1))}catch(e){return 1}}function textBox(size){var home=!!document.getElementById('scannerGridCanvas')&&!!document.getElementById('scannerGridCanvas').closest('#scannerHomeCanvasShell')
var fs=home?Math.max(9,size*.074):Math.max(22,size*.074)
var t=EMPTY&&EMPTY.text||(typeof L==='function'?L('Ожидание раунда...','Waiting for round...'):'Ожидание раунда...')
var m=document.createElement('canvas').getContext('2d')
m.font='900 '+fs+'px Arial'
var w=m.measureText(t).width,padX=Math.max(6,fs*.55),padY=Math.max(5,fs*.42)
return{x0:size/2-w/2-padX,x1:size/2+w/2+padX,y0:size/2-fs*.6-padY,y1:size/2+fs*.6+padY,home:home,fs:fs,t:t}}function seg(g,x1,y1,x2,y2,col,fadeA,fadeB,fl){var len=Math.hypot(x2-x1,y2-y1)
if(len<1)return
if(!fadeA&&!fadeB){g.strokeStyle=col}else{var gr=g.createLinearGradient(x1,y1,x2,y2),f=Math.min(.45,fl/len)
gr.addColorStop(0,fadeA?col.replace(/[\d.]+\)$/,'0)'):col)
gr.addColorStop(f,col)
gr.addColorStop(1-f,col)
gr.addColorStop(1,fadeB?col.replace(/[\d.]+\)$/,'0)'):col)
g.strokeStyle=gr}g.beginPath()
g.moveTo(x1,y1)
g.lineTo(x2,y2)
g.stroke()}function drawGrid(g,size,col,lw,box){g.lineWidth=lw
g.lineCap='round'
var step=size/GRID_N,fl=step*.45
for(var i=1;i<GRID_N;i++){var p=Math.round(i*step)+(lw%2?.5:0)
if(box&&p>box.y0&&p<box.y1){seg(g,0,p,box.x0,p,col,false,true,fl)
seg(g,box.x1,p,size,p,col,true,false,fl)}else seg(g,0,p,size,p,col,false,false,0)
if(box&&p>box.x0&&p<box.x1){seg(g,p,0,p,box.y0,col,false,true,fl)
seg(g,p,box.y1,p,size,col,true,false,fl)}else seg(g,p,0,p,size,col,false,false,0)}}function gridLayer(size,dpr,gap){var key=size+'|'+dpr+'|'+(gap?1:0)+'|'+(gap?gap.home?'h':'s':'')
if(_grid.key===key)return _grid
var w=Math.round(size*dpr),c=mk(w),g=c.getContext('2d')
g.scale(dpr,dpr)
var G2=AR?null:gap
if(AR)mixGrid(g,size,null)
else drawGrid(g,size,PAL.grid,1,gap)
var m=mk(w),mg=m.getContext('2d')
mg.scale(dpr,dpr)
drawGrid(mg,size,'rgba(255,255,255,1)',Math.max(1.4,size/260),G2)
if(AR){cutText(g,size,gap)
cutText(mg,size,gap)
cutBand(g,size)
cutBand(mg,size)}_grid={key:key,c:c,mask:m}
return _grid}function beamGlow(ctx,size,dpr,grid){var tier='high'
try{tier=getEffectiveQualityTier()}catch(e){}if(tier==='low'||!EMPTY||!EMPTY.sample)return
var w=Math.round(size*dpr),key=w+'|'+grid.key
if(_glow.key!==key){var c=mk(w),p=mk(w)
_glow={key:key,c:c,g:c.getContext('2d'),p:p,pg:p.getContext('2d'),last:0}}var now=performance.now(),dt=_glow.last?Math.min(80,now-_glow.last):16
_glow.last=now
var g=_glow.g,pg=_glow.pg
g.save()
g.setTransform(1,0,0,1,0,0)
g.globalCompositeOperation='destination-out'
g.fillStyle='rgba(0,0,0,'+Math.min(.5,.075*dt/16.67)+')'
g.fillRect(0,0,w,w)
g.restore()
var s=EMPTY.sample,bw=Math.max(11,size*.031)+1
var cx=Math.max(bw,Math.min(size-bw,size*s.x)),cy=Math.max(bw,Math.min(size-bw,size*s.y))
var soft=Math.max(10,size*.045),core=Math.max(2,size*.008)
pg.setTransform(1,0,0,1,0,0)
pg.globalCompositeOperation='source-over'
pg.clearRect(0,0,w,w)
pg.setTransform(dpr,0,0,dpr,0,0)
pg.save()
pg.translate(cx,cy)
pg.rotate(EMPTY.angle||0)
var L2=size*2.4,gr=pg.createLinearGradient(0,-soft,0,soft)
gr.addColorStop(0,'rgba('+LASER+',0)')
gr.addColorStop(.3,'rgba('+LASER+',.35)')
gr.addColorStop(.5,'rgba(225,252,255,1)')
gr.addColorStop(.7,'rgba('+LASER+',.35)')
gr.addColorStop(1,'rgba('+LASER+',0)')
pg.fillStyle=gr
pg.fillRect(-L2,-soft,L2*2,soft*2)
pg.restore()
var rr=size*.12,rg=pg.createRadialGradient(cx,cy,0,cx,cy,rr)
rg.addColorStop(0,'rgba(225,252,255,.8)')
rg.addColorStop(.35,'rgba('+LASER+',.4)')
rg.addColorStop(1,'rgba('+LASER+',0)')
pg.fillStyle=rg
pg.beginPath()
pg.arc(cx,cy,rr,0,Math.PI*2)
pg.fill()
pg.setTransform(1,0,0,1,0,0)
pg.globalCompositeOperation='destination-in'
pg.drawImage(grid.mask,0,0)
g.save()
g.setTransform(1,0,0,1,0,0)
g.globalCompositeOperation='lighter'
g.globalAlpha=Math.min(1,.24*dt/16.67)
g.drawImage(_glow.p,0,0)
g.restore()
ctx.save()
ctx.globalCompositeOperation='lighter'
ctx.globalAlpha=.8*(EMPTY.alpha==null?1:Math.max(.35,EMPTY.alpha))
ctx.drawImage(_glow.c,0,0,size,size)
ctx.restore()}window.drawScannerArenaBase=function(ctx,size){var dpr=dprOf(ctx),w=Math.round(size*dpr),key=w+''
if(_bg.key!==key){var c=mk(w),g=c.getContext('2d'),grad=g.createLinearGradient(0,0,0,w)
grad.addColorStop(0,PAL.a)
grad.addColorStop(1,PAL.b)
g.fillStyle=grad
g.fillRect(0,0,w,w)
if(AR)mixBg(g,w)
_bg={key:key,c:c}}var gap=EMPTY?textBox(size):null,grid=gridLayer(size,dpr,gap)
var rb=Math.max(16,size*.055)
var FLAT=document.documentElement.hasAttribute('data-mix')
ctx.save()
ctx.beginPath()
if(FLAT)ctx.rect(0,0,size,size)
else ctx.roundRect(0,0,size,size,rb)
ctx.clip()
ctx.drawImage(_bg.c,0,0,size,size)
ctx.drawImage(grid.c,0,0,size,size)
if(EMPTY){try{beamGlow(ctx,size,dpr,grid)}catch(e){}}ctx.restore()}
var _empty=window.drawScannerEmptyArenaState
if(typeof _empty==='function')window.drawScannerEmptyArenaState=function(ctx,size,beamSample,options){options=options||{}
var smp=beamSample
try{smp=smp||getScannerSharedLobbyBeamSample()}catch(e){}var ang=0
try{ang=typeof scannerLobbyLaserVisual.angle==='number'?scannerLobbyLaserVisual.angle:0}catch(e){}EMPTY={sample:smp,angle:ang,alpha:options.waitingTextAlpha==null?1:Math.max(0,Math.min(1,options.waitingTextAlpha)),text:options.waitingText}
try{return _empty.apply(this,arguments)}finally{EMPTY=null}}
function frame(ctx,size){var bw=Math.max(11,size*.031)+1
if(AR)mixBand(ctx,size,bw)
else if(!document.documentElement.hasAttribute('data-mix')){ctx.fillStyle=PAL.border
ctx.beginPath()
ctx.rect(0,0,size,size)
ctx.rect(bw,bw,size-bw*2,size-bw*2)
ctx.fill('evenodd')}return bw}window.drawScannerArenaBorderBackground=function(ctx,size){ctx.save()
ctx.globalAlpha=1
ctx.shadowBlur=0
ctx.shadowColor='transparent'
ctx.globalCompositeOperation='source-over'
frame(ctx,size)
ctx.restore()}
window.drawScannerArenaBorder=function(ctx,size){ctx.save()
ctx.globalAlpha=1
ctx.shadowBlur=0
ctx.shadowColor='transparent'
ctx.globalCompositeOperation='source-over'
var bw=frame(ctx,size),now=performance.now()
try{for(var i=_borderGlowPoints.length-1;i>=0;i--){var pt=_borderGlowPoints[i],age=now-pt.t
if(age>800){_borderGlowPoints.splice(i,1)
continue}var alpha=Math.max(0,1-age/800)*.85,radius=bw*2.8
var dL=pt.x,dR=size-pt.x,dT=pt.y,dB=size-pt.y,dMin=Math.min(dL,dR,dT,dB)
var gx=dMin===dL?bw*.5:dMin===dR?size-bw*.5:pt.x
var gy=dMin===dT?bw*.5:dMin===dB?size-bw*.5:pt.y
var grad=ctx.createRadialGradient(gx,gy,0,gx,gy,radius)
grad.addColorStop(0,'rgba('+PAL.glow+','+alpha+')')
grad.addColorStop(1,'rgba('+PAL.glow+',0)')
ctx.save()
ctx.fillStyle=grad
ctx.beginPath()
ctx.rect(0,0,size,size)
ctx.rect(bw,bw,size-bw*2,size-bw*2)
ctx.fill('evenodd')
ctx.restore()
if(document.documentElement.hasAttribute('data-mix')){var a2=Math.pow(Math.max(0,1-age/800),1.4),R2=bw*7,horiz=dMin===dT||dMin===dB
ctx.save()
ctx.globalCompositeOperation='lighter'
ctx.beginPath()
ctx.rect(0,0,size,size)
ctx.rect(bw,bw,size-bw*2,size-bw*2)
ctx.clip('evenodd')
var g2=ctx.createRadialGradient(gx,gy,0,gx,gy,R2)
g2.addColorStop(0,'rgba(255,255,255,'+(a2*.95).toFixed(3)+')')
g2.addColorStop(.25,'rgba('+PAL.glow+','+(a2*.9).toFixed(3)+')')
g2.addColorStop(1,'rgba('+PAL.glow+',0)')
ctx.fillStyle=g2
ctx.fillRect(gx-R2,gy-R2,R2*2,R2*2)
ctx.restore()
ctx.save()
ctx.globalCompositeOperation='lighter'
var ix=dMin===dL?bw:dMin===dR?size-bw:pt.x,iy=dMin===dT?bw:dMin===dB?size-bw:pt.y,Ln=bw*13*(.55+.45*a2)
var lg2=horiz?ctx.createLinearGradient(ix-Ln,iy,ix+Ln,iy):ctx.createLinearGradient(ix,iy-Ln,ix,iy+Ln)
lg2.addColorStop(0,'rgba(255,255,255,0)')
lg2.addColorStop(.5,'rgba(255,255,255,'+a2.toFixed(3)+')')
lg2.addColorStop(1,'rgba(255,255,255,0)')
ctx.strokeStyle=lg2
ctx.lineWidth=3.4
ctx.shadowColor='rgba('+PAL.glow+',1)'
ctx.shadowBlur=22*a2
ctx.beginPath()
if(horiz){ctx.moveTo(ix-Ln,iy)
ctx.lineTo(ix+Ln,iy)}else{ctx.moveTo(ix,iy-Ln)
ctx.lineTo(ix,iy+Ln)}ctx.stroke()
ctx.shadowBlur=0
ctx.beginPath()
ctx.rect(bw,bw,size-bw*2,size-bw*2)
ctx.clip()
var g3=ctx.createRadialGradient(ix,iy,0,ix,iy,bw*9)
g3.addColorStop(0,'rgba(255,255,255,'+(a2*.35).toFixed(3)+')')
g3.addColorStop(.2,'rgba('+PAL.glow+','+(a2*.6).toFixed(3)+')')
g3.addColorStop(1,'rgba('+PAL.glow+',0)')
ctx.fillStyle=g3
ctx.fillRect(ix-bw*9,iy-bw*9,bw*18,bw*18)
ctx.restore()}}}catch(e){}ctx.restore()}
function syncHighlights(){document.querySelectorAll('[data-src]').forEach((function(el){var t=txt(el.getAttribute('data-src')),f=el.getAttribute('data-fmt')
if(f==='x'){var mx=t.match(/x\s?[\d.,]+/i)
t=mx?mx[0].replace(/\s/g,''):''}if(f==='ch'){var mc=t.match(/[\d.,]+%/)
t=mc?mc[0]:''}put(el,t&&t!=='—'?t:el.tagName==='SMALL'||f?'':'—')}))}function miniRounds(){var box=document.getElementById('lxMiniRounds')
if(!box)return
var items=typeof scannerGridState!=='undefined'&&scannerGridState.recentRounds?scannerGridState.recentRounds.slice(0,V==='2'?8:V==='3'?5:4):[]
if(!items.length)return
var me=String(getCurrentPlayer().id)
var rows=items.map((function(it){var w=getScannerHistoryWinnerMeta(it)
return{w:w,it:it,mult:formatScannerMultiplier(w.payout||w.stake,w.stake),mine:w.id===me,ava:getScannerPlayerAvatarHtml({name:w.name,avatar:w.avatar})}}))
var html
if(V==='2')html=rows.map((function(r){return'<div class="a2-rc"><span class="a2-rc-ava" style="--c:'+esc(r.w.color)+'">'+r.ava+'</span><b>'+esc(r.w.name)+'</b><small>№'+esc(r.it.roundNumber||'—')+' · '+Number(r.it.participantCount||0)+' игр.</small><strong>'+n2(r.w.payout)+'</strong><em>'+r.mult+'</em></div>'})).join('')
else if(V==='3')html='<div class="a3-tr a3-th"><span>раунд</span><span>победитель</span><span>игр</span><span>выплата</span><span>x</span></div>'+rows.map((function(r){
return'<div class="a3-tr"><span>'+esc(r.it.roundNumber||'—')+'</span><b style="--c:'+esc(r.w.color)+'">'+esc(r.w.name)+(r.mine?' <i>вы</i>':'')+'</b><span>'+Number(r.it.participantCount||0)+'</span><span>'+n2(r.w.payout)+'</span><em>'+r.mult+'</em></div>'})).join('')
else if(V==='4')html=rows.map((function(r,i){
return'<div class="a4-br"><span class="a4-rank">'+(i+1)+'</span><span class="lx-mini-ava" style="--c:'+esc(r.w.color)+'">'+r.ava+'</span><span class="lx-mini-who"><b>'+esc(r.w.name)+(r.mine?' <em>вы</em>':'')+'</b><small>Раунд №'+esc(r.it.roundNumber||'—')+' · '+Number(r.it.participantCount||0)+' игр.</small></span><span class="a4-pay"><b>'+n2(r.w.payout)+'</b><small>'+r.mult+'</small></span></div>'
})).join('')
else html=rows.map((function(r){
return'<div class="lx-mini-row"><span class="lx-mini-ava" style="--c:'+esc(r.w.color)+'">'+r.ava+'</span>'+'<span class="lx-mini-who"><b>'+esc(r.w.name)+(r.mine?' <em>вы</em>':'')+'</b><small>Раунд №'+esc(r.it.roundNumber||'—')+' · '+Number(r.it.participantCount||0)+' игр.</small></span>'+'<span class="lx-mini-pay"><b>'+n2(r.w.payout)+'</b><small>'+r.mult+'</small></span></div>'})).join('')
if(box.innerHTML!==html)box.innerHTML=html}window.lxAllRounds=function(e){try{enterScannerGridMode(e)}catch(x){}setTimeout((function(){try{toggleScannerRoundsPanel()}catch(x){}}),120)}
var _rsrl=window.renderScannerRecentList
if(typeof _rsrl==='function')window.renderScannerRecentList=function(){var r=_rsrl.apply(this,arguments)
miniRounds()
return r}
var maxSec=20
function secs(t){var m=String(t).match(/(\d+):(\d+)/)
return m?+m[1]*60+ +m[2]:null}function hud(){var pool=txt('scannerScreenPoolChip').replace(/^Банк:\s*/i,''),time=txt('scannerScreenCountdownChip'),ch=txt('scannerChanceChip').replace(/^Мои шансы:\s*/i,'')
put(document.getElementById('lxHudPool'),pool||'—')
put(document.getElementById('lxHudTime'),time||'—')
put(document.getElementById('lxHudChance'),ch||'0%')
var s=secs(time),arc=document.getElementById('lxHudArc')
if(arc&&s!=null){if(s>maxSec)maxSec=s
arc.setAttribute('stroke-dashoffset',String(100-Math.max(0,Math.min(100,s/maxSec*100))))}}setInterval((function(){syncHighlights()
hud()}),400)
setTimeout(miniRounds,1500)
var REWARD_FALLBACK=[{slug:'lolpop',name:'Lol Pop',threshold:25e3},{slug:'cupidcharm',name:'Cupid Charm',threshold:8e4},{slug:'kissedfrog',name:'Kissed Frog',threshold:2e5},{slug:'minioscar',name:'Mini Oscar',threshold:3e5}]
var REWARD_KEYS=typeof LEVEL_REWARD_BY_CARD!=='undefined'?LEVEL_REWARD_BY_CARD:['worker','master','pro','pro_bonus']
var lastArgs=null
function compact(n){n=Number(n||0)
if(n>=1e3){var v=n/1e3
return(v%1?v.toFixed(1):String(v))+'k'}return String(Math.round(n))}var LOCK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>'
var CHECK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>'
window.renderReferralLevelCards=function(levels,turnover,levelKey){var row=document.getElementById('referralLevelsRow')
if(!row||!Array.isArray(levels)||!levels.length)return
lastArgs=[levels,turnover,levelKey]
var tv=Number(turnover||0),curIdx=Math.max(0,levels.findIndex((function(l){return l.key===levelKey})))
var rewards=typeof _levelRewards!=='undefined'&&_levelRewards&&_levelRewards.length?_levelRewards:[]
row.innerHTML='<div class="lx-lvl-head"><span>Уровни</span><small>Оборот приглашённых: <b>'+compact(tv)+' GRAM</b></small></div>'+levels.map((function(lv,i){var next=levels[i+1],end=next?next.threshold:REWARD_FALLBACK[i]?REWARD_FALLBACK[i].threshold:null
var state=i<curIdx?'done':i===curIdx?'cur':'lock'
var pct=end?Math.max(0,Math.min(100,(tv-lv.threshold)/(end-lv.threshold)*100)):100
var rw=REWARD_FALLBACK[i],srv=rewards.filter((function(r){return r.key===REWARD_KEYS[i]}))[0]
var given=!!(srv&&srv.given)
var name=typeof L==='function'?L(lv.name,lv.nameEn||lv.name):lv.name
return'<div class="lx-lvl '+state+'">'+'<div class="lx-lvl-top"><span class="lx-lvl-idx">'+(state==='done'?CHECK:state==='lock'?LOCK:String(i+1))+'</span>'+'<b>'+esc(name)+'</b>'+(state==='cur'?'<span class="lx-lvl-tag">Твой уровень</span>':'')+'<span class="lx-lvl-range">'+compact(lv.threshold)+(end?'–'+compact(end):'+')+'</span></div>'+'<div class="lx-lvl-stats"><div><small>С комиссии рефералов</small><b>'+lv.percent+'%</b></div><div><small>Твоя комиссия маркета</small><b>'+(lv.marketCommission!=null?lv.marketCommission+'%':'—')+'</b></div></div>'+(state==='cur'&&end?'<div class="lx-lvl-bar"><i style="width:'+pct.toFixed(1)+'%"></i></div><div class="lx-lvl-bar-cap"><span>'+compact(tv)+'</span><span>ещё '+compact(Math.max(0,end-tv))+' GRAM</span></div>':'')+(rw?'<div class="lx-lvl-reward"><span class="lx-lvl-gift"><img src="https://fragment.com/file/gifts/'+rw.slug+'/thumb.webp" alt="" loading="lazy" onerror="this.style.display=\'none\'"></span><span class="lx-lvl-rw"><small>Подарок за уровень</small><b>'+esc(rw.name)+'</b></span><em class="'+(given?'ok':'')+'">'+(given?'Получен':'при '+compact(rw.threshold))+'</em></div>':'')+'</div>'
})).join('')}
window.applyLevelRewardBadges=function(){if(lastArgs)window.renderReferralLevelCards.apply(null,lastArgs)}})();(function(){function txt(id){var el=document.getElementById(id)
return el?(el.textContent||'').trim():''}function after(t){var i=t.lastIndexOf(':')
return(i>=0?t.slice(i+1):t).trim()}function secs(t){var m=String(t).match(/(\d+):(\d+)/)
return m?+m[1]*60+ +m[2]:null}var maxSec=20
function values(){var pool=after(txt('scannerPoolChip'))||after(txt('scannerScreenPoolChip'))
var num=(pool.match(/[\d\s.,]+/)||[''])[0].trim()
var bal=(txt('balanceValue')||'').replace(/\s*GRAM/i,'')
var name='игрок'
try{name=getCurrentPlayer().name||name}catch(e){}return{timer:txt('scannerCountdownChip')||'—',pool:pool||'—',poolnum:num||'—',round:after(txt('scannerHomeRoundNumber'))||'—',players:txt('scannerPlayersCount')||'0',chance:after(txt('scannerChanceChip'))||'0%',bal:bal||'0.00',name:name}}function tick(){var v=values()
document.querySelectorAll('[data-m]').forEach((function(el){var k=el.getAttribute('data-m'),t=v[k]==null?'—':String(v[k])
if(el.textContent!==t)el.textContent=t}))
var s=secs(v.timer)
if(s!=null){if(s>maxSec)maxSec=s
var p=Math.max(0,Math.min(1,s/maxSec)).toFixed(3)
document.querySelectorAll('[data-mp]').forEach((function(el){el.style.setProperty('--p',p)}))}document.documentElement.classList.toggle('lx-round-live',/active|shuffling/.test(window.scannerGridState&&scannerGridState.status||''))}function setS(el,k,v){if(el.style.getPropertyValue(k)!==v||el.style.getPropertyPriority(k)!=='important')el.style.setProperty(k,v,'important')}function alignBet(){
var menu=document.getElementById('menu'),nav=document.querySelector('.bottom-bar'),fab=document.querySelector('.bottom-market-fab')
var bar=document.getElementById('scannerBetBar'),ef=document.getElementById('scannerBetBarEditFab')
if(!menu||!nav)return
var m=menu.getBoundingClientRect(),n=nav.getBoundingClientRect()
if(!n.width||!n.height)return
var VIS=62
function place(el,r){if(!el||!r.width)return
setS(el,'box-sizing','border-box')
setS(el,'left',Math.round(r.left-m.left)+'px')
setS(el,'right','auto')
setS(el,'width',Math.round(r.width)+'px')
setS(el,'padding-top','9px')
setS(el,'min-height',Math.round(r.height+VIS)+'px')}place(bar,n)
if(fab)place(ef,fab.getBoundingClientRect())
var content=document.getElementById('scannerScreenContent')
if(content)setS(content,'padding-bottom',Math.round(m.bottom-n.top+VIS+18)+'px')}function loop(){try{tick()}catch(e){}try{alignBet()}catch(e){}}setInterval(loop,400)
window.addEventListener('resize',(function(){setTimeout(alignBet,60)}))
setTimeout(loop,300)})();(function(){var V=document.documentElement.getAttribute('data-v')||'1'
if(V==='1')return
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,(function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]}))}function n2(v){return Number(v||0).toFixed(2)}function compact(n){n=Number(n||0)
if(n>=1e3){var v=n/1e3
return(v%1?v.toFixed(1):String(v))+'k'}return String(Math.round(n))}function bg(it){return it&&it.backdropCenterColor&&it.backdropEdgeColor?'background:radial-gradient(circle at 50% 42%,'+it.backdropCenterColor+','+it.backdropEdgeColor+');':''}function img(it){var u=typeof getGiftImageUrl==='function'?getGiftImageUrl(it):''
return u?'<img src="'+u+'" alt="" loading="lazy" onerror="this.setAttribute(\'data-broken\',\'1\')">':''}function nm(it){return esc(typeof getGiftDisplayName==='function'?getGiftDisplayName(it):it.giftType)}function tier(r){r=Number(r)
if(!isFinite(r)||!r)return{k:'rare',t:'Редкий'}
if(r<=1)return{k:'legend',t:'Легенда'}
if(r<=2)return{k:'epic',t:'Эпик'}
return{k:'rare',t:'Редкий'}}function ms(v){return typeof tsToMs==='function'?tsToMs(v):new Date(v).getTime()}function pad(x){return String(x).padStart(2,'0')}function hm(v){var t=ms(v)
if(!t)return'—'
var d=new Date(t)
return pad(d.getHours())+':'+pad(d.getMinutes())}function day(v){var t=ms(v)
if(!t)return'—'
var d=new Date(t),now=new Date
if(d.toDateString()===now.toDateString())return'Сегодня'
var y=new Date(now)
y.setDate(now.getDate()-1)
if(d.toDateString()===y.toDateString())return'Вчера'
return pad(d.getDate())+'.'+pad(d.getMonth()+1)}function when(v){return day(v)+', '+hm(v)}function svg(p,w){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||2)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>'}var I={sell:svg('<path d="M12 19V5M6 11l6-6 6 6"/>'),off:svg('<path d="M6 6l12 12M18 6L6 18"/>'),
win:svg('<path d="M5 12l5 5L20 7"/>',2.6),lose:svg('<path d="M6 6l12 12M18 6L6 18"/>',2.6),crown:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 7l4.5 4L12 4l4.5 7L21 7l-2 12H5z"/></svg>',chev:svg('<path d="M6 9l6 6 6-6"/>'),lock:svg('<rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),check:svg('<path d="M5 12l5 5L20 7"/>',2.8),
star:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 17.1l-5.7 3.1 1.2-6.3L2.8 9.5l6.4-.8z"/></svg>'}
function rows(item){var me=String(getCurrentPlayer().id)
var list=(Array.isArray(item.results)?item.results:[]).map((function(r){return{id:String(r.playerId||r.id||''),name:r.name||'Игрок',avatar:r.avatar||null,color:r.color||r.roundColor||r.playerColor||'#34d6ff',stake:Number(r.stake||r.score||0),cells:Number(r.cellCount||0)}}))
var total=list.reduce((function(s,r){return s+r.cells}),0)||1e4
list.forEach((function(r){r.share=total?r.cells/total*100:0
r.isMe=r.id===me}))
return list}function ava(p){return getScannerPlayerAvatarHtml({name:p.name,avatar:p.avatar})}function bar(list,cls){if(!list.length)return''
return'<div class="'+(cls||'lx-rbar')+'">'+list.map((function(r){return'<i style="flex:'+Math.max(r.share,1.5).toFixed(2)+';background:'+esc(r.color)+'"></i>'})).join('')+'</div>'}function players(list,winnerId){return list.slice().sort((function(a,b){return b.share-a.share})).map((function(r){var win=r.id===String(winnerId)
return'<div class="lx-rp'+(r.isMe?' me':'')+'"><span class="lx-rp-dot" style="background:'+esc(r.color)+'"></span>'+ava(r)+'<span class="lx-rp-name">'+esc(r.name)+(r.isMe?' <em>вы</em>':'')+(win?'<span class="lx-crown">'+I.crown+'</span>':'')+'</span>'+'<span class="lx-rp-share">'+r.share.toFixed(1)+'%</span><span class="lx-rp-stake">'+n2(r.stake)+'</span></div>'})).join('')}
function details(domId,open,item,list,wid,attr){return'<div id="'+domId+'" class="scanner-history-details'+(open?' open':'')+'" '+attr+'="true" aria-hidden="'+(open?'false':'true')+'">'+'<div class="lx-round-pot"><span>Банк раунда</span><b>'+n2(item.totalPot)+' GRAM</b></div>'+players(list,wid)+'</div>'}window.getScannerRecentRoundCardHtml=function(item,index){
var safe=String(item.roundId||item.id||'recent_'+index)
var open=typeof expandedRecentRoundId!=='undefined'&&expandedRecentRoundId===safe
var list=rows(item),w=getScannerHistoryWinnerMeta(item)
var wr=list.filter((function(r){return r.id===w.id}))[0]
var mult=formatScannerMultiplier(w.payout||w.stake,w.stake)
var me=w.id===String(getCurrentPlayer().id)
var cnt=Number(item.participantCount||list.length)
var no=item.roundNumber?'№'+esc(item.roundNumber):''
var click='onclick="toggleScannerRecentRoundDetails(\''+esc(safe)+'\', event)"'
var det=details(getRecentRoundDetailsDomId(safe),open,item,list,w.id,'data-scanner-recent-details')
var cls='history-match-card scanner-history-card lx-round v'+V+'-rr'+(open?' is-expanded':'')
if(V==='2'){
return'<div class="'+cls+'" '+click+'>'+'<div class="v2-row"><span class="v2-row-k">'+no+'<small>'+hm(item.finishedAt||item.playedAt)+'</small></span>'+'<span class="v2-row-main"><b>'+esc(w.name)+(me?' <em>вы</em>':'')+'</b><small>'+(wr?wr.share.toFixed(1):'0')+'% шанс · '+cnt+' игр.</small></span>'+'<span class="v2-row-num"><b>'+n2(w.payout)+'</b><small>'+mult+'</small></span></div>'+bar(list,'v2-thin')+det+'</div>'
}if(V==='3'){
return'<div class="'+cls+'" '+click+'>'+'<div class="v3-tr"><span class="c-no">'+(item.roundNumber||'—')+'</span><span class="c-who"><i style="background:'+esc(w.color)+'"></i>'+esc(w.name)+(me?'<em>вы</em>':'')+'</span>'+'<span class="c-ch">'+(wr?wr.share.toFixed(1):'0')+'%</span><span class="c-pl">'+cnt+'</span><span class="c-pay">'+n2(w.payout)+'</span><span class="c-x">'+mult+'</span></div>'+det+'</div>'
}if(V==='4'){
return'<div class="'+cls+'" '+click+'>'+'<div class="v4-rr-head"><span class="v4-rr-no">РАУНД '+no+'</span><span class="v4-rr-time">'+when(item.finishedAt||item.playedAt)+'</span></div>'+'<div class="v4-rr-body"><span class="v4-rr-ava" style="--c:'+esc(w.color)+'">'+ava(w)+'<span class="v4-rr-crown">'+I.crown+'</span></span>'+'<span class="v4-rr-who"><b>'+esc(w.name)+(me?' <em>вы</em>':'')+'</b><small>шанс '+(wr?wr.share.toFixed(1):'0')+'% · '+cnt+' игр.</small></span>'+'<span class="v4-rr-pay"><b>+'+n2(w.payout)+'</b><small>'+mult+'</small></span></div>'+bar(list,'v4-seg')+det+'</div>'
}
return'<div class="'+cls+'" '+click+'>'+'<span class="v5-tl-dot" style="--c:'+esc(w.color)+'"></span>'+'<div class="v5-tl-card"><div class="v5-tl-top"><span>Раунд '+no+'</span><span>'+hm(item.finishedAt||item.playedAt)+'</span></div>'+'<div class="v5-tl-main">'+ava(w)+'<span class="v5-tl-who"><b>'+esc(w.name)+(me?' <em>вы</em>':'')+'</b><small>'+(wr?wr.share.toFixed(1):'0')+'% · '+cnt+' игр.</small></span>'+'<span class="v5-tl-pay"><b>'+n2(w.payout)+'</b><small>'+mult+'</small></span></div>'+bar(list,'v5-glow')+det+'</div></div>'
}
window.getScannerHistoryEntryHtml=function(item,index,matchId){var safe=String(matchId||'scanner_'+index)
var open=typeof expandedHistoryMatchId!=='undefined'&&expandedHistoryMatchId===safe
var list=rows(item),my=getScannerHistoryMyMeta(item),w=getScannerHistoryWinnerMeta(item)
var won=item.youWon===true||w.id&&w.id===String(getCurrentPlayer().id)
var mine=list.filter((function(r){return r.isMe}))[0]
var amt=won?'+'+n2(w.payout):'−'+n2(my.stake)
var ch=(mine?mine.share.toFixed(1):'0')+'%'
var cnt=Number(item.participantCount||list.length)
var t=item.playedAt||item.finishedAt
var click='onclick="toggleScannerHistoryDetails(\''+esc(safe).replace(/'/g,'&#39;')+'\', event)"'
var det=details(getHistoryDetailsDomId(safe),open,item,list,w.id,'data-scanner-history-details')
var cls='history-match-card scanner-history-card lx-round lx-mine v'+V+'-mh '+(won?'is-win':'is-lose')+(open?' is-expanded':'')
var no=item.roundNumber?'№'+esc(item.roundNumber):''
if(V==='2'){
return'<div class="'+cls+'" '+click+' data-day="'+esc(day(t))+'">'+'<div class="v2-row"><span class="v2-row-k">'+hm(t)+'<small>'+no+'</small></span>'+'<span class="v2-row-main"><b>'+(won?'Выигрыш':'Проигрыш')+'</b><small>ставка '+n2(my.stake)+' · шанс '+ch+' · '+cnt+' игр.</small></span>'+'<span class="v2-row-num '+(won?'win':'lose')+'"><b>'+amt+'</b><small>GRAM</small></span></div>'+det+'</div>'}
if(V==='3'){return'<div class="'+cls+'" '+click+'>'+'<div class="v3-tr"><span class="c-res">'+(won?'W':'L')+'</span><span class="c-no">'+(item.roundNumber||'—')+'</span><span class="c-st">'+n2(my.stake)+'</span>'+'<span class="c-ch">'+ch+'</span><span class="c-t">'+day(t).replace('Сегодня','сег').replace('Вчера','вчр')+' '+hm(t)+'</span><span class="c-pnl">'+amt+'</span></div>'+det+'</div>'}
if(V==='4'){
return'<div class="'+cls+'" '+click+'>'+'<span class="v4-mh-rib">'+(won?I.win:I.lose)+'<b>'+(won?'WIN':'LOSE')+'</b></span>'+'<div class="v4-mh-in"><div class="v4-rr-head"><span class="v4-rr-no">СКАНЕР '+no+'</span><span class="v4-rr-time">'+when(t)+'</span></div>'+'<div class="v4-mh-stats"><span><small>Ставка</small><b>'+n2(my.stake)+'</b></span><span><small>Шанс</small><b>'+ch+'</b></span><span><small>Итог</small><b class="'+(won?'win':'lose')+'">'+amt+'</b></span></div>'+bar(list,'v4-seg')+det+'</div></div>'
}
return'<div class="'+cls+'" '+click+'>'+'<span class="v5-tl-dot '+(won?'win':'lose')+'"></span>'+'<div class="v5-tl-card"><div class="v5-tl-top"><span>Сканер '+no+'</span><span>'+when(t)+'</span></div>'+'<div class="v5-tl-main"><span class="v5-tl-who"><b>'+(won?'Победа':'Поражение')+'</b><small>ставка '+n2(my.stake)+' · шанс '+ch+'</small></span>'+'<span class="v5-tl-pay '+(won?'win':'lose')+'"><b>'+amt+'</b><small>GRAM</small></span></div>'+bar(list,'v5-glow')+det+'</div></div>'
}
var KIND={buy:['Покупка','−','out'],sell:['Продажа','+','in'],withdraw:['Вывод в Telegram','','neutral'],deposit:['Добавлен в маркет','','neutral']}
var KICO={buy:'<path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L21 8H6.2"/>',sell:'<path d="M7 17L17 7M8 7h9v9"/>',withdraw:'<path d="M21 4L3 11l6 2 2 6 3-4 5 4z"/>',deposit:'<path d="M12 5v14M5 12h14"/>'}
window.buildMarketHistoryRowHtml=function(item){var k=KIND[item.kind]||[item.kind,'','neutral']
var title=esc(item.giftTitle||item.giftSlug||'Подарок'),num=item.number?'#'+esc(item.number):''
var amt=item.price!=null?k[1]+n2(item.price):'—'
if(V==='2')return'<div class="v2-tx"><span class="v2-row-k">'+hm(item.at)+'<small>'+day(item.at)+'</small></span><span class="v2-row-main"><b>'+title+' <span>'+num+'</span></b><small>'+k[0]+'</small></span><span class="v2-row-num '+k[2]+'"><b>'+amt+'</b><small>GRAM</small></span></div>'
if(V==='3')return'<div class="v3-tr v3-tx"><span class="c-kind '+k[2]+'">'+({buy:'BUY',sell:'SELL',withdraw:'OUT',deposit:'IN'}[item.kind]||'—')+'</span><span class="c-who">'+title+' <small>'+num+'</small></span><span class="c-t">'+day(item.at).replace('Сегодня','сег').replace('Вчера','вчр')+' '+hm(item.at)+'</span><span class="c-pnl '+k[2]+'">'+amt+'</span></div>'
if(V==='4')return'<div class="v4-tx '+k[2]+'"><span class="v4-tx-ico">'+svg(KICO[item.kind]||'<circle cx="12" cy="12" r="8"/>',2.4)+'</span><span class="v4-tx-body"><b>'+title+' <span>'+num+'</span></b><small>'+k[0]+' · '+when(item.at)+'</small></span><span class="v4-tx-amt">'+amt+'</span></div>'
return'<div class="lx-round v5-tx"><span class="v5-tl-dot '+(k[2]==='in'?'win':k[2]==='out'?'lose':'')+'"></span><div class="v5-tl-card"><div class="v5-tl-main"><span class="v5-tl-who"><b>'+title+' <span>'+num+'</span></b><small>'+k[0]+' · '+when(item.at)+'</small></span><span class="v5-tl-pay '+k[2]+'"><b>'+amt+'</b></span></div></div></div>'}
window.buildInventoryGiftTileHtml=function(item){var id=Number(item.id),on=!!item.hasActiveListing,tg='event.stopPropagation(); handleInventoryListToggle('+id+')'
var open='openInventoryGiftDetail('+id+')',price=n2(item.activeListingPrice)
var t=tier(item.modelRarity)
if(V==='2'){
return'<div class="market-gift-tile v2-inv" onclick="'+open+'"><span class="v2-inv-img" style="'+bg(item)+'">'+img(item)+'</span>'+'<span class="v2-inv-body"><b>'+nm(item)+'</b><small>#'+esc(item.number)+(item.model?' · '+esc(item.model):'')+'</small>'+(on?'<em>На продаже · '+price+' GRAM</em>':'')+'</span>'+'<button type="button" class="v2-pill'+(on?' ghost':'')+'" onclick="'+tg+'">'+(on?'Снять':'Продать')+'</button></div>'
}if(V==='3'){
return'<div class="market-gift-tile v3-inv" onclick="'+open+'"><span class="v3-inv-img" style="'+bg(item)+'">'+img(item)+'</span>'+'<span class="v3-inv-name"><b>'+nm(item)+'</b><small>#'+esc(item.number)+(item.model?' · '+esc(item.model)+(item.modelRarity?' '+esc(item.modelRarity)+'%':''):'')+'</small></span>'+'<span class="v3-inv-st '+(on?'on':'')+'">'+(on?price:'—')+'</span>'+'<button type="button" class="v3-btn'+(on?' ghost':'')+'" onclick="'+tg+'">'+(on?'снять':'продать')+'</button></div>'
}if(V==='4'){
return'<div class="market-gift-tile v4-slot t-'+t.k+(on?' is-on':'')+'" onclick="'+open+'"><span class="v4-slot-tag">'+t.t+'</span>'+'<span class="v4-slot-img" style="'+bg(item)+'">'+img(item)+(on?'<span class="v4-slot-sale">'+price+'</span>':'')+'</span>'+'<b class="v4-slot-name">'+nm(item)+'</b>'+'<button type="button" class="v4-slot-btn'+(on?' ghost':'')+'" onclick="'+tg+'">'+(on?'Снять':'Продать')+'</button></div>'
}
return'<div class="market-gift-tile v5-inv" onclick="'+open+'"><span class="v5-inv-img" style="'+bg(item)+'">'+img(item)+'</span>'+(on?'<span class="v5-inv-flag">На продаже · '+price+'</span>':'')+'<span class="v5-inv-bar"><span class="v5-inv-t"><b>'+nm(item)+'</b><small>#'+esc(item.number)+'</small></span>'+'<button type="button" class="v5-inv-btn'+(on?' ghost':'')+'" onclick="'+tg+'">'+(on?'Снять':'Продать')+'</button></span></div>'
}
window.buildMarketAttrRowHtml=function(label,value,rarity){if(!value)return''
var r=rarity!=null&&rarity!==''?esc(rarity)+'%':''
if(V==='2')return'<div class="v2-attr"><span>'+esc(label)+'</span><b>'+esc(value)+'</b>'+(r?'<em>'+r+'</em>':'<em></em>')+'</div>'
if(V==='3')return'<div class="v3-attr"><span>'+esc(label).toLowerCase()+'</span><b>'+esc(value)+'</b><em>'+(r||'')+'</em></div>'
if(V==='4'){var t=tier(rarity)
return'<div class="v4-attr t-'+(r?t.k:'none')+'"><small>'+esc(label)+'</small><b>'+esc(value)+'</b>'+(r?'<em>'+r+'</em>':'')+'</div>'}return'<div class="v5-attr"><small>'+esc(label)+'</small><b>'+esc(value)+'</b>'+(r?'<em>'+r+'</em>':'')+'</div>'}
window.renderReferralTableRows=function(items){var listEl=document.getElementById('referralList')
if(!listEl)return
var box=document.getElementById('lxRefList')
if(!box){box=document.createElement('div')
box.id='lxRefList'
var tb=document.getElementById('referralTable')
if(tb&&tb.parentNode)tb.parentNode.insertBefore(box,tb)}box.className='lx-ref-list v'+V+'-refs'
var head=V==='3'?'<div class="v3-tr v3-th"><span class="c-no">#</span><span class="c-who">пользователь</span><span class="c-st">оборот</span><span class="c-pnl">доход</span></div>':''
box.innerHTML=head+(items||[]).map((function(it,i){var name=esc(it.name||it.username||'Игрок '+(it.playerId||it.id||''))
if(V==='3')return'<div class="v3-tr"><span class="c-no">'+(i+1)+'</span><span class="c-who">'+name+'</span><span class="c-st">'+compact(it.turnover)+'</span><span class="c-pnl in">+'+n2(it.totalEarn)+'</span></div>'
if(V==='2')return'<div class="v2-row v2-ref"><span class="v2-row-k">'+pad(i+1)+'</span><span class="v2-row-main"><b>'+name+'</b><small>оборот '+n2(it.turnover)+' · арена '+n2(it.gamesMarketEarn)+' · маркет '+n2(it.marketEarn)+'</small></span><span class="v2-row-num in"><b>+'+n2(it.totalEarn)+'</b></span></div>'
if(V==='4')return'<div class="v4-ref"><span class="v4-ref-rank">'+(i+1)+'</span><span class="scanner-player-avatar">'+esc(name.charAt(0).toUpperCase())+'</span><span class="v4-ref-who"><b>'+name+'</b><small>оборот '+compact(it.turnover)+' GRAM</small></span><span class="v4-ref-coin">+'+n2(it.totalEarn)+'</span></div>'
return'<div class="v5-ref"><span class="scanner-player-avatar">'+esc(name.charAt(0).toUpperCase())+'</span><span class="v5-ref-who"><b>'+name+'</b><small>оборот '+n2(it.turnover)+' GRAM</small></span><span class="v5-ref-earn">+'+n2(it.totalEarn)+'</span></div>'})).join('')
listEl.innerHTML=''}
var RW=[{slug:'lolpop',name:'Lol Pop',threshold:25e3},{slug:'cupidcharm',name:'Cupid Charm',threshold:8e4},{slug:'kissedfrog',name:'Kissed Frog',threshold:2e5},{slug:'minioscar',name:'Mini Oscar',threshold:3e5}]
var RK=typeof LEVEL_REWARD_BY_CARD!=='undefined'?LEVEL_REWARD_BY_CARD:['worker','master','pro','pro_bonus']
var last=null
function gift(rw){return rw?'<img src="https://fragment.com/file/gifts/'+rw.slug+'/thumb.webp" alt="" loading="lazy" onerror="this.style.display=\'none\'">':''}window.renderReferralLevelCards=function(levels,turnover,levelKey){var row=document.getElementById('referralLevelsRow')
if(!row||!Array.isArray(levels)||!levels.length)return
last=[levels,turnover,levelKey]
var tv=Number(turnover||0),cur=Math.max(0,levels.findIndex((function(l){return l.key===levelKey})))
var srvR=typeof _levelRewards!=='undefined'&&_levelRewards&&_levelRewards.length?_levelRewards:[]
var data=levels.map((function(lv,i){var next=levels[i+1],end=next?next.threshold:RW[i]?RW[i].threshold:null
var srv=srvR.filter((function(r){return r.key===RK[i]}))[0]
return{lv:lv,i:i,end:end,state:i<cur?'done':i===cur?'cur':'lock',pct:end?Math.max(0,Math.min(100,(tv-lv.threshold)/(end-lv.threshold)*100)):100,name:typeof L==='function'?L(lv.name,lv.nameEn||lv.name):lv.name,rw:RW[i],given:!!(srv&&srv.given)}}))
var c=data[cur],html=''
if(V==='2'){
html='<div class="v2-lv-hero"><small>Твой уровень</small><b>'+esc(c.name)+'</b><span>'+c.lv.percent+'% с комиссии рефералов</span>'+(c.end?'<div class="v2-lv-bar"><i style="width:'+c.pct.toFixed(1)+'%"></i></div><div class="v2-lv-cap"><span>'+compact(tv)+' GRAM</span><span>до «'+esc(data[cur+1]?data[cur+1].name:'')+'» '+compact(Math.max(0,c.end-tv))+'</span></div>':'')+'</div>'+'<div class="v2-lv-list">'+data.map((function(d){
return'<div class="v2-lv '+d.state+'"><span class="v2-lv-n">'+pad(d.i+1)+'</span><span class="v2-lv-main"><b>'+esc(d.name)+'</b><small>от '+compact(d.lv.threshold)+' GRAM · маркет '+(d.lv.marketCommission!=null?d.lv.marketCommission+'%':'—')+(d.rw?' · подарок '+esc(d.rw.name):'')+'</small></span><span class="v2-lv-p">'+d.lv.percent+'%</span></div>'})).join('')+'</div>'}else if(V==='3'){
html='<div class="v3-sec">// уровни <span>оборот '+compact(tv)+' GRAM</span></div>'+'<div class="v3-tr v3-th"><span class="c-no">#</span><span class="c-who">уровень</span><span class="c-st">порог</span><span class="c-ch">реф</span><span class="c-ch">маркет</span><span class="c-rw">подарок</span></div>'+data.map((function(d){
return'<div class="v3-tr v3-lv '+d.state+'"><span class="c-no">'+(d.state==='done'?'✓':d.i+1)+'</span><span class="c-who">'+esc(d.name)+(d.state==='cur'?'<em>сейчас</em>':'')+'</span><span class="c-st">'+compact(d.lv.threshold)+'</span><span class="c-ch">'+d.lv.percent+'%</span><span class="c-ch">'+(d.lv.marketCommission!=null?d.lv.marketCommission+'%':'—')+'</span><span class="c-rw">'+(d.rw?d.given?'получен':compact(d.rw.threshold):'—')+'</span></div>'+(d.state==='cur'&&d.end?'<div class="v3-prog"><span>['+'■'.repeat(Math.round(d.pct/10))+'·'.repeat(10-Math.round(d.pct/10))+']</span><span>'+d.pct.toFixed(0)+'% · ещё '+compact(Math.max(0,d.end-tv))+'</span></div>':'')
})).join('')}else if(V==='4'){html='<div class="v4-quest-h"><span>ПУТЬ РЕФЕРАЛА</span><small>оборот '+compact(tv)+' GRAM</small></div><div class="v4-path">'+data.map((function(d){
return'<div class="v4-node '+d.state+'"><span class="v4-node-dot">'+(d.state==='done'?I.check:d.state==='lock'?I.lock:I.star)+'</span>'+'<div class="v4-node-card"><div class="v4-node-top"><b>'+esc(d.name)+'</b><span class="v4-node-pct">'+d.lv.percent+'%</span></div>'+'<small>от '+compact(d.lv.threshold)+' GRAM · комиссия маркета '+(d.lv.marketCommission!=null?d.lv.marketCommission+'%':'—')+'</small>'+(d.state==='cur'&&d.end?'<div class="v4-node-bar"><i style="width:'+d.pct.toFixed(1)+'%"></i><span>'+compact(tv)+' / '+compact(d.end)+'</span></div>':'')+(d.rw?'<div class="v4-node-rw"><span class="v4-node-gift">'+gift(d.rw)+'</span><span>'+esc(d.rw.name)+'</span><em class="'+(d.given?'ok':'')+'">'+(d.given?'ПОЛУЧЕН':compact(d.rw.threshold))+'</em></div>':'')+'</div></div>'
})).join('')+'</div>'}else{html='<div class="v5-lv-h"><span>Уровни</span><small>листай →</small></div><div class="v5-lv-rail">'+data.map((function(d){
return'<div class="v5-lv '+d.state+'"><div class="v5-lv-top"><span class="v5-lv-n">'+(d.i+1)+'</span>'+(d.state==='cur'?'<span class="v5-lv-tag">Сейчас</span>':d.state==='done'?'<span class="v5-lv-tag ok">Пройден</span>':'<span class="v5-lv-lock">'+I.lock+'</span>')+'</div>'+'<b class="v5-lv-name">'+esc(d.name)+'</b><div class="v5-lv-big">'+d.lv.percent+'<small>%</small></div><small class="v5-lv-sub">с комиссии рефералов</small>'+'<div class="v5-lv-meta"><span>от '+compact(d.lv.threshold)+'</span><span>маркет '+(d.lv.marketCommission!=null?d.lv.marketCommission+'%':'—')+'</span></div>'+(d.state==='cur'&&d.end?'<div class="v5-lv-bar"><i style="width:'+d.pct.toFixed(1)+'%"></i></div>':'')+(d.rw?'<div class="v5-lv-rw">'+gift(d.rw)+'<span>'+esc(d.rw.name)+'</span></div>':'')+'</div>'
})).join('')+'</div>'}row.className='v'+V+'-levels'
row.innerHTML=html}
window.applyLevelRewardBadges=function(){if(last)window.renderReferralLevelCards.apply(null,last)}
if(V==='2'){var put=function(){var area=document.querySelector('#historyPanel .history-scroll-area')
if(!area)return
var prev=null
area.querySelectorAll('.v2-mh').forEach((function(el){var d=el.getAttribute('data-day')
var h=el.previousElementSibling&&el.previousElementSibling.classList.contains('v2-day')?el.previousElementSibling:null
if(d!==prev){if(!h){h=document.createElement('div')
h.className='v2-day'
el.parentNode.insertBefore(h,el)}if(h.textContent!==d)h.textContent=d}else if(h)h.remove()
prev=d}))}
setInterval(put,500)}})();(function(){var V=document.documentElement.getAttribute('data-v'),S=document.documentElement.getAttribute('data-s')
if(V!=='5'||!S||S==='1')return
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,(function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]}))}function n2(v){return Number(v||0).toFixed(2)}function compact(n){n=Number(n||0)
if(n>=1e3){var v=n/1e3
return(v%1?v.toFixed(1):String(v))+'k'}return String(Math.round(n))}function ms(v){return typeof tsToMs==='function'?tsToMs(v):new Date(v).getTime()}function pad(x){return String(x).padStart(2,'0')}function hm(v){var t=ms(v)
if(!t)return'—'
var d=new Date(t)
return pad(d.getHours())+':'+pad(d.getMinutes())}function day(v){var t=ms(v)
if(!t)return'—'
var d=new Date(t),now=new Date
if(d.toDateString()===now.toDateString())return'Сегодня'
var y=new Date(now)
y.setDate(now.getDate()-1)
if(d.toDateString()===y.toDateString())return'Вчера'
return pad(d.getDate())+'.'+pad(d.getMonth()+1)}function when(v){return day(v)+', '+hm(v)}function svg(p,w){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||2)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>'}
var OK=svg('<path d="M5 12l5 5L20 7"/>',2.6),NO=svg('<path d="M6 6l12 12M18 6L6 18"/>',2.6),LOCK=svg('<rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>')
var CROWN='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 7l4.5 4L12 4l4.5 7L21 7l-2 12H5z"/></svg>'
function rows(item){var me=String(getCurrentPlayer().id)
var list=(Array.isArray(item.results)?item.results:[]).map((function(r){return{id:String(r.playerId||r.id||''),name:r.name||'Игрок',avatar:r.avatar||null,color:r.color||r.roundColor||r.playerColor||'#34d6ff',stake:Number(r.stake||r.score||0),cells:Number(r.cellCount||0)}}))
var total=list.reduce((function(s,r){return s+r.cells}),0)||1e4
list.forEach((function(r){r.share=total?r.cells/total*100:0
r.isMe=r.id===me}))
return list}function ava(p){return getScannerPlayerAvatarHtml({name:p.name,avatar:p.avatar})}function bar(list,cls){return list.length?'<div class="'+cls+'">'+list.map((function(r){return'<i style="flex:'+Math.max(r.share,1.5).toFixed(2)+';background:'+esc(r.color)+'"></i>'})).join('')+'</div>':''}function players(list,wid){return list.slice().sort((function(a,b){return b.share-a.share
})).map((function(r){return'<div class="lx-rp'+(r.isMe?' me':'')+'"><span class="lx-rp-dot" style="background:'+esc(r.color)+'"></span>'+ava(r)+'<span class="lx-rp-name">'+esc(r.name)+(r.isMe?' <em>вы</em>':'')+(r.id===String(wid)?'<span class="lx-crown">'+CROWN+'</span>':'')+'</span>'+'<span class="lx-rp-share">'+r.share.toFixed(1)+'%</span><span class="lx-rp-stake">'+n2(r.stake)+'</span></div>'
})).join('')}function details(id,open,item,list,wid,attr){return'<div id="'+id+'" class="scanner-history-details'+(open?' open':'')+'" '+attr+'="true" aria-hidden="'+(open?'false':'true')+'"><div class="lx-round-pot"><span>Банк раунда</span><b>'+n2(item.totalPot)+' GRAM</b></div>'+players(list,wid)+'</div>'}window.getScannerRecentRoundCardHtml=function(item,index){
var safe=String(item.roundId||item.id||'recent_'+index)
var open=typeof expandedRecentRoundId!=='undefined'&&expandedRecentRoundId===safe
var list=rows(item),w=getScannerHistoryWinnerMeta(item),wr=list.filter((function(r){return r.id===w.id}))[0]
var mult=formatScannerMultiplier(w.payout||w.stake,w.stake),me=w.id===String(getCurrentPlayer().id),cnt=Number(item.participantCount||list.length)
var ch=(wr?wr.share.toFixed(1):'0')+'%',no=item.roundNumber?'№'+esc(item.roundNumber):'',t=item.finishedAt||item.playedAt
var head='<div class="history-match-card scanner-history-card lx-round s'+S+'-r'+(open?' is-expanded':'')+'" onclick="toggleScannerRecentRoundDetails(\''+esc(safe)+'\', event)">'
var det=details(getRecentRoundDetailsDomId(safe),open,item,list,w.id,'data-scanner-recent-details')
var you=me?' <em>вы</em>':''
if(S==='2')return head+'<div class="s2r-top"><span>Раунд '+no+'</span><span>'+when(t)+'</span></div><div class="s2r-main"><span class="s2r-ava" style="--c:'+esc(w.color)+'">'+ava(w)+'</span><span class="s2r-who"><b>'+esc(w.name)+you+'</b><small>шанс '+ch+' · '+cnt+' игр.</small></span><span class="s2r-pay"><b>'+n2(w.payout)+'</b><small>'+mult+'</small></span></div>'+bar(list,'s2r-bar')+det+'</div>'
if(S==='3')return head+'<span class="s3r-acc" style="--c:'+esc(w.color)+'"></span><div class="s3r-in"><div class="s3r-main"><span class="s3r-who"><b>'+esc(w.name)+you+'</b><small>'+no+' · '+hm(t)+' · '+cnt+' игр. · '+ch+'</small></span><span class="s3r-pay"><b>+'+n2(w.payout)+'</b><small>'+mult+'</small></span></div>'+bar(list,'s3r-bar')+det+'</div></div>'
if(S==='4')return head+'<div class="s4r-main"><span class="s4r-no">'+(item.roundNumber||'—')+'</span><span class="s4r-who"><i style="background:'+esc(w.color)+';box-shadow:0 0 8px '+esc(w.color)+'"></i><b>'+esc(w.name)+you+'</b><small>'+hm(t)+' · '+cnt+' игр. · '+ch+'</small></span><span class="s4r-pay"><b>'+n2(w.payout)+'</b><small>'+mult+'</small></span></div>'+det+'</div>'
return head+'<div class="s5r-main"><span class="s5r-pay">'+n2(w.payout)+'<small>'+mult+'</small></span><span class="s5r-who"><b>'+esc(w.name)+you+'</b><small>Раунд '+no+' · '+hm(t)+' · '+cnt+' игр.</small></span></div>'+bar(list,'s5r-bar')+det+'</div>'}
window.getScannerHistoryEntryHtml=function(item,index,matchId){var safe=String(matchId||'scanner_'+index)
var open=typeof expandedHistoryMatchId!=='undefined'&&expandedHistoryMatchId===safe
var list=rows(item),my=getScannerHistoryMyMeta(item),w=getScannerHistoryWinnerMeta(item)
var won=item.youWon===true||w.id&&w.id===String(getCurrentPlayer().id)
var mine=list.filter((function(r){return r.isMe}))[0],ch=(mine?mine.share.toFixed(1):'0')+'%'
var amt=won?'+'+n2(w.payout):'−'+n2(my.stake),t=item.playedAt||item.finishedAt,no=item.roundNumber?'№'+esc(item.roundNumber):''
var cls='history-match-card scanner-history-card lx-round lx-mine s'+S+'-m '+(won?'is-win':'is-lose')+(open?' is-expanded':'')
var head='<div class="'+cls+'" onclick="toggleScannerHistoryDetails(\''+esc(safe).replace(/'/g,'&#39;')+'\', event)">'
var det=details(getHistoryDetailsDomId(safe),open,item,list,w.id,'data-scanner-history-details')
if(S==='2')return head+'<div class="s2r-main"><span class="s2m-ico">'+(won?OK:NO)+'</span><span class="s2r-who"><b>'+(won?'Победа':'Поражение')+'</b><small>Сканер '+no+' · '+when(t)+'</small></span><span class="s2r-pay '+(won?'win':'lose')+'"><b>'+amt+'</b><small>ставка '+n2(my.stake)+' · '+ch+'</small></span></div>'+bar(list,'s2r-bar')+det+'</div>'
if(S==='3')return head+'<span class="s3r-acc '+(won?'win':'lose')+'"></span><div class="s3r-in"><div class="s3r-main"><span class="s3r-who"><b>'+(won?'Победа':'Поражение')+'</b><small>'+no+' · '+when(t)+' · ставка '+n2(my.stake)+' · '+ch+'</small></span><span class="s3r-pay '+(won?'win':'lose')+'"><b>'+amt+'</b><small>GRAM</small></span></div>'+bar(list,'s3r-bar')+det+'</div></div>'
if(S==='4')return head+'<div class="s4r-main"><span class="s4m-res">'+(won?'W':'L')+'</span><span class="s4r-who"><b>Сканер '+no+'</b><small>'+when(t)+' · ставка '+n2(my.stake)+' · '+ch+'</small></span><span class="s4r-pay '+(won?'win':'lose')+'"><b>'+amt+'</b><small>GRAM</small></span></div>'+det+'</div>'
return head+'<div class="s5r-main"><span class="s5r-pay '+(won?'win':'lose')+'">'+amt+'<small>GRAM</small></span><span class="s5r-who"><b>'+(won?'Победа':'Поражение')+'</b><small>'+no+' · '+when(t)+' · ставка '+n2(my.stake)+'</small></span></div>'+bar(list,'s5r-bar')+det+'</div>'}
var KIND={buy:['Покупка','−','out'],sell:['Продажа','+','in'],withdraw:['Вывод в Telegram','','neutral'],deposit:['Добавлен в маркет','','neutral']}
var KICO={buy:'<path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L21 8H6.2"/>',sell:'<path d="M7 17L17 7M8 7h9v9"/>',withdraw:'<path d="M21 4L3 11l6 2 2 6 3-4 5 4z"/>',deposit:'<path d="M12 5v14M5 12h14"/>'}
window.buildMarketHistoryRowHtml=function(item){var k=KIND[item.kind]||[item.kind,'','neutral']
var title=esc(item.giftTitle||item.giftSlug||'Подарок')+(item.number?' <span>#'+esc(item.number)+'</span>':'')
var amt=item.price!=null?k[1]+n2(item.price):'—'
if(S==='5')return'<div class="lx-round s5-m s5-tx"><div class="s5r-main"><span class="s5r-pay '+k[2]+'">'+amt+'<small>GRAM</small></span><span class="s5r-who"><b>'+title+'</b><small>'+k[0]+' · '+when(item.at)+'</small></span></div></div>'
if(S==='4')return'<div class="lx-round s4-r s4-tx"><div class="s4r-main"><span class="s4m-res '+k[2]+'">'+svg(KICO[item.kind]||'<circle cx="12" cy="12" r="7"/>',2.2)+'</span><span class="s4r-who"><b>'+title+'</b><small>'+k[0]+' · '+when(item.at)+'</small></span><span class="s4r-pay '+k[2]+'"><b>'+amt+'</b></span></div></div>'
if(S==='3')return'<div class="lx-round s3-m s3-tx"><span class="s3r-acc '+k[2]+'"></span><div class="s3r-in"><div class="s3r-main"><span class="s3r-who"><b>'+title+'</b><small>'+k[0]+' · '+when(item.at)+'</small></span><span class="s3r-pay '+k[2]+'"><b>'+amt+'</b></span></div></div></div>'
return'<div class="lx-round s2-m s2-tx"><div class="s2r-main"><span class="s2m-ico '+k[2]+'">'+svg(KICO[item.kind]||'<circle cx="12" cy="12" r="7"/>',2.2)+'</span><span class="s2r-who"><b>'+title+'</b><small>'+k[0]+' · '+when(item.at)+'</small></span><span class="s2r-pay '+k[2]+'"><b>'+amt+'</b></span></div></div>'}
var RW=[{slug:'lolpop',name:'Lol Pop',threshold:25e3},{slug:'cupidcharm',name:'Cupid Charm',threshold:8e4},{slug:'kissedfrog',name:'Kissed Frog',threshold:2e5},{slug:'minioscar',name:'Mini Oscar',threshold:3e5}]
var RK=typeof LEVEL_REWARD_BY_CARD!=='undefined'?LEVEL_REWARD_BY_CARD:['worker','master','pro','pro_bonus']
var last=null
function gift(rw){return rw?'<img src="https://fragment.com/file/gifts/'+rw.slug+'/thumb.webp" alt="" loading="lazy" onerror="this.style.display=\'none\'">':''}function ring(p,label){var r=26,c=2*Math.PI*r
return'<span class="s2-ring"><svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="'+r+'" class="t"/><circle cx="32" cy="32" r="'+r+'" class="a" stroke-dasharray="'+c.toFixed(1)+'" stroke-dashoffset="'+(c*(1-p/100)).toFixed(1)+'"/></svg><b>'+label+'</b></span>'}window.renderReferralLevelCards=function(levels,turnover,levelKey){var row=document.getElementById('referralLevelsRow')
if(!row||!Array.isArray(levels)||!levels.length)return
last=[levels,turnover,levelKey]
var tv=Number(turnover||0),cur=Math.max(0,levels.findIndex((function(l){return l.key===levelKey})))
var srvR=typeof _levelRewards!=='undefined'&&_levelRewards&&_levelRewards.length?_levelRewards:[]
var d=levels.map((function(lv,i){var next=levels[i+1],end=next?next.threshold:RW[i]?RW[i].threshold:null,srv=srvR.filter((function(r){return r.key===RK[i]}))[0]
return{lv:lv,i:i,end:end,state:i<cur?'done':i===cur?'cur':'lock',pct:end?Math.max(0,Math.min(100,(tv-lv.threshold)/(end-lv.threshold)*100)):100,name:typeof L==='function'?L(lv.name,lv.nameEn||lv.name):lv.name,rw:RW[i],given:!!(srv&&srv.given),mc:lv.marketCommission!=null?lv.marketCommission+'%':'—'}}))
var c=d[cur],nx=d[cur+1],html
if(S==='2'){html='<div class="a5-sec"><h2>Уровни</h2><small class="s-sub">оборот '+compact(tv)+' GRAM</small></div><div class="s2-lvs">'+d.map((function(x){
return'<div class="s2-lv '+x.state+'">'+(x.state==='cur'?ring(x.pct,x.lv.percent+'%'):'<span class="s2-lv-ic">'+(x.state==='done'?OK:LOCK)+'</span>')+'<span class="s2-lv-t"><b>'+esc(x.name)+'</b><small>от '+compact(x.lv.threshold)+' GRAM · '+x.lv.percent+'% рефералы · маркет '+x.mc+'</small>'+(x.state==='cur'&&x.end?'<small class="s2-lv-left">ещё '+compact(Math.max(0,x.end-tv))+' GRAM до «'+esc(nx?nx.name:'')+'»</small>':'')+'</span>'+(x.rw?'<span class="s2-lv-gift">'+gift(x.rw)+'</span>':'')+'</div>'
})).join('')+'</div>'}else if(S==='3'){html='<div class="a5-sec"><h2>Уровни</h2><small class="s-sub">оборот '+compact(tv)+' GRAM</small></div>'+'<div class="s3-steps">'+d.map((function(x){return'<span class="s3-step '+x.state+'"><i>'+(x.state==='done'?OK:x.i+1)+'</i><small>'+esc(x.name)+'</small><b>'+x.lv.percent+'%</b></span>'
})).join('')+'</div>'+'<div class="s3-lvcard"><div class="s3-lvcard-t"><small>Твой уровень</small><b>'+esc(c.name)+'</b></div><div class="s3-lvcard-n"><div><small>с рефералов</small><b>'+c.lv.percent+'%</b></div><div><small>комиссия маркета</small><b>'+c.mc+'</b></div></div>'+(c.end?'<div class="s3-lvbar"><i style="width:'+c.pct.toFixed(1)+'%"></i></div><div class="s3-lvcap"><span>'+compact(tv)+' GRAM</span><span>до «'+esc(nx?nx.name:'')+'» ещё '+compact(Math.max(0,c.end-tv))+'</span></div>':'')+(c.rw?'<div class="s3-lvrw">'+gift(c.rw)+'<span>Подарок за уровень: <b>'+esc(c.rw.name)+'</b></span><em>'+(c.given?'получен':'при '+compact(c.rw.threshold))+'</em></div>':'')+'</div>'
}else if(S==='4'){html='<div class="s4-sec"><h2>Уровни</h2><small class="s-sub">оборот '+compact(tv)+' GRAM</small></div><div class="s4-tl">'+d.map((function(x){
return'<div class="s4-tln '+x.state+'"><span class="s4-tln-dot"></span><div class="s4-tln-b"><div class="s4-tln-t"><b>'+esc(x.name)+'</b><span>'+x.lv.percent+'%</span></div>'+'<small>от '+compact(x.lv.threshold)+' GRAM · маркет '+x.mc+(x.rw?' · подарок '+esc(x.rw.name)+(x.given?' ✓':''):'')+'</small>'+(x.state==='cur'&&x.end?'<div class="s4-line wide"><i style="width:'+x.pct.toFixed(1)+'%"></i></div><small class="s4-tln-left">'+compact(tv)+' / '+compact(x.end)+' GRAM</small>':'')+'</div></div>'
})).join('')+'</div>'}else{html='<div class="s5-sec"><h2>Уровни</h2><button type="button" onclick="openReferralLevelsModal()">Как это работает</button></div><div class="s5-lvs">'+d.map((function(x){if(x.state!=='cur')return'<div class="s5-lv '+x.state+'"><span class="s5-lv-n">'+(x.state==='done'?OK:x.i+1)+'</span><b>'+esc(x.name)+'</b><span class="s5-lv-p">'+x.lv.percent+'%</span></div>'
return'<div class="s5-lv cur"><div class="s5-lv-top"><small>Сейчас · уровень '+(x.i+1)+'</small><b>'+esc(x.name)+'</b></div><div class="s5-lv-big">'+x.lv.percent+'<small>%</small></div><small class="s5-lv-sub">с комиссии рефералов · маркет '+x.mc+'</small>'+(x.end?'<div class="s5-lv-bar"><i style="width:'+x.pct.toFixed(1)+'%"></i></div><div class="s5-lv-cap"><span>'+compact(tv)+'</span><span>ещё '+compact(Math.max(0,x.end-tv))+' GRAM</span></div>':'')+(x.rw?'<div class="s5-lv-rw">'+gift(x.rw)+'<span>'+esc(x.rw.name)+'</span><em>'+(x.given?'получен':'при '+compact(x.rw.threshold))+'</em></div>':'')+'</div>'
})).join('')+'</div>'}row.className='s'+S+'-levels'
row.innerHTML=html}
window.applyLevelRewardBadges=function(){if(last)window.renderReferralLevelCards.apply(null,last)}
if(S!=='3'){var baseTile=window.buildMarketGiftTileHtml
window.buildMarketGiftTileHtml=function(item){var h=baseTile(item),i=h.indexOf('<div class="v5-bar">')
if(i<0||h.slice(-12)!=='</div></div>')return h
var bar=h.slice(i,h.length-12)
return h.slice(0,i)+'</div>'+bar+'</div>'}}})();(function(){var S=document.documentElement.getAttribute('data-s')
if(!S)return
function refProgress(){try{var d=typeof _lastReferralLevelsData!=='undefined'?_lastReferralLevelsData:null
if(!d||!Array.isArray(d.levels)||!d.levels.length)return
var lv=d.levels,i=Math.max(0,lv.findIndex((function(l){return l.key===d.levelKey})))
var cur=lv[i],nx=lv[i+1],tv=Number(d.turnover||0)
var p=nx?Math.max(0,Math.min(1,(tv-cur.threshold)/(nx.threshold-cur.threshold))):1
document.querySelectorAll('[data-refp]').forEach((function(el){el.style.setProperty('--p',p.toFixed(3))
var a=el.querySelector('circle.a')
if(a){var c=2*Math.PI*26
a.setAttribute('stroke-dasharray',c.toFixed(1))
a.setAttribute('stroke-dashoffset',(c*(1-p)).toFixed(1))}}))}catch(e){}}setInterval(refProgress,700)
setTimeout(refProgress,1500)})();(function(){var S=document.documentElement.getAttribute('data-s')
if(!S||S==='1')return
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,(function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]}))}function n2(v){return Number(v||0).toFixed(2)}function compact(n){n=Number(n||0)
if(n>=1e3){var v=n/1e3
return(v%1?v.toFixed(1):String(v))+'k'}return String(Math.round(n))}window.renderReferralTableRows=function(items){var listEl=document.getElementById('referralList')
if(!listEl)return
var box=document.getElementById('lxRefList')
if(!box){box=document.createElement('div')
box.id='lxRefList'
var tb=document.getElementById('referralTable')
if(tb&&tb.parentNode)tb.parentNode.insertBefore(box,tb)}box.className='lx-ref-list s'+S+'-refs'
box.innerHTML=(items||[]).map((function(it,i){var name=esc(it.name||it.username||'Игрок '+(it.playerId||it.id||'')),ch=esc(name.charAt(0).toUpperCase())
if(S==='2')return'<div class="s2-ref"><span class="scanner-player-avatar">'+ch+'</span><span class="s2-ref-w"><b>'+name+'</b><small>оборот '+compact(it.turnover)+' GRAM</small></span><span class="s2-ref-e"><b>+'+n2(it.totalEarn)+'</b><small>арена '+n2(it.gamesMarketEarn)+' · маркет '+n2(it.marketEarn)+'</small></span></div>'
if(S==='3')return'<div class="s3-ref"><span class="s3-ref-n">'+(i+1)+'</span><span class="s3-ref-w"><b>'+name+'</b><small>оборот '+compact(it.turnover)+' GRAM</small></span><span class="s3-ref-e">+'+n2(it.totalEarn)+'</span></div>'
if(S==='4')return'<div class="s4-ref"><span class="s4-ref-n">'+String(i+1).padStart(2,'0')+'</span><span class="s4-ref-w">'+name+'</span><span class="s4-ref-t">'+compact(it.turnover)+'</span><span class="s4-ref-e">+'+n2(it.totalEarn)+'</span></div>'
return'<div class="s5-ref"><span class="s5-ref-e">+'+n2(it.totalEarn)+'</span><span class="s5-ref-w"><b>'+name+'</b><small>оборот '+compact(it.turnover)+' GRAM</small></span></div>'})).join('')
listEl.innerHTML=''}})();(function(){var S=document.documentElement.getAttribute('data-s')
if(!S)return
var P={trophy:'<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" fill="none"/>',box:'<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8M12 13v8" fill="none"/>',
swords:'<path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2" fill="none"/><path d="M14.5 6.5L18 3h3v3l-3.5 3.5M5 14l4 4M7 17l-3 3M3 19l2 2" fill="none"/>',gavel:'<path d="M14 13l-7.5 7.5a2.1 2.1 0 0 1-3-3L11 10" fill="none"/><path d="M15.5 4.5l4 4-5 5-4-4z"/><path d="M13 3l8 8" fill="none"/>',bag:'<path d="M6 7h12l1 14H5L6 7z"/><path d="M9 7a3 3 0 0 1 6 0" fill="none"/>',
arena:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3" fill="none"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4" fill="none"/>',store:'<path d="M4 9l1.5-5h13L20 9v11H4z"/><path d="M4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0A2.7 2.7 0 0 0 20 9M10 20v-6h4v6" fill="none"/>'}
var STYLE={2:{w:2,f:'none',fo:0},3:{w:2.4,f:'currentColor',fo:.22},5:{w:1.3,f:'none',fo:0}}[S]
function icon(name){return'<svg class="sx-ico" viewBox="0 0 24 24" fill="'+STYLE.f+'" fill-opacity="'+STYLE.fo+'" stroke="currentColor" stroke-width="'+STYLE.w+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+P[name]+'</svg>'}
var MAP=[['#navLeaderboard .nav-icon','trophy'],['#navCases .nav-icon','box'],['#navPvp .nav-icon:not(.nav-icon-auction)','swords'],['#navPvp .nav-icon-auction','gavel'],['#navSkins .nav-icon','bag'],['#navArenaMarketStateArena .nav-icon','arena'],['#navArenaMarketStateMarket .nav-icon','store'],['#navMarketStateMarket .nav-icon','store'],['#navMarketStateArena .nav-icon','arena']]
function applyIcons(){if(!STYLE)return
MAP.forEach((function(m){document.querySelectorAll(m[0]).forEach((function(el){if(el.getAttribute('data-sx')===m[1])return
el.setAttribute('data-sx',m[1])
el.innerHTML=icon(m[1])}))}))}applyIcons()
setTimeout(applyIcons,800)
var last=new WeakMap
setInterval((function(){document.querySelectorAll('[data-m="pool"], [data-m="players"], #balanceValue, [data-m="chance"]').forEach((function(el){var t=el.textContent,p=last.get(el)
if(p!==undefined&&p!==t){el.classList.remove('sx-bump')
void el.offsetWidth
el.classList.add('sx-bump')}last.set(el,t)}))}),300)
setInterval((function(){var t=(document.getElementById('scannerCountdownChip')||{}).textContent||''
var m=t.match(/(\d+):(\d+)/),s=m?+m[1]*60+ +m[2]:99
document.documentElement.classList.toggle('sx-hot',s<=10&&s>0)}),400)
if(S!=='5')document.addEventListener('pointerdown',(function(e){var b=e.target.closest&&e.target.closest('.a-play, .lx-cat, .lx-chip, .s2-pf-acts button, .s3-pf-acts button, .s2-tiles button, .s3-rows button, .s2-pf-links button, .market-tool-btn, .scanner-bet-btn')
if(!b)return
var r=b.getBoundingClientRect(),d=document.createElement('i')
d.className='sx-ripple'
d.style.left=e.clientX-r.left+'px'
d.style.top=e.clientY-r.top+'px'
if(getComputedStyle(b).position==='static')b.style.position='relative'
b.style.overflow='hidden'
b.appendChild(d)
setTimeout((function(){d.remove()}),650)}),{passive:true})})();(function(){var S=document.documentElement.getAttribute('data-s')
if(!S)return
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,(function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]}))}function n2(v){return Number(v||0).toFixed(2)}function put(k,v){document.querySelectorAll('[data-st="'+k+'"]').forEach((function(el){if(el.textContent!==v)el.textContent=v}))}function tick(){
var r=typeof scannerGridState!=='undefined'&&scannerGridState.recentRounds?scannerGridState.recentRounds:[]
if(!r.length)return
var maxPot=0,best=null,top=null
r.forEach((function(x){var pay=Number(x.winnerPayout||0),st=Number(x.winnerStake||0),m=st>0?pay/st:0
if(Number(x.totalPot||0)>maxPot)maxPot=Number(x.totalPot||0)
if(!best||m>best.m)best={m:m,x:x}
if(!top||pay>Number(top.winnerPayout||0))top=x}))
put('count',String(r.length))
put('maxpot',n2(maxPot)+' GRAM')
put('maxmult','x'+best.m.toFixed(2))
put('maxmultname',best.x.winnerName||'—')
put('maxpay',n2(top.winnerPayout))
put('maxpayname',top.winnerName||'—')
var hot=document.getElementById('sxHot')
if(hot){var list=r.slice().map((function(x){var st=Number(x.winnerStake||0)
return{x:x,m:st>0?Number(x.winnerPayout||0)/st:0}})).sort((function(a,b){return b.m-a.m})).slice(0,6)
var html=list.map((function(o){return'<div class="s3-hot-c"><span class="s3-hot-m">x'+o.m.toFixed(2)+'</span><b>'+esc(o.x.winnerName||'—')+'</b><small>№'+esc(o.x.roundNumber||'—')+' · '+n2(o.x.winnerPayout)+' GRAM</small></div>'})).join('')
if(hot.innerHTML!==html)hot.innerHTML=html}}setInterval(tick,1e3)
setTimeout(tick,1600)})();(function(){if(!document.documentElement.hasAttribute('data-mix'))return
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,(function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]}))}function n2(v){return Number(v||0).toFixed(2)}function compact(n){n=Number(n||0)
if(n>=1e3){var v=n/1e3
return(v%1?v.toFixed(1):String(v))+'k'}return String(Math.round(n))}function ms(v){return typeof tsToMs==='function'?tsToMs(v):new Date(v).getTime()}function pad(x){return String(x).padStart(2,'0')}function when(v){var t=ms(v)
if(!t)return'—'
var d=new Date(t),now=new Date,hm=pad(d.getHours())+':'+pad(d.getMinutes())
if(d.toDateString()===now.toDateString())return'Сегодня, '+hm
var y=new Date(now)
y.setDate(now.getDate()-1)
if(d.toDateString()===y.toDateString())return'Вчера, '+hm
return pad(d.getDate())+'.'+pad(d.getMonth()+1)+', '+hm}function plural(n,a,b,c){n=Math.abs(n)%100
var d=n%10
if(n>10&&n<20)return c
if(d>1&&d<5)return b
if(d===1)return a
return c}function giftImg(g){var u=''
try{u=getGiftImageUrl(g)||''}catch(e){}return u?'<img src="'+u+'" alt="" loading="lazy" onerror="this.style.display=\'none\'">':''}function giftBg(g){return g&&g.backdropCenterColor&&g.backdropEdgeColor?'background:radial-gradient(circle at 50% 40%,'+g.backdropCenterColor+','+g.backdropEdgeColor+')':''}
var GIFT_ICO='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8M12 8C10.5 4 6.5 3.8 6.5 6.2 6.5 8 9.5 8 12 8zm0 0c1.5-4 5.5-4.2 5.5-1.8C17.5 8 14.5 8 12 8z"/></svg>'
var CROWN='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 7l4.5 4L12 4l4.5 7L21 7l-2 12H5z"/></svg>'
function rows(item){var me=String(getCurrentPlayer().id)
var list=(Array.isArray(item.results)?item.results:[]).map((function(r){var gifts=Array.isArray(r.gifts)?r.gifts:[]
var gram=r.gramStake!=null?Number(r.gramStake):Math.max(0,Number(r.stake||0)-gifts.reduce((function(a,g){return a+Number(g.value||0)}),0))
return{id:String(r.playerId||r.id||''),name:r.name||'Игрок',avatar:r.avatar||null,color:r.color||'#34d6ff',stake:Number(r.stake||r.score||0),cells:Number(r.cellCount||0),gram:gram,gifts:gifts}}))
var total=list.reduce((function(s,r){return s+r.cells}),0)||1e4
list.forEach((function(r){r.share=total?r.cells/total*100:0
r.isMe=r.id===me}))
return list}function chips(r){var out=[]
if(r.gram>0)out.push('<span class="mx-chip gram"><i>G</i>'+n2(r.gram)+'</span>')
r.gifts.forEach((function(g){out.push('<span class="mx-chip gift"><span class="mx-gi" style="'+giftBg(g)+'">'+giftImg(g)+'</span>'+esc(g.giftTitle||g.giftType||'Подарок')+(g.number?' <small>#'+esc(g.number)+'</small>':'')+'<em>'+n2(g.value)+'</em></span>')}))
return out.join('')||'<span class="mx-chip">—</span>'}function potMix(list){var gram=0,gifts=0,gv=0
list.forEach((function(r){gram+=r.gram
gifts+=r.gifts.length
r.gifts.forEach((function(g){gv+=Number(g.value||0)}))}))
return'<div class="mx-pot"><span class="mx-chip gram"><i>G</i>'+n2(gram)+' GRAM</span>'+(gifts?'<span class="mx-chip giftc">'+GIFT_ICO+gifts+' '+plural(gifts,'подарок','подарка','подарков')+' · '+n2(gv)+'</span>':'')+'</div>'}function bar(list){return list.length?'<div class="mx-bar">'+list.map((function(r){
return'<i style="flex:'+Math.max(r.share,1.5).toFixed(2)+';background:'+esc(r.color)+'"></i>'})).join('')+'</div>':''}function players(list,wid){return list.slice().sort((function(a,b){return b.share-a.share})).map((function(r){var win=r.id===String(wid)
return'<div class="mx-pl'+(r.isMe?' me':'')+(win?' win':'')+'">'+'<div class="mx-pl-h"><span class="mx-pl-dot" style="background:'+esc(r.color)+'"></span>'+getScannerPlayerAvatarHtml({name:r.name,avatar:r.avatar
})+'<b>'+esc(r.name)+(r.isMe?' <em>вы</em>':'')+(win?'<span class="lx-crown">'+CROWN+'</span>':'')+'</b>'+'<span class="mx-pl-s">'+r.share.toFixed(1)+'%</span><span class="mx-pl-v">'+n2(r.stake)+'</span></div>'+'<div class="mx-pl-c">'+chips(r)+'</div></div>'})).join('')}function details(id,open,item,list,wid,attr){
return'<div id="'+id+'" class="scanner-history-details'+(open?' open':'')+'" '+attr+'="true" aria-hidden="'+(open?'false':'true')+'">'+'<div class="mx-det-h"><span>Ставки игроков</span><b>банк '+n2(item.totalPot)+' GRAM</b></div>'+players(list,wid)+'</div>'}function more(open,n){
return'<span class="mx-more"><span class="c">Ставки '+n+' '+plural(n,'игрока','игроков','игроков')+'</span><span class="o">Свернуть</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></span>'}window.getScannerRecentRoundCardHtml=function(item,index){
var safe=String(item.roundId||item.id||'recent_'+index)
var open=typeof expandedRecentRoundId!=='undefined'&&expandedRecentRoundId===safe
var list=rows(item),w=getScannerHistoryWinnerMeta(item),wr=list.filter((function(r){return r.id===w.id}))[0]
var me=w.id===String(getCurrentPlayer().id),mult=formatScannerMultiplier(w.payout||w.stake,w.stake)
return'<div class="history-match-card scanner-history-card lx-round mx-r'+(open?' is-expanded':'')+'" onclick="toggleScannerRecentRoundDetails(\''+esc(safe)+'\', event)">'+'<span class="mx-dot" style="--c:'+esc(w.color)+'"></span><div class="mx-card">'+'<div class="mx-top"><span>Раунд №'+esc(item.roundNumber||'—')+'</span><span>'+when(item.finishedAt||item.playedAt)+'</span></div>'+'<div class="mx-main"><span class="mx-ava" style="--c:'+esc(w.color)+'">'+getScannerPlayerAvatarHtml({
name:w.name,avatar:w.avatar
})+'<i>'+CROWN+'</i></span>'+'<span class="mx-who"><b>'+esc(w.name)+(me?' <em>вы</em>':'')+'</b><small>шанс '+(wr?wr.share.toFixed(1):'0')+'% · ставка '+n2(wr?wr.stake:w.stake)+'</small></span>'+'<span class="mx-pay"><b>'+n2(w.payout)+'</b><small>'+mult+'</small></span></div>'+potMix(list)+bar(list)+more(open,list.length)+details(getRecentRoundDetailsDomId(safe),open,item,list,w.id,'data-scanner-recent-details')+'</div></div>'
}
window.getScannerHistoryEntryHtml=function(item,index,matchId){var safe=String(matchId||'scanner_'+index)
var open=typeof expandedHistoryMatchId!=='undefined'&&expandedHistoryMatchId===safe
var list=rows(item),my=getScannerHistoryMyMeta(item),w=getScannerHistoryWinnerMeta(item)
var won=item.youWon===true||w.id&&w.id===String(getCurrentPlayer().id)
var mine=list.filter((function(r){return r.isMe}))[0]||{gram:Number(my.stake||0),gifts:[],share:0,stake:Number(my.stake||0)}
var amt=won?'+'+n2(w.payout):'−'+n2(mine.stake||my.stake)
return'<div class="history-match-card scanner-history-card lx-round mx-r mx-m '+(won?'is-win':'is-lose')+(open?' is-expanded':'')+'" onclick="toggleScannerHistoryDetails(\''+esc(safe).replace(/'/g,'&#39;')+'\', event)">'+'<span class="mx-dot '+(won?'win':'lose')+'"></span><div class="mx-card">'+'<div class="mx-top"><span>Сканер №'+esc(item.roundNumber||'—')+'</span><span>'+when(item.playedAt||item.finishedAt)+'</span></div>'+'<div class="mx-main"><span class="mx-res">'+(won?'Победа':'Поражение')+'</span><span class="mx-who"><small>шанс '+mine.share.toFixed(1)+'% · '+list.length+' игр. · банк '+n2(item.totalPot)+'</small></span>'+'<span class="mx-pay '+(won?'win':'lose')+'"><b>'+amt+'</b><small>GRAM</small></span></div>'+'<div class="mx-mine"><small>Твоя ставка</small><div class="mx-pl-c">'+chips(mine)+'</div></div>'+bar(list)+more(open,list.length)+details(getHistoryDetailsDomId(safe),open,item,list,w.id,'data-scanner-history-details')+'</div></div>'
}
var RW=[{slug:'lolpop',name:'Lol Pop',threshold:25e3},{slug:'cupidcharm',name:'Cupid Charm',threshold:8e4},{slug:'kissedfrog',name:'Kissed Frog',threshold:2e5},{slug:'minioscar',name:'Mini Oscar',threshold:3e5}]
var RK=typeof LEVEL_REWARD_BY_CARD!=='undefined'?LEVEL_REWARD_BY_CARD:['worker','master','pro','pro_bonus']
function rwImg(rw){return'<img src="https://fragment.com/file/gifts/'+rw.slug+'/thumb.webp" alt="" loading="lazy" onerror="this.style.display=\'none\'">'}function levelData(){var d=typeof _lastReferralLevelsData!=='undefined'?_lastReferralLevelsData:null
if(!d||!Array.isArray(d.levels)||!d.levels.length)return null
var srv=typeof _levelRewards!=='undefined'&&_levelRewards&&_levelRewards.length?_levelRewards:[]
var tv=Number(d.turnover||0),cur=Math.max(0,d.levels.findIndex((function(l){return l.key===d.levelKey})))
return{tv:tv,cur:cur,list:d.levels.map((function(lv,i){var next=d.levels[i+1],end=next?next.threshold:RW[i]?RW[i].threshold:null,s=srv.filter((function(r){return r.key===RK[i]}))[0]
return{lv:lv,i:i,end:end,next:next,rw:RW[i],given:!!(s&&s.given),state:i<cur?'done':i===cur?'cur':'lock',pct:end?Math.max(0,Math.min(100,(tv-lv.threshold)/(end-lv.threshold)*100)):100,name:typeof L==='function'?L(lv.name,lv.nameEn||lv.name):lv.name}}))}}var ICO={
users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 3-5.8 6.5-5.8s6.5 2.2 6.5 5.8M16.5 4.6a3.5 3.5 0 0 1 0 6.8M21.5 20c0-2.6-1.5-4.5-3.7-5.3"/></svg>',
store:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9l1.5-5h13L20 9v11H4z"/><path d="M4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0A2.7 2.7 0 0 0 20 9"/></svg>',
flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4h11l-2 4 2 4H5"/></svg>',check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>',
lock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>'}
var lastLv=null
window.renderReferralLevelCards=function(levels,turnover,levelKey){var row=document.getElementById('referralLevelsRow')
if(!row||!Array.isArray(levels)||!levels.length)return
lastLv=[levels,turnover,levelKey]
try{_lastReferralLevelsData=Object.assign({},typeof _lastReferralLevelsData!=='undefined'&&_lastReferralLevelsData||{},{levels:levels,turnover:turnover,levelKey:levelKey})}catch(e){}var D=levelData()
if(!D)return
row.className='mx-levels'
row.innerHTML='<div class="v5-lv-h"><span>Уровни</span><small>оборот '+compact(D.tv)+' GRAM · листай →</small></div><div class="mx-rail">'+D.list.map((function(x){var st=x.state==='cur'?'<span class="mx-lv-tag">Сейчас</span>':x.state==='done'?'<span class="mx-lv-tag ok">'+ICO.check+'Пройден</span>':'<span class="mx-lv-tag lock">'+ICO.lock+'Закрыт</span>'
var rw=''
if(x.rw){var status=x.given?'Получен':x.state==='lock'?'Откроется при '+compact(x.rw.threshold)+' GRAM':'Заберёшь при '+compact(x.rw.threshold)+' GRAM'
rw='<div class="mx-rw'+(x.given?' got':'')+'"><span class="mx-rw-img">'+rwImg(x.rw)+'</span><span class="mx-rw-t"><small>Награда за прохождение</small><b>'+esc(x.rw.name)+'</b><em>'+status+'</em></span></div>'}
return'<div class="mx-lv '+x.state+'">'+'<div class="mx-lv-top"><span class="v5-lv-n">'+(x.i+1)+'</span>'+st+'</div>'+'<b class="mx-lv-name">'+esc(x.name)+'</b>'+rw+'<div class="mx-priv"><div>'+ICO.users+'<span><b>'+x.lv.percent+'%</b> с комиссии рефералов</span></div>'+'<div>'+ICO.store+'<span>Твоя комиссия маркета <b>'+(x.lv.marketCommission!=null?x.lv.marketCommission+'%':'—')+'</b></span></div>'+'<div>'+ICO.flag+'<span>Оборот рефералов от <b>'+compact(x.lv.threshold)+'</b> GRAM</span></div></div>'+(x.state==='cur'&&x.end?'<div class="mx-lv-bar"><i style="width:'+x.pct.toFixed(1)+'%"></i></div><div class="mx-lv-cap"><span>'+compact(D.tv)+'</span><span>ещё '+compact(Math.max(0,x.end-D.tv))+' GRAM</span></div>':'')+'</div>'
})).join('')+'</div>'
steps()}
window.applyLevelRewardBadges=function(){if(lastLv)window.renderReferralLevelCards.apply(null,lastLv)}
function steps(){var box=document.getElementById('mxSteps')
var D=levelData()
if(!box||!D)return
var html=D.list.map((function(x){return'<div class="mx-st '+x.state+'"><span class="mx-st-g">'+(x.rw?rwImg(x.rw):'')+'<i>'+(x.state==='done'?ICO.check:x.state==='lock'?ICO.lock:'')+'</i></span>'+'<b>'+x.lv.percent+'%</b><small>'+esc(x.name)+'</small></div>'})).join('')
var c=D.list[D.cur]
html='<div class="mx-st-row" style="--p:'+((D.cur+c.pct/100)/Math.max(1,D.list.length-1)*100).toFixed(1)+'%">'+html+'</div>'+(c.rw?'<div class="mx-st-next">Следующая награда: <b>'+esc(c.rw.name)+'</b> · ещё '+compact(Math.max(0,(c.end||0)-D.tv))+' GRAM</div>':'')
if(box.__h!==html){box.__h=html
box.innerHTML=html}}setInterval(steps,1200)
setTimeout(steps,1600)
var KEY='lxMixBg'
function applyBg(o){var r=document.documentElement
if(o&&o.c&&o.e){r.style.setProperty('--mx-b1',o.c)
r.style.setProperty('--mx-b2',o.e)
r.classList.add('mx-has-bg')}else{r.style.removeProperty('--mx-b1')
r.style.removeProperty('--mx-b2')
r.classList.remove('mx-has-bg')}}try{applyBg(JSON.parse(localStorage.getItem(KEY)||'null'))}catch(e){}window.mxOpenBg=function(){var ov=document.getElementById('mxBgSheet')
if(!ov){ov=document.createElement('div')
ov.id='mxBgSheet'
ov.className='mx-sheet'
ov.onclick=function(e){if(e.target===ov)ov.classList.remove('open')}
document.body.appendChild(ov)}var inv=typeof INVENTORY_GIFTS!=='undefined'&&INVENTORY_GIFTS?INVENTORY_GIFTS:[]
var seen={},opts=[]
inv.forEach((function(g){var k=g.backdrop||g.backdropCenterColor+g.backdropEdgeColor
if(!g.backdropCenterColor||seen[k])return
seen[k]=1
opts.push(g)}))
var cur=null
try{cur=JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){}
ov.innerHTML='<div class="mx-sheet-c"><div class="mx-sheet-h"><b>Фон приложения</b><button type="button" onclick="document.getElementById(\'mxBgSheet\').classList.remove(\'open\')" aria-label="Закрыть">✕</button></div>'+'<p>Фоны и узоры подарков из твоего инвентаря. Получил новый подарок — появится новый фон.</p><div class="mx-bg-grid">'+'<button type="button" class="mx-bg'+(!cur?' on':'')+'" onclick="mxSetBg(null)"><span class="mx-bg-sw def"></span><b>'+(window.__mxName||'Аврора')+'</b><small>по умолчанию</small></button>'+opts.map((function(g,i){
var on=cur&&cur.c===g.backdropCenterColor&&cur.e===g.backdropEdgeColor
return'<button type="button" class="mx-bg'+(on?' on':'')+'" onclick="mxSetBg('+i+')"><span class="mx-bg-sw" style="'+giftBg(g)+'">'+giftImg(g)+'</span><b>'+esc(g.backdrop||'Фон')+'</b><small>'+esc(g.pattern?'узор '+g.pattern:g.giftTitle||'')+'</small></button>'})).join('')+'</div>'+(opts.length?'':'<div class="market-empty-state">В инвентаре пока нет подарков</div>')+'</div>'
window.__mxBgOpts=opts
requestAnimationFrame((function(){ov.classList.add('open')}))}
window.mxSetBg=function(i){var g=i==null?null:(window.__mxBgOpts||[])[i]
var o=g?{c:g.backdropCenterColor,e:g.backdropEdgeColor,n:g.backdrop||''}:null
applyBg(o)
try{if(o)localStorage.setItem(KEY,JSON.stringify(o))
else localStorage.removeItem(KEY)}catch(e){}var ov=document.getElementById('mxBgSheet')
if(ov)ov.querySelectorAll('.mx-bg').forEach((function(b,k){b.classList.toggle('on',i==null&&k===0||k===i+1)}))}})();(function(){var M=document.documentElement.getAttribute('data-mix')
if(!M)return
var MM=M
M={6:'1',7:'1',8:'1',9:'4',10:'4',11:'4',12:'1',13:'1',14:'1',15:'1',16:'1',17:'1'}[M]||M
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,(function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]}))}function n2(v){return Number(v||0).toFixed(2)}function compact(n){n=Number(n||0)
if(n>=1e3){var v=n/1e3
return(v%1?v.toFixed(1):String(v))+'k'}return String(Math.round(n))}function ms(v){return typeof tsToMs==='function'?tsToMs(v):new Date(v).getTime()}function pad(x){return String(x).padStart(2,'0')}function hm(v){var t=ms(v)
if(!t)return'—'
var d=new Date(t)
return pad(d.getHours())+':'+pad(d.getMinutes())}function day(v){var t=ms(v)
if(!t)return'—'
var d=new Date(t),now=new Date
if(d.toDateString()===now.toDateString())return'Сегодня'
var y=new Date(now)
y.setDate(now.getDate()-1)
if(d.toDateString()===y.toDateString())return'Вчера'
return pad(d.getDate())+'.'+pad(d.getMonth()+1)}function when(v){return day(v)+', '+hm(v)}function full(v){var t=ms(v)
if(!t)return'—'
var d=new Date(t)
return pad(d.getDate())+'.'+pad(d.getMonth()+1)+'.'+d.getFullYear()+', '+hm(v)}function plural(n,a,b,c){n=Math.abs(n)%100
var d=n%10
if(n>10&&n<20)return c
if(d>1&&d<5)return b
if(d===1)return a
return c}function G(){return typeof CASE_GRAM_ICON_SVG!=='undefined'?CASE_GRAM_ICON_SVG:'<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#30A1F5"/></svg>'}function gram(v,cls){return'<span class="mx-g'+(cls?' '+cls:'')+'"><span class="mx-gi">'+G()+'</span>'+v+'</span>'}function gImg(g){var u=''
try{u=getGiftImageUrl(g)||''}catch(e){}return u?'<img src="'+u+'" alt="" loading="lazy" onerror="this.style.display=\'none\'">':''}function gBg(g){return g&&g.backdropCenterColor&&g.backdropEdgeColor?'background:radial-gradient(circle at 50% 40%,'+g.backdropCenterColor+','+g.backdropEdgeColor+')':''}function giftTile(g,cls){
var t=esc((g.giftTitle||g.giftType||'Подарок')+(g.number?' #'+g.number:''))
return'<span class="mx-gt'+(cls?' '+cls:'')+'" title="'+t+'" style="'+gBg(g)+'">'+gImg(g)+(g.value!=null?'<span class="mx-gt-v"><span class="mx-gi">'+G()+'</span>'+n2(g.value)+'</span>':'')+'</span>'}var CHEV='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>'
var CROWN='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 7l4.5 4L12 4l4.5 7L21 7l-2 12H5z"/></svg>'
function rows(item){var me=String(getCurrentPlayer().id)
var list=(Array.isArray(item.results)?item.results:[]).map((function(r){var gifts=Array.isArray(r.gifts)?r.gifts:[]
var gv=gifts.reduce((function(a,g){return a+Number(g.value||0)}),0)
var gr=r.gramStake!=null?Number(r.gramStake):Math.max(0,Number(r.stake||0)-gv)
return{id:String(r.playerId||r.id||''),name:r.name||'Игрок',avatar:r.avatar||null,color:r.color||'#34d6ff',stake:Number(r.stake||0),cells:Number(r.cellCount||0),gram:gr,gifts:gifts}}))
var total=list.reduce((function(s,r){return s+r.cells}),0)||1e4
list.forEach((function(r){r.share=total?r.cells/total*100:0
r.isMe=r.id===me}))
return list}function stake(r,big,max){max=max||3
var gs=r.gifts,show=gs.length>max?gs.slice(0,max-1):gs,rest=gs.length-show.length
var h=(r.gram>0?gram(n2(r.gram)):'')+show.map((function(g){return giftTile(g,big?'lg':'')})).join('')
if(rest>0){var sum=gs.slice(show.length).reduce((function(a,g){return a+Number(g.value||0)}),0)
h+='<button type="button" class="mx-more-g'+(big?' lg':'')+'" onclick="event.stopPropagation(); var p=this.closest(\'.mx-pl\'); if(p) p.classList.toggle(\'all\')" title="ещё '+rest+' на '+n2(sum)+' GRAM"><b>+'+rest+'</b><small>'+n2(sum)+'</small></button>'
if(big)h+='<span class="mx-all">'+gs.map((function(g){return giftTile(g,'lg')})).join('')+'</span>'}return h}function potStake(list){var gr=0,gifts=[]
list.forEach((function(r){gr+=r.gram
gifts=gifts.concat(r.gifts)}))
var shown=gifts.slice(0,3).map((function(g){return giftTile(g)})).join('')
return(gr>0?gram(n2(gr)):'')+shown+(gifts.length>3?'<span class="mx-more-g">+'+(gifts.length-3)+'</span>':'')}function bar(list){return''}function players(list,wid,pot){return'<div class="mx-det-h"><span>Ставки игроков</span><b>банк '+gram(n2(pot))+'</b></div>'+list.slice().sort((function(a,b){return b.share-a.share})).map((function(r){var win=r.id===String(wid)
var many=r.gifts.length>2,gsum=r.gifts.reduce((function(a,g){return a+Number(g.value||0)}),0)
return'<div class="mx-pl'+(r.isMe?' me':'')+(win?' win':'')+(many?' many':'')+'"><div class="mx-pl-h"><span class="mx-pl-dot" style="background:'+esc(r.color)+'"></span>'+getScannerPlayerAvatarHtml({name:r.name,avatar:r.avatar
})+'<b>'+esc(r.name)+(r.isMe?' <em>вы</em>':'')+(win?'<span class="lx-crown">'+CROWN+'</span>':'')+'</b>'+'<span class="mx-pl-s">'+r.share.toFixed(1)+'%</span>'+gram(n2(r.stake),'sum')+'</div><div class="mx-pl-c">'+(many?'<div class="mx-strip-h"><span>'+r.gifts.length+' '+plural(r.gifts.length,'подарок','подарка','подарков')+' на '+n2(gsum)+(r.gram>0?' + '+n2(r.gram)+' GRAM':'')+'</span><span>листай →</span></div><div class="mx-strip">'+(r.gram>0?gram(n2(r.gram)):'')+r.gifts.map((function(g){
return giftTile(g,'lg')})).join('')+'</div>':stake(r,true))+'</div></div>'})).join('')}function det(id,open,attr,inner){return'<div id="'+id+'" class="scanner-history-details'+(open?' open':'')+'" '+attr+'="true" aria-hidden="'+(open?'false':'true')+'"><div class="mx-det-in">'+inner+'</div></div>'}window.getScannerRecentRoundCardHtml=function(item,index){
var safe=String(item.roundId||item.id||'recent_'+index)
var open=typeof expandedRecentRoundId!=='undefined'&&expandedRecentRoundId===safe
var list=rows(item),w=getScannerHistoryWinnerMeta(item),wr=list.filter((function(r){return r.id===w.id}))[0]
var me=w.id===String(getCurrentPlayer().id),mult=formatScannerMultiplier(w.payout||w.stake,w.stake)
var t=item.finishedAt||item.playedAt
return'<div class="history-match-card scanner-history-card lx-round mx-r mx-k'+(open?' is-expanded':'')+'" data-day="'+esc(day(t))+'" onclick="toggleScannerRecentRoundDetails(\''+esc(safe)+'\', event)">'+'<span class="mx-dot" style="--c:'+esc(w.color)+'"></span><div class="mx-card">'+'<div class="mx-r1"><span class="mx-ava" style="--c:'+esc(w.color)+'">'+getScannerPlayerAvatarHtml({name:w.name,
avatar:w.avatar
})+'<i>'+CROWN+'</i></span>'+'<span class="mx-who"><b>'+esc(w.name)+(me?' <em>вы</em>':'')+'</b><small>№'+esc(item.roundNumber||'—')+' · '+when(t)+'</small></span>'+'<span class="mx-pay"><b>'+gram(n2(w.payout))+'</b><small>'+mult+' · шанс '+(wr?wr.share.toFixed(1):'0')+'%</small></span></div>'+'<div class="mx-r2"><span class="mx-stk">'+potStake(list)+'</span><span class="mx-cnt">'+list.length+' игр.</span><span class="mx-tog">'+CHEV+'</span></div>'+bar(list)+det(getRecentRoundDetailsDomId(safe),open,'data-scanner-recent-details',players(list,w.id,item.totalPot))+'</div></div>'
}
window.getScannerHistoryEntryHtml=function(item,index,matchId){var safe=String(matchId||'scanner_'+index)
var open=typeof expandedHistoryMatchId!=='undefined'&&expandedHistoryMatchId===safe
var list=rows(item),my=getScannerHistoryMyMeta(item),w=getScannerHistoryWinnerMeta(item)
var won=item.youWon===true||w.id&&w.id===String(getCurrentPlayer().id)
var mine=list.filter((function(r){return r.isMe}))[0]||{gram:Number(my.stake||0),gifts:[],share:0,stake:Number(my.stake||0)}
var t=item.playedAt||item.finishedAt
return'<div class="history-match-card scanner-history-card lx-round mx-r mx-k mx-m '+(won?'is-win':'is-lose')+(open?' is-expanded':'')+'" data-day="'+esc(day(t))+'" onclick="toggleScannerHistoryDetails(\''+esc(safe).replace(/'/g,'&#39;')+'\', event)">'+'<span class="mx-dot '+(won?'win':'lose')+'"></span><div class="mx-card">'+'<div class="mx-r1"><span class="mx-res">'+(won?'Победа':'Поражение')+'</span><span class="mx-who"><small>Сканер №'+esc(item.roundNumber||'—')+' · '+when(t)+'</small></span>'+'<span class="mx-pay '+(won?'win':'lose')+'"><b>'+gram((won?'+':'−')+n2(won?w.payout:mine.stake||my.stake))+'</b></span></div>'+'<div class="mx-r2"><span class="mx-stk"><small class="mx-lbl">ставка</small>'+stake(mine)+'</span><span class="mx-cnt">'+mine.share.toFixed(1)+'% · '+list.length+' игр.</span><span class="mx-tog">'+CHEV+'</span></div>'+bar(list)+det(getHistoryDetailsDomId(safe),open,'data-scanner-history-details',players(list,w.id,item.totalPot))+'</div></div>'
}
window.__mxDiceHist=window.__mxDiceHist||[]
var FACE={1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]}
function dd(v){var h=''
for(var i=0;i<9;i++)h+='<i'+(FACE[v]&&FACE[v].indexOf(i)>=0?' class="on"':'')+'></i>'
return'<span class="mx-dd">'+h+'</span>'}var DST={win:'победа',bust:'перебор',lose:'проиграл',stand:'хватит'}
function diceRows(item){var me=String(getCurrentPlayer().id)
return(item.results||[]).map((function(r){var gifts=Array.isArray(r.gifts)?r.gifts:[],gv=gifts.reduce((function(a,g){return a+Number(g.value||0)}),0)
var gr=r.gramStake!=null?Number(r.gramStake):Math.max(0,Number(r.stake||0)-gv)
var sum=Number(r.sum||0)
return{id:String(r.playerId||''),name:r.name||'Игрок',color:r.color||'#34d6ff',sum:sum,dice:r.dice||[],st:r.status||(sum>21?'bust':'lose'),gram:gr,gifts:gifts,stake:Number(r.stake||gr+gv),isMe:String(r.playerId||'')===me}}))}function diceEntry(item,index,matchId){var safe=String(matchId||'dice_'+index)
var open=typeof expandedHistoryMatchId!=='undefined'&&expandedHistoryMatchId===safe
var list=diceRows(item),mine=list.filter((function(r){return r.isMe}))[0]||{sum:0,dice:[],st:'lose',gram:0,gifts:[],stake:0}
var won=mine.st==='win',bust=mine.sum>21,t=item.playedAt||item.finishedAt
var res=won?'Победа':bust?'Перебор':'Поражение'
var pay=won?'+'+n2(item.payout):'−'+n2(mine.stake)
var sorted=list.slice().sort((function(a,b){var x=a.sum>21?-1:a.sum,y=b.sum>21?-1:b.sum
return y-x}))
var det2='<div class="mx-det-h"><span>Стол '+esc(item.entry||'')+' GRAM</span><b>банк '+gram(n2(item.totalPot))+'</b></div>'+sorted.map((function(r){return'<div class="mx-dpl'+(r.isMe?' me':'')+' '+r.st+'"><span class="mx-pl-dot" style="background:'+esc(r.color)+'"></span>'+getScannerPlayerAvatarHtml({name:r.name
})+'<b>'+esc(r.name)+(r.isMe?' <em>вы</em>':'')+'</b><span class="mx-dpl-d">'+r.dice.map(dd).join('')+'</span><span class="mx-dpl-s"><b>'+r.sum+'</b><small>'+(DST[r.st]||'')+'</small></span></div>'})).join('')
return'<div class="history-match-card scanner-history-card lx-round mx-r mx-k mx-m mx-dice '+(won?'is-win':'is-lose')+(open?' is-expanded':'')+'" data-day="'+esc(day(t))+'" onclick="toggleScannerHistoryDetails(\''+esc(safe).replace(/'/g,'&#39;')+'\', event)">'+'<span class="mx-dot '+(won?'win':'lose')+'"></span><div class="mx-card">'+'<div class="mx-r1"><span class="mx-res'+(bust?' bust':'')+'">'+res+'</span><span class="mx-who"><small><span class="mx-gtag">Кости 21</span> №'+esc(item.roundNumber||'—')+' · '+when(t)+'</small></span>'+'<span class="mx-pay '+(won?'win':'lose')+'"><b>'+gram(pay)+'</b></span></div>'+'<div class="mx-r2"><span class="mx-stk"><small class="mx-lbl">ставка</small>'+stake(mine)+'</span><span class="mx-cnt mx-dsum">'+mine.dice.map(dd).join('')+'<b>'+mine.sum+'</b> · '+list.length+' игр.</span><span class="mx-tog">'+CHEV+'</span></div>'+det(getHistoryDetailsDomId(safe),open,'data-scanner-history-details',det2)+'</div></div>'
}var _isScan=window.isScannerHistoryEntry
if(typeof _isScan==='function')window.isScannerHistoryEntry=function(item){return item&&item.mode==='dice'||_isScan.apply(this,arguments)}
var _gsh=window.getScannerHistoryEntryHtml
window.getScannerHistoryEntryHtml=function(item,index,matchId){return item&&item.mode==='dice'?diceEntry(item,index,matchId):_gsh.apply(this,arguments)}
window.__mxHG=window.__mxHG||'all'
window.mxHistGame=function(g,e){if(e)e.stopPropagation()
window.__mxHG=g
try{renderHistoryEntries(Array.isArray(scannerGridState.recentRounds)?scannerGridState.recentRounds:[])}catch(x){}}
var _rhe=window.renderHistoryEntries
if(typeof _rhe==='function')window.renderHistoryEntries=function(entries){var tm=function(x){return ms(x.playedAt||x.finishedAt)||0}
var all=(entries||[]).filter((function(x){return x&&x.mode!=='dice'})).concat(window.__mxDiceHist||[])
var G2=window.__mxHG,nD=(window.__mxDiceHist||[]).length
if(G2==='scan')all=all.filter((function(x){return x.mode!=='dice'}))
else if(G2==='dice')all=all.filter((function(x){return x.mode==='dice'}))
all.sort((function(a,b){return tm(b)-tm(a)}))
var r=_rhe.call(this,all)
var panel=document.getElementById('historyPanel'),area=panel&&(panel.querySelector('.history-scroll-area-arena')||panel.querySelector('.history-scroll-area'))
if(area&&!area.querySelector('.mx-hg'))area.insertAdjacentHTML('afterbegin','<div class="mx-hg" role="tablist">'+[['all','Все игры'],['scan','Сканер'],['dice','Кости 21']].map((function(x){return'<button type="button" class="'+(G2===x[0]?'on':'')+'" onclick="mxHistGame(\''+x[0]+'\', event)">'+x[1]+(x[0]==='dice'&&nD?' <i>'+nD+'</i>':'')+'</button>'})).join('')+'</div>')
return r}
function diceLoad(){try{_socket.emit('dice:history:request',{limit:50},(function(res){if(!res||!Array.isArray(res.items))return
var have={};(window.__mxDiceHist||[]).forEach((function(x){have[x.roundId]=1}))
res.items.forEach((function(x){if(!have[x.roundId])window.__mxDiceHist.push(x)}))
var p=document.getElementById('historyPanel')
if(p&&p.classList.contains('open')&&!(p.querySelector('.history-tabs')||{}).classList.contains('is-market'))window.mxHistGame(window.__mxHG)}))}catch(e){}}setTimeout(diceLoad,1500)
var _orh=window.openRecentHistory
if(typeof _orh==='function')window.openRecentHistory=function(){var r=_orh.apply(this,arguments)
diceLoad()
return r}
window.mxDiceRecord=function(S,B){try{var nw=(S.win||[]).length,pay=nw?B.gram/nw*.95:0
var res=S.seats.filter(Boolean).map((function(s){return{playerId:s.me?String(getCurrentPlayer().id):String(s.id||s.name),name:s.me?getCurrentPlayer().name||getCurrentPlayer().username||'Ты':s.name,color:s.color,sum:s.sum,dice:s.dice.slice(),status:s.st==='win'?'win':s.sum>21?'bust':'lose',gramStake:s.stake.gram||0,gifts:(s.stake.gifts||[]).slice(),
stake:(s.stake.gram||0)+(s.stake.gifts||[]).reduce((function(a,g){return a+Number(g.value||0)}),0)}}))
var tot=res.reduce((function(a,r){return a+r.stake}),0)
window.__mxDiceHist.unshift({mode:'dice',status:'finished',roundId:'dl'+Date.now(),roundNumber:900+window.__mxDiceHist.length+1,playedAt:Date.now(),entry:S.room?S.room.entry:'',totalPot:tot,payout:pay,results:res})}catch(e){console.warn(e)}}
var KIND={buy:['Покупка','−','out'],sell:['Продажа','+','in'],withdraw:['Вывод в Telegram','','neutral'],deposit:['Добавлен в маркет','','neutral']}
window.buildMarketHistoryRowHtml=function(it){var k=KIND[it.kind]||[it.kind,'','neutral']
var g={giftType:it.giftType||it.giftSlug,number:it.number,giftTitle:it.giftTitle,backdropCenterColor:it.backdropCenterColor,backdropEdgeColor:it.backdropEdgeColor}
function attr(l,v,r){return v?'<div class="mx-ta"><small>'+l+'</small><b>'+esc(v)+'</b>'+(r!=null?'<em>'+esc(r)+'%</em>':'')+'</div>':''}var attrs=attr('Модель',it.model,it.modelRarity)+attr('Фон',it.backdrop,it.backdropRarity)+attr('Узор',it.pattern,it.patternRarity)
function li(l,v){return'<div class="mx-tl"><span>'+l+'</span><b>'+v+'</b></div>'}var lines=(it.fee!=null?li('Комиссия',gram(n2(it.fee))):'')+li('Дата и время',full(it.at))
var key=String(it.id||it.historyId||(it.kind||'')+'_'+(it.number||'')+'_'+(it.at||'')).replace(/[^\w-]/g,'_');(window.__mxTx=window.__mxTx||{})[key]=it
return'<div class="mx-tx '+k[2]+'" onclick="mxTxOpen(\''+key+'\')">'+'<div class="mx-tx-h">'+giftTile(g,'tx')+'<span class="mx-tx-w"><b>'+esc(it.giftTitle||'Подарок')+(it.number?' <small>#'+esc(it.number)+'</small>':'')+'</b><small>'+k[0]+' · '+when(it.at)+'</small></span>'+(it.price!=null?'<span class="mx-tx-a">'+gram(k[1]+n2(it.price))+'</span>':'')+'</div>'+'<div class="mx-tx-d">'+(attrs?'<div class="mx-tas">'+attrs+'</div>':'')+'<div class="mx-tls">'+lines+'</div></div></div>'
}
var RW=[{slug:'lolpop',name:'Lol Pop',threshold:25e3},{slug:'cupidcharm',name:'Cupid Charm',threshold:8e4},{slug:'kissedfrog',name:'Kissed Frog',threshold:2e5},{slug:'minioscar',name:'Mini Oscar',threshold:3e5}]
var RK=typeof LEVEL_REWARD_BY_CARD!=='undefined'?LEVEL_REWARD_BY_CARD:['worker','master','pro','pro_bonus']
function auFx(k){var h='',n
if(k===0){for(n=0;n<9;n++)h+='<i style="--l:'+(6+n*11)+'%;--s:'+(4+n*7%8)+'px;--d:'+(-n*.9).toFixed(1)+'s;--t:'+(5+n%3*1.6).toFixed(1)+'s"></i>'
return'<span class="au-fx fx-bub" aria-hidden="true">'+h+'</span>'}if(k===1){for(n=0;n<24;n++)h+='<i style="--d:'+(-n*.17).toFixed(2)+'s;--t:'+(2.6+n%5*.3).toFixed(1)+'s"></i>'
return'<span class="au-fx fx-gth" aria-hidden="true">'+h+'<em></em></span>'}if(k===2){return'<span class="au-fx fx-wv" aria-hidden="true"><b></b><u></u><u></u><u></u><u></u><em></em><em></em><em></em><em></em><em></em><em></em></span>'}for(n=0;n<12;n++)h+='<i style="--l:'+n*37%100+'%;--d:'+(-n*.55).toFixed(2)+'s;--s:'+(6+n%3*3)+'px;--t:'+(3.2+n%4*.7).toFixed(1)+'s"></i>'
return'<span class="au-fx fx-star" aria-hidden="true">'+h+'<em></em></span>'}var GK=0
function giftSvg(a,b){var k='gf'+ ++GK
return'<svg class="mx-gsvg" viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="'+k+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+a+'"/><stop offset="1" stop-color="'+b+'"/></linearGradient></defs><rect x="12" y="27" width="40" height="30" rx="5" fill="url(#'+k+')"/><rect x="29" y="27" width="6" height="30" fill="#fef3c7"/><g class="gl"><path d="M32 19c-3-10-16-12-16-4 0 5 9 5 16 4zm0 0c3-10 16-12 16-4 0 5-9 5-16 4z" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.6"/><rect x="9" y="19" width="46" height="11" rx="4" fill="'+a+'"/><rect x="29" y="19" width="6" height="11" fill="#fef3c7"/></g><rect x="12" y="30" width="40" height="3" fill="rgba(0,0,0,.16)"/><circle cx="20" cy="40" r="2" fill="rgba(255,255,255,.35)"/><circle cx="44" cy="48" r="1.6" fill="rgba(255,255,255,.3)"/></svg>'
}function giftArt(slug,a,b){return giftSvg(a,b)+(slug?'<img src="https://fragment.com/file/gifts/'+slug+'/thumb.webp" alt="" loading="lazy" onload="this.parentNode.classList.add(\'ok\')" onerror="this.remove()">':'')}window.__mxGiftArt=giftArt
function rwImg(rw){return rw?'<img src="https://fragment.com/file/gifts/'+rw.slug+'/thumb.webp" alt="" loading="lazy" onerror="this.style.display=\'none\'">':''}function data(levels,turnover,levelKey){var srv=typeof _levelRewards!=='undefined'&&_levelRewards&&_levelRewards.length?_levelRewards:[]
var tv=Number(turnover||0),cur=Math.max(0,levels.findIndex((function(l){return l.key===levelKey})))
return{tv:tv,cur:cur,list:levels.map((function(lv,i){var next=levels[i+1],end=next?next.threshold:RW[i]?RW[i].threshold:null,s=srv.filter((function(r){return r.key===RK[i]}))[0]
return{lv:lv,i:i,end:end,rw:RW[i],given:!!(s&&s.given),state:i<cur?'done':i===cur?'cur':'lock',pct:end?Math.max(0,Math.min(100,(tv-lv.threshold)/(end-lv.threshold)*100)):100,mc:lv.marketCommission!=null?lv.marketCommission+'%':'—',name:typeof L==='function'?L(lv.name,lv.nameEn||lv.name):lv.name}}))}}function rwStatus(x){
return x.given?'Получен':(x.state==='lock'?'откроется при '+compact(x.rw.threshold):'заберёшь при '+compact(x.rw.threshold))+(x.given?'':' GRAM')}function tag(x){return x.state==='cur'?'<span class="mx-tag cur">Сейчас</span>':x.state==='done'?'<span class="mx-tag ok">Пройден</span>':'<span class="mx-tag lock">Закрыт</span>'}function prog(x,D){
return x.state==='cur'&&x.end?'<div class="mx-prog"><i style="width:'+x.pct.toFixed(1)+'%"></i></div><div class="mx-prog-c"><span>'+compact(D.tv)+' GRAM</span><span>ещё '+compact(Math.max(0,x.end-D.tv))+'</span></div>':''}var sel=null,lastLv=null
window.mxLvPick=function(i){sel=i
if(lastLv)window.renderReferralLevelCards.apply(null,lastLv)}
var KEY={lv:{6:'3',9:'5',10:'2',12:'sh',13:'4',15:'au',16:'5'}[MM]||M,ref:{1:'t',4:'2',6:'t',9:'1',10:'5',12:'t',13:'t',15:'o',16:'t'}[MM]||M,at:{6:'3',9:'5',10:'2',12:'4',13:'3',15:'1',16:'2'}[MM]||M}
if(document.documentElement.hasAttribute('data-app'))KEY.at='3'
var _origLvCards=window.__origLvCards||window.renderReferralLevelCards
window.renderReferralLevelCards=function(levels,turnover,levelKey){var M=KEY.lv
if(M==='o'&&typeof _origLvCards==='function'){try{_lastReferralLevelsData=Object.assign({},typeof _lastReferralLevelsData!=='undefined'&&_lastReferralLevelsData||{},{levels:levels,turnover:turnover,levelKey:levelKey})}catch(e){}var rw0=document.getElementById('referralLevelsRow')
if(rw0)rw0.className='mx-levels mo-levels'
var rr=_origLvCards.apply(this,arguments)
try{if(window.__origLvBadges)window.__origLvBadges()}catch(e){}return rr}var row=document.getElementById('referralLevelsRow')
if(!row||!Array.isArray(levels)||!levels.length)return
lastLv=[levels,turnover,levelKey]
try{_lastReferralLevelsData=Object.assign({},typeof _lastReferralLevelsData!=='undefined'&&_lastReferralLevelsData||{},{levels:levels,turnover:turnover,levelKey:levelKey})}catch(e){}var D=data(levels,turnover,levelKey),html=''
var head='<div class="mx-lv-head"><b>Уровни</b><small>оборот рефералов '+compact(D.tv)+' GRAM</small></div>'
if(M==='1'){html=head+'<div class="m1-rail">'+D.list.map((function(x){
return'<div class="m1-lv '+x.state+'"><div class="m1-lv-top"><span class="m1-n">'+(x.i+1)+'</span>'+tag(x)+'</div>'+'<div class="m1-hero"><span class="m1-gift">'+rwImg(x.rw)+'</span><small>награда за прохождение</small><b>'+esc(x.rw?x.rw.name:'—')+'</b><em>'+(x.rw?rwStatus(x):'')+'</em></div>'+'<b class="m1-name">'+esc(x.name)+'</b>'+'<div class="m1-stats"><div><b>'+x.lv.percent+'%</b><small>с рефералов</small></div><div><b>'+x.mc+'</b><small>маркет</small></div><div><b>'+compact(x.lv.threshold)+'</b><small>порог</small></div></div>'+prog(x,D)+'</div>'
})).join('')+'</div>'}else if(M==='2'){html=head+'<div class="m2-car">'+D.list.map((function(x){
return'<div class="m2-tk '+x.state+'" data-i="'+x.i+'"><div class="m2-tk-top"><span class="m2-tk-g">'+rwImg(x.rw)+'</span><span class="m2-tk-rw"><small>НАГРАДА ЗА ПРОХОЖДЕНИЕ</small><b>'+esc(x.rw?x.rw.name:'—')+'</b><em>'+(x.rw?rwStatus(x):'')+'</em></span></div>'+'<div class="m2-tk-bot"><div class="m2-tk-h"><span><small>УРОВЕНЬ '+(x.i+1)+'</small><b>'+esc(x.name)+'</b></span>'+tag(x)+'</div>'+'<ul class="m2-priv"><li><span>С комиссии рефералов</span><i></i><b>'+x.lv.percent+'%</b></li><li><span>Твоя комиссия маркета</span><i></i><b>'+x.mc+'</b></li><li><span>Оборот рефералов</span><i></i><b>от '+compact(x.lv.threshold)+'</b></li></ul>'+prog(x,D)+'</div></div>'
})).join('')+'</div><div class="m2-dots">'+D.list.map((function(x){return'<i class="'+(x.i===D.cur?'on':'')+'"></i>'})).join('')+'</div>'}else if(M==='3'){var s3=sel==null?D.cur:sel,x3=D.list[s3]
html=head+'<div class="m3-steps" style="--p:'+((D.cur+D.list[D.cur].pct/100)/Math.max(1,D.list.length-1)*100).toFixed(1)+'%">'+D.list.map((function(x){return'<button type="button" class="m3-st '+x.state+(x.i===s3?' sel':'')+'" onclick="mxLvPick('+x.i+')"><span class="m3-g">'+rwImg(x.rw)+'</span><b>'+x.lv.percent+'%</b><small>'+esc(x.name)+'</small></button>'
})).join('')+'</div><div class="m3-card '+x3.state+'"><div class="m3-c-top"><span><small>Уровень '+(x3.i+1)+'</small><b>'+esc(x3.name)+'</b></span>'+tag(x3)+'</div>'+'<div class="m3-c-mid"><span class="m3-big">'+x3.lv.percent+'<small>%</small></span><span class="m3-c-p"><span>с комиссии рефералов</span><span>маркет <b>'+x3.mc+'</b></span><span>порог <b>'+compact(x3.lv.threshold)+' GRAM</b></span></span></div>'+(x3.rw?'<div class="m3-rw"><span class="m3-rw-g">'+rwImg(x3.rw)+'</span><span><small>Подарок за прохождение</small><b>'+esc(x3.rw.name)+'</b></span><em>'+rwStatus(x3)+'</em></div>':'')+prog(x3,D)+'</div>'
}else if(M==='sh'){var GC=[['#a5b4fc','#4f46e5'],['#7dd3fc','#0369a1'],['#f0abfc','#a21caf'],['#fde68a','#b45309']],cx=D.list[D.cur],nx=D.list[D.cur+1]
html=head+'<div class="shl"><div class="shl-row">'+D.list.map((function(x){var c=GC[x.i%4]
return'<div class="shl-it '+x.state+'"><span class="shl-spot" aria-hidden="true"></span><span class="shl-g">'+giftArt(x.rw&&x.rw.slug,c[0],c[1])+'</span><b>'+x.lv.percent+'%</b><small>'+esc(x.name)+'</small>'+(x.state==='cur'?'<em class="shl-tag">сейчас</em>':x.state==='done'?'<em class="shl-tag ok">✓</em>':'<em class="shl-tag lk">от '+compact(x.lv.threshold)+'</em>')+'</div>'
})).join('')+'</div><div class="shl-board" aria-hidden="true"></div>'+'<div class="shl-path"><div class="shl-ph"><span><small>сейчас</small><b>'+esc(cx.name)+' · '+cx.lv.percent+'%</b></span>'+(nx?'<span class="r"><small>дальше</small><b>'+esc(nx.name)+' · '+nx.lv.percent+'%</b></span>':'<span class="r"><small>максимум</small><b>достигнут</b></span>')+'</div>'+(nx?'<div class="shl-tr"><i style="width:'+cx.pct.toFixed(1)+'%"></i></div><div class="shl-ends"><span>'+compact(D.tv)+' GRAM</span><span>ещё '+compact(Math.max(0,cx.end-D.tv))+' до '+compact(cx.end)+'</span></div>':'')+(cx.rw?'<div class="shl-rw"><span>награда за уровень</span><b>'+esc(cx.rw.name)+'</b><em>'+rwStatus(cx)+'</em></div>':'')+'</div></div>'
}else if(M==='au'){var LC=[['#5eead4','#0d9488'],['#7dd3fc','#0369a1'],['#c4b5fd','#6d28d9'],['#fde68a','#b45309']]
html=head+'<div class="au-car">'+D.list.map((function(x){var c=LC[x.i%4],pg
if(x.state==='cur'&&x.end)pg='<div class="au-pg"><div class="au-tr"><i style="width:'+x.pct.toFixed(1)+'%"></i><u style="left:'+x.pct.toFixed(1)+'%"><em>'+Math.round(D.tv).toLocaleString('ru-RU')+'</em></u></div><div class="au-ends"><span>'+Math.round(x.lv.threshold).toLocaleString('ru-RU')+'</span><span>'+Math.round(x.end).toLocaleString('ru-RU')+'</span></div></div>'
else if(x.state==='done')pg='<div class="au-pg done"><div class="au-tr"><i style="width:100%"></i></div><div class="au-ends"><span>уровень пройден</span><span>✓</span></div></div>'
else pg='<div class="au-pg lock"><div class="au-tr"></div><div class="au-ends"><span>'+Math.round(x.lv.threshold).toLocaleString('ru-RU')+'</span><span>'+(x.end?Math.round(x.end).toLocaleString('ru-RU'):'')+'</span></div></div>'
return'<div class="au-lv '+x.state+' fxl'+x.i%4+'" style="--a:'+c[0]+';--b:'+c[1]+'">'+auFx(x.i%4)+'<div class="au-top"><span class="au-n"><small>уровень '+(x.i+1)+'</small><b>'+esc(x.name)+'</b>'+tag(x)+'</span><span class="au-orb"><span class="au-ring"></span><span class="au-gift">'+giftArt(x.rw&&x.rw.slug,c[0],c[1])+'</span></span></div>'+'<div class="au-st"><span><b>'+x.lv.percent+'%</b><small>реф. процент</small></span><span><b>'+x.mc+'</b><small>ком. маркета</small></span></div>'+pg+(x.rw?'<div class="au-rw"><span>награда</span><b>'+esc(x.rw.name)+'</b><em>'+rwStatus(x)+'</em></div>':'')+'</div>'
})).join('')+'</div><div class="mx-dots">'+D.list.map((function(x){return'<i class="'+(x.i===D.cur?'on':'')+'"></i>'})).join('')+'</div>'}else if(M==='4'){html=head+'<div class="m4-grid">'+D.list.map((function(x){
return'<div class="m4-lv '+x.state+'"><div class="m4-art"><span class="m4-g">'+rwImg(x.rw)+'</span>'+tag(x)+'<span class="m4-rwn">'+esc(x.rw?x.rw.name:'')+'</span></div>'+'<div class="m4-b"><div class="m4-t"><b>'+esc(x.name)+'</b><span>'+x.lv.percent+'%</span></div><small>маркет '+x.mc+' · от '+compact(x.lv.threshold)+'</small><em>'+(x.rw?rwStatus(x):'')+'</em>'+prog(x,D)+'</div></div>'
})).join('')+'</div>'}else{html=head+'<div class="m5-stack">'+D.list.map((function(x){
return'<div class="m5-lv '+x.state+'"><div class="m5-l"><span class="m5-g">'+rwImg(x.rw)+'</span><small>'+(x.rw?esc(x.rw.name):'')+'</small></div>'+'<div class="m5-r"><div class="m5-t"><b>'+esc(x.name)+'</b>'+tag(x)+'</div><div class="m5-p"><span><b>'+x.lv.percent+'%</b> рефералы</span><span><b>'+x.mc+'</b> маркет</span><span>от <b>'+compact(x.lv.threshold)+'</b></span></div>'+'<div class="m5-rw">'+(x.rw?'🎁 '+rwStatus(x):'')+'</div>'+prog(x,D)+'</div></div>'
})).join('')+'</div>'}row.className='mx-levels m'+M+'-levels'
if(row.__h===html)return
row.__h=html
row.innerHTML=html
var car=row.querySelector('.m2-car, .m1-rail, .mx-car, .au-car')
if(car){var cc=car.children[D.cur]
if(cc)car.scrollLeft=Math.max(0,cc.offsetLeft-car.offsetLeft-8)
var dots=row.querySelectorAll('.m2-dots i, .mx-dots i')
if(dots.length)car.addEventListener('scroll',(function(){var w=car.children[0]?car.children[0].offsetWidth:1,k=Math.round(car.scrollLeft/Math.max(1,w))
dots.forEach((function(d,j){d.classList.toggle('on',j===k)}))}),{passive:true})}}
window.applyLevelRewardBadges=function(){if(lastLv)window.renderReferralLevelCards.apply(null,lastLv)}
window.mxRefMore=function(k){window.__mxRefLim=k?(window.__mxRefLim||10)+10:10
window.renderReferralTableRows(window.__mxRefAll||[])}
window.mxRefFind=function(q){window.__mxRefQ=q
window.__mxRefLim=10
window.renderReferralTableRows(window.__mxRefAll||[])
var i=document.getElementById('mxRefQ')
if(i){i.focus()
i.setSelectionRange(i.value.length,i.value.length)}}
window.mxRefCol=function(c){window.__mxRefCol=c
window.renderReferralTableRows(window.__mxRefAll||[])}
window.mxRefView=function(v){try{localStorage.setItem('mxRv',v)}catch(e){}window.renderReferralTableRows(window.__mxRefItems||[])}
window.renderReferralTableRows=function(items){var M=KEY.ref
window.__mxRefAll=items
var listEl=document.getElementById('referralList')
if(!listEl)return
var box=document.getElementById('lxRefList')
if(!box){box=document.createElement('div')
box.id='lxRefList'
var tb=document.getElementById('referralTable')
if(tb&&tb.parentNode)tb.parentNode.insertBefore(box,tb)}items=(items||[]).slice().sort((function(a,b){return Number(b.totalEarn||0)-Number(a.totalEarn||0)}))
window.__mxRefItems=items
var ALL=items,TA=0,TM=0,TE=0
ALL.forEach((function(it){TA+=Number(it.gamesMarketEarn||0)
TM+=Number(it.marketEarn||0)
TE+=Number(it.totalEarn||0)}))
var Q=(window.__mxRefQ||'').toLowerCase()
if(Q)items=items.filter((function(it){return String(it.name||it.username||'').toLowerCase().indexOf(Q)>=0}))
var LIM=M==='t'||M==='o'?1e9:window.__mxRefLim||10,FOUND=items.length
items=items.slice(0,LIM)
var max=Math.max.apply(null,items.map((function(i){return Number(i.totalEarn||0)})).concat([1]))
function nm(it){return esc(it.name||it.username||'Игрок '+(it.playerId||it.id||''))}function av(it){return'<span class="scanner-player-avatar">'+nm(it).charAt(0).toUpperCase()+'</span>'}function split(it){var a=Number(it.gamesMarketEarn||0),m=Number(it.marketEarn||0),s=a+m||1
return'<span class="mx-split"><i class="a" style="flex:'+(a/s).toFixed(3)+'"></i><i class="m" style="flex:'+(m/s).toFixed(3)+'"></i></span>'}function TG(t){return t}var GU='<small class="mx-u">GRAM</small>'
var UIC='<svg class="rt-ui" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 3-5.8 6.5-5.8s6.5 2.2 6.5 5.8M16.5 4.6a3.5 3.5 0 0 1 0 6.8M21.5 20c0-2.6-1.5-4.5-3.7-5.3"/></svg>'
var html
if(M==='t'){var sa=0,sm=0,se=0
items.forEach((function(it){sa+=Number(it.gamesMarketEarn||0)
sm+=Number(it.marketEarn||0)
se+=Number(it.totalEarn||0)}))
html='<div class="rt-tb"><div class="rt-th"><span>#</span><span>Игрок</span><span>'+TG('Арена')+'</span><span>'+TG('Маркет')+'</span><span>'+TG('Доход')+'</span></div><div class="rt-body">'+items.map((function(it,i){
return'<div class="rt-tr"><span class="rt-n"><i>'+(i+1)+'</i></span><span class="rt-pl">'+av(it)+'<span><b>'+nm(it)+'</b><small>оборот '+compact(it.turnover)+'</small></span></span><span class="rt-a">'+n2(it.gamesMarketEarn)+'</span><span class="rt-m">'+n2(it.marketEarn)+'</span><span class="rt-e">+'+n2(it.totalEarn)+'</span></div>'
})).join('')+'</div><div class="rt-tf"><span></span><span class="rt-cnt">'+UIC+ALL.length+' '+plural(ALL.length,'реферал','реферала','рефералов')+'</span><span class="rt-a">'+n2(TA)+GU+'</span><span class="rt-m">'+n2(TM)+GU+'</span><span class="rt-e">+'+n2(TE)+GU+'</span></div></div>'}else if(M==='o'){var col=window.__mxRefCol||'a'
function navSvg(id,fb){var e=document.querySelector('#'+id+' .nav-icon svg')
if(!e)return fb
var c=e.cloneNode(true)
c.removeAttribute('width')
c.removeAttribute('height')
c.setAttribute('aria-hidden','true')
return c.outerHTML}var IA=navSvg('navArenaMarket','<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"/></svg>')
var IM=navSvg('navMarket','<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="8" width="16" height="12" rx="2"/></svg>')
function dt(v){var t=ms(v)
if(!t)return''
var d=new Date(t)
return pad(d.getDate())+'.'+pad(d.getMonth()+1)+'.'+d.getFullYear()}
html='<div class="ro-tb ro-'+col+'"><div class="ro-th"><span>№</span><span>Пользователь</span><span>'+TG('Оборот')+'</span><span class="ro-tg"><button type="button" class="'+(col==='a'?'on':'')+'" onclick="mxRefCol(\'a\')" aria-label="Арена">'+IA+'</button><button type="button" class="'+(col==='m'?'on':'')+'" onclick="mxRefCol(\'m\')" aria-label="Маркет">'+IM+'</button></span><span>'+TG('Доход')+'</span></div><div class="ro-body">'+items.map((function(it,i){
return'<div class="ro-tr"><span class="ro-n">'+(i+1)+'</span><span class="ro-pl">'+av(it)+'<span><b>'+nm(it)+'</b><small>'+dt(it.joinedAt)+'</small></span></span><span class="ro-v">'+n2(it.turnover)+'</span><span class="ro-v">'+n2(col==='a'?it.gamesMarketEarn:it.marketEarn)+'</span><span class="ro-e">'+n2(it.totalEarn)+'</span></div>'
})).join('')+'</div><div class="ro-tf"><span></span><span class="rt-cnt">'+UIC+ALL.length+' '+plural(ALL.length,'реферал','реферала','рефералов')+'</span><span class="ro-v">'+compact(ALL.reduce((function(a,it){return a+Number(it.turnover||0)}),0))+GU+'</span><span class="ro-v">'+n2(col==='a'?TA:TM)+GU+'</span><span class="ro-e">'+n2(TE)+GU+'</span></div></div>'
}else if(M==='1')html='<div class="m1-refs">'+items.map((function(it){return'<div class="m1-ref">'+av(it)+'<span class="m1-ref-w"><b>'+nm(it)+'</b>'+split(it)+'<small>арена '+n2(it.gamesMarketEarn)+' · маркет '+n2(it.marketEarn)+'</small></span><span class="m1-ref-e">'+gram('+'+n2(it.totalEarn))+'</span></div>'})).join('')+'</div>'
else if(M==='2')html='<div class="m2-pass">'+items.map((function(it,i){return'<div class="m2-ps"><div class="m2-ps-l">'+av(it)+'<span><small>РЕФЕРАЛ '+pad(i+1)+'</small><b>'+nm(it)+'</b><em>арена '+n2(it.gamesMarketEarn)+' · маркет '+n2(it.marketEarn)+'</em></span></div><div class="m2-ps-r"><small>ДОХОД</small><b>+'+n2(it.totalEarn)+'</b><em>оборот '+compact(it.turnover)+'</em></div></div>'
})).join('')+'</div>'
else if(M==='3')html='<div class="m3-lb">'+items.map((function(it,i){var p=Number(it.totalEarn||0)/max*100
return'<div class="m3-lbr"><span class="m3-lbn">'+(i+1)+'</span><span class="m3-lbb"><i style="width:'+Math.max(18,p).toFixed(1)+'%"></i><span class="m3-lbw">'+av(it)+'<b>'+nm(it)+'</b></span><em>+'+n2(it.totalEarn)+'</em></span></div>'})).join('')+'</div>'
else if(M==='4')html='<div class="m4-refs">'+items.map((function(it,i){var a=Number(it.gamesMarketEarn||0),m=Number(it.marketEarn||0),t=a+m||1
return'<div class="m4-ref"><span class="m4-ref-ring" style="--a:'+(a/t*100).toFixed(1)+'">'+av(it)+'</span><b>'+nm(it)+'</b><span class="m4-ref-e">'+gram('+'+n2(it.totalEarn))+'</span><small>оборот '+compact(it.turnover)+'</small></div>'})).join('')+'</div>'
else html='<div class="m5-bento">'+items.map((function(it,i){return'<div class="m5-bx'+(i===0?' big':'')+'"><span class="m5-bx-r">#'+(i+1)+'</span>'+av(it)+'<b>'+nm(it)+'</b><span class="m5-bx-e">+'+n2(it.totalEarn)+'</span><small>оборот '+compact(it.turnover)+'</small></div>'})).join('')+'</div>'
var RV='list'
if(RV==='cards')html='<div class="mx-rc">'+items.map((function(it,i){
return'<div class="mx-rcc"><span class="mx-rcc-n">'+(i+1)+'</span>'+av(it)+'<b>'+nm(it)+'</b><span class="mx-rcc-e">'+gram('+'+n2(it.totalEarn))+'</span>'+split(it)+'<span class="mx-rcc-l"><span>арена</span><b>'+n2(it.gamesMarketEarn)+'</b></span><span class="mx-rcc-l"><span>маркет</span><b>'+n2(it.marketEarn)+'</b></span><span class="mx-rcc-l"><span>оборот</span><b>'+compact(it.turnover)+'</b></span></div>'
})).join('')+'</div>'
var sumH=M==='t'||M==='o'?'<div class="mx-rhd">Приглашено пользователей: <b>'+ALL.length+'</b></div>':'<div class="mx-rsum"><span class="a"><small>Приглашено</small><b>'+ALL.length+'</b></span><span class="b"><small>Доход всего</small><b>+'+n2(TE)+'</b></span><span class="c"><small>Арена</small><b>'+n2(TA)+'</b></span><span class="d"><small>Маркет</small><b>'+n2(TM)+'</b></span></div>'
var moreH=M==='t'||M==='o'?'':FOUND>LIM?'<button type="button" class="mx-rmore" onclick="mxRefMore(1)">Показать ещё '+Math.min(10,FOUND-LIM)+' <small>из '+FOUND+'</small></button>':LIM>10&&FOUND>10?'<button type="button" class="mx-rmore" onclick="mxRefMore(0)">Свернуть список</button>':''
if(!items.length&&Q)html='<div class="mx-nf">Никого не нашли по запросу «'+esc(Q)+'»</div>'
html=sumH+(ALL.length>8&&M!=='t'&&M!=='o'?'<label class="mx-rq"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><input type="text" id="mxRefQ" placeholder="Найти реферала" value="'+esc(window.__mxRefQ||'')+'" oninput="mxRefFind(this.value)" autocomplete="off"></label>':'')+'<div class="mx-rl">'+html+'</div>'+moreH
box.className='lx-ref-list mx-refbox'
var sb0=box.querySelector('.ro-body, .rt-body'),st0=sb0?sb0.scrollTop:0
box.innerHTML=html
var sb1=box.querySelector('.ro-body, .rt-body')
if(sb1&&st0)sb1.scrollTop=st0
listEl.innerHTML=''}
var DECO={1:'<div class="m1-deco"><span class="m1-badge">до 15%</span></div>',2:'<div class="m2-deco"><span>Пригласительный</span><b>LASER · REF</b></div>',3:'<div class="m3-deco"><b>15<small>%</small></b><span>с комиссии каждого приглашённого — навсегда</span></div>',4:'<div class="m4-deco"><span><i>1</i>Скопируй</span><span><i>2</i>Отправь</span><span><i>3</i>Получай %</span></div>',
5:'<ol class="m5-deco"><li><b>Отправь ссылку</b><span>друг заходит по ней в приложение</span></li><li><b>Друг играет</b><span>в арене и на маркете</span></li><li><b>Ты получаешь</b><span>до 15% с его комиссии</span></li></ol>'}
var HERO={1:'<div class="rh1"><div class="rh1-orb"><i></i><i></i><i></i><b>15<small>%</small></b></div><div class="rh1-lv"><span><b>3%</b><small>Новичок</small></span><span><b>5%</b><small>Работяга</small></span><span><b>9%</b><small>Мастер</small></span><span><b>15%</b><small>Профи</small></span></div></div>',
6:'<div class="rh6"><span class="au-sky" aria-hidden="true"><i></i><i></i><i></i></span><small>реферальная программа</small><b class="rh6-big">до 15%</b><span class="rh6-sub">с комиссии каждого друга — навсегда</span><div class="rh6-steps"><span><i>1</i>Скопируй ссылку</span><span><i>2</i>Друг играет</span><span><i>3</i>Ты получаешь %</span></div></div>',
4:'<div class="rh4"><span class="rh4-g g1">🎁</span><span class="rh4-g g2">🧸</span><span class="rh4-g g3">💎</span><span class="rh4-g g4">🚀</span><span class="rh4-g g5">🎀</span></div>',
9:'<div class="rh9"><span class="rh9-coin"><b>15%</b><small>до</small></span><span class="rh9-t"><b>Друзья — это доход</b><small>каждый приглашённый приносит процент с комиссии в арене и на маркете</small></span></div>',10:'<div class="rh10"><span class="rh10-jar"><b>%</b></span><span class="rh10-chips"><i class="a">арена</i><i class="b">маркет</i><i class="c">навсегда</i></span></div>',
12:'<div class="rh12t"><span class="rh12t-tk"><span class="rh12t-l"><small>приглашение</small><b>до 15%</b><em>с комиссии каждого друга — навсегда</em></span><span class="rh12t-perf" aria-hidden="true"></span><span class="rh12t-r"><i>арена</i><i>маркет</i></span></span><span class="rh12t-steps"><span><i>1</i>Отправь ссылку</span><span><i>2</i>Друг играет</span><span><i>3</i>Ты получаешь %</span></span></div>',
13:'<div class="rh13l"><div class="rh13l-h"><small>реферальная программа</small><b>до 15%</b><span>с комиссии каждого друга — в арене и на маркете</span></div><div class="rh13l-f"><span><i>1</i><b>Отправь ссылку</b><small>друг заходит по ней в приложение</small></span><span><i>2</i><b>Друг играет</b><small>Сканер, Кости 21, покупки в маркете</small></span><span class="on"><i>3</i><b>Ты получаешь процент</b><small>начисляется сразу — забирай от 1 GRAM</small></span></div></div>',
15:'<div class="rh15b"><span class="rh15b-sky" aria-hidden="true"><i></i><i></i><i></i></span><span class="rh15b-rays" aria-hidden="true"></span><span class="rh15b-spk" aria-hidden="true">'+[[8,18],[22,62],[36,10],[64,14],[78,56],[90,22],[50,4],[14,40],[86,40],[58,30]].map((function(p,n){return'<i style="left:'+p[0]+'%;top:'+p[1]+'%;--d:'+(-n*.37).toFixed(2)+'s"></i>'
})).join('')+'</span><span class="rh15b-conf" aria-hidden="true">'+['#5eead4','#f9a8d4','#fde68a','#86efac','#c4b5fd','#67e8f9','#fca5a5'].concat(['#5eead4','#fde68a','#f9a8d4','#86efac','#67e8f9','#c4b5fd']).map((function(c,n){return'<i style="--c:'+c+';left:'+(n*29+7)%96+'%;--d:'+(-n*.61).toFixed(2)+'s;--t:'+(3.6+n%4*.6).toFixed(1)+'s;--r:'+(n%2?1:-1)+'"></i>'
})).join('')+'</span><span class="rh15b-st">'+[['plushpepe','#86efac','#15803d','g1'],['lolpop','#f9a8d4','#be185d','g2'],['kissedfrog','#5eead4','#0f766e','g3'],['cupidcharm','#fca5a5','#b91c1c','g4'],['minioscar','#fde68a','#b45309','g5']].map((function(g){
return'<span class="rh15b-g '+g[3]+'" onclick="event.stopPropagation(); this.classList.remove(\'pop\'); void this.offsetWidth; this.classList.add(\'pop\')"><span class="rh15b-sh"></span><span class="rh15b-i">'+giftArt(g[0],g[1],g[2])+'</span><span class="rh15b-burst"><i></i><i></i><i></i><i></i><i></i><i></i></span></span>'})).join('')+'</span><span class="rh15b-badge">до <b>15%</b></span></div>',
16:'<div class="rh16"><div class="rh16-h"><span>уровень</span><span>доля</span><span>оборот от</span></div><div class="rh16-r"><span>Новичок</span><b>3%</b><em>0</em></div><div class="rh16-r"><span>Работяга</span><b>5%</b><em>25k</em></div><div class="rh16-r"><span>Мастер</span><b>9%</b><em>80k</em></div><div class="rh16-r"><span>Профи</span><b>15%</b><em>200k</em></div><small>доля — процент с комиссии, которую платят приглашённые тобой игроки</small></div>'
}
function deco(){var card=document.getElementById('referralLinkCard'),t=document.getElementById('referralPitchTitle')
if(!card||!t||document.getElementById('mxRefDeco'))return
var d=document.createElement('div')
d.id='mxRefDeco'
d.innerHTML=HERO[MM]||''
card.classList.add('rh-card','rh-'+MM)
card.insertBefore(d,card.firstChild)}var AICO={'Модель':'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />','Фон':'<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="4"/>','Узор':'<path d="M4 4l4 4M10 4l10 10M4 10l10 10M16 4l4 4M4 16l4 4"/>','Наличие':'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'}
function aico(l){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(AICO[l]||'')+'</svg>'}function avail(v){var m=String(v).replace(/\s/g,'').match(/(\d+)\/(\d+)/)
return m?{a:+m[1],b:+m[2]}:null}window.buildMarketAttrRowHtml=function(label,value,rarity){var M=KEY.at
if(!value)return''
var r=rarity!=null&&rarity!==''?Number(rarity):null,av=label==='Наличие'?avail(value):null
var fill=r!=null?Math.max(6,Math.min(100,100-r*18)):0
if(M==='2'){if(av)return'<div class="m2-at"><span>'+label+'</span><b>'+av.a.toLocaleString('ru-RU')+' из '+av.b.toLocaleString('ru-RU')+'</b><span class="m2-at-bar"><i style="width:'+(av.a/av.b*100).toFixed(1)+'%"></i></span></div>'
return'<div class="m2-at"><span>'+label+'</span><b>'+esc(value)+'</b>'+(r!=null?'<em>'+r+'%</em><span class="m2-at-bar r"><i style="width:'+fill+'%"></i></span>':'')+'</div>'}if(M==='3'){var c=2*Math.PI*15,off=r!=null?c*(1-Math.min(1,r/5)):c
if(av)return'<div class="m3-at wide"><b>'+av.a.toLocaleString('ru-RU')+'</b><small>из '+av.b.toLocaleString('ru-RU')+' выпущено</small></div>'
return'<div class="m3-at"><span class="m3-ring"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" class="t"/><circle cx="18" cy="18" r="15" class="a" stroke-dasharray="'+c.toFixed(1)+'" stroke-dashoffset="'+off.toFixed(1)+'"/></svg><em>'+(r!=null?r+'%':'')+'</em></span><small>'+label+'</small><b>'+esc(value)+'</b></div>'}
if(M==='4')return'<div class="m4-at"><span class="m4-at-i">'+aico(label)+'</span><span class="m4-at-t"><small>'+label+'</small><b>'+esc(av?av.a.toLocaleString('ru-RU')+' / '+av.b.toLocaleString('ru-RU'):value)+'</b></span>'+(r!=null?'<em>'+r+'%</em>':'')+'</div>'
if(M==='5'){if(av)return'<div class="m5-at av"><span>'+label+'</span><b>'+av.a.toLocaleString('ru-RU')+' / '+av.b.toLocaleString('ru-RU')+'</b><span class="m5-at-bar"><i style="width:'+(av.a/av.b*100).toFixed(1)+'%"></i></span></div>'
return'<div class="m5-at"><span>'+label+'</span><b>'+esc(value)+'</b>'+(r!=null?'<em>редкость '+r+'%</em>':'')+'</div>'}var rr=r!=null?esc(r)+'%':''
return'<div class="v5-attr"><small>'+esc(label)+'</small><b>'+esc(value)+'</b>'+(rr?'<em>'+rr+'</em>':'')+'</div>'}
var WAVE=document.documentElement.getAttribute('data-mix')==='15'
var WT=0
window.mxWave=function(delay){clearTimeout(WT)
var a=document.querySelector('#profileInvChart .mx-wv')
if(!a)return
try{a.endElement()}catch(e){}WT=setTimeout((function(){var b=document.querySelector('#profileInvChart .mx-wv')
try{if(b)b.beginElement()}catch(e){}}),delay||0)}
function axes(){var svg=document.getElementById('profileInvChart')
if(!svg)return
var s=window.__invSeries||[]
if(s.length<2)return
var wrap=svg.parentNode
if(!wrap.classList.contains('mx-chw')){var w=document.createElement('div')
w.className='mx-chw'
svg.parentNode.insertBefore(w,svg)
w.appendChild(svg)
wrap=w}var lo=Math.min.apply(null,s),hi=Math.max.apply(null,s),raw=(hi-lo)/2||1
var mag=Math.pow(10,Math.floor(Math.log10(raw))),step=[1,2,2.5,5,10].map((function(k){return k*mag})).filter((function(k){return k>=raw}))[0]||10*mag
var y0=Math.floor(lo/step)*step,y1=y0+step*2
while(y1<hi){y1+=step}var span=y1-y0||1,n=s.length
function X(i){return i/(n-1)*100}function Y(v){return(y1-v)/span*100}function num(v){return Math.round(v).toLocaleString('ru-RU')}function dd(k){var d=new Date
d.setDate(d.getDate()-(n-1-k))
return k===n-1?'сег.':pad(d.getDate())+'.'+pad(d.getMonth()+1)}var grid=[y1,(y0+y1)/2,y0]
var line=s.map((function(v,i){return(i?'L':'M')+X(i).toFixed(2)+' '+Y(v).toFixed(2)})).join(' ')
var svgH='<defs><linearGradient id="lxg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".32"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs>'+grid.map((function(g){return'<line x1="0" x2="100" y1="'+Y(g).toFixed(2)+'" y2="'+Y(g).toFixed(2)+'" class="mx-gl"/>'
})).join('')+'<path d="'+line+' L100 100 L0 100Z" fill="url(#lxg2)"/>'+(WAVE?'<defs><linearGradient id="lxw" x1="-46" x2="0" y1="0" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="currentColor" stop-opacity="0"/><stop offset=".55" stop-color="currentColor" stop-opacity=".22"/><stop offset=".88" stop-color="currentColor" stop-opacity=".7"/><stop offset=".97" stop-color="#ffffff" stop-opacity=".95"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/><animateTransform class="mx-wv" attributeName="gradientTransform" type="translate" values="0 0;146 0;146 0" keyTimes="0;.45;1" dur="7s" begin="indefinite" repeatCount="indefinite"/></linearGradient><linearGradient id="lxwm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><mask id="lxm" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><path d="'+line+' L100 100 L0 100Z" fill="url(#lxwm)"/></mask></defs><rect class="mx-wave" x="0" y="0" width="100" height="100" fill="url(#lxw)" mask="url(#lxm)"/>':'')+'<path d="'+line+'" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>'
var pts=s.map((function(v,i){return'<i style="left:'+X(i).toFixed(2)+'%;top:'+Y(v).toFixed(2)+'%"><b>'+v.toLocaleString('ru-RU',{minimumFractionDigits:2,maximumFractionDigits:2})+'</b></i>'})).join('')
var cur=s[n-1],yc=Y(cur)
var html='<div class="mx-ax-y">'+grid.map((function(g){return'<span'+(WAVE&&Math.abs(Y(g)-yc)<16?' class="near"':'')+' style="top:'+Y(g).toFixed(2)+'%">'+num(g)+'</span>'})).join('')+(WAVE?'<em class="mx-ax-cur" style="top:'+yc.toFixed(2)+'%">'+cur.toLocaleString('ru-RU',{minimumFractionDigits:cur<1e3?2:0,maximumFractionDigits:cur<1e3?2:0
})+'</em>':'')+'</div><div class="mx-ax-pts">'+pts+'</div><div class="mx-ax-x">'+s.map((function(v,i){return'<span style="left:'+X(i).toFixed(2)+'%">'+dd(i)+'</span>'})).join('')+'</div>'
if(svg.__h!==svgH||svg.innerHTML.indexOf('lxg2')<0){svg.__h=svgH
svg.setAttribute('viewBox','0 0 100 100')
svg.setAttribute('preserveAspectRatio','none')
svg.innerHTML=svgH
if(WAVE)window.mxWave(1400)}var box=wrap.querySelector('.mx-ax')
if(!box){box=document.createElement('div')
box.className='mx-ax'
wrap.appendChild(box)}if(box.__h!==html){box.__h=html
box.innerHTML=html}}document.addEventListener('scroll',(function(e){var t=e.target
if(!t||t===document||!t.classList)return
var y=t.scrollTop||0
document.documentElement.classList.toggle('mx-scrolled',y>8)
document.documentElement.style.setProperty('--mx-sy',Math.min(1,y/80).toFixed(3))}),true)
var _smv=window.setMenuView
if(typeof _smv==='function')window.setMenuView=function(){var r=_smv.apply(this,arguments)
document.documentElement.classList.remove('mx-scrolled')
document.documentElement.style.setProperty('--mx-sy','0')
return r}
function badge(){var n=0
document.querySelectorAll('.lx-chip i').forEach((function(i){n+=Number(i.textContent||0)||0}))
var b=document.getElementById('marketFilterBtn')
if(b)b.setAttribute('data-n',n?String(n):'')}function gthFit(){document.querySelectorAll('.fx-wv').forEach((function(fx){var card=fx.parentNode,orb=card&&card.querySelector('.au-orb')
if(!orb||!card.offsetWidth)return
var cr=card.getBoundingClientRect(),or=orb.getBoundingClientRect(),cx=or.left-cr.left+or.width/2,cy=or.top-cr.top+or.height/2
fx.style.left=cx.toFixed(0)+'px'
fx.style.top=cy.toFixed(0)+'px'}))
document.querySelectorAll('.fx-gth').forEach((function(fx){var card=fx.parentNode,orb=card&&card.querySelector('.au-orb')
if(!orb||!card.offsetWidth)return
var W=card.offsetWidth,H=card.offsetHeight,cr=card.getBoundingClientRect(),or=orb.getBoundingClientRect()
var cx=or.left-cr.left+or.width/2,cy=or.top-cr.top+or.height/2,sig=W+'x'+H+'@'+Math.round(cx)+','+Math.round(cy)
if(fx.__s===sig)return
fx.__s=sig
fx.style.left=cx.toFixed(0)+'px'
fx.style.top=cy.toFixed(0)+'px'
fx.style.right='auto'
fx.querySelectorAll('i').forEach((function(it,n){var x=(n*73+17)%97/96*W-cx,y=(n*41+29)%89/88*H-cy,d=Math.sqrt(x*x+y*y)
if(d<60){var k=60/Math.max(1,d)
x*=k
y*=k}it.style.setProperty('--x',x.toFixed(0)+'px')
it.style.setProperty('--y',y.toFixed(0)+'px')
it.style.setProperty('--r',(Math.atan2(-y,-x)*180/Math.PI).toFixed(0)+'deg')
var R=or.width/2-2,dd=Math.max(1,Math.sqrt(x*x+y*y))
it.style.setProperty('--ex',(x/dd*R).toFixed(1)+'px')
it.style.setProperty('--ey',(y/dd*R).toFixed(1)+'px')}))}))}function loop(){try{deco()}catch(e){}try{axes()}catch(e){}try{badge()}catch(e){}try{gthFit()}catch(e){}}setInterval(loop,800)
setTimeout(loop,1500)})();(function(){var M=document.documentElement.getAttribute('data-mix')
if(!M)return
var MM=M
M={6:'1',7:'1',8:'1',9:'4',10:'4',11:'4',12:'1',13:'1',14:'1',15:'1',16:'1',17:'1'}[M]||M
window.__mxName={1:'Сияние',6:'Аврора',7:'Полночь',8:'Голограмма',4:'Пластилин',9:'Зефир',10:'Мармелад',11:'Конструктор',12:'Сияние · Полки',13:'Сияние · Колода',15:'Аврора · Пульт',16:'Аврора · Биржа'}[MM]
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,(function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]}))}function n2(v){return Number(v||0).toFixed(2)}function G(){return typeof CASE_GRAM_ICON_SVG!=='undefined'?CASE_GRAM_ICON_SVG:''}function gram(v){return'<span class="mx-g"><span class="mx-gi">'+G()+'</span>'+v+'</span>'}function ms(v){
return typeof tsToMs==='function'?tsToMs(v):new Date(v).getTime()}function hm(v){var t=ms(v)
if(!t)return'—'
var d=new Date(t)
return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')}var KEY={rd:{6:'car',7:'2',8:'tl',9:'1',10:'3',11:'5',16:'2'}[MM]||M,tile:{6:'3',7:'5',8:'1',9:'1',10:'3',11:'5',12:'3',13:'5',15:'1',16:'5'}[MM]||M,inv:{6:'3',9:'5',10:'2',12:'3',13:'l',15:'p',16:'1'}[MM]||M}
if(document.documentElement.hasAttribute('data-app')){KEY.tile='3'
KEY.inv='a'}function rounds(){var M=KEY.rd
var box=document.getElementById('mxRounds')
if(!box)return
var all=typeof scannerGridState!=='undefined'&&scannerGridState.recentRounds?scannerGridState.recentRounds:[]
var n={1:4,2:6,3:6,4:4,5:5,car:6,tl:5}[M]||4
var items=all.slice(0,n)
if(!items.length){var e='<div class="mx-rempty">Раундов пока нет</div>'
if(box.__h!==e){box.__h=e
box.innerHTML=e}return}var me=String(getCurrentPlayer().id)
var R=items.map((function(it){var w=getScannerHistoryWinnerMeta(it)
return{w:w,no:it.roundNumber||'—',pc:Number(it.participantCount||0),pot:Number(it.totalPot||it.pot||0),t:hm(it.finishedAt||it.createdAt||it.endedAt),x:formatScannerMultiplier(w.payout||w.stake,w.stake),mine:String(w.id)===me,ava:getScannerPlayerAvatarHtml({name:w.name,avatar:w.avatar})}}))
var h='',on=' onclick="lxAllRounds(event)"'
if(M==='1')h=R.map((function(r){return'<div class="m1r"'+on+'><span class="m1r-ava" style="--c:'+esc(r.w.color)+'">'+r.ava+'</span><span class="m1r-w"><b>'+esc(r.w.name)+(r.mine?' · вы':'')+'</b><small>Раунд № '+esc(r.no)+' · '+r.pc+' игр.</small></span><span class="m1r-v"><b>'+gram(n2(r.w.payout))+'</b><em>'+r.x+'</em></span></div>'})).join('')
else if(M==='2')h='<div class="m2r-h"><span>#</span><span>ПОБЕДИТЕЛЬ</span><span>ВЫПЛАТА</span><span>X</span></div>'+R.map((function(r){
return'<div class="m2r"'+on+'><span class="m2r-no">'+esc(r.no)+'</span><span class="m2r-w"><i style="background:'+esc(r.w.color)+'"></i>'+esc(r.w.name)+(r.mine?' <u>ВЫ</u>':'')+'</span><span class="m2r-p">'+n2(r.w.payout)+'</span><span class="m2r-x">'+r.x+'</span></div>'})).join('')+'<div class="m2r-f"><span>ИТОГО РАУНДОВ</span><b>'+R.length+'</b></div>'
else if(M==='3')h=R.map((function(r,i){return'<div class="m3r'+(i===0?' top':'')+'"'+on+'><span class="m3r-x">'+r.x+'</span><span class="m3r-ava" style="--c:'+esc(r.w.color)+'">'+r.ava+'</span><b>'+esc(r.w.name)+'</b><span class="m3r-p">'+gram(n2(r.w.payout))+'</span><small>№ '+esc(r.no)+' · '+r.pc+' игр.</small></div>'})).join('')
else if(M==='4')h=R.map((function(r,i){return'<div class="m4r c'+i%4+'"'+on+'><span class="m4r-ava" style="--c:'+esc(r.w.color)+'">'+r.ava+'</span><span class="m4r-w"><b>'+esc(r.w.name)+'</b><small>№ '+esc(r.no)+' · '+r.pc+' игр.</small></span><span class="m4r-p">'+gram(n2(r.w.payout))+'<em>'+r.x+'</em></span></div>'})).join('')
else if(M==='car')h=R.map((function(r,i){return'<div class="rc"'+on+'><span class="rc-top"><span class="rc-ava" style="--c:'+esc(r.w.color)+'">'+r.ava+'</span><em>'+r.x+'</em></span><b>'+esc(r.w.name)+(r.mine?' · вы':'')+'</b><span class="rc-p">'+gram(n2(r.w.payout))+'</span><small>№ '+esc(r.no)+' · '+r.pc+' игр.</small></div>'})).join('')
else if(M==='tl')h=R.map((function(r,i){
return'<div class="rt"'+on+'><span class="rt-t">'+esc(r.t)+'</span><span class="rt-dot" style="--c:'+esc(r.w.color)+'"></span><span class="rt-c"><span class="rt-ava">'+r.ava+'</span><span class="rt-w"><b>'+esc(r.w.name)+(r.mine?' · вы':'')+'</b><small>№ '+esc(r.no)+' · '+r.pc+' игр. · '+r.x+'</small></span><span class="rt-p">'+gram(n2(r.w.payout))+'</span></span></div>'})).join('')
else h=R.map((function(r){return'<div class="m5r"'+on+'><span class="m5r-no">'+esc(r.no)+'</span><span class="m5r-w"><i style="background:'+esc(r.w.color)+'"></i>'+esc(r.w.name)+'</span><span class="m5r-p">'+n2(r.w.payout)+'</span><span class="m5r-x">'+r.x+'</span></div>'})).join('')
if(box.__h!==h){box.__h=h
box.innerHTML=h}}var _rs=window.renderScannerRecentList
if(typeof _rs==='function')window.renderScannerRecentList=function(){var r=_rs.apply(this,arguments)
try{rounds()}catch(e){}return r}
var SV=function(p,w){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||2)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>'}
var HEART=SV('<path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 1 1 12 6.1a5 5 0 1 1 7.5 6.5z"/>'),HEART_ON=HEART.replace('fill="none"','fill="currentColor"')
var CART=SV('<path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L21 8H6.2"/><circle cx="9.5" cy="20" r="1.2"/><circle cx="17" cy="20" r="1.2"/>')
var PLUS=SV('<path d="M12 5v14M5 12h14"/>',2.4),CHECK=SV('<path d="M5 12.5l4.5 4.5L19 7.5"/>',2.6)
function nm(it){try{return esc(getGiftDisplayName(it))}catch(e){return esc(it.giftType||it.title||'')}}function bg(it){return it.backdropCenterColor&&it.backdropEdgeColor?'background:radial-gradient(circle at 50% 42%,'+it.backdropCenterColor+' 0%,'+it.backdropEdgeColor+' 100%)':''}function im(it){var u=''
try{u=getGiftImageUrl(it)||''}catch(e){}return u?'<img src="'+u+'" alt="" loading="lazy" onerror="this.setAttribute(\'data-broken\',\'1\')">':''}function fav(id,on){return'<button type="button" class="market-gift-fav-btn mxt-fav'+(on?' is-active':'')+'" aria-label="'+(on?'Убрать из избранного':'В избранное')+'" onclick="toggleMarketGiftFavorite('+id+', event)">'+(on?HEART_ON:HEART)+'</button>'}
function cart(id,on,ico){return'<button type="button" class="market-gift-cart-btn mxt-cart'+(on?' is-active':'')+'" aria-label="'+(on?'Убрать из корзины':'В корзину')+'" onclick="toggleMarketGiftCart('+id+', event)">'+(on?CHECK:ico||CART)+'</button>'}function price(v){return'<span class="mxt-p"><span class="mx-gi">'+G()+'</span>'+n2(v)+'</span>'}window.buildMarketGiftTileHtml=function(it){
var M=KEY.tile
var id=Number(it.listingId),F=typeof marketFavoriteIds!=='undefined'&&marketFavoriteIds.has(it.listingId),C=typeof marketCartIds!=='undefined'&&marketCartIds.has(it.listingId)
var head='<div class="market-gift-tile mxt m'+M+'t k'+MM+'t" data-listing-id="'+id+'" onclick="openMarketGiftDetail('+id+')">',num=esc(it.number),mdl=it.model?esc(it.model):''
var img='<div class="market-gift-tile-inner mxt-img" style="'+bg(it)+'">'+im(it)
if(M==='1')return head+img+fav(id,F)+'</div><div class="mxt-b"><b class="market-gift-name">'+nm(it)+'</b><small>#'+num+'</small></div><div class="mxt-f">'+price(it.price)+cart(id,C,PLUS)+'</div></div>'
if(M==='2')return head+img+fav(id,F)+'<span class="m2t-no"># '+num+'</span></div><div class="m2t-perf"></div><div class="mxt-b"><b class="market-gift-name">'+nm(it)+'</b><small>'+(mdl||'—')+'</small></div><div class="mxt-f">'+price(it.price)+cart(id,C,PLUS)+'</div></div>'
if(M==='3')return head+img+'<span class="m3t-px">'+price(it.price)+'</span>'+fav(id,F)+'<div class="mxt-b"><b class="market-gift-name">'+nm(it)+'</b><small>#'+num+(mdl?' · '+mdl:'')+'</small></div>'+cart(id,C)+'</div></div>'
if(M==='4')return head+img+fav(id,F)+'</div><div class="mxt-b"><b class="market-gift-name">'+nm(it)+'</b><small>#'+num+(mdl?' · '+mdl:'')+'</small></div><div class="mxt-f">'+price(it.price)+cart(id,C,PLUS)+'</div></div>'
return head+img+fav(id,F)+'</div><div class="mxt-b"><span><b class="market-gift-name">'+nm(it)+'</b><small>#'+num+'</small></span>'+price(it.price)+'</div>'+cart(id,C,PLUS)+'</div>'}
window.buildInventoryGiftTileHtml=function(it){var M=KEY.inv
var id=Number(it.id),on=!!it.hasActiveListing,tg='event.stopPropagation(); handleInventoryListToggle('+id+')',p=n2(it.activeListingPrice),num=esc(it.number),mdl=it.model?esc(it.model):''
var head='<div class="market-gift-tile mxi m'+M+'i k'+MM+'i'+(on?' on':'')+'" onclick="openInventoryGiftDetail('+id+')">'
var img='<div class="mxi-img" style="'+bg(it)+'">'+im(it)+'</div>'
var btn=function(a,b){return'<button type="button" class="mxi-btn'+(on?' ghost':'')+'" onclick="'+tg+'">'+(on?b:a)+'</button>'}
var flag=on?'<span class="mxi-flag">'+price(it.activeListingPrice)+'</span>':''
if(M==='1')return head+img+flag+'<div class="mxi-b"><b>'+nm(it)+'</b><small>#'+num+'</small></div>'+btn('Продать','Снять с продажи')+'</div>'
if(M==='l')return head+'<div class="mxi-img" style="'+bg(it)+'">'+im(it)+'<span class="li-no">#'+num+'</span></div><div class="mxi-b"><b>'+nm(it)+'</b><small>'+(mdl||'—')+'</small><em class="'+(on?'on':'off')+'">'+(on?'на продаже · '+p:'не выставлен')+'</em></div>'+btn('Продать','Снять')+'</div>'
if(M==='a')return head+img+(on?'<span class="mai-px">'+price(it.activeListingPrice)+'</span>':'<span class="mai-st">в наличии</span>')+'<div class="mxi-b"><b>'+nm(it)+'</b><small>#'+num+(mdl?' · '+mdl:'')+'</small></div><button type="button" class="mxi-btn mai-btn'+(on?' ghost':'')+'" aria-label="'+(on?'Снять с продажи':'Продать')+'" onclick="'+tg+'">'+(on?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>')+'</button></div>'
if(M==='p')return head+'<div class="mxi-img" style="'+bg(it)+'">'+im(it)+'<span class="pi-st'+(on?' on':'')+'">'+(on?'<i></i>на продаже':'в наличии')+'</span></div><div class="mxi-b"><b>'+nm(it)+'</b><small>#'+num+(mdl?' · '+mdl:'')+'</small>'+(on?'<em>'+price(it.activeListingPrice)+'</em>':'')+'</div>'+btn('Продать','Снять')+'</div>'
if(M==='2')return head+img+'<div class="mxi-b"><small># '+num+(mdl?' · '+mdl:'')+'</small><b>'+nm(it)+'</b>'+(on?'<em>НА ПРОДАЖЕ · '+p+'</em>':'<em class="off">НЕ ВЫСТАВЛЕН</em>')+'</div>'+btn('ПРОДАТЬ','СНЯТЬ')+'</div>'
if(M==='3')return head+img+flag+'<div class="mxi-b"><b>'+nm(it)+'</b><small>#'+num+'</small></div>'+btn('Продать','Снять')+'</div>'
if(M==='4')return head+img+flag+'<div class="mxi-b"><b>'+nm(it)+'</b><small>#'+num+(mdl?' · '+mdl:'')+'</small></div>'+btn('Продать','Снять')+'</div>'
return head+img+'<div class="mxi-b"><b>'+nm(it)+'</b><small>#'+num+(on?' · на продаже '+p:'')+'</small></div>'+btn('Продать →','Снять')+'</div>'}
try{if(typeof refreshMarketViews==='function')setTimeout((function(){try{refreshMarketViews()}catch(e){}}),0)}catch(e){}function prof(){var p=document.getElementById('profileScreen')
var on=!!(p&&p.classList.contains('active'))
document.documentElement.classList.toggle('mx-prof',on)
if(on){var y=p.scrollTop||0
document.documentElement.style.setProperty('--mx-sy',Math.min(1,y/120).toFixed(3))}}document.addEventListener('scroll',(function(e){if(e.target&&e.target.id==='profileScreen')prof()}),true)
function rn(){var e=document.querySelector('[data-m="round"]')
var t=e?String(e.textContent||'').trim():''
document.documentElement.classList.toggle('mx-norn',!t||t==='—')}setInterval((function(){try{rn()}catch(e){}try{rounds()}catch(e){}try{prof()}catch(e){}}),400)
setTimeout((function(){try{rounds()
prof()}catch(e){}}),50)})();(function(){var M=document.documentElement.getAttribute('data-mix')
if(!M)return
var MM=M
M={6:'1',7:'1',8:'1',9:'4',10:'4',11:'4',12:'1',13:'1',14:'1',15:'1',16:'1',17:'1'}[M]||M
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,(function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]}))}function n2(v){return Number(v||0).toFixed(2)}function G(){return typeof CASE_GRAM_ICON_SVG!=='undefined'?CASE_GRAM_ICON_SVG:''}function gram(v,cls){return'<span class="mx-g dz-g'+(cls?' '+cls:'')+'"><span class="mx-gi">'+G()+'</span>'+v+'</span>'}function rnd(n){
return 1+Math.floor(Math.random()*n)}function giftBg(g){return g&&g.backdropCenterColor?'background:radial-gradient(circle at 50% 40%,'+g.backdropCenterColor+','+g.backdropEdgeColor+')':''}function giftImg(g){var u=''
try{u=getGiftImageUrl(g)||''}catch(e){}return u?'<img src="'+u+'" alt="" loading="lazy" onerror="this.style.display=\'none\'">':''}function gtile(g){return'<span class="mx-gt dz-gt" style="'+giftBg(g)+'" title="'+esc(g.giftTitle||g.giftType||'')+'">'+giftImg(g)+'<span class="mx-gt-v"><span class="mx-gi">'+G()+'</span>'+n2(g.value)+'</span></span>'}function me(){try{var p=getCurrentPlayer()
return{id:String(p.id),name:p.name||p.username||'Ты'}}catch(e){return{id:'me',name:'Ты'}}}function ava(name,color){try{return getScannerPlayerAvatarHtml({name:name})}catch(e){return'<span class="scanner-player-avatar" style="background:'+color+'">'+esc(String(name).charAt(0).toUpperCase())+'</span>'}}var FACE={1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]}
function die(v,cls){var h=''
for(var i=0;i<9;i++)h+='<i'+(FACE[v]&&FACE[v].indexOf(i)>=0?' class="on"':'')+'></i>'
return'<span class="dz-die'+(cls?' '+cls:'')+'" data-v="'+v+'">'+h+'</span>'}var LEVELS=[1,5,10,25,50]
var WAIT={1:2,5:3,10:1,25:4,50:2}
window.__mxDiceLv={levels:LEVELS,wait:WAIT}
window.mxDiceAt=function(amt,e){window.mxDiceOpen(e)
setTimeout((function(){try{window.mxDiceLobMode('gram')
window.mxDiceLv(amt)}catch(x){}}),60)}
var BOTS=[['nightowl','#ff5d8f'],['Sasha_V','#ffb547'],['grammaster','#34d17f'],['lucky_bobr','#8b5cf6'],['dice_king','#38bdf8'],['Mira','#f472b6']]
var EMO=['🔥','😂','😱','👏','🎲']
var S=null,T=[],root=null
function later(fn,ms){var t=setTimeout((function(){var k=T.indexOf(t)
if(k>=0)T.splice(k,1)
fn()}),ms)
T.push(t)
return t}function clearT(){T.forEach(clearTimeout)
T=[]
if(S&&S.tick){clearInterval(S.tick)
S.tick=null}}function mount(){if(root)return root
root=document.createElement('div')
root.id='mxDice'
root.className='dz'
root.addEventListener('click',(function(e){e.stopPropagation()}));(document.getElementById('menu')||document.body).appendChild(root)
return root}document.addEventListener('scroll',(function(e){var r=e.target
if(!r||!r.classList||!r.classList.contains('m3p-rail'))return
var w=r.children[0]?r.children[0].offsetWidth:1,k=Math.round(r.scrollLeft/Math.max(1,w))
var d=r.parentNode.querySelectorAll('.m3p-dots i')
d.forEach((function(x,j){x.classList.toggle('on',j===k)}))}),true)
window.mxDiceOpen=function(e){if(e&&e.stopPropagation)e.stopPropagation()
mount()
clearT()
S={view:'lobby',lob:{mode:'gram',amt:5,sel:[]}}
render()
document.documentElement.classList.add('dz-open')
try{setActiveBottomNav('pvp')}catch(x){}requestAnimationFrame((function(){root.classList.add('open')}))}
window.mxDiceClose=function(){if(!root)return
clearT()
S=null
root.classList.remove('open')
document.documentElement.classList.remove('dz-open')}
window.mxDiceBack=function(){if(S&&S.view==='table'){var lob=S.lob
clearT()
S={view:'lobby',lob:lob||{mode:'gram',amt:5,sel:[]}}
render()}else window.mxDiceClose()}
var _nav=window.handleBottomNav
if(typeof _nav==='function')window.handleBottomNav=function(){if(document.documentElement.classList.contains('dz-open'))window.mxDiceClose()
return _nav.apply(this,arguments)}
var _back=window.handleTelegramAppBack
if(typeof _back==='function')window.handleTelegramAppBack=function(){if(document.documentElement.classList.contains('dz-open')){window.mxDiceBack()
return}return _back.apply(this,arguments)}
function render(){if(!root||!S)return
root.innerHTML=S.view==='lobby'?lobby():table()
if(S.view==='table')bindTimer()}function inv(){return typeof INVENTORY_GIFTS!=='undefined'&&INVENTORY_GIFTS?INVENTORY_GIFTS:[]}function gv(g){return Number(g.price||g.activeListingPrice||0)}function lobLevel(){var L=S.lob
if(L.mode==='gram')return L.amt
var t=L.sel.reduce((function(a,k){return a+gv(inv()[k])}),0),lv=0
LEVELS.forEach((function(x){if(t>=x)lv=x}))
return lv}function goLbl(){var L=S.lob,lv=lobLevel()
if(L.mode==='gram')return'Войти в раунд · '+n2(L.amt)+' GRAM'
if(!L.sel.length)return'Выбери подарки для ставки'
if(!lv)return'Нужно подарков минимум на 1 GRAM'
return'Войти в раунд · стол '+lv+' GRAM'}function lobby(){var L=S.lob,lv=lobLevel(),tot=L.sel.reduce((function(a,k){return a+gv(inv()[k])}),0),seated=LEVELS.reduce((function(a,x){return a+WAIT[x]}),0)
var body=L.mode==='gram'?'<div class="dz-lv">'+LEVELS.map((function(x){return'<button type="button" class="dz-lv-b'+(L.amt===x?' on':'')+'" onclick="mxDiceLv('+x+')"><b>'+x+'</b><small>GRAM</small><em>'+(WAIT[x]?'ждут '+WAIT[x]:'пусто')+'</em></button>'})).join('')+'</div>':inv().length?'<div class="dz-sh-gifts">'+inv().map((function(g,k){var on=L.sel.indexOf(k)>=0
return'<button type="button" class="dz-sh-g'+(on?' on':'')+'" onclick="mxDiceSheetGift('+k+')">'+(on?'<i class="dz-sh-ck">✓</i>':'')+gtile(gpack(g,{entry:1}))+'<b>'+esc(g.giftTitle||g.giftType)+'</b><small>#'+esc(g.number)+'</small></button>'
})).join('')+'</div>'+'<div class="dz-sh-sum"><span>выбрано: <b>'+L.sel.length+'</b> · '+gram(n2(tot))+'</span><span>'+(lv?'стол <b>'+lv+' GRAM</b>':'стол подберём по сумме')+'</span></div>':'<div class="market-empty-state">В инвентаре нет подарков</div>'
var can=L.mode==='gram'||lv>0
return'<div class="dz-in l"><div class="dz-head"><button type="button" class="dz-back" onclick="mxDiceBack()" aria-label="Назад">←</button><div class="dz-title mx-gh"><b class="mx-gh-t">Кости 21</b><button type="button" class="mx-q" onclick="mxHelp(\'dice\')" aria-label="Правила Кости 21">?</button></div></div>'+'<div class="dz-lb">'+'<div class="dz-lb-hero"><span class="dz-lb-felt" aria-hidden="true">'+die(6,'a')+die(5,'b')+'<em>21</em></span><span class="dz-lb-live"><i></i>сейчас за столами <b>'+seated+'</b> '+(seated%10===1&&seated!==11?'игрок':'игроков')+'</span>'+'<span class="dz-lb-steps"><span><i>1</i>Выбери ставку</span><span><i>2</i>Садишься на случайное место</span><span><i>3</i>Ближе к 21 — забираешь банк</span></span></div>'+'<div class="dz-lb-st"><div class="dz-lb-h"><b>Ставка</b><small>все за столом ставят одинаково</small></div><div class="dz-sh-tabs"><button type="button" class="'+(L.mode==='gram'?'on':'')+'" onclick="mxDiceLobMode(\'gram\')">GRAM</button><button type="button" class="'+(L.mode==='gift'?'on':'')+'" onclick="mxDiceLobMode(\'gift\')">Подарки</button></div>'+body+'</div>'+'<button type="button" class="dz-btn dz-main dz-go" '+(can?'onclick="mxDiceGo()"':'disabled')+'>'+goLbl()+'</button>'+'<p class="dz-lb-note">Место за столом выбирается случайно · раунд начинается, когда за столом 2+ игрока</p></div></div>'
}window.mxDiceLv=function(x){S.lob.amt=x
render()}
window.mxDiceLobMode=function(m){S.lob.mode=m
render()}
window.mxDiceGo=function(){clearT()
var lob=S.lob,entry=lobLevel()
if(!entry)return
var r={entry:entry,name:'Стол · '+entry+' GRAM',theme:entry>=25?'high':'lite'}
var seats=[null,null,null,null,null,null],free=[0,1,2,3,4,5].sort((function(){return Math.random()-.5}))
var bots=BOTS.slice().sort((function(){return Math.random()-.5})),nb=Math.max(1,Math.min(4,WAIT[entry]||2))
for(var b=0;b<nb;b++)seats[free[b]]=bot(bots[b],r,b===0?'many':b===2?'one':'')
var mi=free[nb],m=me(),stake
if(lob.mode==='gift')stake={gram:0,gifts:lob.sel.map((function(k){return gpack(inv()[k],r)}))}
else stake={gram:entry,gifts:[]}
seats[mi]={id:m.id,name:m.name,color:'#34d6ff',me:true,dice:[],sum:0,st:'ready',stake:stake}
var hist=[]
for(var hh=0;hh<5;hh++){var bb=BOTS[(hh*2+entry)%BOTS.length]
hist.push({name:bb[0],color:bb[1],sum:17+rnd(5)-1,pot:entry*(2+rnd(4))*.95})}S={view:'table',room:r,lob:lob,me:mi,seats:seats,phase:'gather',turn:-1,timer:0,bots:bots.slice(nb),emo:{},msg:'Ждём игроков…',hist:hist,cd:6,justSat:true}
render()
S.tick=setInterval((function(){S.cd--
S.justSat=false
if(S.cd===3){var f=S.seats.indexOf(null)
if(f>=0&&S.bots.length){S.seats[f]=bot(S.bots.shift(),r)}}if(S.cd<=0){clearInterval(S.tick)
S.tick=null
deal()
return}render()}),1e3)}
function gpack(g,r){return{giftTitle:g.giftTitle,giftType:g.giftType,number:g.number,value:Number(g.price||g.activeListingPrice||r.entry),backdropCenterColor:g.backdropCenterColor,backdropEdgeColor:g.backdropEdgeColor}}function pool(){var a=[]
try{if(typeof MARKET_LISTINGS!=='undefined'&&MARKET_LISTINGS)a=a.concat(MARKET_LISTINGS)}catch(e){}try{if(typeof INVENTORY_GIFTS!=='undefined'&&INVENTORY_GIFTS)a=a.concat(INVENTORY_GIFTS)}catch(e){}return a.filter((function(g){return g&&(g.giftTitle||g.giftType)}))}function bot(b,r,kind){var P0=pool(),P=P0.filter((function(g){var v=Number(g.price||g.activeListingPrice||0)
return v>0&&v<=r.entry*12})),st={gram:r.entry,gifts:[]}
if(P.length<3)P=P0
if(P.length&&kind){var n=kind==='many'?4+rnd(3):1,pick=P.slice().sort((function(){return Math.random()-.5})).slice(0,n)
st={gram:0,gifts:pick.map((function(g){return gpack(g,r)}))}
var tot=st.gifts.reduce((function(a,g){return a+g.value}),0)
if(tot<r.entry)st.gram=Math.ceil((r.entry-tot)*100)/100}return{id:'b'+b[0],name:b[0],color:b[1],bot:true,dice:[],sum:0,st:'ready',stake:st}}function stakeVal(st){return(st.gram||0)+(st.gifts||[]).reduce((function(a,g){return a+g.value}),0)}function stakeMini(st){var g=st.gifts||[]
if(!g.length)return gram(n2(st.gram))
return'<span class="dz-gs">'+gtile(g[0])+(g.length>1?'<em>+'+(g.length-1)+'</em>':'')+'</span>'}function bank(){var gr=0,gifts=[]
S.seats.forEach((function(s){if(!s)return
if(s.stake.gram)gr+=s.stake.gram;(s.stake.gifts||[]).forEach((function(g){gifts.push(g)}))}))
return{gram:gr,gifts:gifts,total:gr+gifts.reduce((function(a,g){return a+g.value}),0)}}function seatHtml(s,i){if(!s)return'<div class="dz-seat empty p'+i+'"><span class="dz-free">свободно</span></div>'
var B=S.phase==='result'?bank():null,nw=S.win?S.win.length:1
var flag={turn:'ходит',stand:'хватит',bust:'перебор',b21:'21!',win:'победа'}[s.st]||''
if(s.st==='win'&&B)flag='победа · +'+n2(B.gram/nw*.95)
var bar=Math.min(100,s.sum/21*100)
return'<div class="dz-seat p'+i+' s-'+s.st+(s.me?' me':'')+(S.turn===i?' turn':'')+(S.justSat&&s.me?' sat':'')+'" style="--c:'+s.color+';--t:'+(bar/100).toFixed(3)+'" onclick="mxDicePlayer('+i+')" role="button" tabindex="0">'+(S.emo[i]?'<span class="dz-emo">'+S.emo[i]+'</span>':'')+(flag?'<span class="dz-flag">'+flag+'</span>':'')+'<span class="dz-ava">'+ava(s.name,s.color)+'</span>'+'<b class="dz-nm">'+esc(s.me?'Ты':s.name)+'</b><span class="dz-stake">'+stakeMini(s.stake)+'</span>'+'<span class="dz-sum">'+(s.dice.length?s.sum:'—')+'</span>'+'<span class="dz-to21"><i style="width:'+bar.toFixed(0)+'%"></i></span></div>'
}function table(){var r=S.room,B=bank(),cur=S.turn>=0?S.seats[S.turn]:null
var tray=cur&&cur.dice.length?cur.dice.map((function(v,k){return die(v,k>=cur.dice.length-(S.lastN||0)&&S.rolling?'roll':'')})).join(''):S.phase==='result'?'':'<span class="dz-wait">'+esc(S.msg||'')+'</span>'
var ctrl=''
if(S.phase==='gather')ctrl='<div class="dz-info">'+(S.justSat?'Ты за столом — место №'+(S.me+1)+' · ':'')+'старт через <b class="dz-cd">'+Math.max(0,S.cd||0)+'</b> с</div>'
else if(S.phase==='play'&&S.turn===S.me&&!S.rolling&&!S.dealing)ctrl='<div class="dz-acts"><button type="button" class="dz-btn dz-main" onclick="mxDiceHit(1)">'+die(rnd(6),'xs')+'Ещё кубик</button><button type="button" class="dz-btn dz-risk" onclick="mxDiceHit(2)">Риск: 2 кубика</button><button type="button" class="dz-btn dz-ghost" onclick="mxDiceStand()">Хватит</button></div><div class="dz-tm"><i style="--t:'+S.timer+'"></i><span>'+S.timer+' с на ход</span></div>'
else if(S.phase==='play')ctrl='<div class="dz-info">'+(cur?'Ходит <b>'+esc(cur.me?'ты':cur.name)+'</b>':'Раздача…')+'</div>'
else if(S.phase==='result')ctrl='<div class="dz-acts"><button type="button" class="dz-btn dz-main" onclick="mxDiceAgain()">Сыграть ещё</button><button type="button" class="dz-btn dz-ghost" onclick="mxDiceBack()">Сменить ставку</button></div>'
return'<div class="dz-in t"><div class="dz-head"><button type="button" class="dz-back" onclick="mxDiceBack()" aria-label="Назад">←</button><div class="dz-title"><span class="mx-gh"><b class="mx-gh-t">'+r.name+'</b><button type="button" class="mx-q" onclick="mxHelp(\'dice\')" aria-label="Правила Кости 21">?</button></span><small>ставка '+n2(r.entry)+' GRAM · твоё место №'+(S.me+1)+'</small></div></div>'+'<div class="dz-table t-'+r.theme+'"><div class="dz-felt">'+(S.turn>=0?'<i class="dz-ptr" style="--a:'+{
0:-150,1:-90,2:-30,4:30,3:90,5:150
}[S.turn]+'deg"></i>':'')+'<span class="dz-felt-logo">'+('21 · '+r.entry+' GRAM')+'</span><div class="dz-pot"><small>банк</small>'+gram(n2(B.gram))+(B.gifts.length?'<span class="dz-pg">'+B.gifts.slice(0,3).map(gtile).join('')+(B.gifts.length>3?'<span class="mx-more-g"><b>+'+(B.gifts.length-3)+'</b></span>':'')+'</span>':'')+'</div>'+'<div class="dz-tray">'+tray+'</div>'+(cur&&cur.dice.length?'<div class="dz-cur">'+esc(cur.me?'Твоя сумма':cur.name)+': <b>'+cur.sum+'</b>'+(cur.sum>21?' — перебор':cur.sum===21?' — очко!':'')+'</div>':'')+'</div>'+S.seats.map(seatHtml).join('')+'</div>'+'<div class="dz-ctrl">'+ctrl+'</div>'+'<div class="dz-emos">'+EMO.map((function(x){
return'<button type="button" onclick="mxDiceEmo(\''+x+'\')">'+x+'</button>'})).join('')+'</div>'+'<div class="dz-hist"><small>История стола</small><div class="dz-hist-r">'+S.hist.map((function(h){return'<span class="dz-hi"><span class="dz-hi-a">'+ava(h.name,h.color)+'</span><b>'+esc(h.name)+'</b><em>'+h.sum+'</em>'+gram('+'+n2(h.pot))+'</span>'
})).join('')+'</div></div>'+(S.phase==='result'&&!S.resHide?resultHtml():'')+(S.info!=null?infoHtml():'')+'</div>'}window.mxDiceSheetGift=function(k){var a=S.lob.sel,j=a.indexOf(k)
if(j>=0)a.splice(j,1)
else a.push(k)
var lb=document.querySelector('#mxDice .dz-lb')
if(!lb){render()
return}lb.querySelectorAll('.dz-sh-g').forEach((function(b,i){var on=a.indexOf(i)>=0
b.classList.toggle('on',on)
var ck=b.querySelector('.dz-sh-ck')
if(on&&!ck)b.insertAdjacentHTML('afterbegin','<i class="dz-sh-ck">✓</i>')
if(!on&&ck)ck.remove()}))
var tot=a.reduce((function(x,i){return x+gv(inv()[i])}),0),lv=lobLevel()
var sum=lb.querySelector('.dz-sh-sum')
if(sum)sum.innerHTML='<span>выбрано: <b>'+a.length+'</b> · '+gram(n2(tot))+'</span><span>'+(lv?'стол <b>'+lv+' GRAM</b>':'стол подберём по сумме')+'</span>'
var btn=lb.querySelector('.dz-go')
if(btn){btn.disabled=!lv
if(lv)btn.setAttribute('onclick','mxDiceGo()')
else btn.removeAttribute('onclick')
btn.textContent=goLbl()}}
function order(){var o=[];[0,1,2,4,3,5].forEach((function(i){if(S.seats[i])o.push(i)}))
return o}function deal(){S.phase='play'
S.msg='Раздача…'
S.dealing=true
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
roll(s,2,(function(){if(s.sum===21)s.st='b21'
later(next,450)}))})()}function roll(s,n,done){S.rolling=true
S.lastN=n
var mv=[]
for(var j=0;j<n;j++){var v=rnd(6)
s.dice.push(v)
mv.push(v)}(s.moves=s.moves||[]).push(mv)
s.sum=s.dice.reduce((function(a,b){return a+b}),0)
render()
later((function(){S.rolling=false
render()
done()}),700)}function turn(){if(!S||!S.q)return
var i=S.q.shift()
if(i==null)return finish()
var s=S.seats[i]
if(s.st==='b21'||s.st==='bust')return turn()
S.turn=i
s.st='turn'
S.timer=15
render()
if(s.bot)return later((function(){botMove(s)}),900)}function after(s){if(s.sum>21){s.st='bust'
render()
return later(turn,700)}if(s.sum===21){s.st='b21'
render()
return later(turn,700)}s.st='turn'
S.timer=15
render()
if(s.bot)later((function(){botMove(s)}),800)}function botMove(s){if(S.phase!=='play')return
var risk=s.sum<=9,hit=s.sum<16||s.sum<18&&Math.random()<.3
if(Math.random()<.12)emo(S.turn,EMO[rnd(EMO.length)-1])
if(!hit){s.st='stand'
render()
return later(turn,600)}roll(s,risk?2:1,(function(){after(s)}))}window.mxDiceHit=function(n){var s=S&&S.seats[S.me]
if(!s||S.turn!==S.me||S.rolling||S.dealing)return
roll(s,n,(function(){after(s)}))}
window.mxDiceStand=function(){var s=S&&S.seats[S.me]
if(!s||S.turn!==S.me||S.dealing||s.st!=='turn')return
s.st='stand'
render()
later(turn,400)}
function bindTimer(){if(S.phase!=='play'||S.turn!==S.me||S.timerOn||S.dealing)return
S.timerOn=true
var iv=setInterval((function(){if(!S||S.phase!=='play'||S.turn!==S.me){clearInterval(iv)
if(S)S.timerOn=false
return}if(S.rolling)return
S.timer--
var el=root.querySelector('.dz-tm')
if(el){el.querySelector('i').style.setProperty('--t',S.timer)
el.querySelector('span').textContent=S.timer+' с на ход'}if(S.timer<=0){clearInterval(iv)
S.timerOn=false
window.mxDiceStand()}}),1e3)}function finish(){S.turn=-1
S.phase='result'
var best=-1
S.seats.forEach((function(s){if(s&&s.sum<=21&&s.sum>best)best=s.sum}))
var win=[]
S.seats.forEach((function(s,i){if(s){if(s.sum===best&&best>0){s.st='win'
win.push(i)}else s.st=s.sum>21?'bust':'lose'}}))
S.win=win
render()
try{if(window.mxDiceRecord)window.mxDiceRecord(S,bank())}catch(e){}}function resultHtml(){var B=bank(),w=S.win.map((function(i){return S.seats[i]})),mine=w.some((function(s){return s.me}))
var share=w.length?B.gram/w.length*.95:0
return'<div class="dz-res'+(mine?' me':'')+'" onclick="if(event.target===this)mxDiceResHide()"><div class="dz-res-c">'+(mine?'<div class="dz-conf">'+Array(18).join('<i></i>')+'</div>':'')+'<small>'+(w.length>1?'ничья — банк делится':w.length?'победитель':'все перебрали')+'</small>'+'<div class="dz-res-w">'+w.map((function(s){
return'<span>'+ava(s.name,s.color)+'<b>'+esc(s.me?'Ты':s.name)+'</b><em>'+s.sum+'</em></span>'
})).join('')+'</div>'+(w.length?'<div class="dz-res-p"><small>'+(mine?'ты забираешь':'забирает')+'</small>'+gram(n2(share),'big')+(B.gifts.length&&w.length===1?'<span class="dz-pg">'+B.gifts.map(gtile).join('')+'</span>':'')+'</div>':'<div class="dz-res-p"><small>ставки возвращены</small></div>')+'<div class="dz-acts"><button type="button" class="dz-btn dz-main" onclick="mxDiceAgain()">Сыграть ещё</button><button type="button" class="dz-btn dz-ghost" onclick="mxDiceBack()">Сменить ставку</button></div></div></div>'
}window.mxDiceResHide=function(){if(S){S.resHide=true
render()}}
window.mxDicePlayer=function(i){if(!S||!S.seats[i])return
S.info=i
render()}
window.mxDiceInfoClose=function(){if(S){S.info=null
render()}}
function infoHtml(){var s=S.seats[S.info]
if(!s)return''
var st={ready:'готов к игре',wait:'ждёт хода',turn:'сейчас ходит',stand:'остановился',bust:'перебор',b21:'ровно 21',win:'победил',lose:'проиграл'}[s.st]||''
var run=0,moves=(s.moves||[]).map((function(m,k){run+=m.reduce((function(a,b){return a+b}),0)
return'<div class="dz-mv"><span class="dz-mv-n">'+(k===0?'раздача':'ход '+k)+'</span><span class="dz-mv-d">'+m.map((function(v){return die(v,'sm')})).join('')+'</span><b>'+(k===0?'':'+')+m.reduce((function(a,b){return a+b}),0)+'</b><em>'+run+'</em></div>'})).join('')
var gl=s.stake.gifts||[],tv=stakeVal(s.stake)
return'<div class="dz-sheet" onclick="if(event.target===this)mxDiceInfoClose()"><div class="dz-sh dz-info-sh"><div class="dz-sh-h"><span class="dz-ip"><span class="dz-ip-a" style="--c:'+s.color+'">'+ava(s.name,s.color)+'</span><span><b>'+esc(s.me?'Ты':s.name)+'</b><small>'+st+'</small></span></span><button type="button" onclick="mxDiceInfoClose()" aria-label="Закрыть">✕</button></div>'+'<div class="dz-is"><div class="dz-is-sum"><small>сумма</small><b>'+(s.dice.length?s.sum:'—')+'</b><span class="dz-to21"><i style="width:'+Math.min(100,s.sum/21*100).toFixed(0)+'%"></i></span><small>'+(s.dice.length?s.sum>21?'перебор на '+(s.sum-21):'до 21 осталось '+(21-s.sum):'ещё не бросал')+'</small></div>'+(gl.length?'':'<div class="dz-is-st"><small>ставка</small>'+gram(n2(s.stake.gram),'big')+'</div>')+'</div>'+(gl.length?'<div class="dz-is-gl"><div class="dz-is-glh"><small>ставка</small><b>'+gl.length+' '+(gl.length===1?'подарок':gl.length<5?'подарка':'подарков')+(s.stake.gram?' + '+n2(s.stake.gram)+' GRAM':'')+'</b>'+gram(n2(tv))+'</div><div class="dz-is-strip">'+gl.map((function(g){
return'<span class="dz-is-gi">'+gtile(g)+'<b>'+esc(g.giftTitle||g.giftType)+'</b><small>#'+esc(g.number)+'</small><em>'+n2(g.value)+'</em></span>'})).join('')+'</div></div>':'')+'<div class="dz-mvs"><small>броски</small>'+(moves||'<div class="dz-wait">Броски появятся после раздачи</div>')+'</div></div></div>'}window.mxDiceAgain=function(){var lob=S.lob
clearT()
S={view:'lobby',lob:lob}
window.mxDiceGo()}
function emo(i,x){S.emo[i]=x
render()
later((function(){if(S){delete S.emo[i]
render()}}),1800)}window.mxDiceEmo=function(x){if(!S||S.view!=='table')return
var i=S.me
if(i==null||!S.seats[i])return
emo(i,x)}})();(function(){if(!document.documentElement.hasAttribute('data-mix'))return
function hx(el){for(var e=el;e&&e!==document.body;e=e.parentElement){if(e.scrollWidth>e.clientWidth+4){var o=getComputedStyle(e).overflowX
if(o==='auto'||o==='scroll')return e}}return null}var drag=null
document.addEventListener('pointerdown',(function(ev){if(ev.pointerType!=='mouse'||ev.button!==0)return
var el=hx(ev.target)
if(!el)return
drag={el:el,x:ev.clientX,left:el.scrollLeft,moved:false,snap:el.style.scrollSnapType,vx:0,lx:ev.clientX,lt:performance.now()}
ev.preventDefault()}),true)
document.addEventListener('pointermove',(function(ev){if(!drag)return
var dx=ev.clientX-drag.x
if(!drag.moved&&Math.abs(dx)>6){drag.moved=true
drag.el.style.scrollSnapType='none'
drag.el.style.scrollBehavior='auto'
drag.el.classList.add('mx-dragging')}if(drag.moved){drag.el.scrollLeft=drag.left-dx
ev.preventDefault()
var now=performance.now(),dt=Math.max(1,now-drag.lt)
drag.vx=.7*drag.vx+.3*((ev.clientX-drag.lx)/dt)
drag.lx=ev.clientX
drag.lt=now}}),true)
function end(ev){if(!drag)return
var d=drag
drag=null
if(!d.moved)return
d.el.classList.remove('mx-dragging')
var el=d.el,dx=(ev&&ev.clientX!=null?ev.clientX:d.x)-d.x
var kids=[].slice.call(el.children).filter((function(c){return c.offsetWidth>0}))
var base=el.getBoundingClientRect().left+(parseFloat(getComputedStyle(el).paddingLeft)||0)
var pos=kids.map((function(c){return c.getBoundingClientRect().left-base+el.scrollLeft}))
var aim=el.scrollLeft-d.vx*260,to=0
pos.forEach((function(x,i){if(Math.abs(x-aim)<Math.abs(pos[to]-aim))to=i}))
if(to===kids.findIndex((function(c,i){return Math.abs(pos[i]-d.left)<4}))&&Math.abs(dx)>30)to=Math.max(0,Math.min(kids.length-1,to+(dx<0?1:-1)))
var target=Math.max(0,Math.min(el.scrollWidth-el.clientWidth,pos[to]!=null?pos[to]:el.scrollLeft))
el.scrollTo({left:target,behavior:'smooth'})
setTimeout((function(){el.style.scrollSnapType=d.snap||''}),450)
var stop=function(e){e.stopPropagation()
e.preventDefault()
document.removeEventListener('click',stop,true)}
document.addEventListener('click',stop,true)
setTimeout((function(){document.removeEventListener('click',stop,true)}),60)}document.addEventListener('pointerup',end,true)
document.addEventListener('pointercancel',end,true)
document.addEventListener('wheel',(function(ev){if(Math.abs(ev.deltaX)>Math.abs(ev.deltaY))return
var el=hx(ev.target)
if(!el)return
var max=el.scrollWidth-el.clientWidth
if(ev.deltaY>0&&el.scrollLeft>=max-1||ev.deltaY<0&&el.scrollLeft<=0)return
el.scrollLeft+=ev.deltaY
ev.preventDefault()}),{passive:false,capture:true})
var tch=null
function cards(el){var kids=[].slice.call(el.children).filter((function(c){return c.offsetWidth>0}))
var base=el.getBoundingClientRect().left+(parseFloat(getComputedStyle(el).paddingLeft)||0)
return{kids:kids,pos:kids.map((function(c){return c.getBoundingClientRect().left-base+el.scrollLeft}))}}document.addEventListener('touchstart',(function(ev){if(ev.touches.length!==1){tch=null
return}var el=hx(ev.target)
if(!el){tch=null
return}var C=cards(el),cur=0
C.pos.forEach((function(x,i){if(Math.abs(x-el.scrollLeft)<Math.abs(C.pos[cur]-el.scrollLeft))cur=i}))
tch={el:el,x:ev.touches[0].clientX,y:ev.touches[0].clientY,cur:cur,t:Date.now()}}),{passive:true,capture:true})
document.addEventListener('touchend',(function(ev){if(!tch)return
var d=tch
tch=null
var t=ev.changedTouches[0]
if(!t)return
var dx=t.clientX-d.x,dy=t.clientY-d.y
if(Math.abs(dx)<24||Math.abs(dx)<Math.abs(dy))return
var el=d.el,C=cards(el)
if(C.kids.length<2)return
var to=Math.max(0,Math.min(C.kids.length-1,d.cur+(dx<0?1:-1)))
var target=Math.max(0,Math.min(el.scrollWidth-el.clientWidth,C.pos[to]))
var snap=el.style.scrollSnapType
el.style.scrollSnapType='none'
requestAnimationFrame((function(){el.scrollTo({left:target,behavior:'smooth'})}))
setTimeout((function(){el.style.scrollSnapType=snap||''}),520)}),{passive:true,capture:true})
document.addEventListener('dragstart',(function(ev){if(hx(ev.target))ev.preventDefault()}),true)
var SEL='.m1-rail, .m2-car, .mx-car, .m4-grid, .dz-rooms, .au-games, #mxRounds, .pm-rail, .mx-rc, .rc-wrap'
function step(el,dir){var kids=[].slice.call(el.children).filter((function(c){return c.offsetWidth>0}))
if(!kids.length)return
var base=el.getBoundingClientRect().left+(parseFloat(getComputedStyle(el).paddingLeft)||0)
var pos=kids.map((function(c){return c.getBoundingClientRect().left-base+el.scrollLeft}))
var cur=0
pos.forEach((function(x,i){if(Math.abs(x-el.scrollLeft)<Math.abs(pos[cur]-el.scrollLeft))cur=i}))
var to=Math.max(0,Math.min(kids.length-1,cur+dir))
el.scrollTo({left:Math.max(0,Math.min(el.scrollWidth-el.clientWidth,pos[to])),behavior:'smooth'})}function sync(el){var n=el.__nav
if(!n)return
var max=el.scrollWidth-el.clientWidth
n.children[0].disabled=el.scrollLeft<=2
n.children[1].disabled=el.scrollLeft>=max-2
n.style.display=max>8?'':'none'}function arrows(){document.querySelectorAll(SEL).forEach((function(el){if(!el.offsetParent)return
var ox=getComputedStyle(el).overflowX
if(ox!=='auto'&&ox!=='scroll')return
if(!el.__nav||!el.__nav.isConnected){var n=document.createElement('div')
n.className='mx-cnav'
n.innerHTML='<button type="button" aria-label="Назад">‹</button><button type="button" aria-label="Дальше">›</button>'
n.children[0].addEventListener('click',(function(e){e.stopPropagation()
step(el,-1)}))
n.children[1].addEventListener('click',(function(e){e.stopPropagation()
step(el,1)}))
el.parentNode.insertBefore(n,el.nextSibling)
el.__nav=n
el.addEventListener('scroll',(function(){sync(el)}),{passive:true})}sync(el)}))}document.querySelectorAll('.mx-cnav').forEach((function(n){n.remove()}))})();(function(){if(!document.documentElement.hasAttribute('data-mix'))return
var RM=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches
function css(n,d){var v=getComputedStyle(document.documentElement).getPropertyValue(n).trim()
return v||d}function rgba(hex,a){var h=hex.replace('#','')
if(h.length===3)h=h.replace(/./g,'$&$&')
var n=parseInt(h,16)
return'rgba('+(n>>16&255)+','+(n>>8&255)+','+(n&255)+','+a+')'}function zones(N,w){var own=new Int8Array(N*N).fill(-1),q=w.map((function(x){return Math.round(x*N*N)}))
q[0]+=N*N-q.reduce((function(a,b){return a+b}),0)
var seeds=w.map((function(){return[Math.floor(Math.random()*N),Math.floor(Math.random()*N)]}))
var fr=seeds.map((function(s,k){var i=s[1]*N+s[0]
if(own[i]<0)own[i]=k
return[i]})),cnt=w.map((function(){return 1}))
var left=N*N-seeds.length,guard=0
while(left>0&&guard++<N*N*8){for(var k=0;k<w.length;k++){if(cnt[k]>=q[k]&&left>0)continue
var f=fr[k],grew=false
for(var t=0;t<6&&f.length;t++){var j=Math.floor(Math.random()*f.length),i=f[j],x=i%N,y=i/N|0
var nb=[[x+1,y],[x-1,y],[x,y+1],[x,y-1]].filter((function(p){return p[0]>=0&&p[1]>=0&&p[0]<N&&p[1]<N&&own[p[1]*N+p[0]]<0}))
if(!nb.length){f.splice(j,1)
continue}var p=nb[Math.floor(Math.random()*nb.length)],ii=p[1]*N+p[0]
own[ii]=k
f.push(ii)
cnt[k]++
left--
grew=true
break}if(!grew&&!f.length){for(var z=0;z<N*N;z++)if(own[z]===k)f.push(z)
if(!f.length)cnt[k]=q[k]}}}for(var r=0;r<N*N;r++)if(own[r]<0)own[r]=0
return own}function Mini(cv){this.cv=cv
this.g=cv.getContext('2d')
this.N=18
this.reset()
this.vis=true}Mini.prototype.reset=function(){var w=[.36,.27,.21,.16].map((function(x){return x*(.8+Math.random()*.4)})),s=w.reduce((function(a,b){return a+b}),0)
this.w=w.map((function(x){return x/s}))
this.own=zones(this.N,this.w)
var a=Math.random()*Math.PI*2
this.p={x:.5,y:.5,vx:Math.cos(a)*.9,vy:Math.sin(a)*.9}
this.trail=[]
this.t0=performance.now()
this.stopAt=0
this.win=-1}
Mini.prototype.size=function(){var r=this.cv.getBoundingClientRect(),d=Math.min(2,window.devicePixelRatio||1)
var W=Math.max(40,Math.round(r.width*d)),H=Math.max(40,Math.round(r.height*d))
if(this.cv.width!==W||this.cv.height!==H){this.cv.width=W
this.cv.height=H}return[W,H,d]}
Mini.prototype.step=function(now){var el=(now-this.t0)/1e3,run=3.6
if(el<run){var dt=1/60,sp=Math.max(.05,1-el/run),p=this.p
p.x+=p.vx*dt*sp
p.y+=p.vy*dt*sp
if(p.x<.02){p.x=.02
p.vx=Math.abs(p.vx)}if(p.x>.98){p.x=.98
p.vx=-Math.abs(p.vx)}if(p.y<.02){p.y=.02
p.vy=Math.abs(p.vy)}if(p.y>.98){p.y=.98
p.vy=-Math.abs(p.vy)}this.trail.push([p.x,p.y])
if(this.trail.length>46)this.trail.shift()}else if(this.win<0){var N=this.N
this.win=this.own[Math.min(N-1,Math.floor(this.p.y*N))*N+Math.min(N-1,Math.floor(this.p.x*N))]
this.stopAt=now}else if(now-this.stopAt>2200)this.reset()}
Mini.prototype.draw=function(now){var S=this.size(),W=S[0],H=S[1],d=S[2],g=this.g,N=this.N
var side=Math.max(W,H),ox=(W-side)/2,oy=(H-side)/2,c=side/N
var bg=css('--am-bg','#0d1030'),grid=css('--am-grid','rgba(255,255,255,.08)'),las=css('--am-laser','#7dd3fc')
var cols=[css('--am-c1','#34d6ff'),css('--am-c2','#ff5d8f'),css('--am-c3','#ffb547'),css('--am-c4','#34d17f')]
var rr=parseFloat(css('--am-r','0'))||0,ga=parseFloat(css('--am-a','.5'))||.5
g.clearRect(0,0,W,H)
g.fillStyle=bg
g.fillRect(0,0,W,H)
var pulse=this.win>=0?.5+.5*Math.sin((now-this.stopAt)/140):0
for(var y=0;y<N;y++)for(var x=0;x<N;x++){var k=this.own[y*N+x],a=ga*(this.win<0?1:k===this.win?1.25+pulse*.5:.35)
g.fillStyle=rgba(cols[k],Math.min(1,a))
if(rr>0){var pd=c*.08
g.beginPath()
g.roundRect(ox+x*c+pd,oy+y*c+pd,c-pd*2,c-pd*2,c*rr)
g.fill()}else g.fillRect(ox+x*c,oy+y*c,c+.5,c+.5)}g.strokeStyle='rgba(255,255,255,.55)'
g.lineWidth=Math.max(1,d*1.2)
g.beginPath()
for(y=0;y<N;y++)for(x=0;x<N;x++){var o=this.own[y*N+x]
if(x<N-1&&this.own[y*N+x+1]!==o){g.moveTo(ox+(x+1)*c,oy+y*c)
g.lineTo(ox+(x+1)*c,oy+(y+1)*c)}if(y<N-1&&this.own[(y+1)*N+x]!==o){g.moveTo(ox+x*c,oy+(y+1)*c)
g.lineTo(ox+(x+1)*c,oy+(y+1)*c)}}g.stroke()
if(!rr){g.strokeStyle=grid
g.lineWidth=1
g.beginPath()
for(var i=1;i<N;i++){g.moveTo(ox+i*c,0)
g.lineTo(ox+i*c,H)
g.moveTo(0,oy+i*c)
g.lineTo(W,oy+i*c)}g.stroke()}var tr=this.trail
if(tr.length>1){g.lineCap='round'
g.lineJoin='round'
for(var j=1;j<tr.length;j++){g.strokeStyle=rgba(las.charAt(0)==='#'?las:'#7dd3fc',j/tr.length*.9)
g.lineWidth=d*(1+2.2*j/tr.length)
g.beginPath()
g.moveTo(ox+tr[j-1][0]*side,oy+tr[j-1][1]*side)
g.lineTo(ox+tr[j][0]*side,oy+tr[j][1]*side)
g.stroke()}}var hx=ox+this.p.x*side,hy=oy+this.p.y*side
g.save()
g.shadowColor=las
g.shadowBlur=14*d
g.fillStyle='#fff'
g.beginPath()
g.arc(hx,hy,3.6*d,0,Math.PI*2)
g.fill()
g.restore()
if(this.win>=0){g.strokeStyle='#fff'
g.lineWidth=2*d
g.beginPath()
g.arc(hx,hy,(8+pulse*6)*d,0,Math.PI*2)
g.stroke()}}
var minis=[]
function scan(){document.querySelectorAll('canvas[data-amini]').forEach((function(cv){if(!cv.__m){cv.__m=new Mini(cv)
minis.push(cv.__m)
if(io)io.observe(cv)}}))}var io=window.IntersectionObserver?new IntersectionObserver((function(es){es.forEach((function(e){if(e.target.__m)e.target.__m.vis=e.isIntersecting}))})):null
function loop(now){if(!document.hidden)minis.forEach((function(m){if(!m.vis||!m.cv.offsetParent)return
if(RM){if(!m.drawn){for(var i=0;i<150;i++)m.step(m.t0+i*16)
m.draw(m.t0+4e3)
m.drawn=true}return}m.step(now)
m.draw(now)}))
requestAnimationFrame(loop)}scan()
setInterval(scan,1500)
requestAnimationFrame(loop)
var _live=window.shouldRenderScannerCanvasLive
if(typeof _live==='function')window.shouldRenderScannerCanvasLive=function(){return _live.apply(this,arguments)||typeof currentMenuView!=='undefined'&&currentMenuView==='pvpSelect'&&!document.hidden}
function slot(){var shell=document.getElementById('scannerHomeCanvasShell')
if(!shell)return
var vis=[].slice.call(document.querySelectorAll('.mx-arena-slot')).filter((function(s){return s.offsetParent}))[0]
if(vis&&shell.parentNode!==vis){vis.appendChild(shell)
try{window.dispatchEvent(new Event('resize'))}catch(e){}}}setInterval(slot,400)
slot()
var KIND={buy:'Покупка',sell:'Продажа',withdraw:'Вывод в Telegram',deposit:'Добавлен в маркет'}
function n2(v){return Number(v||0).toFixed(2)}function full(t){var d=new Date(t)
if(isNaN(d))return'—'
function p(x){return(x<10?'0':'')+x}return p(d.getDate())+'.'+p(d.getMonth()+1)+'.'+d.getFullYear()+', '+p(d.getHours())+':'+p(d.getMinutes())}window.mxTxOpen=function(key){var it=(window.__mxTx||{})[key]
if(!it)return
var item={id:-1,giftType:it.giftType||it.giftSlug,giftTitle:it.giftTitle,number:it.number,model:it.model,modelRarity:it.modelRarity,backdrop:it.backdrop,backdropRarity:it.backdropRarity,pattern:it.pattern,patternRarity:it.patternRarity,backdropCenterColor:it.backdropCenterColor,backdropEdgeColor:it.backdropEdgeColor,availability:it.availability||null,hasActiveListing:false,
price:Number(it.price||0)}
var orig=window.renderInventoryDetailActions
window.renderInventoryDetailActions=function(){}
try{renderGiftDetailModal(item,'history')}catch(e){console.warn(e)}window.renderInventoryDetailActions=orig
var pb=document.getElementById('marketGiftDetailPriceBadge')
if(pb){if(it.price!=null){pb.style.display=''
pb.textContent=n2(it.price)+' GRAM'}else pb.style.display='none'}var row=function(l,v,c){return'<div class="mx-deal-r'+(c?' '+c:'')+'"><span>'+l+'</span><b>'+v+'</b></div>'}
var pct=1.5
try{pct=Number(MARKET_BUYER_FEE_PERCENT)||1.5}catch(e){}var amt=''
if(it.price!=null){var fee=it.fee!=null?Number(it.fee):Math.round(it.price*pct)/100
if(it.kind==='buy')amt=row('Цена подарка',n2(it.price)+' GRAM')+row('Комиссия маркета '+(it.feePercent||pct)+'%',n2(fee)+' GRAM')+row('Списано всего','−'+n2(it.price+fee)+' GRAM','out')
else if(it.kind==='sell')amt=row('Цена продажи',n2(it.price)+' GRAM')+row('Комиссия маркета','платит покупатель')+row('Получено','+'+n2(it.price)+' GRAM','in')
else if(it.kind==='withdraw')amt=row('Плата за вывод','−'+n2(it.price)+' GRAM','out')
else amt=row('Сумма',n2(it.price)+' GRAM')}var act=document.getElementById('marketGiftDetailActions')
if(act)act.innerHTML='<div class="mx-deal"><div class="mx-deal-h"><small>сделка</small><b>'+(KIND[it.kind]||it.kind||'Сделка')+'</b></div>'+amt+row('Дата и время',full(it.at))+'</div>'
if(pb&&it.kind!=='buy'&&it.kind!=='sell')pb.style.display='none'}})();(function(){if(!document.documentElement.hasAttribute('data-mix'))return
var HELP={scan:{t:'Как играть в Сканер',
s:[['Сделай ставку','Ставь GRAM или свои подарки. Можно добавлять ставку, пока идёт набор игроков.'],['Поле делится по ставкам','Арена делится между игроками: чем больше твоя ставка в банке, тем больше твоя зона и тем выше шанс.'],['Зоны перемешиваются','Перед стартом зоны игроков перестраиваются по всему полю.'],['Летит лазер','Лазер стартует, отражается от бортов и замедляется до полной остановки.'],['Победитель забирает банк','Чья зона окажется под точкой остановки — тот забирает банк раунда.']]
},dice:{t:'Как играть в Кости 21',
s:[['Войди в раунд','Выбери ставку в GRAM или подарками (можно несколько) и нажми «Войти в раунд» — место за столом достанется случайное, все за столом ставят одинаково.'],['Раздача','Когда игроки собрались, каждый получает 2 кубика.'],['Твой ход','«Ещё кубик» — добрать один, «Риск: 2 кубика» — сразу два, «Хватит» — остановиться. На ход 15 секунд.'],['Не перебери','Больше 21 — перебор, ты выбываешь из раунда.'],['Банк ближайшему к 21','Кто ближе всех к 21, забирает весь банк стола. Если у нескольких одинаково — банк делится.']]
}}
window.__mxHELP=HELP
window.mxHelp=function(k){var h=HELP[k]
if(!h)return
var old=document.getElementById('mxHelp')
if(old)old.remove()
var el=document.createElement('div')
el.id='mxHelp'
el.className='mx-help'
el.innerHTML='<div class="mx-help-c" role="dialog" aria-modal="true" aria-label="'+h.t+'"><div class="mx-help-h"><b>'+h.t+'</b><button type="button" class="mx-help-x" aria-label="Закрыть">✕</button></div><ol class="mx-help-l">'+h.s.map((function(x,i){return'<li><i>'+(i+1)+'</i><span><b>'+x[0]+'</b><small>'+x[1]+'</small></span></li>'
})).join('')+'</ol><button type="button" class="mx-help-ok">Понятно</button></div>'
el.addEventListener('click',(function(e){if(e.target===el||e.target.closest('.mx-help-x, .mx-help-ok'))el.remove()}))
document.body.appendChild(el)}})()
window.mxDemoRound=function(btn){var s=window.__demoSrv
if(!s)return
var r=s.demoRound()
if(!r.ok){try{showTopToast(r.error)}catch(e){}return}try{showTopToast('Боты заходят в раунд — можешь поставить тоже')}catch(e){}}
setInterval((function(){var s=window.__demoSrv
if(!s)return
var st=s.getStatus(),busy=st!=='idle'&&st!=='countdown'&&st!=='waiting'
document.querySelectorAll('.mx-demo').forEach((function(b){b.disabled=busy
b.textContent=busy?'Идёт раунд…':'▶ Демо-раунд'}))}),500);(function(){if(!document.documentElement.hasAttribute('data-mix'))return
function norm(v){return String(v||'').toLowerCase().replace(/[’ʼ`]/g,"'").trim()}function name(it){try{return getGiftDisplayName(it)}catch(e){return it.giftTitle||it.giftType||''}}function hit(it,q){if(!q)return true
return norm(name(it)).indexOf(q)>=0||String(it.number||'').indexOf(q.replace('#',''))===0}var mq=''
var _amf=window.applyMarketFilter
if(typeof _amf==='function')window.applyMarketFilter=function(list){return _amf(list).filter((function(it){return hit(it,mq)}))}
function sub(kind){var grid=document.getElementById(kind==='fav'?'marketFavoritesGrid':'marketCartGrid')
var empty=document.getElementById(kind==='fav'?'marketFavoritesEmpty':'marketCartEmpty')
if(!grid||!empty)return
var ids=kind==='fav'?marketFavoriteIds:marketCartIds
var all=MARKET_LISTINGS.filter((function(it){return ids.has(it.listingId)}))
var list=sortMarketGiftsList(window.applyMarketFilter(all))
grid.style.display=list.length?'grid':'none'
empty.style.display=list.length?'none':'flex'
var e=empty.querySelector('.mx-nf')
if(!e){e=document.createElement('div')
e.className='mx-nf'
empty.appendChild(e)}e.textContent=all.length&&!list.length?'Ничего не найдено — измени поиск или фильтр':''
empty.classList.toggle('mx-empty-nf',!!(all.length&&!list.length))
grid.innerHTML=list.map((function(it){return buildMarketGiftTileHtml(it,kind)})).join('')
list.forEach((function(it){try{ensureMarketGiftAnim(it,kind)}catch(x){}}))}window.renderMarketFavorites=function(){sub('fav')}
window.renderMarketCart=function(){sub('cart')}
var _tvm=window.toggleMarketViewMode
if(typeof _tvm==='function')window.toggleMarketViewMode=function(e){var r=_tvm.apply(this,arguments);['marketFavoritesGrid','marketCartGrid'].forEach((function(id){var g=document.getElementById(id)
if(g){g.classList.toggle('market-gifts-list',marketViewMode==='list')
g.style.gridTemplateColumns=marketViewMode==='list'?'1fr':'repeat(auto-fill, minmax(150px, 1fr))'}}))
return r}
var _rmg=window.renderMarketGifts
if(typeof _rmg==='function')window.renderMarketGifts=function(){var r=_rmg.apply(this,arguments)
try{sub('fav')
sub('cart')}catch(e){}return r}
function moveBar(){var main=document.getElementById('marketMainView'),bar=main&&main.querySelector('.market-toolbar')
if(bar&&main.parentNode){bar.classList.add('mx-mbar')
main.parentNode.insertBefore(bar,main)}var inp=document.getElementById('marketSearchInput')
if(inp&&!inp.__mx){inp.__mx=1
inp.addEventListener('input',(function(){mq=norm(inp.value)
try{refreshMarketViews()}catch(e){window.renderMarketGifts()}}))}}var IV={q:'',sort:'new',col:'',view:'grid'}
var SORTS=[['new','Сначала новые'],['price-desc','Сначала дорогие'],['price-asc','Сначала дешёвые'],['name','По названию']]
function price(it){return Number(it.price||it.activeListingPrice||it.floorPrice||0)}var _rig=window.renderInventoryGifts
if(typeof _rig==='function')window.renderInventoryGifts=function(){var grid=document.getElementById('inventoryGiftsGrid'),empty=document.getElementById('inventoryGiftsEmpty')
if(!grid||!empty)return _rig.apply(this,arguments)
var all=INVENTORY_GIFTS.slice()
var list=all.filter((function(it){return hit(it,IV.q)&&(!IV.col||norm(name(it))===norm(IV.col))&&(!window.__mxInvSale||it.hasActiveListing)}))
if(IV.sort==='price-desc')list.sort((function(a,b){return price(b)-price(a)}))
if(IV.sort==='price-asc')list.sort((function(a,b){return price(a)-price(b)}))
if(IV.sort==='name')list.sort((function(a,b){return name(a).localeCompare(name(b),'ru')}))
grid.style.display=list.length?'grid':'none'
empty.style.display=all.length?'none':'flex'
try{updateTopAddGiftBtn()}catch(e){}grid.classList.toggle('mx-inv-list',IV.view==='list')
grid.classList.toggle('mx-inv-bento',IV.view==='bento')
grid.innerHTML=list.map(buildInventoryGiftTileHtml).join('')
if(IV.view==='bento')bento(grid,list.length)
else if(grid.style.gridAutoRows)grid.style.gridAutoRows=''
var nf=document.getElementById('mxInvNf')
if(nf)nf.style.display=all.length&&!list.length?'block':'none'
list.forEach((function(it){try{ensureInventoryGiftAnim(it)}catch(e){}}))
syncInvBar()}
var APP=document.documentElement.hasAttribute('data-app')
function bento(grid,n){var plan=typeof window.mxBentoPlan==='function'?window.mxBentoPlan(n):[];[].forEach.call(grid.children,(function(t,k){var c=plan[k]||'sm'
t.classList.add('ib','ib-'+(c==='bigr'?'big':c))
if(c==='bigr')t.classList.add('ib-bigr')}))
fitB(grid)}function fitB(grid){var W=grid.clientWidth
if(!W)return
var gap=parseFloat(getComputedStyle(grid).columnGap)||8
grid.style.gridAutoRows=Math.floor((W-gap*2)/3)+'px'}window.addEventListener('resize',(function(){var g=document.getElementById('inventoryGiftsGrid')
if(g&&g.classList.contains('mx-inv-bento'))fitB(g)}))
var ICO={bento:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="11" height="11" rx="2.5"/><rect x="16.5" y="3" width="4.5" height="4.5" rx="1.5"/><rect x="16.5" y="9.5" width="4.5" height="4.5" rx="1.5"/><rect x="3" y="16.5" width="4.5" height="4.5" rx="1.5"/><rect x="9.5" y="16.5" width="11.5" height="4.5" rx="1.5"/></svg>',
search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',filter:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 5h16l-6 8v5l-4 2v-7z"/></svg>',
sort:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4v16M3 8l4-4 4 4M17 20V4M13 16l4 4 4-4"/></svg>',
grid:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/></svg>',
list:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>'}
function invBar(){var view=document.getElementById('inventoryGiftsView')
if(!view||document.getElementById('mxInvBar'))return
var bar=document.createElement('div')
bar.id='mxInvBar'
bar.className='market-toolbar mx-mbar mx-invbar'
bar.innerHTML='<div class="market-search-shell"><span class="market-search-icon" aria-hidden="true">'+ICO.search+'</span><input id="mxInvSearch" class="market-search-input" type="text" autocomplete="off" placeholder="Поиск в моих подарках" aria-label="Поиск в моих подарках"></div>'+'<button type="button" id="mxInvFilter" class="market-tool-btn" aria-label="Фильтр по коллекции">'+ICO.filter+'</button>'+'<button type="button" id="mxInvSort" class="market-tool-btn" aria-label="Сортировка">'+ICO.sort+'</button>'+'<button type="button" id="mxInvView" class="market-tool-btn" aria-label="Плитки или строки">'+ICO.list+'</button>'
view.insertBefore(bar,view.firstChild)
var nf=document.createElement('div')
nf.id='mxInvNf'
nf.className='mx-nf'
nf.style.display='none'
nf.textContent='Ничего не найдено — измени поиск или фильтр'
view.insertBefore(nf,document.getElementById('inventoryGiftsGrid'))
document.getElementById('mxInvSearch').addEventListener('input',(function(e){IV.q=norm(e.target.value)
window.renderInventoryGifts()}))
document.getElementById('mxInvView').addEventListener('click',(function(){IV.view=APP?{grid:'bento',bento:'list',list:'grid'}[IV.view]||'grid':IV.view==='grid'?'list':'grid'
window.renderInventoryGifts()}))
document.getElementById('mxInvSort').addEventListener('click',(function(e){menu(e.currentTarget,SORTS.map((function(s){return[s[0],s[1],IV.sort===s[0]]})),(function(v){IV.sort=v
window.renderInventoryGifts()}))}))
document.getElementById('mxInvFilter').addEventListener('click',(function(e){var cols=[]
INVENTORY_GIFTS.forEach((function(it){var n=name(it)
if(cols.indexOf(n)<0)cols.push(n)}))
menu(e.currentTarget,[['','Все коллекции',!IV.col]].concat(cols.sort().map((function(c){return[c,c,IV.col===c]}))),(function(v){IV.col=v
window.renderInventoryGifts()}))}))}function syncInvBar(){var v=document.getElementById('mxInvView')
if(v){var h=APP?{grid:ICO.grid,bento:ICO.bento,list:ICO.list}[IV.view]:IV.view==='grid'?ICO.list:ICO.grid
if(v.__h!==h){v.__h=h
v.innerHTML=h}}var f=document.getElementById('mxInvFilter')
if(f)f.classList.toggle('on',!!IV.col)
var s=document.getElementById('mxInvSort')
if(s)s.classList.toggle('on',IV.sort!=='new')}function menu(anchor,items,pick){var old=document.getElementById('mxPop')
if(old){old.remove()
if(old.__a===anchor)return}var m=document.createElement('div')
m.id='mxPop'
m.className='mx-pop'
m.__a=anchor
m.innerHTML=items.map((function(it){return'<button type="button" data-v="'+String(it[0]).replace(/"/g,'&quot;')+'" class="'+(it[2]?'on':'')+'"><span>'+it[1]+'</span>'+(it[2]?'<i>✓</i>':'')+'</button>'})).join('')
document.body.appendChild(m)
var r=anchor.getBoundingClientRect()
m.style.top=Math.round(r.bottom+8)+'px'
m.style.right=Math.max(10,Math.round(window.innerWidth-r.right))+'px'
m.addEventListener('click',(function(e){var b=e.target.closest('button')
if(!b)return
m.remove()
pick(b.getAttribute('data-v'))}))
setTimeout((function(){document.addEventListener('click',(function off(e){if(!m.contains(e.target)&&e.target!==anchor){m.remove()
document.removeEventListener('click',off,true)}}),true)}),0)}function stick(){var el=document.getElementById('marketScreen'),bar=document.querySelector('#marketScreen .market-toolbar.mx-mbar')
if(!el||!bar)return
var top=el.getBoundingClientRect().top+(parseFloat(getComputedStyle(el).paddingTop)||0)
bar.classList.toggle('is-stuck',el.scrollTop>0&&bar.getBoundingClientRect().top<=top+.5)}document.addEventListener('scroll',(function(e){if(e.target&&e.target.id==='marketScreen')stick()}),true)
function init(){try{moveBar()}catch(e){}try{invBar()
syncInvBar()}catch(e){}}init()
setInterval(init,1500)})();(function(){var MM=document.documentElement.getAttribute('data-mix')
if(!MM)return
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,(function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]}))}function n2(v){return Number(v||0).toFixed(2)}function G(){return typeof CASE_GRAM_ICON_SVG!=='undefined'?CASE_GRAM_ICON_SVG:''}function gram(v,cls){return'<span class="mx-g'+(cls?' '+cls:'')+'"><span class="mx-gi">'+G()+'</span>'+v+'</span>'}function fee(){try{
return Number(MARKET_BUYER_FEE_PERCENT)||0}catch(e){return 0}}function withFee(p){return Math.round(Number(p)*(1+fee()/100)*100)/100}function plural(n,a,b,c){n=Math.abs(n)%100
var d=n%10
if(n>10&&n<20)return c
if(d>1&&d<5)return b
if(d===1)return a
return c}function gifts(n){return n+' '+plural(n,'подарок','подарка','подарков')}function gname(it){try{return getGiftDisplayName(it)}catch(e){return it.giftTitle||it.giftType||'Подарок'}}function gimg(it){try{return buildGiftImageHtml(it)}catch(e){return''}}var AMT={1:'pct',6:'slide',12:'pct',13:'pm',15:'slide',16:'pct'}[MM]||'pct'
var _oas=window.openAmountSheet
if(typeof _oas==='function')window.openAmountSheet=function(title,ph,ct){var p=_oas.apply(this,arguments)
try{amtExtras(String(title||''))}catch(e){console.warn(e)}return p}
function amtBase(isOffer){try{if(isOffer){var it=MARKET_LISTINGS.find((function(g){return g.listingId===marketDetailListingId}))
return it?{price:Number(it.price),it:it}:null}var inv=(typeof INVENTORY_GIFTS!=='undefined'?INVENTORY_GIFTS:[]).find((function(g){return g.id===inventoryDetailGiftId}))
if(!inv)return null
var same=MARKET_LISTINGS.filter((function(g){return g.giftType===inv.giftType})).map((function(g){return Number(g.price)}))
return{price:same.length?Math.min.apply(null,same):Number(inv.price||0),it:inv,floor:!!same.length}}catch(e){return null}}function amtExtras(title){var ov=document.getElementById('amountSheetOverlay'),inp=document.getElementById('amountSheetInput')
if(!ov||!inp)return
ov.classList.add('mx-amt','amt-'+AMT)
var row=inp.parentNode
row.classList.add('mx-amt-row')
var old=document.getElementById('mxAmtX')
if(old)old.remove()
var isOffer=/оффер|offer/i.test(title),B=amtBase(isOffer),base=B&&B.price>0?B.price:0
ov.classList.toggle('is-offer',isOffer)
var box=document.createElement('div')
box.id='mxAmtX'
box.className='mx-amt-x'
var head=B&&base?'<div class="mx-amt-ref"><span class="mx-amt-gi">'+gimg(B.it)+'</span><span><b>'+esc(gname(B.it))+' #'+esc(B.it.number)+'</b><small>'+(isOffer?'цена продавца':B.floor?'сейчас на маркете от':'оценка')+' '+n2(base)+' GRAM</small></span></div>':''
var ctl=''
if(AMT==='pct'&&base){var P=isOffer?[-30,-20,-10,-5]:[-5,0,10,25]
ctl='<div class="mx-amt-chips">'+P.map((function(k){return'<button type="button" data-v="'+(base*(1+k/100)).toFixed(2)+'"><b>'+(k?(k>0?'+':'−')+Math.abs(k)+'%':'как у всех')+'</b><small>'+n2(base*(1+k/100))+'</small></button>'})).join('')+'</div>'}else if(AMT==='slide'&&base){var lo=isOffer?.5:.7,hi=isOffer?1:1.5
ctl='<div class="mx-amt-sl"><input type="range" min="'+(base*lo).toFixed(2)+'" max="'+(base*hi).toFixed(2)+'" step="0.01" value="'+(base*(isOffer?.9:1)).toFixed(2)+'" aria-label="Сумма"><div class="mx-amt-sl-l"><span>'+n2(base*lo)+'</span><span>'+(isOffer?'цена '+n2(base):n2(base*hi))+'</span></div></div>'}else{var st=base>=100?10:base>=10?1:.5
row.insertAdjacentHTML('afterbegin','<button type="button" class="mx-amt-pm m" data-d="-'+st+'" aria-label="Меньше на '+st+'">−</button>')
row.insertAdjacentHTML('beforeend','<button type="button" class="mx-amt-pm p" data-d="'+st+'" aria-label="Больше на '+st+'">+</button>')
if(base)ctl='<div class="mx-amt-hint">шаг '+st+' GRAM · можно ввести любую сумму</div>'}var sum='<div class="mx-amt-sum"></div>'
box.innerHTML=head+ctl+sum
row.parentNode.insertBefore(box,row.nextSibling)
if(head)row.parentNode.insertBefore(box.querySelector('.mx-amt-ref'),row)
if(AMT==='slide'&&base){var r=box.querySelector('input[type=range]')
inp.value=r.value
r.addEventListener('input',(function(){inp.value=r.value
upd()}))}function upd(){var v=Number(inp.value)||0,s=box.querySelector('.mx-amt-sum')
if(!s)return
box.querySelectorAll('.mx-amt-chips button').forEach((function(b){b.classList.toggle('on',Math.abs(Number(b.getAttribute('data-v'))-v)<.005)}))
var rg=box.querySelector('input[type=range]')
if(rg&&document.activeElement!==rg&&v){rg.value=v}if(rg)rg.style.setProperty('--p',((Number(rg.value)-rg.min)/Math.max(.01,rg.max-rg.min)*100).toFixed(1)+'%')
if(!v){s.innerHTML='<span>'+(isOffer?'Введи сумму — продавец увидит её в своих офферах':'Введи цену продажи')+'</span>'
return}if(isOffer){var diff=base?Math.round((v/base-1)*100):0
s.innerHTML='<span>Если продавец примет, спишется <b>'+n2(withFee(v))+' GRAM</b><small>'+n2(v)+' + комиссия маркета '+fee()+'%'+(base&&diff?' · '+(diff<0?'−':'+')+Math.abs(diff)+'% к цене':'')+'</small></span>'}else s.innerHTML='<span>Ты получишь <b>'+n2(v)+' GRAM</b><small>комиссию маркета платит покупатель сверху</small></span>'}box.addEventListener('click',(function(e){
var b=e.target.closest('.mx-amt-chips button')
if(!b)return
inp.value=b.getAttribute('data-v')
upd()}))
row.querySelectorAll('.mx-amt-pm').forEach((function(b){b.addEventListener('click',(function(){var v=Math.max(0,(Number(inp.value)||(base?base:0))+Number(b.getAttribute('data-d')))
inp.value=v.toFixed(2)
upd()}))}))
if(!inp.__mxa){inp.__mxa=1
inp.addEventListener('input',(function(){var u=inp.__upd
if(u)u()}))}inp.__upd=upd
upd()}document.addEventListener('transitionend',(function(e){if(e.target&&e.target.id==='amountSheetOverlay'&&!e.target.classList.contains('open')){e.target.querySelectorAll('.mx-amt-pm, .mx-amt-ref').forEach((function(b){b.remove()}))}}),true)
window.mxAmtCleanup=function(){var ov=document.getElementById('amountSheetOverlay')
if(ov)ov.querySelectorAll('.mx-amt-pm, .mx-amt-ref').forEach((function(b){b.remove()}))}
if(typeof _oas==='function'){var _o2=window.openAmountSheet
window.openAmountSheet=function(){window.mxAmtCleanup()
return _o2.apply(this,arguments)}}window.renderMarketOfferForm=function(showForm){var el=document.getElementById('marketGiftDetailActions')
if(!el)return
var it=MARKET_LISTINGS.find((function(g){return g.listingId===marketDetailListingId}))
if(!it)return
el.classList.add('mx-buyrow-wrap')
el.innerHTML='<div class="mx-buyrow"><button type="button" class="mx-buy" onclick="handleMarketGiftBuy()"><span>Купить</span><b>'+n2(withFee(it.price))+' GRAM</b></button>'+'<button type="button" class="mx-offer" onclick="handleMarketOfferButtonClick()"><span>Оффер</span><small>своя цена</small></button></div>'+'<div class="mx-buynote">'+n2(it.price)+' + комиссия маркета '+fee()+'%</div>'}
var SEL=null
function cartList(){return MARKET_LISTINGS.filter((function(it){return marketCartIds.has(it.listingId)}))}function isSel(id){return SEL===null||SEL.has(id)}window.mxCartPick=function(id,e){if(e){e.stopPropagation()
e.preventDefault()}if(SEL===null)SEL=new Set(cartList().map((function(it){return it.listingId})))
if(SEL.has(id))SEL.delete(id)
else SEL.add(id)
paintCart()}
window.mxCartAll=function(){var all=cartList()
var allOn=all.every((function(it){return isSel(it.listingId)}))
SEL=allOn?new Set:null
paintCart()}
function summary(kind){var list=kind==='cart'?cartList():MARKET_LISTINGS.filter((function(it){return marketFavoriteIds.has(it.listingId)}))
var host=document.getElementById(kind==='cart'?'marketCartView':'marketFavoritesView')||(document.getElementById(kind==='cart'?'marketCartGrid':'marketFavoritesGrid')||{}).parentNode
if(!host)return
var box=document.getElementById(kind==='cart'?'mxCartSum':'mxFavSum')
if(!list.length){if(box)box.remove()
return}var grid=document.getElementById(kind==='cart'?'marketCartGrid':'marketFavoritesGrid')
if(!box){box=document.createElement('div')
box.id=kind==='cart'?'mxCartSum':'mxFavSum'
box.className='mx-bag '+(kind==='cart'?'is-cart':'is-fav')
grid.parentNode.insertBefore(box,grid)}var tot=list.reduce((function(a,it){return a+Number(it.price)}),0)
if(kind==='fav'){var notIn=list.filter((function(it){return!marketCartIds.has(it.listingId)})).length
box.innerHTML='<div class="mx-bag-t"><span><small>В избранном '+gifts(list.length)+'</small><b>'+gram(n2(tot))+'</b></span><em>общая стоимость</em></div>'+'<button type="button" class="mx-bag-btn" '+(notIn?'onclick="mxFavToCart()"':'disabled')+'>'+(notIn?'Всё в корзину · '+notIn:'Всё уже в корзине')+'</button>'
return}var sel=list.filter((function(it){return isSel(it.listingId)})),st=sel.reduce((function(a,it){return a+Number(it.price)}),0),f=Math.round(st*fee())/100
var allOn=sel.length===list.length
box.innerHTML='<div class="mx-bag-t"><span><small>В корзине '+gifts(list.length)+'</small><b>'+gram(n2(tot))+'</b></span><button type="button" class="mx-bag-all'+(allOn?' on':'')+'" onclick="mxCartAll()"><i>'+(allOn?'✓':'')+'</i>'+(allOn?'Выбраны все':'Выбрать все')+'</button></div>'+'<div class="mx-bag-l"><span>Выбрано</span><b>'+sel.length+' из '+list.length+'</b></span></div>'+'<div class="mx-bag-l"><span>Подарки</span><b>'+n2(st)+' GRAM</b></div>'+'<div class="mx-bag-l"><span>Комиссия маркета '+fee()+'%</span><b>'+n2(f)+' GRAM</b></div>'+'<button type="button" class="mx-bag-btn" '+(sel.length?'onclick="mxCartBuy()"':'disabled')+'>'+(sel.length?(allOn?'Купить всё':'Купить выбранные')+' · '+n2(st+f)+' GRAM':'Отметь подарки для покупки')+'</button>'
}window.mxFavToCart=function(){MARKET_LISTINGS.forEach((function(it){if(marketFavoriteIds.has(it.listingId))marketCartIds.add(it.listingId)}))
try{refreshMarketViews()}catch(e){}try{showTopToast('Избранное добавлено в корзину')}catch(e){}}
function paintCart(){var grid=document.getElementById('marketCartGrid')
if(!grid)return
grid.querySelectorAll('.market-gift-tile').forEach((function(t){var id=Number(t.getAttribute('data-listing-id'))
if(!id)return
var b=t.querySelector('.mx-pick')
if(!b){b=document.createElement('button')
b.type='button'
b.className='mx-pick'
b.setAttribute('aria-label','Выбрать для покупки')
b.setAttribute('onclick','mxCartPick('+id+', event)')
t.appendChild(b)}var on=isSel(id)
t.classList.toggle('mx-picked',on)
t.classList.toggle('mx-unpicked',!on)
b.innerHTML=on?'✓':''}))
summary('cart')}window.mxCartBuy=function(){var list=cartList().filter((function(it){return isSel(it.listingId)}))
if(!list.length)return
var btn=document.querySelector('#mxCartSum .mx-bag-btn')
if(btn){btn.disabled=true
btn.textContent='Покупаем…'}var ok=0,errs=[],i=0;(function next(){if(i>=list.length){list.forEach((function(it){if(!errs.some((function(e){return e.id===it.listingId})))marketCartIds.delete(it.listingId)}))
SEL=null
try{showAppNotice(ok?'Куплено '+gifts(ok)+(errs.length?' · не удалось: '+errs.length+' ('+errs[0].msg+')':''):errs[0]?errs[0].msg:'Не удалось купить')}catch(e){}try{fetchMarketListings()}catch(e){}try{fetchInventoryGifts()}catch(e){}return}var it=list[i++]
_socket.emit('market:buy',{listingId:it.listingId},(function(res){if(res&&res.ok)ok++
else errs.push({id:it.listingId,msg:res&&res.error||'ошибка'})
next()}))})()}
var _rmc=window.renderMarketCart,_rmf=window.renderMarketFavorites
if(typeof _rmc==='function')window.renderMarketCart=function(){var r=_rmc.apply(this,arguments)
try{paintCart()}catch(e){}return r}
if(typeof _rmf==='function')window.renderMarketFavorites=function(){var r=_rmf.apply(this,arguments)
try{summary('fav')}catch(e){}return r}
var ST={pending:'ждёт ответа',accepted:'принят',declined:'отклонён',cancelled:'отменён',expired:'истёк'}
function left(o){var ttl=72*36e5,t=(o.createdAt||Date.now())+ttl-Date.now()
if(t<=0)return'истекает'
var h=Math.floor(t/36e5)
return h>=24?'ещё '+Math.floor(h/24)+' д '+h%24+' ч':'ещё '+Math.max(1,h)+' ч'}function listPrice(o){if(o.listPrice)return Number(o.listPrice)
try{var it=MARKET_LISTINGS.find((function(g){return g.listingId===o.listingId}))
return it?Number(it.price):0}catch(e){return 0}}window.buildOfferRowHtml=function(o,role,isHistory){var lp=listPrice(o),d=lp?Math.round((o.price/lp-1)*100):null,dir=isHistory?o.direction==='sent'?'ты предложил':'тебе предложили':role==='sent'?'ты предложил':'тебе предлагают'
var acts=''
if(!isHistory&&o.status==='pending')acts=role==='sent'?'<button type="button" class="mx-of-b ghost" onclick="handleOfferCancel('+o.id+')">Отменить</button>':'<button type="button" class="mx-of-b main" onclick="handleOfferAccept('+o.id+')">Принять · +'+n2(o.price)+'</button><button type="button" class="mx-of-b ghost" onclick="handleOfferDecline('+o.id+')">Отклонить</button>'
return'<div class="mx-of '+(isHistory?o.direction||role:role)+' st-'+o.status+(isHistory?' hist':'')+'">'+'<span class="mx-of-g">'+gimg(o)+'</span>'+'<span class="mx-of-m"><b>'+esc(gname(o))+' <i>#'+esc(o.number)+'</i></b><small>'+dir+(o.buyerName&&role!=='sent'?' · '+esc(o.buyerName):'')+'</small></span>'+'<span class="mx-of-p">'+gram(n2(o.price))+(lp?'<small>цена '+n2(lp)+(d?' · <em class="'+(d<0?'dn':'up')+'">'+(d<0?'−':'+')+Math.abs(d)+'%</em>':'')+'</small>':'')+'</span>'+'<span class="mx-of-s"><span class="mx-of-st">'+(ST[o.status]||o.status)+'</span>'+(!isHistory&&o.status==='pending'?'<span class="mx-of-tl">'+left(o)+'</span>':'')+'</span>'+(acts?'<span class="mx-of-a">'+acts+'</span>':'')+'</div>'
}
function badges(){try{var r=(typeof INVENTORY_RECEIVED_OFFERS!=='undefined'?INVENTORY_RECEIVED_OFFERS:[]).length,s=(typeof INVENTORY_SENT_OFFERS!=='undefined'?INVENTORY_SENT_OFFERS:[]).length;[['inventoryTabOffers',r],['inventoryOffersReceivedBtn',r],['inventoryOffersSentBtn',s]].forEach((function(p){var b=document.getElementById(p[0])
if(!b)return
var i=b.querySelector('.mx-cnt')
if(!p[1]){if(i)i.remove()
return}if(!i){i=document.createElement('i')
i.className='mx-cnt'
b.appendChild(i)}if(i.textContent!==String(p[1]))i.textContent=p[1]}))}catch(e){}}var _rio=window.renderInventoryOffers
if(typeof _rio==='function')window.renderInventoryOffers=function(){var r=_rio.apply(this,arguments)
badges()
return r}
setTimeout((function(){try{fetchInventoryOffers()}catch(e){}}),1500)
var _ol=window.openLeaderboard
if(typeof _ol==='function')window.openLeaderboard=function(){var r=_ol.apply(this,arguments)
Promise.resolve(r).then((function(){var c=document.getElementById('leaderboardContent')
if(!c)return
c.classList.add('mx-lb')
c.querySelectorAll('.leaderboard-row').forEach((function(row,i){if(row.__mx)return
row.__mx=1
var me=!!row.style.background
row.removeAttribute('style')
var nm=row.querySelector('.leaderboard-row-name'),sc=row.querySelector('.leaderboard-row-score')
if(!nm||!sc)return
var t=nm.textContent.replace(/^\d+\.\s*/,'')
row.classList.toggle('me',me)
row.innerHTML='<span class="mx-lb-n">'+(i+1)+'</span><span class="mx-lb-a">'+esc(t.charAt(0).toUpperCase())+'</span><span class="mx-lb-nm"><b>'+esc(t)+(me?' <i>ты</i>':'')+'</b><small>чистая прибыль</small></span><span class="mx-lb-s">'+esc(sc.textContent)+'</span>'}))}))
return r}})();(function(){var MM=document.documentElement.getAttribute('data-mix')
if(['12','13','15','16'].indexOf(MM)<0)return
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,(function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]}))}function n2(v){return Number(v||0).toFixed(2)}function G(){return typeof CASE_GRAM_ICON_SVG!=='undefined'?CASE_GRAM_ICON_SVG:''}function gram(v,cls){return'<span class="mx-g'+(cls?' '+cls:'')+'"><span class="mx-gi">'+G()+'</span>'+v+'</span>'}function fee(){try{
return Number(MARKET_BUYER_FEE_PERCENT)||0}catch(e){return 0}}function withFee(p){return Math.round(Number(p)*(1+fee()/100)*100)/100}function nm(it){try{return esc(getGiftDisplayName(it))}catch(e){return esc(it.giftTitle||it.giftType||'Подарок')}}function bg(it){
return it.backdropCenterColor&&it.backdropEdgeColor?'background:radial-gradient(circle at 50% 42%,'+it.backdropCenterColor+' 0%,'+it.backdropEdgeColor+' 100%)':''}function im(it){var u=''
try{u=getGiftImageUrl(it)||''}catch(e){}return u?'<img src="'+u+'" alt="" loading="lazy" draggable="false" onerror="this.setAttribute(\'data-broken\',\'1\')">':''}function plural(n,a,b,c){n=Math.abs(n)%100
var d=n%10
if(n>10&&n<20)return c
if(d>1&&d<5)return b
if(d===1)return a
return c}var SV=function(p){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>'}
var I={heart:SV('<path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 1 1 12 6.1a5 5 0 1 1 7.5 6.5z"/>'),cart:SV('<path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L21 8H6.2"/><circle cx="9.5" cy="20" r="1.2"/><circle cx="17" cy="20" r="1.2"/>'),x:SV('<path d="M6 6l12 12M18 6L6 18"/>'),back:SV('<path d="M9 14l-5-5 5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-2"/>'),
clock:SV('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),users:SV('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 3-5.8 6.5-5.8s6.5 2.2 6.5 5.8M16.5 4.6a3.5 3.5 0 0 1 0 6.8M21.5 20c0-2.6-1.5-4.5-3.7-5.3"/>'),deals:SV('<path d="M4 8h13l-3-3M20 16H7l3 3"/>'),up:SV('<path d="M6 15l6-6 6 6"/>'),down:SV('<path d="M6 9l6 6 6-6"/>')}
function isFav(id){return typeof marketFavoriteIds!=='undefined'&&marketFavoriteIds.has(id)}function isCart(id){return typeof marketCartIds!=='undefined'&&marketCartIds.has(id)}function favBtn(id,cls){
return'<button type="button" class="market-gift-fav-btn '+(cls||'')+(isFav(id)?' is-active':'')+'" aria-label="Избранное" onclick="toggleMarketGiftFavorite('+id+', event)">'+(isFav(id)?I.heart.replace('fill="none"','fill="currentColor"'):I.heart)+'</button>'}function cartBtn(id,cls){
return'<button type="button" class="market-gift-cart-btn '+(cls||'')+(isCart(id)?' is-active':'')+'" aria-label="Корзина" onclick="toggleMarketGiftCart('+id+', event)">'+I.cart+'</button>'}window.mxBuyNow=function(id,e){if(e)e.stopPropagation()
try{marketDetailListingId=id
handleMarketGiftBuy()}catch(x){}}
window.mxOfferNow=function(id,e){if(e)e.stopPropagation()
try{marketDetailListingId=id
handleMarketOfferButtonClick()}catch(x){}}
var NAV={12:{hide:'navLeaderboard',nav:'profile',label:'Профиль',icon:'<span class="mx-nav-ava" id="mxNavAva">K</span>',go:function(){openProfileScreen()}},13:{hide:'navCases',nav:'history',label:'История',icon:I.clock,go:function(){openRecentHistory()}},15:{hide:'navCases',nav:'refs',label:'Рефералы',icon:I.users,go:function(){openReferrals()}},16:{hide:'navCases',nav:'portfolio',
label:'Портфель',icon:SV('<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3 12.5h18"/>'),go:function(e){openSkins(e)}}}[MM]
var APP=document.documentElement.hasAttribute('data-app')
function navInit(){if(APP)return
var bar=document.querySelector('.bottom-bar')
if(!bar||document.getElementById('mxNavX'))return
var b=document.createElement('button')
b.type='button'
b.id='mxNavX'
b.className='bottom-btn mx-nav-x'
b.setAttribute('data-nav',NAV.nav)
b.innerHTML='<span class="nav-icon nav-icon-svg">'+NAV.icon+'</span><span class="nav-label">'+NAV.label+'</span>'
b.addEventListener('click',(function(e){e.stopPropagation()
NAV.go(e)
setTimeout((function(){try{setActiveBottomNav(NAV.nav)}catch(x){}}),60)}))
var ref=document.getElementById(NAV.hide)
bar.insertBefore(b,ref?ref.nextSibling:null)
document.documentElement.classList.add('mx-nav-'+NAV.hide)}function navAva(){var a=document.getElementById('mxNavAva'),s=document.getElementById('profileAvatar')
if(a&&s){var t=(s.textContent||'K').trim().charAt(0)||'K'
if(a.textContent!==t)a.textContent=t}}function navSync(){if(MM!=='13')return
var open=!!document.querySelector('#historyPanel.open'),b=document.getElementById('mxNavX')
if(!b)return
if(open&&!b.classList.contains('is-active')){try{setActiveBottomNav(NAV.nav)}catch(x){}}}function topChip(){if(MM!=='12'||document.getElementById('mxTopTour'))return
var r=document.querySelector('.top-bar-right')||document.querySelector('.top-bar')
if(!r)return
var b=document.createElement('button')
b.type='button'
b.id='mxTopTour'
b.className='mx-tt'
b.setAttribute('aria-label','Турниры')
b.innerHTML=SV('<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20h7M10 17h4"/>')+'<b id="mxTopPlace">—</b>'
b.addEventListener('click',(function(e){e.stopPropagation()
openLeaderboard()}))
r.insertBefore(b,r.firstChild)}function rounds(){try{return scannerGridState&&scannerGridState.recentRounds||[]}catch(e){return[]}}function inv(){try{return(INVENTORY_GIFTS||[]).slice()}catch(e){return[]}}function gv(g){return Number(g.price||g.activeListingPrice||g.value||0)}function players(){var P=[],last=false
try{P=(scannerGridState.players||[]).slice()}catch(e){}if(!P.length){var r=rounds()[0]
P=r&&r.results?r.results.slice():[]
last=!!P.length}var tot=P.reduce((function(a,p){return a+(Number(p.cellCount)||Number(p.stake)||0)}),0)||1
return{last:last,list:P.map((function(p){return{name:p.name||'Игрок',color:p.color||'#5eead4',sh:(Number(p.cellCount)||Number(p.stake)||0)/tot*100,me:!!p.isMe}})).sort((function(a,b){return b.sh-a.sh}))}}var RAT=null,RATT=null,ratAt=0
function rating(cb){if(RAT&&Date.now()-ratAt<2e4)return cb(RAT)
if(rating.busy)return
rating.busy=true
try{_socket.emit('rating:request',{limit:20},(function(res){rating.busy=false
ratAt=Date.now()
RAT=res&&res.items||[]
RATT=res&&res.tournament||null
cb(RAT)}))}catch(e){rating.busy=false}}function lvInfo(){var D=null
try{D=_lastReferralLevelsData}catch(e){}var L=D&&D.levels&&D.levels.length?D.levels.map((function(l){return{name:l.name,pc:Number(l.percent),th:Number(l.threshold||0),key:l.key}})):[{name:'Новичок',pc:3,th:0},{name:'Работяга',pc:5,th:25e3},{name:'Мастер',pc:9,th:8e4},{name:'Профи',pc:15,th:2e5}]
var cur=0,tv=D?Number(D.turnover||0):0
if(D&&D.levelKey)cur=Math.max(0,L.findIndex((function(l){return l.key===D.levelKey})))
else{var t=((document.getElementById('profileRefLevel')||{}).textContent||'').trim()
L.forEach((function(l,i){if(l.name===t)cur=i}))}var nx=L[cur+1],p=nx?Math.max(0,Math.min(1,(tv-L[cur].th)/Math.max(1,nx.th-L[cur].th))):1
return{L:L,cur:cur,p:p,tv:tv}}function compact(n){n=Number(n||0)
if(n>=1e3){var v=n/1e3
return(v%1?v.toFixed(1):String(v))+'k'}return String(Math.round(n))}function set(el,h){if(el&&el.__h!==h){el.__h=h
el.innerHTML=h}}var POLY={1:[[0,0,100,0,100,100,0,100]],2:[[0,0,100,0,100,34,0,72],[0,72,100,34,100,100,0,100]],3:[[0,0,68,0,54,50,0,60],[68,0,100,0,100,68,54,50],[0,60,54,50,100,68,100,100,0,100]],4:[[0,0,58,0,46,46,0,54],[58,0,100,0,100,42,46,46],[0,54,46,46,60,100,0,100],[46,46,100,42,100,100,60,100]],
5:[[0,0,46,0,40,38,0,44],[46,0,100,0,100,30,64,42,40,38],[0,44,40,38,48,72,28,100,0,100],[40,38,64,42,100,30,100,66,48,72],[48,72,100,66,100,100,28,100]],6:[[0,0,38,0,34,34,0,40],[38,0,72,0,66,30,34,34],[72,0,100,0,100,42,66,30],[0,40,34,34,42,66,0,74],[34,34,66,30,100,42,100,70,42,66],[0,74,42,66,100,70,100,100,0,100]]}
function pArea(q){var a=0
for(var i=0;i<q.length;i+=2){var j=(i+2)%q.length
a+=q[i]*q[j+1]-q[j]*q[i+1]}return Math.abs(a/2)}function pCen(q){var a=0,cx=0,cy=0
for(var i=0;i<q.length;i+=2){var j=(i+2)%q.length,f=q[i]*q[j+1]-q[j]*q[i+1]
a+=f
cx+=(q[i]+q[j])*f
cy+=(q[i+1]+q[j+1])*f}a/=2
return[cx/(6*a),cy/(6*a)]}var DEMO=[{name:'D',color:'#4ade80',sh:34},{name:'S',color:'#ec4899',sh:26},{name:'M',color:'#facc15',sh:16},{name:'L',color:'#6366f1',sh:24}]
var AK=0
function arenaSvg(P,st){var L=P.list.length?P.list.slice(0,6):DEMO,n=L.length,k='ar'+ ++AK
var polys=POLY[n].slice().sort((function(a,b){return pArea(b)-pArea(a)}))
var reg='',av='',seams=''
L.forEach((function(p,i){var q=polys[i],pts=[]
for(var j=0;j<q.length;j+=2)pts.push(q[j]+','+q[j+1])
reg+='<polygon points="'+pts.join(' ')+'" fill="'+esc(p.color)+'"'+(P.list.length?'':' fill-opacity=".6"')+'/>'
seams+='<polygon points="'+pts.join(' ')+'"/>'
var c=pCen(q),r=Math.max(6,Math.min(13,4.5+Math.sqrt(p.sh)*1))
av+='<g class="ar-av'+(p.me?' me':'')+'" style="--d:'+(-i*.6).toFixed(1)+'s"><circle cx="'+c[0].toFixed(1)+'" cy="'+c[1].toFixed(1)+'" r="'+r.toFixed(1)+'" fill="rgba(0,0,0,.18)" stroke="rgba(255,255,255,.55)" stroke-width="1.1"/><circle cx="'+c[0].toFixed(1)+'" cy="'+c[1].toFixed(1)+'" r="'+(r-1.6).toFixed(1)+'" fill="url(#'+k+'g)"/><text x="'+c[0].toFixed(1)+'" y="'+(c[1]+r*.36).toFixed(1)+'" text-anchor="middle" font-size="'+(r*1.05).toFixed(1)+'" font-weight="800" fill="#fff">'+esc(String(p.name).charAt(0).toUpperCase())+'</text></g>'
}))
var board=st==='board'
var defs='<defs><clipPath id="'+k+'c"><rect width="100" height="100" rx="'+(board?4:7)+'"/></clipPath><radialGradient id="'+k+'g" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="rgba(255,255,255,.38)"/><stop offset="1" stop-color="rgba(255,255,255,.06)"/></radialGradient><linearGradient id="'+k+'h" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="rgba(255,255,255,.2)"/><stop offset=".5" stop-color="rgba(255,255,255,0)"/><stop offset="1" stop-color="rgba(0,0,0,.18)"/></linearGradient>'+(board?'<linearGradient id="'+k+'w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c7d2fe"/><stop offset=".5" stop-color="#6366f1"/><stop offset="1" stop-color="#312e81"/></linearGradient><linearGradient id="'+k+'s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3730a3"/><stop offset="1" stop-color="#1e1b4b"/></linearGradient>':'')+'</defs>'
var field='<g clip-path="url(#'+k+'c)"><rect width="100" height="100" fill="#0e1030"/>'+reg+'<g stroke="rgba(10,10,30,.35)" stroke-width=".8" fill="none">'+seams+'</g><rect width="100" height="100" fill="url(#'+k+'h)"/>'+av+'</g>'
if(board){
return'<svg viewBox="-8 -8 116 126" aria-hidden="true">'+defs+'<path d="M-6 92 L-6 104 Q-6 110 0 110 L100 110 Q106 110 106 104 L106 92 Z" fill="url(#'+k+'s)"/>'+'<rect x="-6" y="-6" width="112" height="112" rx="9" fill="url(#'+k+'w)"/><rect x="-6" y="-6" width="112" height="112" rx="9" fill="none" stroke="rgba(255,255,255,.55)" stroke-width=".8"/>'+'<rect x="-1.5" y="-1.5" width="103" height="103" rx="5.5" fill="#0b0b26"/>'+field+'<rect x="0" y="0" width="100" height="100" rx="4" fill="none" stroke="rgba(0,0,0,.45)" stroke-width="1.6"/></svg><canvas class="ar-cv" data-vb="-8,-8,116,126"></canvas>'
}return'<svg viewBox="0 0 100 100" aria-hidden="true">'+defs+field+'<rect x=".5" y=".5" width="99" height="99" rx="7" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="1"/></svg><canvas class="ar-cv" data-vb="0,0,100,100"></canvas>'}var LZ={sim:{x:.5,y:.5,vx:.23,vy:-.17,t:0}}
/* луч и прицел превью рисуются один раз в заготовку и потом только переносятся с поворотом —
   размытие свечения (shadowBlur) больше не считается каждый кадр */
var LZS={},LZN=0
function lzSprite(kind,key,w,h,dpr,draw){var tier='';try{tier=getEffectiveQualityTier()}catch(e){}var k=kind+key.join('|')+tier,sp=LZS[k]
if(sp)return sp
if(++LZN>12){LZS={};LZN=1}
var c=document.createElement('canvas');c.width=Math.ceil(w*dpr);c.height=Math.ceil(h*dpr)
var g=c.getContext('2d');g.setTransform(dpr,0,0,dpr,w*dpr/2,h*dpr/2)
try{draw(g)}catch(e){return null}
sp={c:c,w:w,h:h};LZS[k]=sp;return sp}
function lzSample(now){/* та же точка луча, что и на большой арене (сервер + сглаживание), а не отдельная формула — иначе луч «телепортировался» */
try{if(typeof getScannerStabilizedBeamSample==='function'&&typeof scannerGridState!=='undefined'&&scannerGridState){var g0=getScannerStabilizedBeamSample(scannerGridState.status||'idle',scannerGridState.roundData||null,scannerGridState.players||[],typeof getNetworkTimeHighRes==='function'?getNetworkTimeHighRes():Date.now())
if(g0&&isFinite(g0.x)&&isFinite(g0.y))return g0}}catch(e){}
try{if(typeof getScannerSharedLobbyBeamSample==='function'){var s0=getScannerSharedLobbyBeamSample(typeof getNetworkTimeHighRes==='function'?getNetworkTimeHighRes():Date.now())
if(s0&&isFinite(s0.x)&&isFinite(s0.y))return s0}}catch(e){}var S0=LZ.sim,dt=S0.t?Math.min(.05,(now-S0.t)/1e3):0
S0.t=now
S0.x+=S0.vx*dt
S0.y+=S0.vy*dt
if(S0.x<.05||S0.x>.95){S0.vx=-S0.vx
S0.x=Math.max(.05,Math.min(.95,S0.x))}if(S0.y<.05||S0.y>.95){S0.vy=-S0.vy
S0.y=Math.max(.05,Math.min(.95,S0.y))}return S0}function lzAngle(){try{return getNetworkTime()/1e3*SCANNER_LOBBY_LASER_TURN_SPEED%(Math.PI*2)}catch(e){return Date.now()/1e3*.65%(Math.PI*2)}}LZ.list=[];LZ.at=0
function covered(){return document.documentElement.classList.contains('ap-cov')}window.mxCovered=covered
function lzScan(now){if(now-LZ.at<500)return
LZ.at=now
if(covered()){LZ.list=[]
return}LZ.list=[].filter.call(document.getElementsByClassName('ar-cv'),(function(cv){if(!cv.offsetParent)return false
var r=cv.getBoundingClientRect()
if(r.bottom<0||r.top>innerHeight||!r.width)return false
cv.__w=cv.clientWidth
cv.__h=cv.clientHeight
return true}))}function lzFrame(now){if(document.hidden||(window.__lq()&&now-(LZ.lt||0)<32)){requestAnimationFrame(lzFrame)
return}LZ.lt=now
lzScan(now)
var list=LZ.list,smp=null,ang=0
for(var i=0;i<list.length;i++){var cv=list[i]
if(!smp){smp=lzSample(now)
ang=lzAngle()}var dpr=Math.min(window.__lq()?1.5:2,window.devicePixelRatio||1),W=cv.__w,H=cv.__h
if(cv.width!==Math.round(W*dpr)||cv.height!==Math.round(H*dpr)){cv.width=Math.round(W*dpr)
cv.height=Math.round(H*dpr)}var vb=(cv.getAttribute('data-vb')||'0,0,100,100').split(',').map(Number),kx=W/vb[2],ky=H/vb[3]
var fx=-vb[0]*kx,fy=-vb[1]*ky,fs=100*kx,board=vb[0]<0
var ctx=cv.getContext('2d')
ctx.setTransform(dpr,0,0,dpr,0,0)
ctx.clearRect(0,0,W,H)
var k=cv.parentElement&&cv.parentElement.classList.contains('ap-ss')?2:1,sc=fs/366,rr=(Math.max(11,366*.031)-1)*sc
var px=fx+Math.max(rr,Math.min(fs-rr,fs*smp.x)),py=fy+Math.max(rr,Math.min(fs-rr,fs*smp.y))
var st=cv.__z||(cv.__z={vx:0,vy:0,hits:[]}),vx=Number(smp.vx)||0,vy=Number(smp.vy)||0
if(st.vx&&vx&&Math.sign(vx)!==Math.sign(st.vx))st.hits.push({x:smp.x<.5?fx:fx+fs,y:py,t:now,h:0})
if(st.vy&&vy&&Math.sign(vy)!==Math.sign(st.vy))st.hits.push({x:px,y:smp.y<.5?fy:fy+fs,t:now,h:1})
if(vx)st.vx=vx
if(vy)st.vy=vy
ctx.save()
ctx.beginPath()
if(ctx.roundRect)ctx.roundRect(fx,fy,fs,fs,board?4*kx:7*kx)
else ctx.rect(fx,fy,fs,fs)
ctx.clip()
ctx.save()
ctx.translate(px,py)
ctx.rotate(ang)
var BS=lzSprite('b',[fs.toFixed(1),rr.toFixed(2),dpr],fs*4.6+40,62,dpr,function(g){drawScannerBeam(g,fs*4.6,{glowWidth:7.2*k,coreWidth:Math.max(1.4,2.85*k),innerWidth:Math.max(.5,.9*k),glowBlur:18*k,coreBlur:14*k,beamColor:'rgba(45, 225, 255, 0.74)',innerColor:'rgba(255,255,255,0.88)',centerGap:rr*2})})
if(BS)ctx.drawImage(BS.c,-BS.w/2,-BS.h/2,BS.w,BS.h)
else try{drawScannerBeam(ctx,fs*4.6,{glowWidth:7.2*k,coreWidth:Math.max(1.4,2.85*k),innerWidth:Math.max(.5,.9*k),glowBlur:18*k,coreBlur:14*k,beamColor:'rgba(45, 225, 255, 0.74)',innerColor:'rgba(255,255,255,0.88)',centerGap:rr*2})}catch(e){ctx.strokeStyle='rgba(45,225,255,.8)'
ctx.lineWidth=1.5
ctx.beginPath()
ctx.moveTo(-fs*2,0)
ctx.lineTo(-rr,0)
ctx.moveTo(rr,0)
ctx.lineTo(fs*2,0)
ctx.stroke()}ctx.restore()
try{var RS=lzSprite('r',[rr.toFixed(2),dpr],(rr/sc+30)*2*sc,(rr/sc+30)*2*sc,dpr,function(g){g.scale(sc,sc);drawScannerReticle(g,0,0,rr/sc,{alpha:.86,plusScale:.16,plusColor:'rgba(255,255,255,0.92)',rotation:0,wobble:0})})
ctx.save()
ctx.translate(px,py)
ctx.rotate((typeof getNetworkTime==='function'?getNetworkTime():Date.now())*(typeof SCANNER_RETICLE_IDLE_SPIN_SPEED==='number'?SCANNER_RETICLE_IDLE_SPIN_SPEED:.0017))
if(RS)ctx.drawImage(RS.c,-RS.w/2,-RS.h/2,RS.w,RS.h)
ctx.restore()}catch(e){}ctx.restore()
ctx.save()
ctx.globalCompositeOperation='lighter'
st.hits=st.hits.filter((function(h){return now-h.t<800}))
st.hits.forEach((function(h){var a=1-(now-h.t)/800,R=(board?9:6)*kx
var g=ctx.createRadialGradient(h.x,h.y,0,h.x,h.y,R)
g.addColorStop(0,'rgba(255,255,255,'+(a*.95).toFixed(3)+')')
g.addColorStop(.3,'rgba(45,225,255,'+(a*.85).toFixed(3)+')')
g.addColorStop(1,'rgba(45,225,255,0)')
ctx.fillStyle=g
ctx.fillRect(h.x-R,h.y-R,R*2,R*2)
var Ln=R*1.6,lg=h.h?ctx.createLinearGradient(h.x-Ln,h.y,h.x+Ln,h.y):ctx.createLinearGradient(h.x,h.y-Ln,h.x,h.y+Ln)
lg.addColorStop(0,'rgba(255,255,255,0)')
lg.addColorStop(.5,'rgba(255,255,255,'+a.toFixed(3)+')')
lg.addColorStop(1,'rgba(255,255,255,0)')
ctx.strokeStyle=lg
ctx.lineWidth=1.6
ctx.beginPath()
if(h.h){ctx.moveTo(h.x-Ln,h.y)
ctx.lineTo(h.x+Ln,h.y)}else{ctx.moveTo(h.x,h.y-Ln)
ctx.lineTo(h.x,h.y+Ln)}ctx.stroke()}))
ctx.restore()}requestAnimationFrame(lzFrame)
}requestAnimationFrame(lzFrame)
/* ВАЖНО: раньше этот блок по ошибке сидел ВНУТРИ кадра лазера и каждый кадр запускал ещё один
   бесконечный цикл покачивания — за минуту их набегали тысячи, и приложение всё сильнее тормозило */
var TILT={'.ln-arena .mx-arena':{x:8,ax:26,y:0,ay:18,z:0,az:9},'.ln-pg-art .mx-arena':{x:8,ax:24,y:0,ay:16,z:0,az:8},'.pu-tg.scan .mx-arena':{x:26,ax:24,y:0,ay:14,z:-6,az:10},'.tv-ar .mx-arena':{x:18,ax:20,y:0,ay:16,z:0,az:7}}
var TL={list:[],at:0}
function tiltScan(now){if(now-TL.at<1e3)return
TL.at=now
var out=[],cnt={}
if(window.mxCovered&&window.mxCovered()){TL.list=[]
return}var K=Object.keys(TILT).map((function(q){return[q.split(' ')[0],TILT[q]]}))
var all=document.getElementsByClassName('mx-arena')
for(var i=0;i<all.length;i++){var el=all[i]
for(var j=0;j<K.length;j++){if(el.parentElement&&el.parentElement.closest(K[j][0])){if(el.offsetParent){cnt[j]=(cnt[j]||0)+1
out.push([el,K[j][1],cnt[j]-1])}break}}}TL.list=out}/* Покачивание 3D-арен. Браузер растрирует наклонённый в 3D элемент с пониженным
   разрешением — картинка мылилась. Поэтому арена верстается в 2 раза крупнее и
   уменьшается обратно в самом transform (scale(.5)): растр получается вдвое чётче.
   Положение и размер на экране те же (отрицательные отступы вокруг точки поворота). */
var SS=2
function ssPrep(el){if(el.__ss)return el.__ss
var w=el.offsetWidth,h=el.offsetHeight
if(!w||!h)return null
var o=getComputedStyle(el).transformOrigin.split(' ').map(parseFloat),ox=o[0]||w/2,oy=o[1]||h/2,k=SS-1,st=el.style
st.width=w*SS+'px';st.height=h*SS+'px';st.maxWidth='none';st.aspectRatio='auto'
st.marginLeft=-k*ox+'px';st.marginRight=k*(ox-w)+'px';st.marginTop=-k*oy+'px';st.marginBottom=k*(oy-h)+'px'
st.transformOrigin=SS*ox+'px '+SS*oy+'px'
el.classList.add('ap-ss')
return el.__ss={w:w,h:h}}
window.addEventListener('resize',function(){[].forEach.call(document.querySelectorAll('.ap-ss'),function(el){var st=el.style;['width','height','maxWidth','aspectRatio','marginLeft','marginRight','marginTop','marginBottom','transformOrigin'].forEach(function(q){st[q]=''});el.classList.remove('ap-ss');el.__ss=null})})
function still(){return document.documentElement.classList.contains('no-animations')}
function tilt(now){requestAnimationFrame(tilt)
if(document.hidden||(window.__lq()&&now-(TL.lt||0)<32))return
TL.lt=now
tiltScan(now)
var t=now/1e3
TL.list.forEach(function(it){var el=it[0],c=it[1],o=it[2]*1.7
if(!ssPrep(el))return
if(still()){el.style.transform='rotateX('+c.x+'deg) rotateY('+c.y+'deg) rotateZ('+c.z+'deg) scale(.5)';return}
var rx=c.x+c.ax*(.62*Math.sin(t*.83+o)+.38*Math.sin(t*1.37+1.1+o))
var ry=c.y+c.ay*(.6*Math.sin(t*.61+2+o)+.4*Math.sin(t*1.13+o))
var rz=c.z+c.az*(.55*Math.sin(t*.47+4+o)+.45*Math.sin(t*.97+.5+o))
var ty=4*Math.sin(t*1.21+o)
el.style.transform='rotateX('+rx.toFixed(2)+'deg) rotateY('+ry.toFixed(2)+'deg) rotateZ('+rz.toFixed(2)+'deg) translateY('+ty.toFixed(1)+'px) scale(.5)'})}
requestAnimationFrame(tilt)
function sigOf(P){return P.list.map((function(p){return p.color+p.sh.toFixed(1)+p.name})).join('|')+(P.last?'L':'')}function arts(){var P=null
document.querySelectorAll('[data-arena]').forEach((function(el){if(!el.offsetParent)return
P=P||players()
var st=el.getAttribute('data-arena')||'',s=sigOf(P)+st
if(el.__s!==s){el.__s=s
el.innerHTML=arenaSvg(P,st)}}))}function txt(id){var e=document.getElementById(id)
return e?(e.textContent||'').trim():''}function home15(){var lg=document.querySelectorAll('[data-legend]')
if(lg.length){var P=players()
lg.forEach((function(el){if(!el.offsetParent)return
set(el,P.list.length?'<span class="pu-lg-k">'+(P.last?'прошлый раунд':'в раунде · '+P.list.length)+'</span>'+P.list.slice(0,4).map((function(p){return'<span class="pu-lg'+(p.me?' me':'')+'"><i style="background:'+esc(p.color)+'"></i><b>'+(p.me?'Ты':esc(p.name))+'</b><em>'+p.sh.toFixed(0)+'%</em></span>'
})).join('')+(P.list.length>4?'<span class="pu-lg-e">+ ещё '+(P.list.length-4)+'</span>':''):'<span class="pu-lg-k">поле свободно</span><span class="pu-lg-e">займи первую зону — вся арена твоя</span>')}))}var tw=document.getElementById('mxTourW')
if(tw&&tw.offsetParent)rating((function(it){var me=it.filter((function(p){return p.isMe}))[0],gap=''
if(me&&me.place>3&&it[2])gap='до 3 места: '+gram(n2(Math.max(0,it[2].netProfit-me.netProfit)))
set(tw,(it.length?'<span class="pu-pod">'+[1,0,2].map((function(k){var p=it[k]
if(!p)return'<span class="pu-pd e"></span>'
return'<span class="pu-pd p'+(k+1)+(p.isMe?' me':'')+'">'+ava(p)+'<b>'+esc(p.name)+'</b><em>+'+compact(p.netProfit)+'</em><i>'+(k+1)+'</i></span>'
})).join('')+'</span>':'<span class="pu-lg-e">пока нет результатов</span>')+'<span class="pu-tme">'+(me?'<span>твоё место <b>#'+me.place+'</b></span><span>'+(gap||(me.place<=3?'ты в призовой тройке':''))+'</span>':'<span>сыграй раунд — попадёшь в рейтинг</span>')+'</span>')}))
var rw=document.getElementById('mxRefW')
if(rw&&rw.offsetParent){var LI=lvInfo(),c=LI.L[LI.cur],nx=LI.L[LI.cur+1],cnt=txt('referralCount')||'0',er=txt('referralEarnedAmount')||'0'
set(rw,'<span class="pu-rw-l"><b>'+c.pc+'%</b><small>'+esc(c.name)+'</small></span><span class="pu-rw-m"><span class="pu-rw-n"><span><small>приглашено</small><b>'+esc(cnt)+'</b></span><span><small>заработано</small><b>'+gram(esc(er))+'</b></span></span>'+'<span class="pu-rw-p"><u style="width:'+(LI.p*100).toFixed(1)+'%"></u></span><small class="pu-rw-s">'+(nx?'до «'+esc(nx.name)+'» ('+nx.pc+'%) — '+Math.round(LI.p*100)+'%':'максимальный уровень')+'</small></span>')
}}window.__mxInvSale=false
window.mxInvSale=function(on){try{if(on)switchInventoryTab('gifts')}catch(e){}window.__mxInvSale=!!on
invTabs()
try{window.renderInventoryGifts()}catch(e){}}
function invTabs(){var pill=document.getElementById('inventoryTabsPill')
if(!pill)return
var b=document.getElementById('mxInvSaleTab'),gb=document.getElementById('inventoryTabGifts')
if(!b){b=document.createElement('button')
b.type='button'
b.id='mxInvSaleTab'
b.className='inventory-tab-btn mx-sale-tab'
b.addEventListener('click',(function(e){e.stopPropagation()
window.mxInvSale(true)}))
pill.appendChild(b)
if(gb&&!gb.__mx){gb.__mx=1
gb.addEventListener('click',(function(){window.__mxInvSale=false
invTabs()}),true)}var ob=document.getElementById('inventoryTabOffers')
if(ob&&!ob.__mx){ob.__mx=1
ob.addEventListener('click',(function(){window.__mxInvSale=false
invTabs()}),true)}}var n=inv().filter((function(g){return g.hasActiveListing})).length
if(!n&&window.__mxInvSale){window.__mxInvSale=false
try{window.renderInventoryGifts()}catch(e){}}b.hidden=!n
set(b,'На продаже<i class="mx-cnt">'+n+'</i>')
var giftsOn=(document.getElementById('inventoryGiftsView')||{}).style?document.getElementById('inventoryGiftsView').style.display!=='none':true
b.classList.toggle('active',window.__mxInvSale&&giftsOn)
if(gb)gb.classList.toggle('active',!window.__mxInvSale&&giftsOn)
pill.classList.toggle('mx-3',!!n)}function invSum(){var pill=document.getElementById('inventoryTabsPill')
if(!pill)return
var el=document.getElementById('mxInvSum')
if(!el){el=document.createElement('div')
el.id='mxInvSum'
el.className='pi-line'
pill.parentNode.insertBefore(el,pill)}var G0=inv(),tot=G0.reduce((function(a,g){return a+gv(g)}),0),sale=G0.filter((function(g){return g.hasActiveListing})).length
var pv=parseFloat(txt('profileInvValue').replace(/\s/g,'').replace(',','.'))
if(pv>0)tot=pv
set(el,'<span>мои подарки <b>'+G0.length+'</b></span><span>на продаже <b>'+sale+'</b></span><span>оценка <b>'+(tot?gram(n2(tot)):'—')+'</b></span>')}function ago(t){var s=Math.max(0,(Date.now()-t)/1e3)
if(s<60)return'только что'
if(s<3600)return Math.round(s/60)+' мин назад'
if(s<86400)return Math.round(s/3600)+' ч назад'
return Math.round(s/86400)+' д назад'}function ms(v){try{return typeof tsToMs==='function'?tsToMs(v):new Date(v).getTime()}catch(e){return 0}}function evRow(e){
return'<button type="button" class="ln-ev '+e.k+'" onclick="'+e.on+'"><span class="ln-ev-a" style="--c:'+esc(e.c||'#7dd3fc')+'">'+e.ic+'</span><span class="ln-ev-b"><b>'+e.t+'</b><small>'+e.s+' · '+ago(e.at)+'</small></span>'+(e.v?'<span class="ln-ev-v'+(e.neg?' neg':'')+'">'+e.v+'</span>':'')+'</button>'}
var ICD='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="9" cy="9" r="1.2" fill="currentColor"/><circle cx="15" cy="15" r="1.2" fill="currentColor"/></svg>'
var ICG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8"/></svg>'
function feed(){var el=document.getElementById('mxFeed'),my=document.getElementById('mxMyFeed')
if(!el&&!my)return
var me=''
try{me=String(getCurrentPlayer().id)}catch(e){}var E=[],M=[]
rounds().slice(0,10).forEach((function(r){var w=getScannerHistoryWinnerMeta(r),t=ms(r.finishedAt||r.playedAt),mine=w.id===me
E.push({k:'scan',at:t,c:w.color,ic:esc(String(w.name||'?').charAt(0).toUpperCase()),t:(mine?'Ты':esc(w.name))+' — победа в Сканере',s:'раунд №'+esc(r.roundNumber)+' · '+(r.participantCount||(r.results||[]).length)+' игр.',v:'+'+n2(w.payout),on:'lxAllRounds(event)'})
var part=(r.results||[]).filter((function(x){return String(x.playerId)===me}))[0]
if(part)M.push({k:mine?'win':'lose',at:t,c:mine?'#86efac':'#f472b6',ic:mine?'★':'·',t:mine?'Победа в Сканере':'Сканер — не повезло',s:'раунд №'+esc(r.roundNumber),v:mine?'+'+n2(w.payout):'−'+n2(part.stake),neg:!mine,on:'openRecentHistory()'})}));(window.__mxDiceHist||[]).slice(0,6).forEach((function(d){var res=d.results||[],wn=res.filter((function(x){return x.status==='win'
}))[0],my2=res.filter((function(x){return String(x.playerId)===me}))[0]
if(wn)E.push({k:'dice',at:ms(d.playedAt),c:wn.color,ic:ICD,t:(String(wn.playerId)===me?'Ты':esc(wn.name))+' собрал '+wn.sum+' в Костях 21',s:'стол '+esc(d.entry)+' GRAM',v:'+'+n2(d.payout),on:'mxDiceOpen(event)'})
if(my2)M.push({k:my2.status==='win'?'win':'lose',at:ms(d.playedAt),c:my2.status==='win'?'#86efac':'#fb923c',ic:ICD,t:my2.status==='win'?'Кости 21 — победа':my2.sum>21?'Кости 21 — перебор':'Кости 21 — поражение',s:'сумма '+my2.sum+' · стол '+esc(d.entry),v:my2.status==='win'?'+'+n2(d.payout):'−'+n2(my2.stake),neg:my2.status!=='win',on:'openRecentHistory()'})}))
var LL=[]
try{LL=MARKET_LISTINGS.slice(-3)}catch(e){}LL.forEach((function(it,i){E.push({k:'lot',at:Date.now()-(i+1)*73e4,c:it.backdropCenterColor||'#7dd3fc',ic:ICG,t:'Новый лот: '+nm(it)+' #'+esc(it.number),s:'маркет',v:n2(it.price),on:'openMarketGiftDetail('+Number(it.listingId)+')'})}))
if(RAT&&RAT[0])E.push({k:'tour',at:Date.now()-24e5,c:'#fbbf24',ic:'🏆',t:esc(RAT[0].name)+' лидирует в турнире',s:'чистая прибыль',v:'+'+compact(RAT[0].netProfit),on:'openLeaderboard()'})
E.sort((function(a,b){return b.at-a.at}))
M.sort((function(a,b){return b.at-a.at}))
if(el)set(el,E.length?E.slice(0,12).map(evRow).join(''):'<div class="ln-ev-e">событий пока нет</div>')
if(my)set(my,M.length?M.slice(0,8).map(evRow).join(''):'<div class="ln-ev-e">сыграй первый раунд — он появится здесь</div>')}window.mxBxTab=function(b,t){var c=b.closest('.bx-tabs')
if(!c)return
c.setAttribute('data-t',t)
c.querySelectorAll('.bx-tabs-h button:not(.bx-q)').forEach((function(x){x.classList.toggle('on',x===b)}))}
function tape(){var el=document.getElementById('mxTape')
if(!el)return
var txt=function(id){var e=document.getElementById(id)
return e?(e.textContent||'').trim():'—'}
var me=RAT?RAT.filter((function(p){return p.isMe}))[0]:null,R=rounds(),last=R[0]?getScannerHistoryWinnerMeta(R[0]):null,prev=R[1]?Number(R[1].totalPot||0):0,cur=R[0]?Number(R[0].totalPot||0):0,ch=prev?(cur-prev)/prev*100:0
var items=[['SCAN','банк '+n2(cur),(ch>=0?'▲ ':'▼ ')+Math.abs(ch).toFixed(1)+'%',ch>=0],['TOP',txt('scannerTopDayName'),txt('scannerTopDayAmount'),true],['LAST',last?last.name:'—',last?'+'+n2(last.payout):'',true],['DICE','столов 5','ставка от 1',true],['TOUR',me?'ты #'+me.place:'рейтинг',me?'+'+n2(me.netProfit):'',true],['BAL',txt('balanceValue'),'GRAM',true]]
var h=items.map((function(x){return'<span class="tp"><b>'+x[0]+'</b>'+esc(x[1])+'<em class="'+(x[3]?'up':'dn')+'">'+esc(x[2])+'</em></span>'})).join('')
set(el,h+h)}function diceTables(){var el=document.getElementById('mxDiceTables')
if(!el)return
var D=window.__mxDiceLv||{levels:[1,5,10,25,50],wait:{}}
set(el,D.levels.map((function(lv){var w=D.wait[lv]||0,dots=''
for(var i=0;i<6;i++)dots+='<i'+(i<w?' class="on"':'')+'></i>'
return'<div class="dt-r"><span class="dt-s"><b>'+lv+'</b><small>GRAM</small></span><span class="dt-seat">'+dots+'<small>'+w+' из 6 за столом</small></span><span class="dt-b"><small>банк</small><b>'+n2(lv*Math.max(1,w))+'</b></span><button type="button" class="bx-btn'+(w>=2?' a-hot':'')+'" onclick="mxDiceAt('+lv+', event)">Сесть</button></div>'})).join(''))}function ticker(){
var el=document.getElementById('mxTicker')
if(!el)return
var R=rounds().slice(0,8)
if(!R.length){set(el,'<span class="sh-tk">раундов пока нет</span>')
return}var h=R.map((function(r){var w=getScannerHistoryWinnerMeta(r)
return'<span class="sh-tk"><i style="background:'+esc(w.color||'#7dd3fc')+'"></i><b>'+esc(w.name)+'</b>'+gram('+'+n2(w.payout))+'<em>№'+esc(r.roundNumber||'')+'</em></span>'})).join('')
set(el,h+h)}function avatars(){var el=document.getElementById('mxNowAva')
if(!el)return
var P=players(),lbl=P.list.length?P.last?'прошлый раунд':P.list.length+' '+plural(P.list.length,'игрок','игрока','игроков'):'ждём игроков'
set(el,P.list.slice(0,5).map((function(p){return'<i style="--c:'+esc(p.color)+'">'+esc(String(p.name).charAt(0).toUpperCase())+'</i>'})).join('')+'<em>'+lbl+'</em>')}function ava(p,cls){return'<span class="mx-av'+(cls?' '+cls:'')+'">'+esc(String(p.name||'?').charAt(0).toUpperCase())+'</span>'}function tour(){
if(!document.getElementById('mxPodium')&&!document.getElementById('mxTopMini')&&!document.getElementById('mxLeaders')&&!document.getElementById('mxTopTour')&&!document.getElementById('mxTourMeS'))return
rating((function(it){var me=it.filter((function(p){return p.isMe}))[0]
var pl=document.getElementById('mxTopPlace')
if(pl)set(pl,me?'#'+me.place:'—')
var pod=document.getElementById('mxPodium')
if(pod)set(pod,it.length?[1,0,2].map((function(k){var p=it[k]
if(!p)return''
return'<span class="sh-pd p'+(k+1)+(p.isMe?' me':'')+'">'+ava(p)+'<b>'+esc(p.name)+'</b>'+gram('+'+n2(p.netProfit))+'<i>'+(k+1)+'</i></span>'})).join(''):'<span class="sh-pod-e">пока нет результатов</span>')
var tm=document.getElementById('mxTourMe')
if(tm)set(tm,me?'<span>Твоё место</span><b>#'+me.place+'</b>'+gram('+'+n2(me.netProfit)):'сыграй раунд, чтобы попасть в рейтинг')
var ts=document.getElementById('mxTourMeS')
if(ts)set(ts,me?'ты на '+me.place+' месте':'рейтинг по прибыли')
var tmini=document.getElementById('mxTopMini')
if(tmini)set(tmini,it.length?it.slice(0,3).map((function(p,i){return'<li'+(p.isMe?' class="me"':'')+'><i>'+(i+1)+'</i><b>'+esc(p.name)+'</b>'+gram('+'+n2(p.netProfit))+'</li>'})).join('')+(me&&me.place>3?'<li class="me"><i>'+me.place+'</i><b>Ты</b>'+gram('+'+n2(me.netProfit))+'</li>':''):'<li>пока нет результатов</li>')
var ld=document.getElementById('mxLeaders')
if(ld)set(ld,'<div class="bx-lead-h"><span>#</span><span>игрок</span><span>побед</span><span>прибыль</span></div>'+it.slice(0,5).map((function(p){return'<div class="bx-lead-r'+(p.isMe?' me':'')+'"><span>'+p.place+'</span><span>'+ava(p)+'<b>'+esc(p.name)+'</b></span><span>'+(p.wins||0)+'</span><span class="up">+'+n2(p.netProfit)+'</span></div>'
})).join('')+(me&&me.place>5?'<div class="bx-lead-r me"><span>'+me.place+'</span><span>'+ava(me)+'<b>Ты</b></span><span>'+(me.wins||0)+'</span><span class="up">+'+n2(me.netProfit)+'</span></div>':''))
var tl=document.getElementById('mxTourLead')
if(tl&&it[0])set(tl,'лидер '+esc(it[0].name))
var tlv=document.getElementById('mxTourLeadV')
if(tlv&&it[0])set(tlv,'+'+compact(it[0].netProfit))
var tmb=document.getElementById('mxTourMeB')
if(tmb)set(tmb,me?'#'+me.place:'—')}))}var TM={pvp:{t:'Арена',s:'Сканер · чистая прибыль',h:'выигрыш минус собственная ставка, комиссия уже учтена',u:'прибыль',c:'#5eead4',pre:'+'},market:{t:'Маркет',s:'оборот в маркете',h:'сумма покупок и продаж подарков',u:'оборот',c:'#a78bfa',pre:''},cases:{t:'Кейсы',s:'выигрыш в кейсах',h:'стоимость призов из открытых кейсов',u:'выигрыш',c:'#fbbf24',pre:'+'},
referrals:{t:'Рефералы',s:'приглашённые игроки',h:'кто привёл больше активных друзей',u:'приглашено',c:'#38bdf8',pre:''}}
var TT='pvp',TRQ=0,TCACHE={}
function tArt(m){if(m==='pvp')return'<span class="tz-ar">'+arenaSvg({list:[],last:false},'')+'</span>'
if(m==='market')return'<svg viewBox="0 0 80 80" aria-hidden="true"><rect x="10" y="30" width="34" height="34" rx="9" fill="#7c3aed"/><rect x="10" y="30" width="34" height="11" rx="5" fill="#a78bfa"/><rect x="24" y="30" width="6" height="34" fill="#ede9fe" opacity=".85"/><rect x="38" y="16" width="32" height="32" rx="9" fill="#c4b5fd" class="tz-up"/><rect x="38" y="16" width="32" height="10" rx="5" fill="#ede9fe"/><rect x="51" y="16" width="6" height="32" fill="#7c3aed" opacity=".7"/><path d="M48 66l8-8 6 5 10-12" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="tz-ln"/></svg>'
if(m==='cases')return'<svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="44" r="26" fill="#fbbf24" opacity=".18" class="tz-gl"/><rect x="14" y="36" width="52" height="30" rx="8" fill="#b45309"/><rect x="14" y="36" width="52" height="9" fill="#92400e"/><g class="tz-lid"><rect x="11" y="24" width="58" height="14" rx="6" fill="#f59e0b"/><rect x="34" y="24" width="12" height="14" fill="#fde68a"/></g><rect x="34" y="45" width="12" height="21" fill="#fde68a"/><circle cx="24" cy="18" r="2.5" fill="#fde68a" class="tz-s"/><circle cx="60" cy="14" r="2" fill="#fff" class="tz-s b"/><circle cx="66" cy="28" r="1.8" fill="#fde68a" class="tz-s c"/></svg>'
return'<svg viewBox="0 0 80 80" aria-hidden="true"><g stroke="#38bdf8" stroke-width="2" opacity=".6" class="tz-ln"><path d="M40 40L16 22M40 40L66 24M40 40L18 62M40 40L64 60"/></g><circle cx="40" cy="40" r="13" fill="#0ea5e9"/><circle cx="40" cy="36" r="4.5" fill="#e0f2fe"/><path d="M32 47c1.5-4 4.5-6 8-6s6.5 2 8 6" fill="#e0f2fe"/><circle cx="16" cy="22" r="7" fill="#7dd3fc" class="tz-p"/><circle cx="66" cy="24" r="7" fill="#7dd3fc" class="tz-p b"/><circle cx="18" cy="62" r="7" fill="#7dd3fc" class="tz-p c"/><circle cx="64" cy="60" r="7" fill="#7dd3fc" class="tz-p"/></svg>'
}function tVal(m,v){return m==='referrals'?Math.round(v)+' '+plural(Math.round(v),'друг','друга','друзей'):TM[m].pre+n2(v)}var TINFO={}
function left(t){var s=Math.max(0,Math.floor((t-Date.now())/1e3)),d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60)
return d?d+'д '+h+'ч '+(m<10?'0':'')+m+'м':h?h+'ч '+(m<10?'0':'')+m+'м':m+'м '+(s%60<10?'0':'')+s%60+'с'}function ticks(){document.querySelectorAll('[data-tend]').forEach((function(e){var v=left(Number(e.getAttribute('data-tend')))
if(e.textContent!==v)e.textContent=v}))
document.querySelectorAll('[data-tclk]').forEach((function(e){var v=clock(Number(e.getAttribute('data-tclk')))
if(e.textContent!==v)e.textContent=v}))}function prizeOf(T,place){var p=T&&T.prizes?T.prizes[place-1]:null
if(p==null)return null
return typeof p==='number'?{gram:p}:p}function pzHtml(p,cls){if(!p)return''
if(p.gift){var art=''
try{art=window.__mxGiftArt?window.__mxGiftArt('','#f8fafc','#a5b4c8'):''}catch(e){}return'<span class="tq-gift '+(cls||'')+'" style="'+bg(p.gift)+'">'+art+im(p.gift)+'</span>'}return'<span class="tq-gram '+(cls||'')+'">'+gram(n2(p.gram))+'</span>'}function pzName(p){return p?p.gift?nm(p.gift):n2(p.gram)+' GRAM':''}var MODE_T={pvp:'PvP-турнир недели',market:'Турнир маркета',cases:'Турнир кейсов',
referrals:'Турнир рефералов'}
function podium(T){if(!T||!T.prizes||!T.prizes.length)return''
return'<span class="tq-pod">'+[2,1,3].map((function(pl){var p=prizeOf(T,pl)
if(!p)return''
return'<span class="tq-pl p'+pl+'">'+(pl===1?'<i class="tq-rays" aria-hidden="true"></i>':'')+pzHtml(p)+'<span class="tq-ped"><b>'+pl+'</b></span><small>'+pzName(p)+'</small></span>'})).join('')+'</span>'}function paidN(T){return T&&T.prizes?T.prizes.length:0}var TV={pvp:{a:'Турнир',b:'арены',d:'Играй в Сканер и Кости 21 — набирай прибыль за неделю.',
r:[['Играй в арене','Сканер и Кости 21 — любые столы и ставки'],['Очки — чистая прибыль','выигрыш минус твоя ставка, комиссия уже учтена'],['Итоги в понедельник','топ игроков недели получают призы']]},market:{a:'Турнир',b:'маркета',d:'Покупай и продавай подарки — набирай оборот за неделю.',
r:[['Торгуй на маркете','покупки и продажи подарков'],['Очки — оборот','сумма твоих сделок в GRAM'],['Итоги в понедельник','самые активные получают призы']]},cases:{a:'Турнир',b:'кейсов',d:'Открывай кейсы — чем дороже призы, тем выше ты в таблице.',
r:[['Открывай кейсы','любые кейсы из раздела «Кейсы»'],['Очки — стоимость призов','сумма всего, что выпало за неделю'],['Итоги в понедельник','лучшие получают призы']]},referrals:{a:'Турнир',b:'рефералов',d:'Приглашай друзей по своей ссылке — каждый друг приносит очки.',
r:[['Делись ссылкой','ссылка в разделе «Рефералы»'],['Очки — приглашённые','друзья, которые зашли за эту неделю'],['Итоги в понедельник','лучшие пригласители получают призы']]}}
function tvArt(m){if(m==='pvp')return'<span class="tv-ar"><span class="mx-arena">'+arenaSvg({list:[],last:false},'board')+'</span></span>'
var k='tv'+ ++TBK
if(m==='market')return'<svg class="tv-svg" viewBox="0 0 200 170" aria-hidden="true"><defs><linearGradient id="'+k+'a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c4b5fd"/><stop offset="1" stop-color="#6d28d9"/></linearGradient><linearGradient id="'+k+'b" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fde68a"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs>'+'<ellipse cx="100" cy="158" rx="70" ry="9" fill="rgba(0,0,0,.35)"/><g class="tv-bob"><rect x="46" y="70" width="108" height="80" rx="14" fill="url(#'+k+'a)"/><rect x="38" y="52" width="124" height="26" rx="10" fill="#a78bfa"/><rect x="92" y="52" width="16" height="98" fill="url(#'+k+'b)"/>'+'<path d="M100 52c-8-26-40-30-40-12 0 12 24 12 40 12zm0 0c8-26 40-30 40-12 0 12-24 12-40 12z" fill="url(#'+k+'b)"/><rect x="46" y="70" width="108" height="10" fill="rgba(0,0,0,.18)"/><path d="M58 84h8v54h-8z" fill="#fff" opacity=".25"/></g>'+'<g class="tv-tag"><path d="M150 34l30 6-6 30-30-6-8-16z" fill="#f8fafc"/><circle cx="141" cy="51" r="3" fill="#6d28d9"/><text x="163" y="58" text-anchor="middle" font-size="13" font-weight="800" fill="#4c1d95" transform="rotate(11 163 52)">%</text></g>'+'<g class="tv-coin"><circle cx="34" cy="110" r="18" fill="#2563eb"/><circle cx="34" cy="107" r="17" fill="#38bdf8"/><path d="M27 100h14l4 6-11 11-11-11z" fill="#fff"/></g></svg>'
if(m==='cases')return'<svg class="tv-svg" viewBox="0 0 200 170" aria-hidden="true"><defs><linearGradient id="'+k+'a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f59e0b"/><stop offset="1" stop-color="#78350f"/></linearGradient><radialGradient id="'+k+'g" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fef3c7"/><stop offset="1" stop-color="#fbbf24" stop-opacity="0"/></radialGradient></defs>'+'<ellipse cx="100" cy="158" rx="72" ry="9" fill="rgba(0,0,0,.35)"/><circle class="tv-glow" cx="100" cy="78" r="66" fill="url(#'+k+'g)"/><rect x="40" y="86" width="120" height="66" rx="12" fill="url(#'+k+'a)"/><rect x="40" y="86" width="120" height="14" fill="#92400e"/><rect x="90" y="96" width="20" height="24" rx="5" fill="#fde68a"/>'+'<g class="tv-lid"><path d="M36 86c0-24 18-36 64-36s64 12 64 36z" fill="#f59e0b"/><rect x="92" y="50" width="16" height="36" fill="#fde68a"/></g>'+'<g class="tv-pop"><rect x="80" y="40" width="40" height="32" rx="6" fill="#f472b6"/><rect x="76" y="32" width="48" height="12" rx="4" fill="#f9a8d4"/><rect x="96" y="32" width="8" height="40" fill="#fde68a"/></g>'+'<circle class="tv-s a" cx="48" cy="40" r="3" fill="#fde68a"/><circle class="tv-s b" cx="160" cy="34" r="2.5" fill="#fff"/><circle class="tv-s c" cx="168" cy="72" r="2" fill="#fde68a"/></svg>'
return'<svg class="tv-svg" viewBox="0 0 200 170" aria-hidden="true"><defs><linearGradient id="'+k+'a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7dd3fc"/><stop offset="1" stop-color="#2563eb"/></linearGradient></defs>'+'<ellipse cx="100" cy="158" rx="72" ry="9" fill="rgba(0,0,0,.35)"/><g stroke="#7dd3fc" stroke-width="3" stroke-dasharray="6 6" class="tv-link"><path d="M100 86L44 52M100 86L156 52M100 86L48 132M100 86L152 132"/></g>'+'<g class="tv-bob"><circle cx="100" cy="86" r="34" fill="url(#'+k+'a)"/><circle cx="100" cy="76" r="12" fill="#e0f2fe"/><path d="M80 106c4-12 12-17 20-17s16 5 20 17" fill="#e0f2fe"/></g>'+[[44,52,'#f472b6'],[156,52,'#a78bfa'],[48,132,'#34d399'],[152,132,'#fbbf24']].map((function(q,n){
return'<g class="tv-fr f'+n+'"><circle cx="'+q[0]+'" cy="'+q[1]+'" r="17" fill="'+q[2]+'"/><circle cx="'+q[0]+'" cy="'+(q[1]-5)+'" r="6" fill="#fff" opacity=".9"/><path d="M'+(q[0]-9)+' '+(q[1]+10)+'c2-6 6-8 9-8s7 2 9 8" fill="#fff" opacity=".9"/></g>'})).join('')+'</svg>'}function tvDeco(){
var P=[[6,10,.9,0],[82,6,.7,-3],[90,44,.8,-6],[4,52,.6,-2],[14,84,.75,-5],[78,80,.65,-1],[48,4,.5,-4]],art=window.__mxGiftArt
return'<span class="tv-deco" aria-hidden="true">'+P.map((function(p,n){return'<i style="left:'+p[0]+'%;top:'+p[1]+'%;--s:'+p[2]+';--d:'+p[3]+'s">'+(art?art('',['#f472b6','#a78bfa','#5eead4','#fbbf24'][n%4],['#9d174d','#4c1d95','#0f766e','#b45309'][n%4]):'')+'</i>'})).join('')+'</span>'}function tvCount(t){if(!t)return''
return'<span class="tv-cd" data-tcd="'+t+'">'+['дней','часов','минут','секунд'].map((function(u,n){return'<span><b data-u="'+n+'">—</b><small>'+u+'</small></span>'})).join('')+'</span>'}function tvHtml(m,T,paid){
var V=TV[m]||TV.pvp,h='<span class="tv-scene">'+tvDeco()+tvCount(T&&T.endsAt)+'<span class="tv-art">'+tvArt(m)+'</span>'+'<b class="tv-h">'+V.a+' <em>'+V.b+'</em></b><span class="tv-d">'+V.d+'</span></span>'
h+='<span class="tv-sec">Правила</span><span class="tv-rules">'+V.r.map((function(r,n){return'<span class="tv-rule"><i>'+(n+1)+'</i><span><b>'+r[0]+'</b><small>'+r[1]+'</small></span></span>'})).join('')+'</span>'
if(paid){h+='<span class="tv-sec">Призы<small>получат '+paid+' '+plural(paid,'игрок','игрока','игроков')+'</small></span><span class="tv-prz">'+[1,2,3].map((function(pl){var p=prizeOf(T,pl)
if(!p)return''
return'<span class="tv-pz p'+pl+'">'+pzHtml(p)+'<em>'+pl+' место</em><b>'+pzName(p)+'</b></span>'})).join('')+'</span>'
if(paid>3){var a=prizeOf(T,4),z=prizeOf(T,paid)
h+='<span class="tv-rest"><span>'+'4–'+paid+' места</span><b>'+(a&&a.gram!=null?gram(n2(a.gram)+(z&&z.gram!=null&&z.gram!==a.gram?' → '+n2(z.gram):'')):'')+'</b></span>'}}h+='<span class="tv-sec">Рейтинг</span>'
return h}function tvTick(){document.querySelectorAll('[data-tcd]').forEach((function(el){var s=Math.max(0,Math.floor((Number(el.getAttribute('data-tcd'))-Date.now())/1e3)),v=[Math.floor(s/86400),Math.floor(s%86400/3600),Math.floor(s%3600/60),s%60]
el.querySelectorAll('b[data-u]').forEach((function(b){var t=String(v[Number(b.getAttribute('data-u'))])
if(b.textContent!==t)b.textContent=t}))}))}function tRender(m,items,ok){var c=document.getElementById('leaderboardContent'),hero=document.getElementById('mxTourHero')
if(!c||!hero)return
var M=TM[m],T=TINFO[m],me=items.filter((function(p){return p.isMe}))[0],paid=paidN(T)
hero.style.setProperty('--tz',M.c)
hero.setAttribute('data-mode',m)
hero.className='tz-hero tv'
set(hero,tvHtml(m,T,paid))
tvTick()
var pz=document.getElementById('mxTourPrizes')
if(pz)pz.hidden=true
var tt=document.getElementById('ratingModeTitle')
if(tt)tt.textContent='Турниры'
c.classList.add('mx-lb')
c.setAttribute('data-mode',m)
var mine=document.getElementById('mxTourMine')
if(!mine){mine=document.createElement('div')
mine.id='mxTourMine'
mine.className='tz-mine'}if(mine.nextSibling!==c)c.parentNode.insertBefore(mine,c)
if(!ok){c.innerHTML='<div class="mx-lb-e">загрузка…</div>'
mine.hidden=true
return}c.innerHTML=items.length?items.map((function(p){var pr=prizeOf(T,p.place)
return'<div class="leaderboard-row'+(p.isMe?' me':'')+(p.place<=3?' top'+p.place:'')+(pr?' paid':'')+'"><span class="mx-lb-n">'+p.place+'</span><span class="mx-lb-a">'+esc(String(p.name||'?').charAt(0).toUpperCase())+'</span><span class="mx-lb-nm"><b>'+esc(p.name||'Игрок')+(p.isMe?' <i>ты</i>':'')+'</b><small>'+M.u+' '+tVal(m,p.netProfit)+'</small></span><span class="mx-lb-s">'+(pr?pzHtml(pr,'sm'):'<em class="z">—</em>')+'</span></div>'
})).join(''):'<div class="mx-lb-e">в этом турнире пока нет результатов — стань первым</div>'
mine.hidden=!items.length
if(items.length){var lastPaid=paid?items[Math.min(paid,items.length)-1]:null,need=''
if(me&&paid&&me.place>paid&&lastPaid)need='до призов: '+(m==='referrals'?Math.max(1,Math.ceil(lastPaid.netProfit-me.netProfit+1))+' '+plural(Math.ceil(lastPaid.netProfit-me.netProfit+1),'друг','друга','друзей'):n2(Math.max(0,lastPaid.netProfit-me.netProfit)))
var mp=me?prizeOf(T,me.place):null
set(mine,me?'<span class="tz-mn">#'+me.place+'</span><span class="tz-mb"><b>Ты</b><small>'+M.u+' '+tVal(m,me.netProfit)+'</small></span><span class="tz-ms">'+(mp?'<em>твой приз</em>'+pzHtml(mp,'sm'):need?'<em>'+need+'</em>':'')+'</span>':'<span class="tz-mb"><b>Тебя пока нет в рейтинге</b><small>'+M.s+' — сыграй, чтобы попасть</small></span>')}}function tLoad(m){TT=m
var q=++TRQ
document.querySelectorAll('.tournament-tab').forEach((function(b){b.classList.toggle('active',b.getAttribute('data-tab')===m)}))
var fr=document.querySelector('#leaderboardModal .tournament-tab-frame')
if(fr)fr.setAttribute('data-on',m)
var hero=document.getElementById('mxTourHero')
if(!hero&&fr){hero=document.createElement('div')
hero.id='mxTourHero'
hero.className='tz-hero tq'
fr.parentNode.insertBefore(hero,fr.nextSibling)}tRender(m,TCACHE[m]||[],!!TCACHE[m])
try{_socket.emit('rating:request',{limit:20,mode:m},(function(res){if(q!==TRQ)return
var items=res&&res.items||[]
if(m!=='pvp'&&(!res||res.mode!==m))items=[]
TINFO[m]=res&&res.tournament&&(m==='pvp'||res.mode===m)?res.tournament:null
TCACHE[m]=items
tRender(m,items,true)}))}catch(e){tRender(m,[],true)}}var TBK=0
function clock(t){var s=Math.max(0,Math.floor((t-Date.now())/1e3)),d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60),x=s%60
var p=function(v){return(v<10?'0':'')+v}
return d+':'+p(h)+':'+p(m)+':'+p(x)}function tBanner(t1,t2,endsAt){var k='tb'+ ++TBK
var art='<svg class="pb-art" viewBox="0 0 160 130" aria-hidden="true"><defs>'+'<linearGradient id="'+k+'g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b45309"/><stop offset=".35" stop-color="#fde68a"/><stop offset=".55" stop-color="#fbbf24"/><stop offset="1" stop-color="#92400e"/></linearGradient>'+'<linearGradient id="'+k+'b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#475569"/><stop offset="1" stop-color="#1e293b"/></linearGradient>'+'<radialGradient id="'+k+'c" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#7dd3fc"/><stop offset=".6" stop-color="#2563eb"/><stop offset="1" stop-color="#1e3a8a"/></radialGradient>'+'<linearGradient id="'+k+'p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f9a8d4"/><stop offset="1" stop-color="#db2777"/></linearGradient></defs>'+'<g class="pb-cup"><path d="M58 18h52l-3 30a23 23 0 0 1-46 0z" fill="url(#'+k+'g)"'+
'/><path d="M58 24H44a14 14 0 0 0 18 22" fill="none" stroke="url(#'+k+'g)" stroke-width="6" stroke-linecap="round"/><path d="M110 24h14a14 14 0 0 1-18 22" fill="none" stroke="url(#'+k+'g)" stroke-width="6" stroke-linecap="round"/>'+'<path d="M66 22h8l-2 26a14 14 0 0 1-6-6z" fill="#fff" opacity=".45"/><path d="M84 28l3.6 7.2 8 1.2-5.8 5.6 1.4 8L84 46.2 76.8 50l1.4-8-5.8-5.6 8-1.2z" fill="#fff7d6" opacity=".9"/>'+'<rect x="78" y="70" width="12" height="14" fill="url(#'+k+'g)"/><rect x="64" y="84" width="40" height="20" rx="4" fill="url(#'+k+'b)"/><rect x="70" y="90" width="28" height="6" rx="2" fill="url(#'+k+'g)" opacity=".85"/><ellipse cx="84" cy="18" rx="26" ry="4" fill="#fef3c7" opacity=".7"/></g>'+'<g class="pb-coin"><ellipse cx="30" cy="92" rx="22" ry="22" fill="#1e3a8a"/><circle cx="30" cy="88" r="21" fill="url(#'+k+'c)"/><path d="M22 80h16l5 7-13 13-13-13z" fill="#fff"/><circle cx="3'+
'0" cy="88" r="21" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="1.5"/></g>'+'<g class="pb-gift"><rect x="122" y="88" width="30" height="24" rx="4" fill="url(#'+k+'p)"/><rect x="119" y="81" width="36" height="9" rx="3" fill="#f472b6"/><rect x="134" y="81" width="6" height="31" fill="#fde68a"/><path d="M137 81c-3-9-14-10-14-4 0 4 8 4 14 4zm0 0c3-9 14-10 14-4 0 4-8 4-14 4z" fill="#fde68a"/></g></svg>'
return'<span class="pb"><i class="pb-beam" aria-hidden="true"></i><span class="pb-t"><b>'+t1+'</b><b class="ac">'+t2+'</b>'+(endsAt?'<em class="pb-tm" data-tclk="'+endsAt+'">'+clock(endsAt)+'</em>':'<em class="pb-tm">призы — подарки</em>')+'</span>'+art+'<i class="pb-sp a">✦</i><i class="pb-sp b">✦</i><i class="pb-sp c">✦</i><i class="pb-sp d">✦</i></span>'}function promoTour(){
document.querySelectorAll('.home-promo-slide[data-slide="1"]').forEach((function(sl){var want=RATT&&RATT.endsAt?2:1
if((sl.__tb||0)>=want)return
sl.__tb=want
if(want===1)rating((function(){}))
sl.classList.add('mx-tb-slide')
sl.innerHTML=tBanner('Турнир','недели',RATT&&RATT.endsAt)
sl.setAttribute('role','button')
sl.style.cursor='pointer'
if(!sl.__tbl){sl.__tbl=1
sl.addEventListener('click',(function(){try{openLeaderboard()}catch(e){}}))}}))}function tourCards(){var els=document.querySelectorAll('[data-tcard]')
if(!els.length)return
rating((function(it){var T=RATT,me=it.filter((function(p){return p.isMe}))[0],paid=paidN(T)
els.forEach((function(el){if(el.getAttribute('data-tcard')==='mini'){var p1=prizeOf(T,1)
set(el,'<span class="ln-m-art t"><i class="tq-rays" aria-hidden="true"></i>'+pzHtml(p1)+'<em class="ln-m-rib">приз за 1 место</em></span><span class="ln-m-b"><b>Турнир недели</b>'+(T&&T.endsAt?'<span class="ln-m-tm"><i></i><b data-tend="'+T.endsAt+'">'+left(T.endsAt)+'</b></span>':'<small>'+(p1?pzName(p1):'Арена')+'</small>')+'</span>')
return}var mp=me?prizeOf(T,me.place):null
set(el,tBanner('Турнир','недели',T&&T.endsAt)+'<span class="tq-f"><span>'+(me?'ты <b>#'+me.place+'</b>'+(mp?' · приз '+pzName(mp):''):'сыграй — попадёшь в рейтинг')+'</span><span class="tq-go">рейтинг →</span></span>')}))}))}window.switchTournamentTab=function(tab){tLoad(tab)}
var _olb=window.openLeaderboard
if(typeof _olb==='function')window.openLeaderboard=function(){var r=_olb.apply(this,arguments)
Promise.resolve(r).then((function(){tLoad(TT)}))
tLoad(TT)
return r}
function sheetOpen(){return document.querySelector('#marketFilterMenu.open, #marketSortMenu.open, #mxPop')}window.addEventListener('click',(function(e){var m=sheetOpen()
if(!m)return
var t=e.target
if(!t||!t.closest)return
if(t.closest('#marketFilterMenu, #marketSortMenu, #mxPop, #marketFilterBtn, #marketSortBtn, #mxInvFilter, #mxInvSort'))return
e.stopPropagation()
e.preventDefault()
try{closeMarketFilterMenu()}catch(x){}try{closeMarketSortMenu()}catch(x){}var p=document.getElementById('mxPop')
if(p)p.remove()}),true)
function sheetSync(){document.documentElement.classList.toggle('mx-sheet',!!sheetOpen())}try{new MutationObserver(sheetSync).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']})}catch(e){}function detActs(){var o=document.getElementById('marketGiftDetailOverlay')
if(!o||!o.classList.contains('open'))return
var id=null
try{id=Number(marketDetailListingId)}catch(e){}if(!id)return
var close=o.querySelector('button[onclick*="closeMarketGiftDetail"]')
if(!close)return
var box=document.getElementById('mxDetAct')
if(!box){box=document.createElement('span')
box.id='mxDetAct'
box.className='mx-det-act'
close.parentNode.insertBefore(box,close.nextSibling)}var f=isFav(id),c=isCart(id),sig=id+'|'+f+'|'+c
if(box.__s===sig)return
box.__s=sig
box.innerHTML='<button type="button" class="'+(f?'on':'')+'" aria-label="Избранное" onclick="toggleMarketGiftFavorite('+id+', event)">'+(f?I.heart.replace('fill="none"','fill="currentColor"'):I.heart)+'</button><button type="button" class="'+(c?'on':'')+'" aria-label="Корзина" onclick="toggleMarketGiftCart('+id+', event)">'+I.cart+'</button>'}document.addEventListener('click',(function(){
setTimeout((function(){try{detActs()}catch(e){}}),30)}),true)
window.mxMk=function(t,e){if(e)e.stopPropagation()
try{mkTab(marketActiveView===t?'main':t)}catch(x){}}
window.mxSrch=function(e){if(e)e.stopPropagation()
var on=document.documentElement.classList.toggle('mx-srch')
if(on)setTimeout((function(){var i=document.getElementById('marketSearchInput')
if(i)i.focus()}),60)}
window.mxDeals=function(e){if(e)e.stopPropagation()
try{openRecentHistory()
setTimeout((function(){switchHistoryTab('market')}),150)}catch(x){}}
function counters(){var C={all:0,fav:0,cart:0,inv:0}
try{C.all=MARKET_LISTINGS.length}catch(e){}try{C.fav=marketFavoriteIds.size}catch(e){}try{C.cart=marketCartIds.size}catch(e){}C.inv=inv().length
document.querySelectorAll('[data-cnt]').forEach((function(el){var v=String(C[el.getAttribute('data-cnt')]||0)
if(el.textContent!==v)el.textContent=v
el.classList.toggle('z',v==='0')}))
var MV='main'
try{MV=marketActiveView||'main'}catch(e){}[['marketFavoritesFab','fav','favorites'],['marketCartFab','cart','cart']].forEach((function(f){var b=document.getElementById(f[0])
if(!b)return
if(!b.querySelector('i[data-cnt]'))b.insertAdjacentHTML('beforeend','<i class="mx-fab-n" data-cnt="'+f[1]+'"></i>')
b.classList.toggle('on',MV===f[2])}))
document.querySelectorAll('#lxCats .lx-cat[data-t]').forEach((function(b){var on=b.getAttribute('data-t')===MV
if(b.classList.contains('on')!==on)b.classList.toggle('on',on)}))
document.querySelectorAll('[data-lv]').forEach((function(b){b.classList.toggle('act',MV==='main'&&LNV===b.getAttribute('data-lv'))}))
document.querySelectorAll('.lnm-sw').forEach((function(w){var v=MV==='main'?LNV:''
if(w.getAttribute('data-on')!==v)w.setAttribute('data-on',v)}))}window.mxPupTab=function(t,b){var p=document.querySelector('.pup')
if(!p)return
p.setAttribute('data-tab',t)
p.querySelectorAll('.pup-tabs button').forEach((function(x){x.classList.toggle('on',x===b)}))
if(t==='g'){var w=p.querySelector('.mx-chw')
if(w){w.classList.remove('mx-draw')
void w.offsetWidth
w.classList.add('mx-draw')}try{window.mxWave(1500)}catch(e){}}}
document.addEventListener('scroll',(function(e){var c=e.target
if(!c||!c.classList||!c.classList.contains('dk-rail'))return
var k=Math.round(c.scrollLeft/Math.max(1,(c.children[0]||{}).offsetWidth||1))
var d=c.parentNode.querySelectorAll('.dk-dots i')
d.forEach((function(x,j){x.classList.toggle('on',j===k)}))}),true)
function giftImg(g){var u=''
try{u=getGiftImageUrl(g)||''}catch(e){}return u?'<img src="'+u+'" alt="" loading="lazy" onerror="this.style.visibility=\'hidden\'">':''}function profile(){var G0=inv().sort((function(a,b){return gv(b)-gv(a)}))
var sh=document.getElementById('mxMyShelf')
if(sh)set(sh,G0.length?G0.slice(0,8).map((function(g){return'<span class="shp-g"><span class="shp-g-i" style="'+bg(g)+'">'+giftImg(g)+'</span><span class="shp-g-p">'+n2(gv(g))+'</span></span>'})).join(''):'<span class="shp-g-e">полка пустая — добавь подарки</span>')
var fan=document.getElementById('mxMyFan')
if(fan){var F=G0.slice(0,5)
set(fan,F.length?F.map((function(g,i){var k=i-(F.length-1)/2
return'<span class="dkp-gc" style="--r:'+(k*9).toFixed(1)+'deg;--x:'+(k*26).toFixed(1)+'px;--y:'+(Math.abs(k)*5).toFixed(1)+'px;'+bg(g)+'">'+giftImg(g)+'</span>'})).join(''):'<span class="dkp-gc e">?</span>')}var tg=document.getElementById('mxTopGifts')
if(tg)set(tg,'<div class="pup-top-h">Самые дорогие</div>'+(G0.length?G0.slice(0,3).map((function(g){return'<div class="pup-tg"><span class="pup-tg-i" style="'+bg(g)+'">'+giftImg(g)+'</span><span><b>'+nm(g)+'</b><small>#'+esc(g.number)+'</small></span>'+gram(n2(gv(g)))+'</div>'})).join(''):'<div class="pup-tg e">подарков пока нет</div>'))
var ho=document.getElementById('mxHoldings')
if(ho){var tot=G0.reduce((function(a,g){return a+gv(g)}),0)||1
set(ho,'<div class="bxp-hh"><span>актив</span><span>доля</span><span>цена</span></div>'+(G0.length?G0.slice(0,5).map((function(g){
return'<div class="bxp-hr"><span class="bxp-hn"><span class="bxp-hi" style="'+bg(g)+'">'+giftImg(g)+'</span><span><b>'+nm(g)+'</b><small>#'+esc(g.number)+' · '+esc(g.model||'—')+'</small></span></span><span class="bxp-hs">'+(gv(g)/tot*100).toFixed(0)+'%</span><span class="bxp-hp">'+n2(gv(g))+'</span></div>'})).join(''):'<div class="bxp-hr e">портфель пуст</div>'))}var LI=null
var bars=document.getElementById('mxRefBars')
if(bars){LI=LI||lvInfo()
set(bars,LI.L.map((function(l,i){var st=i<LI.cur?'done':i===LI.cur?'cur':'lock'
return'<span class="shp-bar '+st+'" style="--w:'+(40+i*20)+'%;--p:'+(st==='cur'?LI.p:st==='done'?1:0)+'"><em>'+esc(l.name)+'</em><u>'+l.pc+'%</u></span>'})).join(''))}var cards=document.getElementById('mxRefCards')
if(cards){LI=LI||lvInfo()
set(cards,LI.L.map((function(l,i){var st=i<LI.cur?'done':i===LI.cur?'cur':'lock'
return'<span class="dkp-rc '+st+'"><b>'+l.pc+'%</b><small>'+esc(l.name)+'</small>'+(st==='cur'?'<i style="--p:'+LI.p+'"></i>':'')+'</span>'})).join(''))}}function refp(){document.querySelectorAll('.rh15, .pup-gauge').forEach((function(r){var n=r.querySelector('[data-refp]')
if(n)r.style.setProperty('--p',n.style.getPropertyValue('--p')||'0')}))}function list(){var L=[]
try{L=sortMarketGiftsList(window.applyMarketFilter(MARKET_LISTINGS))}catch(e){}return L}function allCount(){try{return MARKET_LISTINGS.length}catch(e){return 0}}function grid(){return document.getElementById('marketGiftsGrid')}function setMode(on,cls){var g=grid()
if(!g)return
g.classList.toggle('mx-alt',on);['mx-shelves','mx-feed','mx-bento','mx-xch'].forEach((function(c){g.classList.toggle(c,on&&c===cls)}))}var SHELF_ALL=false
window.mxShelfAll=function(v){SHELF_ALL=!!v
window.renderMarketGifts()}
window.mxShelfCol=function(name){var i=document.getElementById('marketSearchInput')
if(!i)return
i.value=name
i.dispatchEvent(new Event('input',{bubbles:true}))}
function card12(it){var id=Number(it.listingId)
return'<div class="market-gift-tile mxt sh-card" data-listing-id="'+id+'" onclick="openMarketGiftDetail('+id+')"><span class="sh-card-img" style="'+bg(it)+'">'+im(it)+'</span>'+favBtn(id,'sh-fav')+'<span class="sh-card-b"><b>'+nm(it)+'</b><small>#'+esc(it.number)+'</small></span><span class="sh-card-f">'+gram(n2(it.price))+cartBtn(id,'sh-cart')+'</span></div>'}function card12v(it){
var id=Number(it.listingId)
return'<div class="market-gift-tile mxt sv-card" data-listing-id="'+id+'" onclick="openMarketGiftDetail('+id+')">'+'<span class="sv-case" style="'+bg(it)+'">'+im(it)+'<i class="sv-glass" aria-hidden="true"></i></span>'+'<span class="sv-tag"><i aria-hidden="true"></i>'+gram(n2(it.price))+'</span>'+favBtn(id,'sv-fav')+'<span class="sv-b"><b>'+nm(it)+'</b><small>#'+esc(it.number)+(it.model?' · '+esc(it.model):'')+'</small></span>'+'<span class="sv-f"><button type="button" class="sv-buy" onclick="mxBuyNow('+id+', event)">Купить</button>'+cartBtn(id,'sv-cart')+'</span></div>'
}function render12(){var L=list(),g=grid()
if(!g)return
var all=[]
try{all=MARKET_LISTINGS.slice()}catch(e){}var cols={}
all.forEach((function(it){var k=it.giftTitle||it.giftType;(cols[k]=cols[k]||[]).push(it)}))
var q=''
try{q=(document.getElementById('marketSearchInput').value||'').trim()}catch(e){}var chips='<button type="button" class="sv-col'+(q?'':' on')+'" onclick="mxShelfCol(\'\')"><span class="sv-col-i all">все</span><b>Все</b></button>'+Object.keys(cols).map((function(k){var a=cols[k]
return'<button type="button" class="sv-col'+(q===k?' on':'')+'" onclick="mxShelfCol(\''+esc(k).replace(/'/g,"\\'")+'\')"><span class="sv-col-i" style="'+bg(a[0])+'">'+im(a[0])+'</span><b>'+esc(k)+'</b></button>'})).join('')
var h='<div class="sv-cols">'+chips+'</div>'+(L.length?'<div class="sv-grid">'+L.map(card12v).join('')+'</div>':'<div class="mx-nf">Ничего не найдено</div>')
setMode(true,'mx-shelves')
g.innerHTML=h}function bentoPlan(n){var bc=0,wc=0,out=[]
function big(){return bc++%2?['sm','bigr','sm']:['big','sm','sm']}function wide(){return wc++%2?['wide','sm']:['sm','wide']}while(n>0){var bl=n===1?[['full']]:n===2?[wide()]:n===3?[big()]:n===4?[wide(),wide()]:n===5?[big(),wide()]:out.length%5===0?[big()]:[wide()]
bl.forEach((function(b){out=out.concat(b)
n-=b.length}))}return out}window.mxBentoPlan=bentoPlan
function bentoHtml(L){var plan=bentoPlan(L.length)
return'<div class="mx-bento-g">'+L.map((function(it,k){var id=Number(it.listingId),t=plan[k],big=t==='big'||t==='bigr',cls=big?'big'+(t==='bigr'?' bt-bigr':''):t
var sub='#'+esc(it.number)+(t!=='sm'&&it.model?' · '+esc(it.model):'')+(big&&it.backdrop?' · '+esc(it.backdrop):'')
return'<div class="market-gift-tile mxt bt bt-'+cls+'" data-listing-id="'+id+'" onclick="openMarketGiftDetail('+id+')">'+'<span class="bt-img" style="'+bg(it)+'">'+im(it)+'</span>'+favBtn(id,'bt-fav')+cartBtn(id,'bt-cart')+'<span class="bt-p">'+gram(n2(it.price))+'</span><span class="bt-i"><b>'+nm(it)+'</b><small>'+sub+'</small></span>'+(big||t==='full'?'<span class="bt-a"><button type="button" class="bt-buy" onclick="mxBuyNow('+id+', event)">Купить · '+n2(withFee(it.price))+'</button><button type="button" class="bt-off" onclick="mxOfferNow('+id+', event)">Оффер</button></span>':'')+'</div>'
})).join('')+'</div>'}function bentoFit(){document.querySelectorAll('.mx-bento-g').forEach((function(b){var W=b.clientWidth
if(!W)return
var gap=parseFloat(getComputedStyle(b).columnGap)||8,c=Math.floor((W-gap*2)/3)
if(b.__c!==c){b.__c=c
b.style.gridAutoRows=c+'px'}}))}window.addEventListener('resize',(function(){try{bentoFit()}catch(e){}}))
var LNV='feed'
window.mxLnView=function(v){LNV=v
window.renderMarketGifts()}
function card13(it){var id=Number(it.listingId)
var rar=[it.modelRarity,it.backdropRarity,it.patternRarity].filter((function(x){return x!=null})).map(Number),rr=rar.length?Math.min.apply(null,rar):null
return'<div class="market-gift-tile mxt ln-lot" data-listing-id="'+id+'" onclick="openMarketGiftDetail('+id+')">'+'<span class="ln-lot-img" style="'+bg(it)+'">'+im(it)+'<span class="ln-lot-tags"><i>#'+esc(it.number)+'</i>'+(rr!=null?'<i class="r">редкость '+rr+'%</i>':'')+'</span>'+favBtn(id,'ln-fav')+'</span>'+'<span class="ln-lot-b"><span class="ln-lot-t"><b>'+nm(it)+'</b><small>'+[it.model,it.backdrop,it.pattern].filter(Boolean).map(esc).join(' · ')+'</small></span>'+gram(n2(it.price),'big')+'</span>'+'<span class="ln-lot-a">'+cartBtn(id,'ln-cart')+'<button type="button" class="ln-off" onclick="mxOfferNow('+id+', event)">Оффер</button><button type="button" class="ln-buy" onclick="mxBuyNow('+id+', event)">Купить · '+n2(withFee(it.price))+'</button></span></div>'
}function render13(){var L=list(),g=grid()
if(!g)return
if(LNV==='grid'){setMode(false)
return}if(!L.length){setMode(true,'mx-feed')
g.innerHTML='<div class="mx-nf">Ничего не найдено</div>'
return}if(LNV==='bento'){setMode(true,'mx-bento')
g.innerHTML=bentoHtml(L)
bentoFit()
return}setMode(true,'mx-feed')
g.innerHTML='<div class="ln-lots">'+L.map(card13).join('')+'</div>'}var PV='bento'
var BENTO_IC=SV('<rect x="3" y="3" width="11" height="11" rx="2.5"/><rect x="16.5" y="3" width="4.5" height="4.5" rx="1.5"/><rect x="16.5" y="9.5" width="4.5" height="4.5" rx="1.5"/><rect x="3" y="16.5" width="4.5" height="4.5" rx="1.5"/><rect x="9.5" y="16.5" width="11.5" height="4.5" rx="1.5"/>')
function pvSync(){var b=document.getElementById('marketViewBtn')
if(b)b.classList.toggle('pv-bento',PV==='bento')}function pvBind(){var b=document.getElementById('marketViewBtn')
if(!b||b.__pv)return
b.__pv=1
b.insertAdjacentHTML('beforeend','<span class="mx-pv-ic">'+BENTO_IC+'</span>')
b.addEventListener('click',(function(e){if(APP){e.stopImmediatePropagation()
e.preventDefault()
var mv='grid'
try{mv=marketViewMode}catch(x){}PV=PV==='bento'?'grid':PV==='grid'?'list':'bento'
var want=PV==='list'?'list':'grid'
if(mv!==want){try{window.toggleMarketViewMode()}catch(x){}}pvSync()
window.renderMarketGifts()
return}if(PV==='grid'){e.stopImmediatePropagation()
e.preventDefault()
PV='bento'
pvSync()
window.renderMarketGifts()
return}setTimeout((function(){var m='grid'
try{m=marketViewMode}catch(x){}PV=m==='list'?'list':'grid'
pvSync()
window.renderMarketGifts()}),0)}),true)
pvSync()}function render15(){var L=list(),g=grid()
if(!g)return
pvBind()
if(PV!=='bento'){setMode(false)
return}if(!L.length){setMode(true,'mx-bento')
g.innerHTML='<div class="mx-nf">Ничего не найдено</div>'
return}setMode(true,'mx-bento')
g.innerHTML=bentoHtml(L)
bentoFit()}var XC={open:null,sort:'floor',dir:1}
window.mxXOpen=function(k){XC.open=XC.open===k?'':k
render16()}
window.mxXSort=function(s){if(XC.sort===s)XC.dir=-XC.dir
else{XC.sort=s
XC.dir=1}render16()}
function render16(){var L=list(),g=grid()
if(!g)return
var cols={}
L.forEach((function(it){var k=it.giftTitle||it.giftType;(cols[k]=cols[k]||[]).push(it)}))
var rows=Object.keys(cols).map((function(k){var a=cols[k].slice().sort((function(x,y){return x.price-y.price}))
return{k:k,a:a,floor:Number(a[0].price),max:Number(a[a.length-1].price),n:a.length}}))
rows.sort((function(x,y){var v=XC.sort==='n'?x.n-y.n:XC.sort==='name'?x.k.localeCompare(y.k):x.floor-y.floor
return v*XC.dir}))
if(XC.open==null&&rows[0])XC.open=rows[0].k
var ar=function(s){return XC.sort===s?XC.dir>0?I.up:I.down:''}
var h='<div class="bx-xh"><button type="button" onclick="mxXSort(\'name\')">Коллекция'+ar('name')+'</button><button type="button" onclick="mxXSort(\'floor\')">Флор'+ar('floor')+'</button><button type="button" onclick="mxXSort(\'n\')">Лотов'+ar('n')+'</button></div>'
if(!rows.length)h+='<div class="mx-nf">Ничего не найдено</div>'
rows.forEach((function(r){var on=XC.open===r.k
h+='<div class="bx-xr'+(on?' open':'')+'"><button type="button" class="bx-xr-h" onclick="mxXOpen(\''+esc(r.k).replace(/'/g,"\\'")+'\')"><span class="bx-xr-n"><span class="bx-xr-i" style="'+bg(r.a[0])+'">'+im(r.a[0])+'</span><b>'+esc(r.k)+'</b></span><span class="bx-xr-f">'+n2(r.floor)+'</span><span class="bx-xr-c">'+r.n+'</span>'+(on?I.up:I.down)+'</button>'
if(on)h+='<div class="bx-lots"><div class="bx-lots-h"><span>лот</span><span>цена</span><span></span></div>'+r.a.map((function(it){var id=Number(it.listingId)
return'<div class="market-gift-tile mxt bx-lot" data-listing-id="'+id+'" onclick="openMarketGiftDetail('+id+')"><span class="bx-lot-i" style="'+bg(it)+'">'+im(it)+'</span><span class="bx-lot-n"><b>#'+esc(it.number)+'</b><small>'+esc(it.model||'—')+' · '+esc(it.backdrop||'—')+'</small></span><span class="bx-lot-p">'+gram(n2(it.price))+'</span><span class="bx-lot-a">'+favBtn(id,'bx-ic')+cartBtn(id,'bx-ic')+'<button type="button" class="bx-buy" onclick="mxBuyNow('+id+', event)">Купить</button></span></div>'
})).join('')+'<div class="bx-lots-f">разброс цен '+n2(r.floor)+' – '+n2(r.max)+' GRAM</div></div>'
h+='</div>'}))
setMode(true,'mx-xch')
g.innerHTML=h}var R={12:render12,13:render13,15:render15,16:render16}[MM]
var _rmg=window.renderMarketGifts
if(typeof _rmg==='function')window.renderMarketGifts=function(){var r=_rmg.apply(this,arguments)
try{R()}catch(e){console.warn(e)}return r}
try{setTimeout((function(){window.renderMarketGifts()}),0)}catch(e){}function loop(){try{navInit()
navAva()
navSync()
topChip()}catch(e){}try{refp()
counters()
bentoFit()
detActs()}catch(e){}try{arts()
ticker()
avatars()
tour()}catch(e){}try{if(MM==='15'){home15()
invSum()}invTabs()}catch(e){}try{tourCards()
ticks()
tvTick()
promoTour()}catch(e){}try{feed()
tape()
diceTables()}catch(e){}try{profile()}catch(e){}}loop()
setInterval(loop,1e3)})();(function(){var reduce=false
try{reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}var _smv=window.setMenuView
if(typeof _smv!=='function')return
var running=null
var D=560,E='cubic-bezier(.65,0,.25,1)'
function el(id){return document.getElementById(id)}function strip(n){n.removeAttribute('id')
n.querySelectorAll('[id]').forEach((function(x){x.removeAttribute('id')}))
return n}function rel(r,pr){return{l:r.left-pr.left,t:r.top-pr.top,w:r.width,h:r.height}}function imp(n,props){for(var k in props)n.style.setProperty(k,props[k],'important')}function geo(b,o){o=o||{l:0,t:0}
return{left:(b.l-o.l).toFixed(1)+'px',top:(b.t-o.t).toFixed(1)+'px',width:b.w.toFixed(1)+'px',height:b.h.toFixed(1)+'px'}}function setGeo(n,g){n.style.left=g.left
n.style.top=g.top
n.style.width=g.width
n.style.height=g.height}function looks(cs){return{background:cs.backgroundColor,'background-image':cs.backgroundImage,border:cs.borderTopWidth+' solid '+cs.borderTopColor,'box-shadow':cs.boxShadow,'backdrop-filter':cs.backdropFilter||cs.webkitBackdropFilter||'none','-webkit-backdrop-filter':cs.webkitBackdropFilter||cs.backdropFilter||'none'}}var BARE={background:'none','background-image':'none',
border:'0','box-shadow':'none','backdrop-filter':'none','-webkit-backdrop-filter':'none','clip-path':'none'}
function take(){var bar=document.querySelector('.bottom-bar'),fab=el('navMarket'),slot=el('navArenaMarket')
if(!bar||!fab||!slot||!bar.offsetParent||!fab.offsetParent||!slot.offsetParent)return null
var par=bar.parentNode,pr=par.getBoundingClientRect()
slot.setAttribute('data-apslot','1')
var g=strip(bar.cloneNode(true))
slot.removeAttribute('data-apslot')
g.querySelectorAll('.is-active').forEach((function(x){x.classList.remove('is-active')}))
var gi=g.querySelector('.bottom-nav-indicator')
if(gi)imp(gi,{display:'none'})
var bcs=getComputedStyle(bar)
return{par:par,g:g,OB:rel(bar.getBoundingClientRect(),pr),OF:rel(fab.getBoundingClientRect(),pr),MR:rel(slot.getBoundingClientRect(),pr),dir:bcs.flexDirection,look:looks(bcs)}}function play(S){if(running)running()
var bar=document.querySelector('.bottom-bar'),fab=el('navMarket'),ind=el('bottomNavIndicator'),act=el('navArenaMarket')
if(!bar||!fab||!act)return
var pr=S.par.getBoundingClientRect(),NB=rel(bar.getBoundingClientRect(),pr),NF=rel(fab.getBoundingClientRect(),pr),A=rel(act.getBoundingClientRect(),pr)
if(!NB.w||!NF.w||!A.w)return
var L=NB.l<NF.l
var ov=[],anims=[]
function an(n,k,o){var a=n.animate(k,o)
anims.push(a)
return a}function layer(z){var n=document.createElement('div')
S.par.appendChild(n)
ov.push(n)
imp(n,{position:'absolute',margin:'0',right:'auto',bottom:'auto','pointer-events':'none',transform:'none',transition:'none','z-index':String(z),'box-sizing':'border-box'})
return n}if(ind)ind.getAnimations().forEach((function(a){try{a.finish()}catch(e){}}))
function shell(from,to,content,contentRect,z){var sh=layer(z)
imp(sh,S.look)
imp(sh,{'border-radius':'999px',overflow:'hidden'})
setGeo(sh,geo(from))
an(sh,[geo(from),geo(to)],{duration:D,easing:E,fill:'forwards'})
sh.appendChild(content)
imp(content,BARE)
imp(content,{position:'absolute',margin:'0',left:'0px',top:'0px',right:'auto',bottom:'auto',transform:'none',transition:'none','pointer-events':'none',width:contentRect.w+'px',height:contentRect.h+'px','flex-direction':content.__dir||'',opacity:'1',visibility:'visible'})
var bw=parseFloat(S.look.border)||0
function tr(sh0){return(contentRect.l-sh0.l-bw).toFixed(1)+'px '+(contentRect.t-sh0.t-bw).toFixed(1)+'px'}content.style.translate=tr(from)
an(content,[{translate:tr(from)},{translate:tr(to)}],{duration:D,easing:E,fill:'forwards'})
return sh}an(bar,[{opacity:0},{opacity:0}],{duration:D,fill:'forwards'})
an(fab,[{opacity:0},{opacity:0}],{duration:D,fill:'forwards'})
var g=S.g
g.__dir=S.dir
var gs=g.querySelector('[data-apslot]')
if(gs)gs.style.setProperty('visibility','hidden','important')
shell(S.OB,NF,g,S.OB,81);[].forEach.call(g.children,(function(c){if(c===gs||c.classList.contains('bottom-nav-indicator'))return
an(c,[{opacity:1},{opacity:0}],{duration:D*.45,easing:'ease-in',fill:'forwards'})}))
var nb=strip(bar.cloneNode(true))
nb.__dir=getComputedStyle(bar).flexDirection
var nAct=null
nb.querySelectorAll('.is-active').forEach((function(x){nAct=x}))
var nInd=nb.querySelector('.bottom-nav-indicator')
if(nAct)nAct.style.setProperty('visibility','hidden','important')
if(nInd)nInd.style.setProperty('display','none','important')
shell(S.OF,NB,nb,NB,82)
var realKids=[].filter.call(bar.children,(function(c){return c.offsetParent&&!c.classList.contains('bottom-nav-indicator')}));[].forEach.call(nb.children,(function(c,i){if(c===nAct||c.classList.contains('bottom-nav-indicator'))return
var real=bar.children[i]
if(!real||realKids.indexOf(real)<0)return
var cr=rel(real.getBoundingClientRect(),pr),d=L?(cr.l-NB.l)/NB.w:(NB.l+NB.w-cr.l-cr.w)/NB.w
an(c,[{opacity:0},{opacity:0,offset:Math.min(.6,d*.7)},{opacity:1}],{duration:D,easing:'ease-out',fill:'forwards'})}))
function rider(src,from,to,lit,z){var car=layer(z)
car.className='bottom-bar ap-car'
imp(car,BARE)
imp(car,{overflow:'visible',left:NB.l+'px',top:NB.t+'px',width:NB.w+'px',height:NB.h+'px',opacity:'1',visibility:'visible'})
if(lit){var pill=document.createElement('div')
pill.className='bottom-nav-indicator'
imp(pill,{position:'absolute',transition:'none',opacity:'1',margin:'0',transform:'none','z-index':'1',display:'block'})
car.appendChild(pill)
setGeo(pill,geo(from,NB))
an(pill,[geo(from,NB),geo(to,NB)],{duration:D,easing:E,fill:'forwards'})}var bt=strip(src.cloneNode(true))
bt.removeAttribute('data-apslot')
if(lit)bt.classList.add('is-active')
else bt.classList.remove('is-active')
imp(bt,{position:'absolute',margin:'0',flex:'none','min-width':'0','max-width':'none',transform:'none',transition:'none',opacity:'1',visibility:'visible','z-index':'2',display:'flex'})
car.appendChild(bt)
setGeo(bt,geo(from,NB))
an(bt,[geo(from,NB),geo(to,NB)],{duration:D,easing:E,fill:'forwards'})}var startA={l:S.OF.l+(S.OF.w-A.w)/2,t:S.OF.t+(S.OF.h-A.h)/2,w:A.w,h:A.h}
rider(act,startA,A,true,84)
if(gs)rider(gs,S.MR,{l:NF.l+(NF.w-S.MR.w)/2,t:NF.t+(NF.h-S.MR.h)/2,w:S.MR.w,h:S.MR.h},false,83)
var done=false
function end(){if(done)return
done=true
anims.forEach((function(a){try{a.cancel()}catch(e){}}))
ov.forEach((function(n){if(n.parentNode)n.parentNode.removeChild(n)}))
if(running===end)running=null}running=end
setTimeout(end,(D+40)*(window.__navTimeScale||1))}function isM(v){return v==='market'||v==='inventory'||v==='auction'}window.setMenuView=function(view){var before=document.body.classList.contains('market-mode'),snap=null
if(!reduce&&view!=='profile'&&isM(view)!==before){try{snap=take()}catch(e){}}var r=_smv.apply(this,arguments)
if(snap&&document.body.classList.contains('market-mode')!==before){try{play(snap)}catch(e){console.warn(e)}}return r}})();(function(){if(!document.documentElement.hasAttribute('data-app'))return
var SV=function(p){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>'}
var IC={tour:SV('<path d="M8 21h8M12 17v4M7 4h10"/><path d="M17 4v8a5 5 0 0 1-10 0V4"/><circle cx="5" cy="9" r="2"/><circle cx="19" cy="9" r="2"/>'),cases:SV('<path d="M3 8l9-5 9 5v8l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>'),
auction:SV('<path d="M13 10l7.383 7.418c.823 .82 .823 2.148 0 2.967a2.11 2.11 0 0 1 -2.976 0l-7.407 -7.385"/><path d="M6 9l4 4"/><path d="M13 10l-4 -4"/><path d="M3 21h7"/><path d="M6.793 15.793l-3.586 -3.586a1 1 0 0 1 0 -1.414l2.293 -2.293l.5 .5l3 -3l-.5 -.5l2.293 -2.293a1 1 0 0 1 1.414 0l3.586 3.586a1 1 0 0 1 0 1.414l-2.293 2.293l-.5 -.5l-3 3l.5 .5l-2.293 2.293a1 1 0 0 1 -1.414 0z"/>')}
function soon(title,ic){return'<div class="ap-soon"><h1>'+title+'</h1><div class="ap-soon-c"><span class="ap-soon-i">'+ic+'</span><b>Скоро</b><small>раздел в разработке</small></div></div>'}function put(host,html,after){if(!host||host.querySelector(':scope > .ap-soon'))return
var a=after&&host.querySelector(after)
if(a)a.insertAdjacentHTML('afterend',html)
else host.insertAdjacentHTML('afterbegin',html)}function screens(){put(document.querySelector('#casesScreen .screen-inner'),soon('Кейсы',IC.cases))
put(document.querySelector('#auctionScreen .screen-inner'),soon('Аукцион',IC.auction))
put(document.querySelector('#leaderboardModal .app-modal-card'),soon('Турниры',IC.tour))}var MAXG=9
function gifts(){document.querySelectorAll('#historyPanel .mx-strip').forEach((function(c){if(c.__ap)return
c.__ap=1
var g=c.querySelectorAll('.mx-gt')
if(g.length<=MAXG+1)return
c.classList.add('ap-many')
for(var k=MAXG;k<g.length;k++)g[k].classList.add('ap-more')
var n=g.length-MAXG
var b=document.createElement('button')
b.type='button'
b.className='ap-gmore'
b.innerHTML='+'+n+'<small>ещё</small>'
b.addEventListener('click',(function(e){e.stopPropagation()
var open=c.classList.toggle('ap-open')
b.innerHTML=open?'свернуть':'+'+n+'<small>ещё</small>'}))
c.appendChild(b)}))}function fltSum(k){try{if(k==='collection')return marketFilters.collection||''
var a=Array.from(marketFilters[k]||[])
if(!a.length)return''
return a[0]+(a.length>1?' +'+(a.length-1):'')}catch(e){return''}}var XI='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M7 7l10 10M17 7L7 17"/></svg>'
var CH='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>'
window.renderFilterRootView=function(){var T={collection:'Коллекция',models:'Модели',backdrops:'Фон',patterns:'Узор'}
var mn=marketFilters.priceMin!=null?marketFilters.priceMin:'',mx=marketFilters.priceMax!=null?marketFilters.priceMax:''
var inp=function(id,ph,v,k){return'<label class="ap-in"><input id="'+id+'" type="number" inputmode="decimal" placeholder="'+ph+'" value="'+v+'" oninput="onMarketFilterPriceInput()" onclick="event.stopPropagation()"><button type="button" class="ap-x" aria-label="Очистить" onclick="apFltClr(\''+k+'\', event)">'+XI+'</button></label>'}
return'<div class="ap-flt"><div class="ap-flt-l">Цена</div><div class="ap-flt-pr">'+inp('marketFilterPriceMin','от',mn,'min')+inp('marketFilterPriceMax','до',mx,'max')+'</div>'+['collection','models','backdrops','patterns'].map((function(k){var v=fltSum(k)
return'<div class="ap-flt-r'+(v?' on':'')+'"><button type="button" class="ap-flt-o" onclick="openFilterSection(\''+k+'\', event)"><span>'+T[k]+'</span>'+(v?'<em>'+String(v).replace(/[&<>"]/g,'')+'</em>':'<i>'+CH+'</i>')+'</button>'+(v?'<button type="button" class="ap-x" aria-label="Убрать фильтр «'+T[k]+'»" onclick="apFltClr(\''+k+'\', event)">'+XI+'</button>':'')+'</div>'})).join('')+'</div>'}
window.apFltClr=function(k,e){if(e){e.stopPropagation()
e.preventDefault()}try{if(k==='min')marketFilters.priceMin=null
else if(k==='max')marketFilters.priceMax=null
else if(k==='collection'){marketFilters.collection=null
marketFilters.models.clear()}else if(marketFilters[k])marketFilters[k].clear()
renderMarketFilterMenu()
renderMarketGifts()}catch(x){}}
var TGC=[['#ff885e','#ff516a'],['#ffcd6a','#ffa85c'],['#e0a2f3','#d669ed'],['#a0de7e','#54cb68'],['#53edd6','#28c9b7'],['#72d5fd','#2a9ef1'],['#ffa8a8','#ff719a']]
function ava(){var p=null
try{p=getCurrentPlayer()}catch(e){}if(!p)return
var id=parseInt(String(p.id||'').replace(/\D/g,'').slice(-9)||'0',10),c=TGC[Math.abs(id)%7];['profileAvatar','profileScreenAvatar'].forEach((function(x){var el=document.getElementById(x)
if(!el)return
var g='linear-gradient(180deg,'+c[0]+','+c[1]+')'
if(el.style.getPropertyValue('--ap-ava')!==g)el.style.setProperty('--ap-ava',g)
var m=/url\(["']?(.*?)["']?\)/.exec(el.style.backgroundImage||''),im=el.querySelector('img')
/* фото из Telegram твой код ставит фоном элемента, а новый дизайн красит фон градиентом поверх — показываем фото картинкой внутри */
if(m&&m[1]&&(!im||im.getAttribute('src')!==m[1])){var ni=document.createElement('img');ni.alt='';ni.src=m[1];el.textContent='';el.appendChild(ni)}
el.classList.toggle('ap-photo',!!el.querySelector('img'))}))}window.apInfo=function(o){var old=document.getElementById('apInfo')
if(old)old.remove()
var el=document.createElement('div')
el.id='apInfo'
el.className='ap-info'+(o.id?' '+o.id:'')
el.innerHTML='<div class="ap-info-c" role="dialog" aria-modal="true" aria-label="'+o.title+'">'+'<div class="ap-info-h"><span class="ap-info-t"><b>'+o.title+'</b></span><button type="button" class="ap-info-x" aria-label="Закрыть">'+XI+'</button></div>'+'<ol class="ap-info-l">'+o.steps.map((function(x,i){
return'<li><i>'+(i+1)+'</i><span>'+(x.t?'<b>'+x.t+'</b>':'')+'<small>'+x.d+'</small></span></li>'})).join('')+'</ol>'+(o.btn?'<button type="button" class="ap-info-ok">'+o.btn.label+'</button>':'')+'</div>'
var close=function(){el.classList.add('out')
setTimeout((function(){el.remove()}),200)
if(o.onClose)try{o.onClose()}catch(e){}}
el.addEventListener('click',(function(e){if(e.target===el||e.target.closest('.ap-info-x'))return close()
if(e.target.closest('.ap-info-ok')){if(o.btn&&o.btn.fn)try{o.btn.fn(e)}catch(x){}return close()}}))
document.body.appendChild(el)
requestAnimationFrame((function(){el.classList.add('in')}))
return el}
window.mxHelp=function(k){var h=(window.__mxHELP||{})[k]
if(!h)return
apInfo({id:'help-'+k,title:h.t,steps:h.s.map((function(x){return{t:x[0],d:x[1]}}))})}
window.openAddGiftModal=function(e){if(e&&e.stopPropagation)e.stopPropagation()
var u=typeof GIFT_DEPOSIT_USERNAME!=='undefined'?GIFT_DEPOSIT_USERNAME:'LM_GiftRelayer'
var nick='<a href="#" onclick="openGiftDepositAccount(event); return false;">@'+u+'</a>'
apInfo({id:'add-gift',title:'Как добавить подарок',steps:[{d:'Подарок должен быть коллекционным (NFT) — обычные подарки добавить нельзя.'},{d:'Открой свой NFT-подарок в профиле Telegram и нажми «Передать».'},{d:'Выбери получателя '+nick+' и подтверди передачу. Telegram может взять за передачу небольшую плату в звёздах.'},{
d:'Через несколько секунд подарок появится здесь, в инвентаре. Его можно продать на Market, поставить в Арене или вывести обратно.'}],btn:{label:'Открыть @'+u,fn:function(ev){openGiftDepositAccount(ev)}}})}
window.closeAddGiftModal=function(){var x=document.getElementById('apInfo')
if(x&&x.classList.contains('add-gift'))x.remove()}
var _orl=window.openReferralLevelsModal
if(typeof _orl==='function')window.openReferralLevelsModal=function(){var r=_orl.apply(this,arguments)
try{var body=document.getElementById('referralLevelsModalBody'),title=(document.getElementById('referralLevelsModalTitle')||{}).textContent||'Подробно о реферальной программе'
var steps=[].map.call(body.children,(function(it){var t=it.children[1]
if(!t)return null
return{t:t.children[0]?t.children[0].innerHTML:'',d:t.children[1]?t.children[1].innerHTML:t.innerHTML}})).filter(Boolean)
apInfo({id:'ref-info',title:title,steps:steps,onClose:function(){try{closeReferralLevelsModal()}catch(e){}}})}catch(e){}return r}
function invFill(){var g=document.getElementById('apInvGrid')
if(!g)return
var L=typeof INVENTORY_GIFTS!=='undefined'&&INVENTORY_GIFTS?INVENTORY_GIFTS:[]
var h=L.length?L.map((function(it){try{return buildInventoryGiftTileHtml(it)}catch(e){return''}})).join(''):''
if(g.__h!==h){g.__h=h
g.innerHTML=h}var e=document.getElementById('apInvEmpty')
if(e)e.hidden=!!L.length
var tot=0,sale=0
L.forEach((function(it){tot+=Number(it.price||it.activeListingPrice||it.floorPrice||0)
if(it.hasActiveListing)sale++}))
var m=document.getElementById('apInvMeta')
if(m)m.innerHTML=L.length+' '+(L.length%10===1&&L.length%100!==11?'подарок':L.length%10>=2&&L.length%10<=4&&(L.length%100<10||L.length%100>=20)?'подарка':'подарков')+' · на продаже '+sale+(tot?' · оценка '+tot.toFixed(2)+' GRAM':'')}window.apInvSheet=function(e){if(e&&e.stopPropagation)e.stopPropagation()
var old=document.getElementById('apInv')
if(old)old.remove()
var el=document.createElement('div')
el.id='apInv'
el.className='ap-sheet'
el.innerHTML='<div class="ap-sheet-c" role="dialog" aria-modal="true" aria-label="Мои подарки"><span class="ap-sheet-grab" aria-hidden="true"></span>'+'<div class="ap-info-h"><span class="ap-info-t"><b>Мои подарки</b><small id="apInvMeta"></small></span><button type="button" class="ap-inv-add" onclick="openAddGiftModal(event)">+ Подарок</button><button type="button" class="ap-info-x" aria-label="Закрыть">'+XI+'</button></div>'+'<div id="apInvGrid" class="ap-inv-g"></div><div id="apInvEmpty" class="ap-inv-e" hidden>Подарков пока нет — добавь первый через «+ Подарок»</div></div>'
var close=function(){el.classList.remove('in')
setTimeout((function(){el.remove()}),260)}
el.addEventListener('click',(function(ev){if(ev.target===el||ev.target.closest('.ap-info-x'))close()}))
var c=el.firstChild,y0=null
c.addEventListener('touchstart',(function(ev){if(c.scrollTop<=0)y0=ev.touches[0].clientY}),{passive:true})
c.addEventListener('touchmove',(function(ev){if(y0==null)return
var d=ev.touches[0].clientY-y0
if(d>0)c.style.transform='translateY('+d+'px)'}),{passive:true})
c.addEventListener('touchend',(function(ev){if(y0==null)return
var d=ev.changedTouches[0].clientY-y0
y0=null
c.style.transform=''
if(d>90)close()}))
document.body.appendChild(el)
invFill()
requestAnimationFrame((function(){el.classList.add('in')}))}
var _rig2=window.renderInventoryGifts
if(typeof _rig2==='function')window.renderInventoryGifts=function(){var r=_rig2.apply(this,arguments)
try{invFill()}catch(e){}return r}
function loop(){try{screens()}catch(e){}try{gifts()}catch(e){}try{ava()}catch(e){}try{invFill()}catch(e){}}loop()
setInterval(loop,700)
var moPend=false
try{new MutationObserver((function(){if(moPend)return
moPend=true
requestAnimationFrame((function(){moPend=false
try{gifts()}catch(e){}}))})).observe(document.body,{childList:true,subtree:true})}catch(e){}})();(function(){var R=document.documentElement
if(!R.hasAttribute('data-app'))return
var KEY='apAppBg'
var cv,cx,W=0,H=0,dpr=1,stars=[],mets=[],last=0,nextMet=0,raf=0,T=0
function rnd(a,b){return a+Math.random()*(b-a)}function still(){try{return R.classList.contains('no-animations')||window.matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}}function mkStar(top){var r=.35+Math.pow(Math.random(),2.2)*1.25
return{x:rnd(0,W),y:top?rnd(-20,0):rnd(0,H),r:r,a:rnd(.3,.95),tw:rnd(0,6.3),ts:rnd(.5,2.2),v:2.5+r*5}}function size(){dpr=R.classList.contains('lq')?1:Math.min(1.5,window.devicePixelRatio||1)
W=window.innerWidth
H=window.innerHeight
cv.width=Math.round(W*dpr)
cv.height=Math.round(H*dpr)
cx.setTransform(dpr,0,0,dpr,0,0)
var n=Math.max(70,Math.min(320,Math.round(W*H/2300)))
if(R.classList.contains('lq'))n=Math.round(n*.5)
falling=0
stars=[]
for(var i=0;i<n;i++)stars.push(mkStar(false))}var falling=0
function launch(){var c=stars.filter((function(s){return!s.f&&s.r>.6&&s.y>10&&s.y<H-10&&s.x>10&&s.x<W-10}))
if(!c.length)return
var s=c[Math.floor(Math.random()*c.length)],ang=Math.random()*Math.PI*2
s.f={dx:Math.cos(ang),dy:Math.sin(ang),v:s.v,acc:rnd(900,1500),age:0,life:rnd(.7,1.1)}
falling++}function frame(t){raf=0
if(document.hidden||skyOff()){last=0
return}if(!falling&&last&&t-last<31){raf=requestAnimationFrame(frame)
return}var dt=last?Math.min(.05,(t-last)/1e3):0
last=t
T+=dt
cx.clearRect(0,0,W,H)
for(var i=0;i<stars.length;i++){var s=stars[i],al=s.a*(.72+.28*Math.sin(T*s.ts+s.tw)),f=s.f
if(f){f.age+=dt
f.v+=f.acc*dt*Math.min(1,f.age*2.2)
s.x+=f.dx*f.v*dt
s.y+=f.dy*f.v*dt
var p=f.age/f.life
if(p>=1||s.x<-40||s.x>W+40||s.y<-40||s.y>H+40){falling--
stars[i]=mkStar(true)
stars[i].x=rnd(0,W*1.15)
continue}al*=p>.7?(1-p)/.3:1
var len=Math.min(120,f.v*.08),tx=s.x-f.dx*len,ty=s.y-f.dy*len
if(len>2){var g=cx.createLinearGradient(s.x,s.y,tx,ty)
g.addColorStop(0,'rgba(255,255,255,'+(al*.8).toFixed(3)+')')
g.addColorStop(1,'rgba(255,255,255,0)')
cx.strokeStyle=g
cx.lineWidth=Math.max(.6,s.r*1.2)
cx.lineCap='round'
cx.beginPath()
cx.moveTo(s.x,s.y)
cx.lineTo(tx,ty)
cx.stroke()}}else{s.y+=s.v*dt
s.x-=s.v*.18*dt
if(s.y>H+4||s.x<-4){stars[i]=s=mkStar(true)
s.x=rnd(0,W*1.15)}}cx.fillStyle='rgba(255,255,255,'+al.toFixed(3)+')'
if(s.r<.8)cx.fillRect(s.x,s.y,s.r*1.6,s.r*1.6)
else{cx.beginPath()
cx.arc(s.x,s.y,s.r,0,6.2832)
cx.fill()}}if(T>nextMet){launch()
nextMet=T+rnd(3.5,8)}if(still()){drawStill()
return}raf=requestAnimationFrame(frame)}function drawStill(){cx.clearRect(0,0,W,H)
falling=0
stars.forEach((function(s){s.f=null}))
stars.forEach((function(s){cx.fillStyle='rgba(255,255,255,'+s.a.toFixed(3)+')'
cx.beginPath()
cx.arc(s.x,s.y,s.r,0,6.2832)
cx.fill()}))}function skyOff(){return false}function go(){if(!cv||raf||skyOff())return
if(still()){drawStill()
return}last=0
raf=requestAnimationFrame(frame)}function sky(){var menu=document.getElementById('menu')
if(!menu||document.getElementById('apSky'))return
cv=document.createElement('canvas')
cv.id='apSky'
cv.setAttribute('aria-hidden','true')
cx=cv.getContext('2d')
menu.insertBefore(cv,menu.firstChild)
size()
nextMet=rnd(1.5,3)
go()
window.addEventListener('resize',(function(){size()
if(still())drawStill()}))
document.addEventListener('visibilitychange',go)
try{new MutationObserver(go).observe(R,{attributes:true,attributeFilter:['class']})}catch(e){}}var SYM={star:'M12 2.5l2.9 6.2 6.8.8-5 4.7 1.3 6.8L12 17.6 6 21l1.3-6.8-5-4.7 6.8-.8z',heart:'M12 20.5S3 15 3 8.8C3 6 5.1 4 7.6 4c1.8 0 3.3 1 4.4 2.5C13.1 5 14.6 4 16.4 4 18.9 4 21 6 21 8.8 21 15 12 20.5 12 20.5z',diamond:'M12 2.5l8.5 9.5-8.5 9.5L3.5 12z'}
function key(n){return String(n||'').toLowerCase().replace(/[^a-z0-9]/g,'')}function symSrc(n){var k=key(n)
if(window.__apSym&&window.__apSym[k])return window.__apSym[k]
try{if(typeof giftPatternIconUrl==='function'){var u=giftPatternIconUrl(n)
if(u)return u}}catch(e){}return null}var IMG={}
function loadImg(src,cb){if(!src)return cb(null)
var o=IMG[src]
if(o&&o.ok)return cb(o.im)
if(o&&o.bad)return cb(null)
if(!o){o=IMG[src]={cbs:[]}
var im=new Image
im.onload=function(){o.ok=1
o.im=im
o.cbs.forEach((function(f){f(im)}))
o.cbs=[]}
im.onerror=function(){o.bad=1
o.cbs.forEach((function(f){f(null)}))
o.cbs=[]}
im.src=src}o.cbs.push(cb)}var RINGS=[[70,6,26,.5],[128,9,23,.42],[190,13,21,.34],[255,16,19,.27],[325,20,17,.2],[400,24,15,.14],[480,28,14,.1],[565,32,13,.07]]
function drawPat(c,w,h,cx0,cy0,k,im){var p=new Path2D(SYM.star)
RINGS.forEach((function(r,ri){for(var i=0;i<r[1];i++){var a=i/r[1]*Math.PI*2+(ri%2?Math.PI/r[1]:0),x=cx0+Math.cos(a)*r[0]*k,y=cy0+Math.sin(a)*r[0]*.92*k,sz=r[2]*k*(im?1.25:1)
if(x<-sz||x>w+sz||y<-sz||y>h+sz)continue
c.globalAlpha=r[3]
if(im)c.drawImage(im,x-sz/2,y-sz/2,sz,sz)
else{c.save()
c.translate(x-sz/2,y-sz/2)
c.scale(sz/24,sz/24)
c.fillStyle='#000'
c.fill(p)
c.restore()}}}))
c.globalAlpha=1}var gcv,gcx,GB=null
function giftLayer(){if(gcv)return
var menu=document.getElementById('menu')
if(!menu)return
gcv=document.createElement('canvas')
gcv.id='apGift'
gcv.setAttribute('aria-hidden','true')
gcx=gcv.getContext('2d')
var sky0=document.getElementById('apSky')
menu.insertBefore(gcv,sky0?sky0.nextSibling:menu.firstChild)
window.addEventListener('resize',paintGift)}function paintGift(){if(!gcv||!GB)return
var d=Math.min(2,window.devicePixelRatio||1),w=window.innerWidth,h=window.innerHeight
gcv.width=Math.round(w*d)
gcv.height=Math.round(h*d)
gcx.setTransform(d,0,0,d,0,0)
gcx.clearRect(0,0,w,h)
var o=GB
var V={m:1,band:330}
loadImg(symSrc(o.p),(function(im){if(GB!==o)return
gcx.clearRect(0,0,w,h)
var off=document.createElement('canvas')
off.width=gcv.width
off.height=gcv.height
var oc=off.getContext('2d')
oc.setTransform(d,0,0,d,0,0)
drawPat(oc,w,h,w/2,210,w/420,im)
if(V.tint){oc.globalCompositeOperation='source-in'
oc.fillStyle=V.tint==='c'?o.c:V.tint
oc.fillRect(0,0,w,h)
oc.globalCompositeOperation='source-over'}var fade=V.top?h*V.top:V.band
if(fade){oc.globalCompositeOperation='destination-in'
var gr=oc.createLinearGradient(0,0,0,fade)
gr.addColorStop(0,'#000')
gr.addColorStop(.6,'rgba(0,0,0,.6)')
gr.addColorStop(1,'rgba(0,0,0,0)')
oc.fillStyle=gr
oc.fillRect(0,0,w,h)
oc.globalCompositeOperation='source-over'}gcx.setTransform(1,0,0,1,0,0)
gcx.globalAlpha=V.m
gcx.drawImage(off,0,0)
gcx.globalAlpha=1
gcx.setTransform(d,0,0,d,0,0)}))}window.apGiftBg=function(i){var g=gifts()[i]
if(!g)return
var o={c:g.backdropCenterColor,e:g.backdropEdgeColor,p:g.pattern||'',n:g.backdrop||''}
apply(o)
save(o)}
function gifts(){var inv=typeof INVENTORY_GIFTS!=='undefined'&&INVENTORY_GIFTS?INVENTORY_GIFTS:[],seen={},out=[]
inv.forEach((function(g){if(!g.backdropCenterColor)return
var k=(g.backdrop||g.backdropCenterColor)+'|'+(g.pattern||'')
if(seen[k])return
seen[k]=1
out.push(g)}))
return out}function apply(o){GB=o&&o.c&&o.e?o:null
if(GB){R.style.setProperty('--gb1',o.c)
R.style.setProperty('--gb2',o.e)
R.classList.add('ap-gbg')
giftLayer()
paintGift()}else{R.classList.remove('ap-gbg')
R.style.removeProperty('--gb1')
R.style.removeProperty('--gb2')
if(gcx)gcx.clearRect(0,0,gcv.width,gcv.height)
go()}try{paintCover()}catch(e){}}function cur(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){return null}}function save(o){try{if(o)localStorage.setItem(KEY,JSON.stringify(o))
else localStorage.removeItem(KEY)}catch(e){}}function esc(x){return String(x==null?'':x).replace(/[&<>"]/g,'')}function giftPic(g){var m='',f=''
try{if(typeof giftModelIconUrl==='function')m=giftModelIconUrl(g.giftTitle,g.model)||''}catch(e){}try{f=getGiftImageUrl(g)||''}catch(e){}if(!m&&!f)return''
return'<img class="ap-sw-m" src="'+esc(m||f)+'" alt="" loading="lazy"'+(m&&f?' data-f="'+esc(f)+'"':'')+' onload="this.classList.add(\'ok\')" onerror="var f=this.getAttribute(\'data-f\');if(f){this.removeAttribute(\'data-f\');this.className=\'ap-sw-f\';this.src=f}else{this.remove()}">'}function stdPrev(cv){var d=2,w=cv.clientWidth||96,h=cv.clientHeight||128,c=cv.getContext('2d')
cv.width=w*d
cv.height=h*d
c.setTransform(d,0,0,d,0,0)
var r=7
function rn(){r=(r*9301+49297)%233280
return r/233280}for(var i=0;i<46;i++){var s=.4+Math.pow(rn(),2)*1.3
c.fillStyle='rgba(255,255,255,'+(.35+rn()*.65).toFixed(2)+')'
c.beginPath()
c.arc(rn()*w,rn()*h,s,0,6.3)
c.fill()}var x=w*.68,y=h*.36,g=c.createLinearGradient(x,y,x-30,y-18)
g.addColorStop(0,'rgba(255,255,255,.95)')
g.addColorStop(1,'rgba(255,255,255,0)')
c.strokeStyle=g
c.lineWidth=1.2
c.lineCap='round'
c.beginPath()
c.moveTo(x,y)
c.lineTo(x-30,y-18)
c.stroke()
c.fillStyle='#fff'
c.beginPath()
c.arc(x,y,1.3,0,6.3)
c.fill()}function giftPrev(cv,g){var d=2,w=cv.clientWidth||96,h=cv.clientHeight||128,c=cv.getContext('2d')
cv.width=w*d
cv.height=h*d
c.setTransform(d,0,0,d,0,0)
loadImg(symSrc(g.pattern),(function(im){c.clearRect(0,0,w,h)
drawPat(c,w,h,w/2,h*.42,w/300,im)}))}window.apBgPick=function(){var old=document.getElementById('apBgp')
if(old)old.remove()
var G=gifts(),c=cur()
var el=document.createElement('div')
el.id='apBgp'
el.className='ap-info ap-bgp'
el.innerHTML='<div class="ap-info-c" role="dialog" aria-modal="true" aria-label="Фон приложения"><div class="ap-info-h"><span class="ap-info-t"><b>Фон приложения</b><small>Стандартный или фон любого твоего подарка</small></span><button type="button" class="ap-info-x" aria-label="Закрыть"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M7 7l10 10M17 7L7 17"/></svg></button></div>'+'<div class="ap-bgp-g"><button type="button" class="ap-bgp-t'+(c?'':' on')+'" data-i="-1"><span class="ap-sw std"><canvas class="ap-sw-cv"></canvas></span><b>Стандартный</b><small>звёздное небо</small></button>'+G.map((function(g,i){
var on=c&&c.c===g.backdropCenterColor&&c.e===g.backdropEdgeColor&&c.p===g.pattern
return'<button type="button" class="ap-bgp-t'+(on?' on':'')+'" data-i="'+i+'"><span class="ap-sw gift" style="--gb1:'+esc(g.backdropCenterColor)+';--gb2:'+esc(g.backdropEdgeColor)+'"><canvas class="ap-sw-cv"></canvas>'+giftPic(g)+'</span><b>'+esc(g.giftTitle||'Подарок')+'</b><small>'+esc(g.backdrop||'')+(g.pattern?' · '+esc(g.pattern):'')+'</small></button>'
})).join('')+'</div>'+(G.length?'':'<p class="ap-bgp-e">Добавь подарок в инвентарь — его фон и узор появятся здесь</p>')+'</div>'
var close=function(){el.classList.add('out')
setTimeout((function(){el.remove()}),200)}
el.addEventListener('click',(function(e){if(e.target===el||e.target.closest('.ap-info-x'))return close()
var t=e.target.closest('.ap-bgp-t')
if(!t)return
var i=Number(t.getAttribute('data-i')),g=G[i],o=g?{c:g.backdropCenterColor,e:g.backdropEdgeColor,p:g.pattern||'',n:g.backdrop||''}:null
apply(o)
save(o)
el.querySelectorAll('.ap-bgp-t').forEach((function(b){b.classList.toggle('on',b===t)}))}))
document.body.appendChild(el)
var cvs=el.querySelectorAll('.ap-sw-cv')
stdPrev(cvs[0])
G.forEach((function(g,i){giftPrev(cvs[i+1],g)}))
requestAnimationFrame((function(){el.classList.add('in')}))}
window.mxOpenBg=function(){return window.apBgPick()}
R.classList.remove('mx-has-bg')
R.style.removeProperty('--mx-b1')
R.style.removeProperty('--mx-b2')
var CV=null
function paintCover(){var host=document.getElementById('mxCoverBg')
if(!host)return
var w=host.clientWidth,h=host.clientHeight
if(!GB){if(CV){CV.remove()
CV=null}return}if(!w||!h)return
if(!CV||CV.parentNode!==host){CV=document.createElement('canvas')
host.appendChild(CV)}if(CV.__k===GB.p+GB.c+w+'x'+h)return
CV.__k=GB.p+GB.c+w+'x'+h
var d=Math.min(2,window.devicePixelRatio||1),c=CV.getContext('2d')
CV.width=Math.round(w*d)
CV.height=Math.round(h*d)
c.setTransform(d,0,0,d,0,0)
var o=GB
loadImg(symSrc(o.p),(function(im){if(GB!==o)return
c.clearRect(0,0,w,h)
drawPat(c,w,h,w/2,h*.52,w/420*.8,im)}))}setInterval(paintCover,800)
function init(){sky()
apply(cur())}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init)
else init()})();(function(){var R=document.documentElement
if(!R.hasAttribute('data-mix'))return
if(typeof window.shouldRenderScannerCanvasLive==='function'){window.shouldRenderScannerCanvasLive=function(){try{return currentMenuView==='scannerScreen'&&!document.hidden}catch(e){return false}}}var COV='.app-settings-overlay.open, .history-panel.open, .app-modal.open, #apInfo, #apInv, #apBgp, .mx-help, #mxBgSheet.open, .scanner-stake-settings-overlay.open'
function cov(){var c=!!document.querySelector(COV)
if(R.classList.contains('ap-cov')!==c)R.classList.toggle('ap-cov',c)}setInterval(cov,400)
var HEAVY='.au-lv, .rh15b, .rh12t, .home-promo-slide, .pu-tg, .ln-arena, .tv-scene, .sx15, .sx12, .sx13, .mx-cover, .pb'
var io='IntersectionObserver'in window?new IntersectionObserver((function(es){es.forEach((function(e){e.target.classList.toggle('ap-off',!e.isIntersecting)}))}),{rootMargin:'40px'}):null
function watch(){if(!io)return
document.querySelectorAll(HEAVY).forEach((function(el){if(el.__io)return
el.__io=1
io.observe(el)}))}watch()
setInterval(watch,1500)})();(function(){
var HTML="<div class=\"rf-ban\" aria-hidden=\"true\"><canvas class=\"rf-auc\" data-mode=\"curtain\" data-pal=\"pink\" data-y=\"0.08\" data-h=\"1.4\" data-jag=\"0.35\" data-amp=\"0.7\"></canvas><div class=\"rf-stars\"><i style=\"left:89.6%;top:82.3%;width:2.0px;height:2.0px;--a:0.53;--t:10.7s;--w:3.1s;--d:-13.6s;--d2:-3.5s\"></i><i style=\"left:0.4%;top:72.9%;width:2.4px;height:2.4px;--a:0.56;--t:15.0s;--w:2.3s;--d:-14.3s;--d2:-0.5s\"></i><i style=\"left:91.8%;top:42.6%;width:1.5px;height:1.5px;--a:0.77;--t:12.8s;--w:2.0s;--d:-1.1s;--d2:-0.7s\"></i><i style=\"left:76.5%;top:65.6%;width:1.5px;height:1.5px;--a:0.53;--t:15.6s;--w:3.0s;--d:-0.7s;--d2:-1.0s\"></i><i style=\"left:68.3%;top:83.0%;width:1.2px;height:1.2px;--a:0.86;--t:14.2s;--w:2.8s;--d:-0.5s;--d2:-3.1s\"></i><i style=\"left:40.2%;top:89.2%;width:1.2px;height:1.2px;--a:0.54;--t:12.5s;--w:3.1s;--d:-13.5s;--d2:-1.9s\"></i><i style=\""+
"left:56.5%;top:64.1%;width:1.0px;height:1.0px;--a:0.93;--t:9.8s;--w:3.4s;--d:-5.8s;--d2:-0.8s\"></i><i style=\"left:19.9%;top:93.9%;width:1.5px;height:1.5px;--a:0.86;--t:11.7s;--w:2.8s;--d:-0.0s;--d2:-0.4s\"></i><i style=\"left:22.2%;top:16.0%;width:2.4px;height:2.4px;--a:0.90;--t:11.2s;--w:2.2s;--d:-8.3s;--d2:-0.2s\"></i><i style=\"left:38.1%;top:49.4%;width:2.0px;height:2.0px;--a:0.69;--t:11.4s;--w:3.2s;--d:-9.1s;--d2:-0.2s\"></i><i style=\"left:64.8%;top:-4.0%;width:2.4px;height:2.4px;--a:0.87;--t:12.6s;--w:3.5s;--d:-9.0s;--d2:-0.5s\"></i><i style=\"left:29.0%;top:64.7%;width:1.0px;height:1.0px;--a:0.93;--t:9.2s;--w:3.5s;--d:-13.0s;--d2:-0.9s\"></i><i style=\"left:16.4%;top:-1.2%;width:1.5px;height:1.5px;--a:0.53;--t:9.3s;--w:2.5s;--d:-12.6s;--d2:-1.1s\"></i><i style=\"left:1.5%;top:76.8%;width:2.4px;height:2.4px;--a:0.61;--t:12.4s;--w:2.2s;--d:-15.4s;--d2:-2.7s\"></i><i style=\"left:2"+
"9.6%;top:-1.4%;width:2.4px;height:2.4px;--a:0.68;--t:10.0s;--w:2.7s;--d:-12.7s;--d2:-2.1s\"></i><i style=\"left:80.3%;top:61.3%;width:1.0px;height:1.0px;--a:0.60;--t:13.2s;--w:2.8s;--d:-5.6s;--d2:-3.3s\"></i><i style=\"left:27.7%;top:-0.2%;width:2.0px;height:2.0px;--a:0.89;--t:14.7s;--w:1.9s;--d:-12.6s;--d2:-3.1s\"></i><i style=\"left:20.3%;top:39.5%;width:1.2px;height:1.2px;--a:0.78;--t:12.8s;--w:1.8s;--d:-8.8s;--d2:-2.1s\"></i><i style=\"left:26.2%;top:-7.3%;width:2.0px;height:2.0px;--a:0.81;--t:13.1s;--w:2.8s;--d:-7.0s;--d2:-1.1s\"></i><i style=\"left:52.7%;top:58.8%;width:2.0px;height:2.0px;--a:0.89;--t:15.1s;--w:2.7s;--d:-15.3s;--d2:-0.2s\"></i><i style=\"left:22.4%;top:0.8%;width:1.2px;height:1.2px;--a:0.50;--t:12.4s;--w:1.7s;--d:-14.2s;--d2:-2.6s\"></i><i style=\"left:67.9%;top:-11.6%;width:1.2px;height:1.2px;--a:0.58;--t:12.2s;--w:2.3s;--d:-15.4s;--d2:-2.1s\"></i><i style=\"left:4"+
"9.6%;top:13.0%;width:1.2px;height:1.2px;--a:0.79;--t:9.6s;--w:1.7s;--d:-6.6s;--d2:-2.1s\"></i><i style=\"left:8.1%;top:-11.1%;width:1.0px;height:1.0px;--a:0.86;--t:9.6s;--w:1.7s;--d:-10.0s;--d2:-2.0s\"></i><i style=\"left:47.5%;top:65.9%;width:1.0px;height:1.0px;--a:0.49;--t:9.6s;--w:2.2s;--d:-7.4s;--d2:-1.6s\"></i><i style=\"left:14.9%;top:29.4%;width:1.2px;height:1.2px;--a:0.71;--t:10.0s;--w:3.4s;--d:-10.7s;--d2:-1.6s\"></i><i style=\"left:12.9%;top:96.4%;width:2.4px;height:2.4px;--a:0.51;--t:9.4s;--w:1.7s;--d:-10.3s;--d2:-0.3s\"></i><i style=\"left:10.4%;top:-12.3%;width:2.4px;height:2.4px;--a:0.79;--t:10.4s;--w:3.3s;--d:-1.3s;--d2:-0.0s\"></i><i style=\"left:76.3%;top:63.5%;width:1.0px;height:1.0px;--a:0.46;--t:10.8s;--w:2.8s;--d:-15.4s;--d2:-1.9s\"></i><i style=\"left:41.7%;top:88.4%;width:2.0px;height:2.0px;--a:0.71;--t:11.2s;--w:3.3s;--d:-10.2s;--d2:-2.5s\"></i><i style=\"left:13.2"+
"%;top:-10.5%;width:1.0px;height:1.0px;--a:0.55;--t:11.5s;--w:3.6s;--d:-6.5s;--d2:-0.0s\"></i><i style=\"left:97.7%;top:19.8%;width:1.5px;height:1.5px;--a:0.92;--t:9.2s;--w:2.5s;--d:-6.7s;--d2:-1.2s\"></i><i style=\"left:56.3%;top:86.3%;width:1.2px;height:1.2px;--a:0.94;--t:12.0s;--w:1.8s;--d:-4.8s;--d2:-1.7s\"></i><i style=\"left:92.5%;top:37.4%;width:1.2px;height:1.2px;--a:0.66;--t:11.3s;--w:1.7s;--d:-1.5s;--d2:-1.1s\"></i><i style=\"left:2.7%;top:9.3%;width:2.0px;height:2.0px;--a:0.65;--t:15.3s;--w:3.5s;--d:-1.4s;--d2:-3.5s\"></i><i style=\"left:96.2%;top:53.9%;width:1.0px;height:1.0px;--a:0.97;--t:13.7s;--w:2.4s;--d:-11.2s;--d2:-2.8s\"></i><i style=\"left:7.6%;top:62.0%;width:1.5px;height:1.5px;--a:0.68;--t:10.6s;--w:3.1s;--d:-12.2s;--d2:-2.9s\"></i><i style=\"left:50.2%;top:38.3%;width:1.2px;height:1.2px;--a:0.45;--t:15.4s;--w:2.0s;--d:-3.6s;--d2:-3.5s\"></i><i style=\"left:31.5%;top:"+
"-4.5%;width:2.0px;height:2.0px;--a:0.63;--t:13.9s;--w:2.6s;--d:-12.6s;--d2:-1.5s\"></i><i style=\"left:84.0%;top:29.8%;width:1.5px;height:1.5px;--a:0.77;--t:15.1s;--w:2.6s;--d:-5.7s;--d2:-3.4s\"></i><i style=\"left:20.2%;top:90.2%;width:1.5px;height:1.5px;--a:0.76;--t:14.6s;--w:3.2s;--d:-2.9s;--d2:-0.6s\"></i><i style=\"left:30.6%;top:87.1%;width:1.0px;height:1.0px;--a:0.60;--t:12.7s;--w:3.1s;--d:-6.8s;--d2:-3.5s\"></i><i style=\"left:9.4%;top:17.8%;width:1.2px;height:1.2px;--a:0.73;--t:12.4s;--w:3.6s;--d:-2.9s;--d2:-0.5s\"></i><i style=\"left:67.9%;top:70.5%;width:1.0px;height:1.0px;--a:0.48;--t:11.0s;--w:2.3s;--d:-9.3s;--d2:-1.9s\"></i><i style=\"left:95.1%;top:72.6%;width:2.0px;height:2.0px;--a:0.70;--t:11.4s;--w:3.1s;--d:-2.1s;--d2:-1.5s\"></i><i style=\"left:51.5%;top:81.5%;width:1.0px;height:1.0px;--a:0.76;--t:9.1s;--w:2.7s;--d:-0.8s;--d2:-2.8s\"></i></div><span class=\"rf-cn\" styl"+
"e=\"left:12cqw;bottom:22%;--dx:14cqw;--dy:-10cqw;animation-delay:-0.0s\"><svg viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"11\" fill=\"#2a9ef1\"/><path d=\"M7.5 8h9l2.6 3.3L12 18.5 4.9 11.3z\" fill=\"#fff\"/></svg></span><span class=\"rf-cn\" style=\"left:14cqw;bottom:36%;--dx:12cqw;--dy:-14cqw;animation-delay:-1.0s\"><svg viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"11\" fill=\"#2a9ef1\"/><path d=\"M7.5 8h9l2.6 3.3L12 18.5 4.9 11.3z\" fill=\"#fff\"/></svg></span><span class=\"rf-cn\" style=\"left:10cqw;bottom:48%;--dx:15cqw;--dy:-8cqw;animation-delay:-2.0s\"><svg viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"11\" fill=\"#2a9ef1\"/><path d=\"M7.5 8h9l2.6 3.3L12 18.5 4.9 11.3z\" fill=\"#fff\"/></svg></span><span class=\"rf-cn\" style=\"right:12cqw;bottom:22%;--dx:-14cqw;--dy:-10cqw;animation-delay:-0.5s\"><svg viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\""+
"11\" fill=\"#2a9ef1\"/><path d=\"M7.5 8h9l2.6 3.3L12 18.5 4.9 11.3z\" fill=\"#fff\"/></svg></span><span class=\"rf-cn\" style=\"right:14cqw;bottom:36%;--dx:-12cqw;--dy:-14cqw;animation-delay:-1.5s\"><svg viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"11\" fill=\"#2a9ef1\"/><path d=\"M7.5 8h9l2.6 3.3L12 18.5 4.9 11.3z\" fill=\"#fff\"/></svg></span><span class=\"rf-cn\" style=\"right:10cqw;bottom:48%;--dx:-15cqw;--dy:-8cqw;animation-delay:-2.5s\"><svg viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"11\" fill=\"#2a9ef1\"/><path d=\"M7.5 8h9l2.6 3.3L12 18.5 4.9 11.3z\" fill=\"#fff\"/></svg></span><div class=\"rf-tx\"><h2>Приглашай<em class=\"rf-mint\">друзей</em></h2><span class=\"rf-total\"><svg class=\"rf-dia\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"11\" fill=\"#2a9ef1\"/><path d=\"M7.5 8h9l2.6 3.3L12 18.5 4.9 11.3z\" fill=\"#fff\"/></svg> до 15% с каждого друга<"+
"/span></div><div class=\"rf-g rf-gl\" data-rfg=\"streetbeast\"></div><div class=\"rf-g rf-gr\" data-rfg=\"hula_girl\"></div></div>"
var FILES={streetbeast:'streetbeast_noBG.json',hula_girl:'hula_girl_noBG.json'}
var P={edge:'rgba(220,255,220,',low:'rgba(90,245,150,',mid:'rgba(60,210,170,',hi:'rgba(190,110,220,',top:'rgba(240,90,170,'}
function sprite(){var c=document.createElement('canvas')
c.width=1
c.height=128
var g=c.getContext('2d')
var gr=g.createLinearGradient(0,128,0,0)
gr.addColorStop(0,P.edge+'.95)')
gr.addColorStop(.08,P.low+'.85)')
gr.addColorStop(.35,P.mid+'.5)')
gr.addColorStop(.7,P.hi+'.22)')
gr.addColorStop(.92,P.top+'.1)')
gr.addColorStop(1,P.top+'0)')
g.fillStyle=gr
g.fillRect(0,0,1,128)
return c}var SPR=null
var CUR=[{y:.5,c:.3,ds:.21,h:.62,a:.95,ph:0},{y:.42,c:.7,ds:-.17,h:.55,a:.75,ph:2.1},{y:.56,c:.5,ds:.13,h:.5,a:.6,ph:4.3}]
var DY=.08,CH=1.4,JG=.35,AM=.7
function aurora(cv,ban){var cx=cv.getContext('2d'),W=0,H=0,d=window.__lq()?1:Math.min(2,window.devicePixelRatio||1)
SPR=SPR||sprite()
function size(){W=cv.clientWidth
H=cv.clientHeight
if(!W)return
cv.width=Math.round(W*d)
cv.height=Math.round(H*d)
cx.setTransform(d,0,0,d,0,0)}function draw(t){cx.clearRect(0,0,W,H)
cx.globalCompositeOperation='lighter'
CUR.forEach((function(c){var mid=W*(c.c+.24*Math.sin(t*c.ds+c.ph)),half=W*.7,L=mid-half,R=mid+half
var STP=window.__lq()?3:2
for(var x=Math.max(L,-3);x<Math.min(R,W+3);x+=STP){var u=x/W,p=(x-L)/(R-L),e=Math.pow(Math.max(0,Math.sin(Math.PI*p)),.7)
var yb=H*(c.y+DY+AM*.08*Math.sin(u*10+t*.22+c.ph)+JG*(.05*Math.sin(u*23-t*.31)+.045*Math.sin(u*23+t*.9+c.ph)+.03*Math.sin(u*57-t*1.4)))
var I=e*c.a*(.62+.2*Math.sin(u*38+t*1.8+c.ph)+.12*Math.sin(u*71-t*1.4))
var hh=H*c.h*CH*(.7+.2*Math.sin(u*9+t*.6+c.ph))
cx.globalAlpha=Math.min(1,I)
cx.drawImage(SPR,x,yb-hh,STP+1,hh)}}))
cx.globalAlpha=1
cx.globalCompositeOperation='source-over'}var raf=0
function frame(ms){raf=0
if(!ban.__on)return
if(ms-(cv.__lt||0)<30){raf=requestAnimationFrame(frame);return}cv.__lt=ms
if(!W||((cv.__rs=(cv.__rs||0)+1)%30===0&&cv.width!==Math.round(cv.clientWidth*d)))size()
if(W)draw(ms/1e3)
raf=requestAnimationFrame(frame)}return{play:function(){if(!raf)raf=requestAnimationFrame(frame)},pause:function(){if(raf)cancelAnimationFrame(raf)
raf=0}}}function giftData(name){if(window.__RF_GIFTS&&window.__RF_GIFTS[name])return{obj:window.__RF_GIFTS[name]}
try{if(typeof REFERRAL_GIFT_DATA!=='undefined'&&REFERRAL_GIFT_DATA[FILES[name]])return{text:REFERRAL_GIFT_DATA[FILES[name]]}}catch(e){}return{file:FILES[name]}}function gift(el,name,i){var D=giftData(name)
if(!D.obj&&window.__DotLottieWorker){try{var cv=document.createElement('canvas')
cv.style.cssText='width:100%;height:100%;display:block'
el.appendChild(cv)
return new window.__DotLottieWorker(Object.assign({canvas:cv,loop:true,autoplay:false,workerId:'referral-gifts-'+i%2,renderConfig:{devicePixelRatio:window.__mdpr(),autoResize:true}},D.text?{data:D.text}:{src:new URL(D.file,location.href).href}))}catch(e){el.innerHTML=''}}var LT=window.__RF_LOT||window.lottie
if(!LT||!LT.loadAnimation)return null
try{var a=LT.loadAnimation(Object.assign({container:el,renderer:'svg',loop:true,autoplay:false},D.obj?{animationData:JSON.parse(JSON.stringify(D.obj))}:D.text?{animationData:JSON.parse(D.text)}:{path:D.file}))
if(a.setSubframe)a.setSubframe(false)
return a}catch(e){return null}}function sync(ban){var on=ban.__vis&&!document.hidden
if(on===ban.__on)return
ban.__on=on
ban.classList.toggle('rf-pause',!on)
if(ban.__au)on?ban.__au.play():ban.__au.pause();(ban.__an||[]).forEach((function(a){try{on?a.play():a.pause()}catch(e){}}))}function startGifts(ban){if(ban.__an)return
ban.__an=[]
ban.querySelectorAll('[data-rfg]').forEach((function(el,i){var a=gift(el,el.getAttribute('data-rfg'),i)
if(a)ban.__an.push(a)}))
ban.__on=null
sync(ban)}var io='IntersectionObserver'in window?new IntersectionObserver((function(es){es.forEach((function(e){var b=e.target
b.__vis=e.isIntersecting&&e.intersectionRatio>0
sync(b)}))}),{threshold:[0,.01]}):null
function mount(sl){if(sl.__rf)return
sl.__rf=1
sl.classList.add('rf-slide')
var w=document.createElement('div')
w.innerHTML=HTML
var ban=w.firstChild
sl.appendChild(ban)
ban.__au=aurora(ban.querySelector('.rf-auc'),ban)
ban.__vis=!io
ban.__on=null
if(io)io.observe(ban)
else sync(ban)
if(window.__RF_GIFTS||window.__DotLottieWorker||window.__dotLottieFailed)startGifts(ban)
else{var go=function(){window.removeEventListener('dotlottie-ready',go)
startGifts(ban)}
window.addEventListener('dotlottie-ready',go)
setTimeout(go,2500)}}function run(){document.querySelectorAll('.home-promo-slide-referral').forEach(mount)
if(document.documentElement.hasAttribute('data-app'))document.querySelectorAll('.home-promo-track > .home-promo-slide:not(.home-promo-slide-referral)').forEach((function(sl){sl.remove()}))}document.addEventListener('visibilitychange',(function(){document.querySelectorAll('.rf-ban').forEach(sync)}))
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run)
else run()})()

/* ===== Единые крестики закрытия во всём приложении — как в окне победителя ===== */
;(function(){var CLS=['closeBtn','panel-close-btn','app-settings-close','scanner-stake-settings-close','scanner-result-close-btn','mx-help-x','ro-x']
function is(e){if(!e||e.nodeType!==1||!e.classList||e.classList.contains('apx')||e.classList.contains('ww-x')||e.closest('.ww'))return false
for(var i=0;i<CLS.length;i++)if(e.classList.contains(CLS[i]))return true
if(e.tagName!=='BUTTON')return false
var t=(e.textContent||'').trim(),al=e.getAttribute('aria-label')||''
if(t.length===1&&/[✕×✖✗]/.test(t))return true
if(!t&&/^(Закрыть|Close)$/i.test(al)&&e.querySelector('svg'))return true
return false}
function fix(e){e.classList.add('apx')
e.innerHTML='<i aria-hidden="true">✕</i>'
if(!e.getAttribute('aria-label'))e.setAttribute('aria-label','Закрыть')}
function scan(r){if(!r||r.nodeType!==1)return
if(is(r))fix(r)
if(r.querySelectorAll){var l=r.querySelectorAll('button,.closeBtn')
for(var i=0;i<l.length;i++)if(is(l[i]))fix(l[i])}}
var Q=[],T=0
function flush(){T=0
var q=Q
Q=[]
for(var i=0;i<q.length;i++)scan(q[i])}
function start(){scan(document.body)
if(!('MutationObserver'in window))return
new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var a=ms[i].addedNodes
for(var j=0;j<a.length;j++)if(a[j].nodeType===1)Q.push(a[j])
if(ms[i].type==='characterData'||ms[i].target&&ms[i].target.nodeType===1&&ms[i].addedNodes.length&&ms[i].target.tagName==='BUTTON')Q.push(ms[i].target)}
if(Q.length&&!T)T=requestAnimationFrame(flush)}).observe(document.body,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start()})();

/* ===== Пока висит экран загрузки — заранее грузим всё тяжёлое,
   чтобы после входа в приложение ничего не догружалось и не тормозило =====
   Ждём (но не дольше 5 с): шрифты, движок анимаций dotLottie, файлы статуэток,
   готовые к показу картинки на странице; создаём плееры статуэток на паузе. */
;(function(){function wait(ms){return new Promise(function(r){setTimeout(r,ms)})}
function fontsReady(){try{return document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()}catch(e){return Promise.resolve()}}
function lottieReady(){return new Promise(function(r){if(window.__DotLottieWorker||window.__dotLottieFailed)return r()
window.addEventListener('dotlottie-ready',function(){r()},{once:true})})}
function statues(){try{return Promise.all(REFERRAL_GIFT_FILES.map(function(g){if(REFERRAL_GIFT_DATA[g.file])return 0
return fetch(g.file).then(function(x){return x.text()}).then(function(t){REFERRAL_GIFT_DATA[g.file]=t}).catch(function(){})}))}catch(e){return Promise.resolve()}}
function images(){var l=[].slice.call(document.images||[]).filter(function(i){return i.src&&!i.complete}).slice(0,40)
return Promise.all(l.map(function(i){return(i.decode?i.decode():Promise.resolve()).catch(function(){})}))}
var P=null
window.__bootWarm=function(){if(P)return P
var all=Promise.all([fontsReady(),lottieReady(),statues(),images()]).then(function(){try{if(typeof ensureReferralGiftAnimsLoaded==='function')ensureReferralGiftAnimsLoaded()}catch(e){}return wait(200)})
P=Promise.race([all,wait(5000)])
return P}
try{window.__bootWarm()}catch(e){}})();

/* Карточки уровней: круг с подарком подгоняется под карточку — растёт, пока зазор до текста
   и плашек слева не станет равен зазору до стенок карточки. Плюс бегунок прогресса: сумма под
   точкой не вылезает за края, а подписи «начало/конец» шкалы прячутся, когда она их перекрывает. */
;(function(){var G=4,MIN=60
function rr(e){if(!e)return null;var r;if(e.tagName==='SMALL'){var g=document.createRange();g.selectNodeContents(e);r=g.getBoundingClientRect()}else r=e.getBoundingClientRect()
if(!r.width)return null;var k=e.tagName==='SPAN'?(parseFloat(getComputedStyle(e).borderTopLeftRadius)||0):0
return{l:r.left,r:r.right,t:r.top,b:r.bottom,k:Math.min(k,r.width/2,r.height/2)}}
function fitOrb(c,cr){var o=c.querySelector('.au-orb');if(!o)return
var ob=[].map.call(c.querySelectorAll('.au-st>span,.au-n small,.au-n b,.au-n .mx-tag'),rr).filter(Boolean)
var tr=c.querySelector('.au-tr'),cap=tr?tr.getBoundingClientRect().top-cr.top-6-G:999
var best=MIN/2
for(var r=MIN/2;r<=80;r+=.5){var cx=cr.width-G-r,cy=G+r,ok=cy+r<=cap
for(var j=0;ok&&j<ob.length;j++){var q=ob[j],k=q.k,L=q.l-cr.left+k,R=q.r-cr.left-k,T=q.t-cr.top+k,B=q.b-cr.top-k
var dx=Math.max(L-cx,0,cx-R),dy=Math.max(T-cy,0,cy-B);if(Math.hypot(dx,dy)-k-r<G)ok=false}
if(!ok)break;best=r}
c.style.setProperty('--orb',(best*2).toFixed(1)+'px')}
function fitBubble(c){var pg=c.querySelector('.au-pg'),em=pg&&pg.querySelector('.au-tr u em');if(!em)return
em.style.setProperty('--sh','0px')
var P=pg.getBoundingClientRect(),E=em.getBoundingClientRect(),sh=0
if(E.left<P.left)sh=P.left-E.left;else if(E.right>P.right)sh=P.right-E.right
em.style.setProperty('--sh',sh.toFixed(1)+'px')
var l=E.left+sh-6,r=E.right+sh+6
;[].forEach.call(pg.querySelectorAll('.au-ends>span'),function(s){s.style.visibility='';var q=s.getBoundingClientRect()
if(q.right>l&&q.left<r)s.style.visibility='hidden'})}
function fit(c){var cr=c.getBoundingClientRect();if(!cr.width)return
fitBubble(c);fitOrb(c,cr)}
function all(){[].forEach.call(document.querySelectorAll('.au-lv'),fit)}
var ro=window.ResizeObserver?new ResizeObserver(function(es){es.forEach(function(e){fit(e.target)})}):null
function scan(){[].forEach.call(document.querySelectorAll('.au-lv'),function(c){if(c.__orb)return;c.__orb=1;if(ro)ro.observe(c);fit(c)})}
scan()
new MutationObserver(function(){requestAnimationFrame(scan)}).observe(document.documentElement,{childList:true,subtree:true})
window.addEventListener('resize',all)
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(all)})();
