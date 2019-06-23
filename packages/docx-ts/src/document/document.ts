import { XmlComponent } from "../xml-components/xml-component";
import { Body } from "./body";

export class Document extends XmlComponent
{
    constructor()
    {
        super("w:document");
    }

    public GetBody(): Body
    {
        return this.m_Root.find(e => e instanceof Body) as Body;
    }

    public SetBody(body: Body): void
    {
        this.m_Root[0] = body;
    }

}