import { resolve as Resolve } from "path";
import { FormatPackage } from "../src";
import { SavePackage, LoadPackage } from "./utility";

test("single figure", async () =>
{
    const user = await LoadPackage("figure/single/user.docx");
    const standard = await LoadPackage("figure/single/standard.docx");

    await FormatPackage({ input: user, standard });
    await SavePackage(Resolve(__dirname, "./out/figure.docx"), user);
});

test("table", async () =>
{
    const user = await LoadPackage("table/user.docx");
    const standard = await LoadPackage("table/standard.docx");

    await FormatPackage({ input: user, standard });
    await SavePackage(Resolve(__dirname, "./out/table.docx"), user);
});

test("formula", async () =>
{
    const user = await LoadPackage("formula/user.docx");
    const standard = await LoadPackage("formula/standard.docx");

    await FormatPackage({ input: user, standard });
    await SavePackage(Resolve(__dirname, "./out/formula.docx"), user);
});

test("reference", async () =>
{
    const user = await LoadPackage("reference/user.docx");
    const standard = await LoadPackage("reference/standard.docx");

    await FormatPackage({ input: user, standard });
    await SavePackage(Resolve(__dirname, "./out/reference.docx"), user);
});

test("table of contents", async () =>
{
    const user = await LoadPackage("toc/user.docx");
    const standard = await LoadPackage("toc/standard.docx");

    await FormatPackage({ input: user, standard });
    await SavePackage(Resolve(__dirname, "./out/toc.docx"), user);
});

test("item", async () =>
{
    const user = await LoadPackage("item/user.docx");
    const standard = await LoadPackage("item/standard.docx");

    await FormatPackage({ input: user, standard });
    await SavePackage(Resolve(__dirname, "./out/item.docx"), user);
});

test("abstract", async () =>
{
    const user = await LoadPackage("abstract/user.docx");
    const standard = await LoadPackage("abstract/standard.docx");

    await FormatPackage({ input: user, standard });
    await SavePackage(Resolve(__dirname, "./out/abstract.docx"), user);
});

test("header", async () =>
{
    const user = await LoadPackage("header/user.docx");
    const standard = await LoadPackage("header/standard.docx");

    await FormatPackage({ input: user, standard });
    await SavePackage(Resolve(__dirname, "./out/header.docx"), user);
});