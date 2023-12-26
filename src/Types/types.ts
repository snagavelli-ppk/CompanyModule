export interface Simulation {
    content: { location: string };
    createdAt: string;
    elementsJson: { updatedAt: string; value: any }; 
    image: string;
    meta: { title: string; description: string };
    model: string;
    modelPath: string;
    publishedDate: string;
    simulationDescription: string;
    simulationName: string;
    state: string;
    tutorials: any[]; 
    updatedAt: string;
    __v: number;
    _id: string;
  }


  export interface Tutorial {
  state: string;
  author: string;
  publishedDate: string;
  tutorialDescription: string;
  totalNumberOfChapters: string;
  totalTimeOfTraining: string;
  _id: string;
  title: string;
  tutorialName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface Admin {
  additionalRoles: string[];
  companyid: string;
  createdAt: string;
  departid: string | null;
  email: string;
  firstname: string;
  isActive: boolean;
  lastActiveAt: string;
  lastLoggedInDate: string;
  lastname: string;
  loginSSO: boolean;
  middlename: string;
  password: string;
  role: string;
  updatedAt: string;
  username: string;
  __v: number;
  _id: string;
}
