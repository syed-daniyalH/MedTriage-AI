import { DemoTriageCase } from "@/lib/demo-triage";
import styles from "./PatientRecordsPreview.module.css";

type PatientRecordsPreviewProps = {
  records: DemoTriageCase[];
};

function getPriorityClass(priority: DemoTriageCase["priority"]) {
  if (priority === "Critical") return styles.priorityCritical;
  if (priority === "Moderate") return styles.priorityModerate;
  if (priority === "Low Priority") return styles.priorityLow;
  return styles.priorityHigh;
}

function getStatusClass(status: DemoTriageCase["status"]) {
  if (status === "In Review") return styles.statusReview;
  if (status === "Completed") return styles.statusCompleted;
  return styles.statusWaiting;
}

export default function PatientRecordsPreview({
  records
}: PatientRecordsPreviewProps) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Stored Patient Records</h2>
          <p className={styles.text}>
            Patient entries are saved locally in this browser so recent
            assessments remain available during your presentation.
          </p>
        </div>
        <div className={styles.recordCount}>
          <span className={styles.recordValue}>{records.length}</span>
          <span className={styles.recordLabel}>Saved Records</span>
        </div>
      </div>

      {records.length > 0 ? (
        <div className={styles.grid}>
          {records.slice(0, 6).map((record) => (
            <article className={styles.card} key={record.id}>
              <div className={styles.cardHeader}>
                <div>
                  <p className={styles.token}>{record.tokenId}</p>
                  <p className={styles.meta}>
                    {record.admission_type} · {record.careunit}
                  </p>
                </div>
                <span className={getPriorityClass(record.priority)}>
                  {record.priority}
                </span>
              </div>

              <p className={styles.description}>{record.description}</p>

              <div className={styles.footer}>
                <span className={getStatusClass(record.status)}>{record.status}</span>
                <span className={styles.time}>{record.timeAdded}</span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          No patient records have been saved yet. Complete a triage assessment to
          create the first entry.
        </div>
      )}
    </section>
  );
}
