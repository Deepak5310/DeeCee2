"use client"

import React from 'react';

const PromoVideo = React.memo(() => {
  return (
    <section>
      <div className="w-full">
        <div className="relative w-full" style={{ aspectRatio: '4.13' }}>
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/videos/promo-video.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
});

PromoVideo.displayName = 'PromoVideo';

export default PromoVideo;
