import { FormEvent, useContext, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Grid, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { FormErrors, MyFormData } from "../Types/formTypes";
import { useFetch } from "./useFetch";
import { authToken } from "../context/context";
import { useNavigate } from "react-router-dom";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface myProps {
  formData: MyFormData;
  onHandleInputChange: (field: string, value: string) => void;
  onHandleSubmit: (e: FormEvent) => void;
}

const CompanyForm: React.FC<myProps> = ({
  formData,
  onHandleInputChange,
  onHandleSubmit,
}) => {
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
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);

  const { token } = useContext(authToken);

  const handleInputChange = (field: keyof MyFormData, value: any) => {
    onHandleInputChange(field, value);

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

  const handleInputBlur = (field: keyof MyFormData) => {
    const value = formData[field];

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

  const handleSubmit = async (e: FormEvent) => {
    onHandleSubmit(e);
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
  };

  const areAllFieldsFilled = Object.values(formData).every((value) =>
    Array.isArray(value) ? value.length > 0 : value.trim() !== ""
  );

  return (
    <form
      style={{
        marginTop: "100px",
        width: "80%",
        margin: "auto",

        padding: "15px",
        borderRadius: "8px",
        background: "#ffffff",
      }}
    >
      <CloseIcon
        onClick={() => {
          navigate("/companies");
        }}
      />
      <Typography
        variant="h4"
        sx={{
          color: "black",
          fontFamily: "Arial, sans-serif",
          marginBottom: 3,
        }}
      >
        Company Form
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Typography>Company Name</Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={formData.companyName}
            size="small"
            onChange={(e) => handleInputChange("companyName", e.target.value)}
            onBlur={() => handleInputBlur("companyName")}
            error={Boolean(formErrors.companyName)}
            helperText={formErrors.companyName}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Company Url</Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={formData.companyUrl}
            size="small"
            onChange={(e) => handleInputChange("companyUrl", e.target.value)}
            onBlur={() => handleInputBlur("companyUrl")}
            error={Boolean(formErrors.companyUrl)}
            helperText={formErrors.companyUrl}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Tutorials</Typography>
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
            size="small"
            onChange={(_, newValue) => handleInputChange("tutorials", newValue)}
            onBlur={() => handleInputBlur("tutorials")}
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
                placeholder="Favorites"
                variant="outlined"
                error={Boolean(formErrors.tutorials)}
                helperText={formErrors.tutorials}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Simulations</Typography>
          <Autocomplete
            multiple
            id="checkboxes-tags-demo-2"
            options={simulationsData.map((simulation) => ({
              id: simulation.id,
              name: simulation.name,
            }))}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            size="small"
            value={formData.simulations}
            onChange={(_, newValue) =>
              handleInputChange("simulations", newValue)
            }
            onBlur={() => handleInputBlur("simulations")}
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
                placeholder="Favorites"
                variant="outlined"
                error={Boolean(formErrors.simulations)}
                helperText={formErrors.simulations}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>PrimaryPhoneNumber</Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={formData.primaryPhoneNumber}
            onChange={(e) =>
              handleInputChange("primaryPhoneNumber", e.target.value)
            }
            onBlur={() => handleInputBlur("primaryPhoneNumber")}
            error={Boolean(formErrors.primaryPhoneNumber)}
            helperText={formErrors.primaryPhoneNumber}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>AdminLinkExtension</Typography>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            value={formData.adminLinkExtension}
            onChange={(e) =>
              handleInputChange("adminLinkExtension", e.target.value)
            }
            onBlur={() => handleInputBlur("adminLinkExtension")}
            error={Boolean(formErrors.adminLinkExtension)}
            helperText={formErrors.adminLinkExtension}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Company Admin</Typography>
          <Autocomplete
            multiple
            id="checkboxes-tags-demo-3"
            options={adminData.map((admin) => ({
              id: admin.id,
              username: admin.username,
            }))}
            disableCloseOnSelect
            getOptionLabel={(option) => option.username}
            size="small"
            value={formData.companyadmin}
            onChange={(_, newValue) =>
              handleInputChange("companyadmin", newValue)
            }
            onBlur={() => handleInputBlur("companyadmin")}
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
                placeholder="Favorites"
                variant="outlined"
                error={Boolean(formErrors.companyadmin)}
                helperText={formErrors.companyadmin}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Company Options</Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={formData.companyOptions}
            onChange={(e) =>
              handleInputChange("companyOptions", e.target.value)
            }
            onBlur={() => handleInputBlur("companyOptions")}
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
  );
};

export default CompanyForm;
