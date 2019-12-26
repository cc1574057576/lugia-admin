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
      activityKey: 'Tab1',
      hideCloseBtn: true
    }
  ],
  activityValue: 'Tab1',
  activityValueArr: ['Tab1']
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

        const activityValueArr = state.get("activityValueArr").toJS
          ? state.get("activityValueArr").toJS()
          : state.get("activityValueArr");

        const activekey = hasActivityKeyDefaultData.toJS ? hasActivityKeyDefaultData.toJS().length : hasActivityKeyDefaultData.length
        // console.log(activekey)

        let activeRouter = '';

        // console.log('onSelect111');
        hasActivityKeyDefaultData.some((routerTitle) => {
          // console.log(routerTitle);
          // console.log(routerTitle.activityKey);
          if (routerTitle.router === value) {
            activeRouter = routerTitle.activityKey
          }
          // console.log("activeRouter", activeRouter);
          return activeRouter;
        });
        // console.log('onSelect111');

        const routerKey = hasActivityKeyDefaultData.some((routerTitle) => {
          return routerTitle.router === value
        })

        if (routerKey) {
          const item = {
            activityKey: activeRouter
          }
          go({ url: value });
          let stateRouter = mutations.onTabChange(item);
          stateRouter.set("hasActivityKeyDefaultData", hasActivityKeyDefaultData);
          return false;
        }

        const itemActive = `Tab${activekey + 1}`;
        const items = {
          title: inParam.text,
          router: `${value}`,
          activityKey: itemActive
        }

        activityValueArr.push(itemActive);
        hasActivityKeyDefaultData.push(items);

        let stateValue = mutations.onTabChange(items);

        let stateactivityValueArr = stateValue.set("activityValueArr", activityValueArr);


        go({ url: value });

        return stateactivityValueArr.set("hasActivityKeyDefaultData", hasActivityKeyDefaultData);
      },
      onTabChange(state, inData) {
        if (inData.click === "click") {
          go({ url: inData[0] });

          return state.set("activityValue", inData[1]);
        } else {
          go({ url: inData.router });

          return state.set("activityValue", inData.activityKey);
        }
      },
      onTabDelete(state, data, { mutations }) {

        const hasActivityKeyDefaultData = state.get("hasActivityKeyDefaultData").toJS
          ? state.get("hasActivityKeyDefaultData").toJS()
          : state.get("hasActivityKeyDefaultData");

        const activityValueArr = state.get("activityValueArr").toJS
          ? state.get("activityValueArr").toJS()
          : state.get("activityValueArr");

        if (activityValueArr.length > 1) {

          const deleteRouter = hasActivityKeyDefaultData[activityValueArr.indexOf(data.activityKey) - 1].router;

          const deleteActivityValue = activityValueArr[activityValueArr.indexOf(data.activityKey) - 1];

          const deleteActivityValueFilter = activityValueArr[activityValueArr.indexOf(data.activityKey)];

          const deleteArr = {
            router: deleteRouter,
            activityKey: deleteActivityValue
          };

          let deleteActivityValueArr = [];
          let deleteActivityValueData = deleteActivityValueFilter;

          deleteActivityValueArr = activityValueArr.filter(child => {

            // console.log('onDeleteClick222');
            // console.log(child)
            // console.log(deleteActivityValueData)
            // console.log('onDeleteClick222');
            return child !== deleteActivityValueData;
          });

          // console.log('deleteActivityValueArr');
          // console.log(deleteActivityValueArr);
          // console.log(activityValueArr.length);
          // console.log('deleteActivityValueArr');

          let deleteData = mutations.onTabChange(deleteArr);
          let deleteValueArr = deleteData.set("activityValueArr", deleteActivityValueArr);
          return deleteValueArr.set("hasActivityKeyDefaultData", data);
        } else {
          return false;
        }
      }
    }
  }
});

export default Menulist;
