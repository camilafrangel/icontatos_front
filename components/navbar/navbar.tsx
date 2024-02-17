import Image from "next/image";
import React from "react";
import styles from "./navbar.module.css"
import { HiHome } from "react-icons/hi"
import Link from "next/link";

export default function Navbar(){
    return(
        <nav className={styles.nav}> {}
            <Image src="/assets/logo.png" alt="iContatos" className={styles.logo} width={120} height={20} />
            <Link className={styles.homeButton} href={"/"}>
                <HiHome href="/" size={20}/>
                Home
            </Link>
        </nav>
    );
}