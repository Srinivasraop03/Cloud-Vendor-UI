'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { VendorCard } from '@/components/VendorCard';
import { VendorModal } from '@/components/VendorModal';
import { cloudVendorService } from '@/services/cloudVendorService';
import { CloudVendor } from '@/types';
import { Search, Loader2, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [vendors, setVendors] = useState<CloudVendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<CloudVendor | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const response = await cloudVendorService.getAllVendors(0, 50, searchQuery);
      setVendors(response.data || []);
    } catch (error) {
      console.error('Failed to fetch vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchVendors();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSave = async (vendor: CloudVendor) => {
    try {
      if (editingVendor) {
        await cloudVendorService.updateVendor(vendor);
      } else {
        await cloudVendorService.createVendor(vendor);
      }
      setIsModalOpen(false);
      fetchVendors();
    } catch (error) {
      console.error('Failed to save vendor:', error);
      alert('Error saving vendor. Make sure the backend is running!');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to decommission this vendor node?')) {
      try {
        await cloudVendorService.deleteVendor(id);
        fetchVendors();
      } catch (error) {
        console.error('Failed to delete vendor:', error);
      }
    }
  };

  const openAddModal = () => {
    setEditingVendor(null);
    setIsModalOpen(true);
  };

  const openEditModal = (vendor: CloudVendor) => {
    setEditingVendor(vendor);
    setIsModalOpen(true);
  };

  return (
    <main style={{ paddingBottom: '100px' }}>
      <Navbar onAddClick={openAddModal} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Header Section */}
        <div style={{ marginBottom: '40px', marginTop: '40px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '8px' }}>Infrastructure Registry</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem' }}>
            Manage and monitor your global cloud vendor network in real-time.
          </p>
        </div>

        {/* Stats Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div className="glass-card" style={{ padding: '20px' }}>
            <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>Total Nodes</span>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Database size={24} color="var(--primary)" />
              {vendors.length}
            </div>
          </div>
          <div className="glass-card" style={{ padding: '20px' }}>
            <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>System Status</span>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary)' }}>Operational</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="glass-card" style={{
          padding: '8px 16px',
          marginBottom: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Search size={20} color="rgba(255,255,255,0.3)" />
          <input
            type="text"
            placeholder="Search providers by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              color: 'white',
              width: '100%',
              padding: '12px 0',
              fontSize: '1rem'
            }}
          />
        </div>

        {/* Grid Section */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
            <Loader2 className="animate-spin" size={48} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />
          </div>
        ) : (
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '24px'
            }}
          >
            <AnimatePresence>
              {vendors.map((vendor) => (
                <VendorCard
                  key={vendor.vendorId}
                  vendor={vendor}
                  onEdit={openEditModal}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && vendors.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '100px 20px',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '24px',
            border: '1px dashed var(--card-border)'
          }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem' }}>
              No infrastructure nodes found matching your criteria.
            </p>
          </div>
        )}
      </div>

      <VendorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingVendor}
      />

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </main>
  );
}
