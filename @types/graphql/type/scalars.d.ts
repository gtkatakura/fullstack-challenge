import { GraphQLScalarType } from "./definition";

export const GraphQLInt: GraphQLScalarType<number>;
export const GraphQLFloat: GraphQLScalarType<number>;
export const GraphQLString: GraphQLScalarType<string>;
export const GraphQLBoolean: GraphQLScalarType<boolean>;
export const GraphQLID: GraphQLScalarType<string>;

export const specifiedScalarTypes: ReadonlyArray<GraphQLScalarType>;

export function isSpecifiedScalarType(type: GraphQLScalarType): boolean;
