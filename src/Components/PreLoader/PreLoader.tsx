import { Blocks } from "react-loader-spinner";


export default function PreLoader() {
  return (
    <div className="d-flex justify-content-center align-items-center">
    <Blocks
  height="80"
  width="80"
  color="orange"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  visible={true}
  />  
    </div>
  )
}
