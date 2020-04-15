const objeto_string = "{ \"numerador\": 5, \"denominador\": 15 }";
const objeto_parseado = JSON.parse(objeto_string);

console.log(objeto_string.a);

console.log(objeto_parseado.numerador);
console.log(objeto_parseado.denominador);
console.log(objeto_parseado.numerador / objeto_parseado.denominador);
