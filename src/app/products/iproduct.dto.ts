import { ISupplier } from "../suppliers/isupplier.dto";
import { Category } from "../categories/category.dto";

export interface IProduct {
  // The number is a primitive data type. It is the one you must use.
  // The primitive data type does not have properties or methods
  // The Number is a wrapper object around number. It is created by using the syntax new Number(value).
  // The objects have properties & methods
  id?: number;
  supplier?: ISupplier;
  category?: Category;
  unitPrice: number;
  unitsInStock: number;
  name: string;
  disccounted: boolean;
}
