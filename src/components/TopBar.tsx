import { cn } from "@/lib/utils";
import { Bell, Globe, Search, User, AlertTriangle, CheckCircle, FileText, Moon, Sun, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { translations, Language } from "@/lib/translations";
import { useTheme } from "@/lib/theme-provider";

interface TopBarProps {
  lang: Language;
  onToggleLang: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const TopBar = ({ lang, onToggleLang, searchQuery, onSearchChange }: TopBarProps) => {
  const t = translations[lang];
  const { theme, setTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [notifications] = useState([
    { 
      id: 1, 
      message: "New activity logged by ZP School, Shirdi", 
      time: "5 min ago", 
      read: false,
      icon: CheckCircle,
      color: "text-eco-green"
    },
    { 
      id: 2, 
      message: "Compliance report ready for Pune district", 
      time: "1 hour ago", 
      read: false,
      icon: FileText,
      color: "text-eco-sky"
    },
    { 
      id: 3, 
      message: "3 schools at risk in Washim", 
      time: "3 hours ago", 
      read: true,
      icon: AlertTriangle,
      color: "text-eco-amber"
    },
    { 
      id: 4, 
      message: "Monthly summary available", 
      time: "1 day ago", 
      read: true,
      icon: FileText,
      color: "text-muted-foreground"
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="pl-9 pr-4 py-2 rounded-lg bg-muted text-foreground placeholder:text-muted-foreground w-72 focus:outline-none focus:ring-2 focus:ring-ring dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Language Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleLang}
          className="text-xs font-semibold gap-1.5 hover:bg-muted"
        >
          <Globe className="w-4 h-4" />
          {lang === "en" ? "मराठी" : "English"}
        </Button>

        {/* Theme Toggle Button with Dropdown */}
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative hover:bg-muted transition-all duration-200"
            onClick={() => setShowThemeMenu(!showThemeMenu)}
          >
            {theme === "dark" ? (
              <Moon className="w-5 h-5" />
            ) : theme === "light" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Laptop className="w-5 h-5" />
            )}
          </Button>

          {/* Theme Dropdown Menu */}
          {showThemeMenu && (
            <>
              <div 
                className="fixed inset-0 z-30" 
                onClick={() => setShowThemeMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-36 bg-card border border-border rounded-lg shadow-elevated z-40 overflow-hidden">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setTheme("light");
                      setShowThemeMenu(false);
                    }}
                    className={cn(
                      "w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-muted transition-colors",
                      theme === "light" ? "text-primary font-medium" : "text-foreground"
                    )}
                  >
                    <Sun className="w-4 h-4" />
                    {t.light}
                  </button>
                  <button
                    onClick={() => {
                      setTheme("dark");
                      setShowThemeMenu(false);
                    }}
                    className={cn(
                      "w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-muted transition-colors",
                      theme === "dark" ? "text-primary font-medium" : "text-foreground"
                    )}
                  >
                    <Moon className="w-4 h-4" />
                    {t.dark}
                  </button>
                  <button
                    onClick={() => {
                      setTheme("system");
                      setShowThemeMenu(false);
                    }}
                    className={cn(
                      "w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-muted transition-colors",
                      theme === "system" ? "text-primary font-medium" : "text-foreground"
                    )}
                  >
                    <Laptop className="w-4 h-4" />
                    {t.system}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative hover:bg-muted transition-all duration-200"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full animate-ping opacity-75" />
              </>
            )}
          </Button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <>
              <div 
                className="fixed inset-0 z-30" 
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-96 bg-card border border-border rounded-lg shadow-elevated z-40 overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-border bg-muted/20">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-foreground text-lg">
                      {t.notifications}
                    </h3>
                    {unreadCount > 0 && (
                      <span className="text-xs bg-destructive text-white px-2.5 py-1 rounded-full font-medium">
                        {unreadCount} {t.new}
                      </span>
                    )}
                  </div>
                </div>

                {/* Notifications List */}
                <div className="max-h-[400px] overflow-y-auto divide-y divide-border">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => {
                      const Icon = notification.icon;
                      return (
                        <div 
                          key={notification.id}
                          className={cn(
                            "p-4 hover:bg-muted/30 transition-colors cursor-pointer",
                            !notification.read ? "bg-eco-green-light/5 dark:bg-eco-green-light/10" : ""
                          )}
                        >
                          <div className="flex gap-3">
                            {/* Icon */}
                            <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                              !notification.read ? "bg-eco-green-light dark:bg-eco-green-light/20" : "bg-muted"
                            )}>
                              <Icon className={cn(
                                "w-4 h-4",
                                notification.color
                              )} />
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <p className={cn(
                                "text-sm",
                                !notification.read ? "text-foreground font-medium" : "text-muted-foreground"
                              )}>
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {notification.time}
                              </p>
                            </div>

                            {/* Unread dot */}
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-8 text-center">
                      <Bell className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">
                        {t.noNotifications}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-border bg-muted/10">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full text-sm font-medium text-primary hover:text-primary hover:bg-primary/10"
                  >
                    {t.markAllAsRead}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile */}
        <div className="relative group">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors shadow-sm">
            <User className="w-5 h-5 text-white" />
          </div>
          
          {/* User Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-40">
            <div className="p-2">
              <div className="px-3 py-2 text-sm text-foreground font-medium border-b border-border">{t.adminUser}</div>
              <div className="px-3 py-2 text-xs text-muted-foreground border-b border-border">admin@ecotrack.com</div>
              <Button variant="ghost" size="sm" className="w-full justify-start text-sm my-1">
                {t.profile}
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                {t.settings}
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-sm text-destructive hover:text-destructive">
                {t.logout}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;