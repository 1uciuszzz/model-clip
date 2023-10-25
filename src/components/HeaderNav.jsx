import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { ViewInAr } from "@mui/icons-material";

const HeaderNav = () => {
  return (
    <Box component="nav">
      <AppBar>
        <Toolbar>
          <ViewInAr fontSize="large" />
          <Typography variant="h5">Beta 3D</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderNav;
