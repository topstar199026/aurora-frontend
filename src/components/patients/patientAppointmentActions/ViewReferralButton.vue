<template>
  <LargeIconButton text="View Referral" @click="handleReferral()" />
</template>

<script lang="ts">
import { Modal } from "bootstrap";

export default {
  props: {
    appointment: {
      required: true,
      type: Object,
    },
  },
  setup() {
    const handleReferral = () => {
      setTimeout(() => {
        const modal = new Modal(
          document.getElementById("modal_appointment_referral")
        );
        modal.show();
      }, 100);
    };

    return { handleReferral };
  },
};
</script>
