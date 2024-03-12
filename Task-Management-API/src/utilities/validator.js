
const isValidBody = (values)=>{
    return Object.keys(values).length > 0 
}

const isValidInputValue = (value)=>{
    if(typeof value === 'undefined' || value === null ) return false
    if(typeof value === 'string'  &&  value.trim().length >0) return true
    return false
}

const IsvalidOnlyCharacter = (value)=>{
    const regexforalphabet =  /^[A-Za-z]+$/
    return regexforalphabet.test(value)
}

const IsvalidOnlyNumber = (value)=>{
    if (typeof (value) === 'undefined' || value === null  )return false
    if (typeof (value) === 'string'  && value.trim().length > 0 && Number(value) != NaN) return true
    if (typeof (value === 'number')) return true
    return false;
}

const isvalidEmail = (email)=>{
    const regexforEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regexforEmail.test(email)
}

const isValidPhone =  (phone)=> {
    const regexForMobile = /^[6-9]\d{9}$/;
    return regexForMobile.test(phone);
  };
  

  const isValidPassword = (password) =>{
    const regexforpassword = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return regexforpassword.test(password)
 } 

module.exports={
    isvalidEmail,       
    isValidPhone,
    isValidBody,
    isValidInputValue,
    IsvalidOnlyCharacter,
    IsvalidOnlyNumber,
    isValidPassword
}  