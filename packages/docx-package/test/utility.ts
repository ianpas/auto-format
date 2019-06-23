import { readFileSync, writeFileSync } from "fs";
import { DocxPackage } from "../src";

export function ToArrayBuffer(buffer: Buffer)
{
    const array_buffer = new ArrayBuffer(buffer.length);
    const view = new Uint8Array(array_buffer);
    for (let i = 0; i < buffer.length; ++i)
    {
        view[i] = buffer[i];
    }
    return array_buffer;
}

export function ReadFile(path: string)
{
    return ToArrayBuffer(readFileSync(path)) as ArrayBuffer;
}

export function WriteFile(path: string, array_buffer: ArrayBuffer)
{
    writeFileSync(path, Buffer.from(array_buffer));
}

export async function LoadPackage(path: string)
{
    return await new DocxPackage().FromArrayBuffer(ReadFile(path));
}

export async function SavePackage(path: string, __package: DocxPackage)
{
    WriteFile(path, await __package.ToArrayBuffer());
} 