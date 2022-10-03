export default interface ILibHash {
  compareSync(password: string, hash: string): boolean;
}
