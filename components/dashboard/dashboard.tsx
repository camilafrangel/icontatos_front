'use client'

import Link from "next/link";
import style from "./dashboard.module.css"
import { HiFilter, HiDownload, HiSearch } from "react-icons/hi"
import AddContact from "../addContact/addContact";
import { useState } from "react";
import { ContactsProps } from "../contactsTable/contacts.types";
import ContactsTable from "../contactsTable/contactsTable";

export default function Dashboard({ contacts }: ContactsProps) {
    const [searchValue, setSearchValue] = useState('');
    const [filteredContacts, setFilteredContacts] = useState(contacts);

    const handleSearch = () => {
        const newFilteredContacts = contacts.filter(contact =>
            contact.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredContacts(newFilteredContacts);
    };

    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    
    return (
        <div className={style.contactsPannel}>
            <div className={style.groupButton}>
            <Link className={`${style.generalButton} ${style.filterButton}`} href={"/"}>
                <HiFilter size={20} />
                Filtrar
            </Link>
            <Link className={`${style.generalButton} ${style.downloadButton}`} href={"/"}>
                <HiDownload size={20} />
                Exportar
            </Link>
            <div className={style.wrapper}>
                <input
                    className={style.input}
                    type="text"
                    placeholder="Pesquise por nome ou email"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <button className={style.searchButton} onClick={handleSearch}>
                    <HiSearch className={style.icon} size={20} />
                </button>
            </div>
            <div className={style.primaryButton}>
                <AddContact />
            </div>
            </div>
            <div className={style.table}>
                <ContactsTable filteredContacts={filteredContacts}/>
            </div>
        </div>
    )
}