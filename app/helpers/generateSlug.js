const slugify = require('slugify')

const GenerateSlug = function (title) {
  try{
    if (typeof title === 'string') {
      return slugify(title.replace(/[!@#$%^&*(),.?":{}|<>]/g, '')).toLowerCase()    
    }
    throw 'Exception: there is no any argument given to GenerateSlug function.'
  } catch (error){
    console.error(error)

  }
}

module.exports = GenerateSlug
