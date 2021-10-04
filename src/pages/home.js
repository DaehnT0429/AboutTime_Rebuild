import React, { Component, NavLink } from "react";
import styled from "styled-components";
import TimelogsApi from "../services/timelogs-api";
import CupertinoSearchBarWithCancelButton1 from "../pages/components/CupertinoSearchBarWithCancelButton1";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      groups: []
    };
  }
  showAllLinks(repos) {
    if (repos == null) {
      return (
        <div>
          <p>No repositories available</p>
        </div>
      );
    }
    return (
      <ul>
        {repos.map((repo, i) => {
          const pathParts = repo.path.split("/");
          const path =
            "/" +
            encodeURIComponent(pathParts.slice(0, -1).join("/")) +
            "/" +
            pathParts[pathParts.length - 1];
          return (
            <li key={i}>
              <NavLink id="repo-link" to={path}>
                {repo.path}
              </NavLink>
            </li>
          );
        })}
      </ul>
    );
  }

  showAllGroups(groups) {
    if (groups == null) {
      return (
        <div>
          <p>No groups available</p>
        </div>
      );
    }
    return (
      <ul>
        {groups.map((group, i) => (
          <li key={i}>
            <NavLink id="group-link" to={"/" + encodeURIComponent(group.path)}>
              {group.path}
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }

  componentDidMount() {
    const service = new TimelogsApi();
    service.getAllRepos().then((repos) => {
      this.setState({
        repos: repos
      });
    });
    service.getAllGroups().then((groups) => {
      this.setState({
        groups: groups
      });
    });
  }

  render() {
    return (
      <div id="home">
        <Container>
          <Rect></Rect>
          <MSoeLogo
            src={require("../pages/components/images/square_xsml_msoe-lgo.png")}
          ></MSoeLogo>
          <CupertinoSearchBarWithCancelButton1
            style={{
              height: 44,
              width: 423,
              position: "absolute",
              left: 1352,
              top: 40
            }}
          ></CupertinoSearchBarWithCancelButton1>
          <Rect2></Rect2>
          <AllGroups>All Groups</AllGroups>
          <AllRepoLinks></AllRepoLinks>
          <AllGroupLinks></AllGroupLinks>
          <GitLabLogo
            src={require("../pages/components/images/gitlab-logo-gray-stacked-rgb.png")}
          ></GitLabLogo>
          <ScrumMarkdownLogo
            src={require("../pages/components/images/scrum-a5c44d8364.png")}
          ></ScrumMarkdownLogo>
          <HideLogo
            src={require("../pages/components/images/464129-200.png")}
          ></HideLogo>
          <Gitlabbutton>
            <ButtonOverlay
              onClick={() => (window.location.href = "http://gitlab.com")}
            ></ButtonOverlay>
          </Gitlabbutton>
          <ScrumMarkDown>
            <ButtonOverlay
              onClick={() => (window.location.href = "/infodoc")}
            ></ButtonOverlay>
          </ScrumMarkDown>
          <Rect3></Rect3>
          <LoremIpsum>All Group Repository Links</LoremIpsum>
        </Container>
      </div>
    );
  }
}

const Container = styled.div`
  border-bottom-right-radius: 0px;
  border-radius: NaN;
  background-color: #fff;
  position: relative;
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const ScrumMarkDown = styled.div`
  top: 33px;
  left: 134px;
  width: 70px;
  height: 63px;
  position: absolute;
  border: none;
`;

const ButtonOverlay = styled.button`
  display: block;
  background: none;
  height: 100%;
  width: 100%;
  border: none;
`;
const Rect = styled.div`
  top: 0px;
  left: 0px;
  width: 100%;
  height: 15.625%;
  position: absolute;
  background-color: #e6e6e6;
`;

const MSoeLogo = styled.img`
  top: -8px;
  left: 1801px;
  width: 119px;
  height: 128px;
  position: absolute;
  object-fit: contain;
`;

const Rect2 = styled.div`
  top: 110px;
  left: 0px;
  width: 1920px;
  height: 59px;
  position: absolute;
  background-color: rgba(212, 30, 30, 1);
`;

const AllGroups = styled.span`
  font-family: Roboto;
  top: 125px;
  left: 0px;
  position: absolute;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 20px;
  text-align: center;
  width: 1920px;
  height: 29px;
`;

const AllRepoLinks = styled.div`
  overflow-y: scroll;
  top: 560px;
  left: 0px;
  width: 1920px;
  height: 316px;
  position: absolute;
  opacity: 0.35;
  background-color: rgba(255, 255, 255, 1);
  overflow: hidden;
  display: flex;
`;

const AllGroupLinks = styled.div`
  overflow-y: scroll;
  top: 169px;
  left: 0px;
  width: 1920px;
  height: 351px;
  position: absolute;
  shadow-radius: 0px;
  overflow: hidden;
  display: flex;
  box-shadow: 3px 3px 0px 1px rgba(255, 255, 255, 1);
`;

const GitLabLogo = styled.img`
  top: 15px;
  left: 23px;
  width: 111px;
  height: 88px;
  position: absolute;
  object-fit: contain;
`;

const ScrumMarkdownLogo = styled.img`
  top: 18px;
  left: 134px;
  width: 77px;
  height: 90px;
  position: absolute;
  object-fit: contain;
`;

const HideLogo = styled.img`
  top: 22px;
  left: 212px;
  width: 65px;
  height: 85px;
  position: absolute;
  object-fit: contain;
`;

const Gitlabbutton = styled.div`
  top: 28px;
  left: 44px;
  width: 70px;
  height: 63px;
  position: absolute;
  border: none;
`;

const Rect3 = styled.div`
  left: 0px;
  width: 1920px;
  height: 40px;
  position: absolute;
  background-color: #e6e6e6;
  top: 520px;
`;

const LoremIpsum = styled.span`
  font-family: Roboto;
  top: 528px;
  left: 0px;
  position: absolute;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  height: 31px;
  width: 1920px;
  text-align: center;
  font-size: 20px;
`;

export default HomePage;
