import ObjectID from 'bson-objectid'

function validateObjectId(storeCode: string): boolean {
  return ObjectID.isValid(storeCode)
  
}

export default validateObjectId
