$("document").ready(function () {
    getProducts();
    loadActionHistory(); // Cargar el historial de acciones al cargar la página
});

function saveOrUpdateProduct() {
    let productId = $("#product-id").val();
    let nombre = $("#product-name").val();
    let desc = $("#product-desc").val();
    let price = $("#product-price").val();

    let data = {
        id: productId,
        name: nombre,
        description: desc,
        price: price
    };

    let url = productId ? "/api/product/update" : "/api/product/save";
    let method = productId ? "PUT" : "POST"; // Usa PUT para actualizar, POST para guardar

    $.ajax({
        dataType: 'json',
        data: JSON.stringify(data),
        url: url,
        type: method,
        contentType: 'application/json',
        success: function (response) {
            console.log("Producto guardado/actualizado con éxito:", response);
            clearForm();
            getProducts();

            // Agregar la acción al historial
            logActionToHistory(productId ? 'Producto actualizado' : 'Producto creado', response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error al guardar/actualizar el producto:", errorThrown);
        }
    });
}

function getProducts() {
    $.ajax({
        dataType: 'json',
        url: "/api/product/all",
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            console.log("Productos obtenidos con éxito:", response);
            displayProducts(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error al obtener los productos:", errorThrown);
        }
    });
}

function displayProducts(products) {
    let m = "<table><tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Precio</th><th>Acciones</th></tr>";
    for (let i = 0; i < products.length; i++) {
        m += `<tr><td>${products[i].id}</td><td>${products[i].name}</td><td>${products[i].description}</td><td>$${products[i].price}</td><td><button onclick='editProduct(${products[i].id})'>Editar</button> <button onclick='deleteProduct(${products[i].id})'>Eliminar</button></td></tr>`;
    }
    m += "</table>";
    $("#resultados").html(m);
}

function editProduct(id) {
    $.ajax({
        dataType: 'json',
        url: `/api/product/${id}`,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            $("#product-id").val(response.id);
            $("#product-name").val(response.name);
            $("#product-desc").val(response.description);
            $("#product-price").val(response.price);

            // Cambia el comportamiento del botón "Guardar" para actualizar el producto
            $("#product-save-button").text("Actualizar").off("click").on("click", function () {
                saveOrUpdateProduct(id); // Llama a saveOrUpdateProduct con el ID del producto
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(`Error al obtener el producto para edición: ${errorThrown}`);
        }
    });
}

function deleteProduct(id) {
    $.ajax({
        url: `/api/product/delete/${id}`,
        type: 'DELETE',
        success: function () {
            console.log("Producto eliminado con éxito.");
            getProducts();

            // Agregar la acción al historial
            const deletedProduct = { id: id }; // Crear un objeto de producto con el ID
            logActionToHistory('Producto eliminado', deletedProduct);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(`Error al eliminar el producto: ${errorThrown}`);
        }
    });
}

function searchProducts() {
    let searchName = $("#search-name").val();
    $.ajax({
        dataType: 'json',
        url: `/api/product/search?name=${searchName}`,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
            displayProducts(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(`Error al buscar productos: ${errorThrown}`);
        }
    });
}

function clearForm() {
    $("#product-id").val("");
    $("#product-name").val("");
    $("#product-desc").val("");
    $("#product-price").val("");
    getProducts();
}

// Historial de acciones
function updateHistory(action) {
    const historyList = document.getElementById('history-list');
    const li = document.createElement('li');
    li.textContent = action;
    historyList.appendChild(li);
}

function clearHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';  // Limpiar la lista de historial
}

function logActionToHistory(action, product) {
    const actionMessage = `${action} ----> ${getProductInfo(product)}`;
    updateHistory(actionMessage);

    // Llamada para registrar la acción en el backend
    registerAction(actionMessage);
}

function getProductInfo(product) {
    return `Producto: (ID: ${product.id}, Nombre: ${product.name}, Descripción: ${product.description}, Precio: $${product.price})`;
}

function registerAction(action) {
    $.ajax({
        dataType: 'json',
        data: JSON.stringify({ action: action }),
        url: "/api/product/log",
        type: 'POST',
        contentType: 'application/json',
        success: function (response) {
            console.log("Acción registrada con éxito:", response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error al registrar la acción:", errorThrown);
        }
    });
}
