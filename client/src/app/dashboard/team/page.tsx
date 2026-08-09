'use client';

import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Shield,
  Key,
  CheckCircle2,
  XCircle,
  Mail,
  Lock,
  Sliders,
  Trash2,
  Edit,
  Check,
  X,
  Target,
  Bot,
  Briefcase,
  FileText,
  Settings
} from 'lucide-react';

interface EmployeePermission {
  crm: boolean;
  ai_agent: boolean;
  campaigns: boolean;
  proposals: boolean;
  settings: boolean;
}

interface Employee {
  id: string;
  name: string;
  email: string;
  title: string;
  role: 'Manager' | 'Sales Rep' | 'Research Analyst';
  status: 'Active' | 'Invited' | 'Suspended';
  permissions: EmployeePermission;
  joined: string;
}

export default function TeamManagementPage() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 'emp-101',
      name: 'Sarah Jenkins',
      email: 'sarah.j@acme.com',
      title: 'Senior Sales Manager',
      role: 'Manager',
      status: 'Active',
      permissions: { crm: true, ai_agent: true, campaigns: true, proposals: true, settings: true },
      joined: '2026-01-15'
    },
    {
      id: 'emp-102',
      name: 'Michael Chang',
      email: 'm.chang@acme.com',
      title: 'Outbound BDR Lead',
      role: 'Sales Rep',
      status: 'Active',
      permissions: { crm: true, ai_agent: true, campaigns: true, proposals: false, settings: false },
      joined: '2026-02-01'
    },
    {
      id: 'emp-103',
      name: 'Emma Watson',
      email: 'e.watson@acme.com',
      title: 'Prospecting Analyst',
      role: 'Research Analyst',
      status: 'Active',
      permissions: { crm: false, ai_agent: true, campaigns: false, proposals: false, settings: false },
      joined: '2026-03-10'
    },
    {
      id: 'emp-104',
      name: 'David Miller',
      email: 'd.miller@acme.com',
      title: 'Account Executive',
      role: 'Sales Rep',
      status: 'Invited',
      permissions: { crm: true, ai_agent: false, campaigns: true, proposals: true, settings: false },
      joined: '2026-04-05'
    }
  ]);

  // Modal State for Creating Employee
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmpName, setNewEmpName] = useState('');
  const [newEmpEmail, setNewEmpEmail] = useState('');
  const [newEmpTitle, setNewEmpTitle] = useState('');
  const [newEmpRole, setNewEmpRole] = useState<'Manager' | 'Sales Rep' | 'Research Analyst'>('Sales Rep');
  const [newEmpPerms, setNewEmpPerms] = useState<EmployeePermission>({
    crm: true,
    ai_agent: true,
    campaigns: true,
    proposals: false,
    settings: false
  });

  // Toggle single permission for existing employee
  const togglePermission = (empId: string, permKey: keyof EmployeePermission) => {
    setEmployees(prev =>
      prev.map(emp => {
        if (emp.id === empId) {
          return {
            ...emp,
            permissions: {
              ...emp.permissions,
              [permKey]: !emp.permissions[permKey]
            }
          };
        }
        return emp;
      })
    );
  };

  // Create Employee Submit Handler
  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmpName || !newEmpEmail) return;

    const newEmp: Employee = {
      id: `emp-${Date.now().toString().slice(-4)}`,
      name: newEmpName,
      email: newEmpEmail,
      title: newEmpTitle || 'Sales Representative',
      role: newEmpRole,
      status: 'Active',
      permissions: { ...newEmpPerms },
      joined: new Date().toISOString().split('T')[0]
    };

    setEmployees(prev => [newEmp, ...prev]);
    setIsModalOpen(false);

    // Reset Form
    setNewEmpName('');
    setNewEmpEmail('');
    setNewEmpTitle('');
    setNewEmpPerms({ crm: true, ai_agent: true, campaigns: true, proposals: false, settings: false });
  };

  const deleteEmployee = (empId: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== empId));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Top Header & Create Employee Action */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users style={{ color: '#818cf8' }} size={28} /> Team & Employee Access Control
          </h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px', margin: '4px 0 0 0' }}>
            Andar se naye employees add karein aur unko CRM, AI Research, Campaigns aur Proposals ke custom access permissions dein.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: '12px 20px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
            color: '#ffffff',
            fontWeight: '700',
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <UserPlus size={18} /> Add New Employee
        </button>
      </div>

      {/* Access Permission Legend / Info Box */}
      <div
        style={{
          padding: '20px 24px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #1e1b4b 0%, #1e293b 100%)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
            <Key size={22} />
          </div>
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#ffffff', margin: 0 }}>Granular Employee Permissions</h4>
            <p style={{ fontSize: '13px', color: '#cbd5e1', margin: '2px 0 0 0' }}>
              Aap har employee ka access toggle karke control kar sakte hain. System sirf wahi modules unko show karega jiska access unko diya gaya hai.
            </p>
          </div>
        </div>
      </div>

      {/* Employees List Table */}
      <div style={{ background: '#1e293b', borderRadius: '16px', border: '1px solid #334155', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', color: '#cbd5e1' }}>
          <thead>
            <tr style={{ background: '#0f172a', borderBottom: '1px solid #334155', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em' }}>
              <th style={{ padding: '16px 20px' }}>Employee</th>
              <th style={{ padding: '16px 20px' }}>Role & Title</th>
              <th style={{ padding: '16px 20px' }}>Status</th>
              <th style={{ padding: '16px 20px', textAlign: 'center' }}>CRM Access</th>
              <th style={{ padding: '16px 20px', textAlign: 'center' }}>AI Agent</th>
              <th style={{ padding: '16px 20px', textAlign: 'center' }}>Campaigns</th>
              <th style={{ padding: '16px 20px', textAlign: 'center' }}>Proposals</th>
              <th style={{ padding: '16px 20px', textAlign: 'center' }}>Settings</th>
              <th style={{ padding: '16px 20px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} style={{ borderBottom: '1px solid #334155/60', transition: 'background 0.2s' }}>
                {/* Employee Name & Email */}
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', color: '#ffffff', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {emp.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', color: '#ffffff' }}>{emp.name}</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Mail size={11} /> {emp.email}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Role & Title */}
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ fontWeight: '600', color: '#f8fafc' }}>{emp.title}</div>
                  <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: '#0f172a', color: '#818cf8', fontWeight: '700', border: '1px solid #334155', display: 'inline-block', marginTop: '2px' }}>
                    {emp.role}
                  </span>
                </td>

                {/* Status */}
                <td style={{ padding: '16px 20px' }}>
                  {emp.status === 'Active' && (
                    <span style={{ padding: '3px 10px', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontSize: '11px', fontWeight: '700', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={12} /> Active
                    </span>
                  )}
                  {emp.status === 'Invited' && (
                    <span style={{ padding: '3px 10px', borderRadius: '9999px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', fontSize: '11px', fontWeight: '700', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      Invited
                    </span>
                  )}
                </td>

                {/* Permission Toggles */}
                <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                  <button
                    onClick={() => togglePermission(emp.id, 'crm')}
                    style={{ padding: '6px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: emp.permissions.crm ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.15)', color: emp.permissions.crm ? '#34d399' : '#fca5a5', fontWeight: '700', fontSize: '11px' }}
                  >
                    {emp.permissions.crm ? 'ALLOW' : 'DENY'}
                  </button>
                </td>

                <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                  <button
                    onClick={() => togglePermission(emp.id, 'ai_agent')}
                    style={{ padding: '6px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: emp.permissions.ai_agent ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.15)', color: emp.permissions.ai_agent ? '#34d399' : '#fca5a5', fontWeight: '700', fontSize: '11px' }}
                  >
                    {emp.permissions.ai_agent ? 'ALLOW' : 'DENY'}
                  </button>
                </td>

                <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                  <button
                    onClick={() => togglePermission(emp.id, 'campaigns')}
                    style={{ padding: '6px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: emp.permissions.campaigns ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.15)', color: emp.permissions.campaigns ? '#34d399' : '#fca5a5', fontWeight: '700', fontSize: '11px' }}
                  >
                    {emp.permissions.campaigns ? 'ALLOW' : 'DENY'}
                  </button>
                </td>

                <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                  <button
                    onClick={() => togglePermission(emp.id, 'proposals')}
                    style={{ padding: '6px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: emp.permissions.proposals ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.15)', color: emp.permissions.proposals ? '#34d399' : '#fca5a5', fontWeight: '700', fontSize: '11px' }}
                  >
                    {emp.permissions.proposals ? 'ALLOW' : 'DENY'}
                  </button>
                </td>

                <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                  <button
                    onClick={() => togglePermission(emp.id, 'settings')}
                    style={{ padding: '6px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: emp.permissions.settings ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.15)', color: emp.permissions.settings ? '#34d399' : '#fca5a5', fontWeight: '700', fontSize: '11px' }}
                  >
                    {emp.permissions.settings ? 'ALLOW' : 'DENY'}
                  </button>
                </td>

                {/* Actions */}
                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                  <button
                    onClick={() => deleteEmployee(emp.id)}
                    style={{ padding: '8px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.3)', cursor: 'pointer' }}
                    title="Remove Employee"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE EMPLOYEE MODAL DIALOG */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '520px', background: '#1e293b', borderRadius: '24px', border: '1px solid #334155', padding: '32px', boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserPlus size={22} style={{ color: '#818cf8' }} /> Create Employee Account
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateEmployee} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', marginBottom: '6px' }}>Full Name</label>
                <input
                  type="text"
                  required
                  value={newEmpName}
                  onChange={e => setNewEmpName(e.target.value)}
                  placeholder="e.g. Robert Vance"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', marginBottom: '6px' }}>Employee Work Email</label>
                <input
                  type="email"
                  required
                  value={newEmpEmail}
                  onChange={e => setNewEmpEmail(e.target.value)}
                  placeholder="r.vance@company.com"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', marginBottom: '6px' }}>Designation / Title</label>
                  <input
                    type="text"
                    value={newEmpTitle}
                    onChange={e => setNewEmpTitle(e.target.value)}
                    placeholder="Sales Executive"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', fontSize: '14px', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', marginBottom: '6px' }}>Role Type</label>
                  <select
                    value={newEmpRole}
                    onChange={e => setNewEmpRole(e.target.value as any)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', fontSize: '14px', outline: 'none' }}
                  >
                    <option value="Sales Rep">Sales Representative</option>
                    <option value="Research Analyst">Research Analyst</option>
                    <option value="Manager">Sales Manager</option>
                  </select>
                </div>
              </div>

              {/* PERMISSIONS CHECKBOX MATRIX */}
              <div style={{ marginTop: '12px', paddingTop: '16px', borderTop: '1px solid #334155' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#818cf8', marginBottom: '10px' }}>
                  Assign Module Permissions (Allow/Deny):
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={newEmpPerms.crm}
                      onChange={e => setNewEmpPerms(p => ({ ...p, crm: e.target.checked }))}
                    />
                    Target CRM Kanban
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={newEmpPerms.ai_agent}
                      onChange={e => setNewEmpPerms(p => ({ ...p, ai_agent: e.target.checked }))}
                    />
                    AI Research Agent
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={newEmpPerms.campaigns}
                      onChange={e => setNewEmpPerms(p => ({ ...p, campaigns: e.target.checked }))}
                    />
                    Outreach Campaigns
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={newEmpPerms.proposals}
                      onChange={e => setNewEmpPerms(p => ({ ...p, proposals: e.target.checked }))}
                    />
                    Proposals Generator
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={newEmpPerms.settings}
                      onChange={e => setNewEmpPerms(p => ({ ...p, settings: e.target.checked }))}
                    />
                    Business Settings
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div style={{ marginTop: '20px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: '10px 18px', borderRadius: '10px', background: '#0f172a', border: '1px solid #334155', color: '#cbd5e1', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '10px 22px', borderRadius: '10px', background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', border: 'none', color: '#ffffff', fontWeight: '800', fontSize: '13px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)' }}
                >
                  Create & Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
