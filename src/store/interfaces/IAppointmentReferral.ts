import IDoctorAddressBook from "./IDoctorAddressBook";

export default interface IAppointmentReferral {
  id: number;
  appointment_id: number;
  is_no_referral: boolean;
  no_referral_reason: string;
  referral_date: string;
  referral_duration: string;
  referral_expiry_date: string;
  patient_document: string;
  patient_document_file_path: string;
  doctor_address_book: IDoctorAddressBook;
}
