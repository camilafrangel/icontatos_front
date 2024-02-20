export const customModal = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "8px",
        border: "none",
    },
};

export function formatDateString(dataString: string | number | Date) {
    const data = new Date(dataString);

    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');

    const dataFormatada = `${ano}-${mes}-${dia}`;
    return dataFormatada;
};

export function formatDate(originalDateString: string) {
    const originalDate = new Date(originalDateString);
    return originalDate.toLocaleDateString('en-GB');
};

export function formatPhone(originalPhoneNumber: string) {
    const numbers = originalPhoneNumber.replace(/\D/g, '');

    const newFormat = /^(\d{2})(\d{5})(\d{4})$/;
    return numbers.replace(newFormat, '($1) $2-$3');
};