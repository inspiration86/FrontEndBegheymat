import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {CartService} from '../../../serviceCart/cart.service';
import {UserService} from '../../../Auth/user.service';
import {Options} from 'ng5-slider';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';
import {MenuService} from '../../menu.service';
import {SearchService} from 'src/app/search.service';
import {Post} from '../../../Post';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.css'],
  providers: [MessageService]
})
export class MobileHeaderComponent implements OnInit {
  @ViewChild('mobileMenu') mobileMenu: ElementRef;
  @ViewChild('accountDropDown') accountDropDown: ElementRef;
  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  @Output() onSelectedOption = new EventEmitter();
  myControl = new FormControl();
  categories: any[] = [];
  menuCategories: MenuItem[] = [];
  showCartList: boolean;
  isLogged: boolean;
  items: MenuItem[];
  displayMobileMenu = false;
  display = false;
  displaySearch = false;
  displayFilter = true;
  cartlist: any[] = [];
  sumOfPrice = 0;
  countBadge = 0;
  offer = false;
  freeSend = false;

  allPosts: Post[] = [];
  autoCompleteList: Observable<any[]>;
  productSearch: any;
  textSearch: any;

  constructor(private router: Router,
              private serviceCart: CartService,
              private fb: FormBuilder,
              private messageService: MessageService,
              private service: MenuService,
              public dataService: SearchService,
              private breakpointObserver: BreakpointObserver,
              private localStorage: LocalStorageService) {

    this.service.getCategories().subscribe((response) => {
      if (response.success === true) {
        this.categories = response.data;

        let subList: MenuItem[] = [];
        let subSubList: MenuItem[] = [];

        this.menuCategories.push({
          label: 'همه محصولات',
          command: event => this.goProduct(0, 0, 0)
        });

        this.categories.forEach(cat => {
          subList = [];
          if (cat.SubCategory.length > 0) {
            subList.push({
              label: 'همه',
              command: event => this.goProduct(cat._id, 0, 0)
            });
            cat.SubCategory.forEach(sub => {
              subSubList = [];
              if (sub.SubSubCategory.length > 0) {
                subSubList.push({
                  label: 'همه',
                  icon: 'pi pi-fw pi-angle-left',
                  command: event => this.goProduct(cat._id, sub._id, 0)
                });
                sub.SubSubCategory.forEach(subSub => {
                  subSubList.push({
                    label: subSub.title,
                    icon: 'pi pi-fw pi-angle-left',
                    command: event => this.goProduct(cat._id, sub._id, subSub._id)
                  });
                });
              }
              subList.push({
                label: sub.title,
                items: subSubList
              });
            });


            this.menuCategories.push({
              label: cat.title,
              items: subList
            });
          } else {
            this.menuCategories.push({
              label: cat.title,
              command: event => this.goProduct(cat._id, 0, 0)
            });
          }


        });
      }
    });
    this.items = [
      {
        label: 'صفحه اصلی',
        icon: 'pi pi-pw pi-home',
        routerLink: '/'
      },
      {
        label: 'دسته بندی محصولات',
        icon: 'pi pi-fw pi-list',
        items: this.menuCategories
      },
      {
        label: 'فروشنده شو',
        icon: 'fas fa-shopping-basket',
        command: event => this.router.navigate(['/sellerBe'])
      },
      {
        label: 'سوال داری؟',
        icon: 'pi pi-fw pi-question-circle',
        routerLink: '/home/faq'
      },
      {
        label: 'درباره ما',
        icon: 'pi pi-fw pi-info-circle',
        routerLink: '/home/about'
      },
      {
        label: 'راهنمای خرید',
        icon: 'pi pi-fw pi-info-circle',
        routerLink: '/home/help'
      }
    ];
  }

  ngOnInit(): void {
    this.isLogged = this.localStorage.getCurrentUser();

    setInterval(() => {
      this.getAllPrice();
    }, 1000);

    this.dataService.getPosts().subscribe(posts => {
      this.allPosts = posts['data'];
    });

    // when user types something in input, the value changes will come through this
    this.myControl.valueChanges.subscribe(userInput => {
      this.autoCompleteExpenseList(userInput);
    });
  }

  private autoCompleteExpenseList(input): void {
    const categoryList = this.filterCategoryList(input);
    this.autoCompleteList = categoryList;
  }

  filterCategoryList(val): any {
    if (typeof val !== 'string') {
      return [];
    }
    if (val === '' || val === null) {
      return [];
    }
    return val ? this.allPosts.filter(s => s.title.toLowerCase().indexOf(val.toLowerCase()) != -1)
      : this.allPosts;
  }

  exitUser() {
    this.localStorage.removeCurrentUser();
    this.ngOnInit();
  }

  openMobileMenu(): void {
    this.displayMobileMenu = true;
  }

  closeMobileMenu(): void {
    this.mobileMenu.nativeElement.classList.remove('mobilemenu--open');
  }

  toggleAccountDropDown(): void {
    this.accountDropDown.nativeElement.classList.toggle('topbar-dropdown--opened');
  }

  showModalShoppingCart(): void {
    this.display = true;
  }

  getAllPrice() {
    this.cartlist = this.serviceCart.getItems();
    this.sumOfPrice = 0;
    this.countBadge = 0;
    this.showCartList = true;

    if (this.cartlist != null) {
      if (this.cartlist.length > 0) {
        for (var i = 0; i < this.cartlist.length; i++) {
          if (this.cartlist[i]['product']['cartList'].offer === true) {
            let pricePercent: number = (this.cartlist[i]['product']['cartList'].price * this.cartlist[i]['product']['cartList'].offerPercent) / 100;
            this.sumOfPrice += (Number(this.cartlist[i]['product']['cartList'].price) - pricePercent) * this.cartlist[i]['product'].number;

          } else {
            this.sumOfPrice += (this.cartlist[i]['product']['cartList'].price) * (this.cartlist[i]['product'].number);
          }
          // let count = Number(this.cartlist[i]['product']['number']) * Number(this.cartlist[i]['product']['cartList'].price);
          // this.sumOfPrice += count;
          this.countBadge++;
          this.showCartList = false;

        }
      }
    }
  }

  onDeleteCart(item: any): void {
    this.serviceCart.deleteItem(item);
    this.cartlist = this.serviceCart.getItems();
    this.getAllPrice();
  }

  openSearch(): void {
    this.displaySearch = true;
  }

  goProduct(categoryId: any, subCategoryId: any, subSubCategoryId: any) {
    this.router.navigateByUrl('/home/product/' + categoryId + '/' + subCategoryId + '/' + subSubCategoryId);
  }

  displayFn(post: Post): any {
    let k = post ? post.title : post;
    return k;
  }

  filterPostList(event): void {
    const posts = event.source.value;
    this.productSearch = event.source.value['_id'];
    if (!posts) {
      this.dataService.searchOption = [];
    } else {

      this.dataService.searchOption.push(posts);
      this.onSelectedOption.emit(this.dataService.searchOption);
      this.router.navigate(['/home/detail', this.productSearch]);

    }
    this.focusOnPlaceInput();
  }

  focusOnPlaceInput(): void {
    this.autocompleteInput.nativeElement.focus();
    this.autocompleteInput.nativeElement.value = '';
  }

  advenceSearch(): any {
    this.dataService.textSearch = this.textSearch;
    const data = {
      title: this.textSearch
    };
    this.dataService.allProductBySearch(data).subscribe((response) => {
      if (response['success'] === true) {
        this.dataService.resultSearchBox = response['data'];
        this.router.navigate(['/home/resultSearch']);
      }
    });
  }
}
