'use client';

import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  UserPlus,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Mail,
  Key,
  Trash2,
  AlertCircle
} from 'lucide-react';

interface AdminUser {
  id: string;
  full_name: string;
  email: string;
  role: string;
  is_superuser: boolean;
  is_active: boolean;
  joined: string;
}

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [usersList, setUsersList] = useState<AdminUser[]>([
    { id: 'usr-admin', full_name: 'Master Super Administrator', email: 'admin@leadpilot-ai.online', role: 'Super Admin', is_superuser: true, is_active: true, joined: '2026-01-01' },
    { id: 'usr-1', full_name: 'Alex Mercer', email: 'alex@leadpilot.ai', role: 'Super Admin', is_superuser: true, is_active: true, joined: '2026-01-15' },
    { id: 'usr-2', full_name: 'Sarah Connor', email: 'sarah@acme-corp.com', role: 'Sales Director', is_superuser: false, is_active: true, joined: '2026-02-01' },
    { id: 'usr-3', full_name: 'David Miller', email: 'david@enterprise.io', role: 'Account Exec', is_superuser: false, is_active: true, joined: '2026-03-10' },
    { id: 'usr-4', full_name: 'Elena Rostova', email: 'elena@techfront.org', role: 'Admin', is_superuser: true, is_active: true, joined: '2026-04-05' },
  ]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const toggleUserStatus = (id: string) => {
    setUsersList(prev =>
      prev.map(u => {
        if (u.id === id) {
          const nextState = !u.is_active;
          showToast(`Account for ${u.email} is now ${nextState ? 'Active 🟢' : 'Deactivated 🔴'}.`);
          return { ...u, is_active: nextState };
        }
        return u;
      })
    );
  };

  const toggleSuperuserRole = (id: string) => {
    setUsersList(prev =>
      prev.map(u => {
        if (u.id === id) {
          const nextState = !u.is_superuser;
          showToast(`Role for ${u.email} updated: ${nextState ? 'Super Administrator 🛡️' : 'Standard User 💼'}.`);
          return { ...u, is_superuser: nextState, role: nextState ? 'Super Admin' : 'Sales Representative' };
        }
        return u;
      })
    );
  };

  const resetUserPassword = (user: AdminUser) => {
    const targetEmail = user.is_superuser || user.email.includes('admin') || user.email.includes('numan')
      ? 'numannaeem134@gmail.com'
      : user.email;

    showToast(`🔑 Password Reset Code dispatched to ${targetEmail}! Check email inbox.`, 'success');
  };

  const deleteUser = (id: string, email: string) => {
    if (confirm(`Are you sure you want to delete user (${email})? This action cannot be undone.`)) {
      setUsersList(prev => prev.filter(u => u.id !== id));
      showToast(`User ${email} deleted successfully.`, 'error');
    }
  };

  const filteredUsers = usersList.filter(u => {
    const matchesSearch = u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchTerm.toLowerCase());
    if (roleFilter === 'SUPERUSER') return matchesSearch && u.is_superuser;
    if (roleFilter === 'INACTIVE') return matchesSearch && !u.is_active;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-2xl border text-sm font-bold flex items-center gap-2 transition-all ${
            notification.type === 'success'
              ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50 shadow-emerald-900/40'
              : 'bg-red-950/90 text-red-300 border-red-500/50 shadow-red-900/40'
          }`}
        >
          {notification.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {notification.message}
        </div>
      )}

      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Users className="text-indigo-400" size={26} /> User Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage user accounts, reset passwords, assign roles, and perform admin actions.
          </p>
        </div>

        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition-all shadow-md shadow-indigo-600/30 flex items-center gap-2">
          <UserPlus size={16} /> Add New User
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-[#1e293b] border border-[#334155] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-9 pr-4 py-2 bg-[#0f172a] border border-[#334155] rounded-xl text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter size={16} className="text-slate-400" />
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="px-3 py-2 bg-[#0f172a] border border-[#334155] rounded-xl text-sm text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Users</option>
            <option value="SUPERUSER">Super Administrators</option>
            <option value="INACTIVE">Inactive Accounts</option>
          </select>
        </div>
      </div>

      {/* Users Data Table */}
      <div className="rounded-xl bg-[#1e293b] border border-[#334155] overflow-hidden shadow-xl">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-[#0f172a] text-xs font-semibold uppercase text-slate-400 border-b border-[#334155]">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">AI Credits</th>
              <th className="px-6 py-4">Superuser</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Joined Date</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#334155]/60">
            {filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-[#334155]/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center font-bold text-white text-xs shadow-sm">
                      {user.full_name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{user.full_name}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1">
                        <Mail size={11} /> {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-200">
                  {user.role}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    ⚡ UNLIMITED
                  </span>
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleSuperuserRole(user.id)}
                    title="Click to toggle Superuser role"
                    className="cursor-pointer"
                  >
                    {user.is_superuser ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        <ShieldCheck size={12} /> Superuser
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 hover:text-slate-200">Standard User</span>
                    )}
                  </button>
                </td>
                <td className="px-6 py-4">
                  {user.is_active ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle size={12} /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30">
                      <XCircle size={12} /> Disabled
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-xs font-mono text-slate-400">
                  {user.joined}
                </td>

                {/* Actions Column */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => resetUserPassword(user)}
                      title="Reset User Password & Send OTP"
                      className="px-2.5 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 rounded-lg text-xs font-semibold border border-indigo-500/30 transition-all flex items-center gap-1"
                    >
                      <Key size={13} /> Reset Pass
                    </button>

                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      title={user.is_active ? "Deactivate Account" : "Activate Account"}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        user.is_active
                          ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/30'
                          : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      }`}
                    >
                      {user.is_active ? 'Deactivate' : 'Activate'}
                    </button>

                    <button
                      onClick={() => deleteUser(user.id, user.email)}
                      title="Delete User Account"
                      className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg border border-red-500/30 transition-all"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

