export interface InstanceFile {
  id: string;
  fileName: string;
  fileSizeMb: number;
  fileCategory: string;
  createdAt: string;
}
export interface InstanceTracker {
  is_cardan: boolean,
  tracker_tags: string[],
  tracker_tags_and_texts: {}
}

export interface Coordinate {
  tracker_id: string;
  x_north: number;
  y_north: number;
  x_south: number;
  y_south: number;
}

export interface TrackerInformation {
  "tracker_id": number,
  "name": string,
  "point_SW": number[],
  "point_SE": number[],
  "point_NW": number[],
  "point_NE": number[]
}
export interface pointsInformation {
  "posX": number,
  "posY": number,
  "point_id": number,
}
export interface step_3_1_Information {
  "trackersCAD": TrackerInformation[],
  "typographic_points": pointsInformation[]
}
export interface InstanceTrackerDrawList {
  "trackers_count": number,
  "slaves_count": number,
  "possible_trackers_count": number,
  "trackers": TrackerInformation[],
  "possible_trackers": TrackerInformation[]
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

