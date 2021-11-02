import { AuthContext } from './auth-context'

export default function Navbar() {
  return (
    <AuthContext.Consumer>
      {(auth) => (
      <nav className="topnav navbar navbar-expand-lg navbar-dark bg-dark py-1" style={{height: "80px", overflowY: "visible"}}>
        <br/>
        <a className="navbar-brand" href="/">
          <img src="/images/logo.png" height="115px" />
        </a>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {auth === null
          ? ''
          : <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            {!!auth
              ? <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link">{auth.displayName || auth.email}</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/auth/logout">Logout</a>
                  </li>
                </ul>
              : <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" href="/auth/register">Register</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/auth/login">Login</a>
                  </li>
                </ul>
            }
          </div>
        }
      </nav>
      )}
    </AuthContext.Consumer>
  )

}
