# telefonos

Una pequeña guía de telefonos con Sails + Angular

Sails: back-end contra Mysql server en local
Angular + ui-bootstrap: front-end

TODO:

- quitar "pruebas" de angular y de la api
- formatear y comentar codigo
- poner versiones mimificadas de angular y del resto "sails lift --prod"
- (ok)Ordenar tabla por varios campos, nombre y apellidos
	- indicar de algun modo que campo es el que ordena en la tabla
- redirige al login algunas veces al visualizar la pagina principal
- (ahora)ajustar proporcion de los campos de la tabla		

- (ok)casca al ordenar por un campo que no existe en la tabla, poniendo apellidos2 por ejemplo
- (ok)Poder depurar con ""node-inspector": 
		- Ejecutar con sails debug 
		- Abrir navegador: http://localhost:8080/debug?port=5858
- (ok)filtar en la tabla principal, desde el servidor no en local:
		- (ok)falta poner total y results en la vuelta de los datos		
- (ok) Mejorado y simplificado la gestion del login y administración de usuarios
- (ok) evitar traerse datos innecesarios en la lista principal de telefonos (mejor vistas mysql)
- (ok) Arreglar servicio usuariosService.irPagina, pasa parametros mal y muchos
- (ok) Parece que al crear usuarios manda datos de todos los departamentos y servicios
- (ok) cambiar a puerto 80: creado el fichero "puerto.js"
- (ok) hacer un modo dar alta nuevos accesos de administrador y activarlo por
		politicas o no. Se hace modificando policies.js
- (ok) Poner cargando al traerse datos del servidor, por si fuera lento
- (ok) quitar comentarios en consola
- (ok) evitar parpadeo en redirección al login sin autentificar
- (ok) Acerca de poner ventana
- (ok) falla al poner login/logout
- (ok) controlar error en login
- (ok) No funciona en IExplorer 11
- (ok) No debe devolver nada json que en ie11 se pone a descargarlo
- (ok) mejorar codigo de autentificacion (servicio y controlador)
- (ok) Pedir autentificación para poder modificar datos de los usuarios
- (ok) controlar acceso desde angular consultado /loggedin
- (ok) errores en consola por pagina no encontrada
- (ok) Modificar y alta usuarios más bonita
- (ok) Seguridad en la API Sails
- (ok) Controlar datos introducidos en el formulario
- (ok) Posible paginación de los registros devueltos si son muchos
- (ok) Migrar datos de telefonos y añadir otros campos => mysqlimport usado
- (ok) Utilizar bootstrap u otra libreria CSS para hacer las vistas
