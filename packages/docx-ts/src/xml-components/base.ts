import { Element } from "xml-util";
import { Attributes } from "./attributes";

export abstract class BaseXmlComponent
{
    protected readonly m_Tag: string;
    protected m_Attributes: Attributes;

    constructor(tag: string)
    {
        this.m_Tag = tag;
        this.m_Attributes = new Attributes({});
    }

    public abstract PrepareXml(): Element;
}