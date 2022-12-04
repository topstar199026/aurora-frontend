import IAppointmentReferral from "./IAppointmentReferral";
import IAppointmentType from "./IAppointmentType";
import IClinic from "./IClinic";
export default interface IAppointment {
  id: number;
  patient_id: number;
  organization_id: number;
  clinic_id: number;
  appointment_type_id: number;
  specialist_id: number;
  specialist_name: string;
  anesthetist_id: number;
  anesthetist_name: string;
  room_id: number;
  is_wait_listed: boolean;
  procedure_approval_status: string;
  confirmation_status: string;
  attendance_status: string;
  date: string;
  arrival_time: string;
  start_time: string;
  end_time: string;
  formatted_appointment_time: string;
  note: string;
  collecting_person_name: string;
  collecting_person_phone: string;
  collecting_person_alternate_contact: string;
  clinic: IClinic;
  referral: IAppointmentReferral;
  appointment_type: IAppointmentType;
  charge_type: string;
  action: string;
  step: number;
}
