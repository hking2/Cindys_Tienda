import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserDetails } from '../actions/userActions';
import { listOrders } from '../actions/orderActions';
import Meta from '../components/Meta';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state)=> state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state)=> state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state)=> state.userUpdate);
  const { success } = userUpdate;

  const orderList = useSelector((state)=> state.orderList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderList;

  useEffect(()=> {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch({ type: USER_UPDATE_RESET });
        dispatch(getUserDetails('profile'));
        dispatch(listOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
    // useEffect changes the state ("fires off") when any of the listed attributes in the array trigger it
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserDetails({ id: user._id, name, email, password }));
    }
  }

  return (
    <Row>
      <Meta />
      <Col md={3}>
        <h2>User Profile</h2>
        {error && <Message variant='danger'>{error.split('_')[1]}</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        {success && <Message variant='success'>Profile updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='name' placeholder='name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type='Password' placeholder='confirm password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>Update</Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (<Loader /> ): 
        errorOrders ? (<Message variant='danger'>{errorOrders}</Message>) :
        (<Table striped bordered hover responsive className='table-sm' >
          <tr>
            <th>Order</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th>ID</th>
          </tr>
          <tbody>
            {orders.reverse().map((order)=>(
              <tr key={order._id}>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className='btn-sm' variant='light'>Details</Button>
                  </LinkContainer>
                </td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                  <i className='fas fa-times' style={{color: '#FF0000'}}></i>
                )}</td>
                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                  <i className='fas fa-times' style={{color: '#FF0000'}}></i>
                )}</td>
                <td>{order._id}</td>
              </tr>
            ))}
          </tbody>
        </Table>)}
      </Col>
    </Row>
  )
}

export default ProfileScreen