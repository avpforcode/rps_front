import {Component} from 'react'

// Класс используется в качестве наследуемого для компонентов
// слушающих события редакса, каждый дочерний компонент
// подписывается на события изменения store с помощью
// setEventhandler

let idsCounter = 1

class Listener extends Component {
  constructor(props) {
    super(props)
    this.id = props.id || idsCounter++
    this.events = []
  }

  shouldComponentUpdate(nextProps, nextState){
    // Проверяем пропсы передоваемые через редакс
    for (let i = 0; i < this.events.length; i++) {

      let event = this.events[i].event
      let callback = this.events[i].callback
      let callbackForRest = this.events[i].callbackForRest
      let old_data = this.props[event]
      let new_data = nextProps[event]
      let sourceId = new_data.componentId

      // Если данные проверяемого элемента стора не изменились,
      // компонент не обновляем (по крайней мере на данной итерации)
      if (old_data === new_data)
        continue

      // Если в экшене указан id компонента-получателя,
      // но при этом он не совпадает с id текущего компонента
      // - на событие не реагруем
      // Если же id источника не указан - значит на него должны реагировать все
      if (!sourceId)
        return callback(new_data.payload || new_data)

      if (this.id === sourceId)
        return callback(new_data.payload)

      // Колбек для остальных элементов подписаных на событие,
      // но с id не совпадающим с указаным в событии.
      // Задается опционально
      return callbackForRest(new_data.payload)
    }

    // todo неплохо бы сделать проверку всех остальных свойств
    return true
  }

  // С помощью данной функции регестрируем пропсы редакса,
  // которые необходимо обрабатывать.
  // Колбеки должны возвращать true/false
  setEventHandler = (event, callback, callbackForRest = () => false) => {
    this.events.push({
      event:event,
      callback: callback,
      callbackForRest: callbackForRest })
  }

  //простая обертка для диспетчера
  dispatch = (type, data, id = null) => {
    this.props.dispatch({
      componentId: id,
      type: type,
      payload: data
    })
  }
}

export default Listener
