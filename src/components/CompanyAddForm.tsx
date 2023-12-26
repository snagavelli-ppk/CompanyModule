import { useContext, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Grid, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { postData } from "../ApiCalls/apiCalls";

import { FormErrors, MyFormData } from "../Types/formTypes";
import { useFetch } from "./useFetch";
import { authToken } from "../context/context";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CompanyAddForm = () => {
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

  const initialFormErrors: FormErrors = {
    companyName: "",
    companyUrl: "",
    tutorials: "",
    simulations: "",
    primaryPhoneNumber: "",
    adminLinkExtension: "",
    companyadmin: "",
    companyOptions: "",
  };

  const [formData, setFormData] = useState<MyFormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);
  const [showAlert, setShowAlert] = useState(false);

  const { token } = useContext(authToken);

  const handleInputChange = (field: keyof MyFormData, value: any) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));

    setFormErrors((prevErrors) => {
      let error = "";
      if (Array.isArray(value)) {
        error = value.length > 0 ? "" : `${field} is required`;
      } else {
        error =
          value.length > 0 || value.trim() !== "" ? "" : `${field} is required`;
      }
      return { ...prevErrors, [field]: error };
    });
  };
  const { simulationsData, tutorialsData, adminData } = useFetch(token);

  const handleSubmit = async () => {
    const errors: Partial<FormErrors> = {};
    Object.keys(formData).forEach((key) => {
      const field = key as keyof MyFormData;
      const value = formData[field];

      if (Array.isArray(value)) {
        errors[field] = value.length > 0 ? "" : `${field} is required`;
      } else {
        errors[field] = value.trim() ? "" : `${field} is required`;
      }
    });

    if (Object.values(errors).some((error) => !!error)) {
      setFormErrors(errors as FormErrors);
      console.log("Form has errors. Cannot submit.");
      return;
    }
    const updatedFormData = {
      ...formData,
      simulations: formData.simulations.map((simulation) => ({
        id: simulation.id,
      })),
    };

    console.log(updatedFormData);
    const data = await postData(updatedFormData, token);
    if (data!.status == 200) {
      handleShowAlert();
    }
  };

  const areAllFieldsFilled = Object.values(formData).every((value) =>
    Array.isArray(value) ? value.length > 0 : value.trim() !== ""
  );

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          width: "80%",
          padding: "20px",
        }}
      >
        {showAlert && (
          <Alert severity="success" onClose={handleCloseAlert}>
            <AlertTitle>Success</AlertTitle>
            Successfully created new company .
          </Alert>
        )}
        <form>
          <Typography
            variant="h4"
            sx={{ color: "black", fontFamily: "Arial, sans-serif" }}
          >
            Company Add Form
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TextField
                label="Company Name"
                fullWidth
                variant="outlined"
                value={formData.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
                error={Boolean(formErrors.companyName)}
                helperText={formErrors.companyName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Company Url"
                fullWidth
                variant="outlined"
                value={formData.companyUrl}
                onChange={(e) =>
                  handleInputChange("companyUrl", e.target.value)
                }
                error={Boolean(formErrors.companyUrl)}
                helperText={formErrors.companyUrl}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo-1"
                options={tutorialsData.map((tutorial) => ({
                  id: tutorial.id,
                  tutorname: tutorial.tutorname,
                }))}
                disableCloseOnSelect
                getOptionLabel={(option) => option.tutorname}
                value={formData.tutorials}
                onChange={(_, newValue) =>
                  handleInputChange("tutorials", newValue)
                }
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.tutorname}
                  </li>
                )}
                style={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tutorials"
                    placeholder="Favorites"
                    variant="outlined"
                    error={Boolean(formErrors.tutorials)}
                    helperText={formErrors.tutorials}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo-2"
                options={simulationsData.map((simulation) => ({
                  id: simulation.id,
                  name: simulation.name,
                }))}
                disableCloseOnSelect
                getOptionLabel={(option) => option.name}
                value={formData.simulations}
                onChange={(_, newValue) =>
                  handleInputChange("simulations", newValue)
                }
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name}
                  </li>
                )}
                style={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Simulations"
                    placeholder="Favorites"
                    variant="outlined"
                    error={Boolean(formErrors.simulations)}
                    helperText={formErrors.simulations}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="PrimaryPhoneNumber"
                fullWidth
                variant="outlined"
                value={formData.primaryPhoneNumber}
                onChange={(e) =>
                  handleInputChange("primaryPhoneNumber", e.target.value)
                }
                error={Boolean(formErrors.primaryPhoneNumber)}
                helperText={formErrors.primaryPhoneNumber}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="AdminLinkExtension"
                fullWidth
                variant="outlined"
                value={formData.adminLinkExtension}
                onChange={(e) =>
                  handleInputChange("adminLinkExtension", e.target.value)
                }
                error={Boolean(formErrors.adminLinkExtension)}
                helperText={formErrors.adminLinkExtension}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo-3"
                options={adminData.map((admin) => ({
                  id: admin.id,
                  username: admin.username,
                }))}
                disableCloseOnSelect
                getOptionLabel={(option) => option.username}
                value={formData.companyadmin}
                onChange={(_, newValue) =>
                  handleInputChange("companyadmin", newValue)
                }
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.username}
                  </li>
                )}
                style={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Company Admin"
                    placeholder="Favorites"
                    variant="outlined"
                    error={Boolean(formErrors.companyadmin)}
                    helperText={formErrors.companyadmin}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Company Options"
                fullWidth
                variant="outlined"
                value={formData.companyOptions}
                onChange={(e) =>
                  handleInputChange("companyOptions", e.target.value)
                }
                error={Boolean(formErrors.companyOptions)}
                helperText={formErrors.companyOptions}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={!areAllFieldsFilled}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default CompanyAddForm;