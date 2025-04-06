import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Phone, Mail, Calendar, Clock, Filter, ChevronDown } from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  specialty: string[];
  hourlyRate: number;
  availability: string;
  experience: string;
  description: string;
  contact: {
    phone: string;
    email: string;
  };
}

const MOCK_VENDORS: Record<string, Vendor[]> = {
  carpenter: [
    {
      id: '1',
      name: 'John Mensah',
      image: '/images/african-man-sweater.jpg',
      rating: 4.8,
      reviews: 127,
      location: 'Accra, Ghana',
      specialty: ['Custom Furniture', 'Cabinet Making', 'Wood Restoration'],
      hourlyRate: 45,
      availability: 'Available Now',
      experience: '8 years',
      description: 'Expert carpenter specializing in custom furniture and cabinetry.',
      contact: {
        phone: '+233 20 123 4567',
        email: 'john.m@emilist.com'
      }
    }
  ],
  electrician: [
    {
      id: '2',
      name: 'Sarah Mensah',
      image: '/images/african-woman-hardhat.jpg',
      rating: 4.8,
      reviews: 127,
      location: 'Accra, Ghana',
      specialty: ['Electrical Installation', 'Maintenance', 'Solar Systems'],
      hourlyRate: 45,
      availability: 'Available Now',
      experience: '8 years',
      description: 'Certified electrical engineer specializing in residential and commercial installations.',
      contact: {
        phone: '+233 20 123 4567',
        email: 'sarah.m@emilist.com'
      }
    }
  ],
  plumber: [
    {
      id: '3',
      name: 'Grace Adebayo',
      image: '/images/african-woman-hardhat-3.jpg',
      rating: 4.7,
      reviews: 98,
      location: 'Lagos, Nigeria',
      specialty: ['Pipe Installation', 'Leak Detection', 'Water Systems'],
      hourlyRate: 40,
      availability: 'Available Now',
      experience: '6 years',
      description: 'Licensed plumber specializing in modern plumbing systems and eco-friendly solutions.',
      contact: {
        phone: '+234 80 9876 5432',
        email: 'grace.a@emilist.com'
      }
    }
  ],
  painter: [
    {
      id: '4',
      name: 'David Okonkwo',
      image: '/images/african-man-sweater.jpg',
      rating: 4.9,
      reviews: 156,
      location: 'Lagos, Nigeria',
      specialty: ['Interior Painting', 'Exterior Painting', 'Decorative Finishes'],
      hourlyRate: 35,
      availability: 'Next Week',
      experience: '10 years',
      description: 'Professional painter with expertise in both residential and commercial projects.',
      contact: {
        phone: '+234 80 1234 5678',
        email: 'david.o@emilist.com'
      }
    }
  ],
  gardener: [
    {
      id: '5',
      name: 'Amara Koffi',
      image: '/images/african-woman-hardhat-2.jpg',
      rating: 4.7,
      reviews: 89,
      location: 'Abidjan, Ivory Coast',
      specialty: ['Landscape Design', 'Garden Maintenance', 'Plant Care'],
      hourlyRate: 30,
      availability: 'Tomorrow',
      experience: '5 years',
      description: 'Expert gardener specializing in sustainable landscape design and maintenance.',
      contact: {
        phone: '+225 07 123 4567',
        email: 'amara.k@emilist.com'
      }
    }
  ]
};

const VendorCard: React.FC<{ vendor: Vendor }> = ({ vendor }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
      <div className="aspect-w-16 aspect-h-9 relative">
        <img 
          src={vendor.image} 
          alt={vendor.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-xl font-semibold text-white">{vendor.name}</h3>
          <div className="flex items-center text-white/90">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="ml-1">{vendor.rating}</span>
            <span className="mx-1">•</span>
            <span>{vendor.reviews} reviews</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{vendor.location}</span>
          </div>
          <div className="text-green-600 font-semibold">${vendor.hourlyRate}/hr</div>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {vendor.specialty.slice(0, 2).map((spec, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm"
            >
              {spec}
            </span>
          ))}
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{vendor.experience} experience</span>
          <span className="mx-2">•</span>
          <span className="text-green-600">{vendor.availability}</span>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
            Contact
          </button>
          <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export const VendorsPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [sortBy, setSortBy] = useState('rating');
  const vendors = category ? MOCK_VENDORS[category] || [] : [];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 capitalize">
            {category} Experts
          </h1>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              Filters
            </button>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="rating">Highest Rated</option>
                <option value="price">Lowest Price</option>
                <option value="experience">Most Experienced</option>
              </select>
              <ChevronDown className="w-5 h-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>

        {vendors.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-xl text-gray-600">No vendors found in this category.</h2>
          </div>
        )}
      </div>
    </div>
  );
};