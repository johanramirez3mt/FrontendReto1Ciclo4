function cargarInfoCategoria(){
    $.ajax({
        type:"GET",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/Category/all",
        success:function(respuesta){
            console.log(respuesta);
            cargarRespuestaCategoria(respuesta);
        }
    });
}

function cargarRespuestaCategoria(items){
    $("tbody").children().remove()
    var tableBody = $('#tblCategorias tbody');
    var filaTabla = "";
    for (var i=0; i<items.length; i++) {
        filaTabla += "<tr>";
        filaTabla += "<td>"+items[i].id+"</td>";
        filaTabla += "<td>"+items[i].name+"</td>";
        filaTabla += "<td>"+items[i].description+"</td>";
        filaTabla +="<td> <button class='btn btn-primary btn-sm btnSelect' onclick='passEditCategoria()'>Editar</button><button style='margin-left: 10px' class='btn btn-danger btn-sm' onclick='deleteCategoria("+items[i].id+")'>Eliminar</button> </td>";
        filaTabla +="</tr>";
    }
    tableBody.append(filaTabla);
}

function newCategoria(){
    let data={
        // id:$("#id").val(),
        name:$("#name").val(),
        description:$("#description").val(),
    };
    let dataToSend=JSON.stringify(data);
    $.ajax({
        type:"POST",
        contentType: "application/json; charset=utf-8",
        data:dataToSend,
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/Category/save",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#description").val("");
            cargarInfoCategoria();
            alert("Se Guardo Categoria Exitosamente")
        }
    });
}

function passEditCategoria(){
    $("#tblCategorias").on('click','.btnSelect',function(){
        // get the current row
        var currentRow=$(this).closest("tr");
        var col1=currentRow.find("td:eq(0)").text(); // get current row 1st TD value
        var col2=currentRow.find("td:eq(1)").text(); // get current row 2nd TD
        var col3=currentRow.find("td:eq(2)").text(); // get current row 3rd TD
        // var data=col1+"\n"+col2+"\n"+col3+"\n"+col4+"\n"+col5;
        // alert(data);
        $('#id').val(col1);
        $('#name').val(col2);
        $('#description').val(col3);
    });
}

function editCategoria(){
    let data={
        id:$("#id").val(),
        name:$("#name").val(),
        description:$("#description").val(),
    };
    let dataToSend=JSON.stringify(data);
    $.ajax({
        type:"PUT",
        contentType: "application/json; charset=utf-8",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/Category/update",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#description").val("");
            cargarInfoCategoria();
            alert("Se Actualizo Categoría Exitosamente")
        }
    });
}

function deleteCategoria(idElemento){
    let data={
        id:idElemento
    };
    let dataToSend=JSON.stringify(data);
    $.ajax({
        type:"DELETE",
        contentType: "application/json; charset=utf-8",
        data:dataToSend,
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/Category/"+idElemento,
        success:function(respuesta){
            $("#resultado").empty();
            cargarInfoCategoria();
            alert("Se Eliminado Categoría Exitosamente")
        }
    });
}

/* ------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------- */

function cargarInfoBarcos(){
    $.ajax({
        type:"GET",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/Boat/all",
        success:function(respuesta){
            console.log(respuesta);
            cargarRespuestaBarcos(respuesta);
        }
    });
}

function selectCategoria(){
    $.ajax({
        url:"http://150.230.41.201:80/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            respuesta.forEach(function(item){
                var option = document.createElement('option');
                option.value = item.id;
                option.innerHTML = item.name;
                category_id.appendChild(option)
                })
        }
    });
}

function cargarRespuestaBarcos(items){
    $("tbody").children().remove()
    var tableBody = $('#tblBarcos tbody');
    var filaTabla = "";
    for (var i=0; i<items.length; i++) {
        filaTabla += "<tr>";
        filaTabla += "<td>"+items[i].id+"</td>";
        filaTabla += "<td>"+items[i].brand+"</td>";
        filaTabla += "<td>"+items[i].year+"</td>";
        filaTabla +="<td>"+items[i].category.name+"</td>";
        filaTabla +="<td>"+items[i].name+"</td>";
        filaTabla +="<td>"+items[i].description+"</td>";
        filaTabla +="<td style='display:none'>"+items[i].category.id+"</td>";
        filaTabla +="<td> <button class='btn btn-primary btn-sm btnSelect' onclick='passEditBarco()'>Editar</button><button style='margin-left: 10px' class='btn btn-danger btn-sm' onclick='deleteBarco("+items[i].id+")'>Eliminar</button> </td>";
        filaTabla +="</tr>";
    }
    tableBody.append(filaTabla);
}

