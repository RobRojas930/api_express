const customHeader = (req, res, next) =>
{
  try {
        const {api_key} = req.headers;
        if(api_key === 'rob-01')
        {
              next();
        }
        else{
          res.status(403).send({
            error:"API KEY INCORRECTA"
          })
        }
  } catch (e) {
    res.status(403).send({
      error:"ERROR_CUSTOM_HEADER"
    })
  }
}


module.exports = customHeader;
