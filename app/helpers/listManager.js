const ListManager = {
  addElement (list, el) {
    try {
      if (list.indexOf(el) < 1) {
        list.push(el)
        return this
      }
      throw new Error(`Given element to add in list already exists in list.`)
    } catch (error) {
      console.log(error)
    }
  },
  removeElement (list, el) {
    try {
      const index = list.indexOf(el)
      if (index !== null) {
        list.splice(index)
        return this
      }
      throw new Error(`Given element to remove from list does not exist.`)
    } catch (error) {
      console.log(error)
    }
  },
  getElementInList (list, el) {
    try {
      const index = list.indexOf(el)
      if (index !== null) {
        return list.index
      }
      throw new Error(`Given element to show from list does not exist.`)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = ListManager
