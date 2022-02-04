const setCookie = (name, value, exp = 5) => {
  const date = new Date();
  date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * exp);
  document.cookie = `${name}=${value}; expires=${date}`;
};

const getCookie = (name) => {
  let value = "; "+document.cookie;
  let parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
      return parts.pop().split(";").shift();
  }

};

const deleteCookie = (name) => {
  const date = new Date("2020-01-01").toUTCString();
  console.log(date);
  document.cookie = `${name}=; expires=${date}`;
};

export { setCookie, getCookie, deleteCookie };
