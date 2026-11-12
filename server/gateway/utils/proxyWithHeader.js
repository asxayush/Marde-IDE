import proxy from "express-http-proxy";

export const proxyWithHeader = (serviceUrl, options = {}) => {
   return  proxy(serviceUrl,{
        ...options,
        proxyReqOptDecorator:(proxyReqOpt, req)=>{
            if(req.user) {
                proxyReqOpt.headers['x-user-id'] = req.user?._id;
            }
            return proxyReqOpt;
        }
    })
}