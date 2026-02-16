'use client';

import React from 'react';
import { CloudVendor } from '@/types';
import { MapPin, Phone, Edit2, Trash2, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface VendorCardProps {
    vendor: CloudVendor;
    onEdit: (vendor: CloudVendor) => void;
    onDelete: (id: string) => void;
}

export const VendorCard: React.FC<VendorCardProps> = ({ vendor, onEdit, onDelete }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -5 }}
            className="glass-card"
            style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}
        >
            <div style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                opacity: 0.05
            }}>
                <Building2 size={120} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                    <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        color: 'var(--primary)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        ID: {vendor.vendorId}
                    </span>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '4px' }}>{vendor.vendorName}</h3>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        onClick={() => onEdit(vendor)}
                        className="btn-outline"
                        style={{ padding: '8px', borderRadius: '8px' }}
                    >
                        <Edit2 size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(vendor.vendorId)}
                        className="btn-outline"
                        style={{ padding: '8px', borderRadius: '8px', color: 'var(--accent)' }}
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.7)' }}>
                    <MapPin size={16} />
                    <span style={{ fontSize: '0.9rem' }}>{vendor.vendorAddress}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.7)' }}>
                    <Phone size={16} />
                    <span style={{ fontSize: '0.9rem' }}>{vendor.vendorPhoneNumber}</span>
                </div>
            </div>

            <div style={{
                marginTop: '24px',
                paddingTop: '16px',
                borderTop: '1px solid var(--card-border)',
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                <div style={{
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: 'var(--secondary)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                }}>
                    Active Node
                </div>
            </div>
        </motion.div>
    );
};
