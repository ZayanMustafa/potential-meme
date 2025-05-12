"use client"


import React from 'react'



const PaymentSuccess = () => {

    async function updatePayment(){

        const getID = localStorage.getItem("orderId")

     try {
        
        const response = await fetch(`http://localhost:5000/orders/admin/${getID}` , 
            {
                method : 'PUT',
                  headers: {
                'Content-Type': 'application/json',
            },
                } 


            
        )
            


        const updateData  = await response.json()

        console.log(updateData)
     } catch (error) {
        
        console.log(error, "Error")

     } 



    }


    return (

    <>
        <button onClick={updatePayment} >
            Success 
        </button>
    </>


)
}

export default PaymentSuccess