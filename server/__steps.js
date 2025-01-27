//=======================================================================//
//==================================JWT==================================//
//=======================================================================//

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



//=======================================================================//
//===============================Tanstack Query==========================//
//=======================================================================//
//step-1// set up on main.jsx

// const queryClient = new QueryClient()
// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <AuthProvider>
//       <QueryClientProvider client={queryClient}>
//       <RouterProvider router={router} />
//       </QueryClientProvider>
//       <Toaster/>
//     </AuthProvider>
//   </StrictMode>
// );

//step-2// for get data from api
// const {data: bids=[],isLoading,refetch,isError,error} = useQuery({
//     queryFn: ()=> getData(),
//     queryKey: ['bids']
//   })

// step-3 // for post,put,patch,update,delete

// const {mutateAsync} = useMutation({
//     mutationFn: async ({id,status})=>{
//       const {data} = await axiosSecure.patch(`/bid/${id}`,{status})
//       console.log(data)
//       return data
//     },
//     onSuccess: ()=>{
//       console.log("Wow! data updated" )
//       toast.success("Updated successful")
//       refetch()
//     }
//   }) 

