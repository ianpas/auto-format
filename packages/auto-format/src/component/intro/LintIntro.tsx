import React, { Component } from 'react';

class LintIntro extends Component
{
    render()
    {
        return (
            <div>
                <h1 className="ms-font-xxl">格式检查</h1>
                <p className="ms-font-l">选择论文后自动开始检查格式，软件会尽力找出所有排版问题，最终打印论文前请与导师确认。</p>
                <p className="ms-font-l">检查完成后浏览器自动下载检查报告，文件名默认为*.lint.docx。</p>
            </div>
        );
    }
}

export { LintIntro };
