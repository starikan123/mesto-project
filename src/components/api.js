export const data = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-18",
  headers: {
    authorization: "abe1d7ae-ecc9-47d5-a35f-74536599426e",
    "Content-Type": "application/json",
  },
};

function getResData(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export function getInitialCards() {
  return fetch(`${data.baseUrl}/cards`, {
    method: "GET",
    headers: data.headers,
  }).then((res) => {
    return getResData(res);
  });
}

export function getUserInformation() {
  return fetch(`${data.baseUrl}/users/me`, {
    method: "GET",
    headers: data.headers,
  }).then((res) => {
    return getResData(res);
  });
}

export function editProfileInfo(name, about) {
  return fetch(`${data.baseUrl}/users/me`, {
    method: "PATCH",
    headers: data.headers,
    body: JSON.stringify({
      name: `${name}`,
      about: `${about}`,
    }),
  }).then((res) => {
    return getResData(res);
  });
}

export function postNewCard(name, link) {
  return fetch(`${data.baseUrl}/cards`, {
    method: "POST",
    headers: data.headers,
    body: JSON.stringify({
      name: `${name}`,
      link: `${link}`,
    }),
  }).then((res) => {
    return getResData(res);
  });
}

export function deleteCard(cardId) {
  return fetch(`${data.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: data.headers,
  }).then((res) => {
    return getResData(res);
  });
}

export function postAvatar(avatarLink) {
  return fetch(`${data.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: data.headers,
    body: JSON.stringify({
      avatar: `${avatarLink}`,
    }),
  }).then((res) => {
    return getResData(res);
  });
}

export function putLike(cardId) {
  return fetch(`${data.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: data.headers,
  }).then((res) => {
    return getResData(res);
  });
}

export function deleteLike(cardId) {
  return fetch(`${data.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: data.headers,
  }).then((res) => {
    return getResData(res);
  });
}
