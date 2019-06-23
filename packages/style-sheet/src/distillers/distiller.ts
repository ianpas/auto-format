import { Element } from "xml-util";

import { IDistiller, IStyleSheetItem } from "../common/type";
import { TableDistiller } from "./table";
import { DefaultDistiller } from "./default";
import { CaptionDistiller } from "./caption";
import { FormulaDistiller } from "./formula";
import { RawDistiller } from "./raw";
import { TocDistiller } from "./toc";

export const Distiller: IDistiller =
{
    Distill(e: Element, type: string): IStyleSheetItem
    {
        return DistillerTable[Normalize(type)].Distill(e, type);
    }
};

function Normalize(type: string)
{
    if (type.includes("caption"))
    {
        return "caption"
    }
    else if (EchoTable.indexOf(type) !== -1)
    {
        return type;
    }
    else if (RawTable.indexOf(type) !== -1)
    {
        return "raw";
    }
    return "default";
}

const EchoTable = [
    "table",
    "formula",
    "toc"
];

const RawTable = [
    "author_cn",
    "tutor_cn",
    "literal_abstract_cn",
    "literal_keywords_cn",
    "author_en",
    "tutor_en",
    "literal_abstract_en",
    "literal_keywords_en",
    "section"
];

const DistillerTable: { [index: string]: IDistiller } =
{
    "table": TableDistiller,
    "caption": CaptionDistiller,
    "formula": FormulaDistiller,
    "toc": TocDistiller,
    "default": DefaultDistiller,
    "raw": RawDistiller
};