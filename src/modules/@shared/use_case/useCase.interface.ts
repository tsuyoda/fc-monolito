export default interface IUseCase {
  execute(input: any): Promise<any>;
}
