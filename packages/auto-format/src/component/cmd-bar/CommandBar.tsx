import React, { Component } from 'react';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import styles from "./cmdbar.module.css";
import { Format } from './command';

const cmd_button_styles = { root: { backgroundColor: "white", padding: "8px" } };

class CommandBar extends Component
{
    OnClickUpload()
    {
        const upload = document.getElementById("upload") as HTMLInputElement;
        upload.click();
    }

    OnUploadFile(e: any)
    {
        const files = (e.target as HTMLInputElement).files as FileList;
        if (files.length === 1)
        {
            const file = files[0];
            const file_name = file.name;
            console.log(`upload ${file_name}...`);
            if(!file_name.endsWith(".docx"))
            {
                (document.getElementById("form") as HTMLFormElement).reset();
                alert("请确认上传的是docx文档");
                return;
            }
            const reader = new FileReader();
            reader.onload = async () =>
            {
                try
                {
                    const buffer = reader.result;
                    await Format(buffer as ArrayBuffer, file_name);
                }
                catch(error)
                {
                    alert("排版失败，请按照使用手册说明来使用。");
                }
                (document.getElementById("form") as HTMLFormElement).reset();
            };
            reader.readAsArrayBuffer(file);
        }
    }

    render()
    {
        return (
            <div className={styles.cmdbar}>
                <form id="form">
                    <input type="file" id="upload" onChange={this.OnUploadFile.bind(this)} style={{ display: "none" }} />
                </form>
                <CommandBarButton
                    iconProps={{ iconName: 'OpenFolderHorizontal' }}
                    text="打开"
                    styles={cmd_button_styles}
                    onClick={this.OnClickUpload.bind(this)}
                />
            </div>
        );
    }
}

export { CommandBar };
