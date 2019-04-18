function setCookie(name, value, days) {
  let expires = "";

  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }

  document.cookie = `${name}=${value || ""}${expires}; path=/`;
}

function getCookie(name) {
  const nameEq = `${name}=`;
  let value = null;

  document.cookie.split(";").forEach(c => {
    if (c.trim().startsWith(nameEq)) {
      value = c.trim().substring(nameEq.length, c.length);
    }
  });

  return value;
}

function eraseCookie(name) {
  document.cookie = `${name}=; Max-Age=-99999999;`;
}
