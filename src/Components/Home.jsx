import React from 'react'
import TopBar from './TopBar'
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.jpg'
import img3 from '../assets/img3.png'
import './Styles/Home.css'
import SearchBar from './SearchBar/SearchBar';
import Events from './Events';
import MemberShip from './MemberShip';


function Home() {
  return (
    <div className='home-wrapper mt-4 mb-4'>
      <TopBar/>
      <div className='img-slider'>
      <Carousel>
        <Carousel.Item interval={2000}>
          <img className='s-block w-100 c-height' src={img1}/>
          <Carousel.Caption>
            <h3>Seminar Events</h3>
            <p>We manage all your seminar</p>
          </Carousel.Caption>
        </Carousel.Item>
          <Carousel.Item interval={2000}>
          <img className='s-block w-100 c-height' src={img2}/>
            <Carousel.Caption>
              <h3>Corporate Parties</h3>
              <p>We will take care of your entire party management</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={2000}>
          <img className='s-block w-100 c-height' src={img3}/>
            <Carousel.Caption>
              <h3>We are event management organization</h3>
              <p>
                We will be taking care of your events from top to bottom
              </p>
            </Carousel.Caption>
          </Carousel.Item>
      </Carousel>
      <MemberShip/>
      <SearchBar/>
      <Events/>
      
      

      </div>
    </div>
  )
}

export default Home