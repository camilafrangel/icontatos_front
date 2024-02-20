import Image from "next/image";
import React from "react";

export default function Navbar(){
    return(
        <nav style={{
            background: 'linear-gradient(to right, #41A67D, #02213B)',
            padding: '15px',
            display: 'flex',
            alignItems: 'center',
          }}> {}
            <Image src="/assets/logo.png" alt="iContatos" style={{ margin: '0 5vw'}} width={120} height={20} />
        </nav>
    );
}