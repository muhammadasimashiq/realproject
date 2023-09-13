import React from "react";
import {
  ListItemButton,
  List,
  ListSubheader,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import defaultProps from "./defaultProps";
import ListItemComp from "./ListItem";

const ListComp = ({ heading, listSkeleton, onItemClick }) => {
  listSkeleton.sort((a, b) => {
    return a.id - b.id;
  });
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        heading !== "" && (
          <ListSubheader component="div" id="nested-list-subheader">
            {heading}
          </ListSubheader>
        )
      }
    >
      {listSkeleton.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {item.name === "divider" ? (
              <Divider />
            ) : (
              <ListItemComp
                listItemClickEvent={onItemClick}
                nested={item.childrenElements}
                {...item}
              />
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default ListComp;

ListComp.defaultProps = {
  heading: defaultProps.heading,
  listSkeleton: defaultProps.skeleton,
  onItemClick: defaultProps.itemClick,
};
