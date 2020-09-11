import { generateUpdateStatement } from '../index';

import Doc1 from './document1.json';

/**
 * Unit test for update subdocuments routines
 */
describe('Test suite for array mutations', () => {
  /**
   * Scenario 1 - Update
   */
  const documentScenario1: object = Doc1;
  const updateScenario = JSON.parse(
    '{ "posts": [{"_id": 2, "value": "too" }] }'
  );
  const expectedOutput1 = JSON.parse('{ "$update": {"posts.0.value": "too"} }');

  test('Test Update operation', () => {
    const res = generateUpdateStatement(documentScenario1, updateScenario);
    console.log('Test 1 output: ', res);

    expect(res).toBeDefined();
    expect(res.$update).toBeDefined();
    expect(res.$update['posts.0.value']).toEqual('too');
    expect(res).toEqual(expectedOutput1);
  });

  /**
   * Scenario 2 - Add
   */
  const addScenario = JSON.parse('{"posts": [{"value": "four"}] }');
  const expectedOutput2 = JSON.parse(
    '{"$add": {"posts": [{"value": "four"}] }}'
  );

  test('Test add operation', () => {
    const res = generateUpdateStatement(documentScenario1, addScenario);
    console.log('Test 2 output: ', res);

    expect(res).toBeDefined();
    expect(res.$add).toBeDefined();
    expect(res).toEqual(expectedOutput2);
  });

  /**
   * Scenario 3 - Remove
   */
  const removeScenario = JSON.parse(
    '{ "posts": [{"_id": 2, "_delete": true}] }'
  );
  const expectedOutput3 = JSON.parse('{ "$remove" : {"posts.0" : true} }');

  test('Test Remove operation', () => {
    const res = generateUpdateStatement(documentScenario1, removeScenario);
    console.log('Test 3 output: ', res);

    expect(res).toBeDefined();
    expect(res.$remove).toBeDefined();
    expect(res).toEqual(expectedOutput3);
  });

  /**
   * Scenario 4 - Update Mentions
   */
  const updateScenario2 = JSON.parse(
    '{ "posts": [{"_id": 3, "mentions": [ {"_id": 5, "text": "pear"}]}] }'
  );
  const expectedOutput4 = JSON.parse(
    '{ "$update": {"posts.1.mentions.0.text": "pear"}}'
  );

  test('Test Update operation - mentions', () => {
    const res = generateUpdateStatement(documentScenario1, updateScenario2);
    console.log('Test 4 output: ', res);

    expect(res).toBeDefined();
    expect(res.$update).toBeDefined();
    expect(res).toEqual(expectedOutput4);
  });

  /**
   * Scenario 5 - Remove Mutations
   */
  const removeScenario2 = JSON.parse(
    '{ "posts": [{"_id": 3, "mentions": [{"_id": 6, "_delete": true}]}]}'
  );
  const expectedOutput5 = JSON.parse(
    '{ "$remove" : {"posts.1.mentions.1": true}}'
  );

  test('Test Remove operation with mentions', () => {
    const res = generateUpdateStatement(documentScenario1, removeScenario2);
    console.log('Test 3 output: ', res);

    expect(res).toBeDefined();
    expect(res.$remove).toBeDefined();
    expect(res).toEqual(expectedOutput5);
  });
});
