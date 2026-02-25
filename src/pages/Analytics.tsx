import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from "recharts";
import { TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const monthlyActivities = [
  { month: "Sep", activities: 8200 },
  { month: "Oct", activities: 9800 },
  { month: "Nov", activities: 11200 },
  { month: "Dec", activities: 7500 },
  { month: "Jan", activities: 10400 },
  { month: "Feb", activities: 12847 },
];

const complianceTrend = [
  { month: "Sep", rate: 62 },
  { month: "Oct", rate: 67 },
  { month: "Nov", rate: 72 },
  { month: "Dec", rate: 69 },
  { month: "Jan", rate: 75 },
  { month: "Feb", rate: 78.3 },
];

const activityByType = [
  { name: "Tree Plantation", value: 35, color: "hsl(152, 55%, 28%)" },
  { name: "Water Conservation", value: 22, color: "hsl(200, 80%, 55%)" },
  { name: "Waste Management", value: 20, color: "hsl(38, 92%, 50%)" },
  { name: "Clean Air", value: 13, color: "hsl(200, 10%, 45%)" },
  { name: "Energy Saving", value: 10, color: "hsl(120, 40%, 55%)" },
];

const districtPerformance = [
  { district: "Nagpur", score: 91 },
  { district: "Thane", score: 88 },
  { district: "Pune", score: 82 },
  { district: "Mumbai", score: 78 },
  { district: "Nashik", score: 75 },
  { district: "Solapur", score: 72 },
  { district: "Aurangabad", score: 70 },
  { district: "Kolhapur", score: 65 },
];

interface Props {
  lang: "en" | "mr";
}

const Analytics = ({ lang }: Props) => {
  return (
    <div className="p-6 space-y-6 animate-slide-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          {lang === "en" ? "Analytics" : "विश्लेषण"}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {lang === "en" ? "Statewide trends, reporting dashboards, and insights" : "राज्यव्यापी ट्रेंड, रिपोर्टिंग डॅशबोर्ड आणि अंतर्दृष्टी"}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: lang === "en" ? "Total Activities (YTD)" : "एकूण उपक्रम (YTD)", value: "59,947", change: "+18%", up: true },
          { label: lang === "en" ? "Avg per School" : "प्रति शाळा सरासरी", value: "0.79", change: "+0.12", up: true },
          { label: lang === "en" ? "Students Engaged" : "सहभागी विद्यार्थी", value: "12.4L", change: "+22%", up: true },
          { label: lang === "en" ? "Trees Planted" : "लावलेली झाडे", value: "2.8L", change: "+31%", up: true },
        ].map((kpi, i) => (
          <div key={i} className="bg-card rounded-xl border border-border shadow-card p-4">
            <p className="text-xs text-muted-foreground">{kpi.label}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{kpi.value}</p>
            <span className={cn("text-xs font-semibold flex items-center gap-1 mt-1", kpi.up ? "text-eco-green" : "text-eco-red")}>
              {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {kpi.change}
            </span>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Activities */}
        <div className="bg-card rounded-xl border border-border shadow-card p-5">
          <h3 className="font-semibold text-foreground mb-4">{lang === "en" ? "Monthly Activities" : "मासिक उपक्रम"}</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyActivities}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(140, 10%, 88%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(200, 10%, 45%)" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(200, 10%, 45%)" }} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(140, 10%, 88%)", fontSize: "12px" }} />
              <Bar dataKey="activities" fill="hsl(152, 55%, 28%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Compliance Trend */}
        <div className="bg-card rounded-xl border border-border shadow-card p-5">
          <h3 className="font-semibold text-foreground mb-4">{lang === "en" ? "Compliance Rate Trend" : "अनुपालन दर ट्रेंड"}</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={complianceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(140, 10%, 88%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(200, 10%, 45%)" }} />
              <YAxis domain={[50, 100]} tick={{ fontSize: 12, fill: "hsl(200, 10%, 45%)" }} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(140, 10%, 88%)", fontSize: "12px" }} />
              <Area type="monotone" dataKey="rate" stroke="hsl(160, 60%, 40%)" fill="hsl(152, 40%, 92%)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity by Type */}
        <div className="bg-card rounded-xl border border-border shadow-card p-5">
          <h3 className="font-semibold text-foreground mb-4">{lang === "en" ? "Activities by Type" : "प्रकारानुसार उपक्रम"}</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={activityByType} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                  {activityByType.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 text-sm">
              {activityByType.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-semibold text-foreground ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* District Performance */}
        <div className="bg-card rounded-xl border border-border shadow-card p-5">
          <h3 className="font-semibold text-foreground mb-4">{lang === "en" ? "District Performance" : "जिल्हा कामगिरी"}</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={districtPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(140, 10%, 88%)" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12, fill: "hsl(200, 10%, 45%)" }} />
              <YAxis type="category" dataKey="district" tick={{ fontSize: 11, fill: "hsl(200, 10%, 45%)" }} width={80} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(140, 10%, 88%)", fontSize: "12px" }} />
              <Bar dataKey="score" fill="hsl(152, 55%, 28%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
