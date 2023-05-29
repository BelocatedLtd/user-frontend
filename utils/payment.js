import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

const makePayment = (name, phone_number, email, costToPay, title, desc) => {
    const config = {
        public_key: process.env.FLUTTER_PUBLIC_KEY,
        tx_ref: Date.now(),
        amount: costToPay,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
          email,
          phone_number,
          name,
        },
        customizations: {
          title: title,
          description: desc,
        },
      };
    
     useFlutterwave(config)
}

export default makePayment