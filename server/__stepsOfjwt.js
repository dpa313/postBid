// step-1  // Generate a token in server send to client and save in cookies
    //   app.post('/jwt', async(req,res)=>{
    //     const user = req.body
    //     const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '365d'})
    //     res.cookie('token',token,{
    //       httpOnly: true,
    //       secure: process.env.NODE_ENV === 'production',
    //       sameSite: process.env.NODE_ENV === 'production'? 'none': 'strict',
    //     })

// step-2  // use the token where sign in and register
// const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`,{email: result?.user?.email},{ withCredentials: true })

// step-3  // Clear the token when logout
// app.get('/logout', (req,res)=>{
//     res.clearCookie('token',{
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: process.env.NODE_ENV === 'production'? 'none': 'strict',
//       maxAge: 0
//     }).send({success: true})
//   })
// const {data} = await axios(`${import.meta.env.VITE_API_URL}/logout`, {withCredentials: true})

// step-4 // Verify token

