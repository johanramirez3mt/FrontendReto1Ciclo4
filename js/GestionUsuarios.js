
function guardarUsuario(){
    let textPass1 = document.getElementById("password").value;
    let textPass2 = document.getElementById("password2").value;

    if (textPass1 != textPass2) {
        alert('ERROR - La contraseña digitada no es igual, verifique!');
        document.getElementById("password2").value = "";
    } else {
        let data={
            email:$("#email").val(),
            password:$("#password").val(),
            name:$("#name").val(),
        };
        let dataToSend=JSON.stringify(data);
        $.ajax({
            type:"POST",
            contentType: "application/json; charset=utf-8",
            data:dataToSend,
            datatype:"JSON",
            url:"http://localhost:8080/api/user/new",
            success:function(respuesta){
                if (respuesta.id != null) {
                    $("#email").val("");
                    $("#name").val("");
                    $("#password").val("");
                    $("#password2").val("");
                    alert("Se Guardo Usuario Exitosamente")
                } else {
                    alert("ERROR - El email ingresado ya existe, verifique!")
                }
            }
        });
    }
}