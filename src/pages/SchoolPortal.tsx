import { useState } from "react";
import { Search, Plus, Filter, MapPin, Phone, Mail, Users, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface School {
  id: string;
  name: string;
  udise: string;
  district: string;
  block: string;
  coordinator: string;
  phone: string;
  email: string;
  students: number;
  status: "active" | "pending" | "inactive";
  compliance: "green" | "amber" | "red";
}

const mockSchools: School[] = [
  { id: "1", name: "ZP Primary School, Shirdi", udise: "27240100101", district: "Ahmednagar", block: "Rahata", coordinator: "Mr. Patil S.R.", phone: "+91 98765 43210", email: "zpshirdi@edu.mh.in", students: 320, status: "active", compliance: "green" },
  { id: "2", name: "Municipal School No. 12", udise: "27250200202", district: "Pune", block: "Haveli", coordinator: "Ms. Deshmukh A.V.", phone: "+91 98765 43211", email: "ms12pune@edu.mh.in", students: 580, status: "active", compliance: "amber" },
  { id: "3", name: "ZP School, Washim", udise: "27360300303", district: "Washim", block: "Washim", coordinator: "Mr. Jadhav R.K.", phone: "+91 98765 43212", email: "zpwashim@edu.mh.in", students: 210, status: "active", compliance: "red" },
  { id: "4", name: "Govt. High School, Nagpur", udise: "27270400404", district: "Nagpur", block: "Nagpur City", coordinator: "Ms. Kulkarni P.M.", phone: "+91 98765 43213", email: "ghsnagpur@edu.mh.in", students: 890, status: "active", compliance: "green" },
  { id: "5", name: "Adarsh Vidyalaya, Kolhapur", udise: "27300500505", district: "Kolhapur", block: "Karvir", coordinator: "Mr. Shinde V.B.", phone: "+91 98765 43214", email: "avkolhapur@edu.mh.in", students: 450, status: "pending", compliance: "red" },
  { id: "6", name: "Kendriya Vidyalaya, Thane", udise: "27250600606", district: "Thane", block: "Thane", coordinator: "Ms. Sharma N.D.", phone: "+91 98765 43215", email: "kvthane@edu.mh.in", students: 1200, status: "active", compliance: "green" },
  { id: "7", name: "ZP School, Beed", udise: "27290700707", district: "Beed", block: "Beed", coordinator: "Mr. Gaikwad T.S.", phone: "+91 98765 43216", email: "zpbeed@edu.mh.in", students: 180, status: "inactive", compliance: "red" },
  { id: "8", name: "Navodaya Vidyalaya, Satara", udise: "27300800808", district: "Satara", block: "Satara", coordinator: "Ms. More L.A.", phone: "+91 98765 43217", email: "nvsatara@edu.mh.in", students: 640, status: "active", compliance: "green" },
];

const statusConfig = {
  active: { label: "Active", className: "bg-eco-green-light text-eco-green" },
  pending: { label: "Pending", className: "bg-eco-amber-light text-eco-amber" },
  inactive: { label: "Inactive", className: "bg-eco-red-light text-eco-red" },
};

const complianceIcon = {
  green: <CheckCircle className="w-4 h-4 text-eco-green" />,
  amber: <AlertTriangle className="w-4 h-4 text-eco-amber" />,
  red: <XCircle className="w-4 h-4 text-eco-red" />,
};

interface Props {
  lang: "en" | "mr";
}

const SchoolPortal = ({ lang }: Props) => {
  const [search, setSearch] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  const filtered = mockSchools.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.district.toLowerCase().includes(search.toLowerCase()) ||
      s.udise.includes(search)
  );

  return (
    <div className="p-6 space-y-6 animate-slide-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {lang === "en" ? "School Portal" : "शाळा पोर्टल"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {lang === "en" ? "Manage school registrations and coordinator details" : "शाळा नोंदणी आणि समन्वयक तपशील व्यवस्थापित करा"}
          </p>
        </div>
        <Button className="gap-2 gradient-primary text-primary-foreground border-0">
          <Plus className="w-4 h-4" />
          {lang === "en" ? "Add School" : "शाळा जोडा"}
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: lang === "en" ? "Total Schools" : "एकूण शाळा", value: "75,420", icon: "🏫" },
          { label: lang === "en" ? "Active" : "सक्रिय", value: "68,290", icon: "✅" },
          { label: lang === "en" ? "Pending Approval" : "मंजुरी प्रलंबित", value: "4,830", icon: "⏳" },
          { label: lang === "en" ? "Inactive" : "निष्क्रिय", value: "2,300", icon: "⚠️" },
        ].map((stat, i) => (
          <div key={i} className="bg-card rounded-xl border border-border shadow-card p-4 flex items-center gap-3">
            <span className="text-2xl">{stat.icon}</span>
            <div>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={lang === "en" ? "Search by school name, UDISE code, or district..." : "शाळेचे नाव, UDISE कोड, किंवा जिल्ह्यानुसार शोधा..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          {lang === "en" ? "Filter" : "फिल्टर"}
        </Button>
      </div>

      {/* Table & Detail split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl border border-border shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">{lang === "en" ? "School" : "शाळा"}</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">UDISE</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">{lang === "en" ? "District" : "जिल्हा"}</th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground">{lang === "en" ? "Students" : "विद्यार्थी"}</th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground">{lang === "en" ? "Status" : "स्थिती"}</th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground">{lang === "en" ? "Eco" : "इको"}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((school) => (
                  <tr
                    key={school.id}
                    onClick={() => setSelectedSchool(school)}
                    className={cn(
                      "border-t border-border cursor-pointer transition-colors",
                      selectedSchool?.id === school.id ? "bg-accent" : "hover:bg-muted/30"
                    )}
                  >
                    <td className="px-4 py-3 font-medium text-foreground">{school.name}</td>
                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{school.udise}</td>
                    <td className="px-4 py-3 text-muted-foreground">{school.district}</td>
                    <td className="px-4 py-3 text-center text-foreground">{school.students}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", statusConfig[school.status].className)}>
                        {statusConfig[school.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex justify-center">{complianceIcon[school.compliance]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="bg-card rounded-xl border border-border shadow-card p-5">
          {selectedSchool ? (
            <div className="space-y-4 animate-slide-in">
              <h3 className="font-bold text-foreground text-lg">{selectedSchool.name}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{selectedSchool.block}, {selectedSchool.district}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4 shrink-0" />
                  <span>{selectedSchool.coordinator}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>{selectedSchool.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>{selectedSchool.email}</span>
                </div>
              </div>
              <div className="pt-3 border-t border-border space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{lang === "en" ? "UDISE Code" : "UDISE कोड"}</span>
                  <span className="font-mono text-foreground">{selectedSchool.udise}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{lang === "en" ? "Students" : "विद्यार्थी"}</span>
                  <span className="text-foreground">{selectedSchool.students}</span>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <span className="text-muted-foreground">{lang === "en" ? "Status" : "स्थिती"}</span>
                  <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", statusConfig[selectedSchool.status].className)}>
                    {statusConfig[selectedSchool.status].label}
                  </span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-2">
                {lang === "en" ? "View Full Profile" : "पूर्ण प्रोफाइल पहा"}
              </Button>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground text-sm py-20">
              {lang === "en" ? "Select a school to view details" : "तपशील पाहण्यासाठी शाळा निवडा"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolPortal;
