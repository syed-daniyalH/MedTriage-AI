import Link from "next/link";
import styles from "./DashboardSummary.module.css";
import { useTriageDemo } from "@/context/TriageDemoContext";
import SummaryStatCard from "./SummaryStatCard";
import ScreenBackLink from "./ScreenBackLink";
import PatientRecordsPreview from "./PatientRecordsPreview";

export default function DashboardSummary() {
  const { queue, patientRecords } = useTriageDemo();
  const summaryMetrics = [
    {
      label: "Total Patients",
      value: patientRecords.length,
      helper: "Patient records saved in the current browser session",
      tone: "neutral" as const
    },
    {
      label: "Critical Cases",
      value: queue.filter((item) => item.priority === "Critical").length,
      helper: "Cases requiring immediate clinical review",
      tone: "critical" as const
    },
    {
      label: "Moderate Cases",
      value: queue.filter((item) => item.priority === "Moderate").length,
      helper: "Cases requiring monitored clinical attention",
      tone: "moderate" as const
    },
    {
      label: "Low Priority Cases",
      value: queue.filter((item) => item.priority === "Low Priority").length,
      helper: "Stable cases suitable for routine queue review",
      tone: "low" as const
    }
  ];

  return (
    <main className={styles.pageWrap}>
      <section className={styles.dashboardCard}>
        <ScreenBackLink href="/" label="Back to Home" />
        <header className={styles.header}>
          <p className={styles.kicker}>Clinical Triage Support System</p>
          <h1 className={styles.heading}>System Dashboard</h1>
          <p className={styles.subheading}>
            Overview of current triage activity with direct access to the core
            clinical workflow screens.
          </p>
          <p className={styles.metaText}>
            Queue activity reflects the current assessment session.
          </p>
        </header>

        <div className={styles.cardGrid}>
          {summaryMetrics.map((metric) => (
            <SummaryStatCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              helper={metric.helper}
              tone={metric.tone}
            />
          ))}
        </div>

        <div className={styles.quickLinksHeader}>
          <h2 className={styles.quickLinksTitle}>Workflow Navigation</h2>
          <p className={styles.quickLinksText}>
            Open the main assessment, queue monitoring, and result review views.
          </p>
        </div>

        <div className={styles.quickLinks}>
          <Link className={styles.navButton} href="/new-triage-assessment">
            Start Assessment
          </Link>
          <Link className={styles.navButton} href="/patient-queue-board">
            Open Priority Queue
          </Link>
          <Link className={styles.navButton} href="/triage-result-screen">
            View Latest Result
          </Link>
        </div>

        <PatientRecordsPreview records={patientRecords} />
      </section>
    </main>
  );
}
