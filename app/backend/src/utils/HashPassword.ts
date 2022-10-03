import ILibHash from '../interfaces/ILibHash';
import IHash from '../interfaces/IHash';

class HashPassword implements IHash {
  passwordCheck: boolean;
  constructor(private _libHash: ILibHash) {}
  compare(password: string, hash: string): boolean {
    this.passwordCheck = this._libHash.compareSync(password, hash);
    return this.passwordCheck;
  }
}

export default HashPassword;
