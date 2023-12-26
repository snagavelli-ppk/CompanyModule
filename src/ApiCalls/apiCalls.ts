import axios from "axios";
import { MyFormData1 } from "../Types/formTypes";
import { Admin, Simulation, Tutorial } from "../Types/types";

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

export const getCompanyDetails = async (
  companyId: string,
  authToken: string
) => {
  const url = `get-company-details/${companyId}`;

  try {
    const response = await axios.get(baseUrl + url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.status === 200) {
      const data: MyFormData1 | undefined = response.data;
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

export const updateCompanyData = async (
  companyId: string,
  formData: MyFormData1,
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

  const url = `update-company/${companyId}`;

  try {
    const response = await axios.put(baseUrl + url, updatedFormData1, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return response;
    } else {
      console.error(
        "Failed to update company data:",
        response.status,
        response.statusText
      );
      return undefined;
    }
  } catch (error: any) {
    console.error("Error updating company data:", error.message);
    return undefined;
  }
};
