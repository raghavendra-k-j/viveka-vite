export class TypedJson {
  private data: Record<string, any>;

  constructor(data: Record<string, any>) {
    this.data = data;
  }

  getInt(key: string): number {
    const val = this.data[key];
    if (typeof val === 'number') return val;
    throw new Error(`Key '${key}' is not a number`);
  }

  getString(key: string): string {
    const val = this.data[key];
    if (typeof val === 'string') return val;
    throw new Error(`Key '${key}' is not a string`);
  }

  optString(key: string): string | undefined {
    const val = this.data[key];
    if (val === undefined || val === null) return undefined;
    if (typeof val === 'string') return val;
    throw new Error(`Key '${key}' is not a string or null`);
  }

  getBoolean(key: string): boolean {
    const val = this.data[key];
    if (typeof val === 'boolean') return val;
    throw new Error(`Key '${key}' is not a boolean`);
  }

  getObject(key: string): TypedJson {
    const val = this.data[key];
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      return new TypedJson(val);
    }
    throw new Error(`Key '${key}' is not an object`);
  }

  getArray<T = any>(key: string): T[] {
    const val = this.data[key];
    if (Array.isArray(val)) return val;
    throw new Error(`Key '${key}' is not an array`);
  }

  hasKey(key: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.data, key);
  }

  toString(): string {
    return JSON.stringify(this.data, null, 2);
  }

  getRaw(): Record<string, any> {
    return this.data;
  }


}
