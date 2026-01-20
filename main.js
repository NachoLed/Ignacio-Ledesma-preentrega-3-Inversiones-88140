const arrShares = [
    { ticker: "TSLA", empresa: "Tesla, Inc.", precio: 182.45 },
    { ticker: "NVDIA", empresa: "NVIDIA Corp.", precio: 875.20 },
    { ticker: "RGTI", empresa: "Rigetti Computing", precio: 1.12 },
    { ticker: "YPFD", empresa: "YPF Sociedad Anonima", precio: 24.15 },
    { ticker: "MELI", empresa: "Mercado Libre", precio: 1542.00 },
    { ticker: "SATL", empresa: "Satellogic Inc.", precio: 1.45 },
    { ticker: "AAPL", empresa: "Apple Inc.", precio: 172.10 },
    { ticker: "AMZN", empresa: "Amazon.com, Inc.", precio: 178.22 },
    { ticker: "GOOGL", empresa: "Alphabet Inc.", precio: 154.85 }
];

let cartera = {};
let cliente = "";
let operacionActual = { ticker: "", esCompra: true };

const modalLogin = document.getElementById('modal-login');
const modalOperacion = document.getElementById('modal-operacion');


window.onload = () => {
    modalLogin.showModal();
};

function iniciarSesion() {
    const input = document.getElementById('input-usuario');
    if (input.value.trim()) {
        cliente = input.value;
        document.getElementById('display-cliente').innerText = `Hola ${cliente}!`;
        modalLogin.close();
        renderMarket();
    }
}

function renderMarket() {
    const grid = document.getElementById("market-grid");
    grid.innerHTML = "";
    arrShares.forEach(stock => {
        const card = document.createElement("article");
        card.className = "stock-card";
        card.innerHTML = `  <span class="ticker-name">${stock.ticker}</span>
                            <span class="comp-name">${stock.empresa}</span>
                            <div class="stock-price">$${stock.precio.toFixed(2)}</div>
                            <div class="btn-group">
                                <button class="btn-buy" onclick="abrirModalOperar('${stock.ticker}', true)">Comprar</button>
                                <button class="btn-sell" onclick="abrirModalOperar('${stock.ticker}', false)">Vender</button>
                            </div>`;
        grid.appendChild(card);
    });
}

function abrirModalOperar(ticker, esCompra) {
    operacionActual = { ticker, esCompra };
    document.getElementById('modal-titulo').innerText = `${esCompra ? 'Comprar' : 'Vender'} ${ticker}`;
    document.getElementById('error-msg').innerText = "";
    document.getElementById('input-cantidad').value = "";
    document.getElementById('btn-confirmar').onclick = ejecutarOperacion;
    modalOperacion.showModal();
}

function ejecutarOperacion() {
    const cantidad = parseInt(document.getElementById('input-cantidad').value);
    const { ticker, esCompra } = operacionActual;
    const errorDisplay = document.getElementById('error-msg');

    if (isNaN(cantidad) || cantidad <= 0) {
        errorDisplay.innerText = "Ingresa una cantidad válida";
        return;
    }

    const cantActual = cartera[ticker] || 0;

    if (esCompra) {
        cartera[ticker] = cantActual + cantidad;
    } else {
        if (cantidad > cantActual) {
            errorDisplay.innerText = "No tienes nominales suficientes";
            return;
        }
        cartera[ticker] = cantActual - cantidad;
    }

    modalOperacion.close();
    renderCartera();
}

function cerrarModales() {
    modalOperacion.close();
}

function renderCartera() {
    const display = document.getElementById("portfolio-display");
    display.innerHTML = "";
    const activos = Object.keys(cartera).filter(t => cartera[t] > 0);
    
    if (activos.length === 0) {
        display.innerHTML = '<p class="empty-msg">Tu cartera está vacía</p>';
        return;
    }

    activos.forEach(ticker => {
        const item = document.createElement("div");
        item.style.display = "flex";
        item.style.justifyContent = "space-between";
        item.style.padding = "5px 0";
        item.innerHTML = `<span>${ticker}</span> <strong>${cartera[ticker]}</strong>`;
        display.appendChild(item);
    });
}