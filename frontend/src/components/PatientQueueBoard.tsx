"use client";

import { startTransition, useDeferredValue, useMemo, useState } from "react";
import styles from "./PatientQueueBoard.module.css";
import { useTriageDemo } from "@/context/TriageDemoContext";
import { DemoPriority } from "@/lib/demo-triage";
import QueueTable from "./QueueTable";
import ScreenBackLink from "./ScreenBackLink";

const PRIORITY_ORDER: Record<DemoPriority, number> = {
  Critical: 1,
  "High Risk": 2,
  Moderate: 3,
  "Low Priority": 4
};

export default function PatientQueueBoard() {
  const { queue } = useTriageDemo();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<"All" | DemoPriority>(
    "All"
  );
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    })
  );
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const visibleRows = useMemo(() => {
    const normalizedQuery = deferredSearchTerm.trim().toLowerCase();

    return [...queue]
      .filter((patient) => {
        if (selectedPriority === "All") return true;
        return patient.priority === selectedPriority;
      })
      .filter((patient) => {
        if (!normalizedQuery) return true;
        return (
          patient.tokenId.toLowerCase().includes(normalizedQuery) ||
          patient.description.toLowerCase().includes(normalizedQuery) ||
          patient.careunit.toLowerCase().includes(normalizedQuery)
        );
      })
      .sort((first, second) => {
        return PRIORITY_ORDER[first.priority] - PRIORITY_ORDER[second.priority];
      });
  }, [deferredSearchTerm, queue, selectedPriority]);

  function handleRefresh() {
    setRefreshing(true);

    setTimeout(() => {
      startTransition(() => {
        setLastUpdated(
          new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit"
          })
        );
        setRefreshing(false);
      });
    }, 650);
  }

  return (
    <main className={styles.pageWrap}>
      <section className={styles.boardCard}>
        <ScreenBackLink href="/dashboard-summary" label="Back to Dashboard" />
        <header className={styles.headerRow}>
          <div>
            <p className={styles.kicker}>Clinical Triage Support System</p>
            <h1 className={styles.heading}>Patient Priority Queue</h1>
            <p className={styles.subheading}>
              View active patient cases in priority order for timely clinical
              review and queue monitoring.
            </p>
          </div>
          <button
            className={styles.refreshButton}
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? "Refreshing Queue..." : "Refresh Queue"}
          </button>
        </header>

        <div className={styles.controls}>
          <label className={styles.searchField}>
            <span>Search Records</span>
            <input
              type="text"
              placeholder="Search by token, clinical summary, or care unit"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>

          <label className={styles.filterField}>
            <span>Priority Level</span>
            <select
              value={selectedPriority}
              onChange={(event) =>
                setSelectedPriority(event.target.value as "All" | DemoPriority)
              }
            >
              <option value="All">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High Risk">High Risk</option>
              <option value="Moderate">Moderate</option>
              <option value="Low Priority">Low Priority</option>
            </select>
          </label>
        </div>

        <div className={styles.metaRow}>
          <p className={styles.metaText}>Last updated: {lastUpdated}</p>
          <p className={styles.resultText}>
            Showing {visibleRows.length} patient{visibleRows.length === 1 ? "" : "s"}
          </p>
        </div>

        <QueueTable
          rows={visibleRows}
          emptyMessage="No patient records match the current search or priority filter."
        />
      </section>
    </main>
  );
}
