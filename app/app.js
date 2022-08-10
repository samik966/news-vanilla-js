import { constants as c } from '../utils/constants.js'
import { countries } from '../utils/countries.js'
import { keyExtractor, sortComparator, useFetch } from '../utils/helper.js'

export default class App {
  #apiKey = c.apiKey
  #countryList = countries.sort((a, b) => sortComparator(a, b, keyExtractor))
  #searchUrl = `${c.searchBaseUrl}?apiKey=${this.#apiKey}&q=`
  #filterUrl = `${c.filterBaseUrl}?apiKey=${this.#apiKey}`

  get countryList () {
    return this.#countryList
  }

  async loadNews (country = 'in') {
    const filterUrl = `${this.#filterUrl}&country=${country}`
    const { articles } = await useFetch(filterUrl)
    this.searchResults = articles
  }

  async handleSearch (e, cb) {
    e.preventDefault()
    const query = e.target.search.value
    const searchUrl = this.#searchUrl + query + '&pageSize=12'
    const { articles } = await useFetch(searchUrl)
    this.searchResults = articles
    cb(this.searchResults)
  }

  async handleFilter (e, cb) {
    const country = e.target.value ?? 'in'
    await this.loadNews(country)
    cb(this.searchResults)
  }
}

// query in everytyhing endpoint
// country only in topheadlines endpoint
