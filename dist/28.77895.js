(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{131:function(t,s,i){},168:function(t,s,i){"use strict";var e=i(131);i.n(e).a},217:function(t,s,i){"use strict";i.r(s);var e=i(3),n=(i(62),{mixins:[e.a],name:"banner",data:function(){return{swiper:null,showStyle:1,signStyle:1,bannerIndex:0,pIndex:0,switchstyle:"slide",first:!0,isInit:!0}},created:function(){this.switchstyle=this.msg.style.switchstyle},computed:{paddingLeft:function(){return this.msg.style.paddingLeft},showStyle:function(){return this.swiper&&(this.swiper.destroy(),this.initSwiper()),this.msg.style.showStyle},signStyle:function(){return this.swiper&&(this.swiper.destroy(),this.initSwiper()),this.msg.style.signStyle},effect:function(){return this.msg.style.switchstyle},delay:function(){return this.msg.style.delay},list:function(){return this.msg.imgArr},num:function(){return this.msg.imgArr.length},showPagination:function(){return"left"!=this.msg.style.textAlign}},watch:{effect:function(){this.swiper&&(this.swiper.destroy(),this.initSwiper(),this.first=!0,this.bannerIndex=0)},bannerIndex:function(){},delay:function(){this.swiper&&(this.swiper.destroy(),this.initSwiper(),this.first=!0,this.bannerIndex=0)},paddingLeft:function(){var t=this;this.swiper&&setTimeout((function(){t.swiper.destroy(),t.initSwiper(),t.bannerIndex=0,t.first=!0}),100)},num:function(){var t=this;setTimeout((function(){t.swiper.destroy(),t.initSwiper(),t.first=!0,t.bannerIndex=0}),100)},list:{handler:function(){this.swiper&&(this.swiper.destroy(),this.initSwiper(),this.bannerIndex=0,this.first=!0)},immediate:!0,deep:!0}},methods:{initSwiper:function(){var t=this;this.swiper&&this.swiper.destroy();var s=this,i=this.$refs.images.getElementsByClassName("swiper-container")[0];setTimeout((function(){t.isInit=!0,t.swiper=new Swiper(i,{loop:!0,effect:s.effect,autoplay:{delay:t.delay,stopOnLastSlide:!1,disableOnInteraction:!0},cssMode:!1,preventClicksPropagation:!1,preventClicks:!1,allowTouchMove:!1,on:{slideChange:function(){s.bannerIndex=this.activeIndex,s.isInit?s.bannerIndex=0:1==this.activeIndex||2==this.activeIndex?s.bannerIndex=1:this.activeIndex==s.list.length+1?s.bannerIndex=0:s.bannerIndex=this.activeIndex-1}}}),t.isInit=!1}),50)}},mounted:function(){var t=this;this.$nextTick((function(){t.initSwiper()}))}}),a=(i(168),i(0)),l=Object(a.a)(n,(function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{ref:"images",staticClass:"images",class:{shadow:t.msg.isOnclick&&t.msg.isShow,noheight:!t.msg.isShow},style:{paddingLeft:t.paddingLeft+"px",paddingRight:t.paddingLeft+"px",paddingTop:t.msg.isShow?t.msg.style.paddingTop+"px":0,paddingBottom:t.msg.isShow?t.msg.style.paddingTop+"px":0},on:{mousedown:function(s){return t.comDown(s)}}},[i("div",{staticClass:"swiper-container"},[i("div",{staticClass:"swiper-wrapper"},t._l(t.list,(function(s,e){return i("div",{key:e,staticClass:"swiper-slide item"},[i("div",{staticClass:"img",class:{set:s.src},style:{backgroundImage:"url("+s.src+")"}},[s.src?t._e():i("div",{staticClass:"bac"}),t._v(" "),""!==s.title&&void 0!==s.title?i("p",{ref:"p",refInFor:!0},[t._v(t._s(s.title))]):t._e()])])})),0),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!this.msg.style.signStyle&&t.showPagination,expression:"!this.msg.style.signStyle && showPagination"}],staticClass:"my-pagination",style:{textAlign:t.msg.style.textAlign}},t._l(t.list,(function(s,e){return i("span",{key:e,class:{active:e==t.bannerIndex},style:{background:e==t.bannerIndex?t.msg.style.colorActive:t.msg.style.colorCur}})})),0),t._v(" "),1==this.msg.style.signStyle&&t.showPagination?i("div",{staticClass:"my-pagination",style:{textAlign:t.msg.style.textAlign}},t._l(t.list,(function(s,e){return i("span",{key:e,staticClass:"type2",class:{active:e==t.bannerIndex},style:{background:e==t.bannerIndex?t.msg.style.colorActive:t.msg.style.colorCur}})})),0):t._e(),t._v(" "),2==this.msg.style.signStyle&&t.showPagination?i("div",{staticClass:"my-pagination",style:{textAlign:t.msg.style.textAlign}},t._l(t.list,(function(s,e){return i("span",{key:e,staticClass:"type3",class:{active3:e==t.bannerIndex},style:{background:e==t.bannerIndex?t.msg.style.colorActive:t.msg.style.colorCur}})})),0):t._e(),t._v(" "),3==this.msg.style.signStyle&&t.showPagination?i("div",{staticClass:"my-pagination",style:{textAlign:t.msg.style.textAlign}},t._l(t.list,(function(s,e){return i("span",{key:e,staticClass:"type4",class:{active4:e==t.bannerIndex},style:{color:e==t.bannerIndex?t.msg.style.colorActive:t.msg.style.colorCur}},[t._v(t._s(e+1))])})),0):t._e(),t._v(" "),4==this.msg.style.signStyle&&t.showPagination?i("div",{staticClass:"my-pagination",style:{textAlign:t.msg.style.textAlign}},[i("span",{staticClass:"type5"},[i("span",{staticClass:"active4",style:{color:t.msg.style.colorActive}},[t._v(t._s(t.pIndex))]),t._v("\n        /\n        "),i("span",{style:{color:t.msg.style.colorCur}},[t._v(t._s(t.list.length))])])]):t._e()]),t._v(" "),i("span",{staticClass:"no"},[t._v("\n    "+t._s(t.delay)+t._s(t.effect)+" "+t._s(t.showStyle)+t._s(t.signStyle)+" "+t._s(t.switchstyle)+t._s(t.num)+"\n  ")])])}),[],!1,null,null,null);s.default=l.exports}}]);