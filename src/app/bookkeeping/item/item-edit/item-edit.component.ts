import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { HeaderService } from '../../../core/header/header.service';
import { Item } from '../item.model';
import { ItemService } from '../item.service';

import {Organization} from '../../../organization/organization.model';
import {OrganizationService} from '../../../organization/organization.service';
import {Category} from '../../category/category.model';
import {CategoryService} from '../../category/category.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit, OnDestroy {
  private id: number;
  editMode = false;
  private picIsOpen = false;

  itemForm: FormGroup;
  produce: Organization[];
  filteredProduce: Observable<Organization[]>;
  category: Category[];
  filteredCategories: Observable<Category[]>;

  subscription: Subscription;
  public item: Item = Item.EMPTY_MODEL;

  files: {id: number, image: File}[] = [];

  constructor(
    private headService: HeaderService,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private orgService: OrganizationService,
    private catService: CategoryService,
    private router: Router
  ) { }

  ngOnInit() {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.initForm();
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          if (this.editMode) {

            // GetOrganizations
            this.orgService.getOrganizations();
            this.orgService.orgsChanged.subscribe((data: Organization[]) => {
              this.produce = data;
              this.filteredProduce = this.itemForm.get('produce').valueChanges
                .pipe(
                  startWith<string | Organization >(''),
                  map(value => typeof value === 'string' ? value : value.name),
                  map(name => name ? this._filterOrganizations(name) : this.produce.slice())
                );
            });

            // Get Categories
            this.catService.getCategories();
            this.catService.catsChanged.subscribe((data: Category[]) => {
              this.category = data;
              this.filteredCategories = this.itemForm.get('category').valueChanges
                .pipe(
                  startWith<string | Category >(''),
                  map(value => typeof value === 'string' ? value : value.name),
                  map(name => name ? this._filterCategories(name) : this.category.slice())
                );
            });

            this.itemService.getItem(this.id);
            this.subscription = this.itemService.ItemChose.subscribe(
              (data: Item) => {
                this.item = new Item(
                  data.id,
                  data.name,
                  data.article,
                  data.category,
                  data.category_name,
                  data.desc,
                  data.related,
                  data.images,
                  data.attribute,
                  data.testing,
                  data.batch,
                  data.classifier,
                  data.produce,
                  data.produce_name,
                  data.cost,
                  data.tax,
                  data.price,
                  data.history,
                  data.consumer
                );
                this.itemForm.patchValue({
                  'name': data.name,
                  'article': data.article,
                  'category': data.category,
                  'desc': data.desc,
                  'batch': data.batch,
                  'produce': data.produce,
                  'cost': data.cost,
                  'tax': data.tax,
                }); // prices, history, consumer - информативные поля, не обновляются по средствам данной формы
                if (data['images']) {
                  for (const line of data.images) {
                    (<FormArray>this.itemForm.controls['images']).push(
                      new FormGroup({
                        'id': new FormControl(line.id),
                        'name': new FormControl(line.name),
                        'desc': new FormControl(line.desc),
                        // 'image': new FormControl(line.image),
                        'is_top': new FormControl(line.is_top),
                        'to_send': new FormControl(line.to_send),
                      })
                    );
                  }
                }
                if (data['related']) {
                  for (const line of data.related) {
                    (<FormArray>this.itemForm.controls['related']).push(
                      new FormGroup({
                        'name': new FormControl(line),
                      })
                    );
                  }
                }
                if (data['attribute']) {
                  for (const line of data.attribute) {
                    (<FormArray>this.itemForm.controls['attribute']).push(
                      new FormGroup({
                        'name': new FormControl(line.name),
                        'value': new FormControl(line.value),
                      })
                    );
                  }
                }
                if (data['testing']) {
                  for (const line of data.testing) {
                    (<FormArray>this.itemForm.controls['testing']).push(
                      new FormGroup({
                        'name': new FormControl(line.name),
                        'value': new FormControl(line.value),
                      })
                    );
                  }
                }
                if (data['classifier']) {
                  for (const line of data.classifier) {
                    (<FormArray>this.itemForm.controls['classifier']).push(
                      new FormGroup({
                        'name': new FormControl(line.name),
                        'value': new FormControl(line.value),
                      })
                    );
                  }
                }
              }
            );
          }
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.headService.setStatus( undefined );
    this.headService.setWidget( undefined );
  }

  addNewImageLine($event?) {
    const imagesFiles = $event.target.files;
    for (const image of imagesFiles) {
      const id = image.name;
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (event) => {
        this.item.images.push({
          'name': id,
          'image': event.target.result,
        });
      };
      this.files.push({id, image});
      (<FormArray>this.itemForm.controls['images']).push(
        new FormGroup({
          'id': new FormControl(id),
          'name': new FormControl(id),
          'desc': new FormControl(''),
          'is_top': new FormControl(false),
          'to_send': new FormControl(false),
        })
      );
    }
      setTimeout(() => {
        const images = document.getElementsByClassName('item-image');
        [].forEach.call(images, function (el) {
          el.classList.remove('open');
        });
        images[images.length - 1].classList.add('open');
      });
  }

  addNewAttributeLine() {
    (<FormArray>this.itemForm.controls['attribute']).push(
      new FormGroup({
        'name': new FormControl(''),
        'value': new FormControl(''),
      })
    );
  }

  addNewTestingLine() {
    (<FormArray>this.itemForm.controls['testing']).push(
      new FormGroup({
        'name': new FormControl(''),
        'value': new FormControl(''),
      })
    );
  }

  addNewClassifierLine() {
    (<FormArray>this.itemForm.controls['classifier']).push(
      new FormGroup({
        'name': new FormControl(''),
        'value': new FormControl(''),
      })
    );
  }

  private initForm() {
    const itemName = '';
    const itemArticle = '';
    const itemCategory = '';
    const itemDesc = '';
    const itemBatch = 0;
    const itemProduce = '';
    const itemCost = 0;
    const itemTax = 0;

    const itemImages = new FormArray([]);
    const itemRelated = new FormArray([]);
    const itemClassifier = new FormArray([]);
    const itemAttribute = new FormArray([]);
    const itemTesting = new FormArray([]);

    this.itemForm = new FormGroup({
      'name': new FormControl(itemName, Validators.required),
      'article': new FormControl(itemArticle),
      'category': new FormControl(itemCategory),
      'desc': new FormControl(itemDesc),
      'related': itemRelated,
      'images': itemImages,
      'attribute': itemAttribute,
      'testing': itemTesting,
      'batch': new FormControl(itemBatch),
      'classifier': itemClassifier,
      'produce': new FormControl(itemProduce),
      'cost': new FormControl(itemCost),
      'tax': new FormControl(itemTax)
      // 'simple': new FormControl(sheetSimple, Validators.required),
    });
  }

  private _filterOrganizations(value: string): Organization[] {
    const filterValue = value.toLowerCase();

    return this.produce.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private _filterCategories(value: string): Category[] {
    const filterValue = value.toLowerCase();

    return this.category.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayOrganizationFn(data?: Organization): string | undefined {
    return data ? data.name : undefined;
  }

  displayCategoryFn(data?: Category): string | undefined {
    return data ? data.name : undefined;
  }

  openPictures() {
    this.picIsOpen = !this.picIsOpen;
  }

  openImage(id: number) {
    const images = document.getElementsByClassName('item-image');
    [].forEach.call(images, function(el) {
      el.classList.remove('open');
    });
    images[id].classList.add('open');
  }

  deleteImage(id: number, i: number,  $event) {
    $event.preventDefault();
    console.log(this.item.images[i].id);
    if (this.item.images[i].id) {
      this.itemService.removeItemImage(id);
    }
    this.item.images.splice(i, 1);
    this.openImage(0);
  }

  handleFileInput($event, id?: number) {
    const image = $event.target.files[0];
    this.files.push({id, image});
  }

  onSubmit() {
    const images = this.itemForm.value['images'];
    images.map(image => {
      const filteredFile = this.files.filter(file => file.id === image.id);
      if (filteredFile.length > 0) {
        image.image = filteredFile[0].image;
      }
      console.log(image);
    });

    if (images) {
      for (const image of images) {
        const formData = new FormData();
        formData.append('name', image.name);
        formData.append('desc', image.desc);
        if (image.image) { formData.append('image', image.image); }
        formData.append('to_send', image.to_send);
        formData.append('is_top', image.is_top);
        if (typeof image.id === 'string') {
          this.itemService.postImage(this.id, formData).subscribe(
            res => {
              console.log(res);
            },
            err => {
              console.log(err);
            }
          );
        } else {
          this.itemService.postImage(this.id, formData, image.id).subscribe(
            res => {
              console.log(res);
            },
            err => {
              console.log(err);
            }
          );
        }
      }
    }

    this.itemService.editItem(this.id, this.itemForm.value);

    // this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
