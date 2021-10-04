import React, { Component } from "react";
import styled from "styled-components";

function CupertinoButtonWhiteTextColor(props) {
  return (
    <Container {...props}>
      <HideDate>Hide Date</HideDate>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 5px;
`;

const HideDate = styled.span`
  font-family: Roboto;
  color: #fff;
  font-size: 17px;
  font-weight: 500;
`;

export default CupertinoButtonWhiteTextColor;
