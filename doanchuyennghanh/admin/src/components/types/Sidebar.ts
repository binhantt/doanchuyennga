
export interface SidebarItemType {
  name: string;
  title? : string;
  icon: any;
  path: string;
  section?: string;
  children?: SidebarItemType[];
}