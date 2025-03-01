export interface Invite {
  id: number;
  email: string;
  token: string;
  status: 'Finalizado' | 'Em Aberto' | 'Vencido';
  created_at: string;
  expires_at: string;
}
