import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { translations, Language } from "@/lib/translations";

interface SchoolCompliance {
  name: string;
  district: string;
  activitiesThisMonth: number;
  lastActivity: string;
  status: "green" | "amber" | "red";
}

const mockData: SchoolCompliance[] = [
  { name: "ZP Primary School, Shirdi", district: "Ahmednagar", activitiesThisMonth: 3, lastActivity: "2 days ago", status: "green" },
  { name: "Municipal School No. 12, Pune", district: "Pune", activitiesThisMonth: 1, lastActivity: "12 days ago", status: "amber" },
  { name: "ZP School, Washim", district: "Washim", activitiesThisMonth: 0, lastActivity: "35 days ago", status: "red" },
  { name: "Govt. High School, Nagpur", district: "Nagpur", activitiesThisMonth: 5, lastActivity: "1 day ago", status: "green" },
  { name: "Adarsh Vidyalaya, Kolhapur", district: "Kolhapur", activitiesThisMonth: 0, lastActivity: "28 days ago", status: "red" },
  { name: "Kendriya Vidyalaya, Thane", district: "Thane", activitiesThisMonth: 2, lastActivity: "5 days ago", status: "green" },
];

interface Props {
  lang: Language;
  searchQuery?: string;
}

const ComplianceTable = ({ lang, searchQuery = "" }: Props) => {
  const t = translations[lang];

  const statusConfig = {
    green: { label: t.compliant, dot: "bg-eco-green", bg: "bg-eco-green-light text-eco-green dark:bg-eco-green-light/20 dark:text-eco-green" },
    amber: { label: t.atRisk, dot: "bg-eco-amber", bg: "bg-eco-amber-light text-eco-amber dark:bg-eco-amber-light/20 dark:text-eco-amber" },
    red: { label: t.nonCompliant, dot: "bg-eco-red", bg: "bg-eco-red-light text-eco-red dark:bg-eco-red-light/20 dark:text-eco-red" },
  };

  // Filter schools based on search query
  const filteredSchools = useMemo(() => {
    if (!searchQuery.trim()) return mockData;
    
    const query = searchQuery.toLowerCase().trim();
    return mockData.filter(school => 
      school.name.toLowerCase().includes(query) ||
      school.district.toLowerCase().includes(query) ||
      school.status.toLowerCase().includes(query) ||
      statusConfig[school.status].label.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-foreground">
          {t.complianceStatus}
        </h3>
        <div className="flex gap-3 text-xs">
          {(["green", "amber", "red"] as const).map((s) => (
            <span key={s} className="flex items-center gap-1.5">
              <span className={cn("w-2 h-2 rounded-full", statusConfig[s].dot)} />
              {statusConfig[s].label}
            </span>
          ))}
        </div>
      </div>
      
      {/* Show search results count */}
      {searchQuery && (
        <div className="px-5 py-2 bg-muted/30 text-sm text-muted-foreground border-b border-border">
          {filteredSchools.length === 0 
            ? `${t.noSchoolsFound}`
            : t.foundSchools.replace("{count}", filteredSchools.length.toString())}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left px-5 py-3 font-medium text-muted-foreground">{t.school}</th>
              <th className="text-left px-5 py-3 font-medium text-muted-foreground">{t.district}</th>
              <th className="text-center px-5 py-3 font-medium text-muted-foreground">{t.activities}</th>
              <th className="text-left px-5 py-3 font-medium text-muted-foreground">{t.lastActivity}</th>
              <th className="text-center px-5 py-3 font-medium text-muted-foreground">{t.status}</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchools.length > 0 ? (
              filteredSchools.map((school, i) => (
                <tr key={i} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3 font-medium text-foreground">{school.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{school.district}</td>
                  <td className="px-5 py-3 text-center text-foreground">{school.activitiesThisMonth}</td>
                  <td className="px-5 py-3 text-muted-foreground">{school.lastActivity}</td>
                  <td className="px-5 py-3 text-center">
                    <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", statusConfig[school.status].bg)}>
                      {statusConfig[school.status].label}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-muted-foreground">
                  {t.noSchoolsFound}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplianceTable;