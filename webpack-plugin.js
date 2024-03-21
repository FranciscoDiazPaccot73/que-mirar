const fs = require("fs");

class StatsPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap("StatsPlugin", (compilation) => {
      const stats = compilation.getStats().toJson(this.options);

      // Convertir el objeto JSON en una cadena
      const statsJSON = JSON.stringify(stats, null, 2); // 2 espacios de sangría para una mejor legibilidad

      // Escribir el objeto JSON en un archivo
      fs.writeFile("stats.json", statsJSON, (err) => {
        if (err) {
          console.error("Error al escribir el archivo de estadísticas:", err);

          return;
        }
        console.log(
          "Archivo de estadísticas guardado correctamente como stats.json"
        );
      });
    });
  }
}

module.exports = StatsPlugin;
