export async function decorate(block) {
  
    const formURL = block.querySelector('a[href$=".json"]');

    if (formURL) {
        try {
           
            const response = await fetch(formURL.href);
            const formData = await response.json();

          
            block.innerHTML = '';

           
            function createForm(data) {
                const formElement = document.createElement('form');

                data.forEach(field => {
                    const fieldWrapper = document.createElement('div');
                    
                 
                    if (field.Type === 'plaintext') {
                        const plainText = document.createElement('p');
                        plainText.textContent = field.Label;
                        fieldWrapper.appendChild(plainText);
                    } else {
                  

                        if (field.Type !== 'submit') {
                            // Create label
                            const label = document.createElement('label');
                            label.setAttribute('for', field.Field);
                            label.textContent = field.Label;
                            fieldWrapper.appendChild(label);
                        }

                        // Create input/checkbox/submit based on type
                        const input = document.createElement('input');
                        input.setAttribute('type', field.Type);
                        input.setAttribute('name', field.Field);
                        input.setAttribute('id', field.Field);
                        if (field.Placeholder) {
                            input.setAttribute('placeholder', field.Placeholder);
                        }
                        if (field.Type === 'submit') {
                            input.setAttribute('value', field.Label);
                        }
                        fieldWrapper.appendChild(input);
                    }

                    formElement.appendChild(fieldWrapper);
                });

              
                block.appendChild(formElement);
            }

          
            createForm(formData.data);
        } catch (error) {
            console.error('Error fetching or parsing JSON:', error);
        }
    } else {
        console.error('No JSON URL found in the block');
    }
}
export default decorate;