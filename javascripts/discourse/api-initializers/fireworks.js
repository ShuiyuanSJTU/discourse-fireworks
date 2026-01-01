import { apiInitializer } from "discourse/lib/api";

export default apiInitializer((/* api */) => {

if (settings.use_tsParticles_fireworks) {
    
    const tsParticlesCdn = document.createElement("script");
    tsParticlesCdn.src = "https://cdn.jsdelivr.net/npm/@tsparticles/fireworks@3.7.1/tsparticles.fireworks.bundle.min.js";
    document.head.appendChild(tsParticlesCdn);
    if (settings.tsParticles_fireworks_sound_enabled == true) {
      tsParticlesCdn.onload = function() {
        (async () => {
          await fireworks({
            rate: parseInt(settings.tsParticles_fireworks_rate),
            sounds: true,
          });
        })();
      }
    } else {
      tsParticlesCdn.onload = function() {
        (async () => {
          await fireworks({
            rate: parseInt(settings.tsParticles_fireworks_rate),
            sounds: false,
          });
        })();
      }
    }
  
    document.addEventListener("DOMContentLoaded", function() {
      // Select the fireworks div
      const fireworksDiv = document.getElementById('fireworks');
      
      // Select the main section
      const mainSection = document.getElementById('main');
      
      // Check if both elements exist
      if (fireworksDiv && mainSection) {
        // Move the fireworks div to just below the main section opening tag
        mainSection.insertBefore(fireworksDiv, mainSection.firstChild);
      }
    });
  }  

});
