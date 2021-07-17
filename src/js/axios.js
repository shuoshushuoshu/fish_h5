import axios from  'axios'
///request拦截器
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.put['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.put['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.put['Access-Control-Allow-Headers'] = 'Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE';

axios.interceptors.request.use(req  =>  {
  if(req.method === 'get' || req.method === 'post') {
    axios.defaults.transformRequest = [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  } 
  else if(req.method === 'put') {
    // axios.defaults.transformRequest = [function (data) {
    //   return data
    // }]
  }

  return req;
}, error =>  {
    return Promise.reject(error);
})
