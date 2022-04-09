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
      const id = +(new Date());
      const title = req.body.title;
      const author = req.body.author;
      const createVideo = videosRepository.createVideo(id, title, author)

      if (createVideo.hasOwnProperty("errorsMessages")) {
        res.status(400)
        res.send(createVideo);
        return
      }
      if (createVideo) {
        res.status(201);
        res.send(createVideo);
        return
      }
    } catch (error) {
      return res.sendStatus(500)
    }
  })

  .put('/:videoId', (req: Request, res: Response) => {
    try {
      const id = +req.params.videoId;
      const title = req.body.title;
      const updateVideo = videosRepository.updateVideoById(id, title)

      if (updateVideo) {
        if (updateVideo.hasOwnProperty("errorsMessages")) {
          res.status(400)
          res.send(updateVideo);
          return
        }
        if (updateVideo) {
          res.status(200);
          res.send(updateVideo);
          return
        }
      }
    } catch (error) {
      return res.sendStatus(500)
    }
  })

  .get('/:videoId', (req: Request, res: Response) => {
    try {
      const id = +req.params.videoId;
      const video = videosRepository.getVideoById(id)
      if (video) {
        if (video.hasOwnProperty("errorsMessages")) {
          res.status(400)
          res.send(video);
          return
        }
        if (video) {
          res.status(200);
          res.send(video);
          return
        }
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