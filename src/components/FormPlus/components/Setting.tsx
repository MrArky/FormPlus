import React from 'react';
import { Menu, Card, Form, Input, Layout, Select, InputNumber, Radio, Checkbox, Tooltip } from "antd";
import { ControlOutlined, AlignLeftOutlined, AlignCenterOutlined, AlignRightOutlined } from "@ant-design/icons";
import ColorSelect from './ColorSelect';
import OptionSelect from './OptionSelect';
import { useEffect } from 'react';
import ComputeRuleConfig from './ComputeRuleConfig';
import TreeOptionSelect from './TreeOptionSelect';
import { IControlsAttrs, MacroControlsConfig } from '../data';

const { Sider } = Layout;
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
    onValuesChange?: (v: { [key: string]: any }) => void
}> = (props) => {
    const formRef: any = React.createRef();
    useEffect(() => {
        if (props.controlElement && props.controlAttrs) {
            formRef.current.setFieldsValue({
                ...props.controlAttrs,
                ...props.controlAttrs.name.split("_")[0] == "detailTable" ? { fieldTR: props.controlAttrs.fieldTR != undefined && props.controlAttrs.fieldTR.getAttribute("detail-field") != null } : {}
            });
        }
    }, [props.controlAttrs, props.controlElement]);
    return <>
        <Sider theme="light" width={300} trigger={null} collapsible collapsed={false}>
            <Card size="small" title="属性" bodyStyle={{ height: "calc(100vh - 104px)" }} >
                {props.controlElement && props.controlAttrs
                    && props.controlAttrs.name.split("_")[0] != "detailTable"
                    && props.controlAttrs.name.split("_")[0] != "image"
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
                        </Form.Item>
                        <Form.Item name="describe" label="描述名称" style={{ marginBottom: 2 }}>
                            <Input onChange={(e) => {
                                if (!props.controlElement) return;
                                props.controlElement.innerHTML = e.target.value;
                            }} />
                        </Form.Item>
                        {props.controlAttrs.name.split("_")[0] == "input" || props.controlAttrs.name.split("_")[0] == "richInput" ? <Form.Item name="text" label="默认文本" style={{ marginBottom: 2 }}>
                            <Input />
                        </Form.Item> : null}
                        {props.controlAttrs.name.split("_")[0] == "input" || props.controlAttrs.name.split("_")[0] == "compute" ? <Form.Item name="dataType" label="数据类型" style={{ marginBottom: 2 }}>
                            <Radio.Group
                                options={[
                                    ...props.controlAttrs.name.split("_")[0] == "input" ? [{ label: '文本', value: 'text' }] : [],
                                    { label: '整数', value: 'integer' },
                                    { label: '小数', value: 'decimal' },
                                    { label: '时间', value: 'datetime' },
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
                                <Select.Option value="#,###.#">#.#</Select.Option>
                                <Select.Option value="#,###.##">#.##</Select.Option>
                                <Select.Option value="#,###.###">#.###</Select.Option>
                                <Select.Option value="#,###.####">#.####</Select.Option>
                                <Select.Option value="#,###.*">#.####</Select.Option>
                            </Select>
                        </Form.Item> : null}
                        {(props.controlAttrs.name.split("_")[0] == "input" || props.controlAttrs.name.split("_")[0] == "compute") && props.controlAttrs.dataType == "datetime" ? <Form.Item name="format" label="格式化" style={{ marginBottom: 2 }}>
                            <Input />
                        </Form.Item> : null}
                        <Form.Item name="autoWidth" label="适宽" style={{ marginBottom: 2 }}>
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
                        </Form.Item>
                        <Form.Item name="width" label="宽度" style={{ marginBottom: 2 }}>
                            <InputNumber onChange={(v) => {
                                if (!props.controlElement || !props.controlAttrs) return;
                                if (v) props.controlElement.style.width = v + "px";
                                else props.controlElement.style.width = props.controlAttrs.width + "px";
                            }} disabled={props.controlAttrs.autoWidth} />
                        </Form.Item>
                        <Form.Item name="height" label="高度" style={{ marginBottom: 2 }}>
                            <InputNumber onChange={(v) => {
                                if (!props.controlElement || !props.controlAttrs) return;
                                if (v) props.controlElement.style.height = v + "px";
                                else props.controlElement.style.height = props.controlAttrs.height + "px";
                            }} />
                        </Form.Item>
                        <Form.Item name="align" label="对齐方式" style={{ marginBottom: 2 }}>
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
                        </Form.Item>
                        <Form.Item name="bold" label="加粗" style={{ marginBottom: 2 }}>
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
                        </Form.Item>
                        <Form.Item name="italic" label="斜体" style={{ marginBottom: 2 }}>
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
                        </Form.Item>
                        <Form.Item name="color" label="颜色" style={{ marginBottom: 2 }}>
                            <ColorSelect onChange={v => {
                                if (!props.controlElement) return;
                                props.controlElement.style.setProperty("color", v, "important");
                            }} />
                        </Form.Item>
                        <Form.Item name="fontFamily" label="字体" style={{ marginBottom: 2 }}>
                            <Select onChange={(v: string) => {
                                if(!props.controlElement) return;
                                props.controlElement.style.setProperty("font-family", v, "important");
                            }}>
                                <Select.Option value="微软雅黑">微软雅黑</Select.Option>
                                <Select.Option value="宋体">宋体</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="fontSize" label="字号(px)" style={{ marginBottom: 2 }}>
                            <InputNumber onChange={(v) => {
                                if(!props.controlElement) return;
                                if (v) props.controlElement.style.setProperty("font-size", v + "px", "important");
                                else props.controlElement.style.removeProperty("font-size");
                            }} />
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
                        {props.macroControlsConfig.find(c =>props.controlAttrs && c.name == props.controlAttrs.controlType)?.configComponent}
                        {/* 级联选择器 */}
                        {props.controlAttrs.name.split("_")[0] == "treeListBox" ? <Form.Item name="options" label="选项" style={{ marginBottom: 2 }}>
                            <TreeOptionSelect />
                        </Form.Item> : null}
                        <Form.Item name="allowedModify" label="允许修改" style={{ marginBottom: 2 }}>
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
                        <Input onChange={(e) => {
                            if (!props.controlElement) return;
                            props.controlElement.setAttribute("title", e.target.value);
                        }} />
                    </Form.Item>
                    {props.controlAttrs.fieldTR != undefined ? <Form.Item name="fieldTR" label="录入行" style={{ marginBottom: 2 }}>
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
                    </Form.Item> : null}
                </Form> : null}
                {props.controlElement && props.controlAttrs && props.controlAttrs.name.split("_")[0] == "image" ? <Form
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
                    </Form.Item>
                    <Form.Item name="describe" label="描述名称" style={{ marginBottom: 2 }}>
                        <Input onChange={(e) => {
                            if (!props.controlElement) return;
                            props.controlElement.setAttribute("title", e.target.value);
                        }} />
                    </Form.Item>
                    <Form.Item name="autoWidth" label="适宽" style={{ marginBottom: 2 }}>
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
                    </Form.Item>
                    <Form.Item name="width" label="宽度" style={{ marginBottom: 2 }}>
                        <InputNumber onChange={(v) => {
                            if (!props.controlElement || !props.controlAttrs) return;
                            if (v) props.controlElement.style.width = v + "px";
                            else props.controlElement.style.width = props.controlAttrs.width + "px";
                        }} disabled={props.controlAttrs.autoWidth} />
                    </Form.Item>
                    <Form.Item name="height" label="高度" style={{ marginBottom: 2 }}>
                        <InputNumber onChange={(v) => {
                            if (!props.controlElement || !props.controlAttrs) return;
                            if (v) props.controlElement.style.height = v + "px";
                            else props.controlElement.style.height = props.controlAttrs.height + "px";
                        }} />
                    </Form.Item>
                </Form> : null}
            </Card>
        </Sider>
        <Sider collapsedWidth={40} theme="light" trigger={null} collapsible collapsed={true} style={{ height: "calc(100vh - 68px)" }}>
            <Menu mode="inline" selectedKeys={[]} style={{ height: "100%" }}>
                <Menu.Item key="1" icon={<ControlOutlined />}>
                    属性
                </Menu.Item>
                {/* <Menu.Item key="2" icon={<InfoCircleOutlined />}>
                    帮助
                </Menu.Item> */}
            </Menu>
        </Sider>
    </>
}
export default Setting;