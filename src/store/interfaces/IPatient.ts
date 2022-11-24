import IAppointment from "./IAppointment";
import IPatientAlert from "./IPatientAlert";
import IPatientAlsoKnownAs from "./IPatientAlsoKnownAs";
import IPatientBilling from "./IPatientBilling";

export default interface IPatient {
  id: number;
  ur_id: string;
  title: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  contact_number: string;
  date_of_birth: string;
  country_of_birth: string;
  gender: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
  marital_status: string;
  medicare_details: IPatientBilling;
  birth_place_code: string;
  birth_state: string;
  occupation: string;
  height: string;
  weight: string;
  race: string;
  preferred_contact_method: string;
  appointment_confirm_method: string;
  send_recall_method: string;
  kin_name: string;
  kin_relationship: string;
  kin_phone_number: string;
  kin_receive_correspondence: boolean;
  kin_email: string;
  alerts: Array<IPatientAlert>;
  appointments: Array<IAppointment>;
  also_known_as: Array<IPatientAlsoKnownAs>;
}
