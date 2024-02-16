import EditTopicForm from "../../../components/editContact/editTopicForm";

export default function EditContact(){
    return(
        <form action="">
        <input type="text" placeholder="Nome"/>
        <input type="text" placeholder="E-mail"/>
        <input type="text" placeholder="Telefone"/>
        <input type="text" placeholder="CEP"/>
        <button>Atualizar Contato</button>
    </form>
    )
}