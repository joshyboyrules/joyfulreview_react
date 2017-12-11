import keyBy from 'lodash/keyBy'
import ReactDOMServer from 'react-dom/server'
import toLower from 'lodash/toLower'

import article5 from './5_freezing_credit'
import article4 from './4_men_body_hair'
import article3 from './3_zojirushi'
import article2 from './2_protein_bar'
import article1 from './1_phone_2017'

const articles = [
  article5,
  article4,
  article3,
  article2,
  article1
]

articles.forEach(article => {
  article.stringifyContent = toLower(ReactDOMServer.renderToStaticMarkup(article.content).replace(/(<([^>]+)>)/ig, ''))
})

export default keyBy(articles, 'id')
