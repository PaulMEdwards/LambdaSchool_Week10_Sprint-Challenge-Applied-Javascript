// STEP 3: Create Article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a component for each 'article' in the list.
// This won't be as easy as just iterating over an array though.
// Create a function that will programmatically create the following DOM component:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {authors name}</span>
//   </div>
// </div>
//
// Create a card for each of the articles and add the card to the DOM.

const cards = document.querySelector('.cards-container');

const articleData = fetchData('https://lambda-times-backend.herokuapp.com/articles');
console.log("articleData:");
console.log(articleData);

appendArticles(cards, articleData);

async function fetchData(remoteDataSourceUri) {
  return await axios.get(remoteDataSourceUri);
}

function appendArticles(target, data) {
  data.then(r => {
    Object.keys(r.data.articles).forEach(category => {
      r.data.articles[category].forEach(article => {
        target.appendChild(Article(article, category));
      });
    });
  })
  .catch(e => {
    console.log(e);
  });
}

function Article(article, category) {
  // Create Elements
  const card = document.createElement('div');
    const cat = document.createElement('div');
    const headline = document.createElement('div');
    const author = document.createElement('div');
      const imgContainer = document.createElement('div');
        const image = document.createElement('img');
      const name = document.createElement('span');

  // Set content
  cat.textContent = category;
  headline.textContent = article.headline;
    image.setAttribute('src',article.authorPhoto);
    name.textContent = article.authorName;

  // Create Structure
  card.appendChild(cat);
  card.appendChild(headline);
  card.appendChild(author);
    author.appendChild(imgContainer);
      imgContainer.appendChild(image);
    author.appendChild(name);

  // Apply styles
  card.classList.add('card');
    cat.classList.add('category');
    headline.classList.add('headline');
    author.classList.add('author');
      imgContainer.classList.add('img-container');

  return card;
}