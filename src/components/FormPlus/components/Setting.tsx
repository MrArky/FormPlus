import React, { useMemo, useState } from 'react';
import { Menu, Card, Form, Input, Layout, Select, InputNumber, Radio, Checkbox, Tooltip, Tree } from "antd";
import { ControlOutlined, AlignLeftOutlined, AlignCenterOutlined, AlignRightOutlined, OrderedListOutlined } from "@ant-design/icons";
import ColorSelect from './ColorSelect';
import OptionSelect from './OptionSelect';
import { useEffect } from 'react';
import ComputeRuleConfig from './ComputeRuleConfig';
import TreeOptionSelect from './TreeOptionSelect';
import { IControlsAttrs, MacroControlsConfig } from '../data';

const { Sider } = Layout;

/**
 * 二级FormItem，主要用于控制onChange的执行顺序
 */
const SubFormItem: React.FC<any> = (props: any) => {
    return <div>
        {{
            ...props.children,
            props: {
                ...props.children.props,
                value: props.value,
                onChange: (...argument: any) => {
                    props.children.props.onChange(...argument);
                    if (props.onChange && typeof props.onChange === "function") {
                        props.onChange(...argument);
                    }
                }
            }
        }}
    </div>
}


/**
 * 可拖动的树
 */
class DraggableTree extends React.Component<{
    controlsAttrs?: IControlsAttrs[];
    onChange?: (v?: IControlsAttrs[]) => void
}> {
    constructor(argument: any) {
        super(argument);
        // this.state = {
        //     treeData: (this.props.controlsAttrs ?? []).filter(c => c.belongTo == "window").map(c => {
        //         if (c.name.split("_")[0] == "detailTable") {
        //             return {
        //                 title: c.describe,
        //                 key: c.name,
        //                 children: this.props.controlsAttrs?.filter(cc => cc.belongTo == c.name && cc.name.split("_")[0] != "detailTable").map(c => ({
        //                     title: c.describe,
        //                     key: c.name
        //                 }))
        //             };
        //         }
        //         else return {
        //             title: c.describe,
        //             key: c.name
        //         };
        //     }),
        //     expandedKeys: (this.props.controlsAttrs ?? []).filter(c => c.belongTo == "window" && c.name.split("_")[0] == "detailTable").map(c => c.name),
        // };
    }
    onDragEnter = (info: any) => {
        // console.log(info);
        // expandedKeys 需要受控时设置
        // this.setState({
        //   expandedKeys: info.expandedKeys,
        // });
    };

    onDrop = (info: any) => {
        // if ((this.props.controlsAttrs?.find(c => c.name == info.dragNode.key)?.belongTo != "window"  && this.props.controlsAttrs?.find(c => c.name == info.node.key)?.belongTo == "window")
        //     || (this.props.controlsAttrs?.find(c => c.name == info.dragNode.key)?.belongTo == "window" && this.props.controlsAttrs?.find(c => c.name == info.node.key)?.belongTo != "window")) {
        //     console.warn("不能改变控件的归属");
        // }
        if ((this.props.controlsAttrs?.find(c => c.name == info.dragNode.key)?.tableField && !this.props.controlsAttrs?.find(c => c.name == info.node.key)?.tableField)
            || (!this.props.controlsAttrs?.find(c => c.name == info.dragNode.key)?.tableField && this.props.controlsAttrs?.find(c => c.name == info.node.key)?.tableField)) {
            console.warn("不能改变控件的归属");
        }
        else {
            if (this.props.onChange && typeof this.props.onChange === "function") {
                let attr: any = this.props.controlsAttrs?.find(cc => cc.name == info.dragNode.key);//获取属性
                let index: number = this.props.controlsAttrs?.findIndex(cc => cc.name == info.dragNode.key) ?? 0;//获取之前位置
                // if (this.props.controlsAttrs?.find(c => c.name == info.dragNode.key)?.belongTo == "window") {//移动主表字段位置
                if (!this.props.controlsAttrs?.find(c => c.name == info.dragNode.key)?.tableField) {//移动主表字段位置
                    if (info.dropPosition < 0) {
                        this.props.controlsAttrs?.splice(index, 1);//将拖动的属性删除
                        this.props.controlsAttrs?.unshift(attr);
                    }
                    // else if (info.dropPosition > (this.props.controlsAttrs ?? []).filter(c => c.belongTo == "window").length - 1) {
                    //     this.props.controlsAttrs.splice(index, 1);//将拖动的属性删除
                    //     this.props.controlsAttrs.push(attr);
                    // }
                    else {
                        // let targetName = this.props.controlsAttrs?.filter(cc => cc.belongTo == "window")[info.dropPosition - 1].name;
                        let targetName = this.props.controlsAttrs?.filter(cc => !cc.tableField)[info.dropPosition - 1].name;
                        let targetIndex = this.props.controlsAttrs?.findIndex(cc => cc.name == targetName);//获取目标位置
                        // let tableFieldsLength = this.props.controlsAttrs?.slice(0, targetIndex??0 + 1).filter(cc => cc.belongTo != "window").length;//获取之前位置前面表格字段个数
                        let tableFieldsLength = this.props.controlsAttrs?.slice(0, targetIndex ?? 0 + 1).filter(cc => cc.tableField).length;//获取之前位置前面表格字段个数
                        // console.log(index, tableFieldsLength);
                        this.props.controlsAttrs?.splice(info.dropPosition + tableFieldsLength, 0, attr);
                        this.props.controlsAttrs?.splice(info.dropPosition + tableFieldsLength < index ? index + 1 : index, 1);//将拖动的属性删除
                    }

                }
                else {//移动明细表字段位置
                    let detailTableName = this.props.controlsAttrs?.find(c => c.name == info.dragNode.key)?.belongTo;
                    if (this.props.controlsAttrs?.find(c => c.name == info.node.key)?.belongTo != detailTableName) {//如果node是自己（dragNode）的父元素，那么就放在node里面第一个
                        //获取明细表所有字段
                        let detailTableFields: any = this.props.controlsAttrs?.filter(cc => cc.belongTo == detailTableName);
                        //获取表第一个字段位置
                        let firstFieldIndex: number = this.props.controlsAttrs?.findIndex(cc => cc.name == detailTableFields[0].name) ?? 0;//获取之前位置
                        // if (this.props.controlsAttrs?.filter(cc => cc.belongTo == "window").findIndex(cc => cc.name == detailTableName) == info.dropPosition) {
                        this.props.controlsAttrs?.splice(index, 1);//将拖动的属性删除
                        this.props.controlsAttrs?.splice(firstFieldIndex, 0, attr);
                        // }
                    }
                    else {//如果node和自己（dragNode）的是同一级的元素，那么就放在node前面dropPosition位置
                        let targetName = this.props.controlsAttrs?.filter(cc => cc.belongTo == detailTableName)[info.dropPosition - 1].name;
                        let targetIndex = this.props.controlsAttrs?.findIndex(cc => cc.name == targetName) ?? 0;//获取目标位置
                        let tableFieldsLength = this.props.controlsAttrs?.slice(0, targetIndex + 1).filter(cc => cc.belongTo != detailTableName).length;//获取之前位置前面表格字段个数
                        // console.log(index, tableFieldsLength);
                        this.props.controlsAttrs?.splice(info.dropPosition + tableFieldsLength, 0, attr);
                        this.props.controlsAttrs?.splice(info.dropPosition + tableFieldsLength < index ? index + 1 : index, 1);//将拖动的属性删除
                    }
                }
                this.props.onChange(this.props.controlsAttrs ? [...this.props.controlsAttrs] : this.props.controlsAttrs);
            }
        }
    };
    render() {
        return (
            <Tree
                selectable={false}
                className="draggable-tree"
                // defaultExpandedKeys={(this.props.controlsAttrs ?? []).filter(c => c.belongTo == "window" && c.name.split("_")[0] == "detailTable").map(c => c.name)}
                defaultExpandedKeys={(this.props.controlsAttrs ?? []).filter(c => !c.tableField && c.name.split("_")[0] == "detailTable").map(c => c.name)}
                draggable
                blockNode
                onDragEnter={this.onDragEnter}
                onDrop={this.onDrop}
                // treeData={(this.props.controlsAttrs ?? []).filter(c => c.belongTo == "window").map(c => {
                treeData={(this.props.controlsAttrs ?? []).filter(c => !c.tableField).map(c => {
                    if (c.name.split("_")[0] == "detailTable") {
                        return {
                            title: c.describe,
                            key: c.name,
                            children: this.props.controlsAttrs?.filter(cc => cc.belongTo == c.name && cc.tableField).map(c => ({//&& cc.name.split("_")[0] != "detailTable"
                                title: c.describe,
                                key: c.name
                            }))
                        };
                    }
                    else return {
                        title: c.describe,
                        key: c.name
                    };
                })}
            />
        );
    }
}


