import { makeAutoObservable } from "mobx";

export class MobxTreeNode<T> {
  public parent: MobxTreeNode<T> | null;
  public children: MobxTreeNode<T>[];
  public deepIndex: number;
  public isOpen: boolean;
  public value: T;

  constructor(parent: MobxTreeNode<T> | null, value: T, deepIndex?: number) {
    this.value = value;
    this.parent = parent;
    this.children = [];
    this.isOpen = deepIndex == 0;
    this.deepIndex = deepIndex ?? 0;
    makeAutoObservable(this);
  }

  hasChildren() {
    return this.children.length > 0;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  closeChildren() {
    this.children.forEach((child) => {
      if (!child.isOpen) return;
      child.isOpen = false;
      if (this.children.length === 0) return;
      child.closeChildren();
    });
  }

  activate() {
    this.isOpen = true;
    if (this.parent) {
      this.parent.activate();
    }
  }

  closeOtherBranches() {
    if (this.parent) {
      this.parent.children.forEach((child) => {
        if (child !== this) {
          if (child.isOpen) {
            child.isOpen = false;
          }
          child.closeChildren();
        }
      });
      this.parent.closeOtherBranches();
    }
  }
}
