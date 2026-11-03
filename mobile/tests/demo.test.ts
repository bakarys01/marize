import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { createDemoState, markAlertRead, saveSchool, selectChild, unreadCount } from '../src/domain/demo.ts';

describe('démonstration des bracelets', () => {
  it('crée deux profils fictifs et des états indépendants', () => {
    const state = createDemoState();
    const other = createDemoState();
    assert.deepEqual(state.children.map(child => child.name), ['Léa', 'Noah']);
    assert.equal(state.selectedChildId, state.children[0].id);
    assert.equal(unreadCount(state), 2);
    assert.notEqual(state.children, other.children);
    assert.notEqual(state.schools[state.selectedChildId], other.schools[other.selectedChildId]);
    assert.notEqual(state.schools[state.selectedChildId].days, other.schools[other.selectedChildId].days);
  });

  it('change la sélection sans modifier la source et refuse un identifiant inconnu', () => {
    const state = createDemoState();
    const next = selectChild(state, state.children[1].id);
    assert.equal(next.selectedChildId, state.children[1].id);
    assert.equal(state.selectedChildId, state.children[0].id);
    assert.throws(() => selectChild(state, 'inconnu'), /Enfant introuvable/);
  });

  it('marque uniquement l’alerte choisie et préserve les données originales', () => {
    const state = createDemoState();
    const next = markAlertRead(state, state.alerts[0].id);
    assert.equal(unreadCount(next), 1);
    assert.equal(state.alerts[0].read, false);
    assert.equal(next.alerts[0].read, true);
    assert.equal(next.alerts[1].read, false);
    assert.equal(unreadCount(markAlertRead(next, next.alerts[0].id)), 1);
    assert.throws(() => markAlertRead(state, 'inconnue'), /Alerte introuvable/);
  });

  it('enregistre une configuration valide sans modifier la source ni conserver le tableau fourni', () => {
    const state = createDemoState();
    const config = { enabled: true, start: '08:30', end: '16:30', days: [1, 2, 4, 5] };
    const next = saveSchool(state, state.selectedChildId, config);
    assert.deepEqual(next.schools[state.selectedChildId], config);
    assert.notEqual(next.schools[state.selectedChildId], config);
    assert.notEqual(next.schools[state.selectedChildId].days, config.days);
    assert.notDeepEqual(state.schools[state.selectedChildId], config);
    assert.deepEqual(next.schools[state.children[1].id], state.schools[state.children[1].id]);
  });

  it('accepte une désactivation sans jour et les limites horaires valides', () => {
    const state = createDemoState();
    const config = { enabled: false, start: '00:00', end: '23:59', days: [] };
    assert.deepEqual(saveSchool(state, state.selectedChildId, config).schools[state.selectedChildId], config);
  });

  it('refuse les horaires mal formés, hors limites ou inversés', () => {
    const state = createDemoState();
    for (const [start, end] of [['8:30', '16:30'], ['24:00', '25:00'], ['08:60', '16:30'], ['08:30', 'bad'], ['16:30', '08:30'], ['08:30', '08:30']]) {
      assert.throws(() => saveSchool(state, state.selectedChildId, { enabled: true, start, end, days: [1] }), /horaire|heure/i);
    }
  });

  it('refuse les jours invalides, dupliqués, absents si actif et les profils inconnus', () => {
    const state = createDemoState();
    for (const days of [[], [0], [8], [1.5], [1, 1]]) {
      assert.throws(() => saveSchool(state, state.selectedChildId, { enabled: true, start: '08:30', end: '16:30', days }), /jour/i);
    }
    assert.throws(() => saveSchool(state, 'inconnu', { enabled: false, start: '08:30', end: '16:30', days: [] }), /Enfant introuvable/);
  });
});
