const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const expresiones = {
    nombres: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, // Letras y espacios, pueden llevar acentos.
    apellidos: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, // Letras y espacios, pueden llevar acentos.
    cedula: /^\d{10}$/, // 10 dígitos.
    telefono: /^\d{10}$/, // 10 números.
    direccion: /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s\.\,\#\-]+$/, // Letras, números, espacio, tildes y caracteres especiales.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    
}
const campos = {
	nombres: true,
	apellidos: true,
	cedula: true,
    telefono: true,
    direccion: true,
	correo: true,
	
}
const validarFormulario = (e) => { //SE REGISTRO CORRECTAMENTE!
	switch (e.target.name) {
		case "nombres":
			validarCampo(expresiones.nombres, e.target, 'nombres');
		break;
		case "apellidos":
			validarCampo(expresiones.apellidos, e.target, 'apellidos');
		break;
		case "cedula":
			validarCampo(expresiones.cedula, e.target, 'cedula');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
		case "direccion":
			validarCampo(expresiones.direccion, e.target, 'direccion');
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
	}
}
const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = true;
	}
}

	function Limpiar(){
	window.location='index.html';
	}
	function Guardar(){

		var cliente = {
			nombres: nombres,
			apellidos: apellidos,
			cedula: cedula,
			telefono: telefono,
			direccion: direccion,
			correo: correo
		};
		localStorage.setItem('cliente', JSON.stringify(cliente));
		console.log(cliente);
	alert('se han guardado los datos exitosamente');	
	return false;
	}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if (campos.nombres && campos.apellidos && campos.cedula && campos.telefono && campos.direccion && campos.correo) {
        formulario.reset();
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});
