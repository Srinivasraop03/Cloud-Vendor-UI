import axios from 'axios';
import { CloudVendor, ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const cloudVendorService = {
    getAllVendors: async (page = 0, size = 10, vendorName?: string) => {
        const params: any = { page, size };
        if (vendorName) params.vendorName = vendorName;
        const response = await api.get<ApiResponse<CloudVendor[]>>('/cloudvendor', { params });
        return response.data;
    },

    getVendor: async (vendorId: string) => {
        const response = await api.get<ApiResponse<CloudVendor>>(`/cloudvendor/${vendorId}`);
        return response.data;
    },

    createVendor: async (vendor: CloudVendor) => {
        const response = await api.post<ApiResponse<CloudVendor>>('/cloudvendor', vendor);
        return response.data;
    },

    updateVendor: async (vendor: CloudVendor) => {
        const response = await api.put<ApiResponse<CloudVendor>>('/cloudvendor', vendor);
        return response.data;
    },

    deleteVendor: async (vendorId: string) => {
        const response = await api.delete<ApiResponse<null>>(`/cloudvendor/${vendorId}`);
        return response.data;
    },
};
