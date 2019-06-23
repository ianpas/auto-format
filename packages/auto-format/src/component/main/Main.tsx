import React, { Component } from 'react';
import styles from "./main.module.css";
import { CommandBar } from "../cmd-bar/CommandBar";
import { FormatIntro } from '../intro/FormatIntro';
import { LintIntro } from '../intro/LintIntro';
import { ManualIntro } from '../intro/ManualIntro';
import { connect } from 'react-redux';

class Main extends Component
{

    DisplayIntro()
    {
        switch ((this.props as any).link_key)
        {
            case "format":
                return <FormatIntro />;
            case "lint":
                return <LintIntro />;
            case "manual":
                return <ManualIntro />;
            default:
                return <FormatIntro />;
        }
    }

    DisplayCmdBar()
    {
        switch ((this.props as any).link_key)
        {
            case "manual":
                return null;
            default:
                return <CommandBar />;
        }
    }
    render()
    {
        return (
            <div className={styles.main}>
                {this.DisplayCmdBar()}
                {this.DisplayIntro()}
            </div>
        );
    }
}

const MapStateToProps = (state: any) =>
{
    return { link_key: state.link_key }
}

const __Main = connect(MapStateToProps)(Main);
export { __Main as Main };