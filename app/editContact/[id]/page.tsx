import EditTopicForm from "../../../components/editContact/editTopicForm";

const getContactById= async(id: string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/contacts/${id}`,{
            cache: "no-store"
        })

        if(!res.ok){
            throw new Error("Falhou em buscar Contato");
        }

        return res.json();
    } catch (error) {
        console.log(error)
    }
}

export default async function EditContact({ params }: { params : { id: string}}){
    const { id } = params;

    const {contact} = await getContactById(id)
    const {name, email, phoneNumber} = contact;

    return <EditTopicForm id={id} name={name} email={email} phoneNumber={phoneNumber}/>
}