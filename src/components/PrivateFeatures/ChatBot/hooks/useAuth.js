import { useContext } from "react"
import { AuthContext } from "../../../../authentication/Auth"

const useAuth = () => useContext(AuthContext);

export default useAuth;