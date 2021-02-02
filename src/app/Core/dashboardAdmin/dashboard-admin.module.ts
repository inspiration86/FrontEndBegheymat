import {AdminCategoriesComponent} from './admin-categories/admin-categories.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardAdminRoutingModule} from './dashboard-admin-routing.module';
import {IndexComponent} from './index/index.component';
import {SharedmoduleModule} from '../../SharedModule/sharedmodule.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HomepageComponent} from './homepage/homepage.component';
import {BannerComponent} from './banner/banner.component';
import {AddBannerDialogComponent} from './banner/add-banner-dialog/add-banner-dialog.component';
import {EditBannerDialogComponent} from './banner/edit-banner-dialog/edit-banner-dialog.component';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {AdviceAnswerDialogComponent} from './admin-advices/advice-answer-dialog/advice-answer-dialog.component';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {AddSliderDialogComponent} from './homepage/add-slider-dialog/add-slider-dialog.component';
import {EditSliderDialogComponent} from './homepage/edit-slider-dialog/edit-slider-dialog.component';
import {AdminProductsComponent} from './admin-products/admin-products.component';
import {AdminAddProductComponent} from './admin-products/admin-add-product/admin-add-product.component';
import {AdminEditProductComponent} from './admin-products/admin-edit-product/admin-edit-product.component';
import {CategoryEditDialogComponent} from './admin-categories/category-edit-dialog/category-edit-dialog.component';
import {CategoryAddDialogComponent} from './admin-categories/category-add-dialog/category-add-dialog.component';
import {SubCategoryAddDialogComponent} from './admin-categories/sub-category-add-dialog/sub-category-add-dialog.component';
import {SubSubCategoryAddDialogComponent} from './admin-categories/sub-sub-category-add-dialog/sub-sub-category-add-dialog.component';
import {SubCategoryEditDialogComponent} from './admin-categories/sub-category-edit-dialog/sub-category-edit-dialog.component';
import {SubSubCategoryEditDialogComponent} from './admin-categories/sub-sub-category-edit-dialog/sub-sub-category-edit-dialog.component';
import {AdminFeaturesComponent} from './admin-features/admin-features.component';
import {FeatureAddDialogComponent} from './admin-features/feature-add-dialog/feature-add-dialog.component';
import {FeatureValueAddDialogComponent} from './admin-features/feature-value-add-dialog/feature-value-add-dialog.component';
import {FeatureEditDialogComponent} from './admin-features/feature-edit-dialog/feature-edit-dialog.component';
import {FeatureValueEditDialogComponent} from './admin-features/feature-value-edit-dialog/feature-value-edit-dialog.component';
import {AdminSellersComponent} from './admin-sellers/admin-sellers.component';
import {AdminCommentsComponent} from './admin-comments/admin-comments.component';
import {AdminAdvicesComponent} from './admin-advices/admin-advices.component';
import {AdminAddSellerComponent} from './admin-sellers/admin-add-seller/admin-add-seller.component';
import {AdminEditSellerComponent} from './admin-sellers/admin-edit-seller/admin-edit-seller.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {InputMaskModule} from 'primeng/inputmask';
import {AdminUsersComponent} from './admin-users/admin-users.component';
import {AdminAddUserComponent} from './admin-users/admin-add-user/admin-add-user.component';
import {AdminEditUserComponent} from './admin-users/admin-edit-user/admin-edit-user.component';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {SellerDetailDialogComponent} from './admin-sellers/seller-detail-dialog/seller-detail-dialog.component';
import {EditorModule} from 'primeng/editor';
import {AdminNotificationsComponent} from './admin-notifications/admin-notifications.component';
import {NotificationAddDialogComponent} from './admin-notifications/notification-add-dialog/notification-add-dialog.component';
import {NotificationEditDialogComponent} from './admin-notifications/notification-edit-dialog/notification-edit-dialog.component';
import {NotificationDetailDialogComponent} from './admin-notifications/notification-detail-dialog/notification-detail-dialog.component';
import {AdminSellerContractsComponent} from './admin-seller-contracts/admin-seller-contracts.component';
import {SellerContractEditDialogComponent} from './admin-seller-contracts/seller-contract-edit-dialog/seller-contract-edit-dialog.component';
import {AdminCommissionComponent} from './admin-commission/admin-commission.component';
import {CommissionAddDialogComponent} from './admin-commission/commission-add-dialog/commission-add-dialog.component';
import {CommissionEditDialogComponent} from './admin-commission/commission-edit-dialog/commission-edit-dialog.component';
import {SplitButtonModule} from 'primeng/splitbutton';
import {AdminProfileComponent} from './admin-profile/admin-profile.component';
import {AdminAdministratorsComponent} from './admin-administrators/admin-administrators.component';
import {AdministratorAddDialogComponent} from './admin-administrators/administrator-add-dialog/administrator-add-dialog.component';
import {AdministratorEditDialogComponent} from './admin-administrators/administrator-edit-dialog/administrator-edit-dialog.component';
import {AdministratorChangePasswordDialogComponent} from './admin-administrators/administrator-change-password-dialog/administrator-change-password-dialog.component';
import {ListboxModule} from 'primeng/listbox';
import {AdminOrdersComponent} from './admin-orders/admin-orders.component';
import {AdminTrackOrdersComponent} from './admin-track-orders/admin-track-orders.component';
import {AdminTransactionsComponent} from './admin-transactions/admin-transactions.component';
import {SideBannerComponent} from './side-banner/side-banner.component';
import { AddSideBannerDialogComponent } from './side-banner/add-side-banner-dialog/add-side-banner-dialog.component';
import { EditSideBannerDialogComponent } from './side-banner/edit-side-banner-dialog/edit-side-banner-dialog.component';

