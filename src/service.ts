/**
 * Recursively search in the props of an object to search for a document with a given id
 * @param { object } document - original document
 * @param { object } operation - operation to be executed
 * @return Generates an update operation object
 */
export const update = (document: object, operation: Operation) => {
  console.log(`Update service called with:
  Document: ${JSON.stringify(document)}
  Mutation operation: ${JSON.stringify(operation)}`);
  const updatePath = findPathById(document, operation._id);
  return getUpdateStatementFromPath(updatePath, operation.value);
};

/**
 * Recursively search in the props of an object to search for a document with a given id
 * @param { string } path - object to be iterated
 * @param { string } value - desired id to find
 * @return dot notation patch to the object with the given id
 */
const getUpdateStatementFromPath = (path: string, value: string | number) => {
  const objPath = `${path.substring(0, path.length - 4)}.value`;
  const res = {};
  res[objPath] = value;
  return res;
};

/**
 * Recursively search in the props of an object to search for a document with a given id
 * @param { string } obj - object to be iterated
 * @param { string } id - desired id to find
 * @return dot notation patch to the object with the given id
 */
const findPathById = (obj: object, id: number) => {
  for (const [key, value] of Object.entries(obj)) {
    if (key in obj) {
      if (id === obj['_id']) return key;
      else if (value && typeof value === 'object') {
        const path = findPathById(value, id);
        if (path) return `${key}.${path}`;
      }
    }
  }
};

export interface Operation {
  type: string;
  _id?: number;
  value: string;
}

/**
 * get an array with each operation to be executed by the main mutation
 * @param { object } mutation - input sentence
 * @return dot notation patch to the object with the given id
 */
export const parseMutation = (mutation: object): Operation[] => {
  const operations = [];
  for (const subDocumnent of Object.values(mutation)) {
    for (const operation of Object.values(subDocumnent)) {
      console.log('Insert operation', operation);
      const operationObj = operation as object;
      if ('_id' in operationObj) {
        operations.push({ ...operationObj, type: 'update' });
      }
    }
  }
  return operations;
};
