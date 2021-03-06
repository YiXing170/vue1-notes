import { query, mergeAttrs, replace } from '../utils';
import { compile } from '../compile';

function $compile () {
    const { $options: options } = this; // 合并mixins后的配置
    // 获取元素
    options.el = this.$el = query(options.el);
    const temp = transclude(this.$el, options); // 按照temlate生成的dom片段
    if (temp) {
        this.$el = temp;
        options.el.innerHTML = '';
        replace(options.el, this.$el); // el上的属性合并到$el上
    }
    compile(this, this.$el);  // 如果没有传入template，则this.$el为传入的挂载点，否则为新生成的dom
}

/**
 * 处理template
 * @param {*} el 
 * @param {*} options 
 */
function transclude (el, options) {
    if (options.template) {
        const template = options.template.trim();
        const node = document.createElement('div');
        node.innerHTML = template;
        let frag = extractContent(node, true);
        frag = frag.cloneNode(true);
        const replacer = frag.firstChild;
        mergeAttrs(el, replacer);
        return replacer;
    }
}


// 关于createDocumentFragment 可看：https://blog.csdn.net/qiao13633426513/article/details/80243058
function extractContent (el, asFragment) {
    let child, rawContent;
    if (el.hasChildNodes()) {
        rawContent = asFragment
            ? document.createDocumentFragment() //当把一个DocumentFragment节点插入文档树时，插入的不是DocumentFragment自身，而是它的所有子孙节点
            : document.createElement('div');

        while (child = el.firstChild) {
            rawContent.appendChild(child);// 相当于搬运，把el中的子节点全部搬运到rawContent中，注意是搬运，所以el中的节点也消失了
        }
    }
    return rawContent;
}

export default {
    $compile,
}