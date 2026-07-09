/**
 * Breadcrumbs Component
 * 
 * Renders semantic breadcrumb navigation with JSON-LD structured data.
 * Hidden by default (sr-only) unless explicitly mounted by a page.
 * Used when VITE_SEO_V2 is enabled.
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEOEnhanced from './SEOEnhanced';
import { breadcrumbSchema } from '../../lib/seo';
import { BreadcrumbSegment } from '../../lib/seo';

interface BreadcrumbsProps {
  segments: BreadcrumbSegment[];
  visible?: boolean;
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  segments, 
  visible = false,
  className = '' 
}) => {
  const location = useLocation();

  // Only render when VITE_SEO_V2 is enabled
  if (import.meta.env.VITE_SEO_V2 !== 'true') {
    return null;
  }

  // Always emit JSON-LD schema
  const schema = breadcrumbSchema(segments);

  // If not visible, render only JSON-LD (screen reader only)
  if (!visible) {
    return (
      <>
        <SEOEnhanced schemas={[schema]} />
        <nav aria-label="breadcrumbs" className="sr-only">
          <ol className="flex items-center space-x-2 text-sm">
            {segments.map((segment, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="mx-2">/</span>}
                {index === segments.length - 1 ? (
                  <span className="text-gray-400">{segment.name}</span>
                ) : (
                  <Link to={segment.href} className="text-gray-300 hover:text-white">
                    {segment.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </>
    );
  }

  // Visible breadcrumbs
  return (
    <>
      <SEOEnhanced schemas={[schema]} />
      <nav aria-label="breadcrumbs" className={className}>
        <ol className="flex items-center space-x-2 text-sm">
          {segments.map((segment, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-2 text-gray-500">/</span>}
              {index === segments.length - 1 ? (
                <span className="text-gray-400">{segment.name}</span>
              ) : (
                <Link 
                  to={segment.href} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {segment.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;

