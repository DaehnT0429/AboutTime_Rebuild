import sortBy from 'lodash.sortby'

const API_SERVER_URL = process.env.REACT_APP_API_SERVER_URL

class TimelogApi {
  getRepoTimesBySlug (groupPath, repo) {
    const url = 'api/report/' + groupPath + '/' + repo
    return this._makeRequest(url, {
      method: 'GET'
    }).then(({ data }) => (
      data
    ))
  }

  getGroupTimesBySlug (groupPath) {
    const url = 'api/report/' + groupPath
    return this._makeRequest(url, {
      method: 'GET'
    }).then(({ data }) => (
      data
    ))
  }

  getAllRepos () {
    const url = 'api/repos'
    return this._makeRequest(url, {
      method: 'GET'
    }).then(({ data }) => (
      sortBy(data, 'path')
    ))
  }

  getAllGroups () {
    const url = 'api/groups'
    return this._makeRequest(url, {
      method: 'GET'
    }).then(({ data }) => (
      sortBy(data, 'path')
    ))
  }

  getMilestonesForGroup (groupPath) {
    const url = 'api/milestones?group_path=' + groupPath
    return this._makeRequest(url, {
      method: 'GET'
    }).then(({ data }) => (
      sortBy(data, 'start_date')
    ))
  }

  _makeRequest (url, options) {
    options.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    if (options.body) {
      options.body = JSON.stringify(options.body)
    }

    return fetch(API_SERVER_URL + url, options).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        return response.json().then(({ errors }) => {
          const error = new Error(response.statusText)
          response.errorMessages = errors
          throw error
        })
      }
    })
  }
}

export default TimelogApi
