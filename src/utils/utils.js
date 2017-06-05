export function htmlDecode (html) {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

export const actions = {
  htmlDecode
}

export default actions
