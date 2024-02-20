export interface Contact {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
    _id: string;
}

export interface FilteredContactsProps {
    filteredContacts: Contact[];
}

export interface ContactsProps {
    contacts: Contact[];
}