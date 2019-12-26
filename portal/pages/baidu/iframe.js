/**
 *
 * create by Cc
 *
 * @flow
 */
import React from "react";
import styled from "styled-components";

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  >div{
    padding: 0
  }
`;

export default class Pages extends React.Component {
  render() {
    return (
      <PageWrapper>
        <iframe
          width="100%"
          height="100%"
          src="http://www.baidu.com">
        </iframe>
      </PageWrapper>
    );
  }
}
