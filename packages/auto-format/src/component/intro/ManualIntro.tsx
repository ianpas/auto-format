import React, { Component } from 'react';
import { Nav, INavLinkGroup } from 'office-ui-fabric-react';
import styles from "./manual.module.css";

function url(id: number)
{
    return `https://github.com/ianpas/auto-format/issues/${id.toString()}`;
}

class ManualIntro extends Component
{


    render()
    {
        return (
            <div>
                <h1 className={`ms-font-xxl ${styles.head}`}>使用手册</h1>
                <p className="ms-font-l">由于希望及时获得使用后的反馈，所以手册以Github Issue的形式写成，以下是手册目录：</p>

                <h1 className={`ms-font-xxl ${styles.toc}`}>目录</h1>
                <Nav
                    groups={[
                        {
                            links: [
                                { name: "软件简介", key: "8", url: url(8), target: "_blank" },
                                { name: "如何写摘要", key: "1", url: url(1), target: "_blank" },
                                { name: "如何写新的一章/节/条", key: "2", url: url(2), target: "_blank" },
                                { name: "如何使用图片", key: "3", url: url(3), target: "_blank" },
                                { name: "如何使用表格", key: "4", url: url(4), target: "_blank" },
                                { name: "如何使用公式", key: "5", url: url(5), target: "_blank" },
                                { name: "如何使用款和项", key: "6", url: url(6), target: "_blank" },
                                { name: "如何写参考文献", key: "7", url: url(7), target: "_blank" },
                                { name: "如何添加封面", key: "10", url: url(10), target: "_blank" }
                            ]
                        }
                    ]}
                />
            </div>
        );
    }
}

export { ManualIntro };
