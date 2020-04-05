export enum Status {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  DONE = "DONE",
}

export enum Arrhythmias {
  AFib = "AFib",
  AVBlock = "AV Block",
  Pause = "Pause",
  PSVC = "PSVC",
  PVC = "PVC",
}

export interface Card {
  id: number;
  created_date: string;
  patient_name: string;
  status: Status;
  arrhythmias: Arrhythmias[];
}
