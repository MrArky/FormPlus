import React, { useState } from "react";
import { Layout, Menu, Space, Button, Dropdown, Form, Input } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined, PictureOutlined, FileSearchOutlined, PrinterOutlined, FilePdfOutlined } from "@ant-design/icons";
import 'antd/dist/antd.css';
import LetfToolBar from "./components/LetfToolBar";
import Setting from "./components/Setting";
import DesignerBoard from "./components/DesignerBoard";
import "./index.css";
import { getIdsFromHTMLCollection, getParentDetailTableFieldTr } from './../../utils/utils';
import AmountInWordsConfig from './components/AmountInWordsConfig';
import ScanCodeConfig from './components/ScanCodeConfig';

const { Header, Sider, Content } = Layout;
const Designer = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [controlType, setControlType] = useState();//当前选择的需要加入表单的组件
    const [controlsAttrs, setControlsAttrs] = useState([]);//已经添加的控件属性
    const [controlElement, setControlIdElement] = useState();//当前点击的控件
    //宏控件配置
    const macroControlsConfig = [
        { name: "当前年份", data: {}, configComponent: <Form.Item name="macroConfig" label="控件配置" style={{ marginBottom: 2 }}><Input /></Form.Item> },
        { name: "当前月份", data: {}, configComponent: <Form.Item name="macroConfig" label="控件配置" style={{ marginBottom: 2 }}><Input /></Form.Item> },
        { name: "当前季度", data: {}, configComponent: <Form.Item name="macroConfig" label="控件配置" style={{ marginBottom: 2 }}><Input /></Form.Item> },
        { name: "当前日期", data: {}, configComponent: <Form.Item name="macroConfig" label="控件配置" style={{ marginBottom: 2 }}><Input /></Form.Item> },
        { name: "当前时间", data: {}, configComponent: <Form.Item name="macroConfig" label="控件配置" style={{ marginBottom: 2 }}><Input /></Form.Item> },
        { name: "流程名称", data: {}, configComponent: <></> },
        { name: "发起人部门", data: {}, configComponent: <></> },
        { name: "发起人职位", data: {}, configComponent: <></> },
        { name: "发起人岗位", data: {}, configComponent: <></> },
        { name: "当前处理人名称", data: {}, configComponent: <></> },
        { name: "当前处理人部门", data: {}, configComponent: <></> },
        { name: "当前处理人职位", data: {}, configComponent: <></> },
        { name: "当前处理人岗位", data: {}, configComponent: <></> },
        { name: "流程编号", data: {}, configComponent: <></> },
        { name: "发起人名称", data: {}, configComponent: <></> },
        { name: "金额大写", data: {}, configComponent: <Form.Item name="macroConfig" label="控件配置" style={{ marginBottom: 2 }}><AmountInWordsConfig controlsAttrs={controlsAttrs}></AmountInWordsConfig></Form.Item> },
        { name: "扫描码", data: {}, configComponent: <Form.Item name="macroConfig" label="控件配置" style={{ marginBottom: 2 }}><ScanCodeConfig controlsAttrs={controlsAttrs}></ScanCodeConfig></Form.Item> },
    ]
    return <Layout>
        <Sider theme="light" trigger={null} collapsible collapsed={collapsed} style={{ height: "100vh" }}>
            <div style={{
                height: 32, margin: 16, background: "#4d5c6a", textAlign: "center", lineHeight: "32px", color: "#fff", fontWeight: 600
            }}>logo</div>
            <LetfToolBar onSelected={(type) => {
                let id = (new Date()).valueOf();
                setControlType(type + "_" + id);
                switch (type) {
                    case "input":
                        setControlsAttrs([...controlsAttrs, {
                            name: type + "_" + id,
                            border: [],
                            text: "",
                            describe: "文本框",
                            dataType: "text",
                            format: undefined,
                            autoWidth: false,
                            width: 100,
                            height: 22,
                            align: "left",
                            bold: false,
                            italic: false,
                            color: "#000000",
                            fontFamily: "宋体",
                            fontSize: 16,
                            // editControl:"textarea"
                            // options:undefined,
                            // multiple:false,
                            // layout:"horizontal",
                            // controlType:undefined,
                            allowedModify: true,
                            // fieldTR: undefined,
                            // roundType:"round",
                            // computeRule:undefined,
                            // macroConfig:undefined,
                        }]);
                        break;
                    case "richInput":
                        setControlsAttrs([...controlsAttrs, {
                            name: type + "_" + id,
                            border: [],
                            text: "",
                            describe: "多行文本框",
                            // dataType: "text",
                            // format: undefined,
                            autoWidth: false,
                            width: 150,
                            height: 100,
                            align: "left",
                            bold: false,
                            italic: false,
                            color: "#000000",
                            fontFamily: "宋体",
                            fontSize: 16,
                            editControl: "textarea",
                            // options:undefined,
                            // multiple:false,
                            // layout:"horizontal",
                            // controlType:undefined,
                            allowedModify: true,
                            // fieldTR: undefined,
                            // roundType:"round",
                            // computeRule:undefined,
                            // macroConfig:undefined,
                        }]);
                        break;
                    case "radio":
                        setControlsAttrs([...controlsAttrs, {
                            name: type + "_" + id,
                            border: [],
                            // text: "单选",
                            describe: "单选",
                            // dataType: "text",
                            // format: undefined,
                            autoWidth: false,
                            width: 100,
                            height: 22,
                            align: "left",
                            bold: false,
                            italic: false,
                            color: "#000000",
                            fontFamily: "宋体",
                            fontSize: 16,
                            // editControl:"textarea",
                            options: undefined,
                            // multiple:false,
                            layout: "horizontal",
                            // controlType:undefined,
                            allowedModify: true,
                            // fieldTR: undefined,
                            // roundType:"round",
                            // computeRule:undefined,
                            // macroConfig:undefined,
                        }]);
                        break;
                    case "checkBox":
                        setControlsAttrs([...controlsAttrs, {
                            name: type + "_" + id,
                            border: [],
                            // text: "",
                            describe: "复选",
                            // dataType: "text",
                            // format: undefined,
                            autoWidth: false,
                            width: 100,
                            height: 22,
                            align: "left",
                            bold: false,
                            italic: false,
                            color: "#000000",
                            fontFamily: "宋体",
                            fontSize: 16,
                            // editControl:"textarea",
                            options: undefined,
                            // multiple:false,
                            layout: "horizontal",
                            // controlType:undefined,
                            allowedModify: true,
                            // fieldTR: undefined,
                            // roundType:"round",
                            // computeRule:undefined,
                            // macroConfig:undefined,
                        }]);
                        break;
                    case "listBox":
                        setControlsAttrs([...controlsAttrs, {
                            name: type + "_" + id,
                            border: [],
                            // text: "",
                            describe: "下拉选择器",
                            // dataType: "text",
                            // format: undefined,
                            autoWidth: false,
                            width: 100,
                            height: 22,
                            align: "left",
                            bold: false,
                            italic: false,
                            color: "#000000",
                            fontFamily: "宋体",
                            fontSize: 16,
                            // editControl:"textarea",
                            options: undefined,
                            multiple: false,
                            layout: "horizontal",
                            // controlType:undefined,
                            allowedModify: true,
                            // fieldTR: undefined,
                            // roundType:"round"
                            // computeRule:undefined,
                            // macroConfig:undefined,
                        }]);
                        break;
                    case "compute":
                        setControlsAttrs([...controlsAttrs, {
                            name: type + "_" + id,
                            border: [],
                            // text: "",
                            describe: "计算控件",
                            dataType: "integer",
                            format: undefined,
                            autoWidth: false,
                            width: 100,
                            height: 22,
                            align: "left",
                            bold: false,
                            italic: false,
                            color: "#000000",
                            fontFamily: "宋体",
                            fontSize: 16,
                            // editControl:"textarea"
                            // options:undefined,
                            // multiple:false,
                            // layout:"horizontal",
                            // controlType:undefined,
                            allowedModify: true,
                            // fieldTR: undefined,
                            roundType: "round",
                            computeRule: [],
                            // macroConfig:undefined,
                        }]);
                        break;
                    case "macro":
                        setControlsAttrs([...controlsAttrs, {
                            name: type + "_" + id,
                            border: [],
                            // text: "",
                            describe: "宏控件",
                            // dataType: "text",
                            // format: undefined,
                            autoWidth: false,
                            width: 100,
                            height: 22,
                            align: "left",
                            bold: false,
                            italic: false,
                            color: "#000000",
                            fontFamily: "宋体",
                            fontSize: 16,
                            // editControl:"textarea",
                            options: undefined,
                            multiple: false,
                            layout: "horizontal",
                            controlType: undefined,
                            allowedModify: false,
                            // fieldTR: undefined,
                            // roundType:"round"
                            // computeRule:undefined,
                            macroConfig: undefined,
                        }]);
                        break;
                    case "detailTable":
                        setControlsAttrs([...controlsAttrs, {
                            name: type + "_" + id,
                            // border: [],
                            // text: "",
                            describe: "明细表",
                            // dataType: "text",
                            // format: undefined,
                            // autoWidth: false,
                            // width: 100,
                            // height: 22,
                            // align: "left",
                            // bold: false,
                            // italic: false,
                            // color: "#000000",
                            // fontFamily: "宋体",
                            // fontSize: 16,
                            // editControl:"textarea"
                            // options:undefined,
                            // multiple:false,
                            // layout:"horizontal",
                            // controlType:undefined,
                            // allowedModify: true,
                            fieldTR: undefined,
                            // roundType:"round",
                            // computeRule:undefined,
                            // macroConfig:undefined,
                        }]);
                        break;
                    case "treeListBox":
                        setControlsAttrs([...controlsAttrs, {
                            name: type + "_" + id,
                            border: [],
                            // text: "",
                            describe: "级联选择器",
                            // dataType: "text",
                            // format: undefined,
                            autoWidth: false,
                            width: 100,
                            height: 22,
                            align: "left",
                            bold: false,
                            italic: false,
                            color: "#000000",
                            fontFamily: "宋体",
                            fontSize: 16,
                            // editControl:"textarea",
                            options: undefined,
                            // multiple: false,
                            // layout: "horizontal",
                            // controlType:undefined,
                            allowedModify: true,
                            // fieldTR: undefined,
                            // roundType:"round"
                            // computeRule:undefined,
                            // macroConfig:undefined,
                        }]);
                        break;
                    case "image":
                        setControlsAttrs([...controlsAttrs, {
                            name: type + "_" + id,
                            border: [],
                            // text: "",
                            describe: "图片",
                            // dataType: "text",
                            // format: undefined,
                            autoWidth: false,
                            width: 100,
                            height: 100,
                            // align: "left",
                            // bold: false,
                            // italic: false,
                            // color: "#000000",
                            // fontFamily: "宋体",
                            // fontSize: 16,
                            // editControl:"textarea",
                            // options: undefined,
                            // multiple: false,
                            // layout: "horizontal",
                            // controlType: undefined,
                            // allowedModify: true,
                            // fieldTR: undefined,
                            // roundType:"round"
                            // computeRule:undefined,
                            // macroConfig: undefined,
                        }]);
                        break;
                }
            }} />
        </Sider>
        <Layout className="site-layout">
            <Header style={{ padding: 0, backgroundColor: "#fff", boxShadow: "1px 1px 4px rgb(0 21 41 / 8%)", position: "relative", zIndex: 100 }}>
                <div style={{ padding: "0 24px" }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        style: {
                            fontSize: 18,
                            lineHeight: "64px",
                            cursor: "pointer",
                            transition: "color 0.3s",
                        },
                        onClick: () => setCollapsed(!collapsed),
                    })}
                    <Space style={{ float: "right" }}>
                        <Button><FileSearchOutlined onClick={() => {
                            console.log(controlsAttrs);
                        }} />保存</Button>
                        {/* <Button type="primary"><FileSearchOutlined />预览</Button>
                        <Button><PrinterOutlined />打印</Button>
                        <Dropdown overlay={<Menu>
                            <Menu.Item icon={<PictureOutlined />}>图片</Menu.Item>
                            <Menu.Item icon={<FilePdfOutlined />}>PDF</Menu.Item>
                        </Menu>}>
                            <Button> 导出 </Button>
                        </Dropdown> */}
                    </Space>
                </div>
            </Header>
            <Content>
                <Layout className="site-layout">
                    <DesignerBoard
                        controlType={controlType}
                        onControlSelect={(control, srcElement) => {
                            if (control && control.id.split("_")[0] == "detailTable") {
                                if (srcElement && srcElement.tagName == "TR") {
                                    setControlsAttrs(controlsAttrs.map(c => ({
                                        ...c,
                                        ...control.id == c.name ? { fieldTR: srcElement } : {}//如果选择了行，就放入属性的数据中
                                    })));
                                }
                                else {
                                    setControlsAttrs(controlsAttrs.map(c => ({
                                        ...c,
                                        ...control.id == c.name ? { fieldTR: undefined } : {}//如果选择了行，就放入属性的数据中
                                    })));
                                }
                            }
                            //获取空间的信息并且显示在右侧属性栏中
                            setControlIdElement(control);
                        }}
                        onEditorChange={(htmlStr, controlIds) => {
                            setControlIdElement(undefined);//有可能删除的就是当前选中的控件，为了防止设置属性组件报错，这里将属性重置为未选择控件状态
                            //1.将删除的控件属性也删掉
                            let resultControlsAttrs = controlsAttrs.filter(c => controlIds.map(con => con.name).includes(c.name));
                            //2.给组件指定其父组件
                            let iframe = document.getElementsByClassName("tox-edit-area__iframe");
                            resultControlsAttrs = resultControlsAttrs.map(c => {
                                let control = iframe[0].contentWindow.document.getElementById(c.name);
                                return {
                                    ...c,
                                    belongTo: controlIds.find(conn => conn.name == c.name).belongTo,
                                    //如果这个组件是个新增组件，刚好又是明细表子组件，且当前行设置为了编辑行
                                    ...controlIds.find(conn => conn.name == c.name).belongTo != "window" ? //那就是明细表组件
                                        (getParentDetailTableFieldTr(control) ?//自己上级组件出现了TR元素，且有属性有detail-field="true"
                                            { tableField: true } :
                                            {}
                                        ) :
                                        {} //全局组件
                                }
                            });
                            setControlsAttrs(resultControlsAttrs);
                        }}
                    />
                    <Setting
                        controlAttrs={controlElement ? controlsAttrs.find(c => c.name == controlElement.id) : {}}
                        controlsAttrs={controlsAttrs}
                        controlElement={controlElement}
                        macroControlsConfig={macroControlsConfig}
                        onValuesChange={(values) => {
                            if (typeof values.fieldTR === "boolean") {
                                //说明srcElement这是明细表的当前选择的行
                                //将这个行里面的字段全部标记位明细表字段

                                //1.将原有明细表的控件全部设置为非表单字段
                                let newControlsAttrs = controlsAttrs.map(c => ({
                                    ...c,
                                    ...getIdsFromHTMLCollection(controlElement.getElementsByClassName("mceTmpl")).includes(c.name) ? { tableField: undefined } : {}
                                }));
                                if (values.fieldTR) {
                                    //2.将选择的行包含的字段设置为表单字段
                                    newControlsAttrs = newControlsAttrs.map(c => ({
                                        ...c,
                                        ...getIdsFromHTMLCollection(controlsAttrs.find(c => c.name == values.name).fieldTR.getElementsByClassName("mceTmpl")).includes(c.name) ? { tableField: true } : {}
                                    }));
                                }
                                setControlsAttrs(newControlsAttrs);
                                return;
                            }
                            setControlsAttrs([...controlsAttrs.filter(c => c.name != values.name), { ...controlsAttrs.find(c => c.name == values.name), ...values }])
                        }}
                    />
                </Layout>
            </Content>
        </Layout>
    </Layout>;
}

export default Designer;