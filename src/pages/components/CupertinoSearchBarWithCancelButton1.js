import React from "react";
import styled from "styled-components";
import FontAwesomeIcon from "react-native-vector-icons/dist/FontAwesome";

function CupertinoSearchBarWithCancelButton1(props) {
  return (
    <Container {...props}>
      <InputBox>
        <FontAwesomeIcon
          name="search"
          style={{
            color: "#000",
            fontSize: 20,
            alignSelf: "center",
            paddingLeft: 5,
            paddingRight: 5
          }}
        ></FontAwesomeIcon>
        <InputStyle placeholder="Search"></InputStyle>
        <FontAwesomeIcon
          name="close"
          style={{
            color: "#000",
            fontSize: 20,
            alignSelf: "center",
            paddingLeft: 5,
            paddingRight: 5
          }}
        ></FontAwesomeIcon>
      </InputBox>
      <RightIconButton>
        <ButtonOverlay>
          <RightButtonText>Cancel</RightButtonText>
        </ButtonOverlay>
      </RightIconButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: rgba(230, 230, 230, 1);
  padding: 8px;
  padding-right: 0px;
`;

const ButtonOverlay = styled.button`
  display: block;
  background: none;
  height: 100%;
  width: 100%;
  border: none;
`;
const InputBox = styled.div`
  flex: 1 1 0%;
  flex-direction: row;
  background-color: #ceced2;
  border-radius: 5px;
  display: flex;
`;

const InputStyle = styled.input`
  font-family: Roboto;
  height: 32px;
  align-self: flex-start;
  font-size: 15px;
  line-height: 15px;
  color: #000;
  flex: 1 1 0%;
  background-color: rgba(253, 253, 253, 1);
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
`;

const RightIconButton = styled.div`
  align-items: center;
  padding: 8px;
  flex-direction: column;
  display: flex;
  border: none;
`;

const RightButtonText = styled.span`
  font-family: Roboto;
  color: rgba(212, 30, 30, 1);
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
`;

export default CupertinoSearchBarWithCancelButton1;
