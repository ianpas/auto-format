import { readFileSync } from "fs";
import { resolve } from "path";

export function ReadJson(name: string)
{
    return JSON.parse(readFileSync(resolve(__dirname, `./common/${name}`), "utf8"));
}