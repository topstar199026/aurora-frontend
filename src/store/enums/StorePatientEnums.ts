const PatientActions = {
  LIST: "listPatients",
  CREATE: "createPatients",
  DELETE: "deletePatients",
  UPDATE: "updatePatients",
  VIEW: "viewPatient",
  APPOINTMENTS: "patientsAppointments",
  DOCUMENTS: {
    LIST: "listPatientsDocuments",
    CREATE: "createPatientsDocument",
    SEND_VIA_EMAIL: "sendPatientsDocumentViaEmail",
    VIEW: "viewPatientDocument",
    AUDIO: {
      CREATE: "createPatientsDocumentAudio",
    },
  },
  RECALL: {
    LIST: "listPatientsRecall",
    CREATE: "createPatientsRecall",
    UPDATE: "updatePatientsRecall",
  },
  ALERT: {
    CREATE: "createPatientAlert",
    DELETE: "deletePatientAlert",
  },
  BILLING: {
    VALIDATE_MEDICARE: "validatePatientsBillingMedicare",
    UPDATE: "updatePatientsBilling",
  },
};

const PatientMutations = {
  SET_PATIENT: {
    LIST: "setPatientsList",
    SELECT: "setSelectPatient",
    APPOINTMENTS: "setPatientAppointments",
    DOCUMENTS: {
      LIST: "setPatientDocumentList",
    },
  },

  SET_PATIENT_RECALL: {
    LIST: "setPatientsRecallList",
    SELECT: "setSelectPatientRecall",
  },

  SET_VALIDATION: {
    MEDICARE: "setValidationMedicare",
  },
};

export { PatientActions, PatientMutations };
