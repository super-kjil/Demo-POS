import React, { useEffect, useState } from 'react'
import { request } from '../../util/helper';

function HomePage() {
  const [home,setHome ] = useState([])
  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const res = await request("home", "get");
    if(res){
      setHome(res.list)
    }
  };

  return (
    <div>
      <h1>{home}</h1>
    </div>
  )
}

export default HomePage