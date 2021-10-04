import React, { Component } from 'react'

class BackgroundClock extends Component {
  componentDidMount () {
    this.intervalID = setInterval(this.tick.bind(this), 1000)
  }

  componentWillUnmount () {
    clearInterval(this.intervalID)
  }

  tick () {
    const date = new Date()
    this.setState({
      secondsSinceStartOfDay: date.getSeconds() + (60 * date.getMinutes()) + (60 * 60 * date.getHours())
    })
  }

  render () {
    if (this.state == null) {
      // don't render anything before we've calculated the rotations
      return <div />
    }
    const hoursRotation = this.state.secondsSinceStartOfDay / (60 * 60 * 12)
    const minutesRotation = this.state.secondsSinceStartOfDay / (60 * 60)
    const secondsRotation = this.state.secondsSinceStartOfDay / 60

    return (
      <div className='background-clock'>
        <div className='hours' style={{ transform: `rotate(${360 * hoursRotation}deg)` }} />
        <div className='minutes' style={{ transform: `rotate(${360 * minutesRotation}deg)` }} />
        <div className='seconds' style={{ transform: `rotate(${360 * secondsRotation}deg)` }} />
        <div className='center' />
      </div>
    )
  }
}

export default BackgroundClock
