import { Users, Building2, Heart, MapPin, ExternalLink, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Partner {
  id: string;
  name: string;
  type: "ngo" | "corporate" | "volunteer" | "government";
  focus: string;
  district: string;
  schools: number;
  contact: string;
  email: string;
  description: string;
}

const partners: Partner[] = [
  { id: "1", name: "Vanarai Foundation", type: "ngo", focus: "Afforestation & Watershed", district: "Pune", schools: 450, contact: "+91 20 2567 8901", email: "info@vanarai.org", description: "Pioneer in participatory watershed development and afforestation across Maharashtra." },
  { id: "2", name: "Swachh Bharat Mission — MH", type: "government", focus: "Waste Management", district: "Statewide", schools: 12000, contact: "+91 22 2285 1234", email: "sbm.mh@gov.in", description: "Government initiative supporting waste segregation and cleanliness drives in schools." },
  { id: "3", name: "Tata Sustainability Group", type: "corporate", focus: "Energy & Water", district: "Mumbai", schools: 320, contact: "+91 22 6665 8282", email: "sustainability@tata.com", description: "CSR arm focusing on renewable energy and water conservation projects in schools." },
  { id: "4", name: "Green Warriors Maharashtra", type: "volunteer", focus: "Biodiversity & Awareness", district: "Nagpur", schools: 180, contact: "+91 98234 56789", email: "greenwarriors.mh@gmail.com", description: "Volunteer network organizing biodiversity walks, nature camps, and awareness workshops." },
  { id: "5", name: "Paani Foundation", type: "ngo", focus: "Water Conservation", district: "Statewide", schools: 800, contact: "+91 20 4860 0000", email: "info@paanifoundation.in", description: "Working on water cup competitions and watershed management across rural Maharashtra." },
  { id: "6", name: "Eco-Vidyarthi Network", type: "volunteer", focus: "Student Leadership", district: "Thane", schools: 95, contact: "+91 93456 78901", email: "ecovidyarthi@gmail.com", description: "Student-led environmental clubs fostering eco-leadership among youth." },
];

const typeConfig = {
  ngo: { label: "NGO", icon: Heart, className: "bg-eco-green-light text-eco-green" },
  corporate: { label: "Corporate", icon: Building2, className: "bg-eco-sky-light text-eco-sky" },
  volunteer: { label: "Volunteer", icon: Users, className: "bg-eco-amber-light text-eco-amber" },
  government: { label: "Government", icon: Building2, className: "bg-accent text-accent-foreground" },
};

interface Props {
  lang: "en" | "mr";
}

const Community = ({ lang }: Props) => {
  return (
    <div className="p-6 space-y-6 animate-slide-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {lang === "en" ? "Community Connect" : "समुदाय कनेक्ट"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {lang === "en" ? "Connect schools with NGOs, corporates, and volunteers" : "शाळांना NGO, कॉर्पोरेट आणि स्वयंसेवकांशी जोडा"}
          </p>
        </div>
        <Button className="gap-2 gradient-primary text-primary-foreground border-0">
          <Users className="w-4 h-4" />
          {lang === "en" ? "Register Partner" : "भागीदार नोंदणी"}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "NGOs", value: "142", icon: "🤝" },
          { label: lang === "en" ? "Corporate Partners" : "कॉर्पोरेट", value: "38", icon: "🏢" },
          { label: lang === "en" ? "Volunteers" : "स्वयंसेवक", value: "2,450", icon: "🙋" },
          { label: lang === "en" ? "Schools Connected" : "जोडलेल्या शाळा", value: "18,240", icon: "🔗" },
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

      {/* Type Filters */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "ngo", "corporate", "volunteer", "government"] as const).map((type) => (
          <button
            key={type}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-card border border-border text-foreground hover:bg-muted transition-colors"
          >
            {type === "all" ? (lang === "en" ? "All Partners" : "सर्व भागीदार") : typeConfig[type].label}
          </button>
        ))}
      </div>

      {/* Partner Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {partners.map((partner) => {
          const config = typeConfig[partner.type];
          const Icon = config.icon;
          return (
            <div key={partner.id} className="bg-card rounded-xl border border-border shadow-card p-5 hover:shadow-elevated transition-shadow">
              <div className="flex items-start gap-4">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", config.className)}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-foreground">{partner.name}</h4>
                    <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", config.className)}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{partner.description}</p>
                  <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {partner.district}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {partner.schools} {lang === "en" ? "schools" : "शाळा"}
                    </span>
                    <span>{partner.focus}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="text-xs gap-1.5">
                      <Mail className="w-3 h-3" /> {lang === "en" ? "Contact" : "संपर्क"}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs gap-1.5">
                      <ExternalLink className="w-3 h-3" /> {lang === "en" ? "Details" : "तपशील"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Community;
