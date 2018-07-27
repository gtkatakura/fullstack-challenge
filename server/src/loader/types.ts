import * as loaders from '.'

type Loader<T extends Function> = { getLoader: T }

type ExtractLoader<T> = T extends Loader<infer R> ? R : never

export type DataLoaders<T extends { [name: string]: Loader<any> } = typeof loaders> = {
  [K in keyof T]: ReturnType<ExtractLoader<T[K]>>
}
