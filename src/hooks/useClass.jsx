import React, { useEffect, useState } from 'react'

const useClass = () => {
     const [menu, setMenu] = useState([]);
     const [loading, setLoading] = useState(true);
     useEffect(() => {
         fetch('http://localhost:5000/class')
             .then(res => res.json())
             .then(data => {
                 setMenu(data);
                 setLoading(false);
             });
     }, [])
  return [menu, loading]
}

export default useClass
