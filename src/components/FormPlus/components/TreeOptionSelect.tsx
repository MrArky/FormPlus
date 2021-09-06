import React, { useMemo, useState } from 'react';
import { Button, Cascader, Modal, Typography } from 'antd';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json'; // json模式的包
import 'ace-builds/src-noconflict/theme-xcode'; // xcode皮肤
import Ajv from "ajv";//用于验证JSON是否合法
import { CascaderOptionType } from 'antd/lib/cascader';

//定义JSON格式
const schema = {
    definitions: {
        children: {
            type: "object",
            properties: {
                label: { type: "string" },
                value: { type: "string" },
                disabled: { type: "boolean" },
                children: {
                    type: "array",
                    items: [
                        { $ref: "#/definitions/children" }
                    ],
                    additionalItems: true
                }
            },
            required: ["value"],
            // additionalProperties: false,
        }
    },
    type: "array",
    items: [
        { $ref: "#/definitions/children" }
    ],
    additionalItems: true
}

// interface TreeOptionSelectOptions {
//     value: string;
//     label?: string;
//     disabled?: boolean;
//     children?: TreeOptionSelectOptions[]
// }
/**
 * 级联（树）选择器组件
 * @param {*} props 
 * @param {{defualtData:{label:String;value:String}[];options:见第9行定义}} props.value
 * @param {(v:{defualtData:{label:String;value:String}[];options:见第9行定义})=>void} props.onChange
 * @returns 
 */
const TreeOptionSelect: React.FC<{
    value?: { defaultData?: CascaderOptionType[]; options: string };
    onChange?: (v: { defaultData?: CascaderOptionType[]; options?: string }) => void
}> = (props) => {
    const [showModal, setShowModal] = useState(false);//控制弹框显示
    const demoValue = `[
    {
        "value":"",         /**必须*/
        "label":"",         /**非必须[建议配置]*/
        "disabled":false,   /**非必须*/
        "children":[        /**非必须*/
            {
            "value":"",
            "label":"",
            },
            {
            "value":"",
            "label":"",
            "children":[
                {
                    "value":"",
                    "label":"",
                },
                {
                    "value":"",
                    "label":"",
                },
                ...
            ]
            },
            ...
        ]
    },
    {
        "value":"",
        "label":"",
    },
    ...
]`;
    const CascaderRender = useMemo(() => {
        let data;
        if (props.value) {
            try {
                data = JSON.parse(props.value.options.replace(/[\r\n]/g, "").trim());
            }
            catch (e) {
                data = [];
            }
            const ajv = new Ajv();
            const validate = ajv.compile(schema);
            const valid = validate(data)
            return <Cascader
                disabled={!valid}
                placeholder={valid ? "请选择默认值" : "数据格式不正确"}
                options={valid ? data : []}
                onChange={(value, selectedOptions) => {
                    if (props.onChange && typeof props.onChange === "function") {
                        props.onChange({
                            ...props.value, defaultData: selectedOptions
                        });
                    }
                }}
            />
        }
        return;
    }, [props.value])
    return <>
        <Button type="primary" style={{ width: 90, marginBottom: 2 }} onClick={() => setShowModal(true)}>添加选项</Button>
        {CascaderRender}
        <Modal
            title="添加选项"
            visible={showModal}
            width={800}
            centered
            okButtonProps={{ style: { display: "none" } }}
            cancelText="关闭"
            onCancel={() => {
                setShowModal(false);
            }}
        >
            <Typography.Paragraph>
                请在第二个编辑器中通过<Typography.Text code>JSON</Typography.Text>的方式配置你的级联选择器数据源，配置完成后，可以在选项中查看。格式如下：
            </Typography.Paragraph>
            <div style={{ border: "1px solid #efefef" }}>
                <AceEditor
                    readOnly
                    mode='json'
                    theme="xcode"
                    fontSize={12}
                    value={demoValue}
                    style={{ width: '100%', height: 200 }}
                />
            </div>
            <Typography.Title level={5} style={{ marginTop: 8 }}>
                你的配置：
            </Typography.Title>
            <div style={{ border: "1px solid #efefef" }}>
                <AceEditor
                    mode='json'
                    theme="xcode"
                    fontSize={12}
                    onChange={(value, event) => {
                        if (props.onChange && typeof props.onChange === "function") {
                            props.onChange({
                                ...props.value, options: value
                            });
                        }
                    }}
                    value={props.value ? props.value.options : ""}
                    style={{ width: '100%', height: 200, marginTop: 0 }}
                />
            </div>
        </Modal>
    </>
}

export default TreeOptionSelect;