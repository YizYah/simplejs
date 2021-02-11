const relationships = {
  appSpec: {
    customer: {
      type: 'Customer'
    },
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
    },
    screen: {
      type: 'Screen',
      parent: 'userType',
      assn: 'Assn_userType_to_screen_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42',
      kind: 'multiple'
    },
    infoType: {
      type: 'InfoType',
      parent: 'screen',
      assn: 'Assn_screen_to_infoType_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42',
      kind: 'multiple'
    },
    description: {
      type: 'Description',
      parent: 'app',
      assn: 'Assn_app_to_description_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42',
      kind: 'multiple'
    }
  }
}

module.exports = {
  relationships
}
