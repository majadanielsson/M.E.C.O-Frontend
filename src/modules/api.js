// Base URL to API
const apiUrl = "http://localhost:5000"

const api = {
  reports: {
    post: async function(data, params) {
      var settings = {
        credentials: "include",
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      };
      console.log(settings);
      const response = await fetch(`${apiUrl}/reports?courseID=${params._id}&instanceID=${params.instanceId}`, settings);
      return response.json();
    }
  },
  search: async (q, page) => {
    // Courses text search
    if (!q) return [];
    if (!page) page = 0;
    var settings = {
      credentials: "include",
    };
    const response = await fetch(`${apiUrl}/search?q=${encodeURI(q.trim())}&page=${page}`, settings);
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
      // Developer login
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
      // Delete session and cookie, redirect to CAS logout
      window.sessionStorage.removeItem("user");
      await fetch(`${apiUrl}/cas/logout`);
      window.location.replace(`https://weblogin.uu.se/idp/profile/cas/logout?service=${window.location.origin}/login/`)
    },
    redirect: () => {
      // Save current URL to Session Storage and redirect to CAS
      window.sessionStorage.setItem("redirect", window.location.pathname);
      window.location.replace(`https://weblogin.uu.se/idp/profile/cas/login?service=${window.location.origin}/login/`)
    },
    login: async (ticket) => {
      // Get authentication cookie and user data
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
      if (response.ok) return response.json();
      else throw response.json();
    }
  }
};
export default api;