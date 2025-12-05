import {
  FaTachometerAlt,
  FaUserCog,
  FaMapMarkerAlt,
  FaUsers,
  FaFileAlt,
  FaCalendarDay,
  FaCalendarAlt,
  FaCalendar,
  FaGlobe,
  FaAllergies,
  FaMaxcdn,
} from "react-icons/fa";
import { FaLandMineOn } from "react-icons/fa6";
import {
  MdOutlineLocalPolice,
  MdOutlineAlignHorizontalLeft,
  MdOutlineAddModerator,
  MdLocationCity,
  MdPlace,
} from "react-icons/md";
import { AiOutlineAntDesign } from "react-icons/ai";
import { TbDeviceAirtag } from "react-icons/tb";
import { RiRoadMapLine } from "react-icons/ri";


const menu = [
  {
    title: "Overview",
    icon: <FaTachometerAlt />,
    path: "/",
  },
  {
    title: "Campaign",
    icon: <TbDeviceAirtag />,
    childrens: [
      // {
      //   title: "Reports",
      //   icon: <FaFileAlt />,
      //   childrens: [
      //     {
      //       title: "Daily",
      //       path: "/attendance/report/daily",
      //       icon: <FaCalendarDay />,
      //     },
      //     {
      //       title: "Custom",
      //       path: "/attendance/report/custom",
      //       icon: <FaCalendarAlt />,
      //     },
      //     {
      //       title: "All",
      //       path: "/attendance/report/all",
      //       icon: <FaAllergies />
      //     },
      //   ],
      // },
      {
        title: "Overview",
        icon: <FaTachometerAlt />,
        path: "/campaign/overview",
      },
      {
        title: "Roadmap",
        icon: <RiRoadMapLine />,
        path: "/campaign/roadmap",
      },
      // {
      //   title: "Manual Attendance",
      //   path: "/attendance/manual",
      //   icon: <FaCalendar />,
      // },
    ],
  },
  {
    title: "Task Management",
    icon: <MdOutlineLocalPolice />,
    childrens: [
      {
        title: "Tasks",
        path: "/policy/view",
        icon: <MdOutlineAlignHorizontalLeft />,
      },
      {
        title: "Reports",
        path: "/policy/reports",
        icon: <MdOutlineAddModerator />,
      },
    ],
  },
  {
    title: "Volunteer Management",
    icon: <FaUserCog />,
    childrens: [
      {
        title: "Overview",
        icon: <FaUsers />,
        path: "/employee/overview",
      },
      {
        title: "Volunteer Setup",
        icon: <FaUsers />,
        path: "/employee/view",
      },
      {
        title: "Roles Setup",
        icon: <AiOutlineAntDesign />,
        path: "/employee/designation",
      },
      {
        title: "Team Setup",
        icon: <AiOutlineAntDesign />,
        path: "/employee/team",
      },
      {
        title: "Location Setup",
        icon: <AiOutlineAntDesign />,
        childrens: [
          {
            title: "Division",
            icon: <FaUsers />, // Changed from FaMapMarkerAlt to FaUsers (represents groups/teams)
            path: "/location/division/view",
          },
          {
            title: "District",
            icon: <FaGlobe />, // Changed to FaGlobe (represents large geographical areas)
            path: "/location/district/view",
          },
          {
            title: "Thana",
            icon: <MdLocationCity />, // Changed to MdLocationCity (represents city/area level)
            path: "/location/thana/view",
          },
          {
            title: "Ward",
            icon: <FaMapMarkerAlt />, // Kept FaMapMarkerAlt (represents specific locations/territories)
            path: "/location/ward/view",
          },
          {
            title: "Union",
            icon: <MdPlace />, // Changed to MdPlace (represents specific points/locations)
            path: "/location/union/view",
          },
        ]
      },
    ],
  },
  {
    title: "Event Managemet",
    icon: <MdOutlineLocalPolice />,
    childrens: [
      {
        title: "Overview",
        path: "/event/overview",
        icon: <MdOutlineAlignHorizontalLeft />,
      },
      {
        title: "Event Setup",
        path: "/event/view",
        icon: <MdOutlineAlignHorizontalLeft />,
      },
      {
        title: "Event Type",
        path: "/event/types",
        icon: <MdOutlineAddModerator />,
      },
      {
        title: "Target Group",
        path: "/event/target-groups",
        icon: <MdOutlineAddModerator />,
      },
      {
        title: "Organizer",
        path: "/event/organizer",
        icon: <MdOutlineAddModerator />,
      },
      {
        title: "Assign Volunteer",
        path: "/event/assign-volunteer",
        icon: <MdOutlineAddModerator />,
      },
      {
        title: "Resource Management",
        path: "/event/resources",
        icon: <MdOutlineAddModerator />,
      },
      {
        title: "Reports",
        path: "/event/reports",
        icon: <MdOutlineAddModerator />,
      },
    ],
  },
  {
    title: "Admin",
    icon: <FaLandMineOn />,
    childrens: [
      {
        title: "All",
        icon: <FaUsers />,
        path: "/users/view",
      },
      {
        title: "Permissions",
        icon: <FaUsers />,
        path: "/employee/permissions",
      },
      {
        title: "Roles",
        icon: <FaUsers />,
        path: "/employee/roles",
      },
    ],
  },
];

export default menu;
