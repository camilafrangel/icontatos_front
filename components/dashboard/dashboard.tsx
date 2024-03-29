'use client'

import style from "./dashboard.module.css"
import modalStyles from "../../app/globals.module.css"
import { HiSearch, HiOutlineCalendar, HiX, HiOutlineCheck } from "react-icons/hi"
import AddContact from "../addContact/addContact";
import { useEffect, useState } from "react";
import { ContactsProps } from "../utils/types";
import ContactsTable from "../contactsTable/contactsTable";
import Modal from "react-modal";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { formatDateString } from "../utils/utils";
import { customModal } from "../utils/utils";

export default function Dashboard({ contacts }: ContactsProps) {
    const [searchValue, setSearchValue] = useState('');
    const [filteredContacts, setFilteredContacts] = useState(contacts);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<Date>();

    useEffect(() => {
        setFilteredContacts(contacts);
    }, [contacts]);

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

    const handleDateFilter = () => {
        if (selected) {
            const selectedFormatted = formatDateString(selected);
            const newFilteredContacts = contacts.filter(contact =>
                contact.createdAt.includes(selectedFormatted)
            );
            setFilteredContacts(newFilteredContacts);
        }
        setIsOpen(false);
    };

    const clearDateFilter = () => {
        setFilteredContacts(contacts);
        setSelected(undefined);
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className={style.contactsPannel}>
            <div className={style.groupButton}>
                {!selected && (
                    <button className={`${style.generalButton} ${style.filterButton}`} onClick={openModal}>
                        <HiOutlineCalendar size={20} />
                        Filtrar
                    </button>
                )}
                {selected && (
                    <button className={`${style.generalButton} ${style.filterButton}`} onClick={clearDateFilter}>
                        <HiOutlineCalendar size={20} />
                        Remover
                    </button>
                )}
                <div className={style.wrapper}>
                    <input
                        className={style.input}
                        type="text"
                        placeholder="Pesquise por nome ou email"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={handleKeyPress} />
                    <button className={style.searchButton} onClick={handleSearch}>
                        <HiSearch className={style.icon} size={20} />
                    </button>
                </div>
                <div className={style.primaryButton}>
                    <AddContact />
                </div>
            </div><div className={style.table}>
                <ContactsTable filteredContacts={filteredContacts} />
            </div><Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Date modal"
                style={customModal}
                overlayClassName={modalStyles.overlay}
            >
                <div className={style.modalBox}>
                    <div className={style.modalHeader}>
                        <h4>Cadastro</h4>
                        <button className={modalStyles.closeButton} onClick={closeModal}>
                            <HiX size={20} />
                        </button>
                    </div>
                    <div className={style.modalBody}>
                        <DayPicker
                            mode="single"
                            selected={selected}
                            onSelect={setSelected} />
                    </div>
                    <div className={style.modalFooter}>
                        <button
                            className={`${style.generalButton} ${style.cancelButton}`}
                            onClick={closeModal}
                        >
                            <HiX size={20} />
                            Cancelar
                        </button>
                        <button
                            className={`${style.generalButton} ${style.confirmButton}`}
                            type="submit"
                            value="Editar Contato"
                            onClick={handleDateFilter}
                        >
                            <HiOutlineCheck size={20} />
                            Confirmar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}