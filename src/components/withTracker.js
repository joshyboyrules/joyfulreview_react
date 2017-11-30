import GoogleAnalytics from 'react-ga'

GoogleAnalytics.initialize('UA-110471359-1')

export const trackPage = (page) => {
  console.log('track page', page)
  GoogleAnalytics.set({ page })
  GoogleAnalytics.pageview(page)
}

const actions = {
  trackPage
}

export default actions
