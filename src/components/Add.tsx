import { FormEvent, useState } from "react";
import CompanyForm from "./CompanyForm";
import { MyFormData } from "../Types/formTypes";
import { postData } from "../ApiCalls/apiCalls";

const Add = () => {
  const token=''
  const initialFormData: MyFormData = {
    companyName: "",
    companyUrl: "",
    tutorials: [],
    simulations: [],
    primaryPhoneNumber: "",
    adminLinkExtension: "",
    companyadmin: [],
    companyOptions: "",
  };
  const [formData, setFormData] = useState<MyFormData>(initialFormData);

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

    await postData(updatedFormData, token);
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

export default Add;
