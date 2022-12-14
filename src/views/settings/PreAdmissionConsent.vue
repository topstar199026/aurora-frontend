<template>
  <el-form
    @submit.prevent="submit()"
    :model="formData"
    :rules="rules"
    ref="formRef"
  >
    <el-form-item prop="body">
      <ckeditor
        v-if="editorConfig"
        :editor="editor"
        id="editor"
        v-model="formData.text"
        :config="editorConfig"
        @input="formatAutoTexts"
      />
    </el-form-item>

    <div class="d-flex flex-row-reverse">
      <router-link
        type="reset"
        to="/settings"
        id="kt_modal_mail_compose_cancel"
        class="btn btn-light me-3"
      >
        Cancel
      </router-link>

      <button class="btn btn-lg btn-primary me-3" type="submit">
        <span class="indicator-label"> Save </span>
      </button>
    </div>
  </el-form>
</template>
<script>
import {
  defineComponent,
  onMounted,
  ref,
  watch,
  watchEffect,
  reactive,
} from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import $ from "jquery";
export default defineComponent({
  name: "pre-admission-consent",
  setup() {
    const editor = ref(Editor);
    const editorConfig = ref();
    const router = useRouter();
    const formRef = ref(null);
    const formData = ref({
      text: "",
    });

    const getAutoCompleteItems = (queryText) => {
      let testItems = [
        { id: "@The mention feature expects that the mention attribute value" },
        {
          id: "@in the model is a plain object with a set of additional attributes",
        },
        {
          id: "@In order to create a proper object use the toMentionAttribute() helper method",
        },
        { id: "@Add any other properties that you need" },
      ];

      return testItems.filter(isItemMatching);

      function isItemMatching(item) {
        return item.id.toLowerCase().includes(queryText.toLowerCase());
      }
    };

    const rules = ref({
      text: [
        {
          required: true,
          message: "Please Type Text",
          trigger: "change",
        },
      ],
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Pre-Admission Consent", ["Settings"]);
      editorConfig.value = {
        mention: {
          feeds: [
            {
              marker: "@",
              feed: getAutoCompleteItems,
              minimumCharacters: 2,
            },
          ],
        },
      };

      console.log(editor.value.conversion);
    });

    const submit = () => {
      if (!formRef.value) {
        return;
      }
      console.log(formData.value.text);
      /*
      formRef.value.validate((valid) => {
        if (valid) {
          ApiService.post("update-pre-admission-consent", formData.value)
            .then(() => {
              Swal.fire({
                text: " Pre Admission Consent Updated!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                router.push({ name: "org-admin-settings" });
              });
            })
            .catch(({ response }) => {
              console.log(response.data.error);
            });
        }
      });*/
    };

    const formatAutoTexts = () => {
      if (formData.value.text.includes('class="mention"')) {
        formData.value.text = formData.value.text
          .replace(' class="mention"', "")
          .replace("@", "");

        console.log(formData.value.text);
      }
    };

    return {
      rules,
      formData,
      submit,
      editor,
      editorConfig,
      formRef,
      formatAutoTexts,
    };
  },
});
</script>
