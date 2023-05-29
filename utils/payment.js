import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

const makePayment = (name, phone_number, email, costToPay, title, desc) => {
    const config = {
        public_key: 'FLWPUBK-65224f1b280728a7286c4e6ad20a680c-X',
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