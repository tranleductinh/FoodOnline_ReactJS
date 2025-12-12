import {
  ClipboardListIcon,
  LogOut,
  Package,
  UtensilsCrossed,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useContext } from "react";
import AuthContext from "@/contexts/authContext";

// Menu items.

export function SideBarAdmin() {
  const { logOutContext } = useContext(AuthContext);
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="p-0">
          <div className="p-4 border-b ">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary ">
                <UtensilsCrossed size={20} className="text-white" />
              </div>
              <div>
                <h1 className="font-bold text-foreground">FoodOrder</h1>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            </div>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="p-4 space-y-1">
                <Link
                  to="/admin"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-muted text-foreground"
                >
                  <Package size={20} className="w-5 h-5" />
                  <span className="font-medium text-[16px]">
                    Food Management
                  </span>
                </Link>
                <Link
                  to="/admin/orders"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-muted text-foreground"
                >
                  <ClipboardListIcon size={20} className="w-5 h-5" />
                  <span className="font-medium text-[16px]">
                    Order Management
                  </span>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t mt-auto">
        <Button
          onClick={() => logOutContext()}
          className="justify-start bg-transparent text-destructive hover:bg-destructive/10"
        >
          <LogOut size={24} />
          <span>Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default SideBarAdmin;
