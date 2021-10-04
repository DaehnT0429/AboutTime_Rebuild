import React, { Component } from "react";
import styled from "styled-components";
import MaterialCommunityIconsIcon from "react-native-vector-icons/dist/MaterialCommunityIcons";

function MaterialHeader11(props) {
  return (
    <Container {...props}>
      <LeftIconButtonRow>
        <LeftIconButton>
          <ButtonOverlay>
            <MaterialCommunityIconsIcon
              name="menu"
              style={{
                backgroundColor: "transparent",
                color: "#FFFFFF",
                fontSize: 24
              }}
            ></MaterialCommunityIconsIcon>
          </ButtonOverlay>
        </LeftIconButton>
        <TextWrapper>
          <HomePage numberOfLines={1}>HomePage</HomePage>
        </TextWrapper>
      </LeftIconButtonRow>
      <LeftIconButtonRowFiller></LeftIconButtonRowFiller>
      <RightIconButton>
        <ButtonOverlay>
          <MaterialCommunityIconsIcon
            name="dots-vertical"
            style={{
              backgroundColor: "transparent",
              color: "#FFFFFF",
              fontSize: 24
            }}
          ></MaterialCommunityIconsIcon>
        </ButtonOverlay>
      </RightIconButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(93, 94, 98, 1);
  flex-direction: row;
  align-items: center;
  padding: 4px;
  justify-content: space-between;
  box-shadow: 0px 2px 1.2px 0.2px #111;
`;

const ButtonOverlay = styled.button`
  display: block;
  background: none;
  height: 100%;
  width: 100%;
  border: none;
`;
const LeftIconButton = styled.div`
  padding: 11px;
  flex-direction: column;
  display: flex;
  border: none;
`;

const TextWrapper = styled.div`
  flex-direction: column;
  display: flex;
  align-self: flex-end;
  margin-left: 21px;
  margin-bottom: 16px;
`;

const HomePage = styled.span`
  font-family: Roboto;
  font-size: 18px;
  color: #ffffff;
  background-color: transparent;
  line-height: 18px;
  font-weight: 600;
`;

const LeftIconButtonRow = styled.div`
  flex-direction: row;
  margin-left: 5px;
  margin-top: 5px;
  margin-bottom: 3px;
  display: flex;
`;

const LeftIconButtonRowFiller = styled.div`
  flex: 1 1 0%;
  flex-direction: row;
  display: flex;
`;

const RightIconButton = styled.div`
  padding: 11px;
  align-items: center;
  flex-direction: column;
  display: flex;
  margin-right: 5px;
  margin-top: 5px;
  border: none;
`;

export default MaterialHeader11;
