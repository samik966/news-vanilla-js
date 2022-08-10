import App from './app.js'
import UI from './ui.js'
import { uiSelectors } from './selectors.js'
import { cardItemExtractor, isEmpty, optionsExtractor } from '../utils/helper.js'

function initApp () {
  let app, ui
  if (isEmpty(app)) {
    app = new App()
    ui = new UI()
    ui.defaultSelectOption = 'Select Country'
    const { filterSelect, searchForm, newsSection } = uiSelectors
    ui._(filterSelect).addEventListener('change', (e) => app.handleFilter(e, (data) => ui.createCard(data, newsSection, cardItemExtractor)))
    ui._(searchForm).addEventListener('submit', (e) => app.handleSearch(e, (data) => ui.createCard(data, newsSection, cardItemExtractor)))
  }
  return { app, ui }
}

async function loadContent (app, ui) {
  const { filterSelect, newsSection } = uiSelectors
  await app.loadNews()
  ui.createOptions(app.countryList, filterSelect, optionsExtractor)
  ui.createCard(app.searchResults, newsSection, cardItemExtractor)
}

window.onload = () => {
  const { app, ui } = initApp()
  loadContent(app, ui)
}
