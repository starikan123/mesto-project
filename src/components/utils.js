export function switchLoadingMesg(Destination, Loading) {
  if (Loading) {
    Destination.textContent = "Сохранение...";
  } else {
    if (Destination.id) {
      Destination.textContent = "Создать";
    } else {
      Destination.textContent = "Сохранить";
    }
  }
}

export function updateUserInformation(avatar, name, about, json) {
  name.textContent = json["name"];
  about.textContent = json["about"];
  avatar.src = json["avatar"];
}
