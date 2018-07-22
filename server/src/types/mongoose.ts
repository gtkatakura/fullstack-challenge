export type TypesDefinition = StringConstructor | BooleanConstructor | DateConstructor

export type FieldDefinition = {
  type: TypesDefinition;
  required?: boolean;
  default?: boolean;
}

export type SchemaDefinition = {
  [path: string]: FieldDefinition;
}

export type PrimitiveFromTypeDefinition<T extends TypesDefinition> = T extends StringConstructor
  ? string
  : T extends BooleanConstructor ? boolean : T extends DateConstructor ? Date : never

export type OptionalFields<T extends SchemaDefinition> = {
  [K in keyof T]: T[K]['required'] extends boolean ? never : K
}[keyof T]

export type RequiredFields<T extends SchemaDefinition> = Exclude<keyof T, OptionalFields<T>>

export type ModelFromSchemaDefinition<T extends SchemaDefinition> = {
  [K in RequiredFields<T>]: PrimitiveFromTypeDefinition<T[K]['type']>
} &
  { [K in OptionalFields<T>]?: PrimitiveFromTypeDefinition<T[K]['type']> }
