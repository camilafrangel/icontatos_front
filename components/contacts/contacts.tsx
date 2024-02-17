import Link from "next/link";
import styles from "./contacts.module.css"
import RemoveContact from "../removeContact/removeContact";
import { HiPencilAlt } from "react-icons/hi"
import { Key } from "react";

async function getContacts() {
    try {
        const res = await fetch("http://localhost:3000/api/contacts", {
            cache: "no-store"
        })

        if(!res.ok) {
            throw new Error('Failed to fetch Contacts')
        }

        return res.json();
    } catch (error) {
        console.log("Error:", error)
    }
}

export default async function Contacts() {
    const { contacts } = await getContacts();

    return (
        <div className={styles.contacts}>
            <Link href={"/addContact"}>Novo Contato</Link>
            <h1>Contatos</h1>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Telefone</th>
                        <th scope="col">Cadastro</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((c: { id: string, name: string, email: string, phoneNumber: string, createdAt: string, _id: any }, index: Key) => (
                        <tr key={index}> {c.id}
                            <th scope="row">{c.name}</th>
                            <td>{c.email}</td>
                            <td>{c.phoneNumber}</td>
                            <td>{c.createdAt}</td>
                            <td>
                                <RemoveContact id={c._id}/>
                                <Link href={`/editContact/${c._id}`}>
                                    <HiPencilAlt size={24}></HiPencilAlt>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
