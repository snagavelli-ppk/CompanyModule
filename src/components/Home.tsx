import React, { useContext, useState } from "react";
import { Tab, Tabs, Paper } from "@mui/material";
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

  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    switch (newValue) {
      case 0:
        setAddForm(true);
        setTable(false);
        setEditForm(false);
        break;
      case 1:
        setAddForm(false);
        setTable(false);
        setEditForm(true);
        break;
      case 2:
        setAddForm(false);
        setTable(true);
        setEditForm(false);
        setSelectId("");
        break;
      default:
        break;
    }
  };

  const handleSelect = async (id: string) => {
    setSelectId(id);
  };

  return (
    <div>
      <Paper
        square
        style={{
          position: "fixed",
          top: 66,
          width: "100%",
      
        }}
      >
        <Tabs
          value={addForm ? 0 : editForm ? 1 : 2}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleTabChange}
        >
          <Tab label="Add" />
          <Tab label="Edit" disabled={!selectId} />
          <Tab label="Close" />
        </Tabs>
      </Paper>
      <div>
        {addForm && <Add token={token} />}
        {editForm && <Edit token={token} companyId={selectId} />}
        {table && <CompanyTable onDataSelect={handleSelect} token={token} />}
      </div>
    </div>
  );
};

export default Home;
