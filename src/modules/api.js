const apiUrl = "http://localhost:5000"

const api = {
  cas: {
    logout: async () => {
      window.sessionStorage.removeItem("user");
      await fetch(`${apiUrl}/cas/logout`);
      window.location.replace(`https://weblogin.uu.se/idp/profile/cas/logout?service=${window.location.origin}/login/`)
    },
    redirect: () => {
      window.sessionStorage.setItem("redirect", window.location.pathname);
      window.location.replace(`https://weblogin.uu.se/idp/profile/cas/login?service=${window.location.origin}/login/`)
    },
    login: async (ticket) => {
      var body = {
        ticket: ticket
      };
      var settings = {
        credentials: "include",
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
      };
      const response = await fetch(`${apiUrl}/cas/login`, settings);
      return response.json();
    }
  }
};
export default api;