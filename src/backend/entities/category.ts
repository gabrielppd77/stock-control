import crypto from "node:crypto";

interface CategoryProps {
  id: string;
  name: string;
}

interface CategoryPropsConstructor extends Omit<CategoryProps, "id"> {
  id?: string;
}

export class Category {
  private props: CategoryProps;

  constructor(props: CategoryPropsConstructor) {
    this.props = {
      ...props,
      id: props?.id ? props.id : crypto.randomUUID(),
    };
  }

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.name;
  }
}
