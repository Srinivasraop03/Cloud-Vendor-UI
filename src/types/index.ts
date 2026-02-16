export interface CloudVendor {
    vendorId: string;
    vendorName: string;
    vendorAddress: string;
    vendorPhoneNumber: string;
}

export interface ApiResponse<T> {
    message: string;
    httpStatus: string;
    data: T | {
        content: T;
        totalPages: number;
        totalElements: number;
        size: number;
        number: number;
    };
}
