export default interface IHash {
  compare(password: string, hash: string): boolean;
}
