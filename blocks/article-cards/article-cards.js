
import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  
  /* Change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';
      }
    });
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => 
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])
    )
  );

  block.textContent = '';
  block.append(ul);

  /* Add horizontal line as the last child of the last .default-content-wrapper */
  const defaultContentWrappers = document.querySelectorAll('.section.article-cards-container .default-content-wrapper');
  const lastWrapper = defaultContentWrappers[defaultContentWrappers.length - 1];
 

  if (lastWrapper && !lastWrapper.querySelector('hr')) {
    const horizontalLine = document.createElement('hr');
    horizontalLine.classList.add('border-line');
    lastWrapper.appendChild(horizontalLine);
  }
};
