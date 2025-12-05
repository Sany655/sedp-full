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
  FaVoteYea,
  FaUserCheck,
  FaChartPie,
} from "react-icons/fa";
import { FaLandMineOn } from "react-icons/fa6";
import {
  MdOutlineLocalPolice,
  MdOutlineAlignHorizontalLeft,
  MdOutlineAddModerator,
  MdLocationCity,
  MdPlace,
  MdHowToVote,
} from "react-icons/md";
import { AiOutlineAntDesign } from "react-icons/ai";
import { TbDeviceAirtag } from "react-icons/tb";
import { RiRoadMapLine } from "react-icons/ri";
import { HiOfficeBuilding } from "react-icons/hi";


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
        path: "/tasks/view",
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
    title: "Voter Management",
    icon: <MdHowToVote />,
    childrens: [
      {
        title: "Overview",
        path: "",
        icon: <FaChartPie />,
      },
      {
        title: "Voters",
        path: "/voter-management/voters",
        icon: <FaUserCheck />,
      },
      {
        title: "Voter Centers",
        path: "",
        icon: <HiOfficeBuilding />,
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
            icon: <FaUsers />,
            path: "/location/division/view",
          },
          {
            title: "District",
            icon: <FaGlobe />,
            path: "/location/district/view",
          },
          {
            title: "Thana",
            icon: <MdLocationCity />,
            path: "/location/thana/view",
          },
          {
            title: "Ward",
            icon: <FaMapMarkerAlt />,
            path: "/location/ward/view",
          },
          {
            title: "Union",
            icon: <MdPlace />,
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
        title: "Event Types",
        path: "/event-types/view",
        icon: <MdOutlineAddModerator />,
      },
      {
        title: "Event Target Group",
        path: "/event-target-groups/view",
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
