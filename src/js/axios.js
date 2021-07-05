import axios from "axios"

export default function AXIOS_POST (url, options) {
  return new Promise((resolve,reject)=>{
    axios({
      method:"post",
      url:url,
      headers:{
       'Content-type': 'application/x-www-form-urlencoded'
      },
      data:options,
      transformRequest: [function (data) {
       let ret = ''
       for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
       }
       return ret
       }],
     }).then(res=>{
       resolve(res)
     }).catch(err =>{
       reject(err)
     })
  })

}

// export default function AXIOS_GET (url, data) {
//   return new Promise((resolve,reject)=>{
//     axios({
//     method:"get",
//     url:url,
//     headers:{
//      'Content-type': 'application/x-www-form-urlencoded'
//     },
//     data: data,
//     }).then(res=>{
//       resolve(res)
//     }).catch(err=>{
//       reject(err)
//     })
//   })
// }
