const mainArticleContainer = document.querySelector('.articles__big-column')
const smallArticleContainer = document.querySelector('.articles__small-column')

function createMainArticle(data, item) {
  const template = document.createElement('template')
  const category = data.categories.find(c => c.id === item.category_id).name
  const source = data.sources.find(s => s.id === item.source_id).name

  template.innerHTML = `
    <article class="main-article">
      <div class="main-article__image-container">
        <img alt="Фото новости" class="main-article__image" src="${item.image}">
      </div>
      <div class="main-article__content">
        <span class="article-category main-article__category">${category}</span>
        <h2 class="main-article__title">${item.title}</h2>
        <p class="main-article__text">${item.description}</p>
        <span class="article-source main-article__source">${source}</span>
      </div>
    </article>
  `

  return template
}

function createSmallArticle(data, item) {
  const template = document.createElement('template')
  const date = new Date(item.date).toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' })
  const source = data.sources.find(s => s.id === item.source_id).name

  template.innerHTML = `
    <article class="small-article">
      <h2 class="small-article__title">${item.title}</h2>
      <div class="small-article__info">
        <span class="article-date small-article__date">${date}</span>
        <span class="article-source small-article__source">${source}</span>
      </div>
    </article>
  `

  return template
}

function renderNews(categoryId) {
  fetch('https://frontend.karpovcourses.net/api/v2/ru/news/' + (categoryId ? categoryId : ''))
    .then(res => res.json())
    .then(data => {
      const mainArticles = data.items.slice(0, 3)
      const smallArticles = data.items.slice(3, 12)

      mainArticles.forEach(item => mainArticleContainer.appendChild(createMainArticle(data, item).content))
      smallArticles.forEach(item => smallArticleContainer.appendChild(createSmallArticle(data, item).content))
    })
    .catch(err => console.log(err))
}