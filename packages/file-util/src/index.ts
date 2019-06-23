import { readFileSync } from "fs";
import { resolve } from "path";

export function ReadXml(name: string)
{
    return readFileSync(resolve(__dirname, `../../common/samples-xml/${name}`), "utf8");
}