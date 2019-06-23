import { XmlComponent } from "../../../xml-components/xml-component";

export class Text extends XmlComponent
{
    constructor()
    {
        super("w:t");
    }

    public SetText(text: string)
    {
        this.m_Root[0] = text;
        return this;
    }

    public GetText(): string
    {
        return this.m_Root[0] as string || "";
    }
}