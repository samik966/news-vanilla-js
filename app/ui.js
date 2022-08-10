export default class UI {
  set defaultSelectOption (text) {
    this.defaultSelect = text
  }

  get defaultSelectOption () {
    return this.defaultSelect
  }

  _ (q) {
    return document.querySelector(q)
  }

  create (el) {
    const node = document.createElement(el)
    return node
  }

  createOptions (data, select, cb) {
    const defaultOption = this.create('option')
    defaultOption.textContent = this.defaultSelect
    defaultOption.value = 'in'
    this._(select).appendChild(defaultOption)
    data.forEach(opt => {
      const { text, value } = cb(opt)
      const option = this.create('option')
      option.value = value
      option.textContent = text
      option.selected = value === defaultOption.value
      this._(select).appendChild(option)
    })
  }

  createCard (data, parent, cb) {
    this._(parent).innerHTML = ''
    const cardTemplate = `
      <article class='card shadow-sm'>
        <div class="card-image-container">
          <img src='%image%' alt='%title%' />
        </div>
        <div class="card-content">
          <h4 class='p-2'>%title%</h4>
        </div>
      </article>
    `
    data.forEach(content => {
      const { title, image } = cb(content)
      const obj = {
        '%title%': title,
        '%image%': image
      }
      const card = cardTemplate.replace(/%title%|%image%/gi, s => obj[s])
      this._(parent).innerHTML += card
    })
  }
}
