export function codeGenerator(node): string {
    switch (node.type) {
        // 如果我们有一个`Program`节点。我们会使用代码生成器遍历`body`属性中的所有节点然后使用换行符\n
        case "Root":
            return node.body.map(codeGenerator).join("\n");

        // 针对`ExpressionStatement`我们会对节点的expression属性调用代码生成器，并加上一个分号
        case "ExpressionStatement":
            return codeGenerator(node.expression) + ";";

        // 针对`CallExpression`我们会打印出`callee`，也就是函数名，加上一个开括号，我们会对
        // `arguments`数组中的每一个节点调用代码生成器，使用逗号连接它们，然后我们添加一个闭括号。
        case "CallExpression":
            return codeGenerator(node.callee) + "(" + node.arguments.map(codeGenerator).join(", ") + ")";
        // 针对`Identifier`，我们简单地返回节点的name属性。
        case "Identifier":
            return node.name;

        // 针对`Number`，我们简单地返回节点的值。
        case "Number":
            return node.value;

        // 针对String`，我们在节点value周围加上引号。
        case "String":
            return "\"" + node.value + "\"";

        // 如果没有匹配，我们抛出一个错误。
        default:
            throw new TypeError(node.type);
    }
}