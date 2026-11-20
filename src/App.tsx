import { useState } from "react";
import { LoginPage } from "./components/auth/login-page";
import { StudentDashboard } from "./components/dashboards/student-dashboard";
import { FacultyDashboard } from "./components/dashboards/faculty-dashboard";
import { AdminDashboard } from "./components/dashboards/admin-dashboard";
import { Sidebar } from "./components/layout/sidebar";
import { Topbar } from "./components/layout/topbar";
import { AttendancePage } from "./components/pages/attendance-page";
import { TimetablePage } from "./components/pages/timetable-page";
import { MarksPage } from "./components/pages/marks-page";
import { AnnouncementsPage } from "./components/pages/announcements-page";
import { StudentsPage } from "./components/pages/students-page";
import { FacultyPage } from "./components/pages/faculty-page";
import { CoursesPage } from "./components/pages/courses-page";
import { ReportsPage } from "./components/pages/reports-page";
import { SettingsPage } from "./components/pages/settings-page";
import { Toaster } from "./components/ui/sonner";

type UserRole = "student" | "faculty" | "admin";
type User = {
  role: UserRole;
  name: string;
  email: string;
  id?: string;
  avatar?: string;
};

export default function App () {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] =useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(
    null,
  );
  const handleLogin = async (
    role: UserRole,
    credentials: any,
  ) => {
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      // Valid credentials for each role
      const validCredentials = {
        student: {
          email: "student@demo.com",
          password: "demo123",
        },
        faculty: {
          email: "faculty@demo.com",
          password: "demo123",
        },
        admin: { 
          email: "admin@demo.com", 
          password: "demo123" },
      };

      // Simulate initial validation delay
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Check if credentials match for the selected role
      const roleCredentials = validCredentials[role];
      if (
        credentials.email !== roleCredentials.email ||
        credentials.password !== roleCredentials.password
      ) {
        throw new Error(
          `Invalid credentials for ${role}. Please check your email and password.`,
        );
      }

      // Simulate authentication process
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Mock user data based on role with Indian names
      const mockUsers = {
        student: {
          role: "student" as const,
          name: "Jaypal Rathod",
          email: credentials.email,
          id: "STU001",
          avatar: "👨‍🎓",
        },
        faculty: {
          role: "faculty" as const,
          name: "Dr. Priya Sharma",
          email: credentials.email,
          id: "FAC001",
          avatar: "👩‍🏫",
        },
        admin: {
          role: "admin" as const,
          name: "Rajesh Kumar",
          email: credentials.email,
          id: "ADM001",
          avatar: "👨‍💼",
        },
      };

      // Final delay before dashboard load
      await new Promise((resolve) => setTimeout(resolve, 100));

      setUser(mockUsers[role]);
      setCurrentPage("dashboard");
      setLoginError(null);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.";
      setLoginError(errorMessage);
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("dashboard");
  };

  const renderCurrentPage = () => {
    if (!user) return null;

    switch (currentPage) {
      case "dashboard":
        switch (user.role) {
          case "student":
            return <StudentDashboard />;
          case "faculty":
            return <FacultyDashboard />;
          case "admin":
            return <AdminDashboard />;
          default:
            return <StudentDashboard />;
        }

      case "attendance":
        return <AttendancePage userRole={user.role} />;

      case "timetable":
        return <TimetablePage userRole={user.role} />;

      case "marks":
        return <MarksPage userRole={user.role} />;

      case "announcements":
        return <AnnouncementsPage userRole={user.role} />;

      case "students":
        return <StudentsPage userRole={user.role} />;

      case "faculty":
        return <FacultyPage userRole={user.role} />;

      case "courses":
        return <CoursesPage userRole={user.role} />;

      case "reports":
        return <ReportsPage userRole={user.role} />;

      case "settings":
        return <SettingsPage userRole={user.role} />;

      default:
        return user.role === "student" ? (
          <StudentDashboard />
        ) : user.role === "faculty" ? (
          <FacultyDashboard />
        ) : (
          <AdminDashboard />
        );
    }
  };

  if (!user) {
    return (
      <>
        <LoginPage
          onLogin={handleLogin}
          isLoggingIn={isLoggingIn}
        />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  return (
    <>
      <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
        <Sidebar
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          userRole={user.role}
          collapsed={sidebarCollapsed}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar
            userRole={user.role}
            userName={user.name}
            onMenuToggle={() =>
              setSidebarCollapsed(!sidebarCollapsed)
            }
            collapsed={sidebarCollapsed}
          />

          <main className="flex-1 overflow-auto">
            {renderCurrentPage()}
          </main>
        </div>
      </div>
      <Toaster position="top-right" richColors />
    </>
  );
}