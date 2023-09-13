import { BsFillPersonLinesFill } from "react-icons/bs";

import { BiBookBookmark, BiBookAdd } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";

const drawerlinks = ({ iconprops }) => [
  {
    name: "courses",
    label: "Delete Courses",
    icon: <BiBookBookmark {...iconprops} />,
  },
  {
    name: "users",
    label: "Users",
    icon: <BsFillPersonLinesFill {...iconprops} />,
  },
  {
    name: "create-course",
    label: "Configure Course",
    icon: <BiBookAdd {...iconprops} />,
  },
  {
    name: "configuration",
    label: "Configuration",
    icon: <AiOutlineSetting {...iconprops} />,
  },
];

export default drawerlinks;
