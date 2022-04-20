let videos = [
  {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
  {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
  {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
  {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
  {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]


type ErrorType = {
  message: string
  field: string
}
type ArrayType = {
  errorsMessages: Array<ErrorType>
}

const idDoesNotExist: ErrorType = {
  message: "such an id does not exist",
  field: "id"
}
const titleHasIncorrect: ErrorType = {
  message: "input title has incorrect values",
  field: "title"
}

export const videosRepository = {
  getVideos() {
    return videos
  },

  getVideoById(id: number) {
    const video = videos.find(v => v.id === id)
    const errors: ArrayType = {errorsMessages: []};

    if (!video) {
      errors.errorsMessages.push(idDoesNotExist)
    }
    return {
      data: video,
      errorsMessages: errors.errorsMessages,
    }
  },

  updateVideoById(id: number, title: string) {
    const updatedVideo = videos.find(v => v.id === id)
    const errors: ArrayType = {errorsMessages: []};
    let resultCode = 0

    if (updatedVideo && title.length > 0 && title.length < 40) {
      updatedVideo.title = title
    }
    if (!updatedVideo) {
      errors.errorsMessages.push(idDoesNotExist)
      resultCode = 1
    }
    if (title.length <= 0 || title.length > 40) {
      errors.errorsMessages.push(titleHasIncorrect)
      resultCode = 1
    }
    return {
      data: updatedVideo,
      errorsMessages: errors.errorsMessages,
      resultCode: resultCode
    }
  },

  createVideo(title: string) {

    let errFlag = false;
    let resultCode = 0
    const errors: ArrayType = {errorsMessages: []};

    const author = title;
    // create new unique id
    let newId = +(new Date());
    let count = 0;
    while (count < 10 && videos.find(i => i.id === newId)) {
      newId = +(new Date());
      count++
    }
    const newAuthor = {
      id: newId,
      title: title,
      author: author
    }

    if (title.length <= 0 || title.length > 40) {
      errFlag = true;
      resultCode = 1
      errors.errorsMessages.push(titleHasIncorrect)
    }
    if (errors.errorsMessages.length === 0 && newId) {
      videos.push(newAuthor)
      return {
        data: newAuthor,
        errorsMessages: errors.errorsMessages,
        resultCode: resultCode
      }
    }
    return {
      errorsMessages: errors.errorsMessages,
      resultCode: resultCode
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
