export interface ITreeNode<T = unknown> {
  value: T;
  children: ITreeNode<T>[];
}
