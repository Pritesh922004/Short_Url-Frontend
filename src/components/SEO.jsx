import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords }) => {
  const defaultDescription = "Create fast, memorable shortened links with custom brand aliases, real-time analytics, and AI-powered coding and translation tools.";
  const defaultKeywords = "url shortener, link analytics, ai code review, ai document translator, custom url";
  
  return (
    <Helmet>
      <title>{title ? `${title} | LinkVault` : "LinkVault - Modern URL Shortener & AI Hub"}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title ? `${title} | LinkVault` : "LinkVault"} />
      <meta property="og:description" content={description || defaultDescription} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={title ? `${title} | LinkVault` : "LinkVault"} />
      <meta name="twitter:description" content={description || defaultDescription} />
    </Helmet>
  );
};

export default SEO;
