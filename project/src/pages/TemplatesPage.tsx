import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Star, Crown, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  isPremium: boolean;
  rating: number;
  preview: string;
  color: string;
}

const templates: Template[] = [
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    category: 'Professional',
    description: 'Clean, modern design perfect for tech and business roles',
    isPremium: false,
    rating: 4.8,
    preview: 'Modern layout with subtle colors',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'creative-designer',
    name: 'Creative Designer',
    category: 'Creative',
    description: 'Eye-catching design for creative professionals',
    isPremium: true,
    rating: 4.9,
    preview: 'Bold, artistic layout with creative flair',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'executive-classic',
    name: 'Executive Classic',
    category: 'Executive',
    description: 'Traditional, elegant design for senior positions',
    isPremium: true,
    rating: 4.7,
    preview: 'Professional, executive-level formatting',
    color: 'from-gray-600 to-gray-800'
  },
  {
    id: 'minimalist-clean',
    name: 'Minimalist Clean',
    category: 'Minimalist',
    description: 'Simple, clean design that focuses on content',
    isPremium: false,
    rating: 4.6,
    preview: 'Clean lines with excellent readability',
    color: 'from-green-500 to-teal-600'
  },
  {
    id: 'tech-innovator',
    name: 'Tech Innovator',
    category: 'Technology',
    description: 'Modern tech-focused design with innovative elements',
    isPremium: false,
    rating: 4.8,
    preview: 'Tech-savvy design with modern elements',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'academic-scholar',
    name: 'Academic Scholar',
    category: 'Academic',
    description: 'Professional academic format for researchers and educators',
    isPremium: true,
    rating: 4.5,
    preview: 'Traditional academic formatting',
    color: 'from-amber-500 to-orange-600'
  }
];

const TemplatesPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All Templates');

  const handleTemplateSelect = (templateId: string) => {
    navigate(`/editor/${templateId}`);
  };

  const categories = ['All Templates', ...new Set(templates.map(t => t.category))];

  const filteredTemplates = selectedCategory === 'All Templates' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Resume Rhapsody
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Choose Your Template
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select from our professionally designed templates, optimized for ATS systems and crafted by career experts
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleTemplateSelect(template.id)}
              >
                {/* Template Preview */}
                <div className={`h-48 bg-gradient-to-br ${template.color} flex items-center justify-center relative`}>
                  <div className="text-white text-center">
                    <FileText className="h-16 w-16 mx-auto mb-2 opacity-80" />
                    <p className="text-sm opacity-90">{template.preview}</p>
                  </div>
                  
                  {template.isPremium && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                      <Crown className="h-3 w-3" />
                      <span>Premium</span>
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {template.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{template.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-600 font-medium bg-purple-50 px-3 py-1 rounded-full">
                      {template.category}
                    </span>
                    <div className="flex items-center text-purple-600">
                      <span className="text-sm font-medium mr-2">Select</span>
                      <Zap className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Premium CTA */}
          <motion.div
            className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Crown className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
            <h3 className="text-2xl font-bold mb-4">Unlock Premium Templates</h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Get access to our exclusive premium templates designed by industry experts for maximum impact
            </p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Upgrade to Premium
            </button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default TemplatesPage;