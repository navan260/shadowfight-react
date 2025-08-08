// Shadow Fight styled Card component
import React from 'react';
import './Card.css';

export default function Card({ set }) {
  if (!set) return null;

  const pieces = [
    { key: 'weapon', label: 'Weapon', icon: '⚔️', data: set.weapon },
    { key: 'armor', label: 'Armor', icon: '🛡️', data: set.armor },
    { key: 'helm', label: 'Helm', icon: '🥷', data: set.helm },
    { key: 'ranged_weapon', label: 'Ranged', icon: '🎯', data: set.ranged_weapon },
    { key: 'magic', label: 'Magic', icon: '🪄', data: set.magic }
  ];

  const isMythical = /mythical/i.test(set.notes || '');

  return (
    <article className={`sf-card ${isMythical ? 'sf-card--mythical' : ''}`} aria-label={`${set.name} equipment set`}>
      <div className="sf-card__glow" />
      <header className="sf-card__header">
        <h2 className="sf-card__title">{set.name}</h2>
        <span className={`sf-badge ${isMythical ? 'sf-badge--mythical' : 'sf-badge--standard'}`}>{isMythical ? 'Mythical' : 'Set'}</span>
      </header>
      <div className="sf-card__divider" />
      <section className="sf-gear-grid" aria-label="Gear pieces">
        {pieces.map(piece => (
          <div key={piece.key} className="sf-gear" aria-label={piece.label}>
            <div className="sf-gear__heading">
              <span className="sf-gear__icon" aria-hidden>{piece.icon}</span>
              <span className="sf-gear__label">{piece.label}</span>
            </div>
            <div className="sf-gear__name" title={piece.data.name}>{piece.data.name}</div>
            <div className="sf-enchants" aria-label="Enchantments">
              {piece.data.enchantments && piece.data.enchantments.map(en => (
                <span key={en} className="sf-enchant-chip">{en}</span>
              ))}
              {piece.data.damage && (
                <span className="sf-enchant-chip sf-enchant-chip--damage">DMG {piece.data.damage}</span>
              )}
            </div>
          </div>
        ))}
      </section>
      <footer className="sf-card__footer">
        <p className="sf-notes">{set.notes}</p>
      </footer>
    </article>
  );
}
