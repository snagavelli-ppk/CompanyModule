export interface FormErrors {
    companyName: string;
    companyUrl: string;
    tutorials: string;
    simulations: string;
    primaryPhoneNumber: string;
    adminLinkExtension: string;
    companyadmin: string;
    companyOptions: string;
  }

  export interface MyFormData {
  companyName: string;
  companyUrl: string;
  tutorials: { id: string; tutorname: string }[];
  simulations: { id: string;name: string  }[]; 
  primaryPhoneNumber: string;
  adminLinkExtension: string;
  companyadmin: { id: string; username: string }[];
  companyOptions: '' ;
}
export interface MyFormData1 {
  simulations: { id: string }[]; 
  companyName: string;
  companyUrl: string;
  tutorials: {
    id: string;
    tutorname: string;
  }[];
  primaryPhoneNumber: string;
  adminLinkExtension: string;
  companyadmin: {
    id: string;
    username: string;
  }[];
  companyOptions: '';
}
