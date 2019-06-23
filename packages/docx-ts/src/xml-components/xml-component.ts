import { BaseXmlComponent } from "./base";
import { Element, IAttributes } from "xml-util";

export abstract class XmlComponent extends BaseXmlComponent implements IterableIterator<XmlComponent>
{
    private iter = 0;
    protected m_Root: Array<XmlComponent | string>;

    constructor(tag: string)
    {
        super(tag);
        this.m_Root = new Array<XmlComponent>();
    }

    [Symbol.iterator](): IterableIterator<XmlComponent>
    {
        return this;
    }

    get root()
    {
        return this.m_Root;
    }

    public next(): IteratorResult<XmlComponent>
    {
        if (this.iter < this.m_Root.length && this.m_Root[this.iter] instanceof XmlComponent)
        {
            return { done: false, value: this.m_Root[this.iter++] as XmlComponent };
        }
        else 
        {
            this.iter = 0;
            return { done: true, value: null };
        }
    }

    public PrepareXml(): Element
    {
        return {
            name: this.m_Tag,
            type: "element",
            elements:
                this.m_Root
                    .filter(child => child !== undefined && child !== null)
                    .map(child =>
                    {
                        return child instanceof XmlComponent ? child.PrepareXml() : { type: "text", text: child };
                    }),
            attributes: this.m_Attributes.PrepareXml()
        };
    }

    public SetAttributes(attrs: IAttributes): XmlComponent
    {
        this.m_Attributes.SetAttributes(attrs || {});
        return this;
    }

    public GetAttributes(): IAttributes
    {
        return this.m_Attributes.PrepareXml();
    }

    public AddChild(child: XmlComponent | string): XmlComponent
    {
        this.m_Root.push(child);
        return this;
    }

    public Name(): string
    {
        return this.m_Tag;
    }

    public Normalize(): void
    {

    }
}