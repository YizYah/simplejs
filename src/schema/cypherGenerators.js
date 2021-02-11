const { relationships } = require('./relationships')
const capitalize = require('capitalize')

function cypherCreate (unit, instance) {
  const unitInfo = relationships[unit]

  const typeInfo = unitInfo[instance]
  const { parent, assn, kind, type } = typeInfo

  const parentInfo = unitInfo[parent]
  const parentType = parentInfo.type

  return '@cypher(statement: "' +
      `MATCH (${parent}:${parentType}:Exported {id:${parent}Id, owner:$cypherParams.currentUserId}) ` +
      `MERGE (${parent})-[:\`${assn}\` {kind: '${kind}' }]-(${instance}:${type}:Exported {id: apoc.create.uuid(), value:$value, owner:$cypherParams.currentUserId}) ` +
      `RETURN ${instance}` +
      '")'
}

function cypherUpdate (instance) {
  const type = capitalize(instance, true)

  return '@cypher(statement: "' +
      `MATCH (${instance}:${type}:Exported {id:$${instance}Id, owner:$cypherParams.currentUserId}) ` +
      `SET ${instance}.value=$value ` +
      `RETURN ${instance}` +
      '")'
}

function cypherDelete (instance) {
  const type = capitalize(instance, true)

  return '@cypher(statement: "' +
      `MATCH (${instance}:${type}:Exported {id:$${instance}Id, owner:$cypherParams.currentUserId}) ` +
      `DETACH DELETE ${instance} ` +
      'RETURN true' +
      '")'
}

console.log(`cypherUpdate('appSpec', 'userType')=${cypherCreate('appSpec', 'userType')}`)
console.log(`cypherUpdate('userType')=${cypherUpdate('userType')}`)
console.log(`cypherDelete('userType')=${cypherDelete('userType')}`)

module.exports = {
  cypherCreate,
  cypherUpdate,
  cypherDelete
}
