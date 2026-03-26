"use client";

import { FormEvent } from "react";
import {
  DEMO_FIELD_OPTIONS,
  DemoTriageFormErrors,
  DemoTriageFormValues
} from "@/lib/demo-triage";
import styles from "./TriageForm.module.css";

type TriageFormProps = {
  values: DemoTriageFormValues;
  errors?: DemoTriageFormErrors;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onFieldChange: (field: keyof DemoTriageFormValues, value: string) => void;
  submitLabel?: string;
  isSubmitting?: boolean;
  feedbackMessage?: string;
  feedbackType?: "success" | "error";
};

function getFieldDescriptionId(
  field: keyof DemoTriageFormValues,
  hasError: boolean
) {
  return hasError ? `${field}-error` : `${field}-hint`;
}

export default function TriageForm({
  values,
  errors = {},
  onSubmit,
  onFieldChange,
  submitLabel = "Generate Triage Result",
  isSubmitting = false,
  feedbackMessage,
  feedbackType = "error"
}: TriageFormProps) {
  return (
    <form className={styles.form} noValidate onSubmit={onSubmit}>
      <div className={styles.formIntro}>
        <div>
          <p className={styles.sectionEyebrow}>Clinical Intake Record</p>
          <h2 className={styles.sectionHeading}>Patient admission details</h2>
          <p className={styles.sectionText}>
            Enter the core admission and clinical details used for triage
            classification and queue placement.
          </p>
        </div>
        <div className={styles.introBadge}>Assessment Form</div>
      </div>

      {feedbackMessage ? (
        <p
          className={
            feedbackType === "success"
              ? `${styles.feedbackBanner} ${styles.feedbackSuccess}`
              : `${styles.feedbackBanner} ${styles.feedbackError}`
          }
          role="status"
        >
          {feedbackMessage}
        </p>
      ) : null}

      <section className={styles.formSection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Admission Details</h3>
          <p className={styles.sectionHint}>
            Record the admission attributes relevant to the triage review.
          </p>
        </div>

        <div className={styles.grid}>
          <label className={styles.field}>
            <div className={styles.labelRow}>
              <span>Admission Type</span>
              <small className={styles.fieldMeta}>Required</small>
            </div>
            <select
              className={errors.admission_type ? styles.inputError : styles.input}
              name="admission_type"
              aria-invalid={Boolean(errors.admission_type)}
              aria-describedby={getFieldDescriptionId(
                "admission_type",
                Boolean(errors.admission_type)
              )}
              value={values.admission_type}
              onChange={(event) =>
                onFieldChange("admission_type", event.target.value)
              }
            >
              <option value="">Select admission type</option>
              {DEMO_FIELD_OPTIONS.admissionTypes.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.admission_type ? (
              <small id="admission_type-error" className={styles.errorText}>
                {errors.admission_type}
              </small>
            ) : (
              <small id="admission_type-hint" className={styles.hintText}>
                Emergency admissions are prioritized for urgent review.
              </small>
            )}
          </label>

          <label className={styles.field}>
            <div className={styles.labelRow}>
              <span>Event Type</span>
              <small className={styles.fieldMeta}>Required</small>
            </div>
            <select
              className={errors.eventtype ? styles.inputError : styles.input}
              name="eventtype"
              aria-invalid={Boolean(errors.eventtype)}
              aria-describedby={getFieldDescriptionId(
                "eventtype",
                Boolean(errors.eventtype)
              )}
              value={values.eventtype}
              onChange={(event) => onFieldChange("eventtype", event.target.value)}
            >
              <option value="">Select event type</option>
              {DEMO_FIELD_OPTIONS.eventTypes.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.eventtype ? (
              <small id="eventtype-error" className={styles.errorText}>
                {errors.eventtype}
              </small>
            ) : (
              <small id="eventtype-hint" className={styles.hintText}>
                Emergency department events indicate urgent clinical assessment.
              </small>
            )}
          </label>

          <label className={styles.field}>
            <div className={styles.labelRow}>
              <span>Care Unit</span>
              <small className={styles.fieldMeta}>Required</small>
            </div>
            <select
              className={errors.careunit ? styles.inputError : styles.input}
              name="careunit"
              aria-invalid={Boolean(errors.careunit)}
              aria-describedby={getFieldDescriptionId(
                "careunit",
                Boolean(errors.careunit)
              )}
              value={values.careunit}
              onChange={(event) => onFieldChange("careunit", event.target.value)}
            >
              <option value="">Select care unit</option>
              {DEMO_FIELD_OPTIONS.careUnits.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.careunit ? (
              <small id="careunit-error" className={styles.errorText}>
                {errors.careunit}
              </small>
            ) : (
              <small id="careunit-hint" className={styles.hintText}>
                Critical care units indicate the highest level of clinical urgency.
              </small>
            )}
          </label>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Severity Markers</h3>
          <p className={styles.sectionHint}>
            Severity and mortality scores support the overall triage classification.
          </p>
        </div>

        <div className={styles.grid}>
          <label className={styles.field}>
            <div className={styles.labelRow}>
              <span>DRG Severity</span>
              <small className={styles.fieldMeta}>Required</small>
            </div>
            <select
              className={errors.drg_severity ? styles.inputError : styles.input}
              name="drg_severity"
              aria-invalid={Boolean(errors.drg_severity)}
              aria-describedby={getFieldDescriptionId(
                "drg_severity",
                Boolean(errors.drg_severity)
              )}
              value={values.drg_severity}
              onChange={(event) =>
                onFieldChange("drg_severity", event.target.value)
              }
            >
              <option value="">Select severity score</option>
              {DEMO_FIELD_OPTIONS.drgScores.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.drg_severity ? (
              <small id="drg_severity-error" className={styles.errorText}>
                {errors.drg_severity}
              </small>
            ) : (
              <small id="drg_severity-hint" className={styles.hintText}>
                Higher severity scores indicate increased clinical risk.
              </small>
            )}
          </label>

          <label className={styles.field}>
            <div className={styles.labelRow}>
              <span>DRG Mortality</span>
              <small className={styles.fieldMeta}>Required</small>
            </div>
            <select
              className={errors.drg_mortality ? styles.inputError : styles.input}
              name="drg_mortality"
              aria-invalid={Boolean(errors.drg_mortality)}
              aria-describedby={getFieldDescriptionId(
                "drg_mortality",
                Boolean(errors.drg_mortality)
              )}
              value={values.drg_mortality}
              onChange={(event) =>
                onFieldChange("drg_mortality", event.target.value)
              }
            >
              <option value="">Select mortality score</option>
              {DEMO_FIELD_OPTIONS.drgScores.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.drg_mortality ? (
              <small id="drg_mortality-error" className={styles.errorText}>
                {errors.drg_mortality}
              </small>
            ) : (
              <small id="drg_mortality-hint" className={styles.hintText}>
                The highest mortality score reflects the greatest clinical concern.
              </small>
            )}
          </label>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Clinical Summary</h3>
          <p className={styles.sectionHint}>
            Provide a concise clinical summary to support the triage assessment.
          </p>
        </div>

        <label className={styles.field}>
          <div className={styles.labelRow}>
              <span>Clinical Summary</span>
              <small className={styles.fieldMeta}>Required</small>
            </div>
          <textarea
            className={errors.description ? styles.inputError : styles.input}
            name="description"
            rows={4}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={getFieldDescriptionId(
              "description",
              Boolean(errors.description)
            )}
            placeholder="Example: Severe sepsis with altered consciousness requiring urgent review"
            value={values.description}
            onChange={(event) => onFieldChange("description", event.target.value)}
          />
          {errors.description ? (
            <small id="description-error" className={styles.errorText}>
              {errors.description}
            </small>
            ) : (
              <small id="description-hint" className={styles.hintText}>
                Summarize the presenting condition clearly for result review and
                queue display.
              </small>
            )}
        </label>
      </section>

      <div className={styles.buttonRow}>
        <button className={styles.primaryAction} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Generating Triage Result..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
