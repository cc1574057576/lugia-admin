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
// import menulist from '../menulist';

export const hasActivityKeyDefaultData = [
  {
    title: '首页',
    content: <div>首页</div>,
    activityKey: '0'
  },
];

class PageTabs extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  onDeleteClick = (activityKey: string) => {
    console.log('activityKey', activityKey)
    // const { data } = this.state;
    // let newdata = [];
    // if (data.length > 1) {
    //   newdata = data.filter(child => {
    //     return child.activityKey !== activityKey;
    //   });
    // }
    // this.setState({ data: newdata });
  };
  tabsClick = (clickKey) => {
    const { activityValue } = clickKey;
    this.props.onTabAdd(activityValue)
  }

  render() {
    const view = {
      [Widget.Tabs]: {
        TitleContainer: {
          normal: {
            width: 1300
          },
        },
        Container: {
          normal: {
            width: "100%",
            background: {
              color: "#000"
            }
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
      onTabAdd: menuList.onTabAdd
    };
  }
)(PageTabs);

export default () => {
  return <MenuList />;
};
