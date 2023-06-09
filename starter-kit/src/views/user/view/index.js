// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { getUser, getWorkDay } from '../store'
import { useSelector, useDispatch } from 'react-redux'
import UserWorkDayTable from './UserWorkDayTable'
// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import UserTabs from './Tabs'
import PlanCard from './PlanCard'
import UserInfoCard from './UserInfoCard'

// ** Styles
import '@styles/react/apps/app-users.scss'
import InvoiceList from './InvoiceList'

const UserView = () => {
  // ** Store Vars
const store = useSelector(state => state.userApp.selectedUser)

  const dispatch = useDispatch()

  // ** Hooks
  const { id } = useParams()
  console.log(id)

  // ** Get suer on mount
  useEffect(() => {
    dispatch(getUser(id))
    
  }, [dispatch])
  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }
  return store !== null && store !== undefined ? (
    <div className='app-user-view'>
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedUser={store} />
        </Col>
        <Col xl='8' lg='10' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserWorkDayTable />
        </Col>  
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>User not found</h4>
      <div className='alert-body'>
        User with id: {id} doesn't exist. Check list of all Users: <Link to='/apps/user/list'>Users List</Link>
      </div>
    </Alert>
  )
}
export default UserView
