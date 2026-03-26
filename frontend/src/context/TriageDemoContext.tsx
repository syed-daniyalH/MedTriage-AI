"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  cloneDemoCases,
  createDemoCase,
  DemoTriageCase,
  DemoTriageFormValues,
  INITIAL_QUEUE_CASES
} from "@/lib/demo-triage";

type TriageDemoContextValue = {
  latestCase: DemoTriageCase | null;
  queue: DemoTriageCase[];
  patientRecords: DemoTriageCase[];
  submitAssessment: (values: DemoTriageFormValues) => DemoTriageCase;
  confirmLatestCase: () => void;
};

const STORAGE_KEYS = {
  latestCase: "medtriage-demo-latest-case",
  queue: "medtriage-demo-queue",
  patientRecords: "medtriage-patient-records"
} as const;

const TriageDemoContext = createContext<TriageDemoContextValue | undefined>(
  undefined
);

export function TriageDemoProvider({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const [latestCase, setLatestCase] = useState<DemoTriageCase | null>(null);
  const [queue, setQueue] = useState<DemoTriageCase[]>(
    cloneDemoCases(INITIAL_QUEUE_CASES)
  );
  const [patientRecords, setPatientRecords] = useState<DemoTriageCase[]>(
    cloneDemoCases(INITIAL_QUEUE_CASES)
  );
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedLatestCase = window.localStorage.getItem(STORAGE_KEYS.latestCase);
      const savedQueue = window.localStorage.getItem(STORAGE_KEYS.queue);
      const savedPatientRecords = window.localStorage.getItem(
        STORAGE_KEYS.patientRecords
      );

      if (savedLatestCase) {
        setLatestCase(JSON.parse(savedLatestCase) as DemoTriageCase);
      }

      if (savedQueue) {
        setQueue(JSON.parse(savedQueue) as DemoTriageCase[]);
      }

      if (savedPatientRecords) {
        setPatientRecords(JSON.parse(savedPatientRecords) as DemoTriageCase[]);
      }
    } catch {
      setLatestCase(null);
      setQueue(cloneDemoCases(INITIAL_QUEUE_CASES));
      setPatientRecords(cloneDemoCases(INITIAL_QUEUE_CASES));
    } finally {
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;
    window.localStorage.setItem(
      STORAGE_KEYS.latestCase,
      JSON.stringify(latestCase)
    );
    window.localStorage.setItem(STORAGE_KEYS.queue, JSON.stringify(queue));
    window.localStorage.setItem(
      STORAGE_KEYS.patientRecords,
      JSON.stringify(patientRecords)
    );
  }, [hasLoaded, latestCase, patientRecords, queue]);

  const value = useMemo<TriageDemoContextValue>(
    () => ({
      latestCase,
      queue,
      patientRecords,
      submitAssessment(values) {
        const nextCase = createDemoCase(values, queue.length);
        setLatestCase(nextCase);
        setQueue((current) => [nextCase, ...current]);
        setPatientRecords((current) => [nextCase, ...current]);
        return nextCase;
      },
      confirmLatestCase() {
        if (!latestCase) return;
        setLatestCase((current) =>
          current ? { ...current, status: "In Review" } : current
        );
        setQueue((current) =>
          current.map((item) =>
            item.id === latestCase.id ? { ...item, status: "In Review" } : item
          )
        );
        setPatientRecords((current) =>
          current.map((item) =>
            item.id === latestCase.id ? { ...item, status: "In Review" } : item
          )
        );
      }
    }),
    [latestCase, patientRecords, queue]
  );

  return (
    <TriageDemoContext.Provider value={value}>
      {children}
    </TriageDemoContext.Provider>
  );
}

export function useTriageDemo() {
  const context = useContext(TriageDemoContext);

  if (!context) {
    throw new Error("useTriageDemo must be used within TriageDemoProvider.");
  }

  return context;
}
