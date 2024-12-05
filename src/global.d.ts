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
      FlutterwaveCheckout: (config: {
        public_key: string;
        tx_ref: string;
        amount: number;
        currency: string;
        payment_options?: string;
        meta?: Record<string, any>;
        customer: {
          email: string;
          phone_number?: string;
          name: string;
        };
        customizations?: {
          title?: string;
          description?: string;
          logo?: string;
        };
        configurations: {
            session_duration?: number, //Session timeout in minutes (maxValue: 1440 minutes)      
            max_retry_attempt?: number, //Max retry (int)
          },
        callback?: (data: any) => void;
        onclose?: () => void;
      }) => void;
    }
  }
  
  export {}; // Ensures the file is treated as a module
  
