'use client';

import React from 'react';
import { Cloud, LayoutDashboard, Plus } from 'lucide-react';

interface NavbarProps {
    onAddClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onAddClick }) => {
    return (
        <nav className="glass-card" style={{
            margin: '20px',
            padding: '12px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: '20px',
            zIndex: 100
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                    background: 'var(--primary)',
                    padding: '8px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Cloud size={24} color="white" />
                </div>
                <h1 style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
                    Nebula<span style={{ color: 'var(--primary)' }}>Vendor</span>
                </h1>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
                <button className="btn btn-primary" onClick={onAddClick}>
                    <Plus size={18} />
                    <span>New Vendor</span>
                </button>
            </div>
        </nav>
    );
};
