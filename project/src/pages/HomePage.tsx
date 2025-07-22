import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Users, 
  Award, 
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  Calendar,
  User
} from 'lucide-react';

const HomePage = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FileText className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Resume Rhapsody
              </span>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('blog')}
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                Blog
              </button>
              <Link 
                to="/login"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Your Dream Job
              <br />
              Starts Here
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Create stunning, ATS-friendly resumes with the power of AI. 
              Stand out from the crowd and land your dream job with Resume Rhapsody.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link 
                to="/signup"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <button 
                onClick={() => scrollToSection('features')}
                className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300"
              >
                Learn More
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create professional resumes that get noticed
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="h-8 w-8" />,
                title: "AI-Powered Content",
                description: "Get intelligent suggestions for your resume content based on your industry and role"
              },
              {
                icon: <FileText className="h-8 w-8" />,
                title: "Professional Templates",
                description: "Choose from dozens of ATS-friendly templates designed by career experts"
              },
              {
                icon: <Download className="h-8 w-8" />,
                title: "Instant PDF Download",
                description: "Download your resume as a high-quality PDF ready for job applications"
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Real-time Editing",
                description: "See your changes instantly with our intuitive drag-and-drop editor"
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "ATS Optimized",
                description: "All templates are optimized to pass Applicant Tracking Systems"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Expert Support",
                description: "Get help from our team of career coaches and resume experts"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-purple-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Career Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert tips and insights to help you advance your career
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "10 Resume Mistakes That Cost You Interviews",
                excerpt: "Avoid these common pitfalls that make recruiters skip your resume",
                author: "Sarah Johnson",
                date: "Dec 15, 2024",
                readTime: "5 min read"
              },
              {
                title: "How to Write a Cover Letter That Gets Noticed",
                excerpt: "Craft compelling cover letters that complement your resume perfectly",
                author: "Mike Chen",
                date: "Dec 12, 2024",
                readTime: "7 min read"
              },
              {
                title: "Remote Work Resume Tips for 2024",
                excerpt: "Optimize your resume for remote and hybrid job opportunities",
                author: "Emily Davis",
                date: "Dec 10, 2024",
                readTime: "6 min read"
              }
            ].map((article, index) => (
              <motion.article 
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{article.date}</span>
                    <span className="mx-2">•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-purple-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{article.author}</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have transformed their careers with Resume Rhapsody
            </p>
            <Link 
              to="/signup"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
            >
              <span>Start Building Your Resume</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <FileText className="h-8 w-8 text-purple-400 mr-2" />
            <span className="text-2xl font-bold">Resume Rhapsody</span>
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Resume Rhapsody. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;