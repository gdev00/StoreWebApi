import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { Subject, filter, startWith, switchMap, tap } from 'rxjs';
import { Customer } from '../../core/models/customer';
import { CustomerService } from '../../core/services/customer.service';
import { ProductService } from '../../core/services/product.service';
import { Product, ProductItem } from '../../core/models/product';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  customerService: CustomerService;
  productService: ProductService;

  customers: Customer[] = [];
  products: ProductItem[] = [];
  selectedCustomer: Customer | null = null;
  loadCustomerAction$ = new Subject<any>();
  loadProductAction$ = new Subject<any>();
  orderAction$ = new Subject<Customer | null>();
  
  constructor(private injector: Injector, private ChangeDetection: ChangeDetectorRef) {
    this.customerService = this.injector.get(CustomerService);
    this.productService = this.injector.get(ProductService);
  }
  
  ngOnInit(): void {
    this.loadCustomerAction$
    .pipe(
      startWith('load'),
      switchMap(() =>  this.customerService.geteCustomers()),
      tap((x) => {
        this.storeCustomer(x);
        this.ChangeDetection.detectChanges();
      })
    ).subscribe();

    this.loadProductAction$
    .pipe(
      startWith('load'),
      switchMap(() =>  this.productService.getProducts()),
      tap((x) => {
        this.storeProduct(x);
        this.ChangeDetection.detectChanges();
      })
    ).subscribe();

    this.orderAction$
    .pipe(
      filter(x=> !!x),
      switchMap((x) => {
        const products = this.products.filter(x=> x.select);
        return this.customerService.requestCustomerOrder({
          customerId: x!.id,
          productIds: products.map(x=> x.id)
        })
      }),
      tap(() => {
        this.selectedCustomer = null;
        this.products = [...this.products].map(x=><ProductItem> {...x, select: false});
        this.ChangeDetection.detectChanges();
      })
    )
    .subscribe();
  }

  submit(): void {
    this.orderAction$.next(this.selectedCustomer);
  }


  private storeCustomer(c: Customer[]): void {
    this.customers = c;
  }

  private storeProduct(c: Product[]): void {
    this.products = c.map(x=><ProductItem> {...x, select: false});
  }

}
