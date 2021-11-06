import React, {useRef} from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import '../components/style.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';

const LoginPage = () => {
    // const navigate = useNavigate();
    let history = useHistory();

    async function fetchUserDetails(){
            axios
                .get('http://127.0.0.1:3000/srm/user/data', {headers:{ "X-CSRFToken":Cookies.get('csrftoken')}})
                .then((response) => {
                    if(response.data.is_teacher){
                      history.push("/home");
                    }
                    else{
                      history.push("/dashboard");
                    }
                    
                })
                .catch((error) => {
                    history.push("/");
                    console.log(error)
                });
        }
    React.useEffect(()=>{
        fetchUserDetails();
    }, []);
    return (
      <div style={{margin:"auto", padding:"10rem"}}>
        <Helmet>
          <title>Login | Material Kit</title>
        </Helmet>
        <Box
        className="shadow"
          sx={{
            backgroundColor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
            padding:"1rem"
          }}
        >
          <Container maxWidth="sm">
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
            //   validationSchema={Yup.object().shape({
            //     email: Yup.string().max(255).required('Username is required'),
            //     password: Yup.string().max(255).required('Password is required')
            //   })}
              onSubmit={() => {
                window.location.reload();
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      color="textPrimary"
                      variant="h5"
                    >
                      Student Result Management System
                    </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      Login to the system
                    </Typography>
                  </Box>
                  <Grid
                    container
                    spacing={3}
                  >
                    <Grid
                      item
                      xs={12}
                      md={6}
                    >
                      {/* <Button
                        color="primary"
                        fullWidth
                        startIcon={<FacebookIcon />}
                        onClick={handleSubmit}
                        size="large"
                        variant="contained"
                      >
                        Login with Facebook
                      </Button> */}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={6}
                    >
                      {/* <Button
                        fullWidth
                        startIcon={<GoogleIcon />}
                        onClick={handleSubmit}
                        size="large"
                        variant="contained"
                      >
                        Login with Google
                      </Button> */}
                    </Grid>
                  </Grid>
                  <Box
                    sx={{
                      pb: 1,
                      pt: 3
                    }}
                  >
                    <Typography
                      align="center"
                      color="textSecondary"
                      variant="body1"
                    >
                      {/* or login with email address */}
                    </Typography>
                  </Box>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Username/Enrolment no."
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                  <Box sx={{ py: 2 }}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign in now
                    </Button>
                  </Box>
                  {/* <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    Don&apos;t have an account?
                    {' '}
                    <Link component={RouterLink} to="/register" variant="h6" underline="hover">
                      Sign up
                    </Link>
                  </Typography> */}
                </form>
              )}
            </Formik>
          </Container>
        </Box>
      </div>
    );
  };
  
  export default LoginPage;