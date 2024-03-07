import React from 'react';
import '../Welcome.css';

const Button = (props) => {
    return (
        <button className="button-13" onClick={props.onClick} id={props.id} disabled={props.disabled}>
            <span className="text">{props.label}</span>
            <span className="button-13-background"></span>
            <span className="button-13-border"></span>
            <svg style={{ position: 'absolute' }} width="0" height="0">
                <filter id="remove-black-button-13" color-interpolation-filters="sRGB">
                    <feColorMatrix type="matrix" values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                -1 -1 -1 0 1" result="black-pixels"></feColorMatrix>
                    <feComposite in="SourceGraphic" in2="black-pixels" operator="out"></feComposite>
                </filter>
            </svg>
        </button>
    );

}

export default Button;