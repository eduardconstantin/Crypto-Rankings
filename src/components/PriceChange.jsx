import React from 'react'

export default function PriceChange(props) {
    return (
        <div className="col-4 px-2">
            <div className="content">
                <p className="mb-1">{props.title}</p>
                <p style={props.price>0?{color:"rgb(41, 150, 41)"}:{color:"rgb(150, 40, 40)"}}className="text-center m-0 pb-3">{props.price}<span>%</span></p>
            </div>
        </div>
    )
}
