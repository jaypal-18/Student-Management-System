import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Users, GraduationCap, BookOpen, Plus, Download, Edit, Eye, Mail, Phone } from 'lucide-react';

interface FacultyPageProps {
  userRole: 'student' | 'faculty' | 'admin';
}

// Mock faculty data
const facultyMembers = [
  {
    id: 1,
    name: 'Dr. John Smith',
    email: 'john.smith@edu.com',
    phone: '+1-234-567-1001',
    department: 'Mathematics',
    designation: 'Professor',
    experience: '15 years',
    qualification: 'Ph.D. Mathematics',
    subjects: ['Calculus', 'Algebra', 'Statistics'],
    classes: ['Grade 10-A', 'Grade 11-A', 'Grade 12-A'],
    totalStudents: 90,
    workload: 18,
    status: 'active',
    joinDate: '2010-08-15',
    avatar: ''
  },
  {
    id: 2,
    name: 'Prof. Sarah Johnson',
    email: 'sarah.johnson@edu.com',
    phone: '+1-234-567-1002',
    department: 'Physics',
    designation: 'Associate Professor',
    experience: '12 years',
    qualification: 'Ph.D. Physics',
    subjects: ['Mechanics', 'Thermodynamics', 'Optics'],
    classes: ['Grade 11-B', 'Grade 12-B'],
    totalStudents: 65,
    workload: 15,
    status: 'active',
    joinDate: '2012-09-01',
    avatar: ''
  },
  {
    id: 3,
    name: 'Dr. Michael Brown',
    email: 'michael.brown@edu.com',
    phone: '+1-234-567-1003',
    department: 'Chemistry',
    designation: 'Assistant Professor',
    experience: '8 years',
    qualification: 'Ph.D. Chemistry',
    subjects: ['Organic Chemistry', 'Inorganic Chemistry'],
    classes: ['Grade 11-A', 'Grade 12-A'],
    totalStudents: 58,
    workload: 12,
    status: 'active',
    joinDate: '2016-07-20',
    avatar: ''
  },
  {
    id: 4,
    name: 'Dr. Emily Wilson',
    email: 'emily.wilson@edu.com',
    phone: '+1-234-567-1004',
    department: 'Biology',
    designation: 'Professor',
    experience: '20 years',
    qualification: 'Ph.D. Biology',
    subjects: ['Botany', 'Zoology', 'Genetics'],
    classes: ['Grade 10-B', 'Grade 11-B', 'Grade 12-B'],
    totalStudents: 85,
    workload: 16,
    status: 'active',
    joinDate: '2004-08-30',
    avatar: ''
  },
  {
    id: 5,
    name: 'Prof. David Miller',
    email: 'david.miller@edu.com',
    phone: '+1-234-567-1005',
    department: 'English',
    designation: 'Associate Professor',
    experience: '10 years',
    qualification: 'M.A. English Literature',
    subjects: ['Literature', 'Grammar', 'Composition'],
    classes: ['Grade 10-A', 'Grade 10-B'],
    totalStudents: 72,
    workload: 14,
    status: 'on_leave',
    joinDate: '2014-06-15',
    avatar: ''
  }
];

export function FacultyPage({ userRole }: FacultyPageProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'on_leave': return 'bg-orange-100 text-orange-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWorkloadColor = (workload: number) => {
    if (workload >= 18) return 'text-red-600';
    if (workload >= 15) return 'text-orange-600';
    return 'text-green-600';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#333333] mb-2">Faculty Management</h1>
          <p className="text-[#6B7280]">Manage faculty members and their assignments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export List
          </Button>
          <Button className="bg-[#2F80ED] hover:bg-[#2A73D4]">
            <Plus className="w-4 h-4 mr-2" />
            Add Faculty
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#333333]">85</p>
                <p className="text-sm text-[#6B7280]">Total Faculty</p>
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
                <p className="text-2xl font-bold text-[#333333]">78</p>
                <p className="text-sm text-[#6B7280]">Active Faculty</p>
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
                <p className="text-2xl font-bold text-[#333333]">15.2</p>
                <p className="text-sm text-[#6B7280]">Avg. Hours/Week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#333333]">7</p>
                <p className="text-sm text-[#6B7280]">On Leave</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Department Distribution
            </CardTitle>
            <CardDescription>Faculty distribution across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { dept: 'Engineering', count: 25, percentage: 29 },
                { dept: 'Science', count: 20, percentage: 24 },
                { dept: 'Commerce', count: 18, percentage: 21 },
                { dept: 'Arts', count: 15, percentage: 18 },
                { dept: 'Management', count: 7, percentage: 8 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#2F80ED] rounded-full"></div>
                    <span className="text-sm font-medium text-[#333333]">{item.dept}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#6B7280]">{item.count} faculty</span>
                    <Badge variant="outline" className="text-xs">
                      {item.percentage}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-green-600" />
              Qualification Breakdown
            </CardTitle>
            <CardDescription>Faculty qualifications overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { qualification: 'Ph.D.', count: 45, percentage: 53 },
                { qualification: 'M.Phil.', count: 25, percentage: 29 },
                { qualification: 'Masters', count: 15, percentage: 18 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#27AE60] rounded-full"></div>
                    <span className="text-sm font-medium text-[#333333]">{item.qualification}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#6B7280]">{item.count} faculty</span>
                    <Badge variant="outline" className="text-xs">
                      {item.percentage}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Faculty List */}
      <Card className="rounded-xl shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Faculty Directory
          </CardTitle>
          <CardDescription>Complete list of faculty members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Workload</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facultyMembers.map((faculty) => (
                  <TableRow key={faculty.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={faculty.avatar} alt={faculty.name} />
                          <AvatarFallback className="bg-gradient-to-r from-[#2F80ED] to-[#27AE60] text-white">
                            {getInitials(faculty.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-[#333333]">{faculty.name}</p>
                          <p className="text-sm text-[#6B7280]">{faculty.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{faculty.department}</TableCell>
                    <TableCell>{faculty.designation}</TableCell>
                    <TableCell>{faculty.experience}</TableCell>
                    <TableCell>
                      <span className={`font-medium ${getWorkloadColor(faculty.workload)}`}>
                        {faculty.workload}h/week
                      </span>
                    </TableCell>
                    <TableCell>{faculty.totalStudents}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(faculty.status)} text-xs`}>
                        {faculty.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Faculty Performance */}
      <Card className="rounded-xl shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-purple-600" />
            Faculty Performance Overview
          </CardTitle>
          <CardDescription>Key performance indicators for faculty members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">4.2/5</p>
              <p className="text-sm text-[#6B7280]">Average Rating</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">92%</p>
              <p className="text-sm text-[#6B7280]">Course Completion</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">87%</p>
              <p className="text-sm text-[#6B7280]">Student Satisfaction</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}