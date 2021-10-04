import React, { Component } from "react";
import styled from "styled-components";

function GroupRepoLinks(props) {
  return (
    <Container {...props}>
      <AllGroupRepoLinks>All Group Repo Links</AllGroupRepoLinks>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: #e6e6e6;
  flex-direction: column;
  justify-content: center;
`;

const AllGroupRepoLinks = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  font-size: 36px;
  margin-left: 20px;
`;

export default GroupRepoLinks;
