import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// A function that returns a JSX element to display a message when a user is being redirected

const onRedirecting = () => {
  <>
    <div>
      <h1>Redirecting you to the login page...</h1>
    </div>
  </>;
};

// A Higher Order Component (HOC) that takes a component and an options object as parameters and returns a new component

const withRedirectIfAuth = (Component, options) => {
  return (props) => {
    const { user, isLoading } = useUser();
    const { redirectTo } = options;
    const navigate = useNavigate();

    // Using the 'useEffect' hook to check if the user is authenticated and redirect them to the specified route

    useEffect(() => {
      if (!user || isLoading) return;
      let redirectPath;
      if (redirectTo) {
        redirectPath = redirectTo;
      } else {
        redirectPath = "/dashboard";
      }
      navigate(redirectPath);
    }, [user, isLoading]);

    if (isLoading) return <div>Loading...</div>;
    if (!user) return <Component user={user} {...props} />;

    return onRedirecting();
  };
};

export default withRedirectIfAuth;
