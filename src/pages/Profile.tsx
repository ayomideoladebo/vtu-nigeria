import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Shield, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleSave = () => {
    // In a real app, this would make an API call
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-xl"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-neon-gradient rounded-lg">
            <User className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">My Profile</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your account information and preferences
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-6 rounded-xl text-center"
        >
          <div className="w-24 h-24 bg-neon-gradient rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-xl font-semibold mb-2">{user?.name}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{user?.email}</p>
          <div className="flex justify-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              user?.verified ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
            }`}>
              {user?.verified ? 'Verified' : 'Unverified'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20  text-blue-500 capitalize">
              {user?.role}
            </span>
          </div>
        </motion.div>

        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 glass p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Personal Information</h3>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-neon-gradient rounded-lg text-white hover-glow transition-all"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 rounded-lg text-white hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-3 glass rounded-lg border border-white/20 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-3 glass rounded-lg border border-white/20 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-3 glass rounded-lg border border-white/20 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Account Created */}
            <div>
              <label className="block text-sm font-medium mb-2">Member Since</label>
              <div className="p-3 glass rounded-lg border border-white/20">
                <p className="text-gray-600 dark:text-gray-300">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Security Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass p-6 rounded-xl"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-red-500/20 rounded-lg">
            <Shield className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold">Security Settings</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 glass rounded-lg">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Add an extra layer of security</p>
              </div>
              <button className="px-4 py-2 bg-neon-gradient rounded-lg text-white text-sm hover-glow transition-all">
                Enable
              </button>
            </div>

            <div className="flex items-center justify-between p-4 glass rounded-lg">
              <div>
                <p className="font-medium">Login Notifications</p>
                <p className="text-sm text-gray-500">Get notified of new logins</p>
              </div>
              <button className="px-4 py-2 bg-green-500 rounded-lg text-white text-sm">
                Enabled
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 glass rounded-lg">
              <div>
                <p className="font-medium">Change Password</p>
                <p className="text-sm text-gray-500">Update your password</p>
              </div>
              <button className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition-all">
                Change
              </button>
            </div>

            <div className="flex items-center justify-between p-4 glass rounded-lg">
              <div>
                <p className="font-medium">Account Verification</p>
                <p className="text-sm text-gray-500">Verify your identity</p>
              </div>
              <button className="px-4 py-2 bg-yellow-500 rounded-lg text-white text-sm">
                {user?.verified ? 'Verified' : 'Verify'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;