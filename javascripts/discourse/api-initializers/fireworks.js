import { apiInitializer } from "discourse/lib/api";

export default apiInitializer((/* api */) => {

if (settings.use_tsParticles_fireworks) {
    const tsParticlesCdn = document.createElement("script");
    tsParticlesCdn.src = settings.theme_uploads.tsparticles_js;
    document.head.appendChild(tsParticlesCdn);
    tsParticlesCdn.onload = function () {
      // eslint-disable-next-line no-undef
      fireworks({
        rate: parseInt(settings.tsParticles_fireworks_rate, 10),
        sounds: !!settings.tsParticles_fireworks_sound_enabled,
      });
      setTimeout(() => {
        const fireworksContainer = document.getElementById('fireworks');
        if (fireworksContainer) {
          fireworksContainer.style.opacity = 1;
        }
      }, 100);
    };

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
