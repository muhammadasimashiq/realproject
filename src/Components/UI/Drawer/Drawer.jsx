import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import drawerList from "../../../config/drawerlist";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import logo from "../../../assets/img/logo.png";
import Divider from "@mui/material/Divider";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const DrawerComp = ({
  drawerWidth,
  container,
  mobileOpen,
  handleDrawerToggle,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const mode = useSelector((state) => state.mode.mode);
  const iconprops = {
    style: {
      color: mode === "light" ? theme.palette.primary.main : "#fff",
    },
  };
  const drawerLinkClickHandler = (e, val) => {
    navigate(val.name, { replace: true });
  };
  const drawer = (
    <div>
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        <img src={logo} alt="logo" style={{width:'20%'}}/>
      </Toolbar>
      <Divider />
      <List>
        {drawerList({ iconprops }).map((item, index) => (
          <ListItem
            onClick={(e) => drawerLinkClickHandler(e, item)}
            button
            key={index}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default DrawerComp;
