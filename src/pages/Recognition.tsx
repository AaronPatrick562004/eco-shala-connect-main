import { Award, Medal, Star, Trophy, Crown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const badges = [
  { icon: "🌳", name: "Green Champion", nameMr: "हरित चॅम्पियन", criteria: "50+ trees planted", schools: 1240 },
  { icon: "💧", name: "Water Warrior", nameMr: "जल योद्धा", criteria: "Water conservation project", schools: 890 },
  { icon: "♻️", name: "Zero Waste Hero", nameMr: "शून्य कचरा नायक", criteria: "Waste reduction by 50%", schools: 560 },
  { icon: "🌿", name: "Biodiversity Star", nameMr: "जैवविविधता स्टार", criteria: "Biodiversity survey completed", schools: 320 },
  { icon: "☀️", name: "Energy Saver", nameMr: "ऊर्जा बचतकर्ता", criteria: "Energy audit + solar project", schools: 210 },
  { icon: "🏆", name: "Eco Excellence", nameMr: "इको उत्कृष्टता", criteria: "All 5 badges earned", schools: 85 },
];

interface TopSchool {
  rank: number;
  name: string;
  district: string;
  score: number;
  badges: number;
  activities: number;
}

const topSchools: TopSchool[] = [
  { rank: 1, name: "Kendriya Vidyalaya, Thane", district: "Thane", score: 98, badges: 6, activities: 24 },
  { rank: 2, name: "Govt. High School, Nagpur", district: "Nagpur", score: 95, badges: 5, activities: 22 },
  { rank: 3, name: "Navodaya Vidyalaya, Satara", district: "Satara", score: 92, badges: 5, activities: 19 },
  { rank: 4, name: "ZP Primary School, Shirdi", district: "Ahmednagar", score: 89, badges: 4, activities: 18 },
  { rank: 5, name: "Model School, Solapur", district: "Solapur", score: 87, badges: 4, activities: 16 },
  { rank: 6, name: "Municipal School, Nashik", district: "Nashik", score: 85, badges: 4, activities: 15 },
  { rank: 7, name: "ZP School, Ratnagiri", district: "Ratnagiri", score: 83, badges: 3, activities: 14 },
  { rank: 8, name: "KV, Aurangabad", district: "Aurangabad", score: 81, badges: 3, activities: 13 },
];

const rankIcons = [Crown, Medal, Star];

interface Props {
  lang: "en" | "mr";
}

const Recognition = ({ lang }: Props) => {
  return (
    <div className="p-6 space-y-6 animate-slide-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {lang === "en" ? "Recognition Engine" : "मान्यता प्रणाली"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {lang === "en" ? "Award badges and recognize top-performing eco-schools" : "सर्वोत्कृष्ट इको-शाळांना बॅज आणि मान्यता द्या"}
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          {lang === "en" ? "Export Certificates" : "प्रमाणपत्रे निर्यात"}
        </Button>
      </div>

      {/* Badge Gallery */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">
          {lang === "en" ? "Achievement Badges" : "उपलब्धी बॅज"}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {badges.map((badge, i) => (
            <div key={i} className="bg-card rounded-xl border border-border shadow-card p-4 text-center hover:shadow-elevated transition-shadow">
              <span className="text-3xl">{badge.icon}</span>
              <h4 className="font-semibold text-foreground text-sm mt-2">{lang === "en" ? badge.name : badge.nameMr}</h4>
              <p className="text-xs text-muted-foreground mt-1">{badge.criteria}</p>
              <p className="text-xs font-semibold text-primary mt-2">{badge.schools.toLocaleString()} {lang === "en" ? "schools" : "शाळा"}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <Trophy className="w-4 h-4 text-eco-amber" />
          <h3 className="font-semibold text-foreground">
            {lang === "en" ? "State Leaderboard — Top Schools" : "राज्य लीडरबोर्ड — शीर्ष शाळा"}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-center px-4 py-3 font-medium text-muted-foreground w-16">#</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{lang === "en" ? "School" : "शाळा"}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{lang === "en" ? "District" : "जिल्हा"}</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">{lang === "en" ? "Score" : "गुण"}</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">{lang === "en" ? "Badges" : "बॅज"}</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">{lang === "en" ? "Activities" : "उपक्रम"}</th>
              </tr>
            </thead>
            <tbody>
              {topSchools.map((school) => {
                const RankIcon = school.rank <= 3 ? rankIcons[school.rank - 1] : null;
                return (
                  <tr key={school.rank} className="border-t border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-center">
                      {RankIcon ? (
                        <RankIcon className={cn("w-5 h-5 mx-auto", school.rank === 1 ? "text-eco-amber" : school.rank === 2 ? "text-muted-foreground" : "text-eco-amber/60")} />
                      ) : (
                        <span className="text-muted-foreground font-medium">{school.rank}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">{school.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{school.district}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-bold text-primary">{school.score}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="bg-eco-amber-light text-eco-amber text-xs font-semibold px-2 py-0.5 rounded-full">{school.badges}</span>
                    </td>
                    <td className="px-4 py-3 text-center text-foreground">{school.activities}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Recognition;
