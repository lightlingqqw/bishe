export const request = (path,params)=>{
    const token = localStorage.getItem('token');
    if(params&&params.method.toLowerCase()==='post'){
        
        params = {
          ...params,
          body:JSON.stringify(params.body),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        };
        return fetch(`http://localhost:8080/${path}`,params).then(response => {
            let data = response.json();
            if(data.code!==1){
              // window.location.href = "/login";
            }
            return data;
          })
    }

    params = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    return fetch(`http://localhost:8080/${path}`,params).then(response => {
        return response.json();
        
      })
}