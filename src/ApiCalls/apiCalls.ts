import axios from "axios";
import { MyFormData1 } from "../Types/formTypes";
import {
  Admin,
  CompanySubset1,
  Simulation,
  Tutorial,
  payLoad,
} from "../Types/types";

const baseUrl = "https://dev-admin.sunrises.io/api/";

export const getSimulations = async (authToken: string) => {
  const url = "get-all-simulations";

  const response = await axios.get(baseUrl + url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (response.status === 200) {
    const data: Simulation[] | undefined = response.data;
    return data;
  } else {
    console.error(
      "Failed to fetch simulations:",
      response.status,
      response.statusText
    );
  }
};

export const getTutorials = async (authToken: string) => {
  const url = "get-tutorials";

  const response = await axios.get(baseUrl + url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (response.status === 200) {
    const data: Tutorial[] | undefined = response.data;
    return data;
  } else {
    console.error(
      "Failed to fetch simulations:",
      response.status,
      response.statusText
    );
  }
};

export const getAdmins = async (authToken: string) => {
  const url = "get-users?_id=123&params=companyadmin";

  const response = await axios.get(baseUrl + url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (response.status === 200) {
    const data: Admin[] | undefined = response.data;
    return data;
  } else {
    console.error(
      "Failed to fetch simulations:",
      response.status,
      response.statusText
    );
  }
};

export const getCompanys = async (authToken: string) => {
  const url = `https://dev-admin.sunrises.io/api/get-company`;


    const response = await axios.post(url, payLoad, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data: any = response.data.data;
      return data;
    } else {
      console.error(
        "Failed to fetch company details:",
        response.status,
        response.statusText
      );
    }
  
};

export const getCompanyWithId = async (id: string, authToken: string) => {
  const url = `https://dev-admin.sunrises.io/api/get-company-with-id?_id=${id}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data: any = response.data.data;
      return data;
    } else {
      console.error(
        "Failed to fetch company details:",
        response.status,
        response.statusText
      );
      return undefined;
    }
  } catch (error: any) {
    console.error("Error fetching company details:", error.message);
    return undefined;
  }
};

export const postData = async (formData: MyFormData1, authToken: string) => {
  const updatedFormData = {
    ...formData,
    enableSSO: false,
  };

  const updatedFormData1 = {
    ...updatedFormData,
    sso: {},
  };
  console.log(updatedFormData1);
  const url = "create-company";
  const response = await fetch(baseUrl + url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedFormData1),
  });
  if (response.ok) {
    return response;
  } else {
    console.error("Failed to post data:", response.status, response.statusText);
  }
};

export const updateData = async (
  formData: CompanySubset1,
  authToken: string
) => {
  const updatedFormData = {
    ...formData,
    enableSSO: false,
  };

  const updatedFormData1 = {
    ...updatedFormData,
    sso: {},
  };
  console.log(updatedFormData1);
  const url = "https://dev-admin.sunrises.io/api/edit-company";
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedFormData1),
  });
  if (response.ok) {
    return response;
  } else {
    console.error("Failed to post data:", response.status, response.statusText);
  }
};
