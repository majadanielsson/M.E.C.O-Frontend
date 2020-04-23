// Base URL to API
const apiUrl = "http://localhost:5000"

const api = {
  search: async (q) => {
    if (!q) return [];
    var settings = {
      credentials: "include",
    };

    const response = await fetch(`${apiUrl}/search?q=${encodeURI(q.trim())}`, settings);
    return response.json();
  },
  courses: {
    get: async (id) => {
      var settings = {
        credentials: "include",
      };
      if (!id) id = "";
      const response = await fetch(`${apiUrl}/api/courseInstance/?courseID=${encodeURI(id)}`, settings);
      return response.json();
    }
  },
  cas: { // CAS SSO API
    dev: async (user) => {
      var settings = {
        credentials: "include",
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      };
      const response = await fetch(`${apiUrl}/cas/dev`, settings);
      return response.json();
    },
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