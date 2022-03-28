# Uses of use-hook-api

use-hook-api returns responseApi, cancelRequest, useApi, Axios

## Usage/Examples

```React
import { responseApi, cancelRequest, useApi, Axios } from 'use-hook-api'

Axios.defaults.baseURL='https://jsonplaceholder.typicode.com'

const getPostById=(id=1)=>{
    return responseApi(`/posts/${id}`,'get',null,{Content-Type:'application/json'})
}

const createPost=(data)=>{
    return responseApi(`/posts/${id}`,'post',data,{Content-Type:'application/json'})
}

//Fetch api on component render
export const showPost = () => {
const [,{data,loading,error,message}]=useApi(getPostById)

    console.log(data,loading,error,message)

}

//Fetch api on button click
export const showPostOnClick=()=>{
const [getApi,{data,loading,error,message}]=useApi()

console.log(data,loading,error,message)

    return(
        <button onClick={()=>getApi(getPostById(2))}>
        </button>
    )

}

//Post api on button click
export const showPostOnClick=()=>{
const [postApi,{data,loading,error,message}]=useApi()

console.log(data,loading,error,message)

    return(
        <button onClick={()=>postApi(createPost({userId:1,id:1,title:'test',body:'test body'}))}>
        </button>
    )

}


//Post api on button click and redirect
export const showPostOnClick=()=>{
const [postApi]=useApi()

console.log(data,loading,error,message)

const onButtonClick=()=>{
   const postData={userId:1,id:1,title:'test',body:'test body'}
   postApi(createPost(postData),(res)=>{
      if(!res.error) redirect('/url')
   })
}

    return(
        <button onClick={onButtonClick}>
        </button>
    )

}



```
