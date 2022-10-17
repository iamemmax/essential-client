import React from 'react'
import Link from 'next/link';
import Styles from "./styles/layout.module.scss"

function Header() {
    return (
        <div>
            <nav className={Styles.nav}>
                <div  className={Styles.nav}>
                    <Link href="/">E-Companion</Link>

                </div>
                <ul  className={Styles.ul}>
                    <Link href="/home"><a>About</a></Link>
                    <Link href="/home"><a>friend</a></Link>
                    <Link href="/home"><a>Voice call</a></Link>
                    <Link href="/home"><a>Video call</a></Link>
                </ul>
            </nav>

        </div>
    )
}

export default Header