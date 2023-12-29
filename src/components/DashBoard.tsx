import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
const DashBoard = () => {
  return (
    
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 128,
            height: 128,
          },
        }}
      >
        <Link to="/CompanyAdmins">
          <Paper elevation={3} style={{ width: 200, height: 125 }}>
            CompanyAdmins
          </Paper>
        </Link>
        <Link to="/Tutorials">
          <Paper elevation={3} style={{ width: 200, height: 125 }}>
            Tutorials
          </Paper>
        </Link>
        <Link to="/companies">
          <Paper elevation={3} style={{ width: 200, height: 125 }}>
            Companies
          </Paper>
        </Link>
      </Box>
  
  );
};
export default DashBoard;
