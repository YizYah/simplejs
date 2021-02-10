const relationships = {
  appSpec: {
    app: {
      type: 'App',
      parent: 'customer',
      assn: 'Assn_customer_to_app_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42',
      kind: 'multiple'
    },
    userType: {
      type: 'UserType',
      parent: 'app',
      assn: 'Assn_app_to_userType_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42',
      kind: 'multiple'
    }

  }
}

function cypherAdd (unit, type) {
  const unitInfo = relationships[unit]
  const typeInfo = unitInfo[type]
  const { parent, assn, kind } = typeInfo
  const typeName = typeInfo.type

  const parentInfo = unitInfo[parent]
  const parentTypeName = parentInfo.type

  return `@cypher("match (${parent}:${parentTypeName}:Exported {id:${parent}Id, owner:$cypherParams.currentUserId})
    merge (${parent})-[:\\\`${assn}\\\` {kind: \"${kind}\"}]-(${type}:${typeName}:Exported {id: apoc.create.uuid(), value:$value, owner:$cypherParams.currentUserId}) return ${type}")`
}

console.log(`cypherAdd('appSpec','userType')=${cypherAdd('appSpec','userType')}`)

module.exports = {
  cypherAdd,
}
