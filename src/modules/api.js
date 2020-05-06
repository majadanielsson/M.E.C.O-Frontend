// Base URL to API
const apiUrl = "http://localhost:5000"

const api = {
  reports: {
    post: async function (data, params) {
      var settings = {
        credentials: "include",
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      };
      console.log(settings);
      const response = await fetch(`${apiUrl}/courses/${encodeURI(params._id)}/${encodeURI(params.instanceId)}`, settings);
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
    get: async (id, params) => {
      var settings = {
        credentials: "include",
      };
      var querystring = "";
      if (params && params.responsible) querystring = "?responsible=true";
      const response = await fetch(`${apiUrl}/courses${id ? "/" : ""}${encodeURI(id)}${querystring}`, settings);
      return response.json();
    }
  },
  courseInstance: {
    get: async (courseId, instanceId) => {
      var settings = {
        credentials: "include",
      };
      const response = await fetch(`${apiUrl}/courses/${courseId}/${instanceId}`, settings);
      return response.json();
    },
    comment: async (courseId, instanceId, comment) => {
      var settings = {
        credentials: "include",
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(comment)
      };
      const response = await fetch(`${apiUrl}/courses/${courseId}/${instanceId}/comment`, settings);
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