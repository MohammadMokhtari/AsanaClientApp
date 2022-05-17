import { UserProfileComponent } from './header/top-header/top-header-user-area/user-profile/user-profile.component';
import { backdropDirective } from './directives/backdrop.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from '../page-routing.module';
import { SwiperModule } from 'swiper/angular';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { TopHeaderComponent } from './header/top-header/top-header.component';
import { TopHeaderSearchComponent } from './header/top-header/top-header-search/top-header-search.component';
import { TopHeaderUserAreaComponent } from './header/top-header/top-header-user-area/top-header-user-area.component';
import { BottomHeaderComponent } from './header/bottom-header/bottom-header.component';
import { SiteMenuComponent } from './header/bottom-header/site-menu/site-menu.component';
import { SiteOptionComponent } from './header/bottom-header/site-option/site-option.component';
import { SiteMenuItemComponent } from './header/bottom-header/site-menu/site-menu-item/site-menu-item.component';
import { SubMenuComponent } from './header/bottom-header/site-menu/site-menu-item/sub-menu/sub-menu.component';
import { MegaMenuComponent } from './header/bottom-header/site-menu/mega-menu/mega-menu.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MegaMenuItemComponent } from './header/bottom-header/site-menu/mega-menu/mega-menu-item/mega-menu-item.component';
import { FooterComponent } from './footer/footer.component';
import { TopFooterComponent } from './footer/top-footer/top-footer.component';
import { BottomFooterComponent } from './footer/bottom-footer/bottom-footer.component';
import { HomeFeatureComponent } from './home-feature/home-feature.component';
import { FooterCrComponent } from './footer/footer-cr/footer-cr.component';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { WidgetMainCategoryComponent } from './widget-main-category/widget-main-category.component';
import { WidgetSliderProductComponent } from './widget-slider-product/widget-slider-product.component';
import { UserLocationComponent } from './header/bottom-header/site-option/user-location/user-location.component';
import { UserLocationItemComponent } from './header/bottom-header/site-option/user-location/user-location-item/user-location-item.component';
import { HomeComponent } from './home/home.component';
import { MatMenuModule } from '@angular/material/menu';
import { MegaSubMenuItemComponent } from './header/bottom-header/site-menu/mega-menu/mega-menu-item/mega-sub-menu-item/mega-sub-menu-item..cmponent';
@NgModule({
  declarations: [
    UserProfileComponent,
    LayoutComponent,
    HeaderComponent,
    TopHeaderComponent,
    TopHeaderSearchComponent,
    TopHeaderUserAreaComponent,
    BottomHeaderComponent,
    SiteOptionComponent,
    SiteMenuComponent,
    SiteMenuItemComponent,
    SubMenuComponent,
    MegaMenuComponent,
    MegaSubMenuItemComponent,
    backdropDirective,
    MegaMenuItemComponent,
    UserProfileComponent,
    FooterComponent,
    TopFooterComponent,
    BottomFooterComponent,
    HomeFeatureComponent,
    FooterCrComponent,
    HomeSliderComponent,
    WidgetMainCategoryComponent,
    WidgetSliderProductComponent,
    UserLocationComponent,
    UserLocationItemComponent,
    HomeComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PageRoutingModule,
    SwiperModule,
    MatMenuModule,
  ],
})
export class LayoutModule {}
