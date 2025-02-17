import { cachedsqlclient } from "../config/database";
import { linkedPrecedenceOptions } from "../constants/enums";

export const create_contact_entry = async (email:string, phoneNumber:string, linkedId:number | null, linkPrecedence:string) => {
    const sql = `insert into contacts (email, phoneNumber, linkedId, linkPrecedence) values (?, ?, ?, ?)`;
    await (await cachedsqlclient()).query(sql, [email, phoneNumber, linkedId, linkPrecedence]);
}

export const fetch_contact_entries = async (email: string, phoneNumber: string) => {
    const sql = `select * from contacts  where email = ? or phoneNumber = ?`;
    const [data] = await (await cachedsqlclient()).query(sql, [email, phoneNumber ]);
    return data;
}

export const bulk_update_primary_entry = async (email: string, phoneNumber: string, primary_contact_id: number) => {
    const sql = `update contacts set linkPrecedence = ? where (email=? or phoneNumber = ?) and (linkPrecedence = ? and id !=?)`;
    await (await cachedsqlclient()).query(sql, [linkedPrecedenceOptions.secondary, email, phoneNumber, linkedPrecedenceOptions.primary, primary_contact_id]);
}

export const fetch_oldest_contact_entry = async (email: string, phoneNumber: string) => {
    const sql = `select * from contacts  where email = ? or phoneNumber = ? order by created_at limit 1`;
    const [data] = await (await cachedsqlclient()).query(sql, [email, phoneNumber]);
    return data
}
