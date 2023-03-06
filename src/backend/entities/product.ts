import crypto from "node:crypto";

interface ProductProps {
  id: string;
  name: string;
  dtCreate: Date;
  dtDeparture?: Date;
  nrRequest?: string;
}

interface ProductPropsConstructor
  extends Omit<ProductProps, "id" | "dtCreate"> {
  id?: string;
}

export class Product {
  private props: ProductProps;

  constructor(props: ProductPropsConstructor) {
    this.props = {
      ...props,
      id: props?.id ? props.id : crypto.randomUUID(),
      dtCreate: new Date(),
    };
  }

  public get id() {
    return this.props.id;
  }
  public get name() {
    return this.props.name;
  }
  public get dtCreate() {
    return this.props.dtCreate;
  }
  public get dtDeparture() {
    return this.props.dtDeparture;
  }
  public get nrRequest() {
    return this.props.nrRequest;
  }
}
