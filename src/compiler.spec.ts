import { test, expect } from "vitest";
import { compiler } from "./compiler";

test("compiler", () => {
    expect(compiler("(add 2 2)")).toEqual("add(2, 2);")
})

test("compiler", () => {
    expect(compiler("(subtract 4 2)")).toEqual("subtract(4, 2);")
})

test("compiler", () => {
    expect(compiler("(add 2 (subtract 4 2))")).toEqual("add(2, subtract(4, 2));")
})

test("compiler", () => {
    expect(compiler("(add 2 (subtract 4 2))(add 2 (subtract 4 2))")).toEqual("add(2, subtract(4, 2));\nadd(2, subtract(4, 2));")
})
