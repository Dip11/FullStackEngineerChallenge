export const childRoutes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { icon: 'dashboard', text: 'Dashboard' }
  },

  {
    path: 'employee',
    loadChildren: () =>
      import('./employee/emplyoee.module').then(m => m.EmployeeModule),
    data: { icon: 'bar_chart', text: 'Employee' }
  },
  {
    path: 'performance-phrase',
    loadChildren: () =>
      import('./performance-phrase/performance-phrase.module').then(m => m.PerformancePhraseModule),
    data: { icon: 'bar_chart', text: 'Performance Phrase' }
  },
];
