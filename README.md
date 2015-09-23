# telefonos

Una pequeña guía de telefonos con Sails + Angular

Sails: back-end contra Mysql server en local
Angular + ui-bootstrap: front-end

TODO:

- quitar "pruebas" de angular y de la api
- formatear y comentar codigo
- poner versiones mimificadas de angular
- (ok)filtar en la tabla principal, desde el servidor no en local:
		- (ok)falta poner total y results en la vuelta de los datos
- (ahora)Ordenar tabla por varios campos, usando ngGrid
- (ahora)ajustar proporcion de los campos de la tabla		
		
- (ok)evitar traerse datos innecesarios en la lista principal de telefonos (mejor vistas mysql)
- (ok)Arreglar servicio usuariosService.irPagina, pasa parametros mal y muchos
- (ok) Parece que al crear usuarios manda datos de todos los departamentos y servicios
- (ok) cambiar a puerto 80: creado el fichero "puerto.js"
- (ok) hacer un modo dar alta nuevos accesos de administrador y activarlo por
  politicas o no. Se hace modificando policies.js
- (ok) Poner cargando al traerse datos del servidor, por si fuera lento
- (ok) quitar comentarios en consola
- (ok) evitar parpadeo en redirección al login sin autentificar
- (ok) Acerca de poner ventana
- (ok) falla al poner login/logout
- (ok)controlar error en login
- (ok)No funciona en IExplorer 11
- (ok)No debe devolver nada json que en ie11 se pone a descargarlo
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
