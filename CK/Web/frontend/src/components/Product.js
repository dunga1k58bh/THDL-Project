import React from 'react'
import "./product.scss"
import {useNavigate} from "react-router-dom"

function Product() {
  const navigate = useNavigate();
  return (
    <div className='item-container' onClick={() => navigate("/1")}>
        <div className='name'>Iphone 13</div>
        <div className='system'>Hệ điều hành: IOS</div>
        <div className='chip'>Chip: Snapdragon 888</div>
        <div className='ram'>RAM: 2GB</div>
        <div className='rom'>ROM: 64GB</div>
        <div className='monitor'>Màn hình: OLED</div>
        <div className='pin'>Pin: 3000 mAh</div>
        <div className='color'>Màu sắc: Đỏ</div>
    </div>
  )
}

export default Product