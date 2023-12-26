import  { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CompanyAddForm from "./CompanyAddForm";

const AddEditButtons = () => {
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  const handleAddClick = () => {
    setShowCheckboxes(true);
  };

  const handleEditClick = () => {
    setShowCheckboxes(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddClick}
      >
        Add
      </Button>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<EditIcon />}
        onClick={handleEditClick}
      >
        Edit
      </Button>
      {showCheckboxes && <CompanyAddForm />}
    </div>
  );
};

export default AddEditButtons;
