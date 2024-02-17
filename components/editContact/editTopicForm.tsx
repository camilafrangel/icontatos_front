"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import InputMask from "react-input-mask";

interface IFormInput {
    name: String,
    email: String,
    phoneNumber: String
}

export default function EditTopicForm({id, name, email, phoneNumber}: {id: string, name: string, email: string, phoneNumber: string}){
    const router = useRouter();

    const [newName, setNewName] = useState(name);
    const [newEmail, setNewEmail] = useState(email);
    const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const response = await fetch(`http://localhost:3000/api/contacts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to update contact');
            }

            console.log('Contact updated successfully!');
            
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    const handleNameChange = (event: { target: { value: any; }; }) => {
        setNewName(event.target.value);
    }

    const handleEmailChange = (event: { target: { value: any; }; }) => {
        setNewEmail(event.target.value);
    }

    const handlePhoneNumberChange = (event: { target: { value: any; }; }) => {
        setNewPhoneNumber(event.target.value);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <label>Nome</label>
        <input
            {...register("name")}
            value={newName}
            onChange={handleNameChange}
            aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <label>E-mail</label>
        <input {...register("email", {
            pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "E-mail inválido"
            }
        })}
        value={newEmail}
        onChange={handleEmailChange} />
        {errors.email && <p>{errors.email.message}</p>}
        <label>Telefone</label>
        <InputMask
            mask="(99) 99999-9999"
            maskChar="_"
            {...register("phoneNumber")}
            value={newPhoneNumber}
            onChange={handlePhoneNumberChange}
            aria-invalid={errors.phoneNumber ? "true" : "false"}
        />
        {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
        <input type="submit" value="Atualizar Contato" />
    </form>
    )
}