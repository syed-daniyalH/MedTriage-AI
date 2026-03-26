export type DemoPriority = "Critical" | "High Risk" | "Moderate" | "Low Priority";
export type DemoStatus = "Waiting" | "In Review" | "Completed";

export type DemoTriageFormValues = {
  admission_type: string;
  eventtype: string;
  careunit: string;
  drg_severity: string;
  drg_mortality: string;
  description: string;
};

export type DemoTriageFormErrors = Partial<
  Record<keyof DemoTriageFormValues, string>
>;

export type DemoTriageCase = DemoTriageFormValues & {
  id: string;
  tokenId: string;
  priority: DemoPriority;
  explanation: string;
  timeAdded: string;
  status: DemoStatus;
};

export const INITIAL_DEMO_FORM: DemoTriageFormValues = {
  admission_type: "",
  eventtype: "",
  careunit: "",
  drg_severity: "",
  drg_mortality: "",
  description: ""
};

export const DEMO_FIELD_OPTIONS = {
  admissionTypes: ["EW EMER.", "DIRECT EMER.", "URGENT", "ELECTIVE"],
  eventTypes: ["ED", "transfer", "admit", "discharge"],
  careUnits: [
    "Emergency Department",
    "MICU",
    "SICU",
    "CCU",
    "General Ward",
    "Observation Unit"
  ],
  drgScores: ["1", "2", "3", "4"]
} as const;

const CRITICAL_DESCRIPTION_TERMS = [
  "respiratory failure",
  "ventilator support",
  "septicemia",
  "severe sepsis",
  "alteration in consciousness"
];

const MODERATE_DESCRIPTION_TERMS = ["fever", "syncope", "cardiac arrhythmia"];

export const INITIAL_QUEUE_CASES: DemoTriageCase[] = [
  {
    id: "seed-critical",
    tokenId: "ER-201",
    admission_type: "EW EMER.",
    eventtype: "ED",
    careunit: "MICU",
    drg_severity: "4",
    drg_mortality: "4",
    description: "Respiratory failure requiring ventilator support",
    priority: "Critical",
    explanation:
      "Critical because intensive care or severe clinical risk indicators were identified.",
    timeAdded: "10:08 PM",
    status: "In Review"
  },
  {
    id: "seed-high",
    tokenId: "ER-202",
    admission_type: "DIRECT EMER.",
    eventtype: "ED",
    careunit: "Emergency Department",
    drg_severity: "3",
    drg_mortality: "2",
    description: "Urgent emergency arrival with rapid reassessment required",
    priority: "High Risk",
    explanation:
      "High Risk because the admission details indicate the need for urgent emergency review.",
    timeAdded: "10:14 PM",
    status: "Waiting"
  },
  {
    id: "seed-moderate",
    tokenId: "ER-203",
    admission_type: "URGENT",
    eventtype: "admit",
    careunit: "Observation Unit",
    drg_severity: "2",
    drg_mortality: "1",
    description: "Fever with monitored observation and stable reassessment",
    priority: "Moderate",
    explanation:
      "Moderate because the clinical summary suggests a monitored condition requiring timely review.",
    timeAdded: "10:19 PM",
    status: "Waiting"
  },
  {
    id: "seed-low",
    tokenId: "ER-204",
    admission_type: "ELECTIVE",
    eventtype: "admit",
    careunit: "General Ward",
    drg_severity: "1",
    drg_mortality: "1",
    description: "Routine follow-up admission without emergency indicators",
    priority: "Low Priority",
    explanation:
      "Low Priority because no major emergency or critical-care indicators were identified.",
    timeAdded: "10:25 PM",
    status: "Completed"
  }
];

export function cloneDemoCases(cases: DemoTriageCase[]) {
  return cases.map((item) => ({ ...item }));
}

function normalizeValue(value: string) {
  return value.trim().toLowerCase();
}

function includesAnyTerm(source: string, terms: string[]) {
  const normalized = normalizeValue(source);
  return terms.some((term) => normalized.includes(term));
}

export function validateDemoTriageForm(
  values: DemoTriageFormValues
): DemoTriageFormErrors {
  const errors: DemoTriageFormErrors = {};

  if (!values.admission_type) {
    errors.admission_type = "Admission type is required.";
  }

  if (!values.eventtype) {
    errors.eventtype = "Event type is required.";
  }

  if (!values.careunit) {
    errors.careunit = "Care unit is required.";
  }

  if (!values.drg_severity) {
    errors.drg_severity = "DRG severity is required.";
  }

  if (!values.drg_mortality) {
    errors.drg_mortality = "DRG mortality is required.";
  }

  if (!values.description.trim()) {
    errors.description = "Description is required.";
  } else if (values.description.trim().length < 8) {
    errors.description = "Use a more descriptive clinical summary.";
  }

  return errors;
}

export function evaluateDemoPriority(values: DemoTriageFormValues) {
  const normalizedCareUnit = normalizeValue(values.careunit);
  const normalizedAdmissionType = normalizeValue(values.admission_type);
  const normalizedEventType = normalizeValue(values.eventtype);
  const severity = Number(values.drg_severity);
  const mortality = Number(values.drg_mortality);

  const hasCriticalCareUnit =
    normalizedCareUnit.includes("micu") ||
    normalizedCareUnit.includes("sicu") ||
    normalizedCareUnit.includes("ccu");

  const hasCriticalSeverity = severity === 4 && mortality === 4;
  const hasCriticalDescription = includesAnyTerm(
    values.description,
    CRITICAL_DESCRIPTION_TERMS
  );

  if (hasCriticalCareUnit || hasCriticalSeverity || hasCriticalDescription) {
    return {
      priority: "Critical" as DemoPriority,
      explanation:
        "Critical because intensive care or severe clinical risk indicators were identified."
    };
  }

  const hasHighRiskSignal =
    normalizedAdmissionType === "ew emer." ||
    normalizedAdmissionType === "direct emer." ||
    normalizedEventType === "ed" ||
    normalizedCareUnit === "emergency department";

  if (hasHighRiskSignal) {
    return {
      priority: "High Risk" as DemoPriority,
      explanation:
        "High Risk because the admission details indicate the need for urgent emergency review."
    };
  }

  const hasModerateDescription = includesAnyTerm(
    values.description,
    MODERATE_DESCRIPTION_TERMS
  );

  if (hasModerateDescription) {
    return {
      priority: "Moderate" as DemoPriority,
      explanation:
        "Moderate because the clinical summary suggests a monitored condition requiring timely review."
    };
  }

  return {
    priority: "Low Priority" as DemoPriority,
    explanation:
      "Low Priority because no major emergency or critical-care indicators were identified."
  };
}

export function createDemoCase(
  values: DemoTriageFormValues,
  currentCount: number
): DemoTriageCase {
  const { priority, explanation } = evaluateDemoPriority(values);
  const tokenBase = 205 + currentCount + 1;

  return {
    id: `case-${Date.now()}`,
    tokenId: `ER-${String(tokenBase).padStart(3, "0")}`,
    admission_type: values.admission_type,
    eventtype: values.eventtype,
    careunit: values.careunit,
    drg_severity: values.drg_severity,
    drg_mortality: values.drg_mortality,
    description: values.description.trim(),
    priority,
    explanation,
    timeAdded: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    }),
    status: "Waiting"
  };
}
