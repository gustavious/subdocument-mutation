import Document from './sampleDocument.json';
import { Operation, parseMutation, update } from './service';

const initialDocument = Document;
const initialMutation = JSON.parse(
  '{ "posts": [{"_id": 2, "value": "too"}, {"_id": 3, "value": "new"}] }'
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
      if (!output.$update) output.$update = {};
      output.$update = update(document, operation);
    }
  }

  return output;
};

// Try basic functionality
// console.log('Result: ', generateUpdateStatement());
