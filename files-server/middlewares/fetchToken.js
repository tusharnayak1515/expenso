const fetchToken = async (req, res, next) => {
    let success;
    const secret = process.env.ACCESS_TOKEN;
    const token = req.header("access-token");
    if(!token) {
        success = false;
        return res.status(401).json({success, error: "Unauthorized!"});
    }
    if(token !== secret) {
        success = false;
        return res.status(401).json({success, error: "Invalid access token!"});
    }
    success = true;
    next();
  };
  
  module.exports = fetchToken;
  