"use client";

import styles from "./ResultCard.module.css";

type ResultCardProps = {
  priority: string;
  explanation: string;
  onConfirm?: () => void;
  onBack?: () => void;
  confirmLabel?: string;
  backLabel?: string;
};

function normalizePriority(
  priority: string
): "Critical" | "High Risk" | "Moderate" | "Low Priority" {
  const parsed = priority.trim().toLowerCase();
  if (parsed === "critical") return "Critical";
  if (parsed === "moderate") return "Moderate";
  if (parsed === "low priority") return "Low Priority";
  return "High Risk";
}

function getPriorityClasses(
  priority: "Critical" | "High Risk" | "Moderate" | "Low Priority"
) {
  if (priority === "Critical") {
    return { cardTone: styles.cardCritical, badgeTone: styles.badgeCritical };
  }
  if (priority === "Moderate") {
    return { cardTone: styles.cardModerate, badgeTone: styles.badgeModerate };
  }
  if (priority === "Low Priority") {
    return { cardTone: styles.cardLow, badgeTone: styles.badgeLow };
  }
  return { cardTone: styles.cardHigh, badgeTone: styles.badgeHigh };
}

function getPrioritySupportText(
  priority: "Critical" | "High Risk" | "Moderate" | "Low Priority"
) {
  if (priority === "Critical") return "Immediate clinical escalation is recommended.";
  if (priority === "Moderate") return "Clinical observation and timely review are advised.";
  if (priority === "Low Priority") {
    return "Routine clinical review is appropriate.";
  }
  return "Urgent medical review is recommended.";
}

export default function ResultCard({
  priority,
  explanation,
  onConfirm,
  onBack,
  confirmLabel = "Confirm Assessment",
  backLabel = "Back"
}: ResultCardProps) {
  const normalizedPriority = normalizePriority(priority);
  const tones = getPriorityClasses(normalizedPriority);
  const supportText = getPrioritySupportText(normalizedPriority);

  return (
    <section className={`${styles.resultCard} ${tones.cardTone}`}>
      <p className={styles.label}>Predicted Triage Priority</p>
      <p className={`${styles.priorityBadge} ${tones.badgeTone}`}>{normalizedPriority}</p>
      <p className={styles.supportText}>{supportText}</p>
      <p className={styles.explanation}>{explanation}</p>

      <div className={styles.actions}>
        {onConfirm ? (
          <button className={styles.confirmButton} type="button" onClick={onConfirm}>
            {confirmLabel}
          </button>
        ) : null}
        {onBack ? (
          <button className={styles.backButton} type="button" onClick={onBack}>
            {backLabel}
          </button>
        ) : null}
      </div>
    </section>
  );
}
