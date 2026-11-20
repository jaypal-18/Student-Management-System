import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { TrendingUp, Download, FileText, Users, GraduationCap, BookOpen, Calendar, Filter } from 'lucide-react';
import { useState } from 'react';

interface ReportsPageProps {
  userRole: 'student' | 'faculty' | 'admin';
}

// Mock data for various reports
const enrollmentTrend = [
  { month: 'Jan', students: 1180, faculty: 78 },
  { month: 'Feb', students: 1205, faculty: 80 },
  { month: 'Mar', students: 1220, faculty: 82 },
  { month: 'Apr', students: 1235, faculty: 83 },
  { month: 'May', students: 1250, faculty: 85 },
  { month: 'Jun', students: 1268, faculty: 85 }
];

const departmentPerformance = [
  { department: 'Engineering', avgGPA: 3.4, passRate: 92, students: 450 },
  { department: 'Science', avgGPA: 3.6, passRate: 95, students: 320 },
  { department: 'Commerce', avgGPA: 3.2, passRate: 88, students: 280 },
  { department: 'Arts', avgGPA: 3.1, passRate: 85, students: 200 }
];

const attendanceData = [
  { month: 'Jan', attendance: 87 },
  { month: 'Feb', attendance: 89 },
  { month: 'Mar', attendance: 85 },
  { month: 'Apr', attendance: 91 },
  { month: 'May', attendance: 88 },
  { month: 'Jun', attendance: 92 }
];

const gradeDistribution = [
  { grade: 'A+', count: 156, color: '#27AE60' },
  { grade: 'A', count: 234, color: '#2F80ED' },
  { grade: 'B+', count: 289, color: '#F2994A' },
  { grade: 'B', count: 312, color: '#9B59B6' },
  { grade: 'C+', count: 178, color: '#E74C3C' },
  { grade: 'C', count: 81, color: '#95A5A6' }
];

const facultyWorkload = [
  { name: 'Dr. Smith', hours: 18, courses: 4, students: 120 },
  { name: 'Prof. Johnson', hours: 16, courses: 3, students: 95 },
  { name: 'Dr. Brown', hours: 15, courses: 3, students: 88 },
  { name: 'Dr. Wilson', hours: 17, courses: 4, students: 110 },
  { name: 'Prof. Miller', hours: 14, courses: 3, students: 82 }
];

export function ReportsPage({ userRole }: ReportsPageProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedReportType, setSelectedReportType] = useState('overview');

  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#333333] mb-2">Analytics & Reports</h1>
          <p className="text-[#6B7280]">Comprehensive insights and data analysis</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Custom Filter
          </Button>
          <Button className="bg-[#2F80ED] hover:bg-[#2A73D4]">
            <Download className="w-4 h-4 mr-2" />
            Export Reports
          </Button>
        </div>
      </div>

      {/* Report Controls */}
      <Card className="rounded-xl shadow-sm border-0 bg-white">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedReportType} onValueChange={setSelectedReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Overview Report</SelectItem>
                <SelectItem value="academic">Academic Performance</SelectItem>
                <SelectItem value="attendance">Attendance Report</SelectItem>
                <SelectItem value="financial">Financial Report</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger>
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="commerce">Commerce</SelectItem>
                <SelectItem value="arts">Arts</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-[#27AE60] hover:bg-[#229954]">
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#333333]">1,250</p>
                <p className="text-sm text-[#6B7280]">Total Students</p>
                <p className="text-xs text-green-600">+5.2% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#333333]">89.5%</p>
                <p className="text-sm text-[#6B7280]">Average Attendance</p>
                <p className="text-xs text-green-600">+2.1% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#333333]">3.45</p>
                <p className="text-sm text-[#6B7280]">Average GPA</p>
                <p className="text-xs text-green-600">+0.08 from last semester</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#333333]">92%</p>
                <p className="text-sm text-[#6B7280]">Pass Rate</p>
                <p className="text-xs text-green-600">+1.5% from last year</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trend */}
        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Enrollment Trends
            </CardTitle>
            <CardDescription>Student and faculty growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={enrollmentTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="students"
                    stackId="1"
                    stroke="#2F80ED"
                    fill="#2F80ED"
                    fillOpacity={0.6}
                    name="Students"
                  />
                  <Area
                    type="monotone"
                    dataKey="faculty"
                    stackId="2"
                    stroke="#27AE60"
                    fill="#27AE60"
                    fillOpacity={0.6}
                    name="Faculty"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-600" />
              Department Performance
            </CardTitle>
            <CardDescription>GPA and pass rates by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="avgGPA" fill="#2F80ED" name="Average GPA" />
                  <Bar yAxisId="right" dataKey="passRate" fill="#27AE60" name="Pass Rate %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trend */}
        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              Attendance Trends
            </CardTitle>
            <CardDescription>Monthly attendance percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="attendance"
                    stroke="#F2994A"
                    strokeWidth={3}
                    dot={{ fill: '#F2994A', strokeWidth: 2, r: 4 }}
                    name="Attendance %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-600" />
              Grade Distribution
            </CardTitle>
            <CardDescription>Distribution of grades across all courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {gradeDistribution.map((grade, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: grade.color }}></div>
                  <span className="text-sm text-[#6B7280]">{grade.grade}: {grade.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Faculty Workload Report */}
      <Card className="rounded-xl shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Faculty Workload Analysis
          </CardTitle>
          <CardDescription>Teaching hours and student load distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3 font-medium text-[#333333]">Faculty</th>
                  <th className="text-left p-3 font-medium text-[#333333]">Teaching Hours</th>
                  <th className="text-left p-3 font-medium text-[#333333]">Courses</th>
                  <th className="text-left p-3 font-medium text-[#333333]">Students</th>
                  <th className="text-left p-3 font-medium text-[#333333]">Workload Status</th>
                </tr>
              </thead>
              <tbody>
                {facultyWorkload.map((faculty, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="p-3 font-medium text-[#333333]">{faculty.name}</td>
                    <td className="p-3 text-[#6B7280]">{faculty.hours}h/week</td>
                    <td className="p-3 text-[#6B7280]">{faculty.courses}</td>
                    <td className="p-3 text-[#6B7280]">{faculty.students}</td>
                    <td className="p-3">
                      <Badge className={`text-xs ${
                        faculty.hours >= 18 ? 'bg-red-100 text-red-800' :
                        faculty.hours >= 16 ? 'bg-orange-100 text-orange-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {faculty.hours >= 18 ? 'Heavy' : faculty.hours >= 16 ? 'Moderate' : 'Light'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Report Export Options */}
      <Card className="rounded-xl shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-600" />
            Export Reports
          </CardTitle>
          <CardDescription>Download detailed reports in various formats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 border-2 rounded-xl hover:bg-gray-50">
              <div className="text-center">
                <FileText className="w-6 h-6 mx-auto mb-1" />
                <p className="text-sm">Academic Report</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-16 border-2 rounded-xl hover:bg-gray-50">
              <div className="text-center">
                <Users className="w-6 h-6 mx-auto mb-1" />
                <p className="text-sm">Attendance Report</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-16 border-2 rounded-xl hover:bg-gray-50">
              <div className="text-center">
                <GraduationCap className="w-6 h-6 mx-auto mb-1" />
                <p className="text-sm">Faculty Report</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-16 border-2 rounded-xl hover:bg-gray-50">
              <div className="text-center">
                <TrendingUp className="w-6 h-6 mx-auto mb-1" />
                <p className="text-sm">Financial Report</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}