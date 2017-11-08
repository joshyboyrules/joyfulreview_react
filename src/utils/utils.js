export function convertHtmlToString (html) {
  return html.replace(/<(?:.|\n)*?>/gm, '')
}

export const actions = {
  convertHtmlToString
}

export default actions
