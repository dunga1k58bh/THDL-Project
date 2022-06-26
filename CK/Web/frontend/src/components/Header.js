import React, { Component } from 'react'
import Images from '../image/Image'
import "./header.scss"

export class Header extends Component {
  render() {
    return (
      <div className='header'>
        <img src={Images.logo} alt="logo" className='logo'></img>
        <div className='name'>
            Tích hợp dữ liệu
        </div>
        <div className='team'>
            Nhóm 4
        </div>
      </div>
    )
  }
}

export default Header