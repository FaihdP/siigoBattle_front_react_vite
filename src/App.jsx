import Header from "./views/layout/Header";
import Login from "./views/partials/Login";

function App({ children = null}) {
  children = (children != null) ? children : <Login/>
  return (
    <>
      <Header>
        {children}
      </Header>
    </>
  );
} 

export default App;
