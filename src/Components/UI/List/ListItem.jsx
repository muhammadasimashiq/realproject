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
import ListComp from "./List";

const ListItemComp = ({
  nested,
  name,
  label,
  icon,
  childrenElements,
  listItemClickEvent,
  secondary,
  layer,
  id,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);
  const [padding, setPadding] = React.useState("0");
  React.useEffect(() => {
    switch (layer) {
      case 1: {
        return setPadding("23.16px");
      }
      case 2: {
        return setPadding("30px");
      }
      case 3: {
        return setPadding("50px");
      }
      default: {
        return setPadding("0");
      }
    }
  }, []);
  return (
    <React.Fragment>
      <ListItemButton
        layer={layer}
        padding={padding}
        onClick={(e) => {
          listItemClickEvent({ name, label, nested, id, ...props });
          setOpen((prevState) => !prevState);
        }}
      >
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText secondary={secondary ? secondary : null}>
          {label ? label : name}
        </ListItemText>
        {nested && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {nested && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <ListComp
            onItemClick={listItemClickEvent}
            listSkeleton={childrenElements}
          />
        </Collapse>
      )}
    </React.Fragment>
  );
};

export default ListItemComp;
