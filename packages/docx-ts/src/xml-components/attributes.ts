import { IAttributes } from "xml-util";
import { OrderedMap } from "immutable";

export class Attributes
{
    private m_Attributes: OrderedMap<string, string | number>;

    constructor(attrs: IAttributes)
    {
        this.SetAttributes(attrs);
    }

    public PrepareXml()
    {
        return this.m_Attributes.toJSON();
    }

    public SetAttributes(attrs: IAttributes)
    {
        this.m_Attributes = OrderedMap(attrs);
    }
}