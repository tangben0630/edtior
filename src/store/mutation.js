
import common from "@assets/js/common"
const mutation = {
  updateTemplateList (state, obj) { //组件列表
    let oldValue = state.pageList[state.pageIndex].templateList[obj.oldIndex]
    state.pageList[state.pageIndex].templateList.splice(obj.oldIndex, 1)
    state.pageList[state.pageIndex].templateList.splice(obj.newIndex, 0, oldValue)
  }, //
  changePageFlag (state, bool) { //更改当前组件数据
    state.pageList[state.pageIndex].isPageSet = bool;
    state.pageList[state.pageIndex].nowCommponent = bool ? null : state.pageList[state.pageIndex].nowCommponent;
  },
  changeCurTempList (state, flag) { // 修改数据
    if(flag){
      state.curTemplateList.forEach(item => {
        if(item.title == "头部"){
          item.isDisabled = true;
        }
      });
    }
  },
  changeNowComponent (state, com) { //更改当前组件数据
    state.isAdd = com.isAdd ? true : false
    if (state.pageList[state.pageIndex].nowCommponent && state.pageList[state.pageIndex].nowCommponent.id !== com.id) {
      state.isDrop = false;
      setTimeout(() => {
        state.isDrop = true;
      }, 0)
    }
    state.pageList[state.pageIndex].nowCommponent = com
    state.pageList[state.pageIndex].isPageSet = false;
  },
  changeGlobalNavComponent (state, com) {
    if (state.pageList[state.pageIndex].nowCommponent && state.pageList[state.pageIndex].nowCommponent.id !== com.id) {
      state.isDrop = false;
      setTimeout(() => {
        state.isDrop = true;
      }, 0)
    }
    state.pageList[state.pageIndex].nowCommponent = com
    state.pageList[state.pageIndex].isPageSet = false;
  },
  changeAddComponent (state, com) { //更改当前待添加组件数据
    let obj = common.deepClone(com)
    state.pageList[state.pageIndex].addCommponent = obj
  },
  addComponent (state, index) { //添加组件
    state.pageList[state.pageIndex].templateList.splice(index, 0, state.pageList[state.pageIndex].addCommponent)
  },
  chat (state, obj) {
    state.nowChatList.push(obj)
    setTimeout(() => {
      const height = document.getElementById('midlist').getElementsByClassName('__view')[0].offsetHeight
      const div = document.getElementById('midlist').getElementsByClassName('__panel')[0]
      div.scrollTop = height - 423
    }, 20)

  }
}


export default mutation