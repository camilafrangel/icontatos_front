'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { HiOutlineCheck, HiPencilAlt, HiX } from "react-icons/hi";
import Modal from "react-modal";
import modalStyles from "../../app/globals.module.css"
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
                throw new Error('Falha ao editar contato');
            }

            console.log('Contato editado com sucesso');

            router.refresh();
        } catch (error) {
            console.error("Error:", error);
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
            <button 
                style={{ 
                    color: '#02213B',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                }} 
                onClick={openModal}>
                <HiPencilAlt size={24}></HiPencilAlt>
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Edit contact modal"
                style={customModal}
                overlayClassName={modalStyles.overlay}
            >
                <div className={modalStyles.modalBox}>
                    <div className={modalStyles.modalHeader}>
                        <h4>Editar contato</h4>
                        <button className={modalStyles.closeButton} onClick={closeModal}>
                            <HiX size={20} />
                        </button>
                    </div>
                    <div className={modalStyles.modalBody}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label>Nome</label>
                            <input
                                className={modalStyles.input}
                                {...register("name", {
                                    required: " * Nome é obrigatório",
                                    maxLength: {
                                        value: 40,
                                        message: "* Nome deve ter menos de 40 caracteres",
                                    },
                                })}
                                aria-invalid={errors.name ? "true" : "false"}
                            />
                            <div className={modalStyles.errorMessageContainer}>
                                {errors.name && (<p className={modalStyles.error}>{errors.name.message}</p> )}
                            </div>
                            <label>E-mail</label>
                            <input
                                className={modalStyles.input}
                                {...register("email", {
                                    required: "* E-mail é obrigatório",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "* E-mail inválido",
                                    },
                                })}
                                aria-invalid={errors.email ? "true" : "false"}
                            />
                            <div className={modalStyles.errorMessageContainer}>
                                {errors.email && (<p className={modalStyles.error}>{errors.email.message}</p>)}
                            </div>
                            <label>Telefone</label>
                            <input
                                className={modalStyles.input}
                                {...register("phoneNumber", {
                                    required: "* Telefone é obrigatório",
                                    pattern: {
                                        value: /^[0-9]{11}$/,
                                        message: "* Telefone inválido",
                                    },
                                })}
                                aria-invalid={errors.phoneNumber ? "true" : "false"}
                            />
                            <div className={modalStyles.errorMessageContainer}>
                                {errors.phoneNumber && (<p className={modalStyles.error}>{errors.phoneNumber.message}</p>)}
                            </div>
                            <div className={modalStyles.modalFooter}>
                                <button
                                    className={`${modalStyles.generalButton} ${modalStyles.cancelButton}`}
                                    onClick={closeModal}
                                >
                                    <HiX size={20} />
                                    Cancelar
                                </button>
                                <button
                                    className={`${modalStyles.generalButton} ${modalStyles.confirmButton}`}
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