function newBarco(){
    if($("#category_id").val()){
        let objCategory = {id:$("#category_id").val()};
        let data={
            // id:$("#id").val(),
            brand:$("#brand").val(),
            year:$("#model").val(),
            category:objCategory,
            name:$("#name").val(),
            description:$("#description").val()
        };
        let dataToSend=JSON.stringify(data);
        $.ajax({
            type:"POST",
            contentType: "application/json; charset=utf-8",
            data:dataToSend,
            datatype:"JSON",
            url:"http://150.230.41.201:80/api/Boat/save",
            success:function(respuesta){
                $("#resultado").empty();
                $("#id").val("");
                $("#brand").val("");
                $("#model").val("");
                $("#category_id").val("");
                $("#name").val("");
                $("#description").val("");
                cargarInfoBarcos();
                alert("Se Guardo Barco Exitosamente")
            }
        });
    }else {
        alert("ojo, Debe seleccionar una categoria")
    }
}

function passEditBarco(){
    $("#tblBarcos").on('click','.btnSelect',function(){
        // get the current row
        var currentRow=$(this).closest("tr");
        var col1=currentRow.find("td:eq(0)").text(); // get current row 1st TD value
        var col2=currentRow.find("td:eq(1)").text(); // get current row 2nd TD
        var col3=currentRow.find("td:eq(2)").text(); // get current row 3rd TD
        var col4=currentRow.find("td:eq(6)").text(); // get current row 4rd TD
        var col5=currentRow.find("td:eq(4)").text(); // get current row 4rd TD
        var col6=currentRow.find("td:eq(5)").text();
        // var data=col1+"\n"+col2+"\n"+col3+"\n"+col4+"\n"+col5;
        // alert(data);
        $('#id').val(col1);
        $('#brand').val(col2);
        $('#model').val(col3);
        $('#category_id').val(col4);
        $('#name').val(col5);
        $("#description").val(col6);
    });
}

function editBarco(){
    if($("#category_id").val()){
        let objCategory = {id:$("#category_id").val()};
        let data={
            id:$("#id").val(),
            brand:$("#brand").val(),
            year:$("#model").val(),
            category:objCategory,
            name:$("#name").val(),
            description:$("#description").val()
        };
        let dataToSend=JSON.stringify(data);
        $.ajax({
            type:"PUT",
            contentType: "application/json; charset=utf-8",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            url:"http://150.230.41.201:80/api/Boat/update",
            success:function(respuesta){
                $("#resultado").empty();
                $("#id").val("");
                $("#brand").val("");
                $("#model").val("");
                $("#category_id").val("");
                $("#name").val("");
                $("#description").val("");
                cargarInfoBarcos();
                alert("Se Actualizo Barco Exitosamente")
            }
        });
    }else {
        alert("ojo, Debe seleccionar una categoria")
    }
}

function deleteBarco(idElemento){
    let data={
        id:idElemento
    };
    let dataToSend=JSON.stringify(data);
    $.ajax({
        type:"DELETE",
        contentType: "application/json; charset=utf-8",
        data:dataToSend,
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/Boat/"+idElemento,
        success:function(respuesta){
            $("#resultado").empty();
            cargarInfoBarcos();
            alert("Se Eliminado Barco Exitosamente")
        }
    });
}

/* ------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------- */

function cargarInfoClient(){
    $.ajax({
        type:"GET",
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/Client/all",
        success:function(respuesta){
            console.log(respuesta);
            cargarRespuestaClient(respuesta);
        }

    });
}

function cargarRespuestaClient(items){
    $("tbody").children().remove()
    var tableBody = $('#tblClientes tbody');
    var filaTabla = "";
    for (var i=0; i<items.length; i++) {
        filaTabla += "<tr>";
        filaTabla += "<td>"+items[i].idClient+"</td>";
        filaTabla += "<td>"+items[i].name+"</td>";
        filaTabla += "<td>"+items[i].email+"</td>";
        filaTabla +="<td>"+items[i].age+"</td>";
        filaTabla +="<td>"+items[i].password+"</td>";
        filaTabla +="<td> <button class='btn btn-primary btn-sm btnSelect' onclick='passEditCliente()'>Editar</button><button style='margin-left: 10px' class='btn btn-danger btn-sm' onclick='deleteClient("+items[i].idClient+")'>Eliminar</button> </td>";
        filaTabla +="</tr>";
    }
    tableBody.append(filaTabla);
}

function newClient(){
    let data={
        idClient:$("#id").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val(),
        password:$("#password").val()
    };
    let dataToSend=JSON.stringify(data);
    $.ajax({
        type:"POST",
        contentType: "application/json; charset=utf-8",
        data:dataToSend,
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/Client/save",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#email").val("");
            $("#age").val("");
            $("#password").val("");
            cargarInfoClient();
            alert("Se Agrego Nuevo Cliente Exitosamente")
        }
    });
}

function passEditCliente(){
    $("#tblClientes").on('click','.btnSelect',function(){
        // get the current row
        var currentRow=$(this).closest("tr");
        var col1=currentRow.find("td:eq(0)").text(); // get current row 1st TD value
        var col2=currentRow.find("td:eq(1)").text(); // get current row 2nd TD
        var col3=currentRow.find("td:eq(2)").text(); // get current row 3rd TD
        var col4=currentRow.find("td:eq(3)").text(); // get current row 4rd TD
        var col5=currentRow.find("td:eq(4)").text(); // get current row 4rd TD
        $('#id').val(col1);
        $('#name').val(col2);
        $('#email').val(col3);
        $('#age').val(col4);
        $('#password').val(col5);
    });
}

function editClient(){
    let data={
        idClient:$("#id").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val(),
        password:$("#password").val()
    };
    let dataToSend=JSON.stringify(data);
    $.ajax({
        type:"PUT",
        contentType:"application/json; charset=utf-8",
        data:dataToSend,
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/Client/update",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#email").val("");
            $("#age").val("");
            $("#password").val("");
            cargarInfoClient();
            alert("Se Actualizo Cliente Exitosamente")
        }
    });
}

function deleteClient(idElemento){
    let data={
        id:idElemento
    };
    let dataToSend=JSON.stringify(data);
    $.ajax({
        type:"DELETE",
        contentType: "application/json; charset=utf-8",
        data:dataToSend,
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/Client/"+idElemento,
        success:function(respuesta){
            $("#resultado").empty();
            cargarInfoClient();
            alert("Se Elimino Cliente EXitosamente")
        }
    });
}

/* ------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------- */

function cargarInfoMessage(){
    $.ajax({
        type:"GET",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/Message/all",
        success:function(respuesta){
            console.log(respuesta);
            cargarRespuestaMessage(respuesta);
        }

    });
}

function cargarRespuestaMessage(items){
    $("tbody").children().remove()
    var tableBody = $('#tblMensajes tbody');
    var filaTabla = "";
    for (var i=0; i<items.length; i++) {
        filaTabla += "<tr>";
        filaTabla += "<td>"+items[i].idMessage+"</td>";
        filaTabla += "<td>"+items[i].messageText+"</td>";
        filaTabla += "<td>"+items[i].client.name+"</td>";
        filaTabla += "<td>"+items[i].boat.name+"</td>";
        filaTabla += "<td style='display:none'>"+items[i].boat.id+"</td>";
        filaTabla += "<td style='display:none'>"+items[i].client.idClient+"</td>";
        filaTabla +="<td> <button class='btn btn-primary btn-sm btnSelect' onclick='passEditMensaje()'>Editar</button><button style='margin-left: 10px' class='btn btn-danger btn-sm' onclick='deleteMessage("+items[i].id+")'>Eliminar</button> </td>";
        filaTabla +="</tr>";
    }
    tableBody.append(filaTabla);
}

function newMessage(){
    if($("#idClient").val()){
        if($("#boat").val()){
            let objCliente = {idClient:$("#idClient").val()};
            let objBarco = {id:$("#boat").val()};
            let data={
                messageText:$("#messageText").val(),
                client:objCliente,
                boat:objBarco,
            };
            let dataToSend=JSON.stringify(data);
            $.ajax({
                type:"POST",
                contentType: "application/json; charset=utf-8",
                data:dataToSend,
                datatype:"JSON",
                url:"http://150.230.41.201:80/api/Message/save",
                success:function(respuesta){
                    $("#resultado").empty();
                    $("#id").val("");
                    $("#messageText").val("");
                    $("#idClient").val("");
                    $("#boat").val("");
                    cargarInfoMessage();
                    alert("Se Agrego Nuevo Mensaje Exitosamente")
                }
            });
        }else {
            alert("ojo, Debe seleccionar un barco")
        }
    }else {
        alert("ojo, Debe seleccionar un cliente")
    }
}

function passEditMensaje(){
    $("#tblMensajes").on('click','.btnSelect',function(){
        // get the current row
        var currentRow=$(this).closest("tr");
        var col1=currentRow.find("td:eq(0)").text(); // get current row 1st TD value
        var col2=currentRow.find("td:eq(1)").text(); // get current row 2nd TD
        $('#id').val(col1);
        $('#messagetext').val(col2);
    });
}

function editMessage(){
    let data={
        id:$("#id").val(),
        messagetext:$("#messagetext").val()
    };
    let dataToSend=JSON.stringify(data);
    $.ajax({
        type:"PUT",
        data:dataToSend,
        ontentType:"application/json; charset=utf-8",
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/Message/update",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#messagetext").val("");
            $("#idClient").val("");
            $("#boat").val("");
            cargarInfoMessage();
            alert("Se Actualizo Mensaje con Exito")
        }
    });
}

function deleteMessage(idElemento){
    let data={
        id:idElemento
    };
    let dataToSend=JSON.stringify(data);
    $.ajax({
        url:"https://gb6afec73d437f3-dbreto1alejod.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/message/message",
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            cargarInfoMessage();
            alert("Se Elimino Mensaje Exitosamente")
        }
    });
}

function selectBarcos(){
    $.ajax({
        url:"http://150.230.41.201:80/api/Boat/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            respuesta.forEach(function(item){
                var option = document.createElement('option');
                option.value = item.id;
                option.innerHTML = item.name;
                boat.appendChild(option)
                })
        }
    });
}

function selectClientes(){
    $.ajax({
        url:"http://150.230.41.201:80/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            respuesta.forEach(function(item){
                var option = document.createElement('option');
                option.value = item.idClient;
                option.innerHTML = item.name;
                idClient.appendChild(option)
                })
        }
    });
}


/* ------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------- */

function cargarInfoReservas(){
    $.ajax({
        type:"GET",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/Reservation/all",
        success:function(respuesta){
            console.log(respuesta);
            cargarRespuestaReservas(respuesta);
        }

    });
}

function cargarRespuestaReservas(items){
    $("tbody").children().remove()
    var tableBody = $('#tblReservas tbody');
    var filaTabla = "";
    for (var i=0; i<items.length; i++) {
        filaTabla += "<tr>";
        filaTabla += "<td>"+items[i].idReservation+"</td>";
        filaTabla += "<td>"+items[i].startDate+"</td>";
        filaTabla += "<td>"+items[i].devolutionDate+"</td>";
        filaTabla += "<td>"+items[i].client.name+"</td>";
        filaTabla += "<td>"+items[i].boat.name+"</td>";
        filaTabla += "<td>"+items[i].status+"</td>";
        //filaTabla +="<td> <button class='btn btn-primary btn-sm btnSelect' onclick='passEditMensaje()'>Editar</button><button style='margin-left: 10px' class='btn btn-danger btn-sm' onclick='deleteMessage("+items[i].id+")'>Eliminar</button> </td>";
        filaTabla +="</tr>";
    }
    tableBody.append(filaTabla);
}

function newReserva(){
    if($("#idClient").val()){
        if($("#boat").val()){
            let objCliente = {idClient:$("#idClient").val()};
            let objBarco = {id:$("#boat").val()};
            let data={
                startDate:$("#startDate").val(),
                devolutionDate:$("#devolutionDate").val(),
                client:objCliente,
                boat:objBarco,
                status:$("#status").val(),
            };
            let dataToSend=JSON.stringify(data);
            $.ajax({
                type:"POST",
                contentType: "application/json; charset=utf-8",
                data:dataToSend,
                datatype:"JSON",
                url:"http://150.230.41.201:80/api/Reservation/save",
                success:function(respuesta){
                    $("#resultado").empty();
                    $("#id").val("");
                    $("#startDate").val("");
                    $("#devolutionDate").val("");
                    $("#idClient").val("");
                    $("#boat").val("");
                    $("#status").val("");
                    cargarInfoReservas();
                    alert("Se Agrego Nueva Reserva Exitosamente")
                }
            });
        }else {
            alert("ojo, Debe seleccionar un barco")
        }
    }else {
        alert("ojo, Debe seleccionar un cliente")
    }
}

/* ------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------- */

function ReporteFecha(){
    $.ajax({
        type:"GET",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/Reservation/report-dates/"+$("#startDate").val()+"/"+$("#devolutionDate").val(),
        success:function(respuesta){
            console.log(respuesta);
            $("tbody").children().remove()
            $("thead").children().remove()
            var tableEncabezado = $('#tblInformes thead');
            var encabezado = "";
            encabezado += "<tr class='encabezadotabla'>";
            encabezado += "<th scope='col'>Fecha Reserva:</th>";
            encabezado += "<th scope='col'>Fecha Devolución:</th>";
            encabezado += "<th scope='col'>Cliente:</th>";
            encabezado += "<th scope='col'>Barco:</th>";
            var tableBody = $('#tblInformes tbody');
            var filaTabla = "";
            for (var i=0; i<respuesta.length; i++) {
                filaTabla += "<tr>";
                filaTabla += "<td>"+respuesta[i].startDate+"</td>";
                filaTabla += "<td>"+respuesta[i].devolutionDate+"</td>";
                filaTabla += "<td>"+respuesta[i].client.name+"</td>";
                filaTabla += "<td>"+respuesta[i].boat.name+"</td>";
                filaTabla +="</tr>";
            }
            tableEncabezado.append(encabezado);
            tableBody.append(filaTabla);
        }
    });
}

function ReporteCancelComplete(){
    $.ajax({
        type:"GET",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/Reservation/report-status",
        success:function(respuesta){
            console.log(respuesta);
            $("tbody").children().remove()
            $("thead").children().remove()
            var tableEncabezado = $('#tblInformes thead');
            var encabezado = "";
            encabezado += "<tr class='encabezadotabla'>";
            encabezado += "<th scope='col'>Completadas:</th>";
            encabezado += "<th scope='col'>Canceladas:</th>";
            var tableBody = $('#tblInformes tbody');
            var filaTabla = "";
            //for (var i=0; i<respuesta.length; i++) {
                filaTabla += "<tr>";
                filaTabla += "<td>"+respuesta.completed+"</td>";
                filaTabla += "<td>"+respuesta.cancelled+"</td>";
                filaTabla +="</tr>";
            //}
            tableEncabezado.append(encabezado);
            tableBody.append(filaTabla);
        }
    });
}

function ReporteTopClientes(){
    $.ajax({
        type:"GET",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/Reservation/report-clients",
        success:function(respuesta){
            console.log(respuesta);
            $("tbody").children().remove()
            $("thead").children().remove()
            var tableEncabezado = $('#tblInformes thead');
            var encabezado = "";
            encabezado += "<tr class='encabezadotabla'>";
            encabezado += "<th scope='col'>Nombre Cliete:</th>";
            encabezado += "<th scope='col'>Total:</th>";
            var tableBody = $('#tblInformes tbody');
            var filaTabla = "";
            for (var i=0; i<respuesta.length; i++) {
                filaTabla += "<tr>";
                filaTabla += "<td>"+respuesta[i].client.name+"</td>";
                filaTabla += "<td>"+respuesta[i].total+"</td>";
                filaTabla +="</tr>";
            }
            tableEncabezado.append(encabezado);
            tableBody.append(filaTabla);
        }
    });
}
