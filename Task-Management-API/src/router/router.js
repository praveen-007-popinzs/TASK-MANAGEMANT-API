const express = require('express')

const router = express.Router();

const taskcontroller = require('../Controllers/taskcontroller')
const usercontroller = require('../Controllers/userController')
const middleware = require('../middleware/auth&autho')

router.get('/tets', (req,res)=>{
    res.send('connected with router on express')
})

//*********************************USER API************************************************** */
router.post('/register', usercontroller.Createuser)
router.post('/login', usercontroller.UserLogin)
router.post('/logout', usercontroller.UserLogout)
router.put('/resetpassword/:email', usercontroller.PasswordReset)

//*********************************TASK API************************************************** */



router.post("/createTask", middleware.authenticate, taskcontroller.createtask)

router.get("/getalltask", middleware.authenticate, taskcontroller.alltask)

router.get("/gettask", middleware.authenticate,taskcontroller.gettask)

router.put("/updatetaskPut/:userId", middleware.authenticate, middleware.Authorize,taskcontroller.Updatetask_patch)

router.patch("/updatetaskPatch/:userId", middleware.authenticate, middleware.Authorize,taskcontroller.Updatetask_put)

router.patch("/deletetask/:userId", middleware.authenticate, middleware.Authorize,taskcontroller.deletetask)




module.exports = router