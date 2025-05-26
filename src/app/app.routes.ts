import { Routes } from "@angular/router";
import { adminGuard } from "./core/guards/admin.guard";
import { agentGuard } from "./core/guards/agent.guard";
import { authGuard } from "./core/guards/auth.guard"; // ✅ Novo guard

export const routes: Routes = [
  // Rotas públicas
  { path: "login", loadComponent: () => import("./auth/pages/login/login.component").then(m => m.LoginComponent) },
  { path: "register", loadComponent: () => import("./auth/pages/register/register.component").then(m => m.RegisterComponent) },
  { path: "forgot-password", loadComponent: () => import("./auth/pages/forgot-password/forgot-password.component").then(m => m.ForgotPasswordComponent) },

  // Rotas protegidas com `authGuard` + específicos
  {
    path: "admin/dashboard",
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import("./admin/pages/dashboard/dashboard.component").then(m => m.DashboardComponent)
  },
  {
    path: "agente/dashboard",
    canActivate: [authGuard, agentGuard],
    loadComponent: () => import("./agent/pages/dashboard/dashboard.component").then(m => m.DashboardComponent)
  },

  // Redirecionamentos
  { path: "", pathMatch: "full", redirectTo: "/login" },
  { path: "**", redirectTo: "/login" }
];
