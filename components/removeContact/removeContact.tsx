"use client"

import { HiOutlineTrash } from "react-icons/hi"
import { useRouter } from "next/navigation"

export default function RemoveContact({id}: {id: string}){
    const router = useRouter();

    const removeContact = async() => {
        // const confirmed = confirm("Sure?");
        
        const res = await fetch(`http://localhost:3000/api/contacts?id=${id}`, {
            method: "DELETE",
        });

        if (res.ok) router.refresh();
        
    }

    return(
        <button onClick={removeContact}>
            <HiOutlineTrash size={24}></HiOutlineTrash>
        </button>
    )
}