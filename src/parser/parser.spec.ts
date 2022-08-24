import { expect, test } from "vitest";
import { TokenTypes } from "../tokenizer/tokenizer";
import { NodeTypes, parser } from "./parser";

test("parser ()", () => {
    const tokens = [
        { type: TokenTypes.Paren, value: "(" },
        { type: TokenTypes.Name, value: "add" },
        { type: TokenTypes.String, value: "2" },
        { type: TokenTypes.String, value: "2" },
        { type: TokenTypes.Paren, value: ")" }
    ];

    const AST = {
        type: NodeTypes.Root,
        body: [
            {
                type: NodeTypes.CallExpression,
                name: "add",
                params: [
                    {
                        type: NodeTypes.String,
                        value: "2"
                    },
                    {
                        type: NodeTypes.String,
                        value: "2"
                    }
                ]
            }
        ]
    };

    expect(parser(tokens)).toEqual(AST);
});

test("parser (())", () => {
    const tokens = [
        { type: TokenTypes.Paren, value: "(" },
        { type: TokenTypes.Name, value: "add" },
        { type: TokenTypes.Number, value: "2" },
        { type: TokenTypes.Paren, value: "(" },
        { type: TokenTypes.Name, value: "subtract" },
        { type: TokenTypes.Number, value: "4" },
        { type: TokenTypes.Number, value: "2" },
        { type: TokenTypes.Paren, value: ")" },
        { type: TokenTypes.Paren, value: ")" }
    ];

    const AST = {
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

    expect(parser(tokens)).toEqual(AST);
});


test("parser (())(())", () => {
    const tokens = [
        { type: TokenTypes.Paren, value: "(" },
        { type: TokenTypes.Name, value: "add" },
        { type: TokenTypes.Number, value: "2" },
        { type: TokenTypes.Paren, value: "(" },
        { type: TokenTypes.Name, value: "subtract" },
        { type: TokenTypes.Number, value: "4" },
        { type: TokenTypes.Number, value: "2" },
        { type: TokenTypes.Paren, value: ")" },
        { type: TokenTypes.Paren, value: ")" },
        { type: TokenTypes.Paren, value: "(" },
        { type: TokenTypes.Name, value: "subtract" },
        { type: TokenTypes.Number, value: "1" },
        { type: TokenTypes.Paren, value: "(" },
        { type: TokenTypes.Name, value: "add" },
        { type: TokenTypes.Number, value: "2" },
        { type: TokenTypes.Number, value: "3" },
        { type: TokenTypes.Paren, value: ")" },
        { type: TokenTypes.Paren, value: ")" }
    ];

    const AST = {
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
            },
            {
                type: NodeTypes.CallExpression,
                name: "subtract",
                params: [
                    {
                        type: NodeTypes.Number,
                        value: "1"
                    },
                    {
                        type: NodeTypes.CallExpression,
                        name: "add",
                        params: [
                            {
                                type: NodeTypes.Number,
                                value: "2"
                            },
                            {
                                type: NodeTypes.Number,
                                value: "3"
                            }
                        ]
                    }
                ]
            }
        ]
    };

    expect(parser(tokens)).toEqual(AST);
});