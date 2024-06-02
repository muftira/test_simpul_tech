import React, {useState, useEffect} from 'react'

//components
import Loading from './loading'

export default function listChat(porps) {
    const { setInboxPage } = porps;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setTimeout(() => setLoading(false), 2000);
    }, [])
    
  return (
    <div className="container-inbox">
      <input type="text" id="inboxSearch" placeholder="Search" />
      {loading ? <Loading type="spin" color="#C4C4C4"/> : <div
        className="w-100 d-flex flex-row "
        style={{
          borderBottom: "1px solid #828282",
          padding: "22px 0px 22px 0px",
          cursor: 'pointer'
        }}
        onClick={() => setInboxPage(2)}
      >
        <div style={{ marginRight: "22px" }}>
          <img src="/profile_picture.svg" />
        </div>
        <div >
          <div className="d-flex flex-row">
            <p className="mb-0 font-size-16 font-weight-600" style={{color: "#2F80ED", maxWidth: '400px' }}>109220-Naturalization</p>
            <p className="mb-0" style={{marginLeft: "22px"}}>January 1,2021 19:10</p>
          </div>
          <div>
          <p className="mb-0 font-size-14 font-weight-600">Cameron Phillips :</p>
          <p className="mb-0">Please check this out!</p>
            
          </div>
        </div>
      </div>}
      
    </div>
  )
}
