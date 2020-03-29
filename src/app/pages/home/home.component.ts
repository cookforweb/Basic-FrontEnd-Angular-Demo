import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {HttpHeaders} from '@angular/common/http';
import {Post} from '../../types/post.type';
import {PageArgsType} from '../../types/pageArgs.type';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  protected notifier: NotifierService;

  public $posts: Post[];
  public previewPost: Post;

  public pageArgs: PageArgsType = {
    currentPage: 1,
    perPage: 10,
    pagesTotal: 0,
  };

  public entityForm: FormGroup;

  viewModal: Boolean;
  editModal: Boolean;
  deleteModal: Boolean;

  discardChanges: Boolean;

  constructor(
      notifierService: NotifierService,
      protected dataService: DataService,
      protected fb: FormBuilder,
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.loadPosts();

    this.entityForm = this.fb.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      id: ['', []],
    });
  }


  loadPosts() {
    this.dataService.getRequest('posts')
        .subscribe(
            (res: Post[]) => {
              this.$posts = res;
              this.calculatePages();
            },
            err => console.log(err)
        );
  }

  calculatePages() {
    // Set the maximum number of pages
    this.pageArgs.pagesTotal = Math.ceil(this.$posts.length / this.pageArgs.perPage);
  }

  changePageState(pageIndex) {
    this.pageArgs.currentPage = pageIndex;
  }


  viewEntity(entity) {
    this.previewPost = entity;
    this.viewModal = true;
  }

  newEntity() {
    this.entityForm.reset();
    this.editModal = true;
  }

  editEntity(entity) {
    this.entityForm.patchValue(entity);
    this.editModal = true;
  }

  deleteEntity(entity) {
    this.entityForm.patchValue(entity);
    this.deleteModal = true;
  }

  confirmDeleteEntity() {
    const id = this.entityForm.controls['id'].value;
    this.dataService.deleteRequest('posts', id).subscribe(
        res => {
          const deletedIndex = this.$posts.findIndex( v => v.id === id);
          if (deletedIndex > -1) {
            this.$posts.splice(deletedIndex, 1);
            this.notifier.notify('success', 'Item successfully removed');
            this.calculatePages();
          }
          this.deleteModal = false;
        }, error1 => this.notifier.notify('error', 'An error occurred')
    );
  }


  closeModal(modal, event) {
    if (event.hard) {
      this[modal] = event.value;
      this.discardChanges = false;
    } else {
      if (this.entityForm.dirty && ! event.value) {console.log('here')
        this.discardChanges = true;
      } else {
        this[modal] = event.value;
        this.discardChanges = false;
      }
    }
  }


  onSubmit() {
    if (this.entityForm.valid) {

      // If id exists then we must send put request for editing current post
      if (this.entityForm.controls['id'].value) {

        // EDIT
        const id = this.entityForm.controls['id'].value;
        this.dataService.putRequest('posts/' + id, this.entityForm.value)
            .subscribe( (post: Post) => {
              const editedIndex = this.$posts.findIndex( v => v.id === id);
              if (editedIndex > -1) {
                this.$posts[editedIndex] = post;
                this.notifier.notify('success', 'Item successfully edited');
                this.calculatePages();
              }
              this.editModal = false;
            }, error1 => this.notifier.notify('error', 'An error occurred'));
      } else {

        // CREATE
        this.dataService.postRequest('posts', this.entityForm.value)
            .subscribe( (post: Post) => {
              this.$posts.unshift(post);
              this.editModal = false;
              this.notifier.notify('success', 'Item successfully added');
              this.calculatePages();
            }, error1 => this.notifier.notify('error', 'An error occurred'));
      }

    } else {

      // Notify user form is not valid
      this.notifier.notify('error', 'Form is not valid');
    }
  }

}
