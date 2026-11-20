import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { BookOpen, Users, Clock, Plus, Download, Edit, Eye, Search, Filter } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useState } from 'react';

interface CoursesPageProps {
  userRole: 'student' | 'faculty' | 'admin';
}

// Mock courses data
const courses = [
  {
    id: 1,
    code: 'MATH101',
    name: 'Introduction to Calculus',
    department: 'Mathematics',
    credits: 4,
    duration: '16 weeks',
    faculty: 'Dr. John Smith',
    enrolledStudents: 45,
    maxCapacity: 50,
    status: 'active',
    schedule: 'Mon, Wed, Fri - 9:00 AM',
    room: 'Room 101',
    description: 'Basic concepts of differential and integral calculus',
    prerequisites: ['Algebra', 'Trigonometry']
  },
  {
    id: 2,
    code: 'PHYS201',
    name: 'Classical Mechanics',
    department: 'Physics',
    credits: 4,
    duration: '16 weeks',
    faculty: 'Prof. Sarah Johnson',
    enrolledStudents: 32,
    maxCapacity: 35,
    status: 'active',
    schedule: 'Tue, Thu - 11:00 AM',
    room: 'Lab 201',
    description: 'Fundamental principles of classical mechanics and motion',
    prerequisites: ['Physics I', 'Calculus']
  },
  {
    id: 3,
    code: 'CHEM301',
    name: 'Organic Chemistry',
    department: 'Chemistry',
    credits: 5,
    duration: '16 weeks',
    faculty: 'Dr. Michael Brown',
    enrolledStudents: 28,
    maxCapacity: 30,
    status: 'active',
    schedule: 'Mon, Wed, Fri - 2:00 PM',
    room: 'Lab 301',
    description: 'Study of carbon compounds and their reactions',
    prerequisites: ['General Chemistry', 'Chemical Bonding']
  },
  {
    id: 4,
    code: 'BIOL401',
    name: 'Advanced Genetics',
    department: 'Biology',
    credits: 4,
    duration: '16 weeks',
    faculty: 'Dr. Emily Wilson',
    enrolledStudents: 22,
    maxCapacity: 25,
    status: 'active',
    schedule: 'Tue, Thu - 2:00 PM',
    room: 'Lab 101',
    description: 'Advanced concepts in molecular genetics and genomics',
    prerequisites: ['Biology II', 'Cell Biology']
  },
  {
    id: 5,
    code: 'ENG102',
    name: 'English Literature',
    department: 'English',
    credits: 3,
    duration: '16 weeks',
    faculty: 'Prof. David Miller',
    enrolledStudents: 38,
    maxCapacity: 40,
    status: 'completed',
    schedule: 'Mon, Wed - 10:00 AM',
    room: 'Room 205',
    description: 'Survey of English literature from medieval to modern times',
    prerequisites: ['English I']
  }
];

export function CoursesPage({ userRole }: CoursesPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.faculty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || course.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || course.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'upcoming': return 'bg-orange-100 text-orange-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEnrollmentColor = (enrolled: number, capacity: number) => {
    const percentage = (enrolled / capacity) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#333333] mb-2">Course Management</h1>
          <p className="text-[#6B7280]">Manage courses, schedules, and enrollments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Courses
          </Button>
          <Button className="bg-[#2F80ED] hover:bg-[#2A73D4]">
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#333333]">45</p>
                <p className="text-sm text-[#6B7280]">Total Courses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#333333]">38</p>
                <p className="text-sm text-[#6B7280]">Active Courses</p>
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
                <p className="text-2xl font-bold text-[#333333]">1,250</p>
                <p className="text-sm text-[#6B7280]">Total Enrollments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#333333]">85%</p>
                <p className="text-sm text-[#6B7280]">Average Capacity</p>
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
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select 
              value={selectedDepartment} 
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Departments</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="English">English</option>
            </select>
            
            <select 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="upcoming">Upcoming</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Department Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Department Distribution
            </CardTitle>
            <CardDescription>Courses offered by each department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { dept: 'Mathematics', courses: 12, students: 420 },
                { dept: 'Physics', courses: 8, students: 280 },
                { dept: 'Chemistry', courses: 10, students: 350 },
                { dept: 'Biology', courses: 9, students: 320 },
                { dept: 'English', courses: 6, students: 240 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#2F80ED] rounded-full"></div>
                    <span className="font-medium text-[#333333]">{item.dept}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#333333]">{item.courses} courses</p>
                    <p className="text-xs text-[#6B7280]">{item.students} students</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              Enrollment Statistics
            </CardTitle>
            <CardDescription>Course enrollment overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-lg font-bold text-green-600">1,250</p>
                  <p className="text-xs text-[#6B7280]">Total Enrolled</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-lg font-bold text-blue-600">1,470</p>
                  <p className="text-xs text-[#6B7280]">Total Capacity</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-lg font-bold text-orange-600">85%</p>
                  <p className="text-xs text-[#6B7280]">Utilization</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Full Courses (90%+)</span>
                  <span className="font-medium">8 courses</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>High Enrollment (75-90%)</span>
                  <span className="font-medium">15 courses</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Moderate Enrollment (&lt;75%)</span>
                  <span className="font-medium">22 courses</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses List */}
      <Card className="rounded-xl shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Course Directory
          </CardTitle>
          <CardDescription>
            {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Enrollment</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-[#333333]">{course.name}</p>
                        <p className="text-sm text-[#6B7280]">{course.code} • {course.department}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-[#333333]">{course.faculty}</p>
                      <p className="text-xs text-[#6B7280]">{course.room}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {course.credits} credits
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${getEnrollmentColor(course.enrolledStudents, course.maxCapacity)}`}>
                          {course.enrolledStudents}/{course.maxCapacity}
                        </p>
                        <p className="text-xs text-[#6B7280]">
                          {Math.round((course.enrolledStudents / course.maxCapacity) * 100)}% full
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-[#333333]">{course.schedule}</p>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(course.status)} text-xs capitalize`}>
                        {course.status}
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
                          <Users className="w-3 h-3" />
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

      {/* Course Details Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.slice(0, 6).map((course) => (
          <Card key={course.id} className="rounded-xl shadow-sm border-0 bg-white hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{course.name}</CardTitle>
                  <CardDescription>{course.code} • {course.department}</CardDescription>
                </div>
                <Badge className={`${getStatusColor(course.status)} text-xs`}>
                  {course.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">Faculty:</span>
                  <span className="text-sm font-medium text-[#333333]">{course.faculty}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">Credits:</span>
                  <span className="text-sm font-medium text-[#333333]">{course.credits}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">Enrollment:</span>
                  <span className={`text-sm font-medium ${getEnrollmentColor(course.enrolledStudents, course.maxCapacity)}`}>
                    {course.enrolledStudents}/{course.maxCapacity}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">Schedule:</span>
                  <span className="text-sm font-medium text-[#333333]">{course.schedule}</span>
                </div>
                <p className="text-sm text-[#6B7280] pt-2 border-t border-gray-100">
                  {course.description}
                </p>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}