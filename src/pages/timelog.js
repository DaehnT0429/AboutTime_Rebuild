import React, { Component } from "react";
import {
  Header,
  Container,
  Dimmer,
  Loader,
  Form,
  Message
} from "semantic-ui-react";
import { DatesRangeInput } from "semantic-ui-calendar-react";
import map from "lodash.map";
import uniq from "lodash.uniq";
import filter from "lodash.filter";
import sortBy from "lodash.sortby";
import AggregatedTable from "../services/aggregated-table";
import FullDataTable from "../services/full-data-table";
import TimelogsApi from "../services/timelogs-api";
import * as moment from "moment";

class Timelog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupPath: this.props.groupPath,
      repo: this.props.repo,
      data: null,
      filteredByDate: [],
      finalData: [],
      usersDisplayed: "All Users",
      datesRange: "",
      dates: [],
      datesDisplayed: [],
      milestones: []
    };

    this.clearUserFilter = this.clearUserFilter.bind(this);
    this.clearDateFilter = this.clearDateFilter.bind(this);
    this.isSelectedUser = this.isSelectedUser.bind(this);
    this.setUsersDisplayed = this.setUsersDisplayed.bind(this);
    this.getFinalData = this.getFinalData.bind(this);
    this.getDatesDisplayed = this.getDatesDisplayed.bind(this);
    this.getUserDisplayed = this.getUserDisplayed.bind(this);
    this.getDateFilteredData = this.getDateFilteredData.bind(this);
  }

  isSelectedUser(user) {
    return user === this.state.usersDisplayed;
  }

  setUsersDisplayed(user) {
    let filteredByUser = filter(this.state.filteredByDate, {
      user: { name: user }
    });
    this.setState({
      usersDisplayed: user,
      finalData: filteredByUser
    });
  }

  getUserDisplayed() {
    return this.state.usersDisplayed;
  }

  getDatesRange() {
    return this.state.datesRange;
  }

  getDatesDisplayed() {
    return this.state.datesDisplayed;
  }

  getDateFilteredData() {
    return this.state.filteredByDate;
  }

  getFinalData() {
    return this.state.finalData;
  }

  clearUserFilter() {
    this.setState({
      finalData: this.state.filteredByDate,
      usersDisplayed: "All Users"
    });
  }

  clearDateFilter() {
    let filteredByUser;
    if (this.state.usersDisplayed !== "All Users") {
      filteredByUser = filter(this.state.data, {
        user: { name: this.state.usersDisplayed }
      });
    } else {
      filteredByUser = this.state.data;
    }
    let filteredByDate = this.state.data;
    let dates = this.state.dates;

    this.setState({
      filteredByDate: filteredByDate,
      finalData: filteredByUser,
      datesDisplayed: dates,
      datesRange: ""
    });
  }

  filterByMilestone(startDate, endDate) {
    this.clearDateFilter();
    let datesRange = "";
    let startMoment = moment(startDate, "YYYY-MM-DD");
    let endMoment = moment(endDate, "YYYY-MM-DD");
    datesRange += startMoment.format("DD-MM-YYYY");
    datesRange += " - " + endMoment.format("DD-MM-YYYY");
    this.handleChangeDatesRange(datesRange);
    this.setState({
      datesRange: datesRange
    });
  }

  handleChange(event, { name, value }) {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
    if (name === "datesRange") {
      this.handleChangeDatesRange(value);
    }
  }

  handleChangeDatesRange(datesRange) {
    // This ensures we're only handling the date range values passed in when
    // both the beginning and end date have been selected
    if (datesRange.length > 13) {
      /*
        Example datesRange value: 07-05-2019 - 09-05-2019
        substring(0, 10) grabs the start date
        substring(13) grabs the end date
      */
      let startDate = moment(datesRange.substring(0, 10), "DD-MM-YYYY");
      let endDate = moment(datesRange.substring(13), "DD-MM-YYYY");
      let newDates = filter(this.state.dates, function (date) {
        let current = moment(date.substring(0, 10));
        if (
          startDate.diff(current, "days") <= 0 &&
          endDate.diff(current, "days") >= 0
        ) {
          return current;
        }
      });
      let filteredByDate = filter(this.state.data, function (timelog) {
        let current = moment(timelog.date_spent);
        if (
          startDate.diff(current, "days") <= 0 &&
          endDate.diff(current, "days") >= 0
        ) {
          return timelog;
        }
      });
      let filteredByUserAndDate;
      if (this.state.usersDisplayed !== "All Users") {
        filteredByUserAndDate = filter(filteredByDate, {
          user: { name: this.state.usersDisplayed }
        });
      } else {
        filteredByUserAndDate = filteredByDate;
      }
      this.setState({
        filteredByDate: filteredByDate,
        finalData: filteredByUserAndDate,
        datesDisplayed: newDates
      });
    } else if (datesRange.length === 0) {
      this.clearDateFilter();
    }
  }

  setDataAfterRequest(data) {
    let dataSorted = sortBy(data, ["date_spent", "user.name"]);
    let initialDates = uniq(map(dataSorted, "date_spent"));
    this.setState({
      data: dataSorted,
      filteredByDate: dataSorted,
      finalData: dataSorted,
      dates: initialDates,
      datesDisplayed: initialDates
    });
  }

  componentDidMount() {
    const service = new TimelogsApi();
    if (this.state.repo == null) {
      service.getGroupTimesBySlug(this.state.groupPath).then((groupTimes) => {
        this.setDataAfterRequest(groupTimes);
      });
    } else {
      service
        .getRepoTimesBySlug(this.state.groupPath, this.state.repo)
        .then((repoTimes) => {
          this.setDataAfterRequest(repoTimes);
        });
    }
    service
      .getMilestonesForGroup(this.state.groupPath)
      .then((groupMilestones) => {
        this.setState({
          milestones: groupMilestones
        });
      });
  }

  renderMilestonesPicker() {
    if (this.state.milestones.length !== 0) {
      return (
        <div>
          {this.state.milestones.map((milestone, i) => (
            <button
              key={milestone.id}
              id="milestone-link"
              className="ui basic button"
              onClick={this.filterByMilestone.bind(
                this,
                milestone.start_date,
                milestone.due_date
              )}
            >
              {milestone.name}
            </button>
          ))}
        </div>
      );
    } else {
      return (
        <Message negative>
          <Message.Header>Your group has no Milestones</Message.Header>
          <p>
            Create some milestones to represent your sprints by going to your{" "}
            <a
              href={`https://gitlab.com/groups/${decodeURIComponent(
                this.state.groupPath
              )}/-/milestones`}
            >
              group milestone page
            </a>
            . Milestone "start dates" and "due dates" should match the start and
            end dates of your sprint and milestones must not have overlapping
            dates.
          </p>
        </Message>
      );
    }
  }

  render() {
    if (this.state.data === null) {
      return (
        <div id="timelog">
          <Dimmer active>
            <Loader size="massive">Loading</Loader>
          </Dimmer>
        </div>
      );
    } else {
      return (
        <Container style={{ margin: "30px" }}>
          <Header as="h1">Timelog</Header>
          <div>
            <Header as="h2">Choose Milestone</Header>
            {this.renderMilestonesPicker()}
            <Header as="h2">Pick Date Range</Header>
            <Form>
              <DatesRangeInput
                name="datesRange"
                placeholder="From - To"
                value={this.state.datesRange}
                iconPosition="left"
                onChange={this.handleChange.bind(this)}
              />
            </Form>
          </div>
          <AggregatedTable
            getData={this.getDateFilteredData}
            getDates={this.getDatesDisplayed}
            isSelectedUser={this.isSelectedUser}
            setUser={this.setUsersDisplayed}
          />
          {this.state.usersDisplayed !== "All Users" && (
            <button
              className="ui negative basic button"
              onClick={this.clearUserFilter}
            >
              Clear User Filter
            </button>
          )}
          {this.state.datesRange.length > 13 && (
            <button
              className="ui negative basic button"
              onClick={this.clearDateFilter}
            >
              Clear Date Filter
            </button>
          )}
          <FullDataTable
            getData={this.getFinalData}
            getUser={this.getUserDisplayed}
            setUser={this.setUsersDisplayed}
          />
        </Container>
      );
    }
  }
}

export default Timelog;
