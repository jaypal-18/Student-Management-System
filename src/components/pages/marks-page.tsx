import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Trophy, TrendingUp, TrendingDown, BookOpen, Award, Plus, Download, Upload, Search } from 'lucide-react';
import { Progress } from '../ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface MarksPageProps {
  userRole: 'student' | 'faculty' | 'admin';
}

// Mock data
const studentMarks = [
  { subject: 'DSA', test1: 85, test2: 92, midterm: 88, assignment: 90, total: 89, grade: 'A', credits: 4, maxMarks: 100 },
  { subject: 'Python', test1: 78, test2: 85, midterm: 82, assignment: 88, total: 83, grade: 'B+', credits: 4, maxMarks: 100 },
  { subject: 'DBMS', test1: 90, test2: 87, midterm: 85, assignment: 92, total: 88, grade: 'A-', credits: 4, maxMarks: 100 },
  { subject: 'Web Programming', test1: 95, test2: 91, midterm: 94, assignment: 96, total: 94, grade: 'A+', credits: 4, maxMarks: 100 },
  { subject: 'Android Development', test1: 82, test2: 88, midterm: 86, assignment: 85, total: 85, grade: 'B+', credits: 3, maxMarks: 100 },
];

const performanceData = [
  { month: 'Jan', average: 78 },
  { month: 'Feb', average: 82 },
  { month: 'Mar', average: 85 },
  { month: 'Apr', average: 83 },
  { month: 'May', average: 87 },
  { month: 'Jun', average: 89 }
];

const radarData = [
  { subject: 'DSA', A: 89, fullMark: 100 },
  { subject: 'Python', A: 83, fullMark: 100 },
  { subject: 'DBMS', A: 88, fullMark: 100 },
  { subject: 'Web Prog', A: 94, fullMark: 100 },
  { subject: 'Android', A: 85, fullMark: 100 }
];

const classStudents = [
  { id: 1, name: 'Aarav Sharma', rollNo: 'STU001', test1: null, test2: null, midterm: null, assignment: null },
  { id: 2, name: 'Priya Patel', rollNo: 'STU002', test1: 85, test2: null, midterm: null, assignment: 88 },
  { id: 3, name: 'Rohan Gupta', rollNo: 'STU003', test1: 92, test2: 89, midterm: null, assignment: 90 },
  { id: 4, name: 'Sneha Singh', rollNo: 'STU004', test1: 78, test2: null, midterm: 82, assignment: null },
  { id: 5, name: 'Arjun Kumar', rollNo: 'STU005', test1: 95, test2: 91, midterm: 94, assignment: 96 },
];

