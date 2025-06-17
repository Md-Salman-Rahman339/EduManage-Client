import React, { useEffect, useState } from 'react'

const useClass = () => {
     const [menu, setMenu] = useState([]);
     const [loading, setLoading] = useState(true);
     useEffect(() => {
         fetch('http://127.0.0.1:8000/api/classes/')
             .then(res => res.json())
             .then(data => {
                 setMenu(data);
                 setLoading(false);
             });
     }, [])
  return [menu, loading]
}

export default useClass
