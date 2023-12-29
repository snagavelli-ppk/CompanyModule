import { useContext, useEffect, useState } from "react";
import { getCompanys } from "../ApiCalls/apiCalls";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Button,
} from "@mui/material";
import { Company } from "../Types/types";
import tinycolor from "tinycolor2";
import { authToken } from "../context/context";
import { Link } from "react-router-dom";

const Companies = () => {
  const {token}=useContext(authToken)
  const [companyData, setCompanyData] = useState<Company[]>([]);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCompanys(token);
      setCompanyData(data);
    };
    fetchData();
  }, [token]);

  const handleRowClick = (companyId: string) => {
    setSelectedRow(companyId);
    
  };

  const getRowStyle = (companyId: string) => {
    if (selectedRow === companyId) {
      const brightColor = tinycolor("#2196f3").brighten(15).toString();
      return {
        cursor: "pointer",
        backgroundColor: brightColor,
      };
    }
    return { cursor: "pointer" };
  };

  return (
    <>
      {" "}
      <Link to="/add">
        <Button>Add</Button>
      </Link>
      <Link to={`/edit/${selectedRow}`}>
        <Button>edit</Button>
      </Link>
      <Box sx={{ position: "fixed", top: 125 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Company URL</TableCell>
              <TableCell>Admin Link Extension</TableCell>
              <TableCell>Number of Trainees</TableCell>
              <TableCell>Number of Departments</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companyData.length > 0 ? (
              companyData.map((company, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleRowClick(company._id)}
                  hover
                  selected={selectedRow === company._id}
                  style={getRowStyle(company._id)}
                >
                  <TableCell>{company.companyName}</TableCell>
                  <TableCell>{company.companyUrl}</TableCell>
                  <TableCell>{company.adminLinkExtension}</TableCell>
                  <TableCell>{company.numberOfTrainees}</TableCell>
                  <TableCell>{company.numberOfDepartments}</TableCell>
                  <TableCell>{company.isActive ? "yes" : "no"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};

export default Companies;
