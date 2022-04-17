let videos = [
  {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
  {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
  {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
  {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
  {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]


type ErrorType = {
  "message": string
  "field": string
}
type ArrayType = {
  "errorsMessages": Array<ErrorType>
}

const idDoesNotExist: ErrorType = {
  message: "such an id does not exist",
  field: "id"
}
const idIncorrect: ErrorType = {
  message: "such an id has incorrect values",
  field: "id"
}
const titleHasIncorrect: ErrorType = {
  message: "input title has incorrect values",
  field: "title"
}
const authorHasIncorrect: ErrorType = {
  message: "Bad input new author has incorrect values",
  field: "new author"
}

export const videosRepository = {
  getVideos() {
    return videos
  },

  getVideoById(id: number) {
    const video = videos.find(v => v.id === id)

    if (video) {
      return video;
    } else {
      const errors: ArrayType = {errorsMessages: []};

      errors.errorsMessages.push(idDoesNotExist)
      return {
        "data": {
          "id": id,
        },
        "errorsMessages": errors.errorsMessages,
        "resultCode": 1
      }
    }
  },

  updateVideoById(id: string, title: string) {
    const video = videos.find(v => v.id === +id)
    const errors: ArrayType = {errorsMessages: []};
    let currentAuthor;

    if (video) {
      currentAuthor = video.author
    }
    console.log("--", title.length < 4, title.length > 40, currentAuthor)

    if (video && title.length >= 4 && title.length <= 40) {
      video.title = title
    }
    if (title.length < 4 || title.length > 40) {
      errors.errorsMessages.push(titleHasIncorrect)
    }
    if (!video && !isNaN(+id)) {
      errors.errorsMessages.push(idDoesNotExist)
    }
    if (isNaN(+id)) {
      errors.errorsMessages.push(idIncorrect)
    }
    return {
      data: {
        id: id,
        title: title,
        author: currentAuthor
      },
      errorsMessages: errors.errorsMessages,
      "resultCode": 1
    }
  },

  createVideo(id: number, title: string, author: string) {
    const video = videos.find(v => v.id === id)
    const errors: ArrayType = {errorsMessages: []};
    let errFlag = false;

    if (video) {
      errFlag = true;
      errors.errorsMessages.push(idDoesNotExist)
    }
    if (title.length < 4 || title.length > 40) {
      errFlag = true;
      errors.errorsMessages.push(titleHasIncorrect)
    }
    if (author.length < 4 || author.length > 40) {
      errFlag = true;
      errors.errorsMessages.push(authorHasIncorrect)
    }

    if (errFlag) {
      return {
        "data": {
          "id": id,
          "title": title,
          "author": author
        },
        errorsMessages: errors.errorsMessages,
        "resultCode": 1
      }

    } else {
      const newVideo = {id: +id, title: title, author: author}
      videos.push(newVideo)
      return newVideo;
    }
  },

  deleteVideoById(id: number) {
    const video = videos.filter(v => v.id === id)

    if (videos.filter(v => v.id === id) && videos.indexOf(video[0]) !== -1) {
      const newV = videos.indexOf(video[0]);
      videos.splice(newV, 1);
      return true
    } else {
      return false
    }
  },
}
