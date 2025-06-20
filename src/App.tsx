import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"
import { AuthProvider } from "./context/AuthContext"
import { ViewContextProvider } from "./context/ViewContext"

const App = () => {
  return (
    <AuthProvider>
      <ViewContextProvider>
       <Router>
         <AppRoutes/>
      </Router>
      </ViewContextProvider>
    </AuthProvider>
  )
}

export default App