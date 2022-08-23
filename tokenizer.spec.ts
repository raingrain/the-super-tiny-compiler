import { expect, test } from "vitest";
import { tokenizer, TokenTypes } from "./tokenizer";

test("left paren", () => {
    const code = "(";
    const tokens = [{ type: TokenTypes.Paren, value: "(" }];
    expect(tokenizer(code)).toEqual(tokens);
});

test("right paren", () => {
    const code = ")";
    const tokens = [{ type: TokenTypes.Paren, value: ")" }];
    expect(tokenizer(code)).toEqual(tokens);
});

test("add", () => {
    const code = "add";
    const tokens = [{ type: TokenTypes.Name, value: "add" }];
    expect(tokenizer(code)).toEqual(tokens);
});

test("number", () => {
    const code = "123";
    const tokens = [{ type: TokenTypes.Number, value: "123" }];
    expect(tokenizer(code)).toEqual(tokens);
});

test("string", () => {
    const code = `"awaqa"`;
    const tokens = [{ type: TokenTypes.String, value: "awaqa" }];
    expect(tokenizer(code)).toEqual(tokens);
});


test("(add 1 2)", () => {
    const code = "(add 1 2)";
    const tokens = [
        { type: TokenTypes.Paren, value: "(" },
        { type: TokenTypes.Name, value: "add" },
        { type: TokenTypes.Number, value: "1" },
        { type: TokenTypes.Number, value: "2" },
        { type: TokenTypes.Paren, value: ")" }
    ];
    expect(tokenizer(code)).toEqual(tokens);
});

test("tokenizer", () => {
    const code = "(add 2 (subtract 4 2))";
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
    expect(tokenizer(code)).toEqual(tokens);
});

