import React, { Children } from 'react'
import Styles from "./styles/layout.module.scss"
import Header from './Header';
import LeftBox from './LeftBox';


function Layouts({children}) {
    return (
        <div className={Styles.wrapper}>
            <div className={Styles.header}>
                <Header />
            </div>
            <div className={Styles.leftBox}>
                <LeftBox />
            </div>
            <div className={Styles.mainBox}>
                {children}
            </div>

        </div>
    )
}

export default Layouts