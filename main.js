const msgBienvenida = "Bienvenido Palmera Capital 🌴";
const arrMenu = ['1 - Comprar \n', '2 - Vender \n', '3 - Ver Cartera \n', '4 - Salir \n'];
const arrShares = ["TSLA", "NVDIA", "RGTI", "YPFD", "MELI", "SATL"];
const msgCompra = "Ingresá el ticker de la accion que quieras comprar:";
const msgCliente = "Ingresa tu nombre: ";

alert(msgBienvenida);

let Cliente = prompt(msgCliente);
let cartera = {}; 

if (Cliente) { 
    let opcion = 0; 
    
    while (opcion !== 4) {
                
        opcion = Menu(opcion);
        
        switch (opcion) {
            case 1:                
                CompraVenta(cartera, true);
                break;
            case 2:                
                CompraVenta(cartera, false); 
                break;
            case 3:                
                VerCartera(cartera);
                break;
            case 4:                
                if (!confirm("Realmente desea salir?")) {
                    opcion = 0;
                }
                break;
        }
    }
    alert(`${Cliente}, Gracias por operar con Palmera Capital🌴`);

}


function Menu() {
    let opcion;
    let mensajeMenu = `Que deseas hacer ${Cliente}?\n ${arrMenu.join('')}`;

    do {
        opcion = Number(prompt(mensajeMenu));        
        if (opcion < 1 || opcion > 4 || isNaN(opcion)) {
            alert("Opcion incorrecta, ingresa un número entre 1 y 4.");
            opcion = undefined;
        }
    } while (opcion === undefined);
    
    return opcion;
}

function VerCartera(cartera) {
    let mensaje = `Cartera Actual de ${Cliente} \n`;
    let accionesEnCartera = 0;

    const tickers = Object.keys(cartera);
    
    for (const ticker of tickers) {
        const cantidad = cartera[ticker];

        if (cantidad > 0) { 
            mensaje += `${ticker}: ${cantidad} nominales\n`;
            accionesEnCartera++;
        }
    }

    if (accionesEnCartera === 0) {
        alert("Tu cartera está vacía.");
    } else {
        alert(mensaje);
    }
}

function CompraVenta(cartera, compra) {
    let operacion = compra ? "comprar" : "vender";
    let ticker;

    
    do {        
        ticker = prompt(`OPERACIÓN: ${operacion.toUpperCase()}\nIngresá el Ticker (${arrShares.join(', ')}):`);
        
        if (!ticker) 
            return cartera; 

        ticker = ticker.toUpperCase(); 

    } while (!arrShares.includes(ticker));

    const cantNominales = parseInt(prompt(`Cuantas acciones de ${ticker} deseas ${operacion}?`));

    if (isNaN(cantNominales) || cantNominales <= 0) {
        alert("❌ Cantidad inválida. Operación cancelada.");
        return cartera;
    }
    

    if (compra) {
        const cantActual = cartera[ticker] || 0; 
        const nuevaCantidad = cantActual + cantNominales;

        cartera[ticker] = nuevaCantidad;

        alert(`✅ ¡COMPRA exitosa! Total de ${ticker}: ${nuevaCantidad}.`);
    } else {        
            const cantActual = cartera[ticker] || 0;

            if (cantActual < cantNominales) {
                alert(`❌ VENTA CANCELADA: Solo tienes ${cantActual} nominales de ${ticker}. No puedes vender ${cantNominales}.`);
            } else {
                const nuevaCantidad = cantActual - cantNominales;
                cartera[ticker] = nuevaCantidad;
                alert(`✅ ¡VENTA exitosa! Vendiste ${cantNominales}. Total restante de ${ticker}: ${nuevaCantidad}.`);
            }
    }

    return cartera;
}