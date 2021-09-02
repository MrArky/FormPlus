import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { Input } from 'antd';

/**
 * 颜色选择器
 * @param {*} props 
 * @param {String} props.value
 * @param {(v:String)=>void} props.onChange
 * @returns 
 */
const ColorSelect = (props) => {
    const [showColorPanelBoard, setShowColorPanelBoard] = useState(false);
    return <>
        <Input value={props.value} readOnly onClick={() => setShowColorPanelBoard(true)} />
        {showColorPanelBoard ?
            <>
                <div style={{ position: "fixed", width: "100%", height: "100%", top: 0, left: 0 }} onClick={() => setShowColorPanelBoard(false)}></div>
                <div style={{ position: "fixed", zIndex: 100 }}><SketchPicker color={props.value} onChange={(color) => {
                    if (props.onChange && typeof props.onChange === "function") {
                        props.onChange(color.hex);
                    }
                }} /></div>
            </>
            : null}
    </>
}

export default ColorSelect;