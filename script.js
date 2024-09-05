let totalAmount = '';
let menShares = 1;
let womenShares = 1;
const EcartIndex = 16.5;

function appendNumber(number) {
    if (totalAmount.includes('.') && totalAmount.split('.')[1].length >= 2) return;
    totalAmount += number;
    updateDisplay();
}

function appendDot() {
    if (!totalAmount.includes('.')) {
        totalAmount += '.';
        updateDisplay();
    }
}

function updateDisplay() {
    document.getElementById('totalAmount').textContent = totalAmount || '0';
    document.getElementById('displayText').textContent = 'Montant total en €';
}

function resetCalc() {
    totalAmount = '';
    menShares = 1;
    womenShares = 1;
    document.getElementById('menShares').textContent = '1♂';
    document.getElementById('womenShares').textContent = '1♀';
    document.getElementById('display').innerHTML = `
        <div id="displayText">Montant total en €</div>
        <div id="totalAmount" class="amount">0</div>
    `;
}

function incrementShares(gender) {
    if (gender === 'men' && menShares < 9) {
        menShares++;
        document.getElementById('menShares').textContent = menShares + '♂';
    }
    if (gender === 'women' && womenShares < 9) {
        womenShares++;
        document.getElementById('womenShares').textContent = womenShares + '♀';
    }
}

function decrementShares(gender) {
    if (gender === 'men' && menShares > 1) {
        menShares--;
        document.getElementById('menShares').textContent = menShares + '♂';
    }
    if (gender === 'women' && womenShares > 1) {
        womenShares--;
        document.getElementById('womenShares').textContent = womenShares + '♀';
    }
}

function calculate() {
    const total = parseFloat(totalAmount);
    if (isNaN(total)) return;

    const totalShares = menShares + womenShares;
    const menTotal = total * (menShares / totalShares) * (1 + EcartIndex / 100);
    const womenTotal = total - menTotal;

    document.getElementById('display').innerHTML = `
        <div class="result-text">Montant homme en €</div>
        <div class="result-amount">${menTotal.toFixed(2)}</div>
        <div class="result-text">Montant femme en €</div>
        <div class="result-amount">${womenTotal.toFixed(2)}</div>
    `;
}