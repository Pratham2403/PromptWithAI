"use client" // As we are using the browser cacpabilities so we have to use client side serving

// =============== All the Providers go to the Layout Component ======================// 

import { SessionProvider } from 'next-auth/react'

const Provider = ({children, session}) => { //These are the specific functionas which we need to implement
  return (
    <SessionProvider session={session}> {/* it is a higher order component hence needs to be wrapped around on everything. It will evenvbe wrapped arounf the layouts page which we have studied and discussed */}
      {children}
    </SessionProvider>
  )
}

export default Provider