declare module "prop-types" {
  export type Validator<T> = (value: T) => Error | null;
  export type Requireable<T> = Validator<T> & {
    isRequired: Validator<T>;
  };

  export interface ValidationMap<T> {
    [key: string]: Validator<T[keyof T]>;
  }

  export const any: Requireable<unknown>;
  export const array: Requireable<unknown[]>;
  export const bool: Requireable<boolean>;
  export const func: Requireable<(...args: unknown[]) => unknown>;
  export const number: Requireable<number>;
  export const object: Requireable<Record<string, unknown>>;
  export const string: Requireable<string>;
  export const node: Requireable<unknown>;
  export const element: Requireable<unknown>;
  export function instanceOf<T>(expectedClass: new (...args: never[]) => T): Requireable<T>;
  export function oneOf<T>(values: readonly T[]): Requireable<T>;
  export function oneOfType<T>(types: ReadonlyArray<Validator<T>>): Requireable<T>;
  export function arrayOf<T>(type: Validator<T>): Requireable<T[]>;
  export function objectOf<T>(type: Validator<T>): Requireable<Record<string, T>>;
  export function shape<T>(type: ValidationMap<T>): Requireable<T>;
  export function exact<T>(type: ValidationMap<T>): Requireable<T>;

  const PropTypes: {
    any: typeof any;
    array: typeof array;
    bool: typeof bool;
    func: typeof func;
    number: typeof number;
    object: typeof object;
    string: typeof string;
    node: typeof node;
    element: typeof element;
    instanceOf: typeof instanceOf;
    oneOf: typeof oneOf;
    oneOfType: typeof oneOfType;
    arrayOf: typeof arrayOf;
    objectOf: typeof objectOf;
    shape: typeof shape;
    exact: typeof exact;
  };

  export default PropTypes;
}
