import React, { useState } from 'react';
import { Divider, Input, Select, Modal } from 'antd';
import { PlusOutlined, MinusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
/**
 * 下拉选择器选项设置控件
 * @param {*} props 
 * @param {{defualtData:{label:String;value:String};options:{label:String;value:String}[]}} props.value
 * @param {(v:{defualtData:{label:String;value:String};options:{label:String;value:String}[]})=>void} props.onChange
 * @param {String} props.mode 
 * @returns 
 */
const OptionSelect = (props) => {
    const [addItemValue, setAddItemValue] = useState();
    return <Select
        labelInValue
        showSearch
        mode={props.mode}
        menuItemSelectedIcon={null}
        value={props.value && props.value.defualtData ? (props.mode == "multiple" ? props.value.defualtData : (props.value.defualtData[0] ?? undefined)) : (props.mode == "multiple" ? [] : undefined)}
        placeholder="请选择默认值"
        dropdownRender={menu => (
            <div>
                {menu}
                <Divider style={{ margin: '4px 0' }} />
                <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                    <Input size="small" style={{ flex: 'auto' }} value={addItemValue} onChange={e => setAddItemValue(e.target.value)} />
                    <a
                        style={{ flex: 'none', display: 'block', cursor: 'pointer', marginLeft: 10 }}
                        onClick={() => {
                            if (addItemValue && addItemValue.trim() != "") {
                                if (props.onChange && typeof props.onChange === "function") {
                                    props.onChange({ defualtData: props.value?.defualtData, options: [...(props.value ? props.value.options : []), { label: addItemValue, value: (new Date()).valueOf() }] });
                                }
                                setAddItemValue(undefined);
                            }
                        }}
                    >
                        <PlusOutlined /> 添加选项
                    </a>
                </div>
            </div>
        )}
        onChange={v => {
            if (props.onChange && typeof props.onChange === "function") {
                if (props.mode == "multiple") props.onChange({ ...props.value, defualtData: (v ? v.map(c => ({ label: c.label.props != undefined ? c.label.props.children[0].props.children : c.label, value: c.value })) : []) });
                else props.onChange({ ...props.value, defualtData: [{ label: v.label.props != undefined ? v.label.props.children[0].props.children : v.label, value: v.value }] });
            }
        }}
    >
        {(props.value ? props.value.options : []).map(item => (
            <Option key={item.value} value={item.label + "|▲|" + item.value}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span>{item.label}</span><MinusOutlined style={{ color: "#1890ff" }} onClick={e => {
                e.stopPropagation();
                Modal.confirm({
                    title: '删除选项',
                    icon: <ExclamationCircleOutlined />,
                    content: '确认删除吗？删除后可能对历史数据造成影响。',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        if (props.onChange && typeof props.onChange === "function") {
                            props.onChange({ defualtData: props.value?.defualtData.filter(c => item.label + "|▲|" + item.value != c.value), options: (props.value ? props.value.options : []).filter(c => c.value != item.value) });
                            // else props.onChange({ defualtData: (props.value && props.value.defualtData ? item.label + "|▲|" + item.value == props.value.defualtData.value ? undefined : props.value.defualtData.value : undefined), options: (props.value ? props.value.options : []).filter(c => c.value != item.value) });
                        }
                    }
                });
            }} /></div></Option>
        ))}
    </Select>
}

export default OptionSelect;