import _ from 'lodash';

/**
 * Filters the fields of the given object and return a new object with the filtered fields.
 * The given filter is a function that accepts 2 values: key, value - the field is kept if the function returns true.
 *
 * @param {Object} obj
 * @param {Function} filter
 * @returns {Object} The filtered object.
 */
export const filterFields = (obj, filter) => {
  const entries = Object.entries(obj);
  const filteredEntries = entries.filter(([k, v]) => filter(k, v));
  return Object.fromEntries(filteredEntries);
};

/**
   * Removes any empty fields (using _.isEmpty) of the given object and returns a new object with the filtered fields.
   *
   * @param {Object} obj
   * @returns The filtered object.
   */
export const removeNullFields = obj => filterFields(obj, (k, v) => !_.isEmpty(v));

/**
 * Maps the fields of the given object according to the given mapper and returns a new object with the mapped fields.
 * The given mapper expects 2 values: field name, field value - Whatever the mapper returns is considered the new value.
 *
 * @param {Object} obj
 * @param {Function} mapper
 * @returns The mapped object.
 */
export const mapFields = (obj, mapper) => {
  const entries = Object.entries(obj);
  const mappedEntries = entries.map(([k, v]) => [k, mapper(k, v)]);
  return Object.fromEntries(mappedEntries);
};

export const stringifyFields = obj => mapFields(obj, (k, v) => JSON.stringify(v, null, 2));
