export const mockStudents = [
  { id: "anita-001", name: "Rohan Patil", grade: "5B", concern: "Missed 3 days · Reading slowed", tone: "urgent" as const, ring: 52, avatar: "रो", attendance: "78%", math: "65%", language: "50%", behavior: "Quiet" },
  { id: "s2", name: "Pooja Kale", grade: "5B", concern: "Math fluency dipping", tone: "watch" as const, ring: 68, avatar: "पू", attendance: "92%", math: "58%", language: "85%", behavior: "Active" },
  { id: "s3", name: "Imran Shaikh", grade: "5B", concern: "Hasn't spoken much this week", tone: "watch" as const, ring: 72, avatar: "इ", attendance: "88%", math: "70%", language: "68%", behavior: "Withdrawn" },
  { id: "s4", name: "Sneha Joshi", grade: "5B", concern: "Improving steadily ✨", tone: "good" as const, ring: 88, avatar: "स्ने", attendance: "98%", math: "90%", language: "88%", behavior: "Engaged" },
];

export const mockTeachers = [
  { id: "t1", name: "Anita Sharma", subject: "Class Teacher - 5B", tone: "good" as const, attendance: "98%", pulse: 85 },
  { id: "t2", name: "Rajesh Kumar", subject: "Math - Grades 6-8", tone: "watch" as const, attendance: "90%", pulse: 72 },
  { id: "t3", name: "Meena Patel", subject: "Science - Grades 6-8", tone: "good" as const, attendance: "100%", pulse: 92 },
  { id: "t4", name: "Sunil Deshmukh", subject: "Marathi/Hindi", tone: "urgent" as const, attendance: "75%", pulse: 60 },
];

export const mockSchools = [
  { id: "sch1", name: "Sarojini Vidyalaya", location: "Pune East", students: 450, teachers: 22, tone: "good" as const, health: 88 },
  { id: "sch2", name: "Z.P. Primary School, Kothrud", location: "Pune West", students: 320, teachers: 15, tone: "watch" as const, health: 72 },
  { id: "sch3", name: "Vivekanand High School", location: "Pune Central", students: 850, teachers: 40, tone: "good" as const, health: 91 },
  { id: "sch4", name: "Navjeevan Ashrama School", location: "Pune Rural", students: 210, teachers: 10, tone: "urgent" as const, health: 58 },
];

export const mockDistricts = [
  { id: "d1", name: "Pune Zilla", schools: 412, students: "1.2L", tone: "good" as const, health: 82, trend: "+2%" },
  { id: "d2", name: "Nashik Zilla", schools: 380, students: "98K", tone: "watch" as const, health: 68, trend: "-1%" },
  { id: "d3", name: "Nagpur Zilla", schools: 450, students: "1.5L", tone: "good" as const, health: 85, trend: "+4%" },
  { id: "d4", name: "Gadchiroli", schools: 220, students: "45K", tone: "urgent" as const, health: 52, trend: "-3%" },
];

export const mockNotifications = [
  { id: 1, title: "Attendance Alert", message: "Grade 5B attendance is below 80% today.", time: "10 mins ago", type: "urgent", read: false },
  { id: 2, title: "Assessment Complete", message: "Term 1 Math results are now available.", time: "2 hours ago", type: "info", read: true },
  { id: 3, title: "Message from Parent", message: "Rohan's mother replied to your note.", time: "4 hours ago", type: "success", read: false },
];
