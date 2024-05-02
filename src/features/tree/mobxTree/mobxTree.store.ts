import { makeAutoObservable } from "mobx";
import { MobxTreeNode } from "../mobxTreeNode";
import { ITreeNode } from "../tree.types";

type Predicate<T> = (value: T) => boolean;

export class MobxTree<T> {
  root: MobxTreeNode<T>;
  selected: MobxTreeNode<T> | null;

  /**
   * 
   * @param config configuration tree to build state tree
   * @param select function to select one of node on initialization
   */
  constructor(config: ITreeNode<T>[], select?: Predicate<T>) {
    this.selected = null;
    this.root = new MobxTreeNode<T>(null, {} as unknown as T);
    this.root.children = this.create(this.root, config, select);
    makeAutoObservable(this);
  }

  private create(
    parent: MobxTreeNode<T>,
    config: ITreeNode<T>[],
    select?: Predicate<T>
  ) {
    return config.map((nodeConfig) => {
      const node = new MobxTreeNode(
        parent,
        { ...nodeConfig.value },
        parent?.deepIndex !== undefined ? parent.deepIndex + 1 : 0
      );

      if (select && select(node.value)) {
        this.selected = node;
      }

      node.children = this.create(node, nodeConfig.children, select);

      return node;
    });
  }
}
