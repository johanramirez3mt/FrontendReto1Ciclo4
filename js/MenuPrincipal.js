window.onload = function(){
    //Cargamos el valor de la local storage en el inputr del menu principal
    $('#varUsuario').val(localStorage.getItem('usuario'));
}
