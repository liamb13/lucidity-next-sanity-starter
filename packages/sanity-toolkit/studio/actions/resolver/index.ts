import type {
  DocumentActionComponent,
  DocumentActionsContext,
  DocumentActionsResolver,
} from 'sanity';

export type ActionHandler = (
  action: DocumentActionComponent,
  context: DocumentActionsContext,
) => DocumentActionComponent;

export interface ActionModifier {
  actions?: string | Array<string>;
  schemaTypes?: string | Array<string>;
  handler: ActionHandler;
}

export type ActionModifierFunction = ActionModifier | ActionHandler;

export type ActionModifierList = Array<ActionModifier | ActionModifierFunction>;

export function defineActionModifier(object: ActionModifierFunction) {
  return object;
}

export function modifyActions(
  actionModifiers: ActionModifierList,
  callback?: DocumentActionsResolver,
): DocumentActionsResolver {
  return (
    previousActions: Array<DocumentActionComponent>,
    context: DocumentActionsContext,
  ) => {
    const modifiedActions = modifyActionsFn(previousActions, context, actionModifiers);

    if (callback) {
      return callback(modifiedActions, context);
    }

    return modifiedActions;
  };
}

const modifyActionsFn = (
  previousActions: Array<DocumentActionComponent>,
  context: DocumentActionsContext,
  actionModifiers: ActionModifierList,
) => {
  return actionModifiers.reduce((currentActions, config) => {
    // If config is a function, just call it and return. We assume config's as a function will handle allowed actions and schema types themselves.
    if (typeof config === 'function') {
      return currentActions.map((action) => config(action, context));
    }

    const { actions: allowedActions, schemaTypes, handler } = config;

    // We support both a string and an array of strings for actions and schemaTypes
    const allowedActionsArray = stringToArray(allowedActions);
    const schemaTypesArray = stringToArray(schemaTypes);

    // Skip if schema type doesn't match config
    if (schemaTypesArray !== undefined && !schemaTypesArray.includes(context.schemaType)) {
      return currentActions;
    }

    return currentActions.map((action) => {
      // Skip if allowed actions is not undefined, and action type doesn't match list of allowed actions
      if (
        allowedActionsArray !== undefined &&
        (action.action === undefined || !allowedActionsArray.includes(action.action))
      ) {
        return action;
      }

      return handler(action, context);
    });
  }, previousActions);
};

function stringToArray(stringOrArray: undefined | string | Array<string>) {
  return typeof stringOrArray === 'string' ? [stringOrArray] : stringOrArray;
}
