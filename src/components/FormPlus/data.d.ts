import React from "react";

/**
 * 控件属性配置接口
 */
export interface IControlsAttrs {
    name: string;
    border?: string[];
    text?: string;
    describe?: string;
    dataType?: string;
    format?: string;
    autoWidth?: boolean;
    width?: number;
    height?: number;
    align?: string;
    bold?: boolean;
    italic?: boolean;
    color?: string;
    fontFamily?: string;
    fontSize?: number;
    editControl?: string;
    options?: { defualtData: LabelValue, options: LabelValue[] };
    multiple?: boolean;
    layout?: string;
    controlType?: string;
    allowedModify?: boolean;
    fieldTR?: HTMLTableRowElement;
    roundType?: string;
    computeRule?: any[];
    macroConfig?: any;
    belongTo?: string;
    tableField?: boolean;
}


export interface LabelValue {
    label: string;
    value: number;
    disabled?: boolean;
    children: LabelValue[];
}

/**
 * 宏控件配置接口
 */
export interface MacroControlsConfig {
    name: string;
    data: any;
    configComponent: React.ReactNode;
}