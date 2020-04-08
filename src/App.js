import './index.styl'
import React from 'react'
import MainPage from "./components/MainPage"
import TopError from "./components/TopError"
import Websocket from "./components/Websocket"

function App() {
  return (
    <>
      <Websocket />
      <TopError/>
      <MainPage />
      
      {/*предзагрузка картинок*/}
      <div >
        <div style={{visible: "none"}} className="rock"/>
        <div style={{visible: "none"}} className="paper"/>
        <div style={{visible: "none"}} className="scissors"/>
        <div style={{visible: "none"}} className="rock_dark"/>
        <div style={{visible: "none"}} className="paper_dark"/>
        <div style={{visible: "none"}} className="scissors_dark"/>
        <div style={{visible: "none"}} className="close"/>
        <div style={{visible: "none"}} className="close_hover"/>
        <div style={{visible: "none"}} className="done"/>
      </div>
    </>
  );
}

export default App;
