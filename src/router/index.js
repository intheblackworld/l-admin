import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/ex/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/ex/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/ex/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/ex/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/ex/error-page/401'),
    hidden: true
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/ex/dashboard/index'),
  //       name: 'Dashboard',
  //       meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
  //     }
  //   ]
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/outline',
    children: [
      {
        path: 'outline',
        component: () => import('@/views/outline/index'),
        name: 'Outline',
        meta: { title: '總指標趨勢', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    alwaysShow: true,
    meta: { title: '文件與示例', icon: 'documentation', affix: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/ex/documentation/index'),
        name: 'Documentation',
        meta: { title: 'Documentation', icon: 'documentation', affix: true }
      },
      {
        path: '/guide',
        // component: Layout,
        component: () => import('@/views/ex/guide/index'),
        name: 'Guide',
        meta: { title: 'Guide', icon: 'guide', noCache: true }
      },
      {
        path: '/profile',
        // component: Layout,
        // redirect: '/profile/index',
        // hidden: true,
        component: () => import('@/views/ex/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
        // children: [
        //   {
        //     path: 'index',

        //   }
        // ]
      },
      {
        path: '/permission',
        // component: Layout,
        component: () => import('@/views/ex/permission/page'),
        redirect: '/permission/page',
        alwaysShow: true, // will always show the root menu
        name: 'Permission',
        meta: {
          title: 'Permission',
          icon: 'lock',
          roles: ['admin', 'editor'] // you can set roles in root nav
        },
        children: [
          {
            path: 'page',
            component: () => import('@/views/ex/permission/page'),
            name: 'PagePermission',
            meta: {
              title: 'Page Permission',
              roles: ['admin'] // or you can only set roles in sub nav
            }
          },
          {
            path: 'directive',
            component: () => import('@/views/ex/permission/directive'),
            name: 'DirectivePermission',
            meta: {
              title: 'Directive Permission'
              // if do not set roles, means: this page does not require permission
            }
          },
          {
            path: 'role',
            component: () => import('@/views/ex/permission/role'),
            name: 'RolePermission',
            meta: {
              title: 'Role Permission',
              roles: ['admin']
            }
          }
        ]
      },
      {
        path: '/icon',
        // component: Layout,
        component: () => import('@/views/ex/icons/index'),
        children: [
          {
            path: 'index',
            component: () => import('@/views/ex/icons/index'),
            name: 'Icons',
            meta: { title: 'Icons', icon: 'icon', noCache: true }
          }
        ]
      },
      /** when your routing map is too long, you can split it into small modules **/
      componentsRouter,
      chartsRouter,
      nestedRouter,
      tableRouter,

      {
        path: '/example',
        // component: Layout,
        component: () => import('@/views/ex/example/create'),
        redirect: '/example/list',
        name: 'Example',
        meta: {
          title: 'Example',
          icon: 'example'
        },
        children: [
          {
            path: 'create',
            component: () => import('@/views/ex/example/create'),
            name: 'CreateArticle',
            meta: { title: 'Create Article', icon: 'edit' }
          },
          {
            path: 'edit/:id(\\d+)',
            component: () => import('@/views/ex/example/edit'),
            name: 'EditArticle',
            meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
            hidden: true
          },
          {
            path: 'list',
            component: () => import('@/views/ex/example/list'),
            name: 'ArticleList',
            meta: { title: 'Article List', icon: 'list' }
          }
        ]
      },
      {
        path: '/tab',
        // component: Layout,
        component: () => import('@/views/ex/tab/index'),
        children: [
          {
            path: 'index',
            component: () => import('@/views/ex/tab/index'),
            name: 'Tab',
            meta: { title: 'Tab', icon: 'tab' }
          }
        ]
      },

      {
        path: '/error',
        // component: Layout,
        component: () => import('@/views/ex/error-page/401'),
        redirect: 'noRedirect',
        name: 'ErrorPages',
        meta: {
          title: 'Error Pages',
          icon: '404'
        },
        children: [
          {
            path: '401',
            component: () => import('@/views/ex/error-page/401'),
            name: 'Page401',
            meta: { title: '401', noCache: true }
          },
          {
            path: '404',
            component: () => import('@/views/ex/error-page/404'),
            name: 'Page404',
            meta: { title: '404', noCache: true }
          }
        ]
      },

      {
        path: '/error-log',
        // component: Layout,
        component: () => import('@/views/ex/error-log/index'),
        children: [
          {
            path: 'log',
            component: () => import('@/views/ex/error-log/index'),
            name: 'ErrorLog',
            meta: { title: 'Error Log', icon: 'bug' }
          }
        ]
      },

      {
        path: '/excel',
        // component: Layout,
        component: () => import('@/views/ex/excel/export-excel'),
        redirect: '/excel/export-excel',
        name: 'Excel',
        meta: {
          title: 'Excel',
          icon: 'excel'
        },
        children: [
          {
            path: 'export-excel',
            component: () => import('@/views/ex/excel/export-excel'),
            name: 'ExportExcel',
            meta: { title: 'Export Excel' }
          },
          {
            path: 'export-selected-excel',
            component: () => import('@/views/ex/excel/select-excel'),
            name: 'SelectExcel',
            meta: { title: 'Export Selected' }
          },
          {
            path: 'export-merge-header',
            component: () => import('@/views/ex/excel/merge-header'),
            name: 'MergeHeader',
            meta: { title: 'Merge Header' }
          },
          {
            path: 'upload-excel',
            component: () => import('@/views/ex/excel/upload-excel'),
            name: 'UploadExcel',
            meta: { title: 'Upload Excel' }
          }
        ]
      },

      {
        path: '/zip',
        // component: Layout,
        component: () => import('@/views/ex/zip/index'),
        redirect: '/zip/download',
        alwaysShow: true,
        name: 'Zip',
        meta: { title: 'Zip', icon: 'zip' },
        children: [
          {
            path: 'download',
            component: () => import('@/views/ex/zip/index'),
            name: 'ExportZip',
            meta: { title: 'Export Zip' }
          }
        ]
      },

      {
        path: '/pdf',
        // component: Layout,
        component: () => import('@/views/ex/pdf/index'),
        redirect: '/pdf/index',
        children: [
          {
            path: 'index',
            component: () => import('@/views/ex/pdf/index'),
            name: 'PDF',
            meta: { title: 'PDF', icon: 'pdf' }
          }
        ]
      },
      {
        path: '/pdf/download',
        component: () => import('@/views/ex/pdf/download'),
        hidden: true
      },

      {
        path: '/theme',
        // component: Layout,
        component: () => import('@/views/ex/theme/index'),
        children: [
          {
            path: 'index',
            component: () => import('@/views/ex/theme/index'),
            name: 'Theme',
            meta: { title: 'Theme', icon: 'theme' }
          }
        ]
      },

      {
        path: '/clipboard',
        // component: Layout,
        component: () => import('@/views/ex/clipboard/index'),
        children: [
          {
            path: 'index',
            component: () => import('@/views/ex/clipboard/index'),
            name: 'ClipboardDemo',
            meta: { title: 'Clipboard', icon: 'clipboard' }
          }
        ]
      },

      {
        path: 'external-link',
        component: Layout,
        hidden: true,
        children: [
          {
            path: 'https://github.com/PanJiaChen/vue-element-admin',
            meta: { title: 'External Link', icon: 'link' }
          }
        ]
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
