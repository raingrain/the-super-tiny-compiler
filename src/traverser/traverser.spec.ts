import { expect, test } from "vitest";

import { NodeTypes, RootNode } from "../parser/nodeType";

import { traverser } from "./traverser";

import { Visitor } from "./visitor";

test("traverser", () => {
    const ast: RootNode = {
        type: NodeTypes.Root,
        body: [
            {
                type: NodeTypes.CallExpression,
                name: "add",
                params: [
                    {
                        type: NodeTypes.Number,
                        value: "2"
                    },
                    {
                        type: NodeTypes.CallExpression,
                        name: "subtract",
                        params: [
                            {
                                type: NodeTypes.Number,
                                value: "4"
                            },
                            {
                                type: NodeTypes.Number,
                                value: "2"
                            }
                        ]
                    }
                ]
            }
        ]
    };

    const callCounts: Array<string | NodeTypes>[] = [];
    const visitor: Visitor = {
        Root: {
            enter(node) {
                callCounts.push(["root-enter", node.type, ""]);
            },
            exit(node) {
                callCounts.push(["root-exit", node.type, ""]);
            }
        },

        CallExpression: {
            enter(node, parent) {
                callCounts.push(["callExpression-enter", node.type, parent.type]);
            },
            exit(node, parent) {
                callCounts.push(["callExpression-exit", node.type, parent.type]);
            }
        },

        Number: {
            enter(node, parent) {
                callCounts.push(["number-enter", node.type, parent.type]);
            },
            exit(node, parent) {
                callCounts.push(["number-exit", node.type, parent.type]);
            }
        },
        String: {
            enter(node, parent) {
                callCounts.push(["string-enter", node.type, parent.type]);
            },
            exit(node, parent) {
                callCounts.push(["string-exit", node.type, parent.type]);
            }
        }
    };

    traverser(ast, visitor);

    expect(callCounts).toEqual([
        ["root-enter", NodeTypes.Root, ""],
        ["callExpression-enter", NodeTypes.CallExpression, NodeTypes.Root],
        ["number-enter", NodeTypes.Number, NodeTypes.CallExpression],
        ["number-exit", NodeTypes.Number, NodeTypes.CallExpression],
        ["callExpression-enter", NodeTypes.CallExpression, NodeTypes.CallExpression],
        ["number-enter", NodeTypes.Number, NodeTypes.CallExpression],
        ["number-exit", NodeTypes.Number, NodeTypes.CallExpression],
        ["number-enter", NodeTypes.Number, NodeTypes.CallExpression],
        ["number-exit", NodeTypes.Number, NodeTypes.CallExpression],
        ["callExpression-exit", NodeTypes.CallExpression, NodeTypes.CallExpression],
        ["callExpression-exit", NodeTypes.CallExpression, NodeTypes.Root],
        ["root-exit", NodeTypes.Root, ""]
    ]);
});