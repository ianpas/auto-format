import { XmlComponent } from "./xml-component";
import { ComponentTable } from "./component-table";
import { Element } from "xml-util";
import { PropertyItem } from "./property-item";

export class ComponentFactory
{
    static CreateComponent(e: Element): XmlComponent
    {
        const name = e.name;

        if (!(name in ComponentTable))
        {
            // throw or not?
            // throw `component ${name} is not supported!`;

            // return as property item
            return new PropertyItem(name).SetAttributes(e.attributes);
        }

        const component = new ComponentTable[name].class().SetAttributes(e.attributes);

        return component;
    }
}