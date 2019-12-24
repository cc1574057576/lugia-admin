/**
 *
 * create by lyq
 *
 * @flow
 */
import lugiax from "@lugia/lugiax";
import { go } from "@lugia/lugiax-router";

const model = "menuList";
const state = {
  menuState: {
    value: null
  },
  hasActivityKeyDefaultData: [
    {
      title: '首页',
      router: '/dashboard/analyse',
      key: 0,
      hideCloseBtn: true
    }
  ],
  activityValue: 0
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
          router: `${value}`,
          key: activekey
        }

        hasActivityKeyDefaultData.push(item);

        let stateValue = mutations.onTabAdd(activekey);

        go({ url: value });

        return stateValue.set("hasActivityKeyDefaultData", hasActivityKeyDefaultData);
      },
      onTabAdd(state, inKey) {
        const hasActivityKeyDefaultData = state.get("hasActivityKeyDefaultData").toJS
          ? state.get("hasActivityKeyDefaultData").toJS()
          : state.get("hasActivityKeyDefaultData");

        if (hasActivityKeyDefaultData[inKey]) {
          let value = hasActivityKeyDefaultData[inKey].router;
          go({ url: value });

        }
        return state.set("activityValue", inKey);
      },
      onTabDelete(state, data, { mutations }) {
        let deleteData = mutations.onTabAdd(data.activityKey - 1);
        return deleteData.set("hasActivityKeyDefaultData", data);
      }
    }
  }
});

export default Menulist;
