import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Save, 
  ArrowLeft, 
  Sparkles, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Plus,
  Trash2,
  Edit3
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  experience: Array<{
    id: string;
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    year: string;
  }>;
  skills: string[];
}

const ResumeEditor = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const resumeRef = useRef<HTMLDivElement>(null);

  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      location: '',
      summary: ''
    },
    experience: [{
      id: '1',
      title: '',
      company: '',
      duration: '',
      description: ''
    }],
    education: [{
      id: '1',
      degree: '',
      school: '',
      year: ''
    }],
    skills: []
  });

  const [newSkill, setNewSkill] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const generateAISuggestions = async (field: string, context: string) => {
    setLoadingAI(true);
    // Simulate AI API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const suggestions = {
      summary: [
        'Experienced professional with a proven track record of delivering results',
        'Dynamic leader with expertise in driving business growth and innovation',
        'Results-oriented specialist with strong analytical and problem-solving skills'
      ],
      experience: [
        'Led cross-functional teams to achieve strategic objectives',
        'Implemented innovative solutions that improved efficiency by 30%',
        'Collaborated with stakeholders to drive project success'
      ]
    };
    
    setAiSuggestions(suggestions[field as keyof typeof suggestions] || []);
    setLoadingAI(false);
  };

  const handlePersonalInfoChange = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      title: '',
      company: '',
      duration: '',
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      year: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const downloadPDF = async () => {
    if (!resumeRef.current) return;
    
    setIsGeneratingPDF(true);
    
    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      const fileName = `${resumeData.personalInfo.name.replace(/\s+/g, '_') || 'Resume'}_Resume.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const getTemplateStyle = () => {
    switch (templateId) {
      case 'modern-professional':
        return 'modern-professional';
      case 'creative-designer':
        return 'creative-designer';
      case 'executive-classic':
        return 'executive-classic';
      case 'minimalist-clean':
        return 'minimalist-clean';
      case 'tech-innovator':
        return 'tech-innovator';
      case 'academic-scholar':
        return 'academic-scholar';
      default:
        return 'modern-professional';
    }
  };

  const renderResumePreview = () => {
    const templateStyle = getTemplateStyle();

    switch (templateStyle) {
      case 'creative-designer':
        return (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg max-w-2xl mx-auto" style={{ minHeight: '842px', width: '595px' }}>
            <div className="p-8">
              {/* Creative Header */}
              <div className="text-center mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-10 rounded-2xl"></div>
                <div className="relative p-6">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                    {resumeData.personalInfo.name || 'Your Name'}
                  </h1>
                  <div className="flex items-center justify-center space-x-6 text-gray-700 flex-wrap">
                    {resumeData.personalInfo.email && (
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">{resumeData.personalInfo.email}</span>
                      </div>
                    )}
                    {resumeData.personalInfo.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">{resumeData.personalInfo.phone}</span>
                      </div>
                    )}
                    {resumeData.personalInfo.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">{resumeData.personalInfo.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Summary */}
              {resumeData.personalInfo.summary && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3"></div>
                    About Me
                  </h2>
                  <p className="text-gray-700 leading-relaxed bg-white p-4 rounded-lg shadow-sm">
                    {resumeData.personalInfo.summary}
                  </p>
                </div>
              )}

              {/* Experience */}
              {resumeData.experience.some(exp => exp.title || exp.company) && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3"></div>
                    Experience
                  </h2>
                  <div className="space-y-6">
                    {resumeData.experience.map((exp) => (
                      exp.title || exp.company ? (
                        <div key={exp.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-400">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-gray-900 text-lg">
                              {exp.title}
                            </h3>
                            <span className="text-sm text-purple-600 font-medium">{exp.duration}</span>
                          </div>
                          <p className="text-purple-600 font-medium mb-2">{exp.company}</p>
                          {exp.description && (
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      ) : null
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {resumeData.skills.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3"></div>
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {resumeData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium border border-purple-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'executive-classic':
        return (
          <div className="bg-white shadow-lg max-w-2xl mx-auto border-t-4 border-gray-800" style={{ minHeight: '842px', width: '595px' }}>
            <div className="p-8">
              {/* Executive Header */}
              <div className="text-center mb-8 pb-6 border-b-2 border-gray-800">
                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-3 tracking-wide">
                  {resumeData.personalInfo.name || 'Your Name'}
                </h1>
                <div className="flex items-center justify-center space-x-8 text-gray-600">
                  {resumeData.personalInfo.email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{resumeData.personalInfo.email}</span>
                    </div>
                  )}
                  {resumeData.personalInfo.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{resumeData.personalInfo.phone}</span>
                    </div>
                  )}
                  {resumeData.personalInfo.location && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{resumeData.personalInfo.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Executive Summary */}
              {resumeData.personalInfo.summary && (
                <div className="mb-8">
                  <h2 className="text-xl font-serif font-bold text-gray-900 mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
                    Executive Summary
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-justify">
                    {resumeData.personalInfo.summary}
                  </p>
                </div>
              )}

              {/* Professional Experience */}
              {resumeData.experience.some(exp => exp.title || exp.company) && (
                <div className="mb-8">
                  <h2 className="text-xl font-serif font-bold text-gray-900 mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
                    Professional Experience
                  </h2>
                  <div className="space-y-6">
                    {resumeData.experience.map((exp) => (
                      exp.title || exp.company ? (
                        <div key={exp.id}>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg">
                                {exp.title}
                              </h3>
                              <p className="text-gray-700 font-medium">{exp.company}</p>
                            </div>
                            <span className="text-sm text-gray-600 font-medium">{exp.duration}</span>
                          </div>
                          {exp.description && (
                            <p className="text-gray-700 text-sm leading-relaxed mt-2">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      ) : null
                    ))}
                  </div>
                </div>
              )}

              {/* Core Competencies */}
              {resumeData.skills.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-serif font-bold text-gray-900 mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
                    Core Competencies
                  </h2>
                  <div className="grid grid-cols-2 gap-2">
                    {resumeData.skills.map((skill, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-gray-800 rounded-full mr-3"></div>
                        <span className="text-gray-700 text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'minimalist-clean':
        return (
          <div className="bg-white shadow-lg max-w-2xl mx-auto" style={{ minHeight: '842px', width: '595px' }}>
            <div className="p-12">
              {/* Minimalist Header */}
              <div className="mb-12">
                <h1 className="text-5xl font-light text-gray-900 mb-4">
                  {resumeData.personalInfo.name || 'Your Name'}
                </h1>
                <div className="space-y-1 text-gray-600">
                  {resumeData.personalInfo.email && (
                    <p className="text-sm">{resumeData.personalInfo.email}</p>
                  )}
                  {resumeData.personalInfo.phone && (
                    <p className="text-sm">{resumeData.personalInfo.phone}</p>
                  )}
                  {resumeData.personalInfo.location && (
                    <p className="text-sm">{resumeData.personalInfo.location}</p>
                  )}
                </div>
              </div>

              {/* Summary */}
              {resumeData.personalInfo.summary && (
                <div className="mb-12">
                  <p className="text-gray-700 leading-relaxed text-lg font-light">
                    {resumeData.personalInfo.summary}
                  </p>
                </div>
              )}

              {/* Experience */}
              {resumeData.experience.some(exp => exp.title || exp.company) && (
                <div className="mb-12">
                  <h2 className="text-sm font-medium text-gray-900 uppercase tracking-widest mb-8">
                    Experience
                  </h2>
                  <div className="space-y-8">
                    {resumeData.experience.map((exp) => (
                      exp.title || exp.company ? (
                        <div key={exp.id}>
                          <div className="flex justify-between items-baseline mb-2">
                            <h3 className="font-medium text-gray-900">
                              {exp.title}
                            </h3>
                            <span className="text-sm text-gray-500">{exp.duration}</span>
                          </div>
                          <p className="text-gray-600 mb-3">{exp.company}</p>
                          {exp.description && (
                            <p className="text-gray-700 text-sm leading-relaxed font-light">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      ) : null
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {resumeData.skills.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-sm font-medium text-gray-900 uppercase tracking-widest mb-8">
                    Skills
                  </h2>
                  <div className="space-y-2">
                    {resumeData.skills.map((skill, index) => (
                      <span key={index} className="inline-block text-gray-700 text-sm mr-6">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'tech-innovator':
        return (
          <div className="bg-gray-900 text-white shadow-lg max-w-2xl mx-auto" style={{ minHeight: '842px', width: '595px' }}>
            <div className="p-8">
              {/* Tech Header */}
              <div className="mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20 rounded-lg"></div>
                <div className="relative p-6">
                  <h1 className="text-4xl font-bold text-cyan-400 mb-3 font-mono">
                    {resumeData.personalInfo.name || 'Your Name'}
                  </h1>
                  <div className="flex items-center space-x-6 text-gray-300 flex-wrap">
                    {resumeData.personalInfo.email && (
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-cyan-400" />
                        <span className="text-sm font-mono">{resumeData.personalInfo.email}</span>
                      </div>
                    )}
                    {resumeData.personalInfo.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-cyan-400" />
                        <span className="text-sm font-mono">{resumeData.personalInfo.phone}</span>
                      </div>
                    )}
                    {resumeData.personalInfo.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-cyan-400" />
                        <span className="text-sm font-mono">{resumeData.personalInfo.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Summary */}
              {resumeData.personalInfo.summary && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-cyan-400 mb-4 font-mono flex items-center">
                    <span className="text-cyan-500 mr-2">{'>'}</span>
                    About
                  </h2>
                  <p className="text-gray-300 leading-relaxed bg-gray-800 p-4 rounded border-l-4 border-cyan-500">
                    {resumeData.personalInfo.summary}
                  </p>
                </div>
              )}

              {/* Experience */}
              {resumeData.experience.some(exp => exp.title || exp.company) && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-cyan-400 mb-4 font-mono flex items-center">
                    <span className="text-cyan-500 mr-2">{'>'}</span>
                    Experience
                  </h2>
                  <div className="space-y-6">
                    {resumeData.experience.map((exp) => (
                      exp.title || exp.company ? (
                        <div key={exp.id} className="bg-gray-800 p-4 rounded border-l-4 border-blue-500">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-white font-mono">
                              {exp.title}
                            </h3>
                            <span className="text-sm text-cyan-400 font-mono">{exp.duration}</span>
                          </div>
                          <p className="text-blue-400 font-mono mb-2">{exp.company}</p>
                          {exp.description && (
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      ) : null
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {resumeData.skills.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-cyan-400 mb-4 font-mono flex items-center">
                    <span className="text-cyan-500 mr-2">{'>'}</span>
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {resumeData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-800 text-cyan-400 px-3 py-1 rounded text-sm font-mono border border-cyan-500"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'academic-scholar':
        return (
          <div className="bg-white shadow-lg max-w-2xl mx-auto border-t-8 border-amber-600" style={{ minHeight: '842px', width: '595px' }}>
            <div className="p-8">
              {/* Academic Header */}
              <div className="text-center mb-8 pb-6 border-b border-amber-200">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                  {resumeData.personalInfo.name || 'Your Name'}
                </h1>
                <div className="text-gray-600 space-y-1">
                  {resumeData.personalInfo.email && (
                    <p className="text-sm">{resumeData.personalInfo.email}</p>
                  )}
                  {resumeData.personalInfo.phone && (
                    <p className="text-sm">{resumeData.personalInfo.phone}</p>
                  )}
                  {resumeData.personalInfo.location && (
                    <p className="text-sm">{resumeData.personalInfo.location}</p>
                  )}
                </div>
              </div>

              {/* Research Interests */}
              {resumeData.personalInfo.summary && (
                <div className="mb-8">
                  <h2 className="text-lg font-serif font-bold text-amber-700 mb-3 border-b border-amber-200 pb-1">
                    Research Interests
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-justify">
                    {resumeData.personalInfo.summary}
                  </p>
                </div>
              )}

              {/* Academic Experience */}
              {resumeData.experience.some(exp => exp.title || exp.company) && (
                <div className="mb-8">
                  <h2 className="text-lg font-serif font-bold text-amber-700 mb-3 border-b border-amber-200 pb-1">
                    Academic Experience
                  </h2>
                  <div className="space-y-4">
                    {resumeData.experience.map((exp) => (
                      exp.title || exp.company ? (
                        <div key={exp.id}>
                          <div className="flex justify-between items-start mb-1">
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {exp.title}
                              </h3>
                              <p className="text-gray-700 italic">{exp.company}</p>
                            </div>
                            <span className="text-sm text-gray-600">{exp.duration}</span>
                          </div>
                          {exp.description && (
                            <p className="text-gray-700 text-sm leading-relaxed mt-2">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      ) : null
                    ))}
                  </div>
                </div>
              )}

              {/* Skills & Expertise */}
              {resumeData.skills.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-serif font-bold text-amber-700 mb-3 border-b border-amber-200 pb-1">
                    Skills & Expertise
                  </h2>
                  <div className="grid grid-cols-1 gap-1">
                    {resumeData.skills.map((skill, index) => (
                      <p key={index} className="text-gray-700 text-sm">
                        • {skill}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default: // modern-professional
        return (
          <div className="bg-white shadow-lg max-w-2xl mx-auto" style={{ minHeight: '842px', width: '595px' }}>
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-6 pb-6 border-b-2 border-purple-600">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {resumeData.personalInfo.name || 'Your Name'}
                </h1>
                <div className="flex items-center justify-center space-x-4 text-gray-600">
                  {resumeData.personalInfo.email && (
                    <div className="flex items-center space-x-1">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{resumeData.personalInfo.email}</span>
                    </div>
                  )}
                  {resumeData.personalInfo.phone && (
                    <div className="flex items-center space-x-1">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{resumeData.personalInfo.phone}</span>
                    </div>
                  )}
                  {resumeData.personalInfo.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{resumeData.personalInfo.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Summary */}
              {resumeData.personalInfo.summary && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-purple-600 mb-3 border-b border-gray-200 pb-1">
                    Professional Summary
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {resumeData.personalInfo.summary}
                  </p>
                </div>
              )}

              {/* Experience */}
              {resumeData.experience.some(exp => exp.title || exp.company) && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-purple-600 mb-3 border-b border-gray-200 pb-1">
                    Work Experience
                  </h2>
                  <div className="space-y-4">
                    {resumeData.experience.map((exp) => (
                      exp.title || exp.company ? (
                        <div key={exp.id}>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-semibold text-gray-900">
                              {exp.title} {exp.company && `at ${exp.company}`}
                            </h3>
                            <span className="text-sm text-gray-600">{exp.duration}</span>
                          </div>
                          {exp.description && (
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      ) : null
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {resumeData.education.some(edu => edu.degree || edu.school) && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-purple-600 mb-3 border-b border-gray-200 pb-1">
                    Education
                  </h2>
                  <div className="space-y-2">
                    {resumeData.education.map((edu) => (
                      edu.degree || edu.school ? (
                        <div key={edu.id} className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                            <p className="text-gray-700 text-sm">{edu.school}</p>
                          </div>
                          <span className="text-sm text-gray-600">{edu.year}</span>
                        </div>
                      ) : null
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {resumeData.skills.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-purple-600 mb-3 border-b border-gray-200 pb-1">
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/templates')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Templates</span>
              </button>
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-purple-600" />
                <span className="text-lg font-semibold text-gray-900">Resume Editor</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={downloadPDF}
                disabled={isGeneratingPDF}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                <span>{isGeneratingPDF ? 'Generating...' : 'Download PDF'}</span>
              </button>
              <span className="text-gray-700">Hi, {user?.name}</span>
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

      <div className="flex max-w-7xl mx-auto">
        {/* Editor Panel */}
        <div className="w-1/2 p-6 overflow-y-auto max-h-screen">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Personal Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-purple-600" />
                Personal Information
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={resumeData.personalInfo.name}
                  onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Professional Summary</label>
                    <button
                      onClick={() => generateAISuggestions('summary', resumeData.personalInfo.summary)}
                      className="flex items-center space-x-1 text-purple-600 text-sm hover:text-purple-700"
                      disabled={loadingAI}
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>{loadingAI ? 'Generating...' : 'AI Suggest'}</span>
                    </button>
                  </div>
                  <textarea
                    placeholder="Brief professional summary"
                    value={resumeData.personalInfo.summary}
                    onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {aiSuggestions.length > 0 && (
                    <div className="mt-2 space-y-2">
                      <p className="text-sm text-gray-600">AI Suggestions:</p>
                      {aiSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handlePersonalInfoChange('summary', suggestion)}
                          className="block w-full text-left p-2 text-sm bg-purple-50 hover:bg-purple-100 rounded border border-purple-200"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Work Experience */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Edit3 className="h-5 w-5 mr-2 text-purple-600" />
                  Work Experience
                </h3>
                <button
                  onClick={addExperience}
                  className="flex items-center space-x-1 text-purple-600 hover:text-purple-700"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Experience</span>
                </button>
              </div>
              <div className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-sm font-medium text-gray-700">Experience {index + 1}</span>
                      {resumeData.experience.length > 1 && (
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Job Title"
                        value={exp.title}
                        onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <input
                        type="text"
                        placeholder="Duration (e.g., Jan 2020 - Present)"
                        value={exp.duration}
                        onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <textarea
                        placeholder="Job description and achievements"
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-purple-600" />
                  Education
                </h3>
                <button
                  onClick={addEducation}
                  className="flex items-center space-x-1 text-purple-600 hover:text-purple-700"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Education</span>
                </button>
              </div>
              <div className="space-y-6">
                {resumeData.education.map((edu, index) => (
                  <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-sm font-medium text-gray-700">Education {index + 1}</span>
                      {resumeData.education.length > 1 && (
                        <button
                          onClick={() => removeEducation(edu.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <input
                        type="text"
                        placeholder="School/University"
                        value={edu.school}
                        onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <input
                        type="text"
                        placeholder="Year (e.g., 2020)"
                        value={edu.year}
                        onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                Skills
              </h3>
              <div className="flex space-x-2 mb-4">
                <input
                  type="text"
                  placeholder="Add a skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={addSkill}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => removeSkill(index)}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Preview Panel */}
        <div className="w-1/2 p-6 bg-gray-100 overflow-y-auto max-h-screen">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Live Preview</h2>
              <p className="text-sm text-gray-600">Template: {templateId?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
            </div>

            {/* Resume Preview */}
            <div ref={resumeRef}>
              {renderResumePreview()}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;