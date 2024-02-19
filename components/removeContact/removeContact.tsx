"use client"

import { HiOutlineTrash } from "react-icons/hi"
import { useRouter } from "next/navigation"
import Modal from "react-modal"
import style from "./removeContact.module.css"
import React from "react";
import { HiOutlineCheck, HiX } from "react-icons/hi";

const customModal = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '8px'
    }
};

export default function RemoveContact({ id, user }: { id: string, user: string }) {
    const router = useRouter();
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const removeContact = async () => {
        setIsOpen(false);

        const res = await fetch(`/api/contacts?id=${id}`, {
            method: "DELETE",
        });

        if (res.ok) router.refresh();
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <button className={style.trashIcon} onClick={openModal}>
                <HiOutlineTrash size={24}></HiOutlineTrash>
            </button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Remove contact modal"
                style={customModal}
                overlayClassName={style.overlay}
            >
                <div className={style.modalBox}>
                    <div className={style.modalHeader}>
                        <button className={style.closeButton} onClick={closeModal}>
                            <HiX size={20} />
                        </button>
                    </div>
                    <div className={style.question}>Deseja remover o contato {user}?</div>
                    <div className={style.modalFooter}>
                        <button className={`${style.cancelButton} ${style.generalButton}`} onClick={closeModal}>
                            <HiX size={20} />
                            Cancelar
                        </button>
                        <button className={`${style.confirmButton} ${style.generalButton}`} onClick={removeContact}>
                            <HiOutlineCheck size={20} />
                            Confirmar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}