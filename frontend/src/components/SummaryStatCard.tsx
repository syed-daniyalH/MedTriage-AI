import styles from "./SummaryStatCard.module.css";

export type SummaryStatTone = "neutral" | "critical" | "moderate" | "low";

type SummaryStatCardProps = {
  label: string;
  value: number;
  helper: string;
  tone?: SummaryStatTone;
};

function getToneClass(tone: SummaryStatTone) {
  if (tone === "critical") return styles.criticalCard;
  if (tone === "moderate") return styles.moderateCard;
  if (tone === "low") return styles.lowCard;
  return styles.neutralCard;
}

export default function SummaryStatCard({
  label,
  value,
  helper,
  tone = "neutral"
}: SummaryStatCardProps) {
  return (
    <article className={`${styles.metricCard} ${getToneClass(tone)}`}>
      <p className={styles.metricLabel}>{label}</p>
      <p className={styles.metricValue}>{value}</p>
      <p className={styles.metricHelper}>{helper}</p>
    </article>
  );
}
