let storage = {}

storage.source = window.localStorage
storage.defaultExp = 30

storage.set = function(key, val, exp) {
  let source = this.source
  source[key] = JSON.stringify(val)
  if (exp) {
    source[`${key}__expires__`] = Date.now() + 1000*60*exp
  } else {
    source[`${key}__expires__`] = Date.now() + 1000*60*this.defaultExp
  }

  return val
}

storage.get = function(key) {
  let source = this.source
  let exp = source[`${key}__expires__`] || (Date.now + 1)
  let now = Date.now()

  if (now >= exp) {
    this.remove(key)
    return
  }

  return source[key] ? JSON.parse(source[key]) : source[key]
}

storage.remove = function(key) {
  let source = this.source
  delete source[key]
  delete source[`${key}__expires__`]
}

export default storage