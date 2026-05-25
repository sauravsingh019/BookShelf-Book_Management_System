import React from 'react';

const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-card__cover" />
    <div className="skeleton-card__body">
      <div className="skeleton-line skeleton-line--xs" />
      <div className="skeleton-line skeleton-line--lg" />
      <div className="skeleton-line skeleton-line--sm" />
      <div className="skeleton-line skeleton-line--md" />
      <div className="skeleton-line skeleton-line--full" />
      <div className="skeleton-line skeleton-line--actions" />
    </div>
  </div>
);

const SkeletonGrid = ({ count = 6 }) => (
  <div className="skeleton-grid">
    {Array.from({ length: count }, (_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default SkeletonGrid;
