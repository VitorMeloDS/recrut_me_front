export interface Profile {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  menus: Menu[];
}

export interface Menu {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

export interface Pivot {
  id_profile: number;
  id_menu: number;
}
