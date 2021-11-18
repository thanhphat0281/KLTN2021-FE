import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from '../../../../app-services/book-service/book.service';
import { NgForm } from '@angular/forms';
import { Book } from '../../../../app-services/book-service/book.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CategoryService } from '../../../../app-services/category-service/category.service';
import { Category } from '../../../../app-services/category-service/category.model';
import { AuthorService } from '../../../../app-services/author-service/author.service';
import { Author } from '../../../../app-services/author-service/author.model';
import { SeriService } from 'src/app/app-services/seri-service/seri.service';
import { Seri } from 'src/app/app-services/seri-service/seri.model';
import { Location } from '@angular/common';
import Swal from 'sweetalert'
declare var $:any;
@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  id_book: string;
  alertSucess: boolean = false;
  selectedValue = '';
  countryForm: FormGroup;
  categories = [];
  event : any;
  accountSocial = JSON.parse(localStorage.getItem("accountSocial"));

  // countries = ['USA', 'Canada', 'Uk']
  constructor(private _router:Router,  private bookService:BookService, private seriService: SeriService,private location: Location,
    private fb: FormBuilder,private categoryService: CategoryService, 
    private authorService: AuthorService, private route: ActivatedRoute) {
      $(document).ready(function() {
        $("#selectCategory").change(function() {
          var selectedVal = $("#selectCategory option:selected").val();
          alert(selectedVal);
        });
        $("#selectAuthor").change(function() {
          var selectedVal = $("#selectAuthor option:selected").val();
          alert(selectedVal);
        });
    
      });

     }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
   this.getBookById(id);
   this.getSeriesList();
    this.resetForm();
    this.getCategoryList();
    this.getAuthorList();
  }
  
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.bookService.selectedBook = {
      _id: "",
      nameBook:"",
      categoryID: "",
      authorID: "",
      priceBook: null,
      detailBook: "",
      tryRead: "",
      imgBook: "",
      seriID: "",
      sale: null,
      count: null,
      quantity:null,
      rate:null,
    }
  }
  getBookCategoryById(id:string) {
    this.categoryService.getCategoryById(id).subscribe((res) => {
      this.categoryService.categories = res as Category[];
      console.log(res);
    });
  }
  getBookById(id:string) {
    this.bookService.getBookById(id).subscribe((res) => {
      this.bookService.selectedBook = res as Book;
      console.log(res)
    });
  }
  getSeriesList(){
    this.seriService.getSeriList().subscribe(seri => {
      this.seriService.seri = seri as Seri;
    })
  }
  getCategoryList() {
    this.categoryService.getCategoryList().subscribe((res) => {
		  this.categoryService.categories = res as Category[];
		});
    }
    getAuthorList() {
      this.authorService.getAuthorList().subscribe((res) => {
        this.authorService.authors = res as Author[];
        console.log(res);
      });
    }
    cancel(){
      this.location.back();
        }
    alertMessage: string = ""
    onSubmit(form: NgForm) {
      Swal({
        text: "Bạn có chắc muốn cập nhật thông tin sách không ?",
        icon: 'warning',
        buttons: {
          cancel: true,
          confirm: {
            value: "OK",
            closeModal: true
          }
        }
      })
        .then((willDelete) => {
          if (willDelete) {
            let id = this.route.snapshot.paramMap.get('id');
            form.value._id = id;
            form.value.quantity=100;
            this.bookService.putBook(form.value).subscribe(
             data => {
              setTimeout(() => {  this.alertSucess = false;
                this.alertMessage = "";this._router.navigate(['/manageBook']); },2000);
            },
             error => console.log(error)
            );
           console.log('Your form data: '+  form.value._id)
            Swal({
              title: "Đã cập nhật thành công!",
              text: "Thông tin tựa sách đã được cập nhật.",
              icon: 'success'
            });
          }
        });
    }
    getLinkImgBook="";
    getLinkImg(event : any)
    { 
      this.getLinkImgBook=event.target.value;

    }
     
  logout() {
    localStorage.clear();
    window.location.href = "/homePage";
  }

}
