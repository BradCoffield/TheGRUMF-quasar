
const routes = [
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/active-submissions', component: () => import('pages/list-active-submissions') },
      { path: '/unfinalized-submissions', component: () => import('pages/list-unfinalized-submissions') },
      { path: '/finalized-submissions', component: () => import('pages/list-finalized-submissions') },
      { path: '/every-submission-ever', component: () => import('pages/every-submission-ever') },
      { path: '/add-submission', component: () => import('pages/add-new-submission') },
      { path: '/stock-responses', component: () => import('pages/stock-responses') },
      { path: '/edit-submission', component: () => import('pages/edit-submission'), name: 'edit-submission', },
      { path: '/rate-submission', component: () => import('pages/rate-submission'), name: 'rate-submission', },
      { path: '/submission-details', component: () => import('pages/submission-details'), name: 'submission-details', },
      { path: '/set-current-issue', component: () => import('pages/set-current-issue'), name: 'set-current-issue', },
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
