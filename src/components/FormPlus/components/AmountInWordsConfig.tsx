import React from 'react';
import { Form, Select } from 'antd';
import { IControlsAttrs } from '../data';

/**
 * 金额转大写配置
 * @param {*} props 
 * @param {{priceField:String;precision:String;}} props.value
 * @param {(v:{priceField:String;precision:String;})=>void} props.onChange 
 * @param {*[见index]} props.controlsAttrs
 * @returns 
 */
const AmountInWordsConfig: React.FC<{ value?: { priceField: string; precision: string; }; onChange?: (v: { priceField?: string; precision?: string; }) => void;controlsAttrs:IControlsAttrs[] }> = (props) => {
    return <>
        <Form.Item label="金额字段" style={{ marginBottom: 2 }}>
            <Select
                value={props.value ? props.value.priceField : undefined}
                onChange={v => {
                    if (props.onChange && typeof props.onChange === "function") {
                        props.onChange({
                            ...props.value, priceField: v
                        })
                    }
                }}
            >
                {props.controlsAttrs.filter(c => (c.name.split("_")[0] == "input" && c.dataType != "text") || c.name.split("_")[0] == "compute").map((c, i) => <Select.Option key={i} value={c.name}>{c.describe}</Select.Option>)}
            </Select>
        </Form.Item>
        <Form.Item label="转换精度" style={{ marginBottom: 2 }}>
            <Select
                value={props.value ? props.value.precision : undefined}
                onChange={v => {
                    if (props.onChange && typeof props.onChange === "function") {
                        props.onChange({
                            ...props.value, precision: v
                        })
                    }
                }}
            >
                <Select.Option value="圆">圆</Select.Option>
                <Select.Option value="角">角</Select.Option>
                <Select.Option value="分">分</Select.Option>
                <Select.Option value="厘">厘</Select.Option>
                <Select.Option value="毫">毫</Select.Option>
            </Select>
        </Form.Item>
    </>
}

export default AmountInWordsConfig;