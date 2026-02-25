import { AlertTriangle, CheckCircle, XCircle, Bell, ChevronDown, Send, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  school: string;
  district: string;
  block: string;
  beo: string;
  daysSinceActivity: number;
  level: "green" | "amber" | "red";
  remindersSent: number;
  lastReminder: string;
}

const mockAlerts: Alert[] = [
  { id: "1", school: "ZP School, Washim", district: "Washim", block: "Washim", beo: "Shri. Deshmukh R.P.", daysSinceActivity: 35, level: "red", remindersSent: 3, lastReminder: "2 days ago" },
  { id: "2", school: "ZP School, Beed", district: "Beed", block: "Beed", beo: "Smt. Gaikwad S.T.", daysSinceActivity: 42, level: "red", remindersSent: 4, lastReminder: "1 day ago" },
  { id: "3", school: "Primary School, Latur", district: "Latur", block: "Latur", beo: "Shri. Patil V.M.", daysSinceActivity: 28, level: "red", remindersSent: 2, lastReminder: "5 days ago" },
  { id: "4", school: "Municipal School No. 12", district: "Pune", block: "Haveli", beo: "Smt. Kulkarni A.D.", daysSinceActivity: 18, level: "amber", remindersSent: 1, lastReminder: "3 days ago" },
  { id: "5", school: "ZP School, Osmanabad", district: "Osmanabad", block: "Tuljapur", beo: "Shri. Jadhav N.K.", daysSinceActivity: 15, level: "amber", remindersSent: 1, lastReminder: "7 days ago" },
  { id: "6", school: "Primary School, Jalna", district: "Jalna", block: "Jalna", beo: "Smt. Shaikh F.R.", daysSinceActivity: 12, level: "amber", remindersSent: 0, lastReminder: "—" },
];

const levelConfig = {
  red: { label: "Non-Compliant", icon: XCircle, dot: "bg-eco-red", bg: "bg-eco-red-light text-eco-red", border: "border-eco-red/20" },
  amber: { label: "At Risk", icon: AlertTriangle, dot: "bg-eco-amber", bg: "bg-eco-amber-light text-eco-amber", border: "border-eco-amber/20" },
  green: { label: "Compliant", icon: CheckCircle, dot: "bg-eco-green", bg: "bg-eco-green-light text-eco-green", border: "border-eco-green/20" },
};

interface Props {
  lang: "en" | "mr";
}

const BEODEOMonitor = ({ lang }: Props) => {
  return (
    <div className="p-6 space-y-6 animate-slide-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          {lang === "en" ? "BEO/DEO Monitor" : "BEO/DEO मॉनिटर"}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {lang === "en" ? "Block & district compliance monitoring with automated alerts" : "स्वयंचलित सूचनांसह ब्लॉक आणि जिल्हा अनुपालन निरीक्षण"}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { level: "red" as const, count: 4312, label: lang === "en" ? "Non-Compliant (30+ days)" : "अनुपालन नाही (३०+ दिवस)" },
          { level: "amber" as const, count: 8450, label: lang === "en" ? "At Risk (15-30 days)" : "धोक्यात (१५-३० दिवस)" },
          { level: "green" as const, count: 62658, label: lang === "en" ? "Compliant" : "अनुपालन" },
        ].map((item) => {
          const config = levelConfig[item.level];
          const Icon = config.icon;
          return (
            <div key={item.level} className={cn("rounded-xl border shadow-card p-5", config.border, "bg-card")}>
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", config.bg)}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{item.count.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alert Queue */}
      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-eco-amber" />
            <h3 className="font-semibold text-foreground">
              {lang === "en" ? "Active Alerts — Requires Action" : "सक्रिय सूचना — कारवाई आवश्यक"}
            </h3>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            {lang === "en" ? "Send Bulk Reminder" : "सामूहिक स्मरणपत्र"} <Send className="w-3.5 h-3.5" />
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">{lang === "en" ? "School" : "शाळा"}</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">{lang === "en" ? "District / Block" : "जिल्हा / ब्लॉक"}</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">BEO</th>
                <th className="text-center px-5 py-3 font-medium text-muted-foreground">{lang === "en" ? "Days Inactive" : "निष्क्रिय दिवस"}</th>
                <th className="text-center px-5 py-3 font-medium text-muted-foreground">{lang === "en" ? "Reminders" : "स्मरणपत्रे"}</th>
                <th className="text-center px-5 py-3 font-medium text-muted-foreground">{lang === "en" ? "Level" : "स्तर"}</th>
                <th className="text-center px-5 py-3 font-medium text-muted-foreground">{lang === "en" ? "Actions" : "कृती"}</th>
              </tr>
            </thead>
            <tbody>
              {mockAlerts.map((alert) => (
                <tr key={alert.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3 font-medium text-foreground">{alert.school}</td>
                  <td className="px-5 py-3 text-muted-foreground">{alert.district} / {alert.block}</td>
                  <td className="px-5 py-3 text-muted-foreground">{alert.beo}</td>
                  <td className="px-5 py-3 text-center font-semibold text-foreground">{alert.daysSinceActivity}</td>
                  <td className="px-5 py-3 text-center text-muted-foreground">
                    {alert.remindersSent} <span className="text-xs">({alert.lastReminder})</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", levelConfig[alert.level].bg)}>
                      {levelConfig[alert.level].label}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Send className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BEODEOMonitor;
