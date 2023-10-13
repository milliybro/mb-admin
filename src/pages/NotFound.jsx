import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
   const navigate = useNavigate()
  return (
   <Result
   status="404"
   title="Foydasi yo'q"
   subTitle="Sorry, the page you visited does not exist"
   extra={
      <Button onClick={()=> navigate("/login")} type="primary">
         Back Login
      </Button>
   }
   />
  )
}

export default NotFound