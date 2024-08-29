export default function decorate(block){
    const horizontalLine = document.createElement('hr');
    horizontalLine.classList.add('border-line');
    block.querySelector('div').parentElement.prepend(horizontalLine);
}


