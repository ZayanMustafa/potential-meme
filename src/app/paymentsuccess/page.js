
import PaymentSuccess from '@/component/Payment/PaymentSuccess'
import React from 'react'

function SuccesPayment() {
  return (
<PaymentSuccess 
  transactionId="TX-C2WKZIIW"
  plan="Standard Inspection"
  amount="199"
  paymentMethod="Credit Card"
/>
  )
}

export default SuccesPayment
