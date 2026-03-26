import Link from "next/link";
import styles from "./HomeHub.module.css";

const NAV_ITEMS = [
  {
    href: "/dashboard-summary",
    title: "System Dashboard",
    description: "Review patient volumes, triage levels, and key workflow areas."
  },
  {
    href: "/new-triage-assessment",
    title: "Patient Triage Assessment",
    description: "Record patient admission details and generate a triage category."
  },
  {
    href: "/triage-result-screen",
    title: "Triage Prediction Result",
    description: "Review the assigned priority level and supporting clinical rationale."
  },
  {
    href: "/patient-queue-board",
    title: "Patient Priority Queue",
    description: "Monitor queued cases by priority level, arrival time, and review status."
  }
] as const;

export default function HomeHub() {
  return (
    <main className={styles.pageWrap}>
      <section className={styles.heroCard}>
        <div className={styles.heroContent}>
          <p className={styles.kicker}>Clinical Triage Support System</p>
          <h1 className={styles.heading}>MedTriage AI</h1>
          <p className={styles.subheading}>
            A smart clinical support interface for patient assessment, triage
            prediction, and queue-based case monitoring.
          </p>
        </div>

        <div className={styles.navGrid}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} className={styles.navCard} href={item.href}>
              <span className={styles.navTitle}>{item.title}</span>
              <span className={styles.navDescription}>{item.description}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
