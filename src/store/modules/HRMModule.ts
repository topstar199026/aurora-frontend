import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Mutations } from "@/store/enums/StoreEnums";
import { HRMActions, HRMMutations } from "@/store/enums/StoreHRMEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import {
  AppointmentActions,
  AppointmentMutations,
} from "@/store/enums/StoreAppointmentEnums";
import { array } from "yup";

export interface IHRMWeeklyScheduleTimeslot {
  id: number;
}

export interface IHRMWeeklyScheduleTemplate {
  id: number;
}

export interface IHRMWeeklyScheduleTemplates {
  hrmScheduleData: Array<IHRMWeeklyScheduleTemplate>;
  hrmScheduleSelectData: IHRMWeeklyScheduleTemplate;
  hrmTimeslotSelectData: Array<IHRMWeeklyScheduleTimeslot>;
  hrmAnesthetists: Array<IHRMWeeklyScheduleTemplate>;
}

@Module
export default class HRMModule
  extends VuexModule
  implements IHRMWeeklyScheduleTemplates
{
  hrmScheduleData = [] as Array<IHRMWeeklyScheduleTemplate>;
  hrmScheduleSelectData = {} as IHRMWeeklyScheduleTemplate;
  hrmTimeslotSelectData = [] as Array<IHRMWeeklyScheduleTimeslot>;
  hrmAnesthetists = [] as Array<IHRMWeeklyScheduleTemplate>;

  get hrmScheduleList(): Array<IHRMWeeklyScheduleTemplate> {
    return this.hrmScheduleData;
  }

  get hrmScheduleSelected(): IHRMWeeklyScheduleTemplate {
    return this.hrmScheduleSelectData;
  }

  get hrmTimeslotSelected(): Array<IHRMWeeklyScheduleTemplate> {
    return this.hrmTimeslotSelectData;
  }

  get hrmAnesthetist(): Array<IHRMWeeklyScheduleTimeslot> {
    return this.hrmAnesthetists;
  }

  @Mutation
  [HRMMutations.SCHEDULE_TEMPLATE.SET_LIST](data) {
    this.hrmScheduleData = data;
  }

  @Mutation
  [HRMMutations.SCHEDULE_TEMPLATE.SET_SELECT](data) {
    this.hrmScheduleSelectData = data;
  }

  @Mutation
  [HRMMutations.SCHEDULE_TEMPLATE.SET_TIMESLOT](data) {
    this.hrmTimeslotSelectData = data;
  }

  @Mutation
  [HRMMutations.ANESTHETIST.SET_LIST](data) {
    this.hrmAnesthetists = data;
  }

  @Action
  [HRMActions.SCHEDULE_TEMPLATE.LIST](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.query("hrm/hrm-schedule-timeslot", {
        params: {
          clinic_id: data.clinic_id,
        },
      })
        .then(({ data }) => {
          this.context.commit(
            HRMMutations.SCHEDULE_TEMPLATE.SET_LIST,
            data.data
          );
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response.data.error);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [HRMActions.SCHEDULE_TEMPLATE.CREATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("hrm/hrm-schedule-timeslot", item)
        .then(({ data }) => {
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response.data.error);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [HRMActions.SCHEDULE_TEMPLATE.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("hrm/hrm-schedule-timeslot", item.id, item)
        .then(({ data }) => {
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response.data.error);
          // this.context.commit(Mutations.SET_ERROR, response.data.errors);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [HRMActions.ANESTHETIST.LIST](payload) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.query("hrm/anesthetists", { params: payload })
        .then(({ data }) => {
          this.context.commit(HRMMutations.ANESTHETIST.SET_LIST, data.data);
        })
        .catch(({ response }) => {
          console.log(response.data.error);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }
}
