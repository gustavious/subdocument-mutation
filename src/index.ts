import Document from './sampleDocument.json';
import { add, Operation, parseMutation, remove, update } from './service';

const initialDocument = Document;
// const initialMutation = JSON.parse(
//   '{ "posts": [{"_id": 2, "value": "too"}] }'
// );
const initialMutation = JSON.parse(
  '{ "posts": [{"_id": 3, "mentions": [{"_id": 6, "_delete": true}]}]}'
);

interface Output {
  $add?: {};
  $remove?: {};
  $update?: {};
}

/**
 * Given a document and a mutation, generate the output instructions
 * Initial document and initial mutation are used as fallback
 * @param { object } document - original document
 * @param { object } mutation - description of the changes that need to be applied over the document
 * @return Output instruction
 */
export const generateUpdateStatement = (
  document: object = initialDocument,
  mutation: object = initialMutation
): Output => {
  const output: Output = {};
  const updateOperations: Operation[] = parseMutation(mutation);
  for (const operation of updateOperations) {
    console.log('Current operation: ', operation);
    if (operation.type === 'update') {
      output.$update = update(document, operation);
    } else if (operation.type === 'add') {
      output.$add = add(document, operation);
    } else if (operation.type === 'remove') {
      output.$remove = remove(document, operation);
    }
  }

  return output;
};

// Try basic functionality
console.log('Result: ', generateUpdateStatement());
