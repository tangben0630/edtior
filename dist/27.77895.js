(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{151:function(t,s,e){},188:function(t,s,e){"use strict";var i=e(151);e.n(i).a},220:function(t,s,e){"use strict";e.r(s);var i={mixins:[e(2).a],data:function(){return{}},props:{sets:{type:Array},setData:{type:Object}},methods:{choose:function(t){switch(this.sets.forEach((function(t){t.isActive=!1})),this.sets[t].isActive=!0,this.item.attr){case"showarea":this.setData.isShowGroup=this.sets[t].isShowGroup;break;case"header":this.setData.isUseHeight=this.sets[t].isUseHeight,this.$store.state.pageList[this.$store.state.pageIndex].setting.isUseHeight=this.setData.isUseHeight}}},mounted:function(){}},a=(e(188),e(0)),n=Object(a.a)(i,(function(){var t=this,s=t.$createElement,e=t._self._c||s;return"header"!=t.item.attr||t.setData.isPageMove?e("div",{staticClass:"container"},[e("div",{staticClass:"title"},[t._v(t._s(t.item.title))]),t._v(" "),e("div",{staticClass:"wrap"},t._l(t.sets,(function(s,i){return e("div",{key:i,staticClass:"left item",on:{click:function(s){return t.choose(i)}}},[e("p",{staticClass:"choose-icon",class:{active:s.isActive}}),t._v(" "),e("div",{staticClass:"text-box"},[t._v(t._s(s.name))])])})),0)]):t._e()}),[],!1,null,"0764a4de",null);s.default=n.exports}}]);