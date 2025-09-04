import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Database,
  GitBranch,
  Shield,
  BarChart3,
  Key,
  FileText,
  Archive,
  Bot,
  Server,
  Link,
  Home
} from "lucide-react";

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
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Data Catalog", url: "/catalog", icon: Database },
  { title: "Lineage Explorer", url: "/lineage", icon: GitBranch },
  { title: "Policy Studio", url: "/policies", icon: Shield },
  { title: "Data Quality", url: "/quality", icon: BarChart3 },
  { title: "Access Center", url: "/access", icon: Key },
  { title: "Regulatory", url: "/regulatory", icon: FileText },
  { title: "Audit Evidence", url: "/audit", icon: Archive },
  { title: "Source Completeness", url: "/sources", icon: Server },
  { title: "SQL Connector", url: "/sql-connector", icon: Link },
  { title: "Innovation Lab", url: "/innovation", icon: Bot },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + "/");
  const getNavClass = (path: string) =>
    isActive(path)
      ? "bg-primary text-primary-foreground font-medium shadow-sm"
      : "hover:bg-muted/50 transition-colors";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-card border-r">
        {/* Logo/Brand Section */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-sm">Data Governance</h2>
                <p className="text-xs text-muted-foreground">Enterprise Platform</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="px-2">
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`${getNavClass(item.url)} flex items-center gap-3 p-3 rounded-lg`}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* AI Assistant Section */}
        <div className="mt-auto p-4 border-t">
          <div className={`flex items-center gap-3 p-3 rounded-lg bg-accent/10 border border-accent/20 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
              <Bot className="w-3 h-3 text-accent-foreground" />
            </div>
            {!collapsed && (
              <div className="flex-1">
                <p className="text-xs font-medium text-accent">AI Assistant</p>
                <p className="text-xs text-muted-foreground">Ready to help</p>
              </div>
            )}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}