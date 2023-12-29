import { FormEvent, useEffect, useState } from "react";
import CompanyForm from "./CompanyForm";
import { getCompanyWithId, updateData } from "../ApiCalls/apiCalls";
import { CompanySubset } from "../Types/types";

const Edit = ({ token, companyId }: { token: string; companyId: string }) => {
  const [formData, setFormData] = useState<CompanySubset>({
    adminLinkExtension: "",
    companyName: "",
    companyOptions: "",
    companyUrl: "",
    companyadmin: [],
    primaryPhoneNumber: "",
    tutorials: [],
    simulations: [],
    _id: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCompanyWithId(companyId, token);
      const initialState: CompanySubset = {
        adminLinkExtension: data.adminLinkExtension,
        companyName: data.companyName,
        companyOptions: data.companyOptions,
        companyUrl: data.companyUrl,
        companyadmin: data.companyadmin,
        primaryPhoneNumber: data.primaryPhoneNumber,
        tutorials: data.tutorials,
        simulations: data.simulations,
        _id: data._id,
      };
      setFormData(initialState);
    };
    fetchData();
  }, [companyId]);
  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      simulations: formData.simulations.map((simulation) => ({
        id: simulation.id,
      })),
    };
    await updateData(updatedFormData, token);
  };

  return (
    <div>
      <CompanyForm
        formData={formData}
        onHandleInputChange={handleInputChange}
        onHandleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Edit;
