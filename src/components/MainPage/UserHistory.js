import React from "react"
import Listener from "../../Listener"
import connect from "react-redux/es/connect/connect"
import {TOGGLE_HISTORY} from "../../reducers/constants"


class UserHistory extends Listener {
  constructor(props){
    super(props)
    this.display = false

    this.setEventHandler(TOGGLE_HISTORY, () => true /* rerender */)
  }

  toggleHistory = () => {
    this.display = !this.display
    this.dispatch(TOGGLE_HISTORY)
  }

  render () {
    return (
      <>
        <div className = "user-history_button" onClick = {this.toggleHistory} />

        {this.display &&
        <div className = "user-history">
          {this.props.history.map(entry => <div className = "history_entry">{entry}</div>)}
          <div className = "user-history_close" onClick = {this.toggleHistory} />
        </div>}
      </>
    )
  }
}

export default connect(state => ({
  TOGGLE_HISTORY: state.toggleHistory
}))(UserHistory)


