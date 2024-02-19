import Link from "next/link";
import style from "./buttonGroup.module.css"
import { HiFilter, HiDownload, HiSearch } from "react-icons/hi"
import AddContact from "../../app/addContact/page";

export default function ButtonGroup() {
    return (
        <div className={style.groupBtn}>
            <Link className={`${style.generalButton} ${style.filterButton}`} href={"/"}>
                <HiFilter size={20} />
                Filtrar
            </Link>
            <Link className={`${style.generalButton} ${style.downloadButton}`} href={"/"}>
                <HiDownload size={20} />
                Exportar
            </Link>
            <div className={style.wrapper}>
                <HiSearch className={style.icon} size={20} />
                <input type="text" placeholder="Pesquisar" className={style.input}></input>
            </div>
            <div className={style.primaryButton}>
                <AddContact />
            </div>
        </div>
    )
}