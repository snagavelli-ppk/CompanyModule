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
}

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
export const payLoad = {
  draw: 1,
  columns: [
    {
      data: "companyName",
      name: "",
      searchable: true,
      orderable: true,
      search: {
        value: "",
        regex: false,
      },
    },
    {
      data: "companyUrl",
      name: "",
      searchable: true,
      orderable: true,
      search: {
        value: "",
        regex: false,
      },
    },
    {
      data: "adminLinkExtension",
      name: "",
      searchable: true,
      orderable: true,
    },
    {
      data: "numberOfTrainees",
      name: "",
      searchable: true,
      orderable: true,
    },
    {
      data: "numberOfDepartments",
      name: "",
      searchable: true,
      orderable: true,
    },
    {
      data: "isActive",
      name: "",
      searchable: true,
      orderable: true,
      search: {
        value: "",
        regex: false,
      },
    },
  ],
  order: [
    {
      column: 0,
      dir: "asc",
    },
  ],
  start: 0,
  length: 10,
  search: {
    value: "",
    regex: false,
  },
};

export interface Company {
  numberOfTrainees: string;
  numberOfDepartments: string;
  isActive: boolean;
  _id: string;
  companyName: string;
  companyUrl: string;
  adminLinkExtension: string;
}

export interface CompanySubset {
  adminLinkExtension: string;
  companyName: string;
  companyOptions: string;
  companyUrl: string;
  companyadmin: {
    _id: string;
    username: string;
    id: string;
  }[];
  primaryPhoneNumber: string;
  tutorials: {
    _id: string;
    tutorname: string;
    id: string;
  }[];
  simulations: {
    id: string;
  }[];
  _id: string;
}
