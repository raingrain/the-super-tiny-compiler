import { Token, TokenTypes } from "../tokenizer/tokenizer";

// 四种节点类型
export enum NodeTypes {
    Root,
    Number,
    String,
    CallExpression
}

// 三种节点
type ChileNode = NumberNode | StringNode | CallExpressionNode

// 父类型
interface Node {
    type: NodeTypes;
}

// 根节点
interface RootNode extends Node {
    body: ChileNode[];
}

// 数字节点
interface NumberNode extends Node {
    value: string;
}

// 字符串节点
interface StringNode extends Node {
    value: string;
}

// 表达式节点
interface CallExpressionNode extends Node {
    name: string,
    params: ChileNode[]
}

// 创建不同节点的函数
function createRootNode(): RootNode {
    return {
        type: NodeTypes.Root,
        body: []
    };
}

function createNumberNode(value: string): NumberNode {
    return {
        type: NodeTypes.Number,
        value
    };
}

function createStringNode(value: string): StringNode {
    return {
        type: NodeTypes.String,
        value
    };
}

function createCallExpressionNode(name: string): CallExpressionNode {
    return {
        type: NodeTypes.CallExpression,
        name,
        params: []
    };
}

//
export function parser(tokens: Token[]): RootNode {

    // 非常巧妙的闭包
    let current = 0;

    function walk() {
        // 拿出当前遍历的
        let token = tokens[current];

        if (token.type === TokenTypes.Number || token.type === TokenTypes.String) {
            // 如果匹配到数字和字符串，指针后移并返回一个对应的类型节点
            current++;
            return token.type === TokenTypes.Number ? createNumberNode(token.value) : createStringNode(token.value);
        } else if (token.type === TokenTypes.Paren && token.value === "(") {
            // 如果匹配到左括号，先跳过这个括号然后创建一个表达式节点
            token = tokens[++current];
            const callExpressionNode = createCallExpressionNode(token.value);
            // 跳过这个表达关键字
            token = tokens[++current];

            // 如果没有匹配到右括号，说明当前内容是一个类型或者表达式，递归调用walk
            while (!(token.type === TokenTypes.Paren && token.value === ")")) {
                // 往params里面加入子节点
                callExpressionNode.params.push(walk());
                // 当遇上类型时current已经在子递归中后移这里只需要赋值即可
                token = tokens[current];
            }

            // 跳过右括号并返回抽象表达式节点
            current++;
            return callExpressionNode;
        } else {
            // 没匹配到，看看这是啥类型
            throw  new Error(`unknown token: ${ token }`);
        }
    }

    // 创建AST的根节点
    const rootNode = createRootNode();

    // 遍历tokens，往AST中加入
    while (current < tokens.length) {
        rootNode.body.push(walk());
    }

    // 返回根节点
    return rootNode;
}