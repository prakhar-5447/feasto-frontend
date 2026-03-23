import { Component, ElementRef, QueryList, ViewChildren, HostListener } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { RestaurantService } from '../../../core/services/restaurent.service';

@Component({
  selector: 'app-tab-menu',
  imports: [],
  templateUrl: './tab-menu.html',
  styleUrl: './tab-menu.sass',
})
export class TabMenu {
  activeCategory = 0;
  OFFSET = 350
  observer!: IntersectionObserver
  @ViewChildren('categorySection') categorySections!: QueryList<ElementRef>;

  constructor(
    public cartService: CartService,
    public restaurantService: RestaurantService,
  ) { }

  @HostListener('window:scroll', [])
  onScroll() {
    let activeIndex = 0

    this.categorySections.forEach((section, index) => {
      const el = section.nativeElement
      const rect = el.getBoundingClientRect()
      if (rect.top - this.OFFSET <= 0) {
        activeIndex = index
      }
    })

    this.activeCategory = activeIndex;
    console.log(this.activeCategory);

  }

  scrollToCategory(index: number) {
    const el = this.categorySections.toArray()[index]?.nativeElement
    if (!el) return


    const y = el.getBoundingClientRect().top + window.scrollY - this.OFFSET


    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
    this.activeCategory = index;
  }

  getItemQuantity(itemId: string): number {
    const item = this.cartService.cart.find((i: any) => i.id === itemId);
    return item?.quantity || 0;
  }

  addToCart(item: any) {
    // this.cartService.addToCart({
    //   ...item,
    //   restaurantId: this.id,
    //   restaurantName: this.restaurant.name,
    // });
  }

  updateQuantity(itemId: string, qty: number, inc: boolean) {
    const newQty = inc ? qty + 1 : qty - 1;
    this.cartService.updateQuantity(itemId, newQty);
  }



}
