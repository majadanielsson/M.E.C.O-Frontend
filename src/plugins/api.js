const apiUrl = "http://localhost:5000";
// Get user data from session
const user = window.sessionStorage.getItem("user");
// User initialize object
const initUser = user ? JSON.parse(user) : null;
const toQuery = (params) => { return "?" + Object.keys(params).map(key => key + '=' + encodeURI(params[key])).join('&'); }
function api(Vue) {
    this.request = async function (method, url, data, params) {
        var settings = {
            credentials: "include",
            method: method,
        };
        if (["POST", "PUT", "PATCH"].includes(method)) settings = {
            ...settings,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }
        var querystring = params ? toQuery(params) : "";
        const response = await fetch(apiUrl + url + querystring, settings);
        const responseData = await response.json();
        if (response.ok) return responseData;
        else {
            console.log("Error " + response.status + ": " + responseData.detail);
            switch (responseData.error) {
                case "session-timeout":
                    this.state.user = null;
                    window.sessionStorage.removeItem("user");
                    if (confirm("Sessionen har upphört. Vill du logga in igen?")) this.redirect();
                    break;
            }
            throw response.message;

        }
    }
    this.logout = async () => {
        // Delete session and cookie, redirect to CAS logout
        this.state.user = null;
        window.sessionStorage.removeItem("user");
        await fetch(apiUrl + "/cas/logout/");
        window.location.replace(`https://weblogin.uu.se/idp/profile/cas/logout?service=${window.location.origin}/login/`)
    }

    this.login = async (ticket) => {
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
        const responseData = await response.json();
        if (response.ok) {
            this.state.user = responseData;
            window.sessionStorage.setItem("user", JSON.stringify(responseData));
            return responseData;
        }
        else throw responseData.detail;
    }

    this.dev = async (user) => {
        var settings = {
            credentials: "include",
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        };
        const response = await fetch(`${apiUrl}/cas/dev`, settings);
        const responseData = await response.json();
        if (response.ok) {
            this.state.user = responseData;
            window.sessionStorage.setItem("user", JSON.stringify(responseData));
            return responseData;
        }
        else throw responseData.detail;
    }

    this.redirect = () => {
        // Save current URL to Session Storage and redirect to CAS
        window.sessionStorage.setItem("redirect", window.location.pathname);
        window.location.replace(`https://weblogin.uu.se/idp/profile/cas/login?service=${window.location.origin}/login/`)
    }
    this.state = Vue.observable({ user: initUser });
}
export default {
    install(Vue) {
        Vue.prototype.$api = new api(Vue);
    }
}