import { School, ClipboardList, CheckCircle, AlertTriangle } from "lucide-react";
import MetricCard from "@/components/MetricCard";
import ComplianceTable from "@/components/ComplianceTable";
import RecentActivities from "@/components/RecentActivities";
import DistrictMap from "@/components/DistrictMap";
import { translations, Language } from "@/lib/translations";

interface Props {
  lang: Language;
  searchQuery?: string;
}

const Index = ({ lang, searchQuery = "" }: Props) => {
  const t = translations[lang];

  return (
    <div className="p-6 space-y-6 animate-slide-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          {t.dashboardTitle}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {t.dashboardSubtitle}
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={School}
          label={t.registeredSchools}
          value="75,420"
          change="+1,230"
          changeType="positive"
          variant="green"
        />
        <MetricCard
          icon={ClipboardList}
          label={t.activitiesThisMonth}
          value="12,847"
          change="+18%"
          changeType="positive"
          variant="sky"
        />
        <MetricCard
          icon={CheckCircle}
          label={t.complianceRate}
          value="78.3%"
          change="+2.1%"
          changeType="positive"
          variant="default"
        />
        <MetricCard
          icon={AlertTriangle}
          label={t.schoolsAtRisk}
          value="4,312"
          change="-540"
          changeType="positive"
          variant="amber"
        />
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ComplianceTable lang={lang} searchQuery={searchQuery} />
        </div>
        <div>
          <RecentActivities lang={lang} />
        </div>
      </div>

      {/* District overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DistrictMap lang={lang} />
        <div className="bg-card rounded-xl border border-border shadow-card p-5">
          <h3 className="font-semibold text-foreground mb-4">
            {t.rolloutProgress}
          </h3>
          <div className="space-y-4">
            {[
              { phase: t.phase1, progress: 100, status: t.complete },
              { phase: t.phase2, progress: 72, status: t.inProgress },
              { phase: t.phase3, progress: 15, status: t.starting },
              { phase: t.phase4, progress: 0, status: t.planned },
              { phase: t.phase5, progress: 0, status: t.planned },
            ].map((p, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-foreground">{p.phase}</span>
                  <span className="text-muted-foreground text-xs">{p.status}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full gradient-primary transition-all duration-700"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;