import React, { useState } from "react";
import { Layout, Space, Form, Input } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import LetfToolBar from "./components/LetfToolBar";
import Setting from "./components/Setting";
import DesignerBoard from "./components/DesignerBoard";
import "./index.css";
import { getIdsFromHTMLCollection, getParentDetailTableFieldTr } from './utils/utils';
import AmountInWordsConfig from './components/AmountInWordsConfig';
import ScanCodeConfig from './components/ScanCodeConfig';
import { IControlsAttrs, MacroControlsConfig } from "./data";
import "antd/dist/antd.css";


const { Header, Sider, Content } = Layout;
const FormPlus: React.FC<{
    value?: {
        controlsAttrs?: IControlsAttrs[],
        html?: string;
    }
    onChange?: (v: {
        controlsAttrs?: IControlsAttrs[],
        html?: string;
    }) => void
    extra?: React.ReactNode
}> = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [controlType, setControlType] = useState<string>();//当前选择的需要加入表单的组件
    // const [controlsAttrs, setControlsAttrs] = useState<IControlsAttrs[]>([]);//已经添加的控件属性
    const [removeControlsAttrs, setRemoveControlsAttrs] = useState<IControlsAttrs[]>([]);//已经移除的控件属性
    const [controlElement, setControlElement] = useState<HTMLSpanElement>();//当前点击的控件
    //宏控件配置
    const macroControlsConfig: MacroControlsConfig[] = [
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
        { name: "金额大写", data: {}, configComponent: <Form.Item name="macroConfig" label="控件配置" style={{ marginBottom: 2 }}><AmountInWordsConfig controlsAttrs={props.value?.controlsAttrs ?? []}></AmountInWordsConfig></Form.Item> },
        { name: "扫描码", data: {}, configComponent: <Form.Item name="macroConfig" label="控件配置" style={{ marginBottom: 2 }}><ScanCodeConfig controlsAttrs={props.value?.controlsAttrs ?? []}></ScanCodeConfig></Form.Item> },
    ]
    return <Layout style={{ minHeight: 0, height: "100vh" }}>
        <Sider theme="light" trigger={null} collapsible collapsed={collapsed} style={{ height: "100vh" }}>
            <div style={{
                height: 32, margin: 16, background: "#4d5c6a", textAlign: "center", lineHeight: "32px", color: "#fff", fontWeight: 600
            }}>表单设计器</div>
            <LetfToolBar onSelected={(type: string) => {
                let id = (new Date()).valueOf();
                setControlType(type + "_" + id);
                if (props.onChange && typeof props.onChange === "function") {
                    switch (type) {
                        case "input":
                            props.onChange({
                                html: props.value?.html,
                                controlsAttrs: [...(props.value?.controlsAttrs ?? []), {
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
                                }]
                            });
                            break;
                        case "richInput":
                            props.onChange({
                                html: props.value?.html,
                                controlsAttrs: [...(props.value?.controlsAttrs ?? []), {
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
                                }]
                            });
                            break;
                        case "radio":
                            props.onChange({
                                html: props.value?.html,
                                controlsAttrs: [...(props.value?.controlsAttrs ?? []), {
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
                                }]
                            });
                            break;
                        case "checkBox":
                            props.onChange({
                                html: props.value?.html,
                                controlsAttrs: [...(props.value?.controlsAttrs ?? []), {
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
                                }]
                            });
                            break;
                        case "listBox":
                            props.onChange({
                                html: props.value?.html,
                                controlsAttrs: [...(props.value?.controlsAttrs ?? []), {
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
                                }]
                            });
                            break;
                        case "compute":
                            props.onChange({
                                html: props.value?.html,
                                controlsAttrs: [...(props.value?.controlsAttrs ?? []), {
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
                                }]
                            });
                            break;
                        case "macro":
                            props.onChange({
                                html: props.value?.html,
                                controlsAttrs: [...(props.value?.controlsAttrs ?? []), {
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
                                }]
                            });
                            break;
                        case "detailTable":
                            props.onChange({
                                html: props.value?.html,
                                controlsAttrs: [...(props.value?.controlsAttrs ?? []), {
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
                                }]
                            });
                            break;
                        case "treeListBox":
                            props.onChange({
                                html: props.value?.html,
                                controlsAttrs: [...(props.value?.controlsAttrs ?? []), {
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
                                }]
                            });
                            break;
                        case "image":
                            props.onChange({
                                html: props.value?.html,
                                controlsAttrs: [...(props.value?.controlsAttrs ?? []), {
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
                                }]
                            });
                            break;
                    }
                }
            }} />
        </Sider>
        <Layout className="site-layout" style={{ minHeight: 0, height: "100vh" }}>
            <Header style={{ padding: 0, backgroundColor: "#fff", boxShadow: "1px 1px 4px rgb(0 21 41 / 8%)", position: "relative", zIndex: 10 }}>
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
                        {props.extra}
                    </Space>
                </div>
            </Header>
            <Content style={{ minHeight: "auto", height: "calc(100vh - 68px)" }}>
                <Layout className="site-layout" style={{ minHeight: "auto", height: "calc(100vh - 68px)" }}>
                    <DesignerBoard
                        controlType={controlType}
                        onControlSelect={(control, srcElement) => {
                            if (control && control.id.split("_")[0] == "detailTable") {
                                if (srcElement && srcElement.tagName == "TR") {
                                    // setControlsAttrs(controlsAttrs.map(c => ({
                                    //     ...c,
                                    //     ...control.id == c.name ? { fieldTR: srcElement } : {}//如果选择了行，就放入属性的数据中
                                    // })));
                                    if (props.onChange && typeof props.onChange === "function") {
                                        props.onChange({
                                            html:
                                                props.value?.html,
                                            controlsAttrs: (props.value?.controlsAttrs ?? []).map(c => ({
                                                ...c,
                                                ...control.id == c.name ? { fieldTR: srcElement } : {}//如果选择了行，就放入属性的数据中
                                            }))
                                        });
                                    }
                                }
                                else {
                                    // setControlsAttrs(controlsAttrs.map(c => ({
                                    //     ...c,
                                    //     ...control.id == c.name ? { fieldTR: undefined } : {}//如果选择了行，就放入属性的数据中
                                    // })));
                                    if (props.onChange && typeof props.onChange === "function") {
                                        props.onChange({
                                            html:
                                                props.value?.html,
                                            controlsAttrs: (props.value?.controlsAttrs ?? []).map(c => ({
                                                ...c,
                                                ...control.id == c.name ? { fieldTR: undefined } : {}//如果选择了行，就放入属性的数据中
                                            }))
                                        });
                                    }
                                }
                            }
                            //获取控件的信息并且显示在右侧属性栏中
                            setControlElement(control);
                        }}
                        onEditorChange={(htmlStr, controlIds) => {
                            setControlElement(undefined);//有可能删除的就是当前选中的控件，为了防止设置属性组件报错，这里将属性重置为未选择控件状态
                            //1.将删除的控件属性也删掉,回退则将回退的组件加上
                            //1.1在删除前，将其放入缓存中
                            let _removeControlsAttrs = (props.value?.controlsAttrs ?? []).filter(c => !controlIds.map(con => con.name).includes(c.name));
                            //1.2删除
                            let resultControlsAttrs = (props.value?.controlsAttrs ?? []).filter(c => controlIds.map(con => con.name).includes(c.name));
                            //1.3将controlIds有，controlsAttrs没有，且缓存removeControlsAttrs里有的数据加入controlsAttrs
                            let recoveryControlsAttrs = removeControlsAttrs.filter((c: any) => controlIds.map(con => con.name).includes(c.name) && !(props.value?.controlsAttrs ?? []).map(con => con.name).includes(c.name));
                            recoveryControlsAttrs = recoveryControlsAttrs.filter((c: any) => !resultControlsAttrs?.map(cc => cc.name).includes(c.name));
                            resultControlsAttrs = [...resultControlsAttrs ?? [], ...recoveryControlsAttrs];
                            //1.4将缓存里对应的控件删掉，回退的则加上
                            setRemoveControlsAttrs([...removeControlsAttrs.filter(c => !recoveryControlsAttrs.map(cc => cc.name).includes(c.name)), ..._removeControlsAttrs ?? []]);

                            //2.给组件指定其父组件
                            let iframe: any = document.getElementsByClassName("tox-edit-area__iframe"); //HTMLIFrameElement
                            resultControlsAttrs = resultControlsAttrs.map(c => {
                                let control = iframe[0].contentWindow.document.getElementById(c.name);
                                let controlIdItem: any = controlIds.find(conn => conn.name == c.name);
                                return {
                                    ...c,
                                    belongTo: controlIdItem.belongTo,
                                    //如果这个组件是个新增组件，刚好又是明细表子组件，且当前行设置为了编辑行
                                    ...controlIdItem.belongTo != "window" ? //那就是明细表组件
                                        (getParentDetailTableFieldTr(control) ?//自己上级组件出现了TR元素，且有属性有detail-field="true"
                                            { tableField: true } :
                                            {}
                                        ) :
                                        {} //全局组件
                                }
                            });
                            // setControlsAttrs(resultControlsAttrs);
                            if (props.onChange && typeof props.onChange === "function") {
                                props.onChange({
                                    html: htmlStr,
                                    controlsAttrs: resultControlsAttrs
                                });
                            }
                        }}
                    />
                    <Setting
                        controlAttrs={controlElement ? (props.value?.controlsAttrs ?? []).find(c => c.name == controlElement.id) : undefined}
                        controlsAttrs={props.value?.controlsAttrs ?? []}
                        controlElement={controlElement}
                        macroControlsConfig={macroControlsConfig}
                        onValuesChange={(values) => {
                            if (controlElement && props.value?.controlsAttrs) {
                                let controlsAttr: any = props.value?.controlsAttrs.find(c => c.name == values.name);
                                if (typeof values.fieldTR === "boolean") {
                                    //说明srcElement这是明细表的当前选择的行
                                    //将这个行里面的字段全部标记位明细表字段

                                    //1.将原有明细表的控件全部设置为非表单字段
                                    let newControlsAttrs = props.value?.controlsAttrs.map(c => ({
                                        ...c,
                                        ...getIdsFromHTMLCollection(controlElement.getElementsByClassName("mceTmpl")).includes(c.name) ? { tableField: undefined } : {}
                                    }));
                                    if (values.fieldTR) {
                                        //2.将选择的行包含的字段设置为表单字段
                                        newControlsAttrs = newControlsAttrs.map(c => ({
                                            ...c,
                                            ...getIdsFromHTMLCollection(controlsAttr.fieldTR.getElementsByClassName("mceTmpl")).includes(c.name) ? { tableField: true } : {}
                                        }));
                                    }
                                    // setControlsAttrs(newControlsAttrs);
                                    if (props.onChange && typeof props.onChange === "function") {
                                        props.onChange({
                                            html:
                                                props.value?.html,
                                            controlsAttrs: newControlsAttrs
                                        });
                                    }
                                    return;
                                }
                                // setControlsAttrs([...controlsAttrs.filter(c => c.name != values.name), { ...controlsAttr, ...values }])
                                if (props.onChange && typeof props.onChange === "function") {
                                    props.onChange({
                                        html:
                                            props.value?.html,
                                        controlsAttrs: [...props.value?.controlsAttrs.filter(c => c.name != values.name), { ...controlsAttr, ...values }]
                                    });
                                }
                            }
                        }}
                    />
                </Layout>
            </Content>
        </Layout>
    </Layout >;
}

export default FormPlus;