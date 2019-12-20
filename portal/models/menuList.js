/**
 *
 * create by lyq
 *
 * @flow
 */
import lugiax from "@lugia/lugiax";
import React from "react";

const model = "menuList";
const state = {
  menuState: {
    value: null
  },
  hasActivityKeyDefaultData: [
    {
      title: '首页',
      content: <div>首页</div>,
      key: '0',
      hideCloseBtn: true
    }
  ],
  activityValue: '0'
};

const Menulist = lugiax.register({
  model,
  state,
  mutations: {
    sync: {
      onSelect(state, inParam, { mutations }) {
        const { value } = inParam;
        const hasActivityKeyDefaultData = state.get("hasActivityKeyDefaultData").toJS
          ? state.get("hasActivityKeyDefaultData").toJS()
          : state.get("hasActivityKeyDefaultData");

        const activekey = hasActivityKeyDefaultData.toJS ? hasActivityKeyDefaultData.toJS().length : hasActivityKeyDefaultData.length
        const item = {
          title: inParam.text,
          content: `${value}`,
          key: activekey
        }

        hasActivityKeyDefaultData.push(item);

        let stateValue = mutations.onTabAdd(activekey);

        return stateValue.set("hasActivityKeyDefaultData", hasActivityKeyDefaultData);
      },
      onTabAdd(state, inKey) {
        return state.set("activityValue", inKey);
      },
      onTabDelete(state, data, { mutations }) {
        const hasActivityKeyDefaultData = state.get("hasActivityKeyDefaultData").toJS
          ? state.get("hasActivityKeyDefaultData").toJS()
          : state.get("hasActivityKeyDefaultData");
        const activekey = hasActivityKeyDefaultData.toJS ? hasActivityKeyDefaultData.toJS().length - 2 : hasActivityKeyDefaultData.length - 2;

        let deleteData = mutations.onTabAdd(activekey);
        return deleteData.set("hasActivityKeyDefaultData", data);
      }
    }
  }
});

export default Menulist;
