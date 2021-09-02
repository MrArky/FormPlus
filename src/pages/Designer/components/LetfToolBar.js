import React from 'react';
import { Menu } from "antd";
import { FieldStringOutlined, MinusOutlined, CodeOutlined, EditOutlined, FormOutlined, TableOutlined, PictureOutlined, CalculatorOutlined, BarcodeOutlined, BlockOutlined, InfoCircleOutlined } from "@ant-design/icons";

/**
 * 左侧菜单栏
 * @param {*} props 
 * @param {(type:String)=>void} props.onSelected
 * @returns 
 */
const LetfToolBar = (props) => {
    return <Menu mode="inline" selectedKeys={[]} style={{ height: "calc(100% - 64px)" }}>
        <Menu.Item key="input" icon={<EditOutlined />} onClick={() => { if (props.onSelected && typeof props.onSelected === "function") props.onSelected("input") }}>
            文本框
        </Menu.Item>
        <Menu.Item key="richInput" icon={<FormOutlined />} onClick={() => { if (props.onSelected && typeof props.onSelected === "function") props.onSelected("richInput") }}>
            多行文本框
        </Menu.Item>
        <Menu.Item key="radio" icon={<InfoCircleOutlined />} onClick={() => { if (props.onSelected && typeof props.onSelected === "function") props.onSelected("radio") }}>
            单选
        </Menu.Item>
        <Menu.Item key="checkBox" icon={<InfoCircleOutlined />} onClick={() => { if (props.onSelected && typeof props.onSelected === "function") props.onSelected("checkBox") }}>
            复选
        </Menu.Item>
        <Menu.Item key="listBox" icon={<BlockOutlined />} onClick={() => { if (props.onSelected && typeof props.onSelected === "function") props.onSelected("listBox") }}>
            下拉选择器
        </Menu.Item>
        <Menu.Item key="compute" icon={<CalculatorOutlined />} onClick={() => { if (props.onSelected && typeof props.onSelected === "function") props.onSelected("compute") }}>
            计算控件
        </Menu.Item>
        <Menu.Item key="macro" icon={<CodeOutlined />} onClick={() => { if (props.onSelected && typeof props.onSelected === "function") props.onSelected("macro") }}>
            宏控件
        </Menu.Item>
        <Menu.Item key="detailTable" icon={<TableOutlined />} onClick={() => { if (props.onSelected && typeof props.onSelected === "function") props.onSelected("detailTable") }}>
            明细子表
        </Menu.Item>
        <Menu.Item key="treeListBox" icon={<BlockOutlined />} onClick={() => { if (props.onSelected && typeof props.onSelected === "function") props.onSelected("treeListBox") }}>
            级联选择器
        </Menu.Item>
        <Menu.Item key="image" icon={<PictureOutlined />} onClick={() => { if (props.onSelected && typeof props.onSelected === "function") props.onSelected("image") }}>
            图片
        </Menu.Item>
    </Menu>
}

export default LetfToolBar;