#!/bin/bash

# Verificar si se pasaron suficientes argumentos
if [ $# -lt 2 ]; then
    echo "Uso: $0 <directorio> <patrón>"
    exit 1
fi

# Asignar los argumentos a variables
directorio=$1
patron=$2

# Verificar si el directorio existe
if [ ! -d "$directorio" ]; then
    echo "Error: El directorio '$directorio' no existe."
    exit 1
fi

# Buscar el patrón en todos los archivos y subdirectorios del directorio dado
echo "Buscando el patrón '$patron' en el directorio '$directorio'..."
grep -r "$patron" "$directorio"
