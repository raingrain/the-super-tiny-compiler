// 在一条编程语句中每一个token的类型
export enum TokenTypes {
    Paren,
    Name,
    Number,
    String
}

// token数组中每一个元素由它的类型和它的字符串值组成
export interface Token {
    type: TokenTypes,
    value: string
}

export function tokenizer(code: string): Token[] {
    // Token数组
    const tokens: Token[] = [];

    // 遍历语句的指针
    let current = 0;

    // 由于词素的长度的不同，我们可能需要在一次循环中多次增加`current`的值
    while (current < code.length) {

        // 存储每次遍历的结果
        let char = code[current];

        // 匹配空格
        const WHITESPACE = /\s/;
        // 匹配关键字
        const NAME = /[a-z]/i;
        // 匹配数字
        const NUMBER = /\d/i;

        // 开始匹配
        if (char === "(" || char === ")") {

            // 遇到左右括号，加上再往后跳
            tokens.push({ type: TokenTypes.Paren, value: char });
            current++;
        } else if (WHITESPACE.test(char)) {

            // 遇到空格直接跳过
            current++;
        } else if (NAME.test(char)) {
            // 匹配关键字
            // 用一个同名value存储方便对象的简写
            let value = "";

            while (NAME.test(char) && current < code.length) {
                value += char;
                char = code[++current];
            }

            tokens.push({ type: TokenTypes.Name, value });
        } else if (NUMBER.test(char)) {

            // 匹配数字
            let value = "";

            while (NUMBER.test(char) && current < code.length) {
                value += char;
                char = code[++current];
            }

            tokens.push({ type: TokenTypes.Number, value });
        } else if (char === "\"") {

            // 匹配字符串
            let value = "";

            // 跳过前引号
            char = code[++current];

            while (char !== "\"") {
                value += char;
                char = code[++current];
            }

            // 跳过后引号
            char = code[++current];

            tokens.push({ type: TokenTypes.String, value });
        } else {

            // 匹配不到，抛出错误
            throw new TypeError('I dont know what this character is: ' + char);
        }
    }
    console.log(tokens);
    return tokens;
}