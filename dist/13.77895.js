(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{152:function(t,e,s){},189:function(t,e,s){"use strict";var a=s(152);s.n(a).a},226:function(t,e,s){"use strict";s.r(e);var a={mixins:[s(2).a],data:function(){return{}},computed:{isActive:function(){var t;switch(this.item.attr){case"showarea":t=this.setData.isUseTitle;break;case"header":t=this.setData.isPageMove}return t}},methods:{deal:function(){switch(this.item.attr){case"showarea":this.setData.isUseTitle=!this.setData.isUseTitle;break;case"header":this.setData.isPageMove=!this.setData.isPageMove,this.$store.state.pageList[this.$store.state.pageIndex].setting.isPageMove=this.setData.isPageMove,this.setData.isPageMove?this.$store.state.pageList[this.$store.state.pageIndex].setting.isUseHeight=this.setData.isUseHeight:this.$store.state.pageList[this.$store.state.pageIndex].setting.isUseHeight=!0}},inputFn:function(t){this.setData.areaTitle=t.target.value}}},i=(s(189),s(0)),n=Object(i.a)(a,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("div",{staticClass:"title"},[t._v(t._s(t.item.title))]),t._v(" "),s("div",{staticClass:"wrap"},[s("div",{staticClass:"left item",on:{click:t.deal}},[s("p",{staticClass:"choose-icon",class:{active:t.isActive}}),t._v(" "),s("div",{staticClass:"text-box"},[t._v(t._s(t.item.selectText))])]),t._v(" "),t.item.isUse?s("div",{staticClass:"right"},[s("input",{attrs:{type:"text",maxlength:"6"},domProps:{value:t.setData.areaTitle},on:{input:function(e){return e.stopPropagation(),e.preventDefault(),t.inputFn(e)}}})]):t._e()])])}),[],!1,null,"678709e6",null);e.default=n.exports}}]);