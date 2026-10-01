const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.header("x-api-key");

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: "API Key wajib disertakan",
    });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({
      success: false,
      message: "API Key tidak valid",
    });
  }

  next();
};

module.exports = apiKeyMiddleware;