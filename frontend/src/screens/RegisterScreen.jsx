import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { toast, Toaster } from "react-hot-toast";
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const RegisterScreen = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
 

  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        }
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }


  const sendOTP = async() => {
    try{

      

      
    //  console.log('sendOTP name'+name +'ph'+ph );
    // console.log('ph'+ph )
    // const res = await register({ name:'test', phoneNo:ph, password:'test' }).unwrap();
  
 
 

    onCaptchVerify();
    // const appVerifier = window.recaptchaVerifier;
    // const formatPh = "+" + ph;

    // signInWithPhoneNumber(auth, formatPh, appVerifier)
    //   .then((confirmationResult) => {
    //     window.confirmationResult = confirmationResult;
    //     setLoading(false);
    //     setShowOTP(true);
    //     toast.success("OTP sent successfully!");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoading(false);
    //   });
         setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
    }
    catch(err){
      toast.error(err?.data?.message || err.error);
    }
  };

  const verifyOTP = () => {
    setLoading(true);
    // window.confirmationResult
    //   .confirm(otp)
    //   .then(async (res) => {
    //     setUser(res.user);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setLoading(false);
    //   });

      setUser('user');
      setLoading(false);
  };

  

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        // console.log('name'+name +'ph'+ph +'pasword'+password)
        const res = await register({ name, phoneNo:ph, password }).unwrap();
        console.log('res'+res )
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        <FormContainer>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='phone'>
              <Form.Label>Phone Number</Form.Label>
              <PhoneInput disableDropdown="true" country={"in"} value={ph}  onChange={(value) => setPh(value)}    />
            </Form.Group>
            <Button
              onClick={sendOTP}
              variant='outline-success'
              className="flex gap-1 items-center justify-center py-2.5 my-2 rounded"
              
            >
              {loading && (
                <CgSpinner size={20} className="mt-1 animate-spin" />
              )}
              <span>Send OTP via SMS</span>
            </Button>

            {showOTP && (
              <>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                />
                <Button
                  onClick={verifyOTP}
                  variant='outline-success'
                  className="flex gap-1 items-center justify-center py-2.5 my-2 rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </Button>
                {user ? (
                  <>
                    <Form.Group controlId='password'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Button
                      disabled={isLoading}
                      variant='primary'
                      type='submit'
                    >
                      Register
                    </Button>
                  </>
                ) : (<h1>OTP not matching</h1>)}
              </>
            )}
            {isLoading && <Loader />}
          </Form>

          <Row className='py-3'>
            <Col>
              Already have an account?{' '}
              <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                Login
              </Link>
            </Col>
          </Row>
        </FormContainer>
      </div>
    </section>
  );
};

export default RegisterScreen;
