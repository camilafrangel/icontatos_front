export function formatDate(dataString: string) {
    const data = new Date(dataString);

    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // +1 porque os meses são indexados a partir de zero
    const dia = String(data.getDate()).padStart(2, '0');

    const dataFormatada = `${ano}-${mes}-${dia}`;
    return dataFormatada;
};