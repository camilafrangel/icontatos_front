import Image from "next/image";
import React from "react";
import styles from "./navbar.module.css"

export default function Navbar(){
    return(
        <nav className={styles.nav}> {}
            <Image src="/assets/logo.png" alt="iContatos" className={styles.logo} width={120} height={20} />
        </nav>
    );
}