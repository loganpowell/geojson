let makeMappable = (arg) => {
	let mappable = []
	if (Array.isArray(arg) !== true){
	  mappable = [arg]
  } else {
    mappable = [...arg]
  }
	return mappable // returns the args packed into an array
}

// makeMappable(01) /*?*/

module.exports = makeMappable
