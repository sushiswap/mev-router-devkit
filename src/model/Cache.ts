export type GetCacheFunction = (key: string) => Promise<string | undefined>;
export type SetCacheFunction = (key: string, value: string, ttlSeconds?: number) => Promise<void>;

export class Cache {
  protected getFunction: GetCacheFunction;
  protected setFunction: SetCacheFunction;
  protected keyPrefix?: string;

  constructor(getFunction: GetCacheFunction, setFunction: SetCacheFunction, keyPrefix?: string) {
    this.getFunction = getFunction;
    this.setFunction = setFunction;
    this.keyPrefix = keyPrefix;
  }

  get(key: string) {
    return this.getFunction(`${this.keyPrefix}${key}`);
  }

  set(key: string, value: string, ttlSeconds?: number) {
    return this.setFunction(`${this.keyPrefix}${key}`, value, ttlSeconds);
  }
}
