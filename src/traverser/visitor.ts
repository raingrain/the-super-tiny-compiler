import { ChileNode, RootNode } from "../parser/parser";
import { ParentRoot } from "../parser/parser";

// 该方法接收当前节点和父节点，根节点没有父节点
export type Method = (node: RootNode | ChileNode, parent?: ParentRoot) => void

// 遍历到每一个节点时都有进入和离开两个方法
export interface VisitorOption {
    enter: Method,
    exit?: Method
}

// 一个观察者，用来描述遍历AST时需要的操作
export interface Visitor {
    Root?: VisitorOption;
    Number?: VisitorOption;
    CallExpression?: VisitorOption;
    String?: VisitorOption;
}