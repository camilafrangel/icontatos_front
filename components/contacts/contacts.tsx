import styles from "./contacts.module.css"
import RemoveContact from "../removeContact/removeContact";
import { Key } from "react";
import ButtonGroup from "../buttonGroup/buttonGroup";
import EditContact from "../../app/editContact/[id]/page";

async function getContacts() {
    const apiUrl = process.env.API_URL
    console.log(apiUrl)
    try {
        const res = await fetch(`${apiUrl}/api/contacts`, {
            cache: "no-store"
        })

        if (!res.ok) {
            throw new Error('Failed to fetch Contacts')
        }

        return res.json();
    } catch (error) {
        console.log("Error:", error)
    }
}

function formatDate(originalDateString: string) {
    const originalDate = new Date(originalDateString);
    return originalDate.toLocaleDateString('en-GB');
};

function formatPhone(originalPhoneNumber: string) {
    const numbers = originalPhoneNumber.replace(/\D/g, '');

    const newFormat = /^(\d{2})(\d{5})(\d{4})$/;
    return numbers.replace(newFormat, '($1) $2-$3');
}

export default async function Contacts() {
    const { contacts } = await getContacts();

    return (
        <div className={styles.contactsBox}>
            <div>
                <ButtonGroup />
                <table className={styles.styledTable}>
                    <thead>
                        <tr className={styles.tableRow}>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Telefone</th>
                            <th scope="col">Cadastro</th>
                            <th scope="col">Última Atualização</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((c: { id: string, name: string, email: string, phoneNumber: string, createdAt: string, updatedAt: string, _id: any }, index: Key) => (
                            <tr key={index} className={styles.tableRow}> {c.id}
                                <td>{c.name}</td>
                                <td>{c.email}</td>
                                <td>{formatPhone(c.phoneNumber)}</td>
                                <td>{formatDate(c.createdAt)}</td>
                                <td>{formatDate(c.updatedAt)}</td>
                                <td className={styles.buttonCell}>
                                    <EditContact params={{id: `${c._id}`}}/>
                                    <RemoveContact id={c._id} user={c.name}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}
