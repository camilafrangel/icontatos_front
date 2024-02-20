'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { HiOutlineCheck, HiPencilAlt, HiX } from "react-icons/hi";
import Modal from "react-modal";
import style from "./editContact.module.css";
import { customModal } from "../utils/utils";
import { IFormInput } from "../utils/types";

export default function EditContact({id, name, email, phoneNumber,}: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
}) {
    const router = useRouter();

    const [modalIsOpen, setIsOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const response = await fetch(`/api/contacts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to update contact");
            }

            console.log("Contact updated successfully!");

            router.refresh();
        } catch (error) {
            console.error("Error updating contact:", error);
        }
        closeModal();
    };

    function openModal() {
        setIsOpen(true);
        setValue("name", name);
        setValue("email", email);
        setValue("phoneNumber", phoneNumber);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <button className={style.editIcon} onClick={openModal}>
                <HiPencilAlt size={24}></HiPencilAlt>
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Edit contact modal"
                style={customModal}
                overlayClassName={style.overlay}
            >
                <div className={style.modalBox}>
                    <div className={style.modalHeader}>
                        <h4>Editar contato</h4>
                        <button className={style.closeButton} onClick={closeModal}>
                            <HiX size={20} />
                        </button>
                    </div>
                    <div className={style.modalBody}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label>Nome</label>
                            <input
                                className={style.input}
                                {...register("name", {
                                    required: " * Nome é obrigatório",
                                    maxLength: {
                                        value: 40,
                                        message: "* Nome deve ter menos de 40 caracteres",
                                    },
                                })}
                                aria-invalid={errors.name ? "true" : "false"}
                            />
                            <div className={style.errorMessageContainer}>
                                {errors.name && (<p className={style.error}>{errors.name.message}</p> )}
                            </div>
                            <label>E-mail</label>
                            <input
                                className={style.input}
                                {...register("email", {
                                    required: "* E-mail é obrigatório",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "* E-mail inválido",
                                    },
                                })}
                                aria-invalid={errors.email ? "true" : "false"}
                            />
                            <div className={style.errorMessageContainer}>
                                {errors.email && (<p className={style.error}>{errors.email.message}</p>)}
                            </div>
                            <label>Telefone</label>
                            <input
                                className={style.input}
                                {...register("phoneNumber", {
                                    required: "* Telefone é obrigatório",
                                    pattern: {
                                        value: /^[0-9]{11}$/,
                                        message: "* Telefone inválido",
                                    },
                                })}
                                aria-invalid={errors.phoneNumber ? "true" : "false"}
                            />
                            <div className={style.errorMessageContainer}>
                                {errors.phoneNumber && (<p className={style.error}>{errors.phoneNumber.message}</p>)}
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
                                >
                                    <HiOutlineCheck size={20} />
                                    Confirmar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
