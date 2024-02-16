import Link from "next/link";
import styles from "./contacts.module.css"
import RemoveContact from "../removeContact/removeContact";
import { HiPencilAlt } from "react-icons/hi"

export default function Contacts() {
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
                        <th scope="col">CEP</th>
                        <th scope="col">Cadastro</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Chris</th>
                        <td>cris@gmail.com</td>
                        <td>22996687657</td>
                        <td>2299668</td>
                        <td>16/02/2023</td>
                        <td>
                            <RemoveContact/>
                            <Link href={"/editContact/123"}>
                                <HiPencilAlt size={24}></HiPencilAlt>
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Chris</th>
                        <td>cris@gmail.com</td>
                        <td>22996687657</td>
                        <td>2299668</td>
                        <td>16/02/2023</td>
                        <td>
                            <RemoveContact/>
                            <Link href={"/editContact/123"}>
                                <HiPencilAlt size={24}></HiPencilAlt>
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}