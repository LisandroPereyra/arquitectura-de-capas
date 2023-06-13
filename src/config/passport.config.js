import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import Utils from '../utils/utils.js'
import UserModel from '../dao/models/user.js'


function cookieExtractor(req) {
  let token = null
  if (req && req.cookies) {
    token = req.cookies.token
  }
  return token
}

const initPassport = () => {

  const registerOptions = {
    usernameField: 'email',
    passReqToCallback: true,
  }

  const loginOptions = {
    usernameField: 'email',
  }


    
    passport.use('jwt', new JWTStrategy({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: process.env.JWT_SECRET,
    }, (payload, done) => {
      return done(null, payload)
    }))
  

  passport.use('register', new LocalStrategy(registerOptions, async (req, email, password, done) => {
    const {
      body: {
        first_name,
        last_name,
        age,
      }
    } = req
  
    if (
      !first_name ||
      !last_name ||
      !age
    ) {
      return done(new Error('Todo los campos debe venir en la solicitud.'))
    }

    try {
      let user = await UserModel.findOne({ email })

      if (user) {
        console.log('User already register.')
        return done(null, false)
      }

      user = await UserModel.create({
        first_name,
        last_name,
        email,
        age,
        password: Utils.createHash(password),
      })
      
      done(null, user)
  
    } catch (error) {
      return done(new Error('Error al obtener el usuario:', error.message))
    }
  }))

  passport.use('login', new LocalStrategy(loginOptions, async (email, password, done) => {

    try {
      const user = await UserModel.findOne({ email })
  
      if (!user) {
        return done(null, false)
      }
    
      if (!Utils.validatePassword(password, user)) {
        return done(null, false)
      }
    
      done(null, user)
    } catch (error) {
      return done(new Error('Error al obtener el usuario:', error.message))
    }
  }))



  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser( async (id, done) => {
    let user = await UserModel.findById(id)
    done(null, user)
  })
}

export default initPassport