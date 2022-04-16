import {Request, Response, Router} from 'express'
import {videosRepository} from "../repositories/videos-repository";

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
      const id = req.params.videoId;
      const title = req.body.title;
      let updateVideo = videosRepository.updateVideoById(id, title)

      if (updateVideo.errorsMessages.length === 0) {
        res.status(204);
        res.send(updateVideo);
        return
      } else {
        for (let key in updateVideo) {
          if (updateVideo.errorsMessages.length > 0) {
            for (let k in updateVideo.errorsMessages) {
              if (updateVideo.errorsMessages[k].message === 'such an id does not exist') {
                res.status(404);
                res.send(updateVideo);
                return;
              }
              if (updateVideo.errorsMessages[k].message === 'such an id has incorrect values' ||
                updateVideo.errorsMessages[k].message === 'input title has incorrect values') {
                res.status(400);
                res.send(updateVideo);
                return;
              }
            }
          }
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

      if (video.hasOwnProperty("errorsMessages")) {
        res.status(404)
        res.send(video);
        return
      }else {
        res.status(200);
        res.send(video);
        return
      }
    } catch (error) {
      return res.sendStatus(500)
    }
  })

  .delete('/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId
    const isDeleted = videosRepository.deleteVideoById(id)

    if (isDeleted) {
      res.status(204).send()
    } else {
      res.status(404).send()
    }
  })