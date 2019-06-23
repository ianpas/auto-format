import React, { Component } from 'react';
import { Nav, INavLink } from 'office-ui-fabric-react';
import styles from "./nav.module.css";
import { connect } from 'react-redux';

class LeftNav extends Component
{
    constructor(props: any)
    {
        super(props);
    }

    OnLinkClick(ev?: React.MouseEvent<HTMLElement>, item?: INavLink) 
    {
        (this.props as any).dispatch({ type: "navigation", link_key: (item as INavLink).key });
    };

    render()
    {
        return (
            <Nav className={styles.nav}
                groups={[
                    {
                        links: [
                            { name: '排版', url: '#', key: 'format' },
                            // { name: '格式检查', url: '#', key: 'lint' },
                            { name: '使用手册', url: '#', key: 'manual' }
                        ]
                    }
                ]}
                selectedKey={(this.props as any).link_key || "format"}
                onLinkClick={this.OnLinkClick.bind(this)}
            />
        );
    }
}

const MapStateToProps = (state: any) =>
{
    return { link_key: state.link_key }
}

const __LeftNav = connect(MapStateToProps)(LeftNav);
export { __LeftNav as LeftNav };
