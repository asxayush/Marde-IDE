import proxy from "express-http-proxy";

export const proxyWithHeader = (serviceUrl) => {
   return  proxy(serviceUrl,{
        proxyReqOptDecorator:(proxyReqOpt, req)=>{
            if(req.user) {
                proxyReqOpt.headers['x-user-id'] = req.user?._id;
            }
            return proxyReqOpt;
        }
    })
}