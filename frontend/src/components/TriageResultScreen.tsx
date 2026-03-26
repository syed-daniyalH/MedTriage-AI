"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./TriageResultScreen.module.css";
import { useTriageDemo } from "@/context/TriageDemoContext";
import ResultCard from "./ResultCard";
import ScreenBackLink from "./ScreenBackLink";

export default function TriageResultScreen() {
  const router = useRouter();
  const { latestCase, confirmLatestCase } = useTriageDemo();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const resultTime = useMemo(
    () =>
      new Date().toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        month: "short",
        day: "2-digit",
        year: "numeric"
      }),
    []
  );

  const priorityLabel = latestCase?.priority ?? "High Risk";
  const explanation =
    latestCase?.explanation ??
    "High Risk because the admission details indicate the need for urgent emergency review.";

  return (
    <main className={styles.pageWrap}>
      <section className={styles.screenCard}>
        <ScreenBackLink href="/dashboard-summary" label="Back to Dashboard" />
        <p className={styles.kicker}>Clinical Triage Support System</p>
        <h1 className={styles.heading}>Triage Prediction Result</h1>
        <p className={styles.metaText}>Assessment generated: {resultTime}</p>

        {latestCase ? (
          <div className={styles.caseSummary}>
            <p className={styles.caseMeta}>
              {latestCase.tokenId} / {latestCase.admission_type} / {latestCase.eventtype} /{" "}
              {latestCase.careunit}
            </p>
            <p className={styles.caseDescription}>{latestCase.description}</p>
          </div>
        ) : (
          <div className={styles.caseSummary}>
            <p className={styles.caseMeta}>No recent assessment is available.</p>
            <p className={styles.caseDescription}>
              Complete a patient triage assessment to view the predicted priority.
            </p>
          </div>
        )}

        <ResultCard
          priority={priorityLabel}
          explanation={explanation}
          onConfirm={() => {
            confirmLatestCase();
            setIsConfirmed(true);
          }}
          onBack={() => router.push("/new-triage-assessment")}
          backLabel="Return to Assessment"
        />

        {isConfirmed ? (
          <p className={styles.successText}>
            Assessment confirmed and marked for queue review.
          </p>
        ) : null}

        <Link className={styles.queueLink} href="/patient-queue-board">
          Open Patient Priority Queue
        </Link>
      </section>
    </main>
  );
}
