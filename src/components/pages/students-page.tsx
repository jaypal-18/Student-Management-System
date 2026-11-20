import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { GraduationCap, Users, Search, Filter, Plus, Download, Edit, Eye, Mail, Phone } from 'lucide-react';

interface StudentsPageProps {
  userRole: 'student' | 'faculty' | 'admin';
}

// Mock students data
const students = [
  {
    id: 1,
    name: 'Aarav Sharma',
    rollNo: 'STU001',
    email: 'aarav.sharma@student.edu',
    phone: '+91-9876543201',
    class: 'CS-A',
    department: 'Computer Science',
    gpa: 3.85,
    attendance: 92,
    status: 'active',
    joinDate: '2021-08-15',
    avatar: ''
  },
  {
    id: 2,
    name: 'Priya Patel',
    rollNo: 'STU002',
    email: 'priya.patel@student.edu',
    phone: '+91-9876543202',
    class: 'CS-B',
    department: 'Computer Science',
    gpa: 3.42,
    attendance: 88,
    status: 'active',
    joinDate: '2022-08-20',
    avatar: ''
  },
  {
    id: 3,
    name: 'Rohan Gupta',
    rollNo: 'STU003',
    email: 'rohan.gupta@student.edu',
    phone: '+91-9876543203',
    class: 'CS-C',
    department: 'Computer Science',
    gpa: 3.78,
    attendance: 95,
    status: 'active',
    joinDate: '2023-08-18',
    avatar: ''
  },
  {
    id: 4,
    name: 'Sneha Singh',
    rollNo: 'STU004',
    email: 'sneha.singh@student.edu',
    phone: '+91-9876543204',
    class: 'CS-D',
    department: 'Computer Science',
    gpa: 3.12,
    attendance: 78,
    status: 'warning',
    joinDate: '2021-08-22',
    avatar: ''
  },
  {
    id: 5,
    name: 'Arjun Kumar',
    rollNo: 'STU005',
    email: 'arjun.kumar@student.edu',
    phone: '+91-9876543205',
    class: 'CS-E',
    department: 'Computer Science',
    gpa: 3.95,
    attendance: 97,
    status: 'active',
    joinDate: '2022-08-25',
    avatar: ''
  },
];

export function StudentsPage({ userRole }: StudentsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    const matchesDepartment = selectedDepartment === 'all' || student.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;
    
    return matchesSearch && matchesClass && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-orange-100 text-orange-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.5) return 'text-green-600';
    if (gpa >= 3.0) return 'text-blue-600';
    if (gpa >= 2.5) return 'text-orange-600';
    return 'text-red-600';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (userRole === 'faculty') {
    return (
      <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">My Students</h1>
            <p className="text-[#6B7280]">Manage and track your students' progress</p>
          </div>
          <Button className="bg-[#2F80ED] hover:bg-[#2A73D4]">
            <Download className="w-4 h-4 mr-2" />
            Export List
          </Button>
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
                  <p className="text-2xl font-bold text-[#333333]">{students.length}</p>
                  <p className="text-sm text-[#6B7280]">Total Students</p>
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
                  <p className="text-2xl font-bold text-[#333333]">3.6</p>
                  <p className="text-sm text-[#6B7280]">Average GPA</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm border-0 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#333333]">90%</p>
                  <p className="text-sm text-[#6B7280]">Avg Attendance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm border-0 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#333333]">1</p>
                  <p className="text-sm text-[#6B7280]">At Risk</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="All Classes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="Grade 10-A">Grade 10-A</SelectItem>
                  <SelectItem value="Grade 11-A">Grade 11-A</SelectItem>
                  <SelectItem value="Grade 12-A">Grade 12-A</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Commerce">Commerce</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Students List */}
        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Students List
            </CardTitle>
            <CardDescription>
              {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>GPA</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback className="bg-gradient-to-r from-[#2F80ED] to-[#27AE60] text-white text-sm">
                              {getInitials(student.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-[#333333]">{student.name}</p>
                            <p className="text-sm text-[#6B7280]">{student.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{student.rollNo}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>
                        <span className={`font-medium ${getGPAColor(student.gpa)}`}>
                          {student.gpa.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>{student.attendance}%</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(student.status)} text-xs capitalize`}>
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3" />
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
      </div>
    );
  }

  // Admin view
  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#333333] mb-2">Student Management</h1>
          <p className="text-[#6B7280]">Manage student records and information</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Import Students
          </Button>
          <Button className="bg-[#2F80ED] hover:bg-[#2A73D4]">
            <Plus className="w-4 h-4 mr-2" />
            Add Student
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
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#333333]">156</p>
                <p className="text-sm text-[#6B7280]">New This Year</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
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
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#333333]">23</p>
                <p className="text-sm text-[#6B7280]">Require Attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Complete table similar to faculty view but with more admin options */}
      <Card className="rounded-xl shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            All Students
          </CardTitle>
          <CardDescription>Comprehensive student directory and management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>GPA</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback className="bg-gradient-to-r from-[#2F80ED] to-[#27AE60] text-white text-sm">
                            {getInitials(student.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-[#333333]">{student.name}</p>
                          <p className="text-sm text-[#6B7280]">{student.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{student.rollNo}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>
                      <span className={`font-medium ${getGPAColor(student.gpa)}`}>
                        {student.gpa.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(student.status)} text-xs capitalize`}>
                        {student.status}
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
    </div>
  );
}