let videos = [
  {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
  {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
  {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
  {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
  {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

export const videosRepository = {
  getVideos() {
    return videos
  },

  getVideoById(id: number) {
    const video = videos.find(v => v.id === id)
    const allErrors = {errorsMessages: [] as any};
    let errFlag = false;

    if (!video || isNaN(id)) {
      errFlag = true;
      allErrors.errorsMessages.push({
        "message": "such an id does not exist",
        "field": "id"
      })
    }
    if (errFlag) {
      return allErrors;
    }
    if (video) {
      return video;
    }
  },

  updateVideoById(id: number, title: string) {
    const video = videos.find(v => v.id === id)
    const allErrors = {errorsMessages: [] as any};
    let errFlag = false;

    if (!video || isNaN(id)) {
      errFlag = true;
      allErrors.errorsMessages.push({
        "message": "such an id does not exist",
        "field": "id"
      })
    }
    if (title.length < 1 || title.length > 40) {
      errFlag = true;
      allErrors.errorsMessages.push({
        "message": "Bad input title has incorrect values",
        "field": "new title"
      })
    }
    if (errFlag) {
      return allErrors;
    }

    if (video) {
      video.title = title
      return video;
    }
  },

  createVideo(id: number, title: string, author: string) {
    const video = videos.find(v => v.id === id)
    const allErrors = {errorsMessages: [] as any};
    let errFlag = false;

    if (video) {
      errFlag = true;
      allErrors.errorsMessages.push({
        message: "such an id already exists",
        field: "id"
      })
    }
    if (title.length < 1 || title.length > 40) {
      errFlag = true;
      allErrors.errorsMessages.push({
        "message": "Bad input title has incorrect values",
        "field": "new title"
      })
    }
    if (author.length < 1 || author.length > 40) {
      errFlag = true;
      allErrors.errorsMessages.push({
        "message": "Bad input author has incorrect values",
        "field": "new author"
      })
    }

    if (errFlag) {
      return allErrors

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
