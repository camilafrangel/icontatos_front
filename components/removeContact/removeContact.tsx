"use client"

import { HiOutlineTrash } from "react-icons/hi"
import { useRouter } from "next/navigation"
import style from "./removeContact.module.css"

export default function RemoveContact({id}: {id: string}){
    const router = useRouter();

    const removeContact = async() => {
        // const confirmed = confirm("Sure?");
        
        const res = await fetch(`/api/contacts?id=${id}`, {
            method: "DELETE",
        });

        if (res.ok) router.refresh();
        
    }

    return(
        <button className={style.removeButton} onClick={removeContact}>
            <HiOutlineTrash size={24}></HiOutlineTrash>
        </button>
    )
}