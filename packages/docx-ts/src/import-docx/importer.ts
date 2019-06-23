import { Document } from "../document/document";
import { ComponentFactory } from "../xml-components/component-factory";
import { XmlComponent } from "../xml-components/xml-component";
import { Element, FileToElement } from "xml-util";

export function Clone(old:XmlComponent)
{
    return Convert(old.PrepareXml());
}

export function Convert(e: Element): XmlComponent
{
    const component = ComponentFactory.CreateComponent(e);
    e.elements && e.elements.forEach(child =>
    {
        if (child.type === "element")
        {
            component.AddChild(Convert(child));
        }
        else if (child.type === "text") 
        {
            component.AddChild(child.text as string);
        }
    });
    return component;
}

export function Import(xml_text: string): Document
{
    return Convert(FileToElement(xml_text)) as Document;
}