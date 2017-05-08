import { Task } from './task';
import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

/**
 * Generated class for the Tasklist page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-tasklist',
  templateUrl: 'tasklist.html',
})
export class TaskListPage {
  tasks: FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public db:AngularFireDatabase) {
    this.tasks = db.list('/tasks')
  }

  addItem() {
    let theNewTask: string = prompt("New Task");
    if (theNewTask !== '') {
      this.tasks.push({title: theNewTask, status: 'open'});
    }
  }

  markAsDone (slidingItem: ItemSliding,task: Task) {
    this.tasks.update(task.$key,{status:'done'});    
    slidingItem.close();
  }

  removeTask (slidingItem: ItemSliding, task: Task) {
   this.tasks.remove(task.$key);
    slidingItem.close();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Tasklist');
  }

}
