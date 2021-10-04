import React, { Component } from 'react'
import { Table, Header } from 'semantic-ui-react'
import UserLabel from './user-label'
import ReactMarkdown from 'react-markdown'

class FullDataTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      user: '',
      getData: this.props.getData,
      getUser: this.props.getUser,
      setUser: this.props.setUser
    }
  }

  getData () {
    let data = this.state.getData()
    if (this.state.data !== data) {
      this.setState({
        data: data
      })
    }
  }

  getUser () {
    let user = this.state.getUser()
    if (this.state.user !== user) {
      this.setState({
        user: user
      })
    }
  }

  render () {
    let fields = ['Date', 'User', 'Hours Spent', 'Description', 'Issue/MR', 'Repository']
    this.getData()
    this.getUser()

    return (
      <div id='allData' style={{ marginTop: 40 }}>
        <Header as='h2'>Time Report for {this.state.user}</Header>
        <Table striped color='black' id='allDataTable'>
          <Table.Header>
            <Table.Row>
              { fields.map((field, i) => {
                return (
                  <Table.HeaderCell key={field}>{field}</Table.HeaderCell>
                )
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { this.state.data.map((entry, i) => {
              let time = entry['hours_spent']
              time = (time % 1 > 0) ? time.toFixed(2) : time
              return (
                <Table.Row key={i}>
                  <Table.Cell key={'date_spent ' + i} singleLine>{entry['date_spent']}</Table.Cell>
                  <Table.Cell key={'user.name' + i} singleLine onClick={this.state.setUser.bind(this, entry['user']['name'])}>
                    <UserLabel name={entry['user']['name']} avatar_url={entry['user']['avatar_url']} />
                  </Table.Cell>
                  <Table.Cell key={'time' + i}>{time}h</Table.Cell>
                  <Table.Cell key={'description' + i}>
                    <div style={{ maxWidth: '400px', overflowX: 'auto' }}>
                      <ReactMarkdown skipHtml='false' source={entry['description']} />
                    </div>
                  </Table.Cell>
                  <Table.Cell key={'task.name' + i}><a href={entry['task']['gitlab_link']}> {entry['task']['name']}</a></Table.Cell>
                  <Table.Cell key={'git_repo.name' + i}>{entry['git_repo']['name']}</Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default FullDataTable
