import { Search, Bell, User, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function TopBar() {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-card">
      {/* Left side - Navigation toggle and search */}
      <div className="flex items-center gap-4 flex-1">
        <SidebarTrigger className="lg:hidden" />
        
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search datasets, policies, or users..."
            className="pl-10 bg-muted/30 border-none focus:bg-background transition-colors"
          />
        </div>
      </div>

      {/* Right side - Notifications and user menu */}
      <div className="flex items-center gap-3">
        {/* AI Assistant Button */}
        <Button variant="outline" size="sm" className="hidden sm:flex">
          <div className="w-2 h-2 bg-success rounded-full mr-2" />
          AI Assistant
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center"
              >
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-3 border-b">
              <h4 className="font-medium">Notifications</h4>
              <p className="text-sm text-muted-foreground">You have 3 unread notifications</p>
            </div>
            <DropdownMenuItem className="p-3">
              <div>
                <p className="text-sm font-medium">Policy Violation Detected</p>
                <p className="text-xs text-muted-foreground">Customer PII found in development environment</p>
                <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3">
              <div>
                <p className="text-sm font-medium">Access Request Pending</p>
                <p className="text-xs text-muted-foreground">Sarah Chen requesting access to Financial Reports</p>
                <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3">
              <div>
                <p className="text-sm font-medium">Data Quality Alert</p>
                <p className="text-xs text-muted-foreground">Anomaly detected in Customer master data</p>
                <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium">Amit Khopade</p>
                <p className="text-xs text-muted-foreground">Chief Data Officer</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}