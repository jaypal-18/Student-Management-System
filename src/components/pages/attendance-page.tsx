import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar } from '../ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Calendar as CalendarIcon, Users, CheckCircle, XCircle, Clock, Filter, Download, Search } from 'lucide-react';

interface AttendancePageProps {
  userRole: 'student' | 'faculty' | 'admin';
}

// Mock data
const studentAttendanceData = [
  { date: '2024-01-15', subject: 'DSA', status: 'present', time: '09:00 AM' },
  { date: '2024-01-15', subject: 'Python', status: 'present', time: '11:00 AM' },
  { date: '2024-01-15', subject: 'DBMS', status: 'absent', time: '02:00 PM' },
  { date: '2024-01-16', subject: 'DSA', status: 'present', time: '09:00 AM' },
  { date: '2024-01-16', subject: 'Python', status: 'late', time: '11:00 AM' },
  { date: '2024-01-17', subject: 'Web Programming', status: 'present', time: '10:00 AM' },
];

const studentsList = [
  { id: 1, name: 'Aarav Sharma', rollNo: 'STU001', status: null },
  { id: 2, name: 'Priya Patel', rollNo: 'STU002', status: null },
  { id: 3, name: 'Rohan Gupta', rollNo: 'STU003', status: null },
  { id: 4, name: 'Sneha Singh', rollNo: 'STU004', status: null },
  { id: 5, name: 'Arjun Kumar', rollNo: 'STU005', status: null },
  { id: 6, name: 'Kavya Reddy', rollNo: 'STU006', status: null },
  { id: 7, name: 'Vikram Joshi', rollNo: 'STU007', status: null },
  { id: 8, name: 'Ananya Mehta', rollNo: 'STU008', status: null },
];

const classSchedule = [
  { id: 1, subject: 'DSA', class: 'CS-A', time: '09:00 AM', room: 'Room 101' },
  { id: 2, subject: 'Python', class: 'CS-B', time: '11:00 AM', room: 'Lab 201' },
  { id: 3, subject: 'DBMS', class: 'CS-C', time: '02:00 PM', room: 'Lab 301' },
];

export function AttendancePage({ userRole }: AttendancePageProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [students, setStudents] = useState(studentsList.map(s => ({ ...s, status: 'present' as 'present' | 'absent' | 'late' | null })));
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4" />;
      case 'absent': return <XCircle className="w-4 h-4" />;
      case 'late': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  const handleAttendanceChange = (studentId: number, status: 'present' | 'absent' | 'late') => {
    setStudents(prev => prev.map(student => 
      student.id === studentId ? { ...student, status } : student
    ));
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (userRole === 'student') {
    return (
      <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#333333] mb-2">My Attendance</h1>
          <p className="text-[#6B7280]">Track your attendance across all subjects</p>
        </div>

        {/* Attendance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="rounded-xl shadow-sm border-0 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#333333]">85%</p>
                  <p className="text-sm text-[#6B7280]">Overall Attendance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm border-0 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <CalendarIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#333333]">127</p>
                  <p className="text-sm text-[#6B7280]">Classes Attended</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm border-0 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#333333]">23</p>
                  <p className="text-sm text-[#6B7280]">Classes Missed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar View */}
          <Card className="rounded-xl shadow-sm border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-blue-600" />
                Attendance Calendar
              </CardTitle>
              <CardDescription>Monthly attendance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
              <div className="flex items-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Present</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Absent</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Late</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Attendance */}
          <Card className="rounded-xl shadow-sm border-0 bg-white">
            <CardHeader>
              <CardTitle>Recent Attendance</CardTitle>
              <CardDescription>Your attendance for recent classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentAttendanceData.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(record.status)}
                      <div>
                        <p className="font-medium text-[#333333]">{record.subject}</p>
                        <p className="text-sm text-[#6B7280]">{record.date} • {record.time}</p>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(record.status)} text-xs capitalize`}>
                      {record.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (userRole === 'faculty') {
    return (
      <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">Take Attendance</h1>
            <p className="text-[#6B7280]">Mark attendance for your classes</p>
          </div>
          <Button className="bg-[#2F80ED] hover:bg-[#2A73D4]">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Class Selection */}
        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle>Select Class</CardTitle>
            <CardDescription>Choose the class for attendance marking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dsa">DSA</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="dbms">DBMS</SelectItem>
                  <SelectItem value="web">Web Programming</SelectItem>
                  <SelectItem value="android">Android Development</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10a">Grade 10-A</SelectItem>
                  <SelectItem value="10b">Grade 10-B</SelectItem>
                  <SelectItem value="11a">Grade 11-A</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Student List */}
        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Student List
              </CardTitle>
              <CardDescription>Mark attendance for each student</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Mark All Present</Button>
              <Button className="bg-[#27AE60] hover:bg-[#229954]" size="sm">Save Attendance</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#2F80ED] to-[#27AE60] rounded-full flex items-center justify-center text-white font-medium">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-[#333333]">{student.name}</p>
                      <p className="text-sm text-[#6B7280]">Roll No: {student.rollNo}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={student.status === 'present' ? 'default' : 'outline'}
                      className={student.status === 'present' ? 'bg-green-600 hover:bg-green-700' : ''}
                      onClick={() => handleAttendanceChange(student.id, 'present')}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Present
                    </Button>
                    
                    <Button
                      size="sm"
                      variant={student.status === 'absent' ? 'default' : 'outline'}
                      className={student.status === 'absent' ? 'bg-red-600 hover:bg-red-700' : ''}
                      onClick={() => handleAttendanceChange(student.id, 'absent')}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Absent
                    </Button>
                    
                    <Button
                      size="sm"
                      variant={student.status === 'late' ? 'default' : 'outline'}
                      className={student.status === 'late' ? 'bg-orange-600 hover:bg-orange-700' : ''}
                      onClick={() => handleAttendanceChange(student.id, 'late')}
                    >
                      <Clock className="w-4 h-4 mr-1" />
                      Late
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin view
  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#333333] mb-2">Attendance Management</h1>
          <p className="text-[#6B7280]">Overview of attendance across all classes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-[#2F80ED] hover:bg-[#2A73D4]">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#333333]">1,250</p>
                <p className="text-sm text-[#6B7280]">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#333333]">87%</p>
                <p className="text-sm text-[#6B7280]">Average Attendance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#333333]">156</p>
                <p className="text-sm text-[#6B7280]">Late Arrivals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#333333]">13%</p>
                <p className="text-sm text-[#6B7280]">Absenteeism Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Class-wise Attendance */}
      <Card className="rounded-xl shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle>Class-wise Attendance Summary</CardTitle>
          <CardDescription>Attendance overview for all classes today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {classSchedule.map((class_) => (
              <div key={class_.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#2F80ED] to-[#27AE60] rounded-xl flex items-center justify-center text-white">
                    <CalendarIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#333333]">{class_.subject}</h4>
                    <p className="text-sm text-[#6B7280]">{class_.class} • {class_.room} • {class_.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">28 Present</p>
                    <p className="text-sm text-red-600">2 Absent</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">93%</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}