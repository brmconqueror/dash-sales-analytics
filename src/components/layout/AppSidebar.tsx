import { BarChart3, ShoppingBag, Users, FileText, LogOut } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

interface AppSidebarProps {
  onLogout: () => void;
  username?: string;
  isAdmin?: boolean;
}

const sidebarItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Siparişler",
    url: "/orders",
    icon: ShoppingBag,
  },
  {
    title: "Müşteriler",
    url: "/customers",
    icon: Users,
  },
  {
    title: "Raporlar",
    url: "/reports",
    icon: FileText,
  },
];

export function AppSidebar({ onLogout, username, isAdmin }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"}>
      <SidebarHeader className="p-4">
        {!collapsed && (
          <div className="flex flex-col space-y-1">
            <h2 className="text-lg font-bold text-sidebar-foreground">Satış Panel</h2>
            <p className="text-sm text-sidebar-accent-foreground">
              {username} {isAdmin && "(Admin)"}
            </p>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-accent-foreground">
            {!collapsed && "Menü"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          isActive
                            ? "sidebar-nav-active"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button
          variant="ghost"
          onClick={onLogout}
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="ml-3">Çıkış</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}