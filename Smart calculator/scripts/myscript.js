// Initialize variables
let displayValue = ''; // Variable to store the display value
let isAlphabetMode = false; // Default mode is numeric

// Define the alphabet-to-number mapping
const alphabetMapping = {
    '1': ['1', 'a', 'b', 'c'],
    '2': ['2', 'd', 'e', 'f'],
    '3': ['3', 'g', 'h', 'i'],
    '4': ['4', 'j', 'k', 'l'],
    '5': ['5', 'm', 'n', 'o'],
    '6': ['6', 'p', 'q', 'r'],
    '7': ['7', 's', 't', 'u'],
    '8': ['8', 'v', 'w', 'x'],
    '9': ['9', 'y', 'z', ''],
    '0': ['0'],
};

// Function to toggle between number and alphabet mode
function toggleMode() {
    isAlphabetMode = !isAlphabetMode; // Toggle the mode
    const buttons = document.querySelectorAll('.button.p'); // Select all buttons
    buttons.forEach(button => {
        const number = button.getAttribute('data-number'); // Get the button's data-number attribute
        const mapping = alphabetMapping[number]; // Retrieve the mapping for the current button
        if (mapping && mapping.length > 1) {
            const letters = mapping.slice(1).join(''); // Extract the alphabet letters
            const newText = isAlphabetMode ? letters.toUpperCase() : number; // Determine the new button text
            alphabetMapping[number][0] = 0; // Reset the index to 0 when toggling to alphabet mode
            button.innerHTML = `<div class="number">${newText}</div>`; // Update the button content
        }
    });

    // Update the ABC/123 button text
    const abcButton = document.querySelector('.shift-btn');
    abcButton.textContent = isAlphabetMode ? '123' : 'abc';
}


