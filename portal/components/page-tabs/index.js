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

  onDeleteClick = (activityKey: string) => {

    const data = this.props.hasActivityKeyDefaultData;
    let newdata = [];
    if (data.length > 1) {
      newdata = data.filter(child => {
        return child.key !== activityKey.activityValue;
      });
    }
    this.props.onTabDelete(newdata);
  };
  tabsClick = (clickKey) => {
    const { activityValue } = clickKey;
    this.props.onTabAdd(activityValue)
  }

  render() {
    const { width } = this.state;
    const view = {
      [Widget.Tabs]: {
        TitleContainer: {
          normal: {
            width
          },
        },
        ContentBlock: {
          normal: {
            width
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
      onTabAdd: menuList.onTabAdd,
      onTabDelete: menuList.onTabDelete,
    };
  }
)(PageTabs);

export default () => {
  return <MenuList />;
};
