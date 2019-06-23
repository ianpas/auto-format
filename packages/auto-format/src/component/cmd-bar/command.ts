import { FormatPackageNative, DocxPackage,DocxIsValid } from "docx-driver";
import { decode } from "base64-arraybuffer";
import { standard_base64 } from "../../asset/standard_base64";
import save from "save-file/browser";

let standard: DocxPackage;

export async function Format(user_buffer: ArrayBuffer, file_name: string)
{
    if (!standard)
    {
        standard = await new DocxPackage().FromArrayBuffer(decode(standard_base64) as ArrayBuffer);
    }

    const user = await new DocxPackage().FromArrayBuffer(user_buffer);
    if(!await DocxIsValid(user))
    {
        alert("排版失败，请按照使用手册说明来输入。");
        return;
    }

    await FormatPackageNative({ standard, input: user });
    await save(await user.ToArrayBuffer(), `${file_name.replace(".docx", "")}.formatted.docx`);
}