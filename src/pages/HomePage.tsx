import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Headphones, Package, CheckSquare, Settings } from 'lucide-react';
import { VoiceSearch } from '../components/VoiceSearch';

const VENDOR_CATEGORIES = {
  plumber: ['plumber', 'plumbing', 'pipe', 'leak', 'drain', 'water'],
  electrician: ['electrician', 'electrical', 'wiring', 'power', 'light'],
  carpenter: ['carpenter', 'woodwork', 'furniture', 'cabinet'],
  painter: ['painter', 'painting', 'wall', 'paint', 'decoration'],
  gardener: ['gardener', 'garden', 'landscape', 'plant', 'lawn']
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((query: string) => {
    const lowercaseQuery = query.toLowerCase();
    
    for (const [category, keywords] of Object.entries(VENDOR_CATEGORIES)) {
      if (keywords.some(keyword => lowercaseQuery.includes(keyword))) {
        navigate(`/vendors/${category}`);
        return;
      }
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleSearch(searchQuery);
    }
  };

  const handleVoiceResult = (text: string) => {
    setSearchQuery(text);
    handleSearch(text);
  };

  return (
    <div className="landing-page">
      <div className="main-container">
        <div className="hero-section">
          <div className="image-grid">
            <div className="image-column image-left">
              <div className="person-image">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" 
                  alt="Woman with laptop" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="person-image">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80" 
                  alt="Smiling man" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="person-image">
                <img 
                  src="https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=300&q=80" 
                  alt="Worker in yellow shirt" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="hero-content">
              <h1 className="hero-title">Discover Your Project Dream Team Here.</h1>
              <p className="hero-description">This platform connects homeowners, contractors, businesses, and customers with skilled artisans, handymen, and project experts for renovations, custom-builds, and repairs.</p>
              <form onSubmit={handleSubmit} className="search-bar relative">
                <input 
                  type="text" 
                  className="search-input pr-24" 
                  placeholder="Search for services (e.g., carpenter)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <VoiceSearch onResult={handleVoiceResult} />
                  <button type="submit" className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>

            <div className="image-column image-right">
              <div className="person-image">
                <img 
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=300&q=80" 
                  alt="Person with camera" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="person-image">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=300&q=80" 
                  alt="Woman with plants" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="person-image">
                <img 
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=300&q=80" 
                  alt="Craftsman with wood" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="features">
          <div className="feature-box">
            <div className="feature-icon">
              <Headphones />
            </div>
            <h3 className="feature-title">Service Provider</h3>
          </div>
          <div className="feature-box">
            <div className="feature-icon">
              <Package />
            </div>
            <h3 className="feature-title">Job Opportunities</h3>
          </div>
          <div className="feature-box">
            <div className="feature-icon">
              <Package />
            </div>
            <h3 className="feature-title">Materials</h3>
          </div>
          <div className="feature-box">
            <div className="feature-icon">
              <CheckSquare />
            </div>
            <h3 className="feature-title">Customized Service Request</h3>
          </div>
          <div className="feature-box">
            <div className="feature-icon">
              <Settings />
            </div>
            <h3 className="feature-title">Planned Maintenance</h3>
          </div>
        </div>
      </div>
    </div>
  );
};