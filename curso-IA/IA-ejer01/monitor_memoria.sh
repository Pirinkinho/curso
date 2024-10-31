#!/bin/bash

# Mostrar el número de procesos en ejecución
num_procesos=$(ps -e --no-headers | wc -l)
echo "Número total de procesos: $num_procesos"

# Mostrar la memoria total ocupada (en KB)
mem_total_ocupada=$(free -k | awk '/Mem:/ {print $3}')
echo "Memoria total ocupada: $mem_total_ocupada KB"

# Mostrar los 5 procesos que más memoria utilizan
echo "Top 5 procesos que más memoria utilizan:"
ps -eo pid,comm,%mem --sort=-%mem | head -n 6
