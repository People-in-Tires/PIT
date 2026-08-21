/**
 * Client
 **/

import * as runtime from "./runtime/client.js";
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model User
 *
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>;
/**
 * Model Statistics
 *
 */
export type Statistics = $Result.DefaultSelection<Prisma.$StatisticsPayload>;
/**
 * Model Match
 *
 */
export type Match = $Result.DefaultSelection<Prisma.$MatchPayload>;
/**
 * Model MatchPlayer
 *
 */
export type MatchPlayer = $Result.DefaultSelection<Prisma.$MatchPlayerPayload>;
/**
 * Model Friendship
 *
 */
export type Friendship = $Result.DefaultSelection<Prisma.$FriendshipPayload>;
/**
 * Model Achievement
 *
 */
export type Achievement = $Result.DefaultSelection<Prisma.$AchievementPayload>;
/**
 * Model UserAchievement
 *
 */
export type UserAchievement =
  $Result.DefaultSelection<Prisma.$UserAchievementPayload>;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = "log" extends keyof ClientOptions
    ? ClientOptions["log"] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions["log"]>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["other"] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(
    eventType: V,
    callback: (
      event: V extends "query" ? Prisma.QueryEvent : Prisma.LogEvent,
    ) => void,
  ): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (
      prisma: Omit<PrismaClient, runtime.ITXClientDenyList>,
    ) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<
    "extends",
    Prisma.TypeMapCb<ClientOptions>,
    ExtArgs,
    $Utils.Call<
      Prisma.TypeMapCb<ClientOptions>,
      {
        extArgs: ExtArgs;
      }
    >
  >;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.statistics`: Exposes CRUD operations for the **Statistics** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Statistics
   * const statistics = await prisma.statistics.findMany()
   * ```
   */
  get statistics(): Prisma.StatisticsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.match`: Exposes CRUD operations for the **Match** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Matches
   * const matches = await prisma.match.findMany()
   * ```
   */
  get match(): Prisma.MatchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.matchPlayer`: Exposes CRUD operations for the **MatchPlayer** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more MatchPlayers
   * const matchPlayers = await prisma.matchPlayer.findMany()
   * ```
   */
  get matchPlayer(): Prisma.MatchPlayerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.friendship`: Exposes CRUD operations for the **Friendship** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Friendships
   * const friendships = await prisma.friendship.findMany()
   * ```
   */
  get friendship(): Prisma.FriendshipDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.achievement`: Exposes CRUD operations for the **Achievement** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Achievements
   * const achievements = await prisma.achievement.findMany()
   * ```
   */
  get achievement(): Prisma.AchievementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userAchievement`: Exposes CRUD operations for the **UserAchievement** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more UserAchievements
   * const userAchievements = await prisma.userAchievement.findMany()
   * ```
   */
  get userAchievement(): Prisma.UserAchievementDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 7.9.1
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
   */
  export type PrismaVersion = {
    client: string;
    engine: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import Bytes = runtime.Bytes;
  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> =
    T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<
    T extends (...args: any) => $Utils.JsPromise<any>,
  > = PromiseType<ReturnType<T>>;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options]
      ? PrismaClientOptions
      : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? "Please either choose `select` or `include`."
    : T extends SelectAndOmit
      ? "Please either choose `select` or `omit`."
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? ((Without<T, U> & U) | (Without<U, T> & T)) & object
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends BigInt
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<
    __Either<O, K>
  >;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = O extends unknown ? _Either<O, K, strict> : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O
    ? O[K]
    : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never;
  export type At<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
        | ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<
    T,
    U = Omit<T, "_avg" | "_sum" | "_count" | "_min" | "_max">,
  > = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<"OR", K>, Extends<"AND", K>>,
      Extends<"NOT", K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<
            UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
          >
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<
    T,
    K extends Enumerable<keyof T> | keyof T,
  > = Prisma__Pick<T, MaybeTupleToUnion<K>>;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
    ? never
    : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    User: "User";
    Statistics: "Statistics";
    Match: "Match";
    MatchPlayer: "MatchPlayer";
    Friendship: "Friendship";
    Achievement: "Achievement";
    UserAchievement: "UserAchievement";
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<
    { extArgs: $Extensions.InternalArgs },
    $Utils.Record<string, any>
  > {
    returns: Prisma.TypeMap<
      this["params"]["extArgs"],
      ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
    >;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > = {
    globalOmitOptions: {
      omit: GlobalOmitOptions;
    };
    meta: {
      modelProps:
        | "user"
        | "statistics"
        | "match"
        | "matchPlayer"
        | "friendship"
        | "achievement"
        | "userAchievement";
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>;
        fields: Prisma.UserFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUser>;
          };
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserCountArgs<ExtArgs>;
            result: $Utils.Optional<UserCountAggregateOutputType> | number;
          };
        };
      };
      Statistics: {
        payload: Prisma.$StatisticsPayload<ExtArgs>;
        fields: Prisma.StatisticsFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.StatisticsFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StatisticsPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.StatisticsFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StatisticsPayload>;
          };
          findFirst: {
            args: Prisma.StatisticsFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StatisticsPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.StatisticsFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StatisticsPayload>;
          };
          findMany: {
            args: Prisma.StatisticsFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StatisticsPayload>[];
          };
          create: {
            args: Prisma.StatisticsCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StatisticsPayload>;
          };
          createMany: {
            args: Prisma.StatisticsCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.StatisticsCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StatisticsPayload>[];
          };
          delete: {
            args: Prisma.StatisticsDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StatisticsPayload>;
          };
          update: {
            args: Prisma.StatisticsUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StatisticsPayload>;
          };
          deleteMany: {
            args: Prisma.StatisticsDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.StatisticsUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.StatisticsUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StatisticsPayload>[];
          };
          upsert: {
            args: Prisma.StatisticsUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StatisticsPayload>;
          };
          aggregate: {
            args: Prisma.StatisticsAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateStatistics>;
          };
          groupBy: {
            args: Prisma.StatisticsGroupByArgs<ExtArgs>;
            result: $Utils.Optional<StatisticsGroupByOutputType>[];
          };
          count: {
            args: Prisma.StatisticsCountArgs<ExtArgs>;
            result:
              $Utils.Optional<StatisticsCountAggregateOutputType> | number;
          };
        };
      };
      Match: {
        payload: Prisma.$MatchPayload<ExtArgs>;
        fields: Prisma.MatchFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.MatchFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MatchPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.MatchFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>;
          };
          findFirst: {
            args: Prisma.MatchFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MatchPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.MatchFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>;
          };
          findMany: {
            args: Prisma.MatchFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[];
          };
          create: {
            args: Prisma.MatchCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>;
          };
          createMany: {
            args: Prisma.MatchCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.MatchCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[];
          };
          delete: {
            args: Prisma.MatchDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>;
          };
          update: {
            args: Prisma.MatchUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>;
          };
          deleteMany: {
            args: Prisma.MatchDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.MatchUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.MatchUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[];
          };
          upsert: {
            args: Prisma.MatchUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>;
          };
          aggregate: {
            args: Prisma.MatchAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateMatch>;
          };
          groupBy: {
            args: Prisma.MatchGroupByArgs<ExtArgs>;
            result: $Utils.Optional<MatchGroupByOutputType>[];
          };
          count: {
            args: Prisma.MatchCountArgs<ExtArgs>;
            result: $Utils.Optional<MatchCountAggregateOutputType> | number;
          };
        };
      };
      MatchPlayer: {
        payload: Prisma.$MatchPlayerPayload<ExtArgs>;
        fields: Prisma.MatchPlayerFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.MatchPlayerFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MatchPlayerPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.MatchPlayerFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MatchPlayerPayload>;
          };
          findFirst: {
            args: Prisma.MatchPlayerFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MatchPlayerPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.MatchPlayerFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MatchPlayerPayload>;
          };
          findMany: {
            args: Prisma.MatchPlayerFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MatchPlayerPayload>[];
          };
          create: {
            args: Prisma.MatchPlayerCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MatchPlayerPayload>;
          };
          createMany: {
            args: Prisma.MatchPlayerCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.MatchPlayerCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MatchPlayerPayload>[];
          };
          delete: {
            args: Prisma.MatchPlayerDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MatchPlayerPayload>;
          };
          update: {
            args: Prisma.MatchPlayerUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MatchPlayerPayload>;
          };
          deleteMany: {
            args: Prisma.MatchPlayerDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.MatchPlayerUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.MatchPlayerUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MatchPlayerPayload>[];
          };
          upsert: {
            args: Prisma.MatchPlayerUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MatchPlayerPayload>;
          };
          aggregate: {
            args: Prisma.MatchPlayerAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateMatchPlayer>;
          };
          groupBy: {
            args: Prisma.MatchPlayerGroupByArgs<ExtArgs>;
            result: $Utils.Optional<MatchPlayerGroupByOutputType>[];
          };
          count: {
            args: Prisma.MatchPlayerCountArgs<ExtArgs>;
            result:
              $Utils.Optional<MatchPlayerCountAggregateOutputType> | number;
          };
        };
      };
      Friendship: {
        payload: Prisma.$FriendshipPayload<ExtArgs>;
        fields: Prisma.FriendshipFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.FriendshipFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.FriendshipFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>;
          };
          findFirst: {
            args: Prisma.FriendshipFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.FriendshipFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>;
          };
          findMany: {
            args: Prisma.FriendshipFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>[];
          };
          create: {
            args: Prisma.FriendshipCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>;
          };
          createMany: {
            args: Prisma.FriendshipCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.FriendshipCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>[];
          };
          delete: {
            args: Prisma.FriendshipDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>;
          };
          update: {
            args: Prisma.FriendshipUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>;
          };
          deleteMany: {
            args: Prisma.FriendshipDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.FriendshipUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.FriendshipUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>[];
          };
          upsert: {
            args: Prisma.FriendshipUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>;
          };
          aggregate: {
            args: Prisma.FriendshipAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateFriendship>;
          };
          groupBy: {
            args: Prisma.FriendshipGroupByArgs<ExtArgs>;
            result: $Utils.Optional<FriendshipGroupByOutputType>[];
          };
          count: {
            args: Prisma.FriendshipCountArgs<ExtArgs>;
            result:
              $Utils.Optional<FriendshipCountAggregateOutputType> | number;
          };
        };
      };
      Achievement: {
        payload: Prisma.$AchievementPayload<ExtArgs>;
        fields: Prisma.AchievementFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.AchievementFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.AchievementFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>;
          };
          findFirst: {
            args: Prisma.AchievementFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.AchievementFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>;
          };
          findMany: {
            args: Prisma.AchievementFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>[];
          };
          create: {
            args: Prisma.AchievementCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>;
          };
          createMany: {
            args: Prisma.AchievementCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.AchievementCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>[];
          };
          delete: {
            args: Prisma.AchievementDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>;
          };
          update: {
            args: Prisma.AchievementUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>;
          };
          deleteMany: {
            args: Prisma.AchievementDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.AchievementUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.AchievementUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>[];
          };
          upsert: {
            args: Prisma.AchievementUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>;
          };
          aggregate: {
            args: Prisma.AchievementAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateAchievement>;
          };
          groupBy: {
            args: Prisma.AchievementGroupByArgs<ExtArgs>;
            result: $Utils.Optional<AchievementGroupByOutputType>[];
          };
          count: {
            args: Prisma.AchievementCountArgs<ExtArgs>;
            result:
              $Utils.Optional<AchievementCountAggregateOutputType> | number;
          };
        };
      };
      UserAchievement: {
        payload: Prisma.$UserAchievementPayload<ExtArgs>;
        fields: Prisma.UserAchievementFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserAchievementFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserAchievementFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>;
          };
          findFirst: {
            args: Prisma.UserAchievementFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserAchievementFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>;
          };
          findMany: {
            args: Prisma.UserAchievementFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>[];
          };
          create: {
            args: Prisma.UserAchievementCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>;
          };
          createMany: {
            args: Prisma.UserAchievementCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserAchievementCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>[];
          };
          delete: {
            args: Prisma.UserAchievementDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>;
          };
          update: {
            args: Prisma.UserAchievementUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>;
          };
          deleteMany: {
            args: Prisma.UserAchievementDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserAchievementUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.UserAchievementUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>[];
          };
          upsert: {
            args: Prisma.UserAchievementUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>;
          };
          aggregate: {
            args: Prisma.UserAchievementAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUserAchievement>;
          };
          groupBy: {
            args: Prisma.UserAchievementGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserAchievementGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserAchievementCountArgs<ExtArgs>;
            result:
              $Utils.Optional<UserAchievementCountAggregateOutputType> | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    "define",
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = "pretty" | "colorless" | "minimal";
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     *
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     *
     * Learn more: https://pris.ly/d/driver-adapters
     *
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     *
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory;
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     *
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string;
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig;
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[];
  }
  export type GlobalOmitConfig = {
    user?: UserOmit;
    statistics?: StatisticsOmit;
    match?: MatchOmit;
    matchPlayer?: MatchPlayerOmit;
    friendship?: FriendshipOmit;
    achievement?: AchievementOmit;
    userAchievement?: UserAchievementOmit;
  };

  /* Types for Logging */
  export type LogLevel = "info" | "query" | "warn" | "error";
  export type LogDefinition = {
    level: LogLevel;
    emit: "stdout" | "event";
  };

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T["level"] : T
  >;

  export type GetEvents<T extends any[]> =
    T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | "findUnique"
    | "findUniqueOrThrow"
    | "findMany"
    | "findFirst"
    | "findFirstOrThrow"
    | "create"
    | "createMany"
    | "createManyAndReturn"
    | "update"
    | "updateMany"
    | "updateManyAndReturn"
    | "upsert"
    | "delete"
    | "deleteMany"
    | "executeRaw"
    | "queryRaw"
    | "aggregate"
    | "count"
    | "runCommandRaw"
    | "findRaw"
    | "groupBy";

  // tested in getLogLevel.test.ts
  export function getLogLevel(
    log: Array<LogLevel | LogDefinition>,
  ): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<
    Prisma.DefaultPrismaClient,
    runtime.ITXClientDenyList
  >;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    matchPlayers: number;
    achievements: number;
    sentFriendRequests: number;
    receivedFriendRequests: number;
  };

  export type UserCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    matchPlayers?: boolean | UserCountOutputTypeCountMatchPlayersArgs;
    achievements?: boolean | UserCountOutputTypeCountAchievementsArgs;
    sentFriendRequests?:
      boolean | UserCountOutputTypeCountSentFriendRequestsArgs;
    receivedFriendRequests?:
      boolean | UserCountOutputTypeCountReceivedFriendRequestsArgs;
  };

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMatchPlayersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: MatchPlayerWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAchievementsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserAchievementWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSentFriendRequestsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: FriendshipWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReceivedFriendRequestsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: FriendshipWhereInput;
  };

  /**
   * Count Type MatchCountOutputType
   */

  export type MatchCountOutputType = {
    players: number;
  };

  export type MatchCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    players?: boolean | MatchCountOutputTypeCountPlayersArgs;
  };

  // Custom InputTypes
  /**
   * MatchCountOutputType without action
   */
  export type MatchCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MatchCountOutputType
     */
    select?: MatchCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * MatchCountOutputType without action
   */
  export type MatchCountOutputTypeCountPlayersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: MatchPlayerWhereInput;
  };

  /**
   * Count Type AchievementCountOutputType
   */

  export type AchievementCountOutputType = {
    users: number;
  };

  export type AchievementCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    users?: boolean | AchievementCountOutputTypeCountUsersArgs;
  };

  // Custom InputTypes
  /**
   * AchievementCountOutputType without action
   */
  export type AchievementCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AchievementCountOutputType
     */
    select?: AchievementCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * AchievementCountOutputType without action
   */
  export type AchievementCountOutputTypeCountUsersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserAchievementWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _avg: UserAvgAggregateOutputType | null;
    _sum: UserSumAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  export type UserAvgAggregateOutputType = {
    id: number | null;
  };

  export type UserSumAggregateOutputType = {
    id: number | null;
  };

  export type UserMinAggregateOutputType = {
    id: number | null;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    country: string | null;
    city: string | null;
    birthday: Date | null;
    email: string | null;
    passwordHash: string | null;
    avatar: string | null;
    twoFactorEnabled: boolean | null;
    twoFactorSecret: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    lastLogin: Date | null;
    isActive: boolean | null;
  };

  export type UserMaxAggregateOutputType = {
    id: number | null;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    country: string | null;
    city: string | null;
    birthday: Date | null;
    email: string | null;
    passwordHash: string | null;
    avatar: string | null;
    twoFactorEnabled: boolean | null;
    twoFactorSecret: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    lastLogin: Date | null;
    isActive: boolean | null;
  };

  export type UserCountAggregateOutputType = {
    id: number;
    username: number;
    firstName: number;
    lastName: number;
    country: number;
    city: number;
    birthday: number;
    email: number;
    passwordHash: number;
    avatar: number;
    twoFactorEnabled: number;
    twoFactorSecret: number;
    createdAt: number;
    updatedAt: number;
    lastLogin: number;
    isActive: number;
    _all: number;
  };

  export type UserAvgAggregateInputType = {
    id?: true;
  };

  export type UserSumAggregateInputType = {
    id?: true;
  };

  export type UserMinAggregateInputType = {
    id?: true;
    username?: true;
    firstName?: true;
    lastName?: true;
    country?: true;
    city?: true;
    birthday?: true;
    email?: true;
    passwordHash?: true;
    avatar?: true;
    twoFactorEnabled?: true;
    twoFactorSecret?: true;
    createdAt?: true;
    updatedAt?: true;
    lastLogin?: true;
    isActive?: true;
  };

  export type UserMaxAggregateInputType = {
    id?: true;
    username?: true;
    firstName?: true;
    lastName?: true;
    country?: true;
    city?: true;
    birthday?: true;
    email?: true;
    passwordHash?: true;
    avatar?: true;
    twoFactorEnabled?: true;
    twoFactorSecret?: true;
    createdAt?: true;
    updatedAt?: true;
    lastLogin?: true;
    isActive?: true;
  };

  export type UserCountAggregateInputType = {
    id?: true;
    username?: true;
    firstName?: true;
    lastName?: true;
    country?: true;
    city?: true;
    birthday?: true;
    email?: true;
    passwordHash?: true;
    avatar?: true;
    twoFactorEnabled?: true;
    twoFactorSecret?: true;
    createdAt?: true;
    updatedAt?: true;
    lastLogin?: true;
    isActive?: true;
    _all?: true;
  };

  export type UserAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
     **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: UserAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: UserSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserMaxAggregateInputType;
  };

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>;
  };

  export type UserGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserWhereInput;
    orderBy?:
      UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[];
    by: UserScalarFieldEnum[] | UserScalarFieldEnum;
    having?: UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _avg?: UserAvgAggregateInputType;
    _sum?: UserSumAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
  };

  export type UserGroupByOutputType = {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    country: string | null;
    city: string | null;
    birthday: Date;
    email: string;
    passwordHash: string;
    avatar: string | null;
    twoFactorEnabled: boolean;
    twoFactorSecret: string | null;
    createdAt: Date;
    updatedAt: Date;
    lastLogin: Date;
    isActive: boolean;
    _count: UserCountAggregateOutputType | null;
    _avg: UserAvgAggregateOutputType | null;
    _sum: UserSumAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof UserGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserGroupByOutputType[P]>
          : GetScalarType<T[P], UserGroupByOutputType[P]>;
      }
    >
  >;

  export type UserSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      username?: boolean;
      firstName?: boolean;
      lastName?: boolean;
      country?: boolean;
      city?: boolean;
      birthday?: boolean;
      email?: boolean;
      passwordHash?: boolean;
      avatar?: boolean;
      twoFactorEnabled?: boolean;
      twoFactorSecret?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      lastLogin?: boolean;
      isActive?: boolean;
      statistics?: boolean | User$statisticsArgs<ExtArgs>;
      matchPlayers?: boolean | User$matchPlayersArgs<ExtArgs>;
      achievements?: boolean | User$achievementsArgs<ExtArgs>;
      sentFriendRequests?: boolean | User$sentFriendRequestsArgs<ExtArgs>;
      receivedFriendRequests?:
        boolean | User$receivedFriendRequestsArgs<ExtArgs>;
      _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["user"]
  >;

  export type UserSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      username?: boolean;
      firstName?: boolean;
      lastName?: boolean;
      country?: boolean;
      city?: boolean;
      birthday?: boolean;
      email?: boolean;
      passwordHash?: boolean;
      avatar?: boolean;
      twoFactorEnabled?: boolean;
      twoFactorSecret?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      lastLogin?: boolean;
      isActive?: boolean;
    },
    ExtArgs["result"]["user"]
  >;

  export type UserSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      username?: boolean;
      firstName?: boolean;
      lastName?: boolean;
      country?: boolean;
      city?: boolean;
      birthday?: boolean;
      email?: boolean;
      passwordHash?: boolean;
      avatar?: boolean;
      twoFactorEnabled?: boolean;
      twoFactorSecret?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      lastLogin?: boolean;
      isActive?: boolean;
    },
    ExtArgs["result"]["user"]
  >;

  export type UserSelectScalar = {
    id?: boolean;
    username?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    country?: boolean;
    city?: boolean;
    birthday?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    avatar?: boolean;
    twoFactorEnabled?: boolean;
    twoFactorSecret?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    lastLogin?: boolean;
    isActive?: boolean;
  };

  export type UserOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | "id"
    | "username"
    | "firstName"
    | "lastName"
    | "country"
    | "city"
    | "birthday"
    | "email"
    | "passwordHash"
    | "avatar"
    | "twoFactorEnabled"
    | "twoFactorSecret"
    | "createdAt"
    | "updatedAt"
    | "lastLogin"
    | "isActive",
    ExtArgs["result"]["user"]
  >;
  export type UserInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    statistics?: boolean | User$statisticsArgs<ExtArgs>;
    matchPlayers?: boolean | User$matchPlayersArgs<ExtArgs>;
    achievements?: boolean | User$achievementsArgs<ExtArgs>;
    sentFriendRequests?: boolean | User$sentFriendRequestsArgs<ExtArgs>;
    receivedFriendRequests?: boolean | User$receivedFriendRequestsArgs<ExtArgs>;
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type UserIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type UserIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $UserPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "User";
    objects: {
      statistics: Prisma.$StatisticsPayload<ExtArgs> | null;
      matchPlayers: Prisma.$MatchPlayerPayload<ExtArgs>[];
      achievements: Prisma.$UserAchievementPayload<ExtArgs>[];
      sentFriendRequests: Prisma.$FriendshipPayload<ExtArgs>[];
      receivedFriendRequests: Prisma.$FriendshipPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        username: string;
        firstName: string;
        lastName: string;
        country: string | null;
        city: string | null;
        birthday: Date;
        email: string;
        passwordHash: string;
        avatar: string | null;
        twoFactorEnabled: boolean;
        twoFactorSecret: string | null;
        createdAt: Date;
        updatedAt: Date;
        lastLogin: Date;
        isActive: boolean;
      },
      ExtArgs["result"]["user"]
    >;
    composites: {};
  };

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> =
    $Result.GetResult<Prisma.$UserPayload, S>;

  type UserCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<UserFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: UserCountAggregateInputType | true;
  };

  export interface UserDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["User"];
      meta: { name: "User" };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(
      args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
     **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], UserCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserAggregateArgs>(
      args: Subset<T, UserAggregateArgs>,
    ): Prisma.PrismaPromise<GetUserAggregateType<T>>;

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs["orderBy"] }
        : { orderBy?: UserGroupByArgs["orderBy"] }),
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T["by"] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetUserGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    statistics<T extends User$statisticsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$statisticsArgs<ExtArgs>>,
    ): Prisma__StatisticsClient<
      $Result.GetResult<
        Prisma.$StatisticsPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;
    matchPlayers<T extends User$matchPlayersArgs<ExtArgs> = {}>(
      args?: Subset<T, User$matchPlayersArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$MatchPlayerPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    achievements<T extends User$achievementsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$achievementsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$UserAchievementPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    sentFriendRequests<T extends User$sentFriendRequestsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$sentFriendRequestsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$FriendshipPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    receivedFriendRequests<
      T extends User$receivedFriendRequestsArgs<ExtArgs> = {},
    >(
      args?: Subset<T, User$receivedFriendRequestsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$FriendshipPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?:
        ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", "Int">;
    readonly username: FieldRef<"User", "String">;
    readonly firstName: FieldRef<"User", "String">;
    readonly lastName: FieldRef<"User", "String">;
    readonly country: FieldRef<"User", "String">;
    readonly city: FieldRef<"User", "String">;
    readonly birthday: FieldRef<"User", "DateTime">;
    readonly email: FieldRef<"User", "String">;
    readonly passwordHash: FieldRef<"User", "String">;
    readonly avatar: FieldRef<"User", "String">;
    readonly twoFactorEnabled: FieldRef<"User", "Boolean">;
    readonly twoFactorSecret: FieldRef<"User", "String">;
    readonly createdAt: FieldRef<"User", "DateTime">;
    readonly updatedAt: FieldRef<"User", "DateTime">;
    readonly lastLogin: FieldRef<"User", "DateTime">;
    readonly isActive: FieldRef<"User", "Boolean">;
  }

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findMany
   */
  export type UserFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User create
   */
  export type UserCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>;
  };

  /**
   * User createMany
   */
  export type UserCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User update
   */
  export type UserUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User upsert
   */
  export type UserUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
  };

  /**
   * User delete
   */
  export type UserDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
  };

  /**
   * User.statistics
   */
  export type User$statisticsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: StatisticsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Statistics
     */
    omit?: StatisticsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatisticsInclude<ExtArgs> | null;
    where?: StatisticsWhereInput;
  };

  /**
   * User.matchPlayers
   */
  export type User$matchPlayersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerInclude<ExtArgs> | null;
    where?: MatchPlayerWhereInput;
    orderBy?:
      | MatchPlayerOrderByWithRelationInput
      | MatchPlayerOrderByWithRelationInput[];
    cursor?: MatchPlayerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: MatchPlayerScalarFieldEnum | MatchPlayerScalarFieldEnum[];
  };

  /**
   * User.achievements
   */
  export type User$achievementsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null;
    where?: UserAchievementWhereInput;
    orderBy?:
      | UserAchievementOrderByWithRelationInput
      | UserAchievementOrderByWithRelationInput[];
    cursor?: UserAchievementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?:
      UserAchievementScalarFieldEnum | UserAchievementScalarFieldEnum[];
  };

  /**
   * User.sentFriendRequests
   */
  export type User$sentFriendRequestsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null;
    where?: FriendshipWhereInput;
    orderBy?:
      FriendshipOrderByWithRelationInput | FriendshipOrderByWithRelationInput[];
    cursor?: FriendshipWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: FriendshipScalarFieldEnum | FriendshipScalarFieldEnum[];
  };

  /**
   * User.receivedFriendRequests
   */
  export type User$receivedFriendRequestsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null;
    where?: FriendshipWhereInput;
    orderBy?:
      FriendshipOrderByWithRelationInput | FriendshipOrderByWithRelationInput[];
    cursor?: FriendshipWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: FriendshipScalarFieldEnum | FriendshipScalarFieldEnum[];
  };

  /**
   * User without action
   */
  export type UserDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
  };

  /**
   * Model Statistics
   */

  export type AggregateStatistics = {
    _count: StatisticsCountAggregateOutputType | null;
    _avg: StatisticsAvgAggregateOutputType | null;
    _sum: StatisticsSumAggregateOutputType | null;
    _min: StatisticsMinAggregateOutputType | null;
    _max: StatisticsMaxAggregateOutputType | null;
  };

  export type StatisticsAvgAggregateOutputType = {
    userId: number | null;
    matchesPlayed: number | null;
    wins: number | null;
    losses: number | null;
    totalPitStops: number | null;
    perfectPitStops: number | null;
    fastestPitStopTime: number | null;
    totalCrashes: number | null;
  };

  export type StatisticsSumAggregateOutputType = {
    userId: number | null;
    matchesPlayed: number | null;
    wins: number | null;
    losses: number | null;
    totalPitStops: number | null;
    perfectPitStops: number | null;
    fastestPitStopTime: number | null;
    totalCrashes: number | null;
  };

  export type StatisticsMinAggregateOutputType = {
    userId: number | null;
    matchesPlayed: number | null;
    wins: number | null;
    losses: number | null;
    totalPitStops: number | null;
    perfectPitStops: number | null;
    fastestPitStopTime: number | null;
    totalCrashes: number | null;
  };

  export type StatisticsMaxAggregateOutputType = {
    userId: number | null;
    matchesPlayed: number | null;
    wins: number | null;
    losses: number | null;
    totalPitStops: number | null;
    perfectPitStops: number | null;
    fastestPitStopTime: number | null;
    totalCrashes: number | null;
  };

  export type StatisticsCountAggregateOutputType = {
    userId: number;
    matchesPlayed: number;
    wins: number;
    losses: number;
    totalPitStops: number;
    perfectPitStops: number;
    fastestPitStopTime: number;
    totalCrashes: number;
    _all: number;
  };

  export type StatisticsAvgAggregateInputType = {
    userId?: true;
    matchesPlayed?: true;
    wins?: true;
    losses?: true;
    totalPitStops?: true;
    perfectPitStops?: true;
    fastestPitStopTime?: true;
    totalCrashes?: true;
  };

  export type StatisticsSumAggregateInputType = {
    userId?: true;
    matchesPlayed?: true;
    wins?: true;
    losses?: true;
    totalPitStops?: true;
    perfectPitStops?: true;
    fastestPitStopTime?: true;
    totalCrashes?: true;
  };

  export type StatisticsMinAggregateInputType = {
    userId?: true;
    matchesPlayed?: true;
    wins?: true;
    losses?: true;
    totalPitStops?: true;
    perfectPitStops?: true;
    fastestPitStopTime?: true;
    totalCrashes?: true;
  };

  export type StatisticsMaxAggregateInputType = {
    userId?: true;
    matchesPlayed?: true;
    wins?: true;
    losses?: true;
    totalPitStops?: true;
    perfectPitStops?: true;
    fastestPitStopTime?: true;
    totalCrashes?: true;
  };

  export type StatisticsCountAggregateInputType = {
    userId?: true;
    matchesPlayed?: true;
    wins?: true;
    losses?: true;
    totalPitStops?: true;
    perfectPitStops?: true;
    fastestPitStopTime?: true;
    totalCrashes?: true;
    _all?: true;
  };

  export type StatisticsAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Statistics to aggregate.
     */
    where?: StatisticsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Statistics to fetch.
     */
    orderBy?:
      StatisticsOrderByWithRelationInput | StatisticsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: StatisticsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Statistics from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Statistics.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Statistics
     **/
    _count?: true | StatisticsCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: StatisticsAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: StatisticsSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: StatisticsMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: StatisticsMaxAggregateInputType;
  };

  export type GetStatisticsAggregateType<T extends StatisticsAggregateArgs> = {
    [P in keyof T & keyof AggregateStatistics]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStatistics[P]>
      : GetScalarType<T[P], AggregateStatistics[P]>;
  };

  export type StatisticsGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: StatisticsWhereInput;
    orderBy?:
      | StatisticsOrderByWithAggregationInput
      | StatisticsOrderByWithAggregationInput[];
    by: StatisticsScalarFieldEnum[] | StatisticsScalarFieldEnum;
    having?: StatisticsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StatisticsCountAggregateInputType | true;
    _avg?: StatisticsAvgAggregateInputType;
    _sum?: StatisticsSumAggregateInputType;
    _min?: StatisticsMinAggregateInputType;
    _max?: StatisticsMaxAggregateInputType;
  };

  export type StatisticsGroupByOutputType = {
    userId: number;
    matchesPlayed: number;
    wins: number;
    losses: number;
    totalPitStops: number;
    perfectPitStops: number;
    fastestPitStopTime: number;
    totalCrashes: number;
    _count: StatisticsCountAggregateOutputType | null;
    _avg: StatisticsAvgAggregateOutputType | null;
    _sum: StatisticsSumAggregateOutputType | null;
    _min: StatisticsMinAggregateOutputType | null;
    _max: StatisticsMaxAggregateOutputType | null;
  };

  type GetStatisticsGroupByPayload<T extends StatisticsGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<StatisticsGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof StatisticsGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StatisticsGroupByOutputType[P]>
            : GetScalarType<T[P], StatisticsGroupByOutputType[P]>;
        }
      >
    >;

  export type StatisticsSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      userId?: boolean;
      matchesPlayed?: boolean;
      wins?: boolean;
      losses?: boolean;
      totalPitStops?: boolean;
      perfectPitStops?: boolean;
      fastestPitStopTime?: boolean;
      totalCrashes?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["statistics"]
  >;

  export type StatisticsSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      userId?: boolean;
      matchesPlayed?: boolean;
      wins?: boolean;
      losses?: boolean;
      totalPitStops?: boolean;
      perfectPitStops?: boolean;
      fastestPitStopTime?: boolean;
      totalCrashes?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["statistics"]
  >;

  export type StatisticsSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      userId?: boolean;
      matchesPlayed?: boolean;
      wins?: boolean;
      losses?: boolean;
      totalPitStops?: boolean;
      perfectPitStops?: boolean;
      fastestPitStopTime?: boolean;
      totalCrashes?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["statistics"]
  >;

  export type StatisticsSelectScalar = {
    userId?: boolean;
    matchesPlayed?: boolean;
    wins?: boolean;
    losses?: boolean;
    totalPitStops?: boolean;
    perfectPitStops?: boolean;
    fastestPitStopTime?: boolean;
    totalCrashes?: boolean;
  };

  export type StatisticsOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | "userId"
    | "matchesPlayed"
    | "wins"
    | "losses"
    | "totalPitStops"
    | "perfectPitStops"
    | "fastestPitStopTime"
    | "totalCrashes",
    ExtArgs["result"]["statistics"]
  >;
  export type StatisticsInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type StatisticsIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type StatisticsIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $StatisticsPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Statistics";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        userId: number;
        matchesPlayed: number;
        wins: number;
        losses: number;
        totalPitStops: number;
        perfectPitStops: number;
        fastestPitStopTime: number;
        totalCrashes: number;
      },
      ExtArgs["result"]["statistics"]
    >;
    composites: {};
  };

  type StatisticsGetPayload<
    S extends boolean | null | undefined | StatisticsDefaultArgs,
  > = $Result.GetResult<Prisma.$StatisticsPayload, S>;

  type StatisticsCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    StatisticsFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: StatisticsCountAggregateInputType | true;
  };

  export interface StatisticsDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Statistics"];
      meta: { name: "Statistics" };
    };
    /**
     * Find zero or one Statistics that matches the filter.
     * @param {StatisticsFindUniqueArgs} args - Arguments to find a Statistics
     * @example
     * // Get one Statistics
     * const statistics = await prisma.statistics.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StatisticsFindUniqueArgs>(
      args: SelectSubset<T, StatisticsFindUniqueArgs<ExtArgs>>,
    ): Prisma__StatisticsClient<
      $Result.GetResult<
        Prisma.$StatisticsPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Statistics that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StatisticsFindUniqueOrThrowArgs} args - Arguments to find a Statistics
     * @example
     * // Get one Statistics
     * const statistics = await prisma.statistics.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StatisticsFindUniqueOrThrowArgs>(
      args: SelectSubset<T, StatisticsFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__StatisticsClient<
      $Result.GetResult<
        Prisma.$StatisticsPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Statistics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatisticsFindFirstArgs} args - Arguments to find a Statistics
     * @example
     * // Get one Statistics
     * const statistics = await prisma.statistics.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StatisticsFindFirstArgs>(
      args?: SelectSubset<T, StatisticsFindFirstArgs<ExtArgs>>,
    ): Prisma__StatisticsClient<
      $Result.GetResult<
        Prisma.$StatisticsPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Statistics that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatisticsFindFirstOrThrowArgs} args - Arguments to find a Statistics
     * @example
     * // Get one Statistics
     * const statistics = await prisma.statistics.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StatisticsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, StatisticsFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__StatisticsClient<
      $Result.GetResult<
        Prisma.$StatisticsPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Statistics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatisticsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Statistics
     * const statistics = await prisma.statistics.findMany()
     *
     * // Get first 10 Statistics
     * const statistics = await prisma.statistics.findMany({ take: 10 })
     *
     * // Only select the `userId`
     * const statisticsWithUserIdOnly = await prisma.statistics.findMany({ select: { userId: true } })
     *
     */
    findMany<T extends StatisticsFindManyArgs>(
      args?: SelectSubset<T, StatisticsFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$StatisticsPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Statistics.
     * @param {StatisticsCreateArgs} args - Arguments to create a Statistics.
     * @example
     * // Create one Statistics
     * const Statistics = await prisma.statistics.create({
     *   data: {
     *     // ... data to create a Statistics
     *   }
     * })
     *
     */
    create<T extends StatisticsCreateArgs>(
      args: SelectSubset<T, StatisticsCreateArgs<ExtArgs>>,
    ): Prisma__StatisticsClient<
      $Result.GetResult<
        Prisma.$StatisticsPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Statistics.
     * @param {StatisticsCreateManyArgs} args - Arguments to create many Statistics.
     * @example
     * // Create many Statistics
     * const statistics = await prisma.statistics.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends StatisticsCreateManyArgs>(
      args?: SelectSubset<T, StatisticsCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Statistics and returns the data saved in the database.
     * @param {StatisticsCreateManyAndReturnArgs} args - Arguments to create many Statistics.
     * @example
     * // Create many Statistics
     * const statistics = await prisma.statistics.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Statistics and only return the `userId`
     * const statisticsWithUserIdOnly = await prisma.statistics.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends StatisticsCreateManyAndReturnArgs>(
      args?: SelectSubset<T, StatisticsCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$StatisticsPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Statistics.
     * @param {StatisticsDeleteArgs} args - Arguments to delete one Statistics.
     * @example
     * // Delete one Statistics
     * const Statistics = await prisma.statistics.delete({
     *   where: {
     *     // ... filter to delete one Statistics
     *   }
     * })
     *
     */
    delete<T extends StatisticsDeleteArgs>(
      args: SelectSubset<T, StatisticsDeleteArgs<ExtArgs>>,
    ): Prisma__StatisticsClient<
      $Result.GetResult<
        Prisma.$StatisticsPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Statistics.
     * @param {StatisticsUpdateArgs} args - Arguments to update one Statistics.
     * @example
     * // Update one Statistics
     * const statistics = await prisma.statistics.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends StatisticsUpdateArgs>(
      args: SelectSubset<T, StatisticsUpdateArgs<ExtArgs>>,
    ): Prisma__StatisticsClient<
      $Result.GetResult<
        Prisma.$StatisticsPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Statistics.
     * @param {StatisticsDeleteManyArgs} args - Arguments to filter Statistics to delete.
     * @example
     * // Delete a few Statistics
     * const { count } = await prisma.statistics.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends StatisticsDeleteManyArgs>(
      args?: SelectSubset<T, StatisticsDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Statistics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatisticsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Statistics
     * const statistics = await prisma.statistics.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends StatisticsUpdateManyArgs>(
      args: SelectSubset<T, StatisticsUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Statistics and returns the data updated in the database.
     * @param {StatisticsUpdateManyAndReturnArgs} args - Arguments to update many Statistics.
     * @example
     * // Update many Statistics
     * const statistics = await prisma.statistics.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Statistics and only return the `userId`
     * const statisticsWithUserIdOnly = await prisma.statistics.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends StatisticsUpdateManyAndReturnArgs>(
      args: SelectSubset<T, StatisticsUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$StatisticsPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Statistics.
     * @param {StatisticsUpsertArgs} args - Arguments to update or create a Statistics.
     * @example
     * // Update or create a Statistics
     * const statistics = await prisma.statistics.upsert({
     *   create: {
     *     // ... data to create a Statistics
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Statistics we want to update
     *   }
     * })
     */
    upsert<T extends StatisticsUpsertArgs>(
      args: SelectSubset<T, StatisticsUpsertArgs<ExtArgs>>,
    ): Prisma__StatisticsClient<
      $Result.GetResult<
        Prisma.$StatisticsPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Statistics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatisticsCountArgs} args - Arguments to filter Statistics to count.
     * @example
     * // Count the number of Statistics
     * const count = await prisma.statistics.count({
     *   where: {
     *     // ... the filter for the Statistics we want to count
     *   }
     * })
     **/
    count<T extends StatisticsCountArgs>(
      args?: Subset<T, StatisticsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], StatisticsCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Statistics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatisticsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends StatisticsAggregateArgs>(
      args: Subset<T, StatisticsAggregateArgs>,
    ): Prisma.PrismaPromise<GetStatisticsAggregateType<T>>;

    /**
     * Group by Statistics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatisticsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends StatisticsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: StatisticsGroupByArgs["orderBy"] }
        : { orderBy?: StatisticsGroupByArgs["orderBy"] }),
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T["by"] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, StatisticsGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetStatisticsGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Statistics model
     */
    readonly fields: StatisticsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Statistics.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StatisticsClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?:
        ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Statistics model
   */
  interface StatisticsFieldRefs {
    readonly userId: FieldRef<"Statistics", "Int">;
    readonly matchesPlayed: FieldRef<"Statistics", "Int">;
    readonly wins: FieldRef<"Statistics", "Int">;
    readonly losses: FieldRef<"Statistics", "Int">;
    readonly totalPitStops: FieldRef<"Statistics", "Int">;
    readonly perfectPitStops: FieldRef<"Statistics", "Int">;
    readonly fastestPitStopTime: FieldRef<"Statistics", "Int">;
    readonly totalCrashes: FieldRef<"Statistics", "Int">;
  }

  // Custom InputTypes
  /**
   * Statistics findUnique
   */
  export type StatisticsFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: StatisticsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Statistics
     */
    omit?: StatisticsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatisticsInclude<ExtArgs> | null;
    /**
     * Filter, which Statistics to fetch.
     */
    where: StatisticsWhereUniqueInput;
  };

  /**
   * Statistics findUniqueOrThrow
   */
  export type StatisticsFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: StatisticsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Statistics
     */
    omit?: StatisticsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatisticsInclude<ExtArgs> | null;
    /**
     * Filter, which Statistics to fetch.
     */
    where: StatisticsWhereUniqueInput;
  };

  /**
   * Statistics findFirst
   */
  export type StatisticsFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: StatisticsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Statistics
     */
    omit?: StatisticsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatisticsInclude<ExtArgs> | null;
    /**
     * Filter, which Statistics to fetch.
     */
    where?: StatisticsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Statistics to fetch.
     */
    orderBy?:
      StatisticsOrderByWithRelationInput | StatisticsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Statistics.
     */
    cursor?: StatisticsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Statistics from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Statistics.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Statistics.
     */
    distinct?: StatisticsScalarFieldEnum | StatisticsScalarFieldEnum[];
  };

  /**
   * Statistics findFirstOrThrow
   */
  export type StatisticsFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: StatisticsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Statistics
     */
    omit?: StatisticsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatisticsInclude<ExtArgs> | null;
    /**
     * Filter, which Statistics to fetch.
     */
    where?: StatisticsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Statistics to fetch.
     */
    orderBy?:
      StatisticsOrderByWithRelationInput | StatisticsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Statistics.
     */
    cursor?: StatisticsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Statistics from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Statistics.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Statistics.
     */
    distinct?: StatisticsScalarFieldEnum | StatisticsScalarFieldEnum[];
  };

  /**
   * Statistics findMany
   */
  export type StatisticsFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: StatisticsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Statistics
     */
    omit?: StatisticsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatisticsInclude<ExtArgs> | null;
    /**
     * Filter, which Statistics to fetch.
     */
    where?: StatisticsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Statistics to fetch.
     */
    orderBy?:
      StatisticsOrderByWithRelationInput | StatisticsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Statistics.
     */
    cursor?: StatisticsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Statistics from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Statistics.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Statistics.
     */
    distinct?: StatisticsScalarFieldEnum | StatisticsScalarFieldEnum[];
  };

  /**
   * Statistics create
   */
  export type StatisticsCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: StatisticsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Statistics
     */
    omit?: StatisticsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatisticsInclude<ExtArgs> | null;
    /**
     * The data needed to create a Statistics.
     */
    data: XOR<StatisticsCreateInput, StatisticsUncheckedCreateInput>;
  };

  /**
   * Statistics createMany
   */
  export type StatisticsCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Statistics.
     */
    data: StatisticsCreateManyInput | StatisticsCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Statistics createManyAndReturn
   */
  export type StatisticsCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: StatisticsSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Statistics
     */
    omit?: StatisticsOmit<ExtArgs> | null;
    /**
     * The data used to create many Statistics.
     */
    data: StatisticsCreateManyInput | StatisticsCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatisticsIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Statistics update
   */
  export type StatisticsUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: StatisticsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Statistics
     */
    omit?: StatisticsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatisticsInclude<ExtArgs> | null;
    /**
     * The data needed to update a Statistics.
     */
    data: XOR<StatisticsUpdateInput, StatisticsUncheckedUpdateInput>;
    /**
     * Choose, which Statistics to update.
     */
    where: StatisticsWhereUniqueInput;
  };

  /**
   * Statistics updateMany
   */
  export type StatisticsUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Statistics.
     */
    data: XOR<
      StatisticsUpdateManyMutationInput,
      StatisticsUncheckedUpdateManyInput
    >;
    /**
     * Filter which Statistics to update
     */
    where?: StatisticsWhereInput;
    /**
     * Limit how many Statistics to update.
     */
    limit?: number;
  };

  /**
   * Statistics updateManyAndReturn
   */
  export type StatisticsUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: StatisticsSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Statistics
     */
    omit?: StatisticsOmit<ExtArgs> | null;
    /**
     * The data used to update Statistics.
     */
    data: XOR<
      StatisticsUpdateManyMutationInput,
      StatisticsUncheckedUpdateManyInput
    >;
    /**
     * Filter which Statistics to update
     */
    where?: StatisticsWhereInput;
    /**
     * Limit how many Statistics to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatisticsIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Statistics upsert
   */
  export type StatisticsUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: StatisticsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Statistics
     */
    omit?: StatisticsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatisticsInclude<ExtArgs> | null;
    /**
     * The filter to search for the Statistics to update in case it exists.
     */
    where: StatisticsWhereUniqueInput;
    /**
     * In case the Statistics found by the `where` argument doesn't exist, create a new Statistics with this data.
     */
    create: XOR<StatisticsCreateInput, StatisticsUncheckedCreateInput>;
    /**
     * In case the Statistics was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StatisticsUpdateInput, StatisticsUncheckedUpdateInput>;
  };

  /**
   * Statistics delete
   */
  export type StatisticsDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: StatisticsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Statistics
     */
    omit?: StatisticsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatisticsInclude<ExtArgs> | null;
    /**
     * Filter which Statistics to delete.
     */
    where: StatisticsWhereUniqueInput;
  };

  /**
   * Statistics deleteMany
   */
  export type StatisticsDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Statistics to delete
     */
    where?: StatisticsWhereInput;
    /**
     * Limit how many Statistics to delete.
     */
    limit?: number;
  };

  /**
   * Statistics without action
   */
  export type StatisticsDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: StatisticsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Statistics
     */
    omit?: StatisticsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatisticsInclude<ExtArgs> | null;
  };

  /**
   * Model Match
   */

  export type AggregateMatch = {
    _count: MatchCountAggregateOutputType | null;
    _avg: MatchAvgAggregateOutputType | null;
    _sum: MatchSumAggregateOutputType | null;
    _min: MatchMinAggregateOutputType | null;
    _max: MatchMaxAggregateOutputType | null;
  };

  export type MatchAvgAggregateOutputType = {
    id: number | null;
    winningTeam: number | null;
  };

  export type MatchSumAggregateOutputType = {
    id: number | null;
    winningTeam: number | null;
  };

  export type MatchMinAggregateOutputType = {
    id: number | null;
    winningTeam: number | null;
    startedAt: Date | null;
    finishedAt: Date | null;
    gameMode: string | null;
  };

  export type MatchMaxAggregateOutputType = {
    id: number | null;
    winningTeam: number | null;
    startedAt: Date | null;
    finishedAt: Date | null;
    gameMode: string | null;
  };

  export type MatchCountAggregateOutputType = {
    id: number;
    winningTeam: number;
    startedAt: number;
    finishedAt: number;
    gameMode: number;
    _all: number;
  };

  export type MatchAvgAggregateInputType = {
    id?: true;
    winningTeam?: true;
  };

  export type MatchSumAggregateInputType = {
    id?: true;
    winningTeam?: true;
  };

  export type MatchMinAggregateInputType = {
    id?: true;
    winningTeam?: true;
    startedAt?: true;
    finishedAt?: true;
    gameMode?: true;
  };

  export type MatchMaxAggregateInputType = {
    id?: true;
    winningTeam?: true;
    startedAt?: true;
    finishedAt?: true;
    gameMode?: true;
  };

  export type MatchCountAggregateInputType = {
    id?: true;
    winningTeam?: true;
    startedAt?: true;
    finishedAt?: true;
    gameMode?: true;
    _all?: true;
  };

  export type MatchAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Match to aggregate.
     */
    where?: MatchWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: MatchWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Matches.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Matches
     **/
    _count?: true | MatchCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: MatchAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: MatchSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: MatchMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: MatchMaxAggregateInputType;
  };

  export type GetMatchAggregateType<T extends MatchAggregateArgs> = {
    [P in keyof T & keyof AggregateMatch]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMatch[P]>
      : GetScalarType<T[P], AggregateMatch[P]>;
  };

  export type MatchGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: MatchWhereInput;
    orderBy?:
      MatchOrderByWithAggregationInput | MatchOrderByWithAggregationInput[];
    by: MatchScalarFieldEnum[] | MatchScalarFieldEnum;
    having?: MatchScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MatchCountAggregateInputType | true;
    _avg?: MatchAvgAggregateInputType;
    _sum?: MatchSumAggregateInputType;
    _min?: MatchMinAggregateInputType;
    _max?: MatchMaxAggregateInputType;
  };

  export type MatchGroupByOutputType = {
    id: number;
    winningTeam: number;
    startedAt: Date;
    finishedAt: Date | null;
    gameMode: string;
    _count: MatchCountAggregateOutputType | null;
    _avg: MatchAvgAggregateOutputType | null;
    _sum: MatchSumAggregateOutputType | null;
    _min: MatchMinAggregateOutputType | null;
    _max: MatchMaxAggregateOutputType | null;
  };

  type GetMatchGroupByPayload<T extends MatchGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<MatchGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof MatchGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MatchGroupByOutputType[P]>
            : GetScalarType<T[P], MatchGroupByOutputType[P]>;
        }
      >
    >;

  export type MatchSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      winningTeam?: boolean;
      startedAt?: boolean;
      finishedAt?: boolean;
      gameMode?: boolean;
      players?: boolean | Match$playersArgs<ExtArgs>;
      _count?: boolean | MatchCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["match"]
  >;

  export type MatchSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      winningTeam?: boolean;
      startedAt?: boolean;
      finishedAt?: boolean;
      gameMode?: boolean;
    },
    ExtArgs["result"]["match"]
  >;

  export type MatchSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      winningTeam?: boolean;
      startedAt?: boolean;
      finishedAt?: boolean;
      gameMode?: boolean;
    },
    ExtArgs["result"]["match"]
  >;

  export type MatchSelectScalar = {
    id?: boolean;
    winningTeam?: boolean;
    startedAt?: boolean;
    finishedAt?: boolean;
    gameMode?: boolean;
  };

  export type MatchOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    "id" | "winningTeam" | "startedAt" | "finishedAt" | "gameMode",
    ExtArgs["result"]["match"]
  >;
  export type MatchInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    players?: boolean | Match$playersArgs<ExtArgs>;
    _count?: boolean | MatchCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type MatchIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type MatchIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $MatchPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Match";
    objects: {
      players: Prisma.$MatchPlayerPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        winningTeam: number;
        startedAt: Date;
        finishedAt: Date | null;
        gameMode: string;
      },
      ExtArgs["result"]["match"]
    >;
    composites: {};
  };

  type MatchGetPayload<
    S extends boolean | null | undefined | MatchDefaultArgs,
  > = $Result.GetResult<Prisma.$MatchPayload, S>;

  type MatchCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<MatchFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: MatchCountAggregateInputType | true;
  };

  export interface MatchDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Match"];
      meta: { name: "Match" };
    };
    /**
     * Find zero or one Match that matches the filter.
     * @param {MatchFindUniqueArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MatchFindUniqueArgs>(
      args: SelectSubset<T, MatchFindUniqueArgs<ExtArgs>>,
    ): Prisma__MatchClient<
      $Result.GetResult<
        Prisma.$MatchPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Match that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MatchFindUniqueOrThrowArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MatchFindUniqueOrThrowArgs>(
      args: SelectSubset<T, MatchFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__MatchClient<
      $Result.GetResult<
        Prisma.$MatchPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Match that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindFirstArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MatchFindFirstArgs>(
      args?: SelectSubset<T, MatchFindFirstArgs<ExtArgs>>,
    ): Prisma__MatchClient<
      $Result.GetResult<
        Prisma.$MatchPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Match that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindFirstOrThrowArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MatchFindFirstOrThrowArgs>(
      args?: SelectSubset<T, MatchFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__MatchClient<
      $Result.GetResult<
        Prisma.$MatchPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Matches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Matches
     * const matches = await prisma.match.findMany()
     *
     * // Get first 10 Matches
     * const matches = await prisma.match.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const matchWithIdOnly = await prisma.match.findMany({ select: { id: true } })
     *
     */
    findMany<T extends MatchFindManyArgs>(
      args?: SelectSubset<T, MatchFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$MatchPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Match.
     * @param {MatchCreateArgs} args - Arguments to create a Match.
     * @example
     * // Create one Match
     * const Match = await prisma.match.create({
     *   data: {
     *     // ... data to create a Match
     *   }
     * })
     *
     */
    create<T extends MatchCreateArgs>(
      args: SelectSubset<T, MatchCreateArgs<ExtArgs>>,
    ): Prisma__MatchClient<
      $Result.GetResult<
        Prisma.$MatchPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Matches.
     * @param {MatchCreateManyArgs} args - Arguments to create many Matches.
     * @example
     * // Create many Matches
     * const match = await prisma.match.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MatchCreateManyArgs>(
      args?: SelectSubset<T, MatchCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Matches and returns the data saved in the database.
     * @param {MatchCreateManyAndReturnArgs} args - Arguments to create many Matches.
     * @example
     * // Create many Matches
     * const match = await prisma.match.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Matches and only return the `id`
     * const matchWithIdOnly = await prisma.match.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MatchCreateManyAndReturnArgs>(
      args?: SelectSubset<T, MatchCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$MatchPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Match.
     * @param {MatchDeleteArgs} args - Arguments to delete one Match.
     * @example
     * // Delete one Match
     * const Match = await prisma.match.delete({
     *   where: {
     *     // ... filter to delete one Match
     *   }
     * })
     *
     */
    delete<T extends MatchDeleteArgs>(
      args: SelectSubset<T, MatchDeleteArgs<ExtArgs>>,
    ): Prisma__MatchClient<
      $Result.GetResult<
        Prisma.$MatchPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Match.
     * @param {MatchUpdateArgs} args - Arguments to update one Match.
     * @example
     * // Update one Match
     * const match = await prisma.match.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MatchUpdateArgs>(
      args: SelectSubset<T, MatchUpdateArgs<ExtArgs>>,
    ): Prisma__MatchClient<
      $Result.GetResult<
        Prisma.$MatchPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Matches.
     * @param {MatchDeleteManyArgs} args - Arguments to filter Matches to delete.
     * @example
     * // Delete a few Matches
     * const { count } = await prisma.match.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MatchDeleteManyArgs>(
      args?: SelectSubset<T, MatchDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Matches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Matches
     * const match = await prisma.match.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MatchUpdateManyArgs>(
      args: SelectSubset<T, MatchUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Matches and returns the data updated in the database.
     * @param {MatchUpdateManyAndReturnArgs} args - Arguments to update many Matches.
     * @example
     * // Update many Matches
     * const match = await prisma.match.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Matches and only return the `id`
     * const matchWithIdOnly = await prisma.match.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends MatchUpdateManyAndReturnArgs>(
      args: SelectSubset<T, MatchUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$MatchPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Match.
     * @param {MatchUpsertArgs} args - Arguments to update or create a Match.
     * @example
     * // Update or create a Match
     * const match = await prisma.match.upsert({
     *   create: {
     *     // ... data to create a Match
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Match we want to update
     *   }
     * })
     */
    upsert<T extends MatchUpsertArgs>(
      args: SelectSubset<T, MatchUpsertArgs<ExtArgs>>,
    ): Prisma__MatchClient<
      $Result.GetResult<
        Prisma.$MatchPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Matches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchCountArgs} args - Arguments to filter Matches to count.
     * @example
     * // Count the number of Matches
     * const count = await prisma.match.count({
     *   where: {
     *     // ... the filter for the Matches we want to count
     *   }
     * })
     **/
    count<T extends MatchCountArgs>(
      args?: Subset<T, MatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], MatchCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Match.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends MatchAggregateArgs>(
      args: Subset<T, MatchAggregateArgs>,
    ): Prisma.PrismaPromise<GetMatchAggregateType<T>>;

    /**
     * Group by Match.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends MatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: MatchGroupByArgs["orderBy"] }
        : { orderBy?: MatchGroupByArgs["orderBy"] }),
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T["by"] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, MatchGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetMatchGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Match model
     */
    readonly fields: MatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Match.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MatchClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    players<T extends Match$playersArgs<ExtArgs> = {}>(
      args?: Subset<T, Match$playersArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$MatchPlayerPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?:
        ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Match model
   */
  interface MatchFieldRefs {
    readonly id: FieldRef<"Match", "Int">;
    readonly winningTeam: FieldRef<"Match", "Int">;
    readonly startedAt: FieldRef<"Match", "DateTime">;
    readonly finishedAt: FieldRef<"Match", "DateTime">;
    readonly gameMode: FieldRef<"Match", "String">;
  }

  // Custom InputTypes
  /**
   * Match findUnique
   */
  export type MatchFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null;
    /**
     * Filter, which Match to fetch.
     */
    where: MatchWhereUniqueInput;
  };

  /**
   * Match findUniqueOrThrow
   */
  export type MatchFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null;
    /**
     * Filter, which Match to fetch.
     */
    where: MatchWhereUniqueInput;
  };

  /**
   * Match findFirst
   */
  export type MatchFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null;
    /**
     * Filter, which Match to fetch.
     */
    where?: MatchWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Matches.
     */
    cursor?: MatchWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Matches.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Matches.
     */
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[];
  };

  /**
   * Match findFirstOrThrow
   */
  export type MatchFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null;
    /**
     * Filter, which Match to fetch.
     */
    where?: MatchWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Matches.
     */
    cursor?: MatchWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Matches.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Matches.
     */
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[];
  };

  /**
   * Match findMany
   */
  export type MatchFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null;
    /**
     * Filter, which Matches to fetch.
     */
    where?: MatchWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Matches.
     */
    cursor?: MatchWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Matches.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Matches.
     */
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[];
  };

  /**
   * Match create
   */
  export type MatchCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null;
    /**
     * The data needed to create a Match.
     */
    data: XOR<MatchCreateInput, MatchUncheckedCreateInput>;
  };

  /**
   * Match createMany
   */
  export type MatchCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Matches.
     */
    data: MatchCreateManyInput | MatchCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Match createManyAndReturn
   */
  export type MatchCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null;
    /**
     * The data used to create many Matches.
     */
    data: MatchCreateManyInput | MatchCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Match update
   */
  export type MatchUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null;
    /**
     * The data needed to update a Match.
     */
    data: XOR<MatchUpdateInput, MatchUncheckedUpdateInput>;
    /**
     * Choose, which Match to update.
     */
    where: MatchWhereUniqueInput;
  };

  /**
   * Match updateMany
   */
  export type MatchUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Matches.
     */
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyInput>;
    /**
     * Filter which Matches to update
     */
    where?: MatchWhereInput;
    /**
     * Limit how many Matches to update.
     */
    limit?: number;
  };

  /**
   * Match updateManyAndReturn
   */
  export type MatchUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null;
    /**
     * The data used to update Matches.
     */
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyInput>;
    /**
     * Filter which Matches to update
     */
    where?: MatchWhereInput;
    /**
     * Limit how many Matches to update.
     */
    limit?: number;
  };

  /**
   * Match upsert
   */
  export type MatchUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null;
    /**
     * The filter to search for the Match to update in case it exists.
     */
    where: MatchWhereUniqueInput;
    /**
     * In case the Match found by the `where` argument doesn't exist, create a new Match with this data.
     */
    create: XOR<MatchCreateInput, MatchUncheckedCreateInput>;
    /**
     * In case the Match was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MatchUpdateInput, MatchUncheckedUpdateInput>;
  };

  /**
   * Match delete
   */
  export type MatchDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null;
    /**
     * Filter which Match to delete.
     */
    where: MatchWhereUniqueInput;
  };

  /**
   * Match deleteMany
   */
  export type MatchDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Matches to delete
     */
    where?: MatchWhereInput;
    /**
     * Limit how many Matches to delete.
     */
    limit?: number;
  };

  /**
   * Match.players
   */
  export type Match$playersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerInclude<ExtArgs> | null;
    where?: MatchPlayerWhereInput;
    orderBy?:
      | MatchPlayerOrderByWithRelationInput
      | MatchPlayerOrderByWithRelationInput[];
    cursor?: MatchPlayerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: MatchPlayerScalarFieldEnum | MatchPlayerScalarFieldEnum[];
  };

  /**
   * Match without action
   */
  export type MatchDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null;
  };

  /**
   * Model MatchPlayer
   */

  export type AggregateMatchPlayer = {
    _count: MatchPlayerCountAggregateOutputType | null;
    _avg: MatchPlayerAvgAggregateOutputType | null;
    _sum: MatchPlayerSumAggregateOutputType | null;
    _min: MatchPlayerMinAggregateOutputType | null;
    _max: MatchPlayerMaxAggregateOutputType | null;
  };

  export type MatchPlayerAvgAggregateOutputType = {
    userId: number | null;
    matchId: number | null;
    team: number | null;
  };

  export type MatchPlayerSumAggregateOutputType = {
    userId: number | null;
    matchId: number | null;
    team: number | null;
  };

  export type MatchPlayerMinAggregateOutputType = {
    userId: number | null;
    matchId: number | null;
    team: number | null;
  };

  export type MatchPlayerMaxAggregateOutputType = {
    userId: number | null;
    matchId: number | null;
    team: number | null;
  };

  export type MatchPlayerCountAggregateOutputType = {
    userId: number;
    matchId: number;
    team: number;
    _all: number;
  };

  export type MatchPlayerAvgAggregateInputType = {
    userId?: true;
    matchId?: true;
    team?: true;
  };

  export type MatchPlayerSumAggregateInputType = {
    userId?: true;
    matchId?: true;
    team?: true;
  };

  export type MatchPlayerMinAggregateInputType = {
    userId?: true;
    matchId?: true;
    team?: true;
  };

  export type MatchPlayerMaxAggregateInputType = {
    userId?: true;
    matchId?: true;
    team?: true;
  };

  export type MatchPlayerCountAggregateInputType = {
    userId?: true;
    matchId?: true;
    team?: true;
    _all?: true;
  };

  export type MatchPlayerAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which MatchPlayer to aggregate.
     */
    where?: MatchPlayerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MatchPlayers to fetch.
     */
    orderBy?:
      | MatchPlayerOrderByWithRelationInput
      | MatchPlayerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: MatchPlayerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MatchPlayers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MatchPlayers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned MatchPlayers
     **/
    _count?: true | MatchPlayerCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: MatchPlayerAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: MatchPlayerSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: MatchPlayerMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: MatchPlayerMaxAggregateInputType;
  };

  export type GetMatchPlayerAggregateType<T extends MatchPlayerAggregateArgs> =
    {
      [P in keyof T & keyof AggregateMatchPlayer]: P extends "_count" | "count"
        ? T[P] extends true
          ? number
          : GetScalarType<T[P], AggregateMatchPlayer[P]>
        : GetScalarType<T[P], AggregateMatchPlayer[P]>;
    };

  export type MatchPlayerGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: MatchPlayerWhereInput;
    orderBy?:
      | MatchPlayerOrderByWithAggregationInput
      | MatchPlayerOrderByWithAggregationInput[];
    by: MatchPlayerScalarFieldEnum[] | MatchPlayerScalarFieldEnum;
    having?: MatchPlayerScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MatchPlayerCountAggregateInputType | true;
    _avg?: MatchPlayerAvgAggregateInputType;
    _sum?: MatchPlayerSumAggregateInputType;
    _min?: MatchPlayerMinAggregateInputType;
    _max?: MatchPlayerMaxAggregateInputType;
  };

  export type MatchPlayerGroupByOutputType = {
    userId: number;
    matchId: number;
    team: number;
    _count: MatchPlayerCountAggregateOutputType | null;
    _avg: MatchPlayerAvgAggregateOutputType | null;
    _sum: MatchPlayerSumAggregateOutputType | null;
    _min: MatchPlayerMinAggregateOutputType | null;
    _max: MatchPlayerMaxAggregateOutputType | null;
  };

  type GetMatchPlayerGroupByPayload<T extends MatchPlayerGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<MatchPlayerGroupByOutputType, T["by"]> & {
          [
            P in keyof T & keyof MatchPlayerGroupByOutputType
          ]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MatchPlayerGroupByOutputType[P]>
            : GetScalarType<T[P], MatchPlayerGroupByOutputType[P]>;
        }
      >
    >;

  export type MatchPlayerSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      userId?: boolean;
      matchId?: boolean;
      team?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      match?: boolean | MatchDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["matchPlayer"]
  >;

  export type MatchPlayerSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      userId?: boolean;
      matchId?: boolean;
      team?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      match?: boolean | MatchDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["matchPlayer"]
  >;

  export type MatchPlayerSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      userId?: boolean;
      matchId?: boolean;
      team?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      match?: boolean | MatchDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["matchPlayer"]
  >;

  export type MatchPlayerSelectScalar = {
    userId?: boolean;
    matchId?: boolean;
    team?: boolean;
  };

  export type MatchPlayerOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    "userId" | "matchId" | "team",
    ExtArgs["result"]["matchPlayer"]
  >;
  export type MatchPlayerInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    match?: boolean | MatchDefaultArgs<ExtArgs>;
  };
  export type MatchPlayerIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    match?: boolean | MatchDefaultArgs<ExtArgs>;
  };
  export type MatchPlayerIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    match?: boolean | MatchDefaultArgs<ExtArgs>;
  };

  export type $MatchPlayerPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "MatchPlayer";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
      match: Prisma.$MatchPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        userId: number;
        matchId: number;
        team: number;
      },
      ExtArgs["result"]["matchPlayer"]
    >;
    composites: {};
  };

  type MatchPlayerGetPayload<
    S extends boolean | null | undefined | MatchPlayerDefaultArgs,
  > = $Result.GetResult<Prisma.$MatchPlayerPayload, S>;

  type MatchPlayerCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    MatchPlayerFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: MatchPlayerCountAggregateInputType | true;
  };

  export interface MatchPlayerDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["MatchPlayer"];
      meta: { name: "MatchPlayer" };
    };
    /**
     * Find zero or one MatchPlayer that matches the filter.
     * @param {MatchPlayerFindUniqueArgs} args - Arguments to find a MatchPlayer
     * @example
     * // Get one MatchPlayer
     * const matchPlayer = await prisma.matchPlayer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MatchPlayerFindUniqueArgs>(
      args: SelectSubset<T, MatchPlayerFindUniqueArgs<ExtArgs>>,
    ): Prisma__MatchPlayerClient<
      $Result.GetResult<
        Prisma.$MatchPlayerPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one MatchPlayer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MatchPlayerFindUniqueOrThrowArgs} args - Arguments to find a MatchPlayer
     * @example
     * // Get one MatchPlayer
     * const matchPlayer = await prisma.matchPlayer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MatchPlayerFindUniqueOrThrowArgs>(
      args: SelectSubset<T, MatchPlayerFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__MatchPlayerClient<
      $Result.GetResult<
        Prisma.$MatchPlayerPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first MatchPlayer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchPlayerFindFirstArgs} args - Arguments to find a MatchPlayer
     * @example
     * // Get one MatchPlayer
     * const matchPlayer = await prisma.matchPlayer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MatchPlayerFindFirstArgs>(
      args?: SelectSubset<T, MatchPlayerFindFirstArgs<ExtArgs>>,
    ): Prisma__MatchPlayerClient<
      $Result.GetResult<
        Prisma.$MatchPlayerPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first MatchPlayer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchPlayerFindFirstOrThrowArgs} args - Arguments to find a MatchPlayer
     * @example
     * // Get one MatchPlayer
     * const matchPlayer = await prisma.matchPlayer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MatchPlayerFindFirstOrThrowArgs>(
      args?: SelectSubset<T, MatchPlayerFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__MatchPlayerClient<
      $Result.GetResult<
        Prisma.$MatchPlayerPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more MatchPlayers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchPlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MatchPlayers
     * const matchPlayers = await prisma.matchPlayer.findMany()
     *
     * // Get first 10 MatchPlayers
     * const matchPlayers = await prisma.matchPlayer.findMany({ take: 10 })
     *
     * // Only select the `userId`
     * const matchPlayerWithUserIdOnly = await prisma.matchPlayer.findMany({ select: { userId: true } })
     *
     */
    findMany<T extends MatchPlayerFindManyArgs>(
      args?: SelectSubset<T, MatchPlayerFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$MatchPlayerPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a MatchPlayer.
     * @param {MatchPlayerCreateArgs} args - Arguments to create a MatchPlayer.
     * @example
     * // Create one MatchPlayer
     * const MatchPlayer = await prisma.matchPlayer.create({
     *   data: {
     *     // ... data to create a MatchPlayer
     *   }
     * })
     *
     */
    create<T extends MatchPlayerCreateArgs>(
      args: SelectSubset<T, MatchPlayerCreateArgs<ExtArgs>>,
    ): Prisma__MatchPlayerClient<
      $Result.GetResult<
        Prisma.$MatchPlayerPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many MatchPlayers.
     * @param {MatchPlayerCreateManyArgs} args - Arguments to create many MatchPlayers.
     * @example
     * // Create many MatchPlayers
     * const matchPlayer = await prisma.matchPlayer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MatchPlayerCreateManyArgs>(
      args?: SelectSubset<T, MatchPlayerCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many MatchPlayers and returns the data saved in the database.
     * @param {MatchPlayerCreateManyAndReturnArgs} args - Arguments to create many MatchPlayers.
     * @example
     * // Create many MatchPlayers
     * const matchPlayer = await prisma.matchPlayer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many MatchPlayers and only return the `userId`
     * const matchPlayerWithUserIdOnly = await prisma.matchPlayer.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MatchPlayerCreateManyAndReturnArgs>(
      args?: SelectSubset<T, MatchPlayerCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$MatchPlayerPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a MatchPlayer.
     * @param {MatchPlayerDeleteArgs} args - Arguments to delete one MatchPlayer.
     * @example
     * // Delete one MatchPlayer
     * const MatchPlayer = await prisma.matchPlayer.delete({
     *   where: {
     *     // ... filter to delete one MatchPlayer
     *   }
     * })
     *
     */
    delete<T extends MatchPlayerDeleteArgs>(
      args: SelectSubset<T, MatchPlayerDeleteArgs<ExtArgs>>,
    ): Prisma__MatchPlayerClient<
      $Result.GetResult<
        Prisma.$MatchPlayerPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one MatchPlayer.
     * @param {MatchPlayerUpdateArgs} args - Arguments to update one MatchPlayer.
     * @example
     * // Update one MatchPlayer
     * const matchPlayer = await prisma.matchPlayer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MatchPlayerUpdateArgs>(
      args: SelectSubset<T, MatchPlayerUpdateArgs<ExtArgs>>,
    ): Prisma__MatchPlayerClient<
      $Result.GetResult<
        Prisma.$MatchPlayerPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more MatchPlayers.
     * @param {MatchPlayerDeleteManyArgs} args - Arguments to filter MatchPlayers to delete.
     * @example
     * // Delete a few MatchPlayers
     * const { count } = await prisma.matchPlayer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MatchPlayerDeleteManyArgs>(
      args?: SelectSubset<T, MatchPlayerDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more MatchPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchPlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MatchPlayers
     * const matchPlayer = await prisma.matchPlayer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MatchPlayerUpdateManyArgs>(
      args: SelectSubset<T, MatchPlayerUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more MatchPlayers and returns the data updated in the database.
     * @param {MatchPlayerUpdateManyAndReturnArgs} args - Arguments to update many MatchPlayers.
     * @example
     * // Update many MatchPlayers
     * const matchPlayer = await prisma.matchPlayer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more MatchPlayers and only return the `userId`
     * const matchPlayerWithUserIdOnly = await prisma.matchPlayer.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends MatchPlayerUpdateManyAndReturnArgs>(
      args: SelectSubset<T, MatchPlayerUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$MatchPlayerPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one MatchPlayer.
     * @param {MatchPlayerUpsertArgs} args - Arguments to update or create a MatchPlayer.
     * @example
     * // Update or create a MatchPlayer
     * const matchPlayer = await prisma.matchPlayer.upsert({
     *   create: {
     *     // ... data to create a MatchPlayer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MatchPlayer we want to update
     *   }
     * })
     */
    upsert<T extends MatchPlayerUpsertArgs>(
      args: SelectSubset<T, MatchPlayerUpsertArgs<ExtArgs>>,
    ): Prisma__MatchPlayerClient<
      $Result.GetResult<
        Prisma.$MatchPlayerPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of MatchPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchPlayerCountArgs} args - Arguments to filter MatchPlayers to count.
     * @example
     * // Count the number of MatchPlayers
     * const count = await prisma.matchPlayer.count({
     *   where: {
     *     // ... the filter for the MatchPlayers we want to count
     *   }
     * })
     **/
    count<T extends MatchPlayerCountArgs>(
      args?: Subset<T, MatchPlayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], MatchPlayerCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a MatchPlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchPlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends MatchPlayerAggregateArgs>(
      args: Subset<T, MatchPlayerAggregateArgs>,
    ): Prisma.PrismaPromise<GetMatchPlayerAggregateType<T>>;

    /**
     * Group by MatchPlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchPlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends MatchPlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: MatchPlayerGroupByArgs["orderBy"] }
        : { orderBy?: MatchPlayerGroupByArgs["orderBy"] }),
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T["by"] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, MatchPlayerGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetMatchPlayerGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the MatchPlayer model
     */
    readonly fields: MatchPlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MatchPlayer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MatchPlayerClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    match<T extends MatchDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, MatchDefaultArgs<ExtArgs>>,
    ): Prisma__MatchClient<
      | $Result.GetResult<
          Prisma.$MatchPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?:
        ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the MatchPlayer model
   */
  interface MatchPlayerFieldRefs {
    readonly userId: FieldRef<"MatchPlayer", "Int">;
    readonly matchId: FieldRef<"MatchPlayer", "Int">;
    readonly team: FieldRef<"MatchPlayer", "Int">;
  }

  // Custom InputTypes
  /**
   * MatchPlayer findUnique
   */
  export type MatchPlayerFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerInclude<ExtArgs> | null;
    /**
     * Filter, which MatchPlayer to fetch.
     */
    where: MatchPlayerWhereUniqueInput;
  };

  /**
   * MatchPlayer findUniqueOrThrow
   */
  export type MatchPlayerFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerInclude<ExtArgs> | null;
    /**
     * Filter, which MatchPlayer to fetch.
     */
    where: MatchPlayerWhereUniqueInput;
  };

  /**
   * MatchPlayer findFirst
   */
  export type MatchPlayerFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerInclude<ExtArgs> | null;
    /**
     * Filter, which MatchPlayer to fetch.
     */
    where?: MatchPlayerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MatchPlayers to fetch.
     */
    orderBy?:
      | MatchPlayerOrderByWithRelationInput
      | MatchPlayerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MatchPlayers.
     */
    cursor?: MatchPlayerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MatchPlayers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MatchPlayers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MatchPlayers.
     */
    distinct?: MatchPlayerScalarFieldEnum | MatchPlayerScalarFieldEnum[];
  };

  /**
   * MatchPlayer findFirstOrThrow
   */
  export type MatchPlayerFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerInclude<ExtArgs> | null;
    /**
     * Filter, which MatchPlayer to fetch.
     */
    where?: MatchPlayerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MatchPlayers to fetch.
     */
    orderBy?:
      | MatchPlayerOrderByWithRelationInput
      | MatchPlayerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MatchPlayers.
     */
    cursor?: MatchPlayerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MatchPlayers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MatchPlayers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MatchPlayers.
     */
    distinct?: MatchPlayerScalarFieldEnum | MatchPlayerScalarFieldEnum[];
  };

  /**
   * MatchPlayer findMany
   */
  export type MatchPlayerFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerInclude<ExtArgs> | null;
    /**
     * Filter, which MatchPlayers to fetch.
     */
    where?: MatchPlayerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MatchPlayers to fetch.
     */
    orderBy?:
      | MatchPlayerOrderByWithRelationInput
      | MatchPlayerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing MatchPlayers.
     */
    cursor?: MatchPlayerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MatchPlayers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MatchPlayers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MatchPlayers.
     */
    distinct?: MatchPlayerScalarFieldEnum | MatchPlayerScalarFieldEnum[];
  };

  /**
   * MatchPlayer create
   */
  export type MatchPlayerCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerInclude<ExtArgs> | null;
    /**
     * The data needed to create a MatchPlayer.
     */
    data: XOR<MatchPlayerCreateInput, MatchPlayerUncheckedCreateInput>;
  };

  /**
   * MatchPlayer createMany
   */
  export type MatchPlayerCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many MatchPlayers.
     */
    data: MatchPlayerCreateManyInput | MatchPlayerCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * MatchPlayer createManyAndReturn
   */
  export type MatchPlayerCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null;
    /**
     * The data used to create many MatchPlayers.
     */
    data: MatchPlayerCreateManyInput | MatchPlayerCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * MatchPlayer update
   */
  export type MatchPlayerUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerInclude<ExtArgs> | null;
    /**
     * The data needed to update a MatchPlayer.
     */
    data: XOR<MatchPlayerUpdateInput, MatchPlayerUncheckedUpdateInput>;
    /**
     * Choose, which MatchPlayer to update.
     */
    where: MatchPlayerWhereUniqueInput;
  };

  /**
   * MatchPlayer updateMany
   */
  export type MatchPlayerUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update MatchPlayers.
     */
    data: XOR<
      MatchPlayerUpdateManyMutationInput,
      MatchPlayerUncheckedUpdateManyInput
    >;
    /**
     * Filter which MatchPlayers to update
     */
    where?: MatchPlayerWhereInput;
    /**
     * Limit how many MatchPlayers to update.
     */
    limit?: number;
  };

  /**
   * MatchPlayer updateManyAndReturn
   */
  export type MatchPlayerUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null;
    /**
     * The data used to update MatchPlayers.
     */
    data: XOR<
      MatchPlayerUpdateManyMutationInput,
      MatchPlayerUncheckedUpdateManyInput
    >;
    /**
     * Filter which MatchPlayers to update
     */
    where?: MatchPlayerWhereInput;
    /**
     * Limit how many MatchPlayers to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * MatchPlayer upsert
   */
  export type MatchPlayerUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerInclude<ExtArgs> | null;
    /**
     * The filter to search for the MatchPlayer to update in case it exists.
     */
    where: MatchPlayerWhereUniqueInput;
    /**
     * In case the MatchPlayer found by the `where` argument doesn't exist, create a new MatchPlayer with this data.
     */
    create: XOR<MatchPlayerCreateInput, MatchPlayerUncheckedCreateInput>;
    /**
     * In case the MatchPlayer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MatchPlayerUpdateInput, MatchPlayerUncheckedUpdateInput>;
  };

  /**
   * MatchPlayer delete
   */
  export type MatchPlayerDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerInclude<ExtArgs> | null;
    /**
     * Filter which MatchPlayer to delete.
     */
    where: MatchPlayerWhereUniqueInput;
  };

  /**
   * MatchPlayer deleteMany
   */
  export type MatchPlayerDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which MatchPlayers to delete
     */
    where?: MatchPlayerWhereInput;
    /**
     * Limit how many MatchPlayers to delete.
     */
    limit?: number;
  };

  /**
   * MatchPlayer without action
   */
  export type MatchPlayerDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerInclude<ExtArgs> | null;
  };

  /**
   * Model Friendship
   */

  export type AggregateFriendship = {
    _count: FriendshipCountAggregateOutputType | null;
    _avg: FriendshipAvgAggregateOutputType | null;
    _sum: FriendshipSumAggregateOutputType | null;
    _min: FriendshipMinAggregateOutputType | null;
    _max: FriendshipMaxAggregateOutputType | null;
  };

  export type FriendshipAvgAggregateOutputType = {
    id: number | null;
    requesterId: number | null;
    receiverId: number | null;
  };

  export type FriendshipSumAggregateOutputType = {
    id: number | null;
    requesterId: number | null;
    receiverId: number | null;
  };

  export type FriendshipMinAggregateOutputType = {
    id: number | null;
    requesterId: number | null;
    receiverId: number | null;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type FriendshipMaxAggregateOutputType = {
    id: number | null;
    requesterId: number | null;
    receiverId: number | null;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type FriendshipCountAggregateOutputType = {
    id: number;
    requesterId: number;
    receiverId: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type FriendshipAvgAggregateInputType = {
    id?: true;
    requesterId?: true;
    receiverId?: true;
  };

  export type FriendshipSumAggregateInputType = {
    id?: true;
    requesterId?: true;
    receiverId?: true;
  };

  export type FriendshipMinAggregateInputType = {
    id?: true;
    requesterId?: true;
    receiverId?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type FriendshipMaxAggregateInputType = {
    id?: true;
    requesterId?: true;
    receiverId?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type FriendshipCountAggregateInputType = {
    id?: true;
    requesterId?: true;
    receiverId?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type FriendshipAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Friendship to aggregate.
     */
    where?: FriendshipWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Friendships to fetch.
     */
    orderBy?:
      FriendshipOrderByWithRelationInput | FriendshipOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: FriendshipWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Friendships from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Friendships.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Friendships
     **/
    _count?: true | FriendshipCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: FriendshipAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: FriendshipSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: FriendshipMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: FriendshipMaxAggregateInputType;
  };

  export type GetFriendshipAggregateType<T extends FriendshipAggregateArgs> = {
    [P in keyof T & keyof AggregateFriendship]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFriendship[P]>
      : GetScalarType<T[P], AggregateFriendship[P]>;
  };

  export type FriendshipGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: FriendshipWhereInput;
    orderBy?:
      | FriendshipOrderByWithAggregationInput
      | FriendshipOrderByWithAggregationInput[];
    by: FriendshipScalarFieldEnum[] | FriendshipScalarFieldEnum;
    having?: FriendshipScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FriendshipCountAggregateInputType | true;
    _avg?: FriendshipAvgAggregateInputType;
    _sum?: FriendshipSumAggregateInputType;
    _min?: FriendshipMinAggregateInputType;
    _max?: FriendshipMaxAggregateInputType;
  };

  export type FriendshipGroupByOutputType = {
    id: number;
    requesterId: number;
    receiverId: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    _count: FriendshipCountAggregateOutputType | null;
    _avg: FriendshipAvgAggregateOutputType | null;
    _sum: FriendshipSumAggregateOutputType | null;
    _min: FriendshipMinAggregateOutputType | null;
    _max: FriendshipMaxAggregateOutputType | null;
  };

  type GetFriendshipGroupByPayload<T extends FriendshipGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<FriendshipGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof FriendshipGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FriendshipGroupByOutputType[P]>
            : GetScalarType<T[P], FriendshipGroupByOutputType[P]>;
        }
      >
    >;

  export type FriendshipSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      requesterId?: boolean;
      receiverId?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      requester?: boolean | UserDefaultArgs<ExtArgs>;
      receiver?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["friendship"]
  >;

  export type FriendshipSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      requesterId?: boolean;
      receiverId?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      requester?: boolean | UserDefaultArgs<ExtArgs>;
      receiver?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["friendship"]
  >;

  export type FriendshipSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      requesterId?: boolean;
      receiverId?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      requester?: boolean | UserDefaultArgs<ExtArgs>;
      receiver?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["friendship"]
  >;

  export type FriendshipSelectScalar = {
    id?: boolean;
    requesterId?: boolean;
    receiverId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type FriendshipOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    "id" | "requesterId" | "receiverId" | "status" | "createdAt" | "updatedAt",
    ExtArgs["result"]["friendship"]
  >;
  export type FriendshipInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    requester?: boolean | UserDefaultArgs<ExtArgs>;
    receiver?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type FriendshipIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    requester?: boolean | UserDefaultArgs<ExtArgs>;
    receiver?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type FriendshipIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    requester?: boolean | UserDefaultArgs<ExtArgs>;
    receiver?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $FriendshipPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Friendship";
    objects: {
      requester: Prisma.$UserPayload<ExtArgs>;
      receiver: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        requesterId: number;
        receiverId: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["friendship"]
    >;
    composites: {};
  };

  type FriendshipGetPayload<
    S extends boolean | null | undefined | FriendshipDefaultArgs,
  > = $Result.GetResult<Prisma.$FriendshipPayload, S>;

  type FriendshipCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    FriendshipFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: FriendshipCountAggregateInputType | true;
  };

  export interface FriendshipDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Friendship"];
      meta: { name: "Friendship" };
    };
    /**
     * Find zero or one Friendship that matches the filter.
     * @param {FriendshipFindUniqueArgs} args - Arguments to find a Friendship
     * @example
     * // Get one Friendship
     * const friendship = await prisma.friendship.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FriendshipFindUniqueArgs>(
      args: SelectSubset<T, FriendshipFindUniqueArgs<ExtArgs>>,
    ): Prisma__FriendshipClient<
      $Result.GetResult<
        Prisma.$FriendshipPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Friendship that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FriendshipFindUniqueOrThrowArgs} args - Arguments to find a Friendship
     * @example
     * // Get one Friendship
     * const friendship = await prisma.friendship.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FriendshipFindUniqueOrThrowArgs>(
      args: SelectSubset<T, FriendshipFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__FriendshipClient<
      $Result.GetResult<
        Prisma.$FriendshipPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Friendship that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipFindFirstArgs} args - Arguments to find a Friendship
     * @example
     * // Get one Friendship
     * const friendship = await prisma.friendship.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FriendshipFindFirstArgs>(
      args?: SelectSubset<T, FriendshipFindFirstArgs<ExtArgs>>,
    ): Prisma__FriendshipClient<
      $Result.GetResult<
        Prisma.$FriendshipPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Friendship that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipFindFirstOrThrowArgs} args - Arguments to find a Friendship
     * @example
     * // Get one Friendship
     * const friendship = await prisma.friendship.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FriendshipFindFirstOrThrowArgs>(
      args?: SelectSubset<T, FriendshipFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__FriendshipClient<
      $Result.GetResult<
        Prisma.$FriendshipPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Friendships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Friendships
     * const friendships = await prisma.friendship.findMany()
     *
     * // Get first 10 Friendships
     * const friendships = await prisma.friendship.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const friendshipWithIdOnly = await prisma.friendship.findMany({ select: { id: true } })
     *
     */
    findMany<T extends FriendshipFindManyArgs>(
      args?: SelectSubset<T, FriendshipFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$FriendshipPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Friendship.
     * @param {FriendshipCreateArgs} args - Arguments to create a Friendship.
     * @example
     * // Create one Friendship
     * const Friendship = await prisma.friendship.create({
     *   data: {
     *     // ... data to create a Friendship
     *   }
     * })
     *
     */
    create<T extends FriendshipCreateArgs>(
      args: SelectSubset<T, FriendshipCreateArgs<ExtArgs>>,
    ): Prisma__FriendshipClient<
      $Result.GetResult<
        Prisma.$FriendshipPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Friendships.
     * @param {FriendshipCreateManyArgs} args - Arguments to create many Friendships.
     * @example
     * // Create many Friendships
     * const friendship = await prisma.friendship.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends FriendshipCreateManyArgs>(
      args?: SelectSubset<T, FriendshipCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Friendships and returns the data saved in the database.
     * @param {FriendshipCreateManyAndReturnArgs} args - Arguments to create many Friendships.
     * @example
     * // Create many Friendships
     * const friendship = await prisma.friendship.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Friendships and only return the `id`
     * const friendshipWithIdOnly = await prisma.friendship.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends FriendshipCreateManyAndReturnArgs>(
      args?: SelectSubset<T, FriendshipCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$FriendshipPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Friendship.
     * @param {FriendshipDeleteArgs} args - Arguments to delete one Friendship.
     * @example
     * // Delete one Friendship
     * const Friendship = await prisma.friendship.delete({
     *   where: {
     *     // ... filter to delete one Friendship
     *   }
     * })
     *
     */
    delete<T extends FriendshipDeleteArgs>(
      args: SelectSubset<T, FriendshipDeleteArgs<ExtArgs>>,
    ): Prisma__FriendshipClient<
      $Result.GetResult<
        Prisma.$FriendshipPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Friendship.
     * @param {FriendshipUpdateArgs} args - Arguments to update one Friendship.
     * @example
     * // Update one Friendship
     * const friendship = await prisma.friendship.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends FriendshipUpdateArgs>(
      args: SelectSubset<T, FriendshipUpdateArgs<ExtArgs>>,
    ): Prisma__FriendshipClient<
      $Result.GetResult<
        Prisma.$FriendshipPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Friendships.
     * @param {FriendshipDeleteManyArgs} args - Arguments to filter Friendships to delete.
     * @example
     * // Delete a few Friendships
     * const { count } = await prisma.friendship.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends FriendshipDeleteManyArgs>(
      args?: SelectSubset<T, FriendshipDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Friendships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Friendships
     * const friendship = await prisma.friendship.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends FriendshipUpdateManyArgs>(
      args: SelectSubset<T, FriendshipUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Friendships and returns the data updated in the database.
     * @param {FriendshipUpdateManyAndReturnArgs} args - Arguments to update many Friendships.
     * @example
     * // Update many Friendships
     * const friendship = await prisma.friendship.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Friendships and only return the `id`
     * const friendshipWithIdOnly = await prisma.friendship.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends FriendshipUpdateManyAndReturnArgs>(
      args: SelectSubset<T, FriendshipUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$FriendshipPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Friendship.
     * @param {FriendshipUpsertArgs} args - Arguments to update or create a Friendship.
     * @example
     * // Update or create a Friendship
     * const friendship = await prisma.friendship.upsert({
     *   create: {
     *     // ... data to create a Friendship
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Friendship we want to update
     *   }
     * })
     */
    upsert<T extends FriendshipUpsertArgs>(
      args: SelectSubset<T, FriendshipUpsertArgs<ExtArgs>>,
    ): Prisma__FriendshipClient<
      $Result.GetResult<
        Prisma.$FriendshipPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Friendships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipCountArgs} args - Arguments to filter Friendships to count.
     * @example
     * // Count the number of Friendships
     * const count = await prisma.friendship.count({
     *   where: {
     *     // ... the filter for the Friendships we want to count
     *   }
     * })
     **/
    count<T extends FriendshipCountArgs>(
      args?: Subset<T, FriendshipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], FriendshipCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Friendship.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends FriendshipAggregateArgs>(
      args: Subset<T, FriendshipAggregateArgs>,
    ): Prisma.PrismaPromise<GetFriendshipAggregateType<T>>;

    /**
     * Group by Friendship.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends FriendshipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: FriendshipGroupByArgs["orderBy"] }
        : { orderBy?: FriendshipGroupByArgs["orderBy"] }),
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T["by"] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, FriendshipGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetFriendshipGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Friendship model
     */
    readonly fields: FriendshipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Friendship.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FriendshipClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    requester<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    receiver<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?:
        ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Friendship model
   */
  interface FriendshipFieldRefs {
    readonly id: FieldRef<"Friendship", "Int">;
    readonly requesterId: FieldRef<"Friendship", "Int">;
    readonly receiverId: FieldRef<"Friendship", "Int">;
    readonly status: FieldRef<"Friendship", "String">;
    readonly createdAt: FieldRef<"Friendship", "DateTime">;
    readonly updatedAt: FieldRef<"Friendship", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Friendship findUnique
   */
  export type FriendshipFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null;
    /**
     * Filter, which Friendship to fetch.
     */
    where: FriendshipWhereUniqueInput;
  };

  /**
   * Friendship findUniqueOrThrow
   */
  export type FriendshipFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null;
    /**
     * Filter, which Friendship to fetch.
     */
    where: FriendshipWhereUniqueInput;
  };

  /**
   * Friendship findFirst
   */
  export type FriendshipFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null;
    /**
     * Filter, which Friendship to fetch.
     */
    where?: FriendshipWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Friendships to fetch.
     */
    orderBy?:
      FriendshipOrderByWithRelationInput | FriendshipOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Friendships.
     */
    cursor?: FriendshipWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Friendships from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Friendships.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Friendships.
     */
    distinct?: FriendshipScalarFieldEnum | FriendshipScalarFieldEnum[];
  };

  /**
   * Friendship findFirstOrThrow
   */
  export type FriendshipFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null;
    /**
     * Filter, which Friendship to fetch.
     */
    where?: FriendshipWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Friendships to fetch.
     */
    orderBy?:
      FriendshipOrderByWithRelationInput | FriendshipOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Friendships.
     */
    cursor?: FriendshipWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Friendships from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Friendships.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Friendships.
     */
    distinct?: FriendshipScalarFieldEnum | FriendshipScalarFieldEnum[];
  };

  /**
   * Friendship findMany
   */
  export type FriendshipFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null;
    /**
     * Filter, which Friendships to fetch.
     */
    where?: FriendshipWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Friendships to fetch.
     */
    orderBy?:
      FriendshipOrderByWithRelationInput | FriendshipOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Friendships.
     */
    cursor?: FriendshipWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Friendships from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Friendships.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Friendships.
     */
    distinct?: FriendshipScalarFieldEnum | FriendshipScalarFieldEnum[];
  };

  /**
   * Friendship create
   */
  export type FriendshipCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null;
    /**
     * The data needed to create a Friendship.
     */
    data: XOR<FriendshipCreateInput, FriendshipUncheckedCreateInput>;
  };

  /**
   * Friendship createMany
   */
  export type FriendshipCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Friendships.
     */
    data: FriendshipCreateManyInput | FriendshipCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Friendship createManyAndReturn
   */
  export type FriendshipCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null;
    /**
     * The data used to create many Friendships.
     */
    data: FriendshipCreateManyInput | FriendshipCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Friendship update
   */
  export type FriendshipUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null;
    /**
     * The data needed to update a Friendship.
     */
    data: XOR<FriendshipUpdateInput, FriendshipUncheckedUpdateInput>;
    /**
     * Choose, which Friendship to update.
     */
    where: FriendshipWhereUniqueInput;
  };

  /**
   * Friendship updateMany
   */
  export type FriendshipUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Friendships.
     */
    data: XOR<
      FriendshipUpdateManyMutationInput,
      FriendshipUncheckedUpdateManyInput
    >;
    /**
     * Filter which Friendships to update
     */
    where?: FriendshipWhereInput;
    /**
     * Limit how many Friendships to update.
     */
    limit?: number;
  };

  /**
   * Friendship updateManyAndReturn
   */
  export type FriendshipUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null;
    /**
     * The data used to update Friendships.
     */
    data: XOR<
      FriendshipUpdateManyMutationInput,
      FriendshipUncheckedUpdateManyInput
    >;
    /**
     * Filter which Friendships to update
     */
    where?: FriendshipWhereInput;
    /**
     * Limit how many Friendships to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Friendship upsert
   */
  export type FriendshipUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null;
    /**
     * The filter to search for the Friendship to update in case it exists.
     */
    where: FriendshipWhereUniqueInput;
    /**
     * In case the Friendship found by the `where` argument doesn't exist, create a new Friendship with this data.
     */
    create: XOR<FriendshipCreateInput, FriendshipUncheckedCreateInput>;
    /**
     * In case the Friendship was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FriendshipUpdateInput, FriendshipUncheckedUpdateInput>;
  };

  /**
   * Friendship delete
   */
  export type FriendshipDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null;
    /**
     * Filter which Friendship to delete.
     */
    where: FriendshipWhereUniqueInput;
  };

  /**
   * Friendship deleteMany
   */
  export type FriendshipDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Friendships to delete
     */
    where?: FriendshipWhereInput;
    /**
     * Limit how many Friendships to delete.
     */
    limit?: number;
  };

  /**
   * Friendship without action
   */
  export type FriendshipDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null;
  };

  /**
   * Model Achievement
   */

  export type AggregateAchievement = {
    _count: AchievementCountAggregateOutputType | null;
    _avg: AchievementAvgAggregateOutputType | null;
    _sum: AchievementSumAggregateOutputType | null;
    _min: AchievementMinAggregateOutputType | null;
    _max: AchievementMaxAggregateOutputType | null;
  };

  export type AchievementAvgAggregateOutputType = {
    id: number | null;
  };

  export type AchievementSumAggregateOutputType = {
    id: number | null;
  };

  export type AchievementMinAggregateOutputType = {
    id: number | null;
    name: string | null;
    description: string | null;
  };

  export type AchievementMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
    description: string | null;
  };

  export type AchievementCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    _all: number;
  };

  export type AchievementAvgAggregateInputType = {
    id?: true;
  };

  export type AchievementSumAggregateInputType = {
    id?: true;
  };

  export type AchievementMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
  };

  export type AchievementMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
  };

  export type AchievementCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    _all?: true;
  };

  export type AchievementAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Achievement to aggregate.
     */
    where?: AchievementWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Achievements to fetch.
     */
    orderBy?:
      | AchievementOrderByWithRelationInput
      | AchievementOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: AchievementWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Achievements.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Achievements
     **/
    _count?: true | AchievementCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: AchievementAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: AchievementSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: AchievementMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: AchievementMaxAggregateInputType;
  };

  export type GetAchievementAggregateType<T extends AchievementAggregateArgs> =
    {
      [P in keyof T & keyof AggregateAchievement]: P extends "_count" | "count"
        ? T[P] extends true
          ? number
          : GetScalarType<T[P], AggregateAchievement[P]>
        : GetScalarType<T[P], AggregateAchievement[P]>;
    };

  export type AchievementGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AchievementWhereInput;
    orderBy?:
      | AchievementOrderByWithAggregationInput
      | AchievementOrderByWithAggregationInput[];
    by: AchievementScalarFieldEnum[] | AchievementScalarFieldEnum;
    having?: AchievementScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AchievementCountAggregateInputType | true;
    _avg?: AchievementAvgAggregateInputType;
    _sum?: AchievementSumAggregateInputType;
    _min?: AchievementMinAggregateInputType;
    _max?: AchievementMaxAggregateInputType;
  };

  export type AchievementGroupByOutputType = {
    id: number;
    name: string;
    description: string;
    _count: AchievementCountAggregateOutputType | null;
    _avg: AchievementAvgAggregateOutputType | null;
    _sum: AchievementSumAggregateOutputType | null;
    _min: AchievementMinAggregateOutputType | null;
    _max: AchievementMaxAggregateOutputType | null;
  };

  type GetAchievementGroupByPayload<T extends AchievementGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<AchievementGroupByOutputType, T["by"]> & {
          [
            P in keyof T & keyof AchievementGroupByOutputType
          ]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AchievementGroupByOutputType[P]>
            : GetScalarType<T[P], AchievementGroupByOutputType[P]>;
        }
      >
    >;

  export type AchievementSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      description?: boolean;
      users?: boolean | Achievement$usersArgs<ExtArgs>;
      _count?: boolean | AchievementCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["achievement"]
  >;

  export type AchievementSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      description?: boolean;
    },
    ExtArgs["result"]["achievement"]
  >;

  export type AchievementSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      description?: boolean;
    },
    ExtArgs["result"]["achievement"]
  >;

  export type AchievementSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
  };

  export type AchievementOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    "id" | "name" | "description",
    ExtArgs["result"]["achievement"]
  >;
  export type AchievementInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    users?: boolean | Achievement$usersArgs<ExtArgs>;
    _count?: boolean | AchievementCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type AchievementIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type AchievementIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $AchievementPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Achievement";
    objects: {
      users: Prisma.$UserAchievementPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        name: string;
        description: string;
      },
      ExtArgs["result"]["achievement"]
    >;
    composites: {};
  };

  type AchievementGetPayload<
    S extends boolean | null | undefined | AchievementDefaultArgs,
  > = $Result.GetResult<Prisma.$AchievementPayload, S>;

  type AchievementCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    AchievementFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: AchievementCountAggregateInputType | true;
  };

  export interface AchievementDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Achievement"];
      meta: { name: "Achievement" };
    };
    /**
     * Find zero or one Achievement that matches the filter.
     * @param {AchievementFindUniqueArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AchievementFindUniqueArgs>(
      args: SelectSubset<T, AchievementFindUniqueArgs<ExtArgs>>,
    ): Prisma__AchievementClient<
      $Result.GetResult<
        Prisma.$AchievementPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Achievement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AchievementFindUniqueOrThrowArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AchievementFindUniqueOrThrowArgs>(
      args: SelectSubset<T, AchievementFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__AchievementClient<
      $Result.GetResult<
        Prisma.$AchievementPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Achievement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindFirstArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AchievementFindFirstArgs>(
      args?: SelectSubset<T, AchievementFindFirstArgs<ExtArgs>>,
    ): Prisma__AchievementClient<
      $Result.GetResult<
        Prisma.$AchievementPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Achievement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindFirstOrThrowArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AchievementFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AchievementFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__AchievementClient<
      $Result.GetResult<
        Prisma.$AchievementPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Achievements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Achievements
     * const achievements = await prisma.achievement.findMany()
     *
     * // Get first 10 Achievements
     * const achievements = await prisma.achievement.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const achievementWithIdOnly = await prisma.achievement.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AchievementFindManyArgs>(
      args?: SelectSubset<T, AchievementFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AchievementPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Achievement.
     * @param {AchievementCreateArgs} args - Arguments to create a Achievement.
     * @example
     * // Create one Achievement
     * const Achievement = await prisma.achievement.create({
     *   data: {
     *     // ... data to create a Achievement
     *   }
     * })
     *
     */
    create<T extends AchievementCreateArgs>(
      args: SelectSubset<T, AchievementCreateArgs<ExtArgs>>,
    ): Prisma__AchievementClient<
      $Result.GetResult<
        Prisma.$AchievementPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Achievements.
     * @param {AchievementCreateManyArgs} args - Arguments to create many Achievements.
     * @example
     * // Create many Achievements
     * const achievement = await prisma.achievement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AchievementCreateManyArgs>(
      args?: SelectSubset<T, AchievementCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Achievements and returns the data saved in the database.
     * @param {AchievementCreateManyAndReturnArgs} args - Arguments to create many Achievements.
     * @example
     * // Create many Achievements
     * const achievement = await prisma.achievement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Achievements and only return the `id`
     * const achievementWithIdOnly = await prisma.achievement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AchievementCreateManyAndReturnArgs>(
      args?: SelectSubset<T, AchievementCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AchievementPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Achievement.
     * @param {AchievementDeleteArgs} args - Arguments to delete one Achievement.
     * @example
     * // Delete one Achievement
     * const Achievement = await prisma.achievement.delete({
     *   where: {
     *     // ... filter to delete one Achievement
     *   }
     * })
     *
     */
    delete<T extends AchievementDeleteArgs>(
      args: SelectSubset<T, AchievementDeleteArgs<ExtArgs>>,
    ): Prisma__AchievementClient<
      $Result.GetResult<
        Prisma.$AchievementPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Achievement.
     * @param {AchievementUpdateArgs} args - Arguments to update one Achievement.
     * @example
     * // Update one Achievement
     * const achievement = await prisma.achievement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AchievementUpdateArgs>(
      args: SelectSubset<T, AchievementUpdateArgs<ExtArgs>>,
    ): Prisma__AchievementClient<
      $Result.GetResult<
        Prisma.$AchievementPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Achievements.
     * @param {AchievementDeleteManyArgs} args - Arguments to filter Achievements to delete.
     * @example
     * // Delete a few Achievements
     * const { count } = await prisma.achievement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AchievementDeleteManyArgs>(
      args?: SelectSubset<T, AchievementDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Achievements
     * const achievement = await prisma.achievement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AchievementUpdateManyArgs>(
      args: SelectSubset<T, AchievementUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Achievements and returns the data updated in the database.
     * @param {AchievementUpdateManyAndReturnArgs} args - Arguments to update many Achievements.
     * @example
     * // Update many Achievements
     * const achievement = await prisma.achievement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Achievements and only return the `id`
     * const achievementWithIdOnly = await prisma.achievement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends AchievementUpdateManyAndReturnArgs>(
      args: SelectSubset<T, AchievementUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AchievementPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Achievement.
     * @param {AchievementUpsertArgs} args - Arguments to update or create a Achievement.
     * @example
     * // Update or create a Achievement
     * const achievement = await prisma.achievement.upsert({
     *   create: {
     *     // ... data to create a Achievement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Achievement we want to update
     *   }
     * })
     */
    upsert<T extends AchievementUpsertArgs>(
      args: SelectSubset<T, AchievementUpsertArgs<ExtArgs>>,
    ): Prisma__AchievementClient<
      $Result.GetResult<
        Prisma.$AchievementPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementCountArgs} args - Arguments to filter Achievements to count.
     * @example
     * // Count the number of Achievements
     * const count = await prisma.achievement.count({
     *   where: {
     *     // ... the filter for the Achievements we want to count
     *   }
     * })
     **/
    count<T extends AchievementCountArgs>(
      args?: Subset<T, AchievementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], AchievementCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Achievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends AchievementAggregateArgs>(
      args: Subset<T, AchievementAggregateArgs>,
    ): Prisma.PrismaPromise<GetAchievementAggregateType<T>>;

    /**
     * Group by Achievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends AchievementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: AchievementGroupByArgs["orderBy"] }
        : { orderBy?: AchievementGroupByArgs["orderBy"] }),
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T["by"] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, AchievementGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetAchievementGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Achievement model
     */
    readonly fields: AchievementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Achievement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AchievementClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    users<T extends Achievement$usersArgs<ExtArgs> = {}>(
      args?: Subset<T, Achievement$usersArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$UserAchievementPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?:
        ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Achievement model
   */
  interface AchievementFieldRefs {
    readonly id: FieldRef<"Achievement", "Int">;
    readonly name: FieldRef<"Achievement", "String">;
    readonly description: FieldRef<"Achievement", "String">;
  }

  // Custom InputTypes
  /**
   * Achievement findUnique
   */
  export type AchievementFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null;
    /**
     * Filter, which Achievement to fetch.
     */
    where: AchievementWhereUniqueInput;
  };

  /**
   * Achievement findUniqueOrThrow
   */
  export type AchievementFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null;
    /**
     * Filter, which Achievement to fetch.
     */
    where: AchievementWhereUniqueInput;
  };

  /**
   * Achievement findFirst
   */
  export type AchievementFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null;
    /**
     * Filter, which Achievement to fetch.
     */
    where?: AchievementWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Achievements to fetch.
     */
    orderBy?:
      | AchievementOrderByWithRelationInput
      | AchievementOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Achievements.
     */
    cursor?: AchievementWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Achievements.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Achievements.
     */
    distinct?: AchievementScalarFieldEnum | AchievementScalarFieldEnum[];
  };

  /**
   * Achievement findFirstOrThrow
   */
  export type AchievementFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null;
    /**
     * Filter, which Achievement to fetch.
     */
    where?: AchievementWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Achievements to fetch.
     */
    orderBy?:
      | AchievementOrderByWithRelationInput
      | AchievementOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Achievements.
     */
    cursor?: AchievementWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Achievements.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Achievements.
     */
    distinct?: AchievementScalarFieldEnum | AchievementScalarFieldEnum[];
  };

  /**
   * Achievement findMany
   */
  export type AchievementFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null;
    /**
     * Filter, which Achievements to fetch.
     */
    where?: AchievementWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Achievements to fetch.
     */
    orderBy?:
      | AchievementOrderByWithRelationInput
      | AchievementOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Achievements.
     */
    cursor?: AchievementWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Achievements.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Achievements.
     */
    distinct?: AchievementScalarFieldEnum | AchievementScalarFieldEnum[];
  };

  /**
   * Achievement create
   */
  export type AchievementCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null;
    /**
     * The data needed to create a Achievement.
     */
    data: XOR<AchievementCreateInput, AchievementUncheckedCreateInput>;
  };

  /**
   * Achievement createMany
   */
  export type AchievementCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Achievements.
     */
    data: AchievementCreateManyInput | AchievementCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Achievement createManyAndReturn
   */
  export type AchievementCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null;
    /**
     * The data used to create many Achievements.
     */
    data: AchievementCreateManyInput | AchievementCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Achievement update
   */
  export type AchievementUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null;
    /**
     * The data needed to update a Achievement.
     */
    data: XOR<AchievementUpdateInput, AchievementUncheckedUpdateInput>;
    /**
     * Choose, which Achievement to update.
     */
    where: AchievementWhereUniqueInput;
  };

  /**
   * Achievement updateMany
   */
  export type AchievementUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Achievements.
     */
    data: XOR<
      AchievementUpdateManyMutationInput,
      AchievementUncheckedUpdateManyInput
    >;
    /**
     * Filter which Achievements to update
     */
    where?: AchievementWhereInput;
    /**
     * Limit how many Achievements to update.
     */
    limit?: number;
  };

  /**
   * Achievement updateManyAndReturn
   */
  export type AchievementUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null;
    /**
     * The data used to update Achievements.
     */
    data: XOR<
      AchievementUpdateManyMutationInput,
      AchievementUncheckedUpdateManyInput
    >;
    /**
     * Filter which Achievements to update
     */
    where?: AchievementWhereInput;
    /**
     * Limit how many Achievements to update.
     */
    limit?: number;
  };

  /**
   * Achievement upsert
   */
  export type AchievementUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null;
    /**
     * The filter to search for the Achievement to update in case it exists.
     */
    where: AchievementWhereUniqueInput;
    /**
     * In case the Achievement found by the `where` argument doesn't exist, create a new Achievement with this data.
     */
    create: XOR<AchievementCreateInput, AchievementUncheckedCreateInput>;
    /**
     * In case the Achievement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AchievementUpdateInput, AchievementUncheckedUpdateInput>;
  };

  /**
   * Achievement delete
   */
  export type AchievementDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null;
    /**
     * Filter which Achievement to delete.
     */
    where: AchievementWhereUniqueInput;
  };

  /**
   * Achievement deleteMany
   */
  export type AchievementDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Achievements to delete
     */
    where?: AchievementWhereInput;
    /**
     * Limit how many Achievements to delete.
     */
    limit?: number;
  };

  /**
   * Achievement.users
   */
  export type Achievement$usersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null;
    where?: UserAchievementWhereInput;
    orderBy?:
      | UserAchievementOrderByWithRelationInput
      | UserAchievementOrderByWithRelationInput[];
    cursor?: UserAchievementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?:
      UserAchievementScalarFieldEnum | UserAchievementScalarFieldEnum[];
  };

  /**
   * Achievement without action
   */
  export type AchievementDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null;
  };

  /**
   * Model UserAchievement
   */

  export type AggregateUserAchievement = {
    _count: UserAchievementCountAggregateOutputType | null;
    _avg: UserAchievementAvgAggregateOutputType | null;
    _sum: UserAchievementSumAggregateOutputType | null;
    _min: UserAchievementMinAggregateOutputType | null;
    _max: UserAchievementMaxAggregateOutputType | null;
  };

  export type UserAchievementAvgAggregateOutputType = {
    userId: number | null;
    achievementId: number | null;
  };

  export type UserAchievementSumAggregateOutputType = {
    userId: number | null;
    achievementId: number | null;
  };

  export type UserAchievementMinAggregateOutputType = {
    userId: number | null;
    achievementId: number | null;
    unlockedAt: Date | null;
  };

  export type UserAchievementMaxAggregateOutputType = {
    userId: number | null;
    achievementId: number | null;
    unlockedAt: Date | null;
  };

  export type UserAchievementCountAggregateOutputType = {
    userId: number;
    achievementId: number;
    unlockedAt: number;
    _all: number;
  };

  export type UserAchievementAvgAggregateInputType = {
    userId?: true;
    achievementId?: true;
  };

  export type UserAchievementSumAggregateInputType = {
    userId?: true;
    achievementId?: true;
  };

  export type UserAchievementMinAggregateInputType = {
    userId?: true;
    achievementId?: true;
    unlockedAt?: true;
  };

  export type UserAchievementMaxAggregateInputType = {
    userId?: true;
    achievementId?: true;
    unlockedAt?: true;
  };

  export type UserAchievementCountAggregateInputType = {
    userId?: true;
    achievementId?: true;
    unlockedAt?: true;
    _all?: true;
  };

  export type UserAchievementAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which UserAchievement to aggregate.
     */
    where?: UserAchievementWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserAchievements to fetch.
     */
    orderBy?:
      | UserAchievementOrderByWithRelationInput
      | UserAchievementOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserAchievementWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserAchievements from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserAchievements.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned UserAchievements
     **/
    _count?: true | UserAchievementCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: UserAchievementAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: UserAchievementSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserAchievementMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserAchievementMaxAggregateInputType;
  };

  export type GetUserAchievementAggregateType<
    T extends UserAchievementAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateUserAchievement]: P extends
      "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserAchievement[P]>
      : GetScalarType<T[P], AggregateUserAchievement[P]>;
  };

  export type UserAchievementGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserAchievementWhereInput;
    orderBy?:
      | UserAchievementOrderByWithAggregationInput
      | UserAchievementOrderByWithAggregationInput[];
    by: UserAchievementScalarFieldEnum[] | UserAchievementScalarFieldEnum;
    having?: UserAchievementScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserAchievementCountAggregateInputType | true;
    _avg?: UserAchievementAvgAggregateInputType;
    _sum?: UserAchievementSumAggregateInputType;
    _min?: UserAchievementMinAggregateInputType;
    _max?: UserAchievementMaxAggregateInputType;
  };

  export type UserAchievementGroupByOutputType = {
    userId: number;
    achievementId: number;
    unlockedAt: Date;
    _count: UserAchievementCountAggregateOutputType | null;
    _avg: UserAchievementAvgAggregateOutputType | null;
    _sum: UserAchievementSumAggregateOutputType | null;
    _min: UserAchievementMinAggregateOutputType | null;
    _max: UserAchievementMaxAggregateOutputType | null;
  };

  type GetUserAchievementGroupByPayload<T extends UserAchievementGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<UserAchievementGroupByOutputType, T["by"]> & {
          [
            P in keyof T & keyof UserAchievementGroupByOutputType
          ]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserAchievementGroupByOutputType[P]>
            : GetScalarType<T[P], UserAchievementGroupByOutputType[P]>;
        }
      >
    >;

  export type UserAchievementSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      userId?: boolean;
      achievementId?: boolean;
      unlockedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      achievement?: boolean | AchievementDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["userAchievement"]
  >;

  export type UserAchievementSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      userId?: boolean;
      achievementId?: boolean;
      unlockedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      achievement?: boolean | AchievementDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["userAchievement"]
  >;

  export type UserAchievementSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      userId?: boolean;
      achievementId?: boolean;
      unlockedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      achievement?: boolean | AchievementDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["userAchievement"]
  >;

  export type UserAchievementSelectScalar = {
    userId?: boolean;
    achievementId?: boolean;
    unlockedAt?: boolean;
  };

  export type UserAchievementOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    "userId" | "achievementId" | "unlockedAt",
    ExtArgs["result"]["userAchievement"]
  >;
  export type UserAchievementInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    achievement?: boolean | AchievementDefaultArgs<ExtArgs>;
  };
  export type UserAchievementIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    achievement?: boolean | AchievementDefaultArgs<ExtArgs>;
  };
  export type UserAchievementIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    achievement?: boolean | AchievementDefaultArgs<ExtArgs>;
  };

  export type $UserAchievementPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "UserAchievement";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
      achievement: Prisma.$AchievementPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        userId: number;
        achievementId: number;
        unlockedAt: Date;
      },
      ExtArgs["result"]["userAchievement"]
    >;
    composites: {};
  };

  type UserAchievementGetPayload<
    S extends boolean | null | undefined | UserAchievementDefaultArgs,
  > = $Result.GetResult<Prisma.$UserAchievementPayload, S>;

  type UserAchievementCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    UserAchievementFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: UserAchievementCountAggregateInputType | true;
  };

  export interface UserAchievementDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["UserAchievement"];
      meta: { name: "UserAchievement" };
    };
    /**
     * Find zero or one UserAchievement that matches the filter.
     * @param {UserAchievementFindUniqueArgs} args - Arguments to find a UserAchievement
     * @example
     * // Get one UserAchievement
     * const userAchievement = await prisma.userAchievement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserAchievementFindUniqueArgs>(
      args: SelectSubset<T, UserAchievementFindUniqueArgs<ExtArgs>>,
    ): Prisma__UserAchievementClient<
      $Result.GetResult<
        Prisma.$UserAchievementPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one UserAchievement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserAchievementFindUniqueOrThrowArgs} args - Arguments to find a UserAchievement
     * @example
     * // Get one UserAchievement
     * const userAchievement = await prisma.userAchievement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserAchievementFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserAchievementFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__UserAchievementClient<
      $Result.GetResult<
        Prisma.$UserAchievementPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first UserAchievement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementFindFirstArgs} args - Arguments to find a UserAchievement
     * @example
     * // Get one UserAchievement
     * const userAchievement = await prisma.userAchievement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserAchievementFindFirstArgs>(
      args?: SelectSubset<T, UserAchievementFindFirstArgs<ExtArgs>>,
    ): Prisma__UserAchievementClient<
      $Result.GetResult<
        Prisma.$UserAchievementPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first UserAchievement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementFindFirstOrThrowArgs} args - Arguments to find a UserAchievement
     * @example
     * // Get one UserAchievement
     * const userAchievement = await prisma.userAchievement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserAchievementFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserAchievementFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__UserAchievementClient<
      $Result.GetResult<
        Prisma.$UserAchievementPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more UserAchievements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserAchievements
     * const userAchievements = await prisma.userAchievement.findMany()
     *
     * // Get first 10 UserAchievements
     * const userAchievements = await prisma.userAchievement.findMany({ take: 10 })
     *
     * // Only select the `userId`
     * const userAchievementWithUserIdOnly = await prisma.userAchievement.findMany({ select: { userId: true } })
     *
     */
    findMany<T extends UserAchievementFindManyArgs>(
      args?: SelectSubset<T, UserAchievementFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserAchievementPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a UserAchievement.
     * @param {UserAchievementCreateArgs} args - Arguments to create a UserAchievement.
     * @example
     * // Create one UserAchievement
     * const UserAchievement = await prisma.userAchievement.create({
     *   data: {
     *     // ... data to create a UserAchievement
     *   }
     * })
     *
     */
    create<T extends UserAchievementCreateArgs>(
      args: SelectSubset<T, UserAchievementCreateArgs<ExtArgs>>,
    ): Prisma__UserAchievementClient<
      $Result.GetResult<
        Prisma.$UserAchievementPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many UserAchievements.
     * @param {UserAchievementCreateManyArgs} args - Arguments to create many UserAchievements.
     * @example
     * // Create many UserAchievements
     * const userAchievement = await prisma.userAchievement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserAchievementCreateManyArgs>(
      args?: SelectSubset<T, UserAchievementCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many UserAchievements and returns the data saved in the database.
     * @param {UserAchievementCreateManyAndReturnArgs} args - Arguments to create many UserAchievements.
     * @example
     * // Create many UserAchievements
     * const userAchievement = await prisma.userAchievement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many UserAchievements and only return the `userId`
     * const userAchievementWithUserIdOnly = await prisma.userAchievement.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserAchievementCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserAchievementCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserAchievementPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a UserAchievement.
     * @param {UserAchievementDeleteArgs} args - Arguments to delete one UserAchievement.
     * @example
     * // Delete one UserAchievement
     * const UserAchievement = await prisma.userAchievement.delete({
     *   where: {
     *     // ... filter to delete one UserAchievement
     *   }
     * })
     *
     */
    delete<T extends UserAchievementDeleteArgs>(
      args: SelectSubset<T, UserAchievementDeleteArgs<ExtArgs>>,
    ): Prisma__UserAchievementClient<
      $Result.GetResult<
        Prisma.$UserAchievementPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one UserAchievement.
     * @param {UserAchievementUpdateArgs} args - Arguments to update one UserAchievement.
     * @example
     * // Update one UserAchievement
     * const userAchievement = await prisma.userAchievement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserAchievementUpdateArgs>(
      args: SelectSubset<T, UserAchievementUpdateArgs<ExtArgs>>,
    ): Prisma__UserAchievementClient<
      $Result.GetResult<
        Prisma.$UserAchievementPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more UserAchievements.
     * @param {UserAchievementDeleteManyArgs} args - Arguments to filter UserAchievements to delete.
     * @example
     * // Delete a few UserAchievements
     * const { count } = await prisma.userAchievement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserAchievementDeleteManyArgs>(
      args?: SelectSubset<T, UserAchievementDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more UserAchievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserAchievements
     * const userAchievement = await prisma.userAchievement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserAchievementUpdateManyArgs>(
      args: SelectSubset<T, UserAchievementUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more UserAchievements and returns the data updated in the database.
     * @param {UserAchievementUpdateManyAndReturnArgs} args - Arguments to update many UserAchievements.
     * @example
     * // Update many UserAchievements
     * const userAchievement = await prisma.userAchievement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more UserAchievements and only return the `userId`
     * const userAchievementWithUserIdOnly = await prisma.userAchievement.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserAchievementUpdateManyAndReturnArgs>(
      args: SelectSubset<T, UserAchievementUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserAchievementPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one UserAchievement.
     * @param {UserAchievementUpsertArgs} args - Arguments to update or create a UserAchievement.
     * @example
     * // Update or create a UserAchievement
     * const userAchievement = await prisma.userAchievement.upsert({
     *   create: {
     *     // ... data to create a UserAchievement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserAchievement we want to update
     *   }
     * })
     */
    upsert<T extends UserAchievementUpsertArgs>(
      args: SelectSubset<T, UserAchievementUpsertArgs<ExtArgs>>,
    ): Prisma__UserAchievementClient<
      $Result.GetResult<
        Prisma.$UserAchievementPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of UserAchievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementCountArgs} args - Arguments to filter UserAchievements to count.
     * @example
     * // Count the number of UserAchievements
     * const count = await prisma.userAchievement.count({
     *   where: {
     *     // ... the filter for the UserAchievements we want to count
     *   }
     * })
     **/
    count<T extends UserAchievementCountArgs>(
      args?: Subset<T, UserAchievementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], UserAchievementCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a UserAchievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserAchievementAggregateArgs>(
      args: Subset<T, UserAchievementAggregateArgs>,
    ): Prisma.PrismaPromise<GetUserAchievementAggregateType<T>>;

    /**
     * Group by UserAchievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserAchievementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: UserAchievementGroupByArgs["orderBy"] }
        : { orderBy?: UserAchievementGroupByArgs["orderBy"] }),
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T["by"] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, UserAchievementGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetUserAchievementGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the UserAchievement model
     */
    readonly fields: UserAchievementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserAchievement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserAchievementClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    achievement<T extends AchievementDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, AchievementDefaultArgs<ExtArgs>>,
    ): Prisma__AchievementClient<
      | $Result.GetResult<
          Prisma.$AchievementPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?:
        ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the UserAchievement model
   */
  interface UserAchievementFieldRefs {
    readonly userId: FieldRef<"UserAchievement", "Int">;
    readonly achievementId: FieldRef<"UserAchievement", "Int">;
    readonly unlockedAt: FieldRef<"UserAchievement", "DateTime">;
  }

  // Custom InputTypes
  /**
   * UserAchievement findUnique
   */
  export type UserAchievementFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null;
    /**
     * Filter, which UserAchievement to fetch.
     */
    where: UserAchievementWhereUniqueInput;
  };

  /**
   * UserAchievement findUniqueOrThrow
   */
  export type UserAchievementFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null;
    /**
     * Filter, which UserAchievement to fetch.
     */
    where: UserAchievementWhereUniqueInput;
  };

  /**
   * UserAchievement findFirst
   */
  export type UserAchievementFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null;
    /**
     * Filter, which UserAchievement to fetch.
     */
    where?: UserAchievementWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserAchievements to fetch.
     */
    orderBy?:
      | UserAchievementOrderByWithRelationInput
      | UserAchievementOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for UserAchievements.
     */
    cursor?: UserAchievementWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserAchievements from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserAchievements.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UserAchievements.
     */
    distinct?:
      UserAchievementScalarFieldEnum | UserAchievementScalarFieldEnum[];
  };

  /**
   * UserAchievement findFirstOrThrow
   */
  export type UserAchievementFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null;
    /**
     * Filter, which UserAchievement to fetch.
     */
    where?: UserAchievementWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserAchievements to fetch.
     */
    orderBy?:
      | UserAchievementOrderByWithRelationInput
      | UserAchievementOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for UserAchievements.
     */
    cursor?: UserAchievementWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserAchievements from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserAchievements.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UserAchievements.
     */
    distinct?:
      UserAchievementScalarFieldEnum | UserAchievementScalarFieldEnum[];
  };

  /**
   * UserAchievement findMany
   */
  export type UserAchievementFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null;
    /**
     * Filter, which UserAchievements to fetch.
     */
    where?: UserAchievementWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserAchievements to fetch.
     */
    orderBy?:
      | UserAchievementOrderByWithRelationInput
      | UserAchievementOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing UserAchievements.
     */
    cursor?: UserAchievementWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserAchievements from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserAchievements.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UserAchievements.
     */
    distinct?:
      UserAchievementScalarFieldEnum | UserAchievementScalarFieldEnum[];
  };

  /**
   * UserAchievement create
   */
  export type UserAchievementCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null;
    /**
     * The data needed to create a UserAchievement.
     */
    data: XOR<UserAchievementCreateInput, UserAchievementUncheckedCreateInput>;
  };

  /**
   * UserAchievement createMany
   */
  export type UserAchievementCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many UserAchievements.
     */
    data: UserAchievementCreateManyInput | UserAchievementCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * UserAchievement createManyAndReturn
   */
  export type UserAchievementCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null;
    /**
     * The data used to create many UserAchievements.
     */
    data: UserAchievementCreateManyInput | UserAchievementCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * UserAchievement update
   */
  export type UserAchievementUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null;
    /**
     * The data needed to update a UserAchievement.
     */
    data: XOR<UserAchievementUpdateInput, UserAchievementUncheckedUpdateInput>;
    /**
     * Choose, which UserAchievement to update.
     */
    where: UserAchievementWhereUniqueInput;
  };

  /**
   * UserAchievement updateMany
   */
  export type UserAchievementUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update UserAchievements.
     */
    data: XOR<
      UserAchievementUpdateManyMutationInput,
      UserAchievementUncheckedUpdateManyInput
    >;
    /**
     * Filter which UserAchievements to update
     */
    where?: UserAchievementWhereInput;
    /**
     * Limit how many UserAchievements to update.
     */
    limit?: number;
  };

  /**
   * UserAchievement updateManyAndReturn
   */
  export type UserAchievementUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null;
    /**
     * The data used to update UserAchievements.
     */
    data: XOR<
      UserAchievementUpdateManyMutationInput,
      UserAchievementUncheckedUpdateManyInput
    >;
    /**
     * Filter which UserAchievements to update
     */
    where?: UserAchievementWhereInput;
    /**
     * Limit how many UserAchievements to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * UserAchievement upsert
   */
  export type UserAchievementUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null;
    /**
     * The filter to search for the UserAchievement to update in case it exists.
     */
    where: UserAchievementWhereUniqueInput;
    /**
     * In case the UserAchievement found by the `where` argument doesn't exist, create a new UserAchievement with this data.
     */
    create: XOR<
      UserAchievementCreateInput,
      UserAchievementUncheckedCreateInput
    >;
    /**
     * In case the UserAchievement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<
      UserAchievementUpdateInput,
      UserAchievementUncheckedUpdateInput
    >;
  };

  /**
   * UserAchievement delete
   */
  export type UserAchievementDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null;
    /**
     * Filter which UserAchievement to delete.
     */
    where: UserAchievementWhereUniqueInput;
  };

  /**
   * UserAchievement deleteMany
   */
  export type UserAchievementDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which UserAchievements to delete
     */
    where?: UserAchievementWhereInput;
    /**
     * Limit how many UserAchievements to delete.
     */
    limit?: number;
  };

  /**
   * UserAchievement without action
   */
  export type UserAchievementDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: "ReadUncommitted";
    ReadCommitted: "ReadCommitted";
    RepeatableRead: "RepeatableRead";
    Serializable: "Serializable";
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const UserScalarFieldEnum: {
    id: "id";
    username: "username";
    firstName: "firstName";
    lastName: "lastName";
    country: "country";
    city: "city";
    birthday: "birthday";
    email: "email";
    passwordHash: "passwordHash";
    avatar: "avatar";
    twoFactorEnabled: "twoFactorEnabled";
    twoFactorSecret: "twoFactorSecret";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
    lastLogin: "lastLogin";
    isActive: "isActive";
  };

  export type UserScalarFieldEnum =
    (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];

  export const StatisticsScalarFieldEnum: {
    userId: "userId";
    matchesPlayed: "matchesPlayed";
    wins: "wins";
    losses: "losses";
    totalPitStops: "totalPitStops";
    perfectPitStops: "perfectPitStops";
    fastestPitStopTime: "fastestPitStopTime";
    totalCrashes: "totalCrashes";
  };

  export type StatisticsScalarFieldEnum =
    (typeof StatisticsScalarFieldEnum)[keyof typeof StatisticsScalarFieldEnum];

  export const MatchScalarFieldEnum: {
    id: "id";
    winningTeam: "winningTeam";
    startedAt: "startedAt";
    finishedAt: "finishedAt";
    gameMode: "gameMode";
  };

  export type MatchScalarFieldEnum =
    (typeof MatchScalarFieldEnum)[keyof typeof MatchScalarFieldEnum];

  export const MatchPlayerScalarFieldEnum: {
    userId: "userId";
    matchId: "matchId";
    team: "team";
  };

  export type MatchPlayerScalarFieldEnum =
    (typeof MatchPlayerScalarFieldEnum)[keyof typeof MatchPlayerScalarFieldEnum];

  export const FriendshipScalarFieldEnum: {
    id: "id";
    requesterId: "requesterId";
    receiverId: "receiverId";
    status: "status";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type FriendshipScalarFieldEnum =
    (typeof FriendshipScalarFieldEnum)[keyof typeof FriendshipScalarFieldEnum];

  export const AchievementScalarFieldEnum: {
    id: "id";
    name: "name";
    description: "description";
  };

  export type AchievementScalarFieldEnum =
    (typeof AchievementScalarFieldEnum)[keyof typeof AchievementScalarFieldEnum];

  export const UserAchievementScalarFieldEnum: {
    userId: "userId";
    achievementId: "achievementId";
    unlockedAt: "unlockedAt";
  };

  export type UserAchievementScalarFieldEnum =
    (typeof UserAchievementScalarFieldEnum)[keyof typeof UserAchievementScalarFieldEnum];

  export const SortOrder: {
    asc: "asc";
    desc: "desc";
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const QueryMode: {
    default: "default";
    insensitive: "insensitive";
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const NullsOrder: {
    first: "first";
    last: "last";
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Int"
  >;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Int[]"
  >;

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "String"
  >;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "String[]"
  >;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "DateTime"
  >;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "DateTime[]"
  >;

  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Boolean"
  >;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Float"
  >;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Float[]"
  >;

  /**
   * Deep Input Types
   */

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[];
    OR?: UserWhereInput[];
    NOT?: UserWhereInput | UserWhereInput[];
    id?: IntFilter<"User"> | number;
    username?: StringFilter<"User"> | string;
    firstName?: StringFilter<"User"> | string;
    lastName?: StringFilter<"User"> | string;
    country?: StringNullableFilter<"User"> | string | null;
    city?: StringNullableFilter<"User"> | string | null;
    birthday?: DateTimeFilter<"User"> | Date | string;
    email?: StringFilter<"User"> | string;
    passwordHash?: StringFilter<"User"> | string;
    avatar?: StringNullableFilter<"User"> | string | null;
    twoFactorEnabled?: BoolFilter<"User"> | boolean;
    twoFactorSecret?: StringNullableFilter<"User"> | string | null;
    createdAt?: DateTimeFilter<"User"> | Date | string;
    updatedAt?: DateTimeFilter<"User"> | Date | string;
    lastLogin?: DateTimeFilter<"User"> | Date | string;
    isActive?: BoolFilter<"User"> | boolean;
    statistics?: XOR<
      StatisticsNullableScalarRelationFilter,
      StatisticsWhereInput
    > | null;
    matchPlayers?: MatchPlayerListRelationFilter;
    achievements?: UserAchievementListRelationFilter;
    sentFriendRequests?: FriendshipListRelationFilter;
    receivedFriendRequests?: FriendshipListRelationFilter;
  };

  export type UserOrderByWithRelationInput = {
    id?: SortOrder;
    username?: SortOrder;
    firstName?: SortOrder;
    lastName?: SortOrder;
    country?: SortOrderInput | SortOrder;
    city?: SortOrderInput | SortOrder;
    birthday?: SortOrder;
    email?: SortOrder;
    passwordHash?: SortOrder;
    avatar?: SortOrderInput | SortOrder;
    twoFactorEnabled?: SortOrder;
    twoFactorSecret?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    lastLogin?: SortOrder;
    isActive?: SortOrder;
    statistics?: StatisticsOrderByWithRelationInput;
    matchPlayers?: MatchPlayerOrderByRelationAggregateInput;
    achievements?: UserAchievementOrderByRelationAggregateInput;
    sentFriendRequests?: FriendshipOrderByRelationAggregateInput;
    receivedFriendRequests?: FriendshipOrderByRelationAggregateInput;
  };

  export type UserWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      username?: string;
      email?: string;
      AND?: UserWhereInput | UserWhereInput[];
      OR?: UserWhereInput[];
      NOT?: UserWhereInput | UserWhereInput[];
      firstName?: StringFilter<"User"> | string;
      lastName?: StringFilter<"User"> | string;
      country?: StringNullableFilter<"User"> | string | null;
      city?: StringNullableFilter<"User"> | string | null;
      birthday?: DateTimeFilter<"User"> | Date | string;
      passwordHash?: StringFilter<"User"> | string;
      avatar?: StringNullableFilter<"User"> | string | null;
      twoFactorEnabled?: BoolFilter<"User"> | boolean;
      twoFactorSecret?: StringNullableFilter<"User"> | string | null;
      createdAt?: DateTimeFilter<"User"> | Date | string;
      updatedAt?: DateTimeFilter<"User"> | Date | string;
      lastLogin?: DateTimeFilter<"User"> | Date | string;
      isActive?: BoolFilter<"User"> | boolean;
      statistics?: XOR<
        StatisticsNullableScalarRelationFilter,
        StatisticsWhereInput
      > | null;
      matchPlayers?: MatchPlayerListRelationFilter;
      achievements?: UserAchievementListRelationFilter;
      sentFriendRequests?: FriendshipListRelationFilter;
      receivedFriendRequests?: FriendshipListRelationFilter;
    },
    "id" | "username" | "email"
  >;

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder;
    username?: SortOrder;
    firstName?: SortOrder;
    lastName?: SortOrder;
    country?: SortOrderInput | SortOrder;
    city?: SortOrderInput | SortOrder;
    birthday?: SortOrder;
    email?: SortOrder;
    passwordHash?: SortOrder;
    avatar?: SortOrderInput | SortOrder;
    twoFactorEnabled?: SortOrder;
    twoFactorSecret?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    lastLogin?: SortOrder;
    isActive?: SortOrder;
    _count?: UserCountOrderByAggregateInput;
    _avg?: UserAvgOrderByAggregateInput;
    _max?: UserMaxOrderByAggregateInput;
    _min?: UserMinOrderByAggregateInput;
    _sum?: UserSumOrderByAggregateInput;
  };

  export type UserScalarWhereWithAggregatesInput = {
    AND?:
      UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[];
    OR?: UserScalarWhereWithAggregatesInput[];
    NOT?:
      UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<"User"> | number;
    username?: StringWithAggregatesFilter<"User"> | string;
    firstName?: StringWithAggregatesFilter<"User"> | string;
    lastName?: StringWithAggregatesFilter<"User"> | string;
    country?: StringNullableWithAggregatesFilter<"User"> | string | null;
    city?: StringNullableWithAggregatesFilter<"User"> | string | null;
    birthday?: DateTimeWithAggregatesFilter<"User"> | Date | string;
    email?: StringWithAggregatesFilter<"User"> | string;
    passwordHash?: StringWithAggregatesFilter<"User"> | string;
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null;
    twoFactorEnabled?: BoolWithAggregatesFilter<"User"> | boolean;
    twoFactorSecret?:
      StringNullableWithAggregatesFilter<"User"> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string;
    lastLogin?: DateTimeWithAggregatesFilter<"User"> | Date | string;
    isActive?: BoolWithAggregatesFilter<"User"> | boolean;
  };

  export type StatisticsWhereInput = {
    AND?: StatisticsWhereInput | StatisticsWhereInput[];
    OR?: StatisticsWhereInput[];
    NOT?: StatisticsWhereInput | StatisticsWhereInput[];
    userId?: IntFilter<"Statistics"> | number;
    matchesPlayed?: IntFilter<"Statistics"> | number;
    wins?: IntFilter<"Statistics"> | number;
    losses?: IntFilter<"Statistics"> | number;
    totalPitStops?: IntFilter<"Statistics"> | number;
    perfectPitStops?: IntFilter<"Statistics"> | number;
    fastestPitStopTime?: IntFilter<"Statistics"> | number;
    totalCrashes?: IntFilter<"Statistics"> | number;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type StatisticsOrderByWithRelationInput = {
    userId?: SortOrder;
    matchesPlayed?: SortOrder;
    wins?: SortOrder;
    losses?: SortOrder;
    totalPitStops?: SortOrder;
    perfectPitStops?: SortOrder;
    fastestPitStopTime?: SortOrder;
    totalCrashes?: SortOrder;
    user?: UserOrderByWithRelationInput;
  };

  export type StatisticsWhereUniqueInput = Prisma.AtLeast<
    {
      userId?: number;
      AND?: StatisticsWhereInput | StatisticsWhereInput[];
      OR?: StatisticsWhereInput[];
      NOT?: StatisticsWhereInput | StatisticsWhereInput[];
      matchesPlayed?: IntFilter<"Statistics"> | number;
      wins?: IntFilter<"Statistics"> | number;
      losses?: IntFilter<"Statistics"> | number;
      totalPitStops?: IntFilter<"Statistics"> | number;
      perfectPitStops?: IntFilter<"Statistics"> | number;
      fastestPitStopTime?: IntFilter<"Statistics"> | number;
      totalCrashes?: IntFilter<"Statistics"> | number;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    "userId"
  >;

  export type StatisticsOrderByWithAggregationInput = {
    userId?: SortOrder;
    matchesPlayed?: SortOrder;
    wins?: SortOrder;
    losses?: SortOrder;
    totalPitStops?: SortOrder;
    perfectPitStops?: SortOrder;
    fastestPitStopTime?: SortOrder;
    totalCrashes?: SortOrder;
    _count?: StatisticsCountOrderByAggregateInput;
    _avg?: StatisticsAvgOrderByAggregateInput;
    _max?: StatisticsMaxOrderByAggregateInput;
    _min?: StatisticsMinOrderByAggregateInput;
    _sum?: StatisticsSumOrderByAggregateInput;
  };

  export type StatisticsScalarWhereWithAggregatesInput = {
    AND?:
      | StatisticsScalarWhereWithAggregatesInput
      | StatisticsScalarWhereWithAggregatesInput[];
    OR?: StatisticsScalarWhereWithAggregatesInput[];
    NOT?:
      | StatisticsScalarWhereWithAggregatesInput
      | StatisticsScalarWhereWithAggregatesInput[];
    userId?: IntWithAggregatesFilter<"Statistics"> | number;
    matchesPlayed?: IntWithAggregatesFilter<"Statistics"> | number;
    wins?: IntWithAggregatesFilter<"Statistics"> | number;
    losses?: IntWithAggregatesFilter<"Statistics"> | number;
    totalPitStops?: IntWithAggregatesFilter<"Statistics"> | number;
    perfectPitStops?: IntWithAggregatesFilter<"Statistics"> | number;
    fastestPitStopTime?: IntWithAggregatesFilter<"Statistics"> | number;
    totalCrashes?: IntWithAggregatesFilter<"Statistics"> | number;
  };

  export type MatchWhereInput = {
    AND?: MatchWhereInput | MatchWhereInput[];
    OR?: MatchWhereInput[];
    NOT?: MatchWhereInput | MatchWhereInput[];
    id?: IntFilter<"Match"> | number;
    winningTeam?: IntFilter<"Match"> | number;
    startedAt?: DateTimeFilter<"Match"> | Date | string;
    finishedAt?: DateTimeNullableFilter<"Match"> | Date | string | null;
    gameMode?: StringFilter<"Match"> | string;
    players?: MatchPlayerListRelationFilter;
  };

  export type MatchOrderByWithRelationInput = {
    id?: SortOrder;
    winningTeam?: SortOrder;
    startedAt?: SortOrder;
    finishedAt?: SortOrderInput | SortOrder;
    gameMode?: SortOrder;
    players?: MatchPlayerOrderByRelationAggregateInput;
  };

  export type MatchWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: MatchWhereInput | MatchWhereInput[];
      OR?: MatchWhereInput[];
      NOT?: MatchWhereInput | MatchWhereInput[];
      winningTeam?: IntFilter<"Match"> | number;
      startedAt?: DateTimeFilter<"Match"> | Date | string;
      finishedAt?: DateTimeNullableFilter<"Match"> | Date | string | null;
      gameMode?: StringFilter<"Match"> | string;
      players?: MatchPlayerListRelationFilter;
    },
    "id"
  >;

  export type MatchOrderByWithAggregationInput = {
    id?: SortOrder;
    winningTeam?: SortOrder;
    startedAt?: SortOrder;
    finishedAt?: SortOrderInput | SortOrder;
    gameMode?: SortOrder;
    _count?: MatchCountOrderByAggregateInput;
    _avg?: MatchAvgOrderByAggregateInput;
    _max?: MatchMaxOrderByAggregateInput;
    _min?: MatchMinOrderByAggregateInput;
    _sum?: MatchSumOrderByAggregateInput;
  };

  export type MatchScalarWhereWithAggregatesInput = {
    AND?:
      | MatchScalarWhereWithAggregatesInput
      | MatchScalarWhereWithAggregatesInput[];
    OR?: MatchScalarWhereWithAggregatesInput[];
    NOT?:
      | MatchScalarWhereWithAggregatesInput
      | MatchScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<"Match"> | number;
    winningTeam?: IntWithAggregatesFilter<"Match"> | number;
    startedAt?: DateTimeWithAggregatesFilter<"Match"> | Date | string;
    finishedAt?:
      DateTimeNullableWithAggregatesFilter<"Match"> | Date | string | null;
    gameMode?: StringWithAggregatesFilter<"Match"> | string;
  };

  export type MatchPlayerWhereInput = {
    AND?: MatchPlayerWhereInput | MatchPlayerWhereInput[];
    OR?: MatchPlayerWhereInput[];
    NOT?: MatchPlayerWhereInput | MatchPlayerWhereInput[];
    userId?: IntFilter<"MatchPlayer"> | number;
    matchId?: IntFilter<"MatchPlayer"> | number;
    team?: IntFilter<"MatchPlayer"> | number;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    match?: XOR<MatchScalarRelationFilter, MatchWhereInput>;
  };

  export type MatchPlayerOrderByWithRelationInput = {
    userId?: SortOrder;
    matchId?: SortOrder;
    team?: SortOrder;
    user?: UserOrderByWithRelationInput;
    match?: MatchOrderByWithRelationInput;
  };

  export type MatchPlayerWhereUniqueInput = Prisma.AtLeast<
    {
      matchId_userId?: MatchPlayerMatchIdUserIdCompoundUniqueInput;
      AND?: MatchPlayerWhereInput | MatchPlayerWhereInput[];
      OR?: MatchPlayerWhereInput[];
      NOT?: MatchPlayerWhereInput | MatchPlayerWhereInput[];
      userId?: IntFilter<"MatchPlayer"> | number;
      matchId?: IntFilter<"MatchPlayer"> | number;
      team?: IntFilter<"MatchPlayer"> | number;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
      match?: XOR<MatchScalarRelationFilter, MatchWhereInput>;
    },
    "matchId_userId"
  >;

  export type MatchPlayerOrderByWithAggregationInput = {
    userId?: SortOrder;
    matchId?: SortOrder;
    team?: SortOrder;
    _count?: MatchPlayerCountOrderByAggregateInput;
    _avg?: MatchPlayerAvgOrderByAggregateInput;
    _max?: MatchPlayerMaxOrderByAggregateInput;
    _min?: MatchPlayerMinOrderByAggregateInput;
    _sum?: MatchPlayerSumOrderByAggregateInput;
  };

  export type MatchPlayerScalarWhereWithAggregatesInput = {
    AND?:
      | MatchPlayerScalarWhereWithAggregatesInput
      | MatchPlayerScalarWhereWithAggregatesInput[];
    OR?: MatchPlayerScalarWhereWithAggregatesInput[];
    NOT?:
      | MatchPlayerScalarWhereWithAggregatesInput
      | MatchPlayerScalarWhereWithAggregatesInput[];
    userId?: IntWithAggregatesFilter<"MatchPlayer"> | number;
    matchId?: IntWithAggregatesFilter<"MatchPlayer"> | number;
    team?: IntWithAggregatesFilter<"MatchPlayer"> | number;
  };

  export type FriendshipWhereInput = {
    AND?: FriendshipWhereInput | FriendshipWhereInput[];
    OR?: FriendshipWhereInput[];
    NOT?: FriendshipWhereInput | FriendshipWhereInput[];
    id?: IntFilter<"Friendship"> | number;
    requesterId?: IntFilter<"Friendship"> | number;
    receiverId?: IntFilter<"Friendship"> | number;
    status?: StringFilter<"Friendship"> | string;
    createdAt?: DateTimeFilter<"Friendship"> | Date | string;
    updatedAt?: DateTimeFilter<"Friendship"> | Date | string;
    requester?: XOR<UserScalarRelationFilter, UserWhereInput>;
    receiver?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type FriendshipOrderByWithRelationInput = {
    id?: SortOrder;
    requesterId?: SortOrder;
    receiverId?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    requester?: UserOrderByWithRelationInput;
    receiver?: UserOrderByWithRelationInput;
  };

  export type FriendshipWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: FriendshipWhereInput | FriendshipWhereInput[];
      OR?: FriendshipWhereInput[];
      NOT?: FriendshipWhereInput | FriendshipWhereInput[];
      requesterId?: IntFilter<"Friendship"> | number;
      receiverId?: IntFilter<"Friendship"> | number;
      status?: StringFilter<"Friendship"> | string;
      createdAt?: DateTimeFilter<"Friendship"> | Date | string;
      updatedAt?: DateTimeFilter<"Friendship"> | Date | string;
      requester?: XOR<UserScalarRelationFilter, UserWhereInput>;
      receiver?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    "id"
  >;

  export type FriendshipOrderByWithAggregationInput = {
    id?: SortOrder;
    requesterId?: SortOrder;
    receiverId?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: FriendshipCountOrderByAggregateInput;
    _avg?: FriendshipAvgOrderByAggregateInput;
    _max?: FriendshipMaxOrderByAggregateInput;
    _min?: FriendshipMinOrderByAggregateInput;
    _sum?: FriendshipSumOrderByAggregateInput;
  };

  export type FriendshipScalarWhereWithAggregatesInput = {
    AND?:
      | FriendshipScalarWhereWithAggregatesInput
      | FriendshipScalarWhereWithAggregatesInput[];
    OR?: FriendshipScalarWhereWithAggregatesInput[];
    NOT?:
      | FriendshipScalarWhereWithAggregatesInput
      | FriendshipScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<"Friendship"> | number;
    requesterId?: IntWithAggregatesFilter<"Friendship"> | number;
    receiverId?: IntWithAggregatesFilter<"Friendship"> | number;
    status?: StringWithAggregatesFilter<"Friendship"> | string;
    createdAt?: DateTimeWithAggregatesFilter<"Friendship"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Friendship"> | Date | string;
  };

  export type AchievementWhereInput = {
    AND?: AchievementWhereInput | AchievementWhereInput[];
    OR?: AchievementWhereInput[];
    NOT?: AchievementWhereInput | AchievementWhereInput[];
    id?: IntFilter<"Achievement"> | number;
    name?: StringFilter<"Achievement"> | string;
    description?: StringFilter<"Achievement"> | string;
    users?: UserAchievementListRelationFilter;
  };

  export type AchievementOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    users?: UserAchievementOrderByRelationAggregateInput;
  };

  export type AchievementWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: AchievementWhereInput | AchievementWhereInput[];
      OR?: AchievementWhereInput[];
      NOT?: AchievementWhereInput | AchievementWhereInput[];
      name?: StringFilter<"Achievement"> | string;
      description?: StringFilter<"Achievement"> | string;
      users?: UserAchievementListRelationFilter;
    },
    "id"
  >;

  export type AchievementOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    _count?: AchievementCountOrderByAggregateInput;
    _avg?: AchievementAvgOrderByAggregateInput;
    _max?: AchievementMaxOrderByAggregateInput;
    _min?: AchievementMinOrderByAggregateInput;
    _sum?: AchievementSumOrderByAggregateInput;
  };

  export type AchievementScalarWhereWithAggregatesInput = {
    AND?:
      | AchievementScalarWhereWithAggregatesInput
      | AchievementScalarWhereWithAggregatesInput[];
    OR?: AchievementScalarWhereWithAggregatesInput[];
    NOT?:
      | AchievementScalarWhereWithAggregatesInput
      | AchievementScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<"Achievement"> | number;
    name?: StringWithAggregatesFilter<"Achievement"> | string;
    description?: StringWithAggregatesFilter<"Achievement"> | string;
  };

  export type UserAchievementWhereInput = {
    AND?: UserAchievementWhereInput | UserAchievementWhereInput[];
    OR?: UserAchievementWhereInput[];
    NOT?: UserAchievementWhereInput | UserAchievementWhereInput[];
    userId?: IntFilter<"UserAchievement"> | number;
    achievementId?: IntFilter<"UserAchievement"> | number;
    unlockedAt?: DateTimeFilter<"UserAchievement"> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    achievement?: XOR<AchievementScalarRelationFilter, AchievementWhereInput>;
  };

  export type UserAchievementOrderByWithRelationInput = {
    userId?: SortOrder;
    achievementId?: SortOrder;
    unlockedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
    achievement?: AchievementOrderByWithRelationInput;
  };

  export type UserAchievementWhereUniqueInput = Prisma.AtLeast<
    {
      achievementId_userId?: UserAchievementAchievementIdUserIdCompoundUniqueInput;
      AND?: UserAchievementWhereInput | UserAchievementWhereInput[];
      OR?: UserAchievementWhereInput[];
      NOT?: UserAchievementWhereInput | UserAchievementWhereInput[];
      userId?: IntFilter<"UserAchievement"> | number;
      achievementId?: IntFilter<"UserAchievement"> | number;
      unlockedAt?: DateTimeFilter<"UserAchievement"> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
      achievement?: XOR<AchievementScalarRelationFilter, AchievementWhereInput>;
    },
    "achievementId_userId"
  >;

  export type UserAchievementOrderByWithAggregationInput = {
    userId?: SortOrder;
    achievementId?: SortOrder;
    unlockedAt?: SortOrder;
    _count?: UserAchievementCountOrderByAggregateInput;
    _avg?: UserAchievementAvgOrderByAggregateInput;
    _max?: UserAchievementMaxOrderByAggregateInput;
    _min?: UserAchievementMinOrderByAggregateInput;
    _sum?: UserAchievementSumOrderByAggregateInput;
  };

  export type UserAchievementScalarWhereWithAggregatesInput = {
    AND?:
      | UserAchievementScalarWhereWithAggregatesInput
      | UserAchievementScalarWhereWithAggregatesInput[];
    OR?: UserAchievementScalarWhereWithAggregatesInput[];
    NOT?:
      | UserAchievementScalarWhereWithAggregatesInput
      | UserAchievementScalarWhereWithAggregatesInput[];
    userId?: IntWithAggregatesFilter<"UserAchievement"> | number;
    achievementId?: IntWithAggregatesFilter<"UserAchievement"> | number;
    unlockedAt?:
      DateTimeWithAggregatesFilter<"UserAchievement"> | Date | string;
  };

  export type UserCreateInput = {
    username: string;
    firstName: string;
    lastName: string;
    country?: string | null;
    city?: string | null;
    birthday: Date | string;
    email: string;
    passwordHash: string;
    avatar?: string | null;
    twoFactorEnabled?: boolean;
    twoFactorSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lastLogin?: Date | string;
    isActive?: boolean;
    statistics?: StatisticsCreateNestedOneWithoutUserInput;
    matchPlayers?: MatchPlayerCreateNestedManyWithoutUserInput;
    achievements?: UserAchievementCreateNestedManyWithoutUserInput;
    sentFriendRequests?: FriendshipCreateNestedManyWithoutRequesterInput;
    receivedFriendRequests?: FriendshipCreateNestedManyWithoutReceiverInput;
  };

  export type UserUncheckedCreateInput = {
    id?: number;
    username: string;
    firstName: string;
    lastName: string;
    country?: string | null;
    city?: string | null;
    birthday: Date | string;
    email: string;
    passwordHash: string;
    avatar?: string | null;
    twoFactorEnabled?: boolean;
    twoFactorSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lastLogin?: Date | string;
    isActive?: boolean;
    statistics?: StatisticsUncheckedCreateNestedOneWithoutUserInput;
    matchPlayers?: MatchPlayerUncheckedCreateNestedManyWithoutUserInput;
    achievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput;
    sentFriendRequests?: FriendshipUncheckedCreateNestedManyWithoutRequesterInput;
    receivedFriendRequests?: FriendshipUncheckedCreateNestedManyWithoutReceiverInput;
  };

  export type UserUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    country?: NullableStringFieldUpdateOperationsInput | string | null;
    city?: NullableStringFieldUpdateOperationsInput | string | null;
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    avatar?: NullableStringFieldUpdateOperationsInput | string | null;
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean;
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    lastLogin?: DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    statistics?: StatisticsUpdateOneWithoutUserNestedInput;
    matchPlayers?: MatchPlayerUpdateManyWithoutUserNestedInput;
    achievements?: UserAchievementUpdateManyWithoutUserNestedInput;
    sentFriendRequests?: FriendshipUpdateManyWithoutRequesterNestedInput;
    receivedFriendRequests?: FriendshipUpdateManyWithoutReceiverNestedInput;
  };

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    country?: NullableStringFieldUpdateOperationsInput | string | null;
    city?: NullableStringFieldUpdateOperationsInput | string | null;
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    avatar?: NullableStringFieldUpdateOperationsInput | string | null;
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean;
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    lastLogin?: DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    statistics?: StatisticsUncheckedUpdateOneWithoutUserNestedInput;
    matchPlayers?: MatchPlayerUncheckedUpdateManyWithoutUserNestedInput;
    achievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput;
    sentFriendRequests?: FriendshipUncheckedUpdateManyWithoutRequesterNestedInput;
    receivedFriendRequests?: FriendshipUncheckedUpdateManyWithoutReceiverNestedInput;
  };

  export type UserCreateManyInput = {
    id?: number;
    username: string;
    firstName: string;
    lastName: string;
    country?: string | null;
    city?: string | null;
    birthday: Date | string;
    email: string;
    passwordHash: string;
    avatar?: string | null;
    twoFactorEnabled?: boolean;
    twoFactorSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lastLogin?: Date | string;
    isActive?: boolean;
  };

  export type UserUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    country?: NullableStringFieldUpdateOperationsInput | string | null;
    city?: NullableStringFieldUpdateOperationsInput | string | null;
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    avatar?: NullableStringFieldUpdateOperationsInput | string | null;
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean;
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    lastLogin?: DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    country?: NullableStringFieldUpdateOperationsInput | string | null;
    city?: NullableStringFieldUpdateOperationsInput | string | null;
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    avatar?: NullableStringFieldUpdateOperationsInput | string | null;
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean;
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    lastLogin?: DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type StatisticsCreateInput = {
    matchesPlayed?: number;
    wins?: number;
    losses?: number;
    totalPitStops?: number;
    perfectPitStops?: number;
    fastestPitStopTime?: number;
    totalCrashes?: number;
    user: UserCreateNestedOneWithoutStatisticsInput;
  };

  export type StatisticsUncheckedCreateInput = {
    userId: number;
    matchesPlayed?: number;
    wins?: number;
    losses?: number;
    totalPitStops?: number;
    perfectPitStops?: number;
    fastestPitStopTime?: number;
    totalCrashes?: number;
  };

  export type StatisticsUpdateInput = {
    matchesPlayed?: IntFieldUpdateOperationsInput | number;
    wins?: IntFieldUpdateOperationsInput | number;
    losses?: IntFieldUpdateOperationsInput | number;
    totalPitStops?: IntFieldUpdateOperationsInput | number;
    perfectPitStops?: IntFieldUpdateOperationsInput | number;
    fastestPitStopTime?: IntFieldUpdateOperationsInput | number;
    totalCrashes?: IntFieldUpdateOperationsInput | number;
    user?: UserUpdateOneRequiredWithoutStatisticsNestedInput;
  };

  export type StatisticsUncheckedUpdateInput = {
    userId?: IntFieldUpdateOperationsInput | number;
    matchesPlayed?: IntFieldUpdateOperationsInput | number;
    wins?: IntFieldUpdateOperationsInput | number;
    losses?: IntFieldUpdateOperationsInput | number;
    totalPitStops?: IntFieldUpdateOperationsInput | number;
    perfectPitStops?: IntFieldUpdateOperationsInput | number;
    fastestPitStopTime?: IntFieldUpdateOperationsInput | number;
    totalCrashes?: IntFieldUpdateOperationsInput | number;
  };

  export type StatisticsCreateManyInput = {
    userId: number;
    matchesPlayed?: number;
    wins?: number;
    losses?: number;
    totalPitStops?: number;
    perfectPitStops?: number;
    fastestPitStopTime?: number;
    totalCrashes?: number;
  };

  export type StatisticsUpdateManyMutationInput = {
    matchesPlayed?: IntFieldUpdateOperationsInput | number;
    wins?: IntFieldUpdateOperationsInput | number;
    losses?: IntFieldUpdateOperationsInput | number;
    totalPitStops?: IntFieldUpdateOperationsInput | number;
    perfectPitStops?: IntFieldUpdateOperationsInput | number;
    fastestPitStopTime?: IntFieldUpdateOperationsInput | number;
    totalCrashes?: IntFieldUpdateOperationsInput | number;
  };

  export type StatisticsUncheckedUpdateManyInput = {
    userId?: IntFieldUpdateOperationsInput | number;
    matchesPlayed?: IntFieldUpdateOperationsInput | number;
    wins?: IntFieldUpdateOperationsInput | number;
    losses?: IntFieldUpdateOperationsInput | number;
    totalPitStops?: IntFieldUpdateOperationsInput | number;
    perfectPitStops?: IntFieldUpdateOperationsInput | number;
    fastestPitStopTime?: IntFieldUpdateOperationsInput | number;
    totalCrashes?: IntFieldUpdateOperationsInput | number;
  };

  export type MatchCreateInput = {
    winningTeam: number;
    startedAt?: Date | string;
    finishedAt?: Date | string | null;
    gameMode: string;
    players?: MatchPlayerCreateNestedManyWithoutMatchInput;
  };

  export type MatchUncheckedCreateInput = {
    id?: number;
    winningTeam: number;
    startedAt?: Date | string;
    finishedAt?: Date | string | null;
    gameMode: string;
    players?: MatchPlayerUncheckedCreateNestedManyWithoutMatchInput;
  };

  export type MatchUpdateInput = {
    winningTeam?: IntFieldUpdateOperationsInput | number;
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    finishedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    gameMode?: StringFieldUpdateOperationsInput | string;
    players?: MatchPlayerUpdateManyWithoutMatchNestedInput;
  };

  export type MatchUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    winningTeam?: IntFieldUpdateOperationsInput | number;
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    finishedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    gameMode?: StringFieldUpdateOperationsInput | string;
    players?: MatchPlayerUncheckedUpdateManyWithoutMatchNestedInput;
  };

  export type MatchCreateManyInput = {
    id?: number;
    winningTeam: number;
    startedAt?: Date | string;
    finishedAt?: Date | string | null;
    gameMode: string;
  };

  export type MatchUpdateManyMutationInput = {
    winningTeam?: IntFieldUpdateOperationsInput | number;
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    finishedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    gameMode?: StringFieldUpdateOperationsInput | string;
  };

  export type MatchUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    winningTeam?: IntFieldUpdateOperationsInput | number;
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    finishedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    gameMode?: StringFieldUpdateOperationsInput | string;
  };

  export type MatchPlayerCreateInput = {
    team: number;
    user: UserCreateNestedOneWithoutMatchPlayersInput;
    match: MatchCreateNestedOneWithoutPlayersInput;
  };

  export type MatchPlayerUncheckedCreateInput = {
    userId: number;
    matchId: number;
    team: number;
  };

  export type MatchPlayerUpdateInput = {
    team?: IntFieldUpdateOperationsInput | number;
    user?: UserUpdateOneRequiredWithoutMatchPlayersNestedInput;
    match?: MatchUpdateOneRequiredWithoutPlayersNestedInput;
  };

  export type MatchPlayerUncheckedUpdateInput = {
    userId?: IntFieldUpdateOperationsInput | number;
    matchId?: IntFieldUpdateOperationsInput | number;
    team?: IntFieldUpdateOperationsInput | number;
  };

  export type MatchPlayerCreateManyInput = {
    userId: number;
    matchId: number;
    team: number;
  };

  export type MatchPlayerUpdateManyMutationInput = {
    team?: IntFieldUpdateOperationsInput | number;
  };

  export type MatchPlayerUncheckedUpdateManyInput = {
    userId?: IntFieldUpdateOperationsInput | number;
    matchId?: IntFieldUpdateOperationsInput | number;
    team?: IntFieldUpdateOperationsInput | number;
  };

  export type FriendshipCreateInput = {
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    requester: UserCreateNestedOneWithoutSentFriendRequestsInput;
    receiver: UserCreateNestedOneWithoutReceivedFriendRequestsInput;
  };

  export type FriendshipUncheckedCreateInput = {
    id?: number;
    requesterId: number;
    receiverId: number;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type FriendshipUpdateInput = {
    status?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    requester?: UserUpdateOneRequiredWithoutSentFriendRequestsNestedInput;
    receiver?: UserUpdateOneRequiredWithoutReceivedFriendRequestsNestedInput;
  };

  export type FriendshipUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    requesterId?: IntFieldUpdateOperationsInput | number;
    receiverId?: IntFieldUpdateOperationsInput | number;
    status?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type FriendshipCreateManyInput = {
    id?: number;
    requesterId: number;
    receiverId: number;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type FriendshipUpdateManyMutationInput = {
    status?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type FriendshipUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    requesterId?: IntFieldUpdateOperationsInput | number;
    receiverId?: IntFieldUpdateOperationsInput | number;
    status?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AchievementCreateInput = {
    name: string;
    description: string;
    users?: UserAchievementCreateNestedManyWithoutAchievementInput;
  };

  export type AchievementUncheckedCreateInput = {
    id?: number;
    name: string;
    description: string;
    users?: UserAchievementUncheckedCreateNestedManyWithoutAchievementInput;
  };

  export type AchievementUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    users?: UserAchievementUpdateManyWithoutAchievementNestedInput;
  };

  export type AchievementUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    users?: UserAchievementUncheckedUpdateManyWithoutAchievementNestedInput;
  };

  export type AchievementCreateManyInput = {
    id?: number;
    name: string;
    description: string;
  };

  export type AchievementUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
  };

  export type AchievementUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
  };

  export type UserAchievementCreateInput = {
    unlockedAt?: Date | string;
    user: UserCreateNestedOneWithoutAchievementsInput;
    achievement: AchievementCreateNestedOneWithoutUsersInput;
  };

  export type UserAchievementUncheckedCreateInput = {
    userId: number;
    achievementId: number;
    unlockedAt?: Date | string;
  };

  export type UserAchievementUpdateInput = {
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutAchievementsNestedInput;
    achievement?: AchievementUpdateOneRequiredWithoutUsersNestedInput;
  };

  export type UserAchievementUncheckedUpdateInput = {
    userId?: IntFieldUpdateOperationsInput | number;
    achievementId?: IntFieldUpdateOperationsInput | number;
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserAchievementCreateManyInput = {
    userId: number;
    achievementId: number;
    unlockedAt?: Date | string;
  };

  export type UserAchievementUpdateManyMutationInput = {
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserAchievementUncheckedUpdateManyInput = {
    userId?: IntFieldUpdateOperationsInput | number;
    achievementId?: IntFieldUpdateOperationsInput | number;
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type StatisticsNullableScalarRelationFilter = {
    is?: StatisticsWhereInput | null;
    isNot?: StatisticsWhereInput | null;
  };

  export type MatchPlayerListRelationFilter = {
    every?: MatchPlayerWhereInput;
    some?: MatchPlayerWhereInput;
    none?: MatchPlayerWhereInput;
  };

  export type UserAchievementListRelationFilter = {
    every?: UserAchievementWhereInput;
    some?: UserAchievementWhereInput;
    none?: UserAchievementWhereInput;
  };

  export type FriendshipListRelationFilter = {
    every?: FriendshipWhereInput;
    some?: FriendshipWhereInput;
    none?: FriendshipWhereInput;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type MatchPlayerOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type UserAchievementOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type FriendshipOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder;
    username?: SortOrder;
    firstName?: SortOrder;
    lastName?: SortOrder;
    country?: SortOrder;
    city?: SortOrder;
    birthday?: SortOrder;
    email?: SortOrder;
    passwordHash?: SortOrder;
    avatar?: SortOrder;
    twoFactorEnabled?: SortOrder;
    twoFactorSecret?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    lastLogin?: SortOrder;
    isActive?: SortOrder;
  };

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder;
    username?: SortOrder;
    firstName?: SortOrder;
    lastName?: SortOrder;
    country?: SortOrder;
    city?: SortOrder;
    birthday?: SortOrder;
    email?: SortOrder;
    passwordHash?: SortOrder;
    avatar?: SortOrder;
    twoFactorEnabled?: SortOrder;
    twoFactorSecret?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    lastLogin?: SortOrder;
    isActive?: SortOrder;
  };

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder;
    username?: SortOrder;
    firstName?: SortOrder;
    lastName?: SortOrder;
    country?: SortOrder;
    city?: SortOrder;
    birthday?: SortOrder;
    email?: SortOrder;
    passwordHash?: SortOrder;
    avatar?: SortOrder;
    twoFactorEnabled?: SortOrder;
    twoFactorSecret?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    lastLogin?: SortOrder;
    isActive?: SortOrder;
  };

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?:
      NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type UserScalarRelationFilter = {
    is?: UserWhereInput;
    isNot?: UserWhereInput;
  };

  export type StatisticsCountOrderByAggregateInput = {
    userId?: SortOrder;
    matchesPlayed?: SortOrder;
    wins?: SortOrder;
    losses?: SortOrder;
    totalPitStops?: SortOrder;
    perfectPitStops?: SortOrder;
    fastestPitStopTime?: SortOrder;
    totalCrashes?: SortOrder;
  };

  export type StatisticsAvgOrderByAggregateInput = {
    userId?: SortOrder;
    matchesPlayed?: SortOrder;
    wins?: SortOrder;
    losses?: SortOrder;
    totalPitStops?: SortOrder;
    perfectPitStops?: SortOrder;
    fastestPitStopTime?: SortOrder;
    totalCrashes?: SortOrder;
  };

  export type StatisticsMaxOrderByAggregateInput = {
    userId?: SortOrder;
    matchesPlayed?: SortOrder;
    wins?: SortOrder;
    losses?: SortOrder;
    totalPitStops?: SortOrder;
    perfectPitStops?: SortOrder;
    fastestPitStopTime?: SortOrder;
    totalCrashes?: SortOrder;
  };

  export type StatisticsMinOrderByAggregateInput = {
    userId?: SortOrder;
    matchesPlayed?: SortOrder;
    wins?: SortOrder;
    losses?: SortOrder;
    totalPitStops?: SortOrder;
    perfectPitStops?: SortOrder;
    fastestPitStopTime?: SortOrder;
    totalCrashes?: SortOrder;
  };

  export type StatisticsSumOrderByAggregateInput = {
    userId?: SortOrder;
    matchesPlayed?: SortOrder;
    wins?: SortOrder;
    losses?: SortOrder;
    totalPitStops?: SortOrder;
    perfectPitStops?: SortOrder;
    fastestPitStopTime?: SortOrder;
    totalCrashes?: SortOrder;
  };

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type MatchCountOrderByAggregateInput = {
    id?: SortOrder;
    winningTeam?: SortOrder;
    startedAt?: SortOrder;
    finishedAt?: SortOrder;
    gameMode?: SortOrder;
  };

  export type MatchAvgOrderByAggregateInput = {
    id?: SortOrder;
    winningTeam?: SortOrder;
  };

  export type MatchMaxOrderByAggregateInput = {
    id?: SortOrder;
    winningTeam?: SortOrder;
    startedAt?: SortOrder;
    finishedAt?: SortOrder;
    gameMode?: SortOrder;
  };

  export type MatchMinOrderByAggregateInput = {
    id?: SortOrder;
    winningTeam?: SortOrder;
    startedAt?: SortOrder;
    finishedAt?: SortOrder;
    gameMode?: SortOrder;
  };

  export type MatchSumOrderByAggregateInput = {
    id?: SortOrder;
    winningTeam?: SortOrder;
  };

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?:
      | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
      | Date
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  };

  export type MatchScalarRelationFilter = {
    is?: MatchWhereInput;
    isNot?: MatchWhereInput;
  };

  export type MatchPlayerMatchIdUserIdCompoundUniqueInput = {
    matchId: number;
    userId: number;
  };

  export type MatchPlayerCountOrderByAggregateInput = {
    userId?: SortOrder;
    matchId?: SortOrder;
    team?: SortOrder;
  };

  export type MatchPlayerAvgOrderByAggregateInput = {
    userId?: SortOrder;
    matchId?: SortOrder;
    team?: SortOrder;
  };

  export type MatchPlayerMaxOrderByAggregateInput = {
    userId?: SortOrder;
    matchId?: SortOrder;
    team?: SortOrder;
  };

  export type MatchPlayerMinOrderByAggregateInput = {
    userId?: SortOrder;
    matchId?: SortOrder;
    team?: SortOrder;
  };

  export type MatchPlayerSumOrderByAggregateInput = {
    userId?: SortOrder;
    matchId?: SortOrder;
    team?: SortOrder;
  };

  export type FriendshipCountOrderByAggregateInput = {
    id?: SortOrder;
    requesterId?: SortOrder;
    receiverId?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type FriendshipAvgOrderByAggregateInput = {
    id?: SortOrder;
    requesterId?: SortOrder;
    receiverId?: SortOrder;
  };

  export type FriendshipMaxOrderByAggregateInput = {
    id?: SortOrder;
    requesterId?: SortOrder;
    receiverId?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type FriendshipMinOrderByAggregateInput = {
    id?: SortOrder;
    requesterId?: SortOrder;
    receiverId?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type FriendshipSumOrderByAggregateInput = {
    id?: SortOrder;
    requesterId?: SortOrder;
    receiverId?: SortOrder;
  };

  export type AchievementCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
  };

  export type AchievementAvgOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type AchievementMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
  };

  export type AchievementMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
  };

  export type AchievementSumOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type AchievementScalarRelationFilter = {
    is?: AchievementWhereInput;
    isNot?: AchievementWhereInput;
  };

  export type UserAchievementAchievementIdUserIdCompoundUniqueInput = {
    achievementId: number;
    userId: number;
  };

  export type UserAchievementCountOrderByAggregateInput = {
    userId?: SortOrder;
    achievementId?: SortOrder;
    unlockedAt?: SortOrder;
  };

  export type UserAchievementAvgOrderByAggregateInput = {
    userId?: SortOrder;
    achievementId?: SortOrder;
  };

  export type UserAchievementMaxOrderByAggregateInput = {
    userId?: SortOrder;
    achievementId?: SortOrder;
    unlockedAt?: SortOrder;
  };

  export type UserAchievementMinOrderByAggregateInput = {
    userId?: SortOrder;
    achievementId?: SortOrder;
    unlockedAt?: SortOrder;
  };

  export type UserAchievementSumOrderByAggregateInput = {
    userId?: SortOrder;
    achievementId?: SortOrder;
  };

  export type StatisticsCreateNestedOneWithoutUserInput = {
    create?: XOR<
      StatisticsCreateWithoutUserInput,
      StatisticsUncheckedCreateWithoutUserInput
    >;
    connectOrCreate?: StatisticsCreateOrConnectWithoutUserInput;
    connect?: StatisticsWhereUniqueInput;
  };

  export type MatchPlayerCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          MatchPlayerCreateWithoutUserInput,
          MatchPlayerUncheckedCreateWithoutUserInput
        >
      | MatchPlayerCreateWithoutUserInput[]
      | MatchPlayerUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | MatchPlayerCreateOrConnectWithoutUserInput
      | MatchPlayerCreateOrConnectWithoutUserInput[];
    createMany?: MatchPlayerCreateManyUserInputEnvelope;
    connect?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[];
  };

  export type UserAchievementCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          UserAchievementCreateWithoutUserInput,
          UserAchievementUncheckedCreateWithoutUserInput
        >
      | UserAchievementCreateWithoutUserInput[]
      | UserAchievementUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | UserAchievementCreateOrConnectWithoutUserInput
      | UserAchievementCreateOrConnectWithoutUserInput[];
    createMany?: UserAchievementCreateManyUserInputEnvelope;
    connect?:
      UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[];
  };

  export type FriendshipCreateNestedManyWithoutRequesterInput = {
    create?:
      | XOR<
          FriendshipCreateWithoutRequesterInput,
          FriendshipUncheckedCreateWithoutRequesterInput
        >
      | FriendshipCreateWithoutRequesterInput[]
      | FriendshipUncheckedCreateWithoutRequesterInput[];
    connectOrCreate?:
      | FriendshipCreateOrConnectWithoutRequesterInput
      | FriendshipCreateOrConnectWithoutRequesterInput[];
    createMany?: FriendshipCreateManyRequesterInputEnvelope;
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[];
  };

  export type FriendshipCreateNestedManyWithoutReceiverInput = {
    create?:
      | XOR<
          FriendshipCreateWithoutReceiverInput,
          FriendshipUncheckedCreateWithoutReceiverInput
        >
      | FriendshipCreateWithoutReceiverInput[]
      | FriendshipUncheckedCreateWithoutReceiverInput[];
    connectOrCreate?:
      | FriendshipCreateOrConnectWithoutReceiverInput
      | FriendshipCreateOrConnectWithoutReceiverInput[];
    createMany?: FriendshipCreateManyReceiverInputEnvelope;
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[];
  };

  export type StatisticsUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<
      StatisticsCreateWithoutUserInput,
      StatisticsUncheckedCreateWithoutUserInput
    >;
    connectOrCreate?: StatisticsCreateOrConnectWithoutUserInput;
    connect?: StatisticsWhereUniqueInput;
  };

  export type MatchPlayerUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          MatchPlayerCreateWithoutUserInput,
          MatchPlayerUncheckedCreateWithoutUserInput
        >
      | MatchPlayerCreateWithoutUserInput[]
      | MatchPlayerUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | MatchPlayerCreateOrConnectWithoutUserInput
      | MatchPlayerCreateOrConnectWithoutUserInput[];
    createMany?: MatchPlayerCreateManyUserInputEnvelope;
    connect?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[];
  };

  export type UserAchievementUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          UserAchievementCreateWithoutUserInput,
          UserAchievementUncheckedCreateWithoutUserInput
        >
      | UserAchievementCreateWithoutUserInput[]
      | UserAchievementUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | UserAchievementCreateOrConnectWithoutUserInput
      | UserAchievementCreateOrConnectWithoutUserInput[];
    createMany?: UserAchievementCreateManyUserInputEnvelope;
    connect?:
      UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[];
  };

  export type FriendshipUncheckedCreateNestedManyWithoutRequesterInput = {
    create?:
      | XOR<
          FriendshipCreateWithoutRequesterInput,
          FriendshipUncheckedCreateWithoutRequesterInput
        >
      | FriendshipCreateWithoutRequesterInput[]
      | FriendshipUncheckedCreateWithoutRequesterInput[];
    connectOrCreate?:
      | FriendshipCreateOrConnectWithoutRequesterInput
      | FriendshipCreateOrConnectWithoutRequesterInput[];
    createMany?: FriendshipCreateManyRequesterInputEnvelope;
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[];
  };

  export type FriendshipUncheckedCreateNestedManyWithoutReceiverInput = {
    create?:
      | XOR<
          FriendshipCreateWithoutReceiverInput,
          FriendshipUncheckedCreateWithoutReceiverInput
        >
      | FriendshipCreateWithoutReceiverInput[]
      | FriendshipUncheckedCreateWithoutReceiverInput[];
    connectOrCreate?:
      | FriendshipCreateOrConnectWithoutReceiverInput
      | FriendshipCreateOrConnectWithoutReceiverInput[];
    createMany?: FriendshipCreateManyReceiverInputEnvelope;
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
  };

  export type StatisticsUpdateOneWithoutUserNestedInput = {
    create?: XOR<
      StatisticsCreateWithoutUserInput,
      StatisticsUncheckedCreateWithoutUserInput
    >;
    connectOrCreate?: StatisticsCreateOrConnectWithoutUserInput;
    upsert?: StatisticsUpsertWithoutUserInput;
    disconnect?: StatisticsWhereInput | boolean;
    delete?: StatisticsWhereInput | boolean;
    connect?: StatisticsWhereUniqueInput;
    update?: XOR<
      XOR<
        StatisticsUpdateToOneWithWhereWithoutUserInput,
        StatisticsUpdateWithoutUserInput
      >,
      StatisticsUncheckedUpdateWithoutUserInput
    >;
  };

  export type MatchPlayerUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          MatchPlayerCreateWithoutUserInput,
          MatchPlayerUncheckedCreateWithoutUserInput
        >
      | MatchPlayerCreateWithoutUserInput[]
      | MatchPlayerUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | MatchPlayerCreateOrConnectWithoutUserInput
      | MatchPlayerCreateOrConnectWithoutUserInput[];
    upsert?:
      | MatchPlayerUpsertWithWhereUniqueWithoutUserInput
      | MatchPlayerUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: MatchPlayerCreateManyUserInputEnvelope;
    set?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[];
    disconnect?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[];
    delete?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[];
    connect?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[];
    update?:
      | MatchPlayerUpdateWithWhereUniqueWithoutUserInput
      | MatchPlayerUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | MatchPlayerUpdateManyWithWhereWithoutUserInput
      | MatchPlayerUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: MatchPlayerScalarWhereInput | MatchPlayerScalarWhereInput[];
  };

  export type UserAchievementUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          UserAchievementCreateWithoutUserInput,
          UserAchievementUncheckedCreateWithoutUserInput
        >
      | UserAchievementCreateWithoutUserInput[]
      | UserAchievementUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | UserAchievementCreateOrConnectWithoutUserInput
      | UserAchievementCreateOrConnectWithoutUserInput[];
    upsert?:
      | UserAchievementUpsertWithWhereUniqueWithoutUserInput
      | UserAchievementUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: UserAchievementCreateManyUserInputEnvelope;
    set?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[];
    disconnect?:
      UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[];
    delete?:
      UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[];
    connect?:
      UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[];
    update?:
      | UserAchievementUpdateWithWhereUniqueWithoutUserInput
      | UserAchievementUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | UserAchievementUpdateManyWithWhereWithoutUserInput
      | UserAchievementUpdateManyWithWhereWithoutUserInput[];
    deleteMany?:
      UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[];
  };

  export type FriendshipUpdateManyWithoutRequesterNestedInput = {
    create?:
      | XOR<
          FriendshipCreateWithoutRequesterInput,
          FriendshipUncheckedCreateWithoutRequesterInput
        >
      | FriendshipCreateWithoutRequesterInput[]
      | FriendshipUncheckedCreateWithoutRequesterInput[];
    connectOrCreate?:
      | FriendshipCreateOrConnectWithoutRequesterInput
      | FriendshipCreateOrConnectWithoutRequesterInput[];
    upsert?:
      | FriendshipUpsertWithWhereUniqueWithoutRequesterInput
      | FriendshipUpsertWithWhereUniqueWithoutRequesterInput[];
    createMany?: FriendshipCreateManyRequesterInputEnvelope;
    set?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[];
    disconnect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[];
    delete?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[];
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[];
    update?:
      | FriendshipUpdateWithWhereUniqueWithoutRequesterInput
      | FriendshipUpdateWithWhereUniqueWithoutRequesterInput[];
    updateMany?:
      | FriendshipUpdateManyWithWhereWithoutRequesterInput
      | FriendshipUpdateManyWithWhereWithoutRequesterInput[];
    deleteMany?: FriendshipScalarWhereInput | FriendshipScalarWhereInput[];
  };

  export type FriendshipUpdateManyWithoutReceiverNestedInput = {
    create?:
      | XOR<
          FriendshipCreateWithoutReceiverInput,
          FriendshipUncheckedCreateWithoutReceiverInput
        >
      | FriendshipCreateWithoutReceiverInput[]
      | FriendshipUncheckedCreateWithoutReceiverInput[];
    connectOrCreate?:
      | FriendshipCreateOrConnectWithoutReceiverInput
      | FriendshipCreateOrConnectWithoutReceiverInput[];
    upsert?:
      | FriendshipUpsertWithWhereUniqueWithoutReceiverInput
      | FriendshipUpsertWithWhereUniqueWithoutReceiverInput[];
    createMany?: FriendshipCreateManyReceiverInputEnvelope;
    set?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[];
    disconnect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[];
    delete?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[];
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[];
    update?:
      | FriendshipUpdateWithWhereUniqueWithoutReceiverInput
      | FriendshipUpdateWithWhereUniqueWithoutReceiverInput[];
    updateMany?:
      | FriendshipUpdateManyWithWhereWithoutReceiverInput
      | FriendshipUpdateManyWithWhereWithoutReceiverInput[];
    deleteMany?: FriendshipScalarWhereInput | FriendshipScalarWhereInput[];
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type StatisticsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<
      StatisticsCreateWithoutUserInput,
      StatisticsUncheckedCreateWithoutUserInput
    >;
    connectOrCreate?: StatisticsCreateOrConnectWithoutUserInput;
    upsert?: StatisticsUpsertWithoutUserInput;
    disconnect?: StatisticsWhereInput | boolean;
    delete?: StatisticsWhereInput | boolean;
    connect?: StatisticsWhereUniqueInput;
    update?: XOR<
      XOR<
        StatisticsUpdateToOneWithWhereWithoutUserInput,
        StatisticsUpdateWithoutUserInput
      >,
      StatisticsUncheckedUpdateWithoutUserInput
    >;
  };

  export type MatchPlayerUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          MatchPlayerCreateWithoutUserInput,
          MatchPlayerUncheckedCreateWithoutUserInput
        >
      | MatchPlayerCreateWithoutUserInput[]
      | MatchPlayerUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | MatchPlayerCreateOrConnectWithoutUserInput
      | MatchPlayerCreateOrConnectWithoutUserInput[];
    upsert?:
      | MatchPlayerUpsertWithWhereUniqueWithoutUserInput
      | MatchPlayerUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: MatchPlayerCreateManyUserInputEnvelope;
    set?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[];
    disconnect?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[];
    delete?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[];
    connect?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[];
    update?:
      | MatchPlayerUpdateWithWhereUniqueWithoutUserInput
      | MatchPlayerUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | MatchPlayerUpdateManyWithWhereWithoutUserInput
      | MatchPlayerUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: MatchPlayerScalarWhereInput | MatchPlayerScalarWhereInput[];
  };

  export type UserAchievementUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          UserAchievementCreateWithoutUserInput,
          UserAchievementUncheckedCreateWithoutUserInput
        >
      | UserAchievementCreateWithoutUserInput[]
      | UserAchievementUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | UserAchievementCreateOrConnectWithoutUserInput
      | UserAchievementCreateOrConnectWithoutUserInput[];
    upsert?:
      | UserAchievementUpsertWithWhereUniqueWithoutUserInput
      | UserAchievementUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: UserAchievementCreateManyUserInputEnvelope;
    set?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[];
    disconnect?:
      UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[];
    delete?:
      UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[];
    connect?:
      UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[];
    update?:
      | UserAchievementUpdateWithWhereUniqueWithoutUserInput
      | UserAchievementUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | UserAchievementUpdateManyWithWhereWithoutUserInput
      | UserAchievementUpdateManyWithWhereWithoutUserInput[];
    deleteMany?:
      UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[];
  };

  export type FriendshipUncheckedUpdateManyWithoutRequesterNestedInput = {
    create?:
      | XOR<
          FriendshipCreateWithoutRequesterInput,
          FriendshipUncheckedCreateWithoutRequesterInput
        >
      | FriendshipCreateWithoutRequesterInput[]
      | FriendshipUncheckedCreateWithoutRequesterInput[];
    connectOrCreate?:
      | FriendshipCreateOrConnectWithoutRequesterInput
      | FriendshipCreateOrConnectWithoutRequesterInput[];
    upsert?:
      | FriendshipUpsertWithWhereUniqueWithoutRequesterInput
      | FriendshipUpsertWithWhereUniqueWithoutRequesterInput[];
    createMany?: FriendshipCreateManyRequesterInputEnvelope;
    set?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[];
    disconnect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[];
    delete?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[];
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[];
    update?:
      | FriendshipUpdateWithWhereUniqueWithoutRequesterInput
      | FriendshipUpdateWithWhereUniqueWithoutRequesterInput[];
    updateMany?:
      | FriendshipUpdateManyWithWhereWithoutRequesterInput
      | FriendshipUpdateManyWithWhereWithoutRequesterInput[];
    deleteMany?: FriendshipScalarWhereInput | FriendshipScalarWhereInput[];
  };

  export type FriendshipUncheckedUpdateManyWithoutReceiverNestedInput = {
    create?:
      | XOR<
          FriendshipCreateWithoutReceiverInput,
          FriendshipUncheckedCreateWithoutReceiverInput
        >
      | FriendshipCreateWithoutReceiverInput[]
      | FriendshipUncheckedCreateWithoutReceiverInput[];
    connectOrCreate?:
      | FriendshipCreateOrConnectWithoutReceiverInput
      | FriendshipCreateOrConnectWithoutReceiverInput[];
    upsert?:
      | FriendshipUpsertWithWhereUniqueWithoutReceiverInput
      | FriendshipUpsertWithWhereUniqueWithoutReceiverInput[];
    createMany?: FriendshipCreateManyReceiverInputEnvelope;
    set?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[];
    disconnect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[];
    delete?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[];
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[];
    update?:
      | FriendshipUpdateWithWhereUniqueWithoutReceiverInput
      | FriendshipUpdateWithWhereUniqueWithoutReceiverInput[];
    updateMany?:
      | FriendshipUpdateManyWithWhereWithoutReceiverInput
      | FriendshipUpdateManyWithWhereWithoutReceiverInput[];
    deleteMany?: FriendshipScalarWhereInput | FriendshipScalarWhereInput[];
  };

  export type UserCreateNestedOneWithoutStatisticsInput = {
    create?: XOR<
      UserCreateWithoutStatisticsInput,
      UserUncheckedCreateWithoutStatisticsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutStatisticsInput;
    connect?: UserWhereUniqueInput;
  };

  export type UserUpdateOneRequiredWithoutStatisticsNestedInput = {
    create?: XOR<
      UserCreateWithoutStatisticsInput,
      UserUncheckedCreateWithoutStatisticsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutStatisticsInput;
    upsert?: UserUpsertWithoutStatisticsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutStatisticsInput,
        UserUpdateWithoutStatisticsInput
      >,
      UserUncheckedUpdateWithoutStatisticsInput
    >;
  };

  export type MatchPlayerCreateNestedManyWithoutMatchInput = {
    create?:
      | XOR<
          MatchPlayerCreateWithoutMatchInput,
          MatchPlayerUncheckedCreateWithoutMatchInput
        >
      | MatchPlayerCreateWithoutMatchInput[]
      | MatchPlayerUncheckedCreateWithoutMatchInput[];
    connectOrCreate?:
      | MatchPlayerCreateOrConnectWithoutMatchInput
      | MatchPlayerCreateOrConnectWithoutMatchInput[];
    createMany?: MatchPlayerCreateManyMatchInputEnvelope;
    connect?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[];
  };

  export type MatchPlayerUncheckedCreateNestedManyWithoutMatchInput = {
    create?:
      | XOR<
          MatchPlayerCreateWithoutMatchInput,
          MatchPlayerUncheckedCreateWithoutMatchInput
        >
      | MatchPlayerCreateWithoutMatchInput[]
      | MatchPlayerUncheckedCreateWithoutMatchInput[];
    connectOrCreate?:
      | MatchPlayerCreateOrConnectWithoutMatchInput
      | MatchPlayerCreateOrConnectWithoutMatchInput[];
    createMany?: MatchPlayerCreateManyMatchInputEnvelope;
    connect?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[];
  };

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
  };

  export type MatchPlayerUpdateManyWithoutMatchNestedInput = {
    create?:
      | XOR<
          MatchPlayerCreateWithoutMatchInput,
          MatchPlayerUncheckedCreateWithoutMatchInput
        >
      | MatchPlayerCreateWithoutMatchInput[]
      | MatchPlayerUncheckedCreateWithoutMatchInput[];
    connectOrCreate?:
      | MatchPlayerCreateOrConnectWithoutMatchInput
      | MatchPlayerCreateOrConnectWithoutMatchInput[];
    upsert?:
      | MatchPlayerUpsertWithWhereUniqueWithoutMatchInput
      | MatchPlayerUpsertWithWhereUniqueWithoutMatchInput[];
    createMany?: MatchPlayerCreateManyMatchInputEnvelope;
    set?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[];
    disconnect?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[];
    delete?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[];
    connect?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[];
    update?:
      | MatchPlayerUpdateWithWhereUniqueWithoutMatchInput
      | MatchPlayerUpdateWithWhereUniqueWithoutMatchInput[];
    updateMany?:
      | MatchPlayerUpdateManyWithWhereWithoutMatchInput
      | MatchPlayerUpdateManyWithWhereWithoutMatchInput[];
    deleteMany?: MatchPlayerScalarWhereInput | MatchPlayerScalarWhereInput[];
  };

  export type MatchPlayerUncheckedUpdateManyWithoutMatchNestedInput = {
    create?:
      | XOR<
          MatchPlayerCreateWithoutMatchInput,
          MatchPlayerUncheckedCreateWithoutMatchInput
        >
      | MatchPlayerCreateWithoutMatchInput[]
      | MatchPlayerUncheckedCreateWithoutMatchInput[];
    connectOrCreate?:
      | MatchPlayerCreateOrConnectWithoutMatchInput
      | MatchPlayerCreateOrConnectWithoutMatchInput[];
    upsert?:
      | MatchPlayerUpsertWithWhereUniqueWithoutMatchInput
      | MatchPlayerUpsertWithWhereUniqueWithoutMatchInput[];
    createMany?: MatchPlayerCreateManyMatchInputEnvelope;
    set?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[];
    disconnect?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[];
    delete?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[];
    connect?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[];
    update?:
      | MatchPlayerUpdateWithWhereUniqueWithoutMatchInput
      | MatchPlayerUpdateWithWhereUniqueWithoutMatchInput[];
    updateMany?:
      | MatchPlayerUpdateManyWithWhereWithoutMatchInput
      | MatchPlayerUpdateManyWithWhereWithoutMatchInput[];
    deleteMany?: MatchPlayerScalarWhereInput | MatchPlayerScalarWhereInput[];
  };

  export type UserCreateNestedOneWithoutMatchPlayersInput = {
    create?: XOR<
      UserCreateWithoutMatchPlayersInput,
      UserUncheckedCreateWithoutMatchPlayersInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutMatchPlayersInput;
    connect?: UserWhereUniqueInput;
  };

  export type MatchCreateNestedOneWithoutPlayersInput = {
    create?: XOR<
      MatchCreateWithoutPlayersInput,
      MatchUncheckedCreateWithoutPlayersInput
    >;
    connectOrCreate?: MatchCreateOrConnectWithoutPlayersInput;
    connect?: MatchWhereUniqueInput;
  };

  export type UserUpdateOneRequiredWithoutMatchPlayersNestedInput = {
    create?: XOR<
      UserCreateWithoutMatchPlayersInput,
      UserUncheckedCreateWithoutMatchPlayersInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutMatchPlayersInput;
    upsert?: UserUpsertWithoutMatchPlayersInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutMatchPlayersInput,
        UserUpdateWithoutMatchPlayersInput
      >,
      UserUncheckedUpdateWithoutMatchPlayersInput
    >;
  };

  export type MatchUpdateOneRequiredWithoutPlayersNestedInput = {
    create?: XOR<
      MatchCreateWithoutPlayersInput,
      MatchUncheckedCreateWithoutPlayersInput
    >;
    connectOrCreate?: MatchCreateOrConnectWithoutPlayersInput;
    upsert?: MatchUpsertWithoutPlayersInput;
    connect?: MatchWhereUniqueInput;
    update?: XOR<
      XOR<
        MatchUpdateToOneWithWhereWithoutPlayersInput,
        MatchUpdateWithoutPlayersInput
      >,
      MatchUncheckedUpdateWithoutPlayersInput
    >;
  };

  export type UserCreateNestedOneWithoutSentFriendRequestsInput = {
    create?: XOR<
      UserCreateWithoutSentFriendRequestsInput,
      UserUncheckedCreateWithoutSentFriendRequestsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutSentFriendRequestsInput;
    connect?: UserWhereUniqueInput;
  };

  export type UserCreateNestedOneWithoutReceivedFriendRequestsInput = {
    create?: XOR<
      UserCreateWithoutReceivedFriendRequestsInput,
      UserUncheckedCreateWithoutReceivedFriendRequestsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutReceivedFriendRequestsInput;
    connect?: UserWhereUniqueInput;
  };

  export type UserUpdateOneRequiredWithoutSentFriendRequestsNestedInput = {
    create?: XOR<
      UserCreateWithoutSentFriendRequestsInput,
      UserUncheckedCreateWithoutSentFriendRequestsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutSentFriendRequestsInput;
    upsert?: UserUpsertWithoutSentFriendRequestsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutSentFriendRequestsInput,
        UserUpdateWithoutSentFriendRequestsInput
      >,
      UserUncheckedUpdateWithoutSentFriendRequestsInput
    >;
  };

  export type UserUpdateOneRequiredWithoutReceivedFriendRequestsNestedInput = {
    create?: XOR<
      UserCreateWithoutReceivedFriendRequestsInput,
      UserUncheckedCreateWithoutReceivedFriendRequestsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutReceivedFriendRequestsInput;
    upsert?: UserUpsertWithoutReceivedFriendRequestsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutReceivedFriendRequestsInput,
        UserUpdateWithoutReceivedFriendRequestsInput
      >,
      UserUncheckedUpdateWithoutReceivedFriendRequestsInput
    >;
  };

  export type UserAchievementCreateNestedManyWithoutAchievementInput = {
    create?:
      | XOR<
          UserAchievementCreateWithoutAchievementInput,
          UserAchievementUncheckedCreateWithoutAchievementInput
        >
      | UserAchievementCreateWithoutAchievementInput[]
      | UserAchievementUncheckedCreateWithoutAchievementInput[];
    connectOrCreate?:
      | UserAchievementCreateOrConnectWithoutAchievementInput
      | UserAchievementCreateOrConnectWithoutAchievementInput[];
    createMany?: UserAchievementCreateManyAchievementInputEnvelope;
    connect?:
      UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[];
  };

  export type UserAchievementUncheckedCreateNestedManyWithoutAchievementInput =
    {
      create?:
        | XOR<
            UserAchievementCreateWithoutAchievementInput,
            UserAchievementUncheckedCreateWithoutAchievementInput
          >
        | UserAchievementCreateWithoutAchievementInput[]
        | UserAchievementUncheckedCreateWithoutAchievementInput[];
      connectOrCreate?:
        | UserAchievementCreateOrConnectWithoutAchievementInput
        | UserAchievementCreateOrConnectWithoutAchievementInput[];
      createMany?: UserAchievementCreateManyAchievementInputEnvelope;
      connect?:
        UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[];
    };

  export type UserAchievementUpdateManyWithoutAchievementNestedInput = {
    create?:
      | XOR<
          UserAchievementCreateWithoutAchievementInput,
          UserAchievementUncheckedCreateWithoutAchievementInput
        >
      | UserAchievementCreateWithoutAchievementInput[]
      | UserAchievementUncheckedCreateWithoutAchievementInput[];
    connectOrCreate?:
      | UserAchievementCreateOrConnectWithoutAchievementInput
      | UserAchievementCreateOrConnectWithoutAchievementInput[];
    upsert?:
      | UserAchievementUpsertWithWhereUniqueWithoutAchievementInput
      | UserAchievementUpsertWithWhereUniqueWithoutAchievementInput[];
    createMany?: UserAchievementCreateManyAchievementInputEnvelope;
    set?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[];
    disconnect?:
      UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[];
    delete?:
      UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[];
    connect?:
      UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[];
    update?:
      | UserAchievementUpdateWithWhereUniqueWithoutAchievementInput
      | UserAchievementUpdateWithWhereUniqueWithoutAchievementInput[];
    updateMany?:
      | UserAchievementUpdateManyWithWhereWithoutAchievementInput
      | UserAchievementUpdateManyWithWhereWithoutAchievementInput[];
    deleteMany?:
      UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[];
  };

  export type UserAchievementUncheckedUpdateManyWithoutAchievementNestedInput =
    {
      create?:
        | XOR<
            UserAchievementCreateWithoutAchievementInput,
            UserAchievementUncheckedCreateWithoutAchievementInput
          >
        | UserAchievementCreateWithoutAchievementInput[]
        | UserAchievementUncheckedCreateWithoutAchievementInput[];
      connectOrCreate?:
        | UserAchievementCreateOrConnectWithoutAchievementInput
        | UserAchievementCreateOrConnectWithoutAchievementInput[];
      upsert?:
        | UserAchievementUpsertWithWhereUniqueWithoutAchievementInput
        | UserAchievementUpsertWithWhereUniqueWithoutAchievementInput[];
      createMany?: UserAchievementCreateManyAchievementInputEnvelope;
      set?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[];
      disconnect?:
        UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[];
      delete?:
        UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[];
      connect?:
        UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[];
      update?:
        | UserAchievementUpdateWithWhereUniqueWithoutAchievementInput
        | UserAchievementUpdateWithWhereUniqueWithoutAchievementInput[];
      updateMany?:
        | UserAchievementUpdateManyWithWhereWithoutAchievementInput
        | UserAchievementUpdateManyWithWhereWithoutAchievementInput[];
      deleteMany?:
        UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[];
    };

  export type UserCreateNestedOneWithoutAchievementsInput = {
    create?: XOR<
      UserCreateWithoutAchievementsInput,
      UserUncheckedCreateWithoutAchievementsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutAchievementsInput;
    connect?: UserWhereUniqueInput;
  };

  export type AchievementCreateNestedOneWithoutUsersInput = {
    create?: XOR<
      AchievementCreateWithoutUsersInput,
      AchievementUncheckedCreateWithoutUsersInput
    >;
    connectOrCreate?: AchievementCreateOrConnectWithoutUsersInput;
    connect?: AchievementWhereUniqueInput;
  };

  export type UserUpdateOneRequiredWithoutAchievementsNestedInput = {
    create?: XOR<
      UserCreateWithoutAchievementsInput,
      UserUncheckedCreateWithoutAchievementsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutAchievementsInput;
    upsert?: UserUpsertWithoutAchievementsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutAchievementsInput,
        UserUpdateWithoutAchievementsInput
      >,
      UserUncheckedUpdateWithoutAchievementsInput
    >;
  };

  export type AchievementUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<
      AchievementCreateWithoutUsersInput,
      AchievementUncheckedCreateWithoutUsersInput
    >;
    connectOrCreate?: AchievementCreateOrConnectWithoutUsersInput;
    upsert?: AchievementUpsertWithoutUsersInput;
    connect?: AchievementWhereUniqueInput;
    update?: XOR<
      XOR<
        AchievementUpdateToOneWithWhereWithoutUsersInput,
        AchievementUpdateWithoutUsersInput
      >,
      AchievementUncheckedUpdateWithoutUsersInput
    >;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?:
      NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
      in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
      notIn?:
        Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
      lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      not?:
        | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
        | Date
        | string
        | null;
      _count?: NestedIntNullableFilter<$PrismaModel>;
      _min?: NestedDateTimeNullableFilter<$PrismaModel>;
      _max?: NestedDateTimeNullableFilter<$PrismaModel>;
    };

  export type StatisticsCreateWithoutUserInput = {
    matchesPlayed?: number;
    wins?: number;
    losses?: number;
    totalPitStops?: number;
    perfectPitStops?: number;
    fastestPitStopTime?: number;
    totalCrashes?: number;
  };

  export type StatisticsUncheckedCreateWithoutUserInput = {
    matchesPlayed?: number;
    wins?: number;
    losses?: number;
    totalPitStops?: number;
    perfectPitStops?: number;
    fastestPitStopTime?: number;
    totalCrashes?: number;
  };

  export type StatisticsCreateOrConnectWithoutUserInput = {
    where: StatisticsWhereUniqueInput;
    create: XOR<
      StatisticsCreateWithoutUserInput,
      StatisticsUncheckedCreateWithoutUserInput
    >;
  };

  export type MatchPlayerCreateWithoutUserInput = {
    team: number;
    match: MatchCreateNestedOneWithoutPlayersInput;
  };

  export type MatchPlayerUncheckedCreateWithoutUserInput = {
    matchId: number;
    team: number;
  };

  export type MatchPlayerCreateOrConnectWithoutUserInput = {
    where: MatchPlayerWhereUniqueInput;
    create: XOR<
      MatchPlayerCreateWithoutUserInput,
      MatchPlayerUncheckedCreateWithoutUserInput
    >;
  };

  export type MatchPlayerCreateManyUserInputEnvelope = {
    data: MatchPlayerCreateManyUserInput | MatchPlayerCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type UserAchievementCreateWithoutUserInput = {
    unlockedAt?: Date | string;
    achievement: AchievementCreateNestedOneWithoutUsersInput;
  };

  export type UserAchievementUncheckedCreateWithoutUserInput = {
    achievementId: number;
    unlockedAt?: Date | string;
  };

  export type UserAchievementCreateOrConnectWithoutUserInput = {
    where: UserAchievementWhereUniqueInput;
    create: XOR<
      UserAchievementCreateWithoutUserInput,
      UserAchievementUncheckedCreateWithoutUserInput
    >;
  };

  export type UserAchievementCreateManyUserInputEnvelope = {
    data:
      UserAchievementCreateManyUserInput | UserAchievementCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type FriendshipCreateWithoutRequesterInput = {
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    receiver: UserCreateNestedOneWithoutReceivedFriendRequestsInput;
  };

  export type FriendshipUncheckedCreateWithoutRequesterInput = {
    id?: number;
    receiverId: number;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type FriendshipCreateOrConnectWithoutRequesterInput = {
    where: FriendshipWhereUniqueInput;
    create: XOR<
      FriendshipCreateWithoutRequesterInput,
      FriendshipUncheckedCreateWithoutRequesterInput
    >;
  };

  export type FriendshipCreateManyRequesterInputEnvelope = {
    data:
      FriendshipCreateManyRequesterInput | FriendshipCreateManyRequesterInput[];
    skipDuplicates?: boolean;
  };

  export type FriendshipCreateWithoutReceiverInput = {
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    requester: UserCreateNestedOneWithoutSentFriendRequestsInput;
  };

  export type FriendshipUncheckedCreateWithoutReceiverInput = {
    id?: number;
    requesterId: number;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type FriendshipCreateOrConnectWithoutReceiverInput = {
    where: FriendshipWhereUniqueInput;
    create: XOR<
      FriendshipCreateWithoutReceiverInput,
      FriendshipUncheckedCreateWithoutReceiverInput
    >;
  };

  export type FriendshipCreateManyReceiverInputEnvelope = {
    data:
      FriendshipCreateManyReceiverInput | FriendshipCreateManyReceiverInput[];
    skipDuplicates?: boolean;
  };

  export type StatisticsUpsertWithoutUserInput = {
    update: XOR<
      StatisticsUpdateWithoutUserInput,
      StatisticsUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      StatisticsCreateWithoutUserInput,
      StatisticsUncheckedCreateWithoutUserInput
    >;
    where?: StatisticsWhereInput;
  };

  export type StatisticsUpdateToOneWithWhereWithoutUserInput = {
    where?: StatisticsWhereInput;
    data: XOR<
      StatisticsUpdateWithoutUserInput,
      StatisticsUncheckedUpdateWithoutUserInput
    >;
  };

  export type StatisticsUpdateWithoutUserInput = {
    matchesPlayed?: IntFieldUpdateOperationsInput | number;
    wins?: IntFieldUpdateOperationsInput | number;
    losses?: IntFieldUpdateOperationsInput | number;
    totalPitStops?: IntFieldUpdateOperationsInput | number;
    perfectPitStops?: IntFieldUpdateOperationsInput | number;
    fastestPitStopTime?: IntFieldUpdateOperationsInput | number;
    totalCrashes?: IntFieldUpdateOperationsInput | number;
  };

  export type StatisticsUncheckedUpdateWithoutUserInput = {
    matchesPlayed?: IntFieldUpdateOperationsInput | number;
    wins?: IntFieldUpdateOperationsInput | number;
    losses?: IntFieldUpdateOperationsInput | number;
    totalPitStops?: IntFieldUpdateOperationsInput | number;
    perfectPitStops?: IntFieldUpdateOperationsInput | number;
    fastestPitStopTime?: IntFieldUpdateOperationsInput | number;
    totalCrashes?: IntFieldUpdateOperationsInput | number;
  };

  export type MatchPlayerUpsertWithWhereUniqueWithoutUserInput = {
    where: MatchPlayerWhereUniqueInput;
    update: XOR<
      MatchPlayerUpdateWithoutUserInput,
      MatchPlayerUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      MatchPlayerCreateWithoutUserInput,
      MatchPlayerUncheckedCreateWithoutUserInput
    >;
  };

  export type MatchPlayerUpdateWithWhereUniqueWithoutUserInput = {
    where: MatchPlayerWhereUniqueInput;
    data: XOR<
      MatchPlayerUpdateWithoutUserInput,
      MatchPlayerUncheckedUpdateWithoutUserInput
    >;
  };

  export type MatchPlayerUpdateManyWithWhereWithoutUserInput = {
    where: MatchPlayerScalarWhereInput;
    data: XOR<
      MatchPlayerUpdateManyMutationInput,
      MatchPlayerUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type MatchPlayerScalarWhereInput = {
    AND?: MatchPlayerScalarWhereInput | MatchPlayerScalarWhereInput[];
    OR?: MatchPlayerScalarWhereInput[];
    NOT?: MatchPlayerScalarWhereInput | MatchPlayerScalarWhereInput[];
    userId?: IntFilter<"MatchPlayer"> | number;
    matchId?: IntFilter<"MatchPlayer"> | number;
    team?: IntFilter<"MatchPlayer"> | number;
  };

  export type UserAchievementUpsertWithWhereUniqueWithoutUserInput = {
    where: UserAchievementWhereUniqueInput;
    update: XOR<
      UserAchievementUpdateWithoutUserInput,
      UserAchievementUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      UserAchievementCreateWithoutUserInput,
      UserAchievementUncheckedCreateWithoutUserInput
    >;
  };

  export type UserAchievementUpdateWithWhereUniqueWithoutUserInput = {
    where: UserAchievementWhereUniqueInput;
    data: XOR<
      UserAchievementUpdateWithoutUserInput,
      UserAchievementUncheckedUpdateWithoutUserInput
    >;
  };

  export type UserAchievementUpdateManyWithWhereWithoutUserInput = {
    where: UserAchievementScalarWhereInput;
    data: XOR<
      UserAchievementUpdateManyMutationInput,
      UserAchievementUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type UserAchievementScalarWhereInput = {
    AND?: UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[];
    OR?: UserAchievementScalarWhereInput[];
    NOT?: UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[];
    userId?: IntFilter<"UserAchievement"> | number;
    achievementId?: IntFilter<"UserAchievement"> | number;
    unlockedAt?: DateTimeFilter<"UserAchievement"> | Date | string;
  };

  export type FriendshipUpsertWithWhereUniqueWithoutRequesterInput = {
    where: FriendshipWhereUniqueInput;
    update: XOR<
      FriendshipUpdateWithoutRequesterInput,
      FriendshipUncheckedUpdateWithoutRequesterInput
    >;
    create: XOR<
      FriendshipCreateWithoutRequesterInput,
      FriendshipUncheckedCreateWithoutRequesterInput
    >;
  };

  export type FriendshipUpdateWithWhereUniqueWithoutRequesterInput = {
    where: FriendshipWhereUniqueInput;
    data: XOR<
      FriendshipUpdateWithoutRequesterInput,
      FriendshipUncheckedUpdateWithoutRequesterInput
    >;
  };

  export type FriendshipUpdateManyWithWhereWithoutRequesterInput = {
    where: FriendshipScalarWhereInput;
    data: XOR<
      FriendshipUpdateManyMutationInput,
      FriendshipUncheckedUpdateManyWithoutRequesterInput
    >;
  };

  export type FriendshipScalarWhereInput = {
    AND?: FriendshipScalarWhereInput | FriendshipScalarWhereInput[];
    OR?: FriendshipScalarWhereInput[];
    NOT?: FriendshipScalarWhereInput | FriendshipScalarWhereInput[];
    id?: IntFilter<"Friendship"> | number;
    requesterId?: IntFilter<"Friendship"> | number;
    receiverId?: IntFilter<"Friendship"> | number;
    status?: StringFilter<"Friendship"> | string;
    createdAt?: DateTimeFilter<"Friendship"> | Date | string;
    updatedAt?: DateTimeFilter<"Friendship"> | Date | string;
  };

  export type FriendshipUpsertWithWhereUniqueWithoutReceiverInput = {
    where: FriendshipWhereUniqueInput;
    update: XOR<
      FriendshipUpdateWithoutReceiverInput,
      FriendshipUncheckedUpdateWithoutReceiverInput
    >;
    create: XOR<
      FriendshipCreateWithoutReceiverInput,
      FriendshipUncheckedCreateWithoutReceiverInput
    >;
  };

  export type FriendshipUpdateWithWhereUniqueWithoutReceiverInput = {
    where: FriendshipWhereUniqueInput;
    data: XOR<
      FriendshipUpdateWithoutReceiverInput,
      FriendshipUncheckedUpdateWithoutReceiverInput
    >;
  };

  export type FriendshipUpdateManyWithWhereWithoutReceiverInput = {
    where: FriendshipScalarWhereInput;
    data: XOR<
      FriendshipUpdateManyMutationInput,
      FriendshipUncheckedUpdateManyWithoutReceiverInput
    >;
  };

  export type UserCreateWithoutStatisticsInput = {
    username: string;
    firstName: string;
    lastName: string;
    country?: string | null;
    city?: string | null;
    birthday: Date | string;
    email: string;
    passwordHash: string;
    avatar?: string | null;
    twoFactorEnabled?: boolean;
    twoFactorSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lastLogin?: Date | string;
    isActive?: boolean;
    matchPlayers?: MatchPlayerCreateNestedManyWithoutUserInput;
    achievements?: UserAchievementCreateNestedManyWithoutUserInput;
    sentFriendRequests?: FriendshipCreateNestedManyWithoutRequesterInput;
    receivedFriendRequests?: FriendshipCreateNestedManyWithoutReceiverInput;
  };

  export type UserUncheckedCreateWithoutStatisticsInput = {
    id?: number;
    username: string;
    firstName: string;
    lastName: string;
    country?: string | null;
    city?: string | null;
    birthday: Date | string;
    email: string;
    passwordHash: string;
    avatar?: string | null;
    twoFactorEnabled?: boolean;
    twoFactorSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lastLogin?: Date | string;
    isActive?: boolean;
    matchPlayers?: MatchPlayerUncheckedCreateNestedManyWithoutUserInput;
    achievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput;
    sentFriendRequests?: FriendshipUncheckedCreateNestedManyWithoutRequesterInput;
    receivedFriendRequests?: FriendshipUncheckedCreateNestedManyWithoutReceiverInput;
  };

  export type UserCreateOrConnectWithoutStatisticsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutStatisticsInput,
      UserUncheckedCreateWithoutStatisticsInput
    >;
  };

  export type UserUpsertWithoutStatisticsInput = {
    update: XOR<
      UserUpdateWithoutStatisticsInput,
      UserUncheckedUpdateWithoutStatisticsInput
    >;
    create: XOR<
      UserCreateWithoutStatisticsInput,
      UserUncheckedCreateWithoutStatisticsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutStatisticsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutStatisticsInput,
      UserUncheckedUpdateWithoutStatisticsInput
    >;
  };

  export type UserUpdateWithoutStatisticsInput = {
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    country?: NullableStringFieldUpdateOperationsInput | string | null;
    city?: NullableStringFieldUpdateOperationsInput | string | null;
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    avatar?: NullableStringFieldUpdateOperationsInput | string | null;
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean;
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    lastLogin?: DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    matchPlayers?: MatchPlayerUpdateManyWithoutUserNestedInput;
    achievements?: UserAchievementUpdateManyWithoutUserNestedInput;
    sentFriendRequests?: FriendshipUpdateManyWithoutRequesterNestedInput;
    receivedFriendRequests?: FriendshipUpdateManyWithoutReceiverNestedInput;
  };

  export type UserUncheckedUpdateWithoutStatisticsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    country?: NullableStringFieldUpdateOperationsInput | string | null;
    city?: NullableStringFieldUpdateOperationsInput | string | null;
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    avatar?: NullableStringFieldUpdateOperationsInput | string | null;
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean;
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    lastLogin?: DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    matchPlayers?: MatchPlayerUncheckedUpdateManyWithoutUserNestedInput;
    achievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput;
    sentFriendRequests?: FriendshipUncheckedUpdateManyWithoutRequesterNestedInput;
    receivedFriendRequests?: FriendshipUncheckedUpdateManyWithoutReceiverNestedInput;
  };

  export type MatchPlayerCreateWithoutMatchInput = {
    team: number;
    user: UserCreateNestedOneWithoutMatchPlayersInput;
  };

  export type MatchPlayerUncheckedCreateWithoutMatchInput = {
    userId: number;
    team: number;
  };

  export type MatchPlayerCreateOrConnectWithoutMatchInput = {
    where: MatchPlayerWhereUniqueInput;
    create: XOR<
      MatchPlayerCreateWithoutMatchInput,
      MatchPlayerUncheckedCreateWithoutMatchInput
    >;
  };

  export type MatchPlayerCreateManyMatchInputEnvelope = {
    data: MatchPlayerCreateManyMatchInput | MatchPlayerCreateManyMatchInput[];
    skipDuplicates?: boolean;
  };

  export type MatchPlayerUpsertWithWhereUniqueWithoutMatchInput = {
    where: MatchPlayerWhereUniqueInput;
    update: XOR<
      MatchPlayerUpdateWithoutMatchInput,
      MatchPlayerUncheckedUpdateWithoutMatchInput
    >;
    create: XOR<
      MatchPlayerCreateWithoutMatchInput,
      MatchPlayerUncheckedCreateWithoutMatchInput
    >;
  };

  export type MatchPlayerUpdateWithWhereUniqueWithoutMatchInput = {
    where: MatchPlayerWhereUniqueInput;
    data: XOR<
      MatchPlayerUpdateWithoutMatchInput,
      MatchPlayerUncheckedUpdateWithoutMatchInput
    >;
  };

  export type MatchPlayerUpdateManyWithWhereWithoutMatchInput = {
    where: MatchPlayerScalarWhereInput;
    data: XOR<
      MatchPlayerUpdateManyMutationInput,
      MatchPlayerUncheckedUpdateManyWithoutMatchInput
    >;
  };

  export type UserCreateWithoutMatchPlayersInput = {
    username: string;
    firstName: string;
    lastName: string;
    country?: string | null;
    city?: string | null;
    birthday: Date | string;
    email: string;
    passwordHash: string;
    avatar?: string | null;
    twoFactorEnabled?: boolean;
    twoFactorSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lastLogin?: Date | string;
    isActive?: boolean;
    statistics?: StatisticsCreateNestedOneWithoutUserInput;
    achievements?: UserAchievementCreateNestedManyWithoutUserInput;
    sentFriendRequests?: FriendshipCreateNestedManyWithoutRequesterInput;
    receivedFriendRequests?: FriendshipCreateNestedManyWithoutReceiverInput;
  };

  export type UserUncheckedCreateWithoutMatchPlayersInput = {
    id?: number;
    username: string;
    firstName: string;
    lastName: string;
    country?: string | null;
    city?: string | null;
    birthday: Date | string;
    email: string;
    passwordHash: string;
    avatar?: string | null;
    twoFactorEnabled?: boolean;
    twoFactorSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lastLogin?: Date | string;
    isActive?: boolean;
    statistics?: StatisticsUncheckedCreateNestedOneWithoutUserInput;
    achievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput;
    sentFriendRequests?: FriendshipUncheckedCreateNestedManyWithoutRequesterInput;
    receivedFriendRequests?: FriendshipUncheckedCreateNestedManyWithoutReceiverInput;
  };

  export type UserCreateOrConnectWithoutMatchPlayersInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutMatchPlayersInput,
      UserUncheckedCreateWithoutMatchPlayersInput
    >;
  };

  export type MatchCreateWithoutPlayersInput = {
    winningTeam: number;
    startedAt?: Date | string;
    finishedAt?: Date | string | null;
    gameMode: string;
  };

  export type MatchUncheckedCreateWithoutPlayersInput = {
    id?: number;
    winningTeam: number;
    startedAt?: Date | string;
    finishedAt?: Date | string | null;
    gameMode: string;
  };

  export type MatchCreateOrConnectWithoutPlayersInput = {
    where: MatchWhereUniqueInput;
    create: XOR<
      MatchCreateWithoutPlayersInput,
      MatchUncheckedCreateWithoutPlayersInput
    >;
  };

  export type UserUpsertWithoutMatchPlayersInput = {
    update: XOR<
      UserUpdateWithoutMatchPlayersInput,
      UserUncheckedUpdateWithoutMatchPlayersInput
    >;
    create: XOR<
      UserCreateWithoutMatchPlayersInput,
      UserUncheckedCreateWithoutMatchPlayersInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutMatchPlayersInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutMatchPlayersInput,
      UserUncheckedUpdateWithoutMatchPlayersInput
    >;
  };

  export type UserUpdateWithoutMatchPlayersInput = {
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    country?: NullableStringFieldUpdateOperationsInput | string | null;
    city?: NullableStringFieldUpdateOperationsInput | string | null;
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    avatar?: NullableStringFieldUpdateOperationsInput | string | null;
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean;
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    lastLogin?: DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    statistics?: StatisticsUpdateOneWithoutUserNestedInput;
    achievements?: UserAchievementUpdateManyWithoutUserNestedInput;
    sentFriendRequests?: FriendshipUpdateManyWithoutRequesterNestedInput;
    receivedFriendRequests?: FriendshipUpdateManyWithoutReceiverNestedInput;
  };

  export type UserUncheckedUpdateWithoutMatchPlayersInput = {
    id?: IntFieldUpdateOperationsInput | number;
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    country?: NullableStringFieldUpdateOperationsInput | string | null;
    city?: NullableStringFieldUpdateOperationsInput | string | null;
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    avatar?: NullableStringFieldUpdateOperationsInput | string | null;
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean;
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    lastLogin?: DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    statistics?: StatisticsUncheckedUpdateOneWithoutUserNestedInput;
    achievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput;
    sentFriendRequests?: FriendshipUncheckedUpdateManyWithoutRequesterNestedInput;
    receivedFriendRequests?: FriendshipUncheckedUpdateManyWithoutReceiverNestedInput;
  };

  export type MatchUpsertWithoutPlayersInput = {
    update: XOR<
      MatchUpdateWithoutPlayersInput,
      MatchUncheckedUpdateWithoutPlayersInput
    >;
    create: XOR<
      MatchCreateWithoutPlayersInput,
      MatchUncheckedCreateWithoutPlayersInput
    >;
    where?: MatchWhereInput;
  };

  export type MatchUpdateToOneWithWhereWithoutPlayersInput = {
    where?: MatchWhereInput;
    data: XOR<
      MatchUpdateWithoutPlayersInput,
      MatchUncheckedUpdateWithoutPlayersInput
    >;
  };

  export type MatchUpdateWithoutPlayersInput = {
    winningTeam?: IntFieldUpdateOperationsInput | number;
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    finishedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    gameMode?: StringFieldUpdateOperationsInput | string;
  };

  export type MatchUncheckedUpdateWithoutPlayersInput = {
    id?: IntFieldUpdateOperationsInput | number;
    winningTeam?: IntFieldUpdateOperationsInput | number;
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    finishedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    gameMode?: StringFieldUpdateOperationsInput | string;
  };

  export type UserCreateWithoutSentFriendRequestsInput = {
    username: string;
    firstName: string;
    lastName: string;
    country?: string | null;
    city?: string | null;
    birthday: Date | string;
    email: string;
    passwordHash: string;
    avatar?: string | null;
    twoFactorEnabled?: boolean;
    twoFactorSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lastLogin?: Date | string;
    isActive?: boolean;
    statistics?: StatisticsCreateNestedOneWithoutUserInput;
    matchPlayers?: MatchPlayerCreateNestedManyWithoutUserInput;
    achievements?: UserAchievementCreateNestedManyWithoutUserInput;
    receivedFriendRequests?: FriendshipCreateNestedManyWithoutReceiverInput;
  };

  export type UserUncheckedCreateWithoutSentFriendRequestsInput = {
    id?: number;
    username: string;
    firstName: string;
    lastName: string;
    country?: string | null;
    city?: string | null;
    birthday: Date | string;
    email: string;
    passwordHash: string;
    avatar?: string | null;
    twoFactorEnabled?: boolean;
    twoFactorSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lastLogin?: Date | string;
    isActive?: boolean;
    statistics?: StatisticsUncheckedCreateNestedOneWithoutUserInput;
    matchPlayers?: MatchPlayerUncheckedCreateNestedManyWithoutUserInput;
    achievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput;
    receivedFriendRequests?: FriendshipUncheckedCreateNestedManyWithoutReceiverInput;
  };

  export type UserCreateOrConnectWithoutSentFriendRequestsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutSentFriendRequestsInput,
      UserUncheckedCreateWithoutSentFriendRequestsInput
    >;
  };

  export type UserCreateWithoutReceivedFriendRequestsInput = {
    username: string;
    firstName: string;
    lastName: string;
    country?: string | null;
    city?: string | null;
    birthday: Date | string;
    email: string;
    passwordHash: string;
    avatar?: string | null;
    twoFactorEnabled?: boolean;
    twoFactorSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lastLogin?: Date | string;
    isActive?: boolean;
    statistics?: StatisticsCreateNestedOneWithoutUserInput;
    matchPlayers?: MatchPlayerCreateNestedManyWithoutUserInput;
    achievements?: UserAchievementCreateNestedManyWithoutUserInput;
    sentFriendRequests?: FriendshipCreateNestedManyWithoutRequesterInput;
  };

  export type UserUncheckedCreateWithoutReceivedFriendRequestsInput = {
    id?: number;
    username: string;
    firstName: string;
    lastName: string;
    country?: string | null;
    city?: string | null;
    birthday: Date | string;
    email: string;
    passwordHash: string;
    avatar?: string | null;
    twoFactorEnabled?: boolean;
    twoFactorSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lastLogin?: Date | string;
    isActive?: boolean;
    statistics?: StatisticsUncheckedCreateNestedOneWithoutUserInput;
    matchPlayers?: MatchPlayerUncheckedCreateNestedManyWithoutUserInput;
    achievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput;
    sentFriendRequests?: FriendshipUncheckedCreateNestedManyWithoutRequesterInput;
  };

  export type UserCreateOrConnectWithoutReceivedFriendRequestsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutReceivedFriendRequestsInput,
      UserUncheckedCreateWithoutReceivedFriendRequestsInput
    >;
  };

  export type UserUpsertWithoutSentFriendRequestsInput = {
    update: XOR<
      UserUpdateWithoutSentFriendRequestsInput,
      UserUncheckedUpdateWithoutSentFriendRequestsInput
    >;
    create: XOR<
      UserCreateWithoutSentFriendRequestsInput,
      UserUncheckedCreateWithoutSentFriendRequestsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutSentFriendRequestsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutSentFriendRequestsInput,
      UserUncheckedUpdateWithoutSentFriendRequestsInput
    >;
  };

  export type UserUpdateWithoutSentFriendRequestsInput = {
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    country?: NullableStringFieldUpdateOperationsInput | string | null;
    city?: NullableStringFieldUpdateOperationsInput | string | null;
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    avatar?: NullableStringFieldUpdateOperationsInput | string | null;
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean;
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    lastLogin?: DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    statistics?: StatisticsUpdateOneWithoutUserNestedInput;
    matchPlayers?: MatchPlayerUpdateManyWithoutUserNestedInput;
    achievements?: UserAchievementUpdateManyWithoutUserNestedInput;
    receivedFriendRequests?: FriendshipUpdateManyWithoutReceiverNestedInput;
  };

  export type UserUncheckedUpdateWithoutSentFriendRequestsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    country?: NullableStringFieldUpdateOperationsInput | string | null;
    city?: NullableStringFieldUpdateOperationsInput | string | null;
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    avatar?: NullableStringFieldUpdateOperationsInput | string | null;
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean;
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    lastLogin?: DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    statistics?: StatisticsUncheckedUpdateOneWithoutUserNestedInput;
    matchPlayers?: MatchPlayerUncheckedUpdateManyWithoutUserNestedInput;
    achievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput;
    receivedFriendRequests?: FriendshipUncheckedUpdateManyWithoutReceiverNestedInput;
  };

  export type UserUpsertWithoutReceivedFriendRequestsInput = {
    update: XOR<
      UserUpdateWithoutReceivedFriendRequestsInput,
      UserUncheckedUpdateWithoutReceivedFriendRequestsInput
    >;
    create: XOR<
      UserCreateWithoutReceivedFriendRequestsInput,
      UserUncheckedCreateWithoutReceivedFriendRequestsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutReceivedFriendRequestsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutReceivedFriendRequestsInput,
      UserUncheckedUpdateWithoutReceivedFriendRequestsInput
    >;
  };

  export type UserUpdateWithoutReceivedFriendRequestsInput = {
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    country?: NullableStringFieldUpdateOperationsInput | string | null;
    city?: NullableStringFieldUpdateOperationsInput | string | null;
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    avatar?: NullableStringFieldUpdateOperationsInput | string | null;
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean;
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    lastLogin?: DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    statistics?: StatisticsUpdateOneWithoutUserNestedInput;
    matchPlayers?: MatchPlayerUpdateManyWithoutUserNestedInput;
    achievements?: UserAchievementUpdateManyWithoutUserNestedInput;
    sentFriendRequests?: FriendshipUpdateManyWithoutRequesterNestedInput;
  };

  export type UserUncheckedUpdateWithoutReceivedFriendRequestsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    country?: NullableStringFieldUpdateOperationsInput | string | null;
    city?: NullableStringFieldUpdateOperationsInput | string | null;
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    avatar?: NullableStringFieldUpdateOperationsInput | string | null;
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean;
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    lastLogin?: DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    statistics?: StatisticsUncheckedUpdateOneWithoutUserNestedInput;
    matchPlayers?: MatchPlayerUncheckedUpdateManyWithoutUserNestedInput;
    achievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput;
    sentFriendRequests?: FriendshipUncheckedUpdateManyWithoutRequesterNestedInput;
  };

  export type UserAchievementCreateWithoutAchievementInput = {
    unlockedAt?: Date | string;
    user: UserCreateNestedOneWithoutAchievementsInput;
  };

  export type UserAchievementUncheckedCreateWithoutAchievementInput = {
    userId: number;
    unlockedAt?: Date | string;
  };

  export type UserAchievementCreateOrConnectWithoutAchievementInput = {
    where: UserAchievementWhereUniqueInput;
    create: XOR<
      UserAchievementCreateWithoutAchievementInput,
      UserAchievementUncheckedCreateWithoutAchievementInput
    >;
  };

  export type UserAchievementCreateManyAchievementInputEnvelope = {
    data:
      | UserAchievementCreateManyAchievementInput
      | UserAchievementCreateManyAchievementInput[];
    skipDuplicates?: boolean;
  };

  export type UserAchievementUpsertWithWhereUniqueWithoutAchievementInput = {
    where: UserAchievementWhereUniqueInput;
    update: XOR<
      UserAchievementUpdateWithoutAchievementInput,
      UserAchievementUncheckedUpdateWithoutAchievementInput
    >;
    create: XOR<
      UserAchievementCreateWithoutAchievementInput,
      UserAchievementUncheckedCreateWithoutAchievementInput
    >;
  };

  export type UserAchievementUpdateWithWhereUniqueWithoutAchievementInput = {
    where: UserAchievementWhereUniqueInput;
    data: XOR<
      UserAchievementUpdateWithoutAchievementInput,
      UserAchievementUncheckedUpdateWithoutAchievementInput
    >;
  };

  export type UserAchievementUpdateManyWithWhereWithoutAchievementInput = {
    where: UserAchievementScalarWhereInput;
    data: XOR<
      UserAchievementUpdateManyMutationInput,
      UserAchievementUncheckedUpdateManyWithoutAchievementInput
    >;
  };

  export type UserCreateWithoutAchievementsInput = {
    username: string;
    firstName: string;
    lastName: string;
    country?: string | null;
    city?: string | null;
    birthday: Date | string;
    email: string;
    passwordHash: string;
    avatar?: string | null;
    twoFactorEnabled?: boolean;
    twoFactorSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lastLogin?: Date | string;
    isActive?: boolean;
    statistics?: StatisticsCreateNestedOneWithoutUserInput;
    matchPlayers?: MatchPlayerCreateNestedManyWithoutUserInput;
    sentFriendRequests?: FriendshipCreateNestedManyWithoutRequesterInput;
    receivedFriendRequests?: FriendshipCreateNestedManyWithoutReceiverInput;
  };

  export type UserUncheckedCreateWithoutAchievementsInput = {
    id?: number;
    username: string;
    firstName: string;
    lastName: string;
    country?: string | null;
    city?: string | null;
    birthday: Date | string;
    email: string;
    passwordHash: string;
    avatar?: string | null;
    twoFactorEnabled?: boolean;
    twoFactorSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lastLogin?: Date | string;
    isActive?: boolean;
    statistics?: StatisticsUncheckedCreateNestedOneWithoutUserInput;
    matchPlayers?: MatchPlayerUncheckedCreateNestedManyWithoutUserInput;
    sentFriendRequests?: FriendshipUncheckedCreateNestedManyWithoutRequesterInput;
    receivedFriendRequests?: FriendshipUncheckedCreateNestedManyWithoutReceiverInput;
  };

  export type UserCreateOrConnectWithoutAchievementsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutAchievementsInput,
      UserUncheckedCreateWithoutAchievementsInput
    >;
  };

  export type AchievementCreateWithoutUsersInput = {
    name: string;
    description: string;
  };

  export type AchievementUncheckedCreateWithoutUsersInput = {
    id?: number;
    name: string;
    description: string;
  };

  export type AchievementCreateOrConnectWithoutUsersInput = {
    where: AchievementWhereUniqueInput;
    create: XOR<
      AchievementCreateWithoutUsersInput,
      AchievementUncheckedCreateWithoutUsersInput
    >;
  };

  export type UserUpsertWithoutAchievementsInput = {
    update: XOR<
      UserUpdateWithoutAchievementsInput,
      UserUncheckedUpdateWithoutAchievementsInput
    >;
    create: XOR<
      UserCreateWithoutAchievementsInput,
      UserUncheckedCreateWithoutAchievementsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutAchievementsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutAchievementsInput,
      UserUncheckedUpdateWithoutAchievementsInput
    >;
  };

  export type UserUpdateWithoutAchievementsInput = {
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    country?: NullableStringFieldUpdateOperationsInput | string | null;
    city?: NullableStringFieldUpdateOperationsInput | string | null;
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    avatar?: NullableStringFieldUpdateOperationsInput | string | null;
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean;
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    lastLogin?: DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    statistics?: StatisticsUpdateOneWithoutUserNestedInput;
    matchPlayers?: MatchPlayerUpdateManyWithoutUserNestedInput;
    sentFriendRequests?: FriendshipUpdateManyWithoutRequesterNestedInput;
    receivedFriendRequests?: FriendshipUpdateManyWithoutReceiverNestedInput;
  };

  export type UserUncheckedUpdateWithoutAchievementsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    country?: NullableStringFieldUpdateOperationsInput | string | null;
    city?: NullableStringFieldUpdateOperationsInput | string | null;
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    avatar?: NullableStringFieldUpdateOperationsInput | string | null;
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean;
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    lastLogin?: DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    statistics?: StatisticsUncheckedUpdateOneWithoutUserNestedInput;
    matchPlayers?: MatchPlayerUncheckedUpdateManyWithoutUserNestedInput;
    sentFriendRequests?: FriendshipUncheckedUpdateManyWithoutRequesterNestedInput;
    receivedFriendRequests?: FriendshipUncheckedUpdateManyWithoutReceiverNestedInput;
  };

  export type AchievementUpsertWithoutUsersInput = {
    update: XOR<
      AchievementUpdateWithoutUsersInput,
      AchievementUncheckedUpdateWithoutUsersInput
    >;
    create: XOR<
      AchievementCreateWithoutUsersInput,
      AchievementUncheckedCreateWithoutUsersInput
    >;
    where?: AchievementWhereInput;
  };

  export type AchievementUpdateToOneWithWhereWithoutUsersInput = {
    where?: AchievementWhereInput;
    data: XOR<
      AchievementUpdateWithoutUsersInput,
      AchievementUncheckedUpdateWithoutUsersInput
    >;
  };

  export type AchievementUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
  };

  export type AchievementUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
  };

  export type MatchPlayerCreateManyUserInput = {
    matchId: number;
    team: number;
  };

  export type UserAchievementCreateManyUserInput = {
    achievementId: number;
    unlockedAt?: Date | string;
  };

  export type FriendshipCreateManyRequesterInput = {
    id?: number;
    receiverId: number;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type FriendshipCreateManyReceiverInput = {
    id?: number;
    requesterId: number;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type MatchPlayerUpdateWithoutUserInput = {
    team?: IntFieldUpdateOperationsInput | number;
    match?: MatchUpdateOneRequiredWithoutPlayersNestedInput;
  };

  export type MatchPlayerUncheckedUpdateWithoutUserInput = {
    matchId?: IntFieldUpdateOperationsInput | number;
    team?: IntFieldUpdateOperationsInput | number;
  };

  export type MatchPlayerUncheckedUpdateManyWithoutUserInput = {
    matchId?: IntFieldUpdateOperationsInput | number;
    team?: IntFieldUpdateOperationsInput | number;
  };

  export type UserAchievementUpdateWithoutUserInput = {
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    achievement?: AchievementUpdateOneRequiredWithoutUsersNestedInput;
  };

  export type UserAchievementUncheckedUpdateWithoutUserInput = {
    achievementId?: IntFieldUpdateOperationsInput | number;
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserAchievementUncheckedUpdateManyWithoutUserInput = {
    achievementId?: IntFieldUpdateOperationsInput | number;
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type FriendshipUpdateWithoutRequesterInput = {
    status?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    receiver?: UserUpdateOneRequiredWithoutReceivedFriendRequestsNestedInput;
  };

  export type FriendshipUncheckedUpdateWithoutRequesterInput = {
    id?: IntFieldUpdateOperationsInput | number;
    receiverId?: IntFieldUpdateOperationsInput | number;
    status?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type FriendshipUncheckedUpdateManyWithoutRequesterInput = {
    id?: IntFieldUpdateOperationsInput | number;
    receiverId?: IntFieldUpdateOperationsInput | number;
    status?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type FriendshipUpdateWithoutReceiverInput = {
    status?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    requester?: UserUpdateOneRequiredWithoutSentFriendRequestsNestedInput;
  };

  export type FriendshipUncheckedUpdateWithoutReceiverInput = {
    id?: IntFieldUpdateOperationsInput | number;
    requesterId?: IntFieldUpdateOperationsInput | number;
    status?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type FriendshipUncheckedUpdateManyWithoutReceiverInput = {
    id?: IntFieldUpdateOperationsInput | number;
    requesterId?: IntFieldUpdateOperationsInput | number;
    status?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MatchPlayerCreateManyMatchInput = {
    userId: number;
    team: number;
  };

  export type MatchPlayerUpdateWithoutMatchInput = {
    team?: IntFieldUpdateOperationsInput | number;
    user?: UserUpdateOneRequiredWithoutMatchPlayersNestedInput;
  };

  export type MatchPlayerUncheckedUpdateWithoutMatchInput = {
    userId?: IntFieldUpdateOperationsInput | number;
    team?: IntFieldUpdateOperationsInput | number;
  };

  export type MatchPlayerUncheckedUpdateManyWithoutMatchInput = {
    userId?: IntFieldUpdateOperationsInput | number;
    team?: IntFieldUpdateOperationsInput | number;
  };

  export type UserAchievementCreateManyAchievementInput = {
    userId: number;
    unlockedAt?: Date | string;
  };

  export type UserAchievementUpdateWithoutAchievementInput = {
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutAchievementsNestedInput;
  };

  export type UserAchievementUncheckedUpdateWithoutAchievementInput = {
    userId?: IntFieldUpdateOperationsInput | number;
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserAchievementUncheckedUpdateManyWithoutAchievementInput = {
    userId?: IntFieldUpdateOperationsInput | number;
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
