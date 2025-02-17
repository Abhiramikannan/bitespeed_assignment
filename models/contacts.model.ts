export interface Icontact{
  id: number,
  phoneNumber: string,
  email: string,
  linkedId: string, 
  linkPrecedence: string
}

export interface Contact {
  primaryContactId: number;
  emails: string[]; // First element is the primary contact's email
  phoneNumbers: string[]; // First element is the primary contact's phone number
  secondaryContactIds: number[]; // IDs of secondary contacts
}
