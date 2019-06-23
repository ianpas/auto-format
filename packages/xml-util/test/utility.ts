import { readFileSync } from "fs";
import { resolve } from "path";

export function ReadXml(name: string)
{
    return readFileSync(resolve(__dirname, `./common/${name}`), "utf8");
}

export function ReadJson(name: string)
{
    return JSON.parse(readFileSync(resolve(__dirname, `./common/${name}`), "utf8"));
}