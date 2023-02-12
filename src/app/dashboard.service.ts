import { Injectable } from '@angular/core';
import { Status, Task, TaskLists } from './types';
@Injectable()
export class DashboardService {
  lists: TaskLists = {
    new: [],
    process: [],
    done: [],
  };

  initApp(): void {
    this.lists =
      JSON.parse(<string>localStorage.getItem('lists')) || this.lists;
  }

  addTask(status: Status, task: Task): void {
    const item = {
      ...task,
      id: Math.random(),
    };
    this.lists[status].push(item);
    this.saveState();
  }

  saveState(): void {
    localStorage.setItem('lists', JSON.stringify(this.lists));
  }

  deleteFromState(status: Status, task: Task): void {
    const arr = this.lists[status];
    const ids = arr.map((item: Task) => item.id);
    const index = ids.indexOf(task.id);
    if (index !== -1) {
      arr.splice(arr.indexOf(task), 1);
      this.saveState();
    }
  }

  deleteFromEverywhere(id: number): void {
    Object.values(this.lists).forEach((arr) => {
      const ids = arr.map((item: Task) => item.id);
      const index = ids.indexOf(id);
      if (index !== -1) {
        arr.splice(index, 1);
        this.saveState();
      }
    });
  }

  getCorrectStatusEverywhere(): void {
    Object.values(this.lists).forEach((arr, ind) => {
      if (ind === 0) {
        this.lists.new = arr.map((task: Task) => ({ ...task, status: 'new' }));
      }
      if (ind === 1) {
        this.lists.process = arr.map((task: Task) => ({
          ...task,
          status: 'process',
        }));
      }
      if (ind === 2) {
        this.lists.done = arr.map((task: Task) => ({
          ...task,
          status: 'done',
        }));
      }
    });
  }

  constructor() {}
}
