import Link from "next/link";
import style from "./buttonGroup.module.css"
import { HiUserAdd, HiFilter, HiDownload, HiSearch } from "react-icons/hi"

export default function ButtonGroup(){
    return(
        <div className={style.groupBtn}>
            <Link className={`${style.generalButton} ${style.filterButton}`}  href={"/"}>
                <HiFilter size={20}/>
                Filtrar
            </Link>
            <Link className={`${style.generalButton} ${style.secondaryButton}`}  href={"/"}>
                <HiDownload size={20}/>
                Download
            </Link>
            <div className={style.wrapper}>
                <HiSearch className={style.icon} size={20}/>
                <input type="text" placeholder="Pesquisa" className={style.input}></input>
            </div>  
            <Link className={`${style.generalButton} ${style.primaryButton}`} href={"/addContact"}>
                <HiUserAdd size={20}/>
                Novo Contato
            </Link>
        </div>
    )
}