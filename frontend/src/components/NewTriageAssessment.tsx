"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./NewTriageAssessment.module.css";
import { useTriageDemo } from "@/context/TriageDemoContext";
import {
  DemoTriageFormErrors,
  DemoTriageFormValues,
  INITIAL_DEMO_FORM,
  validateDemoTriageForm
} from "@/lib/demo-triage";
import TriageForm from "./TriageForm";
import ScreenBackLink from "./ScreenBackLink";

export default function NewTriageAssessment() {
  const router = useRouter();
  const { submitAssessment } = useTriageDemo();
  const [formData, setFormData] = useState<DemoTriageFormValues>(INITIAL_DEMO_FORM);
  const [errors, setErrors] = useState<DemoTriageFormErrors>({});
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [serverMessage, setServerMessage] = useState<string>("");

  function handleFieldChange(field: keyof DemoTriageFormValues, value: string) {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateDemoTriageForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitState("error");
      setServerMessage("Please complete all required clinical classification fields.");
      return;
    }

    setSubmitState("submitting");
    submitAssessment(formData);
    setSubmitState("success");
    setServerMessage("Triage assessment completed successfully.");
    setFormData(INITIAL_DEMO_FORM);
    setErrors({});
    router.push("/triage-result-screen");
  }

  return (
    <main className={styles.pageWrap}>
      <section className={styles.card}>
        <ScreenBackLink href="/dashboard-summary" label="Back to Dashboard" />
        <header className={styles.header}>
          <p className={styles.kicker}>Clinical Triage Support System</p>
          <h1 className={styles.heading}>Patient Triage Assessment</h1>
          <p className={styles.subheading}>
            Record the patient admission profile and clinical summary to generate
            an initial triage priority.
          </p>
        </header>

        <div className={styles.infoGrid}>
          <article className={styles.infoCard}>
            <p className={styles.infoLabel}>Priority Structure</p>
            <p className={styles.infoTitle}>Priority levels follow a clear review order</p>
            <p className={styles.infoText}>
              Critical, then High Risk, then Moderate, then Low Priority.
            </p>
          </article>
          <article className={styles.infoCard}>
            <p className={styles.infoLabel}>Workflow Continuity</p>
            <p className={styles.infoTitle}>
              Each submission updates the result and queue views
            </p>
            <p className={styles.infoText}>
              Submitted assessments are reflected in the prediction result and
              patient priority queue screens.
            </p>
          </article>
        </div>

        <TriageForm
          values={formData}
          errors={errors}
          onSubmit={handleSubmit}
          onFieldChange={handleFieldChange}
          isSubmitting={submitState === "submitting"}
          feedbackMessage={serverMessage}
          feedbackType={submitState === "success" ? "success" : "error"}
        />
      </section>
    </main>
  );
}
