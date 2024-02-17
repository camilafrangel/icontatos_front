'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import InputMask from "react-input-mask";
import { useRouter } from "next/navigation";

interface IFormInput {
    name: String,
    email: String,
    phoneNumber: String
}

export default function AddContact() {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const response = await fetch('http://localhost:3000/api/contacts', {
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
            router.push("/");
        } catch (error) {
            console.error('Error creating contact:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Nome</label>
            <input
                {...register("name", {
                    required: "Nome é obrigatório"
                })}
                aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && <p>{errors.name.message}</p>}
            <label>E-mail</label>
            <input {...register("email", {
                required: "E-mail é obrigatório",
                pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "E-mail inválido"
                }
            })} />
            {errors.email && <p>{errors.email.message}</p>}
            <label>Telefone</label>
            <InputMask
                mask="(99) 99999-9999"
                maskChar="_"
                {...register("phoneNumber", {
                    required: "Telefone é obrigatório"
                })}
                aria-invalid={errors.phoneNumber ? "true" : "false"}
            />
            {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
            <input type="submit" value="Criar Contato" />
        </form>
    )
}