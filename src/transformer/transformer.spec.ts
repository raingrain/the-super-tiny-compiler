import { test, expect } from "vitest";

import {RootNode, NodeTypes} from "../parser/nodeType";
import { transformer } from "./transformer";

test("transformer", () => {
    const originalAST: RootNode = {
        type: NodeTypes.Root,
        body: [
            {
                type: NodeTypes.CallExpression,
                name: "add",
                params: [
                    {
                        type: NodeTypes.Number,
                        value: "2",
                    },
                    {
                        type: NodeTypes.CallExpression,
                        name: "subtract",
                        params: [
                            {
                                type: NodeTypes.Number,
                                value: "4",
                            },
                            {
                                type: NodeTypes.Number,
                                value: "2",
                            },
                        ],
                    },
                ],
            },
        ],
    };

    const transformedAST = {
        type: NodeTypes.Root,
        body: [
            {
                type: "ExpressionStatement",
                expression: {
                    type: "CallExpression",
                    callee: {
                        type: "Identifier",
                        name: "add",
                    },
                    arguments: [
                        {
                            type: "Number",
                            value: "2",
                        },
                        {
                            type: "CallExpression",
                            callee: {
                                type: "Identifier",
                                name: "subtract",
                            },
                            arguments: [
                                {
                                    type: "Number",
                                    value: "4",
                                },
                                {
                                    type: "Number",
                                    value: "2",
                                },
                            ],
                        },
                    ],
                },
            },
        ],
    };

    expect(transformer(originalAST)).toEqual(transformedAST);
});