import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Outlet, useNavigate } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const tabData = [
  {
    value: 0,
    label: "First",
    content: <div>this is first</div>,
  },
  {
    value: 1,
    label: "Second",
    content: <div>this is second</div>,
  },
];

export default function BasicTabs({ tabs, orientation, ...props }) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {orientation === "vertical" ? (
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            height: 224,
            width: "100%",
          }}
        >
          <Tabs
            {...props}
            variant="scrollable"
            orientation={orientation}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} {...a11yProps(tab.value)} />
            ))}
          </Tabs>
          {tabs.map((tab, index) => (
            <TabPanel
              style={{ flexGrow: 1 }}
              key={index}
              value={value}
              index={index}
            >
              {tab.content}
            </TabPanel>
          ))}
        </Box>
      ) : (
        <React.Fragment>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              {...props}
              variant="scrollable"
              orientation={orientation}
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              {tabs.map((tab, index) => (
                <Tab key={index} label={tab.label} {...a11yProps(tab.value)} />
              ))}
            </Tabs>
          </Box>
          {tabs.map((tab, index) => (
            <TabPanel key={index} value={value} index={index}>
              {tab.content}
            </TabPanel>
          ))}
        </React.Fragment>
      )}
    </Box>
  );
}

BasicTabs.propTypes = {
  map: PropTypes.func,
  tabs: PropTypes.any,
};

BasicTabs.defaultProps = {
  tabs: tabData,
  withRouting: false,
  orientation: "horizontal",
};
