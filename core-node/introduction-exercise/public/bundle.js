(()=>{var e={42:e=>{e.exports={add:function(e,o){return e+o},subtract:function(e,o){return e-o},divide:function(e,o){return e/o},multiply:function(e,o){return e*o}}}},o={};const{add:t,subtract:n,divide:r,multiply:s}=function t(n){var r=o[n];if(void 0!==r)return r.exports;var s=o[n]={exports:{}};return e[n](s,s.exports,t),s.exports}(42);try{window&&alert("Open your development console and check the messages!")}catch(e){console.log("No browser instance detected, alert message is not necessary")}console.log("Suma de 5 y 3:",t(5,3)),console.log("Resta de 10 menos 8:",n(10,8)),console.log("División de 15 entre 5:"),r(15,3),console.log("Multiplicación de 4 por 6:"),s(4,6)})();