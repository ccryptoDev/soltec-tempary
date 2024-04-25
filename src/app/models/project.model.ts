export interface Project {
  id: number;
  name: string;
  description: string;
  creator: string;
  createdDate: string;
  updatedDate: string;
  permission: string;
}

export interface Instance {
  id: string;
  name: string;
  description: string;
  creator: string;
  createdDate: string;
  updatedDate: string;
  status: string;
}

export interface History {
  user: string;
  changes: string;
  date: string;
}

export interface ProjectDetails {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  plantType: string;
  trackerType: string;
  power: string;
  electronicType: string;
}


export interface ProjectDetailData {
  projectDetails: ProjectDetails;
  instances: Instance[];
  history: History[];
}

export interface ProjectMember {
  profileImg: string;
  firstName: string;
  lastName: string;
  permission: string;
}
