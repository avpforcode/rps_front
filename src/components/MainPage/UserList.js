import React from "react"
import connect from "react-redux/es/connect/connect"


class UserList extends React.Component  {
  render () {

    return (
      <div className="user-list">
        <div className="user-list_title">Участники</div>
        <ul>
          {this.props.userList.map((user,i) =>
            <li
              key = {i}
              className = {user[1] ? "rival": "rival_inactive"}>
              <span>{user}</span>
              {!user[1] && <span> (не участвует)</span>}
              </li>)}
        </ul>
      </div>
    )
  }
}

export default connect(() => ({}))(UserList)