// Function to handle input events
function appendInput(input) {
    // Ensure the display element exists
    const displayElement = document.getElementById('display');
    if (!displayElement) return; // Exit if the display element is not found

    if (input === ' ') {
        displayValue += isAlphabetMode ? ' ' : '.';
    } else if (input === '123' || input === 'abc') {
        toggleMode(); // Call toggleMode to handle the mode switch
    } else if (isAlphabetMode) {
        const mapping = alphabetMapping[input];
        if (!mapping || mapping.length <= 1) return; // Ignore invalid inputs in alphabet mode

        // Ensure the index is within the valid range
        const letterIndex = mapping[0] >= 1 && mapping[0] < mapping.length ? mapping[0] : 1;
        const letter = mapping[letterIndex];
        displayValue += letter;

        // Increment the index circularly within the valid range
        alphabetMapping[input][0] = (letterIndex + 1) % mapping.length;
    } else {
        if (/[+\-*/]/.test(input)) {
            const lastChar = displayValue.slice(-1);
            if (/[/\/*\-+%]/.test(lastChar)) {
                displayValue = displayValue.slice(0, -1) + input;
            } else {
                displayValue += input;
            }
        } else {
            displayValue += input;
        }
    }

    // Update the display value
    displayElement.value = displayValue;
}


// Function to update button labels based on mode
function updateButtonLabels() {
    const buttons = document.querySelectorAll('.button.p');
    buttons.forEach(button => {
        const number = button.getAttribute('data-number');
        const mapping = alphabetMapping[number];
        if (mapping && mapping.length > 1) {
            const letters = mapping.slice(1).join('');
            const newText = isAlphabetMode ? letters.toUpperCase() : number;
            button.innerHTML = `<div class="number">${newText}</div>`;
        }
    });
}

// Function to update mode button text
function updateModeButtonText() {
    const abcButton = document.querySelector('.shift-btn');
    abcButton.textContent = isAlphabetMode ? '123' : 'abc';
}


// Function to handle customer data input and display
function displayCustomerData() {
    const customerDataDiv = document.getElementById('customerData');
    const mobile = document.getElementById('mobile').value;
    const name = document.getElementById('name').value;
    const remarks = document.getElementById('remarks').value;

    if (mobile && name && remarks) {
        personData = {
            mobile: mobile,
            name: name,
            remarks: remarks
        };
        displayValue = `Mobile: ${mobile}, Name: ${name}, Remarks: ${remarks}`;
    } else {
        // If any of the input fields is empty, allow input
        customerDataDiv.style.display = 'block';
        return;
    }

    document.getElementById('display').value = displayValue;
    customerDataDiv.style.display = 'none'; // Hide the customer data input fields after displaying the information
}

// Function to add GST Tax
function addTax() {
    const taxRate = 0.18; // 18% GST tax rate (you can adjust this rate)
    const currentDisplayValue = parseFloat(displayValue);
    const taxAmount = currentDisplayValue * taxRate;
    displayValue = (currentDisplayValue + taxAmount).toFixed(2);
    document.getElementById('display').value = displayValue;
}

// Function to subtract GST Tax
function subtractTax() {
    const taxRate = 0.18; // 18% GST tax rate (you can adjust this rate)
    const currentDisplayValue = parseFloat(displayValue);
    const taxAmount = currentDisplayValue * taxRate;
    displayValue = (currentDisplayValue - taxAmount).toFixed(2);
    document.getElementById('display').value = displayValue;
}

// Function to calculate the grand total (including taxes)
function grandTotal() {
    // Your implementation to calculate the grand total
}

// Function to handle cash transactions (sales and purchases)
function cashTransaction(amount, isSale) {
    if (isSale) {
        displayValue = (parseFloat(displayValue) + amount).toFixed(2);
        recordSale(amount);
    } else {
        displayValue = (parseFloat(displayValue) - amount).toFixed(2);
        recordPurchase(amount);
    }
    document.getElementById('display').value = displayValue;
}

// Function to record a sale in the ledger
function recordSale(amount) {
    // Your implementation to record the sale in the ledger
}

// Function to record a purchase in the ledger
function recordPurchase(amount) {
    // Your implementation to record the purchase in the ledger
}

// Function to handle the "Next" button for navigating through transactions
function nextTransaction() {
    // Your implementation to navigate to the next transaction in the ledger
}

// Function to handle the "Previous" button for navigating through transactions
function previousTransaction() {
    // Your implementation to navigate to the previous transaction in the ledger
}

// Function to calculate the result of the expression
function calculateResult() {
    try {
        // Calculate the result
        const result = calculateExpression(displayValue);
        // Display the result
        displayValue = result.toString();
        document.getElementById('display').value = displayValue;
    } catch (error) {
        // Display error message
        displayValue = 'Error';
        document.getElementById('display').value = displayValue;
    }
}

// Function to clear the display
function allClear() {
    // Clear the display
    displayValue = '';
    document.getElementById('display').value = displayValue;
}

// Function to clear the last entry from the display
function clearEntry() {
    // Clear the last entry from the display
    displayValue = displayValue.slice(0, -1);
    document.getElementById('display').value = displayValue;
}

// Function to calculate the result of the expression
function calculateExpression(expression) {
    // Replace all occurrences of '%' with '/100'
    const replacedExpression = expression.replace(/%/g, '/100');
    // Evaluate the modified expression
    return eval(replacedExpression);
}



// Switch to Customer Data Input
function toggleDisplay() {
    const calculatorSection = document.getElementById('calculator');
    const customerDataSection = document.getElementById('customerData');

    if (calculatorSection.style.display === 'none') {
        calculatorSection.style.display = 'block';
        customerDataSection.style.display = 'none';
        document.getElementById('toggleButton').textContent = 'Switch to Customer Data Input';
    } else {
        calculatorSection.style.display = 'none';
        customerDataSection.style.display = 'block';
        document.getElementById('toggleButton').textContent = 'Switch to Calculator';
    }
}




// keybord support

document.addEventListener('keydown', function(event) {
    // Get the key pressed
    const key = event.key;

    // Check if the pressed key is a number, operator, or special key
    if (/[0-9.+\-*/%]/.test(key)) {
        // If it's a number, operator, or special key, append it to the display
        appendInput(key);
    } else if (key === 'Enter' || key === '=') {
        // If it's the Enter key or the equals sign, calculate the result
        calculateResult();
    } else if (key === 'Backspace') {
        // If it's the Backspace key, clear the last entry
        clearEntry();
    } else if (key === 'Escape') {
        // If it's the Escape key, clear the display
        allClear();
    }
});