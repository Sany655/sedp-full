import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DefaultLayout from "./components/layout/DefaultLayout";
import dayjs from "dayjs";
import Link from "next/link";
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaClock,
  FaCalendarDay,
  FaChartLine,
  FaEye,
  FaPlus,
  FaArrowRight,
  FaChartPie,
  FaBullhorn,
  FaMapMarkedAlt,
  FaComments,
  FaCalendarAlt,
  FaUsersCog,
  FaImage,
  FaMobile,
  FaVoteYea,
  FaShieldAlt,
  FaMoneyBillWave,
  FaTrophy,
  FaExclamationTriangle,
  FaTasks,
  FaRobot,
  FaFire,
  // FaTrendingUp,
} from "react-icons/fa";

import PermissionGate from "./components/PermissionGate";
import AttendancePieChart from "./components/dashboard/AttendancePieChart";
import { getSessionUser } from "@/lib/session";
import { Suspense } from "react";
import Loader from "./components/Loader";
import { FaTreeCity } from "react-icons/fa6";

// Mock data for election campaign
const campaignData = {
  candidate: {
    name: "Mohammad Rahman",
    constituency: "Dhaka-10",
    party: "Progressive Party",
    winProbability: 67
  },
  voterStats: {
    totalVoters: 285000,
    targetedVoters: 178000,
    reachedVoters: 142000,
    undecidedVoters: 45000,
    supporterCount: 125000
  },
  campaignHealth: 78,
  events: {
    upcoming: 12,
    completed: 45,
    attendanceAvg: 2500
  },
  volunteers: {
    total: 450,
    active: 389,
    tasksCompleted: 1240
  },
  communication: {
    smsSent: 95000,
    callsMade: 12500,
    chatbotInteractions: 8900
  },
  areas: {
    strong: 15,
    neutral: 8,
    weak: 6
  }
};

const modules = [
  {
    id: 1,
    name: "Candidate & Campaign Control",
    icon: FaBullhorn,
    color: "from-blue-500 to-blue-600",
    stats: { score: campaignData.campaignHealth, label: "Health Score" }
  },
  {
    id: 2,
    name: "Voter Insights & Mapping",
    icon: FaMapMarkedAlt,
    color: "from-green-500 to-green-600",
    stats: { score: Math.round((campaignData.voterStats.reachedVoters / campaignData.voterStats.targetedVoters) * 100), label: "Coverage" }
  },
  {
    id: 3,
    name: "Communication Hub",
    icon: FaComments,
    color: "from-purple-500 to-purple-600",
    stats: { score: campaignData.communication.smsSent, label: "Messages Sent" }
  },
  {
    id: 4,
    name: "Event & Field Operations",
    icon: FaCalendarAlt,
    color: "from-orange-500 to-orange-600",
    stats: { score: campaignData.events.upcoming, label: "Upcoming Events" }
  },
  {
    id: 5,
    name: "Volunteer Workforce",
    icon: FaUsersCog,
    color: "from-teal-500 to-teal-600",
    stats: { score: campaignData.volunteers.active, label: "Active Volunteers" }
  },
  {
    id: 6,
    name: "AI Media Studio",
    icon: FaImage,
    color: "from-pink-500 to-pink-600",
    stats: { score: 234, label: "Content Created" }
  },
  {
    id: 7,
    name: "Web & Mobile Ecosystem",
    icon: FaMobile,
    color: "from-indigo-500 to-indigo-600",
    stats: { score: 15600, label: "App Users" }
  },
  {
    id: 8,
    name: "Election Day Command",
    icon: FaVoteYea,
    color: "from-red-500 to-red-600",
    stats: { score: 29, label: "Polling Booths" }
  },
  {
    id: 9,
    name: "Cybersecurity & Threat Monitor",
    icon: FaShieldAlt,
    color: "from-yellow-500 to-yellow-600",
    stats: { score: 3, label: "Active Threats" }
  },
  {
    id: 10,
    name: "Finance & Compliance",
    icon: FaMoneyBillWave,
    color: "from-emerald-500 to-emerald-600",
    stats: { score: 85, label: "Budget Used %" }
  }
];

const recentActivities = [
  { type: "event", text: "Rally at Mirpur completed - 3,200 attendees", time: "2 hours ago", icon: FaCalendarAlt, color: "text-orange-500" },
  { type: "volunteer", text: "45 new volunteers registered", time: "4 hours ago", icon: FaUsersCog, color: "text-teal-500" },
  { type: "communication", text: "SMS campaign sent to 12,000 voters", time: "6 hours ago", icon: FaComments, color: "text-purple-500" },
  { type: "threat", text: "Fake news detected and reported", time: "8 hours ago", icon: FaShieldAlt, color: "text-red-500" }
];

const areaPerformance = [
  { area: "Ward 1 - Mirpur", status: "Strong", score: 85, voters: 12500, color: "bg-green-500" },
  { area: "Ward 2 - Mohammadpur", status: "Neutral", score: 58, voters: 10200, color: "bg-yellow-500" },
  { area: "Ward 3 - Dhanmondi", status: "Weak", score: 42, voters: 9800, color: "bg-red-500" },
  { area: "Ward 4 - Lalmatia", status: "Strong", score: 78, voters: 11000, color: "bg-green-500" }
];

async function fetchSummary(token) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/attendance/summary`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Error fetching attendance/summary:", res.status, errorBody);
    throw new Error("Failed to attendance/summary");
  }

  return res.json();
}

export default async function DashboardPage() {

  const token = cookies().get("auth_token")?.value;
  // console.log(token)
  // if (!token) {
  //   redirect("/auth/login");
  // }
  let summary, user;
  try {
    user = await getSessionUser(token);
    if (!user) redirect("/auth/login");
    summary = await fetchSummary(token);
  } catch (error) {
    console.error("Dashboard error:", error);
    redirect("/auth/login");
  }

  // Calculate additional metrics
  const totalEmployees = summary.total_employee || 0;
  const presentToday = summary.total_present || 0;
  const absentToday = summary.total_absent || 0;
  const totalEnrolled = summary.total_fingerprint_enrolled || 0;
  const totalUnenrolled = summary.total_fingerprint_unenrolled || 0;
  const attendanceRate = totalEnrolled > 0 ? ((presentToday / totalEnrolled) * 100).toFixed(1) : 0;
  const absentRate = (100 - attendanceRate).toFixed(1);
  const totalRff = summary.total_rff_points || 0;
  const totalActiveRff = summary.total_active_rff_points || 0;
  const totalOnLeave = summary.on_leave || 0;
  const totalManualFingerprint = summary.manual_count || 0;

  // Calculate status breakdown for pie chart
  const activeNow =
    summary.data?.filter((att) => att.clock_in && !att.clock_out).length || 0;
  const completedToday =
    summary.data?.filter((att) => att.clock_in && att.clock_out).length || 0;
  const onTime =
    summary.data?.filter(
      (att) =>
        att.clock_in &&
        dayjs(att.clock_in).format("HH:mm") <=
        att["attendence_policy.work_start_time"]
    ).length || 0;
  const lateArrivals =
    summary.data?.filter(
      (att) =>
        att.clock_in &&
        dayjs(att.clock_in).format("HH:mm") >
        att["attendence_policy.work_start_time"]
    ).length || 0;

  // Pie chart data
  const pieChartData = [
    {
      name: "Present",
      value: presentToday,
      color: "#10B981", // green-500
      percentage:
        totalEmployees > 0
          ? ((presentToday / totalEmployees) * 100).toFixed(1)
          : 0,
    },
    {
      name: "Absent",
      value: absentToday,
      color: "#EF4444", // red-500
      percentage:
        totalEmployees > 0
          ? ((absentToday / totalEmployees) * 100).toFixed(1)
          : 0,
    },
  ];

  const statusBreakdownData = [
    {
      name: "Active Now",
      value: activeNow,
      color: "#8B5CF6", // purple-500
    },
    {
      name: "Completed",
      value: completedToday,
      color: "#3B82F6", // blue-500
    },
    {
      name: "On Time",
      value: onTime,
      color: "#10B981", // green-500
    },
    {
      name: "Late",
      value: lateArrivals,
      color: "#F59E0B", // amber-500
    },
  ].filter((item) => item.value > 0); // Only show categories with data

  // const attendanceSummary = [
  //   // {
  //   //   title: 'Total Employees',
  //   //   count: totalEmployees,
  //   //   icon: FaUsers,
  //   //   color: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
  //   //   textColor: 'text-blue-700',
  //   //   iconColor: 'text-blue-600',
  //   //   trend: null
  //   // },
  //   // {
  //   //   title: 'Total Enrolled Employees',
  //   //   count: totalEnrolled,
  //   //   icon: FaUsers,
  //   //   color: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
  //   //   textColor: 'text-blue-700',
  //   //   iconColor: 'text-blue-600',
  //   //   trend: null
  //   // },
  //   {
  //     title: "Present Today",
  //     count: presentToday,
  //     icon: FaUserCheck,
  //     color: "bg-gradient-to-br from-green-50 to-green-100 border-green-200",
  //     textColor: "text-green-700",
  //     iconColor: "text-green-600",
  //     trend: `${attendanceRate}%`,
  //   },
  //   {
  //     title: "Absent Today",
  //     count: absentToday,
  //     icon: FaUserTimes,
  //     color: "bg-gradient-to-br from-red-50 to-red-100 border-red-200",
  //     textColor: "text-red-700",
  //     iconColor: "text-red-600",
  //     trend: `${(100 - attendanceRate).toFixed(1)}%`,
  //   },
  //   {
  //     title: "Active Now",
  //     count: activeNow,
  //     icon: FaClock,
  //     color: "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200",
  //     textColor: "text-purple-700",
  //     iconColor: "text-purple-600",
  //     trend: "Currently working",
  //   },
  // ];

  // Helper function to get status badge
  const getStatusBadge = (attendance) => {
    if (!attendance.clock_out) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
          Active
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        <div className="w-2 h-2 bg-blue-400 rounded-full mr-1"></div>
        Completed
      </span>
    );
  };

  // Calculate work duration
  const calculateWorkDuration = (clockIn, clockOut) => {
    if (!clockIn) return "N/A";

    const start = dayjs(clockIn);
    const end = clockOut ? dayjs(clockOut) : dayjs();
    const duration = end.diff(start, "minute");

    const hours = duration > 0 ? Math.floor(duration / 60) : 0;
    const minutes = duration > 0 ? duration % 60 : 0;

    if (!clockOut) {
      return `${hours}h ${minutes}m (ongoing)`;
    }

    return `${hours}h ${minutes}m`;
  };

  return (
    <Suspense fallback={<Loader />}>
      <DefaultLayout title="Dashboard">
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                  <FaTrophy className="text-yellow-500" />
                  Smart Election Digital Platform
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Campaign Command Center - {campaignData.candidate.constituency}
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Candidate</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{campaignData.candidate.name}</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {campaignData.candidate.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Win Probability */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                  <FaTrophy className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-600 font-semibold text-sm">AI Prediction</span>
              </div>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {campaignData.candidate.winProbability}%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Win Probability</p>
              <div className="mt-3 flex items-center gap-2">
                {/* <FaTrendingUp className="text-green-500" /> */}
                <span className="text-xs text-green-600">+5% from last week</span>
              </div>
            </div>

            {/* Campaign Health */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                  <FaChartLine className="w-6 h-6 text-white" />
                </div>
                <span className="text-blue-600 font-semibold text-sm">Overall</span>
              </div>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {campaignData.campaignHealth}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Campaign Health Score</p>
              <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${campaignData.campaignHealth}%` }}
                ></div>
              </div>
            </div>

            {/* Voter Reach */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                  <FaUsers className="w-6 h-6 text-white" />
                </div>
                <span className="text-purple-600 font-semibold text-sm">Target</span>
              </div>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {(campaignData.voterStats.reachedVoters / 1000).toFixed(0)}K
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Voters Reached</p>
              <p className="text-xs text-gray-500 mt-1">
                of {(campaignData.voterStats.targetedVoters / 1000).toFixed(0)}K targeted
              </p>
            </div>

            {/* Active Volunteers */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
                  <FaUsersCog className="w-6 h-6 text-white" />
                </div>
                <span className="text-teal-600 font-semibold text-sm">Active</span>
              </div>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {campaignData.volunteers.active}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Volunteers</p>
              <p className="text-xs text-gray-500 mt-1">
                {campaignData.volunteers.tasksCompleted} tasks completed
              </p>
            </div>
          </div>

          {/* Module Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {modules.map((module) => (
              <div
                key={module.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center shadow-md mb-4`}>
                  <module.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  {module.name}
                </h3>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {module.stats.score}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {module.stats.label}
                    </p>
                  </div>
                  <FaArrowRight className="text-gray-400 hover:text-gray-600" />
                </div>
              </div>
            ))}
          </div>

          {/* Area Performance & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Area Performance */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <FaMapMarkedAlt className="text-blue-600" />
                  Area Performance
                </h3>
                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Strong</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">Neutral</span>
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded">Weak</span>
                </div>
              </div>

              <div className="space-y-4">
                {areaPerformance.map((area, idx) => (
                  <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${area.color}`}></div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{area.area}</p>
                          <p className="text-xs text-gray-500">{area.voters.toLocaleString()} voters</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{area.score}</p>
                        <p className="text-xs text-gray-500">Score</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${area.color}`}
                        style={{ width: `${area.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <FaFire className="text-orange-600" />
                Recent Activity
              </h3>

              <div className="space-y-4">
                {recentActivities.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <activity.icon className={`w-5 h-5 mt-1 ${activity.color}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.text}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alerts & Warnings */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-l-4 border-yellow-500 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <FaExclamationTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Campaign Alerts & Recommendations
                </h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>Ward 3 showing declining support - recommend increased field visits (AI Recommendation)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>12 upcoming events need volunteer assignments in next 48 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>Fake news detected about candidate - cyber team investigating</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </Suspense>
  );
}
