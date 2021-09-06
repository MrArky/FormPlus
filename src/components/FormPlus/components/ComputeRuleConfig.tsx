import React, { useState } from 'react';
import { Button, Modal, Tree, Tag, Tooltip, Typography } from 'antd';
import { IControlsAttrs } from '../data';

/**
 * 控件树数据接口
 */
interface IControlsAttrsTree extends IControlsAttrs {
    children: IControlsAttrsTree[]
}

export interface ComputeRuleConfigValue {
    key: string | number;
    type: string;
    label: string | number;
    value?: string;
    summary?: boolean;
    summaryStatus?: boolean;
    belongTo?: string;
    tableField?: boolean;
}
/**
 * 配置计算规则
 * @param {*} props 
 * @param {String[]} props.controlName
 * @param {ComputeRuleConfigValue[]} props.value
 * @param {(v:ComputeRuleConfigValue[])=>void} props.onChange
 * @param {*[见index]} props.controlsAttrs
 * @returns 
 */
const ComputeRuleConfig: React.FC<{ controlName: string; value?: ComputeRuleConfigValue[]; onChange?: (v?: ComputeRuleConfigValue[]) => void; controlsAttrs: IControlsAttrs[] }> = (props) => {
    const [showModal, setShowModal] = useState(false);//控制弹框显示
    const [selectedKeys] = useState([]);//已选择树节点key，现在要使用只是点击获取节点信息，所以这里面永远不会存值
    //将现有控件以树的形式进行展示
    const getControlTree = (parent: IControlsAttrsTree) => {
        let children = props.controlsAttrs.filter(c => c.belongTo == parent.name && c.tableField && ((c.name.split("_")[0] == "input" && c.dataType != "text") || c.name.split("_")[0] == "detailTable" || c.name.split("_")[0] == "compute"));
        if (children.length > 0) {
            for (let i = 0; i < children.length; i++) {
                parent.children.push(getControlTree({ ...children[i], children: [] }));
            }
        }
        return {
            ...parent,
            title: parent.describe,
            key: parent.name,
        };
    }
    const treeData: any[] = [
        {
            title: '全部',
            key: '全部',
            children: props.controlsAttrs.filter(c => (c.belongTo == "window" || c.tableField == undefined) && ((c.name.split("_")[0] == "input" && c.dataType != "text") || c.name.split("_")[0] == "detailTable" || c.name.split("_")[0] == "compute")).map(c => ({ ...c, children: [] })).map(c => getControlTree(c))
        }
    ];
    return <>
        <Button onClick={() => { setShowModal(true) }}>点击配置</Button>
        <Modal
            title="计算规则配置"
            visible={showModal}
            width={800}
            centered
            okButtonProps={{ style: { display: "none" } }}
            cancelText="关闭"
            onCancel={() => {
                setShowModal(false);
            }}
        >
            <div style={{ display: "flex", height: 400 }}>
                <div style={{ width: 200, borderRight: "1px solid #efefef" }}>
                    <Tree treeData={treeData} height={400} defaultExpandAll selectedKeys={selectedKeys} onSelect={(selectedKeys, e: any) => {
                        if (e.node.key != "全部" && e.node.key.toString().split("_")[0] != "detailTable") {
                            if (props.onChange && typeof props.onChange === "function") {
                                let computeControl: any = props.controlsAttrs.find(c => c.name == props.controlName);
                                let summary = computeControl.belongTo == e.node.belongTo && computeControl.belongTo != "window" && e.node.tableField && computeControl.tableField;
                                props.onChange([...props.value ?? [], {
                                    key: new Date().valueOf(),
                                    type: "control",
                                    label: e.node.describe,
                                    value: e.node.name,
                                    summary: summary,
                                    summaryStatus: false,
                                    belongTo: e.node.belongTo,
                                    tableField: e.node.tableField,
                                }]);
                            }
                        }
                    }} />
                </div>
                <div style={{ flex: 1, height: "100%", overflow: "auto", padding: 16, paddingTop: 0 }}>
                    <Typography.Text type="danger">注意：点击<Typography.Text mark>左侧控件</Typography.Text>和下方<Typography.Text mark>数字、运算符</Typography.Text>完成计算规则配置：</Typography.Text>
                    <div style={{ height: 152, marginTop: 8, background: "linear-gradient(90deg,rgba(211,211,211,.5) 50%,transparent 0),linear-gradient(rgba(211,211,211,.5) 50%,transparent 0)", backgroundSize: "5px 5px" }}>
                        {(props.value ?? []).map((c, i) => <Tag style={{ cursor: "pointer" }} key={i} closable onClose={e => {
                            e.preventDefault();
                            if (props.onChange && typeof props.onChange === "function") {
                                props.onChange((props.value ?? []).filter(fc => fc.key != c.key));
                            }
                        }}
                            onDoubleClick={() => {
                                let computeControl: any = props.controlsAttrs.find(c => c.name == props.controlName);
                                if (computeControl.belongTo == c.belongTo && computeControl.belongTo != "window" && c.tableField && computeControl.tableField) {
                                    if (props.onChange && typeof props.onChange === "function") {
                                        let value = props.value;
                                        let tag: any = (props.value ?? []).find(fc => fc.key == c.key);
                                        tag.summaryStatus = !tag.summaryStatus;
                                        props.onChange(value);
                                    }
                                }
                            }}
                        >{c.label}{!c.summaryStatus && c.belongTo != "window" ? "列汇总值" : ""}</Tag>)}
                    </div>
                    <div style={{ marginTop: 16 }}>
                        数字：
                        {new Array(10).fill("").map((c, i) => <Tag style={{ cursor: "pointer" }} key={i} onClick={() => {
                            if (props.onChange && typeof props.onChange === "function") {
                                props.onChange([...(props.value ?? []), {
                                    key: new Date().valueOf(),
                                    type: "num",
                                    label: i
                                }]);
                            }
                        }}>{i}</Tag>)}
                        <Tag style={{ width: 22.47, textAlign: "center", cursor: "pointer" }} onClick={() => {
                            if (props.onChange && typeof props.onChange === "function") {
                                props.onChange([...(props.value ?? []), {
                                    key: new Date().valueOf(),
                                    type: "num",
                                    label: "."
                                }]);
                            }
                        }} >.</Tag>
                    </div>
                    <div style={{ marginTop: 16 }}>
                        操作：
                        {[
                            { title: "加", label: "+" },
                            { title: "减", label: "-" },
                            { title: "乘", label: "×" },
                            { title: "除", label: "÷" },
                            { title: "取余", label: "%" },
                            { title: "左括号", label: "(" },
                            { title: "右括号", label: ")" }
                        ].map((c, i) => <Tooltip title={c.title} placement="bottom"><Tag key={i} style={{ cursor: "pointer" }} onClick={() => {
                            if (props.onChange && typeof props.onChange === "function") {
                                props.onChange([...(props.value ?? []), {
                                    key: new Date().valueOf(),
                                    type: "operator",
                                    label: c.label
                                }]);
                            }
                        }}>{c.label}</Tag></Tooltip>)}
                    </div>
                    <br />
                    <Typography.Text>特别提醒：</Typography.Text>
                    <Typography.Paragraph>
                        <ul>
                            <li>
                                <Typography.Link href="#">明细表中数值字段双击可切换为当前行的值或列汇总值。</Typography.Link>
                            </li>
                            <li>
                                <Typography.Link href="#">如果计算的结果在明细表之外，只能与明细表字段汇总值进行计算。</Typography.Link>
                            </li>
                        </ul>
                    </Typography.Paragraph>
                </div>
            </div>
        </Modal>
    </>;
}

export default ComputeRuleConfig;