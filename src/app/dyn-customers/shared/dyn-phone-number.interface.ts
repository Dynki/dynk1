import { PhoneTypes } from './dyn-phone-types.enum';

export interface PhoneNumber {
  type: PhoneTypes;
  number: string;
}
