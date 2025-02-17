import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { response } from "../helpers/response";
import { bulk_update_primary_entry, create_contact_entry, fetch_contact_entries, fetch_oldest_contact_entry } from "../services/contacts_service";
import { Icontact, Contact } from "../models/contacts.model";
import { linkedPrecedenceOptions } from "../constants/enums";


export const create_update_contacts = async(req:Request, res: Response)=>{
    try {
        const { email, phoneNumber } = req.body; 
        const contact: Contact = {
          primaryContactId: 0,
          emails: [],
          phoneNumbers: [],
          secondaryContactIds: [],
        };

        const primary_contact = await fetch_oldest_contact_entry(email, phoneNumber) as Icontact[]
        var linkedId = null
        var linkedPrecedence = linkedPrecedenceOptions.primary
        if (primary_contact.length > 0) {
            linkedPrecedence = linkedPrecedenceOptions.secondary;
            linkedId = primary_contact[0].id
        }

        await create_contact_entry(email, phoneNumber, linkedId, linkedPrecedence);
        if (primary_contact.length > 0) {
            await bulk_update_primary_entry(email, phoneNumber, primary_contact[0].id);
        }

        const contact_entries = await fetch_contact_entries(email, phoneNumber) as Icontact[]

        for (var i = 0; i < contact_entries.length; i++){
            contact.emails.push(contact_entries[i].email);
            contact.phoneNumbers.push(contact_entries[i].phoneNumber);
            if (contact_entries[i].linkPrecedence == linkedPrecedenceOptions.primary) {
                contact.primaryContactId = contact_entries[i].id
            } else {
                contact.secondaryContactIds.push(contact_entries[i].id)
            }
        }

        return response.setSuccess(true, StatusCodes.OK, contact, "contacts data").send(res);

    } catch(error) {
        return response.setError(StatusCodes.BAD_REQUEST, "Internal server error", error).send(res)
    }
}
