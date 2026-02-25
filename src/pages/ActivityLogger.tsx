import { useState } from "react";
import { Camera, MapPin, Calendar, Upload, TreePine, Droplets, Recycle, Wind, Sun, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const activityTypes = [
  { id: "plantation", icon: TreePine, label: "Tree Plantation", labelMr: "वृक्षारोपण", color: "bg-eco-green-light text-eco-green" },
  { id: "water", icon: Droplets, label: "Water Conservation", labelMr: "जलसंधारण", color: "bg-eco-sky-light text-eco-sky" },
  { id: "waste", icon: Recycle, label: "Waste Management", labelMr: "कचरा व्यवस्थापन", color: "bg-eco-amber-light text-eco-amber" },
  { id: "air", icon: Wind, label: "Clean Air", labelMr: "स्वच्छ हवा", color: "bg-muted text-muted-foreground" },
  { id: "energy", icon: Sun, label: "Energy Saving", labelMr: "ऊर्जा बचत", color: "bg-eco-amber-light text-eco-amber" },
];

interface Activity {
  id: string;
  type: string;
  title: string;
  school: string;
  date: string;
  students: number;
  photos: number;
  gps: string;
  status: "verified" | "pending" | "flagged";
}

const mockActivities: Activity[] = [
  { id: "1", type: "plantation", title: "Tree Plantation Drive — 50 saplings", school: "ZP School, Shirdi", date: "2025-02-23", students: 45, photos: 4, gps: "19.7668° N, 74.4782° E", status: "verified" },
  { id: "2", type: "water", title: "Rainwater Harvesting Workshop", school: "Municipal School, Pune", date: "2025-02-22", students: 60, photos: 3, gps: "18.5204° N, 73.8567° E", status: "pending" },
  { id: "3", type: "waste", title: "Plastic-Free Week Campaign", school: "Govt. HS, Nagpur", date: "2025-02-21", students: 120, photos: 6, gps: "21.1458° N, 79.0882° E", status: "verified" },
  { id: "4", type: "air", title: "Clean Air Survey & Monitoring", school: "KV, Thane", date: "2025-02-20", students: 30, photos: 2, gps: "19.2183° N, 72.9781° E", status: "verified" },
  { id: "5", type: "energy", title: "Solar Energy Awareness Day", school: "Navodaya, Satara", date: "2025-02-19", students: 80, photos: 5, gps: "17.6805° N, 73.9998° E", status: "flagged" },
  { id: "6", type: "plantation", title: "School Garden Project Phase 2", school: "Adarsh Vidyalaya, Kolhapur", date: "2025-02-18", students: 35, photos: 3, gps: "16.7050° N, 74.2433° E", status: "pending" },
];

const statusStyles = {
  verified: { label: "Verified", className: "bg-eco-green-light text-eco-green" },
  pending: { label: "Pending", className: "bg-eco-amber-light text-eco-amber" },
  flagged: { label: "Flagged", className: "bg-eco-red-light text-eco-red" },
};

interface Props {
  lang: "en" | "mr";
}

const ActivityLogger = ({ lang }: Props) => {
  const [activeType, setActiveType] = useState<string | null>(null);

  const filtered = activeType
    ? mockActivities.filter((a) => a.type === activeType)
    : mockActivities;

  return (
    <div className="p-6 space-y-6 animate-slide-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {lang === "en" ? "Activity Logger" : "उपक्रम नोंदणी"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {lang === "en" ? "Log and track environmental activities with evidence" : "पुराव्यासह पर्यावरणीय उपक्रम नोंदवा आणि ट्रॅक करा"}
          </p>
        </div>
        <Button className="gap-2 gradient-primary text-primary-foreground border-0">
          <Plus className="w-4 h-4" />
          {lang === "en" ? "Log Activity" : "उपक्रम नोंदवा"}
        </Button>
      </div>

      {/* Activity Type Filters */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setActiveType(null)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors border",
            !activeType ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:bg-muted"
          )}
        >
          {lang === "en" ? "All Activities" : "सर्व उपक्रम"}
        </button>
        {activityTypes.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveType(t.id === activeType ? null : t.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border",
              activeType === t.id ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:bg-muted"
            )}
          >
            <t.icon className="w-4 h-4" />
            {lang === "en" ? t.label : t.labelMr}
          </button>
        ))}
      </div>

      {/* Activities List */}
      <div className="space-y-3">
        {filtered.map((activity) => {
          const typeInfo = activityTypes.find((t) => t.id === activity.type);
          const TypeIcon = typeInfo?.icon || TreePine;
          return (
            <div
              key={activity.id}
              className="bg-card rounded-xl border border-border shadow-card p-5 flex items-start gap-4 hover:shadow-elevated transition-shadow"
            >
              <div className={cn("w-11 h-11 rounded-lg flex items-center justify-center shrink-0", typeInfo?.color)}>
                <TypeIcon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{activity.title}</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">{activity.school}</p>
                  </div>
                  <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full shrink-0", statusStyles[activity.status].className)}>
                    {statusStyles[activity.status].label}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {activity.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {activity.gps}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5" />
                    {activity.photos} {lang === "en" ? "photos" : "फोटो"}
                  </span>
                  <span>{activity.students} {lang === "en" ? "students" : "विद्यार्थी"}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityLogger;
