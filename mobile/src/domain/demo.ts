export type Child = {
  id: string;
  name: string;
  age: number;
  battery: number;
  place: string;
  positionTime: string;
  color: string;
  initials: string;
};

export type DemoAlert = {
  id: string;
  childId: string;
  title: string;
  detail: string;
  time: string;
  read: boolean;
  kind: 'info' | 'battery';
};

export type SchoolConfig = {
  enabled: boolean;
  start: string;
  end: string;
  days: number[];
};

export type DemoState = {
  children: Child[];
  selectedChildId: string;
  alerts: DemoAlert[];
  schools: Record<string, SchoolConfig>;
};

export function createDemoState(): DemoState {
  return {
    children: [
      { id: 'lea', name: 'Léa', age: 8, battery: 82, place: 'École des Tilleuls', positionTime: 'Exemple · 08:42', color: '#E6AE89', initials: 'L' },
      { id: 'noah', name: 'Noah', age: 6, battery: 24, place: 'Parc des Petits Pas', positionTime: 'Exemple · 08:35', color: '#9DB6A0', initials: 'N' },
    ],
    selectedChildId: 'lea',
    alerts: [
      { id: 'alert-lea', childId: 'lea', title: 'Position disponible', detail: 'Exemple de réception d’une position pour Léa. Cette position est fictive.', time: '08:42', read: false, kind: 'info' },
      { id: 'alert-noah', childId: 'noah', title: 'Batterie à recharger', detail: 'Exemple d’alerte : le bracelet de Noah indique 24 % de batterie. Aucun bracelet réel n’est connecté.', time: '08:35', read: false, kind: 'battery' },
      { id: 'alert-school', childId: 'lea', title: 'Programme école enregistré', detail: 'Exemple de programmation locale. Aucun réglage n’a été transmis à un bracelet.', time: 'Hier · 18:10', read: true, kind: 'info' },
    ],
    schools: {
      lea: { enabled: false, start: '08:30', end: '16:00', days: [1, 2, 4, 5] },
      noah: { enabled: false, start: '09:00', end: '16:30', days: [1, 2, 4, 5] },
    },
  };
}

function assertChild(state: DemoState, childId: string): void {
  if (!state.children.some(child => child.id === childId)) {
    throw new Error('Enfant introuvable. Sélectionnez un profil existant.');
  }
}

export function selectChild(state: DemoState, childId: string): DemoState {
  assertChild(state, childId);
  return { ...state, selectedChildId: childId };
}

export function markAlertRead(state: DemoState, alertId: string): DemoState {
  if (!state.alerts.some(alert => alert.id === alertId)) {
    throw new Error('Alerte introuvable.');
  }
  return {
    ...state,
    alerts: state.alerts.map(alert => alert.id === alertId ? { ...alert, read: true } : alert),
  };
}

export function saveSchool(state: DemoState, childId: string, config: SchoolConfig): DemoState {
  assertChild(state, childId);
  const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;
  if (!timePattern.test(config.start) || !timePattern.test(config.end)) {
    throw new Error('Utilisez une heure valide au format HH:mm.');
  }
  if (config.start >= config.end) {
    throw new Error('L’heure de fin doit être après l’heure de début.');
  }
  if (config.enabled && config.days.length === 0) {
    throw new Error('Sélectionnez au moins un jour pour activer le mode école.');
  }
  if (config.days.some(day => !Number.isInteger(day) || day < 1 || day > 7) || new Set(config.days).size !== config.days.length) {
    throw new Error('Les jours doivent être distincts et compris entre 1 et 7.');
  }
  return {
    ...state,
    schools: { ...state.schools, [childId]: { ...config, days: [...config.days] } },
  };
}

export function unreadCount(state: DemoState): number {
  return state.alerts.filter(alert => !alert.read).length;
}
