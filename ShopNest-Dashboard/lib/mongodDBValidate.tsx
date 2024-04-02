import ObjectID from 'bson-objectid'

function validateObjectId(storeCode: string): boolean {
  const checkConValue = ObjectID.isValid(storeCode)
  return checkConValue
}

export default validateObjectId
