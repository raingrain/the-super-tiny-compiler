import { test, expect } from "vitest";
import { NodeTypes } from "../parser/nodeType";
import { codeGenerator } from "./codeGenerator";

test("codeGenerator", () => {
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

    expect(codeGenerator(transformedAST)).toEqual("add(2, subtract(4, 2));")
})