//www.cluemediator.com/how-to-access-url-parameters-in-the-class-component-using-react-router-v6
//velog.io/@ssmin/react-router-v6%EC%97%90%EC%84%9C%EC%9D%98-withRouter-%EC%82%AC%EC%9A%A9%EB%B2%95

import React from "react";
import { useParams } from "react-router-dom";

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();

  return <WrappedComponent {...props} params={params} />;
};

export default withRouter;
