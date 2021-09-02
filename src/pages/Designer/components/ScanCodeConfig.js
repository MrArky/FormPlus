import React from 'react';
import { Form, Select, Radio } from 'antd';

/**
 * 宏控件——转扫描码控件
 * @param {*} props 
 * @param {{transField:String;scanCodeType:String;}} props.value
 * @param {(v:{transField:String;scanCodeType:String;})=>void} props.onChange 
 * @param {*[见index]} props.controlsAttrs
 */
const ScanCodeConfig = (props) => {
    return <>
        <Form.Item label="转码字段" style={{ marginBottom: 2 }}>
            <Select
                value={props.value ? props.value.transField : undefined}
                onChange={v => {
                    if (props.onChange && typeof props.onChange === "function") {
                        props.onChange({
                            ...props.value, transField: v
                        })
                    }
                }}
            >
                {props.controlsAttrs.map((c, i) => <Select.Option key={i} value={c.name}>{c.describe}</Select.Option>)}
            </Select>
        </Form.Item>
        <Form.Item label="选择类型" style={{ marginBottom: 2 }}>
            <Radio.Group
                value={props.value ? props.value.scanCodeType : undefined}
                options={[
                    { label: '条码', value: 'barcode' },
                    { label: '二维码', value: 'qrcode' },
                ]}
                optionType="button"
                onChange={e => {
                    if (props.onChange && typeof props.onChange === "function") {
                        props.onChange({
                            ...props.value, scanCodeType: e.target.value
                        })
                    }
                }}
            />
        </Form.Item>
    </>;
}

export default ScanCodeConfig;