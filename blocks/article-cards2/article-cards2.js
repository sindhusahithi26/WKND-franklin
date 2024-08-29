export async function decorate(block) {
   
    const articlesURL = block.querySelector('a[href*=".json"]');

    if (articlesURL) {
        try {
            
            const response = await fetch(articlesURL.href);
            const articlesData = await response.json();

           
            block.innerHTML = '';

           
            function createArticleCards(data) {
                const articleContainer = document.createElement('div');
                articleContainer.classList.add('article-container');

                data.forEach(article => {
                    
                    const articleCard = document.createElement('div');
                    articleCard.classList.add('article-card');

                   
                    const imageLink = document.createElement('a');
                    imageLink.setAttribute('href', article.path);

                   
                    const image = document.createElement('img');
                    image.setAttribute('src', article.image);
                    image.setAttribute('alt', article.title);
                    imageLink.appendChild(image);

                    
                    articleCard.appendChild(imageLink);

                    
                    const title = document.createElement('h3');
                    title.textContent = article.title;
                    articleCard.appendChild(title);

                   
                    const description = document.createElement('p');
                    description.textContent = article.description;
                    articleCard.appendChild(description);

                   
                    articleContainer.appendChild(articleCard);
                });

               
                block.appendChild(articleContainer);
            }

            
            createArticleCards(articlesData.data);
        } catch (error) {
            console.error('Error fetching or parsing JSON:', error);
        }
    } else {
        console.error('No JSON URL found in the block');
    }
}

export default decorate;
