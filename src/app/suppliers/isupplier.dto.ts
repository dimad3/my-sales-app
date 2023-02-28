import { IAddress } from "../iaddress.dto";

export interface ISupplier {
  // The id field has been set as optional, using id?
  id?: number;
  // the other fields are required
  companyName: string;
  contactName: string;
  contactTitle: string;
  address: IAddress;
}
