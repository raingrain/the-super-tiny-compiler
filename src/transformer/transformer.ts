import { CallExpressionNode, NodeTypes, NumberNode, RootNode, StringNode } from "../parser/nodeType";

import { traverser } from "../traverser/traverser";

export function transformer(AST: RootNode) {
    const newAST = {
        type: NodeTypes.Root,
        body: []
    };

    AST.context = newAST.body;

    traverser(AST, {
        CallExpression: {
            enter(node, parent) {
                if (node.type === NodeTypes.CallExpression) {
                    let expression: any = {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: (node as CallExpressionNode).name
                        },
                        arguments: [],
                    }

                    node.context = expression.arguments;
                    if (parent.type !== NodeTypes.CallExpression) {
                        expression = {
                            type: "ExpressionStatement",
                            expression,
                        }
                    }
                    parent.context.push(expression)
                }

            }
        },

        Number: {
            enter(node, parent) {
                if (node.type === NodeTypes.Number) {
                    const numberNode: any = {
                        type: "Number",
                        value: (node as NumberNode).value,
                    };
                    parent.context.push(numberNode);
                }
            },
        },

        String: {
            enter(node, parent) {
                if (node.type === NodeTypes.String) {
                    const stringNode: any = {
                        type: "String",
                        value: (node as StringNode).value
                    }

                    parent.context.push(stringNode);
                }
            }
        }
    })


    return newAST;
}