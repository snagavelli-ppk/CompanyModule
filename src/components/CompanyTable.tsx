import { useEffect, useState } from "react";
import { getCompanys } from "../ApiCalls/apiCalls";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Company } from "../Types/types";

const CompanyTable = ({
  onDataSelect,
  token,
}: {
  onDataSelect: (data: string) => void;
  token: string;
}) => {
  const [companyData, setCompanyData] = useState<Company[]>([]);

  useEffect(() => {
    const fetchdata = async () => {
      const data = await getCompanys(token);
      setCompanyData(data);
    };
    fetchdata();
  }, []);

  const handleRowClick = (data: string) => {
    onDataSelect(data);
  };

  const renderTable = () => {
    return (
      <TableContainer component={Paper}>
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
            {companyData.map((company, index) => (
              <TableRow
                key={index}
                onClick={() => handleRowClick(company._id)}
                hover
                style={{ cursor: "pointer" }}
              >
                <TableCell>{company.companyName}</TableCell>
                <TableCell>{company.companyUrl}</TableCell>
                <TableCell>{company.adminLinkExtension}</TableCell>
                <TableCell>{company.numberOfTrainees}</TableCell>
                <TableCell>{company.numberOfDepartments}</TableCell>
                <TableCell>{company.isActive ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <div>
      <h2>Company Details</h2>
      {companyData.length > 0 ? renderTable() : "Loading..."}
    </div>
  );
};

export default CompanyTable;
