import { resolve } from "path";
import { writeFileSync, readFileSync } from "fs";
import { standard_base64 } from "./common/standard_base64";
test("about array buffer", () =>
{
    const buffer = readFileSync(resolve(__dirname, "./common/test.docx"), "");
    const str_buffer = Buffer.from(buffer).toString("base64");
    const doc_base64 = `export default { std_doc: "${str_buffer}" };`
    writeFileSync(resolve(__dirname, "./common/std_doc.json.ts"), doc_base64);
    //console.log(str_buffer);
})


test("build standard docx", () =>
{
    const buffer = readFileSync(resolve(__dirname, "./common/standard.docx"), "");
    const docx_base64 = Buffer.from(buffer).toString("base64");
    const content = `const standard_base64 = "${docx_base64}";\nexport {standard_base64};`
    writeFileSync(resolve(__dirname, "./common/standard_base64.ts"), content);
    //console.log(standard_base64);
})