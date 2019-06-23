import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

export function ReadJson(name: string)
{
    return JSON.parse(readFileSync(resolve(__dirname, `./common/${name}`), "utf8"));
}

export function ReadXml(name: string)
{
    return readFileSync(resolve(__dirname, `./common/${name}`), "utf8");
}

export function WriteXml(name: string, xml: string)
{
    return writeFileSync(resolve(__dirname, `./common/${name}`), xml, "utf8");
}