/**
 *
 * create by Cc
 *
 *
 */

import React from 'react';
import { Theme, Tabs } from '@lugia/lugia-web';
import Widget from "@lugia/lugia-web/dist/consts/index";
import menuList from "../../models/menuList";
import { connect } from "@lugia/lugiax";

class PageTabs extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      width: 900
    };
  }

  componentWillMount() {
    const viewWidth = this.getWindowWidth() - 210; // 210为导航栏的宽度
    this.setState({
      width: viewWidth
    });
    window.onresize = () => {
      const viewWidth = this.getWindowWidth() - 210;
      this.setState({
        width: viewWidth
      });
    };
  }
  getWindowWidth = () => {
    return document.body.clientWidth;
  };

  onDeleteClick = (activityKey) => {
    const data = this.props.hasActivityKeyDefaultData;
    let newdata = [];
    if (data.length > 1) {
      newdata = data.filter(child => {

        console.log('onDeleteClick222');
        console.log(activityKey);
        console.log(activityKey.activityValue);
        console.log(child)
        console.log('onDeleteClick222');
        return child.activityKey !== activityKey.activityValue;
      });
    }

    newdata.activityKey = activityKey.activityValue
    console.log('onDeleteClick333');
    console.log(newdata);
    console.log(newdata.activityKey);
    console.log('onDeleteClick333');
    this.props.onTabDelete(newdata);
  };
  tabsClick = (clickData) => {
    const { newItem } = clickData;
    // console.log("tabsClick");
    // console.log(clickData);
    // console.log(newItem.router);
    // console.log(clickData.activityKey);
    // console.log("tabsClick");
    let tabsClickData = [newItem.router, clickData.activityValue]
    tabsClickData.click = "click"
    this.props.onTabChange(tabsClickData)
  }

  render() {
    // console.log("pageTabsRender");
    // console.log(this.props.activityValue);
    // console.log("pageTabsRender");
    const { width } = this.state;
    const view = {
      [Widget.Tabs]: {
        TitleContainer: {
          normal: {
            width,
            height: 32
          },
        }
      },
    };
    return (
      <div>
        <Theme config={view}>
          <Tabs
            tabType={'card'}
            pagedType={'single'}
            hideContent={true}
            onDelete={this.onDeleteClick}
            onTabClick={this.tabsClick}
            activityValue={this.props.activityValue}
            data={this.props.hasActivityKeyDefaultData}
            showDeleteBtn={true}
          />
        </Theme>
      </div>
    );
  }
}

const MenuList = connect(
  menuList,
  state => {
    const menuList = state;
    return {
      menuState: menuList.get("menuState").toJS
        ? menuList.get("menuState").toJS()
        : menuList.get("menuState"),
      hasActivityKeyDefaultData: state.get("hasActivityKeyDefaultData").toJS
        ? state.get("hasActivityKeyDefaultData").toJS()
        : state.get("hasActivityKeyDefaultData"),
      activityValue: state.get("activityValue").toJS
        ? state.get("activityValue").toJS()
        : state.get("activityValue"),
    };
  },
  mutations => {
    const menuList = mutations;
    return {
      onSelect: menuList.onSelect,
      onTabChange: menuList.onTabChange,
      onTabDelete: menuList.onTabDelete,
    };
  }
)(PageTabs);

export default () => {
  return <MenuList />;
};
