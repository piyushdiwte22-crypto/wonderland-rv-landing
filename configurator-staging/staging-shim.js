/* ---------------------------------------------------------------------------
   Wonderland RV configurator — STAGING SHIM
   Only exists in this sandbox. Nothing in this file is on the live website.

   On the live site, Gravity Forms moves between the 14 form pages with an AJAX
   round-trip to WordPress. There is no server here, so Next/Previous would do
   nothing. All 14 .gform_page divs are already in the DOM (hidden with
   display:none), so this shim just toggles them client-side.

   It also blocks submission and silences the missing-backend noise.
--------------------------------------------------------------------------- */
(function () {
  'use strict';

  function pages() {
    return [].slice.call(document.querySelectorAll('#gform_26 .gform_page'));
  }
  function currentIndex() {
    var p = pages();
    for (var i = 0; i < p.length; i++) {
      if (p[i].style.display !== 'none' && p[i].offsetParent !== null) return i;
    }
    return 0;
  }

  function show(index) {
    var p = pages();
    if (index < 0 || index >= p.length) return;
    p.forEach(function (pg, i) { pg.style.display = (i === index ? '' : 'none'); });

    // keep GF's hidden "source page" field honest for any logic that reads it
    var src = document.querySelector('#gform_source_page_number_26');
    var tgt = document.querySelector('#gform_target_page_number_26');
    if (src) src.value = index + 1;
    if (tgt) tgt.value = index + 2;

    // progress bar / step indicator, if the theme renders one
    var bar = document.querySelector('#gform_26 .gf_progressbar_percentage');
    if (bar) {
      var pct = Math.round(((index + 1) / p.length) * 100);
      bar.style.width = pct + '%';
      var t = bar.querySelector('span');
      if (t) t.textContent = pct + '%';
    }

    // let the configurator script react exactly as it does on a real page change
    if (window.jQuery) {
      try { jQuery(document).trigger('gform_page_loaded', [26, index + 1]); } catch (e) {}
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log('[staging] page ' + (index + 1) + ' of ' + p.length);
  }

  // Intercept Next / Previous before Gravity Forms tries to POST
  document.addEventListener('click', function (e) {
    var b = e.target.closest('input[type=button], button');
    if (!b || !b.closest('#gform_26')) return;
    var label = (b.value || b.textContent || '').trim().toLowerCase();

    if (label.indexOf('next') === 0) {
      e.preventDefault(); e.stopImmediatePropagation();
      show(currentIndex() + 1);
    } else if (label.indexOf('previous') === 0 || label.indexOf('back') === 0) {
      e.preventDefault(); e.stopImmediatePropagation();
      show(currentIndex() - 1);
    } else if (label.indexOf('submit') === 0) {
      e.preventDefault(); e.stopImmediatePropagation();
      alert('Staging sandbox: submission is disabled. Nothing was sent.');
    }
  }, true);

  // Labels drive the hidden radios (they are display:none and styled as cards)
  document.addEventListener('click', function (e) {
    var lab = e.target.closest('label[for]');
    if (!lab || !lab.closest('#gform_26')) return;
    var input = document.getElementById(lab.getAttribute('for'));
    if (input && (input.type === 'radio' || input.type === 'checkbox') &&
        getComputedStyle(input).display === 'none') {
      input.checked = input.type === 'radio' ? true : !input.checked;
      if (window.jQuery) jQuery(input).trigger('change').trigger('click');
    }
  }, false);

  // Belt and braces: nothing submits, ever
  document.addEventListener('submit', function (e) {
    e.preventDefault(); e.stopImmediatePropagation();
    alert('Staging sandbox: submission is disabled. Nothing was sent.');
    return false;
  }, true);

  // Small console helper for jumping straight to a step while testing
  window.wlStep = function (n) { show(n - 1); };

  document.addEventListener('DOMContentLoaded', function () {
    console.log('[staging] shim active — ' + pages().length +
                ' pages. Use wlStep(n) to jump to a step.');
  });
})();
