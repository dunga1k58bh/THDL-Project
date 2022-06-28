import React from 'react'
import "./product.scss"
import {useNavigate} from "react-router-dom"

function Product(props) {
  const navigate = useNavigate();
  return (
    <div className='item-container' onClick={() => navigate(`/${props.id}`)}>
        <div className='name'>{props.name}</div>
        <div className='system'><b>Hệ điều hành:</b> {props.operating_system}</div>
        <div className='chip'><b>CPU:</b> {props.cpu}</div>
        <div className='ram'><b>RAM:</b> {props.ram}GB</div>
        <div className='rom'><b>ROM:</b> {props.rom}GB</div>
        <div className='monitor'><b>Màn hình:</b> {props.display_tech}</div>
        <div className='pin'><b>Pin:</b> {props.battery} mAh</div>
        <div className='color'><b>Trọng lượng:</b> {props.weight} gram</div>
    </div>
  )
}

export default Product