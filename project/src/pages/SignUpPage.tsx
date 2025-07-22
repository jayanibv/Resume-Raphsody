import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Mail, Lock, User, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    
    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers
    };
  };

  const passwordValidation = validatePassword(formData.password);
  const isEmailValid = validateEmail(formData.email);
  const doPasswordsMatch = formData.password === formData.confirmPassword;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!passwordValidation.isValid) {
      setError('Password does not meet requirements');
      setLoading(false);
      return;
    }

    if (!doPasswordsMatch) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
  const response = await fetch("http://localhost/backend/signup.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      password: formData.password
    })
  });

  const result = await response.json();

  if (result.status === "success") {
    navigate("/templates");
  } else {
    setError(result.message || "Sign up failed. Please try again.");
  }
} catch (err: any) {
  setError(err.message || "Sign up failed. Please try again.");
} finally {
  setLoading(false);
}


  const ValidationIcon = ({ isValid }: { isValid: boolean }) => (
    isValid ? 
      <CheckCircle className="h-4 w-4 text-green-500" /> : 
      <XCircle className="h-4 w-4 text-red-500" />
  );

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
              <FileText className="h-12 w-12 text-purple-600" />
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Resume Rhapsody
              </span>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
            <p className="mt-2 text-gray-600">Join thousands of professionals</p>
          </div>
        </motion.div>

        <motion.form 
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>
              {formData.email && !isEmailValid && (
                <p className="mt-1 text-sm text-red-600">Please enter a valid email address</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center space-x-2 text-sm">
                    <ValidationIcon isValid={passwordValidation.minLength} />
                    <span className={passwordValidation.minLength ? 'text-green-600' : 'text-red-600'}>
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <ValidationIcon isValid={passwordValidation.hasUpperCase} />
                    <span className={passwordValidation.hasUpperCase ? 'text-green-600' : 'text-red-600'}>
                      One uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <ValidationIcon isValid={passwordValidation.hasLowerCase} />
                    <span className={passwordValidation.hasLowerCase ? 'text-green-600' : 'text-red-600'}>
                      One lowercase letter
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <ValidationIcon isValid={passwordValidation.hasNumbers} />
                    <span className={passwordValidation.hasNumbers ? 'text-green-600' : 'text-red-600'}>
                      One number
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Confirm your password"
                />
              </div>
              {formData.confirmPassword && !doPasswordsMatch && (
                <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
              )}
            </div>
          </div>

          {error && (
            <motion.div 
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || !passwordValidation.isValid || !doPasswordsMatch}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-medium text-purple-600 hover:text-purple-500 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default SignUpPage;