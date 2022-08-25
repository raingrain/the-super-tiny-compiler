import { tokenizer } from "./tokenizer/tokenizer";
import { parser } from "./parser/parser";
import { transformer } from "./transformer/transformer";
import { codeGenerator } from "./codeGenerator/codeGenerator";

export function compiler(lispCode: string): string {
    const tokens = tokenizer(lispCode);
    const originalAST = parser(tokens);
    const newAST = transformer(originalAST);
    return codeGenerator(newAST)
}