import { GET_USERDATA } from "../services/Api";

const redirectPaths = {
  redirect: {
    destination: "/login",
    permanent: false,
  },
};

const checkValidateToken = async (token: string) => {
  try {
    if (token) {
      const { url, options } = GET_USERDATA(token);
      const response = await fetch(url, options);
      const user = await response.json();

      if (user.error) {
        return redirectPaths;
      } else {
        return {
          props: {
            user,
          },
        };
      }
    } else return redirectPaths;
  } catch (error) {
    return redirectPaths;
  }
};

export default checkValidateToken;
