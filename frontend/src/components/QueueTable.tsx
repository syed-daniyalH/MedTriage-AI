import {
  DemoPriority,
  DemoStatus,
  DemoTriageCase
} from "@/lib/demo-triage";
import styles from "./QueueTable.module.css";

export type QueuePriority = DemoPriority;
export type QueueStatus = DemoStatus;
export type QueueTableRow = DemoTriageCase;

type QueueTableProps = {
  rows: QueueTableRow[];
  emptyMessage?: string;
};

function getPriorityClass(priority: QueuePriority): string {
  if (priority === "Critical") return styles.priorityCritical;
  if (priority === "Moderate") return styles.priorityModerate;
  if (priority === "Low Priority") return styles.priorityLow;
  return styles.priorityHigh;
}

function getStatusClass(status: QueueStatus): string {
  if (status === "In Review") return styles.statusReview;
  if (status === "Completed") return styles.statusCompleted;
  return styles.statusWaiting;
}

export default function QueueTable({
  rows,
  emptyMessage = "No patient records are currently available in the priority queue."
}: QueueTableProps) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.queueTable}>
        <thead>
          <tr>
            <th>Token / ID</th>
            <th>Clinical Summary</th>
            <th>Priority</th>
            <th>Time Added</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((patient) => (
            <tr key={patient.id}>
              <td data-label="Token / ID">
                <span className={styles.tokenText}>{patient.tokenId}</span>
              </td>
              <td data-label="Clinical Summary">{patient.description}</td>
              <td data-label="Priority">
                <span className={getPriorityClass(patient.priority)}>
                  {patient.priority}
                </span>
              </td>
              <td data-label="Time Added">{patient.timeAdded}</td>
              <td data-label="Status">
                <span className={getStatusClass(patient.status)}>{patient.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 ? <p className={styles.emptyText}>{emptyMessage}</p> : null}
    </div>
  );
}
