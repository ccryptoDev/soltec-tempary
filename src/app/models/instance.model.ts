export interface InstanceFile {
  id: string;
  fileName: string;
  fileSizeMb: number;
  fileCategory: string;
  createdAt: string;
}

export interface Coordinate {
  tracker_id: string;
  x_north: number;
  y_north: number;
  x_south: number;
  y_south: number;
}

export interface CoordinateSet {
  colorGroup: string;
  colorCode: string;
  coordinates: Coordinate[];
}

export interface History {
  user: string;
  changes: string;
  date: string;
}

export interface Instance {
  name: string;
  description: string;
  files: InstanceFile[];
  coordinateSets: CoordinateSet[];
  trackerWidth: number;
  trackers: number;
  bifila: number;
  bracktrackingGroups: number;
  history: History[];
}

export interface FileQueueItem {
  file: File;
  error: boolean;
  progress: number;
}
