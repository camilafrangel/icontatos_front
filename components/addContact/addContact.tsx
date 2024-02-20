'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation";
import { HiOutlineCheck, HiUserAdd, HiX } from "react-icons/hi";
import style from "./addContact.module.css"
import Modal from "react-modal"
import React, { useState } from "react";
import { customModal } from "../utils/utils";
import { IFormInput } from "../utils/types";
import { refreshTable } from "../../app/page";

export default function AddContact() {
    const router = useRouter();
    const [modalIsOpen, setIsOpen] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const response = await fetch('/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to create contact');
            }

            console.log('Contact created successfully!');
            router.refresh();
            refreshTable();
        } catch (error) {
            console.error('Error creating contact:', error);
        }
        closeModal()
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        reset();
    }

    return (
        <div>
            <button className={`${style.generalButton} ${style.addContactbutton}`} onClick={openModal}>
                <HiUserAdd size={20} />
                Novo Contato
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Add contact modal"
                style={customModal}
                overlayClassName={style.overlay}
            >
                <div className={style.modalBox}>
                    <div className={style.modalHeader}>
                        <h4>Novo contato</h4>
                        <button className={style.closeButton} onClick={closeModal}>
                            <HiX size={20} />
                        </button>
                    </div>
                    <div className={style.modalBody}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label>Nome</label>
                                <input
                                    placeholder="João da Silva"
                                    className={style.input}
                                    {...register("name", {
                                        required: "* Nome é obrigatório",
                                        maxLength: {
                                            value: 40,
                                            message: "* Limite de caracteres ultrapassado"
                                        }
                                    })}
                                    aria-invalid={errors.name ? "true" : "false"}
                                />
                                <div className={style.errorMessageContainer}>
                                    {errors.name && <p className={style.error}>{errors.name.message}</p>}
                                </div>
                            </div>
                            <div>
                                <label>E-mail</label>
                                <input
                                    placeholder="joao@email.com"
                                    className={style.input}
                                    {...register("email", {
                                        required: "* E-mail é obrigatório",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "* E-mail inválido"
                                        }
                                    })} />
                                <div className={style.errorMessageContainer}>
                                    {errors.email && <p className={style.error}>{errors.email.message}</p>}
                                </div>
                            </div>
                            <label>Telefone</label>
                            <div>
                                <input
                                    placeholder="(00) 99999-9999"
                                    className={style.input}
                                    {...register("phoneNumber", {
                                        required: "* Telefone é obrigatório",
                                        pattern: {
                                            value: /^[0-9]{11}$/,
                                            message: "* Telefone inválido"
                                        }
                                    })}
                                    aria-invalid={errors.phoneNumber ? "true" : "false"}
                                />
                                <div className={style.errorMessageContainer}>
                                    {errors.phoneNumber && <p className={style.error}>{errors.phoneNumber.message}</p>}
                                </div>
                            </div>
                            <div className={style.modalFooter}>
                                <button className={`${style.generalButton} ${style.cancelButton}`} onClick={closeModal}>
                                    <HiX size={20} />
                                    Cancelar
                                </button>
                                <button className={`${style.generalButton} ${style.confirmButton}`} type="submit" value="Criar Contato">
                                    <HiOutlineCheck size={20} />
                                    Criar Contato</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    )
}