const assertType = {

  checkString: function (param, paramName) {
    try {
      if (typeof param === 'string') {
        return param
      }
      new Error(`${paramName} given is not a string.`)
    } catch (error) {
      console.error(error)
    }
  },

  checkNumber: function (param, paramName) {
    try {
      if (typeof param === 'number') {
        return param
      }
      new Error(`${paramName} given is not a number.`)
    } catch (error) {
      console.error(error)
    }
  },

  checkBoolean: function (param, paramName) {
    try {
      if (typeof param === 'boolean') {
        return param
      }
      new Error(`${paramName} given is not a boolean.`)
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = assertType
