'use client'

import styles from "./contacts.module.css"
import RemoveContact from "../removeContact/removeContact";
import EditContact from "../editContact/editContact";
import { Key } from "react";
import { FilteredContactsProps } from "../utils/types";
import Image from "next/image";
import { formatDate, formatPhone } from "../utils/utils";

export default function ContactsTable({ filteredContacts }: FilteredContactsProps) {
    return (
        <div>
            <table className={styles.styledTable}>
                {filteredContacts.length > 0 && (
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
                )}
                <tbody>
                    {filteredContacts.length > 0 && (
                        filteredContacts.map((c: { id: string, name: string, email: string, phoneNumber: string, createdAt: string, updatedAt: string, _id: any }, index: Key) => (
                            <tr key={index} className={styles.tableRow}> {c.id}
                                <td>{c.name}</td>
                                <td><a href={`mailto:${c.email}`} target="_blank" className={styles.email}>{c.email}</a></td>
                                <td>{formatPhone(c.phoneNumber)}</td>
                                <td>{formatDate(c.createdAt)}</td>
                                <td>{formatDate(c.updatedAt)}</td>
                                <td className={styles.buttonCell}>
                                    <EditContact id={c._id} name={c.name} email={c.email} phoneNumber={c.phoneNumber} />
                                    <RemoveContact id={c._id} user={c.name} />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            {filteredContacts.length === 0 && (
                <div className={styles.emptyContainer}>
                    <Image src="/assets/emptySearch.png" alt="iContatos" className={styles.emptyImg} width={300} height={300} />
                    <p>Nenhum usuário encontrado, tente fazer outra pesquisa ou remover o filtro de data.</p>
                </div>
            )}
        </div>
    );
}