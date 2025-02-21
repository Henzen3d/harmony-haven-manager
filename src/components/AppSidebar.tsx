
import {
  Home,
  Building2,
  Users,
  CreditCard,
  FileText,
  User,
  Settings,
  LogOut,
  PieChart,
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
  Receipt,
  BanknotesIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { 
    title: "Home", 
    icon: Home, 
    url: "/" 
  },
  { 
    title: "Buildings", 
    icon: Building2, 
    url: "/buildings" 
  },
  { 
    title: "Residents", 
    icon: Users, 
    url: "/residents" 
  },
  { 
    title: "Finances", 
    icon: CreditCard,
    url: "/finances",
    submenu: [
      { title: "Despesas", url: "/finances/expenses", icon: ArrowDownCircle },
      { title: "Receitas", url: "/finances/income", icon: ArrowUpCircle },
      { title: "Cobranças", url: "/finances/charges", icon: Receipt },
    ]
  },
  { 
    title: "Documents", 
    icon: FileText, 
    url: "/documents" 
  },
  { 
    title: "Relatório", 
    icon: PieChart, 
    url: "/reports" 
  },
  { 
    title: "Banco/Caixa", 
    icon: Wallet, 
    url: "/bank" 
  },
  { 
    title: "Profile", 
    icon: User, 
    url: "/profile" 
  },
  { 
    title: "Settings", 
    icon: Settings, 
    url: "/settings" 
  },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4">
          <h1 className="text-2xl font-semibold text-primary">
            Harmony Haven
          </h1>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.submenu ? (
                    <>
                      <SidebarMenuButton className="w-full">
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                      <SidebarMenuSub>
                        {item.submenu.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link to={subItem.url} className="flex items-center gap-2">
                                <subItem.icon className="w-4 h-4" />
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link to={item.url} className="flex items-center gap-2">
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
