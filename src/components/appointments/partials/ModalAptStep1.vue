<template>
  <div class="current" data-kt-stepper-element="content">
    <el-form
      class="w-100"
      :rules="rules"
      :model="aptInfoData"
      ref="formRef"
      @submit.prevent="handleSubmit"
    >
      <div class="row scroll h-520px">
        <InputWrapper label="Appointment Type" prop="appointment_type_id">
          <el-select
            class="w-100"
            v-model="aptInfoData.appointment_type_id"
            @change="updateTypeId"
          >
            <el-option
              v-for="item in aptTypeListWithRestriction"
              :value="item.id"
              :label="item.name"
              :key="item.id"
            />
          </el-select>
        </InputWrapper>
        <div class="px-6" v-if="overlappingCnt >= 1">
          <AlertBadge
            text="This appointment will overlap with an
                          upcoming appointment"
            color="warning"
            iconPath="media/icons/duotune/arrows/arr015.svg"
          />
        </div>
        <InputWrapper label="Room" prop="room_id">
          <el-select class="w-100" v-model.number="aptInfoData.room_id">
            <el-option
              v-for="room in allRooms"
              :value="room.id"
              :label="room.name"
              :key="room.id"
            />
          </el-select>
        </InputWrapper>

        <InputWrapper label="Note" prop="note">
          <el-input
            type="textarea"
            v-model="aptInfoData.note"
            placeholder="Enter appointment notes"
          />
        </InputWrapper>
        <el-form-item class="px-6" v-if="modalId === 'new'">
          <el-checkbox
            type="checkbox"
            v-model="aptInfoData.send_forms"
            :label="
              appointmentType === 'procedure'
                ? 'Send Pre-admission form with appointment confirmation?'
                : 'Send Patient form with appointment confirmation?'
            "
          />
        </el-form-item>

        <el-divider />
        <div class="card-info" v-if="modalId === 'new'">
          <div class="d-flex flex-row gap-3">
            <!--begin::Col-->
            <div class="fv-row">
              <!--begin::Option-->
              <input
                type="radio"
                class="btn-check"
                name="patientType"
                value="true"
                checked="checked"
                id="create-new-patient"
                v-model="aptInfoData.isNewPatient"
              />
              <label
                class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center mb-10"
                for="create-new-patient"
                @click="aptInfoData.isNewPatient = true"
              >
                <span class="svg-icon svg-icon-3x me-5">
                  <InlineSVG
                    src="media/icons/duotune/communication/com005.svg"
                  />
                </span>

                <!--begin::Info-->
                <span class="d-block fw-bold text-start">
                  <span class="text-dark fw-bolder d-block fs-4 mb-2">
                    New Patient
                  </span>
                  <span class="text-gray-400 fw-bold fs-6"
                    >Create New Patient</span
                  >
                </span>
                <!--end::Info-->
              </label>
              <!--end::Option-->
            </div>
            <!--end::Col-->

            <!--begin::Col-->
            <div class="fv-row">
              <!--begin::Option-->
              <input
                type="radio"
                class="btn-check"
                name="patientType"
                value="false"
                id="select-existing-patient"
                v-model="aptInfoData.isNewPatient"
              />
              <label
                class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
                for="select-existing-patient"
                @click="aptInfoData.isNewPatient = false"
              >
                <span class="svg-icon svg-icon-3x me-5">
                  <InlineSVG src="media/icons/duotune/finance/fin006.svg" />
                </span>

                <!--begin::Info-->
                <span class="d-block fw-bold text-start">
                  <span class="text-dark fw-bolder d-block fs-4 mb-2"
                    >Existing Patient</span
                  >
                  <span class="text-gray-400 fw-bold fs-6"
                    >Import Existing Patient</span
                  >
                </span>
                <!--end::Info-->
              </label>
              <!--end::Option-->
            </div>
            <!--end::Col-->
          </div>
        </div>
      </div>
      <div
        class="d-flex justify-content-between flex-row-reverse"
        v-if="modalId === 'new'"
      >
        <button
          type="button"
          class="btn btn-lg btn-primary align-self-end"
          @click="handleSubmit"
        >
          Continue
          <span class="svg-icon svg-icon-4 ms-1 me-0">
            <InlineSVG src="media/icons/duotune/arrows/arr064.svg" />
          </span>
        </button>
      </div>
      <div class="d-flex justify-content-end" v-else>
        <button
          type="button"
          class="btn btn-lg btn-light-primary me-3"
          @click="handleSave"
        >
          <span v-if="!loading" class="indicator-label"> Save </span>
          <span v-if="loading" class="indicator-label">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
        <button type="submit" class="btn btn-lg btn-primary align-self-end">
          Continue
          <span class="svg-icon svg-icon-4 ms-1 me-0">
            <InlineSVG src="media/icons/duotune/arrows/arr064.svg" />
          </span>
        </button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, PropType, ref, watchEffect } from "vue";
import { ISpecialist } from "@/store/modules/SpecialistsModule";
import InputWrapper from "@/components/presets/FormElements/InputWrapper.vue";
import { useStore } from "vuex";
import AlertBadge from "@/components/presets/GeneralElements/AlertBadge.vue";
import { FormRulesMap } from "element-plus/es/components/form/src/form.type";
import { IRooms } from "@/store/modules/ClinicsModule";
import {
  IAptInfoData,
  IAptInfoTypeData,
} from "@/assets/ts/components/_CreateAppointmentComponent";
export default {
  components: {
    InputWrapper,
    AlertBadge,
  },

  props: {
    specialist: {
      required: true,
      type: Object as PropType<ISpecialist>,
    },

    allRooms: {
      required: true,
      type: Object as PropType<IRooms>,
    },
    // fix this
    aptInfoDataE: {
      required: true,
      type: Object as PropType<IAptInfoData>,
    },
    modalId: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["save", "process", "changeAptType"],

  setup(props, { emit }) {
    const store = useStore();
    const rules = ref<FormRulesMap>({
      appointment_type_id: [
        {
          required: true,
          message: "Please select an appointment type.",
          trigger: "blur",
        },
      ],
    });
    const aptInfoData = ref<IAptInfoTypeData>({
      send_forms: false,
      appointment_type_id: "",
      room_id: "",
      note: "",
      isNewPatient: true,
    });
    const overlappingCnt = ref(0);
    const formRef = ref();
    const aptTypeListWithRestriction = ref();
    const appointmentType = ref<string>("");

    const aptTypeList = computed(() => store.getters.getAptTypesList);
    const bookingData = computed(() => store.getters.bookingDatas);

    watchEffect(() => {
      let specialistRestriction = bookingData.value.restriction;
      if (specialistRestriction === "NONE" || props.modalId === "edit") {
        aptTypeListWithRestriction.value = aptTypeList.value;
      } else {
        aptTypeListWithRestriction.value = aptTypeList.value.filter(
          (item) => item.type === specialistRestriction
        );
      }

      if (props.aptInfoDataE) {
        for (let key in props.aptInfoDataE)
          aptInfoData.value[key] = props.aptInfoDataE[key];
      }
    });

    const handleSubmit = async () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid) => {
        if (valid) {
          emit("process", aptInfoData.value);
        }
      });
    };

    const handleSave = () => {
      emit("save", aptInfoData.value);
    };

    const updateTypeId = () => {
      emit("changeAptType", aptInfoData.value.appointment_type_id);
    };

    return {
      aptInfoData,
      rules,
      formRef,
      handleSubmit,
      overlappingCnt,
      aptTypeListWithRestriction,
      appointmentType,
      handleSave,
      updateTypeId,
    };
  },
};
</script>