/**
 * 属性设置面板
 * @param {*} props 
 * @param {*[见index]} props.controlAttrs 当前控件属性
 * @param {*[见index]} props.controlsAttrs 所有控件属性
 * @param {HTMLElement} props.controlElement 当前点击的控件对象
 * @param {*[见index]} props.macroControlsConfig 宏控件配置
 * @param {({[key]:[value]})=>void} props.onValuesChange 当属性设置发生改变时事件
 * @returns 
 */
const Setting: React.FC<{
    controlAttrs?: IControlsAttrs;
    controlsAttrs: IControlsAttrs[];
    controlElement?: HTMLSpanElement;
    macroControlsConfig: MacroControlsConfig[];
    onValuesChange?: (v: { [key: string]: any }) => void;
    onControlsAttrsChange: (v?: IControlsAttrs[]) => void
}> = (props) => {
    const formRef: any = React.createRef();
    const [settingPanel, setSettingPanel] = useState("attrs");
    useEffect(() => {
        if (props.controlElement && props.controlAttrs && settingPanel == "attrs") {
            formRef.current.setFieldsValue({
                ...props.controlAttrs,
                text: props.controlAttrs.text,
                ...props.controlAttrs.name.split("_")[0] == "detailTable" ? { fieldTR: props.controlAttrs.fieldTR != undefined && props.controlAttrs.fieldTR.getAttribute("detail-field") != null } : {}
            });
        }
    }, [props.controlAttrs, props.controlElement, settingPanel]);
    const MacroControlsConfig = useMemo(() => {
        let configComponent: any = props.macroControlsConfig.find(c => props.controlAttrs && c.name == props.controlAttrs.controlType)?.configComponent;
        if (!configComponent) return;
        return {
            ...configComponent,
            props: {
                ...configComponent.props,
                children: {
                    ...configComponent.props.children,
                    props: {
                        ...configComponent.props.children.props,
                        controlAttrs: props.controlAttrs
                    }
                }
            }
        };
    }, [props.macroControlsConfig]);
    return <>
        {settingPanel == "attrs" ? <Sider theme="light" width={300} trigger={null} collapsible collapsed={false}>
            <Card size="small" title="属性" bodyStyle={{ height: "calc(100vh - 152px)" }} >
                {props.controlElement && props.controlAttrs
                    && props.controlAttrs.name.split("_")[0] != "detailTable"
                    && props.controlAttrs.name.split("_")[0] != "image" && props.controlAttrs.name.split("_")[0] != "file"
                    ? <Form
                        ref={formRef}
                        size="small"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        labelAlign="left"
                        onValuesChange={(values) => {
                            if (props.onValuesChange && typeof props.onValuesChange === "function") {
                                //如果是宏控件并且宏控件发生了改变，那么他对应的配置也应该清空
                                props.onValuesChange({
                                    ...props.controlAttrs,
                                    ...values,
                                    ...values.controlType ? { macroConfig: undefined } : {},
                                    ...values.dataType ? { format: undefined } : {}
                                });
                            }
                        }}
                    >
                        {/* 文本 */}
                        <Form.Item name="name" label="控件名称" style={{ marginBottom: 2 }} >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item name="border" label="边框" tooltip="鼠标移至字母处显示提示语" style={{ marginBottom: 2 }}>
                            <SubFormItem>
                                <Checkbox.Group options={[
                                    { label: <Tooltip title="上边框">T</Tooltip>, value: 'top' },
                                    { label: <Tooltip title="右边框">R</Tooltip>, value: 'right' },
                                    { label: <Tooltip title="下边框">B</Tooltip>, value: 'bottom' },
                                    { label: <Tooltip title="左边框">L</Tooltip>, value: 'left' },
                                ]} onChange={(v) => {
                                    if (!props.controlElement) return;
                                    props.controlElement.style.border = "none";
                                    if (v.includes("top")) {
                                        props.controlElement.style.borderTop = "1px solid #333";
                                    }
                                    if (v.includes("right")) {
                                        props.controlElement.style.borderRight = "1px solid #333";
                                    }
                                    if (v.includes("bottom")) {
                                        props.controlElement.style.borderBottom = "1px solid #333";
                                    }
                                    if (v.includes("left")) {
                                        props.controlElement.style.borderLeft = "1px solid #333";
                                    }
                                }} />
                            </SubFormItem>
                        </Form.Item>
                        <Form.Item name="describe" label="描述名称" style={{ marginBottom: 2 }}>
                            <SubFormItem>
                                <Input onChange={(e) => {
                                    if (!props.controlElement) return;
                                    props.controlElement.innerHTML = e.target.value;
                                }} />
                            </SubFormItem>
                        </Form.Item>
                        {props.controlAttrs.name.split("_")[0] == "input" || props.controlAttrs.name.split("_")[0] == "richInput" ? <Form.Item name="text" label="默认文本" style={{ marginBottom: 2 }}>
                            <Input />
                        </Form.Item> : null}
                        {props.controlAttrs.name.split("_")[0] == "input" || props.controlAttrs.name.split("_")[0] == "compute" ? <Form.Item name="dataType" label="数据类型" style={{ marginBottom: 2 }}>
                            <Radio.Group
                                options={[
                                    { label: '文本', value: 'text' },
                                    { label: '整数', value: 'integer' },
                                    { label: '小数', value: 'decimal' },
                                    ...props.controlAttrs.name.split("_")[0] == "input" ? [{ label: '时间', value: 'datetime' }] : [],
                                ]}
                                optionType="button"
                            />
                        </Form.Item> : null}
                        {(props.controlAttrs.name.split("_")[0] == "input" || props.controlAttrs.name.split("_")[0] == "compute") && props.controlAttrs.dataType == "integer" ? <Form.Item name="format" label="格式化" style={{ marginBottom: 2 }}>
                            <Select>
                                <Select.Option value="#,###">#,###</Select.Option>
                                <Select.Option value="#">#</Select.Option>
                            </Select>
                        </Form.Item> : null}
                        {(props.controlAttrs.name.split("_")[0] == "input" || props.controlAttrs.name.split("_")[0] == "compute") && props.controlAttrs.dataType == "decimal" ? <Form.Item name="format" label="格式化" style={{ marginBottom: 2 }}>
                            <Select>
                                <Select.Option value="#.#">#.#</Select.Option>
                                <Select.Option value="#.##">#.##</Select.Option>
                                <Select.Option value="#.###">#.###</Select.Option>
                                <Select.Option value="#.####">#.####</Select.Option>
                                <Select.Option value="#.*">#.####</Select.Option>
                                <Select.Option value="#,###.#">#,###.#</Select.Option>
                                <Select.Option value="#,###.##">#,###.##</Select.Option>
                                <Select.Option value="#,###.###">#,###.###</Select.Option>
                                <Select.Option value="#,###.####">#,###.####</Select.Option>
                                <Select.Option value="#,###.*">#,###.*</Select.Option>
                            </Select>
                        </Form.Item> : null}
                        {props.controlAttrs.name.split("_")[0] == "input" && props.controlAttrs.dataType == "datetime" ? <Form.Item name="picker" label="时间类型" style={{ marginBottom: 2 }}>
                            <Select>
                                <Select.Option value="date">日期</Select.Option>
                                <Select.Option value="week">周</Select.Option>
                                <Select.Option value="month">月</Select.Option>
                                <Select.Option value="quarter">季度</Select.Option>
                                <Select.Option value="year">年</Select.Option>
                            </Select>
                        </Form.Item> : null}
                        {(props.controlAttrs.name.split("_")[0] == "input" || props.controlAttrs.name.split("_")[0] == "compute") && props.controlAttrs.dataType == "datetime" ? <Form.Item name="format" label="格式化" style={{ marginBottom: 2 }}>
                            <Input />
                        </Form.Item> : null}
                        {(props.controlAttrs.name.split("_")[0] == "input" && props.controlAttrs.dataType == "text") || (props.controlAttrs.name.split("_")[0] == "compute" && props.controlAttrs.dataType == "text") || props.controlAttrs.name.split("_")[0] == "richInput" ? <Form.Item name="regular" label="正则验证" style={{ marginBottom: 2 }}>
                            <Input />
                        </Form.Item> : null}
                        <Form.Item name="autoWidth" label="适宽" style={{ marginBottom: 2 }}>
                            <SubFormItem>
                                <Radio.Group
                                    options={[
                                        { label: '否', value: false },
                                        { label: '是', value: true },
                                    ]}
                                    optionType="button"
                                    onChange={(e) => {
                                        if (!props.controlElement || !props.controlAttrs) return;
                                        if (e.target.value) props.controlElement.style.width = "100%";
                                        else props.controlElement.style.width = props.controlAttrs.width + "px";
                                    }}
                                />
                            </SubFormItem>
                        </Form.Item>
                        <Form.Item name="width" label="宽度" style={{ marginBottom: 2 }}>
                            <SubFormItem>
                                <InputNumber onChange={(v) => {
                                    if (!props.controlElement || !props.controlAttrs) return;
                                    if (v) props.controlElement.style.width = v + "px";
                                    else props.controlElement.style.width = props.controlAttrs.width + "px";
                                }} disabled={props.controlAttrs.autoWidth} />
                            </SubFormItem>
                        </Form.Item>
                        <Form.Item name="height" label="高度" style={{ marginBottom: 2 }}>
                            <SubFormItem>
                                <InputNumber onChange={(v) => {
                                    if (!props.controlElement || !props.controlAttrs) return;
                                    if (v) props.controlElement.style.height = v + "px";
                                    else props.controlElement.style.height = props.controlAttrs.height + "px";
                                }} />
                            </SubFormItem>
                        </Form.Item>
                        <Form.Item name="align" label="对齐方式" style={{ marginBottom: 2 }}>
                            <SubFormItem>
                                <Radio.Group
                                    options={[
                                        { label: <AlignLeftOutlined />, value: 'left' },
                                        { label: <AlignCenterOutlined />, value: 'center' },
                                        { label: <AlignRightOutlined />, value: 'right' },
                                    ]}
                                    optionType="button"
                                    onChange={(e) => {
                                        if (!props.controlElement) return;
                                        props.controlElement.style.setProperty("text-align", e.target.value, "important");
                                    }}
                                />
                            </SubFormItem>
                        </Form.Item>
                        <Form.Item name="bold" label="加粗" style={{ marginBottom: 2 }}>
                            <SubFormItem>
                                <Radio.Group
                                    options={[
                                        { label: '否', value: false },
                                        { label: '是', value: true },
                                    ]}
                                    optionType="button"
                                    onChange={(e) => {
                                        if (!props.controlElement) return;
                                        if (e.target.value) props.controlElement.style.setProperty("font-weight", "600", "important");
                                        else props.controlElement.style.removeProperty("font-weight");
                                    }}
                                />
                            </SubFormItem>
                        </Form.Item>
                        <Form.Item name="italic" label="斜体" style={{ marginBottom: 2 }}>
                            <SubFormItem>
                                <Radio.Group
                                    options={[
                                        { label: '否', value: false },
                                        { label: '是', value: true },
                                    ]}
                                    optionType="button"
                                    onChange={(e) => {
                                        if (!props.controlElement) return;
                                        if (e.target.value) props.controlElement.style.setProperty("font-style", "italic", "important");
                                        else props.controlElement.style.removeProperty("font-style");
                                    }}
                                />
                            </SubFormItem>
                        </Form.Item>
                        <Form.Item name="color" label="颜色" style={{ marginBottom: 2 }}>
                            <SubFormItem>
                                <ColorSelect onChange={v => {
                                    if (!props.controlElement) return;
                                    props.controlElement.style.setProperty("color", v, "important");
                                }} />
                            </SubFormItem>
                        </Form.Item>
                        <Form.Item name="fontFamily" label="字体" style={{ marginBottom: 2 }}>
                            <SubFormItem>
                                <Select onChange={(v: string) => {
                                    if (!props.controlElement) return;
                                    props.controlElement.style.setProperty("font-family", v, "important");
                                }}>
                                    <Select.Option value="微软雅黑">微软雅黑</Select.Option>
                                    <Select.Option value="宋体">宋体</Select.Option>
                                </Select>
                            </SubFormItem>
                        </Form.Item>
                        <Form.Item name="fontSize" label="字号(px)" style={{ marginBottom: 2 }}>
                            <SubFormItem>
                                <InputNumber onChange={(v) => {
                                    if (!props.controlElement) return;
                                    if (v) props.controlElement.style.setProperty("font-size", v + "px", "important");
                                    else props.controlElement.style.removeProperty("font-size");
                                }} />
                            </SubFormItem>
                        </Form.Item>
                        {/* 富文本 */}
                        {props.controlAttrs.name.split("_")[0] == "richInput" ? <Form.Item name="editControl" label="编辑控件" style={{ marginBottom: 2 }}>
                            <Radio.Group
                                options={[
                                    { label: '文本框', value: 'textarea' },
                                    { label: '编辑器', value: 'editor' },
                                ]}
                                optionType="button"
                            />
                        </Form.Item> : null}
                        {/* 下拉选择器 */}
                        {props.controlAttrs.name.split("_")[0] == "listBox" || props.controlAttrs.name.split("_")[0] == "radio" || props.controlAttrs.name.split("_")[0] == "checkBox" ? <Form.Item name="options" label="选项" style={{ marginBottom: 2 }}>
                            <OptionSelect mode={props.controlAttrs.name.split("_")[0] == "checkBox" || (props.controlAttrs.name.split("_")[0] == "listBox" && props.controlAttrs.multiple) ? "multiple" : undefined} />
                        </Form.Item> : null}
                        {props.controlAttrs.name.split("_")[0] == "listBox" ? <Form.Item name="multiple" label="多选" style={{ marginBottom: 2 }}>
                            <Radio.Group
                                options={[
                                    { label: '否', value: false },
                                    { label: '是', value: true },
                                ]}
                                optionType="button"
                            />
                        </Form.Item> : null}
                        {/* 单选、多选 */}
                        {props.controlAttrs.name.split("_")[0] == "radio" || props.controlAttrs.name.split("_")[0] == "checkBox" ? <Form.Item name="layout" label="展示" style={{ marginBottom: 2 }}>
                            <Radio.Group
                                options={[
                                    { label: '横排', value: 'horizontal' },
                                    { label: '竖排', value: 'vertical' },
                                    { label: '下拉选择器', value: 'select' },
                                ]}
                                optionType="button"
                            />
                        </Form.Item> : null}
                        {/* 计算控件 */}
                        {props.controlAttrs.name.split("_")[0] == "compute" ? <Form.Item name="roundType" label="进位法" style={{ marginBottom: 2 }}>
                            <Radio.Group
                                options={[
                                    { label: '进一法', value: 'roundUp' },
                                    { label: '四舍五入法', value: 'round' },
                                    { label: '去尾法', value: 'roundDown' },
                                ]}
                                optionType="button"
                            />
                        </Form.Item> : null}
                        {props.controlAttrs.name.split("_")[0] == "compute" ? <Form.Item name="computeRule" label="计算规则" style={{ marginBottom: 2 }}>
                            <ComputeRuleConfig controlName={props.controlAttrs.name} controlsAttrs={props.controlsAttrs} />
                        </Form.Item> : null}
                        {/* 宏控件 */}
                        {props.controlAttrs.name.split("_")[0] == "macro" ? <Form.Item name="controlType" label="控件类型" style={{ marginBottom: 2 }}>
                            <Select>
                                {props.macroControlsConfig.map((c, i) => <Select.Option key={i} value={c.name}>{c.name}</Select.Option>)}
                            </Select>
                        </Form.Item> : null}
                        {MacroControlsConfig}
                        {/* 级联选择器 */}
                        {props.controlAttrs.name.split("_")[0] == "treeListBox" ? <Form.Item name="options" label="选项" style={{ marginBottom: 2 }}>
                            <TreeOptionSelect />
                        </Form.Item> : null}
                        <Form.Item name="allowedModify" label="允许修改" style={{ marginBottom: 2 }}>
                            <SubFormItem>
                                <Radio.Group
                                    options={[
                                        { label: '否', value: false },
                                        { label: '是', value: true },
                                    ]}
                                    optionType="button"
                                    onChange={(e) => {
                                        if (!props.controlElement) return;
                                        if (e.target.value) props.controlElement.removeAttribute("disabled");
                                        else props.controlElement.setAttribute("disabled", "disabled");
                                    }}
                                />
                            </SubFormItem>
                        </Form.Item>
                    </Form> : null}
                {props.controlElement && props.controlAttrs && props.controlAttrs.name.split("_")[0] == "detailTable" ? <Form
                    ref={formRef}
                    size="small"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    labelAlign="left"
                    onValuesChange={(values) => {
                        if (props.onValuesChange && typeof props.onValuesChange === "function") {
                            props.onValuesChange({ ...props.controlAttrs, ...values });
                        }
                    }}
                >
                    {/* 文本 */}
                    <Form.Item name="name" label="控件名称" style={{ marginBottom: 2 }} >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="describe" label="描述名称" style={{ marginBottom: 2 }}>
                        <SubFormItem>
                            <Input onChange={(e) => {
                                if (!props.controlElement) return;
                                props.controlElement.setAttribute("title", e.target.value);
                            }} />
                        </SubFormItem>
                    </Form.Item>
                    {props.controlAttrs.fieldTR != undefined ? <Form.Item name="fieldTR" label="录入行" style={{ marginBottom: 2 }}>
                        <SubFormItem>
                            <Radio.Group
                                options={[
                                    { label: '否', value: false },
                                    { label: '是', value: true },
                                ]}
                                optionType="button"
                                onChange={(e) => {
                                    if (!props.controlElement || !props.controlAttrs) return;
                                    if (e.target.value) {

                                        //先将此表格所有的行全部清除背景
                                        let trs = props.controlElement.getElementsByTagName("tr");
                                        for (let i = 0; i < trs.length; i++) {
                                            trs[i].removeAttribute("detail-field");
                                        }
                                        //再设置当前行
                                        if (props.controlAttrs.fieldTR) props.controlAttrs.fieldTR.setAttribute("detail-field", "true");
                                    }
                                    else {
                                        if (props.controlAttrs.fieldTR) props.controlAttrs.fieldTR.removeAttribute("detail-field");
                                    }
                                }}
                            />
                        </SubFormItem>
                    </Form.Item> : null}
                </Form> : null}
                {props.controlElement && props.controlAttrs && (props.controlAttrs.name.split("_")[0] == "image" || props.controlAttrs.name.split("_")[0] == "file") ? <Form
                    ref={formRef}
                    size="small"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    labelAlign="left"
                    onValuesChange={(values) => {
                        if (props.onValuesChange && typeof props.onValuesChange === "function") {
                            props.onValuesChange({ ...props.controlAttrs, ...values });
                        }
                    }}
                >
                    <Form.Item name="name" label="控件名称" style={{ marginBottom: 2 }} >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="border" label="边框" tooltip="鼠标移至字母处显示提示语" style={{ marginBottom: 2 }}>
                        <SubFormItem>
                            <Checkbox.Group options={[
                                { label: <Tooltip title="上边框">T</Tooltip>, value: 'top' },
                                { label: <Tooltip title="右边框">R</Tooltip>, value: 'right' },
                                { label: <Tooltip title="下边框">B</Tooltip>, value: 'bottom' },
                                { label: <Tooltip title="左边框">L</Tooltip>, value: 'left' },
                            ]} onChange={(v) => {
                                if (!props.controlElement) return;
                                props.controlElement.style.border = "none";
                                if (v.includes("top")) {
                                    props.controlElement.style.borderTop = "1px solid #333";
                                }
                                if (v.includes("right")) {
                                    props.controlElement.style.borderRight = "1px solid #333";
                                }
                                if (v.includes("bottom")) {
                                    props.controlElement.style.borderBottom = "1px solid #333";
                                }
                                if (v.includes("left")) {
                                    props.controlElement.style.borderLeft = "1px solid #333";
                                }
                            }} />
                        </SubFormItem>
                    </Form.Item>
                    <Form.Item name="describe" label="描述名称" style={{ marginBottom: 2 }}>
                        <SubFormItem>
                            <Input onChange={(e) => {
                                if (!props.controlElement) return;
                                props.controlElement.setAttribute("title", e.target.value);
                            }} />
                        </SubFormItem>
                    </Form.Item>
                    <Form.Item name="autoWidth" label="适宽" style={{ marginBottom: 2 }}>
                        <SubFormItem>
                            <Radio.Group
                                options={[
                                    { label: '否', value: false },
                                    { label: '是', value: true },
                                ]}
                                optionType="button"
                                onChange={(e) => {
                                    if (!props.controlElement || !props.controlAttrs) return;
                                    if (e.target.value) props.controlElement.style.width = "100%";
                                    else props.controlElement.style.width = props.controlAttrs.width + "px";
                                }}
                            />
                        </SubFormItem>
                    </Form.Item>
                    <Form.Item name="width" label="宽度" style={{ marginBottom: 2 }}>
                        <SubFormItem>
                            <InputNumber onChange={(v) => {
                                if (!props.controlElement || !props.controlAttrs) return;
                                if (v) props.controlElement.style.width = v + "px";
                                else props.controlElement.style.width = props.controlAttrs.width + "px";
                            }} disabled={props.controlAttrs.autoWidth} />
                        </SubFormItem>
                    </Form.Item>
                    <Form.Item name="height" label="高度" style={{ marginBottom: 2 }}>
                        <SubFormItem>
                            <InputNumber onChange={(v) => {
                                if (!props.controlElement || !props.controlAttrs) return;
                                if (v) props.controlElement.style.height = v + "px";
                                else props.controlElement.style.height = props.controlAttrs.height + "px";
                            }} />
                        </SubFormItem>
                    </Form.Item>
                    <Form.Item name="allowedModify" label="允许修改" style={{ marginBottom: 2 }}>
                        <SubFormItem>
                            <Radio.Group
                                options={[
                                    { label: '否', value: false },
                                    { label: '是', value: true },
                                ]}
                                optionType="button"
                                onChange={(e) => {
                                    if (!props.controlElement) return;
                                    if (e.target.value) props.controlElement.removeAttribute("disabled");
                                    else props.controlElement.setAttribute("disabled", "disabled");
                                }}
                            />
                        </SubFormItem>
                    </Form.Item>
                </Form> : null}
            </Card>
        </Sider> : null}
        {settingPanel == "fields" ? <Sider theme="light" width={300} trigger={null} collapsible collapsed={false}>
            <Card size="small" title="字段" bodyStyle={{ height: "calc(100vh - 152px)", overflowX: "hidden" }} >
                <DraggableTree onChange={(controlsAttrs) => {
                    if (props.onControlsAttrsChange && typeof props.onControlsAttrsChange === "function") {
                        //如果是宏控件并且宏控件发生了改变，那么他对应的配置也应该清空
                        props.onControlsAttrsChange(controlsAttrs);
                    }
                }} controlsAttrs={props.controlsAttrs} />
            </Card>
        </Sider> : null}
        <Sider collapsedWidth={40} theme="light" trigger={null} collapsible collapsed={true} style={{ height: "calc(100vh - 112px)" }}>
            <Menu mode="inline" selectedKeys={[]} style={{ height: "100%" }}>
                <Menu.Item key="attrs" icon={<ControlOutlined />} onClick={() => setSettingPanel("attrs")}>
                    属性
                </Menu.Item>
                <Menu.Item key="fields" icon={<OrderedListOutlined />} onClick={() => setSettingPanel("fields")}>
                    字段
                </Menu.Item>
                {/* <Menu.Item key="help" icon={<InfoCircleOutlined />}>
                    帮助
                </Menu.Item> */}
            </Menu>
        </Sider>
    </>
}
export default Setting;
