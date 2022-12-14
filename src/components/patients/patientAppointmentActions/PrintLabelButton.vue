<template>
  <LargeIconButton text="Print Label" @click="handlePrint()" />
</template>

<script lang="ts">
import IPatient from "@/store/interfaces/IPatient";
import { PropType } from "vue";
import { printPatientLabel } from "@/helpers/helpers";
import IAppointment from "@/store/interfaces/IAppointment";
import { StorageKey } from "@/core/enum/storage-key";
import { setLocalStorage } from "@/utils/LocalStorage.Util";

export default {
  props: {
    appointment: {
      required: true,
      type: Object as PropType<IAppointment>,
    },
    patient: {
      required: true,
      type: Object as PropType<IPatient>,
    },
    printCount: {
      required: true,
      type: Number,
    },
  },
  setup(props) {
    const handlePrint = () => {
      setLocalStorage(StorageKey.PrintLabelCount, props.printCount);
      for (var i = 0; i < props.printCount; i++) {
        handlePrintLabel();
      }
    };
    const handlePrintLabel = () => {
      printPatientLabel(props.patient, props.appointment, "ZDesigner GK420d");
    };

    return { handlePrint };
  },
};
</script>
