declare global {
    interface Window {
        Korapay: {
            initialize: (config: {
                key: string;
                reference: string;
                amount: number;
                currency: string;
                customer: {
                    name: string;
                    email: string;
                };
                onClose?: () => void;
                onSuccess?: (data: any) => void;
                onFailed?: (data: any) => void;
            }) => void;
        };
    }
}

export {};
