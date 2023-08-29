const noEmailData = {
  password: 'asdffdsa'
}

const noPasswordData = {
  email: 'xablau@xablau.xablau'
}


const data = {
  email: 'xablau@xablau.xablau',
  password: 'asdffdsa'
}

const completeData = {
  ...data,
  username: 'xablau',
  role: 'mito',
}

const payloadData = {
  ...completeData,
  id: 1,
  password: undefined
}

export {
  noEmailData,
  noPasswordData,
  data,
  completeData,
  payloadData
}