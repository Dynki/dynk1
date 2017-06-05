import { Address } from './dyn-address.interface';
import { PhoneNumber } from './dyn-phone-number.interface';

export interface Customer {
  _id: string;
  name: string;
  addresses: Address[];
  phoneNumbers: PhoneNumber[];
}
