var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
myHeaders.append("Cookie", "JSESSIONID=863EF35CE0D4CF579E1D3EFDC80AA317");

export default myHeaders;