export function MarksPage({ userRole }: MarksPageProps) {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedAssessment, setSelectedAssessment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState(classStudents);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'bg-green-100 text-green-800';
      case 'A': return 'bg-green-100 text-green-700';
      case 'A-': return 'bg-green-100 text-green-600';
      case 'B+': return 'bg-blue-100 text-blue-800';
      case 'B': return 'bg-blue-100 text-blue-700';
      case 'B-': return 'bg-blue-100 text-blue-600';
      case 'C+': return 'bg-orange-100 text-orange-800';
      case 'C': return 'bg-orange-100 text-orange-700';
      default: return 'bg-red-100 text-red-800';
    }
  };

  const calculateGPA = () => {
    const totalCredits = studentMarks.reduce((sum, subject) => sum + subject.credits, 0);
    const weightedTotal = studentMarks.reduce((sum, subject) => {
      const gradePoints = getGradePoints(subject.grade);
      return sum + (gradePoints * subject.credits);
    }, 0);
    return (weightedTotal / totalCredits).toFixed(2);
  };

  const getGradePoints = (grade: string) => {
    const gradeMap: { [key: string]: number } = {
      'A+': 4.0, 'A': 3.7, 'A-': 3.3, 'B+': 3.0, 'B': 2.7, 'B-': 2.3,
      'C+': 2.0, 'C': 1.7, 'C-': 1.3, 'D': 1.0, 'F': 0.0
    };
    return gradeMap[grade] || 0;
  };

  const handleMarksUpdate = (studentId: number, assessment: string, marks: number) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, [assessment]: marks }
        : student
    ));
  };

  if (userRole === 'student') {
    return (
      <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">My Academic Results</h1>
            <p className="text-[#6B7280]">Track your performance across all subjects</p>
          </div>
          <Button className="bg-[#2F80ED] hover:bg-[#2A73D4]">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>

        {/* Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="rounded-xl shadow-sm border-0 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#333333]">{calculateGPA()}</p>
                  <p className="text-sm text-[#6B7280]">Current GPA</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm border-0 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#333333]">87.8%</p>
                  <p className="text-sm text-[#6B7280]">Overall Average</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm border-0 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#333333]">12</p>
                  <p className="text-sm text-[#6B7280]">Class Rank</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm border-0 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#333333]">19</p>
                  <p className="text-sm text-[#6B7280]">Total Credits</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Trend */}
          <Card className="rounded-xl shadow-sm border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Performance Trend
              </CardTitle>
              <CardDescription>Your academic progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="average" 
                      stroke="#2F80ED" 
                      strokeWidth={3}
                      dot={{ fill: '#2F80ED', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Subject Performance Radar */}
          <Card className="rounded-xl shadow-sm border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-green-600" />
                Subject Performance
              </CardTitle>
              <CardDescription>Performance across different subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Marks"
                      dataKey="A"
                      stroke="#2F80ED"
                      fill="#2F80ED"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Subject Results */}
        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              Detailed Subject Results
            </CardTitle>
            <CardDescription>Complete breakdown of your performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Test 1</TableHead>
                    <TableHead>Test 2</TableHead>
                    <TableHead>Midterm</TableHead>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Credits</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentMarks.map((subject, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{subject.subject}</TableCell>
                      <TableCell>{subject.test1}/100</TableCell>
                      <TableCell>{subject.test2}/100</TableCell>
                      <TableCell>{subject.midterm}/100</TableCell>
                      <TableCell>{subject.assignment}/100</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{subject.total}%</span>
                          <Progress value={subject.total} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getGradeColor(subject.grade)} text-xs`}>
                          {subject.grade}
                        </Badge>
                      </TableCell>
                      <TableCell>{subject.credits}</TableCell>
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

  if (userRole === 'faculty') {
    return (
      <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">Marks Management</h1>
            <p className="text-[#6B7280]">Upload and manage student marks</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import Marks
            </Button>
            <Button className="bg-[#2F80ED] hover:bg-[#2A73D4]">
              <Download className="w-4 h-4 mr-2" />
              Export Results
            </Button>
          </div>
        </div>

        {/* Selection Filters */}
        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle>Select Class and Assessment</CardTitle>
            <CardDescription>Choose the class and assessment type to manage marks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
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

              <Select value={selectedAssessment} onValueChange={setSelectedAssessment}>
                <SelectTrigger>
                  <SelectValue placeholder="Assessment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="test1">Test 1</SelectItem>
                  <SelectItem value="test2">Test 2</SelectItem>
                  <SelectItem value="midterm">Midterm Exam</SelectItem>
                  <SelectItem value="assignment">Assignment</SelectItem>
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

        {/* Marks Entry */}
        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Marks Entry
              </CardTitle>
              <CardDescription>Enter or update student marks</CardDescription>
            </div>
            <Button className="bg-[#27AE60] hover:bg-[#229954]">
              Save All Marks
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Test 1</TableHead>
                    <TableHead>Test 2</TableHead>
                    <TableHead>Midterm</TableHead>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.filter(student =>
                    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#2F80ED] to-[#27AE60] rounded-full flex items-center justify-center text-white text-sm">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-medium">{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{student.rollNo}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          placeholder="0-100"
                          value={student.test1 || ''}
                          onChange={(e) => handleMarksUpdate(student.id, 'test1', parseInt(e.target.value) || 0)}
                          className="w-20"
                          max="100"
                          min="0"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          placeholder="0-100"
                          value={student.test2 || ''}
                          onChange={(e) => handleMarksUpdate(student.id, 'test2', parseInt(e.target.value) || 0)}
                          className="w-20"
                          max="100"
                          min="0"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          placeholder="0-100"
                          value={student.midterm || ''}
                          onChange={(e) => handleMarksUpdate(student.id, 'midterm', parseInt(e.target.value) || 0)}
                          className="w-20"
                          max="100"
                          min="0"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          placeholder="0-100"
                          value={student.assignment || ''}
                          onChange={(e) => handleMarksUpdate(student.id, 'assignment', parseInt(e.target.value) || 0)}
                          className="w-20"
                          max="100"
                          min="0"
                        />
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Class Performance Summary */}
        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Class Performance Summary
            </CardTitle>
            <CardDescription>Overview of class performance in selected subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#333333]">85.4%</p>
                <p className="text-sm text-[#6B7280]">Class Average</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">92%</p>
                <p className="text-sm text-[#6B7280]">Highest Score</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">65%</p>
                <p className="text-sm text-[#6B7280]">Lowest Score</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">87%</p>
                <p className="text-sm text-[#6B7280]">Pass Rate</p>
              </div>
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
          <h1 className="text-3xl font-bold text-[#333333] mb-2">Academic Results Management</h1>
          <p className="text-[#6B7280]">Monitor and manage academic performance across the institution</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Assessment
          </Button>
          <Button className="bg-[#2F80ED] hover:bg-[#2A73D4]">
            <Download className="w-4 h-4 mr-2" />
            Generate Reports
          </Button>
        </div>
      </div>

      {/* Overall Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#333333]">83.2%</p>
                <p className="text-sm text-[#6B7280]">Overall Average</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#333333]">92%</p>
                <p className="text-sm text-[#6B7280]">Pass Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#333333]">+5.2%</p>
                <p className="text-sm text-[#6B7280]">Performance Growth</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#333333]">156</p>
                <p className="text-sm text-[#6B7280]">Honor Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <Card className="rounded-xl shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="w-5 h-5 text-blue-600" />
            Department-wise Performance
          </CardTitle>
          <CardDescription>Academic performance across different departments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { dept: 'Engineering', average: 87, passRate: 94 },
                { dept: 'Science', average: 85, passRate: 92 },
                { dept: 'Commerce', average: 82, passRate: 89 },
                { dept: 'Arts', average: 79, passRate: 87 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dept" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="average" fill="#2F80ED" name="Average %" />
                <Bar dataKey="passRate" fill="#27AE60" name="Pass Rate %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Performers and Improvement Needed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-gold-600" />
              Top Performers
            </CardTitle>
            <CardDescription>Students with excellent academic performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Aarav Sharma', class: 'CS-A', gpa: '3.95', rank: 1 },
                { name: 'Priya Patel', class: 'CS-B', gpa: '3.87', rank: 2 },
                { name: 'Rohan Gupta', class: 'CS-C', gpa: '3.82', rank: 3 },
                { name: 'Sneha Singh', class: 'CS-D', gpa: '3.78', rank: 4 },
              ].map((student, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#2F80ED] to-[#27AE60] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {student.rank}
                    </div>
                    <div>
                      <p className="font-medium text-[#333333]">{student.name}</p>
                      <p className="text-sm text-[#6B7280]">{student.class}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    GPA: {student.gpa}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-red-600" />
              Students Needing Support
            </CardTitle>
            <CardDescription>Students who may need additional academic support</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Karan Joshi', class: 'CS-E', gpa: '2.1', subjects: 3 },
                { name: 'Simran Verma', class: 'CS-F', gpa: '2.3', subjects: 2 },
                { name: 'Manish Agarwal', class: 'CS-G', gpa: '2.0', subjects: 4 },
                { name: 'Ritu Kapoor', class: 'CS-H', gpa: '2.4', subjects: 2 },
              ].map((student, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      !
                    </div>
                    <div>
                      <p className="font-medium text-[#333333]">{student.name}</p>
                      <p className="text-sm text-[#6B7280]">{student.class}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-red-100 text-red-800 mb-1">
                      GPA: {student.gpa}
                    </Badge>
                    <p className="text-xs text-[#6B7280]">{student.subjects} failing subjects</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}