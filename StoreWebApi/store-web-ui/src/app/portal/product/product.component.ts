import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product';
import { Subject, filter, map, startWith, switchMap, tap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductColumns, productHeader } from '../../core/models/table';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  productService: ProductService;

  form: FormGroup = this.createFormGroup();
  productHeader = productHeader;
  product: Product | null = null;
  products: Product[] = [];
  productDataSource: ProductColumns[] = [];
  loadProductAction$ = new Subject<any>();
  addProductAction$ = new Subject<FormGroup>();
  selectProductAction$ = new Subject<number>();
  updateProductAction$ = new Subject<FormGroup>();
  deleteProductAction$ = new Subject<number>(); 

  constructor(private injector: Injector, private ChangeDetection: ChangeDetectorRef) {
    this.productService = this.injector.get(ProductService);
  }

  ngOnInit(): void {
    this.loadProductAction$
    .pipe(
      startWith('load'),
      switchMap(() =>  this.productService.getProducts()),
      tap((x) => {
        this.store(x);
      })
    ).subscribe();

    this.selectProductAction$
    .pipe(
      switchMap((x) => {
        return this.productService.getproduct(x);
      }),
      tap((x) => {
        this.product = x;
        this.form.setValue({
          name: x.name,
          description: x.description,
          price: x.price
        })
      })
    ).subscribe();

    this.addProductAction$.
    pipe(
      filter(x => x.valid),
      map((x) => x.getRawValue()),
      switchMap((x) => {
        return this.productService.addProduct({
          id: 0,
          name: x.name,
          description: x.description,
          price: x.price
        })
      }),
      tap((x) => {
        this.store(x);
        this.formReset();
      })
    ).subscribe();

    this.updateProductAction$.
    pipe(
      filter(x => x.valid),
      map((x) => x.getRawValue()),
      switchMap((x) => {
        return this.productService.updateProduct(this.product?.id!, {
          id: this.product?.id ?? 0,
          name: x.name,
          description: x.description,
          price: x.price
        })
      }),
      tap((x) => {
        this.formReset();
        this.loadProductAction$.next('load');
      })
    ).subscribe();

    this.deleteProductAction$.
    pipe(
      switchMap(() => {
        return this.productService.deleteProduct(this.product?.id!)
      }),
      tap(() => {
        this.formReset();
        this.loadProductAction$.next('load');
      })
    ).subscribe();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(null),
      description: new FormControl(null),
      price: new FormControl(null),
    })
  }
  
  onSelectProduct(id: number): void {
    this.selectProductAction$.next(id);
  }

  onSubmit(): void {
    this.addProductAction$.next(this.form);
  }

  onUpdate(): void {
    this.updateProductAction$.next(this.form);
  }

  onDelete(): void {
    this.deleteProductAction$.next(this.product?.id!);
  }

  private formReset(): void {
    this.product = null;
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  private store(p: Product[]): void {
    this.products = p;
    this.productDataSource = this.convertToTableFormat(p);
    this.ChangeDetection.detectChanges();
  }

  private convertToTableFormat(p: Product[]): ProductColumns[] {
    return p.map(a=> <ProductColumns>{
      id: a.id,
      description: a.description,
      name: a.name,
      price:a.price,
      });
  }
}
