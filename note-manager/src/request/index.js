export const request = (path,params)=>{
    if(params.method.toLowerCase()==='post'){

        const token = localStorage.getItem('token');
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

    return fetch(`http://localhost:8080/${path}`).then(response => {
        return response.json();
      })
}