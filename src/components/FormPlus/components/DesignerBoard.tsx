import React from 'react';
import { Layout } from 'antd';
import { useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { getControlBelongTo, getParentControl } from '../utils/utils';

const { Content } = Layout;
/**
 * 设计面板
 * @param {*} props 
 * @param {String} props.controlType
 * @param {(control:HTMLElement, srcElement:HTMLElement)=>void} props.onControlSelect
 * @param {(htmlStr:String, controlIds:{belongTo:String;name:String})=>void} props.onEditorChange
 * @returns 
 */
const DesignerBoard: React.FC<{
    controlType?: string;
    onControlSelect?: (control?: HTMLSpanElement, srcElement?: HTMLTableRowElement) => void;
    onEditorChange?: (htmlStr: string, controlIds: { belongTo?: string; name: string }[]) => void
}> = (props) => {
    const editorRef: any = useRef(null);//编辑器ref对象
    //添加控件
    useEffect(() => {
        if (props.controlType) {
            switch (props.controlType.split("_")[0]) {
                case "input": editorRef.current.editor.execCommand('mceInsertContent', false, '<control id="' + props.controlType + '" class="mceTmpl" style="width:100px;height:22px;" contenteditable="false">文本框</control>');
                    break;
                case "richInput": editorRef.current.editor.execCommand('mceInsertContent', false, '<control id="' + props.controlType + '" class="mceTmpl" style="width:150px;height:100px;" contenteditable="false">多行文本框</control>');
                    break;
                case "radio": editorRef.current.editor.execCommand('mceInsertContent', false, '<control id="' + props.controlType + '" class="mceTmpl" style="width:100px;height:22px;" contenteditable="false">单选</control>');
                    break;
                case "checkBox": editorRef.current.editor.execCommand('mceInsertContent', false, '<control id="' + props.controlType + '" class="mceTmpl" style="width:100px;height:22px;" contenteditable="false">复选</control>');
                    break;
                case "listBox": editorRef.current.editor.execCommand('mceInsertContent', false, '<control id="' + props.controlType + '" class="mceTmpl" style="width:100px;height:22px;" contenteditable="false">下拉选择器</control>');
                    break;
                case "compute": editorRef.current.editor.execCommand('mceInsertContent', false, '<control id="' + props.controlType + '" class="mceTmpl" style="width:100px;height:22px;" contenteditable="false">计算控件</control>');
                    break;
                case "macro": editorRef.current.editor.execCommand('mceInsertContent', false, '<control id="' + props.controlType + '" class="mceTmpl" style="width:100px;height:22px;" contenteditable="false" disabled="disabled">宏控件</control>');
                    break;
                case "detailTable": editorRef.current.editor.execCommand('mceInsertContent', false, '<table id="' + props.controlType + '" style="font-size:16px;" class="mceTmpl" width="100%" data-field="detail-table" border="1" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table>');
                    break;
                case "treeListBox": editorRef.current.editor.execCommand('mceInsertContent', false, '<control id="' + props.controlType + '" class="mceTmpl" style="width:100px;height:22px;" contenteditable="false">级联选择器</control>');
                    break;
                case "image": editorRef.current.editor.execCommand('mceInsertContent', false, '<control id="' + props.controlType + '" class="mceTmpl" style="width:100px;height:100px;" contenteditable="false">图片</control>');
                    break;
            }
        }
    }, [props.controlType]);
    return <Content
        style={{
            minHeight: 280,
            height: "calc(100vh - 65px)",
            overflow: "auto",
            textAlign: "center",
            boxSizing: "border-box"
        }}
    >
        <Editor
            ref={editorRef}
            apiKey=""
            init={{
                height: document.body.clientHeight - 65,
                plugins: 'print preview importcss tinydrive searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap emoticons',
                // plugins: 'print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker imagetools textpattern noneditable help formatpainter permanentpen pageembed charmap tinycomments mentions linkchecker emoticons advtable export',
                // mobile: {
                //     plugins: 'print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker textpattern noneditable help formatpainter pageembed charmap mentions quickbars linkchecker emoticons advtable'
                // },
                contextmenu: "",
                menu: {//自定义菜单，比如将评论拿出来
                    tc: {
                        title: 'TinyComments',
                        items: 'addcomment showcomments deleteallconversations'
                    }
                },
                menubar: 'file edit view insert format tools table tc help',
                // toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
                toolbar: ' undo redo | bold italic | forecolor backcolor | template codesample | alignleft aligncenter alignright alignjustify | bullist numlist | link image insertfile tinydrive',
                // autosave_ask_before_unload: true,//开启自动保存
                // autosave_interval: '30s',//自动保存间隔时间
                // autosave_prefix: '{path}{query}-{id}-',//自动保存链接
                // autosave_restore_when_empty: false,
                // autosave_retention: '2m',
                // image_advtab: true,
                // importcss_append: true,
                // templates: [
                //     { title: '明细子表', description: '创建一个明细表', content: '<div class="mceTmpl"><table width="100%" data-field="detail-table" border="1" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
                //     { title: '文本框', description: '创建一个文本框', content: '<span class="mceTmpl" style="width:100px;height:22px;background-color:yellow;display:inline-block;" contenteditable="false">文本框</span>' },
                //     { title: '多行文本框', description: '创建一个多行文本框', content: '<span class="mceTmpl" style="width:200px;height:100px;background-color:yellow;display:inline-block;" contenteditable="false">多行文本框</span>' },
                // ],
                // template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
                // template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
                // image_caption: true,
                quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',//选中某些内容快速编辑
                noneditable_noneditable_class: 'mceNonEditable',
                // toolbar_mode: 'sliding',
                // spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
                tinycomments_mode: 'embedded',
                content_style: `html{
                        background-color:#f0f2f5;
                        text-align: center;
                    }
                    body{
                        min-width:794px;
                        background-color: #ffffff;
                        padding:14px;
                        display:inline-block;
                        text-align: left;
                        font-family:"宋体"
                    }
                    p{}
                    .mceTmpl[disabled]{
                        background: repeating-linear-gradient( 
                            45deg
                            , rgb(0 0 0 / 30%), rgb(0 0 0 / 30%) 2px, #fff 2px, #fff 5px );
                    }
                    .mceTmpl tr[detail-field]{
                        background: repeating-linear-gradient( 
                            45deg
                            , rgb(76 207 134 / 30%), rgb(76 207 134 / 30%) 2px, #fff 2px, #fff 5px );
                    }
                    control[class='mceTmpl']{
                        background-color:#f7f7f7!important;
                        display:inline-block!important;
                        font-size:16px!important;
                        overflow: hidden!important;
                        text-overflow: ellipsis!important;
                        white-space: nowrap!important;
                        font-weight:initial!important;
                        font-style: initial!important;
                        color:#000000!important;
                        text-align:left!important;
                        font-family:'宋体'!important;
                        vertical-align: bottom;
                    }
                    `,
                // contextmenu: 'link image imagetools table configurepermanentpen',
                language: 'zh_CN',
                extended_valid_elements: 'control[disabled|id|class|style|contenteditable]',//设置合法的属性（不被过滤掉）
            }}
            onEditorChange={(a, editor) => {
                //查询所有的控件是否有被删除
                let iframe: any = document.getElementsByClassName("tox-edit-area__iframe"); //HTMLIFrameElement
                let controls = iframe[0].contentWindow.document.getElementsByClassName('mceTmpl');
                let controlsArrar = [];
                for (let i = 0; i < controls.length; i++) {
                    controlsArrar.push({
                        belongTo: getControlBelongTo(controls[i]),
                        name: controls[i].id
                    });
                }
                if (props.onEditorChange && typeof props.onEditorChange === "function") {
                    props.onEditorChange(a, controlsArrar);
                }
            }}
            onInit={() => {
                // let iframe = document.getElementsByClassName("tox-edit-area__iframe");
                // iframe[0].contentWindow.document.addEventListener("click", (ev) => {
                //     ev = ev || window.event;//可以打印整个ev看看
                //     if (ev.srcElement.className === 'mceTmpl') {
                //         // console.log(window.getComputedStyle(ev.srcElement, null));
                //         if (props.onControlSelect && typeof props.onControlSelect === "function") {
                //             props.onControlSelect(ev.srcElement, ev.srcElement);
                //         }
                //         return;
                //     }
                //     if (getParentControl(ev.srcElement) && getParentControl(ev.srcElement).className === 'mceTmpl') {
                //         // console.log(window.getComputedStyle(ev.srcElement.parentElement.parentElement.parentElement, null));
                //         if (props.onControlSelect && typeof props.onControlSelect === "function") {
                //             props.onControlSelect(getParentControl(ev.srcElement), ev.srcElement);
                //         }
                //         return;
                //     }
                //     props.onControlSelect(undefined);
                // });
            }}
            onClick={(ev: any) => {
                ev = ev || window.event;//可以打印整个ev看看
                if (ev.srcElement && ev.srcElement.className === 'mceTmpl') {
                    if (props.onControlSelect && typeof props.onControlSelect === "function") {
                        props.onControlSelect(ev.srcElement, ev.srcElement);
                    }
                    return;
                }
                let element = getParentControl(ev.srcElement);
                if (getParentControl(ev.srcElement) && element && element.className === 'mceTmpl') {
                    if (props.onControlSelect && typeof props.onControlSelect === "function") {
                        props.onControlSelect(getParentControl(ev.srcElement), ev.srcElement);
                    }
                    return;
                }
                if (props.onControlSelect && typeof props.onControlSelect === "function") {
                    props.onControlSelect();
                }
            }}
        />
    </Content>
}

export default DesignerBoard;
