export class InternalError implements Error {
  private props: Error;
  constructor(error: Error) {
    this.props = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      cause: error.cause,
    };
  }

  public get name(): string {
    return this.props.name;
  }

  public get message(): string {
    return this.props.message;
  }

  public get stack(): string | undefined {
    return this.props.stack;
  }
  public get cause(): unknown {
    return this.props.cause;
  }
}
