import {ref} from "vue";
import chargeTypes from "@/core/data/charge-types";

interface IAlerts {
  alert_level: string;
  is_dismissed: boolean;
}

 interface IPatientInfoData {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email: string;
  address: string;
  contact_number: string;
  appointment_confirm_method: string;
  allergies: string;
  clinical_alerts: string;
  also_known_as: [];
  is_exist: boolean;
  is_ok: boolean;
  alerts: Array<IAlerts>;
}

 interface IAptInfoTypeData {
   appointment_type_id: number | string;
   room_id: number | string;
   note: string;
   send_forms: boolean;
   isNewPatient: boolean;
 }

 interface IAptInfoData {
   clinic_name: string;
   clinic_id: number;
   send_forms: boolean;
   date: string;
   arrival_time: string;
   time_slot: Array<unknown>;
   appointment_type_id: number | string;
   specialist_id: number;
   room_id: number | string;
   note: string;
   patient_id: number;
   start_time: string;
   is_wait_listed: boolean;
 }

interface  IBillingInfoData{
  charge_type: string;
  claim_sources: Array<unknown>;
  procedure_price: string,
  add_other_account_holder: boolean,
}

export {IAptInfoData,IAptInfoTypeData, IAlerts, IPatientInfoData, IBillingInfoData}
