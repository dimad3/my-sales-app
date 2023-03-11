export interface IAddress {
  street: string;
  city: string;
  region: string;
  // The number is a primitive data type. It is the one you must use.
  // The primitive data type does not have properties or methods
  // The Number is a wrapper object around number. It is created by using the syntax new Number(value).
  // The objects have properties & methods
  postalCode: number;
  country: string;
  phone: string;
}
