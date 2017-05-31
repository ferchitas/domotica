En el fichero agente.js entre las líneas 3 y 17 se controla lo de las temperaturas máximas y mínimas.


En fichero servidor.js de las líneas 99 a 127 tenemos el control de cambiar las temperaturas, notificarlo al cliente y cabiar el estado de la persiana, para esto he añadido dos nuevos eventos el historico de temperaturas y la ultima temperatura para evitar bucles de llamadas a eventos.

EN usuaros.js he añadido dos un on nuevo en el que se muestra la nueva temperatura.

a ejecutarlo, lanzar el servidor dentro de la carpeta raiz y en el navegador ir a 12 y ahi aparecen enlaces a las dos interfaces.
