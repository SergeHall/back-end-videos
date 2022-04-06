import {Request, Response, Router} from 'express'
import {videosRepository} from "../repositories/videos-repository";


// put here array with videos
export const videosRouter = Router({})

videosRouter.get('/', (req: Request, res: Response) => {
  const videos = videosRepository.getVideos()
  res.send(videos)
})

  .post('/', (req: Request, res: Response) => {
  try {
    const id = +req.body.id;
    const title = req.body.title;
    const author = req.body.author;
    const createVideo = videosRepository.createVideo(id, title, author)

    if (createVideo === null || createVideo === false) {
      res.sendStatus(400)
      return;
    }
    res.send(createVideo)

  } catch (error) {
    return res.sendStatus(500)
  }
})

  .put('/:videoId', (req: Request, res: Response) => {
  try {
    const id = +req.params.videoId;
    if (!Number(id)) {
      res.sendStatus(400)
      return;
    }
    const title = req.body.title;
    const updatedVideo = videosRepository.updateVideoById(id, title)

    if (updatedVideo) {
      res.send(updatedVideo)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    return res.sendStatus(500)
  }
})

  .get('/:videoId', (req: Request, res: Response) => {
  try {
    const id = +req.params.videoId;
    const video = videosRepository.getVideoById(id)
    if (video !== undefined) {
      res.send(video)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    return res.sendStatus(500)
  }
})

  .delete('/:videoId', (req: Request, res: Response) => {
  const id = +req.params.videoId
  const isDeleted = videosRepository.deleteVideoById(id)

  if (isDeleted) {
    res.sendStatus(204)
  } else {
    res.sendStatus(404)
  }
})