import React from 'react'
import Styles from "./styles/layout.module.scss"
import Header from './Header';
import LeftBox from './LeftBox';
import SingleChat from './SingleChat';

function Layouts() {
    return (
        <div className={Styles.wrapper}>
            <div className={Styles.header}>
                <Header />
            </div>
            <div className={Styles.leftBox}>
                <LeftBox />
            </div>
            <div className={Styles.mainBox}>
                <SingleChat />
            </div>

        </div>
    )
}

export default Layouts