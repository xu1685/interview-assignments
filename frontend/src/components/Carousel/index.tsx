import React, { useState, useEffect } from 'react';
import './index.css'

interface ImgItemType {
  title: Array<string>;
  desc: Array<string>;
  img: string;
  fontColor: string;
}

interface CarouselProps {
  imgList: Array<ImgItemType>,
  duration: number;
}

export default function Carousel(props: CarouselProps) {
  const [curIndex, setCurIndex] = useState(0);
  const lastIndex = props.imgList.length - 1;

  const handleDotProcess = () => {
    const dots = document.querySelectorAll('.dot-content');
    if (dots?.length) {
      dots.forEach((dot,index) => {
        (dots[index] as any).style.animation = '';
        if(index === curIndex)
        (dots[index] as any).style.animation = `changewidth ${props.duration}s linear 0s 1 running none`;
      })
    }
  }

  const handleCarouselChange = () => {
    const app = document.querySelector('.App');
    let clientWidth = 0;
    if (app) clientWidth = app.clientWidth;

    const carousel = document.querySelector('.carousel');
    if(carousel){
      // move to next img
      if(curIndex === lastIndex) {
        // 快速回滚到第一张
        (carousel as any).style.transition = `transform 0.3s linear`;
        (carousel as any).style.transform = `translateX(0px)`;
      }
      else {
        (carousel as any).style.transition = `transform 1s linear`;
        (carousel as any).style.transform = `translateX(-${(curIndex + 1) * clientWidth}px)`;
      }
    }
  }

  useEffect(()=>{
    // console.log(curIndex, 'curIndex');
    handleDotProcess();
    const timers = setInterval(() => {
      handleDotProcess();
      handleCarouselChange();
      if (curIndex < lastIndex) setCurIndex(curIndex + 1);
      else setCurIndex(0);
    }, props.duration * 1000)
    return ()=>{
      clearInterval(timers)
    }
  })

  return <div className='carousel-wrapper'>
  <div className="carousel">
    {props.imgList.map((item: ImgItemType, index: number) => {
      return <div key={`carousel-${index}`} className={`carousel-item ${item.fontColor}`}>
        <div className='item-content'>
          <div>{item.title.map((title: string) => {
            return <div key={title} className='item-title'>{title}</div>
          })}</div>
          <div>{item.desc.map((desc: string) => {
            return <div key={desc} className='item-desc'>{desc}</div>
          })}</div>
        </div>
       <img className='item-image' alt={item.title.join()} key={item.img} src={item.img} />
      </div>
    })}
  </div>
  
  <div className='dots'>
      {props.imgList.map((item: ImgItemType, index: number) => {
        return <div key={`dot-${index}`} className='dot'>
          <div className='dot-content'></div>
          </div>
        })}
    </div>
  </div>;
}
