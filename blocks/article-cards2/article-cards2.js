export async function decorate(block) {
    // Find the first <a> element with an href that contains ".json"
    const articlesURL = block.querySelector('a[href*=".json"]');

    if (articlesURL) {
        try {
            // Fetch the JSON data from the provided URL
            const response = await fetch(articlesURL.href);
            const articlesData = await response.json();

            // Clear the block content
            block.innerHTML = '';

            // Function to create the article cards dynamically
            function createArticleCards(data) {
                const articleContainer = document.createElement('div');
                articleContainer.classList.add('article-container');

                data.forEach(article => {
                    // Create a wrapper for each article
                    const articleCard = document.createElement('div');
                    articleCard.classList.add('article-card');

                    // Link wrapper for the image
                    const imageLink = document.createElement('a');
                    imageLink.setAttribute('href', article.path);

                    // Image
                    const image = document.createElement('img');
                    image.setAttribute('src', article.image);
                    image.setAttribute('alt', article.title);
                    imageLink.appendChild(image); // Add image inside the link

                    // Append the link (with the image) to the article card
                    articleCard.appendChild(imageLink);

                    // Title
                    const title = document.createElement('h3');
                    title.textContent = article.title;
                    articleCard.appendChild(title);

                    // Description
                    const description = document.createElement('p');
                    description.textContent = article.description;
                    articleCard.appendChild(description);

                    // Append the card to the container
                    articleContainer.appendChild(articleCard);
                });

                // Append the container to the block
                block.appendChild(articleContainer);
            }

            // Create the article cards using the fetched JSON data
            createArticleCards(articlesData.data);
        } catch (error) {
            console.error('Error fetching or parsing JSON:', error);
        }
    } else {
        console.error('No JSON URL found in the block');
    }
}

export default decorate;
