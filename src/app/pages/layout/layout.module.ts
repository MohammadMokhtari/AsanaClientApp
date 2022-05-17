import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { backdropDirective } from './directives/backdrop.directive';
import { SwiperModule } from 'swiper/angular';

import { MatMenuModule } from '@angular/material/menu';

import { PageRoutingModule } from '../page-routing.module';
import { LayoutComponent } from './layout.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { UserProfileComponent } from './components/header/top-header/top-header-user-area/user-profile/user-profile.component';
import { HeaderComponent } from './components/header/header.component';
import { TopHeaderComponent } from './components/header/top-header/top-header.component';
import { TopHeaderUserAreaComponent } from './components/header/top-header/top-header-user-area/top-header-user-area.component';
import { BottomHeaderComponent } from './components/header/bottom-header/bottom-header.component';
import { SiteOptionComponent } from './components/header/bottom-header/site-option/site-option.component';
import { SiteMenuComponent } from './components/header/bottom-header/site-menu/site-menu.component';
import { SiteMenuItemComponent } from './components/header/bottom-header/site-menu/site-menu-item/site-menu-item.component';
import { TopHeaderSearchComponent } from './components/header/top-header/top-header-search/top-header-search.component';
import { SubMenuComponent } from './components/header/bottom-header/site-menu/site-menu-item/sub-menu/sub-menu.component';
import { MegaMenuComponent } from './components/header/bottom-header/site-menu/mega-menu/mega-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { MegaSubMenuItemComponent } from './components/header/bottom-header/site-menu/mega-menu/mega-menu-item/mega-sub-menu-item/mega-sub-menu-item..cmponent';
import { MegaMenuItemComponent } from './components/header/bottom-header/site-menu/mega-menu/mega-menu-item/mega-menu-item.component';
import { TopFooterComponent } from './components/footer/top-footer/top-footer.component';
import { BottomFooterComponent } from './components/footer/bottom-footer/bottom-footer.component';
import { FooterCrComponent } from './components/footer/footer-cr/footer-cr.component';
import { HomeFeatureComponent } from './components/home/home-feature/home-feature.component';
import { HomeSliderComponent } from './components/home/home-slider/home-slider.component';
import { WidgetMainCategoryComponent } from './components/home/widget-main-category/widget-main-category.component';
import { UserLocationComponent } from './components/header/bottom-header/site-option/user-location/user-location.component';
import { HomeComponent } from './components/home/home.component';
import { UserLocationItemComponent } from './components/header/bottom-header/site-option/user-location/user-location-item/user-location-item.component';
import { WidgetProductSliderComponent } from './components/home/widget-product-slider/widget-product-slider.component';
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
    WidgetProductSliderComponent,
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
