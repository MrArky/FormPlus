/**
 * 判断组件归属
 * @param {*} el 
 * @returns 
 */
export function getControlBelongTo(el) {
    var parentElement = el.parentElement;
    while (parentElement) {
        if (parentElement.tagName === 'BODY') {
            return 'window';
        }
        if (parentElement.className === 'mceTmpl') {
            return parentElement.id;
        }
        parentElement = parentElement.parentElement;
    }
}
/**
 * 获取上级组件
 * @param {*} el 
 * @returns 
 */
export function getParentControl(el) {
    var parentElement = el.parentElement;
    while (parentElement) {
        if (parentElement.tagName === 'BODY') {
            return undefined;
        }
        if (parentElement.className === 'mceTmpl') {
            return parentElement;
        }
        parentElement = parentElement.parentElement;
    }
}

/**
 * 从HTMLCollection中输出所有控件的id
 * @param {*} HTMLCollection 
 */
export function getIdsFromHTMLCollection(HTMLCollection) {
    let ids = [];
    for (let i = 0; i < HTMLCollection.length; i++) {
        ids.push(HTMLCollection[i].id);
    }
    return ids;
}

/**
 * 获取组件上级元素是否存在TR且有属性有detail-field="true"
 * @param {*} el 
 * @returns 
 */
export function getParentDetailTableFieldTr(el) {
    var parentElement = el.parentElement;
    while (parentElement) {
        if (parentElement.tagName === 'BODY') {
            return undefined;
        }
        if (parentElement.tagName === "TR" && parentElement.getAttribute("detail-field")) {
            return parentElement;
        }
        parentElement = parentElement.parentElement;
    }
}