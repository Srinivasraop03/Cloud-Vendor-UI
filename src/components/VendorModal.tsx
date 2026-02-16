'use client';

import React, { useState, useEffect } from 'react';
import { CloudVendor } from '@/types';
import { X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VendorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (vendor: CloudVendor) => void;
    initialData?: CloudVendor | null;
}

export const VendorModal: React.FC<VendorModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState<CloudVendor>({
        vendorId: '',
        vendorName: '',
        vendorAddress: '',
        vendorPhoneNumber: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                vendorId: '',
                vendorName: '',
                vendorAddress: '',
                vendorPhoneNumber: '',
            });
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(4px)'
                        }}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="glass-card"
                        style={{
                            width: '100%',
                            maxWidth: '500px',
                            padding: '32px',
                            position: 'relative',
                            zIndex: 1001,
                            background: '#1e293b'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                                {initialData ? 'Update Vendor' : 'Add New Vendor'}
                            </h2>
                            <button onClick={onClose} style={{ color: 'rgba(255,255,255,0.5)' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="input-group">
                                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '8px', color: 'rgba(255,255,255,0.6)' }}>Vendor ID</label>
                                <input
                                    disabled={!!initialData}
                                    required
                                    value={formData.vendorId}
                                    onChange={e => setFormData({ ...formData, vendorId: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid var(--card-border)',
                                        borderRadius: '8px',
                                        color: initialData ? 'rgba(255,255,255,0.3)' : 'white',
                                        outline: 'none'
                                    }}
                                    placeholder="e.g. V-001"
                                />
                            </div>

                            <div className="input-group">
                                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '8px', color: 'rgba(255,255,255,0.6)' }}>Vendor Name</label>
                                <input
                                    required
                                    value={formData.vendorName}
                                    onChange={e => setFormData({ ...formData, vendorName: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid var(--card-border)',
                                        borderRadius: '8px',
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                    placeholder="Company Name"
                                />
                            </div>

                            <div className="input-group">
                                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '8px', color: 'rgba(255,255,255,0.6)' }}>Address</label>
                                <input
                                    required
                                    value={formData.vendorAddress}
                                    onChange={e => setFormData({ ...formData, vendorAddress: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid var(--card-border)',
                                        borderRadius: '8px',
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                    placeholder="City, Country"
                                />
                            </div>

                            <div className="input-group">
                                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '8px', color: 'rgba(255,255,255,0.6)' }}>Phone Number</label>
                                <input
                                    required
                                    value={formData.vendorPhoneNumber}
                                    onChange={e => setFormData({ ...formData, vendorPhoneNumber: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid var(--card-border)',
                                        borderRadius: '8px',
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                    placeholder="+1-234-567-890"
                                />
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ marginTop: '12px', justifyContent: 'center' }}>
                                <Save size={18} />
                                <span>{initialData ? 'Update Infrastructure' : 'Deploy Vendor'}</span>
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
