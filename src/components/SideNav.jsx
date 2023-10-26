import { Box, ListItemText, MenuItem, MenuList } from "@mui/material";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  return (
    <Box component="nav">
      <MenuList>
        <MenuItem component={NavLink} to="/clip">
          <ListItemText>Clip</ListItemText>
        </MenuItem>
        <MenuItem component={NavLink} to="/local-model">
          <ListItemText>Local Model</ListItemText>
        </MenuItem>
      </MenuList>
    </Box>
  );
};

export default SideNav;
