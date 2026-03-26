import Link from "next/link";
import styles from "./ScreenBackLink.module.css";

type ScreenBackLinkProps = {
  href: string;
  label: string;
};

export default function ScreenBackLink({
  href,
  label
}: ScreenBackLinkProps) {
  return (
    <Link className={styles.backLink} href={href}>
      <span className={styles.arrow} aria-hidden="true">
        ←
      </span>
      <span>{label}</span>
    </Link>
  );
}
