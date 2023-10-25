import { Box, Typography } from "@mui/material";
import { Copyright } from "@mui/icons-material";

const FooterNav = () => {
  return (
    <Box component="nav" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Copyright fontSize="small" />
      <Typography variant="body1">2023 QUANTYSOFT</Typography>
    </Box>
  );
};

export default FooterNav;
