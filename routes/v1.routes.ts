import { Router } from "express";
import { create_update_contacts } from "../controllers/contacts_controller";
export const apiV1 = Router();

// routes starts from here...



//protected routes starts from here...
apiV1.post("/identify", create_update_contacts);
