import {Component} from 'react'

let idsCounter = 1

class Listener extends Component {
  constructor(props) {
    super(props)
    this.id = props.id || idsCounter++
    this.events = []
  }

  shouldComponentUpdate(nextProps, nextState){
    for (let i = 0; i < this.events.length; i++) {

      let event = this.events[i].event
      let callback = this.events[i].callback
      let callbackForRest = this.events[i].callbackForRest
      let old_data = this.props[event]
      let new_data = nextProps[event]
      let sourceId = new_data.componentId

      if (old_data === new_data)
        continue

      if (!sourceId)
        return callback(new_data.payload || new_data)

      if (this.id === sourceId)
        return callback(new_data.payload)

      return callbackForRest(new_data.payload)
    }

    return true
  }

  setEventHandler = (event, callback, callbackForRest = () => false) => {
    this.events.push({
      event:event,
      callback: callback,
      callbackForRest: callbackForRest })
  }

  dispatch = (type, data, id = null) => {
    this.props.dispatch({
      componentId: id,
      type: type,
      payload: data
    })
  }
}

export default Listener
