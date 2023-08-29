const noEmailData = {
  password: 'asdffdsa'
}

const noPasswordData = {
  email: 'xablau@xablau.xablau'
}

const goodData = {
  email: 'xablau@xablau.xablau',
  password: 'asdffdsa'
}

const completeData = {
  ...goodData,
  username: 'xablau',
  role: 'mito',
}

export {
  noEmailData,
  noPasswordData,
  goodData,
  completeData
}