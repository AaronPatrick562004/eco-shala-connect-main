import { Search, Download, TreePine, Droplets, Recycle, Star, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Student {
  id: string;
  name: string;
  school: string;
  grade: string;
  ecoScore: number;
  activities: number;
  badges: string[];
  hours: number;
  treesPlanted: number;
}

const mockStudents: Student[] = [
  { id: "1", name: "Aarav Patil", school: "KV, Thane", grade: "8th", ecoScore: 95, activities: 18, badges: ["🌳", "💧", "♻️", "☀️"], hours: 72, treesPlanted: 12 },
  { id: "2", name: "Priya Deshmukh", school: "Govt. HS, Nagpur", grade: "9th", ecoScore: 92, activities: 16, badges: ["🌳", "💧", "♻️"], hours: 64, treesPlanted: 8 },
  { id: "3", name: "Rohan Jadhav", school: "ZP School, Shirdi", grade: "7th", ecoScore: 88, activities: 14, badges: ["🌳", "💧"], hours: 56, treesPlanted: 15 },
  { id: "4", name: "Sneha Kulkarni", school: "Navodaya, Satara", grade: "10th", ecoScore: 85, activities: 12, badges: ["🌳", "♻️", "☀️"], hours: 48, treesPlanted: 6 },
  { id: "5", name: "Aditya Shinde", school: "Municipal School, Pune", grade: "8th", ecoScore: 82, activities: 10, badges: ["🌳", "💧"], hours: 40, treesPlanted: 10 },
  { id: "6", name: "Ananya More", school: "Adarsh Vidyalaya, Kolhapur", grade: "9th", ecoScore: 78, activities: 9, badges: ["🌳"], hours: 36, treesPlanted: 5 },
];

interface Props {
  lang: "en" | "mr";
}

const EcoPassports = ({ lang }: Props) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(mockStudents[0]);
  const [search, setSearch] = useState("");

  const filtered = mockStudents.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.school.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 animate-slide-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {lang === "en" ? "Student Eco-Passports" : "विद्यार्थी इको-पासपोर्ट"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {lang === "en" ? "Individual environmental activity portfolios and achievements" : "वैयक्तिक पर्यावरणीय उपक्रम पोर्टफोलिओ आणि उपलब्धी"}
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          {lang === "en" ? "Export Passport" : "पासपोर्ट निर्यात"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student List */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={lang === "en" ? "Search students..." : "विद्यार्थी शोधा..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="space-y-2">
            {filtered.map((student) => (
              <button
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className={cn(
                  "w-full text-left p-3 rounded-xl border transition-colors",
                  selectedStudent?.id === student.id
                    ? "bg-accent border-primary/20 shadow-card"
                    : "bg-card border-border hover:bg-muted/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                    {student.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.school} • {student.grade}</p>
                  </div>
                  <span className="ml-auto text-xs font-bold text-primary">{student.ecoScore}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Passport Card */}
        {selectedStudent && (
          <div className="lg:col-span-2 space-y-4 animate-slide-in">
            {/* Passport Header */}
            <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
              <div className="gradient-hero p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center text-primary-foreground font-bold text-xl">
                    {selectedStudent.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="text-primary-foreground">
                    <h3 className="text-xl font-bold">{selectedStudent.name}</h3>
                    <p className="text-sm opacity-80">{selectedStudent.school} • {lang === "en" ? "Grade" : "इयत्ता"} {selectedStudent.grade}</p>
                  </div>
                  <div className="ml-auto text-right text-primary-foreground">
                    <p className="text-3xl font-bold">{selectedStudent.ecoScore}</p>
                    <p className="text-xs opacity-80">{lang === "en" ? "Eco Score" : "इको गुण"}</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 divide-x divide-border">
                {[
                  { icon: BookOpen, label: lang === "en" ? "Activities" : "उपक्रम", value: selectedStudent.activities },
                  { icon: Star, label: lang === "en" ? "Badges" : "बॅज", value: selectedStudent.badges.length },
                  { icon: TreePine, label: lang === "en" ? "Trees" : "वृक्ष", value: selectedStudent.treesPlanted },
                  { icon: Droplets, label: lang === "en" ? "Hours" : "तास", value: selectedStudent.hours },
                ].map((stat, i) => (
                  <div key={i} className="p-4 text-center">
                    <stat.icon className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                    <p className="text-lg font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges Earned */}
            <div className="bg-card rounded-xl border border-border shadow-card p-5">
              <h4 className="font-semibold text-foreground mb-3">{lang === "en" ? "Badges Earned" : "मिळालेले बॅज"}</h4>
              <div className="flex gap-3">
                {selectedStudent.badges.map((badge, i) => (
                  <div key={i} className="w-14 h-14 rounded-xl bg-eco-green-light flex items-center justify-center text-2xl">
                    {badge}
                  </div>
                ))}
                {Array.from({ length: 6 - selectedStudent.badges.length }).map((_, i) => (
                  <div key={`empty-${i}`} className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center text-muted-foreground text-lg">
                    ?
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-card rounded-xl border border-border shadow-card p-5">
              <h4 className="font-semibold text-foreground mb-3">{lang === "en" ? "Recent Activity Timeline" : "अलीकडील उपक्रम टाइमलाइन"}</h4>
              <div className="space-y-3">
                {[
                  { date: "Feb 23", activity: "Tree Plantation Drive — 5 saplings planted", icon: "🌳" },
                  { date: "Feb 18", activity: "Participated in Rainwater Harvesting Workshop", icon: "💧" },
                  { date: "Feb 10", activity: "Led Plastic Cleanup in School Area", icon: "♻️" },
                  { date: "Jan 28", activity: "Solar Energy Poster Presentation", icon: "☀️" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className="text-xs text-muted-foreground w-14 shrink-0">{item.date}</span>
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-foreground">{item.activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EcoPassports;
