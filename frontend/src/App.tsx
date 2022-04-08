import React from "react";
import "./App.css";

import airpords from './assets/airpods.png'
import iphone from './assets/iphone.png'
import tablet from './assets/tablet.png'
import Carousel from "./components/Carousel";

const imgList = [
  {
    title: ['xPhone'],
    desc: ['Lots to love. Less to spend.','Starting at $399.'],
    img: iphone,
    fontColor: 'white'
  },
  {
    title: ['Tablet'],
    desc: ['Just the amount of everything.'],
    img: tablet,
    fontColor: 'black'
  },
  {
    title: ['Buy xPhone or Tablet for college.', 'Get airPods.'],
    desc: [],
    img: airpords,
    fontColor: 'black'
  }
]
function App() {
  return <div className="App">
      <Carousel imgList={imgList} duration={3} />
    </div>;
}

export default App;
