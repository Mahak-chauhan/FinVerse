import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCog, FaLock, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { updateProfile as updateProfileApi, updatePassword as updatePasswordApi } from '../services/userService';
import { getInitials } from '../utils/formatters';

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const [profileForm, setProfileForm] = useState({ name: user?.name || '' });
  const [savingProfile, setSavingProfile] = useState(false);

  const [passForm, setPassForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [savingPass, setSavingPass] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!profileForm.name.trim()) {
      showError('Name cannot be empty');
      return;
    }
    setSavingProfile(true);
    try {
      const res = await updateProfileApi({ name: profileForm.name });
      updateUser(res.data.data);
      showSuccess('Profile updated successfully');
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passForm.newPassword !== passForm.confirmPassword) {
      showError('New passwords do not match');
      return;
    }
    if (passForm.newPassword.length < 6) {
      showError('New password must be at least 6 characters');
      return;
    }
    setSavingPass(true);
    try {
      await updatePasswordApi({
        currentPassword: passForm.currentPassword,
        newPassword: passForm.newPassword,
      });
      showSuccess('Password updated successfully');
      setPassForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to update password');
    } finally {
      setSavingPass(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="animate-fade">
      <div className="mb-4">
        <h2 className="page-title mb-1">Profile</h2>
        <p className="page-subtitle mb-0">Manage your account settings.</p>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="glass-card p-4 text-center">
            <div
              className="mx-auto d-flex align-items-center justify-content-center rounded-circle mb-3"
              style={{
                width: '96px',
                height: '96px',
                background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                color: '#fff',
                fontSize: '2rem',
                fontWeight: '700',
                boxShadow: '0 8px 24px rgba(99,102,241,0.35)',
              }}
            >
              {getInitials(user?.name)}
            </div>
            <h4 className="fw-bold mb-1">{user?.name}</h4>
            <p className="text-muted mb-0">{user?.email}</p>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="glass-card p-4 mb-4">
            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <FaUserCog className="brand-text" /> Update Profile
            </h5>
            <form onSubmit={handleProfileSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent">
                    <FaUser className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ name: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={user?.email || ''}
                  disabled
                />
                <small className="text-muted">Email cannot be changed.</small>
              </div>
              <button type="submit" className="btn-gradient btn" disabled={savingProfile}>
                {savingProfile ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </form>
          </div>

          <div className="glass-card p-4 mb-4">
            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <FaLock className="brand-text" /> Update Password
            </h5>
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={passForm.currentPassword}
                  onChange={(e) => setPassForm({ ...passForm, currentPassword: e.target.value })}
                  required
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={passForm.newPassword}
                    onChange={(e) => setPassForm({ ...passForm, newPassword: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={passForm.confirmPassword}
                    onChange={(e) => setPassForm({ ...passForm, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn-gradient btn" disabled={savingPass}>
                {savingPass ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Updating...
                  </>
                ) : (
                  'Update Password'
                )}
              </button>
            </form>
          </div>

          <div className="glass-card p-4">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h5 className="fw-bold mb-1">Sign Out</h5>
                <p className="text-muted mb-0 small">Log out of your account on this device.</p>
              </div>
              <button className="btn btn-outline-danger d-flex align-items-center gap-2" onClick={handleLogout}>
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
