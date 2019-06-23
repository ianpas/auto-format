import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
import { LeftNav } from "../left-nav/LeftNav";
import styles from "./app.module.css";
import { Main } from "../main/Main";

class App extends Component
{
    render()
    {
        return (
            <div className={`ms-Grid ${styles.grid}`} dir="ltr">
                <div className={`ms-Grid-row ${styles.row}`}>
                    <div className={`ms-Grid-col ms-sm4 ms-md2 ${styles.column}`}>
                        <LeftNav />
                    </div>
                    <div className={`ms-Grid-col ms-sm8 ms-md10 ${styles.column}`}>
                        <Main />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
