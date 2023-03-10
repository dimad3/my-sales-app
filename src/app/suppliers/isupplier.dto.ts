import { IAddress } from "../iaddress.dto";

export interface ISupplier {
  // The number is a primitive data type. It is the one you must use.
  // The primitive data type does not have properties or methods
  // The Number is a wrapper object around number. It is created by using the syntax new Number(value).
  // The objects have properties & methods
  // The id field has been set as optional, using id?
  id?: number;
  // the other fields are required
  companyName: string;
  contactName: string;
  contactTitle: string;
  address: IAddress;
}
