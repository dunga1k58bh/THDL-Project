import React from 'react'
import "./product.scss"
import {useNavigate} from "react-router-dom"
import Images from '../image/Image';

function Product(props) {
  const navigate = useNavigate();
  return (
    <div className='item-container' onClick={() => navigate(`/${props.id}`)}>
        <div className='name'>{props.name }</div>
        <div className='images'>
          <img alt="" src={props.image || Images.noImage}/>
        </div>
        {props.operating_system && props.operating_system !=="" && <div className='system'><b>Hệ điều hành:</b> {props.operating_system}</div>}
        {!!props.cpu && props.cpu !=="" && <div className='chip'><b>CPU:</b> {props.cpu}</div>}
        {!!props.ram && <div className='ram'><b>RAM:</b> {props.ram}GB</div>}
        {!!props.rom && <div className='rom'><b>ROM:</b> {props.rom}GB</div>}
        {!!props.display_tech && <div className='monitor'><b>Màn hình:</b> {props.display_tech}</div>}
        {!!props.battery && <div className='pin'><b>Pin:</b> {props.battery} mAh</div>}
        {!!props.weight && <div className='color'><b>Trọng lượng:</b> {props.weight} gram</div>}
    </div>
  )
}

export default Product