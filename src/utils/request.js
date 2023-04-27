import { ref } from "vue";
import { adress, token } from "../utils/config.json";
export async function FetchingCategory(category) {
  const result = await fetch(`${adress}/library/sections?X-Plex-Token=${token}`)
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");
      const sections = xmlDoc.getElementsByTagName("Directory");
      console.log(xmlDoc);
      const moviesSection = Array.from(sections).find(
        (section) => section.getAttribute("type") === category
      );
      console.log(moviesSection);
      const moviesUrl = `${adress}/library/sections/${moviesSection.getAttribute(
        "key"
      )}/all?X-Plex-Token=${token}`;
      return fetch(moviesUrl, {
        headers: {
          "X-Plex-Token": token,
        },
      });
    })
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");
      const movies = xmlDoc.getElementsByTagName("Video");
      console.log(movies[1]);
      const movieTitles = Array.from(movies).map((movie) =>
        movie.getAttribute("title")
      );
      const key = Array.from(movies).map((movie) =>
        movie.getAttribute("ratingKey")
      );
      const movieSummery = Array.from(movies).map((movie) =>
        movie.getAttribute("summary")
      );
      const movieImg = Array.from(movies).map((movie) =>
        movie.getAttribute("thumb")
      );
      const movieUrl = Array.from(movies).map((movie) =>
        movie.getAttribute("guid")
      );
      console.log(movieUrl);
      let returnedFiles = [];
      let file = {};
      console.log(movieSummery);
      for (let i = 1; i < movieTitles.length; i++) {
        file = {};
        console.log(movieSummery[1]);
        file.title = movieTitles[i];
        file.summery = movieSummery[i];
        file.img = movieImg[i];
        file.video = movieUrl[i];
        file.key = key[i];
        console.log(file);
        returnedFiles.push(file);
        console.log(i);
      }
      console.log(returnedFiles);
      return returnedFiles;
    });

  return result;
}

export async function FetchingData(id) {
  const result = await fetch(
    `${adress}/library/metadata/${id}?X-Plex-Token=${token}`
  )
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");
      const sections = xmlDoc.getElementsByTagName("Part");
      const video = sections[0];
      console.log(sections[0]);
      let fileUrl = video.getAttribute("key");
      fileUrl = `${adress}${fileUrl}?X-Plex-Token=${token}`;
      return fileUrl;
    });

  return result;
}
