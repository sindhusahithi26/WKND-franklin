export default async function decorate(block) {
    console.log('Decorate function called');
    
    console.log('Block:', block);
    
    const articleListBlock = document.querySelector('.article-list.block');
    console.log('Article list block:', articleListBlock);

    if (!articleListBlock) {
        console.error('Article list block not found');
        return;
    }

    try {
        const formURL = block.querySelector('a[href$=".json"]');

        const response = await fetch(formURL.href);
        const jsonData = await response.json();
        console.log('Fetched JSON data:', jsonData); 

        // Extract data
        const magazineData = jsonData.data.filter(item => item.path.startsWith('/magazine/') && item.path !== '/magazine/');
        console.log('Filtered magazine data:', magazineData); 

        if (!Array.isArray(magazineData)) {
            throw new Error('Expected an array in the JSON data but found something else');
        }

        // Function to format Unix timestamp to readable date
        const formatDate = (timestamp) => {
            const date = new Date(timestamp * 1000); 
            const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
            return date.toLocaleDateString('en-US', options).toUpperCase();
        };

        // Create list items
        const listItems = magazineData.map(item => {
            const title = item.title.toUpperCase();
            const lastModified = formatDate(item.lastModified);
            return `
                <li>
                    <a href="${item.path}" title="${title}">${title}</a>
                    <div class="last-modified">${lastModified}</div>
                </li>`;
        }).join('');

        // Inject list items into the block
        articleListBlock.innerHTML = `<ul>${listItems}</ul>`;
    } catch (error) {
        console.error('Failed to fetch or process JSON data:', error);
    }
}
