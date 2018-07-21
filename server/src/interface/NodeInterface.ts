//
import { fromGlobalId, nodeDefinitions } from 'graphql-relay';

const registeredTypes = {};

export function registerType(type) {
  registeredTypes[type.name] = type;
  return type;
}

export const { nodeField, nodeInterface } = nodeDefinitions((globalId, context) => {
  const { type, id } = fromGlobalId(globalId);
  const loader = context.dataloaders[`${type}Loader`];
  return (loader && loader.load(id)) || null;
}, object => registeredTypes[object.constructor.name] || null);
