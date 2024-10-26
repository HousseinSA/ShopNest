// @ts-expect-error: Importing ObjectID from 'bson-objectid' may not have type definitions
import ObjectID from 'bson-objectid';

function validateObjectId(storeCode: string): boolean {
  return ObjectID.isValid(storeCode);
}

export default validateObjectId;