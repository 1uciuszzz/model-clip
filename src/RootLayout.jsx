import { Box, Toolbar } from "@mui/material";
import HeaderNav from "./components/HeaderNav";
import SideNav from "./components/SideNav";
import { Outlet } from "react-router-dom";
import FooterNav from "./components/FooterNav";

const RootLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box component="header">
        <HeaderNav />
        <Toolbar />
      </Box>
      <Box component="main" sx={{ display: "flex", gap: 1, flexGrow: 1 }}>
        <Box component="section" sx={{ width: 160 }}>
          <SideNav />
        </Box>
        <Box component="section" sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
      <Box component="footer">
        <FooterNav />
      </Box>
    </Box>
  );
};

export default RootLayout;
