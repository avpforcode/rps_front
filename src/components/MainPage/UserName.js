import React from "react"
import Listener from "../../Listener"
import connect from "react-redux/es/connect/connect"
import {EDIT_NAME, WS_REQUEST, CHANGE_NAME} from "../../reducers/constants"


class UserName extends Listener {
  constructor(props){
    super(props)
    this.name = props.name
    this.cache = props.name
    this.editable = false

    this.setEventHandler(EDIT_NAME, () => true /* rerender */)
    this.setEventHandler('name', this.update)
  }

  update = data => {
    this.name = data
    return true
  }

  startEdit = () => {
    this.editable = true
    this.dispatch(EDIT_NAME)
  }

  doneEdit = () => {
    this.cache = this.name
    this.editable = false
    this.dispatch(WS_REQUEST, {action: CHANGE_NAME, data: this.name})
  }

  cancelEdit = () => {
    this.name = this.cache
    this.editable = false
    this.dispatch(EDIT_NAME)
  }

  editHandler = e => {
    this.name = e.target.value
    this.dispatch(EDIT_NAME)
  }

  render () {
    return (
      <div className = "user-name">
        <div className = "user-name_title"><b>Имя: </b></div>

        {this.editable ?
          <div className = "user-name_block">
            <input type="text" value = {this.name} onChange = {this.editHandler}/>

            <div className="edit-buttons">
              <div className = "user-name_done" onClick = {this.doneEdit} />
              <div className = "user-name_cancel" onClick = {this.cancelEdit} />
            </div>

          </div>
          :
          <div className = "user-name_block">
            <div className = "user-name_value">{this.props.name}</div>
            <div className = "user-name_edit" onClick = {this.startEdit} />
          </div>}

      </div>
    )
  }
}



export default connect(state => ({
  EDIT_NAME: state.editName
}))(UserName)

