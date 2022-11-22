import React from 'react'
import supabase from '../src/Config/supaBaseClient'

const simple = () => {

    const clickHandler = async () => {
        // let reponse = await supabase.rpc("update_wallet_and_transaction_table",{
        //     amount:100,
        //     id:"077a96da-438b-49ba-8ea5-70a00cdad6f1",
        //     sender:"manoj",
        //     receiver:"suhas",
        //     date:new Date().toLocaleDateString.toString(),
        //     message:"party",
        //     type:"credit"
        // })
        let response = await supabase.rpc("update_wallet_balance",{amount:199}) 
        console.log(response)
        if(response.data == true){
            let resp = await supabase.rpc("update_transaction_details",{
                amount:"599",
                sender:"vishwas",
                receiver:"suhas",
                message:"party",
                id:"48411b68-274e-4ee3-8f0f-34315aa7878a",
                type:"credit"
            })

            console.log(resp)
        }
    }

  return (
    <div>
        <h1>simple</h1>
        <button onClick={clickHandler}>click</button>
    </div>
  )
}

export default simple
