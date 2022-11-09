import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IScheduleFee {
  id: number;
  amount: number;
  health_fund_code: string;
  schedule_item_id: number;
}

export interface ScheduleFeeInfo {
  scheduleFeeData: Array<IScheduleFee>;
}

@Module
export default class ScheduleFeeModule
  extends VuexModule
  implements ScheduleFeeInfo
{
  scheduleFeeData = [] as Array<IScheduleFee>;

  /**
   * Get current user object
   * @returns AdminList
   */
  get scheduleFeeList(): Array<IScheduleFee> {
    return this.scheduleFeeData;
  }

  @Mutation
  [Mutations.SET_SCHEDULE_ITEM.LIST](data) {
    this.scheduleFeeData = data;
  }

  @Action
  [Actions.SCHEDULE_ITEM.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("schedule-items")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_SCHEDULE_ITEM.LIST, data.data);
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
  [Actions.SCHEDULE_ITEM.CREATE](payload) {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("schedule-items", payload, config)
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
  [Actions.SCHEDULE_ITEM.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("schedule-items", item.id, item)
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
  [Actions.SCHEDULE_ITEM.DELETE](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.delete("schedule-items/" + id)
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
}
