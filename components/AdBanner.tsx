"use client"
import React, { useEffect } from 'react';

const AdBanner = (props) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle adbanner-customize"
      style={{
        display: 'block',
        overflow: 'hidden',
      }}
      data-ad-client="ca-pub-2632815382162562"
      {...props}
    />
  );
};

export default AdBanner;
