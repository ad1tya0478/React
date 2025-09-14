import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, BookOpen, FileText, BarChart3, Bell, LogOut, ArrowLeft, Download } from 'lucide-react';

// Import your AIChatbot component here
import AIChatbot from './Redesigned';

const StudentPortal = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hello! I'm your student assistant. How can I help you today?", sender: 'bot', timestamp: new Date().toLocaleTimeString() }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [formData, setFormData] = useState({ rollNumber: '', password: '' });
  
  const chatMessagesRef = useRef(null);

  // Auto-scroll chat messages
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Student data
  const studentData = {
    name: 'Rahul Kumar',
    rollNumber: 'ITM123',
    course: 'B.Tech Computer Science',
    year: '3rd Year',
    semester: '6th Semester'
  };

  // Course data
  const courses = [
    {
      title: 'Object-Oriented Programming (Java)',
      code: 'CS301',
      credits: 4,
      instructor: 'Dr. Priya Sharma',
      materials: ['Unit 1 Notes', 'Unit 2 Notes', 'Unit 3 Notes', 'PPT Slides', 'Lab Manual']
    },
    {
      title: 'Indian Constitution',
      code: 'HS201',
      credits: 2,
      instructor: 'Prof. Amit Verma',
      materials: ['Constitution PDF', 'Fundamental Rights', 'Amendments', 'Case Studies', 'Sample Questions']
    },
    {
      title: 'Advanced Mathematics',
      code: 'MA301',
      credits: 4,
      instructor: 'Dr. Suresh Kumar',
      materials: ['Calculus Notes', 'Linear Algebra', 'Differential Equations', 'Formula Sheet', 'Previous Papers']
    }
  ];

  // Assignment data
  const assignments = [
    { id: 1, title: 'Java Programming Assignment 3', course: 'OOPS Java', dueDate: '2025-09-20', status: 'Pending' },
    { id: 2, title: 'Constitution Essay', course: 'Indian Constitution', dueDate: '2025-09-18', status: 'Submitted' },
    { id: 3, title: 'Calculus Problem Set 5', course: 'Advanced Mathematics', dueDate: '2025-09-25', status: 'Pending' },
    { id: 4, title: 'Database Design Project', course: 'DBMS', dueDate: '2025-09-30', status: 'In Progress' }
  ];

  // Attendance data
  const attendanceData = [
    { subject: 'OOPS Java', total: 45, present: 42, absent: 3, percentage: 93.3 },
    { subject: 'Indian Constitution', total: 30, present: 28, absent: 2, percentage: 93.3 },
    { subject: 'Advanced Mathematics', total: 50, present: 38, absent: 12, percentage: 76.0 },
    { subject: 'DBMS', total: 40, present: 36, absent: 4, percentage: 90.0 }
  ];

  // Marks data
  const marksData = [
    { subject: 'OOPS Java', internal: 35, semester: 52, total: 87, grade: 'A' },
    { subject: 'Indian Constitution', internal: 32, semester: 48, total: 80, grade: 'A' },
    { subject: 'Advanced Mathematics', internal: 28, semester: 41, total: 69, grade: 'B' },
    { subject: 'DBMS', internal: 33, semester: 49, total: 82, grade: 'A' }
  ];

  // Circulars data
  const circulars = [
    { id: 1, title: 'End Semester Examination Timetable', date: 'September 10, 2025', category: 'Examinations' },
    { id: 2, title: 'Scholarship Application Deadline', date: 'September 8, 2025', category: 'Financial Aid' },
    { id: 3, title: 'Industrial Visit Permission Form', date: 'September 5, 2025', category: 'Academic' },
    { id: 4, title: 'Library Fine Waiver Notice', date: 'September 3, 2025', category: 'Library' },
    { id: 5, title: 'Campus Placement Drive Schedule', date: 'September 1, 2025', category: 'Placements' },
    { id: 6, title: 'Student ID Card Renewal Process', date: 'August 28, 2025', category: 'Administration' }
  ];

  // Login handler
  const handleLogin = () => {
    if (formData.rollNumber === 'ITM123' && formData.password === '12345') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Please use Roll Number: ITM123 and Password: 12345');
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
    setFormData({ rollNumber: '', password: '' });
    setLoginError('');
  };

  // Chat functions
  const sendChatMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: chatInput,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages(prev => [...prev, userMessage]);

    // Generate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(chatInput);
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, botMessage]);
    }, 1000);

    setChatInput('');
  };

  const generateBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('attendance')) {
      return "You can check your attendance in the Attendance & Marks section. Your overall attendance is looking good!";
    } else if (lowerMessage.includes('assignment')) {
      return "You have pending assignments in Java and Mathematics. Check the Assignments section for details.";
    } else if (lowerMessage.includes('marks') || lowerMessage.includes('result')) {
      return "Your results are available in the Attendance & Marks section. Great job on your grades!";
    } else if (lowerMessage.includes('course')) {
      return "You can find all course materials including notes and PPTs in the Courses section.";
    } else if (lowerMessage.includes('circular') || lowerMessage.includes('notice')) {
      return "Check the Circulars section for the latest announcements including exam timetables and scholarship deadlines.";
    }
    return "I'm here to help! This is a placeholder chatbot. You can replace this with your real chatbot implementation.";
  };

  const handleChatKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendChatMessage();
    }
  };

  // Login Page Component
  const LoginPage = () => (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md border border-gray-200">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Portal</h1>
          <p className="text-gray-600">Welcome back! Please login to your account.</p>
        </div>
        
        <div className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Roll Number</label>
            <input
              type="text"
              value={formData.rollNumber}
              onChange={(e) => setFormData({...formData, rollNumber: e.target.value})}
              placeholder="Enter your roll number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
              required
            />
          </div>
          
          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-all duration-200 hover:transform hover:-translate-y-0.5"
          >
            Login
          </button>
          
          {loginError && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">{loginError}</div>
          )}
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
          <p><strong>Demo Credentials:</strong></p>
          <p>Roll Number: ITM123</p>
          <p>Password: 12345</p>
        </div>
      </div>
    </div>
  );

  // Header Component
  const Header = ({ title }) => (
    <div className="bg-white border-b border-gray-200 shadow-sm p-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <button
        onClick={handleLogout}
        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
      >
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </button>
    </div>
  );

  // Dashboard Component
  const Dashboard = () => (
    <div>
      <Header title="Student Dashboard" />
      <div className="p-8 bg-gray-50 min-h-screen">
        {/* Student Info */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-xl mb-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Welcome, {studentData.name}!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
              <strong className="block text-sm opacity-80 mb-1">Roll Number</strong>
              {studentData.rollNumber}
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
              <strong className="block text-sm opacity-80 mb-1">Course</strong>
              {studentData.course}
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
              <strong className="block text-sm opacity-80 mb-1">Year</strong>
              {studentData.year}
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
              <strong className="block text-sm opacity-80 mb-1">Semester</strong>
              {studentData.semester}
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            onClick={() => setCurrentPage('courses')}
            className="bg-white border border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-blue-300 hover:shadow-lg hover:transform hover:-translate-y-1 transition-all"
          >
            <BookOpen className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="font-bold text-gray-800 mb-2">Courses</h3>
            <p className="text-gray-600 text-sm">View course materials, notes, and PPTs</p>
          </div>
          
          <div
            onClick={() => setCurrentPage('assignments')}
            className="bg-white border border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-blue-300 hover:shadow-lg hover:transform hover:-translate-y-1 transition-all"
          >
            <FileText className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="font-bold text-gray-800 mb-2">Assignments</h3>
            <p className="text-gray-600 text-sm">Submit assignments and view deadlines</p>
          </div>
          
          <div
            onClick={() => setCurrentPage('attendance')}
            className="bg-white border border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-blue-300 hover:shadow-lg hover:transform hover:-translate-y-1 transition-all"
          >
            <BarChart3 className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="font-bold text-gray-800 mb-2">Attendance & Marks</h3>
            <p className="text-gray-600 text-sm">Check your attendance and exam results</p>
          </div>
          
          <div
            onClick={() => setCurrentPage('circulars')}
            className="bg-white border border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-blue-300 hover:shadow-lg hover:transform hover:-translate-y-1 transition-all"
          >
            <Bell className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="font-bold text-gray-800 mb-2">Circulars</h3>
            <p className="text-gray-600 text-sm">Important notices and announcements</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Courses Page
  const CoursesPage = () => (
    <div>
      <Header title="My Courses" />
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Course Materials</h2>
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{course.title}</h3>
              <p className="text-gray-600 mb-2"><strong>Course Code:</strong> {course.code}</p>
              <p className="text-gray-600 mb-2"><strong>Credits:</strong> {course.credits}</p>
              <p className="text-gray-600 mb-4"><strong>Instructor:</strong> {course.instructor}</p>
              
              <div className="flex flex-wrap gap-2">
                {course.materials.map((material, idx) => (
                  <button
                    key={idx}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                  >
                    {material}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Assignments Page
  const AssignmentsPage = () => (
    <div>
      <Header title="Assignments" />
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Pending Assignments</h2>
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Assignment</th>
                  <th className="px-6 py-4 text-left font-semibold">Course</th>
                  <th className="px-6 py-4 text-left font-semibold">Due Date</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-800">{assignment.title}</td>
                    <td className="px-6 py-4 text-gray-600">{assignment.course}</td>
                    <td className="px-6 py-4 text-gray-600">{assignment.dueDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        assignment.status === 'Submitted' ? 'bg-green-100 text-green-800' :
                        assignment.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {assignment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className={`px-4 py-2 rounded text-xs font-medium ${
                          assignment.status === 'Submitted' 
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                        disabled={assignment.status === 'Submitted'}
                      >
                        {assignment.status === 'Submitted' ? 'View' : 
                         assignment.status === 'In Progress' ? 'Continue' : 'Submit'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  // Attendance Page
  const AttendancePage = () => (
    <div>
      <Header title="Attendance & Marks" />
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Academic Performance</h2>
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>
        
        {/* Attendance Table */}
        <h3 className="text-xl font-bold text-gray-800 mb-4">Attendance Record</h3>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Subject</th>
                  <th className="px-6 py-4 text-left font-semibold">Total Classes</th>
                  <th className="px-6 py-4 text-left font-semibold">Present</th>
                  <th className="px-6 py-4 text-left font-semibold">Absent</th>
                  <th className="px-6 py-4 text-left font-semibold">Attendance %</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((record, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-800">{record.subject}</td>
                    <td className="px-6 py-4 text-gray-600">{record.total}</td>
                    <td className="px-6 py-4 text-gray-600">{record.present}</td>
                    <td className="px-6 py-4 text-gray-600">{record.absent}</td>
                    <td className={`px-6 py-4 font-bold ${record.percentage >= 75 ? 'text-green-600' : 'text-red-600'}`}>
                      {record.percentage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Marks Table */}
        <h3 className="text-xl font-bold text-gray-800 mb-4">Examination Results</h3>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Subject</th>
                  <th className="px-6 py-4 text-left font-semibold">Internal (40)</th>
                  <th className="px-6 py-4 text-left font-semibold">Semester (60)</th>
                  <th className="px-6 py-4 text-left font-semibold">Total (100)</th>
                  <th className="px-6 py-4 text-left font-semibold">Grade</th>
                </tr>
              </thead>
              <tbody>
                {marksData.map((record, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-800">{record.subject}</td>
                    <td className="px-6 py-4 text-gray-600">{record.internal}</td>
                    <td className="px-6 py-4 text-gray-600">{record.semester}</td>
                    <td className="px-6 py-4 text-gray-600">{record.total}</td>
                    <td className={`px-6 py-4 font-bold ${
                      record.grade === 'A' ? 'text-green-600' : 
                      record.grade === 'B' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {record.grade}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  // Circulars Page
  const CircularsPage = () => (
    <div>
      <Header title="Circulars & Notices" />
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Important Announcements</h2>
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {circulars.map((circular) => (
            <div key={circular.id} className="bg-white border border-gray-200 rounded-xl p-6 flex justify-between items-center hover:border-blue-300 hover:shadow-md transition-all">
              <div>
                <h4 className="font-bold text-gray-800 mb-2">{circular.title}</h4>
                <p className="text-gray-600 text-sm">Published: {circular.date} | Category: {circular.category}</p>
              </div>
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Chatbot Component (placeholder - replace with your actual AIChatbot)
  const Chatbot = () => (
    <>
      <button
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        className="fixed bottom-5 right-5 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full text-white shadow-lg hover:scale-110 transition-transform z-50"
      >
        <MessageCircle className="w-6 h-6 mx-auto" />
      </button>
      
      {isChatbotOpen && (
        <AIChatbot onClose={() => setIsChatbotOpen(false)} />
      )}
    </>
  );

  // Main render logic
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'courses': return <CoursesPage />;
      case 'assignments': return <AssignmentsPage />;
      case 'attendance': return <AttendancePage />;
      case 'circulars': return <CircularsPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      {renderPage()}
      <Chatbot />
    </div>
  );
};

export default StudentPortal;