@NgModule({
  declarations: [
    IndexComponent,
    HomepageComponent,
    BannerComponent,
    AddBannerDialogComponent,
    EditBannerDialogComponent,
    AdviceAnswerDialogComponent,
    AddSliderDialogComponent,
    EditSliderDialogComponent,
    AdminProductsComponent,
    AdminAddProductComponent,
    AdminEditProductComponent,
    AdminCategoriesComponent,
    CategoryEditDialogComponent,
    CategoryAddDialogComponent,
    SubCategoryAddDialogComponent,
    SubSubCategoryAddDialogComponent,
    SubCategoryEditDialogComponent,
    SubSubCategoryEditDialogComponent,
    AdminFeaturesComponent,
    FeatureAddDialogComponent,
    FeatureValueAddDialogComponent,
    FeatureEditDialogComponent,
    FeatureValueEditDialogComponent,
    AdminSellersComponent,
    AdminCommentsComponent,
    AdminAdvicesComponent,
    AdminAddSellerComponent,
    AdminEditSellerComponent,
    AdminUsersComponent,
    AdminAddUserComponent,
    AdminEditUserComponent,
    AdminLoginComponent,
    SellerDetailDialogComponent,
    AdminNotificationsComponent,
    NotificationAddDialogComponent,
    NotificationEditDialogComponent,
    NotificationDetailDialogComponent,
    AdminSellerContractsComponent,
    SellerContractEditDialogComponent,
    AdminCommissionComponent,
    CommissionAddDialogComponent,
    CommissionEditDialogComponent,
    AdminProfileComponent,
    AdminAdministratorsComponent,
    AdministratorAddDialogComponent,
    AdministratorEditDialogComponent,
    AdministratorChangePasswordDialogComponent,
    AdminOrdersComponent,
    AdminTrackOrdersComponent,
    AdminTransactionsComponent,
    SideBannerComponent,
    AddSideBannerDialogComponent,
    EditSideBannerDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardAdminRoutingModule,
    SharedmoduleModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    InputSwitchModule,
    MatStepperModule,
    MatRadioModule,
    InputMaskModule,
    EditorModule,
    SplitButtonModule,
    ListboxModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [
    AdviceAnswerDialogComponent,
    AddSliderDialogComponent,
    EditSliderDialogComponent,
    CategoryEditDialogComponent,
    CategoryAddDialogComponent,
    SubCategoryAddDialogComponent,
    SubSubCategoryAddDialogComponent,
    SubCategoryEditDialogComponent,
    SubSubCategoryEditDialogComponent,
    FeatureAddDialogComponent,
    FeatureValueAddDialogComponent,
    FeatureEditDialogComponent,
    FeatureValueEditDialogComponent,
    SellerDetailDialogComponent,
    NotificationAddDialogComponent,
    NotificationEditDialogComponent,
    NotificationDetailDialogComponent,
    SellerContractEditDialogComponent,
    CommissionAddDialogComponent,
    CommissionEditDialogComponent,
    AdministratorAddDialogComponent,
    AdministratorEditDialogComponent,
    AdministratorChangePasswordDialogComponent,
    AddBannerDialogComponent,
    EditBannerDialogComponent,
    AddSideBannerDialogComponent,
    EditSideBannerDialogComponent
  ]
})
export class DashboardAdminModule {
}
