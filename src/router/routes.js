
const routes = [
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/active-submissions', component: () => import('pages/list-active-submissions') },
      { path: '/add-submission', component: () => import('pages/add-new-submission') },
      { path: '/stock-responses', component: () => import('pages/stock-responses') },
      { path: '/edit-submission', component: () => import('pages/edit-submission') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
