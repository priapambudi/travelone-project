import {
  useLocation,
  useNavigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { routeList } from "./routes/routeList";
import Navbar from "./components/Navbar";

const App = () => {
  const element = useRoutes(routeList);
  return element;
};

// const App = () => {
//   const [showModalLogin, setShowModalLogin] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (location.pathname === "/login") {
//       setShowModalLogin(true);
//     } else {
//       setShowModalLogin(false);
//     }
//   }, [location]);

//   const handleCloseLogin = () => {
//     setShowModalLogin(false);
//     navigate(-1);
//   };

//   return (
//     <>
//       <Routes>
//         {routeList.map((route, index) => (
//           <Route key={index} path={route.path} element={route.element} />
//         ))}
//       </Routes>
//       <Modal isVisible={showModalLogin} onClose={handleCloseLogin}>
//         <Login />
//       </Modal>
//     </>
//   );
// };

// const AppWrapper = () => {
//   <Router>
//     <App />
//   </Router>;
// };

export default App;
