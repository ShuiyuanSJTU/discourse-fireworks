import { acceptance } from "discourse/tests/helpers/qunit-helpers";
import { test } from "qunit";
import { visit } from "@ember/test-helpers";

acceptance("Discourse Fireworks", function (needs) {
  needs.user();

  test("tsParticles script loads when enabled", async function (assert) {
    settings.use_tsParticles_fireworks = true;
    settings.tsParticles_fireworks_sound_enabled = false;
    settings.tsParticles_fireworks_rate = 10;

    await visit("/");

    const script = document.querySelector(
      'script[src*="tsparticles.fireworks.bundle.min.js"]'
    );
    
    assert.ok(script, "tsParticles CDN script is added to document head");
  });

  test("tsParticles script does not load when disabled", async function (assert) {
    settings.use_tsParticles_fireworks = false;

    await visit("/");

    const script = document.querySelector(
      'script[src*="tsparticles.fireworks.bundle.min.js"]'
    );
    
    assert.notOk(script, "tsParticles CDN script is not added when disabled");
  });

  test("fireworks function is called with correct settings", async function (assert) {
    assert.expect(2);
    
    settings.use_tsParticles_fireworks = true;
    settings.tsParticles_fireworks_sound_enabled = true;
    settings.tsParticles_fireworks_rate = 15;

    // Mock the fireworks function
    window.fireworks = function(options) {
      assert.equal(options.rate, 15, "rate matches setting");
      assert.equal(options.sounds, true, "sounds enabled matches setting");
      return Promise.resolve();
    };

    await visit("/");

    // Trigger the script load
    const script = document.querySelector(
      'script[src*="tsparticles.fireworks.bundle.min.js"]'
    );
    if (script && script.onload) {
      script.onload();
    }
  });

  test("fireworks function respects sound disabled setting", async function (assert) {
    assert.expect(1);
    
    settings.use_tsParticles_fireworks = true;
    settings.tsParticles_fireworks_sound_enabled = false;

    window.fireworks = function(options) {
      assert.equal(options.sounds, false, "sounds disabled");
      return Promise.resolve();
    };

    await visit("/");

    const script = document.querySelector(
      'script[src*="tsparticles.fireworks.bundle.min.js"]'
    );
    if (script && script.onload) {
      script.onload();
    }
  });
});
