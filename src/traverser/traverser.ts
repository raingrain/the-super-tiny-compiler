import { Visitor } from "./visitor";
import { CallExpressionNode, ChileNode, RootNode,NodeTypes,ParentRoot } from "../parser/nodeType";


export function traverser(rootNode: RootNode, visitor: Visitor) {

    function traverArray(array: ChileNode[], parent: ParentRoot) {
        array.forEach(node => {
            traverNode(node, parent);
        });
    }

    function traverNode(node: RootNode | ChileNode, parent?: ParentRoot) {

        // 使用中括号只能以字符串形式访问对象属性
        // 修改之前的NodeTypes，由于枚举默认值为数字，需要修改成对应visitor中的字符串才行
        const methods = visitor[node.type];

        if (methods) {
            methods.enter(node, parent);
        }

        switch (node.type) {
            case NodeTypes.Root:
                traverArray((node as RootNode).body, <RootNode>node);
                break;
            case NodeTypes.CallExpression:
                traverArray("params" in node && node.params, node as CallExpressionNode);
                break;
            case NodeTypes.Number:
                break;
            case NodeTypes.String:
                break;
            default:
                break;
        }

        if (methods && methods.exit) {
            methods.exit(node, parent);
        }
    }

    traverNode(rootNode);
}