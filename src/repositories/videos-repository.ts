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
    return videos.find(v => v.id === +id)
  },

  deleteVideoById(id: number) {
    const newVideo = videos.filter(v => v.id === id)
    if (videos.filter(v => v.id === id) && videos.indexOf(newVideo[0]) !== -1) {
      const newV = videos.indexOf(newVideo[0]);
      videos.splice(newV, 1);
      return true
    } else {
      return false
    }
  },

  updateVideoById(id: number, title: string) {
    const video = videos.find(v => v.id === +id)
    if (video) {
      video.title = title
      return video;
    } else {
      return null
    }
  },

  createVideo(id: number, title: string, author: string) {
    const video = videos.find(v => v.id === id)
    if (isNaN(id) || "" + id === "") {
      return false
    } else if (video) {
      return null
    } else {
      const newVideo = {id: +id, title: title, author: author}
      videos.push(newVideo)
      return newVideo;
    }
  }
}
