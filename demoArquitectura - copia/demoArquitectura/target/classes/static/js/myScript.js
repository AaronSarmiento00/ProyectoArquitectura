$("document").ready(function () {
    getProducts();
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
        type: method, // Usa PUT o POST según el caso
        contentType: 'application/json',
        success: function (response) {
            console.log("Producto guardado/actualizado con éxito:", response);
            clearForm();
            getProducts();
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


function searchProducts() {
    let searchName = $("#search-name").val();
    $.ajax({
        dataType: 'json',
        url: "/api/product/search?name=" + searchName,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
            displayProducts(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error al buscar productos: " + errorThrown);
        }
    });
}

function deleteProduct(id) {
    $.ajax({
        url: "/api/product/delete/" + id,
        type: 'DELETE',
        success: function () {
            console.log("Producto eliminado con éxito.");
            getProducts();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error al eliminar el producto: " + errorThrown);
        }
    });
}

function editProduct(id) {
    $.ajax({
        dataType: 'json',
        url: "/api/product/" + id,
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
            console.error("Error al obtener el producto para edición: " + errorThrown);
        }
    });
}


function displayProducts(products) {
    let m = "<table><tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Precio</th><th>Acciones</th></tr>";
    for (let i = 0; i < products.length; i++) {
        m += "<tr><td>" + products[i].id + "</td><td>" + products[i].name + "</td><td>" + products[i].description + "</td><td>$" + products[i].price + "</td><td><button onclick='editProduct(" + products[i].id + ")'>Editar</button> <button onclick='deleteProduct(" + products[i].id + ")'>Eliminar</button></td></tr>";
    }
    m += "</table>";
    $("#resultados").html(m);
}




function clearForm() {
    $("#product-id").val("");
    $("#product-name").val("");
    $("#product-desc").val("");
    $("#product-price").val("");
    getProducts();
}
