import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {isRunning: false, minutes: 25, seconds: 0, timerLimit: 25}

  onDecreaseTime = () => {
    const {isRunning, minutes} = this.state
    if (minutes > 0 && isRunning === false) {
      this.setState({seconds: 0})
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
        timerLimit: prevState.timerLimit - 1,
      }))
    }
  }

  onIncreaseTIme = () => {
    const {isRunning} = this.state
    if (isRunning === false) {
      this.setState({seconds: 0})
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
        timerLimit: prevState.timerLimit + 1,
      }))
    }
  }

  startOrPauseTimer = () => {
    const {isRunning} = this.state
    if (isRunning === false) {
      this.timerId = setInterval(this.tick, 1000)
      this.setState({isRunning: true})
    } else {
      clearInterval(this.timerId)
      this.setState({isRunning: false})
    }
  }

  onResetTimer = () => {
    clearInterval(this.timerId)
    this.setState({
      isRunning: false,
      minutes: 25,
      seconds: 0,
      timerLimit: 25,
    })
  }

  tick = () => {
    const {seconds} = this.state
    if (seconds > 0) {
      this.setState(prev => ({seconds: prev.seconds - 1}))
    } else {
      const {minutes} = this.state
      if (minutes === 0 && seconds === 0) {
        clearInterval(this.timerId)
        this.setState({isRunning: false, seconds: 0})
      } else {
        this.setState({seconds: 59})
        this.setState(prev => ({minutes: prev.minutes - 1}))
      }
    }
  }

  render() {
    const {isRunning, minutes, seconds, timerLimit} = this.state

    const minutesInFormat = minutes >= 9 ? minutes : `0${minutes}`
    const secondsInFormat = seconds >= 9 ? seconds : `0${seconds}`

    const iconChange = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    return (
      <div className="bg-main-con">
        <div className="card-con">
          <h1 className="title">Digital Timer</h1>
          <div className="timer-con">
            <div className="countDown-con">
              <div className="round-sty">
                <h1 className="time-sty">
                  {minutesInFormat}:{secondsInFormat}
                </h1>
                <p className="notification">
                  {isRunning ? 'Running' : 'Paused'}
                </p>
              </div>
            </div>
            <div className="controls-con">
              <div className="pause-reset-con">
                <div className="pause-reset">
                  <button
                    type="button"
                    className="btn-sty"
                    onClick={this.startOrPauseTimer}
                  >
                    <img
                      className="img-sty"
                      src={iconChange}
                      alt={isRunning ? 'pause icon' : 'play icon'}
                    />{' '}
                    {isRunning ? 'Pause' : 'Start'}
                  </button>
                </div>
                <div className="pause-reset">
                  <button
                    type="button"
                    className="btn-sty"
                    onClick={this.onResetTimer}
                  >
                    <img
                      className="img-sty"
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      alt="reset icon"
                    />
                  </button>
                  <p className="operation-sty">Reset</p>
                </div>
              </div>
              <div className="buttons-con">
                <p className="bottom-pera">Set Timer limit</p>
                <div className="gestures-con">
                  <button
                    type="button"
                    className="gestures minus"
                    onClick={this.onDecreaseTime}
                  >
                    -
                  </button>
                  <div className="number-con">
                    <p className="number-sty">{timerLimit}</p>
                  </div>
                  <button
                    type="button"
                    className="gestures"
                    onClick={this.onIncreaseTIme}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
