import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminAddProductComponent } from './admin-products/admin-add-product/admin-add-product.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {BannerComponent} from "./banner/banner.component";
import {AdminFeaturesComponent} from './admin-features/admin-features.component';
import {AdminEditProductComponent} from './admin-products/admin-edit-product/admin-edit-product.component';
import {AdminCommentsComponent} from './admin-comments/admin-comments.component';
import {AdminAdvicesComponent} from './admin-advices/admin-advices.component';
import {AdminSellersComponent} from './admin-sellers/admin-sellers.component';
import {AdminAddSellerComponent} from './admin-sellers/admin-add-seller/admin-add-seller.component';
import {AdminEditSellerComponent} from './admin-sellers/admin-edit-seller/admin-edit-seller.component';
import {AdminUsersComponent} from './admin-users/admin-users.component';
import {AdminEditUserComponent} from './admin-users/admin-edit-user/admin-edit-user.component';
import {AdminAddUserComponent} from './admin-users/admin-add-user/admin-add-user.component';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {AdminNotificationsComponent} from './admin-notifications/admin-notifications.component';
import {AdminSellerContractsComponent} from './admin-seller-contracts/admin-seller-contracts.component';
import {AdminCommissionComponent} from './admin-commission/admin-commission.component';
import {AdminAdministratorsComponent} from './admin-administrators/admin-administrators.component';
import {AdminProfileComponent} from './admin-profile/admin-profile.component';
import {AdminOrdersComponent} from './admin-orders/admin-orders.component';
import {AdminTrackOrdersComponent} from './admin-track-orders/admin-track-orders.component';
import {AdminTransactionsComponent} from './admin-transactions/admin-transactions.component';
import {SideBannerComponent} from './side-banner/side-banner.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLoginComponent
  },
  {
    path: 'index',
    component: IndexComponent,
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'product',
      component: AdminProductsComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'product/add',
      component: AdminAddProductComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'product/edit/:id',
      component: AdminEditProductComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'category',
      component: AdminCategoriesComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'comment',
      component: AdminCommentsComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'advice',
      component: AdminAdvicesComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'homepage',
      component: HomepageComponent
    }]
  },
    {
      path: '',
      component: IndexComponent,
      children: [{
        path: 'banner',
        component: BannerComponent
      }]
    },
  {
      path: '',
      component: IndexComponent,
      children: [{
        path: 'side-banner',
        component: SideBannerComponent
      }]
    },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'seller',
      component: AdminSellersComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'seller/add',
      component: AdminAddSellerComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'seller/edit/:id',
      component: AdminEditSellerComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'feature',
      component: AdminFeaturesComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'user',
      component: AdminUsersComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'user/add',
      component: AdminAddUserComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'user/edit/:id',
      component: AdminEditUserComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'notification',
      component: AdminNotificationsComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'commission',
      component: AdminCommissionComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'contract',
      component: AdminSellerContractsComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'profile',
      component: AdminProfileComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'admin',
      component: AdminAdministratorsComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'order',
      component: AdminOrdersComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'track',
      component: AdminTrackOrdersComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'transaction',
      component: AdminTransactionsComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardAdminRoutingModule {
}
