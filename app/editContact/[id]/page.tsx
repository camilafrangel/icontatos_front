import EditContactForm from "../../../components/editContactForm/editContact";

const getContactById= async(id: string) => {
    const apiUrl = process.env.API_URL;
    try {
        const res = await fetch(`${apiUrl}/api/contacts/${id}`,{
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

    return <EditContactForm id={id} name={name} email={email} phoneNumber={phoneNumber}/>
}