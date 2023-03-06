import crypto from "node:crypto";

import { Category } from "./category";
import { Product } from "./product";

export interface CategoryProductProps {
  id: string;
  title: string;
  category?: Category;
  product?: Product;
  categoryProductId?: string;
}

interface CategoryProductPropsContructor
  extends Omit<CategoryProductProps, "id"> {
  id?: string;
}

export class CategoryProduct {
  private props: CategoryProductProps;

  constructor(props: CategoryProductPropsContructor) {
    this.props = {
      ...props,
      id: props?.id ? props.id : crypto.randomUUID(),
    };
  }

  public get id() {
    return this.props.id;
  }
  public get title() {
    return this.props.title;
  }
  public get category() {
    return this.props.category;
  }
  public get product() {
    return this.props.product;
  }
  public get categoryProductId() {
    return this.props.categoryProductId;
  }
}
