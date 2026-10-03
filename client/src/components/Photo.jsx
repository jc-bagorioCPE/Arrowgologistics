import { useState } from 'react';

/* Fills its parent. Zooms on hover when the parent has the `group` class.
   Falls back to a gradient if there is no src or the image fails to load. */
export default function Photo({ src, alt, gradient, className = '' }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={{ background: gradient }}>
      {src && !failed && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transition-none"
        />
      )}
    </div>
  );
}