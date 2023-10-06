import React from "react"



export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return(
        <div className={props.isHeld?"die-face-held":"die-face"} onClick={props.dieClick}>
            <h2 className="die-num">{props.value}</h2></div>
    )
}