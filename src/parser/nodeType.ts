// 四种节点对应值类型
export enum NodeTypes {
    Root = "Root",
    Number = "Number",
    String = "String",
    CallExpression = "CallExpression"
}

// 根节点的父节点类型为undefined，表达式的父节点是根节点或者表达式节点，值的节点是表达式节点
export type ParentRoot = RootNode | CallExpressionNode | undefined;

// 三种孩子节点类型
export type ChileNode = NumberNode | StringNode | CallExpressionNode

// 父类型
interface Node {
    type: NodeTypes;
    context?: ChildNode[];
}

// 根节点
export interface RootNode extends Node {
    body: ChileNode[];
    context?: ChildNode[];
}

// 数字节点
export interface NumberNode extends Node {
    value: string;
}

// 字符串节点
export interface StringNode extends Node {
    value: string;
}

// 表达式节点
export interface CallExpressionNode extends Node {
    name: string,
    params: ChileNode[]
}

// 创建不同节点的函数
export function createRootNode(): RootNode {
    return {
        type: NodeTypes.Root,
        body: []
    };
}

export function createNumberNode(value: string): NumberNode {
    return {
        type: NodeTypes.Number,
        value
    };
}

export function createStringNode(value: string): StringNode {
    return {
        type: NodeTypes.String,
        value
    };
}

export function createCallExpressionNode(name: string): CallExpressionNode {
    return {
        type: NodeTypes.CallExpression,
        name,
        params: []
    };
}