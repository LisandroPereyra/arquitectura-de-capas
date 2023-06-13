import { Router } from 'express'
import passport from 'passport'
import Utils from "../../utils/utils.js"


const AuthRouter = Router()


AuthRouter.post('/login', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {
  console.log('req.user', req.user);
  req.session.user = req.user
  res.redirect('/profile')
})

AuthRouter.post('/register', passport.authenticate('register', { failureRedirect: '/register' }), (req, res) => {
  res.redirect('/login')
})

AuthRouter.get('/logout', (req, res) => {
  req.session.destroy(error => {
    if (!error) {
      res.redirect('/login')
    } else {
      res.send({status: 'Logout Error', body: error })
    }
  })
})

AuthRouter.post('/reset-password', async (req, res) => {

  const {
    body: {
      email,
      password,
    }
  } = req

  if (
    !email ||
    !password
  ) {
    return res.render('reset-password', { error: 'Todo los campos deben venir en la solicitud.' })
  }

  const user = await UserModel.findOne({ email })

  if (!user) {
    return res.render('reset-password', { error: 'Email no existe.' })
  }

  user.password = Utils.createHash(password)

  await UserModel.updateOne({ email }, user) // Option 1

  // await UserModel.updateOne({ email }, { $set: { password: createHash(password) }}) // Option 2

  res.redirect('/login')
}) 



export default AuthRouter
