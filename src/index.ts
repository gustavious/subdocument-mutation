import Document from './sampleDocument.json';
import { add, parseMutation, Operation } from './service';

const initialDocument = Document;
const initialMutation = JSON.parse('{ "posts": [{"_id": 2, "value": "too"}, {"_id": 3, "value": "new"}] }');

/**
 * Given a document and a mutation, generate the output instructions
 * Initial document and initial mutation are used as fallback
 * @param { object } document - original document
 * @param { object } mutation - description of the changes that need to be applied over the document
 * @return Output instruction
 */
const generateUpdateStatement = (
  document: object = initialDocument,
  mutation: object = initialMutation
) => {
  const output = [];
  const updateOperations: Operation[] = parseMutation(mutation);
  for (const operation of updateOperations) {
    console.log('Current operation: ', operation);
    if (operation.type === 'add') {
      output.push(add(document, operation));
    }
  }

  return output;
};

console.log('Result: ', generateUpdateStatement());
