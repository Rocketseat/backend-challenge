interface IController<T = any, R = any> {
  handle(input: T): Promise<R>;
}

export { IController };
