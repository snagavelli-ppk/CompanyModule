import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CompanyTable from "./CompanyTable";
import { authToken } from "../context/context";
import Add from "./Add";
import Edit from "./Edit";
const Home = () => {
  const [selectId, setSelectId] = useState<string>("");
  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [table, setTable] = useState(true);

  const { token } = useContext(authToken);
  const handleAddClick = () => {
    setAddForm(true);
    setTable(false);
    setEditForm(false);
  };

  const handleEditClick = () => {
    setAddForm(false);
    setTable(false);
    setEditForm(true);
  };

  const handleSelect = async (id: string) => {
    setSelectId(id);
    console.log();
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
        color="primary"
        startIcon={<EditIcon />}
        onClick={handleEditClick}
        disabled={!selectId}
      >
        Edit
      </Button>
      {addForm && <Add token={token} />}
      {editForm && <Edit token={token} companyId={selectId} />}
      {table && <CompanyTable onDataSelect={handleSelect} token={token} />}
    </div>
  );
};

export default Home;
