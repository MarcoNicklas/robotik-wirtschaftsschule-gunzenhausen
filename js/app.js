// Liest projekte.json und zeigt Bereiche und Anwendungen an.
// Neue Anwendungen werden nur in projekte.json eingetragen – hier muss nichts geändert werden.
(function () {
  'use strict';
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = id => document.getElementById(id);
  let daten, aktiv = 'alle';

  fetch('projekte.json', { cache: 'no-cache' })
    .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(d => {
      daten = d;
      $('stand').textContent = new Date(d.stand).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
      $('bereiche').innerHTML = d.bereiche.map(b => `
        <article class="bereich"><small>${esc(b.kurs)}</small><h3>${esc(b.name)}</h3><p>${esc(b.text)}</p></article>`).join('');
      $('filter').innerHTML = [{ id: 'alle', name: 'Alle' }, ...d.bereiche]
        .map(b => `<button type="button" data-id="${esc(b.id)}" aria-pressed="${b.id === 'alle'}">${esc(b.name.split(' – ')[0])}</button>`).join('');
      zeige();
    })
    .catch(e => { $('liste').innerHTML = `<p class="hinweis">Die Inhalte konnten nicht geladen werden (${esc(e.message)}).</p>`; });

  $('filter').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    aktiv = b.dataset.id;
    $('filter').querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
    zeige();
  });

  function zeige() {
    const name = id => (daten.bereiche.find(b => b.id === id) || {}).name || '';
    const liste = daten.anwendungen.filter(a => a.sichtbar !== false && (aktiv === 'alle' || a.bereich === aktiv));
    $('liste').innerHTML = liste.length ? liste.map(a => {
      const bilder = a.bilder || [], erstes = bilder[0];
      return `<article class="eintrag${erstes ? ' mit-bild' : ''}" id="${esc(a.id)}">
        ${erstes ? `<figure><img src="${esc(erstes.datei)}" alt="${esc(erstes.text)}" loading="lazy"><figcaption>${esc(erstes.text)}</figcaption>
          ${bilder.length > 1 ? `<div class="bilder-mehr">${bilder.slice(1).map(b => `<a href="${esc(b.datei)}" target="_blank" rel="noopener"><img src="${esc(b.datei)}" alt="${esc(b.text)}" loading="lazy"></a>`).join('')}</div>` : ''}</figure>` : ''}
        <div class="inhalt">
          <div class="meta">${esc(name(a.bereich))} · ${esc(a.zeitraum)}</div>
          <h3>${esc(a.titel)}</h3>
          <p>${esc(a.text)}</p>
          ${(a.links || []).length ? `<div class="links">${a.links.map(l => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.text)} →</a>`).join('')}</div>` : ''}
        </div>
      </article>`;
    }).join('') : '<p class="hinweis">In diesem Bereich gibt es noch keine Einträge.</p>';
  }
})();
