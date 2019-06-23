import React, { Component } from 'react';

class FormatIntro extends Component
{
    render()
    {
        // TODO: add id?
        return (
            <div>
                <h1 className="ms-font-xxl">排版</h1>
                <p className="ms-font-l">按照使用手册中约定的方式进行输入，选择论文后自动开始排版。</p>
                <p className="ms-font-l">排版完成后浏览器自动下载排版后的论文，文件名默认为*.formatted.docx。</p>
            </div>
        );
    }
}

export { FormatIntro };
