import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { CustomerService } from '../../core/services/customer.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Customer, CustomerPurchases } from '../../core/models/customer';
import { Subject, filter, forkJoin, map, startWith, switchMap, tap } from 'rxjs';
import { CustomerColumns, ProductColumns, customerHeader, productHeader } from '../../core/models/table';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {
  customerService: CustomerService;

  form: FormGroup = this.createFormGroup();
  customerHeader = customerHeader;
  productHeader = productHeader;
  customer: Customer | null = null;
  customers: Customer[] = [];
  customerPurchases: CustomerPurchases[] = [];
  customerPurchasesDataSource: ProductColumns[] = [];
  customerDataSource: CustomerColumns[] = [];
  loadCustomerAction$ = new Subject<any>();
  addCustomerAction$ = new Subject<FormGroup>();
  selectCustomerAction$ = new Subject<number>();
  updateCustomerAction$ = new Subject<FormGroup>();
  deleteCustomerAction$ = new Subject<number>(); 

  constructor(private injector: Injector, private ChangeDetection: ChangeDetectorRef) {
    this.customerService = this.injector.get(CustomerService);
  }
  ngOnInit(): void {
    this.loadCustomerAction$
    .pipe(
      startWith('load'),
      switchMap(() =>  this.customerService.geteCustomers()),
      tap((x) => {
        this.storeCustomer(x);
      })
    ).subscribe();

    this.selectCustomerAction$
    .pipe(
      switchMap((x) => {
        return forkJoin([
          this.customerService.getCustomer(x),
          this.customerService.getCustomerPurchases(x)
        ]);
      }),
      tap(([x, y]) => {
      this.customer = x;
       this.storeCustomerPurchases(y);
        this.form.setValue({
          firstName: x.firstName,
          lastName: x.lastName,
        })
      })
    ).subscribe();

    this.addCustomerAction$.
    pipe(
      filter(x => x.valid),
      map((x) => x.getRawValue()),
      switchMap((x) => {
        return this.customerService.addCustomer({
          id: 0,
          firstName: x.firstName,
          lastName: x.lastName,
        })
      }),
      tap((x) => {
        this.storeCustomer(x);
        this.formReset();
      })
    ).subscribe();

    this.updateCustomerAction$.
    pipe(
      filter(x => x.valid),
      map((x) => x.getRawValue()),
      switchMap((x) => {
        return this.customerService.updateCustomer(this.customer?.id!, {
          id: this.customer?.id ?? 0,
          firstName: x.firstName,
          lastName: x.lastName,
        })
      }),
      tap((x) => {
        this.formReset();
        this.loadCustomerAction$.next('load');
      })
    ).subscribe();

    this.deleteCustomerAction$.
    pipe(
      switchMap(() => {
        return this.customerService.deleteCustomer(this.customer?.id!)
      }),
      tap(() => {
        this.formReset();
        this.loadCustomerAction$.next('load');
      })
    ).subscribe();
  }

  onSelectCustomer(id: number): void {
    this.selectCustomerAction$.next(id);
  }

  onSubmit(): void {
    this.addCustomerAction$.next(this.form);
  }

  onUpdate(): void {
    this.updateCustomerAction$.next(this.form);
  }

  onDelete(): void {
    this.deleteCustomerAction$.next(this.customer?.id!);
  }

  private formReset(): void {
    this.customer = null;
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  private storeCustomer(c: Customer[]): void {
    this.customers = c;
    this.customerDataSource = this.convertToTableFormatCustomer(c);
    this.ChangeDetection.detectChanges();
  }

  private storeCustomerPurchases(c: CustomerPurchases[]): void {
    this.customerPurchases = c;
    this.customerPurchasesDataSource = this.convertTableCustomerPurchase(c);
    this.ChangeDetection.detectChanges();
  }

  private convertToTableFormatCustomer(c: Customer[]): CustomerColumns[] {
    return c.map(a=> <CustomerColumns>{
      id: a.id,
      firstName: a.firstName,
      lastName: a.lastName
      });
  }

  private convertTableCustomerPurchase(c: CustomerPurchases[]): ProductColumns[] {
    return c.map(x=> <ProductColumns>{
      ...x.product
    });
  }
  
  createFormGroup(): FormGroup {
    return new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
    })
  }

}
