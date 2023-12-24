import ErrorResponse from "../util/errorResponse.js"

const errorHadler  = (err, req, res, next)=>{
    let error =err

    if(err.code===11000){  //if same value entered two times 
        const message = `Duplicate field value entered`
        error = new ErrorResponse(message,400)
    }

    if(err.name==='ValidationError'){  //validation like user not sending name but name is require in schema 
        const message = Object.values(err.errors)
        error = new ErrorResponse(message,422);
    }

    res.status(error.statusCode||500).json({success:false, errMsg:error.message||"Server error"})
}

export default errorHadler