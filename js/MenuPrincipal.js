//document.getElementById("varUsuario") = localStorage.getItem('usuario');
//$(".varUsuario").val(localStorage.getItem('usuario'));
//$("#varUsuario").val() = localStorage.getItem('usuario');
//$('#varUsuario').val(localStorage.getItem('usuario'));
window.onload = function(){
    $('#varUsuario').val(localStorage.getItem('usuario'));
}
//alert(localStorage.getItem('usuario'))