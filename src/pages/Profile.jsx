import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import GitHubRepos from '../components/widgets/GitHubRepos';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Shield, Fingerprint, Upload, Check, Edit2, Loader2 } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(user?.user_metadata?.full_name || 'SYSTEM ADMINISTRATOR');
  const [uploading, setUploading] = useState(false);

  const handleNameSave = async () => {
    if (!nameInput.trim()) return;
    await updateProfile({ data: { full_name: nameInput } });
    setIsEditingName(false);
  };

  const handleImageUpload = async (event) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;

      // Upload to 'avatars' public bucket
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Save URL to user metadata
      await updateProfile({ data: { avatar_url: publicUrl } });

    } catch (error) {
      alert(`Upload Error: ${error.message}. Make sure you created the 'avatars' public bucket!`);
    } finally {
      setUploading(false);
    }
  };

  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full space-y-6">
        
        {/* Profile Header */}
        <div className="glass-panel p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-arc/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 relative z-10">
            
            {/* Avatar Upload Section */}
            <div className="relative group/avatar cursor-pointer">
              <div className="w-24 h-24 rounded-full border-2 border-arc/50 p-1 bg-background relative overflow-hidden">
                {uploading ? (
                  <div className="w-full h-full rounded-full bg-arc/10 flex items-center justify-center">
                     <Loader2 className="w-8 h-8 text-arc animate-spin" />
                  </div>
                ) : avatarUrl ? (
                  <img src={avatarUrl} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="w-full h-full rounded-full bg-arc/10 flex items-center justify-center">
                    <Fingerprint className="w-12 h-12 text-arc" />
                  </div>
                )}
                
                {/* Upload Overlay */}
                <div className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                  <Upload className="w-6 h-6 text-white mb-1" />
                  <span className="text-[8px] font-tech text-white uppercase">Upload</span>
                </div>
              </div>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                disabled={uploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
              />
            </div>
            
            {/* User Details Section */}
            <div className="text-center md:text-left flex-grow">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-1">
                {isEditingName ? (
                  <div className="flex items-center space-x-2">
                    <input 
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="bg-surface/50 border border-arc/50 rounded px-2 py-1 text-textMain font-tech uppercase text-2xl outline-none"
                      autoFocus
                    />
                    <button onClick={handleNameSave} className="text-green-400 hover:text-green-300">
                      <Check className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3 group/name cursor-pointer" onClick={() => setIsEditingName(true)}>
                    <h1 className="tech-heading text-3xl group-hover/name:text-arc transition-colors">
                      {user?.user_metadata?.full_name || 'SYSTEM ADMINISTRATOR'}
                    </h1>
                    <Edit2 className="w-4 h-4 text-textMuted group-hover/name:text-arc transition-colors" />
                  </div>
                )}
              </div>

              <p className="font-tech text-textMuted tracking-widest uppercase mb-4 flex items-center justify-center md:justify-start">
                <Shield className="w-4 h-4 mr-2 text-stark-gold" />
                Clearance Level: OMEGA
              </p>
              
              <div className="inline-block bg-background border border-surfaceBorder px-4 py-2 rounded">
                <p className="font-tech text-xs text-textMuted uppercase tracking-widest mb-1">Authenticated Identity</p>
                <p className="text-textMain">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Statistics Section */}
        <div className="flex-grow">
           {/* Replaced mock panels with actual GitHub Repos widget */}
           <GitHubRepos />
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Profile;
