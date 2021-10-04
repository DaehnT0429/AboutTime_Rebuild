import React, { Component } from 'react'
import { Table, Header, Grid } from 'semantic-ui-react'
import map from 'lodash.map'
import uniq from 'lodash.uniq'
import sumBy from 'lodash.sumby'
import filter from 'lodash.filter'

class AggregatedTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      dates: [],
      getData: this.props.getData,
      getDates: this.props.getDates,
      isSelectedUser: this.props.isSelectedUser,
      setUser: this.props.setUser
    }
  }

  getData () {
    let data = this.state.getData()
    let dates = this.state.getDates()
    if (this.state.data !== data) {
      if (this.state.dates !== dates) {
        this.setState({
          data: data,
          dates: dates
        })
      }
      this.setState({
        data: data
      })
    }
  }

  userTable (users) {
    return (
      <Table selectable singleLine compact celled striped color='black' id='users' >
        <Table.Header>
          <Table.Row key={'header'}>
            <Table.HeaderCell key={'User'}>User</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user, i) => {
            return (
              <Table.Row key={user} active={this.state.isSelectedUser(user)}>
                <Table.Cell key={user + ',' + i} onClick={this.state.setUser.bind(this, user)}><div>{user}</div></Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    )
  }

  formatDataIntoRows (users) {
    return (
      <div style={{ 'overflowX': 'auto' }}>
        <Table singleLine compact celled striped color='black' id='aggregated'>
          <Table.Header>
            <Table.Row>
              { this.state.dates.map((date, i) => {
                return (
                  <Table.HeaderCell key={date + ',' + i}>{date}</Table.HeaderCell>
                )
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map((user, i) => {
              return (
                <Table.Row active={this.state.isSelectedUser(user)} key={i}>
                  {this.state.dates.map((date, j) => {
                    let timeLogs = filter(this.state.data, { 'user': { 'name': user }, 'date_spent': date })
                    let time = sumBy(timeLogs, 'hours_spent')
                    time = (time % 1 > 0) ? time.toFixed(2) : time
                    return (
                      <Table.Cell key={user + ',' + date}>{time}h</Table.Cell>
                    )
                  })}
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </div>
    )
  }

  sumTable (users) {
    return (
      <Table singleLine compact celled striped color='black' id='sum'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <strong>Sum</strong>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user, i) => {
            let filteredByName = filter(this.state.data, { 'user': { 'name': user } })
            let sumHours = sumBy(filteredByName, 'hours_spent')
            let sumRounded = (sumHours % 1 > 0) ? sumHours.toFixed(2) : sumHours
            return (
              <Table.Row active={this.state.isSelectedUser(user)} key={i}>
                <Table.Cell><strong>{sumRounded}h</strong></Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    )
  }

  render () {
    let users = uniq(map(this.state.data, 'user.name')).sort()
    this.getData()

    return (
      <div id='aggregated-table' style={{ marginTop: 40 }}>
        <Header as='h2'>Summary Report</Header>
        <Grid padded>
          <Grid.Row columns={3}>
            <Grid.Column style={{ padding: 0 }} width={3}>
              {this.userTable(users)}
            </Grid.Column>
            <Grid.Column style={{ padding: 0 }} width={12} only='computer'>
              {this.formatDataIntoRows(users)}
            </Grid.Column>
            <Grid.Column style={{ padding: 0 }} width={1}>
              {this.sumTable(users)}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default AggregatedTable